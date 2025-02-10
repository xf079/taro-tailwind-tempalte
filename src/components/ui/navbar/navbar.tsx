import { ViewProps } from '@tarojs/components/types/View';
import { View } from '@tarojs/components';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { cn } from '@/lib/utils';

const navbarVariants = cva('w-full h-12 flex items-center justify-between relative', {
  variants: {
    border: {
      true: 'border-b-2 border-muted',
      false: ''
    }
  }
});

export interface NavbarProps extends ViewProps {
  border?: boolean;
}

export function Navbar(props: NavbarProps) {
  const { border, children, ...resetProps } = props;

  return (
    <View className={cn(navbarVariants({ border }))} {...resetProps}>
      {children}
    </View>
  );
}

export function NavBarLeft(props: ViewProps) {
  const { className, children, ...resetProps } = props;
  return (
    <View
      className={clsx(
        'absolute left-0 top-0 bottom-0 flex justify-center items-center pl-2 text-sm text-foreground',
        className
      )}
      {...resetProps}
    >
      {children}
    </View>
  );
}

export function NavBarRight(props: ViewProps) {
  const { className, children, ...resetProps } = props;
  return (
    <View
      className={clsx(
        'fixed right-0 top-0 bottom-0 flex justify-center items-center pl-2 text-sm text-foreground',
        className
      )}
      {...resetProps}
    >
      {children}
    </View>
  );
}
export function NavBarTitle(props: ViewProps) {
  const { className, children, ...resetProps } = props;
  return (
    <View
      className={clsx('mx-auto max-w-[60%] text-foreground font-semibold text-base', className)}
      {...resetProps}
    >
      {children}
    </View>
  );
}
