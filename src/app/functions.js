import { navigate, routes } from "../routes/routes.js";
import { app, name, theme, version } from './core/constants.js';
import { variables } from "./core/lib.js";
import { destroyEvents } from "./hooks/handleEventListener.js";
import { loadCssJsMod } from "./hooks/loadCssJs.route.js";
import { sesionActiva } from "./services/firebase.js";
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
  destroyEvents();
  const page = v.ext ? `${v.mod}/${v.ext}` : v.mod;
  const view = routes[page] ? page : "404";
  consoleLocal('log', { page, view });
  document.title = `${name} - ${capitalize(v.mod)}`;
  app.innerHTML = await routes[view]();
  if (v.mod != 'dashboard' || v.mod == 'dashboard' && v.ext == '') {
    //loadCssJsMod(v);
    setTimeout(() => { sesionActiva(v); }, 0);
  }
  await comprobarVersion(v);
  setTimeout(() => { tooltips(); }, 1500);
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
   GENERAL
========================== */

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
  const { page_url } = variables();
  const data = await fetch(`${page_url}assets/pwa/manifest.json`).then(r => r.json());
  return data;
}

export async function clearCache() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(cache => caches.delete(cache))
  );
  console.log("Cache eliminado");
}

export const getFormData = (form, key = "name") =>
  Object.fromEntries(
    [...form.querySelectorAll("input, textarea, select")]
      .filter(el => el[key])
      .map(el => [
        el[key],
        el.type === "checkbox" ? el.checked : el.value
      ])
  );

export const tooltips = () => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]'); consoleLocal('log', tooltipTriggerList);
  tooltipTriggerList.forEach(el => {
    new bootstrap.Tooltip(el);
  });
}