<script lang="ts" setup>
 import { ArrowLeft, MoreFilled, Promotion, ChatLineSquare, ArrowRight, View, Close } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, Ref, computed, ComputedRef } from 'vue'
import ScrollIsland from '@/components/ScrollIsland.vue'

import { storeToRefs } from 'pinia'
import { useArticleDetailStore, useCommentDetailStore } from '../../stores'
import { useAnimationTransitionStore } from '../../stores'

import instance from '@/utils/axios/main.js'
import { ElMessage } from 'element-plus'
import { ensureLogin } from '@/utils/axios/auth.js'
import MarkdownIt from 'markdown-it'
import Heart from '@/asset/img/Love.svg'
import Loved from '@/asset/img/lamb-love.svg'


defineOptions({
  name: 'ArticleDetailPage',
})

/**
 * 后端评论单条的结构约定
 */
type ArticleCommentType = {
  id: number
  postId: number
  userId: number
  nickName: string
  avatarUrl: string
  content: string
  parentId: number
  targetId: number
  targetName: string | null
  likeCount: number
  createTime: string
  liked: boolean
}

/**
 * 单个主评论+其子评论的结构
 */
type SingleMainCommentType = {
  mainCommentBody: ArticleCommentType
  underCommentBody: ArticleCommentType[]
}

/**
 * 文章详情页渲染使用的评论列表类型
 */
type ArticleCommentList = Array<SingleMainCommentType>

const route = useRoute()
const router = useRouter()

// 从路由上获取文章 id
const articleId = Number(route.query.articleId || route.query.id || 0)

// 动画方向
const animationTransitionStore = useAnimationTransitionStore()
const { setTransitionDirection } = animationTransitionStore

// 文章详情相关状态
const articleUserAvatarUrl = ref('')
const avatarUrl = ref('') // 当前登录用户头像
const articleUserName = ref('')
const publishTime = ref('')
const titleNameSelf = ref('')
const commentCount = ref(0)
const viewCount: Ref<number> = ref(0)
const categoryName = ref('')
const updateTime = ref('')
const likeCounts = ref(0)
const isLiked = ref(false) // 整篇文章是否被当前用户点赞
const parentId = ref(0)
const targetId = ref(0)
const userSelfId = ref(0)

// 浏览量展示友好格式
const viewCountContent: ComputedRef<string> = computed((): string => {
  if (viewCount.value >= 10000) {
    return (viewCount.value / 10000).toFixed(2).toString() + '万'
  }
  return viewCount.value.toString()
})

// 文章封面图 & 内容
const coverImagesSelf = ref<string[]>([])
const content = ref('')      // 原始 Markdown
const contentHtml = ref('')  // 渲染后的 HTML

// 评论输入框内容
const commentContent = ref('')

// markdown-it 实例
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

// 评论列表
const articleCommentList: Ref<ArticleCommentList> = ref([])

// Pinia store（分页）
const ArticleDetailStore = useArticleDetailStore()
const CommentDetailStore = useCommentDetailStore()
const { page, pageSize, totalCount } = storeToRefs(CommentDetailStore)
const { setPage, setPageSize, setTotalCount } = CommentDetailStore

// 返回首页
const returnToHome = () => {
  setTransitionDirection('backward')
  router.push('/layout/home')
}

// ScrollIsland 开关
const scrollIslandEnabled = ref(true)

/**
 * 从后端拉取文章详情
 */
