import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { Button } from '@/components/ui/button/button';
import { useState } from 'react';
import { Popup, PopupBackdrop, PopupContent } from '@/components/ui/popup/popup';
import { Dialog } from '@/components/ui/dialog/dialog';
import { useConfig } from '@/components/ui/config-provider/config-provider';
import { SafeArea } from '@/components/ui/safe-aera/safe-area';
import { FixedView } from '@/components/ui/fixed-view/fixed-view';

export default function Index() {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const name = useConfig();

  console.log(name);

  useLoad(() => {
    console.log('Page loaded.');
  });

  return (
    <View className='index'>
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
        placement='center'
        closeable
        rounded
        onOpenChange={(_open) => {
          setOpen(_open);
        }}
      >
        <PopupBackdrop />
        <PopupContent className='w-3/4 h-60'>
          <View className='bg-foreground w-full h-20 bg-pink-50 z-50'>
            <Button variant='secondary' block>
              Block secondary
            </Button>
          </View>
        </PopupContent>
      </Popup>
      <Dialog open={dialogOpen} title='提示' onOpenChange={setDialogOpen}>
        <View className='px-4 py-6 text-sm'>代码是写出来给人看的，附带能在机器上运行</View>
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
      <SafeArea position='bottom'>
        <Text className='w-4 h5-a text-sm text-yellow-300 bg-primary'>Hello world!</Text>
        <View state-status='open' className='bg-red-600'>
          123
        </View>
      </SafeArea>
      <FixedView position='top' safeArea='top' nativeSafeTop placeholder className='bg-black'>
        <View className='w-full h-50 bg-red-600'>123</View>
      </FixedView>
    </View>
  );
}
