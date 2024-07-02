<template>
  <div
    :class="[
      isMobile ? 'mobile-upload-box' : 'pc-upload-box',
      'flex flex-col upload-box',
    ]">
    <div>
      <t-upload
        v-model="uploadFileValue"
        multiple
        :max="multipleMax"
        :size-limit="{ size: fileSize, unit: 'MB' }"
        :accept="accept"
        :action="uploadUrl"
        :allowUploadDuplicateFile="false"
        :useMockProgress="true"
        @selectChange="onSelectChange"
        @progress="handleProgress"
        @validate="onValidate"
        @success="onSuccess">
        <template #addContent>
          <t-button
            class="upload-btn"
            :disabled="isUploadSuccess"
            size="small"
            theme="primary"
            >点击上传</t-button
          >
        </template>
      </t-upload>
    </div>
    <div class="file-list-box mt-1">
      <div
        class="flex flex-col"
        v-for="(item, index) in uploadFileList"
        :key="index">
        <div class="flex items-center justify-between file-list-item">
          <div class="name flex items-center">
            <icon :name="item.icon" class="file-icon" />
            <span class="label">{{ item.name }}</span>
          </div>
          <div>
            <icon
              name="multiply"
              class="icon cursor-pointer"
              @click="deleteFile(item)" />
          </div>
        </div>
        <div class="progress" v-if="item.percent != 999">
          <t-progress :percentage="item.percent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { handleEquipmentChange, getFileIcon, notice } from "@/util";
import { ref, watchEffect } from "vue";
import { Icon } from "tdesign-icons-vue-next";

const { isMobile } = handleEquipmentChange();
const uploadUrl = ref(import.meta.env.VITE_BASE_URL + "/upload/file");

const {
  fileSize = 10,
  // fileList,
  multipleMax = 1,
  accept = "images/*",
} = defineProps(["fileSize", "fileList", "multipleMax", "accept"]);
const emit = defineEmits(["queryUploadFileUrl"]);

const uploadFileList = ref<any>([]);
const uploadFileValue = ref<any>([]);
const isUploadSuccess = ref<boolean>(false);

watchEffect(() => {
  uploadFileValue.value = [];
});

/**
 * 替换上传进度和URL
 * @param name 文件名称
 * @param percent 上传进度
 * @param url 文件URL
 */
const queryFileByName = (name: string, percent: number, url: any) => {
  uploadFileList.value.map((item: any) => {
    if (item.name === name) {
      item.percent = percent;
      item.url = url;
    }
  });
};

/**
 * 选择文件或图片之后，上传之前，触发该事件
 * @param files
 */
const onSelectChange = (files: any) => {
  if (files && files.length > 0) {
    isUploadSuccess.value = true;
    let arr = uploadFileList.value as any;
    files.forEach((item: any) => {
      arr.push({
        name: item.name,
        size: item.size,
        type: item.type,
        percent: 0,
        url: null,
        icon: getFileIcon(item.type),
      });
    });
    // 使用 sort 方法和自定义比较函数按 size 降序排列
    arr.sort((a: any, b: any) => b.size - a.size);
    uploadFileList.value = arr;
  }
  uploadFileValue.value = [];
  return true;
};

/**
 * 文件上传校验结束事件，文件数量超出、文件大小超出限制、文件同名、beforeAllFilesUpload 返回值为假、beforeUpload 返回值为假等场景会触发。
 * 注意：如果设置允许上传同名文件，即 allowUploadDuplicateFile=true，则不会因为文件重名触发该事件。
 * 结合 status 和 tips 可以在组件中呈现不同类型的错误（或告警）提示。
 * @param context
 */
const onValidate = (_context: any) => {
  uploadFileValue.value = [];
};

/**
 * 上传进度变化时触发，真实进度和模拟进度都会触发
 * @param context
 */
const handleProgress = ({ file, percent }: any) => {
  uploadFileValue.value = [];
  queryFileByName(file.name, percent, null);
};

/**
 * 删除已上传列表
 * @param e
 */
