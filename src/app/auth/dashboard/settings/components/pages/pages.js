import { getData, getDataById, postData } from '../../../../../services/firebase';
import Html from './index.html?raw';

export const pagesEditor = async () => {
    const mPages = document.querySelector('.pagesEditor');
    const data = await getData('config');
    if (!data) return; //console.warn('PAGES:', data);
    const pagesEdit = data.find(item => item.key === "pages")?.pagesEdit;//console.log(pagesEdit); // true
    if (!pagesEdit){
        mPages.style.display = 'none';
    } else { 
        mPages.style.display = 'block';
    }
};

export function pagesComponent() {

    const editarPage = async () => {
        const checkRegEdit = document.querySelector('#checkRegEdit');
        if (!checkRegEdit) return;
        const data = await getDataById('config', 'pages');
        const config = {
            pagesEdit: data?.pagesEdit ?? false
        };
        checkRegEdit.checked = config.pagesEdit;
        checkRegEdit.addEventListener('change', async () => {
            config.pagesEdit = checkRegEdit.checked;
            postData('config', 'pages', config);
            setTimeout(() => {
                pagesEditor();
            }, 500);
        });
    }

    const onLoad = () => {
        editarPage();
    }

    setTimeout(onLoad, 0);
    return Html;
}