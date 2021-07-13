/* VARIABLES CONSTANTES*/
console.log('/* VARIABLES CONSTANTES*/');
//const protocol = window.location.protocol;

const host = window.location.host;
console.log('host='+host);
const dominio = window.location.origin+'/';
console.log('dominio='+dominio);
const dominio1 = window.location.origin;
console.log('dominio1='+dominio1);
const path_url = window.location.pathname;
console.log('path_url='+path_url);

//const URL = window.location.href;
//var proyecto = 'mandragoraJSF'; //PROYECTO
//var path_root = (host=='localhost')?'MisSitios/' + proyecto + '/':'';
//var page_url = dominio+path_root;

var api_login = 'http://localhost/MisSitios/mandragoraJSF/api/login/';
console.log('api_login='+api_login);

console.log('javascript login');

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
        console.log(data);
        localStorage.setItem("Token", JSON.stringify(data.token));
        //Redireccionar al Dashboard
        location.href= dominio1 + path_url + '#/dashboard';
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

