import { consoleLocal } from "../app/functions";
import Pages from "../controllers/index";

const router = async (hash, hash2, mod, ext) => {
  consoleLocal('log','hash=>' + hash);
  let page = (mod!='Home' && ext!='index')?ext:mod;//console.log(page,mod,ext);
  let content = document.getElementById('app-modulo');
  content.innerHTML = '';
  if(hash){
    return content.appendChild(Pages(page));
  }
}

export { router };