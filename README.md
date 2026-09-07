# Proyecto E-Commerce "Hermanos Jota" - Curso Fullstack ITBA 2026

> Proyecto en HTML, CSS y Javascript puros, con el objetivo de demostrar conceptos aprendidos durante los sprint 1 y 2 del curso Fullstack ITBA 2026.

---

## Integrantes

| Nombre y Apellido | GitHub |
| :--- | :--- |
| **Franco Blanchard** | [@francoBlanchard](https://github.com/francoBlanchard) |
| **Nancy Elliff** | [@nancyrocio90-code](https://github.com/nancyrocio90-code) |
| **Tomás González** | [@tsgexe](https://github.com/tsgexe) |

---

## Descripción de Funcionalidad

En este proyecto, se nos dió la tarea de realizar la primera parte del proyecto "Hermanos Jota E-Commerce", donde simulamos una página de comercio para una mueblería ficticia llamada "Mueblería Hermanos Jota". Se nos entregó material de referencia para el proyecto (Manual de marca, kit de imagenes, redes sociales y catálogo de productos) con el que construir una página funcional acorde a las pautas exigidas. Se debe destacar que es un desarrollo en HTML, CSS y JavaScript nativo, sin dependencias de frameworks ni librerías externas.

En esta etapa nos centramos en la experiencia de usuario (UX/UI), el asincronismo y la persistencia del lado del cliente, sentando las bases para integrar nuevas tecnologías en los próximos sprints. El objetivo del equipo fue concebir una interfaz agradable, de navegación intuitiva y con total fidelidad al manual de identidad visual.

### Características Principales
- **Diseño Mobile First y Responsivo:** Se priorizó implementar un diseño Mobile First, completamente responsivo para un correcto funcionamiento tanto en dispositivos móviles como en plataformas de escritorio. Para lograr esto, se utilizaron diseños con CSS Grid y Flexbox que se adaptan a diferentes tamaños de pantalla.
- **Página principal:** Página de inicio con Hero Banner animado y completo, sección de productos destacados y un carrousel interactivo con la filosofía de la empresa en su programa "Herencia Viva".
- **Catálogo Asíncrono con Búsqueda y Filtros:** Simulación de llamadas de red asíncronas, filtrado por categorías (*Living*, *Comedor*, *Dormitorio* y *Estudio y Oficina*) y buscador por texto en tiempo real.
- **Ficha de producto dinámica:** Una única plantilla dinámica que se adapta a las características de cada producto, mostrando información relevante como precio, descripción, ficha técnica y garantía. Se incluye un botón de "Añadir al Carrito" y un selector de cantidad.
- **Carrito de Compras:** Función de compra que permite agregar y quitar productos, con persistencia de datos en localStorage. Panel lateral deslizante con funciones de gestión (Incrementar/decrementar/eliminar producto y Vaciar carrito) y persistencia de datos entre pestañas (Necesario recargar).
- **Formulario de contacto asistido:** Formulario con validación de campos en tiempo real, mensajes de error y una pantalla de confirmación exitosa con opción para volver a contactarse.

---

## Tecnologías Usadas

Detalle del stack tecnológico implementado en el desarrollo:

- **Lenguajes:** `HTML5 Semántico`, `CSS3`, `Javascript (ES6+ nativo)`
- **Frontend / UI:** `Vanilla CSS`, `Variables CSS`, `Flexbox`, `Grid`, `Animaciones CSS`, `Google Fonts`, `Iconografía SVG Vectorial Inline`
- **Backend / API:** `localStorage`, `URLSearchParams`, `Touch Events`, `requestAnimationFrame`
- **Herramientas & Entorno:** `GitHub`, `Git`, `Google Antigravity`, `Cursor IDE`

---

## Para probar el proyecto

1. **Clonar el repositorio y entrar a la carpeta:**

   ```bash
   git clone https://github.com/tsgexe/sprint2-grupo14-itbafullstack.git
   cd sprint2-grupo14-itbafullstack
   ```

2. **Ejecutar en tu sistema operativo:**

   * **En Windows:**
     * Doble clic en el archivo `index.html`, o desde la terminal (CMD / PowerShell):
       ```cmd
       start index.html
       ```

   * **En Linux:**
     * Desde la terminal:
       ```bash
       xdg-open index.html
       ```

   * **En macOS:**
     * Desde la terminal:
       ```bash
       open index.html
       ```
       
    * **Recomendación (Live Server):** Recomendamos ejecutarlo mediante la extensión **Live Server** en Visual Studio Code o Cursor IDE. Solo hace clic derecho sobre `index.html` y selecciona **"Open with Live Server"** (o presiona el botón **"Go Live"** en la barra inferior).