const fetchArticleDetail = async () => {
  if (!articleId) return
  try {
    const res = await instance.get(`/user/news/${articleId}`)
    const detail = res as any

    // 标题 & 正文
    titleNameSelf.value = detail.title || ''
    content.value = detail.content || ''
    contentHtml.value = md.render(content.value)

    // 封面图解析
    if (typeof detail.cover_images === 'string') {
      try {
        const arr = JSON.parse(detail.cover_images)
        coverImagesSelf.value = Array.isArray(arr) ? arr : []
      } catch {
        coverImagesSelf.value = []
      }
    } else if (Array.isArray(detail.cover_images)) {
      coverImagesSelf.value = detail.cover_images
    } else if (Array.isArray(detail.coverImages)) {
      coverImagesSelf.value = detail.coverImages
    } else if (typeof detail.coverImages === 'string') {
      try {
        const arr = JSON.parse(detail.coverImages)
        coverImagesSelf.value = Array.isArray(arr) ? arr : []
      } catch {
        coverImagesSelf.value = []
      }
    } else {
      coverImagesSelf.value = []
    }

    // 作者信息
    articleUserName.value = detail.authorName || detail.author_name || ''
    articleUserAvatarUrl.value = detail.avatarUrl || detail.avatar_url || ''

    publishTime.value = detail.create_time || detail.createTime || ''
    updateTime.value = detail.update_time || detail.updateTime || ''

    // 浏览量兼容多种命名
    viewCount.value = detail.view_count ?? detail.viewCount ?? detail.ViewCount ?? 0

    // 文章总点赞数 & 是否已点赞（如果后端有的话）
    likeCounts.value = detail.like_count ?? detail.likeCount ?? 0
    if (typeof detail.liked === 'boolean') {
      isLiked.value = detail.liked
    }

    // 评论总数
    commentCount.value = detail.comment_count ?? detail.commentCount ?? 0
  } catch (e) {
    ElMessage.error('获取文章详情失败')
    console.error(e)
  }
}

/**
 * 增加浏览量
 */
const addViewCount = async () => {
  if (!articleId) return
  try {
    const res = await instance.post(`/user/news/${articleId}/view`)
    const data = res as any
    const v = data.ViewCount ?? data.viewCount
    if (typeof v === 'number') {
      viewCount.value = v
    }
  } catch (e) {
    console.error('增加浏览量失败', e)
  }
}

/**
 * 从后端拉取评论列表（含楼中楼）
 */
const fetchArticleComments = async () => {
  if (!articleId) return
  try {
    const res = await instance.get(`/user/news/${articleId}/comments`, {
      params: { page: page.value, size: pageSize.value },
    })

    const payload = res as any
    
    // === 1. 兼容多种后端返回格式 ===
    let rawList: any[] = []
    if (Array.isArray(payload)) {
      rawList = payload
    } else if (Array.isArray(payload.list)) {
      rawList = payload.list
    } else if (Array.isArray(payload.data)) {
      rawList = payload.data
    } else if (payload.data && Array.isArray(payload.data.list)) {
      rawList = payload.data.list
    }

    // === 2. 数据清洗：给缺失的字段加上默认值 (关键步骤) ===
    rawList = rawList.map((item: any) => {
      // 昵称兜底
      const finalNickName = item.nickName || item.nickname || item.userName || item.user_name || `用户${item.userId || item.user_id || '未知'}`
      // 头像兜底
      const finalAvatar = item.avatarUrl || item.avatar_url || item.headImg || item.head_img || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      return {
        ...item,
        nickName: finalNickName,
        avatarUrl: finalAvatar,
        id: item.id || item.commentId,
        userId: item.userId || item.user_id,
        likeCount: item.likeCount || item.like_count || 0,
        createTime: item.createTime || item.create_time || ''
      }
    })

    // === 3. 构建层级结构 (将扁平列表转为树形) ===
    const result: ArticleCommentList = []
    const rootMap = new Map<number, SingleMainCommentType>()
    const idMap = new Map<number, ArticleCommentType>()
    
    // 建立 ID 索引
    rawList.forEach((c: any) => idMap.set(c.id, c))
    
    // 辅助函数：找根节点 ID
    const findRootId = (currentId: number): number | null => {
      const c = idMap.get(currentId)
      if (!c) return null
      if (!c.parentId || c.parentId === 0) return c.id
      return findRootId(c.parentId)
    }

    // 第一遍：收集根评论
    rawList.forEach((c: any) => {
      if (!c.parentId || c.parentId === 0) {
        const item: SingleMainCommentType = { mainCommentBody: c, underCommentBody: [] }
        result.push(item)
        rootMap.set(c.id, item)
      }
    })

    // 第二遍：收集子评论
    rawList.forEach((c: any) => {
      if (c.parentId && c.parentId !== 0) {
        // 补全 targetName (如果后端没给)
        if (!c.targetName && c.targetId) {
           const target = idMap.get(c.targetId)
           if (target) c.targetName = target.nickName
        }

        const rootId = findRootId(c.id)
        if (rootId && rootMap.has(rootId)) {
          rootMap.get(rootId)!.underCommentBody.push(c)
        } else {
          // 孤儿评论处理
          if (!rootMap.has(c.id)) {
            const item: SingleMainCommentType = { mainCommentBody: c, underCommentBody: [] }
            result.push(item)
            rootMap.set(c.id, item)
          }
        }
      }
    })

    articleCommentList.value = result
    
    const total = payload.total || (payload.data && payload.data.total) || rawList.length || 0
    setTotalCount(total)
    commentCount.value = total
  } catch (e) {
    ElMessage.error('获取评论失败')
    console.error(e)
  }
}

