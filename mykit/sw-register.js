if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    function notifyUpdateReady(reg) {
      if (!reg || !reg.waiting) return;
      window.dispatchEvent(new CustomEvent('mykit:pwa-update-ready'));
    }

    navigator.serviceWorker
      .register('/mykit/sw.js', { scope: '/mykit/', updateViaCache: 'none' })
      .then(function (reg) {
        console.log('[SW] registered scope:', reg.scope);
        notifyUpdateReady(reg);

        reg.addEventListener('updatefound', function () {
          var worker = reg.installing;
          if (!worker) return;
          worker.addEventListener('statechange', function () {
            if (worker.state === 'installed' && navigator.serviceWorker.controller) {
              notifyUpdateReady(reg);
            }
          });
        });

        reg.update().catch(function () {});
      })
      .catch(function (err) { console.warn('[SW] registration failed:', err); });
  });
}
