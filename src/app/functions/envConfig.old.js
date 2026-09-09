/* ==========================
   ENV CONGIGURACIÓN
========================== */
const MODE = {
    LOCAL: "local",
    DEVELOP: "develop",
    QA: "qa",
    PRODUCTION: "production",
};

// Registra todos los archivos environments*.js
const modules = import.meta.glob("/src/environments/*.js");

export async function envConfig() {
    const { host } = window.location;

    let envMode = MODE.PRODUCTION;

    switch (host) {
        case "localhost":
            envMode = MODE.LOCAL;
            break;

        case "localhost:5173":
            envMode = MODE.DEVELOP;
            break;

        case "multiportal.github.io":
            envMode = MODE.QA;
            break;
    }

    console.warn("SERVER:", { envMode, host });

    const path = `/src/environments/environments.${envMode}.js`;

    const loadModule = modules[path] ?? modules["/src/environments/environments.js"];

    if (typeof loadModule !== "function") {
        console.error("NO SE ENCONTRÓ NINGÚN ARCHIVO DE CONFIGURACIÓN (environments).");
    } else {
        if (!modules[path]) {
            console.warn(`No existe environments.${envMode}.js`);
        }
    }

    const config = (typeof loadModule !== "function") ? {} : await loadModule();

    return config.default ?? config;
}