import { navigate, routes } from "../routes/routes.js";
import { app, name, theme, version } from './core/constants.js';
import { variables } from "./core/lib.js";
//import { loadCssJs } from "./hooks/loadCssJs.route.js";
//import { sesionActiva } from "./services/firebase.js";
import { versionJson } from "./services/fetch.js";

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

export function filename() {
  var rutaAbsoluta = self.location.href; //console.log(rutaAbsoluta);
  var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
  var rutaRelativa = rutaAbsoluta.substring(posicionUltimaBarra + "/".length, rutaAbsoluta.length);
  return rutaRelativa;
}

/* ==========================
   ROUTER
========================== */
export const router = async (v) => {
  if (!app) return;
  const page = v.ext ? `${v.mod}/${v.ext}` : v.mod;
  const view = routes[page] ? page : "404";
  consoleLocal('log', { page, view });
  document.title = `${name} - ${capitalize(v.mod)}`;
  app.innerHTML = await routes[view]();
  if (v.mod != 'dashboard' || v.mod == 'dashboard' && v.ext == '') {
    //loadCssJs(v);
    //setTimeout(() => { sesionActiva(v); }, 0);
  }
  await comprobarVersion(v);
};

export function pageHtml(p) {
  const divElement = document.createElement('div');
  divElement.innerHTML = p;
  return divElement;
}

export function render(template, data) {
  return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
    return key
      .trim()
      .split('.')
      .reduce((obj, prop) => obj?.[prop], data) ?? '';
  });
}

/* ==========================
   LOAD
========================== */
export function load() {
  //const v = variables(); consoleLocal('log', v);
  navigate(window.location.hash);
  console.log('Carga del DOM completa');
}

export function inicio() {
  console.log('Run function inicio');
  load();
}

/* ==========================
   MENSAJES / ALERTAS
========================== */
function closeMessage() {
  const btnClose = document.querySelector('.btn-close');
  if (btnClose) {
    btnClose.addEventListener('click', closeAlert);
  }
}

function closeAlert() {
  const alert = document.querySelector('#liveToast');
  if (alert) {
    alert.classList.remove('show');
    alert.classList.add('hide');
  }
}

export function showMessage(msj, type) {
  const alert = document.querySelector('#liveToast');
  if (!alert) return;
  alert.classList.remove('hide');
  alert.classList.add('show');
  alert.innerHTML = `
  <div class="toast-header ${type === 'Exito' ? 'bg-success text-white' : type === 'Error' ? 'bg-danger text-white' : 'bg-secondary text-white'}">
    <strong class="me-auto">${type}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
    ${type}: ${msj}
  </div>
  `;
  closeMessage();
  setTimeout(closeAlert, 3000);
}

export function alertMessage(msj, type) {
  let alert = document.querySelector('#alert');
  let errTypeAlert = type == 'success' ? type : type == 'warning' ? type : type == 'info' ? type : 'danger'; //(type=='error')?'danger':(type=='warning')?type:(type=='success')?type:'info';
  if (alert) {
    alert.innerHTML = `<div class="alert alert-${errTypeAlert}" role="alert">
        ${type}: ${msj}</div>`;
  }
}

export const toggleEye = () => {
  const password = document.getElementById('password');
  const togglePassword = document.getElementById('togglePassword');
  const icon = togglePassword.querySelector('i');

  togglePassword.addEventListener('click', () => {
    const isPassword = password.type === 'password';
    password.type = isPassword ? 'text' : 'password';
    icon.classList.toggle('bi-eye');
    icon.classList.toggle('bi-eye-slash');
  });
};

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

export function loading() {
  let body = document.getElementsByTagName("body")[0];
  let layer = 'layerLoading';
  let content = `<div class="${layer}">
    <img src="./assets/img/loader-green.gif" alt=""/>
    <p>Cargando ${name}</p>
    <p style="font-size: 10px;">Ver. ${version}</p>
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

export function footer() {
  const f = document.querySelector("#footer_page");
  if (!f) return;
  f.innerHTML = year + ' &copy; MandragoraJS V.3.0.1 - Diseñada por <a target="_blank" href="http://multiportal.com.mx">[:MULTIPORTAL:]</a>.';
}

export async function comprobarVersion(v) {
  if (v.mod == 'Home') {
    const data = await obtenerManifest();
    console.log(`Version Actual: ${data.version}`);
  }
}

export async function obtenerManifest() {
  const { dominio, path_url } = variables();
  const data = await fetch(`${dominio}${path_url}assets/pwa/manifest.json`).then(r => r.json());
  return data;
}

export async function clearCache() {
  const cacheNames = await caches.keys();

  await Promise.all(
    cacheNames.map(cache => caches.delete(cache))
  );

  console.log("Cache eliminado");
}