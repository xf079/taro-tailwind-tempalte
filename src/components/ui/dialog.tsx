import { Backdrop } from '@/components/ui/backdrop';
import { createContextScope, Scope } from '@/components/ui/context';
import React from 'react';
import { useControllableValue } from 'ahooks';
import { View, ViewProps } from '@tarojs/components';
import { Transition } from '@/components/ui/transition';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const DIALOG_NAME = 'Dialog';

type ScopedProps<P> = P & { __scopeDialog?: Scope };
const [createDialogContext, createDialogScope] =
  createContextScope(DIALOG_NAME);

type DialogContextValue = {
  open: boolean;
  defaultOpen?: boolean;
  children?: React.ReactNode;
  onOpenChange(open: boolean): void;
};

const [DialogProvider, useDialogContext] =
  createDialogContext<DialogContextValue>(DIALOG_NAME);

interface DialogProps {
  open: boolean;
  defaultOpen?: boolean;
  children?: React.ReactNode;
  onOpenChange(open: boolean): void;
}

const Dialog: React.FC<DialogProps> = (props: ScopedProps<DialogProps>) => {
  const { __scopeDialog, children } = props;

  const [open, onChangeOpen] = useControllableValue<boolean>(props, {
    defaultValue: false,
    valuePropName: 'open',
    defaultValuePropName: 'defaultOpen',
    trigger: 'onOpenChange'
  });

  return (
    <DialogProvider
      scope={__scopeDialog}
      open={open}
      onOpenChange={onChangeOpen}
    >
      {children}
    </DialogProvider>
  );
};
Dialog.displayName = DIALOG_NAME;

/**
 * ---------------------------------------
 * DialogOverlay
 * ---------------------------------------
 */

const DIALOG_OVERLAY_NAME = 'DialogOverlay';

interface DialogOverlayProps extends ViewProps {}

const DialogOverlay: React.FC<DialogOverlayProps> = (
  props: ScopedProps<DialogOverlayProps>
) => {
  const { open } = useDialogContext(DIALOG_OVERLAY_NAME, props.__scopeDialog);

  return <Backdrop open={open} />;
};

DialogOverlay.displayName = DIALOG_OVERLAY_NAME;

/**
 * ---------------------------------------
 * DialogContent
 * ---------------------------------------
 */

const DIALOG_CONTENT_NAME = 'DialogContent';
interface DialogContentProps extends ViewProps {}
const DialogContent: React.FC<DialogContentProps> = (
  props: ScopedProps<DialogContentProps>
) => {
  const { children, className, ...restProps } = props;
  const { open } = useDialogContext(DIALOG_OVERLAY_NAME, props.__scopeDialog);

  return (
    <Transition open={open} name='fade'>
      <View
        className={cn(
          'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-background rounded-lg overflow-hidden z-[100]',
          className
        )}
        {...restProps}
      >
        {children}
      </View>
    </Transition>
  );
};

DialogContent.displayName = DIALOG_CONTENT_NAME;

/**
 * ---------------------------------------
 * DialogAction
 * ---------------------------------------
 */

const DIALOG_ACTION_NAME = 'DialogAction';
interface DialogActionProps extends ViewProps {
  /**
   * @description 是否展示取消按钮
   * @default true
   */
  cancel?: boolean;
  /**
   * @description 是否展示确认按钮
   * @default true
   */
  confirm?: boolean;

  onCancel?(): void;
  onConfirm?(): Promise<boolean> | void;
}
const DialogAction: React.FC<DialogActionProps> = (
  props: ScopedProps<DialogActionProps>
) => {
  const {
    children,
    className,
    cancel,
    confirm,
    onCancel,
    onConfirm,
    ...restProps
  } = props;

  const { onOpenChange } = useDialogContext(
    DIALOG_ACTION_NAME,
    props.__scopeDialog
  );

  const onConfirmHandle = () => {
    const result = onConfirm?.();
    if (result instanceof Promise) {
      result.then((res) => {
        if (res) {
          onOpenChange(false);
        }
      });
    } else {
      onOpenChange(false);
    }
  };

  return (
    <View
      className={cn('flex justify-between items-center', className)}
      {...restProps}
    >
      {cancel ? (
        <Button
          block
          variant='ghost'
          className='rounded-none border-0 border-t border-solid border-t-border'
          onClick={() => onCancel?.()}
        >
          取消
        </Button>
      ) : null}
      {confirm ? (
        <Button
          block
          variant='default'
          className='rounded-none'
          onClick={onConfirmHandle}
        >
          确认
        </Button>
      ) : null}
    </View>
  );
};

DialogAction.displayName = DIALOG_ACTION_NAME;

/**
 * ---------------------------------------
 * DialogTitle
 * ---------------------------------------
 */

const DIALOG_TITLE_NAME = 'DialogTitle';

interface DialogTitleProps extends ViewProps {}

const DialogTitle: React.FC<DialogTitleProps> = (
  props: ScopedProps<DialogTitleProps>
) => {
  const { children, className, ...restProps } = props;

  return (
    <View
      className={cn(
        'flex justify-center items-center pt-5 text-[32px] font-extrabold',
        className
      )}
      {...restProps}
    >
      {children}
    </View>
  );
};

DialogTitle.displayName = DIALOG_TITLE_NAME;

export {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogAction,
  DialogTitle,
  createDialogScope
};
