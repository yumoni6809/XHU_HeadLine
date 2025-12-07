<script lang="ts" setup>
import { ArrowLeft, MoreFilled, Promotion, ChatLineSquare, ArrowRight } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, Ref, computed, ComputedRef } from 'vue';
import Heart from '@/asset/img/Love.svg'
import { useArticleDetailStore, useCommentDetailStore } from '../../stores';
import { storeToRefs } from 'pinia';
import { View } from '@element-plus/icons-vue';
import { useAnimationTransitionStore } from '../../stores';
import galgameImg from '@/asset/img/galgame.png'
import Loved from '@/asset/img/lamb-love.svg'
import instance from '@/utils/axios/main.js';
import { ElMessage } from 'element-plus';

defineOptions({
  name: 'ArticleDetailPage'
})

type ArticleCommentType = {
  id:number, // 评论id
  postId:number, // 帖子id
  userId:number, // 用户id
  nickName:string, // 用户昵称
  avatarUrl:string, // 用户头像
  content:string, // 评论内容
  parentId:number, // 父评论的id，默认为0，如果存在的话证明在某个评论id=parentId下有子回复
  targetId:number, // 想要回复的那个人的id,如果为0则代表不是回复，如果有的话需要加上对方的name，比如有的话就需要在前端渲染'回复@Miku'
  targetName:string | null, // 回复的那个人的昵称，有targetId就不为null
  likeCount:number, // 点赞数量
  createTime:string // 该评论的时间
  liked:boolean // 这条评论该用户是否点赞过
}

type SingleMainCommentType = {
  mainCommentBody:ArticleCommentType,
  underCommentBody:ArticleCommentType[]
}

type ArticleCommentList = Array<SingleMainCommentType> // ArticleCommentList就是主页面所要渲染的评论

const route = useRoute()     // 当前路由对象（取参用）
const router = useRouter()   // 路由实例（跳转用）

// 设置动画的过度方向
const animationTransitionStore = useAnimationTransitionStore()
const { transitionDirection } = storeToRefs(animationTransitionStore)
const { setTransitionDirection } = animationTransitionStore

// 定义store实例
// return {
//     singleArticleInfo,
//     resetSingleArticleDetailInfo,
//     setSingleArticleDetailInfoFromEndData
//   }

// return {
//     page,
//     size,
//     commentCountList,
//     resetCommentCountList,
//     setCommentCountListFromEndData
//   }
const ArticleDetailStore = useArticleDetailStore()
const CommentDetailStore = useCommentDetailStore()
const { singleArticleInfo, statusToDescription } =storeToRefs(ArticleDetailStore)
const { resetSingleArticleDetailInfo, setSingleArticleDetailInfoFromEndData } = ArticleDetailStore
const { page,  pageSize, totalCount,commentCountList} = storeToRefs(CommentDetailStore)
const { resetCommentCountList, setCommentCountListFromEndData, setPage, setPageSize, setTotalCount, getEndDataByFrontDataAndSet } = CommentDetailStore

const articleId = Number(route.query.articleId)
const commentContent = ref('')

// 点击返回按钮返回至首页
const returnToHome = ()=> {
  // 后退动画
  setTransitionDirection('backward')

  router.push('/layout/home')
}

// 设置是否点赞
const changeIsLiked = ():void=> {
  if (isLiked.value) {
    isLiked.value = false
  }else {
    isLiked.value = true
  }
}


