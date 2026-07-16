import { consoleLocal, router } from '../app/functions.js';
import { loading } from '../app/hooks/loadScripts.js';
import { variables } from '../app/core/lib.js';
import { login } from '../app/auth/sys/login/login.js';
import { logout } from '../app/auth/sys/logout/logout.js';
import { home } from '../pages/Home/home.js';
import { nosotros } from '../pages/nosotros/nosotros.js';
import { productos } from '../pages/productos/productos.js';
import { contacto } from '../pages/contacto/contacto.js';
import { notFound } from "../pages/404/404.js";
/**COMPONENTS**/
import { menu } from '../components/menu/menu.js';
//import { sidebar } from '../components/sidebar/sidebar.js';

/* ==========================
   RUTAS
========================== */
const compose = (...fns) => async () => {
    const results = await Promise.all(fns.map(fn => fn()));
    return results.join("");
};

export const routes = {
    'Home': compose(menu, home),
    'nosotros': compose(menu, nosotros),
    'productos': compose(menu, productos),
    'contacto': compose(menu, contacto),
    'login': login,
    'logout': logout,
    '404': compose(menu, notFound)
};

/* ==========================
   NAVEGACIÓN
========================== */
export function navigate(h) {
    const Token = localStorage.getItem('Token'); consoleLocal('log','Token navigate:'+ Token);
    h = (!Token && h == '#/dashboard') ? '#/noauth' : h;
    console.log('Path navigate:', h);
    history.pushState({}, "", h);
    const v = variables(); console.log('Variables navigate:', v);
    router(v);
    if (h == '') {
        window.location.href = '#/';
        loading();
    }
}