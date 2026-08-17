export function generarVCF(contacto) {

    const vcard = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${contacto.nombre}`,
        `TEL;TYPE=MOVIL:${contacto.telefono}`,
        `EMAIL:${contacto.email}`,
        `ORG:${contacto.empresa}`,
        `URL:${contacto.url}`,
        "END:VCARD"
    ].join("\r\n");

    const blob = new Blob(
        [vcard],
        { type: "text/vcard;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${contacto.nombre}.vcf`;

    document.body.appendChild(link);
    link.click();

    link.remove();
    URL.revokeObjectURL(url);
}

export function generarVCF2(data = {}) {

    const {
        nombre = "",
        cell = "",
        tel = "",
        email = "",
        empresa = "",
        puesto = "",
        direccion = "",
        note = "",
        foto = "",
        facebook = "",
        instagram = "",
        linkedin = "",
        web = "",
        whatsapp = "",
        uid = "",
        userId = ""
    } = data;


    /*
     * Escapar caracteres especiales de vCard.
     */
    const escapeVCF = (value) => {
        if (value === null || value === undefined) {
            return "";
        }

        return String(value)
            .replace(/\\/g, "\\\\")
            .replace(/\r?\n/g, "\\n")
            .replace(/;/g, "\\;")
            .replace(/,/g, "\\,");
    };


    /*
     * Agregar campo únicamente si tiene valor.
     */
    const campo = (campo, valor) => {
        if (!valor) return null;

        return `${campo}:${escapeVCF(valor)}`;
    };


    /*
     * Nombre completo.
     */
    const nombreCompleto = nombre.trim();


    /*
     * Separar nombre para el campo N.
     *
     * Guillermo Jimenez Lopez
     * ↓
     * nombre = Guillermo
     * apellidos = Jimenez Lopez
     */
    const partesNombre = nombreCompleto
        .split(/\s+/)
        .filter(Boolean);

    const nombreVCF = partesNombre.shift() || "";
    const apellidosVCF = partesNombre.join(" ");


    /*
     * Teléfono principal.
     *
     * cell tiene prioridad sobre tel.
     */
    const telefono = cell || tel;


    /*
     * Dirección.
     *
     * Como tu dirección viene en un solo campo,
     * la dejamos como dirección HOME.
     */
    const direccionVCF = direccion
        ? `ADR;TYPE=HOME:;;${escapeVCF(direccion)};;;;`
        : null;


    /*
     * Construcción de la vCard.
     */
    const lineas = [

        "BEGIN:VCARD",
        "VERSION:3.0",

        // Nombre
        `N:${escapeVCF(apellidosVCF)};${escapeVCF(nombreVCF)};;;`,
        campo("FN", nombreCompleto),

        // Trabajo
        campo("ORG", empresa),
        campo("TITLE", puesto),

        // Teléfono
        telefono
            ? `TEL;TYPE=CELL:${escapeVCF(telefono)}`
            : null,

        // Email
        email
            ? `EMAIL;TYPE=INTERNET:${escapeVCF(email)}`
            : null,

        // Página web
        campo("URL", web),

        // Dirección
        direccionVCF,

        // Nota
        campo("NOTE", note),

        /*
         * WhatsApp
         *
         * Se genera como número telefónico para
         * facilitar su reconocimiento por apps
         * de contactos.
         */
        whatsapp
            ? `X-WHATSAPP:${escapeVCF(whatsapp)}`
            : null,

        // Redes sociales
        facebook
            ? `X-SOCIALPROFILE;TYPE=facebook:${escapeVCF(facebook)}`
            : null,

        instagram
            ? `X-SOCIALPROFILE;TYPE=instagram:${escapeVCF(instagram)}`
            : null,

        linkedin
            ? `X-SOCIALPROFILE;TYPE=linkedin:${escapeVCF(linkedin)}`
            : null,

        /*
         * Identificadores de VcardApp.
         */
        uid
            ? `UID:${escapeVCF(uid)}`
            : null,

        userId
            ? `X-VCARDAPP-USERID:${escapeVCF(userId)}`
            : null,

        /*
         * Fecha de actualización.
         */
        data.update_at
            ? `REV:${data.update_at.replace(/-/g, "")}T000000Z`
            : null,

        /*
         * Foto.
         */
        obtenerFotoVCF(foto),

        "END:VCARD"

    ].filter(Boolean);


    /*
     * Crear contenido final.
     */
    const vcard = lineas.join("\r\n");


    /*
     * Crear archivo.
     */
    const blob = new Blob(
        [vcard],
        {
            type: "text/vcard;charset=utf-8"
        }
    );


    /*
     * Crear URL temporal.
     */
    const url = URL.createObjectURL(blob);


    /*
     * Nombre del archivo.
     */
    const archivo = nombreCompleto
        ? nombreCompleto
            .replace(/[<>:"/\\|?*]/g, "")
            .trim()
        : userId || "contacto";


    /*
     * Descargar archivo.
     */
    const link = document.createElement("a");

    link.href = url;
    link.download = `${archivo}.vcf`;

    document.body.appendChild(link);

    link.click();

    link.remove();


    /*
     * Liberar memoria.
     */
    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 1000);


    /*
     * Retornar el contenido por si
     * VcardApp necesita utilizarlo.
     */
    return vcard;
}


/**
 * Convierte una imagen Data URL Base64
 * al formato PHOTO de vCard 3.0.
 */
function obtenerFotoVCF(foto) {

    if (!foto) {
        return null;
    }


    /*
     * Ejemplo:
     *
     * data:image/jpeg;base64,/9j/4AAQ...
     */
    const match = foto.match(
        /^data:image\/([a-zA-Z0-9.+-]+);base64,(.+)$/
    );

    if (!match) {
        return null;
    }


    let tipo = match[1].toUpperCase();

    /*
     * Normalizar JPEG.
     */
    if (tipo === "JPG") {
        tipo = "JPEG";
    }


    const base64 = match[2];


    /*
     * vCard 3.0 permite PHOTO embebida
     * mediante ENCODING=b.
     *
     * Se divide en líneas para evitar
     * problemas con aplicaciones que
     * manejan líneas largas.
     */
    const lineasBase64 = base64.match(/.{1,75}/g) || [];


    if (!lineasBase64.length) {
        return null;
    }


    const resultado = [
        `PHOTO;ENCODING=b;TYPE=${tipo}:${lineasBase64[0]}`
    ];


    /*
     * Las líneas siguientes deben comenzar
     * con un espacio según el folding de vCard.
     */
    for (let i = 1; i < lineasBase64.length; i++) {
        resultado.push(` ${lineasBase64[i]}`);
    }


    return resultado.join("\r\n");
}

export function generarVCF3(data = {}) {

    const {
        nombre = "",
        cell = "",
        tel = "",
        email = "",
        empresa = "",
        puesto = "",
        direccion = "",
        note = "",
        foto = "",
        facebook = "",
        instagram = "",
        linkedin = "",
        web = "",
        whatsapp = "",
        uid = "",
        userId = "",
        update_at = ""
    } = data;

    const escapeVCF = (value) => {
        if (value === null || value === undefined) {
            return "";
        }

        return String(value)
            .replace(/\\/g, "\\\\")
            .replace(/\r?\n/g, "\\n")
            .replace(/;/g, "\\;")
            .replace(/,/g, "\\,");
    };

    const campo = (campo, valor) => {
        if (!valor) return null;

        return `${campo}:${escapeVCF(valor)}`;
    };

    const partesNombre = nombre
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    const nombreVCF = partesNombre.shift() || "";
    const apellidosVCF = partesNombre.join(" ");

    const telefono = cell || tel;

    const direccionVCF = direccion
        ? `ADR;TYPE=HOME:;;${escapeVCF(direccion)};;;;`
        : null;

    const lineas = [
        "BEGIN:VCARD",
        "VERSION:3.0",

        `N:${escapeVCF(apellidosVCF)};${escapeVCF(nombreVCF)};;;`,
        campo("FN", nombre),

        campo("ORG", empresa),
        campo("TITLE", puesto),

        telefono
            ? `TEL;TYPE=CELL:${escapeVCF(telefono)}`
            : null,

        email
            ? `EMAIL;TYPE=INTERNET:${escapeVCF(email)}`
            : null,

        campo("URL", web),

        direccionVCF,

        campo("NOTE", note),

        whatsapp
            ? `X-WHATSAPP:${escapeVCF(whatsapp)}`
            : null,

        facebook
            ? `X-SOCIALPROFILE;TYPE=facebook:${escapeVCF(facebook)}`
            : null,

        instagram
            ? `X-SOCIALPROFILE;TYPE=instagram:${escapeVCF(instagram)}`
            : null,

        linkedin
            ? `X-SOCIALPROFILE;TYPE=linkedin:${escapeVCF(linkedin)}`
            : null,

        uid
            ? `UID:${escapeVCF(uid)}`
            : null,

        userId
            ? `X-VCARDAPP-USERID:${escapeVCF(userId)}`
            : null,

        update_at
            ? `REV:${update_at.replace(/-/g, "")}T000000Z`
            : null,

        obtenerFotoVCF(foto),

        "END:VCARD"

    ].filter(Boolean);

    const vcard = lineas.join("\r\n");

    return {
        vcard,
        blob: new Blob(
            [vcard],
            {
                type: "text/vcard;charset=utf-8"
            }
        ),
        nombre: nombre.trim() || userId || "contacto"
    };
}

export function descargarVCF(data) {

    const {
        blob,
        nombre
    } = generarVCF3(data);

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${nombre}.vcf`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 1000);
}