//Service Worker sw.js / index.php
let loc = location;
const { pathname } = loc;
const path = pathname.replace("sw.js", "");

self.addEventListener("install", function (event) {
  console.log("[Service Worker] Instalando Service Worker (sw.js)...", event);
  event.waitUntil(
    caches.open("static").then(function (cache) {
      console.log('path: ' + path);
      cache.addAll([path, path + "index.html"]);
    })
  );
});

self.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activando Service Worker (sw.js)...", event);
});

self.addEventListener("fetch", event => {
  const { request } = event;
  const url = new URL(request.url);
  if (url.protocol !== "http:" && url.protocol !== "https:") return;
  event.respondWith(
    caches.match(request).then(async cached => {
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response.ok && request.method === "GET") {
          const cache = await caches.open("dynamic");
          cache.put(request, response.clone());
        }
        return response;
      } catch (err) {
        return new Response("Sin conexión", {
          status: 503,
          statusText: "Offline"
        });
      }
    })
  );
});
