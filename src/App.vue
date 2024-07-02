<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { handleDataInit, networkDetection } from "@/util";

onMounted(() => {
  networkDetection();
  handleDataInit();
});
</script>

<style lang="scss">
#nprogress .bar {
  background: var(--td-brand-color-7) !important;
}

/* 整个滚动条 */
body::-webkit-scrollbar {
  width: 0px; /* 水平滚动条的高度，垂直滚动条的宽度 */
  height: 0px; /* 垂直滚动条的高度 */
}

/* 滚动条轨道 */
body::-webkit-scrollbar-track {
  background: #fff; /* 轨道的颜色 */
  border-radius: 10px; /* 轨道的圆角 */
}

/* 滚动条的滑块 */
body::-webkit-scrollbar-thumb {
  background: #ebeef5; /* 滑块的颜色 */
  border-radius: 10px; /* 滑块的圆角 */
}

/* 滚动条的滑块：悬浮 */
body::-webkit-scrollbar-thumb:hover {
  background: #e4e7ed; /* 滑块悬浮时的颜色 */
  cursor: pointer;
}
</style>
