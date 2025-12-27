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

// 动画相关
const animationTransitionStore = useAnimationTransitionStore()
const { transitionDirection, enableAnimation, animationType } = storeToRefs(animationTransitionStore)
const { setTransitionDirection } = animationTransitionStore

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

const transitionName = computed(() => {
  if (!enableAnimation.value) return ''
  if (route.meta.animation === false) return ''
  if (animationType.value === 'fade') return 'fade'
  return transitionDirection.value
})

// 路由跳转
const jumpToNewRouter = (routeInfo)=> {
  if (route.path !== '/layout' + routeInfo.url) {
    setTransitionDirection('forward')
    title.value = routeInfo.title
    router.push('/layout' + routeInfo.url)
  }
}

// ====== 全局筛选条件和事件 ======
const filterCondition = ref({
  sort: 'time', // 'time' 或 'hot'
  timeRange: 'all', // 'all', 'year', 'month', 'week'
})

// 筛选弹窗确认
const confirmFilterCondition = () => {
  filterPanelVisible.value = false
  window.dispatchEvent(new CustomEvent('homeFilterChange', { detail: { ...filterCondition.value } }))
}

// 筛选弹窗重置
const resetFilterCondition = () => {
  filterCondition.value = { sort: 'time', timeRange: 'all' }
}

const loginPromptStore = useLoginPromptStore()
const logout = async () => {
  loginPromptStore.showLogout()
}

const searchContent = ref('')
const title = ref('西瓜头条')
const filterPanelVisible = ref(false)

// Dock 跳转
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
    <!-- 头部 -->
    <div class="upStreamContent">
      <div class="headerComponent">
        <div class="header-flex">
          <!-- 左侧标题 -->
          <div class="header-title">
            <strong>{{ title }}</strong>
          </div>
          <!-- 搜索框（仅首页显示） -->
          <div v-if="$route.path.endsWith('/home')" class="header-search">
            <el-input
              v-model="searchContent"
              placeholder="搜索资讯、话题、用户..."
              :prefix-icon="Search"
              class="my-input"
              clearable
            />
          </div>
          <!-- 筛选按钮（仅首页显示） -->
          <div v-if="$route.path.endsWith('/home')" class="header-filter">
            <el-popover
              v-model:visible="filterPanelVisible"
              placement="bottom-end"
              width="90vw"
              trigger="click"
              class="filterPopover"
            >
              <template #reference>
                <el-button circle>
                  <el-icon><Filter /></el-icon>
                </el-button>
              </template>
              <div class="filterPanelWrap">
                <div class="filterPanel">
                  <div class="filter-row">
                    <span class="filter-label">排序：</span>
                    <el-radio-group v-model="filterCondition.sort">
                      <el-radio-button label="time">按时间</el-radio-button>
                      <el-radio-button label="hot">按热度</el-radio-button>
                    </el-radio-group>
                  </div>
                  <div class="filter-row">
                    <span class="filter-label">时间：</span>
                    <el-radio-group v-model="filterCondition.timeRange">
                      <el-radio-button label="all">全部</el-radio-button>
                      <el-radio-button label="year">近一年</el-radio-button>
                      <el-radio-button label="month">近一月</el-radio-button>
                      <el-radio-button label="week">近一周</el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
                <div class="filter-btn-row">
                  <el-button size="small" @click="resetFilterCondition">重置</el-button>
                  <el-button size="small" type="primary" @click="confirmFilterCondition">确认</el-button>
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

    <!-- 底部 Dock 导航 -->
    <Dock class="dock-float">
      <DockIcon @click="goHome">
        <div class="dock-item" :class="{ active: route.path.endsWith('/home') }">
          <el-icon :size="26"><HomeFilled /></el-icon>
          <span>首页</span>
        </div>
      </DockIcon>
      <DockSeparator />
      <DockIcon @click="goAddArticle">
        <div class="dock-item" :class="{ active: route.path.endsWith('/addNewArticle') }">
          <el-icon :size="26"><Plus /></el-icon>
          <span>新建</span>
        </div>
      </DockIcon>
      <DockIcon @click="goUser">
        <div class="dock-item" :class="{ active: route.path.endsWith('/user') }">
          <el-icon :size="26"><User /></el-icon>
          <span>我的</span>
        </div>
      </DockIcon>
      <DockIcon @click="goSetting">
        <div class="dock-item" :class="{ active: route.path.endsWith('/setting') }">
          <el-icon :size="26"><Setting /></el-icon>
          <span>设置</span>
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
  background: #f7f8fa;
}
.upStreamContent {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  background-color: whitesmoke;
}
.headerComponent {
  padding: 0 0 0 0;
  background: #fff;
  border-bottom: 1.5px solid #f2f2f2;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.02);
  position: sticky;
  top: 0;
  z-index: 10;
}
.header-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px 10px 16px;
  gap: 10px;
}
.header-title {
  font-size: 18px;
  font-weight: 700;
  color: #222;
  flex-shrink: 0;
}
.header-search {
  flex: 1 1 0;
  margin: 0 10px;
  min-width: 0;
}
.header-filter {
  flex-shrink: 0;
}
.my-input .el-input__wrapper {
  background-color: #f5f5f5;
  border-radius: 8px;
  border: none;
  box-shadow: none;
}
.filterPopover {
  padding: 0;
}
.filterPanelWrap {
  padding: 10px 8px 4px 8px;
  min-width: 220px;
  max-width: 90vw;
}
.filterPanel {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.filter-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
}
.filter-label {
  font-size: 14px;
  color: #666;
  width: 38px;
  flex-shrink: 0;
}
.filter-btn-row {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
}
.routerViewContent {
  flex: 1 1 auto;
  min-height: 0;
  background: #f7f8fa;
  padding-bottom: 60px;
}
.dock-float {
  position: fixed;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%);
  z-index: 50;
}
.dock-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #4b5563;
  font-weight: 400;
  transition: color 0.2s, font-weight 0.2s;
}
.dock-item.active {
  color: #60a5fa;
  font-weight: 600;
}
.dock-item span {
  margin-top: 2px;
}
</style>