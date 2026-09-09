import { loadDarkMode } from '../../../../../hooks/theme';
import { getDataById, postData } from '../../../../../services/firebase';
import Html from './index.html?raw';

export function temaComponent() {

    const modeDark = async () => {
        const checkRegTema = document.querySelector('#checkRegTema');
        if (!checkRegTema) return;
        const data = await getDataById('config', 'theme');
        const config = {
            darkMode: data?.darkMode ?? false
        };
        checkRegTema.checked = config.darkMode;
        checkRegTema.addEventListener('change', async () => {
            config.darkMode = checkRegTema.checked;
            postData('config', 'theme', config);
            if (config.darkMode) {
                //document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'true');
            } else {
                //document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'false');
            }
            setTimeout(() => {
                loadDarkMode('dashboard');
            }, 500);
        });
    }

    const onLoad = () => {
        modeDark();
    }

    setTimeout(onLoad, 0);
    return Html;
}