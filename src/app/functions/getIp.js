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

