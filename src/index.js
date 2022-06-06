/* 
CMS-Javascript (spa) 
Autor: Guillermo Jiménez López
Fecha de Actualización: 14.03.2022
Versión: 1.0.3
*/
//Files import for webpack
import './assets/bootstrap-5.0.2/css/bootstrap.min.css';
//import './assets/css/dashboard.css'; //** 3 WARNINGS IN WEBPACK FOR BUILD */
import './assets/bootstrap-5.0.2/js/bootstrap.bundle.min.js';
//Files import for App
import {consola} from './app/console.js';
import {inicio,load,variables} from './app/lib.js';
import {reMod,menuWeb,consoleLocal} from './app/functions.js';
import {no_menu_web,menu_web,routes_session,router,controlRoutes} from './routes/index.routes.js';

//HASHCHANGE EVENT LISTENER FOR APP
window.addEventListener('hashchange',()=>{consoleLocal('warn','Event Listener');
    load();
});

inicio();
