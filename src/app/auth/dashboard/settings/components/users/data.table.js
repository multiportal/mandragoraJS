import { fillForm, getFormData, validImage } from "../../../../../functions";
import { deleteData, getData, postData } from "../../../../../services/firebase";
import { modalConfirm, modalInfo } from "../../../../../functions/modalAlerts";
import { variables } from "../../../../../core/lib";
import { handleEventListener } from "../../../../../hooks/handleEventListener";

export const tableSettings = async () => {
    /* =========================================================
   USERS DATA
========================================================= */
    const { fecha } = variables();
    const tab = 'users';
    const data = await getData(tab);
    let users = data?.sort((a, b) => Number(b.ID) - Number(a.ID));
    console.log(users);

    /* =========================================================
       STATE
    ========================================================= */

    const state = {
        page: 1,
        pageSize: 8,
        search: "",
        role: "all"
    };

    /* =========================================================
       DOM
    ========================================================= */

    const tableBody = document.querySelector("#usersTableBody");
    const pagination = document.querySelector("#usersPagination");
    const usersInfo = document.querySelector("#usersInfo");

    const searchInput = document.querySelector("#userSearch");
    const roleFilter = document.querySelector("#roleFilter");
    const pageSizeSelect = document.querySelector("#pageSize");

    /* =========================================================
       FILTER USERS
    ========================================================= */

    function getFilteredUsers() {

        const search = state.search.toLowerCase().trim();

        return users.filter(user => {

            const matchesSearch =
                !search ||
                user.usuario.toLowerCase().includes(search) ||
                user.email.toLowerCase().includes(search);

            const matchesRole =
                state.role === "all" ||
                user.role === state.role;

            return matchesSearch && matchesRole;
        });
    }


    /* =========================================================
       RENDER TABLE
    ========================================================= */

    async function renderTable() {

        const filteredUsers = getFilteredUsers();

        const totalUsers = filteredUsers.length;

        const totalPages = Math.ceil(
            totalUsers / state.pageSize
        );

        /*
         * Si el filtro reduce las páginas
         * regresamos a la última disponible.
         */
        if (state.page > totalPages && totalPages > 0) {
            state.page = totalPages;
        }

        const start =
            (state.page - 1) * state.pageSize;

        const end =
            start + state.pageSize;

        const currentUsers =
            filteredUsers.slice(start, end);


        /* =========================
           EMPTY
        ========================== */

        if (!currentUsers.length) {

            tableBody.innerHTML = `
            <tr class="users-empty">
                <td colspan="7">
                    No se encontraron usuarios
                </td>
            </tr>
        `;

            usersInfo.textContent = "Mostrando 0 a 0 de 0 usuarios";
            pagination.innerHTML = "";
            return;
        }


        /* =========================
           TABLE
        ========================== */

        const rows = await Promise.all(
            currentUsers.map(user => createUserRow(user))
        );    
        tableBody.innerHTML = rows.join("");


        /* =========================
           INFO
        ========================== */

        const first = start + 1;
        const last = Math.min(end, totalUsers);
        usersInfo.textContent = `Mostrando ${first} a ${last} de ${totalUsers} usuarios`;


        /* =========================
           PAGINATION
        ========================== */

        renderPagination(totalPages);
    }


    /* =========================================================
       CREATE USER ROW
    ========================================================= */

    async function createUserRow(user) {

        const roleClass = {
            Administrador: "role-admin",
            Editor: "role-editor",
            usuario: "role-user"
        }[user.role] || "role-user";

        const isValidImage = await validImage(user.foto);//**REVISAR */
        //const statusClass = user.status === "Activo" ? "status-active" : "status-inactive";
        const statusClass = user.publico ? 'status-active' : 'status-inactive';
        const photo = user.foto && isValidImage ? user.foto : '/assets/img/sinfoto.png';
        const status = user.publico ? 'Publico' : 'Privado';
        return `
        <tr data-id="${user.ID}" key="${user.uid}">
            <td>
                ${user.ID}
            </td>
            <td>
                <div class="user-info">
                    <img
                        class="user-avatar"
                        src="${photo}"
                        alt="${user.usuario}"
                    >
                    <span class="user-name">
                        ${user.usuario}
                    </span>
                </div>
            </td>
            <td>
                ${user.email}
            </td>
            <td>
                <span class="role-badge ${roleClass}">
                    ${user.rol}
                </span>
            </td>
            <td>
                <span class="status-badge ${statusClass}">
                    ${status}
                </span>
            </td>
            <td>
                ${user.create_at}
            </td>
            <td>
                <div class="user-actions">
                    <button
                        type="button"
                        class="btn btn-primary edit" 
                        key="${user.uid}" 
                        data-action="edit"
                        data-id="${user.ID}"
                        title="Editar"
                        data-bs-toggle="modal" 
                        data-bs-target="#Modal"
                    >
                        <i class="bi bi-pencil-fill"></i>
                    </button>
                    <button
                        type="button"
                        class="btn user-action delete" 
                        key="${user.uid}" 
                        data-action="delete"
                        data-id="${user.ID}"
                        title="Eliminar"
                    >
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
    }


    /* =========================================================
       PAGINATION
    ========================================================= */

    function renderPagination(totalPages) {
        pagination.innerHTML = "";
        if (totalPages <= 1) {
            return;
        }


        /* =========================
           PREVIOUS
        ========================== */

        const previous = createPageButton(
            "‹",
            state.page - 1,
            state.page === 1
        );
        pagination.appendChild(previous);


        /* =========================
           PAGE NUMBERS
        ========================== */

        const pages = getPaginationPages(state.page, totalPages);

        pages.forEach(page => {
            if (page === "...") {
                const dots = document.createElement("span");
                dots.className = "page-dots";
                dots.textContent = "...";
                pagination.appendChild(dots);
                return;
            }

            const button = createPageButton(
                page,
                page,
                false,
                page === state.page
            );
            pagination.appendChild(button);
        });


        /* =========================
           NEXT
        ========================== */

        const next = createPageButton(
            "›",
            state.page + 1,
            state.page === totalPages
        );
        pagination.appendChild(next);
    }


    /* =========================================================
       CREATE PAGE BUTTON
    ========================================================= */

    function createPageButton(
        text,
        page,
        disabled = false,
        active = false
    ) {

        const button = document.createElement("button");
        button.type = "button";
        button.className = `page-btn ${active ? "active" : ""}`;
        button.textContent = text;
        button.disabled = disabled;
        button.addEventListener("click", async () => {
            state.page = page;
            await renderTable();
        });
        return button;
    }

    /* =========================================================
      GUARDAR 
   ========================================================= */

    const btnGuardar = () => {
        const form = document.querySelector("#form-profile");
        if (!form) return;
        handleEventListener("submit", async (e) => {
            e.preventDefault();
            const mode = localStorage.getItem("Mode");
            const body = getFormData(form, "id");
            if (mode === "edit") {
                const tab = "users";
                const { uid } = body;
                try {
                    postData(tab, uid, body);
                    await refreshTable();
                } catch (error) {
                    console.error("Error al guardar:", error);
                    modalInfo("error", "Error", "No fue posible actualizar el usuario.");
                }
            }
        }, form);
    };

    /* =========================================================
       PAGINATION ALGORITHM
    ========================================================= */

    function getPaginationPages(
        current,
        total
    ) {

        if (total <= 7) {

            return Array.from(
                { length: total },
                (_, i) => i + 1
            );
        }

        const pages = [];
        pages.push(1);
        if (current > 4) {
            pages.push("...");
        }

        const start = Math.max(2, current - 1);
        const end = Math.min(total - 1, current + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (current < total - 3) {
            pages.push("...");
        }

        pages.push(total);
        return pages;
    }


    /* =========================================================
       SEARCH
    ========================================================= */

    searchInput.addEventListener("input", async event => {
        state.search = event.target.value;
        state.page = 1;
        await renderTable();
    }
    );


    /* =========================================================
       ROLE FILTER
    ========================================================= */

    roleFilter.addEventListener("change", async event => {
        state.role = event.target.value;
        state.page = 1;
        await renderTable();
    }
    );


    /* =========================================================
       PAGE SIZE
    ========================================================= */

    pageSizeSelect.addEventListener("change", async event => {
        state.pageSize = Number(event.target.value);
        state.page = 1;
        await renderTable();
    }
    );


    /* =========================================================
       TABLE ACTIONS
    ========================================================= */

    tableBody.addEventListener("click", async (event) => {
        const button = event.target.closest("[data-action]");
        if (!button) return;
        const id = button.dataset.id;
        const k = button.getAttribute("key"); console.log("Key:", k);
        const action = button.dataset.action;
        const user = users.find(user => user.ID === id || user.uid === k);
        if (!user) return;
        //const {key, usuario} = user;
        const key = user.uid || k;

        /* =========================
           EDIT
        ========================== */

        if (action === "edit") {
            localStorage.setItem("Mode", "edit");
            fillForm(user);
            document.querySelector("#fotoProfile").src = user.foto && user.foto !== '' ? user.foto : '/assets/img/sinfoto.png';
            document.querySelector("#foto").value = user.foto && user.foto !== '' ? user.foto : '';
            document.querySelector("#update_at").value = fecha;
            //return;
        }

        /* =========================
           DELETE
        ========================== */

        if (action === "delete") {
            const { isConfirmed } = await modalConfirm('warning', '¿Está seguro de eliminar el usuario?', '¡Este cambio será irreversible!');
            if (!isConfirmed) return;
            try {
                console.warn("Eliminar:", key);
                deleteData(tab, key, false);
                deleteData('signup', key, false);
                modalInfo("success", "¡Borrado!", "El usuario ha sido borrado");
                //Recargar
                await refreshTable();
            } catch (error) {
                console.error(error);
                modalInfo("eror", "Error", "No fue posible eliminar al usuario.");
            }
        }
    });


    /* =========================================================
       ADD USER
    ========================================================= */

    document.querySelector("#btnAddUser").addEventListener("click", () => {
        console.log("Agregar nuevo usuario");
        /*
         * Aquí puedes abrir tu modal:
         */
    }
    );


    /* =========================================================
       INITIAL RENDER
    ========================================================= */

    await renderTable();
    btnGuardar();

    async function refreshTable() {
        try {
            const data = await getData(tab);
            users = (data || []).sort((a, b) => Number(b.ID) - Number(a.ID));
            await renderTable();
        } catch (error) {
            console.error("Error al actualizar la tabla:", error);
        }
    }
};

