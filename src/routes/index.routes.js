//import { } from '../app/lib.js';
import { getRoutes,consoleLocal } from "../app/functions.js";
import { login } from "../controllers/login.js";
import { logout } from "../controllers/logout.js";
import { dashboard } from "../controllers/dashboard.js";

const routes_session = ['/dashboard'];
const no_menu_web = ['/dashboard','/forget','/login','/logout','/registro'];//Out menu web
const menu_web = ['/','/Home','/nosotros','/productos','/contacto'];//pages for menu web

//Router & hash
const router = async (hash,hash2,url_mod,url404) =>{consoleLocal('log','hash=>'+hash);
    const pages = [].concat(menu_web,no_menu_web);
    if(hash!=''){let v1=0;
      for(let i=0;i<pages.length;i++){
        var ps = '#' + pages[i];
        if(hash2==ps){v1=1;break;}
      }consoleLocal('info',hash2+'='+ps);
      if(v1==1){
        getRoutes(hash,url_mod,routes_session);//Exist page
      }else{
        getRoutes(hash,url404,routes_session);//Not exist page
        console.error('Error 404: La página No existe');
      }
    }
};

//Functions for Controllers JS
function controlRoutes(route,id){ consoleLocal('log','route='+route);
  if(route=='login/index'){login();}
  if(route=='logout/index'){logout();}
  if(route=='dashboard/index'){dashboard();}
  //if(route=='profile/index'){profile();}
}

export {no_menu_web,menu_web,routes_session,router,controlRoutes};