const deleteFile = ({ name }: any) => {
  if (isUploadSuccess.value) {
    notice.TOAST({
      message: "文件正在上传中，无法删除，请等待上传完成！",
      theme: "error",
    });
    return;
  }
  let indexToRemove = uploadFileList.value.findIndex(
    (item: any) => item.name === name
  );
  if (indexToRemove !== -1) {
    uploadFileList.value.splice(indexToRemove, 1);
  }
  emit("queryUploadFileUrl", uploadFileList.value);
};

/**
 * 上传成功后触发。
 * context.currentFiles 表示当次请求上传的文件（无论成功或失败）
 * context.fileList 表示上传成功后的文件
 * context.response 表示上传请求的返回数据
 * TODO: context.results 表示单次选择全部文件上传成功后的响应结果，可以在这个字段存在时提醒用户上传成功或失败
 * @param res
 */
const onSuccess = ({ fileList, file }: any) => {
  uploadFileValue.value = [];
  if (fileList && fileList.length > 0) {
    fileList.forEach((item: any) => {
      const { title, src, suffix } = item.response.resContent;
      const url = import.meta.env.VITE_BASE_URL + src;
      queryFileByName(item.name, file.percent, null);
      // 延时 300 毫秒后移除上传进度条
      setTimeout(() => {
        queryFileByName(title + "." + suffix, 999, url);
        isUploadSuccess.value = false;
      }, 300);
    });
  }
  emit("queryUploadFileUrl", uploadFileList.value);
};
</script>

<style scoped lang="scss">
.mobile-upload-box {
  --td-button-small-font-size: 12px;

  .file-list-box {
    .file-list-item {
      .name {
        width: 132px;
        margin-right: 81px;

        .file-icon {
          font-size: 14px;
        }

        .label {
          font-size: 12px;
        }
      }
      .icon {
        font-size: 16px;
      }
    }
    .progress {
      :deep(.t-progress__bar) {
        height: 1px;
      }
      :deep(.t-progress__info) {
        font-size: 9px;
      }
    }
  }
}

.pc-upload-box {
  --td-button-small-font-size: 13px;

  .file-list-box {
    .file-list-item {
      &:hover {
        background-color: #f5f7fa;
      }

      &:hover .name .label {
        color: var(--td-brand-color-7);
      }

      .name {
        width: 196px;
        margin-right: 196px;

        .file-icon {
          font-size: 16px;
        }

        .label {
          padding-left: 4px;
          font-size: 14px;
        }
      }
      .icon {
        font-size: 20px;

        &:hover {
          color: var(--td-error-color-6);
        }
      }
    }

    .progress {
      margin-top: 4px;

      :deep(.t-progress__bar) {
        height: 2px;
      }
      :deep(.t-progress__info) {
        font-size: 11px;
      }
    }
  }
}

.upload-box {
  --td-upload-background: #fff;
  --td-upload-height: 40px;
  --td-upload-width: 88.53px;
  --td-upload-add-icon-font-size: 16px;
  --td-upload-grid-columns: 0;

  // .t-upload {
  //   :deep(.t-upload__item) {
  //     &:not(:last-child) {
  //       display: none;
  //     }
  //     &:last-child {
  //       display: block;
  //     }
  //   }
  // }

  :deep(.t-upload__progress-mask) {
    display: none;
  }

  .t-button--size-small {
    padding: 9px 15px;
    border-radius: 3px;
  }

  .file-list-box {
    .file-list-item {
      $color: #606266;

      transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
      font-size: 14px;
      color: $color;
      line-height: 1.8;
      margin-top: 5px;
      position: relative;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 1px 4px;

      .name {
        .file-icon {
          color: $color;
          margin-right: 4px;
        }

        .label {
          color: $color;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.3s;
          white-space: nowrap;
        }
      }

      .icon {
        color: $color;
      }
    }

    .progress {
      --td-progress-inner-bg-color: var(--td-brand-color-7);
    }
  }
}
</style>
