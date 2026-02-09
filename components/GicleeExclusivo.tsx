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
        description: 'Proporcional a 30x40',
        dimensions: calculateProportionalSize(dims.width, dims.height, 40),
        price: '220'
      },
      {
        id: 'medium' as const,
        name: 'Mediano',
        description: 'Proporcional a 50x63',
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
    <div className="space-y-12">

      {/* ============================================ */}
      {/* HEADER - Tipografía impactante */}
      {/* ============================================ */}
      <header className="text-center max-w-4xl mx-auto pt-4">
        <p className="text-xs tracking-[0.5em] text-stone-400 uppercase mb-8 font-light">
          Reproducciones de Arte
        </p>
        <h2 className="font-serif text-5xl md:text-6xl text-slate-900 tracking-wide mb-8 leading-tight">
          Colección Giclée
        </h2>
        <div className="w-24 h-px bg-gold-500 mx-auto mb-10"></div>

        {/* Edición Limitada - DESTACADO */}
        <div className="inline-block border border-slate-200 px-8 py-5 bg-white">
          <p className="text-slate-800 text-xl md:text-2xl font-serif tracking-wide leading-relaxed">
            Edición limitada de <span className="text-gold-600 font-semibold">10 ejemplares</span>
          </p>
          <p className="text-stone-500 text-base mt-2 leading-relaxed tracking-wide">
            numerados y firmados con certificado Hahnemühle
          </p>
        </div>
      </header>

      {/* ============================================ */}
      {/* SELECTOR DE OBRA - Posición destacada */}
      {/* ============================================ */}
      <section className="max-w-2xl mx-auto">
        <label className="block text-xs tracking-[0.4em] text-slate-600 uppercase mb-4 font-medium">
          Selecciona tu obra
        </label>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-white border border-stone-200 px-8 py-5 text-left flex items-center justify-between hover:border-gold-400 transition-all duration-300"
          >
            <span className={`text-lg tracking-wide ${selectedArtwork ? 'text-slate-800' : 'text-stone-400'}`}>
              {selectedArtwork ? selectedArtwork.title : 'Elige una obra de la colección'}
            </span>
            <ChevronDown
              size={20}
              className={`text-stone-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-stone-200 shadow-xl max-h-96 overflow-y-auto">
              {availableArtworks.map((artwork) => (
                <button
                  key={artwork.id}
                  onClick={() => {
                    setSelectedArtworkId(artwork.id);
                    setSelectedSize(null);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-8 py-5 text-left hover:bg-stone-50 transition-all duration-200 border-b border-stone-100 last:border-b-0 flex items-center gap-5 ${
                    selectedArtworkId === artwork.id ? 'bg-stone-50' : ''
                  }`}
                >
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-16 h-16 object-cover"
                  />
                  <div>
                    <p className="text-slate-800 text-lg tracking-wide">{artwork.title}</p>
                    <p className="text-sm text-stone-400 mt-1 tracking-wide">{artwork.dimensions}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================================ */}
      {/* VISTA PREVIA DE OBRA SELECCIONADA */}
      {/* ============================================ */}
      {selectedArtwork && (
        <section className="max-w-3xl mx-auto animate-fade-in">
          <div className="bg-white border border-stone-100 p-10">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <img
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                className="w-full md:w-72 h-72 object-contain"
              />
              <div className="text-center md:text-left space-y-3">
                <h3 className="text-3xl font-serif text-slate-900 leading-snug">{selectedArtwork.title}</h3>
                <p className="text-stone-500 text-base tracking-wide">{selectedArtwork.technique}</p>
                <p className="text-stone-400 text-base tracking-wide">Original: {selectedArtwork.dimensions}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* SELECTOR DE TAMAÑO - Estilo Galería */}
      {/* ============================================ */}
      {sizes && (
        <section className="max-w-4xl mx-auto animate-fade-in">
          <label className="block text-xs tracking-[0.4em] text-slate-600 uppercase mb-6 text-center font-medium">
            Elige el tamaño
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`group relative bg-white py-10 px-6 border transition-all duration-300 text-center ${
                  selectedSize === size.id
                    ? 'border-gold-500 shadow-lg'
                    : 'border-stone-200 hover:border-gold-300 hover:shadow-md'
                }`}
              >
                {/* Check de selección */}
                {selectedSize === size.id && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                )}

                {/* Nombre del tamaño */}
                <p className="text-2xl font-serif text-slate-800 mb-2 tracking-wide">{size.name}</p>
                <p className="text-xs text-stone-400 tracking-wider uppercase mb-6">{size.description}</p>

                {/* Medidas exactas - DESTACADAS */}
                <div className="border-t border-stone-100 pt-6 mb-6">
                  <p className="text-xl text-slate-900 font-medium tracking-wide">{size.dimensions}</p>
                </div>

                {/* Precio */}
                <p className="text-2xl text-gold-600 tracking-wide">
                  {size.price} <span className="text-base font-light">EUR</span>
                </p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* ESPECIFICACIONES TÉCNICAS */}
      {/* ============================================ */}
      {selectedSize && (
        <section className="max-w-3xl mx-auto animate-fade-in">
          <div className="border-t border-b border-stone-200 py-10">
            <p className="text-xs tracking-[0.4em] text-slate-600 uppercase mb-6 text-center font-medium">
              Especificaciones
            </p>
            <div className="space-y-4 text-stone-600 text-base text-center leading-loose">
              <p>Impresión Giclée sobre papel <span className="text-slate-800 font-medium">Hahnemühle William Turner 310g</span></p>
              <p>100% algodón moldeado en tina con textura mate</p>
              <p>Tintas pigmentadas de archivo, durabilidad superior a 100 años</p>
              <p>Certificado de autenticidad con holograma y numeración</p>
            </div>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* BOTÓN DE SOLICITUD */}
      {/* ============================================ */}
      {selectedArtwork && selectedSize && selectedSizeData && (
        <section className="text-center animate-fade-in py-4">
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
  Edición: Limitada a 10 ejemplares, numerados y firmados

Quedo a la espera de sus indicaciones para formalizar la reserva.

Atentamente,

[Nombre y Apellidos]
[Teléfono de contacto]`
              );
              window.location.href = `mailto:myriamhotmail@hotmail.com?subject=${subject}&body=${body}`;
            }}
            className="border border-slate-300 text-slate-700 px-14 py-4 text-base tracking-[0.2em] uppercase hover:border-gold-500 hover:text-gold-600 transition-all duration-300"
          >
            Solicitar información
          </button>
          <p className="text-stone-400 text-sm mt-5 tracking-wide">Te responderemos en menos de 24 horas</p>
        </section>
      )}

      {/* ============================================ */}
      {/* NOTA DE EXCLUSIVIDAD */}
      {/* ============================================ */}
      <section className="text-center pt-6 pb-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-stone-500 text-base leading-relaxed italic font-serif">
            "Series estrictamente limitadas. Una vez agotada la edición, no volverá a producirse."
          </p>
        </div>
      </section>

    </div>
  );
};

export default GicleeExclusivo;
