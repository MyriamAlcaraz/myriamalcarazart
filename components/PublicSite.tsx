// ARCHIVO: ./components/PublicSite.tsx - CÓDIGO FINAL CORREGIDO Y LIMPIO

import React, { useState } from 'react';
import { ARTIST_INFO, ARTWORKS, PRICING_TABLE } from '../constants';
import { Mail, Instagram, ExternalLink, Eye, ChevronRight, Image as ImageIcon, Briefcase, ShieldCheck, Lock } from 'lucide-react'; 

interface PublicSiteProps {
  onOpenCompanion: (id: string) => void;
  onOpenStudioLogin: () => void; 
}

// =======================================================
// 1. COMPONENTE AYUDANTE: Para renderizar listas detalladas
// =======================================================
const AccoladeList: React.FC<{ items: string[] }> = ({ items }) => (
    <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
        {items.map((item, index) => (
            <li key={index} className="pl-1 leading-relaxed">
                {item.includes('92 Salón de Otoño') ? (
                    <>
                        <span className="font-semibold text-gold-600">92 Salón de Otoño</span>: 
                        {item.split(':').slice(1).join(':')}
                    </>
                ) : item.includes('X Salón de Realismo') ? (
                    <>
                        <span className="font-semibold text-gold-600">X Salón de Realismo</span>: 
                        {item.split(':').slice(1).join(':')}
                    </>
                ) : (
                    item
                )}
            </li>
        ))}
    </ul>
);

// =======================================================
// 2. LÓGICA DE GENERACIÓN DE HTML DEL CERTIFICADO (PARA DEMO)
// =======================================================

interface DemoArtwork {
  title: string;
  certificationDate: string; // YYYY-MM-DD
  seriesIndex: number | null;
  seriesTotal: number | null;
  code: string | null;
  image: string; // URL
  dimensions: string; 
  technique: string; 
  isOpenSeries: boolean; 
}

interface DemoSettings {
  artistName: string;
  artistTitle: string;
  website: string;
  email: string;
  instagram: string;
}

const DEMO_SETTINGS: DemoSettings = {
    artistName: ARTIST_INFO.name,
    // 🛑 CORRECCIÓN CLAVE: Usamos 'tagline' que es el campo correcto en constants.ts
    artistTitle: ARTIST_INFO.tagline, 
    website: ARTIST_INFO.website,
    email: ARTIST_INFO.email,
    instagram: ARTIST_INFO.instagram,
};

const DEMO_ARTWORK: DemoArtwork = {
    title: "El Alma de Mónaco",
    certificationDate: "2025-11-20", 
    seriesIndex: 1,
    seriesTotal: 50,
    code: "MA-GCL-MNC-001",
    image: "/artworks/alma-monaco.jpg",
    dimensions: "60 x 60 cm", 
    technique: "Giclée Fine Art sobre Canvas",
    isOpenSeries: false,
};

