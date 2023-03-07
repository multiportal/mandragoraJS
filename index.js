/* 
CMS-Javascript (spa) 
Autor: Guillermo Jiménez López
Fecha de Actualización: 03.03.2023
Versión: 1.2.2 - Vite
*/
//Files import for webpack
import '/public/assets/bootstrap-5.0.2/css/bootstrap.min.css';
import '/public/assets/css/dashboard.css'; //** 3 WARNINGS IN WEBPACK FOR BUILD -->ADD DOM */
import '/public/assets/font-awesome-5.14.0/css/all.min.css';
import '/public/assets/css/style.css';
//import '/public/assets/main.scss';
import '/public/assets/bootstrap-5.0.2/js/bootstrap.bundle.min.js';
//import '/public/assets/js/sweetalert2.all.min.js';
//import '/public/assets/pwa/sw.js'; //SERVICE WORKER
import '/public/assets/pwa/appCon.js';
//Files import for App
import { inicio, load } from './src/app/lib.js';
import { consoleLocal } from './src/app/functions.js';

//HASHCHANGE EVENT LISTENER FOR APP
window.addEventListener('hashchange', () => {
    consoleLocal('warn', 'Event Listener');
    load();
});

inicio();