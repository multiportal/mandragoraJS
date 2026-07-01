import { navigate, routes } from "../routes/routes.js";
import { app, name } from './core/constants.js';
import { variables } from "./core/lib.js";
import { loadCssJsMod } from "./hooks/loadCssJs.route.js";
import { sesionActiva } from "./services/firebase.js";

/* ==========================
   VARIABLES
========================== */
const { host } = variables();

/* ==========================
   PARAMETROS URL
========================== */
export function urlVariables(p) {
  const vars = p.split('/'); //console.log(vars);
  var mod = vars[1] === '' ? 'home' : vars[1];
  var ext = vars[2] === '' || vars[2] === undefined ? '' : vars[2];
  var id = vars[3] === '' || vars[3] === undefined ? '' : vars[3];
  const url_var = { mod, ext, id };
  return url_var;
}

/* ==========================
   ROUTER
========================== */
export const renderPage = async (p) => {
  if (!app) return;
  const { mod, ext, id } = urlVariables(p); console.log(id);
  const page = p.replace(/^\/+/, "").toLowerCase() || "home";
  const validPage = (id) ? `${mod}/${ext}` : Object.hasOwn(routes, page) ? page : "404";
  console.log("Rendering:", validPage);
  history.pushState({}, "", id ? p : p == '/' ? p : '/' + validPage);
  app.innerHTML = await route(validPage) || route('404');
};

export async function route(page) {
  const v = variables(); console.log(v);
  const { mod, page_url } = v;
  loadCssJsMod(mod, page_url);
  setTimeout(() => { sesionActiva(v); }, 0);
  document.title = `${name} - ${capitalize(mod)}`;
  return routes[page]() || routes['404']();
}

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
   EVENTOS LINKS
========================== */
export function loadNavigate() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    const ruta = link.getAttribute("href"); //console.log("Ruta:", ruta);
    if (!ruta || ruta.startsWith("http") || ruta.startsWith("mailto:") || ruta.startsWith("tel:")) {
      return;
    }
    event.preventDefault();
    navigate(ruta);
  });
}

/* ==========================
   LOAD
========================== */
export function load() {
  if (!app) return;
  //Navegación
  loadNavigate();
  // Observador para detectar cambios en el DOM
  const observer = new MutationObserver(() => {
    console.log("Carga del DOM detectada");
    // Aquí puedes ejecutar lógica adicional
    // cuando se agreguen nodos dinámicamente.
  });
  observer.observe(document.body, {
    childList: true,   // Detecta nodos agregados/eliminados
    subtree: true      // Incluye todos los descendientes
  });
  //Load route
  navigate(window.location.pathname);
  //Handle back/forward navigation
  window.addEventListener('popstate', () => {
    navigate(window.location.pathname);
  });
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