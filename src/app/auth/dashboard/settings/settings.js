import { sistemaComponent } from './components/sistema/sistema';
import { temaComponent } from './components/tema/tema';
import { gestionUsuarios } from './components/users/users';
import { developerComponent } from './components/developer/developer';
import { render } from '../../../functions';
import Html from './index.html?raw';
import './style.css';

export function settingsDashboard() {

    const onLoad = () => {

    }

    setTimeout(onLoad, 0);
    return render(Html, {
        Sistema: sistemaComponent(),
        Tema: temaComponent(),
        Users: gestionUsuarios(),
        Developer: developerComponent()
    });
}