/* 
CMS-Javascript (spa) 
Autor: Guillermo Jiménez López
Fecha de Actualización: 19.02.2023
Versión: 1.2.1 - VITE
*/
//Files for import
import './assets/bootstrap-5.0.2/css/bootstrap.min.css';
import './assets/font-awesome-5.14.0/css/all.min.css';
import './assets/css/style.css';
//import './assets/main.scss';
import './assets/bootstrap-5.0.2/js/bootstrap.bundle.min.js';
//import './assets/js/sweetalert2.all.min.js';
//import './sw.js'; //SERVICE WORKER
//import './assets/pwa/appCon.js';
//Files import for App
import { init, load } from './app/lib';
import { consoleLocal } from './app/functions/main';

//HASHCHANGE EVENT LISTENER FOR APP
window.addEventListener('hashchange', () => {
  consoleLocal('warn', 'Event Listener');
  load();
});

init();