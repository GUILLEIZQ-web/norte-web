/* LUXORA offline shell. Bump CACHE_VERSION whenever core assets change. */
const CACHE_VERSION = 'luxora-v3';
const APP_SHELL = ['./', './index.html', './style.css', './script.js', './manifest.webmanifest', './assets/luxora-product.svg'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const sameOrigin = new URL(event.request.url).origin === self.location.origin;
  const cacheResponse = response => {
    if (sameOrigin && response && response.ok) caches.open(CACHE_VERSION).then(cache => cache.put(event.request, response.clone()));
    return response;
  };
  const network = () => fetch(event.request).then(cacheResponse);

  // Las fotos son lo más pesado de la tienda. Después de la primera visita,
  // se muestran desde caché de inmediato mientras el resto sigue actualizándose.
  if (sameOrigin && event.request.destination === 'image') {
    event.respondWith(caches.match(event.request).then(cached => cached || network()));
    return;
  }

  event.respondWith(network().catch(() => caches.match(event.request).then(cached => cached || caches.match('./index.html'))));
});
