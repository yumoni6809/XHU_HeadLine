<script setup>
import { HomeFilled, Plus, Setting, User, Search, Filter } from '@element-plus/icons-vue';
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { Dock, DockIcon, DockSeparator } from '@/components/inspira/dock'
import { useAnimationTransitionStore } from '@/stores/animationTransition'
import { useLoginPromptStore } from '@/stores/loginPrompt'

defineOptions({
  name: 'LayoutPage'
})

const router = useRouter()
const route = useRoute()

// 1. 获取 Store 状态
const animationTransitionStore = useAnimationTransitionStore()
const { transitionDirection, enableAnimation, animationType } = storeToRefs(animationTransitionStore)
const { setTransitionDirection } = animationTransitionStore

// 监听路由 Index 变化 (Layout 内部使用 index 判断顺序)
watch(
  () => route.meta.index,
  (newIndex, oldIndex) => {
    if (typeof newIndex === 'number' && typeof oldIndex === 'number') {
      if (newIndex > oldIndex) {
        setTransitionDirection('forward')
      } else {
        setTransitionDirection('backward')
      }
    }
  }
)

// 2. 计算最终动画名称 (核心修复点：必须判断 animationType)
const transitionName = computed(() => {
  // 优先级 1: 全局开关
  if (!enableAnimation.value) return ''
  
  // 优先级 2: 页面单独配置 (可选)
  if (route.meta.animation === false) return ''

  // 优先级 3: 全局类型为淡入淡出 -> 强制 fade
  if (animationType.value === 'fade') return 'fade'

  // 优先级 4: 默认滑动
  return transitionDirection.value
})

const jumpToNewRouter = (routeInfo)=> {
  // 只有当目标页面和当前页面不同时才设置方向，避免原地跳转闪烁
  if (route.path !== '/layout' + routeInfo.url) {
    setTransitionDirection('forward')
    title.value = routeInfo.title
    router.push('/layout' + routeInfo.url)
  }
}

const loginPromptStore = useLoginPromptStore()

const logout = async () => {
  loginPromptStore.showLogout()
}

const searchContent = ref('')

// 定义当前导航栏显示的标题
const title = ref('西瓜头条')

// 定义搜索栏
const filterPanelVisible = ref(false)

// 重置表单
const resetFilterCondition = ()=> {
  //TODO
}

// 确认表单
const confirmFilterCondition = ()=> {
  //TODO
  filterPanelVisible.value = false
}

// ====== 补上筛选标签用到的状态和事件 ======
const checked1 = ref(false)
const onChange1 = (val) => {
  checked1.value = val
}

// Dock 点击封装一下，便于在模板中使用
const goHome = () => {
  jumpToNewRouter({
    url: '/home',
    title: '咨询头条'
  })
}
const goAddArticle = () => {
  jumpToNewRouter({
    url: '/addNewArticle',
    title: '发布新贴'
  })
}
const goUser = () => {
  jumpToNewRouter({
    url: '/user',
    title: '个人信息'
  })
}
const goSetting = () => {
  jumpToNewRouter({
    url: '/setting',
    title: '设置'
  })
}
</script>

