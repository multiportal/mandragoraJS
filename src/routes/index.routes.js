import { consoleLocal } from "../app/functions";
import Pages from "../controllers/index";
import { pages } from "../controllers/pages";
import { pagesSys } from "../controllers/pages-sys";
import { login } from "../controllers/login.js";
import { logout } from "../controllers/logout.js";
import { dashboard } from "../controllers/dashboard.js";

const router = async (hash, hash2, mod, ext) => {
  consoleLocal('log','hash=>' + hash);
  let page = (mod!='Home' && ext!='index')?ext:mod;//console.log(page,mod,ext);
  let content = document.getElementById('app-modulo');
  content.innerHTML = '';
  if(hash){
    return content.appendChild(Pages(page));
  }
}

//Functions for Controllers JS
function controlRoutes(route,id){ consoleLocal('log','route='+route);
  if(route=='login/index'){login();}
  if(route=='logout/index'){logout();}
  if(route=='dashboard/index'){dashboard();}
  //if(route=='profile/index'){profile();}
}

export { router,controlRoutes,pages,pagesSys };