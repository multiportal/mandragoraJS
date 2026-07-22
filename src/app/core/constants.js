import { envConfig } from "../hooks/envConfig";
const { environments } = await envConfig();
/* ==========================
   CONSTANTES 
========================== */
export const app = document.querySelector("#app");
export const body = document.getElementsByTagName("body")[0];
export const name = environments?.name;
export const version = environments?.version;
export const entorno = environments?.entorno;
export const prefix = environments?.prefix;
export const Api = environments?.api;
export const KEY = environments?.key;
export const FirebaseCfg = environments?.firebase;
export const EmailjsCfg = environments?.emailjs;
export const theme = 'links';
export const proyect = 'mandragoraJS';
export const typeDev = 'vite'; 
export const hostDev = (typeDev == 'vite') ? 'localhost:5173' : 'localhost:9001';
export const hostPre = 'localhost';