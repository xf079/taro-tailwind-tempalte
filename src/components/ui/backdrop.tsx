import { View, ViewProps } from '@tarojs/components';
import { FC, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useControllableValue } from 'ahooks';
import { useTransition } from 'react-transition-state';

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
  timeout?: number;
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
  const { lockScroll, closeable, onClose, onClick, className, ...restProps } =
    props;

  const [state] = useControllableValue<boolean>(props, {
    defaultValuePropName: 'defaultOpen',
    valuePropName: 'open'
  });

  const [{ status, isMounted }, toggle] = useTransition({
    timeout: props.timeout,
    mountOnEnter: true,
    unmountOnExit: true,
    preEnter: true
  });

  useEffect(() => {
    toggle(state);
  }, [state]);

  if (!isMounted) return null;

  return (
    <View
      style={`--duration: ${props.timeout}ms`}
      className={cn(
        'fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/50 transition-opacity ease-linear duration-base',
        status === 'preEnter' || status === 'exiting' ? 'opacity-0' : '',
        className
      )}
      catchMove={lockScroll}
      onClick={(e) => {
        onClick?.(e);
        if (closeable) {
          onClose?.();
        }
      }}
      {...restProps}
    />
  );
};
