/**
 * Vista de Inicio (Home) - Mueblería Hermanos Jota
 * Renderiza dinámicamente los productos destacados mediante carga asíncrona simulada.
 */

import { obtenerProductosAsync } from '../data/productos.js';
import '../modules/cart.js';

document.addEventListener('DOMContentLoaded', () => {
  renderProductosDestacados();
});

/**
 * Carga de forma asíncrona (Promise / async-await) los productos destacados
 * mostrando un loader artesanal en el DOM mientras se resuelve la petición.
 */
async function renderProductosDestacados() {
  const container = document.getElementById('featured-products-grid');
  if (!container) return;

  // Estado de carga inicial con spinner
  container.innerHTML = `
    <div class="catalog-loader" role="status" aria-live="polite" style="width: 100%; grid-column: 1 / -1;">
      <div class="spinner-artesanal" aria-hidden="true"></div>
      <p class="loader-text">Seleccionando piezas destacadas de Casa Taller...</p>
    </div>
  `;

  try {
    // Simulación de petición de datos asíncrona (500 ms de latencia)
    const todosLosProductos = await obtenerProductosAsync(500);
    const destacados = todosLosProductos.filter(p => p.esDestacado === true);

    if (destacados.length === 0) {
      container.innerHTML = '<p class="text-note" style="text-align: center; width: 100%;">No hay piezas destacadas disponibles por el momento.</p>';
      return;
    }

    container.innerHTML = '';

    destacados.forEach(producto => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.setAttribute('data-id', producto.id);

      card.innerHTML = `
        <div class="product-image-container">
          <img src="${producto.imagen}" alt="${producto.nombre} - Mueblería Hermanos Jota" class="product-image" loading="lazy">
        </div>
        <div class="product-content">
          <span class="product-category">${producto.categoria}</span>
          <span class="producto-tagline">${producto.tagline}</span>
          <h3 class="product-title">${producto.nombre}</h3>
          <p class="product-price">$${producto.precio.toLocaleString('es-AR')}</p>
          <a href="producto.html?id=${producto.id}" class="product-link" aria-label="Ver detalle de ${producto.nombre}">
            Ver Detalle
          </a>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error al cargar productos destacados:', error);
    container.innerHTML = '<p class="text-note" style="text-align: center; width: 100%; color: #c93b2b;">Ocurrió un error al cargar las piezas destacadas. Por favor, reintenta nuevamente.</p>';
  }
}
