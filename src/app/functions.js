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

/*function menuWeb(h,no_menu_web,rutas_session){
  let menu = document.querySelector('#menuweb');
  let btnLogin = document.querySelector('.user-login');
  let userActivo = document.querySelector('.user-activo');
  let userLogout = document.querySelector('.user-logout');
  let n = no_menu_web.length;//console.warn('count:'+n);
  let k = rutas_session.length;//console.warn('count:'+k);
  
  menu.classList.remove('d-none');
  for(var i=0; i<n; i++){//console.warn(i+'|'+no_menu_web[i]);
    var nm = '#' + no_menu_web[i];//console.warn(nm);
    if(h==nm){//console.warn('Session: '+ h + '=' + nm);
      menu.classList.add('d-none');
    }
  }
  
  let token = localStorage.getItem("Token");
  btnLogin.classList.remove('d-none');
  userActivo.classList.add('d-none');
  userLogout.classList.add('d-none');
  for(var i=0; i<k; i++){//console.warn(i+'|'+rutas_session[i]);
    var rs = '#' + rutas_session[i]; //console.warn(h + '=' + rs);
    if(h==rs){//console.warn('Session: ('+token+') '+ h + '=' + rs);
      if((token!=null && token!=undefined) && (token!='null' && token!='undefined')){
        btnLogin.classList.add('d-none');
        userActivo.classList.remove('d-none');
        userLogout.classList.remove('d-none');
      }
    }
  }
}*/

function menuWeb(hash,mod,rutas_web,rutas_session){
  let token = localStorage.getItem("Token"); console.log(token);
  let menu = document.querySelector('#menuweb');
  let btnLogin = document.querySelector('.user-login');
  let userActivo = document.querySelector('.user-activo');
  let userLogout = document.querySelector('.user-logout');

  menu.classList.remove('d-none');
  if(rutas_session[mod]){
    menu.classList.add('d-none');
  }

  btnLogin.classList.remove('d-none');
  userActivo.classList.add('d-none');
  userLogout.classList.add('d-none');
  if((token!=null && token!=undefined) && (token!='null' && token!='undefined')){
    btnLogin.classList.add('d-none');
    userActivo.classList.remove('d-none');
    userLogout.classList.remove('d-none');
  }

}

const fileExist = async (mod,url)=>{
  let new_Mod=mod;console.log(url);
  let response = await fetch(url);
  if(!response.ok){
    new_Mod='404';console.error('NO EXISTE!');
  }
  return new_Mod;
}

const getRoutes = async (hash,url,routes_session)=>{
  let content = document.getElementById('app-modulo'); 
  let response = await fetch(url);
  if(!response.ok){
    console.error('Error 404(Fetch): La página No existe');
    content.innerHTML= `<div class="alert alert-danger" role="alert"><strong>Error 404(Fetch):</strong> La página No existe. <a href="#/" class="alert-link">Volver al Inicio</a></div>`
  }else{
    consoleLocal('log','OK');
    var token = localStorage.getItem("Token");consoleLocal('log','token='+token);
    let html = await response.text();//consoleLocal('log',html);
    for(var i=0; i<routes_session.length;i++){
      var r_ses = '#' + routes_session[i];
      if((token==null || token=='undefined') && hash==r_ses){
        html = `<div class="alert alert-warning" role="alert"><strong>No Autorizado:</strong> No tiene permiso para esta página. <a href="#/" class="alert-link">Volver al Inicio</a></div>`
      }
    }
    if((token!=null && token!='undefined') && hash=='#/login'){setTimeout(() => {window.location.href='#/dashboard';}, 1000); }
    if(hash==r_ses){consoleLocal('warn',hash+'='+r_ses);} //consoleLocal('warn','Validación(getRoutes):'+hash+'='+r_ses);  
    content.innerHTML=html;    
  }
}

function getModules(views){
  const divElement = document.createElement('div');
  divElement.innerHTML = views;      
  return divElement;
}

function reload(mod){
  if(mod=='' || mod=='undefined'){
    window.location.href='#/';
  }
}

/*FUNCIONES GENERALES*/
function ssl(){
  //const protocol = window.location.protocol;console.log("protocol=" + protocol);
  if(protocol=="http:"){window.location="https://"+host+"/"+path_root;}
}

function consoleLocal(type,val){
  let host = window.location.host;
  if(host=='localhost' || host=='localhost:8080'){
    switch (type) {
      case 'log':
        console.log(val);
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

function fecha() {
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

//Fecha de Actualización
function fecha_hora_update(val,inputId) {
  const inputUpdate = document.querySelector(inputId);
  var fecha1 = fecha();
  inputUpdate.value = fecha1;
  if(val==1){setTimeout(fecha_hora_update, 1000);}
}

//Fecha de Creación
function fecha_hora_create(val,inputId) {
  const inputCreate = document.querySelector(inputId);
  var fecha2 = fecha();
  inputCreate.value = fecha;
  if(val==1){setTimeout(fecha_hora_create, 1000);}
}


function footer(){
  const f = document.querySelector("#footer_page");
  f.innerHTML = year + ' &copy; VcardAppJS v.1.2.14. Diseñada por <a target="_blank" href="http://multiportal.com.mx">[:MULTIPORTAL:]</a>.';
}

//Configuracion de la funcion: [hora.js].

export {filename,getQueryVariable,urlVars,menuWeb,fileExist,getRoutes,getModules,reload,consoleLocal,fecha_hora_create,fecha_hora_update,fecha};