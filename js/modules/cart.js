/**
 * Módulo de Carrito de Compras - Mueblería Hermanos Jota
 * Gestiona la persistencia en localStorage, renderizado del drawer off-canvas,
 * sincronización del contador en el header y eventos de apertura/cierre.
 */

import { productos } from '../data/productos.js';

const STORAGE_KEY = 'hermanos_jota_cart';

// ==========================================================================
// 1. Gestión de Datos y Persistencia (localStorage)
// ==========================================================================

/**
 * Obtiene el carrito actual almacenado en localStorage.
 * @returns {Array<{ id: string, cantidad: number }>}
 */
export function obtenerCarrito() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error al parsear el carrito de localStorage:', error);
    return [];
  }
}

/**
 * Guarda el array del carrito en localStorage y sincroniza la UI.
 * @param {Array<{ id: string, cantidad: number }>} carrito
 */
export function guardarCarrito(carrito) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
  } catch (error) {
    console.error('Error al guardar el carrito en localStorage:', error);
  }

  // Notificar y actualizar interfaz gráfica
  actualizarBadge();
  renderizarDrawer();
}

/**
 * Cruza los ítems del carrito con la base de datos de productos.
 * @returns {{ subtotal: number, cantidadTotal: number, itemsDetallados: Array }}
 */
export function calcularTotal() {
  const carrito = obtenerCarrito();
  let subtotal = 0;
  let cantidadTotal = 0;

  const itemsDetallados = carrito.map(item => {
    const info = productos.find(p => p.id === item.id);
    const precio = info ? info.precio : 0;
    const itemSubtotal = precio * item.cantidad;

    subtotal += itemSubtotal;
    cantidadTotal += item.cantidad;

    return {
      id: item.id,
      cantidad: item.cantidad,
      precioUnitario: precio,
      subtotal: itemSubtotal,
      producto: info || null
    };
  }).filter(item => item.producto !== null);

  return { subtotal, cantidadTotal, itemsDetallados };
}

// ==========================================================================
// 2. Operaciones sobre el Carrito
// ==========================================================================

/**
 * Agrega un producto o incrementa su cantidad si ya existía.
 * Como feedback visual, abre automáticamente el drawer.
 * @param {string} id - Identificador del producto
 * @param {number} cantidad - Cantidad a añadir (por defecto 1)
 */
export function agregarProducto(id, cantidad = 1) {
  if (!id || cantidad <= 0) return;

  const carrito = obtenerCarrito();
  const index = carrito.findIndex(item => item.id === id);

  if (index !== -1) {
    carrito[index].cantidad += cantidad;
  } else {
    carrito.push({ id, cantidad });
  }

  guardarCarrito(carrito);
  abrirDrawer();
}

/**
 * Modifica la cantidad de un ítem por un delta (+1 o -1).
 * Si la cantidad resultante es <= 0, elimina el ítem.
 * @param {string} id
 * @param {number} delta
 */
export function cambiarCantidad(id, delta) {
  const carrito = obtenerCarrito();
  const index = carrito.findIndex(item => item.id === id);

  if (index === -1) return;

  carrito[index].cantidad += delta;

  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }

  guardarCarrito(carrito);
}

/**
 * Quita completamente un producto del carrito.
 * @param {string} id
 */
export function eliminarProducto(id) {
  const carrito = obtenerCarrito().filter(item => item.id !== id);
  guardarCarrito(carrito);
}

/**
 * Vacía por completo el carrito de compras.
 */
export function vaciarCarrito() {
  guardarCarrito([]);
}

// ==========================================================================
// 3. Renderizado y Sincronización de UI
// ==========================================================================

/**
 * Actualiza el badge numérico del header en todas las páginas.
 */
export function actualizarBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;

  const { cantidadTotal } = calcularTotal();
  badge.textContent = cantidadTotal;

  if (cantidadTotal > 0) {
    badge.classList.add('has-items');
  } else {
    badge.classList.remove('has-items');
  }

  // Animación de impacto sutil (bump)
  badge.classList.remove('bump');
  // Forzar reflujo para reiniciar la animación
  void badge.offsetWidth;
  badge.classList.add('bump');
  setTimeout(() => badge.classList.remove('bump'), 250);

  // Actualizar también el contador en el título del drawer si existe
  const headerCount = document.getElementById('cart-header-count');
  if (headerCount) {
    headerCount.textContent = `(${cantidadTotal})`;
  }
}

