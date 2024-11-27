import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { Btn } from '@/components/ui/button';
import { useState } from 'react';
import { Backdrop } from '@/components/ui/backdrop';
import { useRootContext } from '@/lib/root-context';
import { createParent } from '@/lib/root-parent';

export default function Index() {
  const [open, setOpen] = useState(false);

  const name = useRootContext();

  console.log(name);

  useLoad(() => {
    console.log('Page loaded.');
    createParent()
  });

  return (
    <View className='index'>
      <Text className='w-4 h5-a text-sm text-yellow-300 bg-primary'>
        Hello world!
      </Text>
      <View state-status='open' className='bg-red-600'>
        123
      </View>
      <View>123</View>
      <View>123</View>
      <View>123</View>
      <View className=''>123</View>
      <View>123</View>
      <View>123</View>
      <View className='transition-all duration-base translate-y-full'>123</View>
      <View className='transition-all duration-base !translate-y-0'>123</View>
      <Backdrop open={open} onClose={() => setOpen(false)} closeable>
        <View className='bg-foreground fixed top-0 left-0 right-0 h-20 bg-pink-50 z-50'>
          <Btn variant='secondary' block>
            Block secondary
          </Btn>
        </View>
      </Backdrop>
      <View className='flex flex-row justify-start items-center gap-2 flex-wrap p-2'>
        <Btn
          block
          onClick={() => {
            setOpen(!open);
          }}
        >
          Block default
        </Btn>
        <Btn variant='secondary' block>
          Block secondary
        </Btn>
        <Btn variant='outline' block>
          Block outline
        </Btn>
        <Btn variant='link' block>
          Block link
        </Btn>
        <Btn variant='ghost' block>
          Block ghost
        </Btn>
        <Btn variant='destructive' block>
          Block destructive
        </Btn>
        <Btn />
        <Btn variant='secondary' children='Secondary' />
        <Btn variant='outline' />
        <Btn variant='link' />
        <Btn variant='destructive' />
      </View>
    </View>
  );
}
