<template>
  <MotionConfig
    :transition="{
      duration: 0.7,
      type: 'spring',
      bounce: 0.5,
    }"
  >
    <div
      :class="
        cn(
          'fixed left-1/2 top-2 z-[999] -translate-x-1/2 bg-transparent backdrop-blur-lg border-radius',
          $props.class,
        )
      "
      @click="() => (open = !open)"
    >
      <motion.div
        id="motion-id"
        layout
        :initial="{
          height: props.height,
          width: 0,
        }"
        :animate="{
          height: open && isSlotAvailable ? 'auto' : props.height,
          width: open && isSlotAvailable ? 320 : 260,
        }"
        class="relative cursor-pointer overflow-hidden text-black bg-transparent"
      >
        <header class="gray- flex h-11 cursor-pointer items-center gap-2 px-4">
          
          <!-- 进度环 -->
          <div class="relative flex items-center justify-center w-6 h-6">
            <svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <!-- 背景圆环：浅灰色 -->
              <path class="text-gray-300" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="4" />
              <!-- 进度圆环：纯黑色 -->
              <path 
                :stroke-dasharray="scrollPercentage * 100 + ', 100'"
                class="text-black transition-all duration-300 ease-out"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" 
                stroke="currentColor" 
                stroke-width="4" 
              />
            </svg>
          </div>

          <!-- 标题：强制黑色 -->
          <h1 class="grow text-center font-bold text-black">{{ title }}</h1>
          
          <!-- 数字：强制黑色 -->
          <div class="text-black">
            <NumberFlow
              :value="scrollPercentage"
              :format="{ style: 'percent' }"
              locales="en-US"
            />
          </div>
        </header>
        <motion.div
          v-if="isSlotAvailable"
          class="mb-2 flex h-full max-h-60 flex-col gap-1 overflow-y-auto px-4 text-sm text-black"
        >
          <slot />
        </motion.div>
      </motion.div>
    </div>
  </MotionConfig>
</template>

<script lang="ts" setup>
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/vue";
import { useColorMode } from "@vueuse/core";
import { motion, MotionConfig } from "motion-v";
import { computed, onMounted, onUnmounted, ref, useSlots } from "vue";

interface Props {
  class?: string;
  title?: string;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  class: "",
  title: "Progress",
  height: 44,
});

const open = ref(false);
const slots = useSlots();

const isDark = computed(() => useColorMode().value == "dark");
const isSlotAvailable = computed(() => !!slots.default);
const borderRadius = computed(() => `${props.height / 2}px`);

const scrollPercentage = ref(0)
const scrollTarget = ref<HTMLElement | null>(null)

function updatePageScroll() {
  if (!scrollTarget.value) return
  const el = scrollTarget.value
  const total = el.scrollHeight - el.clientHeight
  if (total <= 0) {
    scrollPercentage.value = 0
    return
  }
  scrollPercentage.value = Math.min(Math.max(el.scrollTop / total, 0), 1)
}

onMounted(() => {
  if (typeof window === 'undefined') return
  // 确保这里选择器对应你文章详情页的滚动容器 class
  scrollTarget.value = document.querySelector('.middlePartDisplay') as HTMLElement | null
  if (!scrollTarget.value) return
  scrollTarget.value.addEventListener('scroll', updatePageScroll)
  updatePageScroll()
})

onUnmounted(() => {
  if (scrollTarget.value) {
    scrollTarget.value.removeEventListener('scroll', updatePageScroll)
  }
})
</script>

<style scoped>
.border-radius {
  border-radius: v-bind(borderRadius);
}
</style>