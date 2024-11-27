import { Transition, TransitionName } from '@/components/ui/transition';
import { View, ViewProps } from '@tarojs/components';
import { CSSProperties, FC, ReactNode } from 'react';
import { EnterHandler, ExitHandler } from 'react-transition-group/Transition';
import { useControllableValue } from 'ahooks';
import { cn } from '@/lib/utils';
import { Backdrop } from '@/components/ui/backdrop';

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

export interface PopupProps extends ViewProps {
  style?: CSSProperties;
  defaultOpen?: boolean;
  open?: boolean;
  placement?: PopupPlacement;
  rounded?: boolean;
  children?: ReactNode;
  lock?: boolean;

  duration?: number;
  mountOnEnter?: boolean;
  transaction?: string;
  transactionDuration?: number;
  transitionAppear?: boolean;

  onClose?(opened: boolean): void;

  onTransitionEnter?: EnterHandler<HTMLElement>;
  onTransitionEntered?: EnterHandler<HTMLElement>;
  onTransitionExit?: ExitHandler<HTMLElement>;
  onTransitionExited?: ExitHandler<HTMLElement>;
}

export const Popup: FC<PopupProps> = (props) => {
  const {
    open,
    placement,
    duration,
    rounded,
    lock,
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

  return (
    <>
      <Backdrop
        open={state}
        duration={transactionDuration}
        lock={lock}
        closeable
        onClose={() => {
          props.onClose?.(false);
        }}
      />
      <Transition
        open={open}
        name={transaction || toTransactionName(placement)}
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
          className={cn(
            'fixed z-40 bg-white',
            rounded && 'rounded-lg',
            lock && 'overflow-hidden'
          )}
        >
          {children}
        </View>
      </Transition>
    </>
  );
};

export const PopupBackdrop = Backdrop;
