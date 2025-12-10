import React, { useState, useMemo, useEffect } from 'react';
import { LogOut, Printer, Code, Layout, Plus, Trash2, CheckCircle, FileText, Settings, Edit, Briefcase, MinusCircle, Check, X, Copy, Image as ImageIcon, Mail, Instagram, Globe } from 'lucide-react'; 

// ---------------------------------------------------------
// 🎨 DEFINICIÓN DE TIPOS Y CONSTANTES
// ---------------------------------------------------------
interface Artwork {
  id: number;
  title: string;
  certificationDate: string; // Formato YYYY-MM-DD
  type: 'PT' | 'SC' | 'DI' | 'OT';
  seriesIndex: number | null;
  seriesTotal: number | null;
  code: string | null;
  status: 'PENDIENTE' | 'GENERADO';
  image: string; // URL o ruta de la imagen
  dimensions: string; 
  technique: string; 
  originalIndex: number; // 🛑 NUEVO: Para mantener el orden de constants.ts
  isOpenSeries: boolean; // 🛑 NUEVO: Si es una serie sin límite fijo (ej. Giclée abierta)
}

interface DocumentSettings {
  artistName: string;
  artistTitle: string;
  cycleName: string; 
  city: string;
  letterOpening: string;
  // 🛑 MODIFICADO: Nueva frase de cierre, más profesional
  letterClosing: string; 
  // 🛑 AÑADIDOS: Datos de contacto centralizados
  website: string;
  email: string;
  instagram: string;
}

interface ArtistDashboardProps {
  onLogout: () => void;
}

// 🛑 DATOS DE CONFIGURACIÓN INICIAL (Extraídos de constants.ts y borrador)
const initialSettings: DocumentSettings = {
    artistName: "Myriam Alcaraz", 
    artistTitle: "Pintura Figurativa Contemporánea", 
    cycleName: "Serie Sin Título (A Definir)", 
    city: "Madrid", 
    letterOpening: "Estimado Coleccionista,",
    // 🛑 NUEVO TEXTO DE CIERRE
    letterClosing: "Con mis mejores deseos, le extiendo mi más sincero agradecimiento por su confianza en mi trabajo y quedo a su disposición para cualquier consulta.",
    // 🛑 DATOS DE CONTACTO CORREGIDOS Y CENTRALIZADOS
    website: "https://myriamalcaraz.com", 
    email: "myriamhotmail@hotmail.com",
    instagram: "@myriamalcaraz.artist",
};

// 🛑 CATALOGO DE OBRAS REALES (Extraídas de constants.ts, incluyendo sus IDs reales 4, 2, 3, 1...)
const ARTWORKS_FOR_INITIALIZATION = [
    { id: 4, title: 'Sara en Marquesina', dimensions: '100x81 cm', technique: 'Óleo en tela', image: '/obras/OBRA_04.jpg' },
    { id: 2, title: 'Laura en el Crepúsculo', dimensions: '100x81 cm', technique: 'Óleo en tela montada en tabla', image: '/obras/OBRA_02.jpg' },
    { id: 3, title: 'Sara bajo la farola', dimensions: '92x60 cm', technique: 'Óleo sobre tela', image: '/obras/OBRA_03.jpg' },
    { id: 1, title: 'Autorretrato en siglo XIX', dimensions: '100x81 cm', technique: 'Óleo en tela montada en tabla', image: '/obras/OBRA_01.jpg' },
    { id: 5, title: 'Ana y la Habana', dimensions: '92x60 cm', technique: 'Óleo sobre tela', image: '/obras/OBRA_05.jpg' },
    { id: 6, title: 'Viajera', dimensions: '81x100 cm', technique: 'Óleo sobre tela', image: '/obras/OBRA_06.jpg' },
    { id: 7, title: 'Memorias de Mekong I', dimensions: '100x65 cm', technique: 'Óleo sobre tela', image: '/obras/OBRA_07.jpg' },
    { id: 8, title: 'Memorias de Mekong II', dimensions: '100x65 cm', technique: 'Óleo sobre tela', image: '/obras/OBRA_08.jpg' },
    { id: 9, title: 'El niño de la capucha', dimensions: '92x65 cm', technique: 'Óleo sobre tela', image: '/obras/OBRA_09.jpg' },
    { id: 10, title: 'Joven en piscina', dimensions: '73x100 cm', technique: 'Óleo sobre lienzo', image: '/obras/OBRA_10.jpg' },
    { id: 11, title: 'Pablo en Cascada', dimensions: '55x46 cm', technique: 'Óleo sobre tela', image: '/obras/OBRA_11.jpg' },
    { id: 12, title: 'Pablo en Cascada II', dimensions: '80x65 cm', technique: 'Óleo sobre tela', image: '/obras/OBRA_12.jpg' },
    { id: 13, title: 'Niños en playa valenciana', dimensions: '80x60 cm', technique: 'Óleo sobre tela', image: '/obras/OBRA_13.jpg' },
    { id: 14, title: 'Buceando', dimensions: '100x65 cm', technique: 'Óleo sobre tela', image: '/obras/OBRA_14.jpg' },
    { id: 15, title: 'Niños con capucha', dimensions: '100x81 cm', technique: 'Óleo sobre tela', image: '/obras/OBRA_15.jpg' },
    { id: 16, title: 'Niños en playa rocosa', dimensions: '55x46 cm', technique: 'Óleo sobre lienzo', image: '/obras/OBRA_16.jpg' },
    { id: 17, title: 'Jilguero en charca del Botánico', dimensions: '46x38 cm', technique: 'Óleo sobre lienzo', image: '/obras/OBRA_17.jpg' },
    { id: 18, title: 'Porteadores', dimensions: '55x46 cm', technique: 'Óleo sobre lienzo', image: '/obras/OBRA_18.jpg' },
    { id: 19, title: 'Carpe Diem', dimensions: '140x50 cm', technique: 'Óleo sobre tela', image: '/obras/OBRA_19.jpg' },
    { id: 20, title: 'Más que amigos', dimensions: '100x60 cm', technique: 'Óleo sobre tela', image: '/obras/OBRA_20.jpg' }
];

