import React, { useState } from 'react';
import { ARTWORKS } from '../constants'; 
import { X, Shield, Layout, ZoomIn, Info, Globe, Mail, FileText, Printer, AlertTriangle } from 'lucide-react'; // Añadimos AlertTriangle

// Interfaz de Propiedades: Incluye el prop de seguridad que pasamos desde App.tsx
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
  const [showCertificate, setShowCertificate] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  
  const artwork = ARTWORKS.find(a => a.id === artworkId);
  
  if (!artwork) return null;

  // Renderizado del Certificado (Lo mantenemos para el modo ESTUDIO)
  const renderCertificate = () => (
    // 🛑 Modificamos el contenedor para centrar la vista de documento
    <div className="bg-white p-6 md:p-12 mx-auto shadow-2xl relative w-full h-[80vh] overflow-y-auto"> 
      <h2 className="text-3xl font-serif font-bold text-slate-800 mb-6 border-b pb-2">Certificado Digital (COA)</h2>
      
      {/* AVISO DE USO (SOLO PARA EL ARTISTA) */}
      <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-900 p-4 mb-6" role="alert">
        <p className="font-bold flex items-center gap-2"><AlertTriangle size={16}/> USO EXCLUSIVO</p>
        <p className="text-sm">Este certificado es visible aquí solo para gestión. El COA físico debe ser adjuntado en el envío.</p>
      </div>

      {/* 🛑 El contenido real del certificado (que se ve en el ESTUDIO) se simula aquí */}
      <div className="bg-slate-100 border border-slate-300 p-6 rounded-lg text-center text-slate-600">
          <p className="font-bold mb-2">Previsualización del Documento (COA)</p>
          <p className="text-xs italic">El documento para imprimir/descargar se gestiona desde la sección KIT.</p>
      </div>

    </div>
  );

  // Modal principal del Compañero Digital
  return (
    <div className="fixed inset-0 z-[10000] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300">
      
      {/* 🛑 Aumentado el tamaño máximo del modal */}
      <div className={`bg-white rounded-xl shadow-2xl max-h-[95vh] w-full max-w-6xl relative transition-all duration-500 ${showCertificate ? 'scale-100' : 'scale-95'}`}>
        
        {/* Botón de Cierre */}
        <button onClick={onClose} className="absolute top-4 right-4 z-50 bg-slate-800 text-white p-2 rounded-full hover:bg-red-500 transition-colors"><X size={20} /></button>
        
        {showCertificate ? (
            // VISTA DEL CERTIFICADO (Solo accesible si showCertificateAccess es TRUE)
            renderCertificate()
        ) : (
            // VISTA PÚBLICA / BÁSICA
            <div className="p-6 md:p-8 overflow-y-auto">
                <header className="mb-6 border-b pb-4">
                    <h1 className="text-2xl font-serif font-bold text-slate-800">{artwork.title}</h1>
                    <p className="text-sm text-slate-500">{artwork.artistName} • {artwork.year}</p>
                </header>

                {/* 🛑 Grid modificado: Imagen ocupa 3/4 */}
                <div className="grid lg:grid-cols-4 gap-8">
                    
                    {/* COLUMNA 1-3: IMAGEN CON ZOOM (LUPA) */}
                    <div className="lg:col-span-3 relative">
                        <div className={`aspect-[4/3] bg-slate-100 overflow-hidden rounded-lg shadow-inner ${showZoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`} onClick={() => setShowZoom(!showZoom)}>
                            <img 
                                src={artwork.image} 
                                alt={artwork.title} 
                                className={`w-full h-full object-cover transition-transform duration-500 origin-center ${showZoom ? 'scale-[1.8]' : 'scale-100'}`} // 🛑 ZOOM MÁS GRANDE Y CENTRADO
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

                    {/* COLUMNA 4: DETALLES Y ACCIONES */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* 1. DETALLES BÁSICOS (Públicos) */}
                        <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                            <h3 className="flex items-center gap-2 font-bold text-slate-800 mb-3 border-b pb-2"><Info size={18} className="text-gold-500"/> Ficha Técnica</h3>
                            <p className="text-sm text-slate-600 mb-2">Técnica: {artwork.medium}</p>
                            <p className="text-sm text-slate-600 mb-2">Dimensiones: {artwork.dimensions}</p>
                            <p className="text-sm text-slate-600">Año: {artwork.year}</p>
                        </div>

                        {/* DOCUMENTACIÓN DE PROPIEDAD Y CERTIFICADOS (SOLO EN MODO ESTUDIO) */}
                        {showCertificateAccess && (
                            <div className="bg-slate-800 text-white p-4 rounded-lg shadow-xl">
                                <h3 className="flex items-center gap-2 font-bold text-gold-500 mb-3 border-b border-slate-700 pb-2"><Shield size={18}/> Documentación de Propiedad</h3>
                                <p className="text-sm text-slate-400 mb-4">ID de Registro Único: <strong className="text-white">{artwork.registryId || 'N/A'}</strong></p>
                                
                                {/* BOTÓN DE CERTIFICADO (SOLO EN MODO ESTUDIO) */}
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