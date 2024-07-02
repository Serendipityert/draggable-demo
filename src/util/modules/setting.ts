import { settingStore } from "@/store";
import { computed, onMounted, onUnmounted, ref, h, watch } from "vue";
import {
  GlobalPCWidth,
  GlobalPCHeaderHeight,
  GlobalNavBarHeight,
} from "@/constants";
import router from "@/router";
import { useOnline } from "@vueuse/core";
import { Toast } from "tdesign-mobile-vue";
import { WifiIcon, WifiOffIcon } from "tdesign-icons-vue-next";

/**
 * 实时网络检测
 */
export const networkDetection = () => {
  const online = useOnline();

  watch(online, (newVal: boolean, _oldVal: boolean) => {
    if (newVal) {
      Toast.clear();
      Toast({
        message: "网络已连接",
        direction: "column",
        icon: () => h(WifiIcon),
      });
    } else {
      Toast({
        message: "网络已断开",
        direction: "column",
        duration: -1, //永久显示
        preventScrollThrough: true,
        showOverlay: true,
        icon: () => h(WifiOffIcon),
      });
    }
  });
};

/**
 * 数据初始化
 */
export const handleDataInit = () => {
  let lastWidth = window.innerWidth;
  // 设置阈值，假设移动端最大宽度为768px，桌面端最小宽度为1024px
  const threshold = 256;
  const checkEquipmentWithThreshold = () => {
    const currentWidth = window.innerWidth;
    if (Math.abs(currentWidth - lastWidth) > threshold) {
      lastWidth = currentWidth;
      equipmentIsMobile();
      // 设置随机值，更新组件
      settingStore().setRandom();
    }
  };

  // 检测设备类型
  equipmentIsMobile();

  // 挂载全局css样式数值
  mountGlobalCSSValue();

  // 监听窗口大小变化同时检测当前设备类别事件
  window.addEventListener("resize", () => {
    checkEquipmentWithThreshold();
  });

  onUnmounted(() => {
    // 移除监听窗口大小变化同时检测当前设备类别事件
    window.removeEventListener("resize", () => {
      checkEquipmentWithThreshold();
    });
  });
};

/**
 * 防抖函数
 * @param func
 * @param delay
 * @returns
 */
