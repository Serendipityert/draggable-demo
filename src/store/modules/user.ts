import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  state: () => {
    return {
      userInfo: {},
      token: "",
      loginPath: "/login",
    };
  },
  // 开启数据缓存
  persist: {
    key: "USER_INFO",
  },
  getters: {
    getUserInfo(): any {
      return this.userInfo;
    },
    getToken(): string {
      return this.token;
    },
    getLoginPath(): string {
      return this.loginPath;
    },
  },
  actions: {
    setUserInfo(data: any) {
      this.userInfo = data;
    },
    setToken(data: string) {
      this.token = data;
    },
    setLoginPath(data: string) {
      this.loginPath = data;
    },
  },
});
