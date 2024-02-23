import { variables } from "./core/lib";
import { pagesAll, pagesAuth } from "../app/controllers/pages";
import Pages from "../app/controllers/index";
import { versionJson } from "./services/fetch";

//VARIABLES CONSTANTES
const {hash, host, hostDev, typeBack, apiVer} = variables();

/*FUNCIONES*/
export function filename() {
  var rutaAbsoluta = self.location.href; //console.log(rutaAbsoluta);
  var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
  var rutaRelativa = rutaAbsoluta.substring(posicionUltimaBarra + "/".length, rutaAbsoluta.length);
  return rutaRelativa;
}

export function getQueryVariable(h,sp){
  var res = h.replace('/' + sp, ""); //console.log(res);
  var val = res.split("/"); //console.log(val);
  var query = window.location.search.substring(1); //console.log(query);
  var vars = query.split("&");
  if (query == "") {
    vars = ['mod=' + val[1], 'ext=' + val[2], 'id=' + val[3]];
  }
  return vars;
}

export function urlVars(vars){
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

export function menuWeb(hash,mod,rutas_web,rutas_sys){
  let token = localStorage.getItem("Token"); //console.log(token);
  let menu = document.querySelector('#menuweb');
  let btnLogin = document.querySelector('.user-login');
  let userActivo = document.querySelector('.user-activo');
  let userLogout = document.querySelector('.user-logout');

  /*menu.classList.remove('d-none');
  if(rutas_sys[mod]){
    menu.classList.add('d-none');
  }*/

  //SESION - MENU WEB
  if(rutas_web[mod]){
    btnLogin.classList.remove('d-none');
    userActivo.classList.add('d-none');
    userLogout.classList.add('d-none');
    if((token!=null && token!=undefined) && (token!='null' && token!='undefined')){
      btnLogin.classList.add('d-none');
      userActivo.classList.remove('d-none');
      userLogout.classList.remove('d-none');
    }
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

export const router = (hash, mod, ext, title) => {
  var token = localStorage.getItem("Token");
  consoleLocal('log','hash=>' + hash);
  let ext2 = (ext!='index')?' / '+capitalize(ext):'';
  document.title = title + ' - ' + capitalize(mod) + ext2;
  getRoutesSesion(mod,pagesAuth);  
  let page = (mod!='Home' && ext!='index')?ext:mod; //console.log(page,mod,ext);
  //SEGMENTO PARA CARGAR EN DASHBOARD
  //let idApp = (mod=='dashboard' && ext!='index')?'appDash':'app'; console.log(idApp);
  let content = document.getElementById('app');
  //if(content){
    content.innerHTML = '';
    if(hash){
      return content.appendChild(Pages(page));
    }
  /*}else{
    if(token!=null && token!='undefined'){
      window.location.href='#/dashboard';
    }else{
      window.location.href='#/';
    }
  }*/
}

const getRoutes = async (hash,url,routes_session)=>{
  let content = document.getElementById('app'); 
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

export function getRoutesSesion(mod,pagesAuth){
  var token = localStorage.getItem("Token");consoleLocal('log','token='+token);
  //Generar array de paginas privadas const pagesAuth=['dashboard','links'];
  let n = pagesAuth.length; //console.log(n);
  for(let i=0;i<n;i++){
    if(mod === pagesAuth[i]){consoleLocal('log','Accceso: '+mod+'='+pagesAuth[i]);}
    if(mod === pagesAuth[i] && (token==null || token=='undefined')){/*setTimeout(() => {*/window.location.href='#/noauth';/*}, 100);*/}
  }
  //if((mod=='dashboard' || mod=='links') && (token==null || token=='undefined')){/*setTimeout(() => {*/window.location.href='#/noauth';/*}, 100);*/}
  if(mod=='login' && (token!=null && token!='undefined')){/*setTimeout(() => {*/window.location.href='#/dashboard';/*}, 100);*/}
}

export function getModules(views){
  const divElement = document.createElement('div');
  divElement.innerHTML = views;      
  return divElement;
}

export function reload(mod,page_url){
  if(mod=='' || mod=='undefined'){
    window.location.href=page_url;//'#/';
  }
}

/*FUNCIONES GENERALES*/
export function ssl(){
  //const protocol = window.location.protocol;console.log("protocol=" + protocol);
  if(protocol=="http:"){window.location="https://"+host+"/"+path_root;}
}

export function consoleLocal(type,val){
  if(host == hostDev){
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

export function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

export function loadStyle(arrCss,prefix) {
  if (arrCss.length > 0) {
    for (let i=0; i<arrCss.length; i++) {
      let node = document.getElementById(prefix+i);
      if(node){
        consoleLocal('log','Ok: dash-'+i);
      }else{
        //consoleLocal('log',arrCss[i]);
        //<![CDATA[
        if (document.createStyleSheet) {
          document.createStyleSheet(arrCss[i]);
        } else {
          var styles = "@import url('" + arrCss[i] + "');";
          var newSS = document.createElement('link');
          newSS.id = prefix+i;
          newSS.rel = 'stylesheet';
          newSS.href = 'data:text/css,' + escape(styles);
          document.getElementsByTagName("head")[0].appendChild(newSS);
        }
        //]]>
      }
    }
  }
}

export function delStyle(arrNum,prefix){
  for(let i=0; i<arrNum; i++){
    let nodo = document.getElementById(prefix+i);
    if(nodo){//consoleLocal('log',nodo);
      document.getElementsByTagName("head")[0].removeChild(nodo);
    }  
  }
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

//Fecha de Actualización
export function fecha_hora_update(val,inputId) {
  const inputUpdate = document.querySelector(inputId);
  var fecha1 = fecha();
  inputUpdate.value = fecha1;
  if(val==1){setTimeout(fecha_hora_update, 1000);}
}

//Fecha de Creación
export function fecha_hora_create(val,inputId) {
  const inputCreate = document.querySelector(inputId);
  var fecha2 = fecha();
  inputCreate.value = fecha;
  if(val==1){setTimeout(fecha_hora_create, 1000);}
}

export function footer(){
  const f = document.querySelector("#footer_page");
  f.innerHTML = year + ' &copy; VcardAppJS v.1.2.14. Diseñada por <a target="_blank" href="http://multiportal.com.mx">[:MULTIPORTAL:]</a>.';
}

export function consola(v){
  const {hash,URL,pag_name,vars_Url,mod,ext,id,ext2,route,url_mod,url_m} = v;
  const nv = {hash,URL,pag_name,vars_Url,mod,ext,id,ext2,route,url_mod,url_m};//console.log(nv);
  return nv;
}

export function loading(){
  let body = document.getElementsByTagName("body")[0];
  let layer = 'layerLoading';
  let content = `<div class="${layer}">
    <img src="./assets/img/loader-green.gif" alt=""/>
    <p>Cargando...</p>
  </div>`;
  var div = document.createElement('div');
  div.id = 'load';
  div.innerHTML=content;
  body.appendChild(div);
  setTimeout(() => {
    let nodo = document.getElementById(div.id);
    if(nodo){//console.log(nodo);
      body.removeChild(nodo);
    }
  }, 1500);    
}

export function controlLoading(){
  const {mod,ext} = variables();
  let page = (mod!='Home' && ext!='index')?ext:mod;// console.log(page,mod,ext);
  var views = pagesAll[page];
  if(mod!='logout' && mod!='noauth' && ext=='index' && views!=undefined){loading();}
}

export async function compVersion(mod,base_url){//const {mod,ext} = variables();
  if(mod=='Home'){
    const {version} = await versionJson(`${base_url}assets/pwa/manifest.json`); console.log(`Version Actual: ${version}`);//consoleLocal('log','Version1 ' + ver1);
    const ver2 = await versionJson(apiVer); 
    if(ver2 && ver2!=undefined){//console.log('Version2',ver2);
      const {ultimate} = ver2.data[0]; //console.log(ultimate);
      if(version != ultimate){
        console.log(`Actualizar version ${mod} (${version} => ${ultimate})`);
      }
    }else{console.warn('No se pudo llevar a cabo la comprobación de versiones');}
  }
}

export function loadDashboard(d){
  let content = document.getElementById('appDash');
  if(content){consoleLocal('log','Click '+d);
    content.innerHTML = '';
    if(hash){
      return content.appendChild(Pages(d));
    }
  }        
}

export function btnMenuPages(btn){
  let d = btn.getAttribute("data-menu");
  btn.addEventListener('click', ()=>{loadDashboard(d)});
}