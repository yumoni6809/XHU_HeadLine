<script setup lang="ts">
import { inject, computed } from 'vue'
import { ORIENTATION_INJECTION_KEY } from './injectionKeys'
import type { DataOrientation } from './types'
import { cn } from '@/lib/utils'

const orientation = inject<DataOrientation>(ORIENTATION_INJECTION_KEY, 'horizontal')

const separatorClass = computed(() =>
  orientation === 'horizontal'
    ? 'w-px h-8'
    : 'h-px w-8',
)
</script>

<template>
  <div class="flex items-center justify-center">
    <div
      :class="cn(
        separatorClass,
        'bg-black/10 dark:bg-white/20 rounded-full',
      )"
    />
  </div>
</template>
