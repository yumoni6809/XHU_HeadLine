import { createRouter, createWebHistory } from 'vue-router'
import LayoutView from '@/views/layout/index.vue'
import BookView from '@/views/book/index.vue'
import UserView from '@/views/user/index.vue'

const routes = [
  {
    path: '/',
    component: LayoutView,
    redirect: '/book', // 根访问自动跳到 /book
    children: [
      { path: 'book', name: 'book', component: BookView },
      { path: 'user', name: 'user', component: UserView },
    ],
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
