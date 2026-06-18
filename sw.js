const CACHE = 'homieostasis-v20';

const CORE = [
  '/',
  '/login.css',
  '/firebase-config.js',
  '/auth.js',
  '/map.html',
  '/hub.css',
  '/prizes.html',
  '/home.html',
  '/homies.html',
  '/profile.html',
  '/styles.css',
  '/manifest.json',
  '/treehouse.html',
  '/brain-bath.html',
  '/imagination-box.html',
  '/sound-bowls.html',
  '/store.html',
  '/swing.html',
  '/garden.html',
  '/baba-bloom.html',
  '/slide.html',
  '/holy-heart.html',
  '/heart-wheel.html',
  '/sacred-sandbox.html',
  '/mystic-mat.html',
  '/spotlight.html',
  '/bulletin.html',
  '/slow-down.html',
  '/images/playground-entrance.png',
  '/images/homieostasis-logo.png',
  '/images/energy_playground-bg.svg',
  '/images/homieostasis-intro.svg',
  '/images/lets-play.svg',
  '/images/icon-192.png',
  '/images/icon-512.png',
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
