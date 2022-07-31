//LINKS-EDIT.JS
import { consoleLocal } from '../app/functions';
import { fetchProfile } from '../app/fetch.js';
import { variables } from '../app/lib';
import { api_links, Api } from '../app/urls';
/* VARIABLES CONSTANTES*/
const { host, dominio, path_url } = variables();
//console.log('/* javascript LINKS-EDIT | VARIABLES CONSTANTES*/');
//const api_links = Api + '/v2/links/';
//if (host == 'localhost' || host == 'localhost:9001') { console.log('api_links=' + api_links); }
////////////////////////

function btnEdit() {
    const btnForm = document.getElementById('form-edit');//console.log(btnForm);
    btnForm.addEventListener('submit', btnEditar);
}

const formEdit = async (id) => {
    const formulario = document.getElementById('contentForm');
    let url_get = api_links + id; console.log(url_get);
    const response = await fetch(url_get);
    const { data } = await response.json();
    consoleLocal('log',data);
    data.forEach(element => {
        const { ID, title, url, description, cate, user_id, created_at } = element;
        formulario.innerHTML = `
        <form id="form-edit" action="#/links/edit/${ID}" method="PUT">
            <h2>Editar Link</h2>
            <div class="form-group">
                <input type="text" id="title" name="title" class="form-control" value="${title}" autofocus>
            </div>
            <div class="form-group">
                <input type="text" id="url" name="url" class="form-control" value="${url}">
            </div>
            <div class="form-group">
                <input type="text" id="cate" name="cate" class="form-control" value="${cate}">
            </div>
            <div class="form-group">
                <textarea id="description" name="description" rows="2" class="form-control">${description}</textarea>
            </div>
            <div class="form-group">
                <input type="hidden" id="fc" name="fc" class="form-control" value="${created_at}">
            </div>
            <div class="form-group">
                <input type="hidden" id="user_id" name="user_id" class="form-control" value="${user_id}">
            </div>
            <div class="form-group">
                <input type="hidden" id="id" name="id" class="form-control" value="${ID}">
            </div>
            <div class="form-group">
                <button class="btn btn-success btn-block">Guardar</button>
                <a class="btn btn-secondary btn-block" href="#/links">Cancelar</a>
            </div>
        </form>`;
    });

    btnEdit();//Retardo btnSuccess
}

function btnEditar(e) {
    console.log('Click');
    e.preventDefault();
    console.log('Validación de Datos');
    let tok1 = localStorage.getItem('Token');
    let tok2 = tok1.replace('"', '');
    let Token = tok2.replace('"', '');//console.log('TOKEN: ' + Token);
    let id = document.getElementById('id').value;
    let tit = document.getElementById('title').value;
    let url = document.getElementById('url').value;
    let des = document.getElementById('description').value;
    let cat = document.getElementById('cate').value;
    let fc = document.getElementById('fc').value;
    let uid = document.getElementById('user_id').value;
    //var datos = new FormData(btnForm);
    var datos = {
        ID: id,
        title: tit,
        url: url,
        description: des,
        cate: cat,
        user_id: uid,
        created_at: fc,
        token: Token
    }
    //console.log(datos);
    const url_put = api_links + id;//console.warn(url_post);  
    fetch(url_put, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    }).then(res => res.json()).then(data => {
        console.log(data);
        //Redireccionar al Dashboard
        location.href = dominio + path_url + '#/links';
    })
        .catch(err => console.error(err));
}

function linksEdit(id) {
    //Retardo para activar btnLogin
    setTimeout(function () {
        console.log('linksEdit Activado');
        formEdit(id);
    }, 1000);
}

export { linksEdit };