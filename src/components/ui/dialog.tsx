import React from 'react';
import { useControllableValue } from 'ahooks';
import { View } from '@tarojs/components';
import { cn } from '@/lib/utils';
import { Popup } from '@/components/ui/popup';

interface DialogProps {
  open: boolean;
  defaultOpen?: boolean;
  className?: string;
  title?: React.ReactNode;
  headerClass?: string;
  customHeader?: React.ReactNode;
  onOpenChange(open: boolean): void;
  children?: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = (props) => {
  const { open, defaultOpen, className, title, headerClass, customHeader, children, ...restProps } =
    props;
  const [state, onChangeState] = useControllableValue<boolean>(props, {
    defaultValue: false,
    valuePropName: 'open',
    defaultValuePropName: 'defaultOpen',
    trigger: 'onOpenChange'
  });

  const renderHeader = () => {
    if (customHeader) {
      return customHeader;
    }

    return (
      <View
        className={cn(
          'flex justify-center items-center pt-5 text-[32px] font-extrabold',
          headerClass
        )}
      >
        {title}
      </View>
    );
  };

  return (
    <Popup
      placement='center'
      open={state}
      className={cn('w-72 rounded-lg', className)}
      onClose={() => {
        onChangeState(false);
      }}
      {...restProps}
    >
      {renderHeader()}
      {children}
    </Popup>
  );
};
