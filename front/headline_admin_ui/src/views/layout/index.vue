<script lang="ts">
export default { name: 'AppLayout' }
</script>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import {
  useRoute,
  useRouter,
  type RouteLocationAsPathGeneric,
  type RouteLocationAsRelativeGeneric,
} from 'vue-router'
import { ElMessage } from 'element-plus'
import { Menu as IconMenu } from '@element-plus/icons-vue'

// 登录用户信息结构
interface LoginUser {
  userId: number
  userName: string
  role: number // 0: 管理员, 1: 员工
  avatarUrl?: string
}

const route = useRoute()
const router = useRouter()
const active = ref(route.path)

// 当前登录用户
const currentUser = ref<LoginUser | null>(null)
// 默认头像
const DEFAULT_AVATAR = 'http://yumoni.top/upload/Transparent_Akkarin_Transparentized.png'

// 从 localStorage 读取 user 信息
const loadUser = () => {
  const raw = localStorage.getItem('login_user')
  if (!raw) {
    currentUser.value = null
    return
  }
  try {
    const parsed = JSON.parse(raw) as LoginUser
    // 如果 role 是字符串，转为数字以防万一
    parsed.role =
      typeof (parsed as any).role === 'string' ? Number((parsed as any).role) : parsed.role
    currentUser.value = parsed
    console.log('layout loadUser:', currentUser.value)
  } catch (e) {
    console.error('parse login_user error:', e)
    currentUser.value = null
  }
}

// 是否管理员（0 为管理员）
const isAdmin = computed(() => currentUser.value?.role === 0)

// 初始加载
onMounted(loadUser)

// 监听路由变化，高亮菜单 + 刷新用户
watch(
  () => route.path,
  (p) => {
    active.value = p
    loadUser()
  },
)

// 菜单点击
const go = (index: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric) => {
  if (index && route.path !== index) router.push(index)
}

// 退出登录
const logout = () => {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('login_user')
  ElMessage.success('已退出登录')
  router.replace('/login')
}
</script>

<template>
  <el-container class="layout-container-demo" style="min-height: 100vh">
    <!-- 左侧侧边栏 -->
    <el-aside width="220px" class="aside">
      <el-scrollbar>
        <el-menu :default-active="active" @select="go" class="el-menu-vertical-demo">
          <el-menu-item index="/user">
            <el-icon><IconMenu /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <!-- 右侧主区域 -->
    <el-container>
      <el-header class="app-header">
        <div class="title">头条后台管理系统</div>
        <div class="user-info" v-if="currentUser">
          <img :src="currentUser.avatarUrl || DEFAULT_AVATAR" class="avatar" alt="avatar" />
          <span class="user-name">{{ currentUser.userName }}</span>
          <span class="role-tag">{{ isAdmin ? '管理员' : '员工' }}</span>
          <el-button type="text" class="logout-btn" @click="logout">退出</el-button>
        </div>
        <div class="user-info" v-else>
          <span class="user-name">未登录</span>
        </div>
      </el-header>

      <el-main class="app-main">
        <!-- 传递 isAdmin 给子页面 -->
        <router-view :is-admin="isAdmin" />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container-demo {
  display: flex;
  min-height: 100vh;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 16px;
  background: linear-gradient(90deg, #00547d, #00aaa0);
  color: #fff;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-size: 14px;
}

.role-tag {
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
}

.logout-btn {
  color: #fff;
  padding: 0 4px;
}

.app-main {
  padding: 16px;
  box-sizing: border-box;
  min-height: calc(100vh - 64px);
}

.aside {
  background: #f7f9fb;
  border-right: 1px solid #e6e6e6;
}

@media (max-width: 768px) {
  .aside {
    display: none;
  }
}
</style>
