import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path";

export default defineConfig({
  base: "./",
  plugins: [vue()],
  server: {
    port: 4000,
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  define: {},
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve(
            "src/assets/css/index.less"
          )}";`,
        },
        javascriptEnabled: true,
      },
      scss: {
        additionalData: '@import "@/assets/css/index.scss";',
      },
    },
  },
});
