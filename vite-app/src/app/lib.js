import env from "./env";
//import { privatePage } = './controllers/pages';
import { router, reload, queryVars, filename } from "./functions/main";

function vars() {
  const { title, proyecto, path_hash, path_src, path_page } = env();
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

  /*VARIABLES DE ENTORNO*/
  //const proyecto = 'mandragoraJS'; //PROYECTO
  //const path_hash = '#/'; //path_hash
  //const path_src = 'src/'; //RESOURCE PATH
  //const path_page = path_src + 'pages/'; //PAGE PATH

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
  var pag_name = filename();
  let { mod, ext, id } = queryVars(hash);//Cambiar a Hash 
  var ext2 = '/' + ext;
  var route = mod + ext2;
  var modh = (mod) ? mod : '';
  var exth = (ext && ext != 'index') ? '/' + ext : '';
  var hash2 = '#/' + modh + exth;
  var url_mod = base_url + path_page + route + '.html';
  var url404 = base_url + path_page + '404/index.html';

  const v = {
    w,
    d,
    loc,
    dt,
    day,
    mon,
    year,
    fecha,
    title,
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
    pag_name, //Load
    //vars_Url, //Load
    mod, //Load
    ext, //Load
    id, //Load
    ext2, //Load
    route, //Load
    hash2,
    url_mod, //Load-NOT
    url404, //NOT
  };
  return v;
}

/* FUNCIONES */
function load() {
  const v = vars(); console.log('Load...',v)//consoleLocal('log', v);
  const { hash, mod, ext, id, route, hash2, title } = v;
  router(hash, mod, ext, title, privatePage);
  //controlRoutes(route,mod,ext,id);
  //menuWeb(hash2,mod,pages,pagesSys);
  //Redirect to #/ (Home)
  reload(mod,hash);
}

function init() {
  console.log('Run function init');
  load();
}

export { init, load, vars };