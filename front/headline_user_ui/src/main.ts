
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './asset/main.css'

// 引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(ElementPlus) // 全局注册
app.mount('#app')
