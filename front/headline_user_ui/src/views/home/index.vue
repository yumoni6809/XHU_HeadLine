<!-- 查看文章的首页 -->
<script setup>
import Heart from '@/asset/img/Love.svg'
import Loved from '@/asset/img/lamb-love.svg'
import { onMounted, ref } from 'vue'
import { Comment, View } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAnimationTransitionStore } from '@/stores'

defineOptions({
  name: 'HomePage'
})

const router = useRouter()
const route = useRoute()

// 设置动画的过度方向
const animationTransitionStore = useAnimationTransitionStore()
const { transitionDirection } = storeToRefs(animationTransitionStore)
const { setTransitionDirection } = animationTransitionStore

const articleList = ref([
{
    id: 10001,
    title: '纸上的魔法使：序章·失落的记忆',
    summary: '主角在一张古老的纸上醒来，却发现自己失去了关于现实世界的全部记忆，只能依靠纸上的“指令”一步步前进。',
    authorName: '明月栞那',
    avatarUrl: 'https://s2.loli.net/2025/11/18/XqS4kF6RnIZJLgm.png',
    coverImages: [
      'https://s2.loli.net/2025/11/18/CILJ3hmbwnvDP7g.png',
      'https://s2.loli.net/2025/11/18/p25hry4qZxauTjl.jpg'
    ],
    // 列表页仅展示 coverImages[0] 作为封面
    viewCount: 123,
    likeCount: 45,
    createdAt: '2025-11-28 10:00:00',
    commentCount: 1342
  },
  {
    id: 10002,
    title: '纸上的魔法使：第二章·被封印的图书馆',
    summary: '主角误入一座被封印的纸质图书馆，每翻开一页书，现实世界就会发生微小却不可逆的变化。',
    authorName: '白银绘里',
    avatarUrl: 'https://s2.loli.net/2025/05/22/HDWghSv3rqcLbx1.png',
    coverImages: [
      'https://s2.loli.net/2025/11/18/jSeigpch9N2UrsY.png',
      'https://s2.loli.net/2025/05/22/wmHnJlIOPbcBhfZ.png'
    ],
    viewCount: 256,
    likeCount: 78,
    createdAt: '2025-11-28 11:20:00',
    commentCount: 1145
  },
  {
    id: 10003,
    title: '纸上的魔法使：支线·墨迹中的分歧选择',
    summary: '一次看似普通的选择，让纸上的墨迹分裂成完全不同的两条时间线，玩家必须在其中做出抉择。',
    authorName: '九条雪',
    avatarUrl: 'https://s2.loli.net/2025/05/22/wRjJTzoLAUvdc9g.png',
    coverImages: [
      'https://s2.loli.net/2025/05/22/Sgdu4hrHm8e1iXN.png',
      'https://s2.loli.net/2024/04/08/d9IDqExftiYg4CA.png'
    ],
    viewCount: 342,
    likeCount: 96,
    createdAt: '2025-11-29 09:15:00',
    commentCount: 1919
  },
  {
    id: 10004,
    title: '世界观设定：纸之世界与现实世界的边界',
    summary: '介绍《纸上的魔法使》中“纸世界”与“现实世界”的对应关系，包括坐标映射、记忆回流以及结局分歧条件。',
    authorName: 'AkizukiKanna',
    avatarUrl: 'https://s2.loli.net/2025/05/22/LbpJY2R1WePIk7q.jpg',
    coverImages: [
      'https://s2.loli.net/2024/04/05/lToqV7gYhb8MAzI.png',
      'https://s2.loli.net/2024/04/05/lTO4ytFw35nSIMe.png'
    ],
    viewCount: 512,
    likeCount: 180,
    createdAt: '2025-11-29 14:30:00',
    commentCount: 91
  },
  {
    id: 10005,
    title: '开发札记：从纸上指令到对话式分支剧情',
    summary: '记录从最初的纯文字指令系统，演化到现在对话式分支结构的设计思路与踩过的坑。',
    authorName: '开发者日志',
    avatarUrl: 'https://s2.loli.net/2025/05/22/1294xDQiKMTcJUG.png',
    coverImages: [
      'https://s2.loli.net/2024/04/05/jlb5GyrfVamHd9z.webp',
      'https://s2.loli.net/2025/11/18/jSeigpch9N2UrsY.png',
      'https://s2.loli.net/2025/05/22/Sgdu4hrHm8e1iXN.png',
      'https://s2.loli.net/2025/05/22/qrUgRLaV97hxmy8.png'

    ],
    viewCount: 207,
    likeCount: 64,
    createdAt: '2025-11-30 08:45:00',
    commentCount: 1343
  },
  {
    id: 10006,
    title: '系统设定：好感度与“纸屑”资源的交互机制',
    summary: '详细说明游戏中好感度变化规则，纸屑的获取与消耗方式，以及对结局分支的影响。',
    authorName: '系统设计组',
    avatarUrl: 'https://s2.loli.net/2025/05/22/qrUgRLaV97hxmy8.png',
    coverImages: [
      'https://s2.loli.net/2025/11/18/p25hry4qZxauTjl.jpg',
      'https://s2.loli.net/2025/05/22/Sgdu4hrHm8e1iXN.png'
    ],
    viewCount: 389,
    likeCount: 120,
    createdAt: '2025-11-30 13:10:00',
    commentCount: 1342
  }
])


