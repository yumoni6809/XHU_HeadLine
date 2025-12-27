<script setup lang="ts">
import FileUpload from '@/components/FileUpload.vue'
import FileUploadGrid from '@/components/FileUploadGrid.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Edit } from '@element-plus/icons-vue'
import instance from '@/utils/axios/main.js'

const router = useRouter()

const globalBgUrl = ref('')
const showAvatarDialog = ref(false)
const activeTab = ref('my-posts')

const userInfo = ref({
  id: '',
  nickname: '未登录用户',
  avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
})
const signature = ref('这个人很懒，什么都没有写')

const myPosts = ref([])
const myComments = ref([])
const loading = ref(false)

onMounted(async () => {
  const storedGlobalBg = localStorage.getItem('backgroundImage')
  if (storedGlobalBg) {
    globalBgUrl.value = storedGlobalBg
  }

  const userRaw = localStorage.getItem('login_user')
  if (userRaw) {
    try {
      const u = JSON.parse(userRaw)
      userInfo.value.id = u.userId || u.id
      userInfo.value.avatar = u.avatarUrl || u.avatar || userInfo.value.avatar
      userInfo.value.nickname = u.nickname || u.username || userInfo.value.nickname
      await fetchUserInfo(userInfo.value.id)
    } catch (e) {
      console.error(e)
    }
  }

  const storedSig = localStorage.getItem('signature')
  if (storedSig) {
    signature.value = storedSig
  }

  if (userInfo.value.id) {
    await fetchMyContent()
  }
})

const fetchUserInfo = async (id: string | number) => {
  try {
    const res = await instance.get('/user/info', { params: { id } })
    const data = res.data || res
    if (data.code !== 0) {
      userInfo.value.nickname = data.nickname || data.username || userInfo.value.nickname
      userInfo.value.avatar = data.avatar || userInfo.value.avatar
    }
  } catch (e) {
    console.error('获取用户信息失败', e)
  }
}

// 头像上传
const handleAvatarChange = async (files: File[]) => {
  if (!files.length) return;
  const file = files[0];
  const formData = new FormData();
  formData.append('image', file);

  try {
    // 上传到 OSS
    const res = await instance.post('/user/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    const data = res.data || res;
    if (data.code === 1 && data.imageUrl) {
      // 上传成功后，更新用户表头像
      await instance.put('/user/info', {
        id: userInfo.value.id,
        avatar: data.imageUrl
      });
      userInfo.value.avatar = data.imageUrl;
      ElMessage.success('头像已更新');
      showAvatarDialog.value = false;
    } else {
      ElMessage.error(data.message || '上传失败');
    }
  } catch (err: any) {
    ElMessage.error(err.message || '上传失败');
  }
};


const fetchMyContent = async () => {
  loading.value = true
  try {
    const resPosts = await instance.get('/user/news', { params: { page: 1, size: 50 } })
    const list = resPosts.data?.list || resPosts.data || []
    if (Array.isArray(list)) {
      myPosts.value = list.filter((item: any) => {
        const authorId = item.authorId || item.userId || item.uid
        return String(authorId) === String(userInfo.value.id)
      }).map((item: any) => ({
        ...item,
        createTime: item.createTime || item.createdAt
      }))
    }

    // 获取评论
    const formData = new URLSearchParams()
    formData.append('userId', userInfo.value.id)
    const resComments = await instance.post('/user/comment/list', formData)
    const commentData = resComments.data || resComments

    if (Array.isArray(commentData)) {
      myComments.value = commentData.map((item: any) => ({
        ...item,
        postTitle: `帖子ID:${item.postId}`,
        postId: item.postId,
        content: item.content,
        createTime: item.createTime
      }))
    } else if (commentData.code === 1 && Array.isArray(commentData.data)) {
      myComments.value = commentData.data.map((item: any) => ({
        ...item,
        postTitle: `帖子ID:${item.postId}`,
        postId: item.postId,
        content: item.content,
        createTime: item.createTime
      }))
      } else {
      myComments.value = []
      console.warn('获取评论失败:', commentData.message)
      }
      } catch (e) {
        myComments.value = []
        console.error('获取内容异常', e)
      } finally {
        loading.value = false
      }
    }

const openAvatarUpload = () => {
  showAvatarDialog.value = true
}
const handleUploadClose = () => {
  showAvatarDialog.value = false
  if (userInfo.value.id) fetchUserInfo(userInfo.value.id)
}

const editSignature = () => {
  ElMessageBox.prompt('请输入新的个性签名', '修改签名', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: signature.value,
    inputPattern: /^.{0,50}$/,
    inputErrorMessage: '签名长度不能超过50个字符'
  }).then(({ value }) => {
    signature.value = value
    localStorage.setItem('signature', value)
    ElMessage.success('签名已更新')
  }).catch(() => {})
}

