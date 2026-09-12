import { variables } from '../../../../../core/lib';
import { permisoLocalPro } from '../../../../../functions';
import { getDataById, postData } from '../../../../../services/firebase';
import Html from './index.html?raw';

export const pagesEditor = async () => {
    const { host } = variables();
    const mPages = document.querySelector('.pagesEditor');
    const pagesEdit = await permisoLocalPro(host, 'config', 'pages'); //console.log('pagesEdit:', pagesEdit);
    if (pagesEdit){
        mPages.style.display = 'none';
    } else { 
        mPages.style.display = 'block';
    }
};

export function pagesComponent() {

    const activadorEditarPages = async () => {
        const elements = {
            regDev: document.querySelector('#checkRegEditDev'),
            regPro: document.querySelector('#checkRegEditPro')
        };
        if (!elements.regDev && !elements.regPro) return;
        const data = await getDataById('config', 'pages');
        const config = {
            regDev: data?.regDev ?? false,
            regPro: data?.regPro ?? false
        };
        Object.entries(elements).forEach(([key, element]) => {
            if (!element) return;
            element.checked = config[key];
            element.addEventListener('change', async () => {
                config[key] = element.checked;
                postData('config', 'pages', config);
                setTimeout(() => {
                    pagesEditor();
                }, 500);
            });
        });
    };

    const onLoad = () => {
        activadorEditarPages();
    }

    setTimeout(onLoad, 0);
    return Html;
}