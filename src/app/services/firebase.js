import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { getDatabase, ref, set, push, child, remove, onValue, get, update } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { showMessage } from "../functions";
import { variables } from "../core/lib";
import { prefix } from "../core/constants";
import { navigate } from "../../routes";
// TODO: Add SDKs for Firebase products that you want to use
console.log('Firebase SDK');
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOEuKTZEPTnUdjwzNpjVJdWAnz45umM-w",
  authDomain: "ventaapp-45918.firebaseapp.com",
  projectId: "ventaapp-45918",
  storageBucket: "ventaapp-45918.firebasestorage.app",
  messagingSenderId: "216887757045",
  appId: "1:216887757045:web:3434c08f0ade7e33819dbc",
  measurementId: "G-B6S3HZQW7N"
};

// Initialize Firebase
export const App = initializeApp(firebaseConfig);
export const auth = getAuth(App);
export const db = getDatabase(App);//Realtime Database
export const fs = getFirestore(App);//FireStore

/* ==========================
   FUNCIONES CRUD
========================== */
/** GET - LISTAR **/
export function getData(tab) {
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
export async function createData(tab, body) {
  const newRef = push(ref(db, `${prefix}${tab}/`));
  await set(newRef, body);
  showMessage("Se agrego correctamente", "Exito");
  return newRef.key;
}

/** EDITAR REGISTRO **/
export async function putData(tab, id, body) {
  await update(ref(db, `${prefix}${tab}/${id}`), body);
  showMessage("Se actualizo correctamente", "Exito");
}

/** CREAR/EDITAR REGISTRO **/
export function postData(tab, body) {
  set(ref(db, `${prefix}${tab}/`), body);
}

/** BORRAR REGISTRO **/
export async function deleteData(tab, id) {
  await remove(ref(db, `${prefix}${tab}/${id}`));
  showMessage("Se elimino correctamente", "Exito");
}

/** BUSCAR POR ID REGISTRO **/
export async function getDataById(tab, id) {
  const snapshot = await get(child(ref(db), `${prefix}${tab}/${id}`));
  if (!snapshot.exists()) { return null; }
  return {
    key: snapshot.key,
    ...snapshot.val()
  };
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
        localStorage.setItem('userBasic', JSON.stringify(u));
        console.log(u);
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
        const f = (u.foto == null) ? page_url + 'bloques/files/images/photos/sinfoto.png' : u.foto;
        foto.innerHTML = '<img src="' + f + '" class="img-fluid rounded-circle">';
        nom.innerHTML = (u.usuario == null) ? u.email : u.usuario;
        mail.innerHTML = u.email;
        uid.innerHTML = u.uid;
      }
    }
  });
}

export function sesionActiva(v) {
  const { mod, ext } = v;
  onAuthStateChanged(auth, async (user) => {
    console.log(mod, 'sesion activa:', user);
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
        const w = localStorage.getItem('welcome');
        if (w === 'false') {
          showMessage('Bienvenido', 'Información');
          localStorage.setItem('welcome', true);
        } 
      }
    } else {
      loginCheck(user);
      localStorage.setItem('welcome', false);
    }
  });
}