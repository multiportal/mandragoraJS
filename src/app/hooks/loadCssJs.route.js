import { loadStyle, delStyle } from "./loadScripts";
/* ==========================
  LOAD CSS
========================== */

export function loadCssJsMod({ mod, page_url }) {
    //dashboard ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const prefixDash = 'dash-';
    const dashCss = [
        page_url + '/assets/css/dashboard.css'
    ];
    if (mod == 'dashboard') {
        loadStyle(dashCss, prefixDash);
    } else {
        delStyle(dashCss, prefixDash);
    }
    //bio ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const prefixBio = 'bio-';
    const bioCss = [
        page_url + '/assets/css/dashboard.css'
    ];
    if (mod == 'bio') {
        loadStyle(bioCss, prefixBio);
    } else {
        delStyle(bioCss, prefixBio);
    }
}

export function loadCssJs(v, filesCss) {
    const prefix = v.mod + '-';
    if (v.mod) {
        loadStyle(filesCss, prefix);
    } else {
        delStyle(filesCss, prefix);
    }
}