import throttle from 'lodash/throttle';
import { useMemo } from 'react';
import useLatest from './useLatest';
import useUnmount from './useUnmount';
import { ThrottleOptions } from './types';

type noop = (...args: any[]) => any;

function useThrottleFn<T extends noop>(fn: T, options?: ThrottleOptions) {
  const fnRef = useLatest(fn);

  const wait = options?.wait ?? 1000;

  const throttled = useMemo(
    () =>
      throttle(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        },
        wait,
        options
      ),
    []
  );

  useUnmount(() => {
    throttled.cancel();
  });

  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush
  };
}

export default useThrottleFn;
