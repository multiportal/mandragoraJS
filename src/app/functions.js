import { variables } from './core/lib.js';

/* ==========================
   VARIABLES
========================== */
const { host } = variables();

/* ==========================
   PARAMETROS URL
========================== */
export function urlVariables(p) {
  const vars = p.split('/'); //console.log(vars);
  var mod = vars[1] === '' ? 'Home' : vars[1];
  var ext = vars[2] === '' || vars[2] === undefined ? '' : vars[2];
  var id = vars[3] === '' || vars[3] === undefined ? '' : vars[3];
  const url_var = { mod, ext, id };
  return url_var;
}

/* ==========================
   ROUTER
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