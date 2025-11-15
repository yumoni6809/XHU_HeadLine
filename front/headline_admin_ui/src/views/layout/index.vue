<template>
  <!--
    主布局容器，使用 Element Plus 的容器组件构建侧边栏 + 头部 + 主内容区域
  -->
  <el-container class="layout-container-demo" style="min-height: 100vh">
    <!-- 左侧侧边栏 -->
    <el-aside width="220px" class="aside">
      <el-scrollbar>
        <!-- 菜单：图书管理 -->
        <el-menu :default-active="active" @select="go" class="el-menu-vertical-demo">
          <el-menu-item index="/book">
            <el-icon><Message /></el-icon>
            <span>图书管理</span>
          </el-menu-item>
        </el-menu>

        <!-- 如果想把多个菜单合并在同一个 el-menu 中也可以，这里用两个分开是为了示例清晰 -->
        <el-menu :default-active="active" @select="go" class="el-menu-vertical-demo">
          <el-menu-item index="/user">
            <el-icon><IconMenu /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <!-- 右侧主区域：包含头部与内容 -->
    <el-container>
      <!-- 顶部头部，显示应用标题和当前用户信息 -->
      <el-header class="app-header">
        <div class="title">头条后台管理系统</div>
        <div class="user">当前用户</div>
      </el-header>

      <!-- 主要内容区，router-view 渲染子路由组件 -->
      <el-main class="app-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
export default { name: 'AppLayout' }
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  // useRoute 用于获取当前路由信息
  // useRouter 用于编程式导航
  useRoute,
  useRouter,
  // 下面的类型仅用于 TypeScript 提示
  type RouteLocationAsPathGeneric,
  type RouteLocationAsRelativeGeneric,
} from 'vue-router'

// 从 element-plus icons 中引入图标组件
// Message 用作“图书管理”图标示例，Menu 重命名为 IconMenu 用作“用户管理”图标
import { Message, Menu as IconMenu } from '@element-plus/icons-vue'

/*
  获取路由实例与路由状态：
  - route: 当前路由对象，包含 path、params、query 等
  - router: 用于跳转页面（router.push）
*/
const route = useRoute()
const router = useRouter()

/*
  active 保存当前菜单应被高亮的索引值（这里使用 path，例如 "/book"）。
  使用 ref 包装是因为 active 会在模板中响应式使用。
*/
const active = ref(route.path)

/*
  监听路由 path 的变化：
  当路由发生改变时，把 active 更新为最新的 path，
  这样菜单的高亮状态会自动跟随路由切换。
*/
watch(
  () => route.path,
  (p) => {
    active.value = p
  },
)

/*
  go 函数：菜单点击时触发的回调。
  参数 index 是菜单项绑定的 index（我们此处把 index 设为路径字符串，如 "/book"）。
  - 如果目标路径存在并且与当前路由不同，就使用 router.push 跳转。
  - 参数类型中包含两种路由位置的类型，便于 TypeScript 检查。
*/
const go = (index: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric) => {
  if (index && route.path !== index) router.push(index)
}
</script>

<style scoped>
/* 布局容器：水平排列，撑满高度 */
.layout-container-demo {
  display: flex;
  min-height: 100vh;
}

/* 头部样式：居中、左右布局、渐变背景 */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 16px;
  background: linear-gradient(90deg, #00547d, #00aaa0);
  color: #fff;
}

/* 主内容区：内边距与高度计算，保证内容不被头部遮挡 */
.app-main {
  padding: 16px;
  box-sizing: border-box;
  min-height: calc(100vh - 64px);
}

/* 侧边栏背景与分割线 */
.aside {
  background: #f7f9fb;
  border-right: 1px solid #e6e6e6;
}

/* 响应式：窄屏时隐藏侧边栏（可结合汉堡菜单实现更复杂行为） */
@media (max-width: 768px) {
  .aside {
    display: none;
  }
}
</style>
