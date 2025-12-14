<template>
  <Transition name="fade">
    <div v-if="visible" class="prompt-overlay">
      <div class="prompt-card">
        <!-- 流星背景特效 -->
        <div class="meteors-container">
          <Meteors :count="20" />
        </div>

        <!-- 内容区域 -->
        <div class="prompt-content">
          
          <!-- 模式 A: 登录提示 -->
          <template v-if="mode === 'login'">
            <h2 class="prompt-title">需要登录</h2>
            <p class="prompt-desc">
              当前操作需要登录账号<br/>
              请选择以下操作继续
            </p>
            <div class="prompt-actions">
              <button @click="handleLogin" class="btn-primary">立即登录</button>
              <button @click="handleRegister" class="btn-secondary">注册账号</button>
              <button @click="handleCancel" class="btn-text">暂不登录，返回</button>
            </div>
          </template>

          <!-- 模式 B: 退出确认 -->
          <template v-else>
            <h2 class="prompt-title text-red-400">退出登录</h2>
            <p class="prompt-desc">
              确定要退出当前账号吗？<br/>
              退出后将无法发布文章和评论。
            </p>
            <div class="prompt-actions">
              <button @click="handleLogoutConfirm" class="btn-primary logout-btn">确认退出</button>
              <button @click="handleCancel" class="btn-secondary">取消</button>
            </div>
          </template>

        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useLoginPromptStore } from '@/stores/loginPrompt'
import Meteors from '@/components/Meteors.vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const store = useLoginPromptStore()
const { visible, redirectPath, mode } = storeToRefs(store)

// === 登录逻辑 ===
const handleLogin = () => {
  store.hide()
  router.push({
    path: '/login',
    query: { redirect: redirectPath.value || router.currentRoute.value.fullPath }
  })
}

const handleRegister = () => {
  store.hide()
  router.push('/register')
}

// === 退出逻辑 ===
const handleLogoutConfirm = () => {
  // 清除 Token 和用户信息
  localStorage.removeItem('token')
  localStorage.removeItem('login_user')
  
  ElMessage.success('已退出登录')
  store.hide()
  
  // 跳转到登录页
  router.push('/login')
}

// === 通用 ===
const handleCancel = () => {
  store.hide()
}
</script>

<style scoped>
/* ...原有样式保持不变... */
.prompt-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}
.prompt-card {
  position: relative;
  width: 100%;
  max-width: 360px;
  height: 320px;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.meteors-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.prompt-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 0 32px;
}
.prompt-title {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 8px;
}
.prompt-desc {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 32px;
  line-height: 1.5;
}
.prompt-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}
.btn-primary {
  width: 100%;
  padding: 10px;
  border-radius: 12px;
  background-color: #3b82f6;
  color: white;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}
.btn-primary:hover { background-color: #2563eb; }

.btn-secondary {
  width: 100%;
  padding: 10px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: background-color 0.2s;
}
.btn-secondary:hover { background-color: rgba(255, 255, 255, 0.2); }

.btn-text {
  background: none;
  border: none;
  color: #64748b;
  font-size: 12px;
  cursor: pointer;
  margin-top: 4px;
}
.btn-text:hover { color: #94a3b8; }

/* 退出按钮特有样式 */
.logout-btn {
  background-color: #ef4444; /* 红色 */
}
.logout-btn:hover {
  background-color: #dc2626;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>