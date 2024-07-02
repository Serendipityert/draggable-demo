<template>
  <div
    :style="[middleStyle ]"
    :class="[
       'pc-box pc-view-box',
      'edit-box flex justify-center mb-2 w-full h-full',
    ]">
    <div class="left h-full scroll-bar-content">
      <!-- @vue-ignore -->
      <VueDraggable
        v-model="formListData"
        animation="150"
        ghostClass="ghost"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :clone="clone"
        :sort="false"
        class="flex flex-col items-center justify-center gap-2 rounded">
        <div
          v-for="item in formListData"
          :key="item.id"
          class="cursor-move w-28 h-10 flex items-center rounded form-item">
          <div class="w-8 h-full flex justify-center items-center">
            <icon class="icon" :name="item.icon" />
          </div>
          <div class="label">
            {{ item.label }}
          </div>
        </div>
      </VueDraggable>
    </div>
    <div class="middle h-full scroll-bar-content">
      <div>
        <!-- @vue-ignore -->
        <VueDraggable
          v-model="questionnaireList"
          animation="150"
          group="people"
          ghostClass="ghost"
          :handle="isMobile ? '.form-handle' : null"
          :sort="true"
          class="w-full pb-2 grid gap-y-2" :style="dragStyle">
          <div
          v-for="item in questionnaireList"
          :key="item.id"
          >
          <div class="w-full cursor-move h-16 bg-red-500 flex justify-center items-center">
            {{ item.label }}
          </div>
        </div>
        </VueDraggable>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed,  ref, watch } from "vue";
import {
  handleViewSize,
} from "@/util";
import { Icon } from "tdesign-icons-vue-next";
import { VueDraggable } from "vue-draggable-plus";
import { GlobalNavBarHeight, GlobalPCHeaderHeight } from "@/constants";
// @ts-ignore
import SnowflakeId from "snowflake-id";

let snowflake = new SnowflakeId({
  mid: 42,
  offset: (2024 - 1970) * 31536000 * 1000,
});

const { viewHeight } = handleViewSize();
const middleStyle = computed(() => {
  return {
    height: `${
      viewHeight.value - GlobalPCHeaderHeight - GlobalNavBarHeight - 24
    }px`,
  };
});
const dragStyle = computed(() => {
  return {
    border: "1px solid red",
    height: `${
      viewHeight.value - GlobalPCHeaderHeight - GlobalNavBarHeight - 43
    }px`,
  };
});

const formListData = ref([
  {
    id: snowflake.generate(),
    label: "单选框",
    icon: "check-circle",
    type: "radio",
    distribution: "column",
    options: {
      title: {
        label: "请选择一个选项",
        isShow: true,
        maxlength: 300,
      },
      desc: {
        label: "描述信息",
        maxlength: 300,
      },
      options: [
        { label: "选项1", value: 1 },
        { label: "选项2", value: 2 },
        { label: "选项3", value: 3 },
      ],
    },
  },
  {
    id: snowflake.generate(),
    label: "多选框",
    icon: "check-rectangle",
    type: "checkBox",
    distribution: "column",
    max: 2,
    options: {
      title: {
        label: "请选择多个选项",
        isShow: true,
        maxlength: 300,
      },
      desc: {
        label: "描述信息",
        maxlength: 300,
      },
      options: [
        { label: "选项1", value: 1 },
        { label: "选项2", value: 2 },
        { label: "选项3", value: 3 },
      ],
    },
  },
  {
    id: snowflake.generate(),
    label: "数字选择框",
    icon: "data-display",
    type: "numberSelect",
    options: {
      title: {
        label: "请选择数值",
        isShow: true,
        maxlength: 300,
      },
      desc: {
        label: "描述信息",
        maxlength: 300,
      },
      isDefaultValue: false,
      options: { min: 0, max: 10, step: 1, value: 0 },
    },
  },
  {
    id: snowflake.generate(),
    label: "多行文本框",
    icon: "textbox",
    type: "textarea",
    options: {
      title: {
        label: "请填写文本",
        isShow: true,
        maxlength: 300,
      },
      desc: {
        label: "描述信息",
        maxlength: 300,
      },
      value: {
        label: "多行文本内容",
        maxlength: 300,
      },
      placeholder: {
        label: "请输入多行文本",
        maxlength: 300,
      },
      autosize: false,
      indicator: true,
    },
  },
  {
    id: snowflake.generate(),
    label: "电子签名",
    icon: "pen",
    type: "electronic-signature",
    options: {
      title: {
        label: "请手写签名",
        isShow: true,
        maxlength: 300,
      },
      desc: {
        label: "描述信息",
        maxlength: 300,
      },
    },
  },
]);

const questionnaireList = ref<any>([]);
watch(questionnaireList.value,(newVal:any,_oldVal:any)=>{
  console.log(newVal);
})

const clone = (element: any) => {
  const el = JSON.parse(JSON.stringify(element));
  el.id = snowflake.generate();
  return el;
};
</script>

<style scoped lang="scss">
@import url(./components/index.scss);
</style>
