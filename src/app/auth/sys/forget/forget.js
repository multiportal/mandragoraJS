import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../services/firebase';
import { showMessage } from '../../../hooks/messages';
import Html from './index.html?raw';

export const recuperarPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return {
            success: true,
            message: 'Se ha enviado un correo para restablecer tu contraseña.'
        };
    } catch (error) {
        console.error('Error al recuperar contraseña:', error);
        return {
            success: false,
            code: error.code,
            message: error.message
        };
    }
};

export const btnRecuperar = async (e) => {
    console.log(e);
    const form = document.querySelector("#form-recuperar");
    if (!form) return;
    let email = document.getElementById('email').value.trim();
    console.log('Email:', email);
    if (!email) return;
    const response = await recuperarPassword(email);
    if (response.success) {
        showMessage(response.message, 'Exito');
        return;
    }
    console.error(response.code);
    showMessage('No fue posible enviar el correo de recuperación.', 'Error');
};

export function forget() {

    const onLoad = () => { }

    setTimeout(onLoad, 0);
    return Html;
}