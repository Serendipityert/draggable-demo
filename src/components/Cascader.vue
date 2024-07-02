<template>
  <t-cascader
    v-if="visible && optionsList.length > 0"
    :style="!isMobile ? pcStyle : { zIndex: 999999 }"
    v-model:visible="visible"
    :title="title"
    :options="optionsList"
    @pick="handlePick"
    @close="handleClose" />
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs } from "vue";
import { getCascaderAreaList } from "@/api";
import { findItemByValue } from "@/util";
import { Toast } from "tdesign-mobile-vue";
import { GlobalPCWidth } from "@/constants";

const props = defineProps({
  title: {
    type: String,
    default: "选择地址",
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["TCascaderClose", "TCascaderChange"]);
const { title, isMobile, visible } = toRefs(props);

const pcStyle = ref({
  left: "50%",
  top: "50%",
  width: `${GlobalPCWidth}px`,
  transform: "translate(-50%, -50%)",
});

const optionsList = ref<any>([]);
const finalResult = ref<any>([]);

const queryCascaderAreaList = async () => {
  Toast({
    theme: "loading",
    message: "正在获取数据",
  });
  const { data: res } = await getCascaderAreaList({});
  optionsList.value = res.resContent;
  Toast.clear();
};

const handleClose = () => {
  emit("TCascaderClose", false);
};

const handlePick = ({ level, value }: any) => {
  const { label, value: val } = findItemByValue(optionsList.value, value);
  finalResult.value[level] = { label, value: val };
  emit("TCascaderChange", finalResult.value);
};

onMounted(() => {
  queryCascaderAreaList();
});
</script>

<style scoped lang="scss"></style>
