import { version, entorno } from '../../../../../core/constants';
import { capitalize, getCurrentUser } from '../../../../../functions';
import Html from './index.html?raw';
import './style.css';

export function sistemaComponent() {

    const onLoad = () => {
        const user = getCurrentUser();
        const fire = document.querySelector('#firebase');
        if (fire && user) { fire.innerHTML = 'Conectado'; }
        const ver = document.querySelector('#version');
        if (ver) { ver.innerHTML = version; }
        const env = document.querySelector('#entorno');
        if (env) { env.innerHTML = capitalize(entorno); }
    }

    setTimeout(onLoad, 0);
    return Html;
}