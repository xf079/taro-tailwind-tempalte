import { Transition, TransitionName } from '@/components/ui/transition';
import { View, ViewProps } from '@tarojs/components';
import { CSSProperties, FC, ReactNode } from 'react';
import { EnterHandler, ExitHandler } from 'react-transition-group/Transition';
import { useControllableValue } from 'ahooks';
import { cn } from '@/lib/utils';
import { Backdrop } from '@/components/ui/backdrop';
import { cva } from 'class-variance-authority';
import { useConfig } from '@/components/ui/config-provider';

export type PopupPlacement = 'top' | 'right' | 'bottom' | 'left' | 'center';

function toTransactionName(placement?: PopupPlacement) {
  if (placement === 'top') {
    return TransitionName.SlideDown;
  }

  if (placement === 'bottom') {
    return TransitionName.SlideUp;
  }

  if (placement === 'right') {
    return TransitionName.SlideRight;
  }

  if (placement === 'left') {
    return TransitionName.SlideLeft;
  }

  return TransitionName.Fade;
}

const popupVariants = cva('fixed bg-background', {
  variants: {
    placement: {
      center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
      top: 'top-0 left-0 right-0',
      bottom: 'bottom-0 left-0 right-0',
      left: 'top-0 left-0 bottom-0',
      right: 'top-0 right-0 bottom-0'
    },
    placementRounded: {
      false: '',
      center: '',
      top: 'rounded-b-lg',
      bottom: 'rounded-t-lg',
      left: 'rounded-r-lg',
      right: 'rounded-l-lg'
    },
    rounded: {
      true: 'overflow-hidden'
    }
  },
  defaultVariants: {
    placement: 'center',
    rounded: false
  }
});

export interface PopupProps extends ViewProps {
  style?: CSSProperties;
  defaultOpen?: boolean;
  open?: boolean;
  placement?: PopupPlacement;
  rounded?: boolean;
  children?: ReactNode;
  lock?: boolean;
  zIndex?: number;

  /**
   * 是否点击蒙层关闭
   * @default false
   */
  closeable?: boolean;
  /**
   * closeable为true时点击蒙层时触发
   */
  onClose?(opened: boolean): void;

  duration?: number;
  mountOnEnter?: boolean;
  transaction?: string;
  transactionDuration?: number;
  transitionAppear?: boolean;

  onTransitionEnter?: EnterHandler<HTMLElement>;
  onTransitionEntered?: EnterHandler<HTMLElement>;
  onTransitionExit?: ExitHandler<HTMLElement>;
  onTransitionExited?: ExitHandler<HTMLElement>;
}

export const Popup: FC<PopupProps> = (props) => {
  const {
    open,
    placement = 'center',
    duration,
    rounded = false,
    lock = true,
    closeable,
    onClose,
    children,
    transaction,
    transactionDuration,
    transitionAppear,
    onTransitionEnter,
    onTransitionEntered,
    onTransitionExit,
    onTransitionExited,
    ...restProps
  } = props;

  const [state] = useControllableValue<boolean>(props, {
    defaultValuePropName: 'defaultOpen',
    valuePropName: 'open'
  });
  const { index } = useConfig();

  const transformName = toTransactionName(placement);

  return (
    <>
      <Backdrop
        open={state}
        duration={transactionDuration}
        style={{ zIndex: index }}
        lock={lock}
        closeable={closeable}
        onClose={() => {
          onClose?.(false);
        }}
      />
      <Transition
        open={state}
        name={transformName}
        duration={duration}
        appear={transitionAppear}
        onEnter={onTransitionEnter}
        onEntering={onTransitionEnter}
        onEntered={onTransitionEntered}
        onExit={onTransitionExit}
        onExiting={onTransitionExit}
        onExited={onTransitionExited}
        {...restProps}
      >
        <View
          style={{ zIndex: index + 1 }}
          className={cn(
            popupVariants({
              placement,
              rounded,
              placementRounded: rounded ? placement : false
            })
          )}
        >
          {children}
          <View className='rounded rounded-md' />
        </View>
      </Transition>
    </>
  );
};

export const PopupBackdrop = Backdrop;
