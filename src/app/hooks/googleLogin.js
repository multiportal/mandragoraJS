import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../services/firebase.js";
import { consoleLocal } from "../functions.js";
import { navigate } from "../../routes/routes.js";
import { alertMessage, showMessage } from "./messages.js";

/* ==========================
  GOOGLE LOGIN
========================== */

export const googleLogin = () => {
  const googleButton = document.querySelector("#googleLogin");
  if (googleButton) {
    googleButton.addEventListener("click", async (e) => {
      e.preventDefault();
      const provider = new GoogleAuthProvider();
      try {
        const userCredential = await signInWithPopup(auth, provider)
        console.log('Usuario inició sesión:', userCredential.user);
        const { accessToken } = userCredential.user;
        localStorage.setItem('Token', accessToken);
        consoleLocal('log', accessToken);
        const form = document.querySelector("#login-form");
        if (form) form.reset();
        navigate('#/dashboard');
      } catch (error) {
        console.log(error);
      }
    });
  }
};
