```vue // filepath:
f:\Develop\project\XHU_HeadLine\XHU_HeadLine\front\headline_admin_ui\src\port\index.vue
<script lang="ts">
export default {
  name: 'PortView',
}
</script>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { EditPen, Delete } from '@element-plus/icons-vue'
import { curd } from '@/api/curd'
import { queryPagePortApi, addPortApi, updatePortApi, deletePortApi } from '@/api/port'

// 初始文章对象
const initialPort = {
  id: null,
  title: '',
  content: '',
  authorId: '',
  categoryId: '',
  status: '',
  coverImage: '',
  viewCount: '',
  likeCount: '',
  createTime: '',
  updateTime: '',
}

// 搜索表单配置
const formSchemaConfig = [
  { prop: 'title', label: '标题', type: 'input', placeholder: '请输入标题' },
  { prop: 'authorId', label: '作者ID', type: 'input', placeholder: '请输入作者ID' },
  { prop: 'categoryId', label: '分类ID', type: 'input', placeholder: '请输入分类ID' },
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    dicData: [
      { label: '草稿', value: 'draft' },
      { label: '已发布', value: 'published' },
      { label: '已删除', value: 'deleted' },
    ],
  },
]

// 使用通用 curd 组合函数
const {
  item,
  searchForm,
  formSchema,
  list,
  currentPage,
  pageSize,
  total,
  dialogShow,
  dialogTitle,
  search,
  addItem,
  updateItem,
  saveItem,
  deleteItem,
  cancel,
  handleSizeChange,
  handleCurrentChange,
} = curd(
  { queryPage: queryPagePortApi, add: addPortApi, update: updatePortApi, del: deletePortApi },
  {
    initialItem: initialPort,
    formSchema: formSchemaConfig,
    title: '文章管理',
    labels: {
      title: '标题',
      authorId: '作者ID',
      categoryId: '分类ID',
      status: '状态',
      coverImage: '封面图',
      actions: '操作',
    },
  },
)

// 直接使用 curd 返回的引用
const port = item
const searchPortForm = searchForm
const portList = list

// 清空搜索
const clear = () => {
  formSchema.forEach((f: any) => {
    searchPortForm[f.prop] = ''
  })
  currentPage.value = 1
  search()
}

// 删除文章
const delPort = async (row: any) => {
  if (!row) return
  try {
    const res = await deleteItem(row)
    if (res && (res.code || res.message)) {
      ElMessage.success(res.message || '删除成功')
      search()
    } else {
      ElMessage.error(res?.message || '删除失败')
      console.error('删除失败', res)
    }
  } catch (err) {
    console.error(err)
    ElMessage.error('请求出错')
  }
}

// 新增 / 编辑 / 保存 / 取消
const addPort = addItem
const updatePort = updateItem
const savePort = async () => {
  const payload = JSON.parse(JSON.stringify(port))
  if (!payload.title) {
    ElMessage.error('请填写标题')
    return
  }
  Object.assign(port, payload)
  try {
    const res = await saveItem()
    if (res && (res.code || res.message)) {
      ElMessage.success(res.message || (port.id ? '更新成功' : '添加成功'))
      cancel()
      search()
    } else {
      ElMessage.error(res?.message || '保存失败')
    }
  } catch (err) {
    console.error(err)
    ElMessage.error('请求出错')
  }
}
const cancelEdit = cancel
</script>

<template>
  <h2>文章管理</h2>

  <!-- 搜索栏 -->
  <div class="container">
    <el-form :inline="true" :model="searchPortForm" class="search-form">
      <el-form-item v-for="field in formSchema" :key="field.prop" :label="field.label">
        <!-- input -->
        <el-input
          v-if="field.type === 'input'"
          v-model="searchPortForm[field.prop]"
          :placeholder="field.placeholder || '请输入' + field.label"
          style="width: 200px"
        />
        <!-- select -->
        <el-select
          v-else-if="field.type === 'select'"
          v-model="searchPortForm[field.prop]"
          :placeholder="'请选择' + field.label"
          style="width: 200px"
        >
          <el-option
            v-for="option in field.dicData || []"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="addPort">
          <el-icon><EditPen /></el-icon> 新增
        </el-button>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="clear">清空</el-button>
      </el-form-item>
    </el-form>
  </div>

  <!-- 文章列表 -->
  <div class="container" style="margin-top: 10px">
    <el-table :data="portList" style="width: 100%" border>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="authorId" label="作者ID" width="120" />
      <el-table-column prop="categoryId" label="分类ID" width="120" />
      <el-table-column prop="status" label="状态" width="100" />
      <el-table-column prop="viewCount" label="浏览量" width="100" />
      <el-table-column prop="likeCount" label="点赞量" width="100" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="updateTime" label="更新时间" width="180" />

      <!-- 封面图 -->
      <el-table-column label="封面图" width="120">
        <template #default="{ row }">
          <el-image
            :src="row.coverImage"
            :preview-src-list="row.coverImage ? [row.coverImage] : []"
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column label="操作" width="140">
        <template #default="{ row }">
          <div class="action-buttons">
            <el-button size="small" type="primary" @click="updatePort(row)">
              <el-icon><EditPen /></el-icon>
            </el-button>
            <el-button size="small" type="danger" @click="delPort(row)">
              <el-icon><Delete /></el-icon>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 新增/编辑对话框 -->
  <el-dialog v-model="dialogShow" :title="dialogTitle" width="720px">
    <el-form :model="port" label-width="100px">
      <el-form-item label="标题">
        <el-input v-model="port.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="作者ID">
        <el-input v-model="port.authorId" placeholder="请输入作者ID" />
      </el-form-item>
      <el-form-item label="分类ID">
        <el-input v-model="port.categoryId" placeholder="请输入分类ID" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="port.status" placeholder="请选择状态">
          <el-option label="草稿" value="draft" />
          <el-option label="已发布" value="published" />
          <el-option label="已删除" value="deleted" />
        </el-select>
      </el-form-item>
      <el-form-item label="封面图 URL">
        <el-input v-model="port.coverImage" placeholder="请输入封面图地址" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="port.content" type="textarea" :rows="5" placeholder="请输入文章内容" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancelEdit">取 消</el-button>
      <el-button type="primary" @click="savePort">保 存</el-button>
    </template>
  </el-dialog>

  <!-- 分页 -->
  <div class="container" style="margin-top: 10px; text-align: right">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20]"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped>
.container {
  margin: 12px 0;
}

.search-form {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  align-items: center;
}
</style>
