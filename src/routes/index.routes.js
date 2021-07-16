//import { } from '../app/lib.js';
import {getRoutes} from "../app/functions.js";
import { login } from "../controllers/login.js";
import { logout } from "../controllers/logout.js";

const routes_session = ['#/dasboard'];
const no_menu = ['#/dashboard','#/forget','#/login','#/logout','#/registro'];
const menu_web = ['#/','#/Home','#/nosotros','#/productos','#/contacto'];

const router = async (hash,url_mod,url404) =>{console.log('hash=>'+hash);
    const pages = [].concat(menu_web,no_menu);
    if(hash!=''){
      let v1=0;
      for(let i=0;i<pages.length;i++){
        var r = pages[i];
        if(hash==r){v1=1;break;}
      }console.log(hash+'='+r);
      if(v1==1){getRoutes(url_mod);}else{getRoutes(url404);}
    }
};

function controlRoutes(route){ console.log('route='+route);
  if(route=='login/index'){login();}
  if(route=='logout/index'){logout();}
}

export {no_menu,router,controlRoutes};