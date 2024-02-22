import { consoleLocal } from "../functions";

function pagHome(){
    
}

export default function Home(){
    //Retardo para activar pagHome
    setTimeout(() => {
        pagHome();    
    }, 500);
}