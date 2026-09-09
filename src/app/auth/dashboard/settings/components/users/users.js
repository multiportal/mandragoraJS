import { tableSettings } from './data.table';
import Html from './index.html?raw';

export function gestionUsuarios() {

    const onLoad = () => {
        tableSettings();
    }

    setTimeout(onLoad, 0);
    return Html;
}