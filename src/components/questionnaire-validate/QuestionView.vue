<template>
  <div
    :class="[
      isMobile ? 'mobile-box' : 'pc-box',
      'edit-box flex w-full h-full',
    ]">
    <div class="w-full h-full view">
      <div
        v-for="(item, index) in questionnaireList"
        :key="item.id"
        :class="['rounded p-3 list-form-item']">
        <div class="radio" v-if="item.type === 'radio'">
          <div class="flex flex-col">
            <div class="w-full flex justify-between">
              <div class="label">
                <span v-if="item.options.title.isShow"
                  >{{ index + 1 }}、{{ item.options.title.label }}</span
                >
                <span class="type">（单选）</span>
              </div>
            </div>
            <div class="desc">
              <span>{{ item.options.desc.label }}</span>
            </div>
            <div>
              <t-radio-group
                :class="[item.distribution === 'row' ? 'flex flex-wrap' : '']">
                <t-radio
                  v-for="(it, i) in item.options.options"
                  :key="i"
                  name="radio"
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
                <span class="type">（多选）</span>
              </div>
            </div>
            <div class="desc">
              <span>{{ item.options.desc.label }}</span>
            </div>
            <div>
              <t-checkbox-group
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
                <span class="type"
                  >（{{ item.options.options.min }}到{{
                    item.options.options.max
                  }}分）</span
                >
              </div>
            </div>
            <div class="desc">
              <span>{{ item.options.desc.label }}</span>
            </div>
            <div class="number-box mt-4">
              <t-slider
                :key="
                  item.options.options.max +
                  item.options.options.min +
                  item.options.options.step +
                  questionnaireState.getRandom
                "
                :default-value="item.options.options.value"
                :min="item.options.options.min"
                :max="item.options.options.max"
                :step="item.options.options.step"
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
                <span class="type">（简答题）</span>
              </div>
            </div>
            <div class="desc">
              <span>{{ item.options.desc.label }}</span>
            </div>
            <div class="mt-1">
              <t-textarea
                class="textarea-input"
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
                <span class="type">（手写签名）</span>
              </div>
            </div>
            <div class="flex justify-between w-full">
              <div
                style="width: calc(100% - 130px)"
                class="desc flex items-center">
                <span>{{ item.options.desc.label }}</span>
              </div>
              <div
                style="width: 130px"
                class="flex gap-x-2 items-center justify-end">
                <t-link @click="undo" hover underline theme="success"
                  ><span :class="['cursor-pointer desc-btn']"
                    >撤销</span
                  ></t-link
                >
                <t-link @click="clear" hover underline theme="success"
                  ><span :class="['cursor-pointer desc-btn']"
                    >清空</span
                  ></t-link
                >
                <t-link @click="save" hover underline theme="success"
                  ><span :class="['cursor-pointer desc-btn']"
                    >保存</span
                  ></t-link
                >
              </div>
            </div>
            <div class="w-full flex flex-col">
              <div
                v-if="!previewVisable"
                :style="[
                  'background: #eaf2fd;width: 100%;height: 200px;margin-top: 4px;',
                ]"></div>
              <VueSignaturePad
                :style="[isView ? 'background: #fff;' : 'background: #eaf2fd;']"
                :key="questionnaireState.getRandom"
                v-else
                id="signature"
                width="100%"
                height="200px"
                class="mt-1"
                :options="options"
                ref="signaturePad" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { handleEquipmentChange, generateMarksRange, notice } from "@/util";
import { questionnaireStore } from "@/store";
import { computed, nextTick, onMounted, ref, h } from "vue";
// @ts-ignore
import { VueSignaturePad } from "vue-signature-pad";
import { ErrorCircleIcon } from "tdesign-icons-vue-next";

defineProps({
  isView: {
    type: Boolean,
    default: false,
  },
});

const { isMobile } = handleEquipmentChange();
const questionnaireState = questionnaireStore();
const questionnaireList = computed(
  () => questionnaireState.getQuestionnaireList
);

const options = ref({
  penColor: "#000",
});
const previewVisable = ref(false);
const signaturePad = ref<any>(null);

const undo = () => {
  if (signaturePad.value) {
    signaturePad.value[0].undoSignature();
  }
};

