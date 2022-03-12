//DASHBOARD.JS

function btnSidebar(){
//<![CDATA[
  /*if(document.createStyleSheet) {
    document.createStyleSheet('http://localhost/MisSitios/mandragoraJS/src/assets/css/dashboard.css');
  }
  else {
    var styles = "@import url(' http://localhost/MisSitios/mandragoraJS/src/assets/css/dashboard.css ');";
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
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("close");
});

}

function dashboard(){
  //Retardo para activar btnLogin
  setTimeout(function(){
    console.log('btnSidebar Activado');
    btnSidebar();
  },1000);
}


export {dashboard};