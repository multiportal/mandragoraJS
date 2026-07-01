import { loading, renderPage } from "../app/functions.js";
import { dashboard } from "../app/auth/dashboard/dashboard.js";
import { profileDashboard } from "../app/auth/dashboard/profile.js"
import { settingsDashboard } from "../app/auth/dashboard/settings.js"
import { linksDashboard } from "../app/auth/dashboard/links/links.js"
import { productsDashboard } from "../app/auth/dashboard/products/products.js"
import { register } from "../app/auth/register/register.js";
import { login } from "../app/auth/login/login.js";
import { logout } from "../app/auth/logout/logout.js";
import { noauth } from "../app/auth/noauth/noauth.js";
import { home } from "../app/pages/Home/home.js";
import { productos } from "../app/pages/productos/productos.js";
import { articulo } from "../app/pages/productos/articulo/articulo.js";
import { notFound } from "../app/pages/404/404.js";
/**COMPONENTS**/
import { menu } from "../app/components/menu/menu.js";
import { sidebar } from "../app/components/sidebar/sidebar.js";

/* ==========================
   RUTAS
========================== */
const compose = (...fns) => async () => {
  const results = await Promise.all(fns.map(fn => fn()));
  return results.join("");
};

export const routes = {
  'home': compose(menu, home),
  'productos': compose(menu, productos),
  'productos/articulo': compose(menu, articulo),
  'registro': register,
  'login': login,
  'logout': logout,
  'noauth': compose(menu, noauth),
  'dashboard': compose(sidebar, dashboard),
  'dashboard/settings': compose(sidebar, settingsDashboard),
  'dashboard/profile': compose(sidebar, profileDashboard),
  'dashboard/links': compose(sidebar, linksDashboard),
  'dashboard/products': compose(sidebar, productsDashboard),
  '404': compose(menu, notFound),
};

/* ==========================
   NAVEGACIÓN
========================== */
export function navigate(path = "/home") {
  console.log('Path navigate:', path);
  const Token = localStorage.getItem('Token');
  if (!Token && path.includes("dashboard")) {
    renderPage('/noauth');
    return;
  }
  renderPage(path);
  if(path=='/'){
    loading();
  }
}
