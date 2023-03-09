const {host} = window.location;
/*VARIABLES DE ENTORNO*/
export const title = 'MandragoraJS SPA';
export const proyecto = 'mandragoraJS'; //PROYECTO
export const path_hash = '#/'; //PATH HASH
export const path_src = 'src/'; //PATH RESOURCE 
export const path_page = path_src + 'pages/'; //PATH PAGE
export const typeDev = 'vite'; //vite or webpack
export const hostDev = (typeDev == 'vite') ? '127.0.0.1:5173' : 'localhost:9001';
export const hostPre = (typeDev == 'vite') ? '127.0.0.1:4173' : 'localhost';
/* URL-API */
export const Api = (host!=hostPre)?'https://apirestm.webcindario.com/api':'http://localhost/MisSitios/apirestm/api';
export const api_links = Api + '/v2/links/';/* URL-LINKS */