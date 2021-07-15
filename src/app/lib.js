import {consola} from './console.js';

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

  const v = {
    w,
    d,
    loc,
    dt,
    day,
    mon,
    year,
    fecha,//Load
    proyecto,
    sub_path,
    src_path,
    page_path,
    protocol,
    host,
    dominio,
    dominio1,
    path_url1,
    hash,//Load
    URL,//Load
    quest
  };
  return v;
}

/* FUNCIONES */
function inicio() {
  const v = variables();console.log(v);
  const {fecha,hash,URL} = v;
  
  //console.log(consola(v));
  console.log('Corriendo funcion inicio');
}

export {inicio,variables};