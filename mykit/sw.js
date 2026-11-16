const BUILD = 'b3e2635340c6';
const CACHE_NAME = 'MyKit-shell-' + BUILD;
const RUNTIME_CACHE = 'MyKit-static-' + BUILD;
const BASE = self.location.pathname.replace(/\/sw\.js$/, '');
const APP_SHELL = [
  "/mykit/",
  "/mykit/index.html",
  "/mykit/login/",
  "/mykit/app/",
  "/mykit/manifest.webmanifest",
  "/mykit/favicon.ico",
  "/mykit/favicon.png",
  "/mykit/icon-192.png",
  "/mykit/icon-512.png",
  "/mykit/AppEntry-605253f028980facf4aecc88356d13c8.js"
];
const STATIC_EXTENSIONS = /\.(js|css|woff2?|ttf|otf|eot|png|jpg|jpeg|gif|svg|ico|webp)(\?.*)?$/i;

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // A release is only installable if the complete critical shell is cached.
    // Do not swallow failures: the previously active worker remains available.
    await cache.addAll(APP_SHELL);
  })());
});

// New releases wait by default so a background update cannot replace the JS
// runtime while the user is editing. The UI explicitly sends SKIP_WAITING when
// the user chooses to update.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const valid = new Set([CACHE_NAME, RUNTIME_CACHE]);
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith('MyKit-') && !valid.has(key)).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

async function cachedShell() {
  const cache = await caches.open(CACHE_NAME);
  return (await cache.match(BASE + '/index.html')) || (await cache.match(BASE + '/'));
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (request.url.startsWith('blob:') || request.url.startsWith('data:')) return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isNavigation = request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html');

  if (isNavigation) {
    // Never cache navigation requests themselves. Auth callbacks and magic links
    // can carry one-time credentials in the query string; storing request URLs in
    // Cache Storage would leave those secrets recoverable from the browser profile.
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) return response;
      } catch (_) {}

      // Offline navigation always falls back to the immutable application shell.
      // User data lives in the app's local data layer, not in HTML response caches.
      const shell = await cachedShell();
      return shell || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    })());
    return;
  }

  if (STATIC_EXTENSIONS.test(url.pathname)) {
    event.respondWith((async () => {
      const shellCache = await caches.open(CACHE_NAME);
      const runtimeCache = await caches.open(RUNTIME_CACHE);
      const cached = (await shellCache.match(request)) || (await runtimeCache.match(request));
      if (cached) {
        event.waitUntil(fetch(request).then((response) => {
          if (response.ok && response.type !== 'opaque') return runtimeCache.put(request, response.clone());
        }).catch(() => undefined));
        return cached;
      }
      try {
        const response = await fetch(request);
        if (response.ok && response.type !== 'opaque') runtimeCache.put(request, response.clone()).catch(() => undefined);
        return response;
      } catch (_) {
        return new Response('', { status: 503 });
      }
    })());
    return;
  }

  // Dynamic/API/authenticated GETs are deliberately network-only. Caching them
  // can persist private JSON, auth state, signed URLs or one-time tokens after
  // logout and can leak one user's response into a later local session.
  event.respondWith(fetch(request).catch(() => new Response('Offline', {
    status: 503,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })));
});
