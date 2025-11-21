<script lang="ts">
export default { name: 'PortView' }
</script>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import {
  CirclePlusFilled,
  Search,
  CircleCloseFilled,
  EditPen,
  Delete,
} from '@element-plus/icons-vue'
import { curd } from '@/api/curd'
import {
  queryPagePortApi,
  addPortApi,
  updatePortApi,
  deletePortApi,
  getPortByIdApi,
} from '@/api/port'

// 路由
const router = useRouter()

// 初始文章对象（字段名要和后端 newsPort 保持一致）
const initialPort = {
  id: null as number | null,
  title: '',
  content: '',
  authorId: '',
  categoryId: '',
  status: 0,
  coverImage: '',
  viewCount: 0,
  likeCount: 0,
  createTime: '',
  updateTime: '',
}

// 搜索 / 表单 字段配置
const formSchemaConfig = [
  { prop: 'title', label: '标题', type: 'input', placeholder: '请输入标题' },
  { prop: 'authorId', label: '作者ID', type: 'input', placeholder: '请输入作者ID' },
  { prop: 'categoryId', label: '分类ID', type: 'input', placeholder: '请输入分类ID' },
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    dicData: [
      { label: '草稿', value: 0 },
      { label: '已发布', value: 1 },
      { label: '已删除', value: 2 },
    ],
  },
]

// 使用通用 curd
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

// 简化使用
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

// 新增走 markdown 编辑页（无 id）
const goCreate = () => {
  router.push({ name: 'PortEditor' })
}

// 编辑走 markdown 编辑页（带 id）
const goEdit = (row: any) => {
  if (!row || !row.id) {
    ElMessage.error('无效的文章 ID')
    return
  }
  router.push({
    name: 'PortEditor',
    params: { id: row.id },
  })
}

// 更改状态：0 草稿，1 已发布，2 已删除
const changeStatus = async (row: any, status: number) => {
  try {
    const payload = { ...row, status }
    const res = await updatePortApi(payload)
    if (res?.code === 1) {
      ElMessage.success('状态已更新')
      search()
    } else {
      ElMessage.error(res?.message || '状态更新失败')
    }
  } catch (e) {
    console.error(e)
    ElMessage.error('请求出错')
  }
}

// 原弹窗编辑逻辑（暂时保留，但现在主要用 editor.vue）
const addPort = addItem
const updatePort = updateItem
const savePort = async () => {
  const payload: any = JSON.parse(JSON.stringify(port))

  if (!payload.title) {
    ElMessage.error('请填写标题')
    return
  }

  // 数字/可空字段的类型清洗
  if (payload.authorId === '') payload.authorId = null
  else if (typeof payload.authorId === 'string') payload.authorId = Number(payload.authorId)

  if (payload.categoryId === '') payload.categoryId = null
  else if (typeof payload.categoryId === 'string') payload.categoryId = Number(payload.categoryId)

  if (payload.viewCount === '') payload.viewCount = 0
  else if (typeof payload.viewCount === 'string') payload.viewCount = Number(payload.viewCount)

  if (payload.likeCount === '') payload.likeCount = 0
  else if (typeof payload.likeCount === 'string') payload.likeCount = Number(payload.likeCount)

  if (payload.createTime === '') payload.createTime = null
  if (payload.updateTime === '') payload.updateTime = null

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
          :placeholder="field.placeholder || `请输入${field.label}`"
          style="width: 200px"
        />
        <!-- select -->
        <el-select
          v-else-if="field.type === 'select'"
          v-model="searchPortForm[field.prop]"
          :placeholder="`请选择${field.label}`"
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
        <el-button type="success" @click="goCreate">
          <el-icon><CirclePlusFilled /></el-icon> 新增
        </el-button>
        <el-button type="primary" @click="search">
          <el-icon><Search /></el-icon> 搜索
        </el-button>
        <el-button @click="clear">
          <el-icon><CircleCloseFilled /></el-icon> 清空
        </el-button>
      </el-form-item>
    </el-form>
  </div>

  <!-- 列表 -->
  <div class="container" style="margin-top: 10px">
    <el-table :data="portList" style="width: 100%" border>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="title" label="标题" min-width="200" />
      <el-table-column prop="authorId" label="作者ID" width="80" />
      <el-table-column prop="categoryId" label="分类ID" width="80" />

      <!-- 状态：0 草稿，1 已发布，2 已删除 -->
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : row.status === 2 ? 'info' : 'warning'">
            {{ row.status === 0 ? '草稿' : row.status === 1 ? '已发布' : '已删除' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="viewCount" label="浏览量" width="100" />
      <el-table-column prop="likeCount" label="点赞量" width="100" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="updateTime" label="更新时间" width="180" />

      <!-- 封面图 -->
      <el-table-column label="封面图" width="120">
        <template #default="{ row }">
          <el-image
            v-if="row.coverImage"
            :src="row.coverImage"
            :preview-src-list="[row.coverImage]"
            style="width: 80px; height: 80px"
          />
          <span v-else>无</span>
        </template>
      </el-table-column>

      <!-- 操作列：状态切换 + 编辑(跳转 editor.vue) + 删除 -->
      <el-table-column label="操作" width="320">
        <template #default="{ row }">
          <div class="action-buttons">
            <el-button size="small" @click="changeStatus(row, 0)" :disabled="row.status === 0">
              草稿
            </el-button>
            <el-button
              size="small"
              type="success"
              @click="changeStatus(row, 1)"
              :disabled="row.status === 1"
            >
              发布
            </el-button>
            <el-button
              size="small"
              type="info"
              @click="changeStatus(row, 2)"
              :disabled="row.status === 2"
            >
              删除
            </el-button>

            <el-button size="small" type="primary" @click="goEdit(row)">
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

  <!-- 原先的新增/编辑对话框（如不需要可删除） -->
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
          <el-option label="草稿" :value="0" />
          <el-option label="已发布" :value="1" />
          <el-option label="已删除" :value="2" />
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
