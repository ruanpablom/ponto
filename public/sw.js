import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

precacheAndRoute([...self.__WB_MANIFEST, { url: '/ponto', revision: null }]);

registerRoute('/ponto', new NetworkFirst());

if (Notification.permission === 'default') {
  Notification.requestPermission();
}
