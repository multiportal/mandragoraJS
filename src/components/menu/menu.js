import { variables } from '../../app/core/lib';
import { name } from '../../app/core/constants';
import menuHtml from './index.html?raw';

export function menu() {
    const namePage = () => {
        const { page_url, pathname, hash } = variables();
        const nameElement = document.querySelector('.name-page');
        if (nameElement) {
            //nameElement.textContent = name;
            nameElement.setAttribute('href', page_url);
        }
        //SELECCION MENU
        const p = pathname == '/' ? '/Home' : pathname;
        const h = hash == '#/' ? '#/Home' : hash;
        const listaMenu = document.querySelector('.navbar-nav');
        if (!listaMenu) return;
        document.querySelectorAll(".navbar-nav a").forEach((link) => {
            const enlace = link.getAttribute("href");
            //console.warn(enlace, p, h);
            if (enlace == p || enlace == h) {
                link.classList.add("active");
            }
        });
    };

    const onLoad = () => {
        namePage();
    }

    setTimeout(onLoad, 0);
    return menuHtml;
}