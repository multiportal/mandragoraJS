import { version, activeDevelop } from '../core/constants';
import { clearCache } from '../functions';

export const serviceWorker = () => {
    //const activeDevelop = false; //*Para Develop poner en "true" */
    const { host } = window.location;
    if (!host.includes('localhost') || activeDevelop) {
        if ('serviceWorker' in navigator) {

            //setTimeout(() => {
            navigator.serviceWorker.ready.then((registration) => {
                registration.active?.postMessage({
                    type: 'GET_SW_VERSION'
                });
            });

            navigator.serviceWorker.addEventListener('message', (event) => {
                //console.warn(event.data);
                if (event.data?.type === 'SW_VERSION') {
                    const version = event.data.version;
                    localStorage.setItem('VersionApp', version);
                    console.warn(`[SW] Versión instalada: ${version}`);
                }
            });
            //}, 1000);

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
                    //console.warn(newWorker);
                    if (!newWorker) {
                        //Comprueba nuevamente
                        return;
                    }
                    console.warn('[SW] Nueva versión detectada...', newWorker);
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('[SW] Nueva versión disponible');
                            console.log('[SW] Estado:', newWorker.state);
                            //showUpdateMessage();
                            /*
                             * Cuando termina install: installed
                             * Como NO usamos skipWaiting() el SW queda en waiting.
                            */
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                console.log('[SW] Nueva versión disponible');
                                //showBannerUpdate(version, newWorker);
                            }
                        }
                    });
                });
            }).catch(function (err) {
                console.warn('Service Worker registro fallo: ', err);
            });
        }
    }
};


function showBannerUpdate(newVersion, worker = null) {
    // 1. Crear el contenedor del mensaje (Toast / Banner)
    const banner = document.createElement('div');
    banner.id = 'sw-update-banner';
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
    <span>Hay una nueva versión disponible. ${newVersion ? newVersion : ``}</span>
    <button id="btn-actualizar"
        type="button"
        class="btn btn-primary"
    >Actualizar</button>
  `;

    document.body.appendChild(banner);

    const btnActualizar = banner.querySelector('#btn-actualizar');

    btnActualizar.addEventListener('click', () => {

        btnActualizar.disabled = true;
        btnActualizar.textContent = 'Actualizando...';

        navigator.serviceWorker.getRegistration().then((registration) => {
            if (!registration) {
                console.warn('[SW] No existe registration');
                window.location.reload();
                return;
            }

            const waitingWorker = registration.waiting;
            if (!waitingWorker) {
                console.warn('[SW] No hay Service Worker esperando');
                window.location.reload();
                return;
            }

            console.log('[SW] Enviando SKIP_WAITING...');
            waitingWorker.postMessage({
                type: 'SKIP_WAITING'
            });

            setTimeout(() => {
                console.warn('ACTULIZADO!!!');
                localStorage.setItem('VersionApp', version);
                window.location.reload()
            }, 3000);

        }).catch((error) => {

            console.error(
                '[SW] Error actualizando:',
                error
            );

            window.location.reload();
        });

    });

}

function showUpdateMessage() {
    const update = confirm('Hay una nueva versión disponible. ¿Deseas actualizar?');
    if (update) {
        //localStorage.setItem('VersionApp', version);
        window.location.reload();
    }
}

export const comprobarVersion = () => {
    const verActual = localStorage.getItem('VersionApp');
    const verNueva = version;
    console.warn('VERSIONES:', verNueva, verActual);
    const versiones = {
        new: verNueva,
        old: verActual
    };

    if (verActual) {
        if (verActual != verNueva) {
            console.warn(`Nueva versión: ${verNueva}`);
            showBannerUpdate(verNueva);
        }
    }

    console.log(`Versión actual: ${verActual}`);
    return versiones;
};