// 🛑 EXPORTACIÓN CLAVE (Usada por App.tsx para el Iframe)
export const getCertificateDemoHtmlContent = (
  artwork: DemoArtwork = DEMO_ARTWORK, 
  settings: DemoSettings = DEMO_SETTINGS
): string => {
  const currentDate = new Date().toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });
  
  const seriesInfo = artwork.isOpenSeries 
    ? "Edición Abierta (Open Edition)" 
    : artwork.seriesIndex !== null && artwork.seriesTotal !== null 
      ? `Edición Limitada ${artwork.seriesIndex} / ${artwork.seriesTotal}` 
      : "Obra Única (Original)";

  const seriesCode = artwork.isOpenSeries
      ? artwork.code
      : artwork.seriesIndex !== null
          ? artwork.code?.replace(/0+$/, artwork.seriesIndex.toString().padStart(3, '0'))
          : artwork.code;

  // Se mantiene el HTML generado para la demo...
  return `
    <html>
    <head>
      <title>Certificado Demo</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;700&display=swap');
        body { margin: 0; padding: 0; font-family: 'Roboto', sans-serif; color: #1e293b; background-color: #f8f8f8; }
        .certificate-container { 
            width: 210mm; min-height: 297mm; padding: 20mm; margin: 0 auto; 
            box-shadow: 0 0 10px rgba(0,0,0,0.1); background-color: white; 
            position: relative; 
        }
        .border-frame { 
            border: 2px solid #a1804f; height: calc(100% - 30mm); padding: 15mm; 
            position: relative; display: flex; flex-direction: column; justify-content: space-between; 
        }
        .header { text-align: center; margin-bottom: 25mm; }
        .title { 
            font-family: 'Playfair Display', serif; font-size: 32pt; font-weight: 700; color: #0f172a; 
            letter-spacing: 2px; text-transform: uppercase; line-height: 1.1; 
        }
        .subtitle { font-size: 10pt; letter-spacing: 3px; color: #a1804f; text-transform: uppercase; margin-top: 5px; font-weight: 400; }
        .section-title { font-family: 'Playfair Display', serif; font-size: 14pt; font-weight: 700; color: #0f172a; margin-bottom: 10px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
        .metadata-grid { display: flex; justify-content: space-between; gap: 20px; margin-bottom: 15mm; }
        .meta-item { width: 50%; }
        .meta-label { font-size: 9pt; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 3px; }
        .meta-value { font-size: 11pt; color: #1e293b; font-weight: 400; }
        .artwork-details { display: flex; gap: 30px; margin-bottom: 20mm; }
        .artwork-image-container { flex: 1; text-align: center; }
        .artwork-image { max-width: 100%; height: 250px; object-fit: contain; border: 1px solid #e2e8f0; padding: 10px; }
        .declaration { font-size: 10pt; color: #475569; font-style: italic; margin-bottom: 20mm; line-height: 1.5; text-align: justify;}
        .footer-content { display: flex; justify-content: space-between; padding: 0 10mm; align-items: flex-end; }
        .signature-block { text-align: center; width: 150pt; }
        .signature-line { height: 60pt; border-bottom: 1px solid #0f172a; margin-bottom: 5pt; background: url('/signature-demo.png') center bottom / contain no-repeat; }
        .signature-label { font-size: 8pt; text-transform: uppercase; font-weight: 700; color: #0f172a; }
        .date-block { text-align: center; width: 150pt; }
        .date-value { height: 60pt; margin-bottom: 5pt; display: flex; align-items: flex-end; justify-content: center; font-family: 'Playfair Display', serif; font-size: 14pt; font-weight: 400; color: #475569;}
        .seal-block { width: 100pt; height: 100pt; background: url('/logo-seal-demo.svg') center center / 80pt no-repeat; opacity: 0.3; }
        .stamp-block { width: 100pt; height: 100pt; background: url('/seal-demo.png') center center / contain no-repeat; opacity: 0.8; }
        
        .contact-info { position: absolute; bottom: 5mm; left: 0; right: 0; text-align: center; font-size: 8pt; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="certificate-container">
        <div class="border-frame">
          
          <header class="header">
            <h1 class="title">CERTIFICADO DE AUTENTICIDAD</h1>
            <h2 class="subtitle">${settings.artistName} - ${settings.artistTitle}</h2>
          </header>

          <main>
            <div class="section-title">Detalles de la Obra</div>
            
            <div class="metadata-grid">
              <div class="meta-item">
                <div class="meta-label">Título</div>
                <div class="meta-value">${artwork.title}</div>
              </div>
              <div class="meta-item">
                <div class="meta-label">ID de Certificado</div>
                <div class="meta-value" style="font-weight: 700; color: #a1804f;">${seriesCode || 'N/A'}</div>
              </div>
            </div>

            <div class="metadata-grid">
              <div class="meta-item">
                <div class="meta-label">Técnica</div>
                <div class="meta-value">${artwork.technique}</div>
              </div>
              <div class="meta-item">
                <div class="meta-label">Dimensiones</div>
                <div class="meta-value">${artwork.dimensions}</div>
              </div>
            </div>

            <div class="metadata-grid">
              <div class="meta-item">
                <div class="meta-label">Tipo de Edición</div>
                <div class="meta-value">${seriesInfo}</div>
              </div>
              <div class="meta-item">
                <div class="meta-label">Fecha de Certificación</div>
                <div class="meta-value">${artwork.certificationDate}</div>
              </div>
            </div>

            <div class="artwork-details">
              <div class="artwork-image-container">
                <img src="${artwork.image}" alt="${artwork.title}" class="artwork-image"/>
                <p style="font-size: 8pt; color: #64748b; font-style: italic; margin-top: 5pt;">Fotografía de Referencia</p>
              </div>
            </div>

            <div class="section-title">Declaración de Autenticidad</div>
            <p class="declaration">
              Este Certificado de Autenticidad declara que la obra descrita arriba es una creación original de ${settings.artistName}. La obra ha sido inspeccionada y aprobada personalmente por la artista.<br/>
              La imagen de referencia está sellada y archivada en nuestro inventario. Todos los derechos de autor y reproducción quedan reservados por la artista.
            </p>
          </main>
          
          <div class="footer-content">
            <div class="date-block">
              <div class="date-value">${currentDate}</div>
              <div class="signature-line" style="border-bottom: none; height: 10pt;"></div>
              <p class="signature-label">Fecha de Emisión</p>
            </div>
            
            <div class="stamp-block" title="Sello Seco Digital"></div>
            
            <div class="signature-block">
              <div class="signature-line"></div>
              <p class="signature-label">Firma de la Artista</p>
            </div>
          </div>
          
          <div class="contact-info">
            ${settings.website} | ${settings.email} | ${settings.instagram}
          </div>

        </div>
      </div>
    </body>
    </html>
  `;
};

