<template>
  <div :class="!isMobile ? 'rounded-xl p-6 bg-white' : ''">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { handleEquipmentChange } from "@/util";
const { isMobile } = handleEquipmentChange();
</script>

<style scoped lang="scss"></style>
