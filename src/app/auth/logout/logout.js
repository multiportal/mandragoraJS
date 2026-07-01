import { signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth } from "../../services/firebase.js";
import { navigate } from "../../../routes/routes";
import Html from './index.html?raw';

export function logout() {
  const closeSesion = async () => {
    await signOut(auth);
    //localStorage.removeItem('Token');
    //localStorage.removeItem('userBasic');
    console.log('Cerrando sesión...');
    localStorage.clear();
    console.log("LocalStorage limpiado");
    navigate('/');
  }

  const onLoad = () => {
    setTimeout(closeSesion, 3000);
  }

  setTimeout(onLoad, 0);
  return Html;
}