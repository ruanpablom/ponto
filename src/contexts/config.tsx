/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState } from 'react';

type ConfigProviderProps = {
  children: JSX.Element;
};

type ConfigContextData = {
  alertTime: number;
  setAlertTime: React.Dispatch<React.SetStateAction<number>>;
  alertVolume: number;
  setAlertVolume: React.Dispatch<React.SetStateAction<number>>;
};

const ConfigContext = createContext<ConfigContextData>({} as ConfigContextData);

function ConfigProvider({ children }: ConfigProviderProps): JSX.Element {
  const [alertTime, setAlertTime] = useState<ConfigContextData['alertTime']>(
    Number(localStorage.getItem('alertTime')),
  );
  const [alertVolume, setAlertVolume] = useState<
    ConfigContextData['alertVolume']
  >(Number(localStorage.getItem('alertVolume')));

  return (
    <ConfigContext.Provider
      value={{ alertTime, setAlertTime, alertVolume, setAlertVolume }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

const useConfig = (): ConfigContextData => useContext(ConfigContext);

export { ConfigProvider, useConfig };
