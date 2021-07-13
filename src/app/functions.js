/*FUNCIONES*/
function getQueryVariable(h,sub_path){
  var res = h.replace('/' + sub_path, ""); //console.log(res);
  var val = res.split("/"); //console.log(val);
  var query = window.location.search.substring(1); //console.log(query);
  var vars = query.split("&");
  if (query == "") {
    vars = ['mod=' + val[1], 'ext=' + val[2], 'id=' + val[3]];
  }
  return vars;
}

function filename() {
  var rutaAbsoluta = self.location.href; //console.log(rutaAbsoluta);
  var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
  var rutaRelativa = rutaAbsoluta.substring(posicionUltimaBarra + "/".length, rutaAbsoluta.length);
  return rutaRelativa;
}

function url_vars(vars){
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

function menuWeb(m,menu_web){
  let menu = document.querySelector('#menuweb');
  let n = menu_web.length;//console.warn('count:'+n);
  menu.classList.remove('d-none');
  for(var i=0; i<n; i++){//console.warn(i+'|'+menu_web[i]);
    if(menu_web[i]==m){
      //console.warn('Session: '+menu_web[0]+'='+m);
      menu.classList.add('d-none');
    }
  }
}

function ssl(){
  //const protocol = window.location.protocol;console.log("protocol=" + protocol);
  if(protocol=="http:"){window.location="https://"+host+"/"+path_root;}
}

//Configuracion de la funcion: [hora.js].
function fecha_hora_update(val) {
  const inputUpdate = document.querySelector("#f_update");
  const fecha1 = fecha();
  if(val==1){
  setTimeout(fecha_hora_update, 1000);
  }
  if (mod=='tarjetas' || mod=='empresas' || mod=='perfil') {
    inputUpdate.value = fecha1;
  }
}

function fecha_hora_create(val) {
  const inputCreate = document.querySelector("#f_create");
  const fecha2 = fecha();
  if(val==1){
  setTimeout(fecha_hora_create, 1000);
  }
  if (mod=='tarjetas' || mod=='empresas' || mod=='perfil') {    
    inputCreate.value = fecha2;
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

function menu() {
  var m1 = (mod == 'Home') ? ' class="active"' : '';
  var m2 = (mod == 'perfil') ? ' class="active"' : '';
  var m3 = (mod == 'tarjetas') ? ' class="active"' : '';
  var m4 = (mod == 'empresas') ? ' class="active"' : '';
  var menu = `<li${m1}><a href="${page_url}"> <i class="fa fa-home"></i>Home </a></li>
    <!--li${m2}><a href="${page_url}perfil"> <i class="fa fa-user"></i>Perfil </a></li-->
    <li${m3}><a href="${page_url}tarjetas"> <i class="fa fa-vcard"></i>Mis Tarjetas </a></li>
    <li${m4}><a href="${page_url}empresas"> <i class="fa fa-industry"></i>Empresas </a></li>`;
  $('.list-unstyled').html(menu);
  footer();
}

function footer(){
  const f = document.querySelector("#footer_page");
  f.innerHTML = year + ' &copy; VcardAppJS v.1.2.14. Diseñada por <a target="_blank" href="http://multiportal.com.mx">[:MULTIPORTAL:]</a>.';
}

function reMod(mod,loc){
  if(mod=='' || mod=='undefined'){
    loc.href='#/';
  }
}

export {getQueryVariable,filename,url_vars,menuWeb,reMod};