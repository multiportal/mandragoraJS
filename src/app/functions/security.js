import { emailAuth } from "../core/constants";
import { variables } from "../core/lib";
import { getCurrentUser } from "../functions";

/*
user.role = 'admin';

user.permissions = [
    'users.read',
    'users.create',
    'users.update',
    'users.delete',
    'stats.read'
];
*/

export const roles = {
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

export function Auth() {
    const v = variables();
    const userBasic = getCurrentUser();
    const { email } = userBasic;
    /*TEMPORAL - Se debe obtener el nivel y Rol de usuario [admin - nivel] */
    if (emailAuth.includes(email)) {
        console.warn('AUTORIZADO');
        return true;
    } else {
        if(v.mod){
            console.error('NO AUTORIZADO');
            return false;
        }
        console.log('NO AUTORIZADO');
        return false;
    }
}