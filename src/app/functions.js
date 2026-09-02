import * as bootstrap from 'bootstrap';
import { routes } from "../routes/routes.js";
import { app, name, theme, version } from './core/constants.js';
import { variables } from "./core/lib.js";
import { destroyEvents, handleEventListener } from "./hooks/handleEventListener.js";
import { loadCssJsMod } from "./hooks/loadCssJs.route.js";
import { deleteData, getDataById, sesionActiva } from "./services/firebase.js";
import { versionJson } from "./services/fetch.js";
import { compressImage } from './hooks/loadImage.js';
import { registrosApp } from './functions/registros.js';
import { modalConfirm, modalInfo } from './functions/modalAlerts.js';
import { mx } from './functions/htmx.man.js';

/* ==========================
   VARIABLES
========================== */
const { host, year } = variables();

/* ==========================
   PARAMETROS URL
========================== */
export function urlVariables(p) {
  const vars = p.split('/'); consoleLocal('log', vars);
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
  //loadCssJsMod(v);
  /* EXPLORAR REGISTROS PARA MANDRAGORA PENDIENTE */
  registrosApp(v);
  setTimeout(() => { sesionActiva(v); }, 0);
  setTimeout(() => { mx(); tooltips(); }, 1000);
  if (v.mod != 'dashboard') { footer(); }
};

/* ==========================
   GENERAL
========================== */
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
  const { host } = window.location;
  if (host.includes('localhost')) {
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
  f.innerHTML = year + ' &copy; ' + name + ' Todos los derechos reservados. V.' + version + ' - Diseñada por <a target="_blank" href="http://multiportal.com.mx">[:MULTIPORTAL:]</a>.';
}

export async function comprobarVersionOld(v) {
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

export const tooltips = () => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]'); //consoleLocal('log', tooltipTriggerList);
  tooltipTriggerList.forEach(el => {
    new bootstrap.Tooltip(el);
  });
  console.log('tooltips activo');
}

export const closeModal = (idModal = '#Modal') => {
  const modal = bootstrap.Modal.getOrCreateInstance(document.querySelector(idModal));
  modal.hide();
};

export function validaImagen(url, id) {
  var image = new Image();
  image.src = url;
  image.addEventListener('load', () => {
    console.log('Imagen cargada.');
    //id.style.backgroundImage = `url('${url}')`;
  });
  image.addEventListener('error', () => {
    console.warn('Error: Fallo carga de imagen.', url);
    id.style.backgroundImage = `url(/assets/img/sinfoto.png)`;
  });
}

export function validImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      console.log('Imagen encontrada');
      resolve(true);
    };
    image.onerror = () => {
      console.log('Imagen No encontrada');
      resolve(false);
    };
  });
}

export async function validImage2(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch (error) {
    console.error('Error validando imagen:', error);
    return false;
  }
}

/** * Obtiene el usuario actual desde localStorage. */
export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('userBasic'));
  } catch (error) {
    consoleLocal('error', error);
    return null;
  }
}

export const getCurrentUserData = async () => {
  const userBasic = getCurrentUser();
  if (!userBasic) { return; }
  const { uid } = userBasic;
  const data = await getDataById('users', uid);
  if (!data) return null;
  return data;
};

/** * Obtiene únicamente los registros activos y las ordena por ID. */
export function getActive(data = []) {
  return data.filter(item => item?.activo)
    .sort((a, b) => Number(a.ID) - Number(b.ID));
}

/** * Renderiza un mensaje dentro de la lista. */
export function renderMessage(element, message) {
  element.innerHTML = ` <p class="text-center"> ${message} </p> `;
}

//** SEO **/
export function setSEO({ title, description, canonical }) {
  document.title = title;
  let metaDescription = document.querySelector('meta[name="description"]');

  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  metaDescription.content = description;

  if (canonical) {
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = canonical;
  }
}

export function setSEO2({
  title,
  description,
  canonical,
  image,
  type = 'profile'
}) {

  document.title = title;
  setMeta('name', 'description', description);

  if (canonical) {
    setLink('canonical', canonical);
  }

  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:type', type);
  setMeta('property', 'og:url', canonical);

  if (image) {
    console.log(`Imagen para SEO: ${image}`);
    setMeta('property', 'og:image', image);
  }
}

function setMeta(attribute, key, content) {
  let meta = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function setLink(rel, href) {
  let link = document.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
}

/* ==========================
   FORM
========================== */

export function fillForm(data, selector = document) {
  Object.entries(data).forEach(([key, value]) => {
    const field = selector.getElementById
      ? selector.getElementById(key)
      : selector.querySelector(`#${key}`);

    if (!field) return;
    // Omitir input[type="file"]
    if (field.type === 'file') return;

    switch (field.type) {
      case 'checkbox':
        field.checked = Boolean(value);
        break;
      case 'radio':
        if (field.value === String(value)) {
          field.checked = true;
        }
        break;
      default:
        field.value = value ?? '';
    }
  });
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

export const resetForm = (idForm) => {
  const form = document.querySelector(idForm);
  if (!form) { return; }
  form.reset();
  form.querySelectorAll('input[type="hidden"]').forEach(input => {
    input.value = '';
  });
};

export const toggleTitle = (newTitle = 'Nuevo') => {
  const mode = localStorage.getItem("Mode");
  const tit = document.querySelector('.title');
  tit.innerHTML = mode == 'edit' ? 'Editar' : newTitle;
};

export const btnCancelar = (callback, selector = '#Modal') => {
  const modal = document.querySelector(selector);
  if (!modal) return;
  handleEventListener("hidden.bs.modal", () => {
    callback?.();
  }, modal);
};

export const btnBorrar = (tab, callback, selector = ".btnDelete") => {
  handleEventListener("click", async (e) => {
    const btn = e.target.closest(selector);
    if (!btn) return;
    const { isConfirmed } = await modalConfirm('warning', '¿Está seguro de eliminar?', '¡Este cambio será irreversible!');
    if (!isConfirmed) return;
    const key = btn.getAttribute("data-id");
    if (!key) return;
    try {
      console.log("Eliminar:", key);
      deleteData(tab, key);
      callback?.();
      modalInfo("success", "¡Borrado!", "Tu registro ha sido borrado");
    } catch (error) {
      console.error(error);
      modalInfo("eror", "Error", "No fue posible eliminar el registro.");
    }
  });
};

export const btnChanceImage = (p = null, i = null) => {
  const fp = p ?? document.querySelector('#fotoProfile');
  const f = i ?? document.querySelector('#foto');
  //BOTON USERFILE
  const input = document.querySelector("#changeImage");
  input.addEventListener("change", async (e) => {
    const archivo = e.target.files[0]; //console.log(archivo);
    if (!archivo) return;
    const base64 = await compressImage(archivo); //await convertirBase64(archivo);console.log(base64);
    fp.src = base64;
    f.value = base64;
  });
};