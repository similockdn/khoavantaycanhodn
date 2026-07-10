const CACHE_NAME = 'kvc-static-v2';
const RUNTIME = 'kvc-runtime';

// Assets to precache (update if you change file names)
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/main.js',
  '/images/hero-1200.svg',
  '/images/hero-800.svg',
  '/images/og-image.svg',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Do not interfere with API requests — always pass through to network
  if (url.pathname.startsWith('/api/') || url.hostname !== location.hostname) {
    return; // fallback to network
  }

  // Navigation requests: network-first then fallback to cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).then(response => {
        // update the cache in the background
        caches.open(RUNTIME).then(cache => cache.put(event.request, response.clone()));
        return response;
      }).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // For other requests (static assets): cache-first strategy
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // put a copy in cache for later
        return caches.open(RUNTIME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
