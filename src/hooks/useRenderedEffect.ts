import { DependencyList, EffectCallback, useEffect, useRef } from 'react';
import { nextTick } from '@tarojs/taro';
import { isFunction } from 'lodash';

export const useRenderedEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const destructorRef = useRef<() => void>();

  useEffect(() => {
    nextTick(() => {
      const destructor = effect?.();
      if (isFunction(destructor)) {
        destructorRef.current = destructor;
      }
    });

    return destructorRef.current;
  }, deps);
};
