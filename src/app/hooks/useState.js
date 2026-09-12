//import { HASH } from "../core/constants";
//import { navi } from "../core/core";
/* ==========================
   USE-STATE
========================== */
export const useState = (initialValue) => {
    let state = initialValue;

    return [
        () => state,
        (newValue) => {
            state = newValue;
        }
    ];
};
//let rendering = false;
/*
export function useState(initial) {
    let state = initial;
    rendering = true;

    function setState(value) {

        if (Object.is(state, value)) return;

        state = value;

        if(rendering){
            navi(`/dashboard/profile`);
        }
        rendering = false;
    }

    return [() => state, setState];
}*/

