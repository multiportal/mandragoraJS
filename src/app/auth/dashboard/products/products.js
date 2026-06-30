import Html from './index.html?raw';
import { getData, createData, putData, deleteData, getDataById } from '../../../services/firebase';

export function productsDashboard() {
    const tab = "productos";

    const toggleTitle = () => {
        const mode = localStorage.getItem("Mode");
        const tit = document.querySelector('#exampleModalLabel');
        tit.innerHTML = mode == 'edit' ? 'Editar' : 'Nuevo';
    };

    const btnCancelar = () => {
        document.addEventListener("click", (e) => {
            const btn = e.target.closest("#btnCancel");
            if (!btn) return;
            setTimeout(() => { productos(); }, 100);
        });
    };

    const btnBorrar = () => {
        document.addEventListener("click", (e) => {
            const btn = e.target.closest(".btnDelete");
            if (!btn) return;
            Swal.fire({
                title: "¿Esta seguro eliminar?",
                text: "¡Este cambio sera irreversible!",
                icon: "warning",
                showCancelButton: true,
                cancelButtonColor: "#6c757d",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
            }).then((result) => {
                if (result.isConfirmed) {
                    const fila = btn.closest("tr");
                    const key = fila.getAttribute("key");
                    console.log("Eliminar:", key);
                    deleteData(tab, key);
                    setTimeout(() => { productos(); }, 1000);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "Tu registro ha sido borrado",
                        icon: "success",
                    });
                }
            });
        });
    };

    const btnAgregar = () => {
        document.addEventListener("click", async (e) => {
            const btn = e.target.closest(".btnAdd");
            if (!btn) return;
            const form = document.querySelector("#save-form");
            form.reset();
            toggleTitle();
        })
    };

    const btnEditar = () => {
        document.addEventListener("click", async (e) => {
            const btn = e.target.closest(".btnEdit");
            if (!btn) return;
            const fila = btn.closest("tr");
            const key = fila.getAttribute("key");
            console.log("Editar:", key);
            localStorage.setItem("Mode", "edit");
            localStorage.setItem("Key", key);
            const item = await getDataById(tab, key);//console.log(item);
            document.querySelector("#Id").value = item.Id;
            document.querySelector("#nombre").value = item.nombre;
            document.querySelector("#precio").value = item.precio;
            document.querySelector("#link").value = item.link;
            document.querySelector("#desc").value = item.desc;
            toggleTitle();
        });
    };

    const btnGuardar = () => {
        const form = document.querySelector("#save-form");
        if (!form) return;
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const mode = localStorage.getItem("Mode");
            if (!mode) return;
            console.log("Mode:", mode);
            const Id = document.querySelector("#Id").value;
            const nombre = document.querySelector("#nombre").value;
            const precio = document.querySelector("#precio").value;
            const link = document.querySelector("#link").value;
            const desc = document.querySelector("#desc").value;
            const body = {
                Id,
                nombre,
                precio,
                link,
                desc,
            }; //console.log(body);
            if (mode == "add") {
                createData(tab, body);
            } else {
                const key = localStorage.getItem("Key");
                if (!key) return;
                putData(tab, key, body);
            }
            setTimeout(() => { productos(); }, 1000);
        });
    }

    const productos = async () => {
        let html = "";
        const data = await getData(tab); console.log(data);
        const productList = document.querySelector("#product-list");
        localStorage.removeItem("Key");
        localStorage.setItem("Mode", "add");
        if (!data) {
            document.querySelector("#Id").value = 1;
            productList.innerHTML = '<tr><td colspan="5"><p>No hay productos disponibles.</p></td></tr>';
            return;
        }
        //Cards
        for (const item of data) {
            var { Id, key, nombre, precio, link, desc } = item;
            //if (activo) {
            html += `
            <tr key="${key}">
              <th scope="row">${Id}</th>
              <td title="${link}">${nombre}</td>
              <td>$${precio}.00</td>
              <td>${desc}</td>
              <td>
                <button type="button" class="btn btn-primary mb-3 btnEdit" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <i class="bi bi-pencil"></i>
                </button>
                <button type="button" class="btn btn-danger mb-3 btnDelete">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          `;
            //}
        }
        productList.innerHTML = html;
        document.querySelector("#Id").value = Number(Id) + 1;
    };

    const onLoad = () => {
        btnGuardar();
        btnAgregar();
        btnEditar();
        btnBorrar();
        btnCancelar();

        setTimeout(() => { productos(); }, 1000);
    }

    setTimeout(onLoad, 0);
    return Html;
}