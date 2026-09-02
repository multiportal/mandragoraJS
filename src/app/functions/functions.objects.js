import { btnRecuperar } from '../auth/sys/forget/forget';
import { navigate } from '../core/core';

export const fun = {
    'test-console': () => { console.warn('Función de prueba.') },
    'navegar': (e, p) => { navigate(p); },
    'btnRecuperar': (e) => { btnRecuperar(e); },
};