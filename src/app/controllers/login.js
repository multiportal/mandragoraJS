import {variables} from '../lib';
import { Api } from '../const';
const v = variables();
/* VARIABLES CONSTANTES*/
const {host,dominio,path_url} = v;

console.log('/* javascript login | VARIABLES CONSTANTES*/');
let api_login = Api + '/login/';
if(host=='localhost' || host=='localhost:9001'){console.log('api_login='+api_login);}

function btnLogin(){
const formulario = document.getElementById('form-login');
if(formulario!=null){formulario.addEventListener('submit', btnGuardar);console.log('btnLogin Activado');}
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
    }).then(res=>res.json()).then(resp=>{
        const {data} = resp;
        if(host=='localhost' || host=='localhost:9001'){console.log(resp);}
        console.log('getToken:'+data.token);
        localStorage.setItem("Token", data.token);//localStorage.setItem("Token", JSON.stringify(data.token));
        let token = localStorage.getItem("Token"); console.log('Res-Token:'+token);
        //Redireccionar al Dashboard
        if(token!=null && token!='undefined'){
            location.href= dominio + path_url + '#/dashboard';
        }else{
            let msj = document.getElementById('msj-error');
            msj.innerHTML = `<div class="alert alert-danger" role="alert">Usuario o Contraseña Incorrectos</div>`;
        }
    })
    .catch(err=>{
        console.log(err)
        let msj = document.getElementById('msj-error');
        msj.innerHTML = `<div class="alert alert-danger" role="alert">Error:Usuario o Contraseña Incorrectos</div>`;
    });    
}

const login = () => {
    const url = api_login+'';
    fetch(url).then(res=>res.json()).then(resp=>{
        console.log(resp);
    })
    .catch(err=>console.log(err));
    //Retardo para activar btnLogin
    setTimeout(function(){
        btnLogin();
    },1000);
}

export {login};
