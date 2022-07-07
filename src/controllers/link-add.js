import {fecha} from '../app/functions.js';
/* VARIABLES CONSTANTES*/
var loc = window.location;
const host = loc.host;
const dominio = loc.origin + '/';
const path_url1 = loc.pathname;
var path_url = path_url1.replace("/", "");
var page_url = dominio + path_url;
const api_url = (host!='localhost')? dominio + 'api/' : dominio + 'MisSitios/links/api/';

function btnAdd(){
  const btnForm = document.getElementById('form-add');//console.log(btnForm);
  btnForm.addEventListener('submit', btnGuardar);
  fechaId();
}

function fechaId(){
  let inputFecha = document.getElementById('fc');
  inputFecha.value = fecha();
  setTimeout(fechaId,1000);
}

function btnGuardar(e){
  e.preventDefault();
  console.log('Validación de Datos');
  let tok1 = localStorage.getItem('Token');
  let tok2 = tok1.replace('"', '');
  let Token = tok2.replace('"', '');//console.log('TOKEN: ' + Token);
  let tit = document.getElementById('title').value;
  let url = document.getElementById('url').value;
  let des = document.getElementById('description').value;
  let cat = document.getElementById('cate').value;
  let fc = document.getElementById('fc').value;
  let uid = 1//document.getElementById('ID').value;
  //var datos = new FormData(btnForm);
  var datos = {
      //ID: 4,
      title: tit,
      url: url,
      description: des,
      cate: cat,
      user_id: uid,
      created_at: fc,
      token: Token
  }
  //console.log(datos);
  const url_post = api_url + 'v2/links';//console.warn(url_post);  
  fetch(url_post,{
      method: 'POST',
      headers: {
          'Content-Type':'application/json'
      },
      body: JSON.stringify(datos)
  }).then(res=>res.json()).then(data=>{console.log(data);
      //Redireccionar al Dashboard
      location.href= dominio + path_url + '#/links';
  })
  .catch(err=>console.error(err));  
}

export default function linksAdd(){
    //Retardo para activar btnLogin
    setTimeout(function(){
      console.log('linksAdd Activado');
      btnAdd();
    },1000);
    
  }
  
  //export {linksAdd};