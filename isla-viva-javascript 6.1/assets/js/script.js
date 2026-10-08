(() => {
  'use strict';
  const formularios = document.querySelectorAll('.needs-validation');
  formularios.forEach((formulario) => {
    formulario.addEventListener('submit', (evento) => {
      evento.preventDefault();
      if (!formulario.checkValidity()) evento.stopPropagation();
      else document.querySelector('#confirmacion').classList.remove('d-none');
      formulario.classList.add('was-validated');
    });
  });
})();
