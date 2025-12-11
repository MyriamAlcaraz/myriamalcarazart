// ARCHIVO: ./components/DigitalCompanion.tsx - CÓDIGO FINAL CORREGIDO Y LIMPIO

import React, { useState, useRef } from 'react';
// 🛑 MODIFICADO: Se eliminan imports innecesarios. Se usa Shield, ZoomIn, X, Mail
import { Shield, Image as ImageIcon, ZoomIn, X, Mail } from 'lucide-react'; 
import { ARTWORKS, ARTIST_INFO } from '../constants';

interface DigitalCompanionProps {
  artworkId: string | null;
  onClose: () => void;
  showCertificateAccess: boolean; // TRUE solo en MODO ESTUDIO
  // 🛑 NUEVO PROP CLAVE: Función que enviará la orden a App.tsx
  onOpenCertificateDemo: () => void; 
}

export const DigitalCompanion: React.FC<DigitalCompanionProps> = ({ 
    artworkId, 
    onClose,
    showCertificateAccess, 
    // 🛑 AÑADIDO: Destructurar el nuevo prop
    onOpenCertificateDemo,
}) => {
  const artwork = ARTWORKS.find(a => a.id === artworkId) || ARTWORKS[0];
  
  // 🛑 ESTADO ELIMINADO: Ya NO se usa, el control es de App.tsx
  // const [showCertificate, setShowCertificate] = useState(false); 
  
  const [showZoom, setShowZoom] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const imgContainerRef = useRef<HTMLDivElement>(null);

  const displayYear = artwork.year && artwork.year.toString().trim() !== '' 
                      ? artwork.year 
                      : '2025'; 
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgContainerRef.current) return;
    const { left, top, width, height } = imgContainerRef.current.getBoundingClientRect();
    
    let x = e.clientX - left; 
    let y = e.clientY - top;

    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    setZoomStyle({
      backgroundPosition: `${xPercent}% ${yPercent}%`,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-end p-0 sm:p-4">
      
      {/* Panel Principal */}
      <div className="bg-white rounded-l-xl sm:rounded-xl shadow-2xl h-full sm:h-auto max-h-full sm:max-h-[90vh] w-full max-w-4xl relative overflow-hidden flex flex-col sm:flex-row animate-slide-in-right">
        
        {/* Columna de Imagen (Zoom Lupa) */}
        <div className="sm:w-1/2 relative bg-stone-100 flex items-center justify-center p-6 border-r border-stone-200">
          
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/50 text-slate-700 hover:text-red-500 transition-colors shadow-md backdrop-blur"
          >
              <X size={24} />
          </button>

          <div 
            ref={imgContainerRef}
            className="w-full h-full max-w-sm max-h-96 sm:max-h-full relative overflow-hidden rounded-lg shadow-lg"
            onMouseEnter={() => setShowZoom(true)}
            onMouseLeave={() => setShowZoom(false)}
            onMouseMove={handleMouseMove}
          >
            <img 
              src={artwork.image} 
              alt={artwork.title} 
              className="w-full h-full object-contain"
            />
            
            {showZoom && (
              <div 
                className="absolute inset-0 border-4 border-gold-500/80 cursor-zoom-in opacity-100 transition-opacity duration-300"
                style={{
                  backgroundImage: `url(${artwork.image})`,
                  backgroundSize: '300%',
                  ...zoomStyle,
                }}
              >
                 <ZoomIn size={24} className="absolute bottom-2 right-2 text-white drop-shadow-lg"/>
              </div>
            )}
          </div>
        </div>

        {/* Columna de Información */}
        <div className="sm:w-1/2 p-8 overflow-y-auto">
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">{artwork.title}</h1>
          <p className="text-lg text-gold-600 font-semibold mb-4">{artwork.technique}</p>

          <div className="mb-6 space-y-1 text-sm border-b pb-4">
            <p className="text-slate-600"><span className="font-bold text-slate-800">Dimensiones:</span> {artwork.dimensions}</p>
            <p className="text-slate-600"><span className="font-bold text-slate-800">Año:</span> {displayYear}</p>
            <p className="text-slate-600"><span className="font-bold text-slate-800">Disponibilidad:</span> {artwork.status === 'available' ? 'Disponible para colección' : 'En colección privada (Posible Giclée)'}</p>
          </div>

          <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Narrativa de la Obra</h3>
          <p className="text-slate-700 leading-relaxed mb-6">{artwork.description}</p>

          <div className="space-y-4 pt-4">
            
            {/* 1. Botón de Certificado (DEMO) */}
            <button
                // 🛑 LLAMADA CLAVE: Llama al prop de App.tsx, que dispara el cambio de estado
                onClick={onOpenCertificateDemo}
                className={`w-full flex items-center justify-center gap-2 text-white p-3 rounded font-bold transition-colors shadow-md ${
                    showCertificateAccess 
                        ? 'bg-slate-800 hover:bg-gold-600' // MODO ARTISTA
                        : 'bg-slate-500 hover:bg-slate-600' // MODO PÚBLICO
                }`}
            >
                <Shield size={18} /> Ver Certificado de Autenticidad (Demo)
            </button>

            {/* 2. Botón de Consulta / Venta */}
            <a 
              href={`mailto:${ARTIST_INFO.email}?subject=Consulta de Obra: ${artwork.title}`}
              className="w-full flex items-center justify-center gap-2 bg-gold-500 text-white p-3 rounded font-bold hover:bg-gold-600 transition-colors shadow-md"
            >
                <Mail size={18} /> Consultar o Adquirir
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};