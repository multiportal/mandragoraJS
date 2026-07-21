import Html from './index.html?raw';
import './style.css';

export function productos() {
    const tab = "productos";

    const products = async () => {
        let html = '';
        
    };

    const onLoad = () => {
        setTimeout(() => {
            products();
        }, 1000);
    }

    setTimeout(onLoad, 0);
    return Html;
}