export const debounce = (func: any, delay: number) => {
  let timer = null as any;
  const _debounce = function (...args: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
  return _debounce;
};

/**
 * 当前设备是否为手机
 */
export const equipmentIsMobile = (): void => {
  const flag =
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(
      navigator.userAgent
    );
  settingStore().setIsMobile(flag);
};

/**
 * 设备变化事件
 * @returns
 */
export const handleEquipmentChange = () => {
  const storeState = computed(() => settingStore().$state);
  const isMobile = computed(() => storeState.value.isMobile);
  const primaryFontSize = computed(() =>
    isMobile.value ? "text-sm" : "text-base"
  );

  return {
    primaryFontSize,
    isMobile,
  };
};

/**
 * 挂载全局css样式数值
 */
export const mountGlobalCSSValue = () => {
  document.documentElement.style.setProperty(
    "--global-pc-main-width",
    `${GlobalPCWidth}px`
  );
  document.documentElement.style.setProperty(
    "--global-pc-header-height",
    `${GlobalPCHeaderHeight}px`
  );
  document.documentElement.style.setProperty(
    "--global-nav-bar-height",
    `${GlobalNavBarHeight}px`
  );
  document.documentElement.style.setProperty(
    "--global-pc-view-height",
    `calc(100vh - var(--global-nav-bar-height) - var(--global-pc-header-height) - 24px)`
  );
};

/**
 * 视口大小
 */
export const handleViewSize = (): any => {
  const viewHeight = ref(window.innerHeight);
  const viewWidth = ref(window.innerWidth);
  const updateViewWidth = () => {
    viewWidth.value = window.innerWidth;
  };
  const updateViewHeight = () => {
    viewHeight.value = window.innerHeight;
  };
  onMounted(() => {
    updateViewHeight();
    updateViewWidth();
    window.addEventListener("resize", updateViewHeight);
    window.addEventListener("resize", updateViewWidth);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", updateViewHeight);
    window.removeEventListener("resize", updateViewWidth);
  });
  return {
    viewHeight,
    viewWidth,
  };
};

/**
 * 查询为 TabBar 的路由
 * @param routes 路由数据
 * @returns path数组
 */
export const findTabBarRoutes = () => {
  const results = [] as any;
  const pathsAdded = new Set();
  function find(routes: any) {
    for (const route of routes) {
      if (route.meta && route.meta.isTabBar && !pathsAdded.has(route.path)) {
        results.push(route);
        pathsAdded.add(route.path);
      }
      if (route.children && route.children.length > 0) {
        find(route.children);
      }
    }
  }
  find(router.getRoutes());
  return [...results.map((route: any) => route.path)];
};

/**
 * 判断当前路由是否是 TabBar，true 显示 TabBar
 * @returns true/false
 */
export const isShowTabBar = computed(() => {
  return findTabBarRoutes().includes(router.currentRoute.value.path);
});

/**
 * 获取文件图标
 * @param mimeType
 * @returns
 */
export const getFileIcon = (mimeType: string) => {
  const fileIcons = ref({
    image: "file-image",
    pdf: "file-pdf",
    ppt: "file-powerpoint",
    zip: "file-zip",
    word: "file-word",
    excel: "file-excel",
    music: "file-music",
    other: "file",
  });
  if (mimeType === "") {
    return fileIcons.value.other;
  }
  const type = mimeType.split("/")[0];
  const subtype = mimeType.split("/")[1];

  if (
    (type === "image" && subtype.includes("jpeg")) ||
    subtype.includes("png") ||
    subtype.includes("gif")
  ) {
    return fileIcons.value.image;
  } else if (type === "application") {
    if (subtype.includes("pdf")) {
      return fileIcons.value.pdf;
    } else if (
      subtype.includes("msword") ||
      subtype.includes("wordprocessingml")
    ) {
      return fileIcons.value.word;
    } else if (
      subtype.includes("vnd.ms-excel") ||
      subtype.includes("vnd.openxmlformats-officedocument.spreadsheetml")
    ) {
      return fileIcons.value.excel;
    } else if (
      subtype.includes("vnd.ms-powerpoint") ||
      subtype.includes("vnd.openxmlformats-officedocument.presentationml")
    ) {
      return fileIcons.value.ppt;
    } else if (
      subtype.includes("zip") ||
      subtype.includes("x-zip-compressed")
    ) {
      return fileIcons.value.zip;
    }
  } else if (type === "audio") {
    return fileIcons.value.music;
  }

  // 如果没有匹配，则返回 'other'
  return fileIcons.value.other;
};

/**
 * 刻度标记，示例：[0, 10, 40, 200]
 * @param min 最小值
 * @param step 步长
 * @param max 最大值
 * @returns
 */
export const generateMarksRange = (min: number, step: number, max: number) => {
  const marksRange = {} as any;
  for (let i = min; i <= max; i += step) {
    marksRange[i] = i.toString();
  }
  return marksRange;
};

/**
 * 根据 value 获取对应的 children 和 level
 * @param list
 * @param value
 * @param level
 * @returns
 */
export const findChildrenByValue = (list: any, value: any, level = 0) => {
  let result = null;

  for (let item of list) {
    if (item.value === value) {
      return { children: item.children || null, level };
    }
    if (item.children) {
      result = findChildrenByValue(item.children, value, level + 1) as any;
      if (result) {
        return result;
      }
    }
  }
  return result;
};

/**
 * 根据传入的 value 查找对应的 item 数据
 * @param {Array} data - 数据数组
 * @param {number} value - 传入的 value
 * @return {Object|null} - 返回对应的 item 数据，未找到则返回 null
 */
export function findItemByValue(data: any, value: string) {
  if (!Array.isArray(data) || typeof value !== "number") {
    return null;
  }

  function findItem(arr: any, val: string) {
    for (let item of arr) {
      if (item.value === val) {
        return item;
      }
      if (item.children && item.children.length > 0) {
        let result = findItem(item.children, val) as any;
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  return findItem(data, value);
}
