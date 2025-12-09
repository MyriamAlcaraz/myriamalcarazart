// ARCHIVO: constants.ts

import { Artwork, PriceRow } from './types';
// NOTA: Se ha eliminado la importación de SocialPost y WorkflowItem ya que no se usan aquí

export const ARTIST_INFO = {
  name: "Myriam Alcaraz",
  tagline: "ARTE CON ALMA Y SOFISTICACIÓN", 
  email: "myriamhotmail@hotmail.com",
  instagram: "@myriamalcaraz.artist",
  website: "myriamalcaraz.wordpress.com",
  bioShort: "Myriam Alcaraz combina una sólida formación técnica con una voz artística profundamente personal. Ha completado más de noventa cursos especializados, fusionando el rigor del aprendizaje académico con la exploración autodidacta. Actualmente trabaja a partir de sus propias fotografías, consolidando su presencia en circuitos internacionales y colecciones privadas.",
  statement: "Trabajo la figura humana desde una mirada íntima y contemporánea. Busco un equilibrio preciso entre técnica y emoción, donde la luz y el color construyen atmósferas que invitan a la contemplación. Cada obra es un diálogo silencioso con el tiempo.",
  
  // =======================================================
  // 🛑 DATOS DE TRAYECTORIA Y PUBLICACIONES (KIT) - ¡CRÍTICO!
  // ESTOS DATOS HAN SIDO ACTUALIZADOS SEGÚN SU SOLICITUD
  // =======================================================

  accolades: {
      exposiciones: [
          '92 Salón de Otoño de la Asociación Española de Pintores y Escultores.',
          'Formó parte de la exposición en la Casa de Vacas del Parque del Retiro - Madrid, del 30 de octubre al 23 de noviembre de 2025.',
          'X Salón de Realismo, exposición colectiva organizada por la Asociación Española de Pintores y Escultores en la Sala de Exposiciones del Centro Cultural “La Vaguada” de la JM Fuencarral-El Pardo, C/ Monforte de Lemos, 40 Madrid, del 25 de septiembre al 27 de octubre de 2025.',
          'Exposición virtual TargetPrice 2025 (tres obras semifinalistas).',
          '"Alba y Crepúsculo", exposición colectiva de la Asociación Española de Pintores y Escultores. Salas Juana Francés y Pablo Serrano, Junta Municipal de Tetuán, Madrid. Del 2 al 28 de abril de 2025.',
      ],
      concursos: [
          'Finalista en el concurso internacional ModPortrait 2022 con “Pablo en Cascada”',
          // Se han añadido comas para mayor claridad al listar las obras:
          'Semifinalista en concurso internacional TargetPrice 2025 con tres obras: “Laura en Parque Oeste”, “La Farola” y “La Viajera”', 
      ],
      publicaciones: [
          // Se han añadido comas y puntos para una mejor lectura y formato:
          'Obras incluidas en la Guía Leonardo 2025: "Ana y la Habana", "Laura en el Crepúsculo", "Pablo en Cascada", "Sara bajo farola" y "Sara en marquesina"', 
          'Anuarios ModPortrait 2022 y 2024.',
          'Participación en la guía virtual de Galería Arte Libre, ModPortrait 2025: https://www.artelibre-store.com/guialeonardo-2025/listado-participantes-2025',
      ],
  },

  // ----------------------------------------------------
  // LISTA DE OBRAS DE ARTE
  // ----------------------------------------------------
  ARTWORKS: [
    {
      id: "MA-2025-04",
      title: "Sara en Marquesina",
      dimensions: "100x81 cm",
      technique: "Óleo en tela montada en tabla con bastidor",
      price: 3000,
      image: "/obras/sara_marquesina.jpg",
      description: "Óleo seleccionado en el 92 Salón de Otoño de la AEPE (Casa de Vacas, Madrid). Un estudio de la luz urbana y la quietud en el movimiento.",
      year: "2024",
      status: "available",
    },
    {
      id: "MA-2025-05",
      title: "Laura en el Crepúsculo",
      dimensions: "100x81 cm",
      technique: "Óleo en tela montada en tabla con bastidor",
      price: 3000,
      image: "/obras/laura_crepusculo.jpg",
      description: "Óleo Semifinalista del Target Prize 2025. Retrato íntimo en la hora azul, explorando la melancolía y la fuerza femenina.",
      year: "2024",
      status: "available",
    },
    {
      id: "MA-2022-01",
      title: "Pablo en Cascada",
      dimensions: "55x46 cm",
      technique: "Óleo sobre tela en bastidor",
      price: 2500,
      image: "/obras/pablo_cascada.jpg",
      description: "Obra Finalista del ModPortrait 2022. La figura humana se integra en el entorno natural, creando un diálogo entre lo efímero del agua y la permanencia de la pose.",
      year: "2022",
      status: "available",
    },
    {
      id: "MA-2023-08",
      title: "Jilguero en charca del Botánico",
      dimensions: "46x38 cm",
      technique: "Óleo sobre lienzo",
      price: 0,
      image: "/obras/jilguero_botanico.jpg",
      description: "Seleccionada en el Certamen Pequeño Formato (C.C. Príncipe de Asturias). Una pieza de fauna que captura la vida silvestre con precisión y luz.",
      year: "2023",
      status: "sold", // Estado: Vendida
    },
    {
      id: "MA-2025-07",
      title: "Ana y la Habana",
      dimensions: "92x60 cm",
      technique: "Óleo sobre tela montada en tabla con bastidor",
      price: 3000,
      image: "/obras/ana_habana.jpg",
      description: "Una obra vibrante que explora la luz y los colores de La Habana, utilizando el retrato como ancla de la narrativa visual.",
      year: "2025",
      status: "available",
    },
  ],
  
  // ----------------------------------------------------
  // TABLA DE PRECIOS POR DIMENSIONES (EUR)
  // ----------------------------------------------------
  PRICING_TABLE: [
    { dimensions: '55x46', priceBase: 632, priceWithTax: 764.72 },
    { dimensions: '60x50', priceBase: 750, priceWithTax: 907.50 },
    { dimensions: '65x54', priceBase: 877, priceWithTax: 1061.17 },
    { dimensions: '70x60', priceBase: 1050, priceWithTax: 1270.50 },
    { dimensions: '73x60', priceBase: 1095, priceWithTax: 1324.95 },
    { dimensions: '80x60', priceBase: 1200, priceWithTax: 1452.00 },
    { dimensions: '81x60', priceBase: 1215, priceWithTax: 1470.15 },
    { dimensions: '90x70', priceBase: 1575, priceWithTax: 1905.75 },
    { dimensions: '92x73', priceBase: 1680, priceWithTax: 2032.80 },
    { dimensions: '100x70', priceBase: 1750, priceWithTax: 2117.50 },
    { dimensions: '100x81', priceBase: 2025, priceWithTax: 2450.25 },
  ],

  // ----------------------------------------------------
  // PUNTOS DE ANÁLISIS (Para uso interno, por ejemplo, en un panel de gestión)
  // ----------------------------------------------------
  ANALYSIS_POINTS: { 
    strengths: [
      "Reconocimiento Institucional Completo: Selección en 92 Salón de Otoño (Casa de Vacas), X Salón de Realismo (La Vaguada) y Certamen Pequeño Formato (C.C. Príncipe de Asturias).",
      "Premios Internacionales: Finalista ModPortrait 2022 y Semifinalista Target Prize 2025.",
      "Publicaciones de Prestigio: Obra incluida en la Guía de Arte y Artistas Leonardo 2025 y Catálogos ModPortrait.",
      "Identidad & Gestión: Marca personal premium ('Alma y Sofisticación') con control total del inventario y venta directa."
    ], 
    opportunities: [
      "Mercado Internacional: Potenciar origen suizo y premios internacionales para captar coleccionistas en Zúrich y NY.",
      "Logística Giclée (Dropshipping Híbrido): Implementar modelo de 'Doble Envío'. El impresor envía la obra en tubo directo al cliente; Tú envías por separado una carta de lujo con el Certificado Original firmado y Sello Seco. Esto maximiza el margen, simplifica la logística y mantiene la experiencia de exclusividad.",
      "Sector Interiorismo: Alianzas con estudios de arquitectura (como la demo Mónaco) para proyectos residenciales de gran escala."
    ],
    challenges: [
      "Visibilidad Digital: La web principal tiene un candado de acceso (Preview y Estudio), lo que limita la visibilidad orgánica en buscadores. Es esencial mantener un perfil activo en redes.",
      "Integración AI: Expandir el 'AI Studio' para incluir la generación de textos para catálogo y redes sociales, además del contenido visual (video) ya desarrollado.",
      "Gestión de Coleccionistas: Implementar un CRM básico para seguimiento de ventas y contactos."
    ]
  },
  
};