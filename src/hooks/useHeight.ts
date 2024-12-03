import { DependencyList, useState, useCallback } from 'react';
import { nextTick } from '@tarojs/taro';
import { useMount } from 'ahooks';
import { getRect } from '@/utils/dom/rect';
import { useRenderedEffect } from './useRenderedEffect';
import { useWindowResize } from './useWindowResize';

export const useHeight = (elementOrRef: any, deps?: DependencyList) => {
  const [height, _setHeight] = useState<number>(0);

  const setHeight = useCallback(() => {
    getRect(elementOrRef)
      .then((rect) => rect?.height)
      .then(_setHeight);
  }, []);

  useRenderedEffect(() => {
    setHeight();
  }, deps);

  useMount(() => {
    nextTick(setHeight);
  });

  useWindowResize(setHeight);

  return height;
};
