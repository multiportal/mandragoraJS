import { getData, createData, putData, deleteData } from '../../../services/firebase';
import { render, getFormData, btnChanceImage, btnCancelar, consoleLocal, getCurrentUser, validImage } from '../../../functions.js';
import { handleEventListener } from '../../../hooks/handleEventListener';
import { variables } from '../../../core/lib.js';
import { codiPlanStandar } from '../../../core/constants.js';
import { rolNivelAuth } from '../../../functions/security.js';
import { showMessage } from '../../../hooks/messages.js';
import { modalConfirm } from '../../../functions/modalAlerts.js';
import { navigate } from '../../../core/core.js';
import Html from './index.html?raw';
import './style.css';

export async function profileDashboard() {
    const tab = "users";
    const { host, fecha } = variables();
    const userBasic = JSON.parse(localStorage.getItem('userBasic'));

    const user = async () => {
        const data = await getData(tab); //console.log(data);
        if (!data) return null;
        return data;
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
        const data = await user(); //console.log(data);
        const userData = data ? data.find(item => item.uid === userBasic?.uid) : null;
        //const userData = await getCurrentUserData(); console.warn('USER!!', userCurrent); 
        const ids = (data ?? []).map(item => Number(item?.ID)).filter(Number.isFinite);
        const nId = Math.max(0, ...ids) + 1;
        localStorage.setItem("Mode", userData ? "edit" : "add");
        const perfilData = userData ? userData : userBasic;
        if (host.includes('localhost')) { console.table(perfilData); }
        const { key, ID, foto, email, usuario, uid, userId, tel, direccion, create_at, update_at, publico, codiPlan } = perfilData;
        if (key) { localStorage.setItem("Key", key); }
        //tipoPerfil(publico);
        if (foto) {
            const isValidImage = await validImage(foto);
            //Profile
            photo.src = isValidImage ? foto : '/assets/img/sinfoto.png';
            //Form
            photoId.src = isValidImage ? foto : '/assets/img/sinfoto.png';
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
        //PLAN
        const codigoPlan = codiPlan && codiPlan != '' ? codiPlan : codiPlanStandar
        document.querySelector('#codiPlan').value = codigoPlan;
        rolCodiDate(codigoPlan);
        //Html
        html = `
            <div class="info-text">
                <span>uId:</span> ${uid}
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
        inputCodiPlan();
        //Actualización de perfil
        const btnUpdate = document.querySelector('#btnUpdate');
        if (!btnUpdate) { return; }
        const text = btnUpdate.querySelector('span')?.textContent ?? '';
        if (text == 'Actualizar') {
            consoleLocal('warn', 'Reset btnEditar');
            btnUpdate.innerHTML = '<i class="bi bi-pencil-square"></i> <span>Editar perfil</span>';
        }
        if (!create_at) {
            console.warn('Boton y aviso de actualización!!!');
            btnUpdate.innerHTML = '<i class="bi bi-cloud-upload"></i> <span>Actualizar</span>';
        }
    };

    const inputCodiPlan = () => {
        const inputCodi = document.querySelector('#codiPlan');
        handleEventListener('input', () => {
            const val = inputCodi.value;
            if (val.length > 5) { rolCodiDate(val); }
        }, inputCodi);
    };

    const rolCodiDate = (codigoPlan) => {
        const rolNivel = rolNivelAuth(codigoPlan);
        if (!rolNivel) { showMessage('Código incorrecto', 'Error'); return; }
        document.querySelector('#rol').value = rolNivel.rol;
        document.querySelector('#fecCodiPlan').value = rolNivel.nivel != 'N-1' && rolNivel.nivel != 'N5' ? fecha : '3000-01-01';
    };

    const cancelar = () => {
        console.warn('Cancelado!!!', tab);
        //resetForm("#save-form");
        setTimeout(() => { getUser(); }, 100);
    };

    const btnDelPerfil = () => {
        const btndel = document.querySelector('.btnDelete');
        handleEventListener('click', async () => {
            const { isConfirmed } = await modalConfirm('warning', '¿Está seguro de eliminar este perfil?', '¡Este cambio será irreversible!');
            if (!isConfirmed) return;
            const user = getCurrentUser();
            deleteData(tab, user.uid);
            deleteData('signup', user.uid);
            setTimeout(() => {
                navigate('/logout');
            }, 1000);
        }, btndel);
    };

    const changeCodiPLan = () => {
        const inputCodi = document.querySelector('#codiPlan');
        inputCodi.disabled = true;
        const changeCodi = document.querySelector('#changeCodi');
        if (!changeCodi) { return; }
        handleEventListener('click', () => {
            const isCambiar = changeCodi.textContent.includes('Cambiar'); //changeCodi.textContent === 'Cambiar';
            changeCodi.innerHTML = isCambiar ? '<i class="bi bi-x-circle-fill"></i> Cancelar' : '<i class="bi bi-pencil"></i> Cambiar';
            inputCodi.disabled = !isCambiar;
        }, changeCodi);
    };

    const onLoad = () => {
        getUser();
        btnGuardar();
        btnCancelar(() => { cancelar(); });
        btnDelPerfil();
        changeCodiPLan();
    }

    setTimeout(onLoad, 0);
    return render(Html, { user: userBasic });
}