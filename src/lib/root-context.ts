import { createContext, useContext } from 'react';

const defaultRootValue = {
  name: 'taro'
};

export const RootContext = createContext(defaultRootValue);

export const useRootContext = () => {
  return useContext(RootContext);
};

export const RootProvider = RootContext.Provider;
