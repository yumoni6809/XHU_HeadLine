<script setup lang="ts">
import { onMounted, ref, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, type UploadProps } from 'element-plus'
import { Plus, Delete, Picture, UserFilled, ArrowLeft } from '@element-plus/icons-vue'
import Cherry from 'cherry-markdown'
import { getPortByIdApi, addPortApi, updatePortApi } from '@/api/port'

const route = useRoute()
const router = useRouter()

// --- 状态定义 ---
const idParam = route.params.id
const editingId = idParam ? Number(idParam) : null
const loading = ref(false)
let cherryInstance: any = null

// 表单数据
const form = reactive({
  id: editingId as number | null,
  title: '',
  authorName: '', 
  authorAvatar: '', 
  authorId: '',   
  categoryName: '',
  status: 0,
  coverImages: [] as string[],
})

// 模拟当前登录用户
const currentUser = {
  nickName: '当前管理员',
  id: '1'
}

// --- 生命周期 ---
onMounted(async () => {
  initCherryMarkdown()
  if (editingId) {
    await loadArticleData()
  } else {
    // 新增模式：默认作者为当前用户
    form.authorName = currentUser.nickName
    form.authorId = currentUser.id
  }
})

// --- 逻辑方法 ---

const initCherryMarkdown = () => {
  cherryInstance = new Cherry({
    id: 'markdown-container',
    value: '',
    toolbars: {
      toolbar: [
        'bold', 'italic', 'strikethrough', '|',
        'color', 'header', '|',
        'list', 'insert', 'graph', 'table', '|',
        'undo', 'redo'
      ],
    },
    editor: { height: '100%' },
  })
}

const loadArticleData = async () => {
  loading.value = true
  try {
    const res = await getPortByIdApi(editingId)
    console.log('文章详情原始返回:', res)

    if ((res?.code === 1 || res?.code === 200) && res.data) {
      const data = res.data
      
      // 1. ID
      form.id = Number(data.id || data.articleId)
      form.title = data.title || ''
      form.authorId = data.authorId || ''
      
      // 2. 作者信息
      form.authorName = data.authorName || '未知作者'
      form.authorAvatar = data.authorAvatar || ''

      form.status = data.status ?? 0
      
      // 3. 分类信息
      form.categoryName = data.categoryName || '' 
      
      // 4. 封面图解析 (增强版：支持 JSON字符串、逗号分隔、自动去空格)
      let raw = data.coverImages || data.coverImage || data.cover_images || data.cover_image || ''
      let imgArray: string[] = []
      
      if (Array.isArray(raw)) {
        imgArray = raw
      } else if (typeof raw === 'string' && raw.trim() !== '') {
        const str = raw.trim()
        // 尝试判断是否为 JSON 格式
        if (str.startsWith('[') && str.endsWith(']')) {
          try {
            const parsed = JSON.parse(str)
            if (Array.isArray(parsed)) {
              imgArray = parsed
            } else {
              imgArray = str.split(',')
            }
          } catch (e) {
            imgArray = str.split(',')
          }
        } else {
          imgArray = str.split(',')
        }
      }

      form.coverImages = imgArray
        .map(url => typeof url === 'string' ? url.trim() : '')
        .filter(url => url.length > 0)
      
      cherryInstance.setValue(data.content || '')
    } else {
      ElMessage.error(res?.message || '加载文章失败')
    }
  } catch (e) {
    console.error(e)
    ElMessage.error('加载文章失败')
  } finally {
    loading.value = false
  }
}

// 图片上传
const uploadHeaders = computed(() => {
  const token = localStorage.getItem('auth_token')
  return { token: token, Authorization: token }
})

const handleUploadSuccess: UploadProps['onSuccess'] = (response) => {
  const url = response?.data?.url || response?.url || response?.imageUrl
  if (url) {
    form.coverImages.push(url)
    ElMessage.success('上传成功')
  } else {
    ElMessage.error('上传失败')
  }
}

const removeImage = (index: number) => {
  form.coverImages.splice(index, 1)
}

