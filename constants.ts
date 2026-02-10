import { Artwork, PriceRow } from './types';
// NOTA: Se ha eliminado la importación de SocialPost y WorkflowItem ya que no se usan aquí

// Contraseña para acceso al estudio
export const PASSWORD = "arte2026";

export const ARTIST_INFO = {
  name: "Myriam Alcaraz",
  tagline: "ARTE CON ALMA Y SOFISTICACIÓN", 
  email: "myriamhotmail@hotmail.com",
  instagram: "@myriamalcaraz.artist",
  website: "myriamalcaraz.wordpress.com",
  bioShort: "Myriam Alcaraz combina una sólida formación técnica con una voz artística profundamente personal. Ha completado más de noventa cursos especializados, fusionando el rigor del aprendizaje académico con la exploración autodidacta. Actualmente trabaja a partir de sus propias fotografías, consolidando su presencia en circuitos internacionales y colecciones privadas.",
  statement: "Trabajo la figura humana desde una mirada íntima y contemporánea. Busco un equilibrio preciso entre técnica y emoción, donde la luz y el color construyen atmósferas que invitan a la contemplación. Cada obra es un diálogo silencioso con el tiempo.",
  
  // =======================================================
  // 🛑 DATOS DE TRAYECTORIA Y PUBLICACIONES - CÓDIGO FINAL CORREGIDO
  // =======================================================

  accolades: {
      exposiciones: [
          'Museo de Arte Cromática de Toledo. Obra "Ana y la Habana" seleccionada por la Asociación Española de Pintores y Escultores para ser expuesta durante el mes de febrero de 2026.',
          '92 Salón de Otoño de la Asociación Española de Pintores y Escultores. Formó parte de la exposición en la Casa de Vacas del Parque del Retiro - Madrid, del 30 de octubre al 23 de noviembre de 2025.',
          'X Salón de Realismo, exposición colectiva organizada por la Asociación Española de Pintores y Escultores en la Sala de Exposiciones del Centro Cultural "La Vaguada" de la JM Fuencarral-El Pardo, C/ Monforte de Lemos, 40 Madrid, del 25 de septiembre al 27 de octubre de 2025.',
          'Exposición virtual TargetPrice 2025 (tres obras semifinalistas).',
          '"Alba y Crepúsculo", exposición colectiva de la Asociación Española de Pintores y Escultores. Salas Juana Francés y Pablo Serrano, Junta Municipal de Tetuán, Madrid. Del 2 al 28 de abril de 2025.',
      ],
      concursos: [
          // ¡Comillas rectas aplicadas!
          'Finalista en el concurso internacional ModPortrait 2022 con "Pablo en Cascada"',
          'Semifinalista en concurso internacional TargetPrice 2025 con tres obras: "Laura en Parque Oeste", "La Farola" y "La Viajera"',
      ]
  },

  publications: [
      'Obras incluidas en la Guía Leonardo 2025: "Ana y la Habana", "Laura en el Crepúsculo", "Pablo en Cascada", "Sara bajo farola" y "Sara en marquesina".',
      'Anuarios ModPortrait 2022 y 2024.',
      'Participación en la guía virtual de Galería Arte Libre, ModPortrait 2025: https://www.artelibre-store.com/guialeonardo-2025/listado-participantes-2025/',
  ]
};

