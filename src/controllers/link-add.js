import { fecha } from '../app/functions.js';
import { variables } from '../app/lib';
const v = variables();
/* VARIABLES CONSTANTES*/
const { host, dominio, path_url, Api } = v;

console.log('/* javascript login | VARIABLES CONSTANTES*/');
const api_links = Api + '/v2/links/';
if (host == 'localhost' || host == 'localhost:9001') { console.log('api_links=' + api_links); }
////////////////////////

function btnAdd() {
  const btnForm = document.getElementById('form-add');//console.log(btnForm);
  btnForm.addEventListener('submit', btnGuardar);
  fechaId();
}

function fechaId() {
  let inputFecha = document.getElementById('fc');
  inputFecha.value = fecha();
  setTimeout(fechaId, 1000);
}

function btnGuardar(e) {
  e.preventDefault();
  console.log('Validación de Datos');
  let Token = localStorage.getItem('Token');//console.log('TOKEN: ' + Token);
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
  console.log(datos);
  const url_post = api_links;console.warn(url_post);  
  /*
  fetch(url_post, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  }).then(res => res.json()).then(data => {
    //const {data} = data;
    console.log(data);
    //Redireccionar al Dashboard
    window.location.href = dominio + path_url + '#/links';
  })
    .catch(err => console.error(err));
    */
}

function linksAdd() {
  //Retardo para activar btnLogin
  setTimeout(function () {
    console.log('linksAdd Activado');
    btnAdd();
  }, 1000);

}

export { linksAdd };