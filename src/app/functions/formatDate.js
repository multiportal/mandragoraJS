export const formatDate = (value, mask = "dd/MM/yyyy", type = "string") => {
    let date;

    // ==========================
    // CONVERTIR A DATE
    // ==========================
    if (type === "string") {
        // Se espera: yyyy-MM-dd
        const [year, month, day] = value.split("-").map(Number);

        date = new Date(year, month - 1, day);
    }
    else if (type === "date") {
        date = value;
    }
    else {
        throw new Error("El tipo debe ser 'string' o 'date'");
    }

    // ==========================
    // VALIDAR
    // ==========================
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error("Fecha inválida");
    }

    // ==========================
    // VALORES
    // ==========================
    const yyyy = date.getFullYear();
    const yy = String(yyyy).slice(-2);

    const MM = String(date.getMonth() + 1).padStart(2, "0");
    const M = date.getMonth() + 1;

    const dd = String(date.getDate()).padStart(2, "0");
    const d = date.getDate();

    // ==========================
    // MÁSCARA
    // ==========================
    return mask
        .replace(/yyyy/g, yyyy)
        .replace(/yy/g, yy)
        .replace(/MM/g, MM)
        .replace(/M/g, M)
        .replace(/dd/g, dd)
        .replace(/d/g, d);
};

export const fechaComparable = (fecha) => {
    if (!fecha) return null;
    const [dia, mes, anio] = fecha.split("/");
    return `${anio}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
};