/* VARIABLES CONSTANTES*/
var loc = window.location;
const host = loc.host;
const dominio = loc.origin + '/';
const path_url1 = loc.pathname;
var path_url = path_url1.replace("/", "");

console.log('/* javascript login | VARIABLES CONSTANTES*/');
var api_login = (host!='localhost')?'https://apirestsys.herokuapp.com/api/login/':'http://localhost/MisSitios/apirest/api/login/';
if(host=='localhost'){console.log('api_login='+api_login);}

function btnLogin(){
const formulario = document.getElementById('form-login');
formulario.addEventListener('submit', btnGuardar);
}

function btnGuardar(e){
    e.preventDefault();
    console.log('Validación de Datos');
    let u = document.getElementById('username').value;
    let p = document.getElementById('password').value;
    //var datos = new FormData(formulario);
    var datos = {
        username: u,
        password: p
    }
    //console.log(datos);
    const url = api_login+'index.php';
    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(datos)
    }).then(res=>res.json()).then(data=>{
        if(host=='localhost'){console.log(data);}
        localStorage.setItem("Token", JSON.stringify(data.token));
        let token = localStorage.getItem("Token");
        //Redireccionar al Dashboard
        if(token!=null && token!='undefined'){
            location.href= dominio + path_url + '#/dashboard';
        }else{
            let msj = document.getElementById('msj-error');
            msj.innerHTML = `<div class="alert alert-danger" role="alert">Usuario o Contraseña Incorrectos</div>`;
            //localStorage.setItem("Token", null);
        }
    })
    .catch(err=>console.log(err));    
}

const login = () => {
    const url = api_login+'';
    fetch(url).then(res=>res.json()).then(data=>{
        console.log(data);
    })
    .catch(err=>console.log(err));
    //Retardo para activar btnLogin
    setTimeout(function(){
        console.log('btnLogin Activado');
        btnLogin();
    },1000);
}

export {login};

