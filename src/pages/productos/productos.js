import Html from './index.html?raw';
import './style.css';
//import { getData } from '../../app/services/firebase.js';

export function productos() {
    const tab = "productos";

    const products = async () => {
  
    };

    const onLoad = () => {
        setTimeout(() => {
            products();
        }, 1000);
    }

    setTimeout(onLoad, 0);
    return Html;
}