const handleEditPost = (post: any) => {
  router.push({ path: '/layout/addNewArticle', query: { id: post.id } });
  ElMessageBox.confirm('确定要修改这条帖子吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const { data } = await instance.post('/admin/port/delete', { id: post.id });
      if (data.code === 1) {
        ElMessage.success('删除成功');
        await fetchMyContent();
      } else ElMessage.error(data.message || '删除失败');
    })
    .catch(() => {});
 
};

const handleDeletePost = (post: any) => {
  ElMessageBox.confirm('确定要删除这条帖子吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const { data } = await instance.post('/admin/port/delete', { id: post.id });
      if (data.code === 1) {
        ElMessage.success('删除成功');
        await fetchMyContent();
      } else ElMessage.error(data.message || '删除失败');
    })
    .catch(() => {});
};

const handleDeleteComment = (comment: any) => {
  ElMessageBox.confirm('确定要删除这条评论吗？', '提示', {
     confirmButtonText: '确定',
     cancelButtonText: '取消',
     type: 'warning'
  }).then(async () => {
     try {
       const res = await instance.delete(`/user/news/comment/${comment.id}`)
       const data = res.data || res
       if (data.code === 1 || data.code === 200) {
         ElMessage.success('评论删除成功')
         const idx = myComments.value.findIndex((c: any) => c.id === comment.id)
         if (idx > -1) myComments.value.splice(idx, 1)
       } else {
         ElMessage.error(data.message || '删除失败')
       }
     } catch (e) {
       ElMessage.error('删除异常')
     }
  }).catch(() => {})
}

const goDetail = (id: number) => {
  if (id) router.push({ path: '/article', query: { id } });
};
</script>

<template>
  <div 
    class="profile-page"
    :style="globalBgUrl ? { backgroundImage: `url(${globalBgUrl})` } : {}"
  >
    <div class="profile-header">
      <div class="base-info">
        <div class="avatar-container" @click="openAvatarUpload">
          <img :src="userInfo.avatar" alt="用户头像" class="avatar">
          <div class="avatar-mask">更换</div>
        </div>
        <div class="user-info">
          <div class="nickname">{{ userInfo.nickname }}</div>
          <div class="signature" @click="editSignature" title="点击修改">
            {{ signature || '编辑个性签名' }} 
            <el-icon class="edit-icon"><Edit /></el-icon>
          </div>
        </div>
      </div>
    </div>

    <div class="main-container">
      <div class="tab-nav">
        <div 
          class="tab-item" 
          :class="{ active: activeTab === 'my-posts' }"
          @click="activeTab = 'my-posts'"
        >
          我的帖子
        </div>
        <div 
          class="tab-item" 
          :class="{ active: activeTab === 'my-comments' }"
          @click="activeTab = 'my-comments'"
        >
          我的评论
        </div>
      </div>

      <div class="content-wrap" v-loading="loading">
        <div v-if="activeTab === 'my-posts'" class="content-module">
          <el-empty v-if="myPosts.length === 0" description="暂无帖子" />
          <div v-else class="post-item" v-for="post in myPosts" :key="post.id">
            <div class="post-title" @click="goDetail(post.id || post.hid)">{{ post.title }}</div>
            <div class="post-content" @click="goDetail(post.id || post.hid)">
              {{ post.content ? post.content.replace(/<[^>]+>/g, '').substring(0, 100) + (post.content.length > 100 ? '...' : '') : '暂无摘要' }}
            </div>
            <div class="post-meta">
              <span>发布时间：{{ post.createTime }}</span>
              <span>浏览：{{ post.viewCount || 0 }}</span>
              <span>点赞：{{ post.likeCount || 0 }}</span>
            </div>
            <div class="post-actions">
              <div class="action-btn edit-btn" @click="handleEditPost(post)">编辑</div>
              <div class="action-btn delete-btn" @click="handleDeletePost(post)">删除</div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'my-comments'" class="content-module">
          <div style="margin-bottom:8px;color:#999;">评论数量：{{ myComments.length }}</div>
          <el-empty v-if="myComments.length === 0" description="暂无评论" />
          <div v-else class="comment-item" v-for="comment in myComments" :key="comment.id">
            <div class="comment-post-title" @click="goDetail(comment.postId)">
              回复帖子：{{ comment.postTitle }}
            </div>
            <div class="comment-content">
              {{ comment.content }}
            </div>
            <div class="comment-time">
              <span>评论时间：{{ comment.createTime }}</span>
              <span class="delete-link" @click="handleDeleteComment(comment)">删除</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      v-model="showAvatarDialog"
      title="修改头像"
      width="90%"
      max-width="500px"
      align-center
      class="avatar-dialog"
    >
      <div class="upload-container">
        <p class="upload-tip">请选择图片上传，上传成功后关闭窗口即可</p>
        <FileUpload @onChange="handleAvatarChange">
          <FileUploadGrid />
        </FileUpload>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleUploadClose">关闭并刷新</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>


