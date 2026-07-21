import { getData, getDataById, postData, totalTab } from "../../services/firebase.js";
import { capitalize, consoleLocal, fecha, render } from "../../functions.js";
import { version, entorno } from '../../core/constants.js';
import Html from './index.html?raw';
import './style.css';

export async function dashboard() {
    const tab = "users";

    const user = async () => {
        const data = await getData(tab);
        if (!data) return null;
        return data;
    };

    const getUser = async () => {
        const userBasic = JSON.parse(localStorage.getItem('userBasic'));
        const fec = document.querySelector('#fecha');
        const tot = document.querySelector('#total');
        const name = document.querySelector('#name');
        const ver = document.querySelector('#version');
        const env = document.querySelector('#entorno');
        const total = await totalTab('links'); consoleLocal('log', total);
        const fechaHora = fecha();
        //OBTENER DATOS DE USUARIO
        const data = await user();
        const userData = data ? data.find(item => item.uid === userBasic?.uid) : null;
        if (!userData) { postData(tab, userBasic.uid, userBasic); console.warn('Usuario Creado!'); }
        const perfilData = userData ? userData : userBasic; consoleLocal('table', perfilData);
        const { key, ID, foto, email, usuario, uid, userId, tel, direccion, create_at, update_at, publico } = perfilData;
        if (name) { name.innerHTML = `¡Bienvenido ${usuario || email.split("@")[0]}!`; }
        //
        fec.innerHTML = fechaHora;
        tot.innerHTML = total;
        ver.innerHTML = version;
        env.innerHTML = capitalize(entorno);
    };

    const onLoad = () => {
        const userBasic = JSON.parse(localStorage.getItem('userBasic'));
        setTimeout(() => { getUser(); }, userBasic ? 0 : 1000);
    }

    setTimeout(onLoad, 0);
    return render(Html);
}