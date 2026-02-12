import React, { useState, useRef } from 'react';
import { Shield, ZoomIn, Award, X, Sparkles } from 'lucide-react';
import { ARTWORKS, ARTIST_INFO } from '../constants';
import { Certificate } from './Certificate';
import { CertificatePreview } from './CertificatePreview';

// Mapa de IDs Giclée reales por artwork ID
const GICLEE_IDS: Record<string, { id: string; hologram: string; edicion: string; medidasImpresion?: string }> = {
  '22': { id: 'MA-2026-GC-JC-01/10-S', hologram: '287213', edicion: '1/10', medidasImpresion: '50x36.5 cm' },
  '4':  { id: 'MA-2026-GC-SM-01/10-S', hologram: '287214', edicion: '1/10', medidasImpresion: '50x40.5 cm' },
  '2':  { id: 'MA-2026-GC-LC-01/10-S', hologram: '287215', edicion: '1/10', medidasImpresion: '50x40.5 cm' },
  '3':  { id: 'MA-2026-GC-SF-01/10-S', hologram: '287216', edicion: '1/10', medidasImpresion: '46x30 cm' },
};

interface DigitalCompanionProps {
  artworkId: string | null;
  onClose: () => void;
  showCertificateAccess: boolean;
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
  const [certificateRevealed, setCertificateRevealed] = useState(false);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  const displayYear = artwork && artwork.year && artwork.year.toString().trim() !== ''
                      ? artwork.year
                      : '2025';

