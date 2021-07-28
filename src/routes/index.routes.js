//import { } from '../app/lib.js';
import { getRoutes,consoleLocal } from "../app/functions.js";
import { login } from "../controllers/login.js";
import { logout } from "../controllers/logout.js";
import { dashboard } from "../controllers/dashboard.js";

const routes_session = ['/dashboard'];
const no_menu = ['/dashboard','/forget','/login','/logout','/registro'];
const menu_web = ['/','/Home','/nosotros','/productos','/contacto'];

const router = async (hash,url_mod,url404) =>{consoleLocal('log','hash=>'+hash);
    const pages = [].concat(menu_web,no_menu);
    if(hash!=''){let v1=0;
      for(let i=0;i<pages.length;i++){
        var ps = '#' + pages[i];
        if(hash==ps){v1=1;break;}
      }consoleLocal('log',hash+'='+ps);
      if(v1==1){
        getRoutes(hash,url_mod,routes_session);
      }else{
        getRoutes(hash,url404,routes_session);
        console.error('Error 404: La página No existe');
      }
    }
};

function controlRoutes(route){ consoleLocal('log','route='+route);
  if(route=='login/index'){login();}
  if(route=='logout/index'){logout();}
  if(route=='dashboard/index'){dashboard();}
}

export {no_menu,router,controlRoutes};