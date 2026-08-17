import Swal from 'sweetalert2';

export const modalInfo = (icon, title, text, model = {}) =>
  Swal.fire({
    icon: icon ?? 'info',
    title: title ?? 'Aviso',
    text: text ?? '',
    ...model
  });

export const modalConfirm = (icon, title, text, model = {}) =>
  Swal.fire({
    icon: icon ?? 'info',
    title: title ?? 'Aviso',
    text: text ?? '',
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#0d6efd",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    cancelButtonColor: "#646566",
    ...model
  });