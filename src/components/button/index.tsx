import {
  Button as TaroButton,
  ButtonProps as TaroButtonProps
} from '@tarojs/components';
import { FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center w-auto px-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-transparent after:border-none',
  {
    variants: {
      variant: {
        default:
          'bg-primary !text-primary-foreground shadow active:!bg-primary/70',
        destructive:
          'bg-destructive !text-destructive-foreground shadow-sm active:!bg-destructive/70',
        outline:
          'border-2 border-input border-solid bg-background shadow-sm active:!bg-accent active:!text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm active:bg-secondary/80',
        ghost: 'active:!bg-accent active:!text-accent-foreground',
        link: 'text-primary underline-offset-4 underline active:!bg-transparent active:!text-primary/70'
      },
      size: {
        default: 'h-12 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9'
      },
      shape: {
        default: 'rounded-md',
        circle: 'rounded-full'
      },
      block: {
        true: 'w-full'
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'default',
      block: false,
      disabled: false
    }
  }
);

export type ButtonProps = VariantProps<typeof buttonVariants> & TaroButtonProps;
export const Button: FC<ButtonProps> = ({
  variant,
  size,
  block,
  disabled,
  className,
  children,
  ...props
}) => {
  return (
    <TaroButton
      disabled={disabled}
      className={cn(
        buttonVariants({ variant, size, block, disabled, className })
      )}
      {...props}
    >
      {children}
    </TaroButton>
  );
};
