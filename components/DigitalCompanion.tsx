import React, { useState } from 'react';
import { ARTWORKS } from '../constants'; // Asumimos esta importación
import { X, Shield, Layout, ZoomIn, Info, Globe, Mail } from 'lucide-react';

// 🛑 Interfaz de Propiedades: Incluye el prop de seguridad que pasamos desde App.tsx
interface DigitalCompanionProps {
  artworkId: string;
  onClose: () => void;
  showCertificateAccess: boolean; // TRUE solo en MODO ESTUDIO
}

export const DigitalCompanion: React.FC<DigitalCompanionProps> = ({ 
    artworkId, 
    onClose,
    showCertificateAccess // 🛑 Recibimos el prop
}) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  
  const artwork = ARTWORKS.find(a => a.id === artworkId);
  
  if (!artwork) return null;

  // Renderizado del Certificado (Lo mantenemos para el modo ESTUDIO)
  const renderCertificate = () => (
    <div className="bg-white p-6 md:p-12 max-w-4xl mx-auto shadow-2xl relative">
      <h2 className="text-3xl font-serif font-bold text-slate-800 mb-6 border-b pb-2">Certificado Digital (COA)</h2>
      
      {/* 🛑 AVISO DE USO (SOLO PARA EL ARTISTA) */}
      <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-900 p-4 mb-6" role="alert">
        <p className="font-bold flex items-center gap-2"><Alert size={16}/> USO EXCLUSIVO</p>
        <p className="text-sm">Este certificado es visible aquí solo para gestión. El COA físico debe ser adjuntado en el envío.</p>
      </div>

      <p className="text-sm text-slate-700">Aquí se mostraría el PDF/HTML del certificado real de la obra <strong>"{artwork.title}"</strong>.</p>
      <p className="mt-4 text-xs text-slate-500">ID de Registro Único: <strong>{artwork.registryId || 'N/A'}</strong></p>
      
      {/* Botón de impresión/descarga, solo para el artista */}
      <div className="mt-6 text-right">
        <button onClick={() => alert('Simulando impresión/descarga del COA...')} className="bg-gold-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gold-700 text-sm font-bold shadow-lg">
            <Printer size={16}/> Imprimir COA
        </button>
      </div>

    </div>
  );

  // Modal principal del Compañero Digital
  return (
    <div className="fixed inset-0 z-[10000] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300">
      
      {/* Modal Content */}
      <div className={`bg-white rounded-xl shadow-2xl max-h-[95vh] w-full max-w-4xl relative transition-all duration-500 ${showCertificate ? 'scale-100' : 'scale-95'}`}>
        
        {/* Botón de Cierre */}
        <button onClick={onClose} className="absolute top-4 right-4 z-50 bg-slate-800 text-white p-2 rounded-full hover:bg-red-500 transition-colors"><X size={20} /></button>
        
        {showCertificate ? (
            // 🛑 VISTA DEL CERTIFICADO (Solo accesible si showCertificateAccess es TRUE)
            renderCertificate()
        ) : (
            // VISTA PÚBLICA / BÁSICA
            <div className="p-6 md:p-8 overflow-y-auto">
                <header className="mb-6 border-b pb-4">
                    <h1 className="text-2xl font-serif font-bold text-slate-800">{artwork.title}</h1>
                    <p className="text-sm text-slate-500">{artwork.artistName} • {artwork.year}</p>
                </header>

                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* COLUMNA 1 & 2: IMAGEN CON ZOOM */}
                    <div className="lg:col-span-2 relative">
                        <div className={`aspect-[4/3] bg-slate-100 overflow-hidden rounded-lg shadow-inner ${showZoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`} onClick={() => setShowZoom(!showZoom)}>
                            <img 
                                src={artwork.image} 
                                alt={artwork.title} 
                                className={`w-full h-full object-cover transition-transform duration-500 ${showZoom ? 'scale-[1.5] translate-x-[20%] translate-y-[10%]' : 'scale-100'}`} // 🛑 Efecto Lupa/Zoom
                            />
                        </div>
                        <button 
                            onClick={() => setShowZoom(!showZoom)} 
                            className="absolute bottom-4 right-4 bg-slate-800 text-white p-3 rounded-full shadow-lg hover:bg-gold-500 transition-colors"
                            title={showZoom ? "Reducir Zoom" : "Activar Lupa"}
                        >
                            <ZoomIn size={18} />
                        </button>
                    </div>

                    {/* COLUMNA 3: DETALLES Y ACCIONES */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* 1. DETALLES BÁSICOS (Públicos) */}
                        <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                            <h3 className="flex items-center gap-2 font-bold text-slate-800 mb-3 border-b pb-2"><Info size={18} className="text-gold-500"/> Ficha Técnica</h3>
                            <p className="text-sm text-slate-600 mb-2">Técnica: {artwork.medium}</p>
                            <p className="text-sm text-slate-600 mb-2">Dimensiones: {artwork.dimensions}</p>
                            <p className="text-sm text-slate-600">Año: {artwork.year}</p>
                        </div>

                        {/* 🛑 DOCUMENTACIÓN DE PROPIEDAD Y CERTIFICADOS (OCULTO AL PÚBLICO) */}
                        {showCertificateAccess && (
                            <div className="bg-slate-800 text-white p-4 rounded-lg shadow-xl">
                                <h3 className="flex items-center gap-2 font-bold text-gold-500 mb-3 border-b border-slate-700 pb-2"><Shield size={18}/> Documentación de Propiedad</h3>
                                <p className="text-sm text-slate-400 mb-4">ID de Registro Único: <strong className="text-white">{artwork.registryId || 'N/A'}</strong></p>
                                
                                {/* 🛑 BOTÓN DE CERTIFICADO (SOLO EN MODO ESTUDIO) */}
                                <button 
                                    onClick={() => setShowCertificate(true)} 
                                    className="w-full flex items-center justify-center gap-2 bg-gold-600 hover:bg-gold-700 text-white font-bold py-2 rounded transition-colors text-sm"
                                >
                                    <FileText size={16} /> Ver Certificado Digital
                                </button>
                            </div>
                        )}
                        
                        {/* OTROS ENLACES (Si son públicos) */}
                        <div className="space-y-2">
                            <a href={artwork.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 hover:text-gold-600 transition-colors text-sm">
                                <Globe size={16} /> Más información en la web
                            </a>
                            <a href={`mailto:tu_email@ejemplo.com?subject=Consulta sobre ${artwork.title}`} className="flex items-center gap-3 text-slate-600 hover:text-gold-600 transition-colors text-sm">
                                <Mail size={16} /> Contactar sobre esta obra
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};