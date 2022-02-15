/* 
CMS-Javascript (spa) 
Autor: Guillermo Jiménez López
Fecha de Actualización: 14.02.2022
Versión: 1.0.2
*/
//import './src/assets/bootstrap-5.0.2/css/bootstrap.min.css';
import './src/assets/bootstrap-5.0.2/js/bootstrap.bundle.min.js';
import {consola} from './src/app/console.js';
import {inicio,variables} from './src/app/lib.js';
import {reMod,menuWeb,consoleLocal} from './src/app/functions.js';
import {no_menu_web,menu_web,routes_session,router,controlRoutes} from './src/routes/index.routes.js';


window.addEventListener('hashchange',()=>{consoleLocal('warn','Event Listener');
    const v = variables();
    const {hash,URL,pag_name,vars_Url,mod,ext,id,ext2,route,hash2,url_mod,url_m,url404} = v;
    menuWeb(hash2,no_menu_web,menu_web);
    router(hash,hash2,url_mod,url404);
    controlRoutes(route,id);

    reMod(mod);
    consoleLocal('log',consola(v));
});

inicio();
