//appCon.js 
const activeDevelop = false; //*Para Develop poner en "true" */
const { host } = window.location;
if (!host.includes('localhost') || activeDevelop) {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js').then(function (registration) {
			console.log(
				'Service Worker registro correcto con scope: ',
				registration.scope
			);
			// Comprobar si existe una nueva versión
			registration.update();
			// Nueva versión encontrada
			registration.addEventListener('updatefound', () => {
				const newWorker = registration.installing;
				if (!newWorker) return;
				newWorker.addEventListener('statechange', () => {
					if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
						console.log('[SW] Nueva versión disponible');
						//showUpdateMessage();
						showBannerUpdate(newWorker);
					}
				});
			});
		}).catch(function (err) {
			console.warn('Service Worker registro fallo: ', err);
		});
	}
}

function showBannerUpdate(worker) {
	// 1. Crear el contenedor del mensaje (Toast / Banner)
	const banner = document.createElement("div");
	banner.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #323232;
    color: #fff;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 10000;
  `;

	banner.innerHTML = `
    <span>Hay una nueva versión disponible.</span>
    <button id="btn-actualizar" style="
      background: #007bff;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
    ">Actualizar</button>
  `;

	document.body.appendChild(banner);

	// 2. Escuchar el clic en el botón de actualización
	document.getElementById("btn-actualizar").addEventListener("click", () => {
		// Enviar el mensaje al nuevo Service Worker
		worker.postMessage({ action: "skipWaiting" });
		banner.remove();
		localStorage.clear();
		console.log("LocalStorage limpiado");
		//clearCache();
		//console.log("Cache limpiado");
		window.location.reload();
	});
}

function showUpdateMessage() {
	const update = confirm('Hay una nueva versión disponible. ¿Deseas actualizar?');
	if (update) {
		window.location.reload();
	}
}