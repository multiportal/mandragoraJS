/**PAGES SYSTEM**/
import dashboard from "../../pages/dashboard/index.html?raw";
import settings from "../../pages/dashboard/settings.html?raw";
import forget from "../../pages/forget/index.html?raw";
import login from "../../pages/login/index.html?raw";
import logout from "../../pages/logout/index.html?raw";
import register from "../../pages/registro/index.html?raw";
import noauth from "../../pages/noauth/index.html?raw";
import links from "../../pages/links/index.html?raw";
import linksAdd from "../../pages/links/add.html?raw";
import linksEdit from "../../pages/links/edit.html?raw";

/**COMPONENTS**/
import menu from "../../components/menu.html?raw";
import sidebar from "../../components/sidebar.html?raw";
/**PAGES**/
import Home from "../../pages/Home/index.html?raw";
import nosotros from "../../pages/nosotros/index.html?raw";
import productos from "../../pages/productos/index.html?raw";
import categorias from "../../pages/productos/categorias.html?raw";
import contacto from "../../pages/contacto/index.html?raw";

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

export const pagesAll = {
  ...pages, 
  ...pagesSys
};//console.log('pagesAll:',pagesAll);

export const privatePage = [
  'dashboard',
  'links'
];

export const menuPages = {
  dash:{
    txt:'Dashboard',
    icon:'fas fa-tachometer-alt'
  },
  tarjetas:{
    txt:'Mis tarjetas',
    icon:'far fa-address-card'
  },
  empresas:{
    txt:'Mis empresas',
    icon:'fas fa-industry'
  }
}