import { loadStyle, delStyle } from "../functions";

export function loadCssJs(v, filesCss) {
    const prefix = v.mod + '-';
    if (v.mod) {
        loadStyle(filesCss, prefix);
    } else {
        delStyle(filesCss, prefix);
    }
}
