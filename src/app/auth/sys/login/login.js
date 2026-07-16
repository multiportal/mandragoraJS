//import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
//import { auth } from "../../../services/firebase.js";
import { consoleLocal, toggleEye } from "../../../functions.js";
import { showMessage } from "../../../hooks/messages.js";
//import { googleLogin } from "../../../hooks/googleLogin.js";
import Html from './index.html?raw';
import { navigate } from "../../../../routes/routes.js";

export function login() {

  const btnIngresar = () => {
    const form = document.querySelector('form#login-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('Validación de Datos');
      let u = document.getElementById('username').value;
      let p = document.getElementById('password').value;
      console.log('Usuario:', u, 'Password:', p);
    });
  };

  const onLoad = () => {
    toggleEye();
    btnIngresar();
    //googleLogin();
  }

  setTimeout(onLoad, 0);
  return Html;
}