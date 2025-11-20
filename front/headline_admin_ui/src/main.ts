import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import siteConfig from '@/lib/siteConfig.js'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'cherry-markdown/dist/cherry-markdown.css'

const app = createApp(App)
app.provide('siteConfig', siteConfig)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
