import { getCurrentPages } from '@tarojs/taro';
import { render } from '@tarojs/react';
import { View } from '@tarojs/components';
import type { TaroElement } from '@tarojs/runtime';

export const createParent = () => {
  const wrapperView = document.createElement('view');
  const currentPages = getCurrentPages();
  const currentPage = currentPages[currentPages.length - 1];
  const path = currentPage.$taroPath;
  console.log(path);
  if (!path) return;
  const pageElement = document.getElementById(path);
  // console.log(pageElement);
  render(<View>123</View>, wrapperView as unknown as TaroElement, () => {
    console.log('12221');
  });
  pageElement?.appendChild(wrapperView as unknown as Element);
};
