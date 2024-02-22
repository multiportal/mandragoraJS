const {host} = window.location;
/*VARIABLES DE ENTORNO*/
export const title = 'MandragoraJS SPA';
//export const proyecto = 'mandragoraJS'; //PROYECTO
export const typeBack = 'firebase'; //firebase / api
export const path_hash = '#/'; //PATH HASH
export const path_src = 'src/'; //PATH RESOURCE 
export const path_page = path_src + 'pages/'; //PATH PAGE
export const typeDev = 'vite'; //vite or webpack
export const hostDev = (typeDev == 'vite') ? 'localhost:5173' : 'localhost:9001';
export const hostPre = 'localhost';//(typeDev == 'vite') ? '127.0.0.1:4173' : 'localhost';
/* URL-API */ //https://apirestm.000webhostapp.com/api //
console.log(host+'=='+hostDev,host+'=='+hostPre);
export const Api = (host==hostDev || host==hostPre)?'http://localhost/MisSitios/apirestm/api':'https://apirestm.000webhostapp.com/api';
console.warn('Api='+Api);
export const apiVer = Api + '/v2/api_version';/* URL-VERSION */
/* */
export const api_links = Api + '/v2/links/';/* URL-LINKS */