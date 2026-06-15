const CACHE = 'homieostasis-v7';

const CORE = [
  '/',
  '/index.html',
  '/entry.css',
  '/playground.html',
  '/password.html',
  '/styles.css',
  '/manifest.json',
  '/images/playground-entrance.png',
  '/images/homieostasis-logo.png',
  '/images/energy_playground-bg.svg',
  '/images/homieostasis-intro.svg',
  '/images/lets-play.svg',
  '/images/modal-notebook.svg',
  '/images/modal-x.svg',
  '/images/icon-192.png',
  '/images/icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(CORE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      const fromNetwork = fetch(event.request).then(response => {
        if (response.ok) {
          caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
        }
        return response;
      });
      return cached || fromNetwork;
    })
  );
});
