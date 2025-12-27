<!-- 查看文章的首页 -->
<script setup>
import Heart from '@/asset/img/Love.svg'
import Loved from '@/asset/img/lamb-love.svg'
import { onMounted, onUnmounted, ref } from 'vue'
import { Comment, View, Loading } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useAnimationTransitionStore } from '@/stores';
import request from '@/utils/axios/main.js'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'HomePage'
})

const router = useRouter()
// 设置动画的过度方向
const animationTransitionStore = useAnimationTransitionStore()
const { setTransitionDirection } = animationTransitionStore

const articleList = ref([])
const loading = ref(false) // 增加加载状态
const bgUrl = ref('') // 背景图片路径

// 文章查询分页
const page = ref(1)
const pageSize = 10
const hasMore = ref(true)
// 默认按时间排序，不显示切换按钮
const sort = ref('time')
const timeRange = ref('all')

// 获取文章列表数据
const getArticleList = async (reset = false) => {
  if (loading.value) return
  loading.value = true
  try {
    const params = { page: page.value, size: pageSize, sort: sort.value }
    // 新增：时间范围参数
    if (timeRange.value && timeRange.value !== 'all') {
      params.timeRange = timeRange.value
    }
    const res = await request.get('/user/news', {
      params,
      skipAuthRedirect: true 
    })
    const list = res?.data?.list ?? res?.data ?? res?.rows ?? res ?? []
    const articles = (Array.isArray(list) ? list : [])
      .map((item) => {
        let images = []
        const rawCover = item.coverImages || item.coverImage || ''
        if (Array.isArray(rawCover)) {
          images = rawCover
        } else if (typeof rawCover === 'string' && rawCover.trim() !== '') {
          const str = rawCover.trim()
          if (str.startsWith('[') && str.endsWith(']')) {
            try {
              images = JSON.parse(str)
            } catch (e) {
              images = str.split(',')
            }
          } else {
            images = str.split(',')
          }
        }
        return {
          ...item,
          coverImages: images.filter(url => url && typeof url === 'string' && url.length > 0),
          avatarUrl: item.avatar_url ?? item.avatarUrl ?? item.authorAvatar ?? '',
          authorName: item.authorName ?? item.source ?? '匿名用户',
          status: item.status !== undefined ? item.status : 1 
        }
      })
      .filter(item => item.status === 1)

    if (reset) {
      articleList.value = articles
    } else {
      articleList.value = [...articleList.value, ...articles]
    }
    hasMore.value = articles.length === pageSize
  } catch (error) {
    if (error?.response?.status === 401) {
      ElMessage.warning('该接口目前要求登录，需后端放开匿名访问')
    } else {
      console.error(error)
      ElMessage.error('获取文章列表失败')
    }
  } finally {
    loading.value = false
    setTimeout(() => {
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      if (hasMore.value && docHeight <= winHeight + 100 && articleList.value.length > 0) {
        page.value += 1
        getArticleList()
      }
    }, 100)
  }
}

// 监听 layout 的筛选条件变化
const onFilterChange = (e) => {
  const detail = e.detail || {}
  sort.value = detail.sort || 'time'
  timeRange.value = detail.timeRange || 'all'
  page.value = 1
  getArticleList(true)
}


// 点击帖子标题和摘要跳转到帖子首页
const jumpToArticleDetail = (articleId) => {
  if (!articleId) return
  // 前进动画
  setTransitionDirection('forward')

  router.push({
    path: '/article',
    query: {
      id: articleId
    }
  })
}

// 定义是否点赞 (这里暂时是前端模拟，实际应该调用接口)
const handleLike = (article) => {
  // 注意：这里修改的是单个文章的点赞状态，而不是全局变量
  // 实际开发中应该调用后端点赞接口
  if (article.isLiked) {
    article.isLiked = false
    article.likeCount = (article.likeCount || 0) - 1
  } else {
    article.isLiked = true
    article.likeCount = (article.likeCount || 0) + 1
  }
}

// 无限滚动加载更多
const handleScroll = () => {
  if (loading.value || !hasMore.value) return
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  const docHeight = document.documentElement.scrollHeight
  // 距离底部200px时自动加载
  if (scrollTop + windowHeight + 200 >= docHeight) {
    page.value += 1
    getArticleList()
  }
}

onMounted(async () => {
  const storedBg = localStorage.getItem('backgroundImage')
  if (storedBg) {
    bgUrl.value = storedBg
  }
  articleList.value = []
  page.value = 1
  hasMore.value = true
  await getArticleList(true)
  window.addEventListener('scroll', handleScroll)
  // 监听筛选事件
  window.addEventListener('homeFilterChange', onFilterChange)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('homeFilterChange', onFilterChange)
})
</script>

