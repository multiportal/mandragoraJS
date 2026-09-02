import { environments } from "../../environments/environments";
import { showMessage } from "../../app/hooks/messages";
//import { viewForm } from '../../app/hooks/theme';
import emailjs from "@emailjs/browser";
import Html from "./index.html?raw";

export function contacto() {
  const { PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID } = environments.emailjs;

  const enviar = () => {
    const form = document.getElementById("contactForm");
    if (!form && !PUBLIC_KEY) { return; }
    emailjs.init({
      publicKey: PUBLIC_KEY,
    });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
      };
      try {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          params
        );
        console.log("Correo enviado.");
        showMessage("Correo enviado.", "Success");
        form.reset();
      } catch (error) {
        console.error(error);
        console.log("Error al enviar.");
        showMessage("Error al enviar.", "Error")
      }
    });
  };

  const onLoad = () => {
    enviar();
    //viewForm();
  };

  setTimeout(onLoad, 0);
  return Html;
}
