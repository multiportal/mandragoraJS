/* 
CMS-Javascript (spa) 
Autor: Guillermo Jiménez López
Fecha de Actualización: 14.09.2021
Versión: 1.0.1
*/
//import './assets/bootstrap-5.0.2/css/bootstrap.min.css';
import './assets/bootstrap-5.0.2/js/bootstrap.bundle.min.js';
import {consola} from './app/console.js';
import {inicio,variables} from './app/lib.js';
import {reMod,menuWeb,consoleLocal} from './app/functions.js';
import {no_menu,routes_session,router,controlRoutes} from './routes/index.routes.js';


window.addEventListener('hashchange',()=>{consoleLocal('warn','Event Listener');
    const v = variables();
    const {hash,URL,pag_name,vars_Url,mod,ext,id,ext2,route,hash2,url_mod,url_m,url404} = v;
    menuWeb(hash2,no_menu,routes_session);
    router(hash,hash2,url_mod,url404);
    controlRoutes(route,id);

    reMod(mod);
    consoleLocal('log',consola(v));
});

inicio();
