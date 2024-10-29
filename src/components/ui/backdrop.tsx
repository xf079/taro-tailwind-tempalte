import { View, ViewProps } from '@tarojs/components';
import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Transition } from '@/components/ui/transition';

export interface BackdropProps extends ViewProps {
  /**
   * 是否默认展示遮罩层
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * 是否展开遮罩层
   * @default false
   */
  open?: boolean;
  /**
   * 动画时长，单位毫秒
   * @default 300
   */
  duration?: number;
  /**
   * 是否锁定背景滚动
   * @default false
   */
  lockScroll?: boolean;

  /**
   * 是否点击蒙层关闭
   * @default false
   */
  closeable?: boolean;
  /**
   * closeable为true时点击蒙层时触发
   */
  onClose?: () => void;
}

export const Backdrop: FC<BackdropProps> = (props) => {
  const {
    defaultOpen,
    open,
    duration,
    lockScroll,
    closeable,
    onClose,
    onClick,
    className,
    ...restProps
  } = props;
  return (
    <Transition>
      <View
        className={cn('fixed inset-0 bg-black/50', className)}
        {...props}
        onClick={(e) => {
          onClick?.(e);
          if (closeable) {
            onClose?.();
          }
        }}
        {...restProps}
      />
    </Transition>
  );
};
