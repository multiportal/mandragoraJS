import { consoleLocal } from "../app/functions";
import Pages from "../controllers/index";

let content = document.getElementById('app-modulo');

const no_menu_web = ['/dashboard', '/forget', '/login', '/logout', '/registro'];//Out menu web
const menu_web = ['/', '/Home', '/nosotros', '/productos', '/contacto'];//pages for menu web

const router = async (hash, hash2) => {
  console.log('hash=>' + hash);
  content.innerHTML = '';
  const pages = [].concat(menu_web, no_menu_web);//console.log(pages);
  
  if (hash != '') {
    let ps = 0;
    for (let i = 0; i < pages.length; i++) {
      var hashPages = '#' + pages[i];
      if (hash2 == hashPages) { ps = 1; break; }
    } consoleLocal('info', 'infoInicial:' + hash + '=>' + hashPages);
    let page = hashPages.replace('#/','');
    //console.log('Function:',page);
    if (ps == 1) {
      content.appendChild(Pages(page));//Exist page
      console.log('INFO:' + hash2 + '=>' + hashPages);
    } else {
      //Not page exist
      console.error('Error 404: La página No existe!');
    }
  }

}

export { router };