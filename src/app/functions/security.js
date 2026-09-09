import { emailAuth, nivelesRolesAuth } from "../core/constants";
import { variables } from "../core/lib";
import { consoleLocal, getCurrentUserData } from "../functions";

export const rolesPermisos = {
    admin: [
        'users.read',
        'users.create',
        'users.update',
        'users.delete',
        'stats.read'
    ],

    editor: [
        'users.read',
        'users.update'
    ],

    viewer: [
        'users.read',
        'stats.read'
    ]
};

export const permisosNivel = {
    'N-1': { limitCard: 1000 },
    'N1': { limitCard: 1000 },
    'N2': { limitCard: 1000 },
    'N3': { limitCard: 100 },
    'N4': { limitCard: 10 },
    'N5': { limitCard: 1 },
};

export async function Auth() {
    const v = variables();
    const user = await getCurrentUserData();
    const rolNivel = rolNivelAuth(user?.codiPlan);
    const userNivel = rolNivel?.nivel ?? 5;
    const userRol = rolNivel?.rol ?? 'usuario';
    //consoleLocal(userNivel, nivelesRolesAuth[5].nivel);
    //consoleLocal(userRol, nivelesRolesAuth[5].rol);
    //console.log(user.email);
    /*Se debe obtener el Nivel y Rol de usuario [nivel - rol] */
    if ((userNivel !== nivelesRolesAuth[5].nivel && userRol !== nivelesRolesAuth[5].rol) || emailAuth.includes(user?.email)) {
        console.warn('AUTORIZADO');
        return true;
    } else {
        if (v.mod) {
            console.warn('AUTORIZACIÓN BAJA');
            return false;
        }
        console.log('NO AUTORIZADO');
        return false;
    }
}

export const rolNivelAuth = (cp) => {
    if (!cp) { return }
    const niv1 = cp.split(".");
    const niv2 = niv1[1].replace('N', '');
    const level = Number(niv2);
    return nivelesRolesAuth[level];
};

export const opcAuth = async (opc = null) => {
    const userData = await getCurrentUserData();
    const rolNivel = rolNivelAuth(userData?.codiPlan);
    const nivel = rolNivel?.nivel;
    const opcPermiso = permisosNivel[nivel];
    const limit = opcPermiso?.limitCard;
    const res = opc == 'nivel' ? nivel : opc == 'limit' ? limit : null;
    console.warn(res);
    return res;
};
