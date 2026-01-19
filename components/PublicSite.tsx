import React, { useState } from 'react';
import { ARTIST_INFO, ARTWORKS, PRICING_TABLE } from '../constants';
import { Mail, Instagram, ExternalLink, Eye, ChevronRight, Image as ImageIcon, Briefcase, ShieldCheck, Lock } from 'lucide-react'; 

interface PublicSiteProps {
  onOpenCompanion: (id: string) => void;
  onOpenStudioLogin: () => void;
  onTabChange?: (tab: 'portfolio' | 'bio' | 'prices' | 'app') => void;
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

// 🛑 AÑADIDO: onOpenStudioLogin en las props
export const PublicSite: React.FC<PublicSiteProps> = ({ onOpenCompanion, onOpenStudioLogin, onTabChange }) => {
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
              BIOGRAFÍA
            </button>
            <button
              onClick={() => handleTabChange('prices')}
              className={`px-3 py-1 md:px-4 md:py-2 transition-colors ${activeTab === 'prices' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              ENCARGOS Y PRECIOS
            </button>
            <button
              onClick={() => handleTabChange('app')}
              className={`px-3 py-1 md:px-4 md:py-2 transition-colors ${activeTab === 'app' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              APLICACIÓN COLOR
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* ========================================= */}
        {/* ========================================= */}
        {/* CONTENIDO NORMAL (COMENTADO TEMPORALMENTE) */}
        {/* ========================================= */}
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
        {/* ENCARGOS Y PRECIOS TAB */}
        {/* ========================================= */}
        {activeTab === 'prices' && (
          <div className="space-y-12">
            
            {/* Introducción de Ventas */}
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-5xl font-bold text-slate-900 mb-4">Encargos y Precios</h2>
              <p className="text-xl font-serif italic text-slate-600 border-b border-gold-500 pb-4">
                "Arte con alma y herramientas digitales para tu creatividad."
              </p>
              <p className="text-slate-700 leading-relaxed mt-6">
                Ofrezco obras originales, encargos personalizados y herramientas digitales exclusivas. 
                Cada opción está diseñada para adaptarse a tu visión, proceso y presupuesto.
              </p>
            </div>

            {/* Opciones de Ventas (Grid de 2x2 para dar más espacio a cada opción) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* Opción 1: Obra Original Única */}
              <div className="bg-white p-6 shadow-xl border-t-4 border-gold-500 flex flex-col items-center text-center">
                <ImageIcon size={36} className="text-gold-600 mb-4" />
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
                  Parto de tus fotografías o ideas más queridas para crear una obra única, **pintada desde cero**. El precio se determina antes de comenzar, tras una consulta personal sobre el formato y la complejidad.
                </p>
                <a 
                  href={`mailto:${ARTIST_INFO.email}`} 
                  className="mt-4 bg-slate-800 text-white px-6 py-2 rounded text-sm font-semibold hover:bg-gold-600 transition-colors"
                >
                  Solicitar Consulta
                </a>
              </div>

              {/* Opción 4: Analizador Técnico del Color - Herramienta Digital Exclusiva */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl border-t-4 border-gold-500 flex flex-col items-center text-center text-white relative overflow-hidden">
                {/* ========================================= */}
                {/* MANTENIMIENTO TEMPORAL - PÁGINA BLOQUEADA */}
                {/* ========================================= */}
                <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                  <div className="max-w-4xl mx-auto text-center p-8">
                    {/* Candado Grande */}
                    <div className="w-32 h-32 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                      <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m0 0l-4 4m5.618-4.618L11 16H9a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002 2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 8a2 2 0 012-2v6a2 2 0 01-2 2H5a2 2 0 01-2 2V8a2 2 0 012-2z" />
                      </svg>
                    </div>
                    
                    {/* Mensaje Principal */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-gold-500/30">
                      <h1 className="font-serif text-4xl font-bold text-slate-900 mb-4">
                        🔒 TIENDA EN MANTENIMIENTO 🔒
                      </h1>
                      <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                        Estamos actualizando nuestra tienda para ofrecerte una mejor experiencia.
                      </p>
                      <p className="text-slate-600 mb-8">
                        Volveremos pronto con mejoras y novedades.
                      </p>
                      
                      {/* Información de Contacto */}
                      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                        <h2 className="font-serif text-xl font-semibold text-slate-800 mb-4">
                          ¿Necesitas ayuda urgente?
                        </h2>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 011.21 1.21l2.58 2.59a2 2 0 01.21.21.21l2.59 2.59a2 2 0 01-.21.21L8.11 8.26a2 2 0 00-1.21-1.21l-2.58-2.59a2 2 0 00-.21-.21L3 8z" />
                            </svg>
                            <span className="text-slate-700">
                              <strong>Email:</strong> myriam@hotmail.com
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2v6a2 2 0 01-2 2H5a2 2 0 01-2 2V8a2 2 0 012-2z" />
                            </svg>
                            <span className="text-slate-700">
                              <strong>Teléfono:</strong> [Tu número]
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Mensaje de Seguridad */}
                      <div className="mt-8 p-4 bg-gold-50 rounded-xl border border-gold-200">
                        <p className="text-sm text-slate-600 font-medium">
                          ⚠️ Por seguridad, todas las transacciones están temporalmente suspendidas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================================= */}
                {/* CONTENIDO NORMAL (COMENTADO TEMPORALMENTE) */}
                {/* ========================================= */}
                {activeTab === 'app' && (
                  <div className="space-y-16">
                    
                    {/* Header Hero Section - Bilingüe y Elegante */}
                    <div className="text-center space-y-8">
                      <div className="max-w-5xl mx-auto">
                        <div className="w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        
                        {/* Títulos Bilingües */}
                        <h1 className="font-serif text-5xl md:text-7xl font-bold text-slate-900 mb-2">
                          Analizador Técnico del Color
                        </h1>
                        <p className="font-serif text-3xl md:text-4xl text-gold-600 italic mb-6">
                          Technical Color Analyzer
                        </p>
                        
                        {/* Subtítulos Bilingües */}
                        <p className="text-xl font-serif text-slate-600 italic mb-8">
                          Herramienta Digital Exclusiva para Artistas
                        </p>
                        <p className="text-lg font-serif text-gold-500 italic mb-8">
                          Exclusive Digital Tool for Artists
                        </p>
                        
                        {/* Descripción Bilingüe */}
                        <div className="space-y-6 max-w-4xl mx-auto">
                          <p className="text-lg text-slate-700 leading-relaxed">
                            La herramienta práctica que utilizo, diseñada por mí. Ahora comparto contigo esta aplicación profesional 
                            con análisis técnico avanzado mediante inteligencia artificial para perfeccionar tu proceso creativo. 
                            Incluye las denominaciones exactas de las tres marcas de óleos que utilizo profesionalmente: 
                            Old Holland, Williamsburg y Winsor & Newton.
                          </p>
                          <p className="text-lg text-slate-600 leading-relaxed italic">
                            The practical tool I use, designed by me. Now I share with you this professional application 
                            with advanced technical analysis through artificial intelligence to perfect your creative process. 
                            Includes the exact denominations of the three oil paint brands I use professionally: 
                            Old Holland, Williamsburg and Winsor & Newton.
                          </p>
                        </div>
                      </div>
                    </div>
              <div className="max-w-5xl mx-auto">
                <div className="w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                
                {/* Títulos Bilingües */}
                <h1 className="font-serif text-5xl md:text-7xl font-bold text-slate-900 mb-2">
                  Analizador Técnico del Color
                </h1>
                <p className="font-serif text-3xl md:text-4xl text-gold-600 italic mb-6">
                  Technical Color Analyzer
                </p>
                
                {/* Subtítulos Bilingües */}
                <p className="text-xl font-serif text-slate-600 italic mb-8">
                  Herramienta Digital Exclusiva para Artistas
                </p>
                <p className="text-lg font-serif text-gold-500 italic mb-8">
                  Exclusive Digital Tool for Artists
                </p>
                
                {/* Descripción Bilingüe */}
                <div className="space-y-6 max-w-4xl mx-auto">
                  <p className="text-lg text-slate-700 leading-relaxed">
                    La herramienta práctica que utilizo, diseñada por mí. Ahora comparto contigo esta aplicación profesional 
                    con análisis técnico avanzado mediante inteligencia artificial para perfeccionar tu proceso creativo. 
                    Incluye las denominaciones exactas de las tres marcas de óleos que utilizo profesionalmente: 
                    Old Holland, Williamsburg y Winsor & Newton.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed italic">
                    The practical tool I use, designed by me. Now I share with you this professional application 
                    with advanced technical analysis through artificial intelligence to perfect your creative process. 
                    Includes the exact denominations of the three oil paint brands I use professionally: 
                    Old Holland, Williamsburg and Winsor & Newton.
                  </p>
                </div>
              </div>
            </div>

            {/* Sección de Compra - Centrado */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl p-12 text-center text-white">
                <div className="w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="font-serif text-3xl font-bold text-white mb-6">
                  Buy Now / Comprar Ahora
                </h3>
                <p className="text-slate-200 mb-8 text-lg">
                  Get unlimited access to the complete professional tool.<br/>
                  Obtén acceso ilimitado a la herramienta profesional completa.
                </p>
                <div className="mb-8">
                  <div>
                    <span className="text-4xl font-bold text-gold-400">46,99 €</span>
                    <span className="text-lg text-slate-300 ml-2">(+ IVA según tu país)</span>
                    <br />
                    <span className="text-base text-slate-400 italic">Precio final aprox. 57€ en España</span>
                  </div>
                  <p className="text-sm text-slate-300 mt-2">One-time payment / Pago único</p>
                </div>
                <a 
                  href="https://myriamalcaraz.gumroad.com/l/owesfb?_gl=1*q5x150*_ga*NzgzNzk1ODcwLjE3Njg2ODc1NjM.*_ga_6LJN6D94N6*czE3Njg4MTgyOTUkbzkkZzEkdDE3Njg4MjA5MzkkajYwJGwwJGgw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gold-500 text-white px-10 py-5 rounded-full font-semibold hover:bg-gold-600 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block text-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Buy Now / Comprar Ahora
                </a>
              </div>
            </div>

            {/* Firma Profesional */}
            <div className="text-center max-w-3xl mx-auto">
              <div className="bg-slate-50 p-8 rounded-2xl">
                <p className="text-lg text-slate-700 italic mb-4">
                  "Created with passion for artists who seek excellence in their creative process."<br/>
                  "Creado con pasión para artistas que buscan la excelencia en su proceso creativo."
                </p>
                <p className="text-slate-900 font-semibold">
                  Myriam Alcaraz<br/>
                  <span className="text-gold-600">Artist, Contemporary Figurative Painter</span><br/>
                  <span className="text-slate-600">Artista, Pintura Figurativa Contemporánea</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Cierre - CTA Final (Solo para Portfolio y Bio) 🛑 BLOQUE CORREGIDO */}
        {activeTab !== 'prices' && activeTab !== 'app' && (
          <div className="mt-16 bg-slate-800 p-12 text-center">
            <div className="max-w-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                    <h3 className="font-serif text-2xl text-white mb-2 italic">Commissions & Encargos</h3>
                    <p className="text-sm font-light leading-relaxed opacity-80 text-slate-200">
                        {/* 🛑 TEXTO FINAL MÍNIMO Y DIRECTO */}
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

      {/* Footer 🛑 MODIFICADO: Añadido el botón de acceso al Estudio */}
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