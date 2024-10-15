import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { Button } from '@/components/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Index() {
  const [open, setOpen] = useState(false);
  useLoad(() => {
    console.log('Page loaded.');
  });

  return (
    <View className='index'>
      <Text className='w-4 h5-a text-sm text-yellow-300'>Hello world!</Text>
      <View state-status='open' className='bg-red-600'>
        123
      </View>
      <View
        className={cn('fixed inset-0 bg-black/60',open ? 'animate-in fade-in-0':'animate-out fade-out-0')}
        onClick={() => {
          setOpen(false);
        }}
      />
      <View>123</View>
      <View>123</View>
      <View>123</View>
      <View>123</View>
      <View>123</View>
      <View>123</View>
      <View>123</View>
      <View>123</View>
      <View>123</View>
      <View>123</View>
      <Button block disabled />
      <View className='flex flex-row justify-start items-center gap-2 flex-wrap p-2'>
        <Button
          block
          onClick={() => {
            setOpen(!open);
          }}
        >
          Block default
        </Button>
        <Button variant='secondary' block>
          Block secondary
        </Button>
        <Button variant='outline' block>
          Block outline
        </Button>
        <Button variant='link' block>
          Block link
        </Button>
        <Button variant='ghost' block>
          Block ghost
        </Button>
        <Button variant='destructive' block>
          Block destructive
        </Button>
        <Button />
        <Button variant='secondary' />
        <Button variant='outline' />
        <Button variant='link' />
        <Button variant='destructive' />
      </View>
    </View>
  );
}
