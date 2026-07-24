/* ==========================
   LOAD 
========================== */
/** Comprimir imagen base64 */
export async function compressImage(
    file,
    maxWidth = 800,
    maxHeight = 800,
    quality = 0.8
) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                let { width, height } = img;
                // Mantener la proporción
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                // Convertir a Base64 comprimido
                const base64 = canvas.toDataURL("image/jpeg", quality);
                resolve(base64);
            };
            img.onerror = reject;
            img.src = event.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/** Imagen en base 64 */
export async function imageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export function convertirBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = error => reject(error);
    });
}

/*
<input type="file" id="imagen" accept="image/*">

const input = document.getElementById("imagen");

input.addEventListener("change", async (e) => {
    const archivo = e.target.files[0];

    if (!archivo) return;

    const base64 = await convertirBase64(archivo);

    console.log(base64);
});

*/