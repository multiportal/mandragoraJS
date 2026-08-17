import { consoleLocal } from '../functions';
import { createData, getData, getDataById, onDataById } from '../services/firebase';
import { encriptar, desencriptar } from './encriptar';
import { obtenerInformacionNavegador } from './getBrowser';
import { obtenerIP } from './getIp';

export const registrosApp = async (v) => {
    const { dt, fecha, host, pathname, URL, mod, ext, id } = v;

    const data = await getDataById('config', 'registros'); //console.log('DATOS RECIBIDOS:', data);
    const regDev = data?.regDev ?? false;
    const regPro = data?.regPro ?? false;
    console.log(regDev, regPro);
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

        console.log('Data:', data);
        console.log('Data2:', data2);
        //return regis;
    } catch (error) {
        console.error('Error registrando visita:', error);
    }
};