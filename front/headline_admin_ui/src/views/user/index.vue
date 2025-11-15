<script lang="ts">
export default { name: 'UserView' }
</script>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { EditPen, Delete } from '@element-plus/icons-vue'
import { queryPageApi, deleteUserApi, addUserApi, updateUserApi } from '@/api/user'
import { curd } from '@/api/curd'

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

// 使用通用 curd（和 book 页一致的调用方式）
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

// 别名兼容
const user = item
const searchUserForm = searchForm
const userList = list

// 清空搜索
const clear = () => {
  formSchemaConfig.forEach((f) => {
    searchUserForm[f.prop] = ''
  })
  currentPage.value = 1
  search()
}

// 删除（借鉴 book 的删除实现）
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

// 新增 / 编辑 / 保存 / 取消 映射
const addUser = addItem
const updateUser = updateItem
const saveUser = async () => {
  // 简单校验：用户名和密码可按需调整
  const payload = JSON.parse(JSON.stringify(user))
  if (!payload.userName) {
    ElMessage.error('请填写用户名')
    return
  }
  Object.assign(user, payload)
  try {
    const res = await saveItem()
    if (res && (res.code || res.message)) {
      ElMessage.success(res.message || (user.id ? '更新成功' : '添加成功'))
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
  <h2>用户管理</h2>

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
        <el-button type="success" @click="addUser"
          ><el-icon><EditPen /></el-icon> 添加</el-button
        >
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="clear">清空</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div class="container" style="margin-top: 10px">
    <el-table :data="userList" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="userName" label="用户名" width="120" />
      <el-table-column prop="password" label="密码" width="120" />
      <el-table-column prop="nickName" label="昵称" width="180" />
      <el-table-column prop="role" label="分类" width="100" />
      <el-table-column prop="phone" label="电话" width="120" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="updateTime" label="更新时间" width="180" />
      <el-table-column prop="avatarUrl" label="头像" width="150" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button size="mini" type="primary" @click="updateUser(row)">
            <el-icon><EditPen /></el-icon> 编辑
          </el-button>
          <el-button size="mini" type="danger" @click="delUser(row)">
            <el-icon><Delete /></el-icon> 删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog v-model="dialogShow" :title="dialogTitle" width="720px">
    <el-form :model="user" label-width="100px">
      <el-form-item label="用户名">
        <el-input v-model="user.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password" autocomplete="off" type="password" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="user.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="分类">
        <el-input v-model="user.role" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="user.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="头像URL">
        <el-input v-model="user.avatarUrl" autocomplete="off" />
      </el-form-item>
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
</style>
