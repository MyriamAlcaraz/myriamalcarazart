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
              <p className="text-[10px] text-gold-600 tracking-[0.3em] uppercase">Artista Figurativa Contemporánea</p>
            </div>
          </div>
          <div className="flex gap-6 text-xs md:text-sm font-medium tracking-widest">
            <button 
              onClick={() => setActiveTab('portfolio')}
              className={`${activeTab === 'portfolio' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-900'} transition-all pb-1`}
            >
              OBRA
            </button>
            <button 
              onClick={() => setActiveTab('bio')}
              className={`${activeTab === 'bio' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-900'} transition-all pb-1`}
            >
              ARTISTA
            </button>
            <button 
              onClick={() => setActiveTab('prices')}
              className={`${activeTab === 'prices' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-900'} transition-all pb-1`}
            >
              ADQUISICIÓN
            </button>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* HERO SECTION */}
        {activeTab === 'portfolio' && (
          <div className="mb-16 text-center animate-fade-in-up">
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 mb-6 italic font-light">
              "Arte con alma y sofisticación"
            </h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 font-light leading-relaxed">
              Pintura figurativa contemporánea que captura la intimidad, la luz y la atmósfera.
            </p>
          </div>
        )}

        {/* PORTFOLIO GRID - SINGLE COLUMN */}
        {activeTab === 'portfolio' && (
          <div className="flex flex-col gap-32 max-w-4xl mx-auto pb-32">
            {ARTWORKS.map((art) => (
              <div key={art.id} className="group">
                {/* Frame Effect */}
                <div className="relative p-4 bg-white shadow-xl shadow-stone-300/50 transition-all duration-500">
                    <div className="relative overflow-hidden bg-stone-100">
                    <img 
                        src={art.image} 
                        alt={art.title}
                        className="w-full h-auto object-contain block"
                    />
                    </div>
                </div>
                
                {/* Info Section */}
                <div className="mt-8 text-center px-4">
                  <h3 className="font-serif text-3xl text-slate-900 mb-3">{art.title}</h3>
                  <div className="w-16 h-px bg-gold-400 mx-auto mb-4"></div>
                  
                  <p className="text-slate-600 font-serif italic mb-6 max-w-2xl mx-auto leading-relaxed text-lg">
                    <span dangerouslySetInnerHTML={{__html: art.description.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="text-gold-600 hover:underline border-b border-gold-300">$1</a>')}}></span>
                  </p>
                  
                  <div className="flex flex-col gap-2 items-center text-sm tracking-wide text-slate-500">
                    <p className="uppercase">{art.technique}</p>
                    <div className="flex gap-3 text-gold-600 font-bold">
                        <span>{art.dimensions}</span>
                        <span>•</span>
                        <span>{art.year || '2025'}</span>
                    </div>

                    {/* ✅ CTA de Contacto/Disponibilidad (YA MODIFICADO) */}
                    {art.status === 'sold' ? (
                        <span className="mt-2 bg-slate-900 text-white px-6 py-1 text-xs uppercase tracking-widest">
                            Colección Privada
                        </span>
                    ) : (
                        <div className="text-center mt-4">
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
                    )}
                    {/* FIN DEL CTA */}

                    {/* Botón DEMO Experiencia Digital */}
                    <button 
                      onClick={() => onOpenCompanion(art.id)}
                      className="mt-4 flex items-center gap-2 text-[10px] text-slate-400 hover:text-gold-600 transition-colors border border-slate-200 px-3 py-1 rounded-full hover:border-gold-400"
                    >
                      <Eye size={12} /> VER EXPERIENCIA DIGITAL (DEMO)
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BIO SECTION */}
        {activeTab === 'bio' && (
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start animate-fade-in pb-32">
            <div className="relative sticky top-32">
              <div className="absolute inset-0 border-2 border-gold-500 transform translate-x-4 translate-y-4"></div>
              {/* ✅ CORRECCIÓN: Revertido el src al path original del usuario para asegurar que la imagen cargue. */}
              <img 
                src="/obras/ARTISTA.jpg" 
                alt="Myriam Alcaraz" 
                className="relative z-10 shadow-lg w-full grayscale hover:grayscale-0 transition-all duration-700 object-cover aspect-[3/4]" 
              />
            </div>
            <div>
              <h2 className="font-serif text-4xl text-slate-900 mb-6">Biografía & Statement</h2>
              <p className="text-slate-600 leading-relaxed mb-6 font-light">
                {ARTIST_INFO.bioShort}
              </p>
              <div className="bg-white p-8 border-l-2 border-gold-500 shadow-sm mb-10 italic text-slate-700 font-serif leading-loose">
                "{ARTIST_INFO.statement}"
              </div>
              
              <div className="bg-stone-50 p-6 rounded-sm border border-stone-200">
                <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs border-b border-slate-200 pb-2">Trayectoria & Reconocimientos</h3>
                <ul className="space-y-4 text-slate-600 text-sm">
                  <li className="flex gap-3">
                    <span className="text-gold-500 mt-1">✦</span>
                    <div>
                      <strong className="text-slate-800 block">Seleccionada 92 Salón de Otoño (Casa de Vacas, Madrid)</strong>
                      <span className="italic text-slate-500">Obra: "Sara en Marquesina"