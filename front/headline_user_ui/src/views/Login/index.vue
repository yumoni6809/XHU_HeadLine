<template>
  <AuroraBackground class="bg-wrapper">
    <div class="login-overlay">
      <div class="login-panel">
        <el-card class="login-card" shadow="always">
          <h3 class="title">欢迎登录西瓜头条</h3>

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
          <div class="go-register" @click="goRegister">没有账号？去注册</div>
        </el-form-item>

            <el-form-item>
              <!-- 使用 RainbowButton 作为提交按钮 -->
              <div class="btn-wrap">
                <RainbowButton @click="handleLogin">登录</RainbowButton>
              </div>
            </el-form-item>
          </el-form>
        </el-card>
        <!-- 暂不登录，继续使用 -->
        <button
          type="button"
          class="w-full py-2 text-sm text-gray-600 hover:text-blue-500"
          @click="handleSkipLogin"
        >
          暂不登录，继续使用
        </button>
      </div>
    </div>
  </AuroraBackground>
</template>

<script setup lang="ts">
import request from '@/utils/axios/main.js'
import { useRouter ,useRoute} from 'vue-router'
import { ref , reactive } from 'vue'
import { ElMessage } from 'element-plus'
import AuroraBackground from '@/components/AuroraBackground.vue'
import VanishingInput from '@/components/inspira/VanishingInput.vue'
import RainbowButton from '@/components/inspira/RainbowButton.vue'

const router = useRouter()
const route = useRoute()


const goRegister = () => {
  router.push('/register')
}

// 登录表单（根据你实际表单字段调整）
const form = reactive({
  userName: '',
  password: '',
})

// 是否正在提交
const loading = ref(false)


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
const handleLogin = async () => {
  if (!form.userName || !form.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }

  loading.value = true
  try {
    const res:any = await request.post('/user/login', {
      userName: form.userName,
      password: form.password,
    })

    // axios 拦截器已解包，所以 res 就是 { code, data }
    if (res.code !== 1) {
      ElMessage.error(res.message || '登录失败')
      return
    }

    const data = res.data
    if (!data?.token) {
      ElMessage.error('登录异常：未获取到 Token')
      return
    }

    const roleNumber = typeof data.role === 'string'
      ? Number(data.role)
      : data.role

    // 1. 持久化 token
    localStorage.setItem('token', data.token)

    // 2. 持久化当前登录用户信息
    const loginUser = {
      userId: data.userId,
      userName: data.userName,
      role: roleNumber,
      // 后端目前没有头像字段，将来一旦提供 avatarUrl，这里会自动带上
      avatarUrl: data.avatarUrl || '',
    }
    localStorage.setItem('login_user', JSON.stringify(loginUser))

    ElMessage.success('登录成功')

    // 如果有来源页面（例如 detail 页带了 redirect 参数），优先跳回去
    const redirect = route.query.redirect as string | undefined
    if (redirect) {
      router.push(redirect)
    } else {
      router.push('/layout/home')
    }
  } catch (err) {
    console.error(err)
    ElMessage.error('登录失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 暂不登录，继续使用：返回上一页；如果没有上一页，则去首页
const handleSkipLogin = () => {
  const redirect = route.query.redirect as string
  
  if (redirect) {
    try {
      // 解析目标路由，查看是否需要登录
      const targetRoute = router.resolve(redirect)
      
      // 如果目标页面不需要登录（例如文章详情页），则允许跳回去
      if (targetRoute && !targetRoute.meta.requiresAuth) {
        router.push(redirect)
        return
      }
    } catch (e) {
      console.warn('解析重定向路由失败', e)
    }
  }
  
  // 其他情况（目标需要登录，或无来源），统一回首页
  router.push('/layout/home')
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

.btn-wrap {
  display: flex;
  justify-content: center; /* 水平居中 */
}

/* 控制彩虹按钮本身的最小宽度和圆角 */
.btn-wrap :deep(.rainbow-button) {
  min-width: 220px;
  border-radius: 8px;
}
:deep(.el-form-item__content) {
  justify-content: center;
}

/* 底部信息样式 */
.login-footer {
  margin-top: 16px;
  font-size: 12px;
  color: #999;
  text-align: center;
  pointer-events: auto;
}

.login-footer > div + div {
  margin-top: 2px;
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

/* 注册链接样式 */
.go-register {
  margin-left: auto;
  font-size: 12px;
  color: #409eff;
  cursor: pointer;
}

.go-register:hover {
  text-decoration: underline;
}

</style>
