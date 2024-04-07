import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"
import { auth } from "../services/firebase.js";
import { alertMessage, showMessage } from "./messages.js";

export function loginApp(){
  const googleButton = document.querySelector("#googleLogin"); //console.log(googleButton)
  if(googleButton){
    googleButton.addEventListener("click", async (e) => {
      e.preventDefault();
      const provider = new GoogleAuthProvider();
      try {
        const credentials = await signInWithPopup(auth, provider)
        console.log(credentials);
        console.log("google sign in");
        // show welcome message
        //alertMessage("Welcome " + credentials.user.displayName, 'success');
        showMessage("Welcome " + credentials.user.displayName, 'success');
      } catch (error) {
        console.log(error);
      }
    });
  }
}