// 保存
const save = async () => {
  if (!cherryInstance) return
  const content = cherryInstance.getValue()

  if (!form.title) return ElMessage.warning('请输入文章标题')
  // if (!form.categoryName) return ElMessage.warning('请输入分类') // 暂时注释，防止后端不支持

  loading.value = true

  // 构造符合后端 NewsPort 实体类的 Payload
  // 注意：后端 update 接口接收的是 NewsPort 对象
  const payload: any = {
    title: form.title,
    authorId: form.authorId, // 确保后端 NewsPort 有这个字段
    status: form.status,
    content: content,
    // 关键：后端 NewsPort 实体类里叫什么？通常是 coverImages 或 coverImage
    // 根据之前的 DTO 代码，后端似乎用的是 coverImages
    coverImages: form.coverImages.join(','), 
    
    // 如果后端 NewsPort 实体类里没有 categoryName 字段，传这个会导致 400 错误
    // 建议：如果后端支持自动根据名字创建分类，请确认实体类是否有 categoryName
    // 否则，这里可能需要先调用分类接口获取 ID，再传 categoryId
    // 暂时尝试传 categoryName，如果报错，请注释掉下面这行
    categoryName: form.categoryName, 
  }
  
  if (form.id) {
    payload.id = form.id
  }

  console.log('发送更新请求参数:', payload) // 调试用

  try {
    const api = form.id ? updatePortApi : addPortApi
    const res = await api(payload)
    if (res?.code === 1 || res?.code === 200) {
      ElMessage.success(form.id ? '更新成功' : '发布成功')
      router.push('/port')
    } else {
      ElMessage.error(res?.message || '保存失败')
    }
  } catch (e) {
    console.error(e)
    ElMessage.error('请求出错')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="editor-layout" v-loading="loading">
    <!-- 顶部导航栏 -->
    <header class="editor-header">
      <div class="header-left">
        <el-button circle class="back-btn" @click="router.back()">
          <el-icon><ArrowLeft /></el-icon>
        </el-button>
        <div class="breadcrumb">
          <span class="crumb-root">文章管理</span>
          <span class="crumb-sep">/</span>
          <span class="crumb-current">{{ form.id ? '编辑内容' : '新建内容' }}</span>
        </div>
      </div>
      <div class="header-right">
        <div class="status-badge" :class="{ published: form.status === 1 }">
          {{ form.status === 1 ? '已发布' : '草稿状态' }}
        </div>
        <el-button type="primary" round class="save-btn" @click="save">
          {{ form.id ? '更新文章' : '发布文章' }}
        </el-button>
      </div>
    </header>

    <div class="editor-body">
      <!-- 左侧：沉浸式编辑区 -->
      <div class="main-column">
        <div class="paper-sheet">
          <input
            v-model="form.title"
            class="naked-title-input"
            placeholder="请输入文章标题..."
            autocomplete="off"
          />
          <div class="markdown-container-wrapper">
            <div id="markdown-container"></div>
          </div>
        </div>
      </div>

      <!-- 右侧：功能侧边栏 -->
      <div class="sidebar-column">
        
        <!-- 1. 封面图画廊 -->
        <div class="sidebar-card gallery-card">
          <div class="card-title">
            <el-icon><Picture /></el-icon> 封面画廊
          </div>
          
          <div class="gallery-grid">
            <div 
              v-for="(img, index) in form.coverImages" 
              :key="index" 
              class="gallery-item"
            >
              <el-image 
                :src="img" 
                fit="cover" 
                class="gallery-img"
                :preview-src-list="form.coverImages"
                :initial-index="index"
              />
              <div class="gallery-overlay">
                <div class="delete-btn" @click="removeImage(index)">
                  <el-icon><Delete /></el-icon>
                </div>
              </div>
            </div>

            <!-- 上传按钮 -->
            <el-upload
              class="gallery-uploader"
              action="/api/admin/user/uploadImage"
              name="image"
              :show-file-list="false"
              :headers="uploadHeaders"
              :on-success="handleUploadSuccess"
              accept="image/*"
            >
              <div class="upload-trigger">
                <el-icon class="upload-icon"><Plus /></el-icon>
                <span class="upload-text">添加封面</span>
              </div>
            </el-upload>
          </div>
          <div class="card-tip">建议尺寸 16:9，支持多图轮播</div>
        </div>

        <!-- 2. 基础信息 (作者 & 分类) -->
         <div class="sidebar-card">
          <div class="card-title">基础信息</div>
          
          <!-- 作者展示 (只读) -->
          <div class="author-display">
            <div class="author-avatar">
              <img 
                v-if="form.authorAvatar" 
                :src="form.authorAvatar" 
                class="real-avatar" 
                alt="author"
              />
              <el-icon v-else><UserFilled /></el-icon>
            </div>
            <div class="author-info">
              <div class="label">发布作者</div>
              <div class="name">{{ form.authorName }}</div>
            </div>
          </div>

          <div class="divider"></div>

          <!-- 分类输入 (改为 Input) -->
          <div class="form-group">
            <div class="label">文章分类</div>
            <el-input 
              v-model="form.categoryName" 
              placeholder="请输入分类名称" 
              class="stylish-input"
            />
          </div>
        </div>

        <!-- 3. 发布设置 -->
        <div class="sidebar-card">
          <div class="card-title">发布设置</div>
          <div class="status-toggle">
            <div 
              class="toggle-item" 
              :class="{ active: form.status === 0 }"
              @click="form.status = 0"
            >
              草稿
            </div>
            <div 
              class="toggle-item" 
              :class="{ active: form.status === 1 }"
              @click="form.status = 1"
            >
              正式发布
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* 全局布局 */
.editor-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

/* 顶部导航 */
.editor-header {
  height: 64px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-btn {
  border: none;
  background: #f0f2f5;
  color: #606266;
  transition: all 0.3s;
}
.back-btn:hover {
  background: #e6e8eb;
  color: #303133;
}

.breadcrumb {
  font-size: 14px;
  color: #909399;
  display: flex;
  align-items: center;
  gap: 8px;
}
.crumb-current {
  color: #303133;
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-badge {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  background: #e9e9eb;
  color: #909399;
  font-weight: 500;
}
.status-badge.published {
  background: #e1f3d8;
  color: #67c23a;
}

.save-btn {
  padding: 10px 24px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
  transition: transform 0.2s;
}
.save-btn:active {
  transform: scale(0.98);
}

/* 主体区域 */
.editor-body {
  flex: 1;
  display: flex;
  overflow: hidden;
  padding: 24px;
  gap: 24px;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
}

/* 左侧编辑区 */
.main-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; /* 防止 flex 子项溢出 */
}

.paper-sheet {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: 1px solid #fff;
}

.naked-title-input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 32px;
  font-weight: 700;
  padding: 32px 40px 20px;
  color: #1a1a1a;
  background: transparent;
}
.naked-title-input::placeholder {
  color: #dcdfe6;
}

.markdown-container-wrapper {
  flex: 1;
  overflow: hidden;
  padding: 0;
}

/* 右侧侧边栏 */
.sidebar-column {
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  padding-bottom: 20px;
}

.sidebar-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  border: 1px solid rgba(0,0,0,0.02);
  transition: transform 0.3s, box-shadow 0.3s;
}
.sidebar-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.06);
}

