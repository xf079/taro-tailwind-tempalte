import { createContext, useContext, useState } from 'react';

type ConfigProviderTypeValue = {
  index: number;
};

const defaultConfigValue: ConfigProviderTypeValue = {
  index: 100
};

const ConfigContext = createContext<ConfigProviderTypeValue>(defaultConfigValue);

const ConfigProvider = ({ children }) => {
  const [state] = useState(defaultConfigValue);

  return <ConfigContext.Provider value={state}>{children}</ConfigContext.Provider>;
};

const useConfig = () => {
  return useContext(ConfigContext);
};

export { ConfigProvider, useConfig };
