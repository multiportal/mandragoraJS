export const environments = {
  name: "MandragoraJS",
  version: "1.1.5",
  description: "MandragoraJS - Single Page Application",  
  start_url: import.meta.env.VITE_START_URL,
  lang: "es-MX",
  api: "https://api.midominio.com",
  empresa: "Multiportal",
  entorno: import.meta.env.VITE_ENV_ENTORNO,
  prefix: import.meta.env.VITE_ENV_PREFIX,
  key: "",
  firebase: JSON.parse(import.meta.env.VITE_FIREBASE),
  emailjs: JSON.parse(import.meta.env.VITE_ENV_EMAILJS)
};
