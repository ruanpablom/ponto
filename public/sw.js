import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute([...self.__WB_MANIFEST]);

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('https://apps.rpmdev.com.br/ponto/'));
});
