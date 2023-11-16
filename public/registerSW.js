if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/ponto/service-worker.js', {
      scope: '/ponto/',
    });

    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  });
}
