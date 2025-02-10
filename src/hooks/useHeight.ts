import { DependencyList, useState, useCallback, useRef } from 'react';
import { nextTick } from '@tarojs/taro';
import { useMount } from 'ahooks';
import { getRect } from '@/utils/dom/rect';
import { useRenderedEffect } from './useRenderedEffect';
import { useWindowResize } from './useWindowResize';

export const useHeight = (elementOrRef: any, deps?: DependencyList) => {
  const [height, _setHeight] = useState<number>(0);
  const heightRef = useRef<number>(0);

  const setHeight = useCallback(() => {
    getRect(elementOrRef)
      .then((rect) => rect?.height)
      .then((val) => {
        if (val !== heightRef.current) {
          heightRef.current = val;
          _setHeight(val);
        }
      });
  }, [height]);

  useRenderedEffect(() => {
    setHeight();
  }, deps);

  useMount(() => {
    nextTick(setHeight);
  });

  useWindowResize(setHeight);

  return height;
};
