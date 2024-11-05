import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
// import { Backdrop } from '@/components/ui/backdrop';
import { Transition } from '@/components/ui/transition';

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
      <View>123</View>
      <View>123</View>
      <View>123</View>
      <View>123</View>
      <View>123</View>
      <View>123</View>
      <View>123</View>
      <View className='transition-all duration-base translate-y-full'>123</View>
      <View className='transition-all duration-base !translate-y-0'>123</View>
      <Transition open={open} timeout={500} name='slide-down'>
        <View className='bg-foreground fixed top-0 left-0 right-0 h-20 bg-pink-50 z-50'>
          <Button variant='secondary' block>
            Block secondary
          </Button>
        </View>
      </Transition>
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
        <Button variant='secondary' children='Secondary' />
        <Button variant='outline' />
        <Button variant='link' />
        <Button variant='destructive' />
      </View>
    </View>
  );
}
