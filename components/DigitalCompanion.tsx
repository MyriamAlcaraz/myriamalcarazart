// ARCHIVO: ./components/DigitalCompanion.tsx - CÓDIGO FINAL Y CONECTADO

import React, { useState, useRef } from 'react';
// 🛑 ELIMINADA: La importación del componente Certificate ya no es necesaria aquí.
import { Shield, Image as ImageIcon, ZoomIn, Printer, X, AlertTriangle, Mail, Lock, CheckCircle } from 'lucide-react'; 
import { ARTWORKS, ARTIST_INFO } from '../constants';
// No importar Certificate.

interface DigitalCompanionProps {
  artworkId: string | null;
  onClose: () => void;
  showCertificateAccess: boolean; // TRUE solo en MODO ESTUDIO
  initialMode?: 'lupa' | 'certificate'; 
  // 🛑 NUEVO PROP: Función para abrir el modal del certificado bonito (gestionado por App.tsx)
  onOpenCertificateDemo: () => void; 
}

export const DigitalCompanion: React.FC<DigitalCompanionProps> = ({ 
    artworkId, 
    onClose,
    showCertificateAccess, 
    initialMode = 'lupa',
    onOpenCertificateDemo // 🛑 Nuevo prop
}) => {
  const artwork = ARTWORKS.find(a => a.id === artworkId) || ARTWORKS[0];
  
  // 🛑 ELIMINADA: Ya no se necesita el estado interno del certificado. Lo gestiona App.tsx.
  // const [showCertificate, setShowCertificate] = useState(initialMode === 'certificate');
  
  const [showZoom, setShowZoom] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const imgContainerRef = useRef<HTMLDivElement>(null);

  const displayYear = artwork.year && artwork.year.toString().trim() !== '' 
                      ? artwork.year 
                      : '2025'; 
  
  // --- Lógica de la lupa (Se mantiene) ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgContainerRef.current) return;
    const { left, top, width, height } = imgContainerRef.current.getBoundingClientRect();
    
    let x = e.clientX - left; 
    let y = e.clientY - top;

    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    setZoomStyle({
      transformOrigin: `${xPercent}% ${yPercent}%`,
    });
    setShowZoom(true); 
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
    setZoomStyle({});
  };
  // ----------------------------------------


  // 🛑 ELIMINADA: La lógica condicional del renderizado de Certificado ya no está aquí.
  // Se renderiza directamente el contenido del Companion.
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full h-[90vh] flex flex-col relative animate-scale-in">
            
            {/* Encabezado y Botón X */}
            <header className="flex justify-between items-center p-4 border-b border-stone-100">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                    <ImageIcon size={22} className="text-gold-500" /> Compañero Digital
                </h2>
                <button 
                    onClick={onClose} 
                    className="p-1 rounded-full text-slate-400 hover:text-red-500 transition-colors"
                >
                    <X size={24} />
                </button>
            </header>
            
            {/* Contenido Principal */}
            <div className="flex flex-1 overflow-hidden">
                
                {/* Panel Izquierdo: Imagen */}
                <div className="w-2/3 relative flex items-center justify-center bg-slate-50 border-r border-slate-100 p-6">
                    
                    {/* Contenedor de la Imagen con Lupa */}
                    <div 
                        ref={imgContainerRef}
                        className="w-full h-full max-w-[800px] max-h-[800px] cursor-zoom-in relative overflow-hidden rounded-lg shadow-lg"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            src={artwork.image}
                            alt={artwork.title}
                            className={`w-full h-full object-contain transition-transform duration-300 ${showZoom ? 'scale-[2.0]' : 'scale-100'}`}
                            style={zoomStyle}
                        />
                        
                        {/* Indicador de Lupa */}
                        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full flex items-center gap-2">
                            <ZoomIn size={14} /> Mover el ratón para hacer zoom
                        </div>
                    </div>
                </div>

                {/* Panel Derecho: Info y CTA */}
                <div className="w-1/3 p-6 flex flex-col overflow-y-auto">
                    
                    <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">{artwork.title}</h1>
                    <p className="text-gold-600 font-semibold mb-6">{artwork.technique}</p>

                    <div className="space-y-2 mb-6 border-b pb-4">
                        <p className="text-slate-600"><span className="font-bold text-slate-800">Dimensiones:</span> {artwork.dimensions}</p>
                        <p className="text-slate-600"><span className="font-bold text-slate-800">Año:</span> {displayYear}</p>
                        <p className="text-slate-600">
                            <span className="font-bold text-slate-800">Disponibilidad:</span> 
                            <span className={artwork.status === 'available' ? 'text-green-600 font-semibold ml-1' : 'text-orange-600 font-semibold ml-1'}>
                                {artwork.status === 'available' ? 'Disponible para colección' : 'En colección privada (Posible Giclée)'}
                            </span>
                        </p>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Narrativa de la Obra</h3>
                    <p className="text-slate-700 leading-relaxed mb-6 flex-1">{artwork.description}</p> 

                    <div className="space-y-4 pt-4 border-t border-stone-100 mt-auto">
                        
                        {/* 1. Botón de Certificado (Ahora llama a onOpenCertificateDemo) */}
                        <button
                            onClick={onOpenCertificateDemo} // 🛑 CORRECCIÓN CLAVE
                            className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white p-3 rounded font-bold hover:bg-gold-600 transition-colors shadow-md"
                            title="Abre la simulación del certificado de autenticidad final."
                        >
                            <Shield size={18} /> {showCertificateAccess ? 'Generar Certificado Digital' : 'Ver Demo Certificado'}
                        </button>

                        {/* 2. Botón de Consulta / Venta */}
                        <a 
                            href={`mailto:${ARTIST_INFO.email}?subject=Consulta de Obra: ${artwork.title}`}
                            className="w-full flex items-center justify-center gap-2 bg-gold-500 text-white p-3 rounded font-bold hover:bg-gold-600 transition-colors shadow-md"
                        >
                            <Mail size={18} /> Consultar Adquisición
                        </a>
                        
                        {/* 3. Indicador de Acceso a Certificado Real (Solo en Modo Estudio) */}
                        {showCertificateAccess && (
                            <div className="text-xs text-center text-gold-700 bg-gold-50 p-2 rounded-lg flex items-center justify-center gap-2">
                                <Lock size={14} /> Modo ESTUDIO: Certificado real disponible en Dashboard
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 🛑 ELIMINADA: El modal del certificado YA NO se renderiza aquí. */}

        </div>
    </div>
  );
};