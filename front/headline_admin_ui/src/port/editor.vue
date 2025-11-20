<script setup lang="ts">
import { onMounted } from 'vue'
import Cherry from 'cherry-markdown'

let cherryInstance: Cherry | null = null

onMounted(() => {
  // 确保 DOM 已经渲染出容器
  const container = document.getElementById('markdown-container')
  if (container && !cherryInstance) {
    cherryInstance = new Cherry({
      id: 'markdown-container', // 对应模板里的 div id
      value: '# welcome to cherry editor!',
    })
  }
})
</script>

<template>
  <!-- Cherry Markdown 编辑器示例 -->
  <div class="container" style="margin-top: 20px">
    <h3>Markdown 编辑器（Cherry Demo）</h3>
    <div id="markdown-container" style="border: 1px solid #e5e7eb; border-radius: 8px"></div>
  </div>
</template>
