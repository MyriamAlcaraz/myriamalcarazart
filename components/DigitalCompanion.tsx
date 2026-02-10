import React, { useState, useRef } from 'react';
import { Shield, ZoomIn, X } from 'lucide-react'; 
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

    const zoomFactor = 3.5;
    const magnifierSize = 150;
    const backgroundPositionX = (x / width) * 100;
    const backgroundPositionY = (y / height) * 100;

    setZoomStyle({
      backgroundImage: `url(${artwork.image})`,
      backgroundPosition: `${backgroundPositionX}% ${backgroundPositionY}%`,
      backgroundSize: `${width * zoomFactor}px ${height * zoomFactor}px`,
      backgroundRepeat: 'no-repeat',
      width: `${magnifierSize}px`,
      height: `${magnifierSize}px`,
      top: y - magnifierSize / 2, 
      left: x - magnifierSize / 2,
      borderRadius: '50%',
      border: '3px solid #d4af37',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      pointerEvents: 'none',
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
              
              {/* LUPA MAGICA */}
              {showZoom && (
                <div 
                  className="absolute pointer-events-none z-50"
                  style={zoomStyle}
                />
              )}
            </div>
          </div>

          
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