// 抽屉中显示的那条主评论
const underCommentDrawerDisplay = ref(false)

/**
 * 防止模板访问 null 报错的空对象
 */
const emptyComment: SingleMainCommentType = {
  mainCommentBody: {
    id: 0,
    postId: 0,
    userId: 0,
    nickName: '',
    avatarUrl: '',
    content: '',
    parentId: 0,
    targetId: 0,
    targetName: null,
    likeCount: 0,
    createTime: '',
    liked: false,
  },
  underCommentBody: [],
}

const el_drawerDisplayCommentInfoLists: Ref<SingleMainCommentType> = ref(emptyComment)

const openUnderCommentDisplayPart = (mainCommentIndex: number) => {
  el_drawerDisplayCommentInfoLists.value = articleCommentList.value[mainCommentIndex]
  underCommentDrawerDisplay.value = true
}

// 新增：用于悬浮窗显示当前回复对象
const replyingTarget = computed(() => {
  if (targetId.value && parentId.value) {
    const allComments = articleCommentList.value.flatMap(item => [item.mainCommentBody, ...item.underCommentBody])
    return allComments.find(c => c.id === targetId.value)
  }
  return null
})

// 新增：取消回复
function cancelReply() {
  parentId.value = 0
  targetId.value = 0
}
// 分页
const handleCommentSizeChange = (newPageSize: number) => {
  setPageSize(newPageSize)
  fetchArticleComments()
}

const handleCommentCurrentPageChange = (newPage: number) => {
  setPage(newPage)
  fetchArticleComments()
}

/**
 * 回复评论
 */
const handleReply = (comment: ArticleCommentType) => {
  if (!comment.parentId) {
    parentId.value = comment.id
    targetId.value = 0
  } else {
    parentId.value = comment.parentId
    targetId.value = comment.id
  }
  ElMessage.success(`正在回复：${comment.nickName}`)
}

/**
 * 发送评论
 */
