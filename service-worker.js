const CACHE_NAME = "avvio-sist-v3";

const ARCHIVOS = [
  "./",
  "./index.html",
  "./estilo.css",
  "./desarrollo.html",
  "./desarrollo.css",
  "./manifest.json",
  "./logo.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    self.skipWaiting();
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ARCHIVOS);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(nombres =>
      Promise.all(
        nombres
          .filter(n => n !== CACHE_NAME)
          .map(n => caches.delete(n))
      )
    )
  );
  self.clients.claim();
});