<template>
  <div class="entirePage">
    <!-- 头部，根据routepath来判断 -->
    <div class="upStreamContent">
      <div class="headerComponent">
        <div class="searchComponent">
          <!-- 左侧标题 -->
          <div style="font-size: 16px;">
            <strong>
              {{ title }}
            </strong>
          </div>

          <!-- 中间：搜索框（只在 home 显示） -->
          <div
            v-show="$route.path.split('/')[$route.path.split('/').length - 1] === 'home'"
            style="flex: 1;"
          >
            <el-input
              type="text"
              v-model="searchContent"
              placeholder="搜索资讯、话题、用户..."
              :prefix-icon="Search"
              class="my-input"
              style="width: 60vw; border-radius: 10px;"
            />
          </div>

          <!-- 右侧：筛选按钮（同样只在 home 显示） -->
          <div
            class="filterButtonWrapper"
            v-show="$route.path.split('/')[$route.path.split('/').length - 1] === 'home'"
          >
            <el-popover
              v-model:visible="filterPanelVisible"
              placement="bottom"
              width="100vw"
              trigger="click"
              class="filterPopover"
            >
              <!-- 触发弹层的“筛选图标” -->
              <template #reference>
                <el-button circle>
                  <el-icon><Filter /></el-icon>
                </el-button>
              </template>

              <div style="background-color: white;" v-show="filterPanelVisible">
                <div class="filterPanel">
                  <!-- 筛选条件 -->
                  <div class="checkTagTitle">
                    <span>按时间</span>
                    <span>按收藏</span>
                    <span>按点赞</span>
                    <span>按浏览量</span>
                  </div>

                  <div class="checkTagItems">
                    <div class="timeCheckTag singleFilterContainer">
                      <el-check-tag :checked="true" type="primary" @change="onChange1">
                        全部
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        最近一年
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        最近一月
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        最近一周
                      </el-check-tag>
                    </div>

                    <div class="attentionCheckTag singleFilterContainer">
                      <el-check-tag :checked="true" type="primary" @change="onChange1">
                        全部
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        >100
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        >1000
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        >5000
                      </el-check-tag>
                    </div>

                    <div class="likeCheckTag singleFilterContainer">
                      <el-check-tag :checked="true" type="primary" @change="onChange1">
                        全部
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        >100
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        >1000
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        >5000
                      </el-check-tag>
                    </div>

                    <div class="viewCheckTag singleFilterContainer">
                      <el-check-tag :checked="true" type="primary" @change="onChange1">
                        全部
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        >100
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        >1000
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        >5000
                      </el-check-tag>
                    </div>
                  </div>
                </div>

                <div class="checkOrResetButton">
                  <el-button @click="resetFilterCondition">重置</el-button>
                  <el-button type="primary" @click="confirmFilterCondition">确认</el-button>
                </div>
              </div>
            </el-popover>
          </div>
        </div>
      </div>

      <div class="routerViewContent">
        <router-view v-slot="{ Component }">
          <Transition :name="transitionName">
            <keep-alive>
              <component :is="Component" :key="route.path"/>
            </keep-alive>
          </Transition>
        </router-view>
      </div>
    </div>

    <!-- 直接悬浮在内容上方的 Dock 导航 -->
    <Dock class="dock-float">
      <!-- 首页 -->
      <DockIcon @click="goHome">
        <div class="flex flex-col items-center justify-center">
          <el-icon :size="26">
            <HomeFilled />
          </el-icon>
          <span
            class="mt-1 transition-all duration-200"
            :style="{
              color: route.path.endsWith('/home') ? '#60a5fa' : '#4b5563',
              fontSize: route.path.endsWith('/home') ? '13px' : '12px',
              fontWeight: route.path.endsWith('/home') ? '600' : '400'
            }"
          >
            首页
          </span>
        </div>
      </DockIcon>

      <DockSeparator />

      <!-- 新建帖子 -->
      <DockIcon @click="goAddArticle">
        <div class="flex flex-col items-center justify-center">
          <el-icon :size="26">
            <Plus />
          </el-icon>
          <span
            class="mt-1 transition-all duration-200"
            :style="{
              color: route.path.endsWith('/addNewArticle') ? '#60a5fa' : '#4b5563',
              fontSize: route.path.endsWith('/addNewArticle') ? '13px' : '12px',
              fontWeight: route.path.endsWith('/addNewArticle') ? '600' : '400'
            }"
          >
            新建
          </span>
        </div>
      </DockIcon>

      <!-- 我的 -->
      <DockIcon @click="goUser">
        <div class="flex flex-col items-center justify-center">
          <el-icon :size="26">
            <User />
          </el-icon>
          <span
            class="mt-1 transition-all duration-200"
            :style="{
              color: route.path.endsWith('/user') ? '#60a5fa' : '#4b5563',
              fontSize: route.path.endsWith('/user') ? '13px' : '12px',
              fontWeight: route.path.endsWith('/user') ? '600' : '400'
            }"
          >
            我的
          </span>
        </div>
      </DockIcon>

      <!-- 设置 -->
      <DockIcon @click="goSetting">
        <div class="flex flex-col items-center justify-center">
          <el-icon :size="26">
            <Setting />
          </el-icon>
          <span
            class="mt-1 transition-all duration-200"
            :style="{
              color: route.path.endsWith('/setting') ? '#60a5fa' : '#4b5563',
              fontSize: route.path.endsWith('/setting') ? '13px' : '12px',
              fontWeight: route.path.endsWith('/setting') ? '600' : '400'
            }"
          >
            设置
          </span>
        </div>
      </DockIcon>
    </Dock>
  </div>
</template>


