if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js', { scope: '/' });

    console.info('RUAN PABLO');
    if (Notification.permission === 'default') {
      Notification.requestPermission();
      console.info('Notification.requestPermission()');
    }
  });
}
