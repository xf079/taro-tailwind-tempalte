import React, { CSSProperties } from 'react';
import { View } from '@tarojs/components';
import { useControllableValue } from 'ahooks';
import { cn } from '@/lib/utils';
import createContext from '../context';
import { Backdrop } from '../backdrop';
import { Transition } from '@/components/ui/transition';

type DialogContextValue = {
  open: boolean;
  duration?: number;
  rounded?: boolean;
  lock?: boolean;
  closeable?: boolean;
  onOpenChange(open: boolean): void;
};

const DIALOG_NAME = 'dialog';

const [Provider, useContext] = createContext<DialogContextValue>(DIALOG_NAME);

interface DialogProps {
  open: boolean;
  duration?: number;
  rounded?: boolean;
  lock?: boolean;
  closeable?: boolean;
  onOpenChange(open: boolean): void;
  children?: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = (props) => {
  const { closeable, children } = props;
  const [state, onChangeState] = useControllableValue<boolean>(props, {
    defaultValue: false,
    valuePropName: 'open',
    trigger: 'onOpenChange'
  });

  return (
    <Provider open={state} closeable={closeable} onOpenChange={onChangeState}>
      {children}
    </Provider>
  );
};

/**
 * ----------------------------------------------------
 * DialogBackdrop
 * ----------------------------------------------------
 */

const DIALOG_BACKDROP_NAME = 'DialogBackdrop';

interface DialogBackdropProps {
  className?: string;
  style?: CSSProperties;
}

export const DialogBackdrop: React.FC<DialogBackdropProps> = (props) => {
  const { open, closeable, onOpenChange } = useContext(DIALOG_BACKDROP_NAME);
  return (
    <Backdrop
      open={open}
      closeable={closeable}
      onClose={() => {
        if (closeable) {
          onOpenChange?.(false);
        }
      }}
      {...props}
    />
  );
};

/**
 * ----------------------------------------------------
 * DialogContent
 * ----------------------------------------------------
 */
const DIALOG_CONTENT_NAME = 'DialogContent';

interface DialogContentProps {
  className?: string;
  style?: CSSProperties;
}

export const DialogContent: React.FC<DialogContentProps> = (props) => {
  const { open, closeable, onOpenChange } = useContext(DIALOG_CONTENT_NAME);
  return (
    <Transition open={open} name='fade-scale' duration={duration}>
      <View
        style={{ ...{ zIndex: index + 1 }, ...style }}
        className={cn(
          popupContentVariants({
            placement,
            placementRounded: rounded ? placement : false
          }),
          className
        )}
      >
        {children}
      </View>
    </Transition>
  );
};
