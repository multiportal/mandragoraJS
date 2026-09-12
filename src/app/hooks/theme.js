import { body, theme } from "../core/constants";
/* ==========================
  TEMA
========================== */
const tema = 'links';//DEFAULT

export  const loadDarkMode = (mod) => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode && darkMode === 'true' && mod !== 'dashboard') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

export const temaBgColor = ({ mod }) => {
    const modulos = mod == 'Home';
    if (modulos && theme == tema) {
        body.style.background = '#050505';
    } else {
        body.style.background = '#fff';
    }
    loadDarkMode(mod);
};

export const temaHome = () => {
    const m = document.querySelector('.masthead');
    const t1 = document.querySelector('.default');
    const t2 = document.querySelector('.home');
    if(!m || !t1 || !t2) return;
    if (theme == tema) {
        t1.style.display = 'none';
        m.style.position = 'inherit';
    } else {
        t2.style.display = 'none';
    }
};

export const temaLog = () => {
    const t1 = document.querySelector('.container');
    const t2 = document.querySelector('.login-page');
    if (theme == tema) {
        t2.style.display = 'none';
    } else {
        t1.style.display = 'none';
    }
};

export const viewForm = () => {
    const contactForm = document.querySelector('.contactForm');
    if (contactForm) {
        contactForm.style.display = (theme == tema) ? 'none' : 'inherit';
    }
    const index = document.querySelector('.index');
    if (index) {
        index.style.display = (theme == tema) ? 'inherit' : 'none';
    }
};

