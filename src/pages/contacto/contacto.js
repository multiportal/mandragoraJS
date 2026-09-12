import { variables } from '../../app/core/lib';
import { getFormData } from '../../app/functions';
import { handleEventListener } from '../../app/hooks/handleEventListener';
import { showMessage } from '../../app/hooks/messages';
import { createData } from '../../app/services/firebase';
import { environments } from '../../app/core/env.config';
import emailjs from "@emailjs/browser";
import Html from "./index.html?raw";

export function contacto() {
  const tab = 'contacto';
  const { fecha } = variables();

  const enviarEmail = () => {
    const form = document.getElementById("contactForm");
    if (!form) return;
    handleEventListener('submit', (e) => {
      e.preventDefault();
      console.log('FORMULARIO');
      const msj = getFormData(form, "id");
      const body = { ...msj, page: tab, create_at: fecha }; //console.log(body);
      if (body) {
        try {
          createData(tab, body, false);
          const res = '¡Mensaje enviado!';
          console.log(res);
          showMessage(res, 'Exito');
          form.reset();
        } catch (error) {
          const res = '¡Hubo un error intentelo nuevamente!';
          console.error(res, error);
          showMessage(res, 'Error');
        }
      }
    }, form);
  };

  const { PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID } = environments.emailjs;

  const enviarEmailjs = () => {
    const form = document.getElementById("contactForm");
    if (!form) return;
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
    setTimeout(() => {
      //enviarEmailjs();
      enviarEmail();      
    }, 1500);
  };

  setTimeout(onLoad, 0);
  return Html;
}
