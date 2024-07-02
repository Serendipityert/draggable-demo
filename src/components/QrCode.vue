<template>
  <div>
    <canvas ref="qrCanvas"></canvas>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from "vue";
// @ts-ignore
import QRCode from "qrcode";

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 150,
    },
  },
  setup(props) {
    const qrCanvas = ref(null);
    const generateQRCode = async () => {
      try {
        await QRCode.toCanvas(qrCanvas.value, props.value, {
          width: props.size,
        });
      } catch (error) {
        console.error("Failed to generate QR code:", error);
      }
    };
    onMounted(generateQRCode);
    watch(() => props.value, generateQRCode);
    return { qrCanvas };
  },
};
</script>

<style scoped>
/* Add styles if necessary */
</style>
