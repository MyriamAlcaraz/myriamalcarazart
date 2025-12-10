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
  // 🛑 DATOS DE TRAYECTORIA Y PUBLICACIONES - CORREGIDO
  // =======================================================

  accolades: {
      exposiciones: [
          '92 Salón de Otoño de la Asociación Española de Pintores y Escultores. Formó parte de la exposición en la Casa de Vacas del Parque del Retiro - Madrid, del 30 de octubre al 23 de noviembre de 2025.',
          'X Salón de Realismo, exposición colectiva organizada por la Asociación Española de Pintores y Escultores en la Sala de Exposiciones del Centro Cultural “La Vaguada” de la JM Fuencarral-El Pardo, C/ Monforte de Lemos, 40 Madrid, del 25 de septiembre al 27 de octubre de 2025.',
          'Exposición virtual TargetPrice 2025 (tres obras semifinalistas).',
          '"Alba y Crepúsculo", exposición colectiva de la Asociación Española de Pintores y Escultores. Salas Juana Francés y Pablo Serrano, Junta Municipal de Tetuán, Madrid. Del 2 al 28 de abril de 2025.',
      ],
      concursos: [
          'Finalista en el concurso internacional ModPortrait 2022 con “Pablo en Cascada”',
          'Semifinalista en concurso internacional TargetPrice 2025 con tres obras: “Laura en Parque Oeste”, “La Farola” y “La Viajera”',
      ]
  },

  publications: [
      'Obras incluidas en la Guía Leonardo 2025: "Ana y la Habana", "Laura en el Crepúsculo", "Pablo en Cascada", "Sara bajo farola" y "Sara en marquesina".',
      'Anuarios ModPortrait 2022 y 2024.',
      'Participación en la guía virtual de Galería Arte Libre, ModPortrait 2025: https://www.artelibre-store.com/guialeonardo-2025/listado-participantes-2025/',
  ]
};

export const ARTWORKS: Artwork[] = [
  // --- OBRAS DESTACADAS ---
  { 
    id: '4', 
    title: 'Sara en Marquesina', 
    dimensions: '100x81 cm', 
    technique: 'Óleo en tela', 
    price: 3000, 
    image: '/obras/OBRA_04.jpg', 
    description: '92 Salón de Otoño de la Asociación Española de Pintores y Escultores. Obra seleccionada para la exposición en la Casa de Vacas del Parque del Retiro - Madrid, del 30 de octubre al 23 de noviembre de 2025, y que forma parte del catálogo de la misma. Podemos encontrarla en la Guía de arte y artistas Leonardo 2025.', 
    status: 'available' 
  },
  { 
    id: '2', 
    title: 'Laura en el Crepúsculo', 
    dimensions: '100x81 cm', 
    technique: 'Óleo en tela montada en tabla', 
    price: 3000, 
    image: '/obras/OBRA_02.jpg', 
    description: 'Obra semifinalista en el concurso Target Prize 2025. Formó parte de la exposición colectiva del certamen “Alba y Crepúsculo” organizado por la Asociación Española de Pintores y Escultores, expuesta en las Salas de exposiciones “Juana Francés y Pablo Serrano” Madrid. Forma parte del catálogo físico ModPortrait 2024, de la Guía de arte y artistas Leonardo 2025, así como la exposición virtual de Target Prize 2025 https://tartgetpaintingprize.com/?artworks=laura-en-parque-oeste', 
    status: 'available' 
  },
  { 
    id: '3', 
    title: 'Sara bajo la farola', 
    dimensions: '92x60 cm', 
    technique: 'Óleo sobre tela', 
    price: 3000, 
    image: '/obras/OBRA_03.jpg', 
    description: 'Podemos encontrar esta obra en la Guía de arte y artistas Leonardo 2025, ademas de la exposición virtual del concurso Internacional Target Prize 2025 https://tartgetpaintingprize.com/?artworks=la-farola', 
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
    description: 'Podemos encontrarla en la Guía de arte y artistas Leonardo 2025.', 
    status: 'available' 
  },
  { 
    id: '6', 
    title: 'Viajera', 
    dimensions: '81x100 cm', 
    technique: 'Óleo sobre tela', 
    price: 3000, 
    image: '/obras/OBRA_06.jpg', 
    description: 'Forma parte de la exposición virtual del concurso Internacional Target Prize 2025 https://tartgetpaintingprize.com/?artworks=la-viajera', 
    status: 'available' 
  },
  { 
    id: '7', 
    title: 'Memorias de Mekong I', 
    dimensions: '100x65 cm', 
    technique: 'Óleo sobre tela', 
    price: 3000, 
    image: '/obras/OBRA_07.jpg', 
    description: 'Obra Seleccionada PARA EXPOSICIÓN en EL X SALÓN DE REALISMO ORGANIZADO POR LA ASOCIACIÓN ESPAÑOLA DE PINTORES Y ESCULTORES EN LA SALA DE EXPOSICIONES DEL CENTRO CULTURAL “LA VAGUADA” DE LA JM FUENCARRAL-EL PARDO -MADRID, DEL 25 DE SEPTIEMBRE AL 27 DE OCTUBRE DE 2025.', 
    status: 'available' 
  },
  { 
    id: '8', 
    title: 'Memorias de Mekong II', 
    dimensions: '100x65 cm', 
    technique: 'Óleo sobre tela', 
    price: 3000, 
    image: '/obras/OBRA_08.jpg', 
    description: 'Obra Seleccionada PARA EXPOSICIÓN en EL X SALÓN DE REALISMO ORGANIZADO POR LA ASOCIACIÓN ESPAÑOLA DE PINTORES Y ESCULTORES EN LA SALA DE EXPOSICIONES DEL CENTRO CULTURAL “LA VAGUADA” DE LA JM FUENCARRAL-EL PARDO -MADRID, DEL 25 DE SEPTIEMBRE AL 27 DE OCTUBRE DE 2025.', 
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
    image: '/obras/OBRA_