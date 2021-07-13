import {login} from '../controllers/login.js';
import {logout} from '../controllers/logout.js';
//import {variables} from './app/lib.js';
//const {route} = variables;

const routes_session = ['dashboard'];
const menu_web = ['login','logout','registro','forget','dashboard'];

const modulosRoutes = async (url_page,mod)=>{//console.warn('url_page='+url_page);
  let content = document.getElementById('app-modulo'); 
  let response = await fetch(url_page);
  if(!response.ok){
    console.error('Error 404: La página No existe');
    content.innerHTML = '<div class="alert alert-danger" role="alert"><strong>Error 404:</strong> La página No existe. <a href="#/" class="alert-link">Volver al Inicio</a></div>';
  }else{
    let html = await response.text();
    var token = localStorage.getItem("Token");
    console.log('token='+token);

    for(var i=0; i<routes_session.length;i++){
      console.warn(routes_session[i]+'='+mod);
      if((token==null || token=='undefined') && routes_session[i]==mod){
        html = `<div class="alert alert-warning" role="alert"><strong>No Autorizado:</strong> No tiene permiso para esta página. <a href="#/" class="alert-link">Volver al Inicio</a></div>`
      }
    }

    console.log(html);
    content.innerHTML=html;
  }
}

function controlRoutes(route){ console.log('route='+route);
  if(route=='login/index'){login();}
  if(route=='logout/index'){logout();}
}

export {modulosRoutes,controlRoutes,menu_web,routes_session};



