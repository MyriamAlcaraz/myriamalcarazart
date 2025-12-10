import React, { useState } from 'react';
import { ARTIST_INFO, ARTWORKS, PRICING_TABLE } from '../constants';
import { Mail, Instagram, ExternalLink, Eye, ChevronRight } from 'lucide-react'; 

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
        {/* BIO & TRAYECTORIA TAB (CON FOTO GRANDE) */}
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
                <a href={ARTIST_INFO.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-gold-600 transition-colors text-sm">
                  <ExternalLink size={16} /> Web Profesional
                </a>
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
                  
                  {/* FOTO DEL ARTISTA (¡w-36 h-36!) */}
                  <div className="w-36 h-36 overflow-hidden rounded-lg shadow-lg border-2 border-stone-200 ml-4 group transition-all duration-300 hover:shadow-xl">
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
                </h3>
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
        {/* PRECIOS TAB */}
        {/* ========================================= */}
        {activeTab === 'prices' && (
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Commissions Info */}
            <div className="md:w-1/2">
              <h2 className="font-serif text-4xl font-bold text-slate-900 mb-6">Encargos Personalizados</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Estoy disponible para realizar obras por encargo, adaptando mi estilo figurativo a su visión. El proceso incluye una consulta inicial, presentación de bocetos digitales y un cronograma de trabajo claro, asegurando la máxima fidelidad al resultado deseado.
              </p>
              <p className="text-sm text-slate-500 italic">
                El precio final depende de la complejidad del sujeto, el detalle y los materiales específicos solicitados.
              </p>
              
              <a 
                href={`mailto:${ARTIST_INFO.email}`} 
                className="mt-8 inline-flex items-center gap-2 bg-gold-500 text-white px-8 py-3 hover:bg-gold-600 transition-colors uppercase tracking-widest text-xs font-bold shadow-md"
              >
                <Mail size={16} /> Solicitar Propuesta
              </a>
            </div>

            {/* Pricing Table */}
            <div className="md:w-1/2 bg-white p-6 shadow-xl border border-stone-100">
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6 border-b pb-2">Tarifa Base por Formato (Óleo)</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 text-sm uppercase tracking-wider text-slate-500">
                    <th className="py-2">Dimensiones (cm)</th>
                    <th className="py-2 text-right">Precio Base (sin IVA)</th>
                    <th className="py-2 text-right">Precio Final (con IVA)</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_TABLE.map((row, index) => (
                    <tr key={index} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                      <td className="py-3 font-semibold">{row.dimensions} cm</td>
                      <td className="py-3 text-right">{row.priceBase.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}</td>
                      <td className="py-3 text-right font-bold text-gold-600">{row.priceWithTax.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Cierre - CTA Final */}
        {activeTab !== 'bio' && (
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