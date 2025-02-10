import { Button as TaroButton, type ButtonProps as TaroButtonProps } from '@tarojs/components';
import { forwardRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center w-auto px-2 m-0 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-transparent after:border-none',
  {
    variants: {
      variant: {
        default: 'bg-primary !text-primary-foreground shadow active:!bg-primary/70',
        destructive:
          'bg-destructive !text-destructive-foreground shadow-sm active:!bg-destructive/70',
        outline: 'border-2 border-input border-solid bg-background active:!bg-muted/60',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm active:!bg-secondary/60',
        ghost: 'active:!bg-muted/60',
        link: 'text-primary underline-offset-4 underline active:!bg-transparent'
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9 px-0'
      },
      shape: {
        default: 'rounded-md',
        circle: 'rounded-full'
      },
      block: {
        true: 'w-full'
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50 pointer-events-none'
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

export interface ButtonProps
  extends Omit<TaroButtonProps, 'size'>,
    Omit<VariantProps<typeof buttonVariants>, 'disabled'> {
  disabled?: boolean;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, block, shape, disabled, className, ...props }, ref) => {
    return (
      <TaroButton
        ref={ref}
        className={cn(buttonVariants({ variant, size, block, shape, disabled }), className)}
        {...props}
      />
    );
  }
);
