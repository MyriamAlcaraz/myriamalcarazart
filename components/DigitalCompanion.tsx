import React, { useState, useRef } from 'react';
import { Shield, ZoomIn, Award, X, Sparkles } from 'lucide-react';
import { ARTWORKS, ARTIST_INFO } from '../constants';
import { Certificate } from './Certificate';

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
        <div className="flex flex-col lg:flex-row gap-6 mb-8 lg:items-stretch">

          {/* PANEL IZQUIERDO: IMAGEN Y LUPA */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 flex-1 flex flex-col">
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
          <div className="lg:w-96 bg-white rounded-2xl shadow-2xl p-6 flex flex-col">
            <h3 className="font-serif text-xl text-slate-900 mb-4 pb-2 border-b border-slate-200">
              Datos Técnicos del Giclée
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-medium text-slate-700">Título:</span>
                <span className="text-slate-900 text-right ml-2">{artwork?.title || 'Sin titulo'}</span>
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

            {/* CALIDAD MUSEO — siempre visible */}
            <div className="mt-5 pt-5 border-t-2 border-amber-100 bg-amber-50/60 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#c5a059' }} />
                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-widest">Calidad Museo · Hahnemühle</h4>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Impresión íntegra sobre papel <strong>Hahnemühle William Turner Textured</strong>, 100% algodón, libre de ácido y lignina, sin blanqueadores ópticos. Recubrimiento inkjet premium mate para impresiones Fine Art, con alta estabilidad y durabilidad. Tintas pigmentadas en impresora <strong>Canon imagePROGRAF PRO-4000</strong>. Papel adquirido a través de distribuidor autorizado Hahnemühle; producto original garantizado.
              </p>
            </div>

            <div className="mt-auto pt-5 border-t border-slate-100">
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
              background: 'linear-gradient(135deg, #f5f0e8 0%, #ede6d9 45%, #f5f0e8 100%)'
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #c5a059 30%, #c5a059 70%, transparent)' }}
            />

            <div className="flex flex-col lg:flex-row">

              {/* COLUMNA IZQUIERDA — Certificado protagonista */}
              <div className="lg:w-[60%] p-8 md:p-10 flex flex-col justify-center items-center">
                <div className="flex items-center gap-4 mb-6 self-start">
                  <div className="w-px h-10" style={{ backgroundColor: '#c5a059' }} />
                  <div>
                    <p
                      className="text-xs uppercase tracking-widest mb-1"
                      style={{ color: '#c5a059', letterSpacing: '0.25em' }}
                    >
                      Certificado de Autenticidad
                    </p>
                    <p className="text-slate-500 text-xs">
                      Cada obra incluye certificación oficial con holograma único
                    </p>
                  </div>
                </div>

                <div
                  className="relative cursor-pointer group w-full"
                  onClick={() => setCertificateRevealed(!certificateRevealed)}
                >
                  {/* Marco dorado completo */}
                  <div
                    className="rounded-lg overflow-hidden transition-all duration-700 mx-auto"
                    style={{
                      maxWidth: '500px',
                      padding: '5px',
                      background: 'linear-gradient(135deg, #c5a059 0%, #e8d5a3 25%, #c5a059 50%, #a8863d 75%, #c5a059 100%)',
                      boxShadow: certificateRevealed
                        ? '0 30px 70px rgba(0,0,0,0.55), 0 0 60px rgba(197,160,89,0.3)'
                        : '0 20px 50px rgba(0,0,0,0.45), 0 0 30px rgba(197,160,89,0.15)',
                      transform: certificateRevealed ? 'scale(1)' : 'scale(0.97)',
                    }}
                  >
                    {/* CERTIFICADO — Réplica PDF oficial, escala plena */}
                    <div className="relative overflow-hidden" style={{ backgroundColor: '#fffdf8' }}>
                      <div style={{
                        fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
                        backgroundColor: '#fffdf8',
                        padding: '20px 26px 18px',
                        color: '#111',
                        lineHeight: 1.5,
                        position: 'relative',
                        overflow: 'hidden'
                      }}>

                        {/* Línea interior dorada fina */}
                        <div style={{
                          position: 'absolute', top: 6, left: 6, right: 6, bottom: 6,
                          border: '0.75px solid #c5a059', opacity: 0.55, pointerEvents: 'none'
                        }} />

                        {/* Marca de agua diagonal */}
                        <div style={{
                          position: 'absolute', top: '48%', left: '50%',
                          transform: 'translate(-50%, -50%) rotate(-28deg)',
                          fontSize: '26px', fontWeight: 700,
                          color: '#c5a059',
                          opacity: certificateRevealed ? 0.055 : 0.10,
                          letterSpacing: '5px', whiteSpace: 'nowrap',
                          pointerEvents: 'none', zIndex: 3,
                          textTransform: 'uppercase',
                          transition: 'opacity 0.7s'
                        }}>
                          CERTIFICADO OFICIAL
                        </div>

                        {/* ── LOGO ── */}
                        <div style={{ textAlign: 'center', marginBottom: '4px' }}>
                          <img src="/logo-myriam.png" alt="Myriam Alcaraz"
                            style={{ height: '34px', width: 'auto', opacity: 0.92 }} />
                        </div>

                        {/* ── LEMA ── */}
                        <p style={{
                          textAlign: 'center', fontSize: '5pt',
                          letterSpacing: '2.5px', color: '#888',
                          textTransform: 'uppercase', margin: '0 0 9px',
                          fontFamily: 'inherit'
                        }}>Arte con Alma y Sofisticación</p>

                        {/* ── TÍTULO PRINCIPAL ── */}
                        <h1 style={{
                          textAlign: 'center',
                          fontFamily: "'Cinzel', 'Palatino Linotype', Palatino, Georgia, serif",
                          fontSize: '16pt',
                          fontWeight: 400,
                          letterSpacing: '5px',
                          color: '#1a1a1a',
                          lineHeight: 1.2,
                          margin: '0 0 8px',
                          textTransform: 'uppercase'
                        }}>
                          Certificado de<br />Autenticidad
                        </h1>

                        {/* ── LÍNEA DORADA ── */}
                        <div style={{
                          width: '75%', height: '1px',
                          backgroundColor: '#c5a059',
                          margin: '0 auto 10px'
                        }} />

                        {/* ── TEXTO INTRODUCTORIO ── */}
                        <p style={{
                          textAlign: 'center', fontSize: '7pt',
                          lineHeight: 1.7, color: '#444',
                          marginBottom: '5px', padding: '0 3%'
                        }}>
                          {gicleeData
                            ? 'Por la presente se certifica que la reproducción Giclée descrita a continuación es una impresión autorizada y numerada. Todos los derechos de autor están reservados por la artista:'
                            : 'Por la presente se certifica que la obra de arte descrita a continuación es una creación original y auténtica. Todos los derechos de autor están reservados por la artista:'}
                        </p>

                        {/* ── NOMBRE ARTISTA ── */}
                        <p style={{
                          textAlign: 'center',
                          fontFamily: "'Playfair Display', 'Palatino Linotype', Georgia, serif",
                          fontSize: '13pt', fontWeight: 600,
                          color: '#1a1a1a', marginBottom: '2px'
                        }}>Myriam Alcaraz</p>
                        <p style={{
                          textAlign: 'center', fontSize: '5.5pt',
                          color: '#777', fontStyle: 'italic', marginBottom: '12px'
                        }}>Pintura Figurativa Contemporánea</p>

                        {/* ── IMAGEN DE LA OBRA — nítida y grande ── */}
                        {artwork?.image && (
                          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                            <div style={{
                              display: 'inline-block', padding: '4px',
                              backgroundColor: '#ffffff',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                            }}>
                              <img
                                src={artwork.image}
                                alt={artwork.title}
                                style={{
                                  height: '120px',
                                  width: 'auto',
                                  display: 'block',
                                  imageRendering: 'crisp-edges'
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {/* ── CAMPOS PÚBLICOS — totalmente legibles ── */}
                        {([
                          { label: 'Título de la Obra:', value: artwork?.title || 'Sin título' },
                          { label: 'Año de Creación:', value: `marzo de ${displayYear}` },
                          { label: 'Medidas Original:', value: artwork?.dimensions || '—' },
                          ...(gicleeData
                            ? [
                                { label: 'Medidas Impresión:', value: gicleeData.medidasImpresion || '—' },
                                { label: 'Soporte:', value: 'Papel Hahnemühle Textured · William Turner' }
                              ]
                            : [{ label: 'Técnica/Medio:', value: artwork?.technique || 'Óleo sobre lienzo' }]
                          ),
                          { label: 'Edición:', value: gicleeData?.edicion || 'Obra Única Original' },
                        ] as { label: string; value: string }[]).map((item, i) => (
                          <div key={i} style={{
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'baseline',
                            borderBottom: '1px dotted #ccc',
                            padding: '3.5px 0', fontSize: '7.5pt'
                          }}>
                            <span style={{ fontWeight: 700, color: '#333', flexShrink: 0, paddingRight: '8px' }}>{item.label}</span>
                            <span style={{ color: '#111', textAlign: 'right' }}>{item.value}</span>
                          </div>
                        ))}

                        {/* ── CAMPOS SENSIBLES — blur solo en ID y Holograma ── */}
                        {([
                          { label: 'ID de Referencia:', value: gicleeData?.id || `MA-${displayYear}-XX·1/1` },
                          { label: 'Nº Holograma:', value: gicleeData?.hologram || '●●●●●●' },
                        ] as { label: string; value: string }[]).map((item, i) => (
                          <div key={i} style={{
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'baseline',
                            borderBottom: '1px dotted #ccc',
                            padding: '3.5px 0', fontSize: '7.5pt'
                          }}>
                            <span style={{ fontWeight: 700, color: '#c5a059', flexShrink: 0, paddingRight: '8px' }}>{item.label}</span>
                            <span style={{
                              color: '#111', textAlign: 'right',
                              filter: certificateRevealed ? 'blur(2.5px)' : 'blur(5px)',
                              transition: 'filter 0.7s',
                              userSelect: 'none'
                            }}>{item.value}</span>
                          </div>
                        ))}

                        {/* ── INDICADOR DATOS PROTEGIDOS ── */}
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: '4px',
                          justifyContent: 'flex-end', margin: '6px 0',
                          opacity: certificateRevealed ? 0.3 : 0.85,
                          transition: 'opacity 0.7s'
                        }}>
                          <Shield size={8} style={{ color: '#c5a059' }} />
                          <span style={{ fontSize: '5px', color: '#c5a059', letterSpacing: '1.5px', fontWeight: 600, textTransform: 'uppercase' }}>Datos Protegidos</span>
                        </div>

                        {/* ── FECHA Y FIRMA ── */}
                        <div style={{
                          display: 'flex', justifyContent: 'space-between',
                          alignItems: 'flex-end', marginTop: '8px'
                        }}>
                          <div style={{ fontSize: '6.5pt', color: '#333' }}>
                            <span style={{ fontWeight: 700 }}>FECHA: </span>
                            <span>2 de marzo de 2026</span>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ height: '28px' }} />
                            <div style={{ borderTop: '1px solid #555', width: '80px', marginBottom: '3px' }} />
                            <p style={{ fontSize: '7pt', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>Myriam Alcaraz</p>
                            <p style={{ fontSize: '5.5pt', color: '#666', fontStyle: 'italic', margin: 0 }}>Pintura Figurativa Contemporánea</p>
                          </div>
                        </div>

                        {/* ── PIE DE CONTACTO ── */}
                        <div style={{
                          textAlign: 'center', fontSize: '4.5pt',
                          color: '#aaa', marginTop: '9px',
                          paddingTop: '6px', borderTop: '1px solid #e8e4dc',
                          letterSpacing: '0.5px'
                        }}>
                          myriamalcaraz.com&nbsp;•&nbsp;myriamhotmail@hotmail.com&nbsp;•&nbsp;@myriamalcaraz.artist
                        </div>

                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 rounded-lg"
                    style={{
                      opacity: certificateRevealed ? 0 : 1,
                      pointerEvents: certificateRevealed ? 'none' : 'auto',
                      background: 'rgba(245,240,232,0.82)',
                      backdropFilter: 'blur(3px)',
                    }}
                  >
                    <div className="text-center">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{
                          background: 'linear-gradient(135deg, rgba(197,160,89,0.55), rgba(197,160,89,0.25))',
                          border: '2px solid rgba(197,160,89,0.7)',
                          boxShadow: '0 4px 20px rgba(197,160,89,0.3)'
                        }}
                      >
                        <Sparkles size={28} style={{ color: '#8a6520' }} className="animate-pulse" />
                      </div>
                      <p className="text-slate-800 font-semibold text-sm">Toca para revelar</p>
                      <p className="text-xs font-medium mt-1" style={{ color: '#b8860b' }}>Certificado Oficial</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* COLUMNA DERECHA (40%) - Garantias Hahnemühle */}
              <div
                className="lg:w-[42%] p-8 md:p-10 flex flex-col justify-center"
                style={{
                  borderLeft: '1px solid rgba(197,160,89,0.3)',
                  background: 'linear-gradient(180deg, rgba(197,160,89,0.06) 0%, rgba(197,160,89,0.01) 100%)'
                }}
              >
                {/* Header */}
                <div className="mb-7">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #c5a059, #a8863d)',
                      boxShadow: '0 4px 16px rgba(197,160,89,0.35)'
                    }}
                  >
                    <Shield size={22} className="text-white" />
                  </div>
                  <h3 className="font-serif text-xl text-slate-800 mb-1 leading-tight">
                    Certificado de Autenticidad<br/>
                    <span style={{ color: '#c5a059' }}>Hahnemühle</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Amplifoto Digital · Fine Art Printing · Madrid, 2026</p>
                  <div className="w-10 h-px mt-3" style={{ backgroundColor: '#c5a059' }} />
                </div>

                {/* Texto certificado lab */}
                <p className="text-sm text-slate-700 leading-relaxed mb-6 italic border-l-2 pl-4" style={{ borderColor: '#c5a059' }}>
                  "Amplifoto Digital certifica que esta obra ha sido producida conforme a los estándares de calidad Fine Art utilizando papel Hahnemühle original."
                </p>

                {/* Especificaciones técnicas */}
                <div className="space-y-4">
                  {[
                    { title: 'Papel 100% Algodón · Sin Ácidos', sub: 'Hahnemühle William Turner Textured 310g · sin blanqueadores ópticos' },
                    { title: 'Impresora Canon imagePROGRAF PRO-4000', sub: 'Inyección de tinta pigmentada Fine Art' },
                    { title: 'Alta Durabilidad y Estabilidad', sub: 'Recubrimiento inkjet premium mate · condiciones museísticas' },
                    { title: 'Edición Limitada · Holograma Único', sub: 'Nº de serie irrepetible · firmado por la artista' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: 'rgba(197,160,89,0.18)', border: '1px solid rgba(197,160,89,0.45)' }}
                      >
                        <Award size={10} style={{ color: '#c5a059' }} />
                      </div>
                      <div>
                        <p className="text-slate-800 text-sm font-semibold">{item.title}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer logo */}
                <div className="mt-8 pt-5" style={{ borderTop: '1px solid rgba(197,160,89,0.2)' }}>
                  <div className="flex items-center gap-3">
                    <img
                      src="/logo-myriam.png"
                      alt="Myriam Alcaraz"
                      className="h-7 w-auto opacity-70"
                    />
                    <div>
                      <p className="text-slate-700 text-xs font-medium tracking-wider uppercase">Myriam Alcaraz</p>
                      <p className="text-slate-400 text-[10px]">Pintura Figurativa Contemporánea</p>
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
