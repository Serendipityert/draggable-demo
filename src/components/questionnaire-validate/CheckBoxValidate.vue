<template>
  <div :class="[isMobile ? 'mobile-box' : 'pc-box', 'edit-box  w-full h-full']">
    <div class="radio">
      <div v-if="!isMobile" class="setting">{{ currEditItem.label }}设置</div>
      <div class="title">
        <div class="label-title"><span>*</span>多选标题</div>
        <div class="input">
          <t-textarea
            class="textarea"
            v-model="currEditItem.options.title.label"
            :maxlength="currEditItem.options.title.maxlength"
            bordered
            autosize
            indicator
            placeholder="请输入单选标题"></t-textarea>
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
      <div class="option">
        <div class="flex justify-between items-center">
          <div class="label-title">选项</div>
          <div class="cursor-pointer">
            <t-link @click="radioOptionAdd" underline hover theme="success"
              >添加选项</t-link
            >
          </div>
        </div>
        <div class="input mt-2">
          <VueDraggable
            v-model="currEditItem.options.options"
            :animation="150"
            handle=".handle"
            ghostClass="ghost"
            :sort="true"
            class="flex flex-col gap-2 rounded">
            <div
              v-for="(item, index) in currEditItem.options.options"
              :key="item.value">
              <div class="flex option-item items-center">
                <t-input
                  class="input-item"
                  style="padding-left: 8px"
                  v-model="item.label"
                  borderless></t-input>
                <icon class="icon handle cursor-move" name="menu-application" />
                <icon
                  class="del-icon cursor-pointer"
                  @click="radioOptionRemove(index)"
                  name="delete-1" />
              </div>
            </div>
          </VueDraggable>
        </div>
      </div>
      <div class="distribution mt-2">
        <div class="label-title">分布方式</div>
        <div class="input mt-1">
          <t-radio-group
            class="horizontal-box"
            @change="handleRadioDistributionChange"
            :value="currEditItem.distribution">
            <view
              v-for="(item, index) in distributionMethod"
              :key="index"
              :class="`card ${
                currEditItem.distribution === item.value ? 'card--active' : ''
              }`">
              <icon
                v-if="currEditItem.distribution == item.value"
                name="check"
                class="card__icon" />
              <t-radio
                :value="item.value"
                :label="item.label"
                icon="none"
                borderless />
            </view>
          </t-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { handleEquipmentChange } from "@/util";
import { questionnaireStore } from "@/store";
import { Icon } from "tdesign-icons-vue-next";
import { computed, ref } from "vue";
import { VueDraggable } from "vue-draggable-plus";

const questionnaireState = questionnaireStore();
const distributionMethod = ref([
  {
    label: "纵向排列",
    value: "column",
  },
  {
    label: "横向排列",
    value: "row",
  },
]);

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

const radioOptionAdd = () => {
  const len = currEditItem.value.options.options.length + 1;
  currEditItem.value.options.options.push({
    label: `选项${len}`,
    value: len,
  });
};

const radioOptionRemove = (index: number) => {
  currEditItem.value.options.options.splice(index, 1);
};

const handleRadioDistributionChange = (e: any) => {
  currEditItem.value.distribution = e;
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
    .option {
      margin-top: 16px;

      .label-title {
        font-size: 14px;
        font-weight: 700;
      }

      .option-item {
        --td-input-vertical-padding: 4px;
        --td-font-size-m: 13px;
        width: 100%;

        .input-item {
          width: 100%;
          border: 1px solid #dcdcdc;
          border-radius: 4px;

          &:focus {
            border: 1px solid var(--td-success-color-5);
          }
        }

        .icon {
          margin-left: 8px;

          &:hover {
            color: var(--td-success-color-5);
          }
        }

        .del-icon {
          margin-left: 8px;

          &:hover {
            color: var(--td-error-color-6);
          }
        }
      }
    }

    .distribution {
      margin-top: 16px;

      .label-title {
        font-size: 14px;
        font-weight: 700;
      }

      .input {
        --td-radio-font-size: 13px;

        .card {
          display: block;
          position: relative;
          margin: 6px;
          border-radius: 4px;
          overflow: hidden;
          box-sizing: border-box;
          border: 1px solid #dcdcdc;
        }

        .card--active {
          border-color: var(--td-success-color-5);
        }

        .card--active::after {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          width: 0;
          border: 14px solid var(--td-success-color-5);
          border-bottom-color: transparent;
          border-right-color: transparent;
        }

        .card__icon {
          display: block;
          color: #fff;
          position: absolute;
          left: 1.5px;
          top: 1.5px;
          z-index: 1;
        }

        /* 横向布局 */
        .horizontal-box {
          width: calc(100% - 24px);
          display: flex;
          align-items: center;
          margin: 10px;
        }

        .horizontal-box .card {
          flex: 1;
          margin: 0;
        }

        .horizontal-box .card + .card {
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
