//import { getData, getDataById, postData, totalTab } from "../../services/firebase.js";
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

    };

    const onLoad = () => {
        const userBasic = JSON.parse(localStorage.getItem('userBasic'));
        setTimeout(() => { getUser(); }, userBasic ? 0 : 1000);
    }

    setTimeout(onLoad, 0);
    return render(Html);
}