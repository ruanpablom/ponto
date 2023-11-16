import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

precacheAndRoute([...self.__WB_MANIFEST, { url: '/', revision: null }]);

registerRoute(
  '/',
  new NetworkFirst({
    cacheName: 'root-cache',
  }),
);

if (Notification.permission === 'default') {
  Notification.requestPermission();
}
