import { pages } from "./pages";
import { pagesSys } from "./pages-sys";
import NotFound from "../pages/404/index.html";

export default (page) => {
  const pagesAll = {...pages, ...pagesSys}//console.log('pagesAll:',pagesAll);
  var views = pagesAll[page];
  views = (views == undefined) ? NotFound : views; //console.log(page+'=>',views);
  const divElement = document.createElement('div');
  divElement.innerHTML = views;
  return divElement;
}