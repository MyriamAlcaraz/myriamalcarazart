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
  // ESTOS DATOS HAN SIDO ACTUALIZADOS CON LA INFORMACIÓN DEL PDF
  // =======================================================

  accolades: {
      exposiciones: [
          '92 Salón de Otoño de la Asociación Española de Pintores y Escultores. [cite_start]Formó parte de la exposición en la Casa de Vacas del Parque del Retiro - Madrid, del 30 de octubre al 23 de noviembre de 2025.', // [cite: 2, 3]
          [cite_start]'X Salón de Realismo, exposición colectiva organizada por la Asociación Española de Pintores y Escultores en la Sala de Exposiciones del Centro Cultural "La Vaguada" de la JM Fuencarral-El Pardo, C/ Monforte de Lemos, 40 Madrid, del 25 de septiembre al 27 de octubre de 2025.', // [cite: 4]
          '"Alba y Crepúsculo", exposición colectiva de la Asociación Española de Pintores y Escultores. Salas Juana Francés y Pablo Serrano, Junta Municipal de Tetuán, Madrid. [cite_start]Del 2 al 28 de abril de 2025.', // [cite: 6, 7]
          'Exposición virtual TargetPrice 2025 (tres obras semifinalistas).' [cite_start]// [cite: 5]
      ],
      concursos: [
          [cite_start]'Finalista en el concurso internacional ModPortrait 2022 con "Pablo en Cascada"', // [cite: 9]
          [cite_start]'Semifinalista en concurso internacional TargetPrice 2025 con tres obras: "Laura en Parque Oeste", "La Farola" y "La Viajera"', // [cite: 10]
      ]
  },

  publications: [
      [cite_start]'Obras incluidas en la Guía Leonardo 2025: "Ana y la Habana", "Laura en el Crepúsculo", "Pablo en Cascada", "Sara bajo farola" y "Sara en marquesina"', // [cite: 12]
      [cite_start]'Anuarios ModPortrait 2022 y 2024.', // [cite: 13]
      [cite_start]'Participación en la guía virtual de Galería Arte Libre, ModPortrait 2025: https://www.artelibre-store.com/guialeonardo-2025/listado-participantes-2025/', // [cite: 14]
  ]
};

export const ARTWORKS: Artwork[] = [
  // ... (Resto de las obras sin cambios)
];

export const PRICING_TABLE = [
  // ... (Tabla de precios sin cambios)
];

export const ANALYSIS_POINTS = { 
  // ... (Puntos de análisis sin cambios)
};

export const SOCIAL_CONTENT = [];
export const MOCK_WORKFLOW = [];