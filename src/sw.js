//Service Worker sw.js / index.php
var host1 = location.host;
var proyecto = 'vcardappjs'; //PROYECTO
var sub_path = 'app/'; //SUB_PATH
var path_root = (host1 == 'localhost') ? 'MisSitios/' + proyecto + '/' + sub_path : sub_path;

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Instalando Service Worker (sw.js)...', event);
  event.waitUntil(
	caches.open('static').then(function(cache) {
	  cache.addAll(['/'+path_root+'', '/'+path_root+'index.html', '/'+path_root+'bloques/WPA/manifest.json','/'+path_root+'bloques/WPA/appCon.js']);
	})
  );
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activando Service Worker (sw.js)...', event);
});

self.addEventListener('fetch', function(event) {//console.log(event.request.url);
  event.respondWith(
	  caches.match(event.request).then(function(response) {
		if (response) {
		  return response;
		} else {
		  return fetch(event.request).then(function(res) {
			return caches.open('dynamic').then(function(cache) {
			  //cache.put(event.request.url, res.clone()).then(()=>{cache.delete('/'+path_root+'');});
			  cache.put(event.request.url, res.clone()).then(()=>{cache.delete(event.request.url);});
			  return res;
			});
		  });
		}
	  })
  ); 
});  

