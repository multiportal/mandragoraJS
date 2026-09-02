import { consoleLocal } from '../functions';
import { createData, getData, getDataById } from '../services/firebase';
import { encriptar, desencriptar } from './encriptar';
//import { obtenerInformacionNavegador } from './getBrowser';
//import { obtenerIP } from './getIp';

/* ==========================
   REGISTROS
========================== */

export const registrosApp = async (v) => {
    const { dt, fecha, host, pathname, URL, mod, ext, id } = v;
    const data = await getDataById('config', 'registros'); console.log('DATOS RECIBIDOS:', data);
    const regDev = data?.regDev ?? false;
    const regPro = data?.regPro ?? false;
    //console.log(regDev, regPro);
    const noPermitido = host.includes('localhost') ? !regDev : !regPro;
    if (noPermitido) {
        console.warn('AVISO: Los registros estan apagados.');
        return;
    }
    // Usuario actual
    const userBasic = JSON.parse(localStorage.getItem('userBasic') || 'null');
    // Obtener IP
    const ip = await obtenerIP();
    try {
        // Obtener registros existentes
        const data = await getData('registros') || [];
        // Obtener el siguiente ID_regis
        const ID_regis = data.length ? Math.max(...data.map(item => Number(item.ID_regis) || 0)) + 1 : 1;
        // Crear registro
        const regis = {
            ID_regis,
            fecha,
            date: dt,
            ip: encriptar(String(ip)),
            mod: mod || null,
            ext: ext || null,
            id: id || null,//key de la tarjeta
            url: URL || null,
            pagina: pathname || null,
            hora: dt.toLocaleTimeString('es-MX'),
            idioma: navigator.language || null,
            referrer: document.referrer || null,
            user: userBasic?.usuario || 'visitante',
            uid: userBasic?.uid || 'visitante',
            ...obtenerInformacionNavegador()
        };

        data.push(regis);
        // Mostrar registro original
        consoleLocal('warn', { REGISTRO: regis });
        // Guardar únicamente si existe ID
        if (id) {
            await createData('registros', regis, false);
        }
        // Crear una copia con IP desencriptada para visualizarla
        const data2 = data.map(item => ({ ...item, ip: desencriptar(item.ip) }));
        // Agregar el nuevo registro a la copia para visualizarlo
        //dataDesencriptada.push({ ...regis, ip: desencriptar(regis.ip) });
        if (host.includes('localhost')) {
            //console.log('Data:', data);
            console.log('Data2:', data2);
        }
        //return regis;
    } catch (error) {
        console.error('Error registrando visita:', error);
    }
};

/* ==========================
   GET IP
========================== */

export async function obtenerIP() {
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        if (!response.ok) {
            throw new Error("No se pudo obtener la IP");
        }
        const data = await response.json();
        return data.ip || null;
    } catch (error) {
        console.error("Error obteniendo IP:", error);
        return null;
    }
}

/* ==========================
   GET BROWSER
========================== */

export function obtenerNavegador() {
    const ua = navigator.userAgent;
    if (ua.includes("Edg/")) {
        return "Microsoft Edge";
    }
    if (ua.includes("OPR/") || ua.includes("Opera")) {
        return "Opera";
    }
    if (ua.includes("Chrome/")) {
        return "Google Chrome";
    }
    if (ua.includes("Firefox/")) {
        return "Mozilla Firefox";
    }
    if (ua.includes("Safari/") && !ua.includes("Chrome/")) {
        return "Safari";
    }
    return "Desconocido";
}

export function obtenerInformacionNavegador() {
    const ua = navigator.userAgent;
    let navegador = "Desconocido";
    let version = "";
    if (/Edg\/([\d.]+)/.test(ua)) {
        navegador = "Microsoft Edge";
        version = ua.match(/Edg\/([\d.]+)/)[1];
    } else if (/OPR\/([\d.]+)/.test(ua)) {
        navegador = "Opera";
        version = ua.match(/OPR\/([\d.]+)/)[1];
    } else if (/Chrome\/([\d.]+)/.test(ua)) {
        navegador = "Google Chrome";
        version = ua.match(/Chrome\/([\d.]+)/)[1];
    } else if (/Firefox\/([\d.]+)/.test(ua)) {
        navegador = "Mozilla Firefox";
        version = ua.match(/Firefox\/([\d.]+)/)[1];
    } else if (/Version\/([\d.]+).*Safari/.test(ua)) {
        navegador = "Safari";
        version = ua.match(/Version\/([\d.]+)/)[1];
    }

    return {
        navegador,
        version,
        sistema: obtenerSistemaOperativo(),
        dispositivo: obtenerDispositivo()
    };
}

export function obtenerSistemaOperativo() {
    const ua = navigator.userAgent;
    if (/Windows NT 10.0/.test(ua)) {
        return "Windows 10/11";
    }
    if (/Windows NT 6.3/.test(ua)) {
        return "Windows 8.1";
    }
    if (/Windows NT 6.2/.test(ua)) {
        return "Windows 8";
    }
    if (/Windows NT 6.1/.test(ua)) {
        return "Windows 7";
    }
    if (/Android/.test(ua)) {
        return "Android";
    }
    if (/iPhone|iPad|iPod/.test(ua)) {
        return "iOS";
    }
    if (/Mac OS X/.test(ua)) {
        return "macOS";
    }
    if (/Linux/.test(ua)) {
        return "Linux";
    }
    return "Desconocido";
}

function obtenerDispositivo() {
    const ua = navigator.userAgent;
    if (/iPad|Tablet/i.test(ua)) {
        return "Tablet";
    }
    if (/Mobi|Android/i.test(ua)) {
        return "Mobile";
    }
    return "Desktop";
}