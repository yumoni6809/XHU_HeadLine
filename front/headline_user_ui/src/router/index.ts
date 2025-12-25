import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/Login/index.vue'
import Layout from '@/views/layout/index.vue'
import homeComponent from '@/views/home/index.vue'
import addNewArticle from '@/views/article/index.vue'
import userProfile from '@/views/user/index.vue'
import setting from '@/views/setting/index.vue'
import articleDetail from '@/views/detail/index.vue'
import { useLoginPromptStore } from '@/stores/loginPrompt'


const routes = [
  {
    path: '/',
    redirect: '/layout/home',
  },
    {
    path: '/login',
    name: 'loginPage',
    component: LoginView,
    // 强制使用 fade 动画，深度 30
    meta: { depth: 30, transition: 'fade' } 
  },
  {
    path: '/register',
    name: 'registerPage',
    component: () => import('@/views/Login/Register.vue'),
    // 强制使用 fade 动画，深度 40
    meta: { depth: 40, transition: 'fade' } 
  },
  {
    path: '/article',
    name: 'articlePage',
    component: articleDetail,
    meta: { depth: 20 }
  },
  {
    path: '/layout',
    component: Layout,
    meta: { depth: 10 },
    children: [
      {
        path: '',
        redirect: '/layout/home'
      },
      {
        path: 'home',
        name: 'homePage',
        component: homeComponent,
        meta: { animation: true, index: 1, depth: 10 } 
      },
      {
        path: 'addNewArticle',
        name: 'addNewArticlePage',
        component: addNewArticle,
        meta: { requiresAuth: true, animation: true, index: 2, depth: 10 } 
      },
      {
        path: 'user',
        name: 'userPage',
        component: userProfile,
        meta: { requiresAuth: true, animation: true, index: 3, depth: 10 }
      },
      {
        path: 'setting',
        name: 'settingPage',
        component: setting,
        meta: { requiresAuth: true, animation: true, index: 4, depth: 10 }
      }
    ]
  }
]



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // 白名单路由：不需要登录即可访问
  const whiteList = ['/', '/login', '/register', '/layout', '/layout/home', '/article']
  const token = localStorage.getItem('token')

  // 已登录且想去登录/注册，直接回首页
  if (token && ['/login', '/register', '/'].includes(to.path)) {
    next('/layout/home')
    return
  }

  // 需要登录的路由，才做校验
  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      // === 修改部分开始 ===
      // 不直接跳转，而是弹出全局登录框，并取消本次导航
      const loginPromptStore = useLoginPromptStore()
      loginPromptStore.show(to.fullPath)
      next(false) 
      // === 修改部分结束 ===
    }
    return
  }

  next()
})

/** 返回 true 表示已登录，可继续；false 表示已跳转去登录 */
export function ensureLogin(): boolean {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('login_user')

  if (token && user) return true

  const current = router.currentRoute.value.fullPath || '/layout/home'
  router.push({ path: '/login', query: { redirect: current } })
  return false
}


export default router
