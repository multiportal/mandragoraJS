import { getModules } from "./../functions/main";
import { pages, pagesSys } from "./pages";
import NotFound from "./../../pages/404/index.html";

export default (page) => {
  const pagesAll = {...pages, ...pagesSys}; console.log('pagesAll:',pagesAll);
  var views = pagesAll[page];
  views = (views == undefined) ? NotFound : views; console.log(page+'=>',views);
  return getModules(views);
}