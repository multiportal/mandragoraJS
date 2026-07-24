import { getData, createData, putData } from '../../../services/firebase';
import { compressImage, convertirBase64 } from '../../../hooks/loadImage';
import { render, getFormData } from '../../../functions.js';
import { handleEventListener } from '../../../hooks/handleEventListener';
import { variables } from '../../../core/lib.js';
import Html from './index.html?raw';
import './style.css';

export async function profileDashboard() {
    const tab = "users";
    const { fecha } = variables();
    const userBasic = JSON.parse(localStorage.getItem('userBasic'));

    const user = async () => {
        const data = await getData(tab); //console.log(data);
        if (!data) return null;
        return data;
    };

    const btnCancelar = () => {
        handleEventListener("click", (e) => {
            const btn = e.target.closest("#btnCancel");
            if (!btn) return;
            console.warn('Cancelado!!!', tab);
            setTimeout(() => { getUser(); }, 100);
        });
    };

    const btnChanceImage = (p, i) => {
        //BOTON USERFILE
        const input = document.querySelector("#changeImage");
        input.addEventListener("change", async (e) => {
            const archivo = e.target.files[0]; //console.log(archivo);
            if (!archivo) return;
            const base64 = await compressImage(archivo); //await convertirBase64(archivo);console.log(base64);
            p.src = base64;
            i.value = base64;
        });
    };

    const btnGuardar = () => {
        const form = document.querySelector("#form-profile");
        if (!form) return;
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const mode = localStorage.getItem("Mode");
            const user = JSON.parse(localStorage.getItem('userBasic'));
            if (!mode && !user) return;
            console.log("Mode:", mode);
            const f = mode == 'add' ? '#create_at' : '#update_at';
            document.querySelector(f).value = fecha;
            const body = getFormData(form, "id"); //console.log(body);
            if (mode == "add") {
                createData(tab, body);
            } else {
                const key = localStorage.getItem("Key"); console.warn(key);
                if (!key) return;
                putData(tab, key, body);
            }
            setTimeout(() => { getUser(); }, 1000);
        });
    };

    const tipoPerfil = (p) => {
        const tipo = document.querySelector('.tipo');
        tipo.innerHTML = p ? '(Publico)' : '(Privado)';
    };

    const getUser = async () => {
        let html = "";
        const perfilInfo = document.querySelector(".info-profile");
        const photo = document.querySelector('.fotoProfile');
        const photoId = document.querySelector('#fotoProfile');
        const imagen = document.querySelector('#foto');

        //BOTON 
        btnChanceImage(photoId, imagen);

        //OBTENER DATOS DE USUARIO
        const data = await user(); console.log(data);
        const userData = data ? data.find(item => item.uid === userBasic?.uid) : null;
        const ids = (data ?? []).map(item => Number(item?.ID)).filter(Number.isFinite);
        const nId = Math.max(0, ...ids) + 1;
        localStorage.setItem("Mode", userData ? "edit" : "add");
        const perfilData = userData ? userData : userBasic; console.table(perfilData);
        const { key, ID, foto, email, usuario, uid, userId, tel, direccion, create_at, update_at, publico } = perfilData;
        if (key) { localStorage.setItem("Key", key); }
        //tipoPerfil(publico);
        if (foto) {
            //Profile
            photo.src = foto;
            //Form
            photoId.src = foto;
            imagen.value = foto;
        }
        //Form
        document.querySelector('#update_at').value = update_at ?? null;
        document.querySelector('#create_at').value = create_at ?? fecha;
        document.querySelector('#userId').value = userId ?? null;
        document.querySelector('#ID').value = ID ?? nId;
        document.querySelector('#uid').value = uid;
        document.querySelector('#usuario').value = usuario;
        document.querySelector('#email').value = email;
        document.querySelector('#tel').value = tel ?? null;
        document.querySelector('#direccion').value = direccion ?? null;
        //Check
        const mode = localStorage.getItem("Mode");
        if (mode && mode == 'edit') {
            const chk = document.getElementById("publico");
            chk.checked = publico;
        }
        //Html
        html = `
            <div class="info-text">
                <span>UserId:</span> ${uid}
            </div>
            <div class="text-nombre">
                ${usuario}
            </div>
            ${userId ? `
                <div class="info-arroba">
                    @${userId}
                </div>` : ''}
             <div class="info-bag ${publico ? 'publico' : 'privado'}">
                <span>
                    <i class="bi bi-globe"></i> ${publico ? 'Publico' : 'Privado'}
                </span> 
            </div>
            <div class="info-text">
                ${email}
            </div>
            <div class="info-text">
                ${tel ? tel : ''}
            </div>
            <div class="info-text">
                ${direccion ? direccion : ''}
            </div>
        `;
        perfilInfo.innerHTML = html;
    };

    const onLoad = () => {
        getUser();
        btnGuardar();
        btnCancelar();
    }

    setTimeout(onLoad, 0);
    return render(Html, { user: userBasic });
}