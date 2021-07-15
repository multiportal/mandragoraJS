import {getQueryVariable,filename,url_vars,menuWeb,reMod} from './functions.js';
import {modulosRoutes,controlRoutes,menu_web} from '../routes/index.routes.js';
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
var vars = getQueryVariable(has,sub_path);
const {mod,ext,id} = url_vars(vars);
var ext2 = '/' + ext;
var route = mod + ext2;
var url_mod = base_url + page_path + mod + '/' + ext + '.html';
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
  vars: vars,
  mod: mod,
  ext: ext,
  id: id,
  route: route,
  url_mod: url_mod,
  url404: url404,
};

/* FUNCIONES */
function inicio() {
  console.log('Corriendo funcion inicio');
  modulosRoutes(url_mod,mod);
  menuWeb(mod,menu_web);
  controlRoutes(route);
  reMod(mod,loc);
}

/*LOGS*******************************************************/
//console.log(location);
console.info(dt);
console.log(day);
console.log(mon);
console.log(year);
console.log('protocol=' + protocol);
console.log('host=' + host);
console.log('dominio=' + dominio);
console.log('dominio1=' + dominio1);
console.warn('hash=' + has);
console.log('sub_path=' + sub_path);
console.log('src_path=' + src_path);
console.log('proyecto=' + proyecto);
console.log('path_url=' + path_url);
console.log('path_url1=' + path_url1);
console.log('path_root=' + path_root);
console.log('base_url=' + base_url);
console.log('page_url=' + page_url);
console.warn('URL=' + URL);
console.log('quest=' + quest);
console.log('tema=' + tema);
console.log('path_tema=' + path_tema);
console.log('pag_name=' + pag_name);
console.log('vars=' + vars);
console.log('mod=' + mod);
console.log('ext=' + ext);
console.log('id=' + id);
console.log('url_mod=' + url_mod);
/*************************************************************/

export {inicio,variables};