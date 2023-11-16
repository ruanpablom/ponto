import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

if (Notification.permission === 'default') {
  Notification.requestPermission();
}
