import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/Login/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: '/register',
    component: () => import('@/views/Login/Register.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
