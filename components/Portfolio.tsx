import React, { useState } from 'react';
import { ArrowLeft, Eye, ZoomIn, ZoomOut } from 'lucide-react';

// Interface Portfolio
interface PortfolioItem {
  id: string;
  title: string;
  image: string;
  dimensions: string;
  technique: string;
  available?: boolean;
}

const Portfolio: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-gold-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div className="text-xl font-serif text-slate-900">MYRIAM ALCARAZ</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.5em] text-stone-500 uppercase mb-2">Colección de Arte Contemporáneo</p>
          <h1 className="text-6xl md:text-7xl font-serif text-slate-900 mb-4">Galería de Obra</h1>
          <p className="text-stone-600 text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Obras seleccionadas con el cuidado y la pasión que caracterizan a cada pieza
          </p>
        </div>

        {/* Gallery Grid - Imágenes con proporciones perfectas y cuadrícula original */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[
            {
              id: '1',
              title: 'Retrato al Óleo',
              image: '/obras/retrato-oleo.jpg',
              dimensions: '80 x 60 cm',
              technique: 'Óleo sobre lienzo',
              available: true
            },
            {
              id: '2',
              title: 'Paisaje Mediterráneo',
              image: '/obras/paisaje-mediterraneo.jpg',
              dimensions: '120 x 80 cm',
              technique: 'Óleo sobre lienzo',
              available: false
            },
            {
              id: '3',
              title: 'Naturaleza Muerta',
              image: '/obras/naturaleza-muerta.jpg',
              dimensions: '100 x 100 cm',
              technique: 'Óleo sobre lienzo',
              available: true
            }
          ].map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
              onClick={() => setSelectedItem(item)}
            >
              {/* Imagen con proporciones originales - Sin deformación */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain bg-stone-100"
                style={{
                  objectFit: 'contain'
                }}
              />

              {/* Margen para crear sensación de cuadro */}
              <div className="p-8">
                {/* Información básica */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-serif text-slate-900 truncate">{item.title}</h3>
                  <div className="text-right">
                    {item.available && (
                      <span className="inline-flex items-center text-emerald-600 text-sm">
                        <Eye size={16} />
                        Disponible
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 text-sm text-stone-600">
                  <span className="font-medium">{item.dimensions}</span>
                  <span className="text-xs text-stone-400">•</span>
                  <span className="font-medium">{item.technique}</span>
                </div>
              </div>

              {/* Efecto hover elegante */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white to-black/5 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              
              {/* Visor - Círculo perfecto sin fallos */}
              <div className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-stone-300 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={16} className="text-stone-500" />
                <span className="text-xs text-stone-500 font-medium">Visor</span>
              </div>
            </div>

              {/* Efecto de Galería - Sombra sutil */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-black/20 via-transparent to-transparent pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Selected Item Modal - Vista detallada sin elementos técnicos */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <div className="bg-white rounded-xl p-8 max-w-4xl mx-4">
              {/* Header del modal */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-slate-900">{selectedItem.title}</h2>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft size={24} />
                </button>
              </div>

              {/* Contenido limpio - Solo la obra */}
              <div className="space-y-6">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full max-w-md rounded-lg object-contain"
                  style={{
                    objectFit: 'contain'
                  }}
                />

                {/* Información esencial minimalista */}
                <div className="text-center space-y-4">
                  <div>
                    <h3 className="text-3xl font-serif text-slate-900">{selectedItem.title}</h3>
                    <p className="text-stone-600 text-lg mb-2">{selectedItem.dimensions}</p>
                  </div>
                  <div>
                    <p className="text-stone-600 text-base">{selectedItem.technique}</p>
                  </div>
                  {item.available && (
                    <p className="text-emerald-600 font-medium">Disponible para adquisición</p>
                  )} else {
                    <p className="text-red-600 font-medium">Obra no disponible</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;