// 下面这些都是测试用的数据
const articleUserAvatarUrl = ref('https://s2.loli.net/2025/05/22/qrUgRLaV97hxmy8.png')
const avatarUrl = ref('https://s2.loli.net/2025/11/18/XqS4kF6RnIZJLgm.png')
const articleUserName = ref('朝比奈真冬')
const publishTime = ref('2025年12月1日 20:00')
const titleNameSelf = ref('纸上的魔法使与魔法少女的魔女裁决游玩感想')
const commentCount = ref(114514)
const commentLists = ref([])
const viewCount:Ref<number> = ref(1433223)
const categoryName = ref('Galgame')
const updateTime = ref('2025-12-5 13:14:00')
const likeCounts = ref(7128)
const isLiked = ref(false)
const parentId = ref(0)
const targetId = ref(0)
const userSelfId = ref(0)
const viewCountContent:ComputedRef<string> = computed(():string=>{
  if (viewCount.value >= 10000) {
      return (viewCount.value / 10000).toFixed(2).toString() + '万'
  }
  return viewCount.value.toString()
})
const coverImagesSelf = ref([
  'https://s2.loli.net/2025/11/18/CILJ3hmbwnvDP7g.png',
  'https://s2.loli.net/2025/11/18/p25hry4qZxauTjl.jpg',
  'https://s2.loli.net/2025/11/18/jSeigpch9N2UrsY.png',
  'https://s2.loli.net/2025/05/22/wmHnJlIOPbcBhfZ.png',
  'https://s2.loli.net/2025/05/22/Sgdu4hrHm8e1iXN.png',
  'https://s2.loli.net/2024/04/08/d9IDqExftiYg4CA.png',
  'https://s2.loli.net/2024/04/05/lToqV7gYhb8MAzI.png',
  'https://s2.loli.net/2024/04/05/lTO4ytFw35nSIMe.png',
  'https://s2.loli.net/2024/04/05/jlb5GyrfVamHd9z.webp'

])
const content = ref(`
<p style="font-family: 'Noto Serif TC','PMingLiU',serif; font-size: 18px; line-height: 1.9; letter-spacing: 0.08em;">
  <strong>你說得對</strong>，但是
  <span style="color:#d63384; font-weight:bold;">《髒翅膀》</span>
  是一部由<span style="text-decoration:underline;">八月社</span>精心烤製、在
  <span style="color:#6c757d;">煙霧繚繞的空中貧民窟</span>裡端上來的
  <span style="background-color:#fff3cd;">灰燼味戀愛物語</span>。
</p>

<p style="font-family: 'Noto Serif TC','PMingLiU',serif; font-size: 16px; line-height: 1.9; text-indent: 2em;">
  故事發生在名為
  <span style="color:#0d6efd; font-weight:bold;">「諾瓦斯·艾蒂爾」</span>
  的浮空都市，在這裡，人類早就習慣了頭頂是聖女的祈禱、腳下是隨時會塌下去的地板，
  往上看是<span style="color:#ffc107;">虛偽的光明</span>，往下看是
  <span style="color:#6610f2;">看不見底的深淵</span>。
</p>

<p style="font-family: 'Noto Serif TC','PMingLiU',serif; font-size: 16px; line-height: 1.9; text-indent: 2em;">
  你將扮演一個每天在貧民區摸爬滾打、專接爛攤子的男人，嘴上說著
  <em>「我只是個普通中介」</em>，實際上卻把自己攪進了
  <span style="color:#20c997;">神、聖女、貴族、娼館、瘟疫</span>
  和<span style="color:#e83e8c;">斷翅天使</span>的命運漩渦。
</p>

<p style="font-family: 'Noto Serif TC','PMingLiU',serif; font-size: 16px; line-height: 1.9; text-indent: 2em;">
  你邂逅的並不是「性格各異的可愛同伴」，而是一群在泥裡打滾卻還想抬頭看天的人：
  有人背著十字架在病床邊點燈，有人披著羽毛在污濁空氣裡硬裝成天使，
  還有人明明只想活下去，卻被城市當成替罪羊扔進黑暗。
</p>

<blockquote style="border-left: 4px solid #adb5bd; margin: 18px 0; padding: 10px 16px; background-color:#f8f9fa;">
  <p style="font-family: 'Noto Serif TC','PMingLiU',serif; font-size: 15px; line-height: 1.9; margin: 0;">
    在這裡，「<span style="color:#fd7e14; font-weight:bold;">穢翼</span>」不是羞恥標籤，
    而是所有人共同的身世：<strong>沒人乾淨，但人人都在拼命守住一點點自以為的光。</strong>
  </p>
</blockquote>

<p style="font-family: 'Noto Serif TC','PMingLiU',serif; font-size: 16px; line-height: 1.9; text-indent: 2em;">
  你跟著他們一路從娼館走到教堂，從下層貧民窟走到聖女的神殿，看見浮空都市裂開的每一條縫隙，
  也看見那些縫隙裡偷偷長出來的
  <span style="color:#28a745; font-style:italic;">小小幸福</span>。
</p>

<hr style="border:none; border-top:1px dashed #dee2e6; margin: 20px 0;" />

<p style="font-family: 'Noto Serif TC','PMingLiU',serif; font-size: 16px; line-height: 1.9; text-indent: 2em;">
  最諷刺的是，當你通關關掉遊戲視窗，抬頭一看，現實世界的霓虹比諾瓦斯·艾蒂爾還閃，
  窮人比貧民窟還多，信仰比聖女斷得還乾淨——於是你忽然明白，
  所謂<span style="color:#d63384; font-weight:bold;">《髒翅膀》</span>，從來不是她們的羽毛有多髒，
  而是我們這些自稱「玩家」的人，習慣了站在高空俯視，把別人的絕望當作一段精彩劇情。
</p>

<ul style="font-family: 'Noto Serif TC','PMingLiU',serif; font-size: 15px; line-height: 1.9; padding-left: 2.2em;">
  <li>你以為在旁觀一場戀愛物語，其實是在對自己的世界做旁白。</li>
  <li>你以為在評價角色是否「合你胃口」，其實是在衡量自己能忍受多少真實。</li>
</ul>

<p style="font-family: 'Noto Serif TC','PMingLiU',serif; font-size: 16px; line-height: 1.9; text-indent: 2em;">
  你說得對，但是<span style="color:#d63384; font-weight:bold;">《髒翅膀》</span>不是一部普通的 Gal，
  它只是讓你在點點滑鼠、翻翻立繪的間隙，突然發現——
  <strong style="color:#495057;">自己早就活在另一個搖搖欲墜的空中城市裡罷了。</strong>
</p>
`)