export const ARTWORKS: Artwork[] = [
  { 
    id: '21', 
    title: 'Abruma y belleza', 
    dimensions: '100x73 cm', 
    technique: 'Óleo sobre tela', 
    price: 3000, 
    image: '/obras/OBRA_21.jpg', 
    description: 'Retrato atmosférico donde la figura emerge entre brumas oscuras y doradas.', 
    status: 'available', 
    year: '2026' 
  },
  { 
    id: '22', 
    title: 'Joven con vela en la bruma', 
    dimensions: '100x73 cm', 
    technique: 'Óleo sobre tela', 
    price: 3000, 
    image: '/obras/OBRA_22.jpg', 
    description: 'Estudio de luz cálida y fría en atmósfera envolvente.', 
    status: 'available', 
    year: '2026' 
  },
  { 
    id: '23', 
    title: 'Sara en Retiro', 
    dimensions: '100x80 cm', 
    technique: 'Óleo sobre papel encolado en tabla', 
    price: 3000, 
    image: '/obras/OBRA_23.jpg', 
    description: 'Retrato en el Parque del Retiro de Madrid.', 
    status: 'available', 
    year: '2026' 
  },
  // --- OBRAS DESTACADAS ---
  { 
    id: '4', 
    title: 'Sara en Marquesina', 
    dimensions: '100x81 cm', 
    technique: 'Óleo en tela', 
    price: 3000, 
    image: '/obras/OBRA_04.jpg', 
    description: '92 Salón de Otoño de la Asociación Española de Pintores y Escultores. Obra seleccionada para la exposición en la Casa de Vacas del Parque del Retiro - Madrid, del 30 de octubre al 23 de noviembre de 2025, y que forma parte del catálogo de la misma. Podemos encontrarla en la Guía de Arte y Artistas Leonardo 2025. Exposición: Febrero 2026, Museo Cromática de Toledo.', 
    status: 'available' 
  },
  { 
    id: '2', 
    title: 'Laura en el Crepúsculo', 
    dimensions: '100x81 cm', 
    technique: 'Óleo en tela montada en tabla', 
    price: 3000, 
    image: '/obras/OBRA_02.jpg', 
    // URL con typo corregido (targetpaintingprize)
    description: 'Obra semifinalista en el concurso Target Prize 2025. Formó parte de la exposición colectiva del certamen "Alba y Crepúsculo" organizado por la Asociación Española de Pintores y Escultores, expuesta en las Salas de exposiciones "Juana Francés y Pablo Serrano" Madrid. Forma parte del catálogo físico ModPortrait 2024, de la Guía de arte y artistas Leonardo 2025, así como la exposición virtual de Target Prize 2025 https://targetpaintingprize.com/?artworks=laura-en-parque-oeste', 
    status: 'available' 
  },
  { 
    id: '3', 
    title: 'Sara bajo la farola', 
    dimensions: '92x60 cm', 
    technique: 'Óleo sobre tela', 
    price: 3000, 
    image: '/obras/OBRA_03.jpg', 
    // URL con typo corregido (targetpaintingprize)
    description: 'Podemos encontrar esta obra en la Guía de arte y artistas Leonardo 2025, ademas de la exposición virtual del concurso Internacional Target Prize 2025 https://targetpaintingprize.com/?artworks=la-farola', 
    status: 'available' 
  },
  
  // --- RESTO DE OBRAS ---
  { 
    id: '1', 
    title: 'Autorretrato en siglo XIX', 
    dimensions: '100x81 cm', 
    technique: 'Óleo en tela montada en tabla', 
    price: 3000, 
    image: '/obras/OBRA_01.jpg', 
    description: 'Autorretrato decimonónico donde la figura clásica se funde con una técnica moderna de fondo tricolor aplicado con paleta', 
    status: 'available', 
    year: '2025' 
  },
  {
    id: '5',
    title: 'Ana y la Habana',
    dimensions: '92x60 cm',
    technique: 'Óleo sobre tela',
    price: 3000,
    image: '/obras/OBRA_05.jpg',
    description: 'Obra seleccionada por la Asociación Española de Pintores y Escultores y el Museo de Arte Cromática de Toledo para ser expuesta durante el mes de febrero de 2026. Incluida en la Guía de Arte y Artistas Leonardo 2025.',
    status: 'available' 
  },
  { 
    id: '6', 
    title: 'Viajera', 
    dimensions: '81x100 cm', 
    technique: 'Óleo sobre tela', 
    price: 3000, 
    image: '/obras/OBRA_06.jpg', 
    // URL con typo corregido (targetpaintingprize)
    description: 'Forma parte de la exposición virtual del concurso Internacional Target Prize 2025 https://targetpaintingprize.com/?artworks=la-viajera', 
    status: 'available' 
  },
  { 
    id: '7', 
    title: 'Memorias de Mekong I', 
    dimensions: '100x65 cm', 
    technique: 'Óleo sobre tela', 
    price: 3000, 
    image: '/obras/OBRA_07.jpg', 
    description: 'Obra Seleccionada PARA EXPOSICIÓN en EL X SALÓN DE REALISMO ORGANIZADO POR LA ASOCIACIÓN ESPAÑOLA DE PINTORES Y ESCULTORES EN LA SALA DE EXPOSICIONES DEL CENTRO CULTURAL "LA VAGUADA" DE LA JM FUENCARRAL-EL PARDO -MADRID, DEL 25 DE SEPTIEMBRE AL 27 DE OCTUBRE DE 2025.', 
    status: 'available' 
  },
  { 
    id: '8', 
    title: 'Memorias de Mekong II', 
    dimensions: '100x65 cm', 
    technique: 'Óleo sobre tela', 
    price: 3000, 
    image: '/obras/OBRA_08.jpg', 
    description: 'Obra Seleccionada PARA EXPOSICIÓN en EL X SALÓN DE REALISMO ORGANIZADO POR LA ASOCIACIÓN ESPAÑOLA DE PINTORES Y ESCULTORES EN LA SALA DE EXPOSICIONES DEL CENTRO CULTURAL "LA VAGUADA" DE LA JM FUENCARRAL-EL PARDO -MADRID, DEL 25 DE SEPTIEMBRE AL 27 DE OCTUBRE DE 2025.', 
    status: 'available' 
  },
  { 
    id: '9', 
    title: 'El niño de la capucha', 
    dimensions: '92x65 cm', 
    technique: 'Óleo sobre tela', 
    price: 2500, 
    image: '/obras/OBRA_09.jpg', 
    description: 'Belleza serena de un niño.', 
    status: 'available' 
  },
  { 
    id: '10', 
    title: 'Joven en piscina', 
    dimensions: '73x100 cm', 
    technique: 'Óleo sobre lienzo', 
    price: 2500, 
    image: '/obras/OBRA_10.jpg', 
    description: 'Estudio de luz y agua.', 
    status: 'available' 
  },
  { 
    id: '11', 
    title: 'Pablo en Cascada', 
    dimensions: '55x46 cm', 
    technique: 'Óleo sobre tela', 
    price: 2500, 
    description: 'Finalista del ModPortrait 2022 | Incluida en la Guía de Arte y Artistas Leonardo 2025.', 
    image: '/obras/OBRA_11.jpg', 
    status: 'available' 
  },
  { 
    id: '12', 
    title: 'Pablo en Cascada II', 
    dimensions: '80x65 cm', 
    technique: 'Óleo sobre tela', 
    price: 2000, 
    image: '/obras/OBRA_12.jpg', 
    description: 'Variante de la obra finalista en ModPortrait 2022 (Pablo en Cascada I).', 
    status: 'available' 
  },
  { 
    id: '13', 
    title: 'Niños en playa valenciana', 
    dimensions: '80x60 cm', 
    technique: 'Óleo sobre tela', 
    price: 2500, 
    image: '/obras/OBRA_13.jpg', 
    description: 'Luz valenciana inconfundible.', 
    status: 'available' 
  },
  { 
    id: '14', 
    title: 'Buceando', 
    dimensions: '100x65 cm', 
    technique: 'Óleo sobre tela', 
    price: 2500, 
    image: '/obras/OBRA_14.jpg', 
    description: 'Visión subacuática.', 
    status: 'available' 
  },
  { 
    id: '15', 
    title: 'Niños con capucha', 
    dimensions: '100x81 cm', 
    technique: 'Óleo sobre tela', 
    price: 3000, 
    image: '/obras/OBRA_15.jpg', 
    description: 'Juego de volúmenes y texturas.', 
    status: 'available' 
  },
  { 
    id: '16', 
    title: 'Niños en playa rocosa', 
    dimensions: '55x46 cm', 
    technique: 'Óleo sobre lienzo', 
    price: 2000, 
    image: '/obras/OBRA_16.jpg', 
    description: 'Pincelada suelta y vibrante.', 
    status: 'available' 
  },
  { 
    id: '17', 
    title: 'Jilguero en charca del Botánico', 
    dimensions: '46x38 cm', 
    technique: 'Óleo sobre lienzo', 
    price: 0, 
    image: '/obras/OBRA_17.jpg', 
    description: 'Obra seleccionada para Exposición Certamen Pequeño Formato en Centro Cultural Principe de Asturias-Madrid en octubre de 2025.', 
    status: 'sold' 
  },
  { 
    id: '18', 
    title: 'Porteadores', 
    dimensions: '55x46 cm', 
    technique: 'Óleo sobre lienzo', 
    price: 1500, 
    image: '/obras/OBRA_18.jpg', 
    description: 'Estudio de Rubens.', 
    status: 'available' 
  },
  { 
    id: '19', 
    title: 'Carpe Diem', 
    dimensions: '140x50 cm', 
    technique: 'Óleo sobre tela', 
    price: 1500, 
    image: '/obras/OBRA_19.jpg', 
    description: 'Reflexión sobre lo efímero.', 
    status: 'available' 
  },
  { 
    id: '20', 
    title: 'Más que amigos', 
    dimensions: '100x60 cm', 
    technique: 'Óleo sobre tela', 
    price: 1500, 
    image: '/obras/OBRA_20.jpg', 
    description: 'Coreografía del deseo.', 
    status: 'available'
  }
];

