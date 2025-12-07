// ARCHIVO: src/components/PublicSite.tsx (CÓDIGO COMPLETO Y CORREGIDO)

import React, { useState } from 'react';
import { ARTIST_INFO, ARTWORKS, PRICING_TABLE } from '../constants';
import { Mail, Instagram, ExternalLink, Eye, ChevronDown, ChevronUp } from 'lucide-react';

interface PublicSiteProps {
  onOpenCompanion: (id: string) => void;
}

export const PublicSite: React.FC<PublicSiteProps> = ({ onOpenCompanion }) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'bio' | 'prices'>('portfolio');

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <img src="/logo-myriam.png" alt="Myriam Alcaraz Logo" className="h-12 w-auto md:h-16 object-contain" />
            <div className="hidden md:block border-l border-slate-300 pl-4">
              <h1 className="font-serif text-lg tracking-[0.2em] text-slate-900 uppercase">Myriam Alcaraz</h1>
              <p className="text-[10px] text-gold-600 tracking-[0.3em] uppercase">{ARTIST_INFO.tagline}</p>
            </div>
          </div>
          
          {/* Pestañas de Navegación */}
          <div className="flex space-x-2 md:space-x-4">
            <button 
              onClick={() => setActiveTab('portfolio')} 
              className={`text-sm font-semibold uppercase tracking-wider px-3 py-2 transition-colors ${activeTab === 'portfolio' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-600 hover:text-gold-500'}`}
            >
              Portfolio
            </button>
            <button 
              onClick={() => setActiveTab('bio')} 
              className={`text-sm font-semibold uppercase tracking-wider px-3 py-2 transition-colors ${activeTab === 'bio' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-600 hover:text-gold-500'}`}
            >
              Biografía
            </button>
            <button 
              onClick={() => setActiveTab('prices')} 
              className={`text-sm font-semibold uppercase tracking-wider px-3 py-2 transition-colors ${activeTab === 'prices' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-600 hover:text-gold-500'}`}
            >
              Precios
            </button>
          </div>
        </div>
      </nav>
      
      {/* Gallery Section */}
      <main className="max-w-6xl mx-auto px-6 py-12">

        {/* Portfolio / Obras */}
        {activeTab === 'portfolio' && (
          <div className="pt-8">
            {/* ESTE LAYOUT CONFIRMA: 1 columna en móvil, 2 en tablet, 3 en escritorio (LG) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> 
              {ARTWORKS.map(art => (
                <div 
                  key={art.id} 
                  className="bg-white rounded-lg shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden h-64">
                    <img 
                      src={art.image} 
                      alt={art.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  </div>
                  
                  <div className="p-6 text-center">
                    <h3 className="font-serif text-xl font-semibold text-slate-900 mb-1">{art.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">{art.technique} | {art.dimensions}</p>

                    {/* Bloque de Contacto (Opción 1) */}
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
            
            {/* Sección de Comisiones */}
            <div className="mt-16 bg-white p-8 rounded-lg shadow-xl border border-gold-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h4 className="font-serif text-2xl text-slate-900 mb-2">Encargos y Retratos</h4>
                    <p className="text-sm text-slate-600 max-w-xl">
                        Acepto encargos personalizados para coleccionistas privados y estudios de arquitectura.
                        El proceso incluye bocetos previos, cronograma detallado y certificado de autenticidad.
                    </p>
                </div>
                <a 
                    href={`mailto:${ARTIST_INFO.email}`} 
                    className="bg-gold-500 text-white px-8 py-3 hover:bg-gold-600 transition-colors uppercase tracking-widest text-xs font-bold whitespace-nowrap"
                >
                    Solicitar Propuesta
                </a>
            </div>
          </div>
        )}

        {/* Biografía (CORREGIDO PARA INCLUIR LA FOTO) */}
        {activeTab === 'bio' && (
          <div className="pt-8 max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl text-gold-600 mb-6 text-center border-b-2 border-gold-300 inline-block pb-2">Biografía y Declaración Artística</h2>
            <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col md:flex-row gap-8 items-start">
              
              {/* Bloque de Imagen (Añadido) */}
              <div className="w-full md:w-1/3 flex-shrink-0">
                  <img 
                      src="/bio-photo.jpg" 
                      alt="Fotografía de la artista Myriam Alcaraz" 
                      className="w-full h-auto object-cover rounded-lg shadow-lg border-2 border-gold-100"
                  />
                  <p className="text-center text-xs text-slate-500 mt-2 italic">Myriam Alcaraz en su estudio.</p>
              </div>

              {/* Bloque de Texto */}
              <div className="w-full md:w-2/3 text-left">
                <h3 className="font-serif text-xl text-slate-900 mb-3">La Artista</h3>
                <p className="mb-6 leading-relaxed text-slate-700">{ARTIST_INFO.bioShort}</p>
                
                <h3 className="font-serif text-xl text-slate-900 mb-3 border-t border-slate-200 pt-4 mt-4">Declaración Artística (Artist Statement)</h3>
                <p className="italic leading-relaxed text-slate-700">"{ARTIST_INFO.statement}"</p>
              </div>
            </div>
          </div>
        )}

        {/* Precios (Sin cambios) */}
        {activeTab === 'prices' && (
          <div className="pt-8 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl text-gold-600 mb-6 text-center border-b-2 border-gold-300 inline-block pb-2">Valores Orientativos por Formato</h2>
            <div className="bg-white p-8 rounded-lg shadow-xl">
                <p className="text-sm text-slate-600 mb-6 italic border-b border-slate-200 pb-4">
                    Estos precios se basan en un valor base de **2.500 EUR/m²**. El valor final de una pieza única puede variar según la complejidad, el número de figuras, la técnica y el tiempo de ejecución.
                </p>
                
                <div className="grid grid-cols-3 gap-y-3 gap-x-4 font-bold border-b border-slate-300 pb-2 mb-2 text-sm text-slate-800 uppercase tracking-wider">
                    <div>Medidas (cm)</div>
                    <div className="text-right">Precio Base</div>
                    <div className="text-right">Total (IVA incl.)</div>
                </div>
                
                {PRICING_TABLE.map((row, index) => (
                    <div key={index} className="grid grid-cols-3 gap-x-4 py-2 border-b border-slate-100 last:border-b-0 text-slate-700">
                        <div>{row.dimensions}</div>
                        <div className="text-right">{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(row.priceBase)}</div>
                        <div className="text-right font-bold text-gold-600">{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(row.priceWithTax)}</div>
                    </div>
                ))}

                <p className="text-xs text-slate-500 mt-6 pt-4 border-t border-slate-200">
                    * El precio Base no incluye el Impuesto sobre el Valor Añadido (IVA). El tipo aplicable en España es del 21%.
                </p>
            </div>
            
            {/* CTA para Comisiones */}
            <div className="mt-8 text-center">
                <p className="text-slate-600 mb-4">¿Necesita un formato o tema específico?</p>
                <a 
                    href={`mailto:${ARTIST_INFO.email}`} 
                    className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-full uppercase tracking-widest text-sm font-bold hover:bg-slate-700 transition-colors shadow-lg"
                >
                    Solicitar Presupuesto Personalizado
                </a>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white text-slate-500 py-16 text-center border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <img src="/logo-myriam.png" alt="Logo Footer" className="h-12 w-auto mx-auto mb-6 opacity-50 grayscale" />
          <div className="flex justify-center gap-8 mb-8">
            <a href={`https://instagram.com/${ARTIST_INFO.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold-600 transition-colors"><Instagram size={18} /></a>
            <a href={`mailto:${ARTIST_INFO.email}`} className="hover:text-gold-600 transition-colors"><Mail size={18} /></a>
            <a href={`https://${ARTIST_INFO.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold-600 transition-colors"><ExternalLink size={18} /></a>
          </div>
          <p className="text-[10px] opacity-40 uppercase tracking-wide">© {new Date().getFullYear()} Myriam Alcaraz Art | Todos los derechos reservados.</p>
        </div>
      </footer>

    </div>
  );
};