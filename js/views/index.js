/**
 * Vista de Inicio (Home) - Mueblería Hermanos Jota
 * Renderiza dinámicamente los productos destacados mediante carga asíncrona simulada.
 */

import { obtenerProductosAsync } from '../data/productos.js';
import '../modules/cart.js';

document.addEventListener('DOMContentLoaded', () => {
  renderProductosDestacados();
  initHeritageCarousel();
  initHeroParallax();
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

/**
 * Inicializa el carrusel interactivo en foco del Programa Herencia Viva.
 * Mantiene la tarjeta central nítida y destacada, difumina las laterales
 * y soporta navegación por botones, clics directos, teclado y gestos táctiles.
 */
function initHeritageCarousel() {
  const carousel = document.getElementById('heritage-carousel');
  const stage = document.getElementById('heritage-stage');
  const btnPrev = document.getElementById('carousel-btn-prev');
  const btnNext = document.getElementById('carousel-btn-next');
  const dotsContainer = document.getElementById('heritage-dots');

  if (!carousel || !stage) return;

  const cards = Array.from(stage.querySelectorAll('.heritage-card'));
  const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.heritage-dot')) : [];
  const total = cards.length;

  if (total === 0) return;

  let currentIndex = 0;

  function updateCarousel() {
    cards.forEach((card, i) => {
      card.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden-left', 'is-hidden-right');

      let diff = (i - currentIndex) % total;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      if (diff === 0) {
        card.classList.add('is-active');
        card.setAttribute('aria-hidden', 'false');
      } else if (diff === -1) {
        card.classList.add('is-prev');
        card.setAttribute('aria-hidden', 'true');
      } else if (diff === 1) {
        card.classList.add('is-next');
        card.setAttribute('aria-hidden', 'true');
      } else if (diff < -1) {
        card.classList.add('is-hidden-left');
        card.setAttribute('aria-hidden', 'true');
      } else {
        card.classList.add('is-hidden-right');
        card.setAttribute('aria-hidden', 'true');
      }
    });

    dots.forEach((dot, i) => {
      const isActive = i === currentIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });
  }

  function irSiguiente() {
    currentIndex = (currentIndex + 1) % total;
    updateCarousel();
  }

  function irAnterior() {
    currentIndex = (currentIndex - 1 + total) % total;
    updateCarousel();
  }

  if (btnNext) {
    btnNext.addEventListener('click', irSiguiente);
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', irAnterior);
  }

  // Clic directo en las tarjetas laterales para traerlas al centro
  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      if (card.classList.contains('is-prev') || card.classList.contains('is-next')) {
        currentIndex = i;
        updateCarousel();
      }
    });
  });

  // Clic en los puntos indicadores (dots)
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
  });

  // Navegación con teclado (Flecha izquierda / Flecha derecha)
  carousel.setAttribute('tabindex', '0');
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      irSiguiente();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      irAnterior();
    }
  });

  // Soporte de gestos táctiles optimizado (Swipe sin desvío de la página)
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  let isHorizontalSwipe = false;

  stage.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchEndX = touchStartX;
    touchEndY = touchStartY;
    isHorizontalSwipe = false;
  }, { passive: true });

  stage.addEventListener('touchmove', (e) => {
    if (e.touches.length !== 1) return;
    touchEndX = e.touches[0].clientX;
    touchEndY = e.touches[0].clientY;

    const deltaX = Math.abs(touchEndX - touchStartX);
    const deltaY = Math.abs(touchEndY - touchStartY);

    // Si el usuario desliza horizontalmente sobre el carrusel, evitamos que la página se desplace
    if (deltaX > deltaY && deltaX > 8) {
      isHorizontalSwipe = true;
      if (e.cancelable) {
        e.preventDefault();
      }
    }
  }, { passive: false });

  stage.addEventListener('touchend', (e) => {
    const swipeDistance = touchStartX - touchEndX;
    const threshold = 35; // Umbral táctil calibrado para respuesta inmediata

    if (isHorizontalSwipe || Math.abs(swipeDistance) >= threshold) {
      if (swipeDistance > threshold) {
        irSiguiente();
      } else if (swipeDistance < -threshold) {
        irAnterior();
      }
    }

    // Resetear coordenadas
    touchStartX = 0;
    touchStartY = 0;
    touchEndX = 0;
    touchEndY = 0;
    isHorizontalSwipe = false;
  }, { passive: true });

  stage.addEventListener('touchcancel', () => {
    touchStartX = 0;
    touchStartY = 0;
    touchEndX = 0;
    touchEndY = 0;
    isHorizontalSwipe = false;
  }, { passive: true });

  // Render inicial
  updateCarousel();
}

/**
 * Efecto Parallax en el Hero Banner
 * Desplaza la imagen de fondo con velocidad relativa al scroll vertical.
 * Optimizado con requestAnimationFrame y cálculo limitado al rango visible.
 */
function initHeroParallax() {
  const heroBanner = document.querySelector('.hero-banner');
  const heroBg = document.getElementById('hero-bg-parallax');

  if (!heroBanner || !heroBg) return;

  // Respeto de accesibilidad
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionQuery.matches) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const bannerHeight = heroBanner.offsetHeight;

    // Solo actualizar mientras el banner esté visible en el viewport
    if (scrollY <= bannerHeight) {
      const offset = scrollY * 0.35;
      heroBg.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // Posicionamiento inicial ante recarga con scroll persistido
  updateParallax();
}