export const PRICING_TABLE: PriceRow[] = [
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
];

export const ANALYSIS_POINTS = { 
  strengths: [
    "Reconocimiento Institucional Completo: Selección en 92 Salón de Otoño (Casa de Vacas), X Salón de Realismo (La Vaguada) y Certamen Pequeño Formato (C.C. Príncipe de Asturias).",
    "Premios Internacionales: Finalista ModPortrait 2022 y Semifinalista Target Prize 2025.",
    "Publicaciones de Prestigio: Obra incluida en la Guía de Arte y Artistas Leonardo 2025 y Catálogos ModPortrait.",
    "Identidad & Gestión: Marca personal premium ('Alma y Sofisticación') con control total del inventario y venta directa."
  ], 
  opportunities: [
    "Mercado Internacional: Potenciar origen suizo y premios internacionales para captar coleccionistas en Zúrich y NY.",
    "Logística Giclée (Dropshipping Híbrido): Implementar modelo de 'Doble Envío'. El impresor envía la obra en tubo directo al cliente; Tú envías por separado una carta de lujo con el Certificado Original firmado y Sello Seco. Esto maximiza el margen, simplifica la logística y mantiene la experiencia de exclusividad.",
    "Sector Interiorismo: Alianzas con estudios de arquitectura (como la demo Mónaco) para proyectos residenciales.",
    "Fidelización Digital: Uso del 'Pasaporte Digital' para aumentar el valor percibido y generar repetición de compra."
  ] 
};

export const SOCIAL_CONTENT = [];
export const MOCK_WORKFLOW = [];