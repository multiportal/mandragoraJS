export const environments = {
  name: "MandragoraJS",
  version: "1.1.6",
  description: "MandragoraJS - Single Page Application",  
  start_url: import.meta.env.VITE_START_URL,
  lang: "es-MX",
  api: "https://api.midominio.com",
  empresa: "Multiportal",
  key: "",
  entorno: import.meta.env.VITE_ENV_ENTORNO,
  prefix: import.meta.env.VITE_ENV_PREFIX,
  emailAuth: import.meta.env.VITE_ENV_EMAILAUTH,
  codiPlan: import.meta.env.VITE_ENV_CODIPLAN,
  nivelAuth: import.meta.env.VITE_ENV_NIVELAUTH,
  nivelesRolesAuth: JSON.parse(import.meta.env.VITE_ENV_NIVELESROLESAUTH),
  firebase: JSON.parse(import.meta.env.VITE_FIREBASE),
  emailjs: JSON.parse(import.meta.env.VITE_ENV_EMAILJS)
};
