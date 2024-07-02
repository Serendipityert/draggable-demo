import { PopupSource } from "tdesign-mobile-vue/es/popup";

export interface PopupOptions {
  visible?: boolean;
  defaultVisible?: boolean;
  attach?: string;
  closeOnOverlayClick?: boolean;
  closeBtn?: boolean;
  placement?: string;
  destroyOnClose?: boolean;
  overlayProps?: any;
  preventScrollThrough?: boolean;
  showOverlay?: boolean;
  transitionName?: any;
  zIndex?: number;
  onOpen?: () => void;
  onOpened?: () => void;
  onClose?: (context: { e: MouseEvent }) => void;
  onClosed?: () => void;
  onVisibleChange?: (visible: boolean, trigger: PopupSource) => void;
}
