import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 1. 创建 axios 实例
const http = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

// 请求拦截器
http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')

    // 只要本地有 token，就统一加到请求头
    // 后端可以从 headers['token'] 里拿到
    if (token) {
      // 注意：有的服务端要求是 Authorization: Bearer xxx，这里按你的后端用 'token'
      config.headers['token'] = token
    }

    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error)
    const skipAuthRedirect = error?.config?.skipAuthRedirect
    if (error.response && error.response.status === 401) {
      if (skipAuthRedirect) {
        // 本次请求明确不需要跳登录，直接把错误抛回去由调用方处理
        return Promise.reject(error)
      }
      const currentFullPath = router.currentRoute.value.fullPath
      // 清理本地登录态
      localStorage.removeItem('token')
      localStorage.removeItem('login_user')
      // 跳转登录，并带上 redirect
      if (!['/login', '/register'].includes(router.currentRoute.value.path)) {
        router.push({ path: '/login', query: { redirect: currentFullPath || '/layout/home' } })
      }
    } else {
      ElMessage({
        message: error.message || '请求出错',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default http
