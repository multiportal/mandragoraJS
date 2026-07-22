import { temaHome } from '../../app/hooks/theme';
import Html from './index.html?raw';
import './style.css';

export function home() {

    const onLoad = () => {
        temaHome();
    }

    setTimeout(onLoad, 0);
    return Html;
}