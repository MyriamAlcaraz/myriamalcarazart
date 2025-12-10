// ARCHIVO: ./components/DigitalCompanion.tsx - CÓDIGO FINAL CORREGIDO Y LIMPIO

import React, { useState, useRef } from 'react';
import { Shield, Image as ImageIcon, ZoomIn, X, Mail } from 'lucide-react'; 
import { ARTWORKS, ARTIST_INFO } from '../constants';
// 🛑 IMPORTANTE: Eliminamos la importación del certificado antiguo (Certificate)

interface DigitalCompanionProps {
  artworkId: string | null;
  onClose: () => void;
  showCertificateAccess: boolean; 
  initialMode?: 'lupa' | 'certificate'; 
  // Propiedad para abrir la demo del certificado bonito
  onOpenCertificateDemo: () => void; 
}

export const DigitalCompanion: React.FC<DigitalCompanionProps> = ({ 
    artworkId, 
    onClose,
    // showCertificateAccess, // Prop no usada en la vista de lupa/metadatos
    // initialMode = 'lupa', // Prop no usada con la nueva lógica de certificado
    onOpenCertificateDemo // Usamos la nueva prop
}) => {
  const artwork = ARTWORKS.find(a => a.id === artworkId) || ARTWORKS[0];
  
  // 🛑 IMPORTANTE: ELIMINAMOS el estado 'showCertificate' y toda la lógica asociada.
  
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

    if(x < 0) x = 0; if(x > width) x = width;
    if(y < 0) y = 0; if(y > height) y = height;

    const zoomFactor = 3.5;
    const backgroundPositionX = (x / width) * 100;
    const backgroundPositionY = (y / height) * 100;

    setZoomStyle({
      backgroundImage: `url(${artwork.image})`,
      backgroundPosition: `${backgroundPositionX}% ${backgroundPositionY}%`,
      backgroundSize: `${width * zoomFactor}px ${height * zoomFactor}px`,
      top: y + 20, 
      left: x + 20,
    });
  };

  // 🛑 El renderizado condicional del viejo certificado ha sido eliminado.
  
  // Vista por defecto (Lupa)
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center items-center p-4 md:p-8">
      
      {/* Botón de cierre */}
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 z-50 bg-white text-slate-900 p-3 rounded-full hover:bg-red-500 hover:text-white shadow-xl transition-colors"
      >
        <X size={24} />
      </button>

      {/* Contenedor Principal */}
      <div className="bg-white rounded-xl shadow-2xl flex flex-col lg:flex-row max-w-5xl w-full max-h-[95vh] overflow-hidden">
        
        {/* Lado Izquierdo: Imagen y Lupa */}
        <div className="lg:w-1/2 relative bg-slate-100 flex items-center justify-center p-4 flex-grow h-full max-h-full">
          <div 
            ref={imgContainerRef} 
            className="relative w-full h-full cursor-none overflow-hidden group"
            onMouseMove={handleMouseMove} 
            onMouseEnter={() => setShowZoom(true)} 
            onMouseLeave={() => setShowZoom(false)} 
          >
            <img 
              src={artwork.image} 
              alt={artwork.title} 
              className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-80"
            />
            
            {/* LUPA (Magnifier) */}
            {showZoom && (
              <div 
                className="absolute w-36 h-36 border-4 border-gold-500 rounded-full shadow-2xl pointer-events-none transform -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-black/50 transition-opacity duration-200"
                style={zoomStyle}
              >
              </div>
            )}

            {/* Icono de Lupa Hint */}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white p-2 rounded-full flex items-center gap-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={16} /> Detalle de Lujo
            </div>
          </div>
        </div>
        
        {/* Lado Derecho: Metadatos y CTA */}
        <div className="lg:w-1/2 p-8 overflow-y-auto">
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-2">{artwork.title}</h2>
          <p className="text-sm uppercase tracking-widest text-gold-600 font-semibold mb-4">
              {artwork.technique}
          </p>

          <div className="space-y-4 border-y border-stone-200 py-6 mb-8">
            <p className="text-slate-600"><span className="font-bold text-slate-800">Dimensiones:</span> {artwork.dimensions}</p>
            <p className="text-slate-600"><span className="font-bold text-slate-800">Año:</span> {displayYear}</p>
            <p className="text-slate-600"><span className="font-bold text-slate-800">Disponibilidad:</span> {artwork.status === 'available' ? 'Disponible para colección' : 'En colección privada (Posible Giclée)'}</p>
          </div>

          <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Narrativa de la Obra</h3>
          <p className="text-slate-700 leading-relaxed mb-6">{artwork.description}</p>

          <div className="space-y-4 pt-4">
            {/* 1. Botón de Certificado (Demo/Real) */}
            <button
                // Llama a la prop para abrir la demo bonita en App.tsx
                onClick={onOpenCertificateDemo} 
                className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white p-3 rounded font-bold hover:bg-gold-600 transition-colors shadow-md"
            >
                <Shield size={18} /> Ver Demo Certificado
            </button>

            {/* 2. Botón de Consulta / Venta */}
            <a 
              href={`mailto:${ARTIST_INFO.email}?subject=Consulta de Obra: ${artwork.title}`}
              className="w-full flex items-center justify-center gap-2 bg-gold-500 text-white p-3 rounded font-bold hover:bg-gold-600 transition-colors shadow-md"
            >
              <Mail size={18} /> Solicitar Precio y Adquisición
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};