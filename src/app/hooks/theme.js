import { theme } from "../core/constants";

export const temaHome = () => {
    const m = document.querySelector('.masthead');
    const t1 = document.querySelector('.index');
    const t2 = document.querySelector('.hero');
    if (theme == 'links') {
        t2.style.display = 'none';
        m.style.position = 'inherit';
    } else {
        t1.style.display = 'none';
    }
};

export const temaLog = () => {
    const t1 = document.querySelector('.container');
    const t2 = document.querySelector('.login-page');
    if (theme == 'links') {
        t2.style.display = 'none';
    } else {
        t1.style.display = 'none';
    }
};