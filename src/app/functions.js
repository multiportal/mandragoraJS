/*FUNCIONES*/
function filename() {
  var rutaAbsoluta = self.location.href; //console.log(rutaAbsoluta);
  var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
  var rutaRelativa = rutaAbsoluta.substring(posicionUltimaBarra + "/".length, rutaAbsoluta.length);
  return rutaRelativa;
}

function getQueryVariable(h,sp){
  var res = h.replace('/' + sp, ""); //console.log(res);
  var val = res.split("/"); //console.log(val);
  var query = window.location.search.substring(1); //console.log(query);
  var vars = query.split("&");
  if (query == "") {
    vars = ['mod=' + val[1], 'ext=' + val[2], 'id=' + val[3]];
  }
  return vars;
}

function urlVars(vars){
  for (var i = 0; i < vars.length; i++) {
    var GET = vars[i].split("=");
    if (GET[0] == 'mod') {var mod = GET[1];}
    if (GET[0] == 'ext') {var ext = GET[1];}
    if (GET[0] == 'id') {var id = GET[1];}
  }
  mod = (mod == '') ? 'Home' : mod.replace("?","");
  ext = (ext == '' || ext == 'undefined') ? 'index' : ext;
  id = (id == '' || id == 'undefined') ? '' : id;
  const url_var = {mod,ext,id};
  return url_var;
}

function menuWeb(h,no_menu){
  let menu = document.querySelector('#menuweb');
  let n = no_menu.length;//console.warn('count:'+n);
  menu.classList.remove('d-none');
  for(var i=0; i<n; i++){//console.warn(i+'|'+no_menu[i]);
    if(no_menu[i]==h){
      //console.warn('Session: '+no_menu[0]+'='+m);
      menu.classList.add('d-none');
    }
  }
}

const fileExist = async (mod,url)=>{
  console.log(url);
  let new_Mod=mod;
  let response = await fetch(url);
  if(!response.ok){
    new_Mod='404';console.error('NO EXISTE!');
  }
  return new_Mod;
}

const getRoutes = async (url)=>{
  let content = document.getElementById('app-modulo'); 
  let response = await fetch(url);
  let html = await response.text();console.log(html);
  var token = localStorage.getItem("Token");console.log('token='+token);

    /*for(var i=0; i<routes_session.length;i++){
      console.warn(routes_session[i]+'='+mod);
      if((token==null || token=='undefined') && routes_session[i]==mod){
        html = `<div class="alert alert-warning" role="alert"><strong>No Autorizado:</strong> No tiene permiso para esta página. <a href="#/" class="alert-link">Volver al Inicio</a></div>`
      }
    }*/

  content.innerHTML=html;
}

export {filename,getQueryVariable,urlVars,menuWeb,fileExist,getRoutes};