<script lang="ts">
export default { name: 'UserView' }


</script>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import {
  EditPen,
  Delete,
  CirclePlusFilled,
  Search,
  CircleCloseFilled,
} from '@element-plus/icons-vue'
import { queryPageApi, deleteUserApi, addUserApi, updateUserApi } from '@/api/user'
import { curd } from '@/api/curd'
import { computed } from 'vue'
// 初始用户对象
const initialUser = {
  id: null,
  userName: '',
  password: '',
  nickName: '',
  role: '',
  phone: '',
  createTime: '',
  updateTime: '',
  avatarUrl: '',
}



// 搜索 / 表单 字段配置
const formSchemaConfig = [
  { prop: 'userName', label: '用户名', type: 'input', placeholder: '请输入用户名' },
  { prop: 'role', label: '分类', type: 'input', placeholder: '请输入分类' },
  { prop: 'phone', label: '手机号', type: 'input', placeholder: '请输入手机号' },
]

// 使用通用 curd.js
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
  { queryPage: queryPageApi, add: addUserApi, update: updateUserApi, del: deleteUserApi },
  {
    initialItem: initialUser,
    formSchema: formSchemaConfig,
    title: '用户管理',
    labels: {
      userName: '用户名',
      role: '分类',
      phone: '手机号',
      avatarUrl: '头像',
      actions: '操作',
    },
  },
)

// 直接使用 curd 返回的 item 等
const user = item
const searchUserForm = searchForm
const userList = list

// 默认头像
const DEFAULT_AVATAR = 'http://yumoni.top/upload/Transparent_Akkarin_Transparentized.png'

// 图片加载失败时把图片替换为默认
const onImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  if (img && DEFAULT_AVATAR) img.src = DEFAULT_AVATAR
}
// 清空搜索
const clear = () => {
  formSchema.forEach((f: any) => {
    searchUserForm[f.prop] = ''
  })
  currentPage.value = 1
  search()
}

