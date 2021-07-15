import {vars} from '../app/lib.js';
import { getRoutes } from "../app/functions.js";

const {url404} = vars();
const no_menu = ['#/dashboard','#/forget','#/login','#/logout','#/registro'];
const menu_web = ['#/','#/Home','#/nosotros','#/productos','#/contacto'];
const pages = [].concat(menu_web,no_menu);//console.log(pages);

let content = document.getElementById('app-modulo');
const router = async (hash,url_mod) =>{console.log('hash=>'+hash);
    if(hash!=''){//console.log(route);     
        let v1=0;
        for(let i=0;i<pages.length;i++){
            var r = pages[i];console.log(hash+'='+r);
            if(hash==r){v1=1;break;}
        }
        if(v1==1){getRoutes(url_mod);}else{getRoutes(url404);}
    }else{window.location.href='#/';}
};

export {router,no_menu};