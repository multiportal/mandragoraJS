//import {consola} from './console.js';
import {filename,getQueryVariable,urlVars,menuWeb,fileExist,getRoutes,reMod} from './functions.js';
import {router} from '../routes/index.routes.js';

function variables(){
/*VARIABLES SYS*/
var w = window;
var d = document;
var loc = w.location;
var dt = new Date();
var day = dt.getDate();
day = (day < 10) ? '0' + day : day;
var mon = dt.getMonth() + 1;
mon = (mon < 10) ? '0' + mon : mon;
var year = dt.getFullYear(); 
var fecha = year + '-' + mon + '-' + day
//var mod = '';//var ext = '';//var id = '';

/*VARIABLES DE ENTORNO*/
const proyecto = 'mandragoraJS'; //PROYECTO
const sub_path = '#/'; //SUB_PATH
const src_path = 'src/'; //RESOURCE PATH
const page_path = src_path + 'pages/'; //PAGE PATH

/*VARIABLES CONSTANTES*/
const protocol = loc.protocol;
const host = loc.host;
const dominio = loc.origin + '/';
const dominio1 = loc.origin;
const path_url1 = loc.pathname;
const hash = loc.hash;
const URL = loc.href;
const quest = loc.search; // [OBSOLETA] -> Obtención del valor de las variable ej. ?mod=producto&ext=cate
const path_url = path_url1.replace("/", "");
const path_root = (host == 'localhost') ? 'MisSitios/' + proyecto + '/' + sub_path : sub_path;
const base_url = dominio + path_url;
const page_url = dominio + path_root;

/* VARIABLES */
var tema = 'default';
var path_tema = 'temas/' + tema + '/';
var pag_name = filename();
var vars_Url = getQueryVariable(hash,sub_path);
let {mod,ext,id} = urlVars(vars_Url);
var url_m = base_url + page_path + mod + '/' + ext + '.html';
//mod = fileExist(mod,url_m);
var ext2 = '/' + ext;
var route = mod + ext2;
var url_mod = base_url + page_path + route + '.html';
var url404 = base_url + page_path + '404/index.html';

  const v = {
    w,
    d,
    loc,
    dt,
    day,
    mon,
    year,
    fecha,
    proyecto,
    sub_path,
    src_path,
    page_path,
    protocol,
    host,
    dominio,
    dominio1,
    path_url1,
    hash, //Load
    URL, //Load
    quest,
    path_url,
    path_root,
    base_url,
    page_url,
    tema,
    path_tema,
    pag_name, //Load
    vars_Url, //Load
    mod, //Load
    ext, //Load
    id, //Load
    ext2, //Load
    route, //Load
    url_mod, //Load
    url_m,
    url404
  };
  return v;
}

/* FUNCIONES */
function inicio() {
  const v = variables();console.log(v);
  const {hash,URL,pag_name,vars_Url,mod,ext,id,ext2,route,url_mod,url_m} = v;
  router(hash,url_mod);
  
  //console.log(consola(v));
  reMod(mod);
  console.log('Corriendo funcion inicio');
}

export {inicio,variables};