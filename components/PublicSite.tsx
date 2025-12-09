import React, { useState } from 'react';
import { ARTIST_INFO, ARTWORKS, PRICING_TABLE } from '../constants';
import { Mail, Instagram, ExternalLink, Eye } from 'lucide-react';

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
              <p className="text-[10px] text-gold-600 tracking-[0.3em] uppercase">Artista Figurativa</p>
            </div>
          </div>
          
          {/* Botones de Navegación */}
          <div className="flex space-x-4 md:space-x-8 text-sm font-semibold uppercase tracking-wide">
            <button 
              onClick={() => setActiveTab('portfolio')} 
              className={`pb-1 transition-colors ${activeTab === 'portfolio' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Portfolio
            </button>
            <button 
              onClick={() => setActiveTab('bio')} 
              className={`pb-1 transition-colors ${activeTab === 'bio' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Biografía
            </button>
            <button 
              onClick={() => setActiveTab('prices')} 
              className={`pb-1 transition-colors ${activeTab === 'prices' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Precios
            </button>
          </div>

          {/* Iconos de Contacto */}
          <div className="flex gap-4">
            <a href={`mailto:${ARTIST_INFO.email}`} aria-label="Email" className="text-slate-500 hover:text-gold-600 transition-colors"><Mail size={20} /></a>
            <a href={`https://instagram.com/${ARTIST_INFO.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-500 hover:text-gold-600 transition-colors"><Instagram size={20} /></a>
            <a href={ARTIST_INFO.website} target="_blank" rel="noopener noreferrer" aria-label="Website" className="text-slate-500 hover:text-gold-600 transition-colors"><ExternalLink size={20} /></a>
          </div>
        </div>
      </nav>
      
      {/* Contenido Principal */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Pestaña de Portfolio */}
        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
            {ARTWORKS.map(artwork => (
              <div key={artwork.id} className="bg-white shadow-xl rounded-lg overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02] duration-300">
                <div className="relative overflow-hidden">
                    <img 
                      src={artwork.image} 
                      alt={artwork.title} 
                      className="w-full h-80 object-cover transition-opacity duration-500 group-hover:opacity-90"
                    />
                    <button 
                        onClick={() => onOpenCompanion(artwork.id)}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-lg font-bold uppercase tracking-wider"
                    >
                        <Eye size={24} className="mr-2" /> Ver Detalles
                    </button>
                </div>
                <div className="p-4">
                  <h2 className="font-serif text-xl font-bold text-slate-900">{artwork.title}</h2>
                  <p className="text-sm text-slate-600 mt-1">{artwork.dimensions} | {artwork.technique}</p>
                  <p className={`mt-2 text-xs font-semibold uppercase ${artwork.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                      {artwork.status === 'available' ? `Disponible: ${artwork.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}` : 'Vendida'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =======================================================
           🛑 SECCIÓN BIOGRAFÍA (TAB: BIO) - ¡CORREGIDA Y ROBUSTA!
           ======================================================= */}
        {activeTab === 'bio' && (
          <div className="pt-6">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2">
                <h2 className="font-serif text-3xl font-bold mb-4">Sobre {ARTIST_INFO.name}</h2>
                <p className="text-slate-600 mb-6 leading-relaxed">{ARTIST_INFO.bioShort}</p>
                
                <h3 className="font-serif text-xl font-bold mt-8 mb-4 border-b pb-2">Declaración Artística (Statement)</h3>
                <p className="italic text-slate-700 leading-relaxed border-l-4 border-gold-500/50 pl-4 py-1">{ARTIST_INFO.statement}</p>
              </div>

              <div className="md:col-span-1">
                <img src="/artist_profile.jpg" alt={ARTIST_INFO.name} className="w-full h-auto object-cover shadow-xl rounded-lg border-4 border-gold-500/10" />
              </div>
            </div>

            <hr className="my-12 border-stone-200" />
            
            {/* TRAYECTORIA (Accolades & Publications) */}
            <div className="grid md:grid-cols-2 gap-10">
              
              {/* Columna de ACLAIMACIONES/EXPOSICIONES */}
              <div>
                <h3 className="font-serif text-xl font-bold mb-4 text-gold-600">Aclamaciones y Exhibiciones</h3>
                
                {/* EXPOSICIONES */}
                {ARTIST_INFO.accolades && ARTIST_INFO.accolades.exposiciones && ARTIST_INFO.accolades.exposiciones.length > 0 && (
                    <>
                        <h4 className="font-bold mt-6 mb-2 text-slate-700">Exposiciones Colectivas</h4>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                            {ARTIST_INFO.accolades.exposiciones.map((item, index) => (
                                <li key={`exp-${index}`}>{item}</li>
                            ))}
                        </ul>
                    </>
                )}

                {/* CONCURSOS */}
                {ARTIST_INFO.accolades && ARTIST_INFO.accolades.concursos && ARTIST_INFO.accolades.concursos.length > 0 && (
                    <>
                        <h4 className="font-bold mt-6 mb-2 text-slate-700">Concursos y Finalistas</h4>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                            {ARTIST_INFO.accolades.concursos.map((item, index) => (
                                <li key={`conc-${index}`}>{item}</li>
                            ))}
                        </ul>
                    </>
                )}
                
                {/* Mensaje de no datos si ambos están vacíos */}
                {(!ARTIST_INFO.accolades || ARTIST_INFO.accolades.exposiciones?.length === 0) && ARTIST_INFO.accolades.concursos?.length === 0 && (
                    <p className="text-sm text-slate-400 italic mt-4">No hay datos de trayectoria disponibles en este momento.</p>
                )}
              </div>

              {/* Columna de PUBLICACIONES */}
              <div>
                <h3 className="font-serif text-xl font-bold mb-4 text-gold-600">Publicaciones</h3>
                {ARTIST_INFO.publications && ARTIST_INFO.publications.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                        {ARTIST_INFO.publications.map((item, index) => (
                            <li key={`pub-${index}`}>{item}</li>
                        ))}
                    </ul>
                ) : (
                  <p className="text-sm text-slate-400 italic mt-4">No hay publicaciones listadas en este momento.</p>
                )}
              </div>
            </div>
            
          </div>
        )}
        
        {/* Pestaña de Precios */}
        {activeTab === 'prices' && (
          <div className="pt-6">
            <h2 className="font-serif text-3xl font-bold mb-6">Lista de Precios y Dimensiones</h2>
            <p className="text-slate-600 mb-8 max-w-2xl">
              La siguiente tabla es una