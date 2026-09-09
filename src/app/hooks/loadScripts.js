import { name, body } from '../core/constants';
import { comprobarVersion } from './serviceWorker';
/* ==========================
   LOAD-SCRIPT
========================== */

export function loading() {
  const versiones = comprobarVersion(); //console.warn('VERSIONS:', versiones)
  let layer = 'layerLoading';
  let content = `<div class="${layer}">
    <h3>Cargando ${name}</h3>
    <img src="./assets/img/loader-green.gif" alt=""/>
    <p style="font-size: 14px;">${versiones.old ? `Versión ${versiones.old}` : `Instalando versión ${versiones.new}`}</p>
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

export function controlLoading({ mod, ext }) {
  if (mod == 'Home') {
    loading();
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