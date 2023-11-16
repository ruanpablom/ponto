import { precacheAndRoute, addRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);
addRoute('ponto');

if (Notification.permission === 'default') {
  Notification.requestPermission();
}
