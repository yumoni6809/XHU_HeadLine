import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginPromptStore = defineStore('loginPrompt', () => {
  const visible = ref(false)
  const redirectPath = ref('')
  // mode: 'login' | 'logout'
  const mode = ref<'login' | 'logout'>('login')

  // 显示登录提示
  const show = (path?: string) => {
    mode.value = 'login'
    redirectPath.value = path || ''
    visible.value = true
  }

  // 显示退出确认
  const showLogout = () => {
    mode.value = 'logout'
    visible.value = true
  }

  const hide = () => {
    visible.value = false
    redirectPath.value = ''
  }

  return { visible, redirectPath, mode, show, showLogout, hide }
})