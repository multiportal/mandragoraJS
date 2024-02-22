import { consoleLocal, router, controlLoading} from "../app/functions";
import { pages, pagesSys } from "../app/controllers/pages";
import { login } from "../app/controllers/login";
import { logout } from "../app/controllers/logout";
import { dashboard } from "../app/controllers/dashboard";
//import { cssLoadMod } from "./css.routes";
import { links } from "../pages/links/links";
import { linksAdd } from "../pages/links/link-add";
import { linksEdit } from "../pages/links/link-edit";
//import Home from "../app/pages/home/home";

//Functions for Controllers JS
function controlRoutes(v){ 
  const {route,mod,id,base_url} = v;consoleLocal('log','route='+route);
  //if(mod){cssLoadMod(mod,base_url);controlLoading();}
  //if(route=='Home/index'){Home();}
  if(route=='login/index'){login();}
  if(route=='logout/index'){logout();}
  if(route=='dashboard/index' || (mod=='dashboard' || mod=='links')){dashboard();}
  if(route=='links/index'){links();}
  if(route=='links/linksAdd'){linksAdd();}
  if(route=='links/linksEdit'){linksEdit(id);}
}

export { controlRoutes,router,pages,pagesSys };