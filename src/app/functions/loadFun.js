import { loadCssJsMod } from "../hooks/loadCssJs.route";
import { sesionActiva } from "../services/firebase";
import { registrosApp } from "./registros";
import { footer, pages, tooltips } from "../functions";
import { mx } from "./htmx.man";

export const loadFunctions = async (v) => {
    //loadCssJsMod(v);
    /* EXPLORAR REGISTROS PARA MANDRAGORA PENDIENTE */
    registrosApp(v);
    pages(v);
    setTimeout(() => { sesionActiva(v); }, 0);
    setTimeout(() => { mx(); tooltips(); }, 1000);
    if (v.mod != 'dashboard') { footer(); }
};