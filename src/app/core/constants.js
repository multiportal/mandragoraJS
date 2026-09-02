//import { envConfig } from "../functions/envConfig";
//const { environments } = await envConfig();
import { environments } from './env.config';
const { host } = window.location;
//console.log('ENV', environments);
/* ==========================
   CONSTANTES 
========================== */
export const MODE = 'SPA';
export const HASH = false;//New [HASH => true | SPA => false] 
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
export const hostDev = host.includes('localhost');
export const hostPre = 'localhost';
/* AUTH */
export const emailAuth = environments?.emailAuth;
export const codiPlanStandar = environments?.codiPlan;
export const nivelAuth = environments?.nivelAuth;
export const nivelesRolesAuth = environments?.nivelesRolesAuth;
/*
Para utilizar Service Worker en Develop poner "true" 
Nota: Asegurese de configurar manifest.json*
*/
export const activeDevelop = false;
/* SERVER */
const env = hostDev ? environments : '';
console.warn("SERVER:", { entorno, host, env });