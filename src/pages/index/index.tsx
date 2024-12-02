import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRootContext } from '@/lib/root-context';
import { createParent } from '@/lib/root-parent';
import { Popup } from '@/components/ui/popup';

import {
  Dialog,
  DialogAction,
  DialogContent,
  DialogOverlay,
  DialogTitle
} from '@/components/ui/dialog';

export default function Index() {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const name = useRootContext();

  console.log(name);

  useLoad(() => {
    console.log('Page loaded.');
    createParent();
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
      {/*<Backdrop open={open} onClose={() => setOpen(false)} closeable>
        <View className='bg-foreground fixed top-0 left-0 right-0 h-20 bg-pink-50 z-50'>
          <Button variant='secondary' block>
            Block secondary
          </Button>
        </View>
      </Backdrop>*/}
      <Popup
        open={open}
        placement='bottom'
        closeable
        rounded
        onClose={() => {
          setOpen(false);
        }}
      >
        <View className='bg-foreground w-full h-20 bg-pink-50 z-50'>
          <Button variant='secondary' block>
            Block secondary
          </Button>
        </View>
      </Popup>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle children='提示' />
          <View className='px-4 py-6 text-sm'>
            代码是写出来给人看的，附带能在机器上运行
          </View>
          <DialogAction />
        </DialogContent>
      </Dialog>
      <View className='flex flex-row justify-start items-center gap-2 flex-wrap p-2'>
        <Button
          block
          onClick={() => {
            setDialogOpen(!open);
          }}
        >
          Dialog Block default
        </Button>
      </View>
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
