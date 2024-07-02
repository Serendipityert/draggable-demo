<template>
  <div class="overflow-y-auto">
    <div v-if="currEditItem && currEditItem.type === 'radio'">
      <RadioValidate />
    </div>
    <div v-else-if="currEditItem && currEditItem.type === 'checkBox'">
      <CheckBoxValidate />
    </div>
    <div v-else-if="currEditItem && currEditItem.type === 'textarea'">
      <TextAreaValidate />
    </div>
    <div v-else-if="currEditItem && currEditItem.type === 'numberSelect'">
      <NumberSelectValidate />
    </div>
    <div
      v-else-if="currEditItem && currEditItem.type === 'electronic-signature'">
      <ElectronicSignatureValidate />
    </div>
    <div v-else class="box">
      <div class="setting">设置</div>
      <div class="tip flex justify-center items-center">
        点击选择字段来设置属性
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { questionnaireStore } from "@/store";
import RadioValidate from "@/components/questionnaire-validate/RadioValidate.vue";
import CheckBoxValidate from "@/components/questionnaire-validate/CheckBoxValidate.vue";
import TextAreaValidate from "@/components/questionnaire-validate/TextAreaValidate.vue";
import NumberSelectValidate from "@/components/questionnaire-validate/NumberSelectValidate.vue";
import ElectronicSignatureValidate from "@/components/questionnaire-validate/ElectronicSignatureValidate.vue";

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
</script>

<style scoped lang="scss">
.box {
  height: 100%;
  width: 100%;

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
  .tip {
    font-size: 14px;
    padding-bottom: 16px;
    color: #838892;
  }
}
</style>