// 删除
const delUser = async (row: unknown) => {
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

// 从父布局接收是否管理员
const props = defineProps<{
  isAdmin: boolean
}>()

// 新增 / 编辑 / 保存 / 取消
const addUser = addItem
const updateUser = updateItem

const saveUser = async () => {
  const targetUser = user.value || user

  const payload = JSON.parse(JSON.stringify(targetUser))
  if (!payload.userName) {
    ElMessage.error('请填写用户名')
    return
  }
  Object.assign(targetUser, payload)
  try {
    const res = await saveItem()
    if (res && (res.code || res.message)) {
      ElMessage.success(res.message || (targetUser.id ? '更新成功' : '添加成功'))
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

// 上传回调与校验（新增）
const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1 MB
const beforeUpload = (file: File) => {
  if (file.size > MAX_FILE_SIZE) {
    ElMessage.error('上传文件大小不能超过 1 MB')
    return false
  }
  return true
}

const uploadSuccess = (Response: unknown) => {
  let data: any = Response
  if (typeof Response === 'string') {
    try {
      data = JSON.parse(Response)
    } catch (e) {
      console.error('解析上传响应失败', e)
      ElMessage.error('上传失败，服务器返回数据格式错误')
      return
    }
  }
  // 1. 检查后端返回的业务状态码 (code: 0 表示失败)
  if (data.code === 0) {
    ElMessage.error(data.message || '上传失败，请检查后端日志')
    return
  }

  // 2. 修复：添加 data?.imageUrl 以匹配后端返回的字段
  const url = data?.imageUrl || data?.url || data?.data?.url || data?.avatarUrl || data?.data?.avatarUrl || ''

    if (url) {
    if (user.value) {
      user.value.avatarUrl = url
    } else {
      (user as any).avatarUrl = url
    }
    ElMessage.success('上传成功')
  } else {
    ElMessage.warning('上传完成，但后端未返回图片链接')
    console.warn('upload response parsed but no url:', data)
  }
}
const uploadError = () => {
  console.error('上传失败')
  ElMessage.error('上传失败')
}
// 文件上传
const uploadHeaders = computed(() => {
  const token = localStorage.getItem('auth_token') // 这里必须用 auth_token
  return {
    token: token, // 后端拦截器里写的 config.headers.token = ... 说明后端要这个键
    // 为了保险，也可以把 Authorization 带上，万一后端改了标准
    Authorization: token
  }
})




</script>
<template>
  <div class="port-wrapper">
    <h2>用户管理</h2>

    <!--搜索栏-->
    <div class="container">
      <el-form :inline="true" :model="searchUserForm" class="inline-form">
        <el-form-item v-for="field in formSchema" :key="field.prop" :label="field.label">
          <component
            v-if="field.type === 'input'"
            :is="'el-input'"
            v-model="searchUserForm[field.prop]"
            :placeholder="field.placeholder"
          />
        </el-form-item>

        <el-form-item>
          <el-button v-if="props.isAdmin" type="success" @click="addUser">
            <el-icon><CirclePlusFilled /></el-icon> 新增</el-button
          >
          <el-button type="primary" @click="search"
            ><el-icon><Search /></el-icon> 查询</el-button
          >
          <el-button @click="clear"
            ><el-icon><CircleCloseFilled /></el-icon> 清空</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!--列表-->
    <div class="container" style="margin-top: 10px">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="120" />
        <el-table-column prop="userName" label="用户名" width="120" />
        <el-table-column prop="password" label="密码" width="120" />
        <el-table-column prop="nickName" label="昵称" width="120" />
        <el-table-column prop="role" label="分类" width="120" />
        <el-table-column prop="phone" label="电话" width="120" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column prop="updateTime" label="更新时间" width="180" />

        <!-- avatar 列：显示图片或默认占位 -->
        <el-table-column label="头像" width="80">
          <template #default="{ row }">
            <div class="avatar-cell">
              <a v-if="row.avatarUrl" :href="row.avatarUrl" target="_blank" rel="noopener noreferrer">
                <img
                  :src="row.avatarUrl || DEFAULT_AVATAR"
                  @error="onImageError"
                  alt="avatar"
                  class="avatar-img"
                />
              </a>
              <img v-else :src="DEFAULT_AVATAR" alt="default avatar" class="avatar-img" />
            </div>
          </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <div class="action-buttons">
              <el-button v-if="props.isAdmin" size="small" type="primary" @click="updateUser(row)">
                <el-icon><EditPen /></el-icon>
              </el-button>
              <el-button v-if="props.isAdmin" size="small" type="danger" @click="delUser(row)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--新增/编辑对话框-->
    <el-dialog v-if="props.isAdmin" v-model="dialogShow" :title="dialogTitle" width="720px">
      <el-form :model="user" label-width="100px">
        <!--第一行-->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名">
              <el-input v-model="user.userName" placeholder="请输入用户名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码">
              <el-input v-model="user.password" placeholder="请输入密码" type="password" />
            </el-form-item>
          </el-col>
        </el-row>

        <!--第二行-->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="昵称">
              <el-input v-model="user.nickName" placeholder="请输入昵称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分类">
              <el-select v-model="user.role" placeholder="请选择分类">
                <el-option :label="'0 - 管理员'" :value="0" />
                <el-option :label="'1 - 员工'" :value="1" />
                <el-option :label="'2 - 用户'" :value="2" />
              </el-select>
              <div class="hint">提示：0 为管理员，1 为员工，2 为用户</div>
            </el-form-item>
          </el-col>
        </el-row>

        <!--第三行-->
        <el-row :gutter="20"></el-row>
        <el-col :span="12">
          <el-form-item label="电话">
            <el-input v-model="user.phone" placeholder="请输入电话" />
          </el-form-item>
        </el-col>

        <!--上传头像-->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="头像">
              <el-upload
                class="image-uploader"
                action="/api/admin/user/uploadImage"
                name="image"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :before-upload="beforeUpload"
                :headers="uploadHeaders"
                accept="image/*"
              >
                <el-button size="small" type="primary">点击上传头像</el-button>
              </el-upload>

              <div style="margin-top: 6px">
                <div v-if="user.avatarUrl">
                  <a :href="user.avatarUrl" target="_blank">{{ user.avatarUrl }}</a>
                  <div style="margin-top: 6px">
                    <img
                      :src="user.avatarUrl"
                      @error="onImageError"
                      alt="avatar preview"
                      class="avatar-preview"
                    />
                  </div>
                </div>
                <div v-else>尚未上传</div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </template>
    </el-dialog>

    <div class="container" style="margin-top: 10px; text-align: right">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20]"
        :total="total"
        layout="total,sizes,prev,pager,next,jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
  
</template>
<style scoped>
.container {
  margin: 12px 0;
}
.inline-form {
  gap: 12px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

/* 操作按钮区域 */
.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  align-items: center;
}
/* avatar 列单元格样式 */
.avatar-img {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
  display: inline-block;
}

/* 编辑对话框内的预览 */
.avatar-preview {
  width: 80px;
  height: 80px;
  border-radius: 6px;
  object-fit: cover;
  margin-top: 6px;
}

/* dialog 中分类提示样式 */
.hint {
  font-size: 12px;
  color: #909399;
  margin-top: 6px;
}
</style>
