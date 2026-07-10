import { version } from '../core/constants';
/* ==========================
   LOAD-SCRIPT
========================== */

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

export function loadM() {
  let body = document.getElementsByTagName("body")[0];
  let layer = 'layerLoading';
  let content = `
  <div class="position-fixed top-0 end-0 p-3" style="z-index: 11">
    <div id="liveToast" class="toast fade hide" role="alert" aria-live="assertive" aria-atomic="true"></div>
  </div>`;
  var div = document.createElement('div');
  div.id = 'loadM';
  div.innerHTML = content;
  body.appendChild(div);
}

export function controlLoading() {
  const { mod, ext } = variables();
  let page = (mod != 'Home' && ext != 'index') ? ext : mod;// console.log(page,mod,ext);
  var views = pagesAll[page];
  if (mod != 'dashboard' && typeBack == 'firebase') {
    if (mod != 'logout' && mod != 'noauth' && ext == 'index' && views != undefined) { loading(); }
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