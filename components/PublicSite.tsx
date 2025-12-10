import React, { useState } from 'react';
import { ARTIST_INFO, ARTWORKS, PRICING_TABLE } from '../constants';
import { Mail, Instagram, ExternalLink, Eye, ChevronRight, Image as ImageIcon, Briefcase, ShieldCheck, Lock } from 'lucide-react'; 

// =======================================================
// 🛑 START: LÓGICA DE GENERACIÓN DE HTML DEL CERTIFICADO (PARA DEMO)
// =======================================================
// NOTA: Estas interfaces, constantes y funciones se copian desde ArtistDashboard.tsx 
// para asegurar que el HTML de demostración usa el diseño final aprobado (V15).

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

// 🛑 DATOS DE CONFIGURACIÓN DE LA ARTISTA (Usando ARTIST_INFO importado)
const DEMO_SETTINGS: DemoSettings = {
    artistName: ARTIST_INFO.name, // Asume que ARTIST_INFO tiene estos campos
    artistTitle: ARTIST_INFO.title, 
    website: ARTIST_INFO.website,
    email: ARTIST_INFO.email,
    instagram: ARTIST_INFO.instagram,
};

// 🛑 DATOS DE LA OBRA DE DEMOSTRACIÓN (Edición Limitada para mostrar todos los campos)
const DEMO_ARTWORK: DemoArtwork = {
    title: ARTWORKS[1]?.title || 'Laura en el Crepúsculo', // Usa una obra real para la demo
    certificationDate: '2025-05-15', 
    seriesIndex: 7, 
    seriesTotal: 50, 
    code: 'MA-2505-07/50', 
    image: ARTWORKS[1]?.image || '/obras/OBRA_02.jpg', 
    dimensions: ARTWORKS[1]?.dimensions || '100x81 cm', 
    technique: ARTWORKS[1]?.technique || 'Óleo en tela montada en tabla', 
    isOpenSeries: false,
};

/**
 * Helper para formatear el texto de la edición. (Copiado de ArtistDashboard.tsx)
 */
const getSeriesText = (artwork: DemoArtwork) => {
    if (artwork.seriesIndex !== null && artwork.seriesTotal !== null && !artwork.isOpenSeries) {
        return `Edición Limitada ${artwork.seriesIndex}/${artwork.seriesTotal}`;
    }
    if (artwork.isOpenSeries) { 
        return `Edición Seriada Abierta (Giclée)`;
    }
    return `Obra Única Original`;
}

/**
 * Exporta el HTML del Certificado de Autenticidad para la vista de demostración pública.
 * (Copia exacta de la versión V15 final del ArtistDashboard.tsx)
 */
