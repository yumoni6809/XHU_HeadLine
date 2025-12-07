import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://localhost:8080'

const instance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
})

// 请求拦截器：在每次请求前，自动从 localStorage 读取 token，放到请求头中
http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
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
    // 如果是 401 未授权，通常意味着 token 过期或无效
    if (error.response && error.response.status === 401) {
      ElMessage.error('登录已过期，请重新登录')
      localStorage.removeItem('token')
      router.push('/login')
    } else {
      ElMessage({
        message: error.message || '请求出错',
        type: 'error',
        duration: 5 * 1000
      })
    }
    else {
      return config
    }
  }, (err)=> {
    Promise.reject(err)
  }
)

export default http
