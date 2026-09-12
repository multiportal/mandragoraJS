import {
  getFunctions,
  httpsCallable
} from "firebase/functions";

import { App } from "./firebase";

const functions = getFunctions(App, "us-central1");

export async function eliminarUsuario(uid) {

  if (!uid) {
    throw new Error("UID de usuario requerido");
  }

  try {

    const eliminarUsuarioFn = httpsCallable(
      functions,
      "eliminarUsuario"
    );

    const result = await eliminarUsuarioFn({
      uid
    });

    console.log(
      "Usuario eliminado:",
      result.data
    );

    return result.data;

  } catch (error) {

    console.error(
      "Error al eliminar usuario:",
      error
    );

    throw error;
  }
}


/*import { getAuth } from "firebase-admin/auth";

export async function eliminarUsuario(uid) {
  try {
    await getAuth().deleteUser(uid);
    console.log(`Usuario ${uid} eliminado`);
    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}*/

/*
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

initializeApp();

export const eliminarUsuario = onCall(
  async (request) => {

    // ========================================
    // VERIFICAR AUTENTICACIÓN
    // ========================================

    if (!request.auth) {

      throw new HttpsError(
        "unauthenticated",
        "Debes estar autenticado."
      );

    }

    // ========================================
    // UID DEL USUARIO A ELIMINAR
    // ========================================

    const uid = request.data?.uid;

    if (!uid) {

      throw new HttpsError(
        "invalid-argument",
        "El UID es obligatorio."
      );

    }

    // ========================================
    // ELIMINAR USUARIO
    // ========================================

    try {

      await getAuth().deleteUser(uid);

      console.log(
        `Usuario eliminado: ${uid}`
      );

      return {
        success: true,
        uid: uid
      };

    } catch (error) {

      console.error(
        "Error eliminando usuario:",
        error
      );

      throw new HttpsError(
        "internal",
        "No se pudo eliminar el usuario."
      );
    }
  }
);
*/