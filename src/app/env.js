/*VARIABLES DE ENTORNO*/
export const title = 'MandragoraJS SPA';
export const proyecto = 'mandragoraJS'; //PROYECTO
export const path_hash = '#/'; //path_hash
export const path_src = 'src/'; //RESOURCE PATH
export const path_page = path_src + 'pages/'; //PAGE PATH
export const typeDev = 'vite'; //vite or webpack
export const hostDev = (typeDev == 'vite') ? '127.0.0.1:5173' : 'localhost:9001';
export const hostPre = (typeDev == 'vite') ? '127.0.0.1:4173' : 'localhost';