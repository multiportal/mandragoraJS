/* ==========================
   MENSAJES / ALERTAS
========================== */
function closeMessage() {
  const btnClose = document.querySelector('.btn-close');
  if (btnClose) {
    btnClose.addEventListener('click', closeAlert);
  }
}

function closeAlert() {
  const alert = document.querySelector('#liveToast');
  if (alert) {
    alert.classList.remove('show');
    alert.classList.add('hide');
  }
}

export function showMessage(msj, type) {
  const alert = document.querySelector('#liveToast');
  if (!alert) return;
  alert.classList.remove('hide');
  alert.classList.add('show');
  alert.innerHTML = `
  <div class="toast-header ${type === 'Exito' ? 'bg-success text-white' : type === 'Error' ? 'bg-danger text-white' : 'bg-secondary text-white'}">
    <strong class="me-auto">${type}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
    ${type}: ${msj}
  </div>
  `;
  closeMessage();
  setTimeout(closeAlert, 3000);
}

export function alertMessage(msj, type) {
  let alert = document.querySelector('#alert');
  let errTypeAlert = type == 'success' ? type : type == 'warning' ? type : type == 'info' ? type : 'danger'; //(type=='error')?'danger':(type=='warning')?type:(type=='success')?type:'info';
  if (alert) {
    alert.innerHTML = `<div class="alert alert-${errTypeAlert}" role="alert">
        ${type}: ${msj}</div>`;
  }
}

export function showMessageToastify(msj,type){
    Toastify({
        text: msj,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: type==='success'?'green':type==='warning'?'orange':type==='info'?'blue':'red',
        },
        onClick: function(){} // Callback after click
      }).showToast();
}