<template>
  <!-- 动态绑定背景样式 -->
  <div 
    class="allContentContainer"
    :style="bgUrl ? { backgroundImage: `url(${bgUrl})` } : { backgroundColor: '#ffffff' }"
  >
    <!-- 显示空状态 -->
    <el-empty v-if="!loading && articleList.length === 0" description="暂无文章内容"></el-empty>

    <!-- 文章列表 -->
    <div class="singleArticle" v-for="article in articleList" :key="article.hid || article.id">
      <!-- 发帖人信息展示 -->
      <div class="userInfoContainer" @click="jumpToArticleDetail(article.hid || article.id)">
        <div class="authorImage">
          <el-avatar 
            :size="40" 
            :src="article.avatarUrl || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
          />
        </div>
        <div class="postTimeAndAuthorName">
          <div class="authorName">
            {{ article.authorName || '匿名用户' }}
          </div>
          <div class="postTime">
            {{ article.createTime || article.createdAt }} · 发布
          </div>
        </div>
      </div>

      <!-- 标题展示 -->
      <div class="articleTitleContainer" @click="jumpToArticleDetail(article.hid || article.id)">
        {{ article.title }}
      </div>

      <!-- 摘要展示 -->
      <div class="summaryContailer" @click="jumpToArticleDetail(article.hid || article.id)">
        <!-- 去除HTML标签，只显示纯文本摘要 -->
        {{ article.content ? article.content.replace(/<[^>]+>/g, '').substring(0, 80) + (article.content.length > 80 ? '...' : '') : '' }}
      </div>

      <!-- 封面展示 (只有当 coverImages 存在且有内容时才渲染) -->
      <div
        v-if="article.coverImages && article.coverImages.length > 0"
        class="coverImageDisplay"
      >
        <!-- 限制最多显示3张，最后一张如果还有更多则显示遮罩 -->
        <div
          class="singleCoverContainer"
          v-for="(image, index) in (article.coverImages.length > 3 ? article.coverImages.slice(0, 3) : article.coverImages)"
          :key="image"
        >
          <el-image
            class="previewCoversInHome"
            :src="image"
            fit="cover"
            :preview-src-list="article.coverImages"
            :initial-index="index"
            hide-on-click-modal
            loading="lazy"
          />
          <!-- 更多图片提示遮罩 -->
          <div class="more-images-mask" v-if="index === 2 && article.coverImages.length > 3">
            <span>+{{ article.coverImages.length - 3 }}</span>
          </div>
        </div>
      </div>

      <!-- 底部的评论等功能 -->
      <div class="otherComponents">
        <div class="componentsCommonStyle">
          <el-icon><View/></el-icon>
          <span>{{ article.pageViews || article.viewCount || 0 }}</span>
        </div>

        <div class="likedAndCommentComponent">
          <div class="componentsCommonStyle" @click.stop="handleLike(article)">
            <img v-if="!article.isLiked" :src="Heart" class="action-icon" alt="like" >
            <img v-else :src="Loved" class="action-icon" alt="liked">
            <span>{{ article.likes || article.likeCount || 0 }}</span>
          </div>

          <div class="componentsCommonStyle">
            <el-icon><Comment/></el-icon>
            <span>{{ article.commentCount || 0 }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 三点跳动加载动画 -->
    <div v-if="loading" class="fancy-loading">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
    <div v-if="!hasMore && !loading" style="text-align:center;color:#aaa;font-size:13px;margin:16px 0;">
      没有更多了
    </div>
  </div>
</template>

<style scoped>
/* 整体容器 */
.allContentContainer {
  min-height: 100vh; /* 确保背景铺满屏幕 */
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  
  /* 背景图通用属性 */
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* 背景固定，内容滚动 */
  background-repeat: no-repeat;
}

/* 单个文章卡片：半透明设计 */
.singleArticle {
  padding: 16px;
  /* 半透明白色背景 */
  background-color: rgba(255, 255, 255, 0.85);
  /* 毛玻璃效果 (现代感) */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.6);
}

/* 用户信息区域 */
.userInfoContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.postTimeAndAuthorName {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
}

.authorName {
  color: #303133;
  font-weight: 600;
  font-size: 14px;
}

.postTime {
  color: #909399;
  font-size: 12px;
}

/* 标题区域 */
.articleTitleContainer {
  font-size: 17px;
  font-weight: bold;
  color: #303133;
  line-height: 1.4;
  cursor: pointer;
}

/* 摘要区域 */
.summaryContailer {
  cursor: pointer;
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 图片展示区域 */
.coverImageDisplay {
  display: flex;
  flex-direction: row;
  gap: 2%;
  margin-top: 4px;
}

/* 移动端适配的图片容器 */
.singleCoverContainer {
  position: relative;
  width: 32%;
  aspect-ratio: 1 / 1;
  height: auto;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.previewCoversInHome {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 更多图片遮罩 */
.more-images-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  pointer-events: none;
}

/* 底部操作栏 */
.otherComponents {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.componentsCommonStyle {
  color: #909399;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 13px;
}

.componentsCommonStyle:active {
  opacity: 0.7;
}

.likedAndCommentComponent {
  display: flex;
  flex-direction: row;
  gap: 16px;
}
.action-icon {
  width: 16px;
  height: 16px;
  height: 16px;
}

/* 点跳动动画 */
.fancy-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin: 16px 0;
}
.fancy-loading .dot {
  width: 10px;
  height: 10px;
  margin: 0 6px;
  border-radius: 50%;
  background: linear-gradient(135deg, #409EFF 60%, #67C23A 100%);
  animation: bounce 1.2s infinite;
  display: inline-block;
}
.fancy-loading .dot:nth-child(2) {
  animation-delay: 0.2s;
}
.fancy-loading .dot:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0);}
  40% { transform: translateY(-18px);}
}

</style>