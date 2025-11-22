<template>
  <AuroraBackground class="bg-wrapper">
    <div class="register-overlay">
      <div class="register-card">
        <div class="name-block">
          <h2 class="title">
            如何称呼你?
          </h2>
          <VanishingInput
            v-model="name"
            :placeholders="namePlaceholders"
            @submit="onNameSubmit"
          />

          <p v-if="name" class="greet">
            很高兴认识你，<span class="greet-name">{{ name }}</span>
          </p>
        </div>

        <div v-show="showDetailForm" class="detail-form">
          <IInput
            v-model="password"
            type="password"
            placeholder="请输入密码"
            container-class="field-wrapper"
          />

          <IInput
            v-model="confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            container-class="field-wrapper"
          />

          <IInput
            v-model="phone"
            type="tel"
            placeholder="请输入手机号"
            container-class="field-wrapper"
          />

          <div class="actions">
            <RainbowButton @click="onSubmit">
              完成注册
            </RainbowButton>
          </div>

          <p class="hint">
            已有账号？
            <span class="link" @click="goLogin">去登录</span>
          </p>
        </div>
      </div>
    </div>
  </AuroraBackground>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AuroraBackground from '@/components/AuroraBackground.vue'
import VanishingInput from '@/components/inspira/VanishingInput.vue'
import IInput from '@/components/IInput.vue'
import RainbowButton from '@/components/inspira/RainbowButton.vue'
import { ElMessage } from 'element-plus'

const router = useRouter()

const name = ref('')
const namePlaceholders = ['如何称呼你？', '例如：小明 / 小李 / 一只前端菜鸟']

const password = ref('')
const confirmPassword = ref('')
const phone = ref('')

const showDetailForm = computed(() => !!name.value.trim())

const onNameSubmit = (val: string) => {
  name.value = val.trim()
  if (!name.value) {
    ElMessage.warning('请先告诉我如何称呼你～')
  }
}

const onSubmit = () => {
  if (!name.value.trim()) {
    ElMessage.warning('请先填写昵称')
    return
  }
  if (!password.value) {
    ElMessage.warning('请输入密码')
    return
  }
  if (password.value.length < 6) {
    ElMessage.warning('密码长度至少 6 位')
    return
  }
  if (password.value !== confirmPassword.value) {
    ElMessage.error('两次输入的密码不一致')
    return
  }
  if (!phone.value) {
    ElMessage.warning('请输入手机号')
    return
  }

  ElMessage.success('注册成功，快去登录吧！')
  router.push('/login')
}

const goLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
/* 和登录页类似的背景布局 */
.bg-wrapper {
  position: relative;
  min-height: 100vh;
  display: block;
  overflow: hidden;
}

.register-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

/* 中间卡片容器 */
.register-card {
  width: 100%;
  max-width: 480px;
  padding: 2.5rem 2rem 2.25rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.18);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  pointer-events: auto;

  /* 进入时整体上浮一点 */
  opacity: 0;
  transform: translateY(10px);
  animation: cardFadeUp 0.25s ease-out forwards;
}

/* 上半部分 */
.name-block {
  width: 100%;
  text-align: center;
  margin-bottom: 1.75rem;
}

.title {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  line-height: 1.2;
  font-weight: 600;
  color: #111827;
}

.greet {
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #6b7280;
}

.greet-name {
  color: #111827;
  font-weight: 600;
}

/* 下半部分 */
.detail-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;

  opacity: 0;
  transform: translateY(6px);
  animation: formFadeUp 0.25s ease-out forwards;
}

/* IInput 外层容器尺寸 */
.field-wrapper {
  width: 100%;
}

/* 按钮区域 */
.actions {
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
}

.actions :deep(.rainbow-button) {
  min-width: 220px;
  border-radius: 999px;
}

/* 底部提示 */
.hint {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #9ca3af;
  text-align: center;
}

.link {
  color: #3b82f6;
  cursor: pointer;
}

.link:hover {
  text-decoration: underline;
}

/* 卡片整体上浮动画 */
@keyframes cardFadeUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 下半部分表单上浮动画 */
@keyframes formFadeUp {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 小屏适配 */
@media (max-width: 768px) {
  .register-overlay {
    position: static;
    padding: 24px 0;
  }

  .register-card {
    padding: 2rem 1.25rem 1.75rem;
  }

  .title {
    font-size: 1.5rem;
  }
}
</style>
