/* 
CMS-Javascript (spa) 
Autor: Guillermo Jiménez López
Fecha de Actualización: 11.07.2021
Versión: 1.2.2
*/
//import './assets/bootstrap-5.0.2/css/bootstrap.min.css';
import './assets/bootstrap-5.0.2/js/bootstrap.bundle.min.js';
import { inicio,variables } from './app/lib.js';
import { modulosRoutes,controlRoutes,menu_web,routes_session } from './routes/index.routes.js';
import { getQueryVariable,url_vars,menuWeb } from './app/functions.js';

const {location,base_url,page_path,route} = variables;

window.addEventListener('hashchange', ()=>{
    let hash = location.hash;console.warn(hash);
    var vars = getQueryVariable(hash);console.log(vars);
    const {mod,ext,id} = url_vars(vars);
    var route = mod + '/' + ext;
    var url_mod = base_url + page_path + mod + '/' + ext + '.html';
    //var url_mod = base_url + page_path + route +'.html';
    modulosRoutes(url_mod,mod);
    menuWeb(mod,menu_web);
    //console.warn('route='+route);
    controlRoutes(route);
});

//Función Inicio
inicio();
