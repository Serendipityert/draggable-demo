<template>
  <div>
    <div class="flex gap-x-2">
      <t-button
        variant="outline"
        @click="handlePreview"
        size="extra-small"
        theme="primary"
        >预览</t-button
      >
      <t-button @click="handleSave" size="extra-small" theme="primary"
        >保存</t-button
      >
    </div>

    <TPopup
      :visible="previewVisable"
      placement="bottom"
      :closeBtn="true"
      @TPopupTOverlayClose="TPopupPreviewValidateClose"
      @TPopupCloseBtn="TPopupCloseBtn">
      <div
        :class="[
          isMobile ? 'mobile-view-box' : 'popup-pc-view-box',
          'view-box flex flex-col',
        ]">
        <div class="header flex justify-center items-center">
          <div class="swatch-box flex">
            <div
              @click="setActivePreviewItem(0)"
              :class="[
                activePreviewItem === 0 ? 'bg-white active-item' : '',
                'item cursor-pointer flex-1 flex justify-center items-center',
              ]">
              <icon name="desktop" />
            </div>
            <div
              @click="setActivePreviewItem(1)"
              :class="[
                activePreviewItem === 1 ? 'bg-white active-item' : '',
                'item cursor-pointer flex-1 flex justify-center items-center',
              ]">
              <icon name="mobile" />
            </div>
          </div>
        </div>
        <div class="pre-body w-full">
          <div
            :class="[
              activePreviewItem === 0 ? 'pc-pre-body' : 'mobile-pre-body',
              'view-box',
            ]">
            <div class="view">
              <div class="view-item scroll-bar-content">
                <QuestionView />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TPopup>
  </div>
</template>

<script setup lang="ts">
import { questionnaireStore } from "@/store";
import { handleEquipmentChange } from "@/util";
import { computed } from "vue";
import { Icon } from "tdesign-icons-vue-next";
import TPopup from "@/components/TPopup.vue";
import QuestionView from "./QuestionView.vue";
import { notice } from "@/util";

const questionnaireState = questionnaireStore();
const { isMobile } = handleEquipmentChange();
const previewVisable = computed(() => {
  return questionnaireState.getPreviewVisable;
});

const questionnaireList = computed(
  () => questionnaireState.getQuestionnaireList
);

const activePreviewItem = computed(
  () => questionnaireState.getActivePreviewItem
);

const setActivePreviewItem = (index: number) => {
  questionnaireState.setActivePreviewItem(index);
  questionnaireState.setRandom();
};

const TPopupPreviewValidateClose = () => {
  questionnaireState.setPreviewVisable(false);
};

const TPopupCloseBtn = () => {
  questionnaireState.setPreviewVisable(false);
};

const handlePreview = () => {
  if (questionnaireList.value.length === 0) {
    notice.TOAST({ message: "请先设置问题", theme: "error" });
    return;
  }
  questionnaireState.setPreviewVisable(true);
  setTimeout(() => {
    questionnaireState.setRandom();
  }, 500);
};

const handleSave = () => {
  console.log(questionnaireList.value);
};
</script>

<style scoped lang="scss">
.mobile-view-box {
  height: 95vh;

  .header {
    .swatch-box {
      width: 120px;
      height: 30px;
      font-size: 14px;
    }
  }

  .pre-body {
    height: calc(95vh - 60px);

    .view-box {
      height: calc(95vh - 60px);
      background-color: #fff;
      margin: 0 auto;
      width: 100%;

      .view {
        height: 100%;

        .view-item {
          height: 100%;
          overflow-y: auto;
          padding: 8px;
        }
      }
    }

    .pc-pre-body {
    }

    .mobile-pre-body {
      width: 90%;
      height: 90%;
      border-radius: 8px;
      margin-top: 16px;
      padding: 16px;
      -webkit-box-shadow: 0 18px 21px 0 rgba(0, 0, 0, 0.04);
      box-shadow: 0 18px 21px 0 rgba(0, 0, 0, 0.04);

      .view {
        height: 100%;
        border: 1px solid #dcdcdc;
        border-radius: 8px;
        padding: 2px 0;

        .view-item {
          height: 100%;
          overflow-y: auto;
        }

        /* 整个滚动条 */
        .scroll-bar-content::-webkit-scrollbar {
          width: 2px;
          height: 2px;
        }
      }
    }
  }
}

.popup-pc-view-box {
  height: 85vh;

  .header {
    .swatch-box {
      width: 150px;
      height: 32px;
      font-size: 16px;
    }
  }

  .pre-body {
    height: calc(85vh - 60px);

    .view-box {
      background-color: #fff;
      margin: 0 auto;

      .view {
        height: 100%;

        .view-item {
          height: 100%;
          overflow-y: auto;
        }
      }
    }

    .pc-pre-body {
      width: 80%;
      height: 100%;
      padding: 16px;
    }

    .mobile-pre-body {
      width: 35%;
      height: 85%;
      border-radius: 8px;
      margin-top: 24px;
      padding: 16px;
      -webkit-box-shadow: 0 18px 21px 0 rgba(0, 0, 0, 0.04);
      box-shadow: 0 18px 21px 0 rgba(0, 0, 0, 0.04);

      .view {
        height: 100%;
        border: 1px solid #dcdcdc;
        border-radius: 8px;
        padding: 2px 0;

        .view-item {
          height: 100%;
          overflow-y: auto;
        }

        .scroll-bar-content::-webkit-scrollbar {
          width: 3px;
          height: 2px;
        }
      }
    }
  }
}

.view-box {
  .header {
    height: 60px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);

    .swatch-box {
      background-color: $global-interval-bg-color;
      border-radius: 4px;
      padding: 2px;
      color: #333;

      .active-item {
        color: var(--td-success-color-5);
      }

      .item {
        border-radius: 4px;
      }
    }
  }

  .pre-body {
    background-color: $global-interval-bg-color;
  }
}
</style>
