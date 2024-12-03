import { PropsWithChildren } from 'react';
import { useLaunch } from '@tarojs/taro';
import { ConfigProvider } from '@/components/ui/config-provider';
import './app.css';

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.');
  });

  // children 是将要会渲染的页面
  return <ConfigProvider>{children}</ConfigProvider>;
}

export default App;
