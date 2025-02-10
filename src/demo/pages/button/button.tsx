import { View, Button as TaroButton } from '@tarojs/components';
import { Button } from '@/components/ui/button/button';
import { Block } from '@/demo/components/block';
import { Popup, PopupBackdrop, PopupContent } from '@/components/ui/popup';
import React from 'react';
import { Navbar, NavBarLeft, NavBarTitle } from '@/components/ui/navbar/navbar';

export default function ButtonPage() {
  const [open, setOpen] = React.useState(false);
  return (
    <View>
      <Navbar border>
        <NavBarLeft>返回</NavBarLeft>
        <NavBarTitle>Button 按钮</NavBarTitle>
      </Navbar>
      <Block title='按钮变体'>
        <Button>默认按钮</Button>
        <Button variant='destructive'>主要按钮</Button>
        <Button variant='outline'>outline</Button>
        <Button variant='secondary'>次级按钮</Button>
        <Button variant='ghost'>空心按钮</Button>
        <Button variant='link'>链接按钮</Button>
      </Block>
      <Block title='禁用按钮'>
        <Button disabled>默认按钮</Button>
        <Button variant='destructive' disabled>
          主要按钮
        </Button>
        <Button variant='outline' disabled>
          outline
        </Button>
        <Button variant='secondary' disabled>
          次级按钮
        </Button>
        <Button variant='ghost' disabled>
          空心按钮
        </Button>
        <Button variant='link' disabled>
          链接按钮
        </Button>
      </Block>
      <TaroButton>123</TaroButton>
      <Block title='按钮形状'>
        <Button onClick={() => setOpen(true)}>默认按钮</Button>
        <Button shape='circle'>默认按钮</Button>
      </Block>
      <Popup open={open} placement='bottom' closeable rounded onOpenChange={setOpen}>
        <PopupBackdrop />
        <PopupContent className='h-48'>
          <View>123</View>
        </PopupContent>
      </Popup>
    </View>
  );
}
