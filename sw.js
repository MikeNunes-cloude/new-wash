/* New Wash Express — Service Worker (push notifications) */
const APP_SCOPE = self.registration.scope; // .../new-wash/

self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('push', event => {
  let data = { title: 'New Wash Express', body: '' };
  try { if (event.data) data = event.data.json(); } catch (_) {
    try { data.body = event.data.text(); } catch (__) {}
  }
  const title = data.title || 'New Wash Express';
  const options = {
    body: data.body || '',
    icon: 'assets/icon-192.png',
    badge: 'assets/icon-192.png',
    tag: data.tag || ('nw-' + Date.now()),
    data: { url: APP_SCOPE },
    vibrate: [80, 40, 80],
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || APP_SCOPE;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});
