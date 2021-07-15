/* 
CMS-Javascript (spa) 
Autor: Guillermo Jiménez López
Fecha de Actualización: 14.07.2021
Versión: 1.0.0
*/
//import './assets/bootstrap-5.0.2/css/bootstrap.min.css';
import './assets/bootstrap-5.0.2/js/bootstrap.bundle.min.js';
import {inicio,vars} from './app/lib.js';
import {router,no_menu} from './routes/index.routes.js';
import {menuWeb,fileExist} from './app/functions.js';

const v = vars();
window.addEventListener('hashchange',()=>{
    const {hash,vars_Url,mod,ext,id,url_mod} = vars();
    console.warn('has='+hash);
    console.log(vars_Url);
    console.warn('url_mod='+url_mod);
    //fileExist(mod,url_mod);
    menuWeb(hash,no_menu);
    router(hash,url_mod);
});

inicio();
