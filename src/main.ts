import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import TDesign from "tdesign-mobile-vue";
import "tdesign-mobile-vue/es/style/index.css";

// pinia
import { setupPinia } from "@/store/pinia";
// 路由
import router from "./router";
import "@/router/permission";

const app = createApp(App);

setupPinia(app);
app.use(router);
app.use(TDesign);

app.mount("#app");