// =======================================================

export const PublicSite: React.FC<PublicSiteProps> = ({ onOpenCompanion, onOpenStudioLogin }) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'bio' | 'prices'>('portfolio');

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/logo-myriam.png" alt="Myriam Alcaraz" className="h-10 w-auto" />
            <h1 className="hidden sm:block text-lg font-serif text-slate-800 tracking-wider font-bold">
              {ARTIST_INFO.name}
            </h1>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setActiveTab('portfolio')}
              className={`px-4 py-2 text-sm font-semibold transition-colors rounded ${activeTab === 'portfolio' ? 'bg-gold-100 text-gold-700' : 'text-slate-600 hover:text-gold-700'}`}
            >
              <ImageIcon size={16} className="inline mr-2 align-middle" /> Portfolio
            </button>
            <button 
              onClick={() => setActiveTab('bio')}
              className={`px-4 py-2 text-sm font-semibold transition-colors rounded ${activeTab === 'bio' ? 'bg-gold-100 text-gold-700' : 'text-slate-600 hover:text-gold-700'}`}
            >
              <Eye size={16} className="inline mr-2 align-middle" /> Trayectoria
            </button>
            <button 
              onClick={() => setActiveTab('prices')}
              className={`px-4 py-2 text-sm font-semibold transition-colors rounded ${activeTab === 'prices' ? 'bg-gold-100 text-gold-700' : 'text-slate-600 hover:text-gold-700'}`}
            >
              <Briefcase size={16} className="inline mr-2 align-middle" /> Adquisición
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* PESTAÑA: PORTFOLIO */}
        {activeTab === 'portfolio' && (
          <section className="animate-fade-in">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-8 text-center">
              {ARTIST_INFO.tagline}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ARTWORKS.map(artwork => (
                <div key={artwork.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl hover:scale-[1.01] group">
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={artwork.image} 
                      alt={artwork.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => onOpenCompanion(artwork.id)}
                          className="bg-white text-slate-800 px-6 py-3 rounded-full font-bold uppercase text-sm tracking-wider shadow-lg hover:bg-gold-500 hover:text-white transition-colors flex items-center gap-2"
                        >
                            Ver Compañero Digital <ChevronRight size={18} />
                        </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-serif font-bold text-slate-900 truncate">{artwork.title}</h3>
                    <p className="text-sm text-gold-600 font-semibold mb-2">{artwork.technique}</p>
                    <p className="text-xs text-slate-500">{artwork.dimensions} · {artwork.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PESTAÑA: TRAYECTORIA */}
        {activeTab === 'bio' && (
          <section className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-8 text-center">
              Trayectoria y Filosofía
            </h2>
            
            <div className="bg-white p-8 rounded-xl shadow-lg space-y-10">
              
              {/* Bloque 1: Bio y Statement */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-gold-700 mb-4 border-b pb-2">Declaración Artística</h3>
                <p className="text-slate-700 leading-relaxed italic mb-6">
                  {ARTIST_INFO.statement}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {ARTIST_INFO.bioShort}
                </p>
              </div>

              {/* Bloque 2: Exposiciones y Premios */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-gold-700 mb-4 border-b pb-2">Reconocimientos</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-slate-800 text-lg mb-3 flex items-center gap-2">
                        <ShieldCheck size={20} className="text-gold-500" /> Principales Exposiciones
                    </h4>
                    <AccoladeList items={ARTIST_INFO.accolades.exposiciones} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-lg mb-3 flex items-center gap-2">
                        <ShieldCheck size={20} className="text-gold-500" /> Premios y Publicaciones
                    </h4>
                    <AccoladeList items={ARTIST_INFO.accolades.premios} />
                  </div>
                </div>
              </div>

              {/* Bloque 3: Contacto */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-gold-700 mb-4 border-b pb-2">Contacto</h3>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-slate-700">
                  <p className="flex items-center gap-2">
                    <Mail size={18} className="text-gold-500" /> 
                    <a href={`mailto:${ARTIST_INFO.email}`} className="hover:text-gold-700 transition-colors">{ARTIST_INFO.email}</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Instagram size={18} className="text-gold-500" /> 
                    <a href={`https://instagram.com/${ARTIST_INFO.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold-700 transition-colors">{ARTIST_INFO.instagram}</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <ExternalLink size={18} className="text-gold-500" /> 
                    <a href={`https://${ARTIST_INFO.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold-700 transition-colors">Web Personal</a>
                  </p>
                </div>
              </div>
              
            </div>
          </section>
        )}

        {/* PESTAÑA: ADQUISICIÓN */}
        {activeTab === 'prices' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-8 text-center">
              Adquisición y Precios Base
            </h2>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <p className="text-slate-600 mb-6 text-center">
                La inversión en arte de la artista se calcula en base al formato. El precio final puede variar ligeramente según la complejidad y el soporte.
              </p>

              {/* Tabla de Precios */}
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full divide-y divide-stone-200">
                  <thead className="bg-stone-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Dimensiones (cm)
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Precio Base (IVA no incl.)
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gold-600 uppercase tracking-wider">
                        Precio Final (IVA incl.)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-stone-200">
                    {PRICING_TABLE.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                          {row.dimensions}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 text-right">
                          € {row.priceBase.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gold-700 font-bold text-right">
                          € {row.priceWithTax.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* CTA para Proyectos */}
              <div className="bg-gold-50/50 border border-gold-200 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0 md:mr-6">
                    <h3 className="font-serif text-xl font-bold text-gold-700 mb-2 flex items-center gap-2">
                        <Mail size={20} /> Proyectos por Encargo
                    </h3>
                    <p className="text-slate-700 text-sm">
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
      <footer className="bg-white text-slate-500 py-16 text-center border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <img src="/logo-myriam.png" alt="Logo Footer" className="h-12 w-auto mx-auto mb-6 opacity-50 grayscale" />
          
          {/* BOTÓN DE ACCESO AL ESTUDIO (Solo visible en la vista pública) */}
          <button 
              onClick={onOpenStudioLogin} 
              className="mt-4 mb-8 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-gold-600 transition-colors flex items-center gap-1 mx-auto"
          >
              <Lock size={12} /> Acceder al Estudio
          </button>

          <p className="text-[10px] opacity-40 uppercase tracking-wide">© 2024 MYRIAM ALCARAZ. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>
      </footer>
    </div>
  );
};