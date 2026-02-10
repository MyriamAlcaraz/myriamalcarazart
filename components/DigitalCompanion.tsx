import React, { useState, useRef } from 'react';
import { Shield, ZoomIn, Award, X, Sparkles } from 'lucide-react';
import { ARTWORKS, ARTIST_INFO } from '../constants';
import { Certificate } from './Certificate';

interface DigitalCompanionProps {
  artworkId: string | null;
  onClose: () => void;
  showCertificateAccess: boolean; // TRUE solo en MODO ESTUDIO
  initialMode?: 'lupa' | 'certificate';
}

export const DigitalCompanion: React.FC<DigitalCompanionProps> = ({
    artworkId,
    onClose,
    showCertificateAccess,
    initialMode = 'lupa'
}) => {
  const artwork = ARTWORKS.find(a => a.id === artworkId) || ARTWORKS[0];

  const [showCertificate, setShowCertificate] = useState(initialMode === 'certificate');
  const [showZoom, setShowZoom] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const [showCertificatePreview, setShowCertificatePreview] = useState(false);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  const displayYear = artwork && artwork.year && artwork.year.toString().trim() !== ''
                      ? artwork.year
                      : '2025';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgContainerRef.current || !artwork) return;
    const { left, top, width, height } = imgContainerRef.current.getBoundingClientRect();

    let x = e.clientX - left;
    let y = e.clientY - top;

    if(x < 0) x = 0; if(x > width) x = width;
    if(y < 0) y = 0; if(y > height) y = height;

    const zoomFactor = 4;
    const lupaSize = 140; // Tamaño de la lupa
    const backgroundPositionX = (x / width) * 100;
    const backgroundPositionY = (y / height) * 100;

    setZoomStyle({
      backgroundImage: `url(${artwork.image})`,
      backgroundPosition: `${backgroundPositionX}% ${backgroundPositionY}%`,
      backgroundSize: `${width * zoomFactor}px ${height * zoomFactor}px`,
      top: y - lupaSize / 2,
      left: x - lupaSize / 2,
      width: lupaSize,
      height: lupaSize,
    });
  };

  // Si está mostrando el certificado
  if (showCertificate) {
    return (
      <div className="fixed inset-0 z-[110] bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-8 overflow-y-auto">
        <Certificate
          onClose={() => setShowCertificate(false)}
          artworkId={artworkId}
          artistInfo={ARTIST_INFO}
          artwork={artwork}
          showStudioAccess={showCertificateAccess}
        />

        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-[120] bg-white text-slate-900 p-2 rounded-full hover:bg-red-500 hover:text-white shadow-lg"
        >
          <X size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[110] bg-gradient-to-br from-slate-900/95 to-slate-800/95 p-4 md:p-8 overflow-y-auto">

      {/* BOTÓN CERRAR */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[120] bg-white text-slate-900 p-2 rounded-full hover:bg-red-500 hover:text-white shadow-lg transition-all"
      >
        <X size={20} />
      </button>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">

        {/* PANEL IZQUIERDO: IMAGEN Y LUPA */}
        <div className="flex-1 flex flex-col gap-4">

          {/* IMAGEN CON LUPA */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center">
                <ZoomIn size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{artwork?.title || 'Obra de Arte'}</h3>
                <p className="text-sm text-slate-600">by {ARTIST_INFO.name} • {displayYear}</p>
              </div>
            </div>

            {/* Contenedor de imagen con lupa integrada */}
            <div
              ref={imgContainerRef}
              className="relative overflow-hidden rounded-xl cursor-crosshair bg-slate-100"
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={artwork?.image || '/placeholder-artwork.jpg'}
                alt={artwork?.title || 'Obra de arte'}
                className="w-full h-auto max-h-96 object-contain"
              />

              {/* LUPA MAGICA - Centrada sobre el cursor */}
              {showZoom && (
                <div
                  className="absolute border-4 border-gold-500 rounded-full shadow-2xl pointer-events-none z-50"
                  style={{
                    ...zoomStyle,
                    boxShadow: '0 0 30px rgba(197, 160, 89, 0.4), inset 0 0 20px rgba(0,0,0,0.1)'
                  }}
                />
              )}
            </div>
          </div>

          {/* BOTÓN CERTIFICADO - Solo en modo estudio */}
          {showCertificateAccess && (
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowCertificate(true)}
                className="flex-1 bg-gold-500 text-white py-3 px-6 rounded-xl font-bold hover:bg-gold-600 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Shield size={20} />
                VER CERTIFICADO COMPLETO
              </button>
            </div>
          )}

          {/* VISTA PREVIA DEL CERTIFICADO PIXELADO - Solo en modo público */}
          {!showCertificateAccess && (
            <div className="mt-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Award size={16} className="text-gold-500" />
                <span className="text-xs text-slate-400 uppercase tracking-widest">Certificado de Autenticidad</span>
                <Award size={16} className="text-gold-500" />
              </div>

              {/* Contenedor del certificado con efecto de revelación */}
              <div
                className="relative cursor-pointer group"
                onClick={() => setShowCertificatePreview(!showCertificatePreview)}
              >
                {/* Miniatura del certificado */}
                <div
                  className={`bg-gradient-to-br from-amber-50 to-stone-100 rounded-xl overflow-hidden shadow-lg border-2 border-gold-200 transition-all duration-700 ${
                    showCertificatePreview ? 'filter-none' : 'blur-[6px]'
                  }`}
                  style={{ maxHeight: '280px' }}
                >
                  <div className="p-4 transform scale-[0.35] origin-top" style={{ width: '210mm', margin: '0 auto' }}>
                    {/* Mini certificado simplificado */}
                    <div className="bg-[#fffdf8] p-8 border-8 border-gold-500">
                      <div className="text-center">
                        <img src="/logo-myriam.png" alt="Logo" className="mx-auto mb-4" style={{ maxWidth: '60px' }} />
                        <h2 className="text-2xl font-serif text-slate-900 mb-2" style={{ fontFamily: 'Cinzel, serif', letterSpacing: '3px' }}>
                          Certificado de Autenticidad
                        </h2>
                        <div className="w-32 h-0.5 bg-gold-500 mx-auto mb-4"></div>
                        <p className="text-sm text-slate-600 mb-4">
                          Por la presente se certifica que la obra de arte descrita a continuación
                          es una creación original y auténtica de la artista:
                        </p>
                        <p className="text-xl font-bold text-gold-600 mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
                          MYRIAM ALCARAZ
                        </p>
                        <div className="bg-stone-100 p-3 inline-block mb-4">
                          <img src={artwork?.image} alt={artwork?.title} className="max-h-32 mx-auto" />
                        </div>
                        <div className="text-left max-w-sm mx-auto space-y-2 text-sm">
                          <p><span className="font-semibold">Título:</span> <span className="italic">{artwork?.title}</span></p>
                          <p><span className="font-semibold">Técnica:</span> <span className="italic">{artwork?.technique}</span></p>
                          <p><span className="font-semibold">Dimensiones:</span> <span className="italic">{artwork?.dimensions}</span></p>
                          <p><span className="font-semibold">ID:</span> <span className="italic">MA-{artwork?.year || '2025'}-{artwork?.title?.substring(0,2).toUpperCase()}1/1</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overlay con instrucciones */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${
                    showCertificatePreview ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  <div className="bg-slate-900/80 backdrop-blur-sm px-6 py-4 rounded-xl text-center">
                    <Sparkles size={24} className="text-gold-400 mx-auto mb-2 animate-pulse" />
                    <p className="text-white font-medium text-sm">Toca para revelar</p>
                    <p className="text-gold-400 text-xs mt-1">Certificado Oficial Hahnemühle</p>
                  </div>
                </div>

                {/* Badge de autenticidad cuando está revelado */}
                {showCertificatePreview && (
                  <div className="absolute bottom-3 right-3 bg-gold-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-fade-in">
                    <Shield size={12} />
                    <span>Holograma Verificado</span>
                  </div>
                )}
              </div>

              {/* Texto informativo */}
              <p className="text-center text-xs text-slate-500 mt-3 leading-relaxed">
                Cada obra incluye <span className="text-gold-600 font-medium">Certificado Oficial Hahnemühle</span><br />
                con holograma único y autenticación de la artista
              </p>
            </div>
          )}
        </div>

        {/* PANEL DERECHO: INFORMACIÓN DE LA OBRA */}
        <div className="lg:w-96 bg-white rounded-2xl shadow-2xl p-6">
          <h3 className="font-serif text-xl text-slate-900 mb-4 pb-2 border-b border-slate-200">
            Ficha Técnica
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="font-medium text-slate-700">Título:</span>
              <span className="text-slate-900">{artwork?.title || 'Sin título'}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="font-medium text-slate-700">Artista:</span>
              <span className="text-slate-900">{ARTIST_INFO.name}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="font-medium text-slate-700">Año:</span>
              <span className="text-slate-900">{displayYear}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="font-medium text-slate-700">Técnica:</span>
              <span className="text-slate-900">{artwork?.technique || 'Óleo sobre lienzo'}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="font-medium text-slate-700">Dimensiones:</span>
              <span className="text-slate-900">{artwork?.dimensions || 'Variable'}</span>
            </div>

            {artwork?.description && (
              <div className="pt-4">
                <h4 className="font-medium text-slate-700 mb-2">Descripción:</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{artwork.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
