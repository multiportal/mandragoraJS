/* 
CMS-Javascript (spa) 
Autor: Guillermo Jiménez López
Fecha de Actualización: 14.03.2022
Versión: 1.0.3
*/
//Files import for webpack
//import './src/assets/bootstrap-5.0.2/css/bootstrap.min.css';
//import './src/assets/css/dashboard.css'; //** 3 WARNINGS IN WEBPACK FOR BUILD */
import './src/assets/bootstrap-5.0.2/js/bootstrap.bundle.min.js';
//Files import for App

/*
import {consola} from './src/app/console.js';
import {inicio,variables} from './src/app/lib.js';
import {reMod,menuWeb,consoleLocal} from './src/app/functions.js';
import {no_menu_web,menu_web,routes_session,router,controlRoutes} from './src/routes/index.routes.js';

//HASHCHANGE EVENT LISTENER FOR APP
window.addEventListener('hashchange',()=>{consoleLocal('warn','Event Listener');
    const v = variables();
    const {hash,URL,pag_name,vars_Url,mod,ext,id,ext2,route,hash2,url_mod,url_m,url404} = v;
    menuWeb(hash2,no_menu_web,menu_web); //Menu web
    router(hash,hash2,url_mod,url404); //Routes
    controlRoutes(route,id);
    //Redirect to main page
    reMod(mod);
    consoleLocal('log',consola(v));
});

inicio();
*/