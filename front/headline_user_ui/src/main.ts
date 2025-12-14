
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './asset/main.css'
import './stores/animationTransition/transitions.css'
import pinia from '@/stores/index.js'

const app = createApp(App)

// 引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入富文本编辑器
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

// 自定义ElPlus的命名
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 配置ElPlus对应的语言
const myLocale = {
  ...zhCn,
  el: {
    ...zhCn.el,
    pagination: {
      ...zhCn.el.pagination,
      goto: '跳转到',                   // 原来是 Go to
      total: '共{total}条',       // 原来是 Total {total}
      pagesize: '条/页',       // items / page
      pageClassifier: '页',            // Page
    },
  },
}
app.use(ElementPlus, {
  locale: myLocale
})



app.use(router)
app.use(ElementPlus) // 全局注册
app.use(pinia)
app.component('QuillEditor', QuillEditor)
app.mount('#app')


