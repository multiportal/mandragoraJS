import { getData, createData, putData, deleteData, getDataById } from '../../../services/firebase';
import { consoleLocal, getFormData, resetForm, btnBorrar, btnCancelar, toggleTitle, fillForm, closeModal } from '../../../functions';
import { handleEventListener } from '../../../hooks/handleEventListener';
import { variables } from '../../../core/lib';
import Swal from 'sweetalert2';
import Html from './index.html?raw';

export function productsDashboard() {
    const tab = "productos";
    const { fecha } = variables();

    const btnAgregar = () => {
        handleEventListener("click", async (e) => {
            const btn = e.target.closest(".btnAdd");
            if (!btn) return;
            localStorage.setItem("Mode", "add");
            const user = JSON.parse(localStorage.getItem('userBasic'));
            document.querySelector("#create_at").value = fecha;
            document.querySelector("#uid").value = user.uid;
            toggleTitle();
        })
    };

    const btnEditar = () => {
        handleEventListener("click", async (e) => {
            const btn = e.target.closest(".btnEdit");
            if (!btn) return;
            const key = btn.getAttribute("data-id");
            console.log("Editar:", key);
            localStorage.setItem("Mode", "edit");
            localStorage.setItem("Key", key);
            const item = await getDataById(tab, key);//console.log(item);
            if (!item) { return; }
            toggleTitle();
            fillForm(item);
            //document.querySelector("#update_at").value = fecha;
        });
    };

    const btnGuardar = () => {
        const form = document.querySelector("#save-form");
        if (!form) return;
        handleEventListener("submit", async (e) => {
            e.preventDefault();
            const mode = localStorage.getItem("Mode");
            if (!mode) return;
            console.log("Mode:", mode);
            const body = getFormData(form, "id"); //console.log(body);
            if (mode == "add") {
                createData(tab, body);
            } else {
                const key = localStorage.getItem("Key");
                if (!key) return;
                putData(tab, key, body);
            }
            resetForm("#save-form");
            setTimeout(() => { productos(); }, 500);
            closeModal();
        }, form);
    }

    const productos = async () => {
        const productList = document.querySelector("#product-list");
        if (!productList) return;
        const inputID = document.querySelector("#Id");
        //* REGISTROS ********************* */
        const registros = await getData(tab); consoleLocal('log', registros);
        const newId = Math.max(0, ...(registros ?? [])
            .map(item => Number(item?.Id)).filter(Number.isFinite)) + 1; consoleLocal('log', `Nuevo ID: ${newId}`);
        //* DATOS ORDENADOS ********************* */
        const datos = registros?.sort((a, b) => Number(a.Id) - Number(b.Id));
        //* DATA ********************* */
        const data = datos; consoleLocal('log', data);
        localStorage.removeItem("Key");
        if (!data) {
            inputID.value = 1;
            productList.innerHTML = '<tr><td colspan="5"><p class="text-center">No hay productos disponibles.</p></td></tr>';
            return;
        }
        //Cards
        let html = '';
        for (const item of data) {
            var { Id, key, nombre, precio, link, desc, activo } = item;
            html += `
            <!--/TR ID: ${Id} -->
            <tr key="${key}">
              <th scope="row">${Id}</th>
              <td title="${link}">${nombre}</td>
              <td>$${precio}.00</td>
              <td>${desc}</td>
              <td>
                <span>${activo ? 'Activo' : 'Inactivo'}</span>
                <button type="button" data-id="${key}" class="btn btn-primary mb-3 btnEdit" data-bs-toggle="modal" data-bs-target="#Modal">
                  <i class="bi bi-pencil"></i>
                </button>
                <button type="button" data-id="${key}" class="btn btn-danger mb-3 btnDelete">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
            <!--/TR-->
          `;
        }
        //
        inputID.value = newId;
        console.log('Registros encontrados:', data.length);
        productList.innerHTML = data.length == 0 ? `<tr><td colspan="5"><p class="text-center">No hay productos disponibles.</p></td></tr>` : html;
    };

    const onLoad = () => {
        btnGuardar();
        btnAgregar();
        btnEditar();
        //BOTONES CONFIGURACION
        btnBorrar(tab, () => { productos(); });
        btnCancelar(() => { console.warn('Cancelado!!!', tab); resetForm("#save-form"); productos(); });
        setTimeout(() => { productos(); }, 1000);
    }

    setTimeout(onLoad, 0);
    return Html;
}