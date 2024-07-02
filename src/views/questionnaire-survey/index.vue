<template>
  <div
    :style="[!isMobile ? middleStyle : mobileMiddleStyle]"
    :class="[
      isMobile ? 'mobile-box' : 'pc-box pc-view-box',
      'edit-box flex justify-center mb-2 w-full h-full',
    ]">
    <div v-if="!isMobile" class="left h-full scroll-bar-content">
      <!-- @vue-ignore -->
      <VueDraggable
        v-model="formListData"
        animation="150"
        ghostClass="ghost"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :clone="clone"
        :sort="false"
        @start="onStartDrag"
        @end="onEndDrag"
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
      <div
        :class="[
          questionnaireList.length === 0
            ? isMobile
              ? 'el-mobile-view-form-box'
              : 'el-pc-view-form-box'
            : '',
          'w-full h-full view',
        ]">
        <!-- @vue-ignore -->
        <VueDraggable
          v-model="questionnaireList"
          animation="150"
          group="people"
          ghostClass="ghost"
          :handle="isMobile ? '.form-handle' : null"
          :sort="true"
          @sort="mobileOnSort"
          @choose="onChoose"
          class="w-full pb-2 grid gap-y-2">
          <div
            v-for="(item, index) in questionnaireList"
            :key="item.id"
            @click="onClickItem(item)"
            :class="[
              item.id === currActiveId ? 'item-active' : 'view-item',
              'rounded p-3 cursor-move list-form-item',
            ]">
            <div class="radio" v-if="item.type === 'radio'">
              <div class="flex flex-col">
                <div class="w-full flex justify-between">
                  <div class="label">
                    <span v-if="item.options.title.isShow"
                      >{{ index + 1 }}、{{ item.options.title.label }}</span
                    >
                  </div>
                  <div
                    v-if="item.id === currActiveId"
                    class="flex justify-end items-center gap-2 edit-btn-box">
                    <t-link @click="onEditItem(item)" hover theme="success"
                      ><icon
                        v-if="isMobile"
                        class="mobile-icon"
                        name="edit-2" />
                    </t-link>
                    <t-link class="form-handle" hover theme="success"
                      ><icon
                        v-if="isMobile"
                        class="mobile-icon"
                        name="menu-application" />
                    </t-link>
                    <t-link
                      @click="deleteCurrFormItem(item)"
                      hover
                      theme="danger"
                      ><DeleteIcon :size="isMobile ? '14px' : '18px'" />
                    </t-link>
                  </div>
                </div>
                <div class="desc">
                  <span>{{ item.options.desc.label }}</span>
                </div>
                <div>
                  <t-radio-group
                    :class="[
                      item.distribution === 'row' ? 'flex flex-wrap' : '',
                    ]">
                    <t-radio
                      v-for="(it, i) in item.options.options"
                      :key="i"
                      name="radio"
                      disabled
                      :value="
                        questionnaireState.queryOptionIndex(i) + '：' + it.value
                      "
                      :label="
                        questionnaireState.queryOptionIndex(i) + '：' + it.label
                      " />
                  </t-radio-group>
                </div>
              </div>
            </div>
            <div class="checkBox" v-else-if="item.type === 'checkBox'">
              <div class="flex flex-col">
                <div class="w-full flex justify-between">
                  <div class="label">
                    <span v-if="item.options.title.isShow"
                      >{{ index + 1 }}、{{ item.options.title.label }}</span
                    >
                  </div>
                  <div
                    v-if="item.id === currActiveId"
                    class="flex justify-end items-center gap-2 edit-btn-box">
                    <t-link @click="onEditItem(item)" hover theme="success"
                      ><icon
                        v-if="isMobile"
                        class="mobile-icon"
                        name="edit-2" />
                    </t-link>
                    <t-link class="form-handle" hover theme="success"
                      ><icon
                        v-if="isMobile"
                        class="mobile-icon"
                        name="menu-application" />
                    </t-link>
                    <t-link
                      @click="deleteCurrFormItem(item)"
                      hover
                      theme="danger"
                      ><DeleteIcon :size="isMobile ? '14px' : '18px'" />
                    </t-link>
                  </div>
                </div>
                <div class="desc">
                  <span>{{ item.options.desc.label }}</span>
                </div>
                <div>
                  <t-checkbox-group
                    disabled
                    :style="[
                      item.distribution === 'column'
                        ? 'display: flex;flex-direction: column;'
                        : 'display: flex;flex-wrap: wrap;flex-direction: row;',
                      isMobile ? 'gap:4px;' : 'gap:9px;',
                      'margin-top: 6px;',
                    ]">
                    <t-checkbox
                      v-for="(it, i) in item.options.options"
                      :key="i"
                      :block="false"
                      :value="
                        questionnaireState.queryOptionIndex(i) + '：' + it.value
                      "
                      :label="
                        questionnaireState.queryOptionIndex(i) + '：' + it.label
                      " />
                  </t-checkbox-group>
                </div>
              </div>
            </div>
            <div class="numberSelect" v-else-if="item.type === 'numberSelect'">
              <div class="flex flex-col">
                <div class="w-full flex justify-between">
                  <div class="label">
                    <span v-if="item.options.title.isShow"
                      >{{ index + 1 }}、{{ item.options.title.label }}</span
                    >
                  </div>
                  <div
                    v-if="item.id === currActiveId"
                    class="flex justify-end items-center gap-2 edit-btn-box">
                    <t-link @click="onEditItem(item)" hover theme="success"
                      ><icon
                        v-if="isMobile"
                        class="mobile-icon"
                        name="edit-2" />
                    </t-link>
                    <t-link class="form-handle" hover theme="success"
                      ><icon
                        v-if="isMobile"
                        class="mobile-icon"
                        name="menu-application" />
                    </t-link>
                    <t-link
                      @click="deleteCurrFormItem(item)"
                      hover
                      theme="danger"
                      ><DeleteIcon :size="isMobile ? '14px' : '18px'" />
                    </t-link>
                  </div>
                </div>
                <div class="desc">
                  <span>{{ item.options.desc.label }}</span>
                </div>
                <div class="number-box mt-4">
                  <t-slider
                    ref="TSliderRef"
                    :key="
                      item.options.options.max +
                      item.options.options.min +
                      item.options.options.step
                    "
                    :value="item.options.options.value"
                    :min="item.options.options.min"
                    :max="item.options.options.max"
                    :step="item.options.options.step"
                    disabled
                    :marks="
                      generateMarksRange(
                        item.options.options.min,
                        item.options.options.step,
                        item.options.options.max
                      )
                    " />
                </div>
              </div>
            </div>
            <div class="textarea w-full" v-else-if="item.type === 'textarea'">
              <div class="flex flex-col w-full">
                <div class="w-full flex justify-between">
                  <div class="label">
                    <span v-if="item.options.title.isShow"
                      >{{ index + 1 }}、{{ item.options.title.label }}</span
                    >
                  </div>
                  <div
                    v-if="item.id === currActiveId"
                    class="flex justify-end items-center gap-2 edit-btn-box">
                    <t-link @click="onEditItem(item)" hover theme="success"
                      ><icon
                        v-if="isMobile"
                        class="mobile-icon"
                        name="edit-2" />
                    </t-link>
                    <t-link class="form-handle" hover theme="success"
                      ><icon
                        v-if="isMobile"
                        class="mobile-icon"
                        name="menu-application" />
                    </t-link>
                    <t-link
                      @click="deleteCurrFormItem(item)"
                      hover
                      theme="danger"
                      ><DeleteIcon :size="isMobile ? '14px' : '18px'" />
                    </t-link>
                  </div>
                </div>
                <div class="desc">
                  <span>{{ item.options.desc.label }}</span>
                </div>
                <div class="mt-1">
                  <t-textarea
                    class="textarea-input"
                    disabled
                    bordered
                    :autosize="item.options.autosize"
                    :placeholder="item.options.placeholder.label"
                    v-model="item.options.value.label"
                    :maxlength="item.options.value.maxlength"
                    :indicator="item.options.indicator" />
                </div>
              </div>
            </div>
            <div
              class="electronic-signature w-full"
              v-else-if="item.type === 'electronic-signature'">
              <div class="flex flex-col w-full">
                <div class="w-full flex justify-between">
                  <div class="label">
                    <span v-if="item.options.title.isShow"
                      >{{ index + 1 }}、{{ item.options.title.label }}</span
                    >
                  </div>
                  <div
                    v-if="item.id === currActiveId"
                    class="flex justify-end items-center gap-2 edit-btn-box">
                    <t-link @click="onEditItem(item)" hover theme="success"
                      ><icon
                        v-if="isMobile"
                        class="mobile-icon"
                        name="edit-2" />
                    </t-link>
                    <t-link class="form-handle" hover theme="success"
                      ><icon
                        v-if="isMobile"
                        class="mobile-icon"
                        name="menu-application" />
                    </t-link>
                    <t-link
                      @click="deleteCurrFormItem(item)"
                      hover
                      theme="danger"
                      ><DeleteIcon :size="isMobile ? '14px' : '18px'" />
                    </t-link>
                  </div>
                </div>
                <div class="desc">
                  <span>{{ item.options.desc.label }}</span>
                </div>
                <div class="mt-2">
                  <div
                    :style="[
                      item.id === currActiveId
                        ? 'background: #fff;'
                        : 'border: 1px solid #eaf2fd;',
                    ]"
                    class="w-full h-36 rounded" />
                </div>
              </div>
            </div>
          </div>
          <div
            :style="dragStyle"
            v-if="!isMobile && isStartDrag && questionnaireList.length === 0"
            class="w-full drag-box"></div>
        </VueDraggable>
      </div>
    </div>
    <div v-if="!isMobile" class="right scroll-bar-content">
      <ItemValidate />
    </div>

    <TPopup
      v-if="isMobile"
      :visible="addItemVisable"
      placement="bottom"
      @TPopupTOverlayClose="TPopupTOverlayAddItemClose">
      <div class="mobile-popup flex flex-col">
        <div class="popup-title flex items-center pl-4">添加问题</div>
        <div class="w-full gap-2 grid grid-cols-2 p-4">
          <div
            v-for="item in formListData"
            :key="item.id"
            @click="handlePopupItemClick(item)"
            class="h-16 flex items-center justify-center rounded form-item">
            <icon class="icon mr-2" :name="item.icon" />
            {{ item.label }}
          </div>
        </div>
      </div>
    </TPopup>

    <t-fab
      v-if="isMobile"
      class="t-fab"
      :icon="iconFunc"
      @click="tFabOnClick" />

    <TPopup
      v-if="isMobile"
      :visible="validateVisable"
      placement="bottom"
      @TPopupTOverlayClose="TPopupTOverlayValidateClose">
      <div class="validate-popup">
        <div class="setting">{{ currEditItem.label }}设置</div>
        <div class="view-box"><ItemValidate /></div>
        <div class="validate flex justify-center items-center">
          <div
            @click="completeSetting"
            class="validate-btn flex justify-center items-center">
            完成
          </div>
        </div>
      </div>
    </TPopup>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, h } from "vue";
