/* 
CMS-Javascript (hash/spa) 
Autor: Guillermo Jiménez López
Fecha de Actualización: 26.06.2026
Versión: 0.0.1 - MandragoraJS - Vite
Notas: 
*/
//BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
//Files import for App
//import './public/assets/css/dashboard.css'; //** 3 WARNINGS IN WEBPACK FOR BUILD -->ADD DOM */
//import './public/assets/font-awesome-5.14.0/css/all.min.css';
import './public/assets/css/style.css';
import './public/assets/css/load.css';
import './public/assets/js/jquery-3.3.1.slim.min.js';
//import './public/assets/pwa/sw.js'; //SERVICE WORKER
import './public/assets/pwa/appCon.js';
//Files import for App
import { inicio, load, consoleLocal } from './src/app/functions.js';

//HASHCHANGE EVENT LISTENER FOR APP
window.addEventListener('hashchange', () => {
    consoleLocal('warn', 'Event Listener');
    load();
});

inicio();
