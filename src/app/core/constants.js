//import { envConfig } from "../functions/envConfig";
//const { environments } = await envConfig();
import { environments } from './env.config';
//console.log('ENV', environments);
/* ==========================
   CONSTANTES 
========================== */
export const MODE = 'SPA';
export const modeH = false;//New
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
/*
Para utilizar Service Worker en Develop poner "true" 
Nota: Asegurese de configurar manifest.json*
*/
export const activeDevelop = false;
/* AUTH */
export const emailAuth = ['memo.wikitek@gmail.com', 'memojl08@gmail.com'];
export const nivelAuth = 'N-1';
export const nivelesAuth = ['N-1', 'N1', 'N2', 'N3', 'N4', 'default'];
//SEVER
const { host } = window.location;
console.warn("SERVER:", { entorno, host });