// 仍然是示例数据
// ##################################################################################################
// ##################################################################################################
// ##################################################################################################
const articleCommentList:Ref<ArticleCommentList> = ref([
  {
    mainCommentBody: {
      id: 1,
      postId: 1001,
      userId: 10,
      nickName: '明月栞那',
      avatarUrl: 'https://s2.loli.net/2025/12/06/BwniCqHuz1vyVsD.webp',
      content: '这篇文章真的太棒了！期待后续更新～',
      parentId: 0,
      targetId: 0,
      targetName: null,
      likeCount: 12,
      liked:false,
      createTime: '2025-12-06 14:20:11'
    },
    underCommentBody: [
      {
        id: 2,
        postId: 1001,
        userId: 11,
        nickName: '仓科明日香',
        avatarUrl: 'https://s2.loli.net/2025/12/06/pLMq7uKRZl6ATCH.jpg',
        content: '确实，我也觉得写得挺好！',
        parentId: 1,
        targetId: 0,
        targetName: null,
        likeCount: 3,
        liked:false,
        createTime: '2025-12-06 14:25:39'
      },
      {
        id: 3,
        postId: 1001,
        userId: 12,
        nickName: '间桐樱',
        avatarUrl: 'https://s2.loli.net/2025/12/06/YiSy39Vdhn518IA.jpg',
        content: '我也这么认为！',
        parentId: 1,
        targetId: 11,
        targetName: '仓科明日香',
        likeCount: 1,
        liked:false,
        createTime: '2025-12-06 14:27:10'
      }
    ]
  },

  {
    mainCommentBody: {
      id: 4,
      postId: 1001,
      userId: 13,
      nickName: '万尼亚',
      avatarUrl: 'https://s2.loli.net/2025/12/06/mgLtCMvHsFn9whl.jpg',
      content: '我觉得这里的世界观设定很有意思！继续冲！',
      parentId: 0,
      targetId: 0,
      targetName: null,
      likeCount: 8,
      liked:false,
      createTime: '2025-12-06 15:02:44'
    },
    underCommentBody: [
      {
        id: 5,
        postId: 1001,
        userId: 10,
        nickName: '明月栞那',
        avatarUrl: 'https://s2.loli.net/2025/12/06/BwniCqHuz1vyVsD.webp',
        content: '谢谢喜欢！世界观后面会更复杂～',
        parentId: 4,
        targetId: 13,
        targetName: '万尼亚',
        likeCount: 5,
        liked:false,
        createTime: '2025-12-06 15:06:12'
      }
    ]
  },

  {
    mainCommentBody: {
      id: 6,
      postId: 1001,
      userId: 20,
      nickName: '宵崎奏',
      avatarUrl: 'https://s2.loli.net/2025/05/22/wmHnJlIOPbcBhfZ.png',
      content: '想问一下角色后续会不会有更多故事线？',
      parentId: 0,
      targetId: 0,
      targetName: null,
      likeCount: 2,
      liked:false,
      createTime: '2025-12-06 16:10:09'
    },
    underCommentBody: []
  },
  {
    mainCommentBody: {
      id: 7,
      postId: 1001,
      userId: 30,
      nickName: '有马加奈',
      avatarUrl: 'https://s2.loli.net/2025/12/06/hzlprdmJMH3R8jZ.jpg',
      content: '文章里的战斗场面描写得太带感了！光是看文字都有画面感。',
      parentId: 0,
      targetId: 0,
      targetName: null,
      likeCount: 17,
      liked:false,
      createTime: '2025-12-06 16:35:20'
    },
    underCommentBody: [
      {
        id: 8,
        postId: 1001,
        userId: 11,
        nickName: '仓科明日香',
        avatarUrl: 'https://s2.loli.net/2025/12/06/pLMq7uKRZl6ATCH.jpg',
        content: '我也这么觉得，代入感很强！',
        parentId: 7,
        targetId: 30,
        targetName: '有马加奈',
        likeCount: 4,
        liked:false,
        createTime: '2025-12-06 16:38:51'
      },
      {
        id: 9,
        postId: 1001,
        userId: 31,
        nickName: '城崎诺亚',
        avatarUrl: 'https://s2.loli.net/2025/12/06/iqAyzpUuf95FhsG.jpg',
        content: '下一章应该会更精彩，作者加油！',
        parentId: 7,
        targetId: 0,
        targetName: null,
        likeCount: 2,
        liked:false,
        createTime: '2025-12-06 16:41:03'
      },
      {
        id: 10,
        postId: 1001,
        userId: 32,
        nickName: '科比',
        avatarUrl: 'https://s2.loli.net/2025/12/06/oNyi1maxjhlcHQX.jpg',
        content: '+1，期待！',
        parentId: 7,
        targetId: 31,
        targetName: '城崎诺亚',
        likeCount: 1,
        liked:false,
        createTime: '2025-12-06 16:42:10'
      },
      {
        id: 23,
        postId: 1001,
        userId: 32,
        nickName: '科比',
        avatarUrl: 'https://s2.loli.net/2025/12/06/oNyi1maxjhlcHQX.jpg',
        content: '兄弟们，我昨晚又梦到训练了。凌晨四点的洛杉矶知道吧？那天我刚投完第八百球，回头一看太阳都出来骂我“哥你回去睡吧”。但我没停，因为我知道，只要我再多投一球，下次系统就不会给我 99 罚球了，至少也得给我 120 吧。',
        parentId: 7,
        targetId: null,
        targetName: null,
        likeCount: 6,
        liked:false,
        createTime: '2025-12-06 17:20:32'
      },
      {
        id: 24,
        postId: 1001,
        userId: 32,
        nickName: '科比',
        avatarUrl: 'https://s2.loli.net/2025/12/06/oNyi1maxjhlcHQX.jpg',
        content: '你们说的我都懂，但你们知道什么最让我无语吗？我那天明明在三分线外一步起跳，空中转 720°、后仰躲过三个人帽，投进之后队友跟我说：“科比你传球啊。”我当时就愣住了，兄弟，这球要能传出去，那我直接进 NASA 了。',
        parentId: 7,
        targetId: null,
        targetName: null,
        likeCount: 3,
        liked:false,
        createTime: '2025-12-06 17:22:11'
      },
      {
        id: 25,
        postId: 1001,
        userId: 32,
        nickName: '科比',
        avatarUrl: 'https://s2.loli.net/2025/12/06/oNyi1maxjhlcHQX.jpg',
        content: '昨天我跟教练说，我想要点挑战。当晚系统直接给我五个 2.30 米的内线，个个胳膊比我腰还粗。我当时真的想问一句：哥们，我是来打球的，不是来体验被树堵路的。结果你猜怎么着？我照样投了 60 分，这帮人到最后都怀疑篮球是不是磁吸的。',
        parentId: 7,
        targetId: null,
        targetName: null,
        likeCount: 4,
        liked:false,
        createTime: '2025-12-06 17:23:55'
      },
      {
        id: 26,
        postId: 1001,
        userId: 32,
        nickName: '科比',
        avatarUrl: 'https://s2.loli.net/2025/12/06/oNyi1maxjhlcHQX.jpg',
        content: '有人问我为什么总是凌晨四点训练，我就笑了。我说：因为凌晨三点的场馆灯还没开，五点又有人来抢场地。我只能四点去，你想啊，一个完美主义者，连训练时间都要卡在最不被打扰的一分钟里。曼巴精神不是吹的，是被环境逼出来的。',
        parentId: 7,
        targetId: null,
        targetName: null,
        likeCount: 8,
        liked:false,
        createTime: '2025-12-06 17:25:41'
      },
      {
        id: 27,
        postId: 1001,
        userId: 32,
        nickName: '科比',
        avatarUrl: 'https://s2.loli.net/2025/12/06/oNyi1maxjhlcHQX.jpg',
        content: '前几天我和队友打训练赛，他跟我说：“科比你别老单打，我们要打团队篮球。”我点点头说好，然后下一球我又无球跑位，他顿了一下说：“科比你别跑那么快，我跟不上。”兄弟们，你看，这就是我不传球的理由——队友连追我影子的速度都没有，传出去他都还在想着晚饭吃什么。',
        parentId: 7,
        targetId: null,
        targetName: null,
        likeCount: 7,
        liked:false,
        createTime: '2025-12-06 17:27:02'
      }
    ]
  },

  {
    mainCommentBody: {
      id: 11,
      postId: 1001,
      userId: 33,
      nickName: '月社妃',
      avatarUrl: 'https://s2.loli.net/2025/12/06/sP3qJTEYkjcvHgo.jpg',
      content: '角色之间的关系感觉后面会反转对吧？作者你别骗我！',
      parentId: 0,
      targetId: 0,
      targetName: null,
      likeCount: 21,
      liked:false,
      createTime: '2025-12-06 16:50:32'
    },
    underCommentBody: [
      {
        id: 12,
        postId: 1001,
        userId: 10,
        nickName: '明月栞那',
        avatarUrl: 'https://s2.loli.net/2025/12/06/BwniCqHuz1vyVsD.webp',
        content: '关系线确实会慢慢展开，但不会刻意反转～',
        parentId: 11,
        targetId: 33,
        targetName: '月社妃',
        likeCount: 10,
        liked:false,
        createTime: '2025-12-06 16:53:11'
      },
      {
        id: 13,
        postId: 1001,
        userId: 34,
        nickName: '凑-阿库娅',
        avatarUrl: 'https://s2.loli.net/2025/12/06/zUfWo1FO2BIGsxT.jpg',
        content: '我就知道剧情一定会反转！',
        parentId: 11,
        targetId: 0,
        targetName: null,
        likeCount: 5,
        liked:false,
        createTime: '2025-12-06 16:54:59'
      }
    ]
  },

  {
    mainCommentBody: {
      id: 14,
      postId: 1001,
      userId: 40,
      nickName: '樱小路露娜',
      avatarUrl: 'https://s2.loli.net/2025/12/06/6Njqx5PYMmZUBLh.jpg',
      content: '感觉文章里有很多细节伏笔，但是我还没完全看懂，有人能解释一下第八段吗？',
      parentId: 0,
      targetId: 0,
      targetName: null,
      likeCount: 6,
      liked:true,
      createTime: '2025-12-06 17:10:22'
    },
    underCommentBody: [
      {
        id: 15,
        postId: 1001,
        userId: 12,
        nickName: '间桐樱',
        avatarUrl: 'https://s2.loli.net/2025/12/06/YiSy39Vdhn518IA.jpg',
        content: '第八段暗示了主角过去的身份，有伏笔。',
        parentId: 14,
        targetId: 0,
        targetName: null,
        likeCount: 3,
        liked:false,
        createTime: '2025-12-06 17:12:40'
      },
      {
        id: 16,
        postId: 1001,
        userId: 40,
        nickName: '樱小路露娜',
        avatarUrl: 'https://s2.loli.net/2025/12/06/6Njqx5PYMmZUBLh.jpg',
        content: '原来如此！谢谢解惑！',
        parentId: 14,
        targetId: 12,
        targetName: '间桐樱',
        likeCount: 2,
        liked:false,
        createTime: '2025-12-06 17:14:02'
      },
      {
        id: 17,
        postId: 1001,
        userId: 41,
        nickName: '伊地知虹夏',
        avatarUrl: 'https://s2.loli.net/2025/12/06/DCKaJyAeIH47USQ.jpg',
        content: '我也觉得那里写得很隐晦，但应该后面会补完的。',
        parentId: 14,
        targetId: 0,
        targetName: null,
        likeCount: 1,
        liked:false,
        createTime: '2025-12-06 17:16:25'
      }
    ]
  }
])

