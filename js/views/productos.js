/**
 * Vista de Catálogo de Productos - Mueblería Hermanos Jota
 * Renderiza dinámicamente la grilla mediante carga asíncrona simulada (async/await y setTimeout),
 * gestiona la búsqueda en tiempo real y el filtrado interactivo por categoría.
 */

import { productos, obtenerProductosAsync } from '../data/productos.js';
import '../modules/cart.js';

// Estado global de filtros activos y datos cargados
const estadoFiltros = {
  categoria: 'all',
  busqueda: ''
};

let catalogoProductos = [];

document.addEventListener('DOMContentLoaded', () => {
  initCatalogo();
});

/**
 * Inicializa el catálogo: simula petición asíncrona con loader,
 * monta los datos recibidos y activa los controladores de filtrado y búsqueda.
 */
async function initCatalogo() {
  const gridContainer = document.querySelector('.catalog-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const countContainer = document.querySelector('.catalog-count');
  const searchInput = document.getElementById('catalog-search');
  const searchClearBtn = document.getElementById('search-clear');

  if (!gridContainer) return;

  // 1. Mostrar estado de carga (Spinner Artesanal) en el DOM
  gridContainer.innerHTML = `
    <div class="catalog-loader" role="status" aria-live="polite" style="width: 100%; text-align: center;">
      <div class="spinner-artesanal" aria-hidden="true"></div>
      <p class="loader-text">Consultando piezas artesanales en el taller...</p>
    </div>
  `;

  if (countContainer) {
    countContainer.innerHTML = '<span>Cargando catálogo...</span>';
  }

  // Deshabilitar temporalmente filtros y búsqueda durante la carga
  toggleControles(filterButtons, searchInput, true);

  try {
    // 2. Simulación de petición de datos asíncrona (Promise + setTimeout a 600ms)
    catalogoProductos = await obtenerProductosAsync(600);

    // 3. Renderizado inicial con los datos recibidos
    aplicarFiltros(gridContainer, countContainer, filterButtons, searchInput, searchClearBtn);
  } catch (error) {
    console.error('Error al cargar el catálogo de productos:', error);
    gridContainer.innerHTML = `
      <div class="catalog-empty" role="status">
        <div class="catalog-empty-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--color-siena-tostado)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h3 class="catalog-empty-title">Error de conexión</h3>
        <p class="catalog-empty-text">No pudimos conectar con el catálogo de piezas. Por favor, recargá la página.</p>
      </div>
    `;
    if (countContainer) {
      countContainer.innerHTML = '<span>Catálogo no disponible</span>';
    }
  } finally {
    // 4. Habilitar controles interactivos tras finalizar la carga
    toggleControles(filterButtons, searchInput, false);
  }

  // Manejo de eventos de filtrado por categoría
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      estadoFiltros.categoria = btn.getAttribute('data-category') || 'all';
      aplicarFiltros(gridContainer, countContainer, filterButtons, searchInput, searchClearBtn);
    });
  });

  // Manejo de búsqueda en tiempo real
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      estadoFiltros.busqueda = searchInput.value.trim();

      if (searchClearBtn) {
        searchClearBtn.hidden = estadoFiltros.busqueda === '';
      }

      aplicarFiltros(gridContainer, countContainer, filterButtons, searchInput, searchClearBtn);
    });

    // Manejo de la tecla Escape para limpiar búsqueda
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        limpiarBusqueda(searchInput, searchClearBtn, gridContainer, countContainer, filterButtons);
      }
    });
  }

  // Botón para limpiar campo de búsqueda
  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      limpiarBusqueda(searchInput, searchClearBtn, gridContainer, countContainer, filterButtons);
    });
  }
}

/**
 * Habilita o deshabilita los controles de la barra de herramientas.
 * @param {NodeList} filterButtons
 * @param {HTMLInputElement} searchInput
 * @param {boolean} deshabilitar
 */
function toggleControles(filterButtons, searchInput, deshabilitar) {
  filterButtons.forEach(btn => {
    btn.disabled = deshabilitar;
    btn.style.opacity = deshabilitar ? '0.6' : '';
    btn.style.cursor = deshabilitar ? 'wait' : 'pointer';
  });

  if (searchInput) {
    searchInput.disabled = deshabilitar;
  }
}

/**
 * Normaliza cadenas para comparaciones flexibles (elimina tildes y pasa a minúsculas).
 * @param {string} texto
 * @returns {string}
 */
