import React, { useRef } from 'react';
import { View, ViewProps } from '@tarojs/components';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { SafeArea, type SafeAreaPosition } from '@/components/ui/safe-area';
import { usePlaceholder } from '@/hooks/usePlaceholder';

interface FixedViewProps extends ViewProps {
  position?: 'top' | 'bottom';
  safeArea?: SafeAreaPosition;
  style?: React.CSSProperties;
  nativeSafeTop?: boolean;
  placeholder?: boolean;
  placeholderClassName?: string;
}

const fixedViewVariants = cva('fixed left-0 right-0 z-50 bg-background', {
  variants: {
    position: {
      top: 'top-0 bottom-auto',
      bottom: 'bottom-0 top-auto'
    }
  }
});

export const FixedView: React.FC<FixedViewProps> = (props) => {
  const {
    position,
    safeArea,
    className,
    nativeSafeTop,
    placeholder,
    placeholderClassName,
    children,
    ...restProps
  } = props;

  const contentRef = useRef();

  const Placeholder = usePlaceholder(contentRef, { className: placeholderClassName });

  const contentNode = (
    <View
      ref={contentRef}
      className={cn(fixedViewVariants({ position }), className)}
      {...restProps}
    >
      {safeArea === 'top' && <SafeArea position='top' nativeSafeTop={nativeSafeTop} />}
      {children}
      {safeArea === 'bottom' && <SafeArea position='bottom' />}
    </View>
  );

  if (placeholder) {
    return <Placeholder className={cn('fixed-view-placeholder w-full')} children={contentNode} />;
  }

  return contentNode;
};
