<template>
  <!-- 全局登录弹窗 -->
  <LoginPrompt />
  
  <!-- 路由视图 -->
  <router-view v-slot="{ Component, route }">
    <!-- 
      使用 computed 计算出的 transitionName
      绑定 :key="route.path" 确保路由变化时强制触发动画
    -->
    <Transition :name="transitionName" mode="out-in">
      <component :is="Component" :key="route.path" />
    </Transition>
  </router-view>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue' 
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useAnimationTransitionStore } from './stores';
import LoginPrompt from '@/components/LoginPrompt.vue' 

const route = useRoute()
const animationTransitionStore = useAnimationTransitionStore()
const { transitionDirection, enableAnimation, animationType } = storeToRefs(animationTransitionStore)
const { setTransitionDirection } = animationTransitionStore

watch(
  () => route.meta.depth,
  (newDepth, oldDepth) => {
    if (newDepth === undefined || oldDepth === undefined || newDepth === oldDepth) return
    if ((newDepth as number) > (oldDepth as number)) {
      setTransitionDirection('forward')
    } else {
      setTransitionDirection('backward')
    }
  }
)


//  计算最终动画名称 (核心修复点)
const transitionName = computed(() => {
  // 优先级 1: 全局开关关闭 -> 无动画
  if (!enableAnimation.value) return ''
  
  // 优先级 2: 全局设置为淡入淡出 -> 强制使用 fade
  if (animationType.value === 'fade') return 'fade'
  
  // 优先级 3: 默认为滑动 -> 使用 store 中的方向
  return transitionDirection.value
})
</script>

<style scoped>
/* 页面切换的动画效果 */
/* 前进的动画效果 */
/* ################################################################## */
/* ################################################################## */
/* ################################################################## */
/* 进入 & 离开时的过渡属性 */
.forward-enter-active,
.forward-leave-active {
  transition: all 0.5s ease;
}

/* 进入前的初始状态 */
.forward-enter-from {
  opacity: 0.2;
  transform: translateX(300px);
}

/* 进入后的结束状态 */
.forward-enter-to {
  opacity: 1;
  transform: translateX(0);
}

/* 离开前的初始状态 */
.forward-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/* 离开后的结束状态 */
.forward-leave-to {
  opacity: 0.2;
  transform: translateX(-300px);
}

/* 页面切换的动画效果 */
/* 返回的动画效果 */
/* ################################################################## */
/* ################################################################## */
/* ################################################################## */
/* 进入 & 离开时的过渡属性 */
.backward-enter-active,
.backward-leave-active {
  transition: all 0.5s ease;
}

/* 进入前的初始状态 */
.backward-enter-from {
  opacity: 0.2;
  transform: translateX(-300px);
}

/* 进入后的结束状态 */
.backward-enter-to {
  opacity: 1;
  transform: translateX(0);
}

/* 离开前的初始状态 */
.backward-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/* 离开后的结束状态 */
.backward-leave-to {
  opacity: 0.2;
  transform: translateX(300px);
}

/* === 新增：淡入淡出动画 (Fade) === */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
  position: absolute; 
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* === 滑动 (Slide) === */
.forward-enter-active,
.forward-leave-active,
.backward-enter-active,
.backward-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff; /* 避免透明重叠 */
  z-index: 1;
}

/* Forward: 右进左出 */
.forward-enter-from { opacity: 0; transform: translateX(100%); }
.forward-enter-to { opacity: 1; transform: translateX(0); }
.forward-leave-from { opacity: 1; transform: translateX(0); }
.forward-leave-to { opacity: 0; transform: translateX(-30%); } /* 视差效果 */

/* Backward: 左进右出 */
.backward-enter-from { opacity: 0; transform: translateX(-30%); }
.backward-enter-to { opacity: 1; transform: translateX(0); }
.backward-leave-from { opacity: 1; transform: translateX(0); }
.backward-leave-to { opacity: 0; transform: translateX(100%); }

</style>
