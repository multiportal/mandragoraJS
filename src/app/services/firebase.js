import { initializeApp } from "firebase/app";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set, push, child, remove, onValue, get, update, orderByChild, equalTo } from "firebase/database";
import { showMessage } from "../hooks/messages";
import { prefix, FirebaseCfg } from "../core/constants";
// TODO: Add SDKs for Firebase products that you want to use
export let fbCfg = FirebaseCfg != null && Object.keys(FirebaseCfg).length !== 0;
console.log('Firebase SDK: ', fbCfg);
if (!fbCfg) {
  console.error("ERROR: NO EXISTE CONFIGURACIÓN FIREBASE!", 'FirebaseCfg:', FirebaseCfg);
}

// Your web app's Firebase configuration
const firebaseConfig = FirebaseCfg;

// Initialize Firebase
export const App = (!fbCfg) ? null : initializeApp(firebaseConfig);
export const auth = (!fbCfg) ? null : getAuth(App);
export const db = (!fbCfg) ? null : getDatabase(App);//Realtime Database
export const fs = (!fbCfg) ? null : getFirestore(App);//FireStore

/* ==========================
   FUNCIONES CRUD
========================== */
/** GET - LISTAR **/
export function getData(tab) {
  if (!fbCfg) {return}
  return new Promise((resolve, reject) => {
    const tabRef = ref(db, `${prefix}${tab}/`);
    onValue(tabRef, (snapshot) => {
      const data = snapshot.val(); //console.log(data);
      data ? resolve(Object.entries(data).map(([key, item]) => ({ key, ...item }))) : resolve(null);
    }, (error) => {
      reject(error);
    });
  });
}

/** CREAR NUEVO REGISTRO **/
export async function createData(tab, body, msj = true) {
  const newRef = push(ref(db, `${prefix}${tab}/`));
  await set(newRef, body);
  if (msj) showMessage("Se agrego correctamente", "Exito");
  return newRef.key;
}

/** CREAR/REEMPLAZAR REGISTRO **/
export function postData(tab, id, body, msj = true) {
  set(ref(db, `${prefix}${tab}${id ? `/${id}` : ``}`), body);
  if (id) { if (msj) showMessage("Se actualizo correctamente", "Exito"); }
  else { if (msj) showMessage("Se agrego correctamente", "Exito"); }
}

/** EDITAR REGISTRO **/
export async function putData(tab, id, body, msj = true) {
  await update(ref(db, `${prefix}${tab}/${id}`), body);
  if (msj) showMessage("Se actualizo correctamente", "Exito");
}

/** BORRAR REGISTRO **/
export async function deleteData(tab, id, msj = true) {
  await remove(ref(db, `${prefix}${tab}/${id}`));
  if (msj) showMessage("Se elimino correctamente", "Exito");
}

/** BUSCAR POR ID REGISTRO **/
export async function getDataById(tab, id) {
  if (!fbCfg) {return;}
  const snapshot = await get(child(ref(db), `${prefix}${tab}/${id}`));
  if (!snapshot.exists()) { return null; }
  return {
    key: snapshot.key,
    ...snapshot.val()
  };
}

/** ESCUCHAR UN REGISTRO POR ID **/
/* ===========================================================
Ejemplo:
const unsubscribe = onDataById("users", "12345", (data) => {
  console.log("Datos actualizados:", data);
});
=========================================================== */
export function onDataById(tab, id, callback) {
  const dbRef = ref(db, `${prefix}${tab}/${id}`);
  return onValue(dbRef, (snapshot) => {
    if (!snapshot.exists()) {
      callback(null);
      return;
    }
    callback({
      key: snapshot.key,
      ...snapshot.val()
    });
  });
}