import {
  handleEquipmentChange,
  handleViewSize,
  generateMarksRange,
} from "@/util";
import { Icon } from "tdesign-icons-vue-next";
import { DeleteIcon } from "tdesign-icons-vue-next";
import { VueDraggable } from "vue-draggable-plus";
import { questionnaireStore } from "@/store";
import { GlobalNavBarHeight, GlobalPCHeaderHeight } from "@/constants";
import ItemValidate from "./components/ItemValidate.vue";
import TPopup from "@/components/TPopup.vue";
import { AddIcon } from "tdesign-icons-vue-next";
// @ts-ignore
import SnowflakeId from "snowflake-id";

let snowflake = new SnowflakeId({
  mid: 42,
  offset: (2024 - 1970) * 31536000 * 1000,
});

const iconFunc = () => h(AddIcon, { size: "24px" });

const { viewHeight } = handleViewSize();
const { isMobile } = handleEquipmentChange();
const questionnaireState = questionnaireStore();
const $dialog: any = inject("$dialog");
const currActiveId = computed(() => questionnaireState.getCurrActiveId);
const validateVisable = computed(() => questionnaireState.getValidateVisable);
const addItemVisable = computed(() => questionnaireState.getAddItemVisable);

const questionnaireList = computed(
  () => questionnaireState.getQuestionnaireList
);

