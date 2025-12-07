import { useUserStore } from '@/stores/user/index.js'
import { useArticleDetailStore } from '@/stores/articleDetail'
import { useArticleHomeStore } from '@/stores/articleHome'
import { useCommentDetailStore } from '@/stores/commentDetail'
import { useAnimationTransitionStore } from '@/stores/animationTransition'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia
export {
  useUserStore,
  useArticleDetailStore,
  useArticleHomeStore,
  useCommentDetailStore,
  useAnimationTransitionStore
}

