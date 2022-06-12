/**PAGES SYSTEM**/
import dashboard from "../pages/dashboard/index.html";
import settings from "../pages/dashboard/settings.html";
import forget from "../pages/forget/index.html";
import login from "../pages/login/index.html";
import logout from "../pages/logout/index.html";
import register from "../pages/registro/index.html";
import noauth from "../pages/noauth/index.html";
/**COMPONENTS**/
import menu from "../components/menu.html";
import sidebar from "../components/sidebar.html";
/**PAGES**/
import Home from "../pages/Home/index.html";
import nosotros from "../pages/nosotros/index.html";
import productos from "../pages/productos/index.html";
import categorias from "../pages/productos/categorias.html";
import contacto from "../pages/contacto/index.html";

export const pages = {
  Home: Home,
  nosotros: nosotros,
  productos: productos,
  categorias: categorias,
  contacto: contacto
};

export const pagesSys = {
  dashboard: sidebar+dashboard,
  settings: sidebar+settings,
  forget: forget,
  login: login,
  logout: logout,
  registro: register,
  noauth: noauth
};
