import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

precacheAndRoute([...self.__WB_MANIFEST]);

// registerRoute('/ponto', new NetworkFirst());

if (
  Notification.permission === 'default' ||
  Notification.permission === 'denied'
) {
  Notification.requestPermission();
}