const sendComment = async (articleId: number, pId: number = 0, tId: number = 0) => {
  const ok = await ensureLogin()
  if (!ok) return

  if (!userSelfId.value) {
     try {
        const raw = localStorage.getItem('login_user')
        if (raw) {
           const info = JSON.parse(raw)
           userSelfId.value = Number(info.userId || info.id || 0)
        }
     } catch(e) {}
  }

  if (!userSelfId.value) {
    ElMessage.error('用户信息失效，请退出后重新登录')
    return
  }

  if (!commentContent.value.trim()) {
    ElMessage.warning('请输入评论内容')
    return
  }

  try {
    const res = await instance.post('/user/news/post/sensitive', {
      content: commentContent.value,
    })
    const code = (res as any).code
    const data = (res as any).data

    if (code === 1) {
      if (data) {
        ElMessage.warning('当前内容中包含敏感词，请重新检查输入')
      } else {
        const nextRes = await instance.post(`/user/news/${articleId}/comments`, {
          content: commentContent.value,
          parentId: pId === 0 ? null : pId,
          targetId: tId === 0 ? null : tId,
          userId: userSelfId.value
        })

        const nextCode = (nextRes as any).code ?? (nextRes as any).Code ?? 1
        const nextMsg = (nextRes as any).message ?? (nextRes as any).msg ?? ''

        if (nextCode === 1 || nextCode === 200) {
          ElMessage.success(nextMsg || '评论成功！')
          commentContent.value = ''
          fetchArticleComments()
        } else {
          ElMessage.error(nextMsg || '评论失败')
        }
      }
    } else {
      ElMessage.error('发生错误：' + ((data && data.message) || '敏感词检测失败'))
    }
  } catch (err) {
    ElMessage.error('评论发送失败，请稍后重试')
    console.error(err)
  }
}

// 文章整体点赞（底部那个心）
const changeIsLiked = async () => {
  const ok = await ensureLogin()
  if (!ok) return
  if (!articleId) return

  const prevLiked = isLiked.value
  const prevCount = likeCounts.value ?? 0

  isLiked.value = !prevLiked
  likeCounts.value = prevCount + (prevLiked ? -1 : 1)

  try {
    const res = await instance.post(
      `/user/news/${articleId}/like`, 
      null,
      {
        params: {
          liked: prevLiked
        }
      }
    )
    
    const data = res as any

    if (data && typeof data.liked === 'boolean') {
      isLiked.value = data.liked
    }
    if (data && (typeof data.likeCount === 'number' || typeof data.like_count === 'number')) {
      likeCounts.value = data.likeCount ?? data.like_count
    }
  } catch (err) {
    isLiked.value = prevLiked
    likeCounts.value = prevCount
    ElMessage.error('操作失败，请稍后重试')
    console.error(err)
  }
}

// 轮播宽度
const sightWidth = ref(0)
const dynamicCoverImagesWidth: Ref<string> = ref('')

// 初始化
const initPage = async () => {
  await addViewCount()
  await fetchArticleDetail()
  fetchArticleComments()
}

onMounted(() => {
  try {
    const raw = localStorage.getItem('login_user')
     if (raw) {
      const info = JSON.parse(raw)
      avatarUrl.value = info.avatarUrl || info.avatar_url || info.headImg || ''
      const rawId = info.userId || info.id || info.uid
      userSelfId.value = rawId ? Number(rawId) : 0
    }
  } catch (e) {
    console.error('解析本地登录用户信息失败', e)
  }

  sightWidth.value = document.documentElement.clientWidth
  dynamicCoverImagesWidth.value = sightWidth.value - 30 + 'px'

  document.documentElement.style.setProperty('--dynamicCoverImagesWidth', dynamicCoverImagesWidth.value)
  document.documentElement.style.setProperty('--dynamicCoverImagesHeight', dynamicCoverImagesWidth.value)

  const saved = localStorage.getItem('enable_scroll_island')
  scrollIslandEnabled.value = saved === null ? true : saved === '1'

  initPage()
})
</script>

