/**PAGES SYSTEM**/
import dashboard from "../pages/dashboard/index.html";
import settings from "../pages/dashboard/settings.html";
import forget from "../pages/forget/index.html";
import login from "../pages/login/index.html";
import logout from "../pages/logout/index.html";
import register from "../pages/registro/index.html";
import noauth from "../pages/noauth/index.html";
import links from "../pages/links/index.html";
import linksAdd from "../pages/links/add.html";
import linksEdit from "../pages/links/edit.html";

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
  Home: menu+Home,
  nosotros: menu+nosotros,
  productos: menu+productos,
  categorias: menu+categorias,
  contacto: menu+contacto
};

export const pagesSys = {
  dashboard: sidebar+dashboard,
  settings: sidebar+settings,
  forget: forget,
  login: login,
  logout: logout,
  registro: register,
  noauth: noauth,
  links: sidebar+links,
  linksAdd: sidebar+linksAdd,
  linksEdit: sidebar+linksEdit,
};

export const privatePage = [
  'dashboard',
  'links'
];