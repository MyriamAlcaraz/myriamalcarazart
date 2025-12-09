// #################################################################
// # ESTRUCTURA DE DATOS DE TRAYECTORIA Y RECONOCIMIENTOS DEL ARTISTA
// # (Optimizado para tipado seguro y renderizado dinámico en frontend)
// #################################################################

// Interfaces para asegurar la coherencia de los datos
interface TrajectoryItem {
  id: number;
  title: string;
  detail: string; // Ubicación, organizador o descripción breve
  dateRange: string; // Rango de fechas o año
  works?: string[]; // Obras específicas, si aplica
  link?: string; // Enlace opcional (para publicaciones o virtuales)
}

interface ArtistRecognition {
  category: 'EXPOSICIONES' | 'CONCURSOS' | 'PUBLICACIONES';
  data: TrajectoryItem[];
}

/**
 * Constante que contiene toda la trayectoria y reconocimientos.
 * Esto permite al frontend renderizar dinámicamente cada sección.
 */
export const ARTIST_TRAJECTORY: ArtistRecognition[] = [
  // --- EXPOSICIONES COLECTIVAS ---
  {
    category: 'EXPOSICIONES',
    data: [
      {
        id: 1,
        title: '92 Salón de Otoño — AEPE',
        detail: 'Casa de Vacas, Parque del Retiro (Madrid)',
        dateRange: 'Octubre – Noviembre 2025',
      },
      {
        id: 2,
        title: 'X Salón de Realismo',
        detail: 'Centro Cultural “La Vaguada” (Madrid)',
        dateRange: 'Septiembre – Octubre 2025',
      },
      {
        id: 3,
        title: '“Alba y Crepúsculo”',
        detail: 'Junta Municipal de Tetuán (Madrid)',
        dateRange: 'Abril 2025',
      },
      {
        id: 4,
        title: 'Exposición Virtual TargetPrice 2025',
        detail: 'Tres obras seleccionadas como semifinalistas',
        dateRange: '2025',
      },
    ],
  },
  
  // --- CONCURSOS & PREMIOS ---
  {
    category: 'CONCURSOS',
    data: [
      {
        id: 5,
        title: 'Semifinalista Internacional',
        detail: 'TargetPrice 2025',
        dateRange: '2025',
        works: ['Laura en Parque Oeste', 'La Farola', 'La Viajera'],
      },
      {
        id: 6,
        title: 'Finalista Internacional',
        detail: 'ModPortrait 2022',
        dateRange: '2022',
        works: ['Pablo en Cascada'],
      },
    ],
  },
  
  // --- PUBLICACIONES ---
  {
    category: 'PUBLICACIONES',
    data: [
      {
        id: 7,
        title: 'Guía Leonardo 2025',
        detail: 'Obras incluidas en la Guía oficial de Arte Libre.',
        dateRange: '2025',
        works: ['Ana y la Habana', 'Laura en el Crepúsculo', 'Pablo en Cascada', 'Sara bajo farola', 'Sara en marquesina'],
      },
      {
        id: 8,
        title: 'Guía Virtual Galería Arte Libre',
        detail: 'Participación en el listado ModPortrait 2025.',
        dateRange: '2025',
        link: 'https://www.artelibre-store.com/guialeonardo-2025/listado-participantes-2025/',
      },
      {
        id: 9,
        title: 'Anuarios ModPortrait',
        detail: 'Publicación en ediciones físicas y digitales.',
        dateRange: '2022 y 2024',
      },
    ],
  },
];