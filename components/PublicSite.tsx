import React, { useState } from 'react';
import { ARTIST_INFO, ARTWORKS } from '../constants';
import { Eye, Lock, Layout } from 'lucide-react';

interface PublicSiteProps {
  onOpenCompanion: (id: string) => void;
  onOpenStudioLogin: () => void;
  onOpenGiclee: () => void;
  onTabChange?: (tab: 'portfolio' | 'bio' | 'prices' | 'app') => void;
}

const AccoladeList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
    {items.map((item, index) => (
      <li key={index} className="pl-1 leading-relaxed">{item}</li>
    ))}
  </ul>
);

const PublicSite: React.FC<PublicSiteProps> = ({ onOpenCompanion, onOpenStudioLogin, onOpenGiclee, onTabChange }) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'bio' | 'prices' | 'app'>('portfolio');

  const handleTabChange = (tab: 'portfolio' | 'bio' | 'prices' | 'app') => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

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
          {/* Main Tabs */}
          <div className="flex gap-1 md:gap-4 text-sm font-semibold">
            <button
              onClick={() => handleTabChange('portfolio')}
              className={`px-3 py-1 md:px-4 md:py-2 transition-colors ${activeTab === 'portfolio' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              PORTFOLIO
            </button>
            <button
              onClick={() => handleTabChange('bio')}
              className={`px-3 py-1 md:px-4 md:py-2 transition-colors ${activeTab === 'bio' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              TRAYECTORIA & BIO
            </button>
            <button
              onClick={() => handleTabChange('prices')}
              className={`px-3 py-1 md:px-4 md:py-2 transition-colors ${activeTab === 'prices' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              ENCARGOS & PRECIOS
            </button>
            <button
              onClick={onOpenGiclee}
              className="px-3 py-1 md:px-4 md:py-2 transition-colors text-slate-500 hover:text-slate-800"
            >
              GICLÉE
            </button>
            <button
              onClick={() => handleTabChange('app')}
              className={`px-3 py-1 md:px-4 md:py-2 transition-colors ${activeTab === 'app' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              ESTUDIO DIGITAL
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* ========================================= */}
        {/* PORTFOLIO TAB */}
        {/* ========================================= */}
        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ARTWORKS.map(artwork => (
              <div key={artwork.id} className="group relative overflow-hidden bg-white shadow-lg border border-stone-100">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="font-serif text-lg font-semibold text-slate-800 truncate">{artwork.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{artwork.dimensions} | {artwork.technique}</p>
                </div>
                {/* Overlay for Detail View */}
                <button
                  onClick={() => onOpenCompanion(artwork.id)}
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Eye size={36} className="text-white" />
                  <span className="sr-only">Ver detalles de {artwork.title}</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ========================================= */}
        {/* BIO & TRAYECTORIA TAB */}
        {/* ========================================= */}
        {activeTab === 'bio' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <h2 className="font-serif text-4xl font-bold text-slate-900 mb-6">Biografía</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">{ARTIST_INFO.bioShort}</p>
              <h3 className="text-xl font-semibold mb-3">Declaración del Artista</h3>
              <p className="text-slate-600 leading-relaxed mb-8 font-serif italic border-l-2 border-gold-500 pl-4">"{ARTIST_INFO.statement}"</p>
              <div className="space-y-3">
                <a href={`mailto:${ARTIST_INFO.email}`} className="flex items-center gap-2 text-slate-600 hover:text-gold-600 transition-colors text-sm">
                  {ARTIST_INFO.email}
                </a>
                <a href={`https://www.instagram.com/${ARTIST_INFO.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-gold-600 transition-colors text-sm">
                  {ARTIST_INFO.instagram}
                </a>
              </div>
            </div>
            <div className="md:col-span-2 space-y-10">
              <div className="flex justify-between items-start relative">
                <h2 className="font-serif text-4xl font-bold text-slate-900">Trayectoria & Reconocimientos</h2>
                <div className="w-60 h-60 overflow-hidden rounded-lg shadow-lg border-2 border-stone-200 ml-4 group transition-all duration-300 hover:shadow-xl">
                  <img src="/obras/ARTISTA.jpg" alt="Retrato de la Artista" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-semibold text-gold-600 mb-4">Exposiciones Colectivas</h3>
                <AccoladeList items={ARTIST_INFO.accolades.exposiciones} />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-semibold text-gold-600 mb-4">Concursos y Premios</h3>
                <AccoladeList items={ARTIST_INFO.accolades.concursos} />
              </div>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* ENCARGOS Y PRECIOS TAB */}
        {/* ========================================= */}
        {activeTab === 'prices' && (
          <div className="space-y-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-5xl font-bold text-slate-900 mb-4">El Arte de Coleccionar</h2>
              <p className="text-slate-700 leading-relaxed mt-6">Explora mi galería de obras únicas o solicita un encargo personalizado.</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white text-slate-500 py-16 text-center border-t border-slate-100 relative">
        <div className="max-w-4xl mx-auto px-6">
          <img src="/logo-myriam.png" alt="Logo Footer" className="h-12 w-auto mx-auto mb-6 opacity-50 grayscale" />
          <p className="text-[10px] opacity-40 uppercase tracking-wide">© 2025 Myriam Alcaraz.</p>
        </div>
        <button onClick={onOpenStudioLogin} className="absolute bottom-3 right-3 opacity-0 hover:opacity-20 transition-opacity duration-300">
          <Lock size={14} className="text-slate-300" />
        </button>
      </footer>
    </div>
  );
};

export default PublicSite;
