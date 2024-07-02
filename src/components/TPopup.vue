<template>
  <div>
    <t-popup
      v-model="visible"
      :attach="attach"
      :placement="placement"
      :destroyOnClose="destroyOnClose"
      :overlayProps="overlayProps"
      :showOverlay="showOverlay"
      :closeBtn="false"
      :closeOnOverlayClick="closeOnOverlayClick"
      :preventScrollThrough="preventScrollThrough"
      :zIndex="zIndex"
      :style="calculateTPopupTOverlayStyle(popupWidth)">
      <slot></slot>
      <t-icon
        v-if="closeBtn"
        class="close-btn cursor-pointer"
        name="close"
        size="20"
        color="#333"
        @click="handleCloseBtn" />
    </t-popup>
    <t-overlay
      :visible="visible"
      @click="handleOverlayOnClick"
      :style="calculateTPopupTOverlayStyle(GlobalPCWidth, true)" />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { GlobalPCWidth, GlobalPCHeaderHeight } from "@/constants";
import { settingStore } from "@/store";
import { Icon as TIcon } from "tdesign-icons-vue-next";

const store = settingStore();

const props = defineProps({
  visible: {
    type: Boolean,
    default: true,
  },
  placement: {
    type: String,
    default: "bottom",
  },
  popupWidth: {
    type: Number,
    default: GlobalPCWidth,
  },
  attach: {
    type: String,
    default: "body",
  },
  closeBtn: {
    type: Boolean,
    default: false,
  },
  closeOnOverlayClick: {
    type: Boolean,
    default: false,
  },
  overlayProps: {
    type: Object,
    default: () => ({}),
  },
  destroyOnClose: {
    type: Boolean,
    default: true,
  },
  preventScrollThrough: {
    type: Boolean,
    default: true,
  },
  showOverlay: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: Number,
    default: 5500,
  },
});
const emit = defineEmits(["TPopupTOverlayClose", "TPopupCloseBtn"]);

const {
  visible,
  placement,
  popupWidth,
  attach,
  closeBtn,
  closeOnOverlayClick,
  overlayProps,
  destroyOnClose,
  preventScrollThrough,
  showOverlay,
  zIndex,
} = toRefs(props);

const handleOverlayOnClick = () => {
  emit("TPopupTOverlayClose");
};

const handleCloseBtn = () => {
  emit("TPopupCloseBtn");
};

/**
 * t-popup / t-overlay 弹出的样式
 * @returns
 */
const calculateTPopupTOverlayStyle = (
  popupWidth = GlobalPCWidth,
  overlay = false
) => {
  const isMobile = store.getIsMobile;
  const calculateHorizontalPosition = (width: number) =>
    isMobile ? "0" : `calc((100% - ${width}px) / 2)`;

  const width = `${popupWidth}px`;
  const top = isMobile ? "0" : `${GlobalPCHeaderHeight}px`;
  const leftOrRight = calculateHorizontalPosition(GlobalPCWidth);

  switch (placement.value) {
    case "right":
      return overlay
        ? {
            width,
            left: leftOrRight,
            top,
          }
        : {
            width,
            right: leftOrRight,
            top,
          };
    case "left":
      return {
        width,
        left: leftOrRight,
        top,
      };
    case "center":
      return {
        width: popupWidth,
      };
    default:
      return {
        width: isMobile ? "100%" : `${GlobalPCWidth}px`,
        left: leftOrRight,
      };
  }
};
</script>

<style scoped lang="scss">
.close-btn {
  position: absolute;
  right: 16px;
  top: 12px;
}
</style>