<template>
  <div class="allContentContainer">
    <!-- 顶部滚动进度条 -->
    <ScrollIsland
      v-if="scrollIslandEnabled"
      title="阅读进度"
    />

    <!-- 头部 -->
    <div class="header">
      <div class="leftHeaderContainer">
        <el-icon @click="returnToHome"><ArrowLeft /></el-icon>
        <span>返回</span>
      </div>
      <el-icon><MoreFilled /></el-icon>
    </div>

    <!-- 中间部分（文章 + 评论） -->
    <div class="middlePartDisplay">
      <!-- 文章部分 -->
      <div class="articleDisplay">
        <!-- 标题 -->
        <div class="articleTitleDisplay">
          <span>{{ titleNameSelf }}</span>
        </div>

        <!-- 作者区域 -->
        <div class="articleUserContainer">
          <img
            style="width: 35px; height: 35px; object-fit: cover; border-radius: 999px"
            :src="articleUserAvatarUrl || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
            alt=""
          />
          <div class="nameAndPublishTime">
            <span style="font-size: 14px">{{ articleUserName }}</span>
            <span style="font-size: 12px; color: rgba(0, 0, 0, 0.3)">{{ publishTime }}</span>
          </div>
        </div>

        <!-- 封面轮播 -->
        <div class="coverImagesDisplayPart" v-if="coverImagesSelf.length">
          <el-carousel
            class="el-carousel"
            indicator-position="outside"
            trigger="hover"
            :height="dynamicCoverImagesWidth"
          >
            <el-carousel-item
              v-for="(item, index) in coverImagesSelf"
              :key="item"
            >
              <el-image
                class="previewCoversInHome"
                :src="item"
                fit="cover"
                :preview-src-list="coverImagesSelf"
                :initial-index="index"
                :hide-on-click-modal="true"
              />
            </el-carousel-item>
          </el-carousel>
        </div>

        <!-- 正文内容（Markdown 转 HTML） -->
        <div
          class="articleContentDisplay"
          v-html="contentHtml"
        />

        <!-- 浏览量 + 更新时间 -->
        <div class="viewAndUpdateTime">
          <div class="viewCountDisplay">
            <el-icon color="rgba(0, 0, 0, 0.3)"><View /></el-icon>
            <span>{{ viewCountContent }}浏览</span>
          </div>
          <div class="updateTimeDisplay">
            <span>最近更新于 {{ updateTime }}</span>
          </div>
        </div>
      </div>

      <!-- 评论部分 -->
      <div class="commentDisplay">
        <div class="commentTitle">
          <span>评论</span>
          <span style="font-size: smaller; color: rgba(0, 0, 0, 0.3)">共{{ commentCount }}条</span>
        </div>

        <!-- 主评论列表 -->
        <div class="allCommentContainer">
          <div
            class="singleComment"
            v-for="(article, mainCommentIndex) in articleCommentList"
            :key="article.mainCommentBody.id"
          >
            <div class="mainInfo">
              <img
                class="commentPartAvatarImg"
                :src="article.mainCommentBody.avatarUrl || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
                alt=""
              />
              <div class="nameAndTimeAndContent">
                <div class="commentUserInfo">
                  <span>{{ article.mainCommentBody.nickName }}</span>
                  <span style="font-size: smaller; color: rgba(0, 0, 0, 0.3)">
                    {{ article.mainCommentBody.createTime }}
                  </span>
                </div>
                <div class="commentContent">
                  <span>{{ article.mainCommentBody.content }}</span>
                </div>

                <!-- 只保留回复按钮 -->
                <div class="replyAndLiked">
                  <div class="replyAndNumberDisplay" @click="handleReply(article.mainCommentBody)">
                    <el-icon size="20px"><ChatLineSquare /></el-icon>
                    <span>回复</span>
                  </div>
                </div>

                <!-- 子评论预览 -->
                <div
                  v-if="article.underCommentBody.length"
                  class="underCommentDisplayPreviewOne"
                >
                  <div class="firstReply">
                    <span style="font-size: 14px; color: #5ca4ed">
                      {{ article.underCommentBody[0].nickName }} :
                    </span>
                    <span style="font-size: 14px">{{ article.underCommentBody[0].content }}</span>
                  </div>
                  <div
                    class="replyCountAndIconDisplay"
                    @click="openUnderCommentDisplayPart(mainCommentIndex)"
                  >
                    <span>共{{ article.underCommentBody.length }}条回复</span>
                    <el-icon><ArrowRight /></el-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 子评论抽屉 -->
        <div class="drawerToDisplay">
          <el-drawer
            v-model="underCommentDrawerDisplay"
            :with-header="false"
            :modal="false"
            direction="btt"
            size="90%"
          >
            <div class="underCommentTitle">
              <el-icon @click="underCommentDrawerDisplay = false"><ArrowLeft /></el-icon>
              <span>评论详情</span>
            </div>

            <div class="innerCommentContainer">
              <!-- 抽屉内主评论 -->
              <div class="mainCommentDisplay">
                <img
                  class="commentPartAvatarImg"
                  :src="el_drawerDisplayCommentInfoLists.mainCommentBody.avatarUrl || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
                  alt=""
                />
                <div class="nameAndTimeAndContent">
                  <div class="commentUserInfo">
                    <span>{{ el_drawerDisplayCommentInfoLists.mainCommentBody.nickName }}</span>
                    <span style="font-size: smaller; color: rgba(0, 0, 0, 0.3)">
                      {{ el_drawerDisplayCommentInfoLists.mainCommentBody.createTime }}
                    </span>
                  </div>
                  <div class="commentContent">
                    <span>{{ el_drawerDisplayCommentInfoLists.mainCommentBody.content }}</span>
                  </div>
                  <div class="replyAndLiked">
                    <div class="replyAndNumberDisplay" @click="handleReply(el_drawerDisplayCommentInfoLists.mainCommentBody)">
                      <el-icon size="20px"><ChatLineSquare /></el-icon>
                      <span>回复</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 子评论标题 -->
              <div class="underCommentTitleAndReplyCount">
                <span>相关回复 共{{ el_drawerDisplayCommentInfoLists.underCommentBody.length }}条</span>
              </div>

              <!-- 子评论列表 -->
              <div class="underCommentContainer">
                <div
                  class="singleUnderCommentReply"
                  v-for="(underComment, underCommentIndex) in el_drawerDisplayCommentInfoLists.underCommentBody"
                  :key="underComment.id"
                >
                  <img
                    class="commentPartAvatarImg"
                    :src="underComment.avatarUrl || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
                    alt=""
                  />
                  <div class="nameAndTimeAndContent">
                    <div class="commentUserInfo">
                      <span>{{ underComment.nickName }}</span>
                      <span style="font-size: smaller; color: rgba(0, 0, 0, 0.3)">
                        {{ underComment.createTime }}
                      </span>
                    </div>

                    <div class="replyCommentContentContainer">
                      <span v-if="underComment.targetName">回复&nbsp;</span>
                      <span
                        v-if="underComment.targetName"
                        style="color: #5ca4ed"
                      >
                        @{{ underComment.targetName }}
                      </span>
                      <span v-if="underComment.targetName">: </span>
                      <span>{{ underComment.content }}</span>
                    </div>
                    <div class="replyAndLiked">
                      <div class="replyAndNumberDisplay" @click="handleReply(underComment)">
                        <el-icon size="20px"><ChatLineSquare /></el-icon>
                        <span>回复</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-drawer>
        </div>

        <!-- 分页条 -->
        <div class="pageManagement">
          <el-pagination
            v-model:current-page="page"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 20, 50]"
            size="default"
            background
            layout="sizes, prev, pager, next, jumper"
            :total="totalCount"
            :pager-count="5"
            :default-current-page="1"
            @size-change="handleCommentSizeChange"
            @current-change="handleCommentCurrentPageChange"
          />
        </div>
      </div>
    </div>

 <!-- 评论输入栏 -->
    <div class="comment-input-bar">

  <!-- 中间输入框 -->
  <el-input
    v-model="commentContent"
    class="comment-input"
    :placeholder="replyingTarget ? `回复 @${replyingTarget.nickName}` : '本公主来喵两句'"
    clearable
    @keydown.enter.native="sendComment(articleId, parentId, targetId)"
  />
  <!-- 右侧按钮组 -->
  <div class="comment-actions">
        <el-icon
          class="send-btn"
          :size="36"
          @click="sendComment(articleId, parentId, targetId)"
        >
          <Promotion />
        </el-icon>

        <el-button
          class="like-btn-button"
          type="text"
          circle
          size="medium"
          @click="changeIsLiked"
          aria-label="like"
        >
          <img :src="isLiked ? Loved : Heart" alt="like" class="like-img" />
        </el-button>

        <span class="like-num">{{ likeCounts }}</span>
      </div>
