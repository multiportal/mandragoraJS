/* 
CMS-Javascript (spa) 
Autor: Guillermo Jiménez López
Fecha de Actualización: 15.07.2021
Versión: 1.0.1
*/
//import './assets/bootstrap-5.0.2/css/bootstrap.min.css';
import './assets/bootstrap-5.0.2/js/bootstrap.bundle.min.js';
import {consola} from './app/console.js';
import {inicio,variables} from './app/lib.js';
import {} from './app/functions.js';
import {} from './routes/index.routes.js';


window.addEventListener('hashchange',()=>{
    const v = variables();
    const {fecha,hash,URL} = v;
    
    console.log(consola(v));
});

inicio();