// ##################################################################################################
// ##################################################################################################
// ##################################################################################################
// END



// 定义评论点赞
const changeMainCommentIsLiked = async(commentId:number, index:number, isLiked:boolean)=> {
  //// 后面替换成这套逻辑
  // // 判断类型
  // if (isLiked) {
  //   // 后端删除
  //   // 传递请求给后端
  //   try {
  //     const res = await instance.delete('url', {
  //       params: {
  //         userId:userSelfId.value,
  //         commentId:commentId
  //       }
  //     })
  //     if (res.data.code === 1) {
  //       // 取消点赞成功，修改前端数据表
  //       articleCommentList[index].mainCommentBody.liked = false
  //     }else {
  //       ElMessage.error('取消点赞失败：' + res.data.message)
  //     }
  //   }catch (err) {
  //     ElMessage.error('发生未知错误！' + err)
  //   }
  // }else {
  //   // 后端添加
  //   // 传递请求给后端
  //   try {
  //     const res = await instance.get('url', {
  //       params: {
  //         userId:userSelfId.value,
  //         commentId:commentId
  //       }
  //     })
  //     if (res.data.code === 1) {
  //       // 点赞成功，修改前端数据表
  //       articleCommentList[index].mainCommentBody.liked = true
  //     }else {
  //       ElMessage.error('点赞失败：' + res.data.message)
  //     }
  //   }catch (err) {
  //     ElMessage.error('发生未知错误！' + err)
  //   }
  // }
  if (isLiked) {
    articleCommentList.value[index].mainCommentBody.liked = false
  }else {
    articleCommentList.value[index].mainCommentBody.liked = true
  }
}

