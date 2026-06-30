import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth } from "../../services/firebase.js";
import { showMessage, toggleEye } from "../../functions.js";
import Html from './index.html?raw';

export function register() {
  
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
        const userCredential = await createUserWithEmailAndPassword(auth, u, p);
        console.log('Usuario registrado:', userCredential.user);
        const form = document.querySelector("#register-form");
        if (form) form.reset();
        showMessage("Registro exitoso", "Exito");
      } catch (error) {
        console.error('Error al registrarse:', error);
        if (error.code === 'auth/email-already-in-use') {
          showMessage("Email ya registrado", "Error")
        } else if (error.code === 'auth/invalid-email') {
          showMessage("Email invalido", "Error")
        } else if (error.code === 'auth/weak-password') {
          showMessage("Password débil", "Error")
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