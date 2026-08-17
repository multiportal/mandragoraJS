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