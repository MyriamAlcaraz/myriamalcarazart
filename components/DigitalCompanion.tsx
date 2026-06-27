import React, { useState, useRef, useEffect } from 'react';
import { Shield, X } from 'lucide-react';
import { ARTWORKS, ARTIST_INFO } from '../constants';
import { Certificate } from './Certificate';

interface DigitalCompanionProps {
  artworkId: string | null;
  onClose: () => void;
  showCertificateAccess: boolean;
  initialMode?: 'lupa' | 'certificate';
}

// Detecta reconocimientos institucionales mencionados en la descripción de la obra
function extraerReconocimientos(descripcion?: string): string[] {
  if (!descripcion) return [];
  const d = descripcion.toLowerCase();
  const hits: string[] = [];
  if (d.includes('salón de otoño')) hits.push('92 Salón de Otoño');
  if (d.includes('target prize')) hits.push('Target Prize 2025');
  if (d.includes('modportrait')) hits.push('ModPortrait');
  if (d.includes('guía leonardo') || d.includes('guia leonardo')) hits.push('Guía Leonardo 2025');
  if (d.includes('salón de realismo')) hits.push('X Salón de Realismo');
  if (d.includes('certamen de pequeño formato')) hits.push('44 Certamen de Pequeño Formato');
  if (d.includes('cromática de toledo')) hits.push('Museo de Arte Cromática de Toledo');
  return hits.slice(0, 3);
}

