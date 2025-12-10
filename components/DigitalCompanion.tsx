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

    const zoomFactor = 2.5; // Factor de zoom
    const backgroundPositionX = (x / width) * 100;
    const backgroundPositionY = (y / height) * 100;

    setZoomStyle({
      // 🛑 ESTILOS PARA LA LUPA: Fondo oscuro elegante y borde dorado
      backgroundImage: `url(${artwork.image})`,
      backgroundPosition: `${backgroundPositionX}% ${backgroundPositionY}%`,
      backgroundSize: `${width * zoomFactor}px ${height * zoomFactor}px`,
      // Posicionar la lupa junto al cursor
      top: y + 20, 
      left: x + 20,
    });
  };

  // Función auxiliar para formatear precio SIN IMPUESTOS y sin céntimos
  const formatPrice = (price: number) => {
    // Usamos el precioBase ya que es el valor sin impuestos.
    const basePrice = artwork.priceBase;
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(basePrice);
  }

  // Si se está mostrando el certificado, renderiza solo el certificado
  if (showCertificate) {
    return (
        <div className="fixed inset-0 z-[110] bg-black/90 p-4 md:p-12 overflow-y-auto flex justify-center items-start print-clean-background">
            <button 
                onClick={() => setShowCertificate(false)} 
                className="fixed top-6 right-6 z-[120] bg-white text-slate-900 p-3 rounded-full hover:bg-red-500 hover:text-white shadow-xl"
            >
                <X size={24} />
            </button>
            <div className="transform scale-[0.6] md:scale-90 origin-top">
                {/* 🛑 AVISO DE USO SOLO EN ESTUDIO */}
                <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-900 p-4 mb-4" role="alert">
                    <p className="font-bold flex items-center gap-2"><AlertTriangle size={16}/> PREVISUALIZACIÓN DE CERTIFICADO</p>
                    <p className="text-sm">Esto es solo una previsualización. Para generar la versión final, usa la sección KIT del panel principal del ESTUDIO.</p>
                </div>
                {/* Usamos la versión pixelada para la demo pública */}
                <Certificate artwork={artwork} isPixelatedDemo={!showCertificateAccess} /> 
            </div>
            {/* 🛑 BOTÓN DE IMPRESIÓN (Solo visible si es MODO ESTUDIO) */}
            {showCertificateAccess && (
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
                    <button 
                        onClick={() => window.print()} 
                        className="bg-gold-600 text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-gold-700 text-sm font-bold shadow-xl"
                    >
                        <Printer size={18}/> IMPRIMIR ORIGINAL
                    </button>
                </div>
            )}
        </div>
    );
  }

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
        <div className="lg:w-1/2 relative bg-slate-100 flex items-center justify-center p-4">
          <div 
            ref={imgContainerRef} 
            className="relative w-full h-auto max-h-[70vh] cursor-none overflow-hidden group"
            onMouseMove={handleMouseMove} // 🛑 ACTIVAR EFECTO LUPA EN MOUSE MOVE
            onMouseEnter={() => setShowZoom(true)} // 🛑 ACTIVAR VISIBILIDAD DE LUPA
            onMouseLeave={() => setShowZoom(false)} // 🛑 DESACTIVAR VISIBILIDAD DE LUPA
          >
            <img 
              src={artwork.image} 
              alt={artwork.title} 
              className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-80"
            />
            
            {/* 🛑 LUPA (Magnifier) */}
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
          <p className="text-sm uppercase tracking-widest text-gold-600 font-semibold mb-4">{artwork.technique}</p>

          <div className="space-y-4 border-y border-stone-200 py-6 mb-8">
            <p className="text-slate-600"><span className="font-bold text-slate-800">Dimensiones:</span> {artwork.dimensions}</p>
            <p className="text-slate-600"><span className="font-bold text-slate-800">Año:</span> {artwork.year}</p>
            <p className="text-slate-600"><span className="font-bold text-slate-800">Disponibilidad:</span> {artwork.status === 'available' ? 'Disponible para colección' : 'En colección privada (Posible Giclée)'}</p>
            {/* 🛑 PRECIO ELIMINADO PARA EL CLIENTE */}
          </div>

          <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Narrativa de la Obra</h3>
          <p className="text-slate-700 leading-relaxed mb-6">{artwork.description}</p>

          <div className="space-y-4 pt-4">
            {/* 1. Botón de Certificado (Demo/Real) */}
            <button
                onClick={() => setShowCertificate(true)}
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