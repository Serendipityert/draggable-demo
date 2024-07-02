<template>
  <div>
    <t-tab-bar
      v-model="activeValue"
      :split="false"
      @change="handleTabBarChange">
      <t-tab-bar-item
        v-for="item in tabBarList"
        :key="item.name"
        :value="item.name">
        {{ item.text }}
        <template #icon>
          <t-icon :name="item.icon" />
        </template>
      </t-tab-bar-item>
    </t-tab-bar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Icon as TIcon } from "tdesign-icons-vue-next";
import router from "@/router";

const activeValue = ref("home");

const tabBarList = ref([
  {
    name: "home",
    text: "首页",
    icon: "home",
  },
  {
    name: "listenEvaluaeLesson",
    text: "听评课",
    icon: "system-regulation",
  },
  {
    name: "resource",
    text: "资源",
    icon: "article",
  },
  {
    name: "my",
    text: "我的",
    icon: "user",
  },
]);

const handleTabBarChange = (value: string | number) => {
  switch (value) {
    case "home":
      return router.replace("/dashboard/home");
    case "listenEvaluaeLesson":
      return router.replace("/dashboard/listenEvaluaeLesson");
    case "resource":
      return router.replace("/dashboard/resource");
    case "my":
      return router.replace("/dashboard/my");
  }
};
</script>

<style scoped lang="scss"></style>
