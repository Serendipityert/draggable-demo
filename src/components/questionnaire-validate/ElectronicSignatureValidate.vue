<template>
  <div :class="[isMobile ? 'mobile-box' : 'pc-box', 'edit-box  w-full h-full']">
    <div class="radio">
      <div v-if="!isMobile" class="setting">{{ currEditItem.label }}设置</div>
      <div class="title">
        <div class="label-title">{{ currEditItem.label }}标题</div>
        <div class="input">
          <t-textarea
            class="textarea"
            v-model="currEditItem.options.title.label"
            :maxlength="currEditItem.options.title.maxlength"
            bordered
            autosize
            indicator
            :placeholder="`请输入${currEditItem.label}标题`"></t-textarea>
          <t-checkbox
            class="checkbox"
            label="显示标题"
            icon="rectangle"
            @change="handleTitleChange"
            :default-checked="currEditItem.options.title.isShow" />
        </div>
      </div>
      <div class="title mt-2">
        <div class="label-title">描述信息</div>
        <div class="input">
          <t-textarea
            class="textarea"
            v-model="currEditItem.options.desc.label"
            :maxlength="currEditItem.options.desc.maxlength"
            bordered
            autosize
            indicator
            placeholder="请输入描述信息"></t-textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { handleEquipmentChange } from "@/util";
import { questionnaireStore } from "@/store";
import { computed } from "vue";

const questionnaireState = questionnaireStore();

const currActiveId = computed(() => {
  return questionnaireState.getCurrActiveId;
});

const questionnaireList = computed(
  () => questionnaireState.getQuestionnaireList
);

const currEditItem = computed(() => {
  return questionnaireList.value.filter(
    (item: any) => item.id === currActiveId.value
  )[0];
});

const { isMobile } = handleEquipmentChange();

const handleTitleChange = (val: boolean) => {
  currEditItem.value.options.title.isShow = val;
};
</script>

<style scoped lang="scss">
.edit-box {
  .setting {
    height: 44px;
    line-height: 44px;
    font-size: 15px;
    font-weight: bold;
    padding-left: 16px;
    margin-bottom: 16px;
    color: var(--td-success-color-5);
    border-bottom: 1px solid var(--td-success-color-5);
  }

  .radio {
    padding: 0 12px 12px 12px;

    .title {
      .label-title {
        font-size: 14px;
        font-weight: 700;

        & span {
          color: var(--td-error-color-6);
          margin-right: 4px;
        }
      }
      .input {
        margin-top: 6px;

        .textarea {
          --td-textarea-padding: 8px;
          --td-textarea-border-radius: 4px;

          :deep(.t-textarea__wrapper-inner) {
            font-size: 13px;
          }
        }

        .checkbox {
          --td-checkbox-font-size: 14px;
          --td-checkbox-icon-size: 20px;
          --td-checkbox-title-line-height: 19px;
          --td-checkbox-vertical-padding: 0;
          --td-checkbox-border-color: rgba(0, 0, 0, 0);

          margin: 16px 0;

          :deep(.t-checkbox__icon--checked) {
            color: var(--td-success-color-5);
          }
        }
      }
    }
  }
}
</style>
