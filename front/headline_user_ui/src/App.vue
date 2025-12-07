<template>
  <Transition :name="transitionDirection" mode="out-in">
    <router-view />
  </Transition>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAnimationTransitionStore } from './stores';
const animationTransitionStore = useAnimationTransitionStore()
const { transitionDirection } = storeToRefs(animationTransitionStore)

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
</style>
