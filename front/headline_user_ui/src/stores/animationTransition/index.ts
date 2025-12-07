import { defineStore, StoreDefinition } from 'pinia'
import { ref, Ref} from 'vue'

export const useAnimationTransitionStore = defineStore('AnimationTransitionInfo', ():any=>{
  const transitionDirection = ref('forward')

  // 修改参数
  const setTransitionDirection = (position:string)=> {
    transitionDirection.value = position
  }

  return {
    transitionDirection,
    setTransitionDirection
  }
})

