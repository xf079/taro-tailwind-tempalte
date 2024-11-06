import { Button, ButtonProps } from '@tarojs/components';
import { forwardRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Slot } from '@/components/ui/slot';

const btnVariants = cva(
  'inline-flex items-center justify-center w-auto px-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-transparent after:border-none',
  {
    variants: {
      variant: {
        default:
          'bg-primary !text-primary-foreground shadow active:!bg-primary/70',
        destructive:
          'bg-destructive !text-destructive-foreground shadow-sm active:!bg-destructive/70',
        outline:
          'border-2 border-input border-solid bg-background shadow-sm active:!bg-muted/60',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm active:!bg-secondary/60',
        ghost: 'active:!bg-muted/60',
        link: 'text-primary underline-offset-4 underline active:!bg-transparent'
      },
      size: {
        default: 'h-12 px-4',
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

export interface BtnProps
  extends ButtonProps,
    Omit<VariantProps<typeof btnVariants>, 'disabled'> {
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

export const Btn = forwardRef<HTMLButtonElement, BtnProps>(
  ({ variant, size, block, disabled, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : Button;
    return (
      <Comp
        ref={ref}
        className={cn(
          btnVariants({ variant, size, block, disabled, className })
        )}
        {...props}
      />
    );
  }
);
