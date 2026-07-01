import { navigate } from '../../../routes/routes';
import { variables } from '../../core/lib';
import Html from './index.html?raw';

export function sidebar() {
    const { host, screenw } = variables();

    const btnLogout = () => {
        let btnSalir = document.querySelector('.bx-log-out');
        if (btnSalir != null) {
            btnSalir.addEventListener('click', () => {
                navigate('/logout');
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
        setTimeout(() => {
            const userBasic = JSON.parse(localStorage.getItem('userBasic'));
            const { foto, email, usuario, uid } = userBasic;
            if (u != null) { u.innerHTML = usuario || email.split("@")[0]; }
            if (job != null) { job.innerHTML = email; }
        }, 1000);
    };

    const onLoad = () => {
        btnArrowMenu();
        btnSidebar();
        btnLogout();
        getUser();

        if (screenw <= 740) {
            let side = document.querySelector('.sidebar');
            side.classList.add('close');
        }
    }

    setTimeout(onLoad, 0);
    return Html;
}