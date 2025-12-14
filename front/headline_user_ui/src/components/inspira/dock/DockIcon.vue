```vue
// filepath: f:\Develop\project\XHU_HeadLine\XHU_HeadLine\front\headline_user_ui\src\components\inspira\dock\DockIcon.vue
<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import {
  MOUSE_X_INJECTION_KEY,
  MOUSE_Y_INJECTION_KEY,
  MAGNIFICATION_INJECTION_KEY,
  DISTANCE_INJECTION_KEY,
  ORIENTATION_INJECTION_KEY,
} from './injectionKeys'
import type { DataOrientation } from './types'
import { cn } from '@/lib/utils'

const mouseX = inject(MOUSE_X_INJECTION_KEY)!
const mouseY = inject(MOUSE_Y_INJECTION_KEY)!
const magnification = inject(MAGNIFICATION_INJECTION_KEY)!
const distance = inject(DISTANCE_INJECTION_KEY)!
const orientation = inject<DataOrientation>(ORIENTATION_INJECTION_KEY, 'horizontal')

const iconRef = ref<HTMLElement | null>(null)
const iconSize = 40

const scale = computed(() => {
  if (!iconRef.value) return 1

  const rect = iconRef.value.getBoundingClientRect()
  const iconCenterX = rect.left + rect.width / 2
  const iconCenterY = rect.top + rect.height / 2

  const dx = mouseX.value - iconCenterX
  const dy = mouseY.value - iconCenterY

  const d = orientation === 'horizontal' ? Math.abs(dx) : Math.abs(dy)
  if (d > distance.value) return 1

  const ratio = 1 - d / distance.value
  const extra = (magnification.value / 100) * ratio
  return 1 + extra
})

const style = computed(() => ({
  width: `${iconSize}px`,
  height: `${iconSize}px`,
  transform: `scale(${scale.value})`,
}))
</script>

<template>
  <button
    ref="iconRef"
    type="button"
    :class="cn(
      'flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 transition-transform duration-150',
      'hover:bg-black/10 dark:hover:bg-white/10',
    )"
    :style="style"
  >
    <slot />
  </button>
</template>
