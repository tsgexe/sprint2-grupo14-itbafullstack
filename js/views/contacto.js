/**
 * Vista de Contacto - Mueblería Hermanos Jota
 * Gestiona la validación del lado del cliente en JavaScript
 * y el renderizado dinámico del mensaje de éxito en el DOM.
 */

import '../modules/cart.js';

document.addEventListener('DOMContentLoaded', () => {
  initFormularioContacto();
});

/**
 * Inicializa los controladores de eventos y validaciones del formulario de contacto.
 */
function initFormularioContacto() {
  const formSection = document.querySelector('.contact-form-section');
  const form = document.getElementById('contact-form');

  if (!form || !formSection) return;

  const inputNombre = document.getElementById('nombre');
  const inputEmail = document.getElementById('email');
  const textareaMensaje = document.getElementById('mensaje');
  const btnSubmit = form.querySelector('.btn-submit');

  // Guardar copia del formulario original para permitir "Enviar otro mensaje"
  const formularioHTMLOriginal = form.outerHTML;

  // Listeners de validación interactiva al salir del campo (blur) y al escribir (input)
  if (inputNombre) {
    inputNombre.addEventListener('blur', () => validarCampoNombre(inputNombre));
    inputNombre.addEventListener('input', () => {
      if (inputNombre.classList.contains('is-invalid')) {
        validarCampoNombre(inputNombre);
      }
    });
  }

  if (inputEmail) {
    inputEmail.addEventListener('blur', () => validarCampoEmail(inputEmail));
    inputEmail.addEventListener('input', () => {
      if (inputEmail.classList.contains('is-invalid')) {
        validarCampoEmail(inputEmail);
      }
    });
  }

  if (textareaMensaje) {
    textareaMensaje.addEventListener('blur', () => validarCampoMensaje(textareaMensaje));
    textareaMensaje.addEventListener('input', () => {
      if (textareaMensaje.classList.contains('is-invalid')) {
        validarCampoMensaje(textareaMensaje);
      }
    });
  }

  // Manejo del envío del formulario (Submit)
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombreValido = validarCampoNombre(inputNombre);
    const emailValido = validarCampoEmail(inputEmail);
    const mensajeValido = validarCampoMensaje(textareaMensaje);

    // Si hay algún error, hacer foco en el primer campo inválido
    if (!nombreValido || !emailValido || !mensajeValido) {
      if (!nombreValido) inputNombre.focus();
      else if (!emailValido) inputEmail.focus();
      else textareaMensaje.focus();
      return;
    }

    // Datos válidos: feedback de procesamiento
    const datosEnvio = {
      nombre: inputNombre.value.trim(),
      email: inputEmail.value.trim(),
      mensaje: textareaMensaje.value.trim()
    };

    if (btnSubmit) {
      btnSubmit.disabled = true;
      btnSubmit.textContent = 'Enviando...';
    }

    // Simulación de envío asíncrono y renderizado del mensaje de éxito en el DOM
    setTimeout(() => {
      renderizarMensajeExito(formSection, datosEnvio, formularioHTMLOriginal);
    }, 500);
  });
}

// ==========================================================================
// Reglas de Validación
// ==========================================================================

/**
 * Valida que el nombre contenga al menos 3 caracteres y no esté vacío.
 * @param {HTMLInputElement} input
 * @returns {boolean}
 */
function validarCampoNombre(input) {
  if (!input) return false;
  const valor = input.value.trim();

  if (valor === '') {
    mostrarError(input, 'Por favor, ingresá tu nombre y apellido.');
    return false;
  }

  if (valor.length < 3) {
    mostrarError(input, 'El nombre debe tener al menos 3 caracteres.');
    return false;
  }

  limpiarError(input);
  return true;
}

/**
 * Valida que el correo electrónico cumpla con un formato estándar válido.
 * @param {HTMLInputElement} input
 * @returns {boolean}
 */
function validarCampoEmail(input) {
  if (!input) return false;
  const valor = input.value.trim();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (valor === '') {
    mostrarError(input, 'Por favor, ingresá tu correo electrónico.');
    return false;
  }

  if (!regexEmail.test(valor)) {
    mostrarError(input, 'Ingresá un correo electrónico válido (ej: nombre@dominio.com).');
    return false;
  }

  limpiarError(input);
  return true;
}

/**
 * Valida que el mensaje contenga al menos 10 caracteres explicativos.
 * @param {HTMLTextAreaElement} textarea
 * @returns {boolean}
 */
