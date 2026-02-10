import React, { useState } from 'react';
import { ArrowLeft, Eye } from 'lucide-react';

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

  // Datos de ejemplo de obras
  const portfolioItems: PortfolioItem[] = [
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
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <img src="/logo-myriam.png" alt="Myriam Alcaraz Logo" className="h-8 w-auto" />
            <div className="text-2xl font-serif text-slate-900">Portfolio</h1>
          </div>
        </div>
      </header>

      {/* Gallery Grid - Imágenes con proporciones correctas */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <p className="text-sm text-stone-600 italic">Obras de arte contemporáneo</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-contain bg-stone-100"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600 mb-1">{item.dimensions}</p>
                <p className="text-xs text-stone-500">{item.technique}</p>
                {!item.available && (
                  <p className="text-xs text-red-600">No disponible</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal para obra seleccionada */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white rounded-xl p-8 max-w-4xl mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-serif text-slate-900">{selectedItem.title}</h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="mb-6">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full max-w-lg rounded-lg"
              />
            </div>

            <div className="space-y-4">
              <div className="text-sm text-stone-600">
                <span className="font-semibold">Dimensiones:</span> {selectedItem.dimensions}
              </div>
              <div className="text-sm text-stone-600">
                <span className="font-semibold">Técnica:</span> {selectedItem.technique}
              </div>
              <div className="text-sm text-stone-600">
                <span className="font-semibold">Estado:</span>
                <span className={selectedItem.available ? 'text-emerald-600' : 'text-red-600'}>
                  {selectedItem.available ? 'Disponible' : 'No disponible'}
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