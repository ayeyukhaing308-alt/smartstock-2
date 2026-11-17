/* SmartStock service worker — offline support.
 * App files are cached on install; pages are served cache-first (network update in the background);
 * Google Fonts are cached as they are used. Bump VERSION when you deploy a new index.html. */
const VERSION = 'v2-1';
const CACHE = 'smartstock-' + VERSION;
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './maskable-512.png', './icon.svg'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('smartstock-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const fonts = /(^|\.)fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (url.origin !== location.origin && !fonts) return;
  if (req.mode === 'navigate') {   // always open the app shell, online or not
    e.respondWith(fetch(req).then((r) => { const c = r.clone(); caches.open(CACHE).then((x) => x.put('./index.html', c)); return r; }).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then((hit) => {
    const net = fetch(req).then((r) => { if (r && (r.ok || r.type === 'opaque')) { const c = r.clone(); caches.open(CACHE).then((x) => x.put(req, c)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
