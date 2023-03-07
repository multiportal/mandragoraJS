import { consoleLocal, getRoutesSesion, capitalize } from "../app/functions";
import Pages from "../app/controllers/index";
import { pages, pagesSys, privatePage } from "../app/controllers/pages";
import { login } from "../app/controllers/login";
import { logout } from "../app/controllers/logout";
import { dashboard } from "../app/controllers/dashboard";
import { links } from "../app/controllers/links";
import { linksAdd } from "../app/controllers/link-add";
import { linksEdit } from "../app/controllers/link-edit";

const router = (hash, hash2, mod, ext) => {
  consoleLocal('log','hash=>' + hash);
  let ext2 = (ext!='index')?' / '+capitalize(ext):'';
  document.title = 'MandragoraJS SPA - ' + capitalize(mod) + ext2;
  getRoutesSesion(mod,privatePage);
  let page = (mod!='Home' && ext!='index')?ext:mod;// console.log(page,mod,ext);
  let content = document.getElementById('app');
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