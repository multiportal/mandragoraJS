import { capitalize, consoleLocal, fecha, render } from "../../functions.js";
import { version, entorno } from '../../core/constants.js';
import Html from './index.html?raw';
import './style.css';

export async function dashboard() {
    const tab = "users";

    const user = async () => {
    };

    const getUser = async () => {
    };

    const onLoad = () => {
        const userBasic = JSON.parse(localStorage.getItem('userBasic'));
    }

    setTimeout(onLoad, 0);
    return render(Html);
}