export const DigitalCompanion: React.FC<DigitalCompanionProps> = ({
  artworkId,
  onClose,
  showCertificateAccess,
  initialMode = 'lupa',
}) => {
  const artwork = ARTWORKS.find(a => a.id === artworkId) || ARTWORKS[0];

  const [showCertificate, setShowCertificate] = useState(initialMode === 'certificate');
  const [showZoom, setShowZoom] = useState(false);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const imgContainerRef = useRef<HTMLDivElement>(null);

  const displayYear = artwork?.year && artwork.year.toString().trim() !== '' ? artwork.year : '2025';
  const reconocimientos = extraerReconocimientos(artwork?.description);
  const disponibilidad = artwork?.status === 'sold' ? 'Vendida' : 'Disponible';
  const disponibilidadColor = artwork?.status === 'sold' ? '#9CA3AF' : '#c5a059';

  // Cerrar con tecla Escape — atención al detalle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgContainerRef.current || !artwork) return;
    const { left, top, width, height } = imgContainerRef.current.getBoundingClientRect();
    let x = e.clientX - left;
    let y = e.clientY - top;
    if (x < 0) x = 0; if (x > width) x = width;
    if (y < 0) y = 0; if (y > height) y = height;
    const zoomFactor = 3.5;
    const lupaSize = 160;
    setZoomStyle({
      backgroundImage: `url(${artwork.image})`,
      backgroundPosition: `${(x / width) * 100}% ${(y / height) * 100}%`,
      backgroundSize: `${width * zoomFactor}px ${height * zoomFactor}px`,
      top: y - lupaSize / 2,
      left: x - lupaSize / 2,
      width: lupaSize,
      height: lupaSize,
    });
  };

  // Vista privada con certificado completo (solo desde ESTUDIO)
  if (showCertificate) {
    return (
      <div className="fixed inset-0 z-[110] bg-slate-950 p-4 md:p-8 overflow-y-auto modal-backdrop">
        <Certificate artwork={artwork} />
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="fixed top-5 right-5 z-[120] w-10 h-10 rounded-full border border-white/30 text-white/70 hover:text-white hover:border-white/60 flex items-center justify-center transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[110] bg-slate-950/95 backdrop-blur-md overflow-y-auto modal-backdrop"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="fixed top-5 right-5 z-[120] w-10 h-10 rounded-full border border-white/30 text-white/70 hover:text-white hover:border-white/60 flex items-center justify-center transition-colors"
      >
        <X size={18} />
      </button>

      <div
        className="min-h-screen flex items-center justify-center p-4 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-stage w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* OBRA — lupa al pasar el cursor */}
          <div className="relative">
            <div
              ref={imgContainerRef}
              className="relative overflow-hidden cursor-crosshair"
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleMouseMove}
              style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.55)' }}
            >
              <img
                src={artwork?.image}
                alt={artwork?.title}
                className="w-full h-auto max-h-[78vh] object-contain bg-slate-900"
              />
              {showZoom && (
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    ...zoomStyle,
                    border: '1px solid #c5a059',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              )}
            </div>
            <p className="mt-4 text-right text-[10px] tracking-[0.3em] text-white/35 font-serif italic">
              PASA EL CURSOR PARA ACERCAR
            </p>
          </div>

          {/* CARTELA — datos como en una sala de museo */}
          <div className="text-stone-100 flex flex-col">
            <p className="text-[10px] tracking-[0.4em] text-gold-500 mb-5">
              {artwork?.status === 'sold' ? 'OBRA EN COLECCIÓN' : 'OBRA ORIGINAL'}
            </p>

            <h2 className="font-serif text-3xl md:text-5xl text-stone-50 leading-[1.1] mb-3">
              {artwork?.title || 'Sin título'}
            </h2>
            <p className="font-serif italic text-base md:text-lg text-white/55 mb-7">
              {ARTIST_INFO.name} · {displayYear}
            </p>

            <div
              className="h-px mb-7"
              style={{ background: 'linear-gradient(90deg, transparent, #c5a059 30%, #c5a059 70%, transparent)' }}
            />

            {/* Cuadrícula 2x2 — técnica, dimensiones, año, disponibilidad */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-8">
              <div>
                <p className="text-[10px] tracking-[0.25em] text-white/45 mb-1.5">TÉCNICA</p>
                <p className="font-serif text-base text-stone-50">{artwork?.technique || 'Óleo sobre tela'}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.25em] text-white/45 mb-1.5">DIMENSIONES</p>
                <p className="font-serif text-base text-stone-50">{artwork?.dimensions || '—'}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.25em] text-white/45 mb-1.5">AÑO</p>
                <p className="font-serif text-base text-stone-50">{displayYear}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.25em] text-white/45 mb-1.5">DISPONIBILIDAD</p>
                <p className="font-serif text-base" style={{ color: disponibilidadColor }}>{disponibilidad}</p>
              </div>
            </div>

            {/* Descripción como cartela */}
            {artwork?.description && (
              <div className="mb-7 pl-4" style={{ borderLeft: '1px solid #c5a059' }}>
                <p className="font-serif italic text-sm md:text-base text-white/75 leading-relaxed">
                  {artwork.description}
                </p>
              </div>
            )}

            {/* Reconocimientos detectados — un punto dorado y texto sobrio */}
            {reconocimientos.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-2 gap-y-2 mb-9 text-[10px] tracking-[0.25em] text-gold-500">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                {reconocimientos.map((r, i) => (
                  <React.Fragment key={r}>
                    <span className="uppercase">{r}</span>
                    {i < reconocimientos.length - 1 && <span className="text-white/30">·</span>}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* CTA — un solo botón sobrio */}
            <div className="mt-auto">
              <a
                href={`mailto:${ARTIST_INFO.email}?subject=${encodeURIComponent('Consulta sobre "' + (artwork?.title || '') + '"')}&body=${encodeURIComponent('Hola Myriam,\n\nHe descubierto tu obra "' + (artwork?.title || '') + '" en tu web y me gustaría saber más sobre disponibilidad, envío y cualquier detalle adicional.\n\nQuedo a la espera de tu respuesta.\n\nUn cordial saludo.')}`}
                className="inline-block px-8 py-4 border border-stone-50 text-stone-50 hover:bg-stone-50 hover:text-slate-900 transition-colors text-[11px] tracking-[0.3em]"
              >
                SOLICITAR INFORMACIÓN
              </a>
              <p className="text-[10px] tracking-[0.2em] text-white/35 mt-5">
                CADA OBRA SE ENTREGA CON CERTIFICADO DE AUTORÍA
              </p>
            </div>

            {/* Acceso al certificado completo solo en modo ESTUDIO */}
            {showCertificateAccess && (
              <button
                onClick={() => setShowCertificate(true)}
                className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.25em] text-gold-500 hover:text-stone-50 transition-colors self-start"
              >
                <Shield size={14} />
                VER CERTIFICADO COMPLETO
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
