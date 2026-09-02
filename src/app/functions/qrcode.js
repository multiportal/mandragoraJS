import QRCode from 'qrcode';

export const createQR = async (ele, url) => {
    const canvas = document.querySelector(ele);
    if (!canvas) {
        console.error("Elemento no encontrado", ele);
        return;
    }
    try {
        await QRCode.toCanvas(canvas, url, {
            width: 200,
            margin: 2
        });
    } catch (error) {
        console.error("Error generado por QRCode", error);
    }
};

export const downloadQR = (element, filename = "qrcode.png") => {
    const canvas = document.querySelector(element);
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
};