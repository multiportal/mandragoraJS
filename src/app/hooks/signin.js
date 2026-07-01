import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth } from "./firebase.js";
import { alertMessage, showMessage } from "./messages.js";
console.log("Signin");

const signInForm = document.querySelector("#login-form");
if (signInForm) {
  signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = signInForm["login-email"].value;
    const pass = signInForm["login-password"].value;
    console.log(email,pass);
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, pass);
      console.log(userCredentials);

      // Close the login modal
      const modal = bootstrap.Modal.getInstance(signInForm.closest(".modal"));
      modal.hide();

      // reset the form
      signInForm.reset();

      // show welcome message
      showMessage("Welcome " + userCredentials.user.email, "success");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        showMessage("Wrong password", "error");
      } else if (error.code === "auth/user-not-found") {
        showMessage("User not found", "error");
      } else {
        showMessage("Something went wrong", "error");
      }
    }
  });
}
