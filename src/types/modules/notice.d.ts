import { Slot } from "vue";

export interface MessageOptions {
    align?: "left" | "center";
    closeBtn?: string | boolean | Function | Slot;
    content?: string | Function | Slot;
    duration?: number;
    theme: "info" | "success" | "warning" | "error";
    visible?: boolean;
    icon?: boolean | Function | Slot;
    zIndex?: number;
    link?: string | Function | Slot | Object;
    offset?: Array<number> | Array<string>;
    marquee?: boolean | Object;
    onCloseBtnClick?: (context: { e: MouseEvent }) => void;
    onDurationEnd?: () => void;
    onLinkClick?: (context: { e: MouseEvent }) => void;
  }
  
  export interface ToastOptions {
    direction?: "row" | "column";
    duration?: number;
    icon?: boolean | Function | Slot;
    message?: string | Slot | Function;
    overlayProps?: Object;
    placement?: "top" | "middle" | "bottom";
    preventScrollThrough?: boolean;
    showOverlay?: boolean;
    theme?: "loading" | "success" | "error";
    onClose?: () => void;
    onDestroy?: () => void;
  }