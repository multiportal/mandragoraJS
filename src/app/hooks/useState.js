//import { navigate } from "../../routes/routes";

//let rendering = false;
/*
export function useState(initial) {
    let state = initial;
    rendering = true;

    function setState(value) {

        if (Object.is(state, value)) return;

        state = value;

        if(rendering){
            navigate('/dashboard/profile');
        }
        rendering = false;
    }

    return [() => state, setState];
}*/

export const useState = (initialValue) => {
    let state = initialValue;

    return [
        () => state,
        (newValue) => {
            state = newValue;
        }
    ];
};

