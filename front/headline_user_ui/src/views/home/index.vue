<!-- 查看文章的首页 -->
<script setup>
import Heart from '@/asset/img/Love.svg'
import Loved from '@/asset/img/lamb-love.svg'
import { onMounted, ref, nextTick } from 'vue'
import { Comment, View } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useAnimationTransitionStore } from '@/stores';
import request from '@/utils/axios/main.js'
import { ElMessage } from 'element-plus'
import { ensureLogin } from '@/utils/axios/auth.js'

defineOptions({
  name: 'HomePage'
})

const router = useRouter()
// 设置动画的过度方向

const animationTransitionStore = useAnimationTransitionStore()
const { setTransitionDirection } = animationTransitionStore


const articleList = ref([])

// 获取文章列表数据
const getArticleList = async () => {
  try {
    const res = await request.get('/user/news', {
      params: { pageNum: 1, pageSize: 20 },
      skipAuthRedirect: true 
    })

    // 若后端仍返回 code 判定
    const list = res?.data?.list ?? res?.data ?? res?.rows ?? res ?? []
    articleList.value = (Array.isArray(list) ? list : []).map((item) => {
      // --- 修复封面图解析逻辑 ---
      let images = []
      // 兼容后端可能返回的字段名: coverImages 或 coverImage
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
        avatarUrl: item.avatar_url ?? item.avatarUrl ?? item.authorAvatar ?? '', // 增加 authorAvatar 兼容
        authorName: item.authorName ?? item.source ?? '匿名用户',
      }
    })
  } catch (error) {
    if (error?.response?.status === 401) {
      ElMessage.warning('该接口目前要求登录，需后端放开匿名访问')
    } else {
      ElMessage.error('获取文章列表失败')
    }
  }
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

// 动态计算gap
const containerRef = ref(null)
const gapWidth = ref(null)
const coverImagesDisplayRef = ref([])

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

onMounted(async () => {
  await getArticleList() // 页面加载时获取数据

  // 等待 DOM 更新后再计算样式
  nextTick(() => {
    if (containerRef.value && coverImagesDisplayRef.value.length > 0) {
      gapWidth.value = (containerRef.value.offsetWidth - 20 - 300) / 2
      coverImagesDisplayRef.value.forEach((singleImageDisplayRef) => {
        if (singleImageDisplayRef) {
          singleImageDisplayRef.style.setProperty('--dynamic-gap', gapWidth.value + 'px')
        }
      })
    }
  })
})
</script>

<template>

  <div ref="containerRef" class="allContentContainer">

    <!-- 显示空状态 -->
    <el-empty v-if="articleList.length === 0" description="暂无文章内容"></el-empty>

    <div class="singleArticle" v-for="article in articleList" :key="article.hid || article.id">
      <!-- 发帖人信息展示 -->
      <div class="userInfoContainer" @click="jumpToArticleDetail(article.hid || article.id)">
        <div class="authorImage">
          <img style="width: 40px; height: 40px; object-fit: cover; border-radius: 999px;"
               :src="article.avatarUrl || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
               alt="用户头像">
        </div>
        <div class="postTimeAndAuthorName">
          <div class="authorName">
            <span>
              {{ article.authorName || '匿名用户' }}
            </span>
          </div>
          <div class="postTime">
            <span>
              {{ article.createTime || article.createdAt }} · 发布了该帖子
            </span>
          </div>
        </div>
      </div>

      <!-- 标题展示 -->
      <div class="articleTitleContainer" @click="jumpToArticleDetail(article.hid || article.id)">
        {{ article.title }}
      </div>

      <!-- 摘要展示 -->
      <div class="summaryContailer" @click="jumpToArticleDetail(article.hid || article.id)">
        {{ article.content ? article.content.substring(0, 50) + '...' : '' }}
      </div>

      <!-- 封面展示 (只有当 coverImages 存在且有内容时才渲染) -->
      <div
        v-if="article.coverImages && article.coverImages.length > 0"
        ref="coverImagesDisplayRef"
        class="coverImageDisplay"
      >
        <!-- 最后一张图片的话添加一个类，这个类可以让内部元素进行堆叠 -->
        <div
          :class="{singleCoverContainer: true, additionalInfoImage: (index === 2 && article.coverImages.length > 3)? true: false}"
          v-for="(image, index) in (article.coverImages.length > 3? article.coverImages.slice(0, 3) : article.coverImages)"
          :key="image"
        >
          <el-image
            class="previewCoversInHome"
            :src="image"
            fit="cover"
            :preview-src-list="article.coverImages"
            :initial-index="index"
            :hide-on-click-modal="true"

          />
          <div class="additionalInfo" v-show="index === 2 && article.coverImages.length > 3? true: false">
            <span>共{{ article.coverImages.length }}张</span>
          </div>
        </div>
      </div>

      <!-- 底部的评论等功能 -->
      <div class="otherComponents">
        <div class="componentsCommonStyle">
          <el-icon color="rgba(0, 0, 0, 0.3)"><View/></el-icon>
          <span>{{ article.pageViews || article.viewCount || 0 }}</span>
        </div>

        <div class="likedAndCommentComponent">
          <div class="componentsCommonStyle" @click.stop="handleLike(article)">
            <img v-if="!article.isLiked" :src="Heart" style="width: 16px; height: 16px;" alt="" >
            <img v-else :src="Loved" style="width: 16px; height: 16px;" alt="">
            <span>{{ article.likes || article.likeCount || 0 }}</span>
          </div>

          <div class="componentsCommonStyle">
            <el-icon color="rgba(0, 0, 0, 0.3)"><Comment/></el-icon>
            <span>{{ article.commentCount || 0 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.allContentContainer {
  background-color: rgba(0, 0, 0, 0.2);
  background-size: cover;
  background-position: center;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 100%;
  overflow-y: scroll;
}
.headlineHeaderSearch {
  display: flex;
  flex-direction: row;
}
.singleArticle {
  padding: 10px 10px 10px 10px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.userInfoContainer {
  display: flex;
  flex-direction: row;
  align-content: center;
  gap: 20px;
  cursor: pointer;
}

.postTimeAndAuthorName {
  display: flex;
  flex-direction: column;
}
.authorName {
  color: rgb(82, 85, 87);
}
.postTime {
  color: rgb(189, 197, 203);
  font-size: 12px;
}
.articleTitleContainer {
  font-size: 20px;
  font-weight: 600;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  cursor: pointer;
}
.summaryContailer {
  cursor: pointer;
  color: #666;
}
.coverImageDisplay {
  display: flex;
  flex-direction: row;
  /* 使用动态绑定图片间距 */
  gap: var(--dynamic-gap);
}
/* 最后一张图片并且长度大于3，需要进行说明 */
.additionalInfoImage {
  position: relative;
}
.previewCoversInHome {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
}
.additionalInfo {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 8px;
  color: white;
  padding:1px 3px 1px 3px;
  border-top-right-radius: 10px;
  background-color: rgba(0, 0, 0, 0.2);
}
.otherComponents {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
}
.componentsCommonStyle {
  color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
}
.likedAndCommentComponent {
  display: flex;
  flex-direction: row;
  gap: 15px;
}
</style>
