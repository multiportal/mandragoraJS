/* 
CMS-Javascript (spa) 
Autor: Guillermo Jiménez López
Fecha de Actualización: 21.07.2026
Versión: 1.0.1 - MandragoraJS - Vite
Notas: 
*/
//BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
//Files Css import for App
import '../public/assets/css/dashboard.css'; //** 3 WARNINGS IN WEBPACK FOR BUILD -->ADD DOM */
import '../public/assets/css/style.css';
import '../public/assets/css/load.css';
import './main.css';
//Files Js import for App
import '../public/assets/js/jquery-3.3.1.slim.min.js';
//SERVICE WORKER
import '../public/assets/pwa/appCon.js';
//Files import for App
import { inicio, load, consoleLocal } from './app/functions.js';
//HASHCHANGE EVENT LISTENER FOR APP
window.addEventListener('hashchange', () => {
    consoleLocal('warn', 'Event Listener');
    load();
});
inicio();