const REAL_ARTWORKS: Artwork[] = ARTWORKS_FOR_INITIALIZATION.map((art, index) => ({
    id: art.id,
    title: art.title,
    certificationDate: '2025-12-10', // Fecha inicial de ejemplo
    type: 'PT', // Pintura por defecto
    seriesIndex: null, // Obra única por defecto
    seriesTotal: null, 
    code: null, 
    status: 'PENDIENTE', 
    image: art.image, 
    dimensions: art.dimensions, 
    technique: art.technique, 
    originalIndex: index, // Mantiene el orden de constants.ts
    isOpenSeries: false, // 🛑 NUEVO: Por defecto no es serie abierta
}));


// ---------------------------------------------------------
// 🚀 FUNCIÓN CENTRAL: CODIFICACIÓN INTELIGENTE
// ---------------------------------------------------------
const generateSmartCode = (artworkToCode: Artwork): string => {
    const dateParts = artworkToCode.certificationDate.split('-'); 
    const year = dateParts[0];
    const yearShort = year.substring(2);
    const month = dateParts[1];
    const dateCode = `${yearShort}${month}`;

    let seriesCode = '';
    // Si es serie limitada, usa el formato Index/Total al final
    if (artworkToCode.seriesIndex !== null && artworkToCode.seriesTotal !== null && !artworkToCode.isOpenSeries) {
        const indexFmtd = String(artworkToCode.seriesIndex).padStart(2, '0');
        const totalFmtd = String(artworkToCode.seriesTotal).padStart(2, '0');
        return `MA-${year}-${dateCode}-${indexFmtd}/${totalFmtd}`; 
    }
    
    // Si es única o serie abierta, usa el ID de obra
    return `MA-${year}-${dateCode}-${String(artworkToCode.id).padStart(2, '0')}`;
};


// ---------------------------------------------------------
// 📄 GENERADORES DE HTML PARA IMPRESIÓN 
// ---------------------------------------------------------
/**
 * 🛑 MODIFICADO: Ahora maneja Edición Seriada Abierta (Giclée)
 */
const getSeriesText = (artwork: Artwork) => {
    if (artwork.seriesIndex !== null && artwork.seriesTotal !== null && !artwork.isOpenSeries) {
        return `Edición Limitada ${artwork.seriesIndex}/${artwork.seriesTotal}`;
    }
    if (artwork.isOpenSeries) { 
        return `Edición Seriada Abierta (Giclée)`;
    }
    return `Obra Única Original`;
}

/**
 * Genera el HTML del CERTIFICADO. 
 */
