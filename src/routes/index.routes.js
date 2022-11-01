import { consoleLocal, getRoutesSesion, capitalize } from "../app/functions.js";
import Pages from "../controllers/index.js";
import { pages, pagesSys, privatePage } from "../controllers/pages.js";
import { login } from "../controllers/login.js";
import { logout } from "../controllers/logout.js";
import { dashboard } from "../controllers/dashboard.js";
import { links } from "../controllers/links.js";
import { linksAdd } from "../controllers/link-add.js";
import { linksEdit } from "../controllers/link-edit.js";

const router = async (hash, hash2, mod, ext) => {
  consoleLocal('log','hash=>' + hash);
  let ext2 = (ext!='index')?' / '+capitalize(ext):'';
  document.title = 'MandragoraJS SPA - ' + capitalize(mod) + ext2;
  getRoutesSesion(mod,privatePage);
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
  if(route=='dashboard/index' || (mod=='dashboard' || mod=='links')){dashboard();}
  if(route=='links/index'){links();}
  if(route=='links/linksAdd'){linksAdd();}
  if(route=='links/linksEdit'){linksEdit(id);}
}

export { router,controlRoutes,pages,pagesSys };