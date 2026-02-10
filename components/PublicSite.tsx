import React, { useState } from 'react';
import { ARTIST_INFO, ARTWORKS } from '../constants';
import { Eye, Lock, Layout, ArrowLeft } from 'lucide-react';
import AtlasTransparencias from './AtlasTransparencias';
import PaletasMaestros from './PaletasMaestros';

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
  const [activeDigitalTool, setActiveDigitalTool] = useState<'none' | 'atlas' | 'maestros'>('none');

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

            {/* Columna 1: Bio */}
            <div className="md:col-span-1">
              <h2 className="font-serif text-4xl font-bold text-slate-900 mb-6">Biografía</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">{ARTIST_INFO.bioShort}</p>
              <h3 className="text-xl font-semibold mb-3">Declaración del Artista</h3>
              <p className="text-slate-600 leading-relaxed mb-8 font-serif italic border-l-2 border-gold-500 pl-4">"{ARTIST_INFO.statement}"</p>

              {/* Contacto Rápido */}
              <div className="space-y-3">
                <a href={`mailto:${ARTIST_INFO.email}`} className="flex items-center gap-2 text-slate-600 hover:text-gold-600 transition-colors text-sm">
                  {ARTIST_INFO.email}
                </a>
                <a href={`https://www.instagram.com/${ARTIST_INFO.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-gold-600 transition-colors text-sm">
                  {ARTIST_INFO.instagram}
                </a>
              </div>
            </div>

            {/* Columna 2 & 3: Trayectoria */}
            <div className="md:col-span-2 space-y-10">

              {/* Contenedor del Título y la Foto para posicionarla en la esquina */}
              <div className="flex justify-between items-start relative">
                <h2 className="font-serif text-4xl font-bold text-slate-900">Trayectoria & Reconocimientos</h2>

                {/* FOTO DEL ARTISTA */}
                <div className="w-60 h-60 overflow-hidden rounded-lg shadow-lg border-2 border-stone-200 ml-4 group transition-all duration-300 hover:shadow-xl">
                  <img
                    src="/obras/ARTISTA.jpg"
                    alt="Retrato de la Artista Myriam Alcaraz"
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                  />
                </div>
              </div>

              {/* EXPOSICIONES */}
              <div>
                <h3 className="text-2xl font-serif font-semibold text-gold-600 mb-4">
                  Exposiciones Colectivas (Selección)
                </h3>
                <AccoladeList items={ARTIST_INFO.accolades.exposiciones} />
              </div>

              {/* CONCURSOS */}
              <div>
                <h3 className="text-2xl font-serif font-semibold text-gold-600 mb-4">
                  Concursos y Premios
                </h3>
                <AccoladeList items={ARTIST_INFO.accolades.concursos} />
              </div>

              {/* PUBLICACIONES */}
              <div>
                <h3 className="text-2xl font-serif font-semibold text-gold-600 mb-4">
                  Publicaciones Destacadas
                </h3>
                <AccoladeList items={ARTIST_INFO.publications} />
              </div>

            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* ENCARGOS Y PRECIOS TAB */}
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
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">1. Obra Original Única</h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed flex-grow">
                  Explora mi galería de obras disponibles en el **PORTFOLIO**. Cada pieza que ves es una creación única, pintada al óleo sobre lienzo o tabla, lista para dar un toque de elegancia y profundidad a tu colección.
                </p>
                <button
                  onClick={() => handleTabChange('portfolio')}
                  className="mt-4 bg-slate-800 text-white px-6 py-2 rounded text-sm font-semibold hover:bg-gold-600 transition-colors"
                >
                  Explorar Portafolio
                </button>
              </div>

              {/* Opción 2: Reproducción de Lujo Giclée */}
              <div className="bg-white p-6 shadow-xl border-t-4 border-gold-500 flex flex-col items-center text-center">
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">2. Reproducción Lujo Giclée</h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  ¿Buscas una opción más accesible o un formato específico? Ofrezco copias de museo Giclée (impresión de altísima fidelidad). Cada reproducción incluye un **Certificado de Autenticidad** original, numerado y firmado.
                </p>
                <button
                  onClick={onOpenGiclee}
                  className="mt-4 bg-gold-500 text-white px-6 py-2 rounded text-sm font-semibold hover:bg-gold-600 transition-colors flex items-center gap-2"
                >
                  <Layout size={16} /> Ver Catálogo Giclée
                </button>
              </div>

              {/* Opción 3: Encargo Personalizado */}
              <div className="bg-white p-6 shadow-xl border-t-4 border-gold-500 flex flex-col items-center text-center">
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
          </div>
        )}

        {/* ========================================= */}
        {/* ESTUDIO DIGITAL TAB */}
        {/* ========================================= */}
        {activeTab === 'app' && activeDigitalTool === 'atlas' && (
          <AtlasTransparencias onBack={() => setActiveDigitalTool('none')} />
        )}

        {activeTab === 'app' && activeDigitalTool === 'maestros' && (
          <PaletasMaestros onBack={() => setActiveDigitalTool('none')} />
        )}

        {activeTab === 'app' && activeDigitalTool === 'none' && (
          <div className="max-w-5xl mx-auto py-8">

            {/* Header minimalista */}
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.4em] text-stone-400 uppercase mb-6">Investigación & Tecnología</p>
              <h1 className="font-serif text-4xl md:text-5xl text-slate-900 mb-4">
                Estudio Digital
              </h1>
              <div className="w-16 h-px bg-gold-500 mx-auto mb-8"></div>
              <p className="text-stone-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Herramientas digitales para la exploración técnica del color y los pigmentos históricos.
              </p>
            </div>

            {/* Grid de 3 herramientas */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">

              {/* ============================================ */}
              {/* HERRAMIENTA 1: ATLAS DE TRANSPARENCIAS (GRATIS) */}
              {/* ============================================ */}
              <div className="bg-white border border-stone-200 rounded-lg overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 text-center border-b border-stone-100">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-inner flex items-center justify-center">
                    <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <span className="text-[10px] tracking-[0.3em] text-amber-700 uppercase font-medium">Acceso Libre</span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-slate-900 mb-2 text-center">Atlas de Transparencias</h3>
                  <p className="text-sm text-stone-500 text-center mb-4 leading-relaxed">
                    Visualización del comportamiento lumínico de cada pigmento. Opacidad, veladura y poder cubriente en Old Holland, Williamsburg y W&N.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-1 rounded">Transparente</span>
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-1 rounded">Semiopaco</span>
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-1 rounded">Opaco</span>
                  </div>
                  <button
                    onClick={() => setActiveDigitalTool('atlas')}
                    className="w-full py-2 text-sm text-amber-700 border border-amber-200 rounded hover:bg-amber-50 transition-colors"
                  >
                    Explorar Atlas
                  </button>
                </div>
              </div>

              {/* ============================================ */}
              {/* HERRAMIENTA 2: PALETAS DE LOS MAESTROS (GRATIS) */}
              {/* ============================================ */}
              <div className="bg-white border border-stone-200 rounded-lg overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-stone-100 to-stone-50 p-6 text-center border-b border-stone-100">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-inner flex items-center justify-center">
                    <svg className="w-8 h-8 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className="text-[10px] tracking-[0.3em] text-stone-600 uppercase font-medium">Acceso Libre</span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-slate-900 mb-2 text-center">Paletas de los Maestros</h3>
                  <p className="text-sm text-stone-500 text-center mb-4 leading-relaxed">
                    Las paletas reales de Velázquez, Rembrandt, Sorolla y Zorn. Pigmentos históricos con sus equivalentes modernos.
                  </p>
                  <div className="flex justify-center gap-1 mb-4">
                    <div className="w-6 h-6 rounded-full bg-amber-900 border border-white shadow-sm" title="Tierra Sombra"></div>
                    <div className="w-6 h-6 rounded-full bg-yellow-600 border border-white shadow-sm" title="Ocre Amarillo"></div>
                    <div className="w-6 h-6 rounded-full bg-red-800 border border-white shadow-sm" title="Rojo Venecia"></div>
                    <div className="w-6 h-6 rounded-full bg-slate-900 border border-white shadow-sm" title="Negro Marfil"></div>
                    <div className="w-6 h-6 rounded-full bg-stone-100 border border-stone-300 shadow-sm" title="Blanco Plomo"></div>
                  </div>
                  <button
                    onClick={() => setActiveDigitalTool('maestros')}
                    className="w-full py-2 text-sm text-stone-600 border border-stone-200 rounded hover:bg-stone-50 transition-colors"
                  >
                    Ver Paletas
                  </button>
                </div>
              </div>

              {/* ============================================ */}
              {/* HERRAMIENTA 3: ANALIZADOR TÉCNICO (DE PAGO) */}
              {/* ============================================ */}
              <div className="bg-white border-2 border-gold-500 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-slate-900 p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-500 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="text-[10px] tracking-[0.3em] text-gold-400 uppercase font-medium">Herramienta Pro</span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-slate-900 mb-2 text-center">Analizador Técnico</h3>
                  <p className="text-sm text-stone-500 text-center mb-4 leading-relaxed">
                    Sistema de análisis cromático con IA. Identifica pigmentos exactos de cualquier imagen en las 3 marcas profesionales.
                  </p>
                  <div className="text-center mb-4">
                    <span className="text-2xl font-serif text-slate-900">46,99 €</span>
                    <p className="text-xs text-stone-400 mt-1">Acceso único</p>
                  </div>
                  <a
                    href="https://payhip.com/ARTEFIGURATIVO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 text-sm text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors text-center"
                  >
                    Obtener Acceso
                  </a>
                </div>
              </div>

            </div>

            {/* Nota sobre las marcas */}
            <div className="text-center mb-8">
              <p className="text-xs text-stone-400 tracking-wide">
                Todas las herramientas incluyen las denominaciones exactas de
              </p>
              <p className="text-sm text-stone-600 font-medium mt-1">
                Old Holland · Williamsburg · Winsor & Newton
              </p>
            </div>

            {/* Firma */}
            <div className="text-center border-t border-stone-100 pt-8">
              <p className="text-stone-400 text-sm italic">
                Desarrollado por Myriam Alcaraz · Artista e Investigadora
              </p>
            </div>

          </div>
        )}

        {/* Cierre - CTA Final (Solo para Portfolio y Bio) */}
        {activeTab !== 'prices' && activeTab !== 'app' && (
          <div className="mt-16 bg-slate-800 p-12 text-center">
            <div className="max-w-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h3 className="font-serif text-2xl text-white mb-2 italic">Commissions & Encargos</h3>
                <p className="text-sm font-light leading-relaxed opacity-80 text-slate-200">
                  Realizo proyectos personalizados para coleccionistas privados.
                  Toda obra es entregada con su Certificado de Autenticidad.
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
      <footer className="bg-white text-slate-500 py-16 text-center border-t border-slate-100 relative">
        <div className="max-w-4xl mx-auto px-6">
          <img src="/logo-myriam.png" alt="Logo Footer" className="h-12 w-auto mx-auto mb-6 opacity-50 grayscale" />

          <p className="text-[10px] opacity-40 uppercase tracking-wide">© 2025 Myriam Alcaraz. Todos los derechos reservados.</p>
        </div>

        {/* 🔒 ACCESO SECRETO AL ESTUDIO - Candadito invisible en esquina inferior derecha */}
        <button
          onClick={onOpenStudioLogin}
          className="absolute bottom-3 right-3 opacity-0 hover:opacity-20 transition-opacity duration-300 bg-transparent border-none outline-none"
          style={{ background: 'none', boxShadow: 'none' }}
          title=""
        >
          <Lock size={14} className="text-slate-300" />
        </button>
      </footer>
    </div>
  );
};

export default PublicSite;
