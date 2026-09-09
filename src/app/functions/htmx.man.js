import { handleEventListener } from "../hooks/handleEventListener";
import { fun } from './functions.objects';

export const mx = () => {
    console.warn('Load mx');
    const elements = document.querySelectorAll("[mx-fun], [mx-get], [mx-post], [mx-put], [mx-delete]");

    elements.forEach((ele) => {
        const method =
            ele.hasAttribute("mx-fun") ? "FUN" :
                ele.hasAttribute("mx-get") ? "GET" :
                    ele.hasAttribute("mx-post") ? "POST" :
                        ele.hasAttribute("mx-put") ? "PUT" :
                            ele.hasAttribute("mx-delete") ? "DELETE" :
                                null;

        if (!method) return;
        console.warn(method);
        //Obtener valores de los atributos
        const exe = ele.getAttribute(`mx-${method.toLowerCase()}`);
        const handle = ele.getAttribute("mx-handle");
        const target = ele.getAttribute("mx-target");
        const swap = ele.getAttribute("mx-swap") || "innerHTML";
        const trigger = ele.getAttribute("mx-trigger") || "click";

        const execute = async (e) => {
            e.preventDefault();
            if (method === 'FUN') {
                if (exe) {
                    console.warn(exe);
                    fun[exe](e, target, swap);
                }
            }
        }
        //ele.addEventListener(trigger, execute);
        addEventListenerMx(trigger, execute, ele, handle);
    });
};


/* ==========================
  HANDLE EVENT LISTENER MX
========================== */
export const addEventListenerMx = (trigger, fn, ele, handle = true) => {
    (ele ?? document).addEventListener(trigger, fn);
    if (handle) { return }
    handleEventListener(trigger, fn, ele);
};
