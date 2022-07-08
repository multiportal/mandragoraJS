//LINKS.JS
import { variables } from '../app/lib';
const v = variables();
/* VARIABLES CONSTANTES*/
const { host, dominio, path_url, Api } = v;

console.log('/* javascript login | VARIABLES CONSTANTES*/');
const api_links = Api + '/v2/links/';
if (host == 'localhost' || host == 'localhost:9001') { console.log('api_links=' + api_links); }
////////////////////////

const linksList = async () => {
  let url_get = api_links;
  const response = await fetch(url_get);
  const { data } = await response.json();
  //console.log(data);
  list.innerHTML = ``;
  data.forEach(element => {
    const { ID, title, url, description, cate, user_id, created_at } = element;
    let list = document.querySelector('#list');
    if (element) {
      list.innerHTML += `
        <!--div class="col-md-4"-->
          <div id="${ID}" class="card" style="width: 18rem;">
            <img src="../../assets/img/bg/1.jpg" class="card-img-top" alt="">
            <div class="card-body">
              <a href="${url}" target="_blank">
                <h5 class="card-title">${title}</h5>
              </a>
              <p class="m-2">${cate} - ${created_at}</p>
              <p class="card-text">${description}</p>
              <a class="btn btn-secondary" href="#/links/linksEdit/${ID}"><i class="fa fa-edit"></i> Editar</a>
              <button data-id="${ID}" class="btn btn-danger"><i class="fa fa-trash"></i> Borrar</button>
            </div>
          </div>
        <!--/div-->
      `;
    } else {
      list.innerHTML += `
      <div class="col-md-4 mx-auto">
          <div class="card card-body text-center">
              <p>There are not Links saved yet.</p>
              <a href="#/links/add">Create One!</a>
          </div>
      </div>
      `;
    }
  });

  let lista = document.getElementById('list');
  let Token = localStorage.getItem('Token');

  lista.addEventListener('click', (e) => {
    const id = e.target.getAttribute('data-id'); console.log(id);
    if (id != null) {
      Swal.fire({
        title: '¿Esta seguro de eliminar el registro (' + id + ')?',
        text: "¡Esta operación no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Borrar'
      }).then((result) => {
        if (result.value) {//console.log('Link Borrado');        
          var datos = {
            //ID: id,
            token: Token
          }
          const url_delete = api_links + id;//console.warn(url_post);  
          fetch(url_delete, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
          }).then(res => res.json()).then(data => {
            console.log(data);
            //Redireccionar al Dashboard location.href= dominio + path_url + '#/links';
            borrar();
          })
            .catch(err => console.error(err));
          Swal.fire('¡Eliminado!', 'El registro ha sido eliminado.', 'success')
        }
      })
    }
  })
  //})
}

function borrar() {
  console.log('Click Eliminar');
  setTimeout(function () {
    console.log('links Recargado');
    linksList();//window.location.href = dominio + path_url + '#/links';
  }, 2000);
}

function links() {
  //Retardo para activar btnLogin
  setTimeout(function () {
    linksList();
    console.log('links Activado');
  }, 1000);
}

export { links };