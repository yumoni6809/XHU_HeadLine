import axios from 'axios'

// 创建一个 axios 实例，统一管理所有接口请求
const http = axios.create({
  // 所有请求都会以 /api 开头，通过 Vite 代理转发到后端 http://localhost:7111
  baseURL: '/api',
  timeout: 10000,
})

// 请求拦截器：在每次请求前，自动从 localStorage 读取 token，放到请求头中
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')

    if (token) {
      config.headers = config.headers || {}
      config.headers.token = token
    }

    return config
  },
  (error) => Promise.reject(error),
)

http.interceptors.response.use(
  (resp) => resp.data,
  (error) => Promise.reject(error),
)

export default http
