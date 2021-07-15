import {vars} from '../app/lib.js';
import { getRoutes } from "../app/functions.js";
///import {pages} from '../controllers/index';

const {url404} = vars();

const no_menu = ['dashboard','forget','login','logout','registro'];
const menu_web = ['Home','nosotros','productos','contacto'];
const pages = ['#/','#/nosotros','#/productos','#/contacto','#/dashboard','#/forget','#/login','#/logout','#/registro'];

let content = document.getElementById('app-modulo');
const router = async (route,url_mod) =>{console.log('route='+route);
    if(route!=''){//console.log(route);     
        let v1=0;
        for(let i=0;i<pages.length;i++){
            var r = pages[i];console.log(route+'='+r);
            if(route==r){v1=1;break;}
        }
        if(v1==1){getRoutes(url_mod);}else{getRoutes(url404);}
    }else{window.location.href='#/';}
};

export {router,no_menu};