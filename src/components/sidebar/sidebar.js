import { navigate } from '../../routes/routes.js';
import { variables } from '../../app/core/lib.js';
import Html from './index.html?raw';

export function sidebar() {
    const { screenw } = variables();
    const getUserStorage = () => JSON.parse(localStorage.getItem('userBasic'));

    const btnLogout = () => {
        let btnSalir = document.querySelector('.bx-log-out');
        if (btnSalir != null) {
            btnSalir.addEventListener('click', () => {
                navigate('#/logout');
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
        });
    };

    const getUser = () => {
        //INFO USER /////////
        const u = document.querySelector('.profile_name');
        const job = document.querySelector('.job');
        const fotoUser = document.querySelector('#fotoUser');
        const userBasic = getUserStorage();
        if (!userBasic) return;
        const { foto, email, usuario, uid } = userBasic;
        if (u != null) { u.innerHTML = usuario || email.split("@")[0]; }
        if (job != null) { job.innerHTML = email; }
        if (fotoUser != null) {
            if(foto) 
            fotoUser.src = foto; 
        }
    };

    const onLoad = () => {
        btnArrowMenu();
        btnSidebar();
        btnLogout();
        const userBasic = getUserStorage();
        setTimeout(() => { getUser(); }, userBasic ? 0 : 1000);

        if (screenw <= 740) {
            let side = document.querySelector('.sidebar');
            side.classList.add('close');
        }
    }

    setTimeout(onLoad, 0);
    return Html;
}