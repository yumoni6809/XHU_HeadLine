<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import Cherry from 'cherry-markdown'
import { getPortByIdApi, addPortApi, updatePortApi } from '@/api/port'

const route = useRoute()
const router = useRouter()

// 路由里拿 id：/port/editor/:id?
const idParam = route.params.id
const editingId = idParam ? Number(idParam) : null

// 表单：除了 content，其它字段在这里管理
const form = ref({
  id: editingId as number | null,
  title: '',
  authorId: '',
  categoryId: '',
  status: 0,
  coverImage: '',
})

let cherryInstance: any = null

onMounted(async () => {
  // 初始化 Cherry Markdown
  cherryInstance = new Cherry({
    id: 'markdown-container',
    value: '',
    // 这里可以根据你之前的配置补充工具栏、主题等
  })

  // 有 id：编辑模式 -> 加载文章详情
  if (editingId) {
    try {
      const res = await getPortByIdApi(editingId)
      if (res?.code === 1 && res.data) {
        const data = res.data
        form.value.id = data.id
        form.value.title = data.title || ''
        form.value.authorId = data.authorId != null ? String(data.authorId) : ''
        form.value.categoryId = data.categoryId != null ? String(data.categoryId) : ''
        form.value.status = data.status ?? 0
        form.value.coverImage = data.coverImage || ''
        // 把内容写入 Markdown 编辑器
        cherryInstance.setValue(data.content || '')
      } else {
        ElMessage.error(res?.message || '加载文章失败')
      }
    } catch (e) {
      console.error(e)
      ElMessage.error('加载文章失败')
    }
  }
})

const save = async () => {
  if (!cherryInstance) {
    ElMessage.error('编辑器尚未初始化')
    return
  }

  const content = cherryInstance.getValue() || ''
  const payload: any = {
    ...form.value,
    content,
  }

  if (!payload.title) {
    ElMessage.error('请填写标题')
    return
  }

  // 类型清洗：把字符串数字转成真正的数字
  if (payload.authorId === '') payload.authorId = null
  else payload.authorId = Number(payload.authorId)

  if (payload.categoryId === '') payload.categoryId = null
  else payload.categoryId = Number(payload.categoryId)

  if (payload.status === '') payload.status = 0

  try {
    const api = payload.id ? updatePortApi : addPortApi
    const res = await api(payload)
    if (res?.code === 1) {
      ElMessage.success(payload.id ? '更新成功' : '添加成功')
      router.push('/port')
    } else {
      ElMessage.error(res?.message || '保存失败')
    }
  } catch (e) {
    console.error(e)
    ElMessage.error('请求出错')
  }
}
</script>

<template>
  <div class="editor-page">
    <h2>{{ form.id ? '编辑文章' : '新建文章' }}</h2>

    <el-form :model="form" label-width="100px" style="max-width: 800px">
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="作者ID">
        <el-input v-model="form.authorId" placeholder="请输入作者ID" />
      </el-form-item>
      <el-form-item label="分类ID">
        <el-input v-model="form.categoryId" placeholder="请输入分类ID" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="草稿" :value="0" />
          <el-option label="已发布" :value="1" />
          <el-option label="已删除" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="封面图 URL">
        <el-input v-model="form.coverImage" placeholder="请输入封面图地址" />
      </el-form-item>
    </el-form>

    <!-- Markdown 编辑器容器 -->
    <div id="markdown-container" style="height: 500px; margin-top: 16px"></div>

    <div style="margin-top: 16px; text-align: right">
      <el-button @click="router.back()">返 回</el-button>
      <el-button type="primary" @click="save">保 存</el-button>
    </div>
  </div>
</template>

<style scoped>
.editor-page {
  padding: 16px;
}
</style>
