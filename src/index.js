/* 
CMS-Javascript (spa) 
Autor: Guillermo Jiménez López
Fecha de Actualización: 15.06.2022
Versión: 1.0.7
*/
//Files import for webpack
import './assets/bootstrap-5.0.2/css/bootstrap.min.css';
import './assets/css/dashboard.css'; //** 3 WARNINGS IN WEBPACK FOR BUILD */
//import './assets/font-awesome-5.14.0/css/all.min.css';
//import './assets/css/style.css';
import './assets/main.scss';
import './assets/bootstrap-5.0.2/js/bootstrap.bundle.min.js';
//import './assets/js/sweetalert2.all.min.js';
//import './sw.js'; //SERVICE WORKER
import './assets/pwa/appCon.js';
//Files import for App
import {inicio,load} from './app/lib.js';
import {consoleLocal} from './app/functions.js';

//HASHCHANGE EVENT LISTENER FOR APP
window.addEventListener('hashchange',()=>{consoleLocal('warn','Event Listener');
    load();
});

inicio();
