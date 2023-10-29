/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import { Pomodoro } from './components/Pomodoro';

import './App.css';
import { Header } from './components/Header';
import { NavigationDrawer } from './components/NavigationDrawer';
import { ConfigProvider } from './contexts/config';

function App(): JSX.Element {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  return (
    <ConfigProvider>
      <div className="flex flex-col items-center w-full pl-4 pr-4">
        <NavigationDrawer
          isOpen={isOpenDrawer}
          onClose={() => setIsOpenDrawer(false)}
        />
        <Header openDrawer={() => setIsOpenDrawer(true)} />
        <Pomodoro />
      </div>
    </ConfigProvider>
  );
}

export default App;