function normalizarTexto(texto) {
  return (texto || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Filtra la colección de productos según categoría activa y término de búsqueda.
 * @returns {Array} Productos filtrados
 */
function filtrarProductos() {
  const termino = normalizarTexto(estadoFiltros.busqueda);
  const categoria = estadoFiltros.categoria;

  return catalogoProductos.filter(producto => {
    // 1. Filtrado por categoría
    const coincideCategoria =
      categoria === 'all' || producto.categoria === categoria;

    if (!coincideCategoria) return false;

    // 2. Si no hay término de búsqueda, pasa el filtro
    if (!termino) return true;

    // 3. Filtrado por texto en nombre, descripción, categoría, tagline y materiales
    const nombreNorm = normalizarTexto(producto.nombre);
    const descNorm = normalizarTexto(producto.descripcion);
    const catNorm = normalizarTexto(producto.categoria);
    const taglineNorm = normalizarTexto(producto.tagline);
    const materialesNorm =
      producto.fichaTecnica && producto.fichaTecnica.Materiales
        ? normalizarTexto(producto.fichaTecnica.Materiales)
        : '';

    return (
      nombreNorm.includes(termino) ||
      descNorm.includes(termino) ||
      catNorm.includes(termino) ||
      taglineNorm.includes(termino) ||
      materialesNorm.includes(termino)
    );
  });
}

/**
 * Aplica los filtros activos, renderiza las tarjetas y actualiza el contador.
 */
function aplicarFiltros(gridContainer, countContainer, filterButtons, searchInput, searchClearBtn) {
  const productosFiltrados = filtrarProductos();
  renderizarProductos(
    productosFiltrados,
    gridContainer,
    () => resetearTodosLosFiltros(gridContainer, countContainer, filterButtons, searchInput, searchClearBtn)
  );
  actualizarContador(productosFiltrados.length, countContainer);
}

/**
 * Limpia el campo de búsqueda y vuelve a aplicar filtros.
 */
function limpiarBusqueda(searchInput, searchClearBtn, gridContainer, countContainer, filterButtons) {
  if (searchInput) {
    searchInput.value = '';
    searchInput.focus();
  }
  if (searchClearBtn) {
    searchClearBtn.hidden = true;
  }
  estadoFiltros.busqueda = '';
  aplicarFiltros(gridContainer, countContainer, filterButtons, searchInput, searchClearBtn);
}

/**
 * Restablece tanto la categoría como el campo de búsqueda.
 */
function resetearTodosLosFiltros(gridContainer, countContainer, filterButtons, searchInput, searchClearBtn) {
  estadoFiltros.categoria = 'all';
  estadoFiltros.busqueda = '';

  if (searchInput) {
    searchInput.value = '';
  }
  if (searchClearBtn) {
    searchClearBtn.hidden = true;
  }

  filterButtons.forEach(btn => {
    if (btn.getAttribute('data-category') === 'all') {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  aplicarFiltros(gridContainer, countContainer, filterButtons, searchInput, searchClearBtn);
}

/**
 * Renderiza las tarjetas de producto en el contenedor del DOM.
 * @param {Array} lista - Colección de productos a renderizar
 * @param {HTMLElement} container - Elemento contenedor de la grilla
 * @param {Function} onReset - Callback para restablecer filtros desde el estado vacío
 */
function renderizarProductos(lista, container, onReset) {
  container.innerHTML = '';

  if (lista.length === 0) {
    const hayBusqueda = estadoFiltros.busqueda.trim() !== '';
    const hayCategoria = estadoFiltros.categoria !== 'all';

    let mensajeDetalle = 'No se encontraron piezas artesanales disponibles con los criterios seleccionados.';
    if (hayBusqueda && hayCategoria) {
      mensajeDetalle = `No hallamos coincidencias para "${estadoFiltros.busqueda}" en la categoría ${estadoFiltros.categoria}.`;
    } else if (hayBusqueda) {
      mensajeDetalle = `No hallamos piezas que coincidan con "${estadoFiltros.busqueda}". Probá buscando por tipo de madera, ambiente o modelo.`;
    } else if (hayCategoria) {
      mensajeDetalle = `Actualmente no disponemos de piezas en la categoría ${estadoFiltros.categoria}.`;
    }

    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'catalog-empty';
    emptyDiv.setAttribute('role', 'status');
    emptyDiv.setAttribute('aria-live', 'polite');
    emptyDiv.innerHTML = `
      <div class="catalog-empty-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="50" height="50" fill="none" stroke="var(--color-rosa-polvoriento)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </div>
      <h3 class="catalog-empty-title">Sin resultados en el catálogo</h3>
      <p class="catalog-empty-text">${mensajeDetalle}</p>
      <button type="button" class="catalog-reset-btn" id="btn-reset-filters">
        Ver todas las piezas
      </button>
    `;

    container.appendChild(emptyDiv);

    const resetBtn = emptyDiv.querySelector('#btn-reset-filters');
    if (resetBtn && typeof onReset === 'function') {
      resetBtn.addEventListener('click', onReset);
    }
    return;
  }

  lista.forEach(producto => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.setAttribute('data-id', producto.id);
    card.setAttribute('data-category', producto.categoria);

    card.innerHTML = `
      <div class="product-image-container">
        <img src="${producto.imagen}" alt="${producto.nombre} - Mueblería Hermanos Jota" class="product-image" loading="lazy">
      </div>
      <div class="product-content">
        <span class="product-category">${producto.categoria}</span>
        <span class="producto-tagline">${producto.tagline}</span>
        <h2 class="product-title">${producto.nombre}</h2>
        <p class="product-price">$${producto.precio.toLocaleString('es-AR')}</p>
        <a href="producto.html?id=${producto.id}" class="product-link" aria-label="Ver detalle de ${producto.nombre}">
          Ver Detalle
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * Actualiza el contador dinámico de piezas mostradas en el catálogo.
 * @param {number} total - Cantidad de productos en pantalla
 * @param {HTMLElement} container - Contenedor del contador
 */
function actualizarContador(total, container) {
  if (!container) return;
  const texto = total === 1 ? '1 pieza' : `${total} piezas`;
  const totalBase = catalogoProductos.length || productos.length;
  const esFiltrado = estadoFiltros.categoria !== 'all' || estadoFiltros.busqueda.trim() !== '';

  if (esFiltrado) {
    container.innerHTML = `Mostrando <strong>${texto}</strong> de ${totalBase}`;
  } else {
    container.innerHTML = `Mostrando <strong>${texto}</strong> exclusivas`;
  }
}