// 定义表单的相关属性
const underCommentDrawerDisplay = ref(false)

// 定义子表单的相关渲染部分
const el_drawerDisplayCommentInfoLists:Ref<SingleMainCommentType> = ref(null)
// 定义子评论相关函数
// 当点击展开回复的时候
const openUnderCommentDisplayPart = (mainCommentIndex:number)=> {
  // 数据先赋值给表单
  el_drawerDisplayCommentInfoLists.value = articleCommentList.value[mainCommentIndex]

  // 打开表单即可
  underCommentDrawerDisplay.value = true
}


// 定义分页相关数据
// 当页面大小改变的时候
const handleCommentSizeChange = (newPageSize)=>{
  // 设置分页大小
  setPageSize(newPageSize)

  // 直接调用后端重新查询设置即可
  getEndDataByFrontDataAndSet()
}

// 当前页码改变的时候
const handleCommentCurrentPageChange = (newPage)=>{
  // 设置分页大小
  setPage(newPage)

  // 直接调用后端重新查询设置即可
  getEndDataByFrontDataAndSet()
}

// 发送评论
// 需要有当前帖子的id
// 以及parentId
// 还有targetId,targetId就是你想要攻击的那个用户的id
const sendComment = async(articleId:number, parentId:number=0, targetId:number=0)=> {
  // 检查是否有敏感内容
  try {
    const res = await instance.post('/user/news/post/sensitive', {
      content: commentContent.value
    })
    if (res.data.code === 1) {
      // 检查是否有敏感内容
      if (res.data.data) {
        ElMessage.warning('当前内容中包含有敏感词汇，请重新检查输入!')
      }else {
        // 可以发布了
        try {
          const nextRes = await instance.post(`/user/news/${articleId}/comments`, {
            content:commentContent.value,
            parentId:parentId,
            targetId:targetId
          })
          if (nextRes.data.code === 1) {
            ElMessage.success('评论成功！')
            //TODO:添加额外的逻辑
            // 清空评论
            commentContent.value = ''

            // 重新获取评论

          }else {
            ElMessage.error('发生错误：' + nextRes.data.message)
          }
        }catch (err){
          ElMessage.error('发生未知错误！' + err)
        }
      }
    }else {
      ElMessage.error('发生错误：' + res.data.message)
    }
  }catch (err) {
    ElMessage.error('发生未知错误！' + err)
  }
}

