import { consoleLocal } from './../functions.js';

export function variables() {
    /*VARIABLES SYS*/
    var w = window;
    var d = document;
    var loc = w.location;
    var dt = new Date();
    var day = dt.getDate();
    day = (day < 10) ? '0' + day : day;
    var mon = dt.getMonth() + 1;
    mon = (mon < 10) ? '0' + mon : mon;
    var year = dt.getFullYear();
    var fecha = year + '-' + mon + '-' + day;

    //
    const { protocol, host, origin, pathname, hash, href, search } = loc;
    const dominio = origin + '/';
    const URL = href;
    const quest = search; // [OBSOLETA] -> Obtención del valor de las variable ej. ?mod=producto&ext=cate

    return {
        w,
        d,
        loc,
        dt,
        day,
        mon,
        year,
        fecha,
        protocol, 
        host, 
        origin, 
        pathname, 
        hash, 
        href, 
        search,
        dominio,
        URL,
        quest
    };
}

export function load() {
    const v = variables(); consoleLocal('log', v);
}

export function inicio() {
    console.log('Run function inicio');
    load();
}