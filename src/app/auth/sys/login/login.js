import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase.js";
import { consoleLocal, toggleEye } from "../../../functions.js";
import { showMessage } from "../../../hooks/messages.js";
import { googleLogin } from "../../../hooks/googleLogin.js";
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
      try {
        const userCredential = await signInWithEmailAndPassword(auth, u, p);
        console.log('Usuario inició sesión:', userCredential.user);
        const { accessToken } = userCredential.user;
        localStorage.setItem('Token', accessToken);
        consoleLocal('log', accessToken);
        const form = document.querySelector("#login-form");
        if (form) form.reset();
        navigate('#/dashboard')
      } catch (error) {
        console.error('Error al iniciar sesión:', error.code);
        if (error.code === 'auth/wrong-password') {
          showMessage("Contraseña incorrecta", "Error")
        } else if (error.code === 'auth/user-not-found') {
          showMessage("Email no encontrado", "Error")
        } else if (error.code === 'auth/invalid-login-credentials') {
          showMessage("Contraseña o Email incorrecto", "Error")
        } else if (error.code) {
          showMessage("Hubo un error, intenta de nuevo", "Error")
        }
      }
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