</div>

    <!-- 悬浮窗：显示当前是否为回复 -->
    <transition name="fade">
      <div v-if="replyingTarget" class="reply-float">
        正在回复 <span class="reply-nick">@{{ replyingTarget.nickName }}</span>
        <el-icon class="reply-cancel" @click="cancelReply"><Close /></el-icon>
      </div>
    </transition>
  </div>
</template>


<style scoped>
  .like-btn-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 8px;
  background: transparent;
}

.like-img {
  display: block;
  width: 22px;
  height: 22px;
  object-fit: contain;
  pointer-events: none; 
  transition: transform 0.12s ease, filter 0.12s ease;
  transform-origin: center;
}
.like-btn-button:hover .like-img { 
  transform: scale(1.06); 
}

.allContentContainer {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.leftHeaderContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgb(191, 191, 191);
}
.middlePartDisplay {
  flex: 1 1 auto;
  overflow: scroll;
  min-height: 0;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.articleDisplay {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 30px;
  border-bottom: 1px solid #333;
}
.articleUserContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.nameAndPublishTime {
  display: flex;
  flex-direction: column;
}
.beautyBox {
  background-color: rgba(0, 0, 0, 0.1);
  width: fit-content;
  padding: 5px 10px;
  color: black;
  border-radius: 4px;
  display: flex;
  align-items: center;
}
.articleTitleDisplay {
  font-weight: 540;
  font-size: 20px;
  letter-spacing: 2px;
  line-height: 1.8;
}
.coverImagesDisplayPart {
  width: 100%;
}
.previewCoversInHome {
  height: calc(var(--dynamicCoverImagesHeight));
  width: calc(var(--dynamicCoverImagesWidth));
  display: flex;
  align-items: center;
}
.coverImagesDisplayPart img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
}
.articleContentDisplay {
  line-height: 1.8;
}
.viewAndUpdateTime {
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.4);
  font-size: 16px;
  line-height: 1.8;
  gap: 10px;
}
.viewCountDisplay {
  display: flex;
  align-items: center;
  gap: 5px;
}
.commentDisplay {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.commentTitle {
  display: flex;
  gap: 20px;
  align-items: center;
}
.allCommentContainer {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.singleComment {
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
}
.mainInfo {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.commentPartAvatarImg {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 999px;
}
.nameAndTimeAndContent {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
}
.commentUserInfo {
  display: flex;
  flex-direction: column;
}
.replyAndLiked {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: flex-end;
}
.replyAndNumberDisplay {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}
.likeActivateAndLikeCountDisplay {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3px;
}
.commentLikedIcon {
  height: 20px;
  width: 20px;
}
.underCommentTitleAndReplyCount {
  padding-top: 10px;
  padding-bottom: 10px;
  color: rgba(0, 0, 0, 0.2);
  font-size: 14px;
}
.underCommentContainer {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.singleUnderCommentReply {
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.underCommentDisplayPreviewOne {
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.015);
  border-radius: 10px;
  padding: 15px;
  gap: 15px;
}
.replyCountAndIconDisplay {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #5ca4ed;
}
.underCommentTitle {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.innerCommentContainer {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
}
.mainCommentDisplay {
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.pageManagement {
  display: flex;
  overflow: auto;
}
.userSelfFunctionDisplay {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.userSelfAvatar {
  width: 30px;
  height: 30px;
  border-radius: 999px;
}
.sendComponents {
  display: flex;
  align-items: center;
}
.userCommentInput {
  border-radius: 90px;
  width: 70vw;
  border: none;
}
.likeComponent {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  align-items: center;    /* 水平居中 */
  justify-content: center;
  gap: 2px;               /* 图标和数字之间的间距 */
  min-width: 40px;        /* 最小宽度，防止数字变化导致布局跳动 */
  cursor: pointer;        /* 鼠标变为手型 */
  margin-right: 10px;     /*稍微离右边一点*/
}
.LikedIcon {
  width: 28px;  
  height: 28px;
  transition: transform 0.2s; 
}

.likeComponent:active .LikedIcon {
  transform: scale(0.8); /* 点击时缩小 */
}

.likeComponent span {
  font-size: 12px;
  color: #666;
  line-height: 1;
}

/* 输入框样式 */
:deep(.sendComponents .el-input__wrapper) {
  background-color: #f5f7fa;
  border-radius: 10px;
  border: 2px solid #a2a6a9;
  color: #333;
  font-size: 16px;
}
:deep(.sendComponents .el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.6) inset;
}
:deep(.el-drawer__body) {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.allContentContainer {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

/* 头部 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #e6e6e6;
}

/* 中间可滚动区 */
.middlePartDisplay {
  flex: 1 1 auto;
  overflow: auto;
  padding: 16px;
}

/* 评论区基础 */
.commentDisplay { display: flex; flex-direction: column; gap: 18px; }

/* 评论输入栏：现代、简洁、对齐良好 */
.comment-input-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-top: 1px solid #eee;
  background: #fff;
  box-shadow: 0 -4px 18px rgba(11,20,40,0.03);
  position: sticky;
  bottom: 0;
  z-index: 30;
}

/* 输入框拉伸占位 */
.comment-input {
  flex: 1 1 auto;
  min-width: 0;
  --el-input-height: 44px;
  font-size: 15px;
}

/* 调整 element-plus input wrapper */
:deep(.comment-input .el-input__wrapper) {
  height: 44px;
  border-radius: 22px;
  background: #f7f9fb;
  border: 1px solid #e8eef6;
  padding: 6px 12px;
  box-shadow: none;
}

/* 按钮组对齐 */
.comment-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.comment-actions {
  display: flex;
  align-items: center;
  gap: 14px; /* 增大间距以配合更大按钮 */
}

/* 发送按钮放大 */
.send-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #409eff;
  cursor: pointer;
  padding: 10px; /* 增加点击区域 */
  border-radius: 8px;
  width: 44px;
  height: 44px;
}
.send-btn:hover { background: rgba(64,158,255,0.06); }

/* like 按钮放大 */
.like-btn-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px; /* 增大点击区域 */
  border-radius: 10px;
  background: transparent;
}

/* 心形图片变大 */
.like-img {
  display: block;
  width: 60px;
  height: 60px;
  object-fit: contain;
  pointer-events: none;
  transition: transform 0.12s ease, filter 0.12s ease;
  transform-origin: center;
}
.like-btn-button:hover .like-img { transform: scale(1.06); }

/* 点赞数字对齐微调 */
.like-num {
  font-size: 13px;
  color: #6b6b6b;
  min-width: 22px;
  text-align: center;
  line-height: 1;
  margin-left: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* 悬浮回复气泡 */
.reply-float {
  position: fixed;
  left: 50%;
  bottom: 84px;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 14px;
  padding: 8px 14px;
  box-shadow: 0 6px 26px rgba(18,30,60,0.08);
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
.reply-nick { color: #409eff; font-weight: 600; }
.reply-cancel { color: #999; cursor: pointer; }

/* 其它简洁调整（保持页面整洁） */
.commentPartAvatarImg { width: 40px; height: 40px; border-radius: 999px; object-fit: cover; }
.singleComment { padding-bottom: 12px; border-bottom: 1px solid #f0f0f0; }
.articleTitleDisplay { font-size: 20px; font-weight: 600; margin-bottom: 6px; }

/* 小屏自适应 */
@media (max-width: 420px) {
  .like-img { width: 20px; height: 20px; }
  :deep(.comment-input .el-input__wrapper) { height: 40px; border-radius: 20px; }
  .comment-input-bar { padding: 10px; }
}



</style>
