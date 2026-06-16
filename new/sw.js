const CACHE = 'homieostasis-v12';

const CORE = [
  '/new/',
  '/new/index.html',
  '/new/landing.css',
  '/new/enter.html',
  '/new/entry.css',
  '/new/playground.html',
  '/new/password.html',
  '/new/hub.css',
  '/new/prize-center.html',
  '/new/home.html',
  '/new/homies.html',
  '/new/profile.html',
  '/styles.css',
  '/new/manifest.json',
  '/images/playground-entrance.png',
  '/images/homieostasis-logo.png',
  '/images/energy_playground-bg.svg',
  '/images/homieostasis-intro.svg',
  '/images/lets-play.svg',
  '/images/modal-notebook.svg',
  '/images/modal-x.svg',
  '/images/icon-192.png',
  '/images/icon-512.png',
  '/images/funemployed-banner.png',
  '/images/homieostasis-banner-app-email.png',
  '/images/holy-heart.svg',
  '/images/spotlight.svg',
  '/images/baba-bloom.svg',
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
