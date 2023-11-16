if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js', { scope: '/' });

    console.info('navigator.serviceWorker.register()');
    console.info('RUAN PABLO MEDEIROS');
    if (Notification.permission === 'default') {
      Notification.requestPermission();
      console.info('Notification.requestPermission()');
    }
  });
}
