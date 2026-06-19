/* ============================================================
   ORYXEN LABS — Service Worker v1.1
   Strategy: Cache-first for static assets, network-first for HTML
   skipWaiting + clients.claim() intentional for a static site —
   no user sessions to disrupt, always want latest assets.
   ============================================================ */

const CACHE_NAME = 'oryxen-v3';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/404.html',
  '/pitch.html',
  '/privacy.html',
  '/css/styles.css',
  '/css/perf.css',
  '/js/render.js',
  '/js/script.js',
  '/manifest.json',
  '/favicon.ico',
  '/icon.svg',
  '/data/projects.json',
  '/data/stack.json',
];

/* ── Install: precache static shell (resilient — one miss won't abort install) ── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        PRECACHE_URLS.map((url) =>
          cache.add(url).catch((err) => console.warn('[SW] Precache failed:', url, err))
        )
      )
    )
  );
  self.skipWaiting();
});

/* ── Activate: purge old caches ── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* ── Fetch: network-first for HTML, cache-first for static assets ── */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin !== location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request).then((res) => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(request, clone));
        }
        return res;
      });
      return cached || networkFetch;
    })
  );
});
