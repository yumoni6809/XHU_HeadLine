import axios from 'axios'
import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'

const baseURL = 'http//localhost:8080'

const instance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
})

// 配置interceptor
instance.interceptors.request.use (
  (config)=> {
    const userStore = useUserStore()
    const { token } = storeToRefs(userStore)
    // 每次请求前动态读取最新 token
    const parseToken = token.value || JSON.parse(localStorage.getItem('YumoniUserInfoStorage'))?.token

    // 如果有，则设置
    if (parseToken) {
      config.headers.token = parseToken
      return config
    }
  }, (err)=> {
    Promise.reject(err)
  }
)

export default instance