function validarCampoMensaje(textarea) {
  if (!textarea) return false;
  const valor = textarea.value.trim();

  if (valor === '') {
    mostrarError(textarea, 'Por favor, escribí tu mensaje o consulta.');
    return false;
  }

  if (valor.length < 10) {
    mostrarError(textarea, 'El mensaje es muy breve. Por favor, contanos con al menos 10 caracteres.');
    return false;
  }

  limpiarError(textarea);
  return true;
}

// ==========================================================================
// Manipulación de Errores en el DOM
// ==========================================================================

/**
 * Muestra el mensaje de error correspondiente al campo en el DOM.
 * @param {HTMLElement} elemento - Input o Textarea
 * @param {string} mensaje - Texto explicativo del error
 */
function mostrarError(elemento, mensaje) {
  elemento.classList.add('is-invalid');
  elemento.classList.remove('is-valid');
  elemento.setAttribute('aria-invalid', 'true');

  const grupo = elemento.closest('.form-group');
  if (!grupo) return;

  let spanError = grupo.querySelector('.form-error');
  if (!spanError) {
    spanError = document.createElement('span');
    spanError.className = 'form-error';
    spanError.setAttribute('role', 'alert');
    grupo.appendChild(spanError);
  }

  spanError.textContent = mensaje;
  spanError.style.display = 'block';
}

/**
 * Limpia el estado de error y marca el campo como válido.
 * @param {HTMLElement} elemento
 */
function limpiarError(elemento) {
  elemento.classList.remove('is-invalid');
  elemento.classList.add('is-valid');
  elemento.setAttribute('aria-invalid', 'false');

  const grupo = elemento.closest('.form-group');
  if (!grupo) return;

  const spanError = grupo.querySelector('.form-error');
  if (spanError) {
    spanError.textContent = '';
    spanError.style.display = 'none';
  }
}

// ==========================================================================
// Renderizado del Mensaje de Éxito en el DOM
// ==========================================================================

/**
 * Reemplaza el formulario en el DOM con una tarjeta de confirmación de éxito.
 * @param {HTMLElement} contenedor - Contenedor .contact-form-section
 * @param {{ nombre: string, email: string, mensaje: string }} datos
 * @param {string} formularioHTMLOriginal - Backup del HTML para restaurar
 */
function renderizarMensajeExito(contenedor, datos, formularioHTMLOriginal) {
  // Ocultar título original del formulario
  const formTitle = contenedor.querySelector('.form-title');
  if (formTitle) formTitle.style.display = 'none';

  // Eliminar formulario activo
  const form = contenedor.querySelector('#contact-form');
  if (form) form.remove();

  // Crear componente de éxito en el DOM
  const successCard = document.createElement('div');
  successCard.className = 'contact-success-card';
  successCard.setAttribute('role', 'status');
  successCard.setAttribute('aria-live', 'polite');

  successCard.innerHTML = `
    <div class="success-icon-badge" aria-hidden="true">
      <svg class="success-svg" viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
    </div>
    <h3 class="success-card-title">¡Mensaje enviado con éxito!</h3>
    <p class="success-card-text">
      Muchas gracias, <strong>${datos.nombre}</strong>. Hemos recibido tu consulta y nuestro equipo de la Casa Taller se pondrá en contacto a la brevedad a través de <strong>${datos.email}</strong>.
    </p>
    <div class="success-card-details">
      <span class="details-label">Resumen de tu consulta:</span>
      <p class="details-excerpt">"${datos.mensaje}"</p>
    </div>
    <button type="button" class="btn-primary btn-new-message" id="btn-new-message">
      Enviar Otro Mensaje
    </button>
  `;

  contenedor.appendChild(successCard);

  // Vincular evento para reiniciar el formulario en el DOM
  const btnNuevo = successCard.querySelector('#btn-new-message');
  if (btnNuevo) {
    btnNuevo.addEventListener('click', () => {
      successCard.remove();
      if (formTitle) formTitle.style.display = '';

      // Reinyectar el formulario original en el DOM
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = formularioHTMLOriginal;
      const nuevoForm = tempDiv.firstElementChild;
      contenedor.appendChild(nuevoForm);

      // Reinicializar listeners
      initFormularioContacto();

      // Foco en el primer campo
      const primerInput = nuevoForm.querySelector('#nombre');
      if (primerInput) primerInput.focus();
    });
  }
}
