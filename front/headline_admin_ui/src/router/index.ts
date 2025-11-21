import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import LoginView from '@/views/Login/index.vue'
import UserView from '@/views/user/index.vue'
import PortView from '@/port/index.vue'
import PortEditor from '@/port/editor.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        redirect: '/user',
      },
      {
        path: '/user',
        name: 'User',
        component: UserView,
      },
      {
        path: '/port',
        name: 'Port',
        component: PortView,
      },
      {
        path: '/port/editor/:id?',
        name: 'PortEditor',
        component: PortEditor,
      },
    ],
  },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 简单路由守卫：未登录跳转登录页
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('auth_token')
  if (!token && to.path !== '/login') {
    next('/login')
  } else if (token && to.path === '/login') {
    next('/user')
  } else {
    next()
  }
})

export default router
