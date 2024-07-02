<template>
  <div
    :class="[
      isMobile ? 'mobile-container' : 'pc-container flex flex-col',
      'flex w-full ',
    ]">
    <div v-if="!isMobile" class="pc-header w-full flex items-center bg-white">
      <Header />
    </div>
    <div class="flex w-full pc-main-view">
      <div v-if="!isMobile" class="seat-view"></div>
      <div :class="[isMobile ? 'w-full' : 'view-container', 'h-full']">
        <NavBar :key="componentKey" v-if="!isShowTabBar" />
        <router-view
          :key="componentKey"
          :class="['w-full h-full', isMobile && isShowTabBar ? 'mb-12' : '']" />
      </div>
      <div v-if="!isMobile" class="seat-view"></div>
    </div>
  </div>
  <div v-if="isMobile && isShowTabBar">
    <Footer :key="componentKey" />
  </div>
</template>

<script setup lang="ts">
import Header from "../header/index.vue";
import Footer from "@/layouts/footer/index.vue";
import NavBar from "@/components/NavBar.vue";
import { handleEquipmentChange, isShowTabBar } from "@/util";
import { settingStore } from "@/store";
import { computed } from "vue";

const settingSate = settingStore();
const componentKey = computed(() => settingSate.getRandom);

const { isMobile } = handleEquipmentChange();
</script>

<style scoped lang="scss">
.mobile-container {
  height: calc(100% - var(--global-nav-bar-height));
}

.pc-container {
  height: 100%;

  .pc-header {
    height: var(--global-pc-header-height);
    padding: 0 calc((100% - $global-pc-width) / 2);
    z-index: 9999999999;
  }

  .pc-main-view {
    height: calc(100% - var(--global-pc-header-height));
    background-color: $global-bg-color;

    .seat-view {
      width: calc((100% - $global-pc-width) / 2);
      // 设置PC端左右两侧区域的层级为最高，目的实现 t-popup 从左或右侧滑出时样式
      background-color: $global-bg-color;
      z-index: 9999999999;
    }

    .view-container {
      width: $global-pc-width;
      min-width: $global-pc-width;
      max-width: $global-pc-width;
    }
  }
}
</style>