// 获取到视口宽度
const sightWidth = ref(0)
const dynamicCoverImagesWidth:Ref<string> = ref('')
onMounted(()=> {
  sightWidth.value = document.documentElement.clientWidth
  dynamicCoverImagesWidth.value = sightWidth.value - 30 + 'px'

  // 并且设置属性
  document.documentElement.style.setProperty('--dynamicCoverImagesWidth', dynamicCoverImagesWidth.value)
  document.documentElement.style.setProperty('--dynamicCoverImagesHeight', dynamicCoverImagesWidth.value)
})

</script>

<template>
  <div class="allContentContainer">
    <!-- 头部 -->
    <div class="header">
      <div class="leftHeaderContainer">
        <el-icon @click="returnToHome"><ArrowLeft /></el-icon>
        <span>文章详情</span>
      </div>
      <el-icon><MoreFilled /></el-icon>
    </div>

    <!-- 中间部分（文章包括评论） -->
    <div class="middlePartDisplay">

      <!-- 文章部分 -->
      <div class="articleDisplay">

        <!-- 文章标题 -->
        <div class="articleTitleDisplay">
          <span>{{ titleNameSelf }}</span>
        </div>

        <!-- 文章博主相关信息展示 -->
        <div class="articleUserContainer">
          <img style="width: 35px; height: 35px; object-fit: cover; border-radius: 999px;" :src="articleUserAvatarUrl" alt="">
          <div class="nameAndPublishTime">
            <span style="font-size: 14px;">{{ articleUserName }}</span>
            <span style="font-size: 12px; color: rgba(0, 0, 0, 0.3);">{{ publishTime }}</span>
          </div>
        </div>

        <!-- 标签相关部分展示 -->
         <div class="categoryDisplay">
          <div class="beautyBox">
            <img style="width:30px; height: 30px;" :src="galgameImg" alt="">
            <span>{{ categoryName }}</span>
          </div>
         </div>

        <!-- 图片展示部分 -->
        <div class="coverImagesDisplayPart">
          <el-carousel
          class="el-carousel"
          indicator-position="outside"
          trigger="hover"
          :height="dynamicCoverImagesWidth">
            <el-carousel-item v-for="(item, index) in coverImagesSelf" :key="item">
              <!-- <img :src="item" alt=""> -->
              <el-image
                class="previewCoversInHome"
                :src="item"
                fit="cover"
                :preview-src-list="coverImagesSelf"
                :initial-index="index"
                hide-on-click-modal="true"
                show-progress="true"
              />
            </el-carousel-item>
          </el-carousel>
        </div>

        <!-- 文章内容 -->
        <div class="articleContentDisplay" v-html="content">
        </div>

        <!-- 浏览量展示以及最后更新日期 -->
         <div class="viewAndUpdateTime">
          <div class="viewCountDisplay">
            <el-icon color="rgba(0, 0, 0, 0.3)"><View/></el-icon>
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
          <span style="font-size: smaller; color: rgba(0, 0, 0, 0.3);">共{{ commentCount }}条</span>
        </div>

        <div class="allCommentContainer">
          <div class="singleComment" v-for="(article, mainCommentIndex) in articleCommentList" :key="article.mainCommentBody.id">
            <!-- 渲染主评论 -->
            <div class="mainInfo">
              <img class="commentPartAvatarImg" :src="article.mainCommentBody.avatarUrl" alt="">
              <div class="nameAndTimeAndContent">
                <div class="commentUserInfo">
                  <span>{{ article.mainCommentBody.nickName }}</span>
                  <span style="font-size: smaller; color: rgba(0, 0, 0, 0.3)">{{ article.mainCommentBody.createTime }}</span>
                <!-- 主要内容 -->
                </div>
                <div class="commentContent">
                <span>{{ article.mainCommentBody.content }}</span>
                </div>

                <!-- 回复和点赞功能 -->
                <div class="replyAndLiked">
                  <div class="replyAndNumberDisplay">
                    <el-icon size="20px"><ChatLineSquare /></el-icon>
                    <span>回复</span>
                  </div>
                  <div class="likeActivateAndLikeCountDisplay">
                    <img
                    v-if="!article.mainCommentBody.liked"
                    class="commentLikedIcon"
                    :src="Heart" alt="点赞"
                    @click="changeMainCommentIsLiked(article.mainCommentBody.id, mainCommentIndex, article.mainCommentBody.liked)">
                    <img
                    v-else class="commentLikedIcon"
                    :src="Loved" alt="点赞"
                      @click="changeMainCommentIsLiked(article.mainCommentBody.id, mainCommentIndex, article.mainCommentBody.liked)">
                    <span>{{ article.mainCommentBody.likeCount }}</span>
                  </div>
                </div>

                <!-- 显示子评论第一条 -->
                 <!-- 当有评论的时候才会 -->
                <div class="underCommentDisplayPreviewOne" v-if="article.underCommentBody.length">
                  <!-- 显示第一条评论 -->
                  <div class="firstReply">
                    <span style="font-size: 14px; color:#5ca4ed">{{article.underCommentBody[0].nickName }} : </span>
                    <span style="font-size: 14px;">{{ article.underCommentBody[0].content }}</span>
                  </div>
                  <!-- 显示多少条评论 -->
                  <div class="replyCountAndIconDisplay" @click="openUnderCommentDisplayPart(mainCommentIndex)">
                      <span>共{{ article.underCommentBody.length }}条回复</span>
                      <el-icon><ArrowRight /></el-icon>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 打开子评论面板 -->
        <div class="drawerToDisplay">
          <el-drawer
            v-model="underCommentDrawerDisplay"
            :with-header="false"
            :modal="false"
            direction="btt"
            size="90%"
            >
            <!-- 标题 -->
            <div class="underCommentTitle">
              <el-icon @click="underCommentDrawerDisplay = false"><ArrowLeft /></el-icon>
              <span>评论详情</span>
            </div>

            <div class="innerCommentContainer">
              <!-- 主评论 -->
              <div class="mainCommentDisplay">
                <img class="commentPartAvatarImg" :src="el_drawerDisplayCommentInfoLists.mainCommentBody.avatarUrl" alt="">
                <div class="nameAndTimeAndContent">
                  <div class="commentUserInfo">
                    <span>{{ el_drawerDisplayCommentInfoLists.mainCommentBody.nickName }}</span>
                    <span style="font-size: smaller; color: rgba(0, 0, 0, 0.3)">{{ el_drawerDisplayCommentInfoLists.mainCommentBody.createTime }}</span>
                  <!-- 主要内容 -->
                  </div>
                  <div class="commentContent">
                  <span>{{ el_drawerDisplayCommentInfoLists.mainCommentBody.content }}</span>
                  </div>

                  <!-- 回复和点赞功能 -->
                  <div class="replyAndLiked">
                    <div class="replyAndNumberDisplay">
                      <el-icon size="20px"><ChatLineSquare /></el-icon>
                      <span>回复</span>
                    </div>
                    <div class="likeActivateAndLikeCountDisplay">
                      <img
                      v-if="!el_drawerDisplayCommentInfoLists.mainCommentBody.liked"
                      class="commentLikedIcon"
                      :src="Heart" alt="点赞"
                      @click="changeMainCommentIsLiked(el_drawerDisplayCommentInfoLists.mainCommentBody.id, 0, el_drawerDisplayCommentInfoLists.mainCommentBody.liked)">
                      <img
                      v-else class="commentLikedIcon"
                      :src="Loved" alt="点赞"
                        @click="changeMainCommentIsLiked(el_drawerDisplayCommentInfoLists.mainCommentBody.id, 0, el_drawerDisplayCommentInfoLists.mainCommentBody.liked)">
                      <span>{{ el_drawerDisplayCommentInfoLists.mainCommentBody.likeCount }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 回复标题和相关信息渲染 -->
              <div class="underCommentTitleAndReplyCount">
                <span>相关回复 共{{ el_drawerDisplayCommentInfoLists.underCommentBody.length }}条</span>
              </div>
              <!-- 回复内容渲染 -->
              <div class="underCommentContainer">
                <div class="singleUnderCommentReply" v-for="(underComment, underCommentIndex) in el_drawerDisplayCommentInfoLists.underCommentBody" :key="underComment.id">
                  <img class="commentPartAvatarImg" :src="underComment.avatarUrl" alt="">
                  <div class="nameAndTimeAndContent">
                    <div class="commentUserInfo">
                      <span>{{ underComment.nickName }}</span>
                      <span style="font-size: smaller; color: rgba(0, 0, 0, 0.3)">{{ underComment.createTime }}</span>
                    </div>

                    <!-- 主要内容 -->
                    <div class="replyCommentContentContainer">
                      <span v-if="underComment.targetName">回复&nbsp;</span>
                      <span v-if="underComment.targetName" style="color:#5ca4ed">@{{ underComment.targetName }}</span>
                      <span v-if="underComment.targetName">: </span>
                      <span>{{ underComment.content }}</span>
                    </div>

                    <!-- 回复和点赞功能 -->
                    <div class="replyAndLiked">
                      <div class="replyAndNumberDisplay">
                        <el-icon size="20px"><ChatLineSquare /></el-icon>
                        <span>回复</span>
                      </div>
                      <div class="likeActivateAndLikeCountDisplay">
                        <img
                        v-if="!underComment.liked"
                        class="commentLikedIcon"
                        :src="Heart" alt="点赞"
                        @click="changeMainCommentIsLiked(underComment.id, 0, underComment.liked)">
                        <img
                        v-else class="commentLikedIcon"
                        :src="Loved" alt="点赞"
                          @click="changeMainCommentIsLiked(underComment.id, 0, underComment.liked)">
                        <span>{{ underComment.likeCount }}</span>
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
            background="true"
            layout="sizes, prev, pager, next, jumper"
            :total="400"
            pager-count="5"
            default-current-page="1"
            @size-change="handleCommentSizeChange"
            @current-change="handleCommentCurrentPageChange"
          />
        </div>
      </div>
    </div>


    <!-- 底部导航 -->
    <div class="footer">
      <div class="userSelfFunctionDisplay">
        <img class="userSelfAvatar" :src="avatarUrl" alt="用户头像">
        <div class="sendComponents">
          <el-input v-model="commentContent" class="userCommentInput" placeholder="本公主来喵两句"></el-input>
          <el-icon :size="30" @click="sendComment(articleId, parentId, targetId)"><Promotion /></el-icon>
        </div>
      </div>

      <div class="likeComponent">
        <img v-if="!isLiked" class="LikedIcon" :src="Heart" alt="点赞" @click="changeIsLiked">
        <img v-else class="LikedIcon" :src="Loved" alt="点赞" @click="changeIsLiked">
        <span>{{ likeCounts }}</span>
      </div>
    </div>
  </div>


</template>

<style scoped>
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
  gap: 10px
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
  gap:10px
}
.nameAndPublishTime {
  display: flex;
  flex-direction: column;
}
.beautyBox {
  background-color: rgba(0, 0, 0, 0.1);
  width:fit-content;
  padding: 5px 10px ;
  color:black;
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
.coverImagesDisplayPart{
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
  gap:10px;
}
.viewCountDisplay {
  display: flex;
  align-items: center;
  gap:5px;
}
.commentDisplay {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.commentTitle {
  display: flex;
  gap:20px;
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
  gap:10px;
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
  gap:20px;
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
  padding-top:10px;
  padding-bottom: 10px;
  color:rgba(0, 0, 0, 0.2);
  font-size: 14px;
}
.underCommentContainer {
  display: flex;
  flex-direction: column;
  gap:15px;
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
  padding:15px;
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
.elDrawerContainer {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0; /* 允许下面那块缩小出滚动条 */
}
.underCommentTitle {
  flex: 0 0 auto; /* 高度由内容决定，不参与拉伸 */
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
  overflow-y: auto; /* 滚动条在这里 */
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
.footer {
  border-top: 1px solid rgb(191, 191, 191);
  padding: 10px;
  display: flex;
  /* align-items: center; */
  justify-content: space-between;

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
  padding-top: 20px;
  font-size: smaller;
}
.LikedIcon {
  width: 30px;
  height: 30px;
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
</style>


