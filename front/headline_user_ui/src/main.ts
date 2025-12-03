
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './asset/main.css'
import pinia from '@/stores/index.js'

// 引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入富文本编辑器
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'


const app = createApp(App)
app.use(router)
app.use(ElementPlus) // 全局注册
app.use(pinia)
app.component('QuillEditor', QuillEditor)
app.mount('#app')