const getCertificateHtml = (artwork: Artwork, settings: DocumentSettings): string => {
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    const creationMonthAndYear = new Date(artwork.certificationDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });

    // Diseño de Iconos y Estilos del Footer
    const contactFooterHtml = `
        <div class="contact-footer">
            <span class="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 0 4 10 15.3 15.3 0 0 0-4 10zM22 12A15.3 15.3 0 0 0 18 8m-4-4a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10"/></svg>
                <a href="${settings.website}" target="_blank">${settings.website.replace('https://', '')}</a>
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
                /* Estilos Fieles al Borrador: Tipografía Serifa, Doble Borde, Centro */
                body { font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif; font-size: 12pt; margin: 20mm; color: #111; }
                .cert-container { 
                    /* 🛑 CORRECCIÓN DEL MARCO: Borde fino (1px negro) + Outline grueso (3px dorado) */
                    border: 1px solid #000; 
                    outline: 3px solid #d4af37; /* Marco grueso dorado */
                    outline-offset: 5px; /* Crea el espacio entre el borde fino y el outline grueso */
                    padding: 40px; 
                    max-width: 550px; 
                    margin: 0 auto;
                }
                .header { 
                    text-align: center; 
                    padding-bottom: 20px; 
                    border-bottom: 1px solid #ddd;
                    margin-bottom: 30px;
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
                    color: #d4af37;
                    text-transform: uppercase;
                }
                .fixed-text {
                    text-align: center;
                    font-size: 10pt;
                    color: #333;
                    margin: 30px 0;
                    line-height: 1.5;
                }
                .fixed-text strong {
                    font-size: 14pt;
                    color: #000;
                    display: block;
                    margin-top: 5px;
                }
                .artwork-image-section {
                    /* 🛑 AJUSTE SOLICITADO: Reducido el tamaño máximo de la foto para evitar el desbordamiento en DINA4 */
                    width: 70%; 
                    max-width: 200px; /* REDUCIDO de 250px a 200px */
                    margin: 15px auto; /* Reducido el margen vertical */
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
                    margin: 20px auto 40px auto;
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
                
                /* Estilos del Footer de Contacto (Iconos y Datos) */
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
                .contact-item a:hover {
                    color: #000;
                }
                .contact-item svg {
                    flex-shrink: 0;
                }

                /* 🛑 AJUSTE SOLICITADO: Bloque de Firma */
                .signature-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start; 
                    margin-top: 40px; 
                    padding-top: 20px;
                }
                .date-col {
                    flex-basis: 45%; 
                    text-align: left;
                    font-size: 10pt;
                    color: #333;
                }
                /* 🛑 ALINEACIÓN DERECHA PARA LA FIRMA */
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
                        border: 1px solid #000; 
                        /* Mantener el doble marco también en impresión */
                        outline: 3px solid #d4af37; 
                        outline-offset: 5px;
                        max-width: 100%; 
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

/**
 * Genera el HTML de la CARTA. 
 * 🛑 MODIFICADO: 
 * 1. Marco dorado (elegancia).
 * 2. Posición de texto (bajarlo).
 * 3. Logo más grande.
 * 4. Saludo de cierre a la izquierda.
 * 5. ⚠️ CORREGIDO: Simetría en el marco (T/B/L/R).
 */
const getLetterHtml = (artwork: Artwork, settings: DocumentSettings): string => {
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    
    const seriesText = getSeriesText(artwork);
    
    // Referencia de la carta para reflejar la edición abierta
    let seriesReference = '';
    if (artwork.seriesIndex !== null) {
        seriesReference = `y pertenece a mi ciclo <span class="artwork-ref">${settings.cycleName}</span>.`;
    } else if (artwork.isOpenSeries) {
        seriesReference = `y forma parte de la <span class="artwork-ref">Edición Seriada Abierta (Giclée)</span>.`;
    } else {
        seriesReference = `y es una <span class="artwork-ref">pieza única original</span>.`;
    }

    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <title>Carta Personalizada - ${artwork.title}</title>
            <style>
                /* 🛑 MANTENEMOS MARGIN: 20MM en BODY para el espacio entre el borde del papel y el marco dorado */
                body { font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif; font-size: 13pt; margin: 20mm; color: #111; line-height: 1.8; }
                
                /* 🛑 CONTENEDOR CON MARCO DORADO PARA LA CARTA */
                .letter-container { 
                    border: 1px solid #000; 
                    outline: 3px solid #d4af37; /* Marco grueso dorado */
                    outline-offset: 5px; /* Espacio entre bordes */
                    
                    /* 🛑 CORREGIDO: Se aplica un padding interno uniforme 
                       - 30mm vertical (para bajar el texto simétricamente)
                       - 70px horizontal (para el espacio lateral)
                       - margin: 0 auto; para centrado horizontal. */
                    padding: 30mm 70px; 
                    margin: 0 auto; 
                }

                .top-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
                /* 🛑 LOGO MÁS GRANDE */
                .logo-container img { max-height: 80px; width: auto; opacity: 0.8; }
                .address-container { text-align: right; }
                .address-container p { margin: 0; font-size: 11pt; color: #333; }
                
                .body-content { margin-top: 30px; }
                .artwork-ref { font-style: italic; font-weight: bold; color: #000; }
                
                /* 🛑 MODIFICADO: Bloque de Firma alineado a la derecha */
                .signature-area { 
                    margin-top: 0; /* Ya no lleva el margen grande */
                    text-align: right; 
                }
                .signature-line { 
                    height: 50px; 
                    border-bottom: 1px solid #999; 
                    width: 50%; 
                    margin-left: 50%; /* Mantiene la línea a la derecha */
                    margin-bottom: 5px; 
                }
                .signature-area p { margin: 5px 0; }
                .artist-name { font-weight: bold; font-size: 16pt; margin-top: 10px; }
                
                @media print { body { margin: 0; padding: 0; } }
            </style>
        </head>
        <body>
            <div class="letter-container">
            
                <div class="top-header">
                    <div class="logo-container">
                        <img src="/logo-myriam.png" alt="${settings.artistName} Logo" />
                    </div>
                    <div class="address-container">
                        <p>${settings.city}, a ${today}</p>
                    </div>
                </div>
                
                <p style="font-weight: bold; margin-bottom: 40px;">${settings.letterOpening}</p>

                <div class="body-content">
                    <p>
                        Es un honor para mí que haya elegido una de mis creaciones para enriquecer su colección. Con esta carta, le hago entrega formal del Certificado de Autenticidad, el cual respalda la procedencia y la calidad de su nueva obra.
                    </p>
                    
                    <p style="margin-top: 30px;">
                        La pieza, <span class="artwork-ref">"${artwork.title}"</span> (${seriesText}), ha sido registrada con el código de trazabilidad **${artwork.code}**, ${seriesReference}
                    </p>
                    
                    <p style="margin-top: 40px;">
                        ${settings.letterClosing}
                    </p>
                </div>
                
                <p style="font-style: italic; margin-top: 80px; margin-bottom: 15px; text-align: left;">Reciba un cordial saludo,</p>

                <div class="signature-area">
                    <div class="signature-line"></div> 
                    <p class="artist-name">${settings.artistName}</p>
                    <p>${settings.artistTitle}</p>
                </div>

            </div>
        </body>
        </html>
    `;
};

