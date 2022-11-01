//DASHBOARD.JS
import { variables } from '../app/lib.js';
import { functionFetch, fetchProfile } from '../app/fetch.js';
import { Api } from '../app/urls.js';
const v = variables();
const { host, dominio, path_url, base_url, screenw, mod } = v;
let dashCss = base_url + 'assets/css/dashboard.css';
if (host == 'localhost') { console.log(dashCss); }

function loadStyleDashboard(){
  //<![CDATA[
    if(document.createStyleSheet) {
      document.createStyleSheet(dashCss);
    }else {
      var styles = "@import url('"+dashCss+"');";
      var newSS=document.createElement('link');
      newSS.rel='stylesheet';
      newSS.href='data:text/css,'+escape(styles);
      document.getElementsByTagName("head")[0].appendChild(newSS);
    }
  //]]>
}

async function btnSidebar() {
  //Dashboard
  let btnSalir = document.querySelector('.bx-log-out');
  if(btnSalir!=null){
    btnSalir.addEventListener('click', () => {window.location.href = '#/logout';});
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
  if(sidebarBtn!=null){
    sidebarBtn.addEventListener("click", () => {sidebar.classList.toggle("close");});
  }

  if(screenw<=740){
    let side = document.querySelector('.sidebar');
    side.classList.add('close');
  }

  //INFO USER /////////
  //setTimeout(async () => {    
    if(mod === 'dashboard'){
      console.log('DASHBOARD-GET PROFILE');
      const {email,username,nombre,foto,puesto,status} = await fetchProfile(Api,'InfoUser');
      const u = document.querySelector('.profile_name');
      if(u!=null){u.innerHTML=username;}
      const job = document.querySelector('.job');
      if(job!=null){job.innerHTML=puesto;}    
    }
  //}, 1000);
  /////////////////////

}

function dashboard() {
  //Retardo para activar btnLogin
  setTimeout(function () {
    if (host == 'localhost' || host == 'localhost:9001') { console.log('btnSidebar Activado'); }
    btnSidebar();
  }, 1000);

  loadStyleDashboard();
}

export { dashboard };