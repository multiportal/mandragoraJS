import { capitalize, consoleLocal, fecha, render } from "../../functions.js";
import { version, entorno } from '../../core/constants.js';
import Html from './index.html?raw';
import './style.css';

export async function dashboard() {


    const onLoad = () => {

    }

    setTimeout(onLoad, 0);
    return render(Html);
}