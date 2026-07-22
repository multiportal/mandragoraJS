import { consoleLocal, toggleEye } from "../../../functions.js";
import { showMessage } from "../../../hooks/messages.js";
import { navigate } from "../../../../routes/routes.js";
import Html from './index.html?raw';
//import './style.css'

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
    googleLogin();
  }

  setTimeout(onLoad, 0);
  return Html;
}