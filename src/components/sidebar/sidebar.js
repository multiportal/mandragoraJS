import { MODE, name } from '../../app/core/constants.js';
import { getData } from '../../app/services/firebase.js';
import { navigate } from '../../app/core/core.js';
import { variables } from '../../app/core/lib.js';
import { Auth } from '../../app/functions/security.js';
import Html from './index.html?raw';
import './style.css';
import { validImage } from '../../app/functions.js';

export function sidebar() {
    const { host, screenw, pathname, hash } = variables();
    const tab = "users";

    const user = async () => {
        const data = await getData(tab);
        if (!data) return null;
        return data;
    };

    const btnLogout = () => {
        let btnSalir = document.querySelector('.bx-log-out');
        if (btnSalir != null) {
            btnSalir.addEventListener('click', () => {
                navigate(`${MODE === 'HASH' ? '#' : ''}/logout`);
            });
        }
    };

    const btnArrowMenu = () => {
        let arrow = document.querySelectorAll(".arrow");
        for (var i = 0; i < arrow.length; i++) {
            arrow[i].addEventListener("click", (e) => {
                let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
                arrowParent.classList.toggle("showMenu");
            });
        }
    };

    const menuSidebar = () => {
        //SELECCION MENU
        const p = pathname == '/' ? '/Home' : pathname;
        const h = hash == '#/' ? '#/Home' : hash;
        const listaMenu = document.querySelector('.menuSidebar');
        if (!listaMenu) return;
        document.querySelectorAll(".menuSidebar a").forEach((link) => {
            const enlace = link.getAttribute("href") == '#/' ? '#/Home' : link.getAttribute("href");
            //console.warn(enlace, p, h);
            if (enlace == p || enlace == h) {
                link.classList.add("activo");
            }
        });
    };

    const btnSidebar = () => {
        const sidebar = document.querySelector(".sidebar");
        const sidebarBtn = document.querySelector(".bx-menu");
        if (!sidebar || !sidebarBtn) return;
        // Restaurar estado
        const isClosed = localStorage.getItem("statusSidebar") === "true";
        if (isClosed) {
            sidebar.classList.add("close");
        }
        console.log("Status Sidebar:", isClosed);
        // Guardar estado
        sidebarBtn.addEventListener("click", () => {
            const closed = sidebar.classList.toggle("close");
            localStorage.setItem("statusSidebar", closed);
            const status = localStorage.getItem("statusSidebar");
            console.log("Status Sidebar:", status);
            linkName();
        });
    };

    const getUser = async () => {
        const userBasic = JSON.parse(localStorage.getItem('userBasic'));
        //INFO USER /////////
        const u = document.querySelector('.profile_name');
        const job = document.querySelector('.job');
        const fotoUser = document.querySelector('#fotoUser');
        //OBTENER DATOS DE USUARIO
        const data = await user();
        const userData = data ? data.find(item => item.uid === userBasic?.uid) : null;
        const perfilData = userData ? userData : userBasic;
        if (host.includes('localhost')) { console.warn('PerfilData:', perfilData); }
        const { key, ID, foto, email, usuario, uid, userId, tel, direccion, create_at, update_at, publico } = perfilData;
        if (u != null) { u.innerHTML = usuario || email.split("@")[0]; }
        if (job != null) { job.innerHTML = email; }
        if (fotoUser != null) {
            const isValidImage = await validImage(foto);
            fotoUser.src = foto && foto != '' ? isValidImage ? foto : '/assets/img/sinfoto.png' : '/assets/img/sinfoto.png';
        }
    };

    const linkName = () => {
        const logoName = document.querySelector('.logo_name');
        const statusClose = document.querySelector('.close');
        if (logoName) {
            logoName.innerHTML = (!statusClose) ? name : '';
        }
    };

    const permisosMenu = async () => {
        const permisos = await Auth(); console.warn('AUTH:', permisos);
        if (permisos) {
            const opcAuth = document.querySelectorAll('.auth'); //console.log(opcAuth);
            const opcNoAuth = document.querySelectorAll('.noauth'); //console.log(opcNoAuth);
            //if (!opcAuth) { return; }
            opcAuth?.forEach(element => {
                element.classList.add('showAuth');
            });
            opcNoAuth?.forEach(element => {
                element.classList.add('hiddenAuth');
            });
        }
    };

    const onLoad = () => {
        btnArrowMenu();
        btnSidebar();
        btnLogout();
        menuSidebar();
        permisosMenu();
        const userBasic = JSON.parse(localStorage.getItem('userBasic'));
        setTimeout(() => { getUser(); linkName(); }, userBasic ? 0 : 1000);

        if (screenw <= 740) {
            let side = document.querySelector('.sidebar');
            side.classList.add('close');
        }
    }

    setTimeout(onLoad, 0);
    return Html;
}