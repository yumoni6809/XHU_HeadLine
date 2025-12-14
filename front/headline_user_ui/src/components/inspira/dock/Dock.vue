```vue
// filepath: f:\Develop\project\XHU_HeadLine\XHU_HeadLine\front\headline_user_ui\src\components\inspira\dock\Dock.vue
<script setup lang="ts">
import { ref, computed, provide, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import type { DataOrientation, Direction } from './types'
import {
  MOUSE_X_INJECTION_KEY,
  MOUSE_Y_INJECTION_KEY,
  MAGNIFICATION_INJECTION_KEY,
  DISTANCE_INJECTION_KEY,
  ORIENTATION_INJECTION_KEY,
} from './injectionKeys'

interface DockProps {
  class?: HTMLAttributes['class']
  magnification?: number
  distance?: number
  direction?: Direction
  orientation?: DataOrientation
}

const props = withDefaults(defineProps<DockProps>(), {
  magnification: 60,
  distance: 140,
  direction: 'middle',
  orientation: 'horizontal',
})

const dockRef = ref<HTMLElement | null>(null)
const mouseX = ref(Infinity)
const mouseY = ref(Infinity)
const magnification = computed(() => props.magnification)
const distance = computed(() => props.distance)

const dockClass = computed(() => ({
  'items-start': props.direction === 'top',
  'items-center': props.direction === 'middle',
  'items-end': props.direction === 'bottom',
}))

function onMouseMove(e: MouseEvent) {
  requestAnimationFrame(() => {
    mouseX.value = e.pageX
    mouseY.value = e.pageY
  })
}

function onMouseLeave() {
  requestAnimationFrame(() => {
    mouseX.value = Infinity
    mouseY.value = Infinity
  })
}

provide(MOUSE_X_INJECTION_KEY, mouseX)
provide(MOUSE_Y_INJECTION_KEY, mouseY)
provide(ORIENTATION_INJECTION_KEY, props.orientation)
provide(MAGNIFICATION_INJECTION_KEY, magnification)
provide(DISTANCE_INJECTION_KEY, distance)
</script>
<template>
  <div
    ref="dockRef"
    :class="
      cn(
        // 更透明的毛玻璃悬浮条
        'mx-auto flex h-[64px] w-max gap-4 rounded-3xl border border-white/20',
        'bg-white/18 dark:bg-black/18',      // 比之前更透明一点
        'backdrop-blur-xl backdrop-saturate-150',
        'shadow-[0_16px_35px_rgba(15,23,42,0.35)]',
        'px-4 py-2',
        'transition-all duration-300 ease-out',
        orientation === 'vertical' && 'flex-col w-[64px] h-max',
        props.class,
        dockClass,
      )
    "
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <slot />
  </div>
</template>
