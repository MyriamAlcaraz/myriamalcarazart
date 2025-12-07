// Reemplaza el array ARTWORKS completo en constants.ts con este código.

export const ARTWORKS: Artwork[] = [
  // --- OBRAS CLAVE (ID 1-4) ---
  { 
    id: '1', 
    title: 'Autorretrato en siglo XIX', 
    dimensions: '100x81 cm', 
    technique: 'Óleo en tela montada en tabla con bastidor', 
    price: 3000, 
    // RUTA CORREGIDA
    image: '/obras/Autorretrato%20en%20siglo%20XIX.jpg', 
    description: 'Obra clave en la exploración de la artista de la figura y el tiempo. En Colección Privada.',
    year: '2023',
    status: 'sold',
  },
  { 
    id: '2', 
    title: 'Laura en el Crepúsculo', 
    dimensions: '100x81 cm', 
    technique: 'Óleo en tela montada en tabla con bastidor', 
    price: 3000, 
    // RUTA CORREGIDA
    image: '/obras/Laura%20en%20el%20Crepúsculo.jpg', 
    description: 'Semifinalista Target Prize 2025, Alba y Crepúsculo (AEPE), ModPortrait 2024, Guía Leonardo 2025, Almenara Prize 2025.',
    year: '2024',
    status: 'available',
  },
  { 
    id: '3', 
    title: 'Sara bajo la farola', 
    dimensions: '92x60 cm', 
    technique: 'Óleo sobre tela montada en tabla con bastidor', 
    price: 3000, 
    // RUTA CORREGIDA
    image: '/obras/Sara%20bajo%20la%20farola.jpg', 
    description: 'Semifinalista Target Prize 2025, Almenara Prize 2025, Guía Leonardo 2025.',
    year: '2024',
    status: 'available',
  },
  { 
    id: '4', 
    title: 'Sara en Marquesina', 
    dimensions: '100x81 cm', 
    technique: 'Óleo en tela montada en tabla con bastidor', 
    price: 3000, 
    // RUTA CORREGIDA
    image: '/obras/Sara%20en%20Marquesina.jpg', 
    description: 'Seleccionada en el 92º Salón de Otoño (AEPE), Casa de Vacas, Parque del Retiro.',
    year: '2024',
    status: 'available',
  },

  // --- OBRAS MEDIANAS Y DE SERIE (ID 5-11) ---
  { 
    id: '5', 
    title: 'Ana y la Habana', 
    dimensions: '92x60 cm', 
    technique: 'Óleo sobre tela montada en tabla con bastidor', 
    price: 3000, 
    // RUTA CORREGIDA
    image: '/obras/Ana%20y%20la%20Habana.jpg', 
    description: 'Obra destacada en la Guía de Arte y Artistas Leonardo 2025.',
    year: '2023',
    status: 'available',
  },
  { 
    id: '6', 
    title: 'Viajera', 
    dimensions: '81x100 cm', 
    technique: 'Óleo sobre tela montada en tabla con bastidor', 
    price: 3000, 
    // RUTA CORREGIDA
    image: '/obras/Viajera.jpg', 
    description: 'Pieza de la serie de viajes figurativos. Formato apaisado.',
    year: '2023',
    status: 'available',
  },
  { 
    id: '7', 
    title: 'Memorias de Mekong I', 
    dimensions: '81x100 cm', 
    technique: 'Óleo sobre tela montada en tabla con bastidor', 
    price: 3000, 
    // RUTA CORREGIDA
    image: '/obras/Memorias%20de%20Mekong%20I.jpg', 
    description: 'Parte de la serie inspirada en los mercados y la vida del río Mekong.',
    year: '2023',
    status: 'available',
  },
  { 
    id: '8', 
    title: 'Pablo en Cascada', 
    dimensions: '90x70 cm', 
    technique: 'Óleo sobre tela montada en tabla con bastidor', 
    price: 1905, 
    // RUTA CORREGIDA
    image: '/obras/Pablo%20en%20Cascada.jpg', 
    description: 'Finalista ModPortrait 2022. Incluida en la Guía Leonardo 2025. Vendida a Colección Privada.',
    year: '2022',
    status: 'sold',
  },
  { 
    id: '9', 
    title: 'Porteadores Adoración Reyes Magos', 
    dimensions: '55x46 cm', 
    technique: 'Óleo sobre lienzo preparado', 
    price: 1500, 
    // RUTA CORREGIDA
    image: '/obras/Porteadores%20Adoración%20Reyes%20Magos.jpg', 
    description: 'Estudio de figuras religiosas en formato pequeño. Precio según la tabla (1500€).',
    year: '2022',
    status: 'available',
  },
  { 
    id: '10', 
    title: 'Carpe Diem', 
    dimensions: '140x50 cm', 
    technique: 'Óleo sobre tela en bastidor', 
    price: 1500, 
    // RUTA CORREGIDA
    image: '/obras/Carpe%20Diem.jpg', 
    description: 'Obra conceptual en formato vertical que explora el deseo de eternizar el instante. Vendida a Colección Privada.',
    year: '2023',
    status: 'sold',
  },
  { 
    id: '11', 
    title: 'Más que amigos', 
    dimensions: '100x60 cm', 
    technique: 'Óleo sobre tela con bastidor', 
    price: 1500, 
    // RUTA CORREGIDA
    image: '/obras/Más%20que%20amigos.jpg', 
    description: 'Pieza de figuración íntima. Vendida a Colección Privada.',
    year: '2023',
    status: 'sold',
  },

  // --- OBRAS ADICIONALES ENCONTRADAS EN DOSSIER (ID 12-18) ---
  { 
    id: '12', 
    title: 'Jilguero en charca del Botánico', 
    dimensions: '46x38 cm', 
    technique: 'Óleo sobre lienzo preparado', 
    price: 765, 
    // RUTA CORREGIDA
    image: '/obras/Jilguero%20en%20charca%20del%20Botánico.jpg', 
    description: 'Estudio de naturaleza y la fauna local. (Precio base estimado: 765€ IVA incluido).',
    year: '2023',
    status: 'available',
  },
  { 
    id: '13', 
    title: 'A la espera', 
    dimensions: '73x60 cm', 
    technique: 'Óleo sobre lienzo', 
    price: 1325, 
    // RUTA CORREGIDA
    image: '/obras/A%20la%20espera.jpg', 
    description: 'Figura femenina en una pose contemplativa. (Precio base estimado: 1325€ IVA incluido).',
    year: '2024',
    status: 'available',
  },
  { 
    id: '14', 
    title: 'El Relevo', 
    dimensions: '81x100 cm', 
    technique: 'Óleo sobre tela montada en tabla con bastidor', 
    price: 3000, 
    // RUTA CORREGIDA
    image: '/obras/El%20Relevo.jpg', 
    description: 'Obra de gran formato explorando el dinamismo y la tensión corporal.',
    year: '2024',
    status: 'available',
  },
  { 
    id: '15', 
    title: 'Mirada al Jardín', 
    dimensions: '50x50 cm', 
    technique: 'Óleo sobre lienzo', 
    price: 908, 
    // RUTA CORREGIDA
    image: '/obras/Mirada%20al%20Jardín.jpg', 
    description: 'Escena botánica con toque figurativo, jugando con la luz y la sombra. (Precio base estimado: 908€ IVA incluido).',
    year: '2024',
    status: 'available',
  },
  { 
    id: '16', 
    title: 'Retrato de José Antonio', 
    dimensions: '65x50 cm', 
    technique: 'Óleo sobre tela', 
    price: 1060, 
    // RUTA CORREGIDA
    image: '/obras/Retrato%20de%20José%20Antonio.jpg', 
    description: 'Retrato de comisión o estudio personal. (Precio base estimado: 1060€ IVA incluido).',
    year: '2023',
    status: 'available',
  },
  { 
    id: '17', 
    title: 'El Baile', 
    dimensions: '70x60 cm', 
    technique: 'Óleo sobre tela', 
    price: 1270, 
    // RUTA CORREGIDA
    image: '/obras/El%20Baile.jpg', 
    description: 'Estudio de movimiento y composición en figuración. (Precio base estimado: 1270€ IVA incluido).',
    year: '2023',
    status: 'available',
  },
  { 
    id: '18', 
    title: 'Bañista en el Guadalquivir', 
    dimensions: '70x60 cm', 
    technique: 'Óleo sobre tela', 
    price: 1270, 
    // RUTA CORREGIDA
    image: '/obras/Bañista%20en%20el%20Guadalquivir.jpg', 
    description: 'Estudio de luz, reflejos en el agua y la figura humana. (Precio base estimado: 1270€ IVA incluido).',
    year: '2024',
    status: 'available',
  },

  // --- OBRAS PENDIENTES (ID 19-20) - POR FAVOR, REEMPLAZA ESTOS DATOS Y RUTA ---
  { 
    id: '19', 
    title: 'Obra Pendiente 1 (¡Reemplazar!)', 
    dimensions: '60x50 cm', 
    technique: 'Técnica por confirmar', 
    price: 908, 
    // RUTA PLACEHOLDER: ¡Asegúrate de cambiar esto!
    image: '/obras/Obra%20Pendiente%201%20(¡Reemplazar!).jpg', 
    description: '⚠️ Este es un marcador de posición. Reemplaza el título, dimensiones, técnica, precio y la ruta de imagen.',
    year: '2024',
    status: 'available',
  },
  { 
    id: '20', 
    title: 'Obra Pendiente 2 (¡Reemplazar!)', 
    dimensions: '55x46 cm', 
    technique: 'Técnica por confirmar', 
    price: 765, 
    // RUTA PLACEHOLDER: ¡Asegúrate de cambiar esto!
    image: '/obras/Obra%20Pendiente%202%20(¡Reemplazar!).jpg', 
    description: '⚠️ Este es un marcador de posición. Reemplaza el título, dimensiones, técnica, precio y la ruta de imagen.',
    year: '2024',
    status: 'available',
  },
];