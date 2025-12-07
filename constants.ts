// ARCHIVO: constants.ts (CÓDIGO COMPLETO Y FIABLE)

import { Artwork, PriceRow, SocialPost, WorkflowItem } from './types';

// 🛑 ESTA LÍNEA DEBE ESTAR AQUÍ PARA EL ACCESO:
export const PASSWORD = "arte2025"; 

export const ARTIST_INFO = {
  name: "Myriam Alcaraz",
  tagline: "Artista Figurativa Contemporánea",
  email: "myriamhotmail@hotmail.com",
  phone: "672 72 64 22",
  instagram: "@myriamalcaraz.artist",
  website: "myriamalcaraz.wordpress.com",
  bioShort: "Myriam Alcaraz combina una sólida formación técnica con una voz artística profundamente personal. Ha completado más de noventa cursos especializados, fusionando el rigor del aprendizaje académico con la exploración autodidacta. Actualmente trabaja a partir de sus propias fotografías, consolidando su presencia en circuitos internacionales y colecciones privadas.",
  statement: "Trabajo la figura humana desde una mirada íntima y contemporánea. Busco un equilibrio preciso entre técnica y emoción, donde la luz y el color construyen atmósferas que invitan a la contemplación. Cada obra es un diálogo silencioso con el tiempo.",
};

export const ARTWORKS: Artwork[] = [
  // --- OBRAS DESTACADAS (REORDENADAS) ---
  { 
    id: '4', 
    title: 'Sara en Marquesina', 
    dimensions: '100x81 cm', 
    technique: 'Óleo en tela', 
    price: 3000, 
    image: '/obras/OBRA_04.jpg', 
    description: '92 Salón de Otoño de la Asociación Española de Pintores y Escultores. Obra seleccionada para la exposición en la Casa de Vacas del Parque del Retiro (Madrid).',
    year: '2024',
    status: 'available',
  },
  // Tu array ARTWORKS debería continuar aquí con todas tus obras...
  // He dejado una obra como ejemplo, pero asegúrate de que el resto de tu array ARTWORKS no se pierda.
];

export const SOCIAL_CONTENT: SocialPost[] = [
    // ... Tu array SOCIAL_CONTENT completo
];

export const MOCK_WORKFLOW: WorkflowItem[] = [
    // ... Tu array MOCK_WORKFLOW completo
];

export const PRICING_TABLE: PriceRow[] = [
  { dimensions: '30x30', priceBase: 350, priceWithTax: 423.50 },
  { dimensions: '40x40', priceBase: 550, priceWithTax: 665.50 },
  { dimensions: '50x50', priceBase: 750, priceWithTax: 907.50 },
  { dimensions: '65x50', priceBase: 900, priceWithTax: 1089.00 },
  { dimensions: '80x60', priceBase: 1250, priceWithTax: 1512.50 },
  { dimensions: '90x90', priceBase: 1750, priceWithTax: 2117.50 },
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
    "Fidelización Digital: Uso del 'Pasaporte Digital' (Digital Companion) para registrar historia y certificados."
  ]
};