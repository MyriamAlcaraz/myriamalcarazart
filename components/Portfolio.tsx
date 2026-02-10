import React, { useState } from 'react';
import { ArrowLeft, Eye, Lock, Download, Printer, Shield, X } from 'lucide-react';
import EstudioDigital from './EstudioDigital';

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
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/logo-myriam.png" alt="Myriam Alcaraz Logo" className="h-8 w-auto" />
              <h1 className="text-2xl font-serif text-slate-900">Portfolio</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Gallery Grid - Clean Elegant Display */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <p className="text-sm text-stone-600 italic">Obras de Arte Contemporáneo</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          ].map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-contain bg-stone-100"
                />
                
                {/* Elegant hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="text-xs text-white font-medium">Ver Detalles</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-serif text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600 mb-1">{item.dimensions}</p>
                <p className="text-xs text-stone-500">{item.technique}</p>
                {!item.available && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                    <p className="text-sm text-red-800 font-medium">Obra No Disponible</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Selected Item Modal - Clean Detail View */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-slate-900 mb-4">{selectedItem.title}</h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Image Display */}
            <div className="relative mb-6">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full max-w-lg object-contain bg-stone-100 rounded-lg"
              />
            </div>

            {/* Details Section */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Dimensiones:</span>
                <span className="text-slate-900 font-medium">{selectedItem.dimensions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Técnica:</span>
                <span className="text-slate-900 font-medium">{selectedItem.technique}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Disponibilidad:</span>
                <span className={`${item.available ? 'text-emerald-600' : 'text-red-600'} font-medium`}>
                  {item.available ? 'Disponible' : 'No Disponible'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;