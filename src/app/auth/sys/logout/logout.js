//import { signOut } from "firebase/auth";
//import { auth } from "../../../services/firebase.js";
import { navigate } from "../../../../routes/routes.js";
import { clearCache } from "../../../functions.js";
import Html from './index.html?raw';
//import './style.css'

export function logout() {
  const closeSesion = async () => {
    //await signOut(auth);
    console.log('Cerrando sesión...');
    localStorage.clear();
    console.log("LocalStorage limpiado");
    await clearCache();
    console.log("Cache limpiado");
    const token = localStorage.getItem("Token");
    if (token == null) {
      console.warn('TOKEN CLEAR');
      navigate('#/');
    }
  }

  const onLoad = () => {
    setTimeout(closeSesion, 3000);
  }

  setTimeout(onLoad, 0);
  return Html;
}