  const gicleeData = artworkId ? GICLEE_IDS[artworkId] : null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgContainerRef.current || !artwork) return;
    const { left, top, width, height } = imgContainerRef.current.getBoundingClientRect();

    let x = e.clientX - left;
    let y = e.clientY - top;

    if(x < 0) x = 0; if(x > width) x = width;
    if(y < 0) y = 0; if(y > height) y = height;

    const zoomFactor = 4;
    const lupaSize = 140;
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

  if (showCertificate) {
    return (
      <div className="fixed inset-0 z-[110] bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-8 overflow-y-auto">
        <Certificate
          artwork={artwork}
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

      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[120] bg-white text-slate-900 p-2 rounded-full hover:bg-red-500 hover:text-white shadow-lg transition-all"
      >
        <X size={20} />
      </button>

      <div className="max-w-7xl mx-auto">

        {/* FILA SUPERIOR: Imagen + Ficha Tecnica */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">

          {/* PANEL IZQUIERDO: IMAGEN Y LUPA */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center">
                  <ZoomIn size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{artwork?.title || 'Obra de Arte'}</h3>
                  <p className="text-sm text-slate-600">by {ARTIST_INFO.name} · {displayYear}</p>
                </div>
              </div>

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
          </div>

          {/* PANEL DERECHO: FICHA TECNICA */}
          <div className="lg:w-96 bg-white rounded-2xl shadow-2xl p-6">
            <h3 className="font-serif text-xl text-slate-900 mb-4 pb-2 border-b border-slate-200">
              Ficha Técnica
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-medium text-slate-700">Título:</span>
                <span className="text-slate-900">{artwork?.title || 'Sin titulo'}</span>
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
                <span className="text-slate-900">{artwork?.technique || 'Oleo sobre lienzo'}</span>
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
            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-xs text-slate-500 text-center mb-3">
                ¿Te gustaría saber más sobre esta obra?
              </p>
              
              <a
                href={`mailto:${ARTIST_INFO.email}?subject=Consulta sobre "${artwork?.title}"&body=Estimada Myriam,%0A%0AHe descubierto tu obra "${artwork?.title}" y me ha cautivado profundamente.%0A%0AMe gustar%C3%ADa conocer m%C3%A1s detalles sobre esta pieza: disponibilidad, opciones de env%C3%ADo y cualquier informaci%C3%B3n adicional que puedas compartirme.%0A%0AQuedo a la espera de tu respuesta.%0A%0AUn cordial saludo.`}
                className="block w-full bg-gradient-to-r from-slate-800 to-slate-700 text-white py-3 px-4 rounded-xl font-medium hover:from-gold-600 hover:to-gold-500 transition-all text-center text-sm shadow-lg hover:shadow-xl"
              >
                Solicitar Información
              </a>
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* SECCION CERTIFICADO REAL - Solo en modo publico         */}
        {/* Layout asimetrico 60/40 con CertificatePreview real     */}
        {/* ====================================================== */}
        {!showCertificateAccess && (
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2520 40%, #1a1715 100%)'
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #c5a059 30%, #c5a059 70%, transparent)' }}
            />

            <div className="flex flex-col lg:flex-row">

              {/* COLUMNA IZQUIERDA (60%) - Certificado Real */}
              <div className="lg:w-[58%] p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-px h-12" style={{ backgroundColor: '#c5a059' }} />
                  <div>
                    <p
                      className="text-xs uppercase tracking-widest mb-1"
                      style={{ color: '#c5a059', letterSpacing: '0.25em' }}
                    >
                      Certificado de Autenticidad
                    </p>
                    <p className="text-white/50 text-xs">
                      Cada obra incluye certificación oficial con holograma único
                    </p>
                  </div>
                </div>

                <div
                  className="relative cursor-pointer group"
                  onClick={() => setCertificateRevealed(!certificateRevealed)}
                >
                  <div
                    className="rounded-lg overflow-hidden transition-all duration-700 mx-auto"
                    style={{
                      maxWidth: '340px',
                      boxShadow: certificateRevealed
                        ? '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(197,160,89,0.15)'
                        : '0 15px 40px rgba(0,0,0,0.4)',
                      filter: certificateRevealed ? 'none' : 'blur(4px)',
                      transform: certificateRevealed ? 'scale(1)' : 'scale(0.97)',
                    }}
                  >
                    <CertificatePreview
                      titulo={artwork?.title || 'Sin titulo'}
                      imagen={artwork?.image}
                      año={parseInt(displayYear)}
                      dimensiones={artwork?.dimensions}
                      tecnica={artwork?.technique}
                      isGiclee={!!gicleeData}
                      tecnicaOriginal={artwork?.technique}
                      medidasOriginal={artwork?.dimensions}
                      medidasImpresion={gicleeData?.medidasImpresion || 'Tamano original'}
                      idReferencia={gicleeData?.id || `MA-${displayYear}-${(artwork?.title || 'XX').substring(0,2).toUpperCase()}1/1`}
                      edicion={gicleeData?.edicion || 'Obra Unica Original'}
                      hologramNumber={gicleeData?.hologram || null}
                    />
                  </div>

                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 rounded-lg"
                    style={{
                      opacity: certificateRevealed ? 0 : 1,
                      pointerEvents: certificateRevealed ? 'none' : 'auto',
                    }}
                  >
                    <div className="text-center">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{
                          background: 'linear-gradient(135deg, rgba(197,160,89,0.3), rgba(197,160,89,0.1))',
                          border: '1px solid rgba(197,160,89,0.4)'
                        }}
                      >
                        <Sparkles size={28} style={{ color: '#c5a059' }} className="animate-pulse" />
                      </div>
                      <p className="text-white font-medium text-sm">Toca para revelar</p>
                      <p className="text-xs" style={{ color: '#c5a059' }}>Certificado Oficial</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* COLUMNA DERECHA (40%) - Garantias */}
              <div
                className="lg:w-[42%] p-8 md:p-12 flex flex-col justify-center"
                style={{
                  borderLeft: '1px solid rgba(197,160,89,0.15)',
                  background: 'linear-gradient(180deg, rgba(197,160,89,0.03) 0%, transparent 100%)'
                }}
              >
                <div className="mb-8">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                    style={{
                      background: 'linear-gradient(135deg, #c5a059, #a8863d)',
                      boxShadow: '0 4px 20px rgba(197,160,89,0.3)'
                    }}
                  >
                    <Shield size={24} className="text-white" />
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-2">
                    Garantía de<br/>Autenticidad
                  </h3>
                  <div className="w-12 h-px mt-3" style={{ backgroundColor: '#c5a059' }} />
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'rgba(197,160,89,0.15)', border: '1px solid rgba(197,160,89,0.3)' }}
                    >
                      <Award size={10} style={{ color: '#c5a059' }} />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Holograma Hahnemühle</p>
                      <p className="text-white/40 text-xs mt-0.5">Número de serie único e irrepetible</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'rgba(197,160,89,0.15)', border: '1px solid rgba(197,160,89,0.3)' }}
                    >
                      <Award size={10} style={{ color: '#c5a059' }} />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Firmado por la Artista</p>
                      <p className="text-white/40 text-xs mt-0.5">Firma manuscrita y sello en seco</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'rgba(197,160,89,0.15)', border: '1px solid rgba(197,160,89,0.3)' }}
                    >
                      <Award size={10} style={{ color: '#c5a059' }} />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Edición Limitada Numerada</p>
                      <p className="text-white/40 text-xs mt-0.5">Máximo 10 reproducciones por obra</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'rgba(197,160,89,0.15)', border: '1px solid rgba(197,160,89,0.3)' }}
                    >
                      <Award size={10} style={{ color: '#c5a059' }} />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Papel 100% Algodón</p>
                      <p className="text-white/40 text-xs mt-0.5">Hahnemühle William Turner 310g</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6" style={{ borderTop: '1px solid rgba(197,160,89,0.12)' }}>
                  <div className="flex items-center gap-3">
                    <img
                      src="/logo-myriam.png"
                      alt="Myriam Alcaraz"
                      className="h-8 w-auto opacity-60"
                    />
                    <div>
                      <p className="text-white/70 text-xs font-medium tracking-wider uppercase">Myriam Alcaraz</p>
                      <p className="text-white/30 text-[10px]">Pintura Figurativa Contemporánea</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #c5a059 30%, #c5a059 70%, transparent)' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
