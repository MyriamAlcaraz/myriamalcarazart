// Datos del Artista
export const ARTIST_INFO = {
    name: "Myriam Alcaraz",
    email: "myriamhotmail@hotmail.com", 
    website: "https://myriamalcaraz.wordpress.com", 
    
    // 🛑 ACTUALIZACIÓN: Datos de Trayectoria agrupados por categoría
    accolades: {
        exposiciones: [
            '"Alba y Crepúsculo", exposición colectiva de la Asociación Española de Pintores y Escultores. Salas Juana Francés y Pablo Serrano, Junta Municipal de Tetuán, Madrid. Del 2 al 28 de abril de 2025.',
            'X Salón de Realismo, exposición colectiva organizada por la Asociación Española de Pintores y Escultores en la Sala de Exposiciones del Centro Cultural “La Vaguada” de la JM Fuencarral-El Pardo, C/ Monforte de Lemos, 40 Madrid, del 25 de septiembre al 27 de octubre de 2025.',
            'Exposición virtual TargetPrice 2025 (tres obras semifinalistas).',
            '92 Salón de Otoño de la Asociación Española de Pintores y Escultores. Formó parte de la exposición en la Casa de Vacas del Parque del Retiro - Madrid, del 30 de octubre al 23 de noviembre de 2025.',
        ],
        concursos: [
            'Finalista en el concurso internacional ModPortrait 2022 con “Pablo en Cascada”',
            'Semifinalista en concurso internacional TargetPrice 2025 con tres obras:“Laura en Parque Oeste”“La Farola” y “La Viajera”',
        ]
    },

    // 🛑 ACTUALIZACIÓN: Datos reales de PUBLICACIONES
    publications: [
        'Obras incluidas en la Guía Leonardo 2025: "Ana y la Habana", "Laura en el Crepúsculo", "Pablo en Cascada", "Sara bajo farola" y "Sara en marquesina"',
        'Seleccionada en los anuarios de ModPortrait 2022 y 2024.',
        'Participación en la guía virtual de Galería Arte Libre, ModPortrait 2025: https://www.artelibre-store.com/guialeonardo-2025/listado-participantes-2025/',
    ]
};

// Obras de Arte (Se mantienen igual)
export const ARTWORKS = [
    {
        id: 'lupa-01',
        title: 'Lupa I: Rostro Restaurado',
        description: 'La primera obra de la serie Lupa. Óleo sobre tela. Dimensiones: 100 x 81 cm.',
        image: '/art-lupa-1.jpg', // Asumido
        referenceId: 'MA-2025-01'
    },
    {
        id: 'lupa-02',
        title: 'Lupa II: Retrato en Oro',
        description: 'Retrato con técnicas mixtas y láminas de oro. Dimensiones: 120 x 90 cm.',
        image: '/art-lupa-2.jpg', // Asumido
        referenceId: 'MA-2025-02'
    },
    {
        id: 'lupa-03',
        title: 'Lupa III: Atardecer',
        description: 'Exploración de la luz y el color en el formato de retrato. Dimensiones: 80 x 80 cm.',
        image: '/art-lupa-3.jpg', // Asumido
        referenceId: 'MA-2025-03'
    },
];