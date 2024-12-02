import { View, ViewProps } from '@tarojs/components';
import { FC } from 'react';
import { cn } from '@/lib/utils';
import { useControllableValue } from 'ahooks';
import { Transition } from '@/components/ui/transition';
import { useLockScroll } from '@/utils/dom/use-lock-scroll';

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
   * @default true
   */
  lock?: boolean;

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
    duration,
    lock = true,
    closeable,
    onClose,
    onClick,
    className,
    children,
    ...restProps
  } = props;

  const [state] = useControllableValue<boolean>(props, {
    defaultValuePropName: 'defaultOpen',
    valuePropName: 'open'
  });

  useLockScroll(lock);

  return (
    <Transition open={state} duration={duration} name='fade'>
      <View
        className={cn(
          'fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/50',
          className
        )}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e);
          if (closeable) {
            onClose?.();
          }
        }}
        catchMove={lock}
        {...restProps}
      >
        {children ? (
          <View
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </View>
        ) : null}
      </View>
    </Transition>
  );
};
