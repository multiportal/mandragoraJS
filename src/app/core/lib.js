import { urlVariables } from './../functions.js';
import { theme } from "./constants";

/* ==========================
   VARIABLES
========================== */
export function variables() {
    /*VARIABLES SYS*/
    const w = window;
    const d = document;
    const loc = w.location;
    const dt = new Date();
    const day = String(dt.getDate()).padStart(2, "0");
    const mon = String(dt.getMonth() + 1).padStart(2, "0");
    const year = dt.getFullYear();
    const fecha = `${year}-${mon}-${day}`;
    const screenw = screen.width;
    const screenh = screen.height;

    /*CONSTANTES */
    const { protocol, host, origin, pathname, hash, href, search } = loc;
    const dominio = origin + '/';
    const URL = href;
    const quest = search; // [OBSOLETA] -> Obtención del valor de las variable ej. ?mod=producto&ext=cate
    const path_url = pathname.replace("/", "");
    //
    const { mod, ext, id } = urlVariables(hash);
    const path_root = host == 'localhost' ? `/MisSitios/${theme}` : '';
    const page_url = origin + path_root;//

    return {
        w,
        d,
        loc,
        dt,
        day,
        mon,
        year,
        fecha,
        screenw,
        screenh,
        protocol,
        host,
        origin,
        pathname,
        hash,
        href,
        search,
        dominio,
        URL,
        quest,
        path_url,
        mod,
        ext,
        id,
        path_root,
        page_url
    };
}

