import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth } from "../../services/firebase.js";
import { consoleLocal, showMessage, toggleEye } from "../../functions.js";
import Html from './index.html?raw';
import { navigate } from "../../../routes/routes.js";

export function login() {

  const btnGuardar = () => {
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
        //setTimeout(() => {window.location.href = '/dashboard';}, 500);
        navigate('/dashboard')
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        if (error.code === 'auth/wrong-password') {
          showMessage("Contraseña incorrecta", "Error")
        } else if (error.code === 'auth/user-not-found') {
          showMessage("Email no encontrado", "Error")
        } else if (error.code) {
          showMessage("Hubo un error, intenta de nuevo", "Error")
        }
      }
    });
  };

  const onLoad = () => {
    toggleEye();
    btnGuardar();
  }

  setTimeout(onLoad, 0);
  return Html;
}