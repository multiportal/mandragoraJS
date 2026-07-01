/* 
CMS-Javascript (spa) 
Autor: Guillermo Jiménez López
Fecha de Actualización: 26.06.2026
Versión: 0.0.1 - MandragoraJS - Vite
Notas: 
*/
//Files import for App
import './publicDir/assets/bootstrap-5.0.2/css/bootstrap.min.css';
import './publicDir/assets/css/dashboard.css'; //** 3 WARNINGS IN WEBPACK FOR BUILD -->ADD DOM */
import './publicDir/assets/font-awesome-5.14.0/css/all.min.css';
import './publicDir/assets/css/style.css';
import './publicDir/assets/css/load.css';
import './publicDir/assets/js/jquery-3.3.1.slim.min.js';
import './publicDir/assets/bootstrap-5.0.2/js/bootstrap.bundle.min.js';
//import './publicDir/assets/js/sweetalert2.all.min.js';
//import './publicDir/assets/pwa/sw.js'; //SERVICE WORKER
import './publicDir/assets/pwa/appCon.js';
//Import Functions JS for App
import { load } from "./src/app/functions.js";
//Functions Application
setTimeout(load(), 0);
