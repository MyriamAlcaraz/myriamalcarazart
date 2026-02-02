import React, { useState, useMemo } from 'react';
import { Check, Shield, Award, Crown } from 'lucide-react';
import { ARTWORKS } from '../constants';

// Función para extraer dimensiones del string "92x60 cm"
const parseDimensions = (dimensions: string) => {
  const match = dimensions.match(/(\d+)x(\d+)/);
  if (match) {
    return {
      width: parseInt(match[1]),
      height: parseInt(match[2])
    };
  }
  // Valores por defecto si no puede parsear
  return { width: 100, height: 81 };
};

const GicleeTab: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null);

  // Cálculo automático de medidas proporcionales
  const sizes = useMemo(() => [
    { 
      id: 'xs', 
      name: 'Formato Colección', 
      price: '120€',
      scale: 0.20
    },
    { 
      id: 'small', 
      name: 'Formato Galería', 
      price: '180€',
      scale: 0.35
    },
    { 
      id: 'medium', 
      name: 'Formato Intermedio', 
      price: '450€',
      scale: 0.50
    },
    { 
      id: 'large', 
      name: 'Formato Prestigio', 
      price: '650€',
      scale: 0.70
    },
    { 
      id: 'special', 
      name: 'Fiel al Óleo Original', 
      price: '950€',
      scale: 1.00
    }
  ], []);

  // Calcular medidas para cada formato
  const sizesWithDimensions = useMemo(() => {
    if (!selectedArtwork) {
      // Si no hay obra seleccionada, mostrar solo el nombre base
      return sizes.map(size => ({
        ...size,
        dimensions: '',
        displayName: size.name
      }));
    }
    
    const originalDims = parseDimensions(selectedArtwork.dimensions);
    return sizes.map(size => {
      const scaledWidth = Math.round(originalDims.width * size.scale);
      const scaledHeight = Math.round(originalDims.height * size.scale);
      return {
        ...size,
        dimensions: `${scaledWidth}x${scaledHeight} cm`,
        displayName: `${size.name} (${scaledWidth}x${scaledHeight} cm)`
      };
    });
  }, [sizes, selectedArtwork]);

  return (
    <div className="w-full min-h-screen bg-white animate-fade-in z-[60] relative">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Crown className="text-gold-500" size={48} />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-slate-800 mb-6">
            Giclée Exclusivo
          </h1>
          <div className="w-32 h-1 bg-gold-500 mx-auto mb-8"></div>
          <p className="text-xl text-stone-600 font-light leading-relaxed max-w-3xl mx-auto">
            Ediciones limitadas de máxima calidad para coleccionistas exigentes
          </p>
        </div>

        {/* Selector de Obra */}
        <section>
          <h2 className="text-3xl font-serif text-slate-800 mb-6 text-center">Selecciona una Obra</h2>
          <div className="max-w-md mx-auto">
            <select 
              value={selectedArtwork?.id || ''}
              onChange={(e) => {
                const artwork = ARTWORKS.find(a => a.id === e.target.value);
                if (artwork) {
                  setSelectedArtwork(artwork);
                  setSelectedSize(null); // Resetear selección de tamaño al cambiar obra
                }
              }}
              className="w-full p-4 border-2 border-stone-200 rounded-lg text-lg font-medium focus:border-gold-500 focus:outline-none bg-white cursor-pointer"
            >
              <option value="" disabled>
                — Selecciona una Obra para ver Formatos —
              </option>
              {ARTWORKS.map(artwork => (
                <option key={artwork.id} value={artwork.id}>
                  {artwork.title} (Original: {artwork.dimensions})
                </option>
              ))}
            </select>
            <p className="text-stone-600 text-sm italic text-center mt-3">
              Medidas aproximadas basadas en la proporción original de la obra.
            </p>
          </div>
        </section>

        {/* Calidad Section */}
        <section>
          <h2 className="text-3xl font-serif text-slate-800 mb-6 text-center">La Calidad</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-100">
            <p className="text-stone-700 leading-relaxed text-lg text-center">
              La Calidad: Hahnemühle William Turner 310g. 100% algodón, textura rugosa que respira la misma alma que el lienzo original. Tintas pigmentadas minerales (duración +100 años).
            </p>
          </div>
        </section>

        {/* Garantía Section */}
        <section>
          <h2 className="text-3xl font-serif text-slate-800 mb-8 text-center">Garantía de Autenticidad</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
              <div className="flex items-start gap-4">
                <Shield className="text-gold-500 mt-1" size={28} />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2 text-lg">Certificado Hahnemühle</h3>
                  <p className="text-stone-600">Con holograma de autenticidad y número de serie único</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
              <div className="flex items-start gap-4">
                <Award className="text-gold-500 mt-1" size={28} />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2 text-lg">Certificado Myriam Alcaraz</h3>
                  <p className="text-stone-600">Con Sello Seco y firma autógrafa de la artista</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selector de Tamaños */}
        <section>
          <h2 className="text-3xl font-serif text-slate-800 mb-8 text-center">Selecciona tu Formato</h2>
          <div className="space-y-4">
            {sizesWithDimensions.map((size) => (
              <div
                key={size.id}
                onClick={() => selectedArtwork && setSelectedSize(size.id)}
                className={`bg-white p-6 rounded-lg border-2 transition-all ${
                  !selectedArtwork 
                    ? 'border-stone-100 opacity-50 cursor-not-allowed'
                    : selectedSize === size.id 
                      ? 'border-gold-500 shadow-lg cursor-pointer' 
                      : 'border-stone-100 hover:border-stone-300 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      !selectedArtwork 
                        ? 'border-stone-200 bg-stone-50'
                        : selectedSize === size.id 
                          ? 'border-gold-500 bg-gold-500' 
                          : 'border-stone-300'
                    }`}>
                      {selectedSize === size.id && selectedArtwork && <Check size={16} className="text-white" />}
                    </div>
                    <h3 className={`font-semibold ${!selectedArtwork ? 'text-stone-400' : 'text-slate-800'}`}>
                      {size.displayName}
                    </h3>
                  </div>
                  <div className={`text-2xl font-bold ${!selectedArtwork ? 'text-stone-400' : 'text-gold-500'}`}>
                    {size.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Nota de Exclusividad */}
        <section className="bg-stone-100 p-8 rounded-lg text-center">
          <p className="text-stone-700 italic text-lg">
            Series estrictamente limitadas. Una vez agotada la edición, no volverá a producirse.
          </p>
        </section>

        {/* Botón de Acción */}
        {selectedSize && (
          <div className="text-center">
            <button className="bg-gold-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gold-600 transition-colors text-lg tracking-wider">
              Solicitar Información
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default GicleeTab;