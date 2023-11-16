import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);
precacheAndRoute('/ponto');

if (Notification.permission === 'default') {
  Notification.requestPermission();
}
