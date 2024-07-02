import { defineStore } from "pinia";

export const questionnaireStore = defineStore("questionnaire", {
  state: () => {
    return {
      // 问题列表
      questionnaireList: [] as any,
      // 验证窗口
      validateVisable: false,
      // 添加窗口
      addItemVisable: false,
      // 当前选中的id
      currActiveId: null,
      // 拖拽状态
      isStartDrag: false,
      // 预览窗口
      previewVisable: false,
      // 随机值
      random: 0,
      // 预览窗口当前选中的
      activePreviewItem: 0,
      // 预览窗口数据
      optionIndex: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ] as any,
    };
  },
  // 开启数据缓存
  persist: {
    key: "QUESTIONNAIRE",
  },
  getters: {
    getQuestionnaireList(): any {
      return this.questionnaireList;
    },
    getValidateVisable(): boolean {
      return this.validateVisable;
    },
    getAddItemVisable(): boolean {
      return this.addItemVisable;
    },
    getCurrActiveId(): any {
      return this.currActiveId;
    },
    getIsStartDrag(): boolean {
      return this.isStartDrag;
    },
    getPreviewVisable(): boolean {
      return this.previewVisable;
    },
    getRandom(): number {
      return this.random;
    },
    getActivePreviewItem(): number {
      return this.activePreviewItem;
    },
    getOptionIndex(): any {
      return this.optionIndex;
    },
  },
  actions: {
    setQuestionnaireList(data: any) {
      if (data === null) return;
      this.questionnaireList = [...this.questionnaireList, data];
    },

    deleteQuestionnaireListItem(item: any) {
      this.questionnaireList.splice(this.questionnaireList.indexOf(item), 1);
    },

    arrayItemSort(array: any, oldIndex: number, newIndex: number) {
      if (newIndex >= array.length) {
        let k = newIndex - array.length + 1;
        while (k--) {
          array.push(undefined);
        }
      }
      array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
      return array;
    },

    sortQuestionnaireList(oldIndex: number, newIndex: number) {
      this.questionnaireList = this.arrayItemSort(
        this.questionnaireList,
        oldIndex,
        newIndex
      );
    },

    sortCurrQuestionnaireItemOption(
      array: any,
      oldIndex: number,
      newIndex: number
    ) {
      return this.arrayItemSort(array, oldIndex, newIndex);
    },

    setValidateVisable(data: boolean) {
      this.validateVisable = data;
    },

    setAddItemVisable(data: boolean) {
      this.addItemVisable = data;
    },

    setCurrActiveId(id: any) {
      this.currActiveId = id;
    },

    setIsStartDrag(data: boolean) {
      this.isStartDrag = data;
    },

    setPreviewVisable(data: boolean) {
      this.previewVisable = data;
    },

    setRandom() {
      this.random = Math.random();
    },

    setActivePreviewItem(index: number) {
      this.activePreviewItem = index;
    },

    queryOptionIndex(index: number) {
      return this.optionIndex[index];
    },
  },
});
