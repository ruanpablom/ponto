import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';

import App from './App';
import './index.css';

const intervalMS = 1 * 60 * 1000;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateSW = registerSW({
  onRegistered(r) {
    r &&
      setInterval(() => {
        console.info('SW Registered: ', r);
        r.update();
      }, intervalMS);
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
