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
    menuWeb(mod,no_menu);
    fileExist(mod,url_mod);
    router(hash,url_mod);
});

inicio();


/*LOGS*******************************************************/
//console.log(location);
/*
console.info(v.dt);
console.log('Fecha:'+v.year+'-'+v.mon+'-'+v.day);
console.log('protocol=' + v.protocol);
console.log('host=' + v.host);
console.log('dominio=' + v.dominio);
console.log('dominio1=' + v.dominio1);
console.warn('hash=' + v.hash);
console.log('sub_path=' + v.sub_path);
console.log('src_path=' + v.src_path);
console.log('proyecto=' + v.proyecto);
console.log('path_url=' + v.path_url);
console.log('path_url1=' + v.path_url1);
console.log('path_root=' + v.path_root);
console.log('base_url=' + v.base_url);
console.log('page_url=' + v.page_url);
console.warn('URL=' + v.URL);
console.log('quest=' + v.quest);
console.log('tema=' + v.tema);
console.log('path_tema=' + v.path_tema);
console.log('pag_name=' + v.pag_name);
console.log(v.vars_Url);
console.log('mod=' + v.mod);
console.log('ext=' + v.ext);
console.log('id=' + v.id);
console.warn('url_mod=' + v.url_mod);
/*************************************************************/
