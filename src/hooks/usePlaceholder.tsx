import { View } from '@tarojs/components';
import { ViewProps } from '@tarojs/components/types/View';
import classNames from 'classnames';
import { CSSProperties, memo, PropsWithChildren } from 'react';
import { useHeight } from '@/hooks/useHeight';
import { addUnitPx } from '@/utils/format/unit';

interface UsePlaceholderOptions {
  className?: string;
}

export interface PlaceholderProps extends PropsWithChildren<ViewProps> {
  style?: CSSProperties;
}

export const usePlaceholder = (contentRef: any, { className }: UsePlaceholderOptions = {}) => {
  return memo(
    ({ className: classNameProp, style = {}, children, ...restProps }: PlaceholderProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const height = useHeight(contentRef, [children]);
      console.log('=======================',height)
      return (
        <View
          className={classNames(className, classNameProp)}
          style={{
            ...style,
            height: height ? `${addUnitPx(height)}` : ''
          }}
          children={children}
          {...restProps}
        />
      );
    }
  );
};
