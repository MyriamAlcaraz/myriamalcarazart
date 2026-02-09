import React, { useState, useMemo } from 'react';
import { ArrowLeft, ChevronDown, Check } from 'lucide-react';
import { ARTWORKS } from '../constants';

interface GicleeExclusivoProps {
  onBack: () => void;
}

// Función para parsear dimensiones "100x81 cm" -> { width: 100, height: 81 }
const parseDimensions = (dim: string): { width: number; height: number } | null => {
  const match = dim.match(/(\d+)x(\d+)/);
  if (!match) return null;
  return { width: parseInt(match[1]), height: parseInt(match[2]) };
};

// Función para calcular dimensiones escaladas
const scaleDimensions = (width: number, height: number, scale: number): string => {
  const newWidth = Math.round(width * scale);
  const newHeight = Math.round(height * scale);
  return `${newWidth}x${newHeight} cm`;
};

const GicleeExclusivo: React.FC<GicleeExclusivoProps> = ({ onBack }) => {
  const [selectedArtworkId, setSelectedArtworkId] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large' | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filtrar obras disponibles para Giclée (excluir vendidas)
  const availableArtworks = useMemo(() =>
    ARTWORKS.filter(art => art.status !== 'sold'),
    []
  );

  const selectedArtwork = useMemo(() =>
    availableArtworks.find(art => art.id === selectedArtworkId),
    [selectedArtworkId, availableArtworks]
  );

  // Calcular los tamaños disponibles para la obra seleccionada
  const sizes = useMemo(() => {
    if (!selectedArtwork) return null;

    const dims = parseDimensions(selectedArtwork.dimensions);
    if (!dims) return null;

    return [
      {
        id: 'small' as const,
        name: 'Pequeño',
        scale: '50%',
        dimensions: scaleDimensions(dims.width, dims.height, 0.5),
        price: '280€'
      },
      {
        id: 'medium' as const,
        name: 'Mediano',
        scale: '75%',
        dimensions: scaleDimensions(dims.width, dims.height, 0.75),
        price: '450€'
      },
      {
        id: 'large' as const,
        name: 'Grande',
        scale: 'Tamaño Original',
        dimensions: scaleDimensions(dims.width, dims.height, 1),
        price: '680€'
      }
    ];
  }, [selectedArtwork]);

  const selectedSizeData = sizes?.find(s => s.id === selectedSize);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">

        {/* Header minimalista */}
        <div className="mb-16 text-center relative">
          <button
            onClick={onBack}
            className="absolute left-0 top-0 flex items-center gap-2 text-stone-400 hover:text-stone-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm tracking-widest uppercase hidden md:inline">Volver</span>
          </button>

          <p className="text-xs tracking-[0.3em] text-stone-400 uppercase mb-4">Colección Giclée</p>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-800 font-light tracking-wide">
            Ediciones de Arte
          </h1>
          <div className="w-16 h-px bg-gold-500 mx-auto mt-8"></div>
        </div>

        {/* Texto de edición limitada */}
        <div className="text-center mb-16">
          <p className="text-stone-600 font-light text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Edición limitada de 50 ejemplares, numerados y firmados
            <br />
            <span className="text-stone-500">con certificado de autenticidad Hahnemühle</span>
          </p>
        </div>

        {/* Selector de Obra */}
        <section className="mb-12">
          <label className="block text-xs tracking-[0.2em] text-stone-400 uppercase mb-4">
            Selecciona una obra
          </label>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-white border border-stone-200 rounded-lg px-6 py-4 text-left flex items-center justify-between hover:border-stone-300 transition-colors"
            >
              <span className={selectedArtwork ? 'text-slate-800' : 'text-stone-400'}>
                {selectedArtwork ? selectedArtwork.title : 'Elige una obra de la colección'}
              </span>
              <ChevronDown
                size={20}
                className={`text-stone-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-20 w-full mt-2 bg-white border border-stone-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
                {availableArtworks.map((artwork) => (
                  <button
                    key={artwork.id}
                    onClick={() => {
                      setSelectedArtworkId(artwork.id);
                      setSelectedSize(null);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-6 py-4 text-left hover:bg-stone-50 transition-colors border-b border-stone-100 last:border-b-0 flex items-center gap-4 ${
                      selectedArtworkId === artwork.id ? 'bg-stone-50' : ''
                    }`}
                  >
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="text-slate-800 font-medium">{artwork.title}</p>
                      <p className="text-xs text-stone-400">{artwork.dimensions}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Vista previa de obra seleccionada */}
        {selectedArtwork && (
          <section className="mb-12 animate-fade-in">
            <div className="bg-white rounded-lg p-8 border border-stone-100">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <img
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  className="w-full md:w-64 h-64 object-contain rounded"
                />
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-serif text-slate-800 mb-2">{selectedArtwork.title}</h2>
                  <p className="text-stone-500 text-sm mb-1">{selectedArtwork.technique}</p>
                  <p className="text-stone-400 text-sm">Original: {selectedArtwork.dimensions}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Selector de Tamaño */}
        {sizes && (
          <section className="mb-12 animate-fade-in">
            <label className="block text-xs tracking-[0.2em] text-stone-400 uppercase mb-4">
              Elige el tamaño
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`relative bg-white rounded-lg p-6 border-2 transition-all text-center ${
                    selectedSize === size.id
                      ? 'border-gold-500 shadow-lg'
                      : 'border-stone-100 hover:border-stone-300'
                  }`}
                >
                  {selectedSize === size.id && (
                    <div className="absolute top-3 right-3 w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                  )}

                  <p className="text-lg font-medium text-slate-800 mb-1">{size.name}</p>
                  <p className="text-xs text-stone-400 mb-3">{size.scale}</p>

                  {/* Medidas exactas destacadas */}
                  <div className="bg-stone-50 rounded py-2 px-3 mb-4">
                    <p className="text-slate-700 font-semibold">{size.dimensions}</p>
                  </div>

                  <p className="text-2xl font-light text-gold-500">{size.price}</p>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Información de calidad */}
        {selectedSize && (
          <section className="mb-12 animate-fade-in">
            <div className="bg-white rounded-lg p-8 border border-stone-100">
              <h3 className="text-xs tracking-[0.2em] text-stone-400 uppercase mb-4">Especificaciones</h3>
              <div className="space-y-3 text-stone-600">
                <p>Impresión Giclée de alta fidelidad sobre papel <strong>Hahnemühle William Turner 310g</strong></p>
                <p>Papel 100% algodón moldeado en tina con textura mate</p>
                <p>Tintas pigmentadas de archivo con durabilidad superior a 100 años</p>
                <p>Incluye certificado de autenticidad con holograma y número de serie</p>
              </div>
            </div>
          </section>
        )}

        {/* Botón de solicitud */}
        {selectedArtwork && selectedSize && selectedSizeData && (
          <section className="text-center mb-16 animate-fade-in">
            <button
              onClick={() => {
                const subject = encodeURIComponent(`Solicitud Giclée: ${selectedArtwork.title}`);
                const body = encodeURIComponent(
`Estimada Myriam Alcaraz,

Me gustaría adquirir una reproducción Giclée de su obra.

Detalles de la solicitud:

• Obra: ${selectedArtwork.title}
• Tamaño: ${selectedSizeData.name} (${selectedSizeData.scale})
• Dimensiones: ${selectedSizeData.dimensions}
• Precio: ${selectedSizeData.price}

• Papel: Hahnemühle William Turner 310g
• Edición: Limitada a 50 ejemplares, numerados y firmados

Quedo a la espera de sus indicaciones para formalizar la reserva.

Atentamente,

[Nombre y Apellidos]
[Teléfono de contacto]`
                );
                window.location.href = `mailto:myriamhotmail@hotmail.com?subject=${subject}&body=${body}`;
              }}
              className="bg-slate-800 text-white px-12 py-4 rounded font-medium hover:bg-slate-900 transition-colors tracking-widest text-sm uppercase"
            >
              Solicitar esta obra
            </button>
            <p className="text-stone-400 text-xs mt-4">Te responderemos en menos de 24 horas</p>
          </section>
        )}

        {/* Nota final */}
        <section className="text-center border-t border-stone-200 pt-12">
          <p className="text-stone-400 text-sm font-light italic">
            Series estrictamente limitadas. Una vez agotada la edición, no volverá a producirse.
          </p>
        </section>

      </div>
    </div>
  );
};

export default GicleeExclusivo;