const clear = () => {
  if (signaturePad.value) {
    signaturePad.value[0].clearSignature();
  }
};

const save = async () => {
  if (signaturePad.value) {
    const { isEmpty, data } = signaturePad.value[0].saveSignature();
    if (isEmpty) {
      notice.TOAST({
        message: "请先签名",
        icon: () => h(ErrorCircleIcon),
      });
      return;
    }
    console.log(data);
  }
};

onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    previewVisable.value = true;
  }, 300);
});
</script>

<style scoped lang="scss">
.edit-box {
  .view {
    $new-color: rgba(0, 0, 0, 0);

    .view-item {
      &:hover {
        background-color: #f5f6f8;
      }
    }
    .item-active {
      background-color: #eaf2fd;
    }

    .list-form-item {
      .label {
        color: #000;
        // width: calc(100% - 120px);
      }

      .type {
        color: var(--td-error-color-6);
      }

      .desc {
        color: #666;
      }

      .edit-btn-box {
        width: 120px;

        .mobile-icon {
          font-size: 15px;
          font-weight: bold;
        }
      }

      .radio {
        --td-radio-bg-color: $new-color;
        --td-radio-border-color: $new-color;
        --td-radio-icon-disabled-bg-color: #fff;
        --td-radio-icon-disabled-color: #fff;
        --td-radio-label-disabled-color: #333;
      }

      .checkBox {
        --td-checkbox-bg-color: $new-color;
        --td-checkbox-border-color: $new-color;
        --td-checkbox-title-disabled-color: #333;
        --td-checkbox-icon-disabled-bg-color: #fff;
        --td-checkbox-icon-disabled-color: #fff;
      }

      .numberSelect {
        .number-box {
          --td-slider-active-color: var(--td-brand-color-7);
          --td-slider-disabled-color: var(--td-brand-color-7);
          --td-slider-disabled-text-color: #333;
        }
      }

      .textarea {
        .textarea-input {
          --td-textarea-disabled-text-color: #333;
        }
      }
    }
  }
}

.mobile-box {
  .view {
    .list-form-item {
      .label {
        font-size: 14px;
      }

      .type {
        font-size: 14px;
      }

      .desc {
        font-size: 11px;
      }

      .desc-btn {
        font-size: 11px;
      }

      .radio {
        --td-radio-font-size: 13px;
        --td-radio-vertical-padding: 2px;

        :deep(.t-radio__icon-circle) {
          width: 28px;
          height: 28px;
        }

        :deep(.t-icon) {
          width: 16px;
          height: 16px;
        }

        :deep(.t-radio__icon--left) {
          margin-right: 1px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .checkBox {
        --td-checkbox-font-size: 13px;
        --td-checkbox-vertical-padding: 2px;

        :deep(.t-checkbox__icon-circle) {
          width: 28px;
          height: 28px;
        }

        :deep(.t-icon) {
          width: 16px;
          height: 16px;
        }

        :deep(.t-checkbox__icon--left) {
          margin-right: 1px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .textarea {
        .textarea-input {
          --td-textarea-padding: 4px;
          --td-font-size-m: 13px;
        }
      }
    }
  }
}

.pc-box {
  .view {
    .list-form-item {
      .label {
        font-size: 15px;
      }

      .type {
        font-size: 15px;
      }

      .desc {
        font-size: 12px;
      }

      .desc-btn {
        font-size: 12px;
      }

      .radio {
        --td-radio-font-size: 14px;
        --td-radio-vertical-padding: 4px;

        :deep(.t-radio__icon-circle) {
          width: 32px;
          height: 32px;
        }

        :deep(.t-icon) {
          width: 18px;
          height: 18px;
        }

        :deep(.t-radio__icon--left) {
          margin-right: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .checkBox {
        --td-checkbox-font-size: 14px;
        --td-checkbox-vertical-padding: 4px;

        :deep(.t-checkbox__icon-circle) {
          width: 32px;
          height: 32px;
        }

        :deep(.t-icon) {
          width: 18px;
          height: 18px;
        }

        :deep(.t-checkbox__icon--left) {
          margin-right: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .textarea {
        .textarea-input {
          --td-textarea-padding: 6px;
          --td-font-size-m: 14px;
        }
      }
    }
  }
}
</style>
