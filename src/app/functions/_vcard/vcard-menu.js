import { consoleLocal, getCurrentUserData } from "../../functions";

export const menuComunidad = async () => {
    const userData = await getCurrentUserData();
    if (!userData) {
        consoleLocal('warn', userData);
        const vcards = document.querySelector('.menu-vcards');
        if (vcards) { vcards.style.display = 'none'; }
        const perfil = document.querySelector('.menu-profile');
        perfil?.setAttribute('href', '/dashboard');
    }
};

