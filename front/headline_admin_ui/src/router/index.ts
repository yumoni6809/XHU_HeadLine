import { createRouter, createWebHistory } from 'vue-router'
import LayoutView from '@/views/layout/index.vue'
import UserView from '@/views/user/index.vue'
import LoginView from '@/views/Login/index.vue'

const routes = [
  // 登录页：单独显示，不在 Layout 下
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  // 需要登录的业务页面放在 Layout 下
  {
    path: '/',
    component: LayoutView,
    redirect: '/user',
    children: [{ path: 'user', name: 'user', component: UserView }],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 未登录时只允许访问 /login
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth_token')
  console.log('[router.beforeEach] to:', to.path, 'token:', token)

  // 未登录：只放行 /login，其余全部重定向到 /login
  if (!token) {
    if (to.path !== '/login') {
      return next({ path: '/login', replace: true })
    }
    return next()
  }

  // 已登录：访问 /login 时重定向到用户管理页，其余正常放行
  if (to.path === '/login') {
    return next({ path: '/user', replace: true })
  }

  return next()
})

export default router
