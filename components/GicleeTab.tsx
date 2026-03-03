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
  return { width: 100, height: 81 };
};

const GicleeTab: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedArtwork, setSelectedArtwork] = useState<string>('');

  // Opciones de tamaño según los porcentajes
  const sizes = useMemo(() => [
    {
      id: 'pequeno',
      name: 'Pequeño (50%)',
      scale: 0.5
    },
    {
      id: 'mediano',
      name: 'Mediano (75%)',
      scale: 0.75
    },
    {
      id: 'grande',
      name: 'Grande (100%)',
      scale: 1.0
    }
  ], []);

  // Calcular medidas para cada tamaño seleccionado
  const sizesWithDimensions = useMemo(() => {
    if (!selectedArtwork) {
      // Si no hay obra seleccionada, mostrar solo el nombre base
      return sizes.map(size => ({
        ...size,
        dimensions: '',
        displayName: size.name
      }));
    }

    const artwork = ARTWORKS.find(a => a.id === selectedArtwork);
    if (!artwork) {
      return sizes.map(size => ({
        ...size,
        dimensions: '',
        displayName: size.name
      }));
    }

    const originalDims = parseDimensions(artwork.dimensions);
    
    return sizes.map(size => {
      const scaledWidth = Math.round(originalDims.width * size.scale);
      const scaledHeight = Math.round(originalDims.height * size.scale);
      return {
        ...size,
        dimensions: `${scaledWidth} x ${scaledHeight} cm`,
        displayName: size.name
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
              value={selectedArtwork}
              onChange={(e) => {
                setSelectedArtwork(e.target.value);
                setSelectedSize(''); // Resetear selección de tamaño al cambiar obra
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
            <p className="text-stone-500 text-xs italic text-center mt-3 max-w-lg mx-auto leading-relaxed font-serif">
              * Las dimensiones finales pueden variar ligeramente para respetar la proporción y composición original de la obra, garantizando así la integridad artística de la reproducción.
            </p>
          </div>
        </section>

        {/* Calidad Section */}
        <section>
          <h2 className="text-3xl font-serif text-slate-800 mb-6 text-center">La Calidad</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-100">
            <p className="text-stone-700 leading-relaxed text-lg text-center">
              Cada obra se imprime en el prestigioso papel Hahnemühle William Turner de 310g, un papel 100% algodón moldeado en tina. Su superficie tiene una textura mate sutil y genuina que preserva la profundidad y el carácter de mis óleos, aportando una tridimensionalidad y una riqueza cromática que solo los estándares de conservación de museos pueden ofrecer. Una joya eterna para tu colección.
            </p>
          </div>
        </section>

        {/* Certificados de Autenticidad */}
        <section>
          <h2 className="text-3xl font-serif text-slate-800 mb-8 text-center">Certificación de Autenticidad</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
              <div className="flex items-start gap-4">
                <Shield className="text-gold-500 mt-1" size={28} />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 text-lg">Certificado Hahnemühle</h3>
                  <ul className="space-y-1.5 text-stone-600 text-sm">
                    <li>Papel William Turner 310g · 100% algodón</li>
                    <li>Holograma de seguridad con número de serie inviolable</li>
                    <li>Registro permanente en MyArtRegistry</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
              <div className="flex items-start gap-4">
                <Award className="text-gold-500 mt-1" size={28} />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 text-lg">Certificado de Artista</h3>
                  <ul className="space-y-1.5 text-stone-600 text-sm">
                    <li>Sello Seco en relieve sobre el reverso</li>
                    <li>Firma autógrafa de Myriam Alcaraz</li>
                    <li>Numeración individual de la serie</li>
                  </ul>
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
                className={`bg-white p-6 rounded-lg border-2 transition-all ${!selectedArtwork
                  ? 'border-stone-100 opacity-50 cursor-not-allowed'
                  : selectedSize === size.id
                    ? 'border-gold-500 shadow-lg cursor-pointer'
                    : 'border-stone-100 hover:border-stone-300 cursor-pointer'
                  }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${!selectedArtwork
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
                    {selectedArtwork && size.dimensions && (
                      <div className="text-lg font-medium text-stone-700">
                        {size.dimensions}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Texto de Exclusividad Destacado */}
        <section className="bg-stone-100 p-8 rounded-lg text-center border-l-4 border-gold-500">
          <p className="text-stone-800 text-xl font-semibold mb-2">
            Ediciones estrictamente limitadas y numeradas
          </p>
          <p className="text-stone-700 italic text-lg">
            Una vez agotada la serie, no volverá a producirse.
          </p>
        </section>

        {/* Nota de certificación */}
        <section className="bg-stone-50 p-6 rounded-lg border border-stone-200">
          <p className="text-stone-700 text-center leading-relaxed text-sm font-serif italic">
            Cada ejemplar incluye el Certificado oficial Hahnemühle —registrado en MyArtRegistry— y el Certificado de Artista con sello seco en relieve, firma autógrafa y número de serie individual.
          </p>
        </section>

        {/* Botón de Acción */}
        {selectedSize && selectedArtwork && (
          <div className="text-center">
            <button
              onClick={() => {
                const selectedFormat = sizesWithDimensions.find(s => s.id === selectedSize);
                const artwork = ARTWORKS.find(a => a.id === selectedArtwork);
                const subject = encodeURIComponent(`Solicitud de adquisición: Edición Giclée - ${artwork?.title}`);
                const body = encodeURIComponent(
                  `Estimada Myriam Alcaraz,

Le escribo interesado/a en la adquisición de una reproducción de alta fidelidad (Giclée) de su obra titulada '${artwork?.title}'.

Los detalles de la selección son los siguientes:

• Obra: ${artwork?.title}
• Formato: ${selectedFormat?.name}
• Dimensiones: ${selectedFormat?.dimensions}
• Especificaciones: Impresión pigmentada de alta fidelidad sobre papel Hahnemühle 310g.
• Certificación: Doble aval (Certificado Hahnemühle con registro digital y Certificado de Artista firmado con sello seco).

Quedo a la espera de sus instrucciones personales para formalizar la reserva y proceder con los trámites de adquisición y envío.

Atentamente,

[Escriba aquí su Nombre y Apellidos]
[Teléfono de contacto]`
                );
                window.location.href = `mailto:myriamhotmail@hotmail.com?subject=${subject}&body=${body}`;
              }}
              className="bg-gold-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gold-600 transition-colors text-lg tracking-wider"
            >
              SOLICITAR ADQUISICIÓN
            </button>
            <p className="text-stone-600 text-sm italic text-center mt-4">
              Tras la solicitud, recibirá un correo personal de la artista con los detalles para el pago (transferencia bancaria) y plazos de entrega.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default GicleeTab;