export async function onDataByIdA(tab, id) {
  return new Promise((resolve, reject) => {
    const dbRef = ref(db, `${prefix}${tab}/${id}`);
    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        unsubscribe(); // deja de escuchar

        if (!snapshot.exists()) {
          resolve(null);
          return;
        }

        resolve({
          key: snapshot.key,
          ...snapshot.val()
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/** CONSULTAR POR CAMPO **/
export async function queryData(tab, field, value) {
  const q = query(
    ref(db, `${prefix}${tab}`),
    orderByChild(field),
    equalTo(value)
  );
  const snapshot = await get(q);
  if (!snapshot.exists()) return [];
  return Object.entries(snapshot.val()).map(([key, item]) => ({
    key,
    ...item
  }));
}

/** CONSULTAR VARIOS CAMPO **/
/* ============================
Ejemplo:
const users = await queryData(
    "users",
    orderByChild("email"),
    equalTo("memo@gmail.com")
);
============================ */
export async function queryDataAll(tab, ...constraints) {
  const q = query(
    ref(db, `${prefix}${tab}`),
    ...constraints
  );
  const snapshot = await get(q);
  if (!snapshot.exists()) return [];
  return Object.entries(snapshot.val()).map(([key, item]) => ({
    key,
    ...item
  }));
}


/* ==========================
   APP - SESION
========================== */
export const loginCheck = (user) => {
  const loggedOutLinks = document.querySelectorAll(".logged-out");
  const loggedInLinks = document.querySelectorAll(".logged-in");
  //console.log(loggedOutLinks); console.log(loggedInLinks);
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = "block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));
  } else {
    loggedInLinks.forEach((link) => (link.style.display = "none"));
    loggedOutLinks.forEach((link) => (link.style.display = "block"));
  }
};

export function saveUser(user) {
  //console.log('saveUser');
  var u = {
    uid: user.uid,
    usuario: user.displayName ?? '',
    email: user.email,
    foto: user.photoURL ?? ''
  };
  set(ref(db, prefix + "signup/" + user.uid), u);
  //localStorage.setItem('userBasic', JSON.stringify(u));
}

export function getUserSesionBasic(user) {
  const tabRef = ref(db, prefix + 'signup/');
  onValue(tabRef, (snapshot) => {
    const data = snapshot.val();
    for (let key in data) {
      const u = data[key];
      if (u.uid == user.uid) {
        localStorage.setItem('userBasic', JSON.stringify(u)); //console.log(u);
      }
    }
  });
}

export function getUserSesion(user) {
  const foto = document.querySelector("#photo");
  const nom = document.querySelector("#nombre_session");
  const mail = document.querySelector("#email_session");
  const uid = document.querySelector("#id_code_google");
  const tabRef = ref(db, prefix + 'signup/');
  onValue(tabRef, (snapshot) => {
    const data = snapshot.val(); //console.log(data);
    for (let key in data) {
      const u = data[key];
      if (u.uid == user.uid) {
        console.log(u);
        const f = (u.foto == null) ? page_url + 'assets/img/sinfoto.png' : u.foto;
        foto.innerHTML = '<img src="' + f + '" class="img-fluid rounded-circle">';
        nom.innerHTML = (u.usuario == null) ? u.email : u.usuario;
        mail.innerHTML = u.email;
        uid.innerHTML = u.uid;
      }
    }
  });
}

export function sesionActiva({ mod, ext }) {
  if (!fbCfg) {
    const loggedInLinks = document.querySelectorAll(".logged-in");
    if (!loggedInLinks) { return; }
    loggedInLinks.forEach((link) => (link.style.display = "none"));
  } else {
    onAuthStateChanged(auth, async (user) => {
      console.warn(mod, 'sesion activa:', user);
      if (user) {
        loginCheck(user);
        if (mod == 'dashboard') {
          try {
            saveUser(user);
            setTimeout(() => {
              getUserSesionBasic(user);
            }, 800);
          } catch (error) {
            console.log(error);
          }
          if (mod == 'dashboard' && ext == '') {
            const w = localStorage.getItem('welcome');
            if (w === 'false') {
              showMessage('Bienvenido', 'Información');
              localStorage.setItem('welcome', true);
            }
          }
        }
      } else {
        loginCheck(user);
        localStorage.setItem('welcome', false);
      }
    });
  }
}

export const totalTab = async (tab) => {
  const data = await getData(tab);
  const total = data ? data.length : 0
  return total;
};