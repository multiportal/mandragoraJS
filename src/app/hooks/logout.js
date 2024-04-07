import { signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth } from "../services/firebase";
import { alertMessage, showMessage } from "./messages";

export function logoutApp() {
  const logout = document.querySelector("#logout-1"); //console.log(logout);
  if (logout) {
    logout.addEventListener("click", async (e) => {//console.log('LogOut',e);
      e.preventDefault();
      try {
        await signOut(auth);
        localStorage.clear();
        console.log("signup out");
        showMessage("Signup out", "info");
      } catch (error) {
        console.log(error);
      }
    });
  }
}
