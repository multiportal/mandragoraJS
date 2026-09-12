import Swal from "sweetalert2";
import { consoleLocal, getFormData, btnBorrar, render } from '../../../functions';
import { getData, createData, putData  } from '../../../services/firebase';
import { showMessage } from "../../../hooks/messages";
import { navi } from '../../../core/core';
import Html from './index.html?raw';
import './style.css';

const tab = 'editPages';

export const addPage = async () => {
    console.log('Agregar');

    const { value: inputValue } = await Swal.fire({
        title: 'Agregar registro',
        input: 'text',
        inputLabel: 'Título',
        inputPlaceholder: 'Escribe el título',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value || !value.trim()) {
                return 'Debes ingresar un título';
            }
        }
    });

    if (inputValue) {
        const body = {
            titulo: inputValue.trim(),
            descHTML: '',
            activo: false
        };
        // Firebase
        try {
            await createData('editPages', body);
            setTimeout(() => { navi(`/dashboard/editorpages`); }, 1500);
        } catch (error) {
            console.error('Error al guardar:', error);
            showMessage('Error al guardar el registro', 'Error');
        }
    }
};

export const editPage = async (e, t) => {
    console.log('Editar');
    console.log('Target:', t);
    const btn = e.target.closest(".btn");
    if (!btn) return;
    const form = document.querySelector(`#form-${t}`);
    if (!form) {
        console.error('Target no encontrado:', t);
        return;
    }
    const key = btn.getAttribute("key");
    if (!key) return;
    const body = getFormData(form, "id"); //console.log(key, body);
    try {
        await putData(tab, key, body);
    } catch (error) {
        console.error('Error al editar:', error);
        showMessage('Error al editar el registro', 'Error');
    }
};

export function editorPagesDashboard() {
    const tab = 'editPages';

    const editor = async () => {
        const tabsMenu = document.querySelector('#nav-tab');
        const tabsContent = document.querySelector('#nav-tabContent');
        //* REGISTROS ********************* */
        const registros = await getData(tab);
        //const modValida = modPages.includes(mod);
        //* DATA ********************* */
        const data = registros; consoleLocal('log', data);
        if (!data || data?.length == 0) { return; }
        //CONTENT
        const htmlMenu = data.map(tabsMenuHTML).join("");
        const htmlContent = data.map(tabsContentHTML).join("");
        //
        tabsMenu.innerHTML = htmlMenu;
        tabsContent.innerHTML = htmlContent;
        document.querySelectorAll('#descHTML').forEach((textarea, index) => {
            textarea.value = data[index].descHTML;
        });
    };

    const tabsMenuHTML = ({ titulo }, index) => `
    <button
    class="nav-link ${index == 0 ? 'active' : ''}" 
    id="nav-${titulo}-tab" 
    data-bs-toggle="tab"
    data-bs-target="#nav-${titulo}" 
    type="button" 
    role="tab" 
    aria-controls="nav-${titulo}"
    aria-selected="${index == 0 ? 'true' : 'false'}"
    >
        ${titulo}
    </button>
    `;

    const tabsContentHTML = ({ key, titulo, descHTML, activo }, index) => `
    <div class="tab-pane fade ${index == 0 ? 'show active' : ''}" id="nav-${titulo}" role="tabpanel" aria-labelledby="nav-${titulo}-tab">
        <form id="form-${titulo}">                    
            <div class="mb-3">
                <label for="titulo" class="form-label">Titulo*</label>
                <input type="text" class="form-control" id="titulo" value="${titulo}" required>
            </div>
            <div class="mb-3">
                <label for="descHTML" class="form-label">Contenido</label>
                <textarea class="form-control" rows="5" id="descHTML"></textarea>
            </div>
            <hr>
            <div class="mb-1 content-buttons">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="activo"${activo ? 'checked' : ''}>
                    <label class="form-check-label" for="activo">Activo</label>
                </div>
                <button type="button" data-id="${key}" class="btn btn-danger btnDelete">
                    <i class="bi bi-trash"></i> Borrar 
                </button>
                <button type="button" mx-fun="btnEditPage" mx-target="${titulo}" key="${key}" class="btn btn-primary">
                <i class="bi bi-floppy-fill"></i> Guardar
                </button>
            </div>
        </form>
    </div>
    `;

    const onLoad = () => {
        editor();
        btnBorrar(tab, () => { navi(`/dashboard/editorpages`); });
    }

    setTimeout(onLoad, 0);
    return render(Html);
}