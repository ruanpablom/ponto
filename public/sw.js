import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute([...self.__WB_MANIFEST]);

// registerRoute('/ponto', new NetworkFirst());

if (
  Notification.permission === 'default' ||
  Notification.permission === 'denied'
) {
  Notification.requestPermission();
}
