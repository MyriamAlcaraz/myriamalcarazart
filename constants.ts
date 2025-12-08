// constants.ts (REVISIÓN FINAL DE SINTAXIS)

export const ARTIST_INFO = {
    name: "Myriam Alcaraz",
    email: "myriamhotmail@hotmail.com", 
    website: "https://myriamalcaraz.wordpress.com", 
    
    // 🛑 ESTRUCTURA ACCIDENTAL: Falta la propiedad 'tagline'
    // La hemos añadido en Certificate.tsx, pero no existe en constants.ts.
    // Vamos a añadirla ahora para evitar un posible error.
    tagline: "Arte con Alma y Sofisticación", // <--- AÑADIR ESTA LÍNEA

    accolades: { // <--- ABRE LLAVE
        exposiciones: [ // <--- ABRE CORCHETE
            '"Alba y Crepúsculo", exposición colectiva de la Asociación Española de Pintores y Escultores. Salas Juana Francés y Pablo Serrano, Junta Municipal de Tetuán, Madrid. Del 2 al 28 de abril de 2025.',
            'X Salón de Realismo, exposición colectiva organizada por la Asociación Española de Pintores y Escultores en la Sala de Exposiciones del Centro Cultural “La Vaguada” de la JM Fuencarral-El Pardo, C/ Monforte de Lemos, 40 Madrid, del 25 de septiembre al 27 de octubre de 2025.',
            'Exposición virtual TargetPrice 2025 (tres obras semifinalistas).',
            '92 Salón de Otoño de la Asociación Española de Pintores y Escultores. Formó parte de la exposición en la Casa de Vacas del Parque del Retiro - Madrid, del 30 de octubre al 23 de noviembre de 2025.',
        ], // <--- CIERRA CORCHETE y COMA
        concursos: [ // <--- ABRE CORCHETE
            'Finalista en el concurso internacional ModPortrait 2022 con “Pablo en Cascada”',
            'Semifinalista en concurso internacional TargetPrice 2025 con tres obras:“Laura en Parque Oeste”“La Farola” y “La Viajera”',
        ] // <--- CIERRA CORCHETE
    }, // <--- CIERRA LLAVE y COMA

    publications: [ // <--- ABRE CORCHETE
        'Obras incluidas en la Guía Leonardo 2025: "Ana y la Habana", "Laura en el Crepúsculo", "Pablo en Cascada", "Sara bajo farola" y "Sara en marquesina"',
        'Seleccionada en los anuarios de ModPortrait 2022 y 2024.',
        'Participación en la guía virtual de Galería Arte Libre, ModPortrait 2025: https://www.artelibre-store.com/guialeonardo-2025/listado-participantes-2025/',
    ], // <--- CIERRA CORCHETE y COMA (si no hay más propiedades)
    
    // 🛑 Si tienes una propiedad 'instagram' en ARTIST_INFO, añádela aquí:
    instagram: "@myriamalcaraz.artist" // <--- AÑADIR ESTA LÍNEA (sin coma si es la última)
};

// Obras de Arte (Se mantienen igual)
export const ARTWORKS = [
    {
        id: 'lupa-01',
        title: 'Lupa I: Rostro Restaurado',
        description: 'La primera obra de la serie Lupa. Óleo sobre tela. Dimensiones: 100 x 81 cm.',
        image: '/art-lupa-1.jpg', // Asumido
        referenceId: 'MA-2025-01',
        // 🛑 CRÍTICO: Necesitas estas dos propiedades que faltaban, sino da error en Certificate.tsx
        dimensions: '100 x 81 cm', 
        technique: 'Óleo sobre tela',
    },
    // ... Asegúrate de que TODAS tus obras de ARTWORKS tienen las propiedades
    // 'dimensions' y 'technique' añadidas, de lo contrario Certificate.tsx fallará.
    // ... el resto de tu lista de obras
];