<style scoped>
.entirePage {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
/* 配置顶部样式 */
/* ################################################################## */
/* ################################################################## */
/* ################################################################## */
.headerComponent {
  padding: 20px 10px 20px 10px;
  background-color: white;
  border-bottom: 2px solid whitesmoke;
}

.searchComponent {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 16px;
}
.filterButtonWrapper {
  display: flex;
  align-items: center;
}
.filterComponentContainer {
  margin-top: 15px;
}
.upStreamContent {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  background-color: whitesmoke;
}
.my-input .el-input__wrapper {
  background-color: #f5f5f5;  /* 浅灰色背景 */
}
.conditionalQuery {
  margin-top: 20px;
  padding-left: 20px;
}

/* 配置条件筛选的样式 */
.filterPanel {
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding-top: 20px;
  background-color: white;
  align-items: center;
}
.checkTagTitle {
  font-weight: bold;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 60px;
}
.checkTagItems {
  display: flex;
  flex-direction: column;
  overflow: scroll;
  gap: 10px
}

.singleFilterContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  overflow-x: auto;
  scrollbar-width: none;
  white-space: nowrap;
}
.checkOrResetButton {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: end;
  gap: 20px;
  background-color: white;
}


.routerViewContent {
  flex: 1 1 auto;
  min-height: 0;   /* 非常关键，允许子元素内部滚动 */
  /* width: 100%;
  max-width: 100%; */
}

/* 配置底部样式 */
/* ################################################################## */
/* ################################################################## */
/* ################################################################## */
.dock-float {
  position: fixed;
  left: 50%;
  bottom: 18px;          /* 距离底部稍微留一点空间 */
  transform: translateX(-50%);
  z-index: 50;           /* 保证在页面内容之上 */
}
.primaryNav {
  padding: 0 8px 0 8px;
  border-radius: 40px;
}
.activeNav {
  background-color: rgb(238, 231, 30);

}
.footerContainer {
  display: flex;
  flex-direction: row;
  gap: 15vw;
}
.nav-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nav-col :hover {
  cursor: pointer;
}

/* 页面切换的动画效果 */
/* 前进的动画效果 */
/* ################################################################## */
/* ################################################################## */
/* ################################################################## */
/* 进入 & 离开时的过渡属性 */
.forward-enter-active,
.forward-leave-active,
.backward-enter-active,
.backward-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1); /* 稍微优化一下曲线 */
  position: absolute; 
  width: 100%;
  height: 100%; /* 确保高度填满容器 */
  top: 0;
  left: 0;
  background-color: #f5f7fa; /* 关键：给页面加个背景色，防止透明叠加 */
  z-index: 1; /* 确保在 Dock (z-index: 999) 之下 */
}

/* Forward: 新页面从右入，旧页面向左出 */
.forward-enter-from { opacity: 0; transform: translateX(100%); }
.forward-enter-to { opacity: 1; transform: translateX(0); }
.forward-leave-from { opacity: 1; transform: translateX(0); }
.forward-leave-to { opacity: 0; transform: translateX(-30%); /* 稍微视差效果 */ }

/* Backward: 新页面从左入，旧页面向右出 */
.backward-enter-from { opacity: 0; transform: translateX(-100%); }
.backward-enter-to { opacity: 1; transform: translateX(0); }
.backward-leave-from { opacity: 1; transform: translateX(0); }
.backward-leave-to { opacity: 0; transform: translateX(30%); }

/* === 淡入淡出效果 (Fade) === */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
  position: absolute; /* Fade 模式也加上 absolute 防止布局跳动 */
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 页面切换的动画效果 */
/* 返回的动画效果 */
/* ################################################################## */
/* ################################################################## */
/* ################################################################## */
/* 进入 & 离开时的过渡属性 */


/* 其他效果 */
.entirePage {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 防止动画溢出出现滚动条 */
  position: relative;
}


.routerViewContent {
  flex: 1;
  position: relative; /* 为 absolute 的动画页面提供定位基准 */
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto; /* 内容过长时内部滚动 */
}

/* 
   Dock 容器样式 
   关键点：z-index 要高，position fixed/absolute 保证不随页面滑动
*/
.dock-container {
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  z-index: 999; /* 确保在动画层之上 */
  display: flex;
  justify-content: center;
  pointer-events: none; /* 让容器不阻挡点击，内部 Dock 开启 pointer-events */
}

/* 确保 Dock 组件本身可以点击 */
.dock-container :deep(.dock) {
  pointer-events: auto;
}
</style>
