export function validaImagen(url,id){
  var image = new Image();
  image.src = url;
  image.addEventListener('load', () => {
    console.log('Imagen cargada.');
    //id.style.backgroundImage = `url('${url}')`;
  });
  image.addEventListener('error', () => {
    console.warn('Error: Fallo carga de imagen.',url);
    id.style.backgroundImage = `url(assets/img/no-disponible.jpg)`;
  });
}

export function validImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      console.log('Imagen encontrada');
      resolve(true);
    };
    image.onerror = () => {
      console.log('Imagen No encontrada');
      resolve(false);
    };
  });
}

export async function validImage2(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch (error) {
    console.error('Error validando imagen:', error);
    return false;
  }
}