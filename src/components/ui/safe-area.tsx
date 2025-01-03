import { getWindowInfo } from '@tarojs/taro';
import React, { useMemo } from 'react';
import { View, ViewProps } from '@tarojs/components';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export type SafeAreaPosition = 'top' | 'bottom';

export interface SafeAreaProps extends ViewProps {
  /**
   * @description 安全区域位置
   * @default 'top'
   */
  position?: SafeAreaPosition;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
  /**
   * @description 是否使用原生的安全区域
   * @default false
   */
  nativeSafeTop?: boolean;
}

const safeAreaVariants = cva('w-full', {
  variants: {
    position: {
      top: 'pt-[constant(safe-area-inset-top)] pt-[env(safe-area-inset-top)]',
      bottom: 'pb-[constant(safe-area-inset-bottom)] pb-[env(safe-area-inset-bottom)]'
    }
  }
});

export const SafeArea: React.FC<SafeAreaProps> = (props) => {
  const { position = 'top', nativeSafeTop = false, className, style, ...restProps } = props;
  const { statusBarHeight } = getWindowInfo();

  const customStyle = useMemo(() => {
    if (position === 'top' && nativeSafeTop) {
      return {
        paddingTop: `${statusBarHeight || 0}px`
      };
    }
    return {};
  }, [position, nativeSafeTop]);

  return (
    <View
      className={cn(safeAreaVariants({ position }), className)}
      style={{ ...customStyle, ...style }}
      {...restProps}
    />
  );
};
