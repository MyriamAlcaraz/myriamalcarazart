import React, { useState, useMemo } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { ARTWORKS } from '../constants';

// Función para parsear dimensiones "100x81 cm" -> { width: 100, height: 81 }
const parseDimensions = (dim: string): { width: number; height: number } | null => {
  const match = dim.match(/(\d+)x(\d+)/);
  if (!match) return null;
  return { width: parseInt(match[1]), height: parseInt(match[2]) };
};

// Función para calcular dimensiones escaladas manteniendo proporción
const calculateProportionalSize = (
  origWidth: number,
  origHeight: number,
  targetLongSide: number
): string => {
  const isWidthLonger = origWidth >= origHeight;
  const ratio = origHeight / origWidth;

  if (isWidthLonger) {
    const newWidth = targetLongSide;
    const newHeight = Math.round(targetLongSide * ratio);
    return `${newWidth}x${newHeight} cm`;
  } else {
    const newHeight = targetLongSide;
    const newWidth = Math.round(targetLongSide / ratio);
    return `${newWidth}x${newHeight} cm`;
  }
};

const GicleeExclusivo: React.FC = () => {
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
        description: 'Proporcional a 30x40 aprox',
        dimensions: calculateProportionalSize(dims.width, dims.height, 40),
        price: '220'
      },
      {
        id: 'medium' as const,
        name: 'Mediano',
        description: 'Proporcional a 50x63 aprox',
        dimensions: calculateProportionalSize(dims.width, dims.height, 63),
        price: '380'
      },
      {
        id: 'large' as const,
        name: 'Grande',
        description: 'Tamaño Original',
        dimensions: `${dims.width}x${dims.height} cm`,
        price: '580'
      }
    ];
  }, [selectedArtwork]);

  const selectedSizeData = sizes?.find(s => s.id === selectedSize);

  return (
    <div className="space-y-16">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-[11px] tracking-[0.4em] text-stone-400 uppercase mb-6">Reproducciones de Arte</p>
        <h2 className="font-serif text-4xl md:text-5xl text-slate-800 font-normal tracking-wide mb-6">
          Colección Giclée
        </h2>
        <div className="w-20 h-px bg-stone-300 mx-auto mb-8"></div>
        <p className="text-stone-500 font-light text-lg leading-relaxed">
          Edición limitada de <span className="text-slate-700 font-medium">20 ejemplares</span>, numerados y firmados
          <br />
          <span className="text-stone-400 text-base">con certificado de autenticidad Hahnemühle</span>
        </p>
      </div>

      {/* Selector de Obra */}
      <section className="max-w-2xl mx-auto">
        <label className="block text-[10px] tracking-[0.3em] text-stone-400 uppercase mb-3">
          Selecciona una obra
        </label>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-white border border-stone-200 px-6 py-4 text-left flex items-center justify-between hover:border-stone-300 transition-colors"
          >
            <span className={`font-light ${selectedArtwork ? 'text-slate-700' : 'text-stone-400'}`}>
              {selectedArtwork ? selectedArtwork.title : 'Elige una obra de la colección'}
            </span>
            <ChevronDown
              size={18}
              className={`text-stone-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-stone-200 shadow-lg max-h-80 overflow-y-auto">
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
                    className="w-14 h-14 object-cover"
                  />
                  <div>
                    <p className="text-slate-700 font-light">{artwork.title}</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">{artwork.dimensions}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Vista previa de obra seleccionada */}
      {selectedArtwork && (
        <section className="max-w-2xl mx-auto animate-fade-in">
          <div className="bg-white border border-stone-100 p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <img
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                className="w-full md:w-56 h-56 object-contain"
              />
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-serif text-slate-800 font-normal mb-2">{selectedArtwork.title}</h3>
                <p className="text-stone-400 text-sm mb-1">{selectedArtwork.technique}</p>
                <p className="text-stone-400 text-sm">Original: {selectedArtwork.dimensions}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Selector de Tamaño */}
      {sizes && (
        <section className="max-w-3xl mx-auto animate-fade-in">
          <label className="block text-[10px] tracking-[0.3em] text-stone-400 uppercase mb-4 text-center">
            Elige el tamaño
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`relative bg-white p-6 border transition-all text-center ${
                  selectedSize === size.id
                    ? 'border-gold-500'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                {selectedSize === size.id && (
                  <div className="absolute top-3 right-3 w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}

                <p className="text-lg text-slate-700 font-light mb-1">{size.name}</p>
                <p className="text-[11px] text-stone-400 mb-4">{size.description}</p>

                {/* Medidas exactas */}
                <div className="border-t border-stone-100 pt-4 mb-4">
                  <p className="text-slate-800 font-medium">{size.dimensions}</p>
                </div>

                <p className="text-xl text-gold-600 font-light">{size.price} <span className="text-sm">EUR</span></p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Especificaciones */}
      {selectedSize && (
        <section className="max-w-2xl mx-auto animate-fade-in">
          <div className="border-t border-b border-stone-200 py-8">
            <p className="text-[10px] tracking-[0.3em] text-stone-400 uppercase mb-4 text-center">Especificaciones</p>
            <div className="space-y-2 text-stone-500 text-sm text-center font-light">
              <p>Impresión Giclée sobre papel <span className="text-slate-700">Hahnemühle William Turner 310g</span></p>
              <p>100% algodón moldeado en tina con textura mate</p>
              <p>Tintas pigmentadas de archivo con durabilidad superior a 100 años</p>
              <p>Certificado de autenticidad con holograma y numeración</p>
            </div>
          </div>
        </section>
      )}

      {/* Botón de solicitud */}
      {selectedArtwork && selectedSize && selectedSizeData && (
        <section className="text-center animate-fade-in">
          <button
            onClick={() => {
              const subject = encodeURIComponent(`Solicitud Giclée: ${selectedArtwork.title}`);
              const body = encodeURIComponent(
`Estimada Myriam Alcaraz,

Me gustaría adquirir una reproducción Giclée de su obra.

Detalles de la solicitud:

  Obra: ${selectedArtwork.title}
  Tamaño: ${selectedSizeData.name} (${selectedSizeData.description})
  Dimensiones: ${selectedSizeData.dimensions}
  Precio: ${selectedSizeData.price} EUR

  Papel: Hahnemühle William Turner 310g
  Edición: Limitada a 20 ejemplares, numerados y firmados

Quedo a la espera de sus indicaciones para formalizar la reserva.

Atentamente,

[Nombre y Apellidos]
[Teléfono de contacto]`
              );
              window.location.href = `mailto:myriamhotmail@hotmail.com?subject=${subject}&body=${body}`;
            }}
            className="border border-slate-800 text-slate-800 px-10 py-3 font-light hover:bg-slate-800 hover:text-white transition-colors tracking-widest text-sm uppercase"
          >
            Solicitar información
          </button>
          <p className="text-stone-400 text-xs mt-4 font-light">Te responderemos en menos de 24 horas</p>
        </section>
      )}

      {/* Nota final */}
      <section className="text-center pt-8">
        <p className="text-stone-400 text-sm font-light italic">
          Series estrictamente limitadas. Una vez agotada la edición, no volverá a producirse.
        </p>
      </section>

    </div>
  );
};

export default GicleeExclusivo;
