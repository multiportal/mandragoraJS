import * as bootstrap from 'bootstrap';
import { MODE } from './constants';
import { serviceWorker } from '../hooks/serviceWorker';
import { variables } from './lib';
import { loading } from '../hooks/loadScripts';
import { temaBgColor } from '../hooks/theme';
import { router, consoleLocal } from '../functions';

/* ==========================
   EVENTOS LINKS DE NAVEGACIÓN
========================== */

export function loadNavigate() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a'); //consoleLocal('warn', link);
        if (!link) return;
        // No interceptar descargas
        if (link.hasAttribute('download')) { return; }
        //
        const ruta = link.getAttribute('href');
        if (!ruta || ruta.startsWith('http') || ruta.startsWith('mailto:') || ruta.startsWith('tel:') || ruta.startsWith('blob:')) {
            return;
        }
        consoleLocal('warn', ruta);
        e.preventDefault();
        navigate(ruta);
    });
}

/* ==========================
   NAVEGACIÓN
========================== */

export function navigate(h) {
    const Token = localStorage.getItem('Token'); consoleLocal('log', 'Token navigate:' + Token);
    h = (!Token && h.includes('dashboard')) ? `${MODE === 'HASH' ? '#' : ''}/noauth` : h;
    console.log('Path navigate:', h);
    history.pushState({}, '', h);
    const v = variables(); consoleLocal('log', { 'Variables navigate': v });
    router(v);
    if (h == '' || h == '/') {
        if (MODE === 'HASH') {
            window.location.href = '#/';
        }
        loading();
    }
    temaBgColor(v);//**Opcional
}

/* ==========================
   OBSERVADOR DOM
========================== */

function observeDOM() {
    // Observador para detectar cambios en el DOM
    const observer = new MutationObserver(() => {
        console.log("Carga del DOM detectada");
        // Aquí puedes ejecutar lógica adicional
        // cuando se agreguen nodos dinámicamente.
    });
    observer.observe(document.body, {
        childList: true,   // Detecta nodos agregados/eliminados
        subtree: true      // Incluye todos los descendientes
    });
}

/* ==========================
   LOAD
========================== */

export function load() {
    window.bootstrap = bootstrap;
    if (MODE === 'HASH') {
        navigate(window.location.hash);
        console.log('Carga del DOM completa');
        return;
    }
    //Navegación
    loadNavigate();
    observeDOM();
    //Load route
    navigate(window.location.pathname);
    //Handle back/forward navigation
    window.addEventListener('popstate', () => {
        navigate(window.location.pathname);
    });

}

export function inicio() {
    console.log(`Run function inicio - MODE: ${MODE}`);
    serviceWorker();
    load();
    if (MODE === 'HASH') {
        //HASHCHANGE EVENT LISTENER FOR APP
        window.addEventListener('hashchange', () => {
            consoleLocal('warn', 'Event Listener');
            load();
        });
    }
}