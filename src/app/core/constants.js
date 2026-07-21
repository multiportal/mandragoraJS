import { envConfig } from "../hooks/envConfig";
const { environments } = await envConfig();
/* ==========================
   CONSTANTES 
========================== */
export const app = document.querySelector("#app");
export const body = document.getElementsByTagName("body")[0];
export const name = environments.name;
export const version = environments.version;
export const entorno = environments.entorno;//(host == 'localhost:5173') ? 'Desarrollo' : environments.entorno;
export const prefix = environments.prefix;
export const KEY = environments.key;
export const FirebaseCfg = environments.firebase;
export const theme = 'links';
export const proyect = 'mandragoraJS';
export const typeDev = 'vite'; //vite or webpack
export const hostDev = (typeDev == 'vite') ? 'localhost:5173' : 'localhost:9001';
export const hostPre = 'localhost';//(typeDev == 'vite') ? '127.0.0.1:4173' : 'localhost';