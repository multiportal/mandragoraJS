import { urlVariables, filename } from "../functions";
import { proyect } from "./constants";

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
  const page_name = filename();
  //
  const { mod, ext, id } = urlVariables(hash);
  const path_base = host == 'localhost' ? 'MisSitios/' : '';
  const path_host = host.includes("github.io") ? proyect + '/' : '';
  const path_root = path_base + path_host;
  const page_url = dominio + path_root;//

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
    page_name,
    mod,
    ext,
    id,
    path_base,
    path_root,
    page_url,
    path_host,
    proyect
  };
}
