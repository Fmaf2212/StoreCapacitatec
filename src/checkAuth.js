// auth.js
import Swal from 'sweetalert2';

const verificarAutenticacion = () => {
  const idUsuarioLogueado = localStorage.getItem('idUsuarioLogueado');

  if (!idUsuarioLogueado || idUsuarioLogueado.trim() === '') {
    const alerta = Swal.fire({
      icon: 'error',
      title: 'Acceso denegado',
      text: 'Por favor, debe loguearse e ingresar desde la opción Tienda de la página web.',
      confirmButtonText: 'Entendido',
      allowOutsideClick: false,
    });

    const redirigirAPaginaPrincipal = () => {
      window.location.href = 'https://capacitatec.net/';
    };

    const intervalo = setInterval(() => {
      if (!Swal.getContainer()) {
        redirigirAPaginaPrincipal();
        clearInterval(intervalo);
      }
    }, 500);

    alerta.then((result) => {
      if (result.isConfirmed) {
        redirigirAPaginaPrincipal();
      }
    });
  }
};

export default verificarAutenticacion;