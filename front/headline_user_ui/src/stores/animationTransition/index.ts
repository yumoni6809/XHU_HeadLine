import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnimationTransitionStore = defineStore('AnimationTransitionInfo', () => {
  const transitionDirection = ref('forward')
  const enableAnimation = ref(true)
  
  const animationType = ref('fade') 

  const setTransitionDirection = (direction: string) => {
    transitionDirection.value = direction
  }
  
  const setEnableAnimation = (enable: boolean) => {
    enableAnimation.value = enable
  }

  const setAnimationType = (type: string) => {
    animationType.value = type
  }

  return {
    transitionDirection,
    enableAnimation,
    animationType,
    setTransitionDirection,
    setEnableAnimation,
    setAnimationType
  }
})