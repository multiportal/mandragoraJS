import { variables } from '../../../core/lib';
import { render } from '../../../functions';
import { getDataById } from '../../../services/firebase';
import Html from './index.html?raw';

export async function articulo() {
    const { id } = variables(); console.log(id);
    const data = await getDataById('productos', id); console.log(data);
    const btnBack = () => {
        document.addEventListener("click", (e) => {
            const btn = e.target.closest(".btnBack");
            if (!btn) return;
            window.history.back();
        });
    };

    const onLoad = () => {
        btnBack();
    };

    setTimeout(onLoad, 0);
    return render(Html, { id, nombre: data.nombre, precio: data.precio, desc: data.desc});
}