export const getCertificateDemoHtmlContent = (): string => {
    const artwork = DEMO_ARTWORK;
    const settings = DEMO_SETTINGS;
    
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    const creationMonthAndYear = new Date(artwork.certificationDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
    
    const GOLD_COLOR = "#b8860b"; 
    const OUTLINE_WIDTH = "4px"; 
    const OUTLINE_OFFSET = "5px"; 
    const MARGIN_SAFETY_CSS = "10mm auto 0 auto"; 

    // Diseño de Iconos y Estilos del Footer
    const contactFooterHtml = `
        <div class="contact-footer">
            <span class="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 0 4 10 15.3 15.3 0 0 0-4 10zM22 12A15.3 15.3 0 0 0 18 8m-4-4a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10"/></svg>
                <a href="${settings.website}" target="_blank">${settings.website.replace('https://', '').replace('http://', '')}</a>
            </span>
            <span class="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:${settings.email}">${settings.email}</a>
            </span>
            <span class="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                ${settings.instagram}
            </span>
        </div>
    `;


    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <title>Certificado - ${artwork.title}</title>
            <style>
                /* 🛑 FIX MARGIN EXTREMO V4: CERO margin en body para maximizar el área imprimible */
                body { font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif; font-size: 12pt; margin: 0mm; padding: 0; color: #111; } 
                
                .cert-container { 
                    /* 🛑 FIX EXTREMO BORDER V15: MARGEN FIJO DE SEGURIDAD 10mm arriba, 0mm abajo. */
                    margin: ${MARGIN_SAFETY_CSS} !important; 
                    width: 178mm; /* FIX V14: Ancho reducido */
                    box-sizing: border-box; 
                    
                    /* Borde fino (1px negro) + Outline grueso (4px dorado) */
                    border: 1px solid #000; 
                    outline: ${OUTLINE_WIDTH} solid ${GOLD_COLOR}; 
                    outline-offset: ${OUTLINE_OFFSET}; 
                    
                    /* 🛑 FIX V14: Padding ajustado a 4mm verticalmente para REDUCIR la altura. */
                    padding: 4mm 35px 4mm 35px; 
                }
                .header { 
                    text-align: center; 
                    padding-bottom: 20px; 
                    border-bottom: 1px solid #ddd;
                    margin-bottom: 15px; 
                }
                .logo { 
                    max-height: 80px; 
                    width: auto; 
                    margin-bottom: 5px; 
                    opacity: 0.9;
                }
                .subtitle {
                    font-size: 10pt;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: #555;
                    margin-top: 0;
                }
                h1 { 
                    font-size: 26pt; 
                    text-align: center; 
                    margin: 0; 
                    font-weight: 300; 
                    letter-spacing: 5px; 
                    color: ${GOLD_COLOR};
                    text-transform: uppercase;
                }
                .fixed-text {
                    text-align: center;
                    font-size: 10pt;
                    color: #333;
                    margin: 15px 0; 
                    line-height: 1.5;
                }
                .fixed-text strong {
                    font-size: 14pt;
                    color: #000;
                    display: block;
                    margin-top: 5px;
                }
                .artwork-image-section {
                    width: 70%; 
                    max-width: 160px; 
                    max-height: 180px; 
                    overflow: hidden; 
                    margin: 10px auto; 
                    border: 1px solid #ccc;
                    padding: 5px;
                    box-shadow: 0 0 8px rgba(0,0,0,0.1);
                    text-align: center;
                }
                .artwork-image-section img {
                    width: 100%;
                    height: auto;
                    display: block;
                }
                .details-grid {
                    width: 90%;
                    margin: 15px auto 30px auto;
                    font-size: 11pt;
                }
                .details-grid p {
                    margin: 10px 0;
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px dashed #ccc;
                    padding-bottom: 5px;
                }
                .details-grid strong {
                    font-weight: bold;
                    color: #000;
                    width: 150px; 
                }
                .details-grid span {
                    text-align: right;
                    color: #333;
                    flex-grow: 1;
                }
                .code-display { 
                    font-weight: bold; 
                    color: #333; 
                    padding: 0; 
                    font-family: 'Courier New', monospace; 
                }
                
                .contact-footer {
                    font-size: 9pt;
                    text-align: center;
                    color: #555;
                    margin-top: 20px;
                    padding-top: 15px;
                    border-top: 1px solid #eee;
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                }
                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                .contact-item a {
                    color: #555;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .contact-item svg {
                    flex-shrink: 0;
                }

                .signature-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start; 
                    margin-top: 20px; 
                    padding-top: 20px;
                }
                .date-col {
                    flex-basis: 45%; 
                    text-align: left;
                    font-size: 10pt;
                    color: #333;
                }
                .signature-col {
                    flex-basis: 45%; 
                    text-align: right; 
                    padding-top: 15px; 
                }
                .signature-line { 
                    border-top: 1px solid #000; 
                    display: block; 
                    width: 100%; 
                    margin-bottom: 5px; 
                }
                .artist-title-style {
                    font-size: 10pt; 
                    color: #333; 
                    margin-top: 2px;
                }
                @media print { 
                    body { margin: 0; padding: 0; } 
                    .cert-container { 
                        box-shadow: none; 
                        margin: ${MARGIN_SAFETY_CSS} !important; 
                        width: 178mm !important; 
                        border: 1px solid #000 !important; 
                        outline: ${OUTLINE_WIDTH} solid ${GOLD_COLOR} !important; 
                        outline-offset: ${OUTLINE_OFFSET} !important;
                        padding: 4mm 35px 4mm 35px !important; 
                        
                        -webkit-print-color-adjust: exact !important; 
                        print-color-adjust: exact !important;
                    } 
                }
            </style>
        </head>
        <body>
            <div class="cert-container">
                <div class="header">
                    <img src="/logo-myriam.png" alt="${settings.artistName} Logo" class="logo"/>
                    <p class="subtitle">ARTE CON ALMA Y SOFISTICACIÓN</p>
                    <h1>CERTIFICADO DE AUTENTICIDAD</h1>
                </div>

                <div class="fixed-text">
                    <p style="font-size: 10pt; color: #333; margin: 0; line-height: 1.5;">
                        Por la presente se certifica que la obra de arte descrita a continuación es una creación original y auténtica. Todos los derechos de autor y reproducción están reservados por la artista:
                    </p>
                    <strong>${settings.artistName}</strong>
                    <span class="artist-title-style">${settings.artistTitle}</span>
                </div>
                
                <div class="artwork-image-section">
                    <img src="${artwork.image}" alt="${artwork.title} - Foto de Obra"/>
                </div>
                
                <div class="details-grid">
                    <p>
                        <strong>Título de la Obra:</strong>
                        <span>${artwork.title}</span>
                    </p>
                    <p>
                        <strong>Año de Creación:</strong>
                        <span>${creationMonthAndYear}</span>
                    </p>
                    <p>
                        <strong>Medidas:</strong>
                        <span>${artwork.dimensions}</span>
                    </p>
                    <p>
                        <strong>Técnica/Medio:</strong>
                        <span>${artwork.technique}</span>
                    </p>
                    <p>
                        <strong>ID de Referencia:</strong>
                        <span class="code-display">${artwork.code}</span>
                    </p>
                    <p style="border-bottom: none;">
                        <strong>Edición:</strong>
                        <span>${getSeriesText(artwork)}</span>
                    </p>
                </div>

                <div class="signature-row">
                    <div class="date-col">
                        <p>FECHA: ${today}</p>
                    </div>

                    <div class="signature-col">
                        <span class="signature-line"></span>
                        <p class="artist-name">${settings.artistName}</p>
                        <p class="artist-title-style">${settings.artistTitle}</p>
                    </div>
                </div>
                
                ${contactFooterHtml}

            </div>
        </body>
        </html>
    `;
};
// =======================================================
// 🛑 END: LÓGICA DE GENERACIÓN DE HTML DEL CERTIFICADO
// =======================================================


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
export const PublicSite: React.FC<PublicSiteProps> = ({ onOpenCompanion, onOpenStudioLogin }) => {
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
          </div>
        )}

        {/* Cierre - CTA Final (Solo para Portfolio y Bio) 🛑 BLOQUE CORREGIDO */}
        {activeTab !== 'prices' && (
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
      <footer className="bg-white text-slate-500 py-16 text-center border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <img src="/logo-myriam.png" alt="Logo Footer" className="h-12 w-auto mx-auto mb-6 opacity-50 grayscale" />
          
          {/* 🛑 BOTÓN DE ACCESO AL ESTUDIO (Solo visible en la vista pública) */}
          <button 
              onClick={onOpenStudioLogin} 
              className="mt-4 mb-8 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-gold-600 transition-colors flex items-center gap-1 mx-auto"
          >
              <Lock size={12} /> Acceder al Estudio
          </button>

          <p className="text-[10px] opacity-40 uppercase tracking-wide">© 2025 Myriam Alcaraz. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};