/**
 * Renderiza el contenido del drawer lateral según los productos guardados.
 */
export function renderizarDrawer() {
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal-amount');
  const checkoutBtn = document.getElementById('btn-cart-checkout');
  const emptyBtn = document.getElementById('btn-cart-empty');

  if (!container) return;

  const { subtotal, cantidadTotal, itemsDetallados } = calcularTotal();

  // Actualizar Subtotal en footer
  if (subtotalEl) {
    subtotalEl.textContent = `$${subtotal.toLocaleString('es-AR')}`;
  }

  // Habilitar / deshabilitar botones de acción
  const hayItems = itemsDetallados.length > 0;
  if (checkoutBtn) checkoutBtn.disabled = !hayItems;
  if (emptyBtn) emptyBtn.disabled = !hayItems;

  // Renderizar estado vacío si no hay ítems
  if (!hayItems) {
    container.innerHTML = `
      <div class="cart-empty" role="status">
        <div class="cart-empty-icon" aria-hidden="true">
          <svg class="cart-empty-svg" viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </div>
        <h3 class="cart-empty-title">Tu carrito está vacío</h3>
        <p class="cart-empty-text">
          Aún no has seleccionado ninguna pieza artesanal de nuestra colección.
        </p>
        <a href="productos.html" class="btn-cart-catalog" id="btn-cart-explore">
          Explorar Catálogo
        </a>
      </div>
    `;

    const exploreBtn = container.querySelector('#btn-cart-explore');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => {
        cerrarDrawer();
      });
    }
    return;
  }

  // Renderizar listado de productos
  container.innerHTML = '';
  itemsDetallados.forEach(item => {
    const prod = item.producto;
    const article = document.createElement('article');
    article.className = 'cart-item';
    article.setAttribute('data-id', item.id);

    article.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" class="cart-item-img" loading="lazy">
      <div class="cart-item-details">
        <span class="cart-item-category">${prod.categoria}</span>
        <h4 class="cart-item-title" title="${prod.nombre}">${prod.nombre}</h4>
        <p class="cart-item-price">$${prod.precio.toLocaleString('es-AR')}</p>
        <div class="cart-item-actions">
          <div class="cart-quantity-control" role="group" aria-label="Cantidad para ${prod.nombre}">
            <button type="button" class="btn-qty btn-qty-minus" data-id="${item.id}" aria-label="Restar una unidad">
              &minus;
            </button>
            <span class="cart-item-qty" aria-live="polite">${item.cantidad}</span>
            <button type="button" class="btn-qty btn-qty-plus" data-id="${item.id}" aria-label="Sumar una unidad">
              &plus;
            </button>
          </div>
          <button type="button" class="btn-remove-item" data-id="${item.id}" aria-label="Eliminar ${prod.nombre} del carrito" title="Eliminar pieza">
            <svg class="icon-trash" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    `;

    // Event listeners para botones de cantidad y eliminar
    const btnMinus = article.querySelector('.btn-qty-minus');
    const btnPlus = article.querySelector('.btn-qty-plus');
    const btnRemove = article.querySelector('.btn-remove-item');

    btnMinus.addEventListener('click', () => cambiarCantidad(item.id, -1));
    btnPlus.addEventListener('click', () => cambiarCantidad(item.id, 1));
    btnRemove.addEventListener('click', () => eliminarProducto(item.id));

    container.appendChild(article);
  });
}

// ==========================================================================
// 4. Control de Apertura, Cierre y Accesibilidad del Drawer
// ==========================================================================

/**
 * Abre el panel deslizante del carrito.
 */
export function abrirDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (!drawer || !overlay) return;

  drawer.classList.add('is-open');
  overlay.classList.add('is-visible');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
}

/**
 * Cierra el panel deslizante del carrito.
 */
export function cerrarDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (!drawer || !overlay) return;

  drawer.classList.remove('is-open');
  overlay.classList.remove('is-visible');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/**
 * Alterna el estado abierto/cerrado del drawer.
 */
export function toggleDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer && drawer.classList.contains('is-open')) {
    cerrarDrawer();
  } else {
    abrirDrawer();
  }
}

// ==========================================================================
// 5. Inyección Dinámica y Configuración de Eventos (Self-Healing)
// ==========================================================================

/**
 * Asegura la existencia de la estructura del drawer y overlay en el DOM.
 * Si no están en el HTML estático, los inyecta dinámicamente al final del <body>.
 */
function asegurarEstructuraDrawer() {
  let overlay = document.getElementById('cart-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    overlay.id = 'cart-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);
  }

  let drawer = document.getElementById('cart-drawer');
  if (!drawer) {
    drawer = document.createElement('aside');
    drawer.className = 'cart-drawer';
    drawer.id = 'cart-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-labelledby', 'cart-drawer-title');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-hidden', 'true');

    drawer.innerHTML = `
      <div class="cart-header">
        <div class="cart-header-title-wrap">
          <h2 id="cart-drawer-title" class="cart-title">Tu Selección</h2>
          <span class="cart-header-count" id="cart-header-count">(0)</span>
        </div>
        <button type="button" class="cart-close-btn" id="btn-cart-close" aria-label="Cerrar carrito">&times;</button>
      </div>
      <div class="cart-items-container" id="cart-items-container"></div>
      <div class="cart-footer" id="cart-footer">
        <div class="cart-subtotal-row">
          <span class="cart-subtotal-label">Subtotal estimado</span>
          <span class="cart-subtotal-amount" id="cart-subtotal-amount">$0</span>
        </div>
        <p class="cart-tax-notice">Envío e impuestos calculados al confirmar la orden.</p>
        <div class="cart-actions">
          <button type="button" class="btn-cart-empty" id="btn-cart-empty">Vaciar</button>
          <button type="button" class="btn-cart-checkout" id="btn-cart-checkout">FINALIZAR PEDIDO</button>
        </div>
      </div>
    `;

    document.body.appendChild(drawer);
  }
}

/**
 * Inicializa los eventos del carrito en la página.
 */
export function initCart() {
  asegurarEstructuraDrawer();

  // Botón Toggle en el Header
  const toggleBtn = document.getElementById('btn-cart-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDrawer();
    });
  }

  // Botón de Cierre (✕)
  const closeBtn = document.getElementById('btn-cart-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', cerrarDrawer);
  }

  // Cierre al hacer clic en el Overlay desenfocado
  const overlay = document.getElementById('cart-overlay');
  if (overlay) {
    overlay.addEventListener('click', cerrarDrawer);
  }

  // Cierre con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const drawer = document.getElementById('cart-drawer');
      if (drawer && drawer.classList.contains('is-open')) {
        cerrarDrawer();
      }
    }
  });

  // Botón "Vaciar"
  const emptyBtn = document.getElementById('btn-cart-empty');
  if (emptyBtn) {
    emptyBtn.addEventListener('click', () => {
      if (confirm('¿Deseas vaciar todos los productos de tu selección?')) {
        vaciarCarrito();
      }
    });
  }

  // Botón "Finalizar Pedido"
  const checkoutBtn = document.getElementById('btn-cart-checkout');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const { itemsDetallados, subtotal } = calcularTotal();
      if (itemsDetallados.length === 0) return;

      alert(`¡Gracias por elegir Hermanos Jota!\n\nProcesando pedido de ${itemsDetallados.length} piezas por un total de $${subtotal.toLocaleString('es-AR')}.\nNos comunicaremos para coordinar la entrega artesanal.`);
      vaciarCarrito();
      cerrarDrawer();
    });
  }

  // Sincronizar estado inicial al cargar
  actualizarBadge();
  renderizarDrawer();
}

// Auto-inicialización segura al cargar el DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCart);
} else {
  initCart();
}

export default initCart;
