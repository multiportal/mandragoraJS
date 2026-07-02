import { variables } from './core/lib.js';
import { routes, navigate } from '../routes/routes.js';
import {theme, name, app } from './core/constants.js';

/* ==========================
   VARIABLES
========================== */
const { host } = variables();

/* ==========================
   PARAMETROS URL
========================== */
export function urlVariables(p) {
  const vars = p.split('/'); console.log(vars);
  var mod = vars[1] === '' || vars[1] === undefined ? 'Home' : vars[1];
  var ext = vars[2] === '' || vars[2] === undefined ? '' : vars[2];
  var id = vars[3] === '' || vars[3] === undefined ? '' : vars[3];
  const url_var = { mod, ext, id };
  return url_var;
}

/* ==========================
   ROUTER
========================== */
export const router2 = (hash, mod, ext, title) => {
  var token = localStorage.getItem("Token");
  consoleLocal('log', 'hash=>' + hash);
  let ext2 = (ext != 'index') ? ' / ' + capitalize(ext) : '';
  document.title = title + ' - ' + capitalize(mod) + ext2;
  getRoutesSesion(mod, pagesAuth);
  let page = (mod != 'Home' && ext != 'index') ? ext : mod; //console.log(page,mod,ext);
  //SEGMENTO PARA CARGAR EN DASHBOARD
  //let idApp = (mod=='dashboard' && ext!='index')?'appDash':'app'; console.log(idApp);
  let content = document.getElementById('app');
  if (content) {
    content.innerHTML = '';
    if (hash) {
      return content.appendChild(Pages(page));
    }
  }/*else{
    if(token!=null && token!='undefined'){
      window.location.href='#/dashboard';
    }else{
      window.location.href='#/';
    }
  }*/
}

export const router = (hash, v) => {
  if(!app) return;
  app.innerHTML = routes[v.mod]();
};

/* ==========================
   LOAD
========================== */
export function load() {
  const v = variables(); consoleLocal('log', v);
  navigate(v.hash);
}

export function inicio() {
  console.log('Run function inicio');
  load();
}

/* ==========================
   MENSAJES / ALERTAS
========================== */

/* ==========================
   GENERAL
========================== */

export function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

export function fecha() {
  var dt = new Date();
  var hora = dt.getHours();
  var minuto = dt.getMinutes();
  var segundo = dt.getSeconds();
  var dd = dt.getDate();
  var mm = dt.getMonth() + 1;
  var year = dt.getFullYear();
  var valtime = ((hora < 10) ? "0" : "") + hora;
  valtime += ((minuto < 10) ? ":0" : ":") + minuto;
  valtime += ((segundo < 10) ? ":0" : ":") + segundo;
  mm = (mm < 10) ? '0' + mm : mm;
  dd = (dd < 10) ? '0' + dd : dd;
  var fecha = year + '-' + mm + '-' + dd + ' ' + valtime;
  return fecha;
}

export function consoleLocal(type, val) {
  if (host == 'localhost' || host == 'localhost:5173') {
    switch (type) {
      case 'log':
        console.log(val);
        break;
      case 'table':
        console.table(val);
        break;
      case 'warn':
        console.warn(val);
        break;
      case 'error':
        console.error(val);
        break;
      default:
        console.log(val);
        break;
    }
  }
}

export function loadStyle(arr, prefix) {
  if (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      console.log('load', prefix + i);
      let node = document.getElementById(prefix + i);
      if (node) {
        console.log('Reload Ok: ' + prefix + i);
      } else {
        console.log(prefix + i, arr[i]);
        //<![CDATA[
        if (document.createStyleSheet) {
          document.createStyleSheet(arr[i]);
        } else {
          var styles = "@import url('" + arr[i] + "');";
          var newSS = document.createElement('link');
          newSS.id = prefix + i;
          newSS.rel = 'stylesheet';
          newSS.href = 'data:text/css,' + escape(styles);
          document.getElementsByTagName("head")[0].appendChild(newSS);
        }
        //]]>
      }
    }
  }
}

export function delStyle(arr, prefix) {
  for (let i = 0; i < arr.length; i++) {
    console.log('delete', prefix + i);
    let nodo = document.getElementById(prefix + i);
    if (nodo) {//console.log(nodo);
      document.getElementsByTagName("head")[0].removeChild(nodo);
    }
  }
}

export function loadScript(arr, prefix) {
  if (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      console.log('load', prefix + i);
      let node = document.getElementById(prefix + i);
      if (node) {
        console.log('Reload Ok: ' + prefix + i);
      } else {
        console.log(prefix + i, arr[i]);
        //<![CDATA[
        var newScript = document.createElement('script');
        newScript.id = prefix + i;
        newScript.src = arr[i]; // Especifica la ruta al archivo JavaScript que deseas cargar
        document.body.appendChild(newScript);
        //]]>
      }
    }
  }
}

export function delScript(arr, prefix) {
  for (let i = 0; i < arr.length; i++) {
    console.log('delete', prefix + i);
    let nodo = document.getElementById(prefix + i);
    if (nodo) {//console.log(nodo);
      document.body.removeChild(nodo);
    }
  }
}

export function loading() {
  let body = document.getElementsByTagName("body")[0];
  let layer = 'layerLoading';
  let content = `<div class="${layer}">
    <img src="./assets/img/loader-green.gif" alt=""/>
    <p>Cargando ${theme}</p>
    <!--p>by ${name}</p-->
  </div>`;
  var div = document.createElement('div');
  div.id = 'load';
  div.innerHTML = content;
  body.appendChild(div);
  setTimeout(() => {
    let nodo = document.getElementById(div.id);
    if (nodo) {//console.log(nodo);
      body.removeChild(nodo);
    }
  }, 5000);
}

export function controlLoading() {
  const { mod, ext } = variables();
  let page = (mod != 'Home' && ext != 'index') ? ext : mod;// console.log(page,mod,ext);
  var views = pagesAll[page];
  if (mod != 'dashboard' && typeBack == 'firebase') {
    if (mod != 'logout' && mod != 'noauth' && ext == 'index' && views != undefined) { loading(); }
  }
}

export function footer() {
  const f = document.querySelector("#footer_page");
  if (!f) return;
  f.innerHTML = year + ' &copy; MandragoraJS V.3.0.1 - Diseñada por <a target="_blank" href="http://multiportal.com.mx">[:MULTIPORTAL:]</a>.';
}