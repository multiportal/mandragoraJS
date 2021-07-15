//import { } from '../app/lib.js';
//import { } from "../app/functions.js";

const routes_session = ['#/dasboard'];
const no_menu = ['#/dashboard','#/forget','#/login','#/logout','#/registro'];
const menu_web = ['#/','#/Home','#/nosotros','#/productos','#/contacto'];

const router = async (hash,url_mod) =>{console.log('hash=>'+hash);
    const pages = [].concat(menu_web,no_menu);

};

export {router,no_menu};