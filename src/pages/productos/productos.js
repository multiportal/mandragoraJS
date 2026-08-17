import { consoleLocal } from '../../app/functions.js';
import { getData } from '../../app/services/firebase.js';
import Html from './index.html?raw';
import './style.css';

export function productos() {
    const tab = "productos";

    const products = async () => {
        const productList = document.querySelector('#product-list');
        if (!productList) { return; }
        let html = '';
        const data = await getData(tab); consoleLocal('log', data);
        const n = (data) ? data.length : 0; console.log(n);
        if (!data) {
            productList.innerHTML = '<p class="text-center">No hay productos disponibles.</p>';
            return;
        }
        //Cards
        let tot = 0;
        for (const item of data) {
            tot++;
            const { Id, key, nombre, precio, link, desc } = item;
            html += `
                <div class="card mb-3" key="${key}">
                    <div class="card-body">
                        <h5 class="card-title mb-0">${nombre} - $${precio}.00</h5>
                        <p class="card-text">${desc}</p>
                        ${link ? `<a href="${link}" class="btn btn-primary">Comprar</a>` : ''}
                    </div>
                </div>
            `;
        }
        console.log('Registros encontrados:', tot);
        productList.innerHTML = tot == 0 ? `<p class="text-center">${tot} tarjetas disponibles.</p>` : html;
    };

    const onLoad = () => {
        setTimeout(() => {
            products();
        }, 1000);
    }

    setTimeout(onLoad, 0);
    return Html;
}