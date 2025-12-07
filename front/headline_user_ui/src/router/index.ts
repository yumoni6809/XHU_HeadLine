import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/Login/index.vue'
import Layout from '@/views/layout/index.vue'
import homeComponent from '@/views/home/index.vue'
import addNewArticle from '@/views/article/index.vue'
import userProfile from '@/views/user/index.vue'
import setting from '@/views/setting/index.vue'
import articleDetail from '@/views/detail/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'loginPage',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'registerPage',
    component: () => import('@/views/Login/Register.vue'),
  },
  {
    // 这里需要用articleId进行查询
    path: '/article',
    name: 'articlePage',
    component: articleDetail
  }

  // 测试页面路由
  ,{
    path: '/layout',
    component: Layout,
    children: [
      {
        path: '',
        redirect: '/layout/home'
      },
      {
        path: 'home',
        name: 'homePage',
        component:homeComponent
      },
      {
        path: 'addNewArticle',
        name: 'addNewArticlePage',
        component: addNewArticle
      },
      {
        path: 'user',
        name: 'userPage',
        component: userProfile
      },
      {
        path: 'setting',
        name: 'settingPage',
        component: setting
      }
    ]
  }

]



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // 定义不需要登录就能访问的页面路径
  const whiteList = ['/login', '/register']

  const token = localStorage.getItem('token')

  if (token) {
    // 如果已登录，且要去登录页、注册页或根路径
    if (whiteList.includes(to.path) || to.path === '/') {
      next('/layout/home')
    } else {
      next() // 放行去其他页面
    }
  } else {
    // 如果未登录
    if (whiteList.includes(to.path)) {
      next() // 去的是白名单页面
    } else {
      next('/login')
    }
  }
})


export default router
