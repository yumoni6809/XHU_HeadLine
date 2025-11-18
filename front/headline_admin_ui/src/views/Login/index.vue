<template>
  <AuroraBackground class="bg-wrapper">
    <div class="login-overlay">
      <div class="login-panel">
        <el-card class="login-card" shadow="always">
          <h3 class="title">系统登录</h3>

          <el-form :model="form" :rules="rules" ref="formRef" label-position="left" label-width="0">
            <!-- 使用 VanishingInput 特效 -->
            <el-form-item prop="userName" class="form-item-vanish">
              <VanishingInput
                v-model="form.userName"
                :placeholders="namePlaceholders"
                @submit="onVanishingSubmitName"
              />
            </el-form-item>

            <!-- 使用 VanishingInput（同样组件）-->
            <el-form-item prop="password" class="form-item-vanish">
              <VanishingInput
                v-model="form.password"
                :placeholders="passwordPlaceholders"
                @submit="onVanishingSubmitPassword"
              />
            </el-form-item>

            <el-form-item>
              <el-checkbox v-model="form.remember">记住我</el-checkbox>
            </el-form-item>

            <el-form-item>
              <!-- 使用 RainbowButton 作为提交按钮 -->
              <div class="btn-wrap">
                <RainbowButton @click="onSubmit">登录</RainbowButton>
              </div>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </AuroraBackground>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import AuroraBackground from '@/components/AuroraBackground.vue'
import VanishingInput from '@/components/inspira/VanishingInput.vue'
import RainbowButton from '@/components/inspira/RainbowButton.vue'

const router = useRouter()
const route = useRoute()
const formRef = ref()

// 登录表单数据
const form = reactive({
  userName: '',
  password: '',
  remember: false,
})

// 基本校验规则
const rules = {
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

// VanishingInput 占位内容
const namePlaceholders = ['请输入用户名', '示例：alice']
const passwordPlaceholders = ['请输入密码', '长度建议 8+ 位', '区分大小写']

// VanishingInput 提交时同步到 form
function onVanishingSubmitName(val: string) {
  form.userName = val
}
function onVanishingSubmitPassword(val: string) {
  form.password = val
}

// 点击登录按钮
const onSubmit = async () => {
  try {
    const resp = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: form.userName,
        password: form.password,
      }),
    })
    const json = await resp.json()
    console.log('login response:', json)

    if (json.code != 1 || !json.data?.token) {
      ElMessage.error(json.message || '用户名或密码错误')
      return
    }

    const loginInfo = json.data

    const roleNumber = typeof loginInfo.role === 'string' ? Number(loginInfo.role) : loginInfo.role

    // loginInfo 中应包含 role（0 管理员 / 1 员工）
    localStorage.setItem('auth_token', loginInfo.token)
    localStorage.setItem(
      'login_user',
      JSON.stringify({
        userId: loginInfo.userId,
        userName: loginInfo.userName,
        role: roleNumber,
        avatarUrl: loginInfo.avatarUrl || '',
      }),
    )
    console.log('after setItem auth_token:', localStorage.getItem('auth_token'))

    ElMessage.success('登录成功')
    const redirect = (route.query.redirect as string) || '/user'
    router.replace(redirect)
  } catch (err) {
    console.error(err)
    ElMessage.error('登录失败，请检查网络或服务器')
  }
}
</script>

<style scoped>
/* 背景容器，保持背景组件充满视口 */
.bg-wrapper {
  position: relative;
  min-height: 100vh;
  display: block;
  overflow: hidden;
}

/* 覆盖层：使登录面板在背景正中央 */
.login-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

/* 登录面板允许交互 */
.login-panel {
  width: 460px;
  z-index: 10;
  pointer-events: auto;
}

/* 卡片：圆角矩形 */
.login-card {
  padding: 28px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.96);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  color: #222;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

/* 标题：黑色且居中 */
.title {
  margin: 0 0 16px 0;
  font-size: 22px;
  text-align: center;
  color: #000000;
  font-weight: 600;
}

/* VanishingInput 容器让两个输入外观一致 */
.form-item-vanish {
  margin-bottom: 14px;
}
/* 若 VanishingInput 内部需要填充样式，可在这里调整 wrapper */
.form-item-vanish > * {
  width: 100%;
  display: block;
}

/* Rainbow 按钮外层居中且铺满 */

/* 保证按钮有合理宽度 */
.btn-wrap ::v-deep button,
.btn-wrap ::v-deep .rainbow-button {
  min-width: 220px;
  border-radius: 8px;
  display: block;
}
/* 窗口窄时折叠布局：隐藏背景交互，表单仍居中 */
@media (max-width: 1000px) {
  .bg-wrapper {
    min-height: auto;
  }
  .login-overlay {
    position: static;
    padding: 24px 0;
  }
  .login-panel {
    width: 92%;
    max-width: 460px;
    margin: 0 auto;
  }
  .login-card {
    background: rgba(255, 255, 255, 0.98);
  }
}
</style>
