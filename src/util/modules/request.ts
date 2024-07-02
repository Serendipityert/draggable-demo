import axios from "axios";
import router from "@/router/index";
import { userStore } from "@/store";

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // 环境的不同，对应不同的baseURL
  timeout: 600000, // 请求超时时间
});

service.interceptors.request.use(
  (config) => {
    if (config.url != "/login" && config.url != "/jsonLogin") {
      let token = userStore().getToken;
      if (token) {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = "Bearer " + token;
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  (response) => {
    let refreshtoken = response.headers.refreshtoken;
    if (refreshtoken != undefined) {
      userStore().setToken(refreshtoken);
    }
    if (response.data.errCode == "401") {
      router.replace({
        path: "/jsonLogin",
      });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error.response); // 返回接口返回的错误信息
  }
);

export default service;
