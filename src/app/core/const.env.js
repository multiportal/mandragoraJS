const {host} = window.location;
/*VARIABLES DE ENTORNO*/
export const title = 'Vcard';
//export const proyecto = 'mandragoraJS'; //PROYECTO
export const typeBack = 'firebase'; //firebase / api
export const path_hash = '#/'; //PATH HASH
export const path_src = 'src/'; //PATH RESOURCE 
export const path_page = path_src + 'pages/'; //PATH PAGE
export const typeDev = 'vite'; //vite or webpack
export const hostDev = (typeDev == 'vite') ? 'localhost:5173' : 'localhost:9001';
export const hostPre = 'localhost';//(typeDev == 'vite') ? '127.0.0.1:4173' : 'localhost';
/* URL-API */ //https://apirestm.000webhostapp.com/api //
export const Api = (host==hostDev || host==hostPre)?'http://localhost/MisSitios/apirestm/api':'https://apirestm.000webhostapp.com/api';
export const apiVer = Api + '/v2/api_version';/* URL-VERSION */
/* */
export const api_links = Api + '/v2/links/';/* URL-LINKS */
console.log(host+'=='+hostDev,host+'=='+hostPre);
console.warn('Api='+Api);
if(typeBack!='firebase'){
}
