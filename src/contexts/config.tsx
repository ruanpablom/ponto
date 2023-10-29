/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState } from 'react';

type ConfigProviderProps = {
  children: JSX.Element;
};

type ConfigContextData = {
  alertTime: number;
  setAlertTime: React.Dispatch<React.SetStateAction<number>>;
};

const ConfigContext = createContext<ConfigContextData>({} as ConfigContextData);

function ConfigProvider({ children }: ConfigProviderProps): JSX.Element {
  const [alertTime, setAlertTime] = useState<ConfigContextData['alertTime']>(0);

  return (
    <ConfigContext.Provider value={{ alertTime, setAlertTime }}>
      {children}
    </ConfigContext.Provider>
  );
}

const useConfig = (): ConfigContextData => useContext(ConfigContext);

export { ConfigProvider, useConfig };
