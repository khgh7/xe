// Flip offline support: keeps the app itself on the phone so it opens instantly, even with no signal.
// Rates and the connection check always go to the network (the app keeps its own saved rates).
const CACHE = "flip-v6";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";

  // never cache the connection check
  if (sameOrigin && url.pathname.endsWith("/ping.txt")) return;
  if (!sameOrigin && !isFont) return;

  // serve from the phone straight away, refresh the copy in the background
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const key = req.mode === "navigate" ? "index.html" : req;
      const cached = await cache.match(key, { ignoreSearch: req.mode === "navigate" });
      const network = fetch(req)
        .then(res => {
          if (res && (res.ok || res.type === "opaque")) cache.put(key, res.clone());
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
