import { useLoginPromptStore } from '@/stores/loginPrompt' 

/**
 * 检查当前是否已登录
 * 返回：
 *  - true：已登录
 *  - false：未登录（弹出全局登录弹窗）
 */
export async function ensureLogin () {
  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('login_user')

  const isLoggedIn = !!token && !!userStr
  if (isLoggedIn) {
    return true
  }

  // 未登录，调用 Store 显示弹窗
  const loginPromptStore = useLoginPromptStore()
  loginPromptStore.show() // 不传路径，默认登录后返回当前页

  return false
}