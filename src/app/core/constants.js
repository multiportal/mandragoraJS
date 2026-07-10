import { environments } from "../../environments/environments";
/* ==========================
   CONSTANTES 
========================== */
export const app = document.querySelector("#app");
export const name = environments.name;
export const version = environments.version;
export const prefix = environments.prefix;
export const KEY = environments.key;
export const theme = 'links';
export const proyect = 'mandragoraJS';
export const typeDev = 'vite'; //vite or webpack
export const hostDev = (typeDev == 'vite') ? 'localhost:5173' : 'localhost:9001';
export const hostPre = 'localhost';//(typeDev == 'vite') ? '127.0.0.1:4173' : 'localhost';