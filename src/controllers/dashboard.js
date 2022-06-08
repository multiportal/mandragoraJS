//DASHBOARD.JS
import {variables} from '../app/lib.js';
const v = variables();
const {host,dominio,path_url,base_url} = v;
let dashCss = base_url+'src/assets/css/dashboard.css';
if(host=='localhost'){console.log(dashCss);}

function btnSidebar(){
//<![CDATA[
  /*if(document.createStyleSheet) {
    document.createStyleSheet(dashCss);
  }else {
    var styles = "@import url('"+dashCss+"');";
    var newSS=document.createElement('link');
    newSS.rel='stylesheet';
    newSS.href='data:text/css,'+escape(styles);
    document.getElementsByTagName("head")[0].appendChild(newSS);
  }*/
//]]>

  let btnSalir = document.querySelector('.bx-log-out')
  btnSalir.addEventListener('click',()=>{
    window.location.href='#/logout';
  });

  let arrow = document.querySelectorAll(".arrow");
  for (var i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e)=>{
    let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
    arrowParent.classList.toggle("showMenu");
  });
}

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");//console.log(sidebarBtn);
sidebarBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("close");
});

}

function dashboard(){
  //Retardo para activar btnLogin
  setTimeout(function(){
    if(host=='localhost' || host=='localhost:9001'){console.log('btnSidebar Activado');}
    btnSidebar();
  },1000);
}

export {dashboard};