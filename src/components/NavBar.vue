<template>
  <div :class="[isMobile ? '' : 'mt-2 mb-2', 'nav-bar  cursor-pointer']">
    <t-navbar :fixed="false" @left-click="handleLeftClick">
      <template #left>
        <div class="flex items-center nav-title">
          <icon
            name="chevron-left"
            :class="[isMobile ? 'text-xl' : 'text-2xl']" />
          <span :class="[isMobile ? 'text-sm' : 'text-base ']">{{
            currRouteItem.title
          }}</span>
        </div>
      </template>
      <template #right>
        <div
          v-if="
            currRouteItem.navBarRight &&
            currRouteItem.navBarRight === 'questionnaire-survey'
          ">
          <PreviewAndSave />
        </div>
      </template>
    </t-navbar>
  </div>
  <div v-if="isMobile" class="top-divider"></div>
</template>

<script setup lang="ts">
import router from "@/router";
import { computed } from "vue";
import { handleEquipmentChange } from "@/util";
import { Icon } from "tdesign-icons-vue-next";
import PreviewAndSave from "@/components/questionnaire-validate/PreviewAndSave.vue";

const { isMobile } = handleEquipmentChange();
const currRouteItem = computed(() => router.currentRoute.value.meta);

const handleLeftClick = () => {
  router.go(-1);
};
</script>

<style scoped lang="scss">
.nav-bar {
  // --td-navbar-bg-color: $global-bg-color;
  --td-navbar-height: var(--global-nav-bar-height);

  .nav-title:hover {
    color: var(--td-brand-color-7);
  }
}
.top-divider {
  width: 100%;
  height: 5px;
  background-color: $global-interval-bg-color;
}
</style>
