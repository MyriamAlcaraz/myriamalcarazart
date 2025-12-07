// ARCHIVO: src/components/PublicSite.tsx (Solo la sección modificada)

import React, { useState } from 'react';
import { ARTIST_INFO, ARTWORKS, PRICING_TABLE } from '../constants';
// Importamos Mail de lucide-react para el icono del botón
import { Mail, Instagram, ExternalLink, Eye } from 'lucide-react'; 

interface PublicSiteProps {
  onOpenCompanion: (id: string) => void;
}

export const PublicSite: React.FC<PublicSiteProps> = ({ onOpenCompanion }) => {
// ... (El resto del código inicial del componente queda igual)

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800">
      
      {/* Navigation (código anterior) */}
      
      {/* Gallery Section */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* ... (Pestañas de navegación y contenido de Biografía/Precios) ... */}

        {/* Portfolio / Obras */}
        {activeTab === 'portfolio' && (
          <div className="pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {ARTWORKS.map(art => (
                <div 
                  key={art.id} 
                  className="bg-white rounded-lg shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* ... (Bloque de la imagen y el título queda igual) ... */}
                  
                  <div className="p-6 text-center">
                    <h3 className="font-serif text-xl font-semibold text-slate-900 mb-1">{art.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">{art.technique} | {art.dimensions}</p>

                    {/* 🛑 INICIO DEL BLOQUE MODIFICADO (Sustituye al Precio) 🛑 */}
                    <div className="text-center mb-4">
                        <p className="text-sm font-bold text-slate-700 mb-2">Obra Disponible.</p>
                        <a 
                            href={`mailto:${ARTIST_INFO.email}?subject=Consulta%20sobre%20la%20obra%20"${art.title}"`} 
                            className="inline-flex items-center gap-2 bg-gold-500 text-white px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-gold-600 transition-colors shadow-md"
                        >
                            Contacto
                            <Mail size={16} />
                        </a>
                        <p className="text-[10px] text-slate-500 mt-1">Consulte su disponibilidad y detalles para incorporación a colección.</p>
                    </div>
                    {/* 🛑 FIN DEL BLOQUE MODIFICADO 🛑 */}


                    <button 
                      onClick={() => onOpenCompanion(art.id)}
                      className="mt-4 flex items-center justify-center w-full text-xs text-gold-600 border border-gold-400 hover:bg-gold-50 transition-colors py-2 rounded-lg gap-2"
                    >
                      <Eye size={14} /> Ver Ficha Digital
                    </button>

                  </div>
                </div>
              ))}
            </div>
            
            {/* ... (Sección de Comisiones queda igual) ... */}
            
          </div>
        )}
        
        {/* ... (Contenido de Biografía y Precios queda igual) ... */}

      </main>

      {/* Footer (código anterior) */}

    </div>
  );
};