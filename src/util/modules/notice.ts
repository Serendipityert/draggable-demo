import { Message, Toast } from "tdesign-mobile-vue";
import { MessageOptions, ToastOptions } from "@/types";

/**
 * 默认消息配置
 */
const defaultMessageOptions: MessageOptions = {
  align: "center", //文本对齐方式。可选项：left/center
  theme: "info", // 默认为信息类通知
  duration: 3000, // 默认显示3秒
  closeBtn: true, // 默认显示关闭按钮
  offset: [10, 16],
  marquee: false, //跑马灯效果。speed 指速度控制；loop 指循环播放次数，值为 -1 表示循环播放，值为 0 表示不循环播放；delay 表示延迟多久开始播放
};

/**
 * 默认轻提示配置
 */
const defaultToastOptions: ToastOptions = {
  direction: "column", //图标排列方式。可选项：row/column
  placement: "middle", // 弹窗展示位置。可选项： top/middle/bottom
  duration: 2000, // 默认显示2秒
  preventScrollThrough: true, // 防止滚动穿透，即不允许点击和滚动
  showOverlay: true, //是否显示遮罩层
  overlayProps: {
    zIndex: 9999,
  },
};

class NoticeManager {
  /**
   * Message Props
   * -------------
   * align: 文本对齐方式。可选项：left/center。类型: MessageAlignType ('left' | 'center')
   *
   * closeBtn: 关闭按钮的配置。true 显示默认关闭按钮，false 不显示，字符串显示指定文本，或者完全自定义。
   * 类型: string | boolean | TNode
   *
   * content: 自定义消息弹出内容。
   * 类型: string | TNode
   *
   * duration: 消息内置计时器，单位：毫秒。值为0表示没有计时器，其他值表示持续时间。
   * 类型: number
   * 默认值: 3000
   *
   * icon: 自定义消息前面的图标。true 显示默认图标，false 不显示。
   * 类型: boolean | TNode
   * 默认值: true
   *
   * link: 链接名称，可以是字符串或对象，对象时透传至 Link。
   * 类型: string | object | TNode
   *
   * marquee: 跑马灯效果。包含 speed（速度控制），loop（循环播放次数），delay（延迟开始时间）。
   * 类型: boolean | DrawMarquee ({ speed?: number; loop?: number; delay?: number })
   * 默认值: false
   *
   * offset: 相对于 placement 的偏移量，示例值为 [-10, 20] 或 ['10rpx', '8rpx']。
   * 类型: Array<string | number>
   *
   * theme: 消息组件风格。可选项：info/success/warning/error。
   * 类型: MessageThemeList ('info' | 'success' | 'warning' | 'error')
   * 默认值: 'info'
   *
   * visible: 是否显示，支持 v-model 或 v-model:visible 控制显示状态。
   * 类型: boolean
   * 默认值: false
   *
   * defaultVisible: 初始是否显示，非受控属性。
   * 类型: boolean
   * 默认值: false
   *
   * zIndex: 元素层级，默认为 5000。
   * 类型: number
   *
   * Message Events
   * ---------------
   * onCloseBtnClick: 关闭按钮点击事件。
   * 类型: (context: { e: MouseEvent }) => void
   *
   * onDurationEnd: 计时结束后触发的事件。
   * 类型: () => void
   *
   * onLinkClick: 当存在 link 时，点击链接文本触发的事件。
   * 类型: (context: { e: MouseEvent }) => void
   */
  MESSAGE = (options: MessageOptions) => {
    const finalOptions: MessageOptions | any = {
      ...defaultMessageOptions,
      ...options,
    };
    Message[finalOptions.theme](finalOptions);
  };

  /**
   * Component Properties
   * --------------------
   * direction: 图标排列方式。可选项：row/column。
   * 类型: 'row' | 'column'
   * 默认值: 'column'
   *
   * duration: 弹窗显示毫秒数。
   * 类型: number
   * 默认值: 2000
   *
   * icon: 自定义图标。可以是字符串、插槽或函数。
   * 类型: string | TNode
   *
   * message: 弹窗显示文字。可以是字符串、插槽或函数。
   * 类型: string | TNode
   *
   * overlayProps: 遮罩层属性，透传至 Overlay 组件。
   * 类型: OverlayProps
   * 默认值: {}
   * 参考: Overlay API Documents
   *
   * placement: 弹窗展示位置。可选项：top/middle/bottom。
   * 类型: 'top' | 'middle' | 'bottom'
   * 默认值: 'middle'
   *
   * preventScrollThrough: 防止滚动穿透，即不允许点击和滚动。
   * 类型: boolean
   * 默认值: false
   *
   * showOverlay: 是否显示遮罩层。
   * 类型: boolean
   * 默认值: false
   *
   * theme: 提示类型。可选项：loading/success/error。
   * 类型: 'loading' | 'success' | 'error'
   *
   * Component Events
   * ----------------
   * onClose: 轻提示隐藏的时候触发的事件。
   * 类型: () => void
   *
   * onDestroy: 轻提示销毁的时候触发的事件。
   * 类型: () => void
   */
  TOAST = (options: ToastOptions) => {
    const finalOptions: ToastOptions | any = {
      ...defaultToastOptions,
      ...options,
    };
    Toast(finalOptions);
  };

  /**
   * 手动关闭
   */
  HIDE_TOAST = () => {
    Toast.clear();
  };
}

export const notice = new NoticeManager();
