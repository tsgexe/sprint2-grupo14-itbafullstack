/**
 * Vista dinámica de Detalle de Producto - Mueblería Hermanos Jota
 * Renderiza los datos del producto seleccionado según el parámetro ?id en la URL.
 */

import { productos, obtenerProductosAsync } from '../data/productos.js';
import { agregarProducto } from '../modules/cart.js';

document.addEventListener('DOMContentLoaded', () => {
  renderDetalleProducto();
});

/**
 * Lee el parámetro 'id' de la URL y puebla el DOM con los datos del producto correspondiente.
 */
async function renderDetalleProducto() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  // Si no se proporcionó un ID en la URL, redirige limpiamente al catálogo general
  if (!productId) {
    window.location.href = 'productos.html';
    return;
  }

  // Búsqueda asíncrona del producto simulando petición a base de datos
  const catalogo = await obtenerProductosAsync(300);
  const producto = catalogo.find(p => p.id === productId);

  // Si el ID no existe en la colección, redirige a productos.html
  if (!producto) {
    window.location.href = 'productos.html';
    return;
  }

  // 1. Título del documento
  document.title = `Mueblería Hermanos Jota | ${producto.nombre}`;

  // 2. Miga de Pan (Breadcrumb)
  const breadcrumbCurrent = document.querySelector('.breadcrumb-current');
  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = producto.nombre;
  }

  // 3. Categoría
  const categoryElem = document.querySelector('.product-category');
  if (categoryElem) {
    categoryElem.textContent = producto.categoria;
  }

  // 4. Tagline / Certificación
  const taglineElem = document.querySelector('.producto-tagline');
  if (taglineElem) {
    taglineElem.textContent = producto.tagline;
  }

  // 5. Nombre / Título del producto
  const titleElem = document.getElementById('product-title');
  if (titleElem) {
    titleElem.textContent = producto.nombre;
  }

  // 6. Precio formateado con toLocaleString('es-AR')
  const priceElem = document.querySelector('.product-price-detail');
  if (priceElem) {
    priceElem.textContent = `$${producto.precio.toLocaleString('es-AR')}`;
  }

  // 7. Descripción editorial
  const descElem = document.querySelector('.product-description-text');
  if (descElem) {
    descElem.textContent = producto.descripcion;
  }

  // 8. Imagen principal y atributo alt
  const imgElem = document.getElementById('main-product-image');
  if (imgElem) {
    imgElem.src = producto.imagen;
    imgElem.alt = `${producto.nombre} - Mueblería Hermanos Jota`;
  }

  // 9. Configuración y evento del botón de compra
  const buyBtn = document.getElementById('btn-buy');
  const qtyInput = document.getElementById('product-quantity');
  if (buyBtn) {
    buyBtn.textContent = 'Añadir al Carrito';
    buyBtn.setAttribute('aria-label', `Añadir ${producto.nombre} al carrito`);
    buyBtn.addEventListener('click', () => {
      const cantidad = qtyInput ? Math.max(1, parseInt(qtyInput.value, 10) || 1) : 1;
      agregarProducto(producto.id, cantidad);
    });
  }

  // 10. Generación semántica de Especificaciones Técnicas con <dl>, <dt> y <dd>
  renderFichaTecnica(producto);
}

/**
 * Recorre dinámicamente el objeto fichaTecnica utilizando Object.entries()
 * para construir etiquetas semánticas <dl>, <dt> y <dd>.
 *
 * @param {Object} producto - Objeto del producto seleccionado
 */
function renderFichaTecnica(producto) {
  const specsBlock = document.querySelector('.product-specs-block');
  if (!specsBlock) return;

  const dl = document.createElement('dl');
  dl.className = 'product-specs-dl';
  dl.id = 'product-specs';

  if (producto.fichaTecnica && typeof producto.fichaTecnica === 'object') {
    Object.entries(producto.fichaTecnica).forEach(([clave, valor]) => {
      if (valor !== undefined && valor !== null && String(valor).trim() !== '') {
        const row = document.createElement('div');
        row.className = 'spec-row';

        const dt = document.createElement('dt');
        dt.textContent = `${clave}:`;

        const dd = document.createElement('dd');
        dd.textContent = valor;

        row.appendChild(dt);
        row.appendChild(dd);
        dl.appendChild(row);
      }
    });
  }

  // Incorporación de Garantía oficial (Programa Herencia Viva)
  if (producto.garantia) {
    const row = document.createElement('div');
    row.className = 'spec-row spec-warranty';

    const dt = document.createElement('dt');
    dt.textContent = 'Garantía:';

    const dd = document.createElement('dd');
    dd.textContent = producto.garantia;

    row.appendChild(dt);
    row.appendChild(dd);
    dl.appendChild(row);
  }

  // Reemplazo limpio del contenedor anterior para evitar huecos vacíos
  const existingSpecs = specsBlock.querySelector('.product-specs-list, .product-specs-dl, #product-specs, ul, dl');
  if (existingSpecs) {
    existingSpecs.replaceWith(dl);
  } else {
    specsBlock.appendChild(dl);
  }
}
