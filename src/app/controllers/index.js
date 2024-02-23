import { getModules } from "../functions";
import { pagesAll } from "./pages";
import NotFound from "../sys/404/index.html?raw";

export default (page) => {
  //const pagesAll = {...pages, ...pagesSys}//console.log('pagesAll:',pagesAll);
  var views = pagesAll[page];
  views = (views == undefined) ? NotFound : views; //console.log(page+'=>',views);
  return getModules(views);
}