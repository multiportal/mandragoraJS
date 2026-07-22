import { toggleEye } from "../../../functions.js";
import { showMessage } from "../../../hooks/messages.js";
import Html from './index.html?raw';
//import './style.css';

export function register() {
  
  const btnGuardar = () => {

  };

  const onLoad = () => {
    toggleEye();
    btnGuardar();
  }

  setTimeout(onLoad, 0);
  return Html;
}