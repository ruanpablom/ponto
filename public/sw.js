import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

registerRoute(
  '/ponto',
  new NetworkFirst({
    cacheName: 'root-cache',
  }),
);

precacheAndRoute(self.__WB_MANIFEST);

if (Notification.permission === 'default') {
  Notification.requestPermission();
}
