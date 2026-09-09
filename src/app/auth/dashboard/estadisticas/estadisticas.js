import Chart from "chart.js/auto";
import { getData } from "../../../services/firebase";
import { consoleLocal, getCurrentUser } from "../../../functions";
import { handleEventListener } from "../../../hooks/handleEventListener";
import { formatDate, fechaComparable } from "../../../functions/formatDate";
import { showMessage } from "../../../hooks/messages";
import Html from "./index.html?raw";
import "./style.css";

export function estadisticasDashboard() {
    const tab = "registros";

    const formatoDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const calcularPeriodo = (periodo) => {
        const dateStart = document.getElementById("dateStart");
        const dateEnd = document.getElementById("dateEnd");
        const hoy = new Date();
        let inicio = new Date(hoy);
        let fin = new Date(hoy);

        switch (periodo) {
            case "today":
                break;

            case "7days":
                inicio.setDate(hoy.getDate() - 6);
                break;

            case "30days":
                inicio.setDate(hoy.getDate() - 29);
                break;

            case "90days":
                inicio.setDate(hoy.getDate() - 89);
                break;

            case "month":
                inicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
                break;

            case "year":
                inicio = new Date(hoy.getFullYear(), 0, 1);
                break;

            case "custom":
                return;

            default:
                return;
        }

        dateStart.value = formatoDate(inicio);
        dateEnd.value = formatoDate(fin);
    };

    const periodDate = () => {
        const filterPeriod = document.querySelector("#filterPeriod");
        if (!filterPeriod) {
            return;
        }
        let val = filterPeriod.value;
        filterPeriod.addEventListener("change", (e) => {
            val = e.target.value; //console.log("cambio", val);
            calcularPeriodo(val);
        }); //console.log(val);
        // Inicializar con el valor seleccionado
        calcularPeriodo(val);
        filters();
    };

    const btnFilters = () => {
        const btnApplyFilters = document.querySelector("#btnApplyFilters");
        if (!btnApplyFilters) { return; }
        handleEventListener("click", filters, btnApplyFilters);
    };

    const filters = async () => {
        const dateStart = formatDate(document.getElementById("dateStart").value);
        const dateEnd = formatDate(document.getElementById("dateEnd").value);
        //console.log("Aplicando filtros:", dateStart, dateEnd);
        const user = getCurrentUser();
        const dataKeysCards = await myVcards(user); //console.warn('MisCards', dataKeysCards);
        //* REGISTROS ******************************************************************** */
        const registros = await getData(tab); //consoleLocal("log", registros);
        if (!registros) { showMessage('No se encontaron registros, intentelo más tarde.', 'Error'); return; };
        //* DATOS FILTRADOS POR FECHA **************************************************** */
        const datosFecha = registros.filter((item) => {
            // Asegúrate de que la propiedad sea correcta
            const fechaRegistro = formatDate(item?.fecha);
            const fecha = fechaComparable(fechaRegistro);
            const fIni = fechaComparable(dateStart);
            const fFin = fechaComparable(dateEnd);
            //console.log(fIni, fecha, fFin);
            //if (!fechaRegistro) return false;
            return fecha >= fIni && fecha <= fFin;
        }); //console.log("Datos filtrados por fecha:", datosFecha);
        if (!datosFecha) { showMessage('No hay datos registrados. Verifique que la consulta se correcta.', 'Warn'); return; };
        //* DATOS FILTRADOS POR MIS TARJETAS ********************************************* */
        const filtrados = datosFecha.filter(x => dataKeysCards.includes(x.id));
        //console.log("Datos filtrados por mis tarjetas:", filtrados);
        /* VISITAS TOTALES *************************************************************** */
        const visitasTot = document.querySelector("#visitasTot");
        consoleLocal('log', "VISITAS TOTALES:" + filtrados.length);
        visitasTot.textContent = filtrados.length;
        /////////////////////////////////////////////////////////////////////////////////////
        //* DATOS FILTRADOS POR VISITANTE ************************************************ */
        const visitantesTot = document.querySelector("#visitantesTot");
        const datosVisit = filtrados.filter((item) => item.uid === 'visitante');
        //console.log("VISITANTES:", datosVisit);
        // VISITANTES UNICOS
        /*const vUnicos = Object.values(datosVisit.reduce((acc, item) => { acc[item.ip] ??= item; return acc; }, {}));*/
        const vUnicos = [...new Set(datosVisit.map(item => item.ip))];
        consoleLocal('log', "VISITANTES UNICOS:" + vUnicos.length);
        visitantesTot.textContent = vUnicos.length;
        //* DATOS FILTRADOS POR USER ***************************************************** */
        const usuariosTot = document.querySelector("#usuariosTot");
        const datosUser = filtrados.filter((item) => item.uid !== 'visitante');
        //console.log("USUARIOS:", datosUser);
        // USUARIOS UNICOS
        /*const uUnicos = Object.values(datosUser.reduce((acc, item) => { acc[item.uid] ??= item; return acc; }, {}));*/
        const uUnicos = [...new Set(datosUser.map(item => item.uid))];
        consoleLocal('log', "USUARIOS UNICOS:" + uUnicos.length);
        usuariosTot.textContent = uUnicos.length;
        /////////////////////////////////////////////////////////////////////////////////////
        /* VISITAS TOTALES *************************************************************** */
        const visitasTotUnicas = document.querySelector("#visitasTotUnicas");
        visitasTotUnicas.textContent = vUnicos.length + uUnicos.length;
    };

    const myVcards = async (user) => {
        //* REGISTROS ********************* */
        const registros = await getData('vcards');
        //* DATOS FILTRADOS POR UID ********************* */
        const datos = registros?.filter(item => item?.uid === user.uid)
            .sort((a, b) => Number(a.ID) - Number(b.ID));
        const keys = datos?.map(item => item.key);
        return keys;
    };

    const onLoad = () => {
        periodDate();
        btnFilters();

        const reload = setInterval(() => {
            const { pathname } = window.location;
            if (!pathname.includes('estadisticas')) {
                clearInterval(reload); // Se detiene si ya no estás en estadisticas
                console.log('Intervalo detenido');
                return;
            }
            console.log('Actualizando...');
            filters();
        }, 5 * 60000);
    };

    setTimeout(onLoad, 0);
    return Html;
}
