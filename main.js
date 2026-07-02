/* 
CMS-Javascript (spa) 
Autor: Guillermo Jiménez López
Fecha de Actualización: 26.06.2026
Versión: 0.0.1 - MandragoraJS - Vite
Notas: 
*/
//Files import for App
import './public/assets/bootstrap-5.0.2/css/bootstrap.min.css';
import './public/assets/css/dashboard.css'; //** 3 WARNINGS IN WEBPACK FOR BUILD -->ADD DOM */
import './public/assets/font-awesome-5.14.0/css/all.min.css';
import './public/assets/css/style.css';
import './public/assets/css/load.css';
import './public/assets/js/jquery-3.3.1.slim.min.js';
import './public/assets/bootstrap-5.0.2/js/bootstrap.bundle.min.js';
//import './public/assets/js/sweetalert2.all.min.js';
//import './public/assets/pwa/sw.js'; //SERVICE WORKER
import './public/assets/pwa/appCon.js';
//Import Functions JS for App
import { load } from "./src/app/functions.js";
//Functions Application
setTimeout(load(), 0);
