import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

// ============================================
// GALERÍA PÚBLICA - PORTFOLIO DE MYRIAM ALCARAZ
// ============================================

interface ObraPublica {
  id: string;
  titulo: string;
  imagen: string;
  dimensiones: string;
  tecnica: string;
  año: number;
  disponible: boolean;
}

// Base de datos de obras públicas (imágenes reales)
const OBRAS_GALERIA: ObraPublica[] = [
  {
    id: '1',
    titulo: 'Composición I',
    imagen: '/obras/OBRA_01.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2024,
    disponible: true
  },
  {
    id: '2',
    titulo: 'Composición II',
    imagen: '/obras/OBRA_02.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2024,
    disponible: true
  },
  {
    id: '3',
    titulo: 'Composición III',
    imagen: '/obras/OBRA_03.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2024,
    disponible: true
  },
  {
    id: '4',
    titulo: 'Composición IV',
    imagen: '/obras/OBRA_04.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2024,
    disponible: false
  },
  {
    id: '5',
    titulo: 'Composición V',
    imagen: '/obras/OBRA_05.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2024,
    disponible: true
  },
  {
    id: '6',
    titulo: 'Composición VI',
    imagen: '/obras/OBRA_06.jpg',
    dimensiones: '80 x 60 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2024,
    disponible: true
  },
  {
    id: '7',
    titulo: 'Composición VII',
    imagen: '/obras/OBRA_07.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2024,
    disponible: true
  },
  {
    id: '8',
    titulo: 'Composición VIII',
    imagen: '/obras/OBRA_08.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2024,
    disponible: false
  },
  {
    id: '9',
    titulo: 'Composición IX',
    imagen: '/obras/OBRA_09.jpg',
    dimensiones: '120 x 100 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2025,
    disponible: true
  },
  {
    id: '10',
    titulo: 'Composición X',
    imagen: '/obras/OBRA_10.jpg',
    dimensiones: '120 x 100 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2025,
    disponible: true
  },
  {
    id: '11',
    titulo: 'Composición XI',
    imagen: '/obras/OBRA_11.jpg',
    dimensiones: '120 x 100 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2025,
    disponible: true
  },
  {
    id: '12',
    titulo: 'Composición XII',
    imagen: '/obras/OBRA_12.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2025,
    disponible: true
  },
  {
    id: '13',
    titulo: 'Composición XIII',
    imagen: '/obras/OBRA_13.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2024,
    disponible: true
  },
  {
    id: '14',
    titulo: 'Composición XIV',
    imagen: '/obras/OBRA_14.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2024,
    disponible: true
  },
  {
    id: '15',
    titulo: 'Composición XV',
    imagen: '/obras/OBRA_15.jpg',
    dimensiones: '120 x 100 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2025,
    disponible: true
  },
  {
    id: '16',
    titulo: 'Composición XVI',
    imagen: '/obras/OBRA_16.jpg',
    dimensiones: '120 x 100 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2025,
    disponible: true
  },
  {
    id: '17',
    titulo: 'Composición XVII',
    imagen: '/obras/OBRA_17.jpg',
    dimensiones: '120 x 100 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2025,
    disponible: true
  },
  {
    id: '18',
    titulo: 'Composición XVIII',
    imagen: '/obras/OBRA_18.jpg',
    dimensiones: '80 x 60 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2025,
    disponible: true
  },
  {
    id: '19',
    titulo: 'Composición XIX',
    imagen: '/obras/OBRA_19.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2025,
    disponible: true
  }
];

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const Portfolio: React.FC = () => {
  const [selectedObra, setSelectedObra] = useState<ObraPublica | null>(null);
  const [lupaPosition, setLupaPosition] = useState({ x: 0, y: 0, visible: false });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Navegar entre obras en el modal
  const navegarObra = (direccion: 'prev' | 'next') => {
    if (!selectedObra) return;
    const currentIndex = OBRAS_GALERIA.findIndex(o => o.id === selectedObra.id);
    let newIndex: number;

    if (direccion === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : OBRAS_GALERIA.length - 1;
    } else {
      newIndex = currentIndex < OBRAS_GALERIA.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedObra(OBRAS_GALERIA[newIndex]);
  };

  // Manejar movimiento de lupa
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, obraId: string) => {
    if (hoveredCard !== obraId) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setLupaPosition({ x, y, visible: true });
  };

  const handleMouseEnter = (obraId: string) => {
    setHoveredCard(obraId);
    setLupaPosition(prev => ({ ...prev, visible: true }));
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
    setLupaPosition({ x: 0, y: 0, visible: false });
  };

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedObra(null);
      if (e.key === 'ArrowLeft') navegarObra('prev');
      if (e.key === 'ArrowRight') navegarObra('next');
    };

    if (selectedObra) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedObra]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-serif font-bold text-xl">M</span>
              </div>
              <div>
                <h1 className="text-xl font-serif text-slate-900 tracking-wide">MYRIAM ALCARAZ</h1>
                <p className="text-xs text-stone-500 tracking-widest">ARTISTA PLÁSTICA</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Título de sección */}
      <section className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-xs tracking-[0.5em] text-stone-400 uppercase mb-4">Colección de Arte Contemporáneo</p>
        <h2 className="text-5xl md:text-6xl font-serif text-slate-900 mb-6">Galería de Obra</h2>
        <div className="w-24 h-px bg-amber-500 mx-auto mb-6"></div>
        <p className="text-stone-600 text-lg max-w-2xl mx-auto">
          Obras seleccionadas con la pasión y el cuidado que caracterizan cada pieza única
        </p>
      </section>

      {/* Galería Grid - Proporciones Perfectas */}
      <main className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {OBRAS_GALERIA.map((obra) => (
            <div
              key={obra.id}
              className="group relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              onClick={() => setSelectedObra(obra)}
              onMouseMove={(e) => handleMouseMove(e, obra.id)}
              onMouseEnter={() => handleMouseEnter(obra.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Contenedor de imagen con aspecto ratio fijo */}
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                <img
                  src={obra.imagen}
                  alt={obra.titulo}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlay sutil en hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Lupa flotante - sigue al cursor */}
                {hoveredCard === obra.id && lupaPosition.visible && (
                  <div
                    className="absolute w-16 h-16 pointer-events-none transition-opacity duration-150 z-10"
                    style={{
                      left: lupaPosition.x - 32,
                      top: lupaPosition.y - 32,
                      opacity: 1
                    }}
                  >
                    <div className="w-full h-full rounded-full border-2 border-white/80 bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <ZoomIn size={20} className="text-white drop-shadow-md" />
                    </div>
                  </div>
                )}

                {/* Badge de disponibilidad */}
                {obra.disponible && (
                  <div className="absolute top-3 right-3 bg-emerald-500/90 text-white text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm">
                    Disponible
                  </div>
                )}
              </div>

              {/* Información de la obra */}
              <div className="p-4">
                <h3 className="font-serif text-lg text-slate-900 mb-1 truncate">{obra.titulo}</h3>
                <div className="flex items-center justify-between text-sm text-stone-500">
                  <span>{obra.dimensiones}</span>
                  <span>{obra.año}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal de Vista Detallada */}
      {selectedObra && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 animate-fade-in"
          onClick={() => setSelectedObra(null)}
        >
          {/* Botón cerrar */}
          <button
            onClick={() => setSelectedObra(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-50"
          >
            <X size={24} className="text-white" />
          </button>

          {/* Navegación anterior */}
          <button
            onClick={(e) => { e.stopPropagation(); navegarObra('prev'); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-50"
          >
            <ChevronLeft size={28} className="text-white" />
          </button>

          {/* Navegación siguiente */}
          <button
            onClick={(e) => { e.stopPropagation(); navegarObra('next'); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-50"
          >
            <ChevronRight size={28} className="text-white" />
          </button>

          {/* Contenido del modal */}
          <div
            className="max-w-5xl w-full mx-4 flex flex-col md:flex-row gap-8 items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagen principal */}
            <div className="flex-1 max-h-[75vh] flex items-center justify-center">
              <img
                src={selectedObra.imagen}
                alt={selectedObra.titulo}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Panel de información */}
            <div className="md:w-72 bg-white/5 backdrop-blur-md rounded-xl p-6 text-white">
              <h2 className="font-serif text-3xl mb-4">{selectedObra.titulo}</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-stone-400">Dimensiones</span>
                  <span className="font-medium">{selectedObra.dimensiones}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Técnica</span>
                  <span className="font-medium">{selectedObra.tecnica}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Año</span>
                  <span className="font-medium">{selectedObra.año}</span>
                </div>
              </div>

              <div className={`text-center py-3 rounded-lg font-medium ${
                selectedObra.disponible
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {selectedObra.disponible ? 'Disponible para adquisición' : 'Obra vendida'}
              </div>

              {/* Contador de posición */}
              <div className="mt-6 text-center text-stone-500 text-sm">
                {OBRAS_GALERIA.findIndex(o => o.id === selectedObra.id) + 1} / {OBRAS_GALERIA.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos de animación */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
