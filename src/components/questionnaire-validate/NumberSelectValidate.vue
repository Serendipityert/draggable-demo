<template>
  <div :class="[isMobile ? 'mobile-box' : 'pc-box', 'edit-box  w-full h-full']">
    <div class="radio">
      <div v-if="!isMobile" class="setting">{{ currEditItem.label }}设置</div>
      <div class="title">
        <div class="label-title"><span>*</span>标题</div>
        <div class="input">
          <t-textarea
            class="textarea"
            v-model="currEditItem.options.title.label"
            :maxlength="currEditItem.options.title.maxlength"
            bordered
            autosize
            indicator
            placeholder="请输入标题"></t-textarea>
          <t-checkbox
            class="checkbox"
            label="显示标题"
            icon="rectangle"
            @change="handleTitleChange"
            :default-checked="currEditItem.options.title.isShow" />
        </div>
      </div>
      <div class="title mt-3">
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
      <div class="switch mt-4">
        <div class="flex justify-between items-center">
          <div class="label-title">是否有默认值</div>
          <t-switch
            size="small"
            @change="handleIsDefaultValueChange"
            :default-value="currEditItem.options.isDefaultValue"
            :label="['是', '否']" />
        </div>
      </div>
      <div class="title mt-3" v-if="currEditItem.options.isDefaultValue">
        <div class="label-title">默认值</div>
        <div class="option-item">
          <t-input
            class="input-item"
            style="padding-left: 8px"
            status="error"
            type="number"
            @change="
              (e:any) => {
                handleInputValueChange(e, 'value');
              }
            "
            v-model="currEditItem.options.options.value"
            borderless></t-input>
        </div>
      </div>
      <div class="title mt-3">
        <div class="label-title"><span>*</span>起始值</div>
        <div class="option-item">
          <t-input
            class="input-item"
            style="padding-left: 8px"
            status="error"
            type="number"
            @change="
              (e:any) => {
                handleInputValueChange(e, 'min');
              }
            "
            v-model="currEditItem.options.options.min"
            borderless></t-input>
        </div>
      </div>
      <div class="title mt-3">
        <div class="label-title"><span>*</span>最大值</div>
        <div class="option-item">
          <t-input
            class="input-item"
            style="padding-left: 8px"
            status="error"
            type="number"
            @change="
              (e:any) => {
                handleInputValueChange(e, 'max');
              }
            "
            v-model="currEditItem.options.options.max"
            borderless></t-input>
        </div>
      </div>
      <div class="title mt-3">
        <div class="label-title"><span>*</span>步长</div>
        <div class="option-item">
          <t-input
            class="input-item"
            style="padding-left: 8px"
            status="error"
            type="number"
            @change="
              (e:any) => {
                handleInputValueChange(e, 'step');
              }
            "
            v-model="currEditItem.options.options.step"
            borderless></t-input>
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

const handleInputValueChange = (e: any, str: string) => {
  const val = Number(e === "" || e < 0 ? 0 : e);
  const { min, max } = currEditItem.value.options.options;
  switch (str) {
    case "value":
      currEditItem.value.options.options.value =
        val > max || val < min ? min : val;
      break;
    case "min":
      currEditItem.value.options.options.min = val >= max ? max - 1 : val;
      break;
    case "max":
      currEditItem.value.options.options.max = val < min ? min + 1 : val;
      break;
    case "step":
      currEditItem.value.options.options.step =
        val === 0 || val === max - min ? 1 : val;
      break;
    default:
      break;
  }
};

const handleIsDefaultValueChange = (val: boolean) => {
  currEditItem.value.options.isDefaultValue = val;
  if (val) {
    currEditItem.value.options.options.value =
      currEditItem.value.options.options.min;
  }
};

// const handleAutosizeChange = (val: boolean) => {
//   currEditItem.value.options.autosize = val;
// };
// const handleIndicatorChange = (val: boolean) => {
//   currEditItem.value.options.indicator = val;
// };

// const handleInputChangeMaxlength = (e: any) => {
//   currEditItem.value.options.value.maxlength = e === 0 || e === "" ? 1 : e;
// };
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

      .option-item {
        --td-input-vertical-padding: 4px;
        --td-font-size-m: 13px;
        --td-input-label-width: 108px;
        width: 100%;
        margin-top: 6px;

        .input-item {
          width: 100%;
          border: 1px solid #dcdcdc;
          border-radius: 4px;

          &:focus {
            border: 1px solid var(--td-success-color-5);
          }
        }
      }
    }

    .switch {
      --td-switch-checked-color: var(--td-success-color-5);

      .label-title {
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
}
</style>
