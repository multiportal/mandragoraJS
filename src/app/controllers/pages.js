/**PAGES SYSTEM**/
import forget from "../sys/forget/index.html?raw";
import login from "../sys/login/index.html?raw";
import logout from "../sys/logout/index.html?raw";
import noauth from "../sys/noauth/index.html?raw";
import register from "../sys/register/index.html?raw";
/**PAGES AUTH**/
import dashboard from "../auth/dashboard/index.html?raw";
import settings from "../auth/dashboard/settings.html?raw";
import profile from "../auth/dashboard/profile.html?raw";
import links from "../../pages/links/index.html?raw";
import linksAdd from "../../pages/links/add.html?raw";
import linksEdit from "../../pages/links/edit.html?raw";
/**PAGES**/
import Home from "../../pages/Home/index.html?raw";
import nosotros from "../../pages/nosotros/index.html?raw";
import productos from "../../pages/productos/index.html?raw";
import categorias from "../../pages/productos/categorias.html?raw";
import contacto from "../../pages/contacto/index.html?raw";
/**COMPONENTS**/
import menu from "../../components/menu/index.html?raw";
import sidebar from "../../components/sidebar/index.html?raw";

export const pagesAuth = [
  'dashboard',
  'perfil',
  'links'
];

export const pagesSys = {
  forget: forget,
  login: login,
  logout: logout,
  noauth: noauth,
  registro: register,
  dashboard: sidebar+dashboard,
  settings: sidebar+settings,
  perfil: sidebar+profile,
  links: sidebar+links,
  linksAdd: sidebar+linksAdd,
  linksEdit: sidebar+linksEdit,
};

export const pages = {
  Home: menu+Home,
  nosotros: menu+nosotros,
  productos: menu+productos,
  categorias: menu+categorias,
  contacto: menu+contacto
};

export const pagesAll = {
  ...pages, 
  ...pagesSys
};//console.log('pagesAll:',pagesAll);

//Proyecto
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