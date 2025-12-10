import React, { useState, useRef, useMemo } from 'react';
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
    showCertificateAccess 
}) => {
  
  // 🛑 Lógica para el manejo de la Obra y el modo DEMO
  const isDemoMode = artworkId === 'CERTIFICATE_DEMO';
  
  // Seleccionar la obra: Si es modo demo o no se encuentra, usamos la primera como template.
  const artwork = useMemo(() => {
    const selected = ARTWORKS.find(a => a.id === artworkId);
    // Usamos ARTWORKS[0] como template para el certificado
    return selected || ARTWORKS[0]; 
  }, [artworkId]);
  
  // 🛑 Estado inicial: Si es modo DEMO, empezamos directamente en el certificado.
  const [showCertificate, setShowCertificate] = useState(isDemoMode);
  
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
    
    // Calcula el porcentaje de la posición (0 a 100)
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    // El transform se ajusta para que el centro del zoom siga al cursor.
    setZoomStyle({
      transformOrigin: `${xPercent}% ${yPercent}%`,
      transform: 'scale(2.5)', // Factor de zoom
    });
  };

  const isPublicPreview = !showCertificateAccess && showCertificate;

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${showCertificate ? 'bg-slate-900/95' : 'bg-white'} transition-all duration-300`}>
      {/* Botón de Cierre */}
      <button onClick={onClose} className="fixed top-6 right-6 z-[120] bg-slate-900 text-white p-3 rounded-full hover:bg-gold-600 shadow-xl transition-colors">
        <X size={24} />
      </button>

      {/* Visor de Obra (Visible si el certificado NO está visible) */}
      {!showCertificate && (
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="md:grid md:grid-cols-3 gap-12">
            
            {/* Imagen Principal */}
            <div className="md:col-span-2 relative bg-stone-100 rounded-lg overflow-hidden shadow-2xl" 
                 onMouseEnter={() => setShowZoom(true)} 
                 onMouseLeave={() => setShowZoom(false)}
                 onMouseMove={handleMouseMove}
                 ref={imgContainerRef}
            >
              <img
                src={artwork.image}
                alt={artwork.title}
                className={`w-full h-auto transition-transform duration-300 ease-in-out ${showZoom ? 'cursor-zoom-in' : ''}`}
                style={showZoom ? zoomStyle : {}}
              />
              <div className="absolute top-4 left-4 bg-black/50 text-white p-2 text-xs rounded flex items-center gap-1">
                <ZoomIn size={14} /> {showZoom ? 'Acercando...' : 'Pase el ratón para zoom de alta resolución'}
              </div>
            </div>

            {/* Ficha Técnica */}
            <div className="md:col-span-1 pt-8 md:pt-0">
              <h1 className="font-serif text-4xl font-bold text-slate-900 mb-4">{artwork.title}</h1>
              <p className="text-xl font-serif italic text-gold-600 mb-6">{artwork.year}</p>
              
              <div className="space-y-4 text-slate-700">
                <div className="border-b border-stone-200 pb-2">
                  <span className="font-semibold block">Técnica:</span> {artwork.technique}
                </div>
                <div className="border-b border-stone-200 pb-2">
                  <span className="font-semibold block">Soporte:</span> {artwork.support}
                </div>
                <div className="border-b border-stone-200 pb-2">
                  <span className="font-semibold block">Dimensiones:</span> {artwork.dimensions}
                </div>
                <div className="border-b border-stone-200 pb-2">
                  <span className="font-semibold block">Precio Original:</span> {artwork.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mt-4 mb-2 text-slate-800">Notas de la Artista</h3>
                  <p className="text-sm leading-relaxed">{artwork.description}</p>
                </div>
              </div>

              {/* Botón para Certificado (Visible solo en ESTUDIO) */}
              {showCertificateAccess && (
                <button
                  onClick={() => setShowCertificate(true)}
                  className="mt-8 flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-gold-600 transition-colors font-bold text-sm"
                >
                  <Shield size={18} /> Ver Certificado de Autenticidad
                </button>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Visor de Certificado */}
      {showCertificate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 print-clean-background">
            {/* Botón de cierre (Oculto en impresión) */}
            <button onClick={() => isDemoMode ? onClose() : setShowCertificate(false)} className="fixed top-6 right-6 z-[120] bg-white text-slate-900 p-3 rounded-full hover:bg-red-500 hover:text-white shadow-xl transition-colors print-hidden"><X size={24} /></button>
            
            <div className={`relative ${isPublicPreview ? 'p-12' : 'transform scale-[0.6] md:scale-90 origin-top'}`}>
                
                {/* 🛑 AVISO DE USO SOLO EN ESTUDIO O ADVERTENCIA DE PIXELADO */}
                <div className={`p-4 mb-4 rounded-lg shadow-md ${isPublicPreview ? 'bg-red-100 border-l-4 border-red-500 text-red-900' : 'bg-amber-50 border-l-4 border-amber-500 text-amber-900'}`} role="alert">
                    <p className="font-bold flex items-center gap-2">
                        <AlertTriangle size={16}/> 
                        {isPublicPreview ? 'PREVISUALIZACIÓN DE ALTA SEGURIDAD' : 'PREVISUALIZACIÓN DE CERTIFICADO (ESTUDIO)'}
                    </p>
                    <p className="text-sm mt-2">
                        {isPublicPreview 
                            ? 'El ID de registro, los datos de la obra y la firma están pixelados en esta demo pública. La copia Giclée final incluye el certificado físico original con sello seco y numeración.'
                            : 'Esto es solo una previsualización. Para generar la versión final, usa la sección KIT del panel principal.'
                        }
                    </p>
                </div>
                
                {/* 🛑 AHORA PASAMOS EL PROP PARA QUE EL COMPONENTE CERTIFICATE SE PIXELE INTERNAMENTE */}
                <div className="bg-white shadow-2xl relative">
                    <Certificate artwork={artwork} isPixelatedDemo={isPublicPreview} />
                </div>

                {/* BOTÓN DE IMPRESIÓN (Solo visible en ESTUDIO y no en Demo Mode) */}
                {showCertificateAccess && !isDemoMode && (
                    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 print-hidden">
                        <button 
                            onClick={() => window.print()} 
                            className="bg-gold-600 text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-gold-700 text-sm font-bold shadow-xl"
                        >
                            <Printer size={18}/> IMPRIMIR ORIGINAL
                        </button>
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};