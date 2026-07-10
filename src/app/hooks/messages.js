export function showMessage(msj,type){
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

export function alertMessage(msj,type){
    let alert = document.querySelector('#alert');
    let errTypeAlert = type=='success'?type:type=='warning'?type:type=='info'?type:'danger'; //(type=='error')?'danger':(type=='warning')?type:(type=='success')?type:'info';
    if(alert){
        alert.innerHTML = `<div class="alert alert-${errTypeAlert}" role="alert">
        ${type}: ${msj}</div>`;
    }
}