<style scoped>
/* 全局样式重置适配 */
.profile-page {
  background-color: #f5f7fa;
  color: #333;
  line-height: 1.6;
  min-height: 100vh;
  padding-bottom: 100px; /* 底部留白给 Dock */
  
  /* 全站背景图样式 */
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

/* ---------------- 顶部个人信息区 ---------------- */
.profile-header {
  width: 100%;
  /* 移除模糊和背景色，完全透明 */
  background-color: transparent;
  backdrop-filter: none;
  padding: 40px 0;
  margin-bottom: 20px;
}

/* 个人基础信息 */
.base-info {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.avatar-container {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #fff;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  background: #fff;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 14px;
}

.avatar-container:hover .avatar-mask {
  opacity: 1;
}

.user-info {
  flex: 1;
}

.nickname {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
  /* 增加文字阴影以防背景图太花看不清 */
  text-shadow: 0 1px 3px rgba(255, 255, 255, 0.8);
}

.signature {
  font-size: 14px;
  color: #666;
  padding: 6px 12px;
  background: rgba(255,255,255,0.6);
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  border: 1px solid rgba(0,0,0,0.1);
  transition: all 0.3s;
}
.signature:hover {
  background: #fff;
  border-color: #409eff;
  color: #409eff;
}

/* ---------------- 主内容区：帖子/评论管理 ---------------- */
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 功能标签栏 */
.tab-nav {
  display: flex;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  border-bottom: 1px solid #eee;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 15px 0;
  font-size: 16px;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
  color: #666;
}

.tab-item:hover {
  color: #409eff;
}

.tab-item.active {
  color: #409eff;
  border-bottom: 3px solid #409eff;
  font-weight: 600;
}

/* 内容容器 */
.content-wrap {
  background: rgba(255, 255, 255, 0.9); /* 半透明白底 */
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 0 0 8px 8px;
  min-height: 500px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}

/* ---------------- 我的帖子样式 ---------------- */
.post-item {
  padding: 20px;
  border-bottom: 1px solid #eee;
  position: relative;
  transition: background 0.2s;
}
.post-item:hover {
  background: rgba(250, 250, 250, 0.8);
}

.post-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #1d2129;
  cursor: pointer;
}
.post-title:hover {
  color: #409eff;
}

.post-content {
  font-size: 14px;
  color: #4e5969;
  margin-bottom: 15px;
  line-height: 1.8;
  cursor: pointer;
}

.post-meta {
  font-size: 12px;
  color: #86909c;
  display: flex;
  gap: 20px;
}

.post-actions {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 15px;
}

.action-btn {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #eee;
  transition: all 0.2s;
}

.edit-btn {
  color: #409eff;
  border-color: #a0cfff;
  background: #ecf5ff;
}
.edit-btn:hover {
  background: #409eff;
  color: #fff;
}

.delete-btn {
  color: #f56c6c;
  border-color: #fab6b6;
  background: #fef0f0;
}
.delete-btn:hover {
  background: #f56c6c;
  color: #fff;
}

/* ---------------- 我的评论样式 ---------------- */
.comment-item {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.comment-post-title {
  font-size: 14px;
  color: #409eff;
  margin-bottom: 8px;
  cursor: pointer;
  font-weight: 500;
}

.comment-content {
  font-size: 14px;
  color: #4e5969;
  margin-bottom: 10px;
  background: #f7f8fa;
  padding: 10px;
  border-radius: 4px;
}

.comment-time {
  font-size: 12px;
  color: #86909c;
  display: flex;
  justify-content: space-between;
}

.delete-link {
  color: #f56c6c;
  cursor: pointer;
}
.delete-link:hover {
  text-decoration: underline;
}

.upload-tip {
  text-align: center;
  color: #909399;
  margin-bottom: 16px;
  font-size: 13px;
}

/* ---------------- 响应式适配 ---------------- */
@media (max-width: 768px) {
  .base-info {
    flex-direction: column;
    text-align: center;
  }
  .post-actions {
    position: static;
    margin-top: 10px;
    justify-content: flex-start;
  }
}
</style>