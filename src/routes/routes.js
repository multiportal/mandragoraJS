import { router, loading } from '../app/functions.js';
import { variables } from '../app/core/lib.js';
import Home from '../pages/Home/index.html?raw';
import login from '../app/auth/sys/login/index.html?raw';
import notFound from '../app/auth/sys/404/index.html?raw';
/**COMPONENTS**/
import menu from '../components/menu/index.html?raw';


/* ==========================
   RUTAS
========================== */
/*const compose = (...fns) => async () => {
    const results = await Promise.all(fns.map(fn => fn()));
    return results.join("");
};*/
const compose = (...fns) => () => fns.map(fn => fn).join("");

export const routes = {
    'Home': compose(menu, Home),
    /*
    'productos': compose(menu, productos),
    'productos/articulo': compose(menu, articulo),
    'registro': register,*/
    'login': compose(login),
    /*'logout': logout,
    'noauth': compose(menu, noauth),
    'dashboard': compose(sidebar, dashboard),
    'dashboard/settings': compose(sidebar, settingsDashboard),
    'dashboard/profile': compose(sidebar, profileDashboard),
    'dashboard/links': compose(sidebar, linksDashboard),
    'dashboard/products': compose(sidebar, productsDashboard),
    */
    '404': compose(menu, notFound)

};

/* ==========================
   NAVEGACIÓN
========================== */
export function navigate(h) {
    console.log('Path navigate:', h);
    /*
    const Token = localStorage.getItem('Token');
    if (!Token && path.includes("dashboard")) {
      renderPage('/noauth');
      return;
    }
    renderPage(path);
    */
   const v = variables();
    router(h, v);
    if (h == '') {
        window.location.href='#/';
        loading();
    }
}