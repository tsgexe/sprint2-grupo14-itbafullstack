/**
 * Base de datos oficial de productos - Mueblería Hermanos Jota
 * Manual de Marca 2026
 */

export const productos = [
  {
    id: 'uspallata',
    nombre: 'Aparador Uspallata',
    categoria: 'Comedor',
    precio: 850000,
    tagline: 'Madera FSC®',
    imagen: 'assets/img/products/uspallata.png',
    esDestacado: true,
    descripcion:
      'Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.',
    fichaTecnica: {
      Medidas: '180 x 45 x 75 cm',
      Materiales: 'Nogal macizo FSC®, herrajes de latón',
      Acabado: 'Aceite natural ecológico',
      Capacidad: '6 compartimientos interiores',
      Peso: '68 kg'
    },
    garantia:
      '10 años en estructura, 5 años en acabados (A través de nuestro programa Herencia Viva)'
  },
  {
    id: 'recoleta',
    nombre: 'Biblioteca Recoleta',
    categoria: 'Estudio y Oficina',
    precio: 680000,
    tagline: 'Madera FSC®',
    imagen: 'assets/img/products/recoleta.png',
    esDestacado: false,
    descripcion:
      'Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.',
    fichaTecnica: {
      Medidas: '100 x 35 x 200 cm',
      Materiales: 'Estructura de acero, estantes de roble',
      Acabado: 'Laca mate ecológica',
      Capacidad: '45 kg por estante',
      Modulares: '5 estantes ajustables'
    },
    garantia:
      '10 años en estructura, 5 años en acabados (A través de nuestro programa Herencia Viva)'
  },
  {
    id: 'mendoza',
    nombre: 'Butaca Mendoza',
    categoria: 'Living',
    precio: 743000,
    tagline: 'Madera FSC®',
    imagen: 'assets/img/products/mendoza.png',
    esDestacado: false,
    descripcion:
      'Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.',
    fichaTecnica: {
      Medidas: '80 x 75 x 85 cm',
      Materiales: 'Guatambú macizo, tela bouclé',
      Acabado: 'Cera vegetal, tapizado premium',
      Tapizado: 'Repelente al agua y manchas',
      Confort: 'Espuma de alta densidad'
    },
    garantia:
      '10 años en estructura, 5 años en acabados (A través de nuestro programa Herencia Viva)'
  },
  {
    id: 'copacabana',
    nombre: 'Sillón Copacabana',
    categoria: 'Living',
    precio: 827000,
    tagline: 'Madera FSC®',
    imagen: 'assets/img/products/copacabana.png',
    esDestacado: false,
    descripcion:
      'Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.',
    fichaTecnica: {
      Medidas: '90 x 85 x 95 cm',
      Materiales: 'Cuero curtido vegetal, acero pintado',
      Acabado: 'Cuero anilina premium',
      Rotación: '360° silenciosa y suave',
      Confort: 'Espuma de alta densidad'
    },
    garantia:
      '10 años en estructura, 5 años en acabados (A través de nuestro programa Herencia Viva)'
  },
  {
    id: 'aconcagua',
    nombre: 'Mesa de Noche Aconcagua',
    categoria: 'Dormitorio',
    precio: 768000,
    tagline: 'Madera FSC®',
    imagen: 'assets/img/products/aconcagua.png',
    esDestacado: true,
    descripcion:
      'Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su diseño limpio y funcional permite convivir con diferentes estilos de dormitorio, ofreciendo almacenamiento discreto y elegante para objetos personales.',
    fichaTecnica: {
      Medidas: '45 x 35 x 60 cm',
      Materiales: 'Roble macizo FSC®, herrajes soft-close',
      Acabado: 'Barniz mate de poliuretano',
      Almacenamiento: '1 cajón + repisa inferior',
      Características: 'Cajón con cierre suave'
    },
    garantia:
      '10 años en estructura, 5 años en acabados (A través de nuestro programa Herencia Viva)'
  },
  {
    id: 'patagonia',
    nombre: 'Sofá Patagonia',
    categoria: 'Living',
    precio: 1344000,
    tagline: 'Madera FSC®',
    imagen: 'assets/img/products/patagonia.png',
    esDestacado: true,
    descripcion:
      'Sofá de tres cuerpos tapizado en lino 100% natural premium con estructura de eucalipto certificado FSC®. Su diseño de líneas serenas y proporciones generosas ofrece un confort acogedor y una sofisticación atemporal para el living contemporáneo.',
    fichaTecnica: {
      Medidas: '220 x 90 x 80 cm',
      Materiales: 'Madera de eucalipto certificada FSC®',
      Tapizado: 'Lino 100% natural premium',
      Relleno: 'Espuma HR + plumón reciclado',
      Sostenibilidad: 'Materiales 100% reciclables'
    },
    garantia:
      '10 años en estructura, 5 años en acabados (A través de nuestro programa Herencia Viva)'
  },
  {
    id: 'pampa',
    nombre: 'Mesa Comedor Pampa',
    categoria: 'Comedor',
    precio: 810000,
    tagline: 'Madera FSC®',
    imagen: 'assets/img/products/pampa.png',
    esDestacado: false,
    descripcion:
      'Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. Su diseño robusto y elegante se adapta perfectamente a reuniones íntimas o grandes celebraciones familiares, extendiéndose de 6 a 10 comensales.',
    fichaTecnica: {
      Medidas: '160-240 × 90 × 75 cm',
      Materiales: 'Roble macizo FSC®, mecanismo alemán',
      Acabado: 'Aceite cera natural',
      Capacidad: '6-10 comensales',
      Extensión: 'Sistema de mariposa central'
    },
    garantia:
      '10 años en estructura, 5 años en acabados (A través de nuestro programa Herencia Viva)'
  },
  {
    id: 'cordoba',
    nombre: 'Sillas Cordoba',
    categoria: 'Comedor',
    precio: 673000,
    tagline: 'Madera FSC®',
    imagen: 'assets/img/products/cordoba.png',
    esDestacado: false,
    descripcion:
      'Juego de cuatro sillas apilables confeccionadas en contrachapado de nogal moldeado con base tubular en tono Sage Green. Su ergonomía superior y la calidad de sus componentes aseguran un confort excepcional y una vida útil prolongada, integrándose perfectamente en comedores de estética actual.',
    fichaTecnica: {
      Medidas: '45 x 52 x 80 cm (cada unidad)',
      Materiales: 'Nogal contrachapado, tubo de acero',
      Acabado: 'Laca mate, pintura epoxi',
      Apilables: 'Hasta 6 sillas',
      Incluye: 'Set de 4 sillas'
    },
    garantia:
      '10 años en estructura, 5 años en acabados (A través de nuestro programa Herencia Viva)'
  },
  {
    id: 'costa',
    nombre: 'Escritorio Costa',
    categoria: 'Estudio y Oficina',
    precio: 924000,
    tagline: 'Madera FSC®',
    imagen: 'assets/img/products/costa.png',
    esDestacado: false,
    descripcion:
      'Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa, combina funcionalidad moderna con estética minimalista y sostenible, perfecto para el trabajo remoto.',
    fichaTecnica: {
      Medidas: '120 × 60 × 75 cm',
      Materiales: 'Bambú laminado, herrajes ocultos',
      Acabado: 'Laca mate resistente',
      Almacenamiento: '1 cajón con organizador',
      Cables: 'Pasacables integrado'
    },
    garantia:
      '10 años en estructura, 5 años en acabados (A través de nuestro programa Herencia Viva)'
  },
  {
    id: 'belgrano',
    nombre: 'Silla de Trabajo Belgrano',
    categoria: 'Estudio y Oficina',
    precio: 546000,
    tagline: 'Madera FSC® - Ergonomía europea EN 1335',
    imagen: 'assets/img/products/belgrano.png',
    esDestacado: true,
    descripcion:
      'Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo confort y apoyo lumbar, ideal para oficinas en casa y espacios de coworking.',
    fichaTecnica: {
      Medidas: '60 × 60 × 90-100 cm',
      Materiales: 'Malla técnica, tejido reciclado',
      Acabado: 'Base cromada, tapizado premium',
      Regulación: 'Altura + inclinación respaldo'
    },
    garantia:
      '10 años en estructura, 5 años en acabados (A través de nuestro programa Herencia Viva)'
  },
  {
    id: 'araucaria',
    nombre: 'Mesa de Centro Araucaria',
    categoria: 'Living',
    precio: 649000,
    tagline: 'Madera FSC®',
    imagen: 'assets/img/products/araucaria.png',
    esDestacado: false,
    descripcion:
      'Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal. Su diseño minimalista se convierte en el punto focal perfecto para cualquier sala de estar contemporánea, combinando la frialdad del mármol con la calidez de la madera.',
    fichaTecnica: {
      Medidas: '90 x 90 x 45 cm',
      Materiales: 'Sobre de mármol Patagonia, patas de nogal',
      Acabado: 'Mármol pulido, aceite natural en madera',
      Peso: '42 kg',
      'Carga máxima': '25 kg distribuidos'
    },
    garantia:
      '10 años en estructura, 5 años en acabados (A través de nuestro programa Herencia Viva)'
  }
];

// Compatibilidad con entornos no modulares o scripts directos
if (typeof window !== 'undefined') {
  window.productos = productos;
}

/**
 * Simula una petición asíncrona de datos a un servidor/API para obtener el catálogo.
 * Utiliza Promise y setTimeout para emular la latencia de red de acuerdo a la consigna.
 *
 * @param {number} delayMs - Tiempo de espera simulado en milisegundos (por defecto 500ms)
 * @returns {Promise<Array>} Promesa que resuelve la colección de productos
 */
export function obtenerProductosAsync(delayMs = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...productos]);
    }, delayMs);
  });
}
