import { loadStyle, delStyle } from "../functions";

export function loadCssJsMod(mod, base_url) {
    //dashboard ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const prefixDash = 'dash-';
    const dashCss = [
        base_url + '/assets/css/dashboard.css'
    ];
    if (mod == 'dashboard') {
        loadStyle(dashCss, prefixDash);
    } else {
        delStyle(dashCss, prefixDash);
    }
}