import { consoleLocal, getRoutesSesion, capitalize } from "../app/functions.js";
import Pages from "../controllers/index.js";
import { pages, pagesSys } from "../controllers/pages.js";
import { login } from "../controllers/login.js";
import { logout } from "../controllers/logout.js";
import { dashboard } from "../controllers/dashboard.js";

const router = async (hash, hash2, mod, ext) => {
  consoleLocal('log','hash=>' + hash);
  let ext2 = (ext!='index')?' / '+capitalize(ext):'';
  document.title = 'MandragoraJS SPA - ' + capitalize(mod) + ext2;
  getRoutesSesion(mod);
  let page = (mod!='Home' && ext!='index')?ext:mod;// console.log(page,mod,ext);
  let content = document.getElementById('app-modulo');
  content.innerHTML = '';
  if(hash){
    return content.appendChild(Pages(page));
  }
}

//Functions for Controllers JS
function controlRoutes(route,mod,ext,id){ consoleLocal('log','route='+route);
  if(route=='login/index'){login();}
  if(route=='logout/index'){logout();}
  if(route=='dashboard/index' || mod=='dashboard'){dashboard();}
}

export { router,controlRoutes,pages,pagesSys };