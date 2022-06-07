/* 
CMS-Javascript (spa) 
Autor: Guillermo Jiménez López
Fecha de Actualización: 07.06.2022
Versión: 1.0.4
*/
//Files import for webpack
//import './src/assets/bootstrap-5.0.2/css/bootstrap.min.css';
//import './src/assets/css/dashboard.css'; //** 3 WARNINGS IN WEBPACK FOR BUILD */
//import './src/assets/main.scss';
import './src/assets/bootstrap-5.0.2/js/bootstrap.bundle.min.js';
//Files import for App
import {inicio,load} from './src/app/lib';
import {consoleLocal} from './src/app/functions';

//HASHCHANGE EVENT LISTENER FOR APP
window.addEventListener('hashchange',()=>{consoleLocal('warn','Event Listener');
    load();
});

inicio();
