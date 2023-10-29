/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import { Pomodoro } from './components/Pomodoro';

import './App.css';
import { Header } from './components/Header';
import { NavigationDrawer } from './components/NavigationDrawer';
import { ConfigProvider } from './contexts/config';
import { TodosProvider } from './contexts/todos';

function App(): JSX.Element {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  return (
    <ConfigProvider>
      <TodosProvider>
        <div className="flex flex-col items-center w-full pl-4 pr-4">
          <NavigationDrawer
            isOpen={isOpenDrawer}
            onClose={() => setIsOpenDrawer(false)}
          />
          <Header openDrawer={() => setIsOpenDrawer(true)} />
          <Pomodoro />
        </div>
      </TodosProvider>
    </ConfigProvider>
  );
}

export default App;
