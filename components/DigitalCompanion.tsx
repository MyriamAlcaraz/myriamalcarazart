import React, { useState, useRef } from 'react';
import { Shield, Image as ImageIcon, ZoomIn, Printer, X, AlertTriangle } from 'lucide-react';
import { ARTWORKS, ARTIST_INFO } from '../constants';
import { Certificate } from './Certificate';

// 🛑 AÑADIMOS LA INTERFAZ DE PROPS Y EL PROP DE SEGURIDAD
interface DigitalCompanionProps {
  artworkId: string;
  onClose: () => void;
  showCertificateAccess: boolean; // TRUE solo en MODO ESTUDIO
}

export const DigitalCompanion: React.FC<DigitalCompanionProps> = ({ 
    artworkId, 
    onClose,
    showCertificateAccess // 🛑 Recibimos el prop de seguridad
}) => {
  const artwork = ARTWORKS.find(a => a.id === artworkId) || ARTWORKS[0];
  const [showCertificate, setShowCertificate] = useState(false);
  
  const [showZoom, setShowZoom] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const imgContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgContainerRef.current) return;
    const { left, top, width, height } = imgContainerRef.current.getBoundingClientRect();
    
    let x = e.clientX - left; 
    let y = e.clientY - top;

    if(x < 0) x = 0; if(x > width) x = width;
    if(y < 0) y = 0; if(y > height) y = height;

    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    setZoomStyle({
      left: x, 
      top: y,
      backgroundImage: `url(${artwork.image})`,
      backgroundPosition: `${xPercent}% ${yPercent}%`,
      backgroundSize: '1500%', // ZOOM X15
      backgroundRepeat: 'no-repeat'
    });
    setShowZoom(true);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-sm shadow-2xl relative flex flex-col md:flex-row">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-slate-900/50 hover:bg-slate-900 text-white p-2 rounded-full transition-colors z-50"
        >
          <X size={20} />
        </button>

        {/* --- ZONA DE IMAGEN INTERACTIVA (LA LUPA MÁGICA) --- */}
        <div className="w-full md:w-3/5 bg-stone-900 relative group overflow-hidden flex items-center justify-center">
          
          <div 
            ref={imgContainerRef}
            className="relative max-w-full max-h-full cursor-crosshair inline-block"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setShowZoom(false)}
          >
            <img 
              src={artwork.image} 
              alt={artwork.title} 
              // 🛑 Asegura que la imagen se vea completa
              className="max-w-full max-h-[90vh] object-contain block shadow-2xl select-none"
            />

            {showZoom && (
              <div 
                className="absolute w-64 h-64 rounded-full border-4 border-gold-500 shadow-[0_0_40px_rgba(0,0,0,0.8)] z-20 overflow-hidden bg-stone-100 pointer-events-none"
                style={{
                  ...zoomStyle,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )}
          </div>
          
          {!showZoom && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
                <span className="bg-black/60 text-white px-4 py-2 rounded-full text-xs uppercase tracking-widest backdrop-blur-sm flex items-center gap-2 shadow-lg border border-white/20">
                    <ZoomIn size={14} className="text-gold-400"/> Pasa el ratón para ver detalle
                </span>
            </div>
          )}
        </div>

        {/* --- ZONA DE CONTENIDO --- */}
        <div className="w-full md:w-2/5 p-8 overflow-y-auto bg-white flex flex-col border-l border-slate-100">
            <div className="mb-8">
                <div className="text-gold-600 text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2"><Shield size={14} /> Pasaporte Digital de Obra</div>
                <h2 className="text-4xl font-serif text-slate-900 mb-3 leading-tight">{artwork.title}</h2>
                <div className="h-1 w-16 bg-gold-500 mb-4"></div>
                <p className="text-slate-500 text-sm font-light italic flex justify-between border-b border-slate-100 pb-4"><span>{ARTIST_INFO.name}</span><span>{artwork.year || '2025'}</span></p>
            </div>

            <div className="space-y-8 flex-1">
                <section>
                    <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-3 flex items-center gap-2"><ImageIcon size={14}/> Análisis Técnico & Emocional</h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-light text-justify">{artwork.description}</p>
                </section>

                {/* 🛑 SECCIÓN DE DOCUMENTACIÓN OCULTA AL PÚBLICO */}
                {showCertificateAccess && (
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-4 flex items-center gap-2"><Shield size={14} className="text-gold-600"/> Documentación de Propiedad</h3>
                        
                        <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-900 p-3 mb-4" role="alert">
                            <p className="font-bold flex items-center gap-2 text-xs"><AlertTriangle size={14}/> INFORMACIÓN SENSIBLE</p>
                            <p className="text-xs">Solo visible en MODO ESTUDIO.</p>
                        </div>

                        <div className="space-y-4">
                            {/* 🛑 ID de Registro Único (Ahora protegido) */}
                            <div className="flex justify-between text-xs border-b border-slate-200 pb-2 border-dashed">
                                <span className="text-slate-500 font-medium">ID Registro Único</span>
                                <span className="font-mono text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">MA-2025-{artwork.id.padStart(2,'0')}</span>
                            </div>
                            <div className="flex justify-between text-xs border-b border-slate-200 pb-2 border-dashed">
                                <span className="text-slate-500 font-medium">Estado Legal</span>
                                <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded font-bold uppercase text-[10px] tracking-wider border border-green-200">Verificado</span>
                            </div>
                            {/* 🛑 Botón de Certificado (Ahora protegido) */}
                            <button 
                                onClick={() => setShowCertificate(true)} 
                                className="w-full mt-2 bg-slate-900 text-white py-3 rounded text-xs font-bold uppercase tracking-wide hover:bg-gold-600 transition-all flex justify-center items-center gap-2 shadow-lg hover:shadow-gold-500/20 group"
                            >
                                <Printer size={16} className="group-hover:scale-110"/> Ver Certificado Oficial
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center opacity-60">
                <img src="/logo-myriam.png" alt="Logo" className="h-6 grayscale opacity-50" />
                <p className="text-[9px] text-slate-400 text-right uppercase tracking-wider">© {new Date().getFullYear()} Myriam Alcaraz Art<br/>Todos los derechos reservados.</p>
            </div>
        </div>
      </div>

      {showCertificate && (
        <div className="absolute inset-0 z-[110] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-200 p-2 md:p-8 rounded-lg shadow-2xl max-h-[95vh] overflow-y-auto w-fit relative">
                <button onClick={() => setShowCertificate(false)} className="fixed top-6 right-6 z-[120] bg-white text-slate-900 p-3 rounded-full hover:bg-red-500 hover:text-white shadow-xl"><X size={24} /></button>
                <div className="transform scale-[0.6] md:scale-90 origin-top">
                    {/* 🛑 AVISO DE USO SOLO EN ESTUDIO */}
                    <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-900 p-4 mb-4" role="alert">
                        <p className="font-bold flex items-center gap-2"><AlertTriangle size={16}/> PREVISUALIZACIÓN DE CERTIFICADO</p>
                        <p className="text-sm">Esto es solo una previsualización en el ESTUDIO. Para generar la versión final, usa la sección KIT del panel principal.</p>
                    </div>
                    <Certificate artwork={artwork} />
                </div>
                {/* 🛑 BOTÓN DE IMPRESIÓN (Solo visible si showCertificate es true, y showCertificate solo es true en ESTUDIO) */}
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
                    <button 
                        onClick={() => window.print()} 
                        className="bg-gold-600 text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-gold-700 text-sm font-bold shadow-xl"
                    >
                        <Printer size={18}/> IMPRIMIR ORIGINAL
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};