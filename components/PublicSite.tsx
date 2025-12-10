import React, { useState } from 'react';
import { ARTIST_INFO, ARTWORKS, PRICING_TABLE } from '../constants';
import { Mail, Instagram, ExternalLink, Eye, ChevronRight, Image as ImageIcon, Briefcase, ShieldCheck } from 'lucide-react'; 

interface PublicSiteProps {
  onOpenCompanion: (id: string) => void;
}

// =======================================================
// 1. COMPONENTE AYUDANTE: Para renderizar listas detalladas
// =======================================================
const AccoladeList: React.FC<{ items: string[] }> = ({ items }) => (
    <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
        {items.map((item, index) => (
            <li key={index} className="pl-1 leading-relaxed">{item}</li>
        ))}
    </ul>
);

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
          {/* Main Tabs */}
          <div className="flex gap-1 md:gap-4 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-3 py-1 md:px-4 md:py-2 transition-colors ${activeTab === 'portfolio' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              PORTFOLIO
            </button>
            <button
              onClick={() => setActiveTab('bio')}
              className={`px-3 py-1 md:px-4 md:py-2 transition-colors ${activeTab === 'bio' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              TRAYECTORIA & BIO
            </button>
            <button
              onClick={() => setActiveTab('prices')}
              className={`px-3 py-1 md:px-4 md:py-2 transition-colors ${activeTab === 'prices' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              ENCARGOS & PRECIOS
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
            
            {/* Columna 1: Bio */}
            <div className="md:col-span-1">
              <h2 className="font-serif text-4xl font-bold text-slate-900 mb-6">Biografía</h2>
              <p className="text-lg font-serif italic text-slate-600 mb-6 border-l-2 border-gold-500 pl-4">{ARTIST_INFO.bioShort}</p>
              <h3 className="text-xl font-semibold mb-3">Declaración del Artista</h3>
              <p className="text-slate-700 leading-relaxed mb-8">{ARTIST_INFO.statement}</p>
              
              {/* Contacto Rápido */}
              <div className="space-y-3">
                <a href={`mailto:${ARTIST_INFO.email}`} className="flex items-center gap-2 text-slate-600 hover:text-gold-600 transition-colors text-sm">
                  <Mail size={16} /> {ARTIST_INFO.email}
                </a>
                <a href={`https://www.instagram.com/${ARTIST_INFO.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-gold-600 transition-colors text-sm">
                  <Instagram size={16} /> {ARTIST_INFO.instagram}
                </a>
              </div>
            </div>

            {/* Columna 2 & 3: Trayectoria */}
            <div className="md:col-span-2 space-y-10">
              
              {/* Contenedor del Título y la Foto para posicionarla en la esquina */}
              <div className="flex justify-between items-start relative"> 
                  <h2 className="font-serif text-4xl font-bold text-slate-900">Trayectoria & Reconocimientos</h2>
                  
                  {/* FOTO DEL ARTISTA (¡w-60 h-60!) */}
                  <div className="w-60 h-60 overflow-hidden rounded-lg shadow-lg border-2 border-stone-200 ml-4 group transition-all duration-300 hover:shadow-xl">
                      <img
                          src="/obras/ARTISTA.jpg"
                          alt="Retrato de la Artista Myriam Alcaraz"
                          // Clases para el efecto B/N a color al hacer hover
                          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                      />
                  </div>
              </div>
              
              {/* EXPOSICIONES */}
              <div>
                <h3 className="text-2xl font-serif font-semibold text-gold-600 mb-4 flex items-center gap-2">
                    <ChevronRight size={20} /> Exposiciones Colectivas (Selección)
                </h3>
                <AccoladeList items={ARTIST_INFO.accolades.exposiciones} />
              </div>

              {/* CONCURSOS */}
              <div>
                <h3 className="text-2xl font-serif font-semibold text-gold-600 mb-4 flex items-center gap-2">
                    <ChevronRight size={20} /> Concursos y Premios
                </h3 >
                <AccoladeList items={ARTIST_INFO.accolades.concursos} />
              </div>
              
              {/* PUBLICACIONES */}
              <div>
                <h3 className="text-2xl font-serif font-semibold text-gold-600 mb-4 flex items-center gap-2">
                    <ChevronRight size={20} /> Publicaciones Destacadas
                </h3 >
                <AccoladeList items={ARTIST_INFO.publications} />
              </div>

            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* COLECCIONISMO & PRECIOS TAB (REDESIGN) */}
        {/* ========================================= */}
        {activeTab === 'prices' && (
          <div className="space-y-12">
            
            {/* Introducción de Lujo */}
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-5xl font-bold text-slate-900 mb-4">El Arte de Coleccionar</h2>
              <p className="text-xl font-serif italic text-slate-600 border-b border-gold-500 pb-4">
                "Arte con alma y sofisticación para tu espacio."
              </p>
              <p className="text-slate-700 leading-relaxed mt-6">
                Llevar una pieza de arte a tu hogar o espacio de trabajo es una decisión íntima y transformadora. 
                Para adaptarme a tu visión, proceso y presupuesto, ofrezco tres caminos exclusivos para que inicies o amplíes tu colección.
              </p>
            </div>

            {/* Opciones de Coleccionismo (Grid de 3 Columnas) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Opción 1: Obra Original Única */}
              <div className="bg-white p-6 shadow-xl border-t-4 border-gold-500 flex flex-col items-center text-center">
                <ImageIcon size={36} className="text-gold-600 mb-4" />
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">1. Obra Original Única</h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed flex-grow">
                  Explora mi galería de obras disponibles en el **PORTFOLIO**. Cada pieza que ves es una creación única, pintada al óleo sobre lienzo o tabla, lista para dar un toque de elegancia y profundidad a tu colección.
                </p>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className="mt-4 bg-slate-800 text-white px-6 py-2 rounded text-sm font-semibold hover:bg-gold-600 transition-colors"
                >
                  Explorar Portafolio
                </button>
              </div>

              {/* Opción 2: Reproducción de Lujo Giclée */}
              <div className="bg-white p-6 shadow-xl border-t-4 border-gold-500 flex flex-col items-center text-center">
                <ShieldCheck size={36} className="text-gold-600 mb-4" />
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">2. Reproducción Lujo Giclée</h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  ¿Buscas una opción más accesible o un formato específico? Ofrezco copias de museo Giclée (impresión de altísima fidelidad). Cada reproducción incluye un **Certificado de Autenticidad** original, numerado y firmado.
                </p>
                {/* Botón de Teasing para Certificado Pixelado 🛑 CORRECCIÓN CLAVE AQUÍ */}
                <button
                  onClick={() => onOpenCompanion('CERTIFICATE_DEMO')} 
                  className="mt-4 bg-gold-500 text-white px-6 py-2 rounded text-sm font-semibold hover:bg-gold-600 transition-colors flex items-center gap-2"
                >
                  <Eye size={16}/> Ver Demo Certificado
                </button>
              </div>

              {/* Opción 3: Encargo Personalizado (Creación desde Cero) */}
              <div className="bg-white p-6 shadow-xl border-t-4 border-gold-500 flex flex-col items-center text-center">
                <Briefcase size={36} className="text-gold-600 mb-4" />
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">3. Encargo Personalizado</h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed flex-grow">
                  Partimos de tus fotografías o ideas más queridas para crear una obra única, **pintada desde cero**. El precio se determina antes de comenzar, tras una consulta personal sobre el formato y la complejidad.
                </p>
                <a 
                  href={`mailto:${ARTIST_INFO.email}`} 
                  className="mt-4 bg-slate-800 text-white px-6 py-2 rounded text-sm font-semibold hover:bg-gold-600 transition-colors"
                >
                  Solicitar Consulta
                </a>
              </div>
            </div>
            
            {/* 🛑 SECCIÓN DE DETALLES DE ENCARGOS ELIMINADA */}

          </div>
        )}

        {/* Cierre - CTA Final (Solo para Portfolio y Bio) */}
        {activeTab !== 'prices' && (
          <div className="mt-16 bg-slate-800 p-12 text-center">
            <div className="max-w-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                    <h3 className="font-serif text-2xl text-white mb-2 italic">Commissions & Encargos</h3>
                    <p className="text-sm font-light leading-relaxed opacity-80 text-slate-200">
                        Realizo proyectos personalizados para coleccionistas privados y estudios de arquitectura.
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
      </main>

      {/* Footer */}
      <footer className="bg-white text-slate-500 py-16 text-center border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <img src="/logo-myriam.png" alt="Logo Footer" className="h-12 w-auto mx-auto mb-6 opacity-50 grayscale" />
          <div className="flex justify-center gap-8 mb-8">
            {/* ENLACES SOCIALES ELIMINADOS DEL FOOTER */}
          </div>
          <p className="text-[10px] opacity-40 uppercase tracking-wide">© 2025 Myriam Alcaraz. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};