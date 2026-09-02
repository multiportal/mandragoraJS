import { getDataById, postData } from '../../../../../services/firebase';
import Html from './index.html?raw';

export function developerComponent() {

    const activadorRegistros = async () => {
        const elements = {
            regDev: document.querySelector('#checkRegDev'),
            regPro: document.querySelector('#checkRegPro')
        };
        if (!elements.regDev && !elements.regPro) return;
        const data = await getDataById('config', 'registros');
        const config = {
            regDev: data?.regDev ?? false,
            regPro: data?.regPro ?? false
        };
        Object.entries(elements).forEach(([key, element]) => {
            if (!element) return;
            element.checked = config[key];
            element.addEventListener('change', async () => {
                config[key] = element.checked;
                postData('config', 'registros', config);
            });
        });
    };

    const onLoad = () => {
        //setInterval(() => {
        console.log('Ejecutando...');
        activadorRegistros();
        //tableSettings();
        //}, 1000);
    }

    setTimeout(onLoad, 0);
    return Html;
}