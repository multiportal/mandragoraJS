//Service Worker sw.js
const VERSION = '1.1.5';
const CACHE_NAME = `MandragoraJs-${VERSION}`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
];

// ─────────────────────────────────────────────
// INSTALL
// ─────────────────────────────────────────────

self.addEventListener('install', (event) => {
  console.log(`[SW][Service Worker] Instalando ${VERSION} Service Worker (sw.js)...`, event);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
  );
  // NO usar skipWaiting aquí
});

// ─────────────────────────────────────────────
// ACTIVATE
// ─────────────────────────────────────────────

self.addEventListener('activate', (event) => {
  console.log(`[SW][Service Worker] Activando ${VERSION} Service Worker (sw.js)...`, event);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
      .then(() => self.clients.claim())
  );
});

// ─────────────────────────────────────────────
// MESSAGE
// ─────────────────────────────────────────────

self.addEventListener('message', (event) => {
  //console.log('[SW] Mensaje recibido:', event.data);
  if (event.data?.type === 'GET_SW_VERSION') {
    event.source?.postMessage({
      type: 'SW_VERSION',
      version: VERSION
    });
    return;
  }
  // El usuario aceptó actualizar
  if (event.data?.type === 'SKIP_WAITING') {
    console.log(`[SW] Activando actualización ${VERSION}...`);
    self.skipWaiting();
  }
});

// ─────────────────────────────────────────────
// FETCH
// ─────────────────────────────────────────────

self.addEventListener('fetch', (event) => {
  const { request } = event;
  // Solo GET
  if (request.method !== 'GET') {
    return;
  }
  const url = new URL(request.url);
  //PROTOCOL
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return;
  }

  // Firebase
  if (
    url.hostname.includes('firebaseio.com') ||
    url.hostname.includes('firebasedatabase.app') ||
    url.hostname.includes('googleapis.com')
  ) {
    return;
  }

  // ─────────────────────────────────────────
  // Navegación SPA
  // ─────────────────────────────────────────

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  // ─────────────────────────────────────────
  // Assets estáticos
  // ─────────────────────────────────────────

  if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    event.respondWith(cacheFirst(request));
    //return;
  }

  // Todo lo demás: red
});

// ─────────────────────────────────────────────
// CACHE FIRST
// ─────────────────────────────────────────────

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.warn('[SW] Network error:', request.url);
    return new Response('Sin conexión', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}


// ─────────────────────────────────────────────
// NETWORK FIRST
// ─────────────────────────────────────────────

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.warn('[SW] Offline:', request.url);
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    // Fallback de SPA
    const fallback = await caches.match('/index.html');
    if (fallback) {
      return fallback;
    }
    return new Response('Offline',
      {
        status: 503,
        statusText: 'Offline'
      }
    );
  }
}