const currEditItem = computed(() => {
  return questionnaireList.value.filter(
    (item: any) => item.id === currActiveId.value
  )[0];
});

const isStartDrag = computed(() => questionnaireState.getIsStartDrag);
const isDragFormItemId = ref();

const middleStyle = computed(() => {
  return {
    height: `${
      viewHeight.value - GlobalPCHeaderHeight - GlobalNavBarHeight - 24
    }px`,
  };
});
const mobileMiddleStyle = computed(() => {
  return {
    height: `${viewHeight.value - 64}px`,
  };
});
const dragStyle = computed(() => {
  return {
    height: `${
      viewHeight.value - GlobalPCHeaderHeight - GlobalNavBarHeight - 88
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

const TPopupTOverlayValidateClose = () => {
  questionnaireState.setValidateVisable(false);
};

const TPopupTOverlayAddItemClose = () => {
  questionnaireState.setAddItemVisable(false);
};

const completeSetting = () => {
  questionnaireState.setValidateVisable(false);
};

const tFabOnClick = () => {
  questionnaireState.setAddItemVisable(true);
};

const clone = (element: any) => {
  const el = JSON.parse(JSON.stringify(element));
  el.id = snowflake.generate();
  isDragFormItemId.value = el.id;
  return el;
};

const handlePopupItemClick = (element: any) => {
  const el = JSON.parse(JSON.stringify(element));
  el.id = snowflake.generate();
  questionnaireState.setQuestionnaireList(el);
  questionnaireState.setCurrActiveId(el.id);
  questionnaireState.setAddItemVisable(false);
};

const onStartDrag = () => {
  questionnaireState.setIsStartDrag(true);
};

const onEndDrag = () => {
  questionnaireState.setIsStartDrag(false);
  questionnaireState.setCurrActiveId(isDragFormItemId.value);
};

const mobileOnSort = ({ oldIndex, newIndex }: any) => {
  questionnaireState.sortQuestionnaireList(oldIndex, newIndex);
};

const onClickItem = ({ id }: any) => {
  questionnaireState.setCurrActiveId(id);
};

const onEditItem = ({ id }: any) => {
  questionnaireState.setCurrActiveId(id);
  questionnaireState.setValidateVisable(true);
};

const onChoose = ({ oldIndex }: any) => {
  questionnaireState.setCurrActiveId(questionnaireList.value[oldIndex].id);
};

// 删除
const deleteCurrFormItem = (e: any) => {
  $dialog.confirm({
    content: "确定删除该字段及对应表单数据？（当前版本删除后无法恢复）",
    confirmBtn: "确认",
    cancelBtn: "取消",
    destroyOnClose: true,
    onConfirm: () => {
      questionnaireState.deleteQuestionnaireListItem(e);
    },
  });
};
</script>

<style scoped lang="scss">
@import url(./components/index.scss);
</style>