const handlePrintDocument = (content: string, title: string) => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (printWindow) {
        printWindow.document.write(content);
        printWindow.document.title = title;
        printWindow.document.close();
        setTimeout(() => {
            printWindow.print();
        }, 500); 
    } else {
        alert("Por favor, permite las ventanas emergentes para generar el documento.");
    }
}


// =========================================================
// 🏭 COMPONENTE: TARJETA VISUAL DE GESTIÓN
// =========================================================

interface ArtworkWorkstationProps {
    artwork: Artwork;
    settings: DocumentSettings;
    onGenerateCode: (id: number) => void;
    onDelete: (id: number) => void;
    onDuplicate: (artwork: Artwork) => void;
    onEdit: (artwork: Artwork) => void;
}

const ArtworkWorkstation: React.FC<ArtworkWorkstationProps> = ({ artwork, settings, onGenerateCode, onDelete, onDuplicate, onEdit }) => {
    
    const certificateContent = useMemo(() => artwork.code ? getCertificateHtml(artwork, settings) : '', [artwork, settings]);
    const letterContent = useMemo(() => artwork.code ? getLetterHtml(artwork, settings) : '', [artwork, settings]);

    return (
        // Estilo de Galería
        <div className="relative bg-white rounded-xl shadow-lg group overflow-hidden transition-all hover:shadow-2xl hover:scale-[1.01]">
            
            {/* Imagen y Tools (Overlay) */}
            <div className="relative aspect-[4/3] bg-stone-100 cursor-pointer">
                <img 
                    src={artwork.image || '/obras/placeholder-work.jpg'} 
                    alt={artwork.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:opacity-50" 
                />
                
                {/* Overlay con los botones de Certificado/Carta (Aparece al hacer hover/click) */}
                <div className={`absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity p-4 ${!artwork.code && 'opacity-100 bg-red-800/80'}`}>
                    
                    {/* ACCIÓN PRINCIPAL (GENERAR CÓDIGO) */}
                    {!artwork.code ? (
                        // Se muestra para obras PENDIENTES (manual o nuevas)
                        <>
                            <p className="text-white text-xs font-semibold uppercase tracking-wider mb-2">Paso Requerido</p>
                            <button
                                onClick={() => onGenerateCode(artwork.id)}
                                className="bg-gold-500 text-white py-3 px-6 rounded-lg font-bold text-sm hover:bg-gold-600 transition-colors flex items-center gap-2 w-full justify-center shadow-lg"
                                title="Generar Código Único de Trazabilidad para esta obra"
                            >
                                <Code size={18} /> GENERAR CÓDIGO INTELIGENTE
                            </button>
                            <p className="text-white/80 text-xs mt-1">Si ya tiene un código (ej. Giclée), puede introducirlo con el botón "Editar Datos" abajo.</p>
                        </>
                    ) : (
                        // ACCIONES DE DOCUMENTACIÓN (CERTIFICADO Y CARTA) - Esto se verá si ya tienen código.
                        <>
                            <p className="text-white text-xs font-semibold uppercase tracking-wider mb-2">Documentos Listos</p>
                            
                            <button
                                onClick={() => handlePrintDocument(certificateContent, `Certificado ${artwork.code}`)}
                                className="bg-blue-600 text-white py-3 px-6 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 w-full shadow-lg"
                            >
                                <Printer size={16} /> IMPRIMIR CERTIFICADO
                            </button>
                            
                            <button
                                onClick={() => handlePrintDocument(letterContent, `Carta ${artwork.code}`)}
                                className="bg-blue-600/80 text-white py-3 px-6 rounded-lg font-bold text-sm hover:bg-blue-700/80 transition-colors flex items-center justify-center gap-2 w-full shadow-lg"
                            >
                                <FileText size={16} /> IMPRIMIR CARTA
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Título y Acciones Secundarias (Siempre visibles: Editar, Duplicar, Eliminar) */}
            <div className="p-4 flex justify-between items-center">
                <div>
                    <h4 className="text-lg font-bold text-slate-800 leading-tight">{artwork.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{getSeriesText(artwork)}</p>
                </div>
                <div className="flex gap-1.5">
                    {/* Botón para abrir el formulario y EDITAR datos (Acceso al formulario de gestión) */}
                    <button
                        onClick={() => onEdit(artwork)} 
                        className="text-slate-500 hover:text-orange-500 p-1 rounded transition"
                        title="Editar Datos de Obra"
                    >
                        <Edit size={18} />
                    </button>
                    {/* Botón para DUPLICAR (Crea una obra nueva con datos pre-rellenados) */}
                    <button
                        onClick={() => onDuplicate(artwork)}
                        className="text-slate-500 hover:text-blue-500 p-1 rounded transition"
                        title="Duplicar Obra (para siguiente de la serie o similar)"
                    >
                        <Copy size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(artwork.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded transition"
                        title="Eliminar Obra"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            {/* Cinta de Estado (Arriba a la derecha) */}
            <div className={`absolute top-0 right-0 text-white text-[10px] font-bold px-3 py-1 rounded-bl ${artwork.code ? 'bg-green-600' : 'bg-red-600'}`}>
                {artwork.code ? `ID: ${artwork.code}` : 'PENDIENTE'}
            </div>
        </div>
    );
};


// =========================================================
// ➕ COMPONENTE: FORMULARIO DE GESTIÓN (Modal/Panel Flotante)
// =========================================================

interface ArtworkFormProps {
    // 🛑 Modificación: Ahora se acepta el código, estado e isOpenSeries
    onSave: (artwork: Omit<Artwork, 'id' | 'originalIndex'>, idToUpdate: number | null) => void;
    artworkToManage: Artwork | null;
    onCancel: () => void;
}

const ArtworkManagementForm: React.FC<ArtworkFormProps> = ({ onSave, artworkToManage, onCancel }) => {
    
    // Estado interno del formulario
    const isEditing = artworkToManage && artworkToManage.id > 0; 
    const isDuplicating = artworkToManage && artworkToManage.id === -1; 

    const [title, setTitle] = useState('');
    const [certificationDate, setCertificationDate] = useState(new Date().toISOString().substring(0, 10));
    
    // 🛑 Modificación de estados para la gestión de Ediciones
    const [isSeries, setIsSeries] = useState(false); // Para Edición Limitada
    const [isOpenSeries, setIsOpenSeries] = useState(false); // 🛑 NUEVO: Para Edición Seriada Abierta (Giclée)
    const [seriesIndex, setSeriesIndex] = useState<number | ''>('');
    const [seriesTotal, setSeriesTotal] = useState<number | ''>('');
    
    const [imagePath, setImagePath] = useState(''); 
    const [dimensions, setDimensions] = useState('');
    const [technique, setTechnique] = useState('');
    const [manualCode, setManualCode] = useState<string>(''); 
    
    // Hook para PRE-RELLENAR el formulario (al añadir, duplicar o editar)
    useEffect(() => {
        if (artworkToManage) {
            setTitle(artworkToManage.title);
            setCertificationDate(isDuplicating ? new Date().toISOString().substring(0, 10) : artworkToManage.certificationDate); 
            
            // Lógica de carga de Edición
            setIsOpenSeries(artworkToManage.isOpenSeries); // 🛑 NUEVO
            
            const isLimitedSeries = artworkToManage.seriesIndex !== null && artworkToManage.seriesTotal !== null && !artworkToManage.isOpenSeries;
            setIsSeries(isLimitedSeries); // Si tiene índices Y NO es abierta, es limitada.

            setSeriesIndex(isLimitedSeries && isDuplicating ? artworkToManage.seriesIndex! + 1 : artworkToManage.seriesIndex ?? '');
            setSeriesTotal(artworkToManage.seriesTotal ?? '');

            setImagePath(artworkToManage.image);
            setDimensions(artworkToManage.dimensions);
            setTechnique(artworkToManage.technique);
            setManualCode(artworkToManage.code ?? '');
        } else {
            // Valores por defecto para "Añadir Nueva Obra"
            setTitle('');
            setCertificationDate(new Date().toISOString().substring(0, 10));
            
            // Reseteo de Edición
            setSeriesIndex('');
            setSeriesTotal('');
            setIsSeries(false);
            setIsOpenSeries(false); // 🛑 NUEVO

            setImagePath('');
            setDimensions(''); 
            setTechnique('');
            setManualCode('');
        }
    }, [artworkToManage, isDuplicating]); 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        let index = null;
        let total = null;

        if (isSeries && !isOpenSeries) { // Solo si es serie limitada
            index = seriesIndex === '' ? null : Number(seriesIndex);
            total = seriesTotal === '' ? null : Number(seriesTotal);
            
            if (index === null || total === null || index > total) {
                alert("Revise los campos de la edición seriada limitada (N° Pieza y Total Edición).");
                return;
            }
        } 
        
        if (title.trim() === '' || dimensions.trim() === '' || technique.trim() === '') {
             alert("El título, las dimensiones y la técnica de la obra son obligatorios.");
             return;
        }
        
        const finalCode = manualCode.trim() || null;
        const finalStatus: 'PENDIENTE' | 'GENERADO' = finalCode ? 'GENERADO' : 'PENDIENTE';

        const newArtworkData: Omit<Artwork, 'id' | 'originalIndex'> = {
            title: title.trim(),
            certificationDate: certificationDate,
            type: 'PT', 
            seriesIndex: index, // Será null si no es serie limitada
            seriesTotal: total, // Será null si no es serie limitada
            image: imagePath || '/obras/placeholder-work.jpg', 
            dimensions: dimensions.trim(), 
            technique: technique.trim(), 
            code: finalCode,
            status: finalStatus,
            isOpenSeries: isOpenSeries, // 🛑 NUEVO
        };

        const idToUpdate = isEditing ? artworkToManage!.id : null;

        onSave(newArtworkData, idToUpdate);
        onCancel(); // Cerrar formulario al guardar
    };

    const headerText = isEditing ? 'EDITAR Datos de Obra' : (isDuplicating ? 'DUPLICANDO Obra Seriada' : 'Añadir Nueva Obra al Catálogo');

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center p-8">
            <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-2xl mt-10 relative">
                
                <button 
                    type="button" 
                    onClick={onCancel} 
                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                    title="Cerrar Formulario"
                >
                    <X size={24} />
                </button>

                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6 border-b pb-3">
                    {isEditing ? <Edit size={24} className="text-orange-500" /> : <Plus size={24} className="text-gold-500" />} {headerText}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    
                    {/* Título */}
                    <div className="col-span-1 md:col-span-3">
                        <label className="block text-xs font-medium text-slate-500 mb-1">Título de la Obra</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ej: La Ciudad Secreta"
                            className="w-full p-2 border rounded text-sm focus:ring-gold-500 focus:border-gold-500"
                            required
                        />
                    </div>
                    
                    {/* Fecha */}
                    <div className="col-span-1 md:col-span-3">
                        <label className="block text-xs font-medium text-slate-500 mb-1">Fecha de Creación/Certificación</label>
                        <input 
                            type="date" 
                            value={certificationDate} 
                            onChange={(e) => setCertificationDate(e.target.value)}
                            className="p-2 border rounded text-sm w-full text-center focus:ring-gold-500 focus:border-gold-500"
                            max={new Date().toISOString().substring(0, 10)}
                            required
                        />
                    </div>

                    {/* Dimensiones */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-xs font-medium text-slate-500 mb-1">Medidas (Ej: 100x81 cm)</label>
                        <input 
                            type="text" 
                            value={dimensions} 
                            onChange={(e) => setDimensions(e.target.value)}
                            placeholder="Ej: 100x81 cm"
                            className="w-full p-2 border rounded text-sm focus:ring-gold-500 focus:border-gold-500"
                            required
                        />
                    </div>
                    
                    {/* Técnica */}
                    <div className="col-span-1 md:col-span-4">
                        <label className="block text-xs font-medium text-slate-500 mb-1">Técnica/Medio</label>
                        <input 
                            type="text" 
                            value={technique} 
                            onChange={(e) => setTechnique(e.target.value)}
                            placeholder="Ej: Óleo sobre tela en tabla con bastidor"
                            className="w-full p-2 border rounded text-sm focus:ring-gold-500 focus:border-gold-500"
                            required
                        />
                    </div>
                     
                    {/* Imagen URL */}
                    <div className="col-span-1 md:col-span-3">
                        <label className="block text-xs font-medium text-slate-500 mb-1 flex justify-between items-center">
                            Ruta/URL de Imagen de la Obra (Para Certificado)
                            <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => setImagePath('/obras/demo-obra.jpg')}>Usar Demo</span>
                        </label>
                        <input 
                            type="text" 
                            value={imagePath} 
                            onChange={(e) => setImagePath(e.target.value)}
                            placeholder="/obras/Sara-Farola.jpg"
                            className="w-full p-2 border rounded text-sm focus:ring-gold-500 focus:border-gold-500"
                        />
                    </div>
                    
                    {/* Código Manual/Giclée (NUEVO) */}
                    <div className="col-span-1 md:col-span-3">
                        <label className="block text-xs font-medium text-slate-500 mb-1">CÓDIGO de Certificado (Opcional/Giclée)</label>
                        <input 
                            type="text" 
                            value={manualCode} 
                            onChange={(e) => setManualCode(e.target.value)}
                            placeholder="Ej: MA-2025-01/50 (Giclée) o MA-2025-09"
                            className="w-full p-2 border rounded text-sm focus:ring-gold-500 focus:border-gold-500"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">Si introduce un código aquí, la obra se marcará como **GENERADA**.</p>
                    </div>

                    
                    {/* Control de Serie 🛑 MODIFICADO */}
                    <div className="flex flex-col gap-2 col-span-1 md:col-span-6 border-t pt-4 mt-4">
                        <label className="text-xs font-medium text-slate-500 mb-1">Tipo de Edición</label>
                        
                        <div className="flex items-center gap-6">
                            {/* Opción Obra Única (Default) */}
                            <label className="flex items-center text-sm cursor-pointer">
                                <input 
                                    type="radio"
                                    checked={!isSeries && !isOpenSeries}
                                    onChange={() => {
                                        setIsSeries(false); 
                                        setIsOpenSeries(false);
                                    }}
                                    className="mr-2 rounded-full text-gold-500 focus:ring-gold-500"
                                    name="editionType"
                                />
                                Obra Única Original
                            </label>
                            
                            {/* Opción Edición Limitada (Con índices) */}
                            <label className="flex items-center text-sm cursor-pointer">
                                <input 
                                    type="radio"
                                    checked={isSeries && !isOpenSeries}
                                    onChange={() => {
                                        setIsSeries(true);
                                        setIsOpenSeries(false);
                                    }}
                                    className="mr-2 rounded-full text-gold-500 focus:ring-gold-500"
                                    name="editionType"
                                />
                                Edición Seriada Limitada
                            </label>
                            
                            {/* Opción Edición Abierta (Giclée) */}
                            <label className="flex items-center text-sm cursor-pointer">
                                <input 
                                    type="radio"
                                    checked={isOpenSeries}
                                    onChange={() => {
                                        setIsOpenSeries(true);
                                        setIsSeries(false); 
                                        // Cuando es Abierta, no hay índices, así que se fuerzan a null
                                        setSeriesIndex(''); 
                                        setSeriesTotal('');
                                    }}
                                    className="mr-2 rounded-full text-gold-500 focus:ring-gold-500"
                                    name="editionType"
                                />
                                Edición Seriada Abierta (Giclée)
                            </label>
                        </div>

                        {/* Inputs de Series Limitadas (Visibles solo si es Edición Limitada) */}
                        {isSeries && !isOpenSeries && (
                            <div className="flex gap-4 max-w-md mt-3 p-3 bg-stone-50 rounded border">
                                <input 
                                    type="number" 
                                    value={seriesIndex} 
                                    onChange={(e) => setSeriesIndex(e.target.value === '' ? '' : Math.max(1, Number(e.target.value)))}
                                    placeholder="N° Pieza (Ej: 1)"
                                    className="p-2 border rounded text-sm w-1/2 text-center focus:ring-gold-500 focus:border-gold-500"
                                    min="1"
                                    required
                                />
                                <input 
                                    type="number" 
                                    value={seriesTotal} 
                                    onChange={(e) => setSeriesTotal(e.target.value === '' ? '' : Math.max(1, Number(e.target.value)))}
                                    placeholder="Total Edición (Ej: 50)"
                                    className="p-2 border rounded text-sm w-1/2 text-center focus:ring-gold-500 focus:border-gold-500"
                                    min="1"
                                    required
                                />
                            </div>
                        )}
                    </div>
                    
                    {/* Botón Guardar */}
                    <div className="col-span-6 mt-4">
                        <button 
                            type="submit"
                            className="w-full bg-slate-700 text-white py-3 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-md"
                            disabled={!title.trim() || !dimensions.trim() || !technique.trim()}
                        >
                            <Check size={18} /> {isEditing ? 'ACTUALIZAR OBRA' : 'GUARDAR Y VOLVER'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};


// =========================================================
// ⚙️ COMPONENTE PRINCIPAL DEL DASHBOARD (CONTENEDOR)
// =========================================================
export const ArtistDashboard: React.FC<ArtistDashboardProps> = ({ onLogout }) => {
    
    // 🛑 Inicialización con los datos REALES del catálogo completo
    const [artworks, setArtworks] = useState<Artwork[]>(REAL_ARTWORKS);
    
    // 🛑 Inicialización con los datos CORREGIDOS
    const [documentSettings, setDocumentSettings] = useState<DocumentSettings>(initialSettings);
    const [artworkToManage, setArtworkToManage] = useState<Artwork | null>(null);

    // 🛑 Handler para añadir o editar obra (Acepta ahora code y status)
    const handleSaveArtwork = (artworkData: Omit<Artwork, 'id' | 'originalIndex'>, idToUpdate: number | null) => {
        
        // El status ya viene determinado por el formulario (si hay código manual o no)
        const finalStatus = artworkData.code ? 'GENERADO' : 'PENDIENTE';

        if (idToUpdate) {
            // EDICIÓN
            setArtworks(prevArtworks => prevArtworks.map(artwork => {
                if (artwork.id === idToUpdate) {
                    return { 
                        ...artwork, 
                        ...artworkData,
                        status: finalStatus, // Asegura el estado correcto si se puso/quitó el código
                    };
                }
                return artwork;
            }));
        } else {
            // AÑADIR NUEVA
            // Genera el ID más alto + 1
            const newId = Math.max(0, ...artworks.map(a => a.id)) + 1;
            const newArtwork: Artwork = {
                id: newId,
                ...artworkData,
                status: finalStatus,
                originalIndex: artworks.length, // Se añade al final
            }; 
            setArtworks(prevArtworks => [newArtwork, ...prevArtworks]); 
        }
        setArtworkToManage(null); // Limpiar el estado de gestión
    };
    
    // Handler para duplicar (Prepara el formulario con los datos de la obra original, pero con ID temporal -1 para que se cree como nueva)
    const handleDuplicateArtwork = (artwork: Artwork) => {
        const temporaryDuplicationArtwork: Artwork = {
            ...artwork,
            id: -1, // ID temporal que indica duplicación
            code: null, // El duplicado debe tener el código nulo para forzar la re-certificación
            status: 'PENDIENTE',
            seriesIndex: artwork.seriesIndex !== null ? artwork.seriesIndex + 1 : artwork.seriesIndex, // Sugiere el siguiente índice
        };
        setArtworkToManage(temporaryDuplicationArtwork);
    };

    // Handler para generar código (Se activa con el botón azul/rojo de la tarjeta)
    const handleGenerateCode = (id: number) => {
        setArtworks(prevArtworks => prevArtworks.map(artwork => {
            if (artwork.id === id && artwork.status === 'PENDIENTE') {
                const newCode = generateSmartCode(artwork); 
                return { ...artwork, code: newCode, status: 'GENERADO' };
            }
            return artwork;
        }));
    };
    
    // Handler para eliminar obra
    const handleDeleteArtwork = (id: number) => {
        if (window.confirm("¿Seguro que quieres eliminar esta obra de la lista de gestión? Esta acción es irreversible.")) {
            setArtworks(prevArtworks => prevArtworks.filter(artwork => artwork.id !== id));
        }
    };
    
    // 🛑 Obras ordenadas: Generadas primero, luego pendientes. Dentro de cada grupo, respeta el orden original (constants.ts).
    const sortedArtworks = useMemo(() => {
        // Se hace una copia para evitar mutar el estado original durante la ordenación.
        return [...artworks].sort((a, b) => {
            // 1. Sort by Status (GENERADO: -1 / PENDIENTE: 1)
            if (a.status === 'GENERADO' && b.status === 'PENDIENTE') return -1;
            if (a.status === 'PENDIENTE' && b.status === 'GENERADO') return 1;
            
            // 2. Sort by originalIndex (Mantiene el orden de constants.ts)
            return a.originalIndex - b.originalIndex;
        });
    }, [artworks]);


    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
        
            <div className="max-w-6xl mx-auto">
                
                {/* CABECERA Y BOTONES GLOBALES (LIMPIOS) */}
                <div className="flex justify-between items-center mb-10 border-b pb-4">
                    <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                        <Layout size={28} className="text-gold-500" /> TALLER / ESTUDIO
                    </h1>
                    
                    {/* BOTÓN PERMANENTE DE NUEVA OBRA */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => setArtworkToManage(null)} // Abre el formulario en modo 'Añadir Nueva'
                            className="flex items-center gap-2 text-sm font-bold text-white bg-gold-500 hover:bg-gold-600 transition-colors py-3 px-4 rounded-lg shadow-md"
                            title="Añadir una nueva obra a tu catálogo"
                        >
                            <Plus size={16} /> NUEVA OBRA
                        </button>
                        <button 
                            onClick={onLogout} 
                            className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-500 transition-colors py-3 px-4 border border-stone-200 rounded-lg hover:border-red-500"
                        >
                            <LogOut size={16} /> Salir
                        </button>
                    </div>
                </div>

                {/* GALERÍA DE OBRAS */}
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6">
                    <ImageIcon size={24} className="text-gold-500" /> Obras en Catálogo ({artworks.length})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {artworks.length === 0 ? (
                        <div className="md:col-span-4 p-12 bg-white rounded-xl shadow-lg border border-stone-100 text-center">
                            <p className="text-xl text-slate-500 font-semibold flex items-center justify-center gap-2">
                                <MinusCircle size={24} /> Catálogo de Obras vacío.
                            </p>
                            <p className="text-slate-400 mt-2">
                                Para añadir su primera pieza, haga click en el botón **NUEVA OBRA** arriba a la derecha.
                            </p>
                            <p className="text-xs text-slate-300 mt-4">
                                Nota: Para editar o duplicar una obra, use el icono <Edit size={12} className="inline-block" /> o <Copy size={12} className="inline-block" /> que aparece en cada foto.
                            </p>
                        </div>
                    ) : (
                        sortedArtworks.map(artwork => (
                            <ArtworkWorkstation
                                key={artwork.id}
                                artwork={artwork}
                                settings={documentSettings}
                                onGenerateCode={handleGenerateCode}
                                onDelete={handleDeleteArtwork}
                                onDuplicate={handleDuplicateArtwork} 
                                onEdit={setArtworkToManage} 
                            />
                        ))
                    )}
                </div>

            </div>
            
            {/* FORMULARIO DE GESTIÓN DE OBRA (Flotante) */}
            {artworkToManage !== null && (
                <ArtworkManagementForm 
                    onSave={handleSaveArtwork} 
                    artworkToManage={artworkToManage}
                    onCancel={() => setArtworkToManage(null)}
                />
            )}
            
        </div>
    );
};