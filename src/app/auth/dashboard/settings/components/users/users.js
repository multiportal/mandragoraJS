import { getFormData } from '../../../../../functions';
import { handleEventListener } from '../../../../../hooks/handleEventListener';
import { postData, putData } from '../../../../../services/firebase';
import { tableSettings } from './data.table';
import Html from './index.html?raw';

export function gestionUsuarios() {

    

    const onLoad = () => {
        tableSettings();
    }

    setTimeout(onLoad, 0);
    return Html;
}