<template>
  <div class="publish-container">
    <div class="form-wrapper">
      <!-- 标题输入 -->
      <div class="form-item">
        <input 
          v-model="articleForm.title" 
          class="native-input title-input" 
          placeholder="请输入标题 (2-30字)"
          maxlength="30"
        />
        <span class="word-count">{{ articleForm.title.length }}/30</span>
      </div>

      <!-- 分类选择  -->
      <div class="form-item">
        <div class="label">发布到</div>
        <el-select
          v-model="articleForm.categoryId"
          filterable
          allow-create
          default-first-option
          placeholder="请选择或输入分类"
          class="category-select"
          size="large"
        >
          <el-option
            v-for="item in categoryOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>

      <!-- 内容编辑 -->
      <div class="form-item editor-box">
        <QuillEditor
          v-model:content="articleForm.content"
          content-type="html"
          :toolbar="toolbarOptions"
          theme="snow"
          placeholder="分享你的校园新鲜事..."
          class="custom-quill"
        />
      </div>

      <!-- 图片上传 (九宫格) -->
      <div class="form-item">
        <div class="label">配图 ({{ articleForm.coverImages.length }}/9)</div>
        <div class="image-grid">
          <!-- 已上传图片 -->
          <div 
            v-for="(img, index) in articleForm.coverImages" 
            :key="index" 
            class="grid-item"
          >
            <el-image 
              :src="img" 
              fit="cover" 
              class="grid-img"
              :preview-src-list="articleForm.coverImages"
              :initial-index="index"
              hide-on-click-modal
            />
            <div class="delete-btn" @click.stop="removeImage(index)">
              <el-icon><Close /></el-icon>
            </div>
          </div>

          <!-- 上传按钮 -->
          <div v-if="articleForm.coverImages.length < 9" class="grid-item upload-wrapper">
            <el-upload
              class="custom-uploader"
              action="#"
              :show-file-list="false"
              :http-request="customUpload"
              :before-upload="beforeUpload"
              multiple
            >
              <div class="upload-box">
                <el-icon class="upload-icon"><Plus /></el-icon>
                <span class="upload-text">上传图片</span>
              </div>
            </el-upload>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="action-bar">
      <el-button class="btn-save" round @click="saveArticle">存草稿</el-button>
      <el-button class="btn-publish" type="primary" round @click="submitArticle" :loading="submitting">
        发布帖子
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Plus, Close } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import instance from '@/utils/axios/main.js'
import { useRouter, useRoute } from 'vue-router';

const route = useRoute()
defineOptions({
  name: 'AddArticlePage'
})

const router = useRouter()
const submitting = ref(false)

