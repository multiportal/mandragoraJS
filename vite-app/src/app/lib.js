import { reload } from "./functions/main";

function vars() {
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
  const path_hash = '#/'; //path_hash
  const path_src = 'src/'; //RESOURCE PATH
  const path_page = path_src + 'pages/'; //PAGE PATH

  /*VARIABLES CONSTANTES*/
  const { protocol, host, origin, pathname, hash, href, search } = loc;
  const dominio = origin + '/';
  const dominio1 = origin;
  const URL = href;
  const quest = search; // [OBSOLETA] -> Obtención del valor de las variable ej. ?mod=producto&ext=cate
  const path_url = pathname.replace("/", "");
  const base_url = dominio + path_url;
  const path_root = (host == 'localhost') ? path_url + path_hash : path_hash;//Revisar
  const path_build = (host == 'localhost:9001')?'../':'./';
  const page_url = dominio + path_root;//
  const screenw = screen.width;
  const screenh = screen.height;

  /* VARIABLES */
  var tema = 'default';
  var path_tema = 'temas/' + tema + '/';

  var mod='';
  var ext='';
  var id='';
  var ext2='';

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
    path_hash,
    path_src,//NOT
    path_page,//NOT
    protocol,
    host,
    dominio,
    dominio1,
    pathname,
    hash, //Load
    URL, //Load
    quest,
    path_url,
    path_root,
    path_build,
    base_url,
    page_url, 
    screenw,
    screenh,
    tema,
    path_tema,
    //pag_name, //Load
    //vars_Url, //Load
    mod, //Load
    ext, //Load
    id, //Load
    ext2, //Load
    //route, //Load
    //hash2,
    //url_mod, //Load-NOT
    //url404, //NOT
  };
  return v;
}

/* FUNCIONES */
function load() {
  const v = vars(); console.log('Load...',v)//consoleLocal('log', v);
  const {mod}=v;//const { hash, mod, ext, id, route, hash2 } = v;
  //router(hash, hash2, mod, ext);
  //controlRoutes(route,mod,ext,id);
  //menuWeb(hash2,mod,pages,pagesSys);
  //Redirect to #/ (Home)
  reload(mod);
}

function init() {
  console.log('Corriendo funcion init');
  load();
}

export { init, load, vars };