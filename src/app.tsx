import { PropsWithChildren } from 'react';
import { useLaunch } from '@tarojs/taro';
import { RootProvider } from '@/lib/root-context';
import './app.css';

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.');
  });

  // children 是将要会渲染的页面
  return <RootProvider value={{ name: '123' }}>{children}</RootProvider>;
}

export default App;
