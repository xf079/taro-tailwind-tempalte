import {
  Button as TaroButton,
  ButtonProps as TaroButtonProps
} from '@tarojs/components';
import { FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center w-auto px-2 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-transparent after:border-none',
  {
    variants: {
      variant: {
        default:
          'bg-primary !text-primary-foreground shadow hover:bg-primary/90 active:!bg-primary/70',
        destructive:
          'bg-destructive !text-destructive-foreground shadow-sm hover:bg-destructive/90 active:!bg-destructive/70',
        outline:
          'border-2 border-input border-solid bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 underline'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9'
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
  console.log(variant);
  return (
    <TaroButton
      disabled={disabled}
      className={cn(
        buttonVariants({ variant, size, block, disabled, className }),
        'cursor-pointer active:bg-primary/90'
      )}
      {...props}
    >
      {children}
    </TaroButton>
  );
};
