import Html from './index.html?raw';
import './style.css';
import { getData } from '../../app/services/firebase.js';

export function productos() {
    const tab = "productos";

    const products = async () => {
        let html = '';
        const data = await getData(tab); console.log(data);
        const productList = document.querySelector('#product-list');
        if (!data) {
            productList.innerHTML = '<p class="text-center">No hay productos disponibles.</p>';
            return;
        }
        //Cards
        for (const item of data) {
            const { Id, key, nombre, precio, link, desc } = item;
            html += `
                <div class="card mb-3" key="${key}">
                    <div class="card-body">
                        <h5 class="card-title mb-0">${nombre} - $${precio}.00</h5>
                        <p class="card-text">${desc}</p>
                        <a href="${link ? link : ''}" class="btn btn-primary">Comprar</a>
                    </div>
                </div>
                `;
        }
        productList.innerHTML = html;
    };

    const onLoad = () => {
        setTimeout(() => {
            products();
        }, 1000);
    }

    setTimeout(onLoad, 0);
    return Html;
}