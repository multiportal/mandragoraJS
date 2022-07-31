//LINKS-ADD.JS
import { consoleLocal, fecha } from '../app/functions.js';
import { fetchProfile } from '../app/fetch.js';
import { variables } from '../app/lib';
import { api_links, Api } from '../app/urls';
/* VARIABLES CONSTANTES*/
const { host, dominio, path_url } = variables();
//console.log('/* javascript LINKS-ADD | VARIABLES CONSTANTES*/');
//const api_links = Api + '/v2/links/';
//if (host == 'localhost' || host == 'localhost:9001') { console.log('api_links=' + api_links); }
////////////////////////

function btnAdd() {
  const btnForm = document.getElementById('form-add');//console.log(btnForm);
  btnForm.addEventListener('submit', btnGuardar);
  fechaId();
}

function fechaId() {
  let inputFecha = document.getElementById('fc');
  if(inputFecha!==null){
    inputFecha.value = fecha();
    setTimeout(fechaId, 1000);  
  }
}

async function btnGuardar(e) {
  e.preventDefault();
  console.log('Validación de Datos');
  let Token = localStorage.getItem('Token');//console.log('TOKEN: ' + Token);
  let tit = document.getElementById('title').value;
  let url = document.getElementById('url').value;
  let des = document.getElementById('description').value;
  let cat = document.getElementById('cate').value;
  let fc = document.getElementById('fc').value;
  const {ID} = await fetchProfile(Api,'InfoUser');//ID USER
  let uid = ID;//document.getElementById('ID').value;
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
  const url_post = api_links;//console.warn(url_post);  
  fetch(url_post, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  }).then(res => res.json()).then(data => {//const {data} = data;
    consoleLocal(data);
    //Redireccionar al Dashboard
    window.location.href = dominio + path_url + '#/links';
  })
    .catch(err => console.error(err));
}

function linksAdd() {
  //Retardo para activar btnLogin
  setTimeout(function () {
    btnAdd();
    console.log('linksAdd Activado');
  }, 1000);
}

export { linksAdd };