// 简化的工具栏配置
const toolbarOptions = [
  [{ 'header': [2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  ['link', 'clean']
]

const articleForm = ref({
  title: '',
  coverImages: [],
  content: '',
  categoryId: null,
  status: 1
})

// 存储当前用户ID
const currentUserId = ref(null)

// 分类选项
const categoryOptions = ref([
  { id: 1, name: '校园' },
  { id: 2, name: '生活' },
  { id: 3, name: '科技' },
  { id: 4, name: '要闻' },
  { id: 5, name: '通知公告' },
])

// --- 图片管理逻辑 ---

const customUpload = async (options) => {
  const { file, onSuccess, onError } = options
  try {
    const formData = new FormData()
    // 修复1：后端 @RequestParam("image") 要求参数名为 image
    formData.append('image', file)
    
    const res = await instance.post('/user/upload', formData)
    const responseData = res.data || res

    // 修复2：后端返回结构是 { code: 1, imageUrl: "..." }
    if (responseData.code === 1 || responseData.code === 200) {
      const url = responseData.imageUrl
      if (url) {
        articleForm.value.coverImages.push(url)
        ElMessage.success('上传成功')
        onSuccess(responseData)
      } else {
        throw new Error('返回的图片地址为空')
      }
    } else {
      throw new Error(responseData.message || '上传失败')
    }
  } catch (err) {
    console.error(err)
    ElMessage.error(err.message || '网络错误，上传失败')
    onError(err)
  }
}

const beforeUpload = (file) => {
  const isLt5M = file.size / 1024 / 1024 < 5
  if (!isLt5M) {
    ElMessage.warning('图片大小不能超过 5MB!')
  }
  return isLt5M
}

const removeImage = (index) => {
  articleForm.value.coverImages.splice(index, 1)
}

// --- 核心业务逻辑 ---

const submitArticle = async () => {
  if (!articleForm.value.title.trim()) return ElMessage.warning('请输入标题')
  if (!articleForm.value.categoryId) return ElMessage.warning('请选择或输入分类')
  if (!articleForm.value.content.trim()) return ElMessage.warning('请输入正文内容')

  submitting.value = true

  let finalCategoryId = articleForm.value.categoryId
  let finalCategoryName = null

  // 1. 处理分类：如果是字符串，先查本地，再调后端创建
  if (typeof finalCategoryId === 'string') {
    const match = categoryOptions.value.find(c => c.name === finalCategoryId)
    if (match) {
      finalCategoryId = match.id
    } else {
      // 新分类，先调后端创建
      try {
        const res = await instance.post('/user/news/category/add', { name: finalCategoryId })
        const data = res.data || res
        if (data.code === 1 && data.id) {
          finalCategoryId = data.id
          // 动态加入本地分类选项
          categoryOptions.value.push({ id: data.id, name: articleForm.value.categoryId })
        } else {
          // 兜底：如果后端返回已存在
          if (data.id) {
            finalCategoryId = data.id
          } else {
            // 后端没返回 id，则用 categoryName 兜底
            finalCategoryName = articleForm.value.categoryId
          }
        }
      } catch (e) {
        // 网络异常时，直接用 categoryName 兜底
        finalCategoryName = articleForm.value.categoryId
      }
    }
  }

  // 2. 获取用户 ID
  if (!currentUserId.value) {
    try {
      const raw = localStorage.getItem('login_user')
      if (raw) {
        const info = JSON.parse(raw)
        currentUserId.value = info.userId || info.id || info.uid
      }
    } catch (e) {
      console.error('解析用户信息失败', e)
    }
  }

  if (!currentUserId.value) {
    ElMessage.error('无法获取用户信息，请重新登录')
    submitting.value = false
    return
  }

  // 3. 构造 Payload
  const payload = { 
    authorId: currentUserId.value, 
    title: articleForm.value.title,
    content: articleForm.value.content,
    coverImages: JSON.stringify(articleForm.value.coverImages),
    status: 1
  }
  if (finalCategoryId) {
    payload.categoryId = finalCategoryId
  }
  if (finalCategoryName) {
    payload.categoryName = finalCategoryName
  }

  try {
    const res = await instance.post('/user/news/post', payload)
    const resData = res.data || res
    if (resData.id != null || resData.code === 1 || resData.code === 200) {
      ElMessage.success('发布成功！待审核中')
      localStorage.removeItem('articleDraft')
      router.push('/layout/home')
    } else {
      ElMessage.error(resData.message || '发布失败，请检查网络或重试')
    }
  } catch (err) {
    ElMessage.error(err.message || '网络异常，请稍后重试')
  } finally {
    submitting.value = false
  }
}

const saveArticle = () => {
  localStorage.setItem('articleDraft', JSON.stringify(articleForm.value))
  ElMessage.success('已保存到本地草稿')
}

onMounted(async () => {
    const id = route.query.id
  if (id) {
    const res = await instance.get(`/user/news/${id}`)
    const data = res.data || res
    articleForm.value.title = data.title || ''
    articleForm.value.content = data.content || ''
    articleForm.value.categoryId = data.categoryId || null
    if (typeof data.coverImages === 'string') {
      try {
        articleForm.value.coverImages = JSON.parse(data.coverImages)
      } catch { articleForm.value.coverImages = [] }
    } else if (Array.isArray(data.coverImages)) {
      articleForm.value.coverImages = data.coverImages
    } else {
      articleForm.value.coverImages = []
    }
  }
  
  // 1. 恢复草稿
  const draft = localStorage.getItem('articleDraft')
  if (draft) {
    try {
      const parsed = JSON.parse(draft)
      articleForm.value = { ...articleForm.value, ...parsed }
    } catch (e) {
      console.error('草稿解析失败', e)
    }
  }

  // 2. 从 localStorage 获取用户信息
  try {
    const raw = localStorage.getItem('login_user')
    if (raw) {
      const info = JSON.parse(raw)
      currentUserId.value = info.userId || info.id || info.uid
    }
  } catch (e) {
    console.error('读取本地用户信息失败', e)
  }
})
</script>

<style scoped>
.publish-container {
  min-height: 100%;
  background-color: #fff;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
}

.form-wrapper {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
}

.label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

/* 标题输入框 */
.title-input {
  width: 100%;
  border: none;
  border-bottom: 1px solid #eee;
  padding: 12px 0;
  font-size: 18px;
  font-weight: bold;
  outline: none;
  background: transparent;
  border-radius: 0;
}
.title-input::placeholder {
  color: #ccc;
  font-weight: normal;
}
.word-count {
  position: absolute;
  right: 0;
  top: 16px;
  font-size: 12px;
  color: #999;
}

/* 分类选择器样式覆盖 */
.category-select {
  width: 100%;
}
:deep(.el-input__wrapper) {
  background-color: #f5f7fa;
  box-shadow: none !important;
  border-radius: 8px;
}
:deep(.el-input__inner) {
  font-weight: 500;
}

/* 编辑器样式 */
.editor-box {
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
}
:deep(.ql-toolbar) {
  border: none !important;
  border-bottom: 1px solid #f0f0f0 !important;
  background: #fafafa;
}
:deep(.ql-container) {
  border: none !important;
  min-height: 200px;
  font-size: 16px;
}

/* 九宫格图片墙 */
.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

/* 统一 Grid Item 样式 */
.grid-item {
  position: relative;
  width: 100%;
  padding-bottom: 100%; /* 保持正方形 1:1 */
  border-radius: 8px;
  overflow: hidden;
}

.grid-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.delete-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  z-index: 10;
}

/* 上传按钮样式修复 */
.upload-wrapper {
  /* 确保 wrapper 也是 grid item */
}

.custom-uploader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
}

/* 穿透 el-upload 内部样式 */
:deep(.el-upload) {
  width: 100%;
  height: 100%;
  display: block;
}

.upload-box {
  width: 100%;
  height: 100%;
  background-color: #f5f7fa;
  border: 1px dashed #dcdfe6;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.3s;
  box-sizing: border-box; /* 确保边框在内 */
}
.upload-box:hover {
  border-color: #409eff;
}

.upload-icon {
  font-size: 28px;
  color: #8c939d;
  margin-bottom: 8px;
}

.upload-text {
  font-size: 12px;
  color: #909399;
}

/* 底部操作栏 */
.action-bar {
  position: fixed;
  bottom: 80px;
  left: 0;
  right: 0;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  gap: 15px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  z-index: 99;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
}
.btn-save {
  flex: 1;
  background-color: #f5f7fa;
  color: #606266;
  border-color: #dcdfe6;
}
.btn-publish {
  flex: 1;
}
</style>