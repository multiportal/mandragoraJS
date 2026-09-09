import { modalInfo } from './modalAlerts';
import { navigate } from '../core/core';
import { btnRecuperar } from '../auth/sys/forget/forget';

export const fun = {
    'test-console': () => { console.warn('Función de prueba.'); modalInfo('success', 'Función de prueba', 'Esta es una función de prueba.');},
    'navegar': (e, p) => { navigate(p); },
    'btnRecuperar': (e) => { btnRecuperar(e); },
};