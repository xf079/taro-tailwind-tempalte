import { createContext } from '@/components/ui/context';
import { useState } from 'react';

const CONFIG_PROVIDER_NAME = 'ConfigProvider';

type ConfigProviderTypeValue = {
  index: number;
};

const defaultConfigValue: ConfigProviderTypeValue = {
  index: 100
};

const [Provider, useContext] = createContext<ConfigProviderTypeValue>(
  CONFIG_PROVIDER_NAME,
  defaultConfigValue
);

const ConfigProvider = ({ children }) => {
  const [state] = useState(defaultConfigValue);

  return <Provider {...state}>{children}</Provider>;
};

const useConfig = () => useContext(CONFIG_PROVIDER_NAME);

export { ConfigProvider, useConfig };
