// ... (Código anterior sin cambios)

export const ARTIST_INFO = {
  name: "Myriam Alcaraz",
  tagline: "ARTE CON ALMA Y SOFISTICACIÓN", 
  email: "myriamhotmail@hotmail.com",
  instagram: "@myriamalcaraz.artist",
  website: "myriamalcaraz.wordpress.com",
  bioShort: "Myriam Alcaraz combina una sólida formación técnica con una voz artística profundamente personal. Ha completado más de noventa cursos especializados, fusionando el rigor del aprendizaje académico con la exploración autodidacta. Actualmente trabaja a partir de sus propias fotografías, consolidando su presencia en circuitos internacionales y colecciones privadas.",
  statement: "Trabajo la figura humana desde una mirada íntima y contemporánea. Busco un equilibrio preciso entre técnica y emoción, donde la luz y el color construyen atmósferas que invitan a la contemplación. Cada obra es un diálogo silencioso con el tiempo.",
  
  // =======================================================
  // 🛑 DATOS DE TRAYECTORIA Y PUBLICACIONES (KIT) - ¡CORREGIDOS!
  // Estructura original mantenida para evitar errores de compilación.
  // =======================================================

  accolades: {
      exposiciones: [
          '92 Salón de Otoño de la Asociación Española de Pintores y Escultores. Formó parte de la exposición en la Casa de Vacas del Parque del Retiro - Madrid, del 30 de octubre al 23 de noviembre de 2025.',
          'X Salón de Realismo, exposición colectiva organizada por la Asociación Española de Pintores y Escultores en la Sala de Exposiciones del Centro Cultural “La Vaguada” de la JM Fuencarral-El Pardo, C/ Monforte de Lemos, 40 Madrid, del 25 de septiembre al 27 de octubre de 2025.',
          'Exposición virtual TargetPrice 2025 (tres obras semifinalistas).', // ¡Dato añadido!
          '"Alba y Crepúsculo", exposición colectiva de la Asociación Española de Pintores y Escultores. Salas Juana Francés y Pablo Serrano, Junta Municipal de Tetuán, Madrid. Del 2 al 28 de abril de 2025.', // ¡Dato añadido!
      ],
      concursos: [
          'Finalista en el concurso internacional ModPortrait 2022 con “Pablo en Cascada”',
          'Semifinalista en concurso internacional Target Price 2025 con tres obras: “Laura en Parque Oeste”, “La Farola” y “La Viajera”.', // Dato actualizado con nombres de obras
      ]
  },

  publications: [
      'Obras incluidas en la Guía Leonardo 2025: "Ana y la Habana", "Laura en el Crepúsculo", "Pablo en Cascada", "Sara bajo farola" y "Sara en marquesina".',
      'Anuarios ModPortrait 2022 y 2024.', // Dato actualizado/añadido
      'Participación en la guía virtual de Galería Arte Libre, ModPortrait 2025: https://www.artelibre-store.com/guialeonardo-2025/listado-participantes-2025/',
      // Nota: El dato "Obra seleccionada para Exposición Certamen Pequeño Formato..." se ha movido al campo donde corresponde si se mantiene la filosofía inicial.
  ]
};

export const ARTWORKS: Artwork[] = [
// ... (El resto del código de ARTWORKS y PRICING_TABLE sigue igual)