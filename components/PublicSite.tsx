import React, { useState } from 'react';
import { ARTIST_INFO, ARTWORKS } from '../constants';
import { Eye, Lock, Layout, Shield, Award, Crown } from 'lucide-react';

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
      <nav className="sticky top-0 z-50 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <img src="/logo-myriam.png" alt="Logo" className="h-12 w-auto md:h-16 object-contain" />
            <div className="hidden md:block border-l border-slate-300 pl-4">
              <h1 className="font-serif text-lg tracking-[0.2em] text-slate-900 uppercase">Myriam Alcaraz</h1>
              <p className="text-[10px] text-gold-600 tracking-[0.3em] uppercase">Artista Figurativa</p>
            </div>
          </div>
          <div className="flex gap-1 md:gap-4 text-sm font-semibold">
            <button onClick={() => handleTabChange('portfolio')} className={`px-3 py-1 ${activeTab === 'portfolio' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500'}`}>PORTFOLIO</button>
            <button onClick={() => handleTabChange('bio')} className={`px-3 py-1 ${activeTab === 'bio' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500'}`}>BIO</button>
            <button onClick={() => handleTabChange('prices')} className={`px-3 py-1 ${activeTab === 'prices' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500'}`}>ENCARGOS</button>
            <button onClick={onOpenGiclee} className="px-3 py-1 text-slate-500 hover:text-gold-600">GICLÉE</button>
            <button onClick={() => handleTabChange('app')} className={`px-3 py-1 ${activeTab === 'app' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500'}`}>ESTUDIO DIGITAL</button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* ========================================= */}
        {/* PORTFOLIO TAB */}
        {/* ========================================= */}
        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
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
                {/* Botón para abrir Companion (con el modo pixelado por defecto) */}
                <button
                  onClick={() => onOpenCompanion(artwork.id)}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Eye size={36} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ========================================= */}
        {/* BIO & TRAYECTORIA TAB */}
        {/* ========================================= */}
        {activeTab === 'bio' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-fade-in">
            <div className="md:col-span-1">
              <h2 className="font-serif text-4xl font-bold text-slate-900 mb-6">Biografía</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">{ARTIST_INFO.bioShort}</p>
              <p className="text-slate-600 leading-relaxed mb-8 font-serif italic border-l-2 border-gold-500 pl-4">"{ARTIST_INFO.statement}"</p>
            </div>
            <div className="md:col-span-2 space-y-10">
              <div className="flex justify-between items-start">
                <h2 className="font-serif text-4xl font-bold text-slate-900">Trayectoria</h2>
                <div className="w-48 h-48 overflow-hidden rounded-lg shadow-lg grayscale">
                   <img src="/obras/ARTISTA.jpg" alt="Myriam Alcaraz" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-semibold text-gold-600 mb-4">Reconocimientos</h3>
                <AccoladeList items={ARTIST_INFO.accolades.exposiciones} />
              </div>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* ENCARGOS Y PRECIOS TAB */}
        {/* ========================================= */}
        {activeTab === 'prices' && (
          <div className="space-y-12 animate-fade-in">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-5xl font-bold text-slate-900 mb-4">El Arte de Coleccionar</h2>
              <p className="text-xl italic text-slate-600 border-b border-gold-500 pb-4">"Arte con alma y sofisticación para tu espacio."</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 shadow-xl border-t-4 border-gold-500 text-center">
                <h3 className="font-serif text-2xl font-bold mb-3">Obra Original Única</h3>
                <p className="text-sm text-slate-600 mb-6">Óleo sobre lienzo. Piezas exclusivas de colección.</p>
                <button onClick={() => handleTabChange('portfolio')} className="bg-slate-800 text-white px-6 py-2 rounded">Ver Portfolio</button>
              </div>
              <div className="bg-white p-6 shadow-xl border-t-4 border-gold-500 text-center">
                <h3 className="font-serif text-2xl font-bold mb-3">Giclée de Lujo</h3>
                <p className="text-sm text-slate-600 mb-6">Ediciones limitadas sobre papel Hahnemühle.</p>
                <button onClick={onOpenGiclee} className="bg-gold-500 text-white px-6 py-2 rounded">Ver Catálogo</button>
              </div>
              <div className="bg-white p-6 shadow-xl border-t-4 border-gold-500 text-center">
                <h3 className="font-serif text-2xl font-bold mb-3">Encargo Personalizado</h3>
                <p className="text-sm text-slate-600 mb-6">Creamos una obra desde cero basada en tu idea.</p>
                <a href={`mailto:${ARTIST_INFO.email}`} className="bg-slate-800 text-white px-6 py-2 rounded inline-block">Consultar</a>
              </div>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* ESTUDIO DIGITAL TAB */}
        {/* ========================================= */}
        {activeTab === 'app' && (
          <div className="max-w-4xl mx-auto py-12 text-center bg-slate-900 text-white rounded-3xl shadow-2xl px-6 animate-fade-in">
            <h2 className="font-serif text-5xl font-bold mb-4 text-gold-500">Analizador Técnico del Color</h2>
            <p className="text-2xl italic mb-8">Technical Color Analyzer</p>
            <p className="text-lg mb-8 opacity-80">La herramienta profesional avanzada para artistas desarrollada por Myriam Alcaraz.</p>
            <div className="text-4xl font-bold text-gold-400 mb-8">46,99 € <span className="text-sm text-white/50 font-normal">+ IVA</span></div>
            <a href="https://payhip.com/ARTEFIGURATIVO" target="_blank" className="bg-gold-500 hover:bg-gold-600 text-white px-12 py-4 rounded-full font-bold text-xl transition-all inline-block shadow-lg transform hover:scale-105">COMPRAR AHORA</a>
          </div>
        )}
      </main>

      <footer className="bg-white py-12 border-t text-center relative mt-auto">
        <div className="max-w-4xl mx-auto px-6">
          <img src="/logo-myriam.png" alt="Logo" className="h-10 mx-auto mb-6 opacity-50 grayscale" />
          <p className="text-[10px] opacity-40 uppercase tracking-[0.2em]">© 2025 Myriam Alcaraz. Todos los derechos reservados.</p>
        </div>
        <button onClick={onOpenStudioLogin} className="absolute bottom-4 right-4 opacity-0 hover:opacity-100 transition-opacity">
          <Lock size={14} className="text-slate-300" />
        </button>
      </footer>
    </div>
  );
};

export default PublicSite;