.card-title {
  font-size: 15px;
  font-weight: 700;
  color: #303133;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 画廊样式优化 */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2列，更大 */
  gap: 12px;
}

.gallery-item {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.gallery-img {
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
}
.gallery-item:hover .gallery-img {
  transform: scale(1.1);
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}
.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.delete-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #fff;
  color: #f56c6c;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
}
.delete-btn:hover {
  transform: scale(1.1);
}

.gallery-uploader {
  grid-column: span 2; /* 上传按钮占满一行 */
}

.upload-trigger {
  width: 100%;
  height: 48px;
  border: 2px dashed #e4e7ed;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #909399;
  cursor: pointer;
  transition: all 0.3s;
  background: #fafafa;
}
.upload-trigger:hover {
  border-color: #409eff;
  color: #409eff;
  background: #ecf5ff;
}
.card-tip {
  font-size: 12px;
  color: #c0c4cc;
  margin-top: 12px;
  text-align: center;
}

/* 作者信息样式 */
.author-display {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: #f5f7fa;
  border-radius: 8px;
}
.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #d9ecff;
  color: #409eff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  overflow: hidden; /* 确保图片圆角 */
  flex-shrink: 0;
}

/* 新增：真实头像图片样式 */
.real-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info .label {
  font-size: 12px;
  color: #909399;
}
.author-info .name {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

.divider {
  height: 1px;
  background: #ebeef5;
  margin: 16px 0;
}

.form-group .label {
  font-size: 13px;
  color: #606266;
  margin-bottom: 8px;
}

.stylish-input {
  width: 100%;
}
.stylish-input :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6 inset;
  border-radius: 8px;
}

/* 状态切换 */
.status-toggle {
  display: flex;
  background: #f0f2f5;
  padding: 4px;
  border-radius: 8px;
}
.toggle-item {
  flex: 1;
  text-align: center;
  padding: 8px;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s;
}
.toggle-item.active {
  background: #409eff;
  color: #fff;
}
.toggle-item:not(.active):hover {
  background: #e6e8eb;
  color: #303133;
}
</style>