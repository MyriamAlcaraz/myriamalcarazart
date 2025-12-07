// Reemplaza el array ARTWORKS completo en constants.ts con este código.

export const ARTWORKS: Artwork[] = [
  // --- OBRAS DESTACADAS Y DISPONIBLES (ID 1-4) ---
  { 
    id: '1', 
    title: 'Autorretrato en siglo XIX', 
    dimensions: '100x81 cm', 
    technique: 'Óleo en tela montada en tabla con bastidor', 
    price: 3000, 
    // RENOMBRA EL ARCHIVO a: 1_Autorretrato.jpg
    image: '/obras/1_Autorretrato.jpg', 
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
    // RENOMBRA EL ARCHIVO a: 2_Laura-Crepusculo.jpg
    image: '/obras/2_Laura-Crepusculo.jpg', 
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
    // RENOMBRA EL ARCHIVO a: 3_Sara-Farola.jpg
    image: '/obras/3_Sara-Farola.jpg', 
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
    // RENOMBRA EL ARCHIVO a: 4_Sara-Marquesina.jpg
    image: '/obras/4_Sara-Marquesina.jpg', 
    description: 'Seleccionada en el 92º Salón de Otoño (AEPE), Casa de Vacas, Parque del Retiro.',
    year: '2024',
    status: 'available',
  },

  // --- OTRAS OBRAS (ID 5-18) ---
  { 
    id: '5', 
    title: 'Ana y la Habana', 
    dimensions: '92x60 cm', 
    technique: 'Óleo sobre tela montada en tabla con bastidor', 
    price: 3000, 
    // RENOMBRA EL ARCHIVO a: 5_Ana-Habana.jpg
    image: '/obras/5_Ana-Habana.jpg', 
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
    // RENOMBRA EL ARCHIVO a: 6_Viajera.jpg
    image: '/obras/6_Viajera.jpg', 
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
    // RENOMBRA EL ARCHIVO a: 7_Mekong-I.jpg
    image: '/obras/7_Mekong-I.jpg', 
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
    // RENOMBRA EL ARCHIVO a: 8_Pablo-Cascada.jpg
    image: '/obras/8_Pablo-Cascada.jpg', 
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
    // RENOMBRA EL ARCHIVO a: 9_Porteadores-Reyes.jpg
    image: '/obras/9_Porteadores-Reyes.jpg', 
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
    // RENOMBRA EL ARCHIVO a: 10_Carpe-Diem.jpg
    image: '/obras/10_Carpe-Diem.jpg', 
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
    // RENOMBRA EL ARCHIVO a: 11_Mas-Que-Amigos.jpg
    image: '/obras/11_Mas-Que-Amigos.jpg', 
    description: 'Pieza de figuración íntima. Vendida a Colección Privada.',
    year: '2023',
    status: 'sold',
  },
  { 
    id: '12', 
    title: 'Jilguero en charca del Botánico', 
    dimensions: '46x38 cm', 
    technique: 'Óleo sobre lienzo preparado', 
    price: 765, 
    // RENOMBRA EL ARCHIVO a: 12_Jilguero-Botanico.jpg
    image: '/obras/12_Jilguero-Botanico.jpg', 
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
    // RENOMBRA EL ARCHIVO a: 13_A-La-Espera.jpg
    image: '/obras/13_A-La-Espera.jpg', 
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
    // RENOMBRA EL ARCHIVO a: 14_El-Relevo.jpg
    image: '/obras/14_El-Relevo.jpg', 
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
    // RENOMBRA EL ARCHIVO a: 15_Mirada-Jardin.jpg
    image: '/obras/15_Mirada-Jardin.jpg', 
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
    // RENOMBRA EL ARCHIVO a: 16_Retrato-Jose-Antonio.jpg
    image: '/obras/16_Retrato-Jose-Antonio.jpg', 
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
    // RENOMBRA EL ARCHIVO a: 17_El-Baile.jpg
    image: '/obras/17_El-Baile.jpg', 
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
    // RENOMBRA EL ARCHIVO a: 18_Bañista-Guadalquivir.jpg
    image: '/obras/18_Bañista-Guadalquivir.jpg', 
    description: 'Estudio de luz, reflejos en el agua y la figura humana. (Precio base estimado: 1270€ IVA incluido).',
    year: '2024',
    status: 'available',
  },

  // --- OBRAS PENDIENTES (ID 19-20) - MANTÉN LOS NOMBRES SIMPLIFICADOS ---
  { 
    id: '19', 
    title: 'Obra Pendiente 1 (¡Reemplazar!)', 
    dimensions: '60x50 cm', 
    technique: 'Técnica por confirmar', 
    price: 908, 
    // RENOMBRA EL ARCHIVO a: 19_Obra-Pendiente-1.jpg
    image: '/obras/19_Obra-Pendiente-1.jpg', 
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
    // RENOMBRA EL ARCHIVO a: 20_Obra-Pendiente-2.jpg
    image: '/obras/20_Obra-Pendiente-2.jpg', 
    description: '⚠️ Este es un marcador de posición. Reemplaza el título, dimensiones, técnica, precio y la ruta de imagen.',
    year: '2024',
    status: 'available',
  },
];