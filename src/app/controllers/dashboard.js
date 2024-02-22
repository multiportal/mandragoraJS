//DASHBOARD.JS
import { variables } from '../core/lib';
import { functionFetch, fetchProfile } from '../services/fetch';
import { Api } from '../core/const.env';
import { consoleLocal } from '../functions';

const v = variables();
const { host, dominio, path_url, base_url, screenw, mod, hostDev } = v;

function loadStyleDashboard() {
  let dashCss = base_url + 'assets/css/dashboard.css';
  if (host == hostDev) { console.log(dashCss); }
  //<![CDATA[
  if (document.createStyleSheet) {
    document.createStyleSheet(dashCss);
  } else {
    var styles = "@import url('" + dashCss + "');";
    var newSS = document.createElement('link');
    newSS.rel = 'stylesheet';
    newSS.href = 'data:text/css,' + escape(styles);
    document.getElementsByTagName("head")[0].appendChild(newSS);
  }
  //]]>
}

async function btnSidebar() {
  //Dashboard
  let btnSalir = document.querySelector('.bx-log-out');
  if (btnSalir != null) {
    btnSalir.addEventListener('click', () => { window.location.href = '#/logout'; });
  }

  let arrow = document.querySelectorAll(".arrow");
  for (var i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e) => {
      let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
      arrowParent.classList.toggle("showMenu");
    });
  }

  let sidebar = document.querySelector(".sidebar");
  let sidebarBtn = document.querySelector(".bx-menu");//console.log(sidebarBtn);
  if (sidebarBtn != null) {
    let bar = localStorage.getItem('bar');
    if(bar=='true'){sidebar.classList.toggle("close");}
    sidebarBtn.addEventListener("click", () => {
      let sbar = sidebar.classList.toggle("close"); //console.log(sbar);
      localStorage.setItem("bar",sbar);
      bar = localStorage.getItem('bar'); //console.log('Bar-Click:',bar);
    });
    console.log('Bar-Load:',bar);
    //sidebarBtn.addEventListener("click", () => { sidebar.classList.toggle("close"); });
  }

  if (screenw <= 740) {
    let side = document.querySelector('.sidebar');
    side.classList.add('close');
  }

  //INFO USER /////////
  //setTimeout(async () => {    
  //if(mod === 'dashboard'){
  const u = document.querySelector('.profile_name');
  const job = document.querySelector('.job');
  let msjProfile = (host == hostDev) ? ': DASHBOARD-GET PROFILE' : '';
  console.log('AUTORIZADO'+msjProfile);
  if (u != null && job != null) {
    const { email, username, nombre, foto, puesto, status } = await fetchProfile(Api, 'InfoUser');
    if (u != null) { u.innerHTML = username; }
    if (job != null) { job.innerHTML = puesto; }
  }
  //}
  //}, 1000);
  /////////////////////

}

function dashboard() {
  //Retardo para activar btnLogin
  setTimeout(function () {
    if (host == hostDev) { console.log('btnSidebar Activado'); }
    btnSidebar();
  }, 500);
  //loadStyleDashboard();
}

export { dashboard };