import { pages } from "./pages";
import { pagesSys } from "./pages-sys";
import NotFound from "../pages/404/index.html";

//const no_menu_web = ['/dashboard', '/forget', '/login', '/logout', '/registro'];//Out menu web
//const menu_web = ['/', '/Home', '/nosotros', '/productos', '/contacto'];//pages for menu web

export default (page) => {
  const pagesAll = {...pages, ...pagesSys}//console.log('pagesAll:',pagesAll);
  var views = pagesAll[page]; console.log('views:',views);
  views = (views == undefined) ? NotFound : views; //console.log(page+'=>',views);
  const divElement = document.createElement('div');
  divElement.innerHTML = views;
  return divElement;
}