import { defineStore } from "pinia";

export const settingStore = defineStore("setting", {
  state: () => {
    return {
      // 当前设备是否是手机
      isMobile: true,
      random: 0,
    };
  },
  // 开启数据缓存
  persist: {
    key: "SETTING",
  },
  getters: {
    getIsMobile(): boolean {
      return this.isMobile;
    },
    getRandom(): number {
      return this.random;
    },
  },
  actions: {
    setIsMobile(isMobile: boolean): void {
      this.isMobile = isMobile;
    },
    setRandom() {
      this.random = Math.random();
    },
  },
});