// 点击帖子标题和摘要跳转到帖子首页
const jumpToArticleDetail = (articleId)=> {
  // 前进动画
  setTransitionDirection('forward')

  router.push({
    path: '/article',
    // query: {
    //   id:articleId
    // }
  })
}

// 动态计算gap
const containerRef = ref(null)
const gapWidth = ref(null)
const coverImagesDisplayRef = ref(null)

// 定义是否点赞
const isLiked = ref(false)

// 定义处理点赞函数
const handleLike = ()=> {
  if (isLiked.value) {
    isLiked.value = false
  }
  else {
    isLiked.value = true
  }
}


onMounted(()=> {
  // gapWidth.value = coverImageDisplayRef.value.offsetWidth
  gapWidth.value = (containerRef.value.offsetWidth - 20 - 300) / 2
  coverImagesDisplayRef.value.forEach((singleImageDisplayRef)=> {
    singleImageDisplayRef.style.setProperty('--dynamic-gap', gapWidth.value + 'px' )
  })
})

</script>

<template>
  <div ref="containerRef" class="allContentContainer">
    <!--
    singleArticle:
      {
      "id": 10001,
      "title": "标题",
      "summary": "摘要...",
      "authorName": "张三",
      "coverImages": ["https://oss.../cover.jpg", "https://oss.../img1.jpg"],
      //列表页仅取 coverImages[0] 作为封面展示
      "viewCount": 123,
      "likeCount": 45,
      "createdAt": "2025-11-28 10:00:00"
    }
    -->
    <div class="singleArticle" v-for="article in articleList" :key="article.id">
      <!-- 发帖人信息展示 -->
      <div class="userInfoContainer" @click="jumpToArticleDetail()">
        <div class="authorImage">
          <img style="width: 40px; height: 40px; object-fit: cover; border-radius: 999px;" :src="article.avatarUrl" alt="用户头像">
        </div>
        <div class="postTimeAndAuthorName">
          <div class="authorName">
            <span>
              {{ article.authorName }}
            </span>
          </div>
          <div class="postTime">
            <span>
              {{ article.createdAt }} · 发布了该帖子
            </span>
          </div>
        </div>
      </div>

      <!-- 标题展示 -->
      <div class="articleTitleContainer" @click="jumpToArticleDetail()">
        {{ article.title }}
      </div>

      <!-- 摘要展示 -->
      <div class="summaryContailer" @click="jumpToArticleDetail()">
        {{ article.summary }}
      </div>

      <!-- 封面展示 -->
      <div ref="coverImagesDisplayRef" class="coverImageDisplay" @click="checkTheAllImage(article.coverImages)">

        <!-- 最后一张图片的话添加一个类，这个类可以让内部元素进行堆叠 -->
        <div
          :class="{singleCoverContainer: true, additionalInfoImage: (index === 2 && article.coverImages.length > 3)? true: false}"
          v-for="(image, index) in (article.coverImages.length > 3? article.coverImages.slice(0, 3) : article.coverImages)"
          :key="image"
        >
          <!-- <img class="previewCoversInHome" :src="image" alt="封面图片"> -->
          <el-image
            class="previewCoversInHome"
            :src="image"
            fit="cover"
            :preview-src-list="article.coverImages"
            :initial-index="index"
            hide-on-click-modal="true"
            show-progress="true"
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
          <span>{{ article.viewCount }}</span>
        </div>

        <div class="likedAndCommentComponent">
          <div class="componentsCommonStyle" @click="handleLike" >
            <img v-if="!isLiked" :src="Heart" style="width: 16px; height: 16px;" alt="" >
            <img v-else :src="Loved" style="width: 16px; height: 16px;" alt="">
            <span>{{ article.likeCount }}</span>
          </div>

          <div class="componentsCommonStyle">
            <el-icon color="rgba(0, 0, 0, 0.3)"><Comment/></el-icon>
            <span>{{ article.commentCount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style  scoped>
.allContentContainer {
  background-image: url('https://s2.loli.net/2025/05/22/wmHnJlIOPbcBhfZ.png');
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
}
.articleTitleContainer {
  font-size: 20px;
  font-weight: 600;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
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
}
.componentsCommonStyle {
  color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px
}
.likedAndCommentComponent {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
</style>
