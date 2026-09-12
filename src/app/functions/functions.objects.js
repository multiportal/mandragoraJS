import { modalInfo } from './modalAlerts';
import { navi } from '../core/core';
import { btnRecuperar } from '../auth/sys/forget/forget';
import { addPage, editPage } from '../auth/dashboard/editorPages/editorPages';

export const fun = {
    'test-console': () => { console.warn('Función de prueba.'); modalInfo('success', 'Función de prueba', 'Esta es una función de prueba.');},
    'navegar': (e, p) => { navi(p); },
    'btnRecuperar': (e) => { btnRecuperar(e); },
    'btnAddPage': (e) => { addPage(e); },
    'btnEditPage': (e,t) => { editPage(e,t); },
};