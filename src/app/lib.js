import {filename,getQueryVariable,menuWeb,urlVars,fileExist} from './functions.js';
import {router,no_menu} from '../routes/index.routes.js';

function vars(){
/*VARIABLES SYS*/
var loc = window.location;
var dt = new Date();
var day = dt.getDate();
var mon = dt.getMonth() + 1;
var year = dt.getFullYear();
//var mod = '';//var ext = '';//var id = '';
var sub_path = '#/'; //SUB_PATH
var src_path = 'src/'; //RESOURCE PATH
var page_path = 'src/pages/'; //PAGE PATH
var proyecto = 'mandragoraJS'; //PROYECTO

/*VARIABLES CONSTANTES*/
const protocol = loc.protocol;
const host = loc.host;
const dominio = loc.origin + '/';
const dominio1 = loc.origin;
const path_url1 = loc.pathname;
const has = loc.hash;
const URL = loc.href;
const quest = loc.search; // [OBSOLETA] -> Obtención del valor de las variable ej. ?mod=producto&ext=cate

/* VARIABLES */
var path_url = path_url1.replace("/", "");
var path_root = (host == 'localhost') ? 'MisSitios/' + proyecto + '/' + sub_path : sub_path;
var base_url = dominio + path_url;
var page_url = dominio + path_root;
var tema = 'default';
var path_tema = 'temas/' + tema + '/';
var pag_name = filename();
var vars_Url = getQueryVariable(has,sub_path);
const {mod,ext,id} = urlVars(vars_Url);
//var url_m = base_url + page_path + mod + '/' + ext + '.html';
//let mod = fileExist(mod,url_m);
var ext2 = '/' + ext;
var route = mod + ext2;
var url_mod = base_url + page_path + route + '.html';
var url404 = base_url + page_path + '404/index.html';

const variables = {
  location: loc,
  dt: dt,
  day: day,
  mon: mon,
  year: year,
  protocol: protocol,
  host: host,
  dominio: dominio,
  dominio1: dominio1,
  path_url1: path_url1,
  hash: has,
  URL: URL,
  quest: quest,
  path_url: path_url,
  proyecto: proyecto,
  sub_path: sub_path,
  src_path: src_path,
  page_path: page_path,
  path_root: path_root,
  tema: tema,
  path_tema: path_tema,
  base_url: base_url,
  page_url: page_url,
  pag_name: pag_name,
  vars_Url: vars_Url,
  mod: mod,
  ext: ext,
  id: id,
  route: route,
  url_mod: url_mod,
  url404: url404
};

return variables;
}

/* FUNCIONES */
function inicio() {
  console.log('Corriendo funcion inicio');
  const v = vars();
  menuWeb(v.mod,no_menu);
  //fileExist(v.mod,v.url_mod);
  router(v.hash,v.url_mod);

/*LOGS*******************************************************/
//console.log(location);
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
}
export {inicio,vars};