import { Text, View } from '@tarojs/components';
import { FC, PropsWithChildren } from 'react';

export interface BlockProps extends PropsWithChildren {
  title?: string;
}

export const Block: FC<BlockProps> = ({ title, children }) => {
  return (
    <View className='flex flex-col gap-2 px-2 mt-4'>
      <Text className='text-xs font-bold text-foreground/50'>{title}</Text>
      <View className='flex flex-row justify-start items-center flex-wrap gap-2'>{children}</View>
    </View>
  );
};
