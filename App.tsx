import React, { useState } from 'react';
import { ARTIST_INFO, ARTWORKS, PRICING_TABLE } from '../constants';
import { Mail, Instagram, ExternalLink } from 'lucide-react'; // Eliminado 'Eye' porque ya no se usa

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

                    {/* CTA de Contacto/Disponibilidad */}
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
                    
                    {/* 🛑 ELIMINADO EL BOTÓN DE "VER EXPERIENCIA DIGITAL" POR SEGURIDAD */}

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
              {/* Imagen con efecto y ruta corregida */}
              <img src="/obras/ARTISTA.jpg" alt="Myriam Alcaraz" className="relative z-10 shadow-lg w-full grayscale hover:grayscale-0 transition-all duration-700 object-cover aspect-[3/4]" />
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
                      <span className="italic text-slate-500">Obra: "Sara en Marquesina"</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold-500 mt-1">✦</span>
                    <div>
                      <strong className="text-slate-800 block">Semifinalista Target Prize 2025</strong>
                      <span className="italic text-slate-500">Obras: "Laura en el Crepúsculo", "Sara bajo la Farola", "La Viajera"</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold-500 mt-1">✦</span>
                    <div>
                      <strong className="text-slate-800 block">Finalista ModPortrait 2022</strong>
                      <span className="italic text-slate-500">Obra: "Pablo en Cascada"</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold-500 mt-1">✦</span>
                    <div>
                      <strong className="text-slate-800 block">Seleccionada X Salón de Realismo (AEPE)</strong>
                      <span className="italic text-slate-500">Serie: "Memorias de Mekong I y II"</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold-500 mt-1">✦</span>
                    <div>
                      <strong className="text-slate-800 block">Guía de Arte y Artistas Leonardo 2025</strong>
                      <span className="italic text-slate-500">
                        Obras incluidas: "Ana y la Habana", "Laura en el Crepúsculo", "Pablo en Cascada", "Sara bajo la farola" y "Sara en Marquesina".
                      </span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold-500 mt-1">✦</span>
                    <div>
                      <strong className="text-slate-800 block">Certamen Pequeño Formato (C.C. Príncipe de Asturias)</strong>
                      <span className="italic text-slate-500">Obra: "Jilguero en charca del Botánico"</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* PRICING SECTION */}
        {activeTab === 'prices' && (
          <div className="max-w-3xl mx-auto animate-fade-in pb-32">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl text-slate-900 mb-4">Listado de Precios</h2>
              <p className="text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                Este documento informa sobre los valores orientativos de las obras de Myriam Alcaraz, basados en 2.500 EUR/m². Cada pieza es única y el precio final puede variar según técnica, número de figuras, nivel de detalle y tiempo de ejecución.
              </p>
            </div>

            <div className="bg-white shadow-xl shadow-stone-200/50 rounded-sm overflow-hidden mb-12 border-t-4 border-gold-500">
              <div className="bg-stone-50 px-8 py-6 flex justify-between items-center border-b border-stone-100">
                <span className="font-serif italic text-xl text-slate-800">Tarifas Oficiales 2025</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 border border-slate-200 px-2 py-1">IVA Incluido</span>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-slate-400">
                    <th className="px-8 py-4 font-normal">Medida (cm)</th>
                    <th className="px-8 py-4 font-normal text-right">Precio Base</th>
                    <th className="px-8 py-4 font-normal text-right text-slate-900">PVP Final</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {PRICING_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gold-50/30 transition-colors">
                      <td className="px-8 py-5 text-slate-700 font-medium">{row.dimensions}</td>
                      <td className="px-8 py-5 text-right text-slate-400 font-light">{row.priceBase} €</td>
                      <td className="px-8 py-5 text-right font-serif text-lg text-slate-900">{row.priceWithTax.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center bg-slate-900 text-stone-300 p-8 rounded-sm">
                <div className="flex-1">
                    <h3 className="font-serif text-2xl text-white mb-2 italic">Commissions & Encargos</h3>
                    <p className="text-sm font-light leading-relaxed opacity-80">
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
            <a href={`https://instagram.com/${ARTIST_INFO.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold-600 transition-colors"><Instagram size={18} /></a>
            <a href={`mailto:${ARTIST_INFO.email}`} className="hover:text-gold-600 transition-colors"><Mail size={18} /></a>
            <a href={`https://${ARTIST_INFO.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold-600 transition-colors"><ExternalLink size={18} /></a>
          </div>
          <p className="text-[10px] opacity-40 uppercase tracking-wide">© 2025 Myriam Alcaraz. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};