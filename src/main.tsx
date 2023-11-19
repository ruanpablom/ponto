import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';

import App from './App';

import './index.css';

// add this to prompt for a refresh
const updateSW = registerSW({
  onNeedRefresh() {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  },
});

if (
  'Notification' in window &&
  (Notification.permission === 'default' ||
    Notification.permission === 'denied')
) {
  Notification.requestPermission();
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
