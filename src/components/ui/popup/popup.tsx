import React, { CSSProperties, ReactNode } from 'react';
import { View } from '@tarojs/components';
import { useControllableValue } from 'ahooks';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Backdrop } from '@/components/ui/backdrop/backdrop';
import createContext from '@/components/ui/context';
import { Transition, TransitionName } from '@/components/ui/transition/transition';

function toTransactionName(placement?: PopupPlacement) {
  if (placement === 'top') {
    return TransitionName.SlideDown;
  }

  if (placement === 'bottom') {
    return TransitionName.SlideUp;
  }

  if (placement === 'right') {
    return TransitionName.SlideRight;
  }

  if (placement === 'left') {
    return TransitionName.SlideLeft;
  }

  return TransitionName.Fade;
}
export type PopupPlacement = 'top' | 'right' | 'bottom' | 'left' | 'center';

type PopupContextValue = {
  open: boolean;
  placement?: PopupPlacement;
  duration?: number;
  rounded?: boolean;
  lock?: boolean;
  closeable?: boolean;
  onOpenChange?: (open: boolean) => void;
};

/**
 * ----------------------------------------------------
 * Popup
 * ----------------------------------------------------
 */
const POPUP_NAME = 'Popup';

const [Provider, useContext] = createContext<PopupContextValue>(POPUP_NAME);

export interface PopupProps {
  /**
   * @description 控制组件是否打开
   */
  open: boolean;
  /**
   * @description 默认情况下是否打开
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * @description 位置
   * @default center
   */
  placement?: PopupPlacement;
  /**
   * @description 动画时长
   * @default 300
   */
  duration?: number;
  /**
   * @description 是否圆角
   * @default false
   */
  rounded?: boolean;
  /**
   * @description 是否锁定滚动
   * @default true
   */
  lock?: boolean;
  /**
   * 是否点击蒙层关闭
   * @default false
   */
  closeable?: boolean;
  /**
   * @description 子组件
   */
  children?: ReactNode;
  /**
   * @description 状态变化回调
   * @default () => {}
   */
  onOpenChange?: (open: boolean) => void;
}

const Popup: React.FC<PopupProps> = (props) => {
  const {
    placement = 'center',
    duration = 300,
    rounded = false,
    lock = true,
    closeable,
    children
  } = props;

  const [open, onOpenChange] = useControllableValue<boolean>(props, {
    defaultValuePropName: 'defaultOpen',
    valuePropName: 'open',
    trigger: 'onOpenChange'
  });
  return (
    <Provider
      open={open}
      placement={placement}
      rounded={rounded}
      closeable={closeable}
      duration={duration}
      lock={lock}
      onOpenChange={onOpenChange}
    >
      {children}
    </Provider>
  );
};

/**
 * ----------------------------------------------------
 * PopupBackdrop
 * ----------------------------------------------------
 */

const POPUP_BACKDROP_NAME = 'PopupBackdrop';

interface BackdropProps {
  className?: string;
  style?: CSSProperties;
}

const PopupBackdrop: React.FC<BackdropProps> = (props) => {
  const { open, closeable, onOpenChange } = useContext(POPUP_BACKDROP_NAME);
  return (
    <Backdrop
      open={open}
      closeable={closeable}
      onClose={() => {
        if (closeable) {
          onOpenChange?.(false);
        }
      }}
      {...props}
    />
  );
};

/**
 * ----------------------------------------------------
 * PopupContent
 * ----------------------------------------------------
 */
const POPUP_CONTENT_NAME = 'PopupContent';

interface PopupContentProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const popupContentVariants = cva('fixed bg-background overflow-hidden', {
  variants: {
    placement: {
      center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
      top: 'top-0 left-0 right-0',
      bottom: 'bottom-0 left-0 right-0',
      left: 'top-0 left-0 bottom-0',
      right: 'top-0 right-0 bottom-0'
    },
    placementRounded: {
      false: '',
      center: 'rounded-lg',
      top: 'rounded-b-lg',
      bottom: 'rounded-t-lg',
      left: 'rounded-r-lg',
      right: 'rounded-l-lg'
    }
  },
  defaultVariants: {
    placement: 'center',
    placementRounded: false
  }
});

const PopupContent: React.FC<PopupContentProps> = (props) => {
  const { style, className, children } = props;
  const { open, placement, duration, rounded } = useContext(POPUP_CONTENT_NAME);
  const transformName = toTransactionName(placement);
  const index = 100;

  return (
    <Transition open={open} name={transformName} duration={duration}>
      <View
        style={{ ...{ zIndex: index + 1 }, ...style }}
        className={cn(
          popupContentVariants({
            placement,
            placementRounded: rounded ? placement : false
          }),
          className
        )}
      >
        {children}
      </View>
    </Transition>
  );
};

export { Popup, PopupBackdrop, PopupContent };
