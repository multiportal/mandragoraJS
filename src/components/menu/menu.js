import menuHtml from './index.html?raw';
import { variables } from '../../app/core/lib';
import { name } from '../../app/core/constants';


export function menu() {
    const namePage = () => {
        const { page_url } = variables();
        const nameElement = document.querySelector('.name-page');
        if (nameElement) {
            nameElement.textContent = name;
            nameElement.setAttribute('href', page_url);
        }
    }

    const onLoad = () => {
        namePage();
    }

    setTimeout(onLoad, 0);
    return menuHtml;
}