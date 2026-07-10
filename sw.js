const CACHE_NAME = 'kvc-static-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/main.js',
  '/images/hero-1200.svg',
  '/images/hero-800.svg',
  '/images/og-image.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // navigation requests: network-first
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('/index.html')));
    return;
  }
  // for other requests: cache-first
  event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request).then(r => {
    return caches.open(CACHE_NAME).then(cache => { cache.put(event.request, r.clone()); return r; });
  })).catch(() => caches.match('/index.html')));
});
