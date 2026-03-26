// DeutschMeister Service Worker
const CACHE = "deutschmeister-v3";
const ASSETS = [
  "./index.html",
  "./style.css",
  "./app.js",
  "./ai.js",
  "./voice.js",
  "./lessons.js",
  "./manifest.json"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  // Cache-first for app assets, network-first for API calls
  if (e.request.url.includes("groq.com") || e.request.url.includes("googleapis.com")) {
    e.respondWith(fetch(e.request));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
