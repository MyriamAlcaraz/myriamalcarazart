import React, { useState, useMemo, useEffect } from 'react';
import { LogOut, Printer, Code, Layout, Plus, Trash2, CheckCircle, FileText, Settings, Edit, Briefcase, MinusCircle, Check, X, Copy, Image as ImageIcon, Mail, Instagram, Globe, AlertTriangle, Hash, Save, Eye } from 'lucide-react';
import { CertificatePreview } from './CertificatePreview';


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
    originalIndex: number; // Para mantener el orden de constants.ts
    isOpenSeries: boolean; // Si es una serie sin límite fijo (ej. Giclée abierta)
    // Campos específicos para Giclée
    originalDimensions?: string; // Medidas de la obra original (ej: "92 x 60 cm")
    gicleeDimensions?: string;   // Medidas de la impresión Giclée (ej: "30 x 40 cm")
    hologramNumber?: string;     // Nº Holograma Hahnemühle
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
// Obras nuevas (IDs > 20) - Siempre al principio
const NEW_ARTWORKS = [
    { id: 21, title: 'Abruma y belleza', dimensions: '100x73 cm', technique: 'Óleo sobre tela', image: '/obras/OBRA_21.jpg' },
    { id: 22, title: 'Joven con vela en la bruma', dimensions: '100x73 cm', technique: 'Óleo sobre tela', image: '/obras/OBRA_22.jpg' },
    { id: 23, title: 'Sara en Retiro', dimensions: '100x80 cm', technique: 'Óleo sobre papel encolado en tabla', image: '/obras/OBRA_23.jpg' }
];

// Obras existentes (IDs 1-20) - Mantienen su orden original
const EXISTING_ARTWORKS = [
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

// Combinación final: Nuevas obras primero, luego las existentes
const ARTWORKS_FOR_INITIALIZATION = [...NEW_ARTWORKS, ...EXISTING_ARTWORKS];

// 🎨 DATOS MAESTROS DE GICLÉES YA GENERADOS (4 certificados reales)
const GICLEE_DATA: Record<number, {
    code: string;
    hologramNumber: string;
    originalDimensions: string;
    gicleeDimensions: string;
    seriesIndex: number;
    seriesTotal: number;
}> = {
    // Pequeño (30x40): Joven con vela en la bruma - ID 22
    22: {
        code: 'MA-2026-GC-JC-01/10-S',
        hologramNumber: '287213',
        originalDimensions: '100x73 cm',
        gicleeDimensions: '30x40 cm',
        seriesIndex: 1,
        seriesTotal: 10
    },
    // Mediano (50x63): Sara en Marquesina - ID 4
    4: {
        code: 'MA-2026-GC-SE-01/10-M',
        hologramNumber: '287214',
        originalDimensions: '100x81 cm',
        gicleeDimensions: '50x63 cm',
        seriesIndex: 1,
        seriesTotal: 10
    },
    // Mediano (50x61.5): Laura en el crepúsculo - ID 2
    2: {
        code: 'MA-2026-GC-LE-01/10-M',
        hologramNumber: '287215',
        originalDimensions: '100x81 cm',
        gicleeDimensions: '50x61,5 cm',
        seriesIndex: 1,
        seriesTotal: 10
    },
    // Grande (60x93.3): Sara bajo la farola - ID 3
    3: {
        code: 'MA-2026-GC-SB-01/10-L',
        hologramNumber: '287216',
        originalDimensions: '92x60 cm',
        gicleeDimensions: '60x93,3 cm',
        seriesIndex: 1,
        seriesTotal: 10
    }
};

const REAL_ARTWORKS: Artwork[] = ARTWORKS_FOR_INITIALIZATION.map((art, index) => {
    const gicleeInfo = GICLEE_DATA[art.id];

    return {
        id: art.id,
        title: art.title,
        certificationDate: gicleeInfo ? '2026-02-10' : '2025-12-10',
        type: 'PT' as const,
        seriesIndex: gicleeInfo?.seriesIndex || null,
        seriesTotal: gicleeInfo?.seriesTotal || null,
        code: gicleeInfo?.code || null,
        status: gicleeInfo ? 'GENERADO' as const : 'PENDIENTE' as const,
        image: art.image,
        dimensions: art.dimensions,
        technique: art.technique,
        originalIndex: index,
        isOpenSeries: !!gicleeInfo,
        // Campos Giclée (solo si tiene datos)
        originalDimensions: gicleeInfo?.originalDimensions,
        gicleeDimensions: gicleeInfo?.gicleeDimensions,
        hologramNumber: gicleeInfo?.hologramNumber,
    };
});

// 🛑 FIX: Constante para representar una obra nueva (ID 0)
const NEW_WORK_PLACEHOLDER: Artwork = {
    id: 0,
    title: '',
    certificationDate: new Date().toISOString().substring(0, 10),
    type: 'PT',
    seriesIndex: null,
    seriesTotal: null,
    code: null,
    status: 'PENDIENTE',
    image: '/obras/placeholder-work.jpg',
    dimensions: '',
    technique: '',
    originalIndex: -1,
    isOpenSeries: false,
};

// ---------------------------------------------------------
// 🚀 FUNCIÓN CENTRAL: CODIFICACIÓN INTELIGENTE
// ---------------------------------------------------------
const generateSmartCode = (artworkToCode: Artwork): string => {
    const dateParts = artworkToCode.certificationDate.split('-');
    const year = dateParts[0];

    // Obtener las 2 primeras letras de la primera palabra del título
    const titleInitials = artworkToCode.title
        .split(' ')[0] // Primera palabra del título
        .substring(0, 2) // Primeras 2 letras
        .toUpperCase();

    // Si es serie limitada, usa el formato Index/Total
    if (artworkToCode.seriesIndex !== null && artworkToCode.seriesTotal !== null && !artworkToCode.isOpenSeries) {
        return `MA-${year}-${titleInitials}${artworkToCode.seriesIndex}/${artworkToCode.seriesTotal}`;
    }

    // Si es Giclée (serie abierta), añadir GI
    if (artworkToCode.isOpenSeries) {
        return `MA-${year}-${titleInitials}GI1/1`;
    }

    // Si es obra única: MA-AÑO-XX1/1
    return `MA-${year}-${titleInitials}1/1`;
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
 * (Permanece igual a la V15, que fue declarada perfecta)
 */
const getCertificateHtml = (artwork: Artwork, settings: DocumentSettings): string => {
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    const creationMonthAndYear = new Date(artwork.certificationDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });

    // 🛑 Parámetros de Estilo del Marco V11
    const GOLD_COLOR = "#b8860b";
    const OUTLINE_WIDTH = "12px";
    const OUTLINE_OFFSET = "12px";

    // 🛑 FIX EXTREMO V15: Se reduce el margen superior de 20mm a 10mm.
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
                        /* 🛑 APLICAR FIX MARGIN V15 (10mm arriba, 0mm abajo) */
                        margin: ${MARGIN_SAFETY_CSS} !important; 
                        width: 178mm !important; 
                        border: 1px solid #000 !important; 
                        outline: ${OUTLINE_WIDTH} solid ${GOLD_COLOR} !important; 
                        outline-offset: ${OUTLINE_OFFSET} !important;
                        padding: 4mm 35px 4mm 35px !important; 
                        
                        /* 🛑 FORZAR COLORES */
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
                    ${artwork.isOpenSeries && artwork.originalDimensions ? `
                    <p>
                        <strong>Medidas Original:</strong>
                        <span>${artwork.originalDimensions}</span>
                    </p>
                    <p>
                        <strong>Medidas Impresión:</strong>
                        <span>${artwork.gicleeDimensions || artwork.dimensions}</span>
                    </p>
                    ` : `
                    <p>
                        <strong>Medidas:</strong>
                        <span>${artwork.dimensions}</span>
                    </p>
                    `}
                    <p>
                        <strong>${artwork.isOpenSeries ? 'Soporte:' : 'Técnica/Medio:'}</strong>
                        <span>${artwork.isOpenSeries ? 'Papel Hahnemühle Textured - William Turner' : artwork.technique}</span>
                    </p>
                    <p>
                        <strong>ID de Referencia:</strong>
                        <span class="code-display">${artwork.code}</span>
                    </p>
                    <p style="${artwork.isOpenSeries && artwork.hologramNumber ? '' : 'border-bottom: none;'}">
                        <strong>Edición:</strong>
                        <span>${getSeriesText(artwork)}</span>
                    </p>
                    ${artwork.isOpenSeries && artwork.hologramNumber ? `
                    <p style="border-bottom: none;">
                        <strong style="font-size: 9pt; color: #666;">Nº Holograma:</strong>
                        <span style="font-size: 9pt; color: #666; font-family: 'Courier New', monospace;">${artwork.hologramNumber}</span>
                    </p>
                    ` : ''}
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
 * 🛑 FIX V17: Ajuste final de padding vertical (8mm arriba, 25mm abajo) para forzar la simetría visual y evitar el corte inferior.
 */
const getLetterHtml = (artwork: Artwork, settings: DocumentSettings): string => {
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    const seriesText = getSeriesText(artwork);

    // 🛑 FIX EXTREMO DE MARCO V11
    const GOLD_COLOR = "#b8860b";
    const OUTLINE_WIDTH = "12px";
    const OUTLINE_OFFSET = "12px";
    // 🛑 FIX V15: Margen simétrico de 15mm arriba y abajo
    const MARGIN_SAFETY = "15mm";

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
                /* 🛑 FIX MARGIN EXTREMO V4: CERO margin en body para maximizar el área imprimible */
                body { font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif; font-size: 13pt; margin: 0mm; padding: 0; color: #111; line-height: 1.8; } 
                
                /* 🛑 CONTENEDOR CON MARCO DORADO PARA LA CARTA */
                .letter-container { 
                    /* 🛑 FIX EXTREMO BORDER V15: MARGEN FIJO DE SEGURIDAD 15mm simétrico (arriba/abajo) */
                    margin: ${MARGIN_SAFETY} auto !important; 
                    width: 180mm; 
                    box-sizing: border-box; 

                    border: 1px solid #000; 
                    outline: ${OUTLINE_WIDTH} solid ${GOLD_COLOR}; 
                    outline-offset: ${OUTLINE_OFFSET}; 
                    
                    /* 🛑 FIX V17: Padding superior a 8mm e inferior a 25mm. Aumenta el margen superior para 'bajar' el contenido y equilibrar visualmente el espacio. */
                    padding: 8mm 40px 25mm 40px; 
                }

                .top-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
                /* LOGO MÁS GRANDE */
                .logo-container img { max-height: 80px; width: auto; opacity: 0.8; }
                .address-container { text-align: right; }
                .address-container p { margin: 0; font-size: 11pt; color: #333; }
                
                .body-content { margin-top: 30px; }
                .artwork-ref { font-style: italic; font-weight: bold; color: #000; }
                
                /* MODIFICADO: Bloque de Firma alineado a la derecha */
                .signature-area { 
                    margin-top: 0; 
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
                
                @media print { 
                    body { margin: 0; padding: 0; } 
                    
                    /* 🛑 APLICAR FIX MARGIN V17 */
                    .letter-container { 
                        margin: ${MARGIN_SAFETY} auto !important; /* 15MM FIX */
                        width: 180mm !important; 
                        border: 1px solid #000 !important; 
                        outline: ${OUTLINE_WIDTH} solid ${GOLD_COLOR} !important; 
                        outline-offset: ${OUTLINE_OFFSET} !important;
                        padding: 8mm 40px 25mm 40px !important; /* V17 FIX: 8mm top, 25mm bottom para mayor simetría */
                        
                        /* Forzar la impresión de colores y fondos en la carta también */
                        -webkit-print-color-adjust: exact !important; 
                        print-color-adjust: exact !important;
                    }
                }
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
    onSave: (artwork: Omit<Artwork, 'id' | 'originalIndex'>, idToUpdate: number | null) => void;
    artworkToManage: Artwork | null;
    onCancel: () => void;
}

const ArtworkManagementForm: React.FC<ArtworkFormProps> = ({ onSave, artworkToManage, onCancel }) => {

    // Estado interno del formulario
    // isEditing será true solo si el ID es > 0. (id: 0 es NEW, id: -1 es DUPLICATING)
    const isEditing = artworkToManage ? artworkToManage.id > 0 : false;
    const isDuplicating = artworkToManage ? artworkToManage.id === -1 : false;
    const isAddingNew = artworkToManage ? artworkToManage.id === 0 : false;

    const [title, setTitle] = useState('');
    const [certificationDate, setCertificationDate] = useState(new Date().toISOString().substring(0, 10));

    const [isSeries, setIsSeries] = useState(false);
    const [isOpenSeries, setIsOpenSeries] = useState(false);
    const [seriesIndex, setSeriesIndex] = useState<number | ''>('');
    const [seriesTotal, setSeriesTotal] = useState<number | ''>('');

    const [imagePath, setImagePath] = useState('');
    const [dimensions, setDimensions] = useState('');
    const [technique, setTechnique] = useState('');
    const [manualCode, setManualCode] = useState<string>('');

    // Campos específicos para Giclée
    const [originalDimensions, setOriginalDimensions] = useState('');
    const [gicleeDimensions, setGicleeDimensions] = useState('');
    const [hologramNumber, setHologramNumber] = useState('');

    // Hook para PRE-RELLENAR el formulario (al añadir, duplicar o editar)
    useEffect(() => {
        if (artworkToManage) {

            // Si es nueva obra (id: 0), cargamos los valores por defecto del placeholder
            if (isAddingNew) {
                setTitle('');
                setCertificationDate(new Date().toISOString().substring(0, 10));
                setSeriesIndex('');
                setSeriesTotal('');
                setIsSeries(false);
                setIsOpenSeries(false);
                setImagePath(NEW_WORK_PLACEHOLDER.image); // placeholder image
                setDimensions('');
                setTechnique('');
                setManualCode('');
                // Campos Giclée
                setOriginalDimensions('');
                setGicleeDimensions('');
                setHologramNumber('');
                return;
            }

            // Lógica de carga para Edición (id > 0) o Duplicación (id = -1)
            setTitle(artworkToManage.title);
            setCertificationDate(isDuplicating ? new Date().toISOString().substring(0, 10) : artworkToManage.certificationDate);

            setIsOpenSeries(artworkToManage.isOpenSeries);

            const isLimitedSeries = artworkToManage.seriesIndex !== null && artworkToManage.seriesTotal !== null && !artworkToManage.isOpenSeries;
            setIsSeries(isLimitedSeries);

            // Si se duplica, sugiere el siguiente índice, si no, usa el valor actual
            const initialIndex = isLimitedSeries && isDuplicating ? artworkToManage.seriesIndex! + 1 : artworkToManage.seriesIndex ?? '';
            setSeriesIndex(initialIndex);

            setSeriesTotal(artworkToManage.seriesTotal ?? '');

            setImagePath(artworkToManage.image);
            setDimensions(artworkToManage.dimensions);
            setTechnique(artworkToManage.technique);
            setManualCode(artworkToManage.code ?? '');

            // Campos Giclée
            setOriginalDimensions(artworkToManage.originalDimensions ?? '');
            setGicleeDimensions(artworkToManage.gicleeDimensions ?? '');
            setHologramNumber(artworkToManage.hologramNumber ?? '');
        }
    }, [artworkToManage, isDuplicating, isAddingNew]);

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
            image: imagePath || NEW_WORK_PLACEHOLDER.image, // Usa la imagen placeholder si está vacío
            dimensions: dimensions.trim(),
            technique: technique.trim(),
            code: finalCode,
            status: finalStatus,
            isOpenSeries: isOpenSeries,
            // Campos Giclée (solo si es edición abierta)
            originalDimensions: isOpenSeries ? originalDimensions.trim() : undefined,
            gicleeDimensions: isOpenSeries ? gicleeDimensions.trim() : undefined,
            hologramNumber: isOpenSeries ? hologramNumber.trim() : undefined,
        };

        // Si id es 0 (nueva) o -1 (duplicado), se pasa null a onSave para crear una nueva
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

                        {/* Campos específicos para Giclée */}
                        {isOpenSeries && (
                            <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                                <p className="text-xs font-semibold text-amber-700 mb-3 uppercase tracking-wide">Datos para Certificado Giclée</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-xs text-slate-500 mb-1">Medidas Original</label>
                                        <input
                                            type="text"
                                            value={originalDimensions}
                                            onChange={(e) => setOriginalDimensions(e.target.value)}
                                            placeholder="Ej: 92 x 60 cm"
                                            className="w-full p-2 border rounded text-sm focus:ring-amber-500 focus:border-amber-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-500 mb-1">Medidas Impresión</label>
                                        <input
                                            type="text"
                                            value={gicleeDimensions}
                                            onChange={(e) => setGicleeDimensions(e.target.value)}
                                            placeholder="Ej: 30 x 40 cm"
                                            className="w-full p-2 border rounded text-sm focus:ring-amber-500 focus:border-amber-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-500 mb-1">Nº Holograma Hahnemühle</label>
                                        <input
                                            type="text"
                                            value={hologramNumber}
                                            onChange={(e) => setHologramNumber(e.target.value.toUpperCase())}
                                            placeholder="Ej: HAH-XXXXXX"
                                            className="w-full p-2 border rounded text-sm font-mono focus:ring-amber-500 focus:border-amber-500"
                                        />
                                    </div>
                                </div>
                                <p className="text-[10px] text-amber-600 mt-2">Soporte: Papel Hahnemühle Textured - William Turner (se añadirá automáticamente al certificado)</p>
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
// 🎨 COMPONENTE: PANEL GICLÉE - GENERADOR DE CERTIFICADOS
// =========================================================
const GICLEE_SIZES = [
    { id: 'S', name: 'Pequeño', dimensions: '30 x 40 cm', price: 245 },
    { id: 'M', name: 'Mediano', dimensions: '50 x 63 cm', price: 425 },
    { id: 'L', name: 'Original', dimensions: 'Tamaño original', price: 780, isOriginal: true }
];

interface GicleePanelProps {
    artworks: Artwork[];
    settings: DocumentSettings;
    onClose: () => void;
}

// Tipo para el registro de impresiones
interface GicleePrint {
    id: string;
    artworkId: number;
    artworkTitle: string;
    size: string;
    sizeName: string;
    copyNumber: number;
    hologramNumber: string;
    code: string;
    date: string;
    dimensions: string;
}

const GicleePanel: React.FC<GicleePanelProps> = ({ artworks, settings, onClose }) => {
    const [selectedArtworkId, setSelectedArtworkId] = useState<number | null>(null);
    const [selectedSize, setSelectedSize] = useState<string>('M');
    const [copyNumber, setCopyNumber] = useState<number>(1);
    const [hologramNumber, setHologramNumber] = useState<string>('');
    const [activeTab, setActiveTab] = useState<'generate' | 'inventory'>('generate');

    // Estado para el inventario de impresiones (persistido en localStorage)
    const [printedCopies, setPrintedCopies] = useState<GicleePrint[]>(() => {
        const saved = localStorage.getItem('giclee-prints');
        return saved ? JSON.parse(saved) : [];
    });

    // Guardar en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('giclee-prints', JSON.stringify(printedCopies));
    }, [printedCopies]);

    const selectedArtwork = artworks.find(a => a.id === selectedArtworkId);
    const selectedSizeData = GICLEE_SIZES.find(s => s.id === selectedSize);

    // Generar código Giclée
    const generateGicleeCode = () => {
        if (!selectedArtwork || !selectedSizeData) return '';
        const year = new Date().getFullYear();
        const initials = selectedArtwork.title.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
        return `MA-${year}-GC-${initials}-${String(copyNumber).padStart(2, '0')}/10-${selectedSize}`;
    };

    // Verificar si una copia ya está impresa
    const isCopyPrinted = (artworkId: number, size: string, copy: number) => {
        return printedCopies.some(p => p.artworkId === artworkId && p.size === size && p.copyNumber === copy);
    };

    // Obtener el siguiente número de copia disponible
    const getNextAvailableCopy = (artworkId: number, size: string) => {
        for (let i = 1; i <= 10; i++) {
            if (!isCopyPrinted(artworkId, size, i)) return i;
        }
        return null; // Todas vendidas
    };

    // Actualizar número de copia cuando cambia obra o tamaño
    useEffect(() => {
        if (selectedArtworkId) {
            const next = getNextAvailableCopy(selectedArtworkId, selectedSize);
            if (next) setCopyNumber(next);
        }
    }, [selectedArtworkId, selectedSize]);

    // Registrar una impresión
    const registerPrint = () => {
        if (!selectedArtwork || !selectedSizeData) return;

        const newPrint: GicleePrint = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            artworkId: selectedArtwork.id,
            artworkTitle: selectedArtwork.title,
            size: selectedSize,
            sizeName: selectedSizeData.name,
            copyNumber: copyNumber,
            hologramNumber: hologramNumber,
            code: generateGicleeCode(),
            date: new Date().toISOString(),
            dimensions: selectedSizeData.dimensions
        };

        setPrintedCopies(prev => [...prev, newPrint]);
    };

    // Eliminar una impresión del registro
    const deletePrint = (printId: string) => {
        if (window.confirm('¿Eliminar este registro? La copia volverá a estar disponible.')) {
            setPrintedCopies(prev => prev.filter(p => p.id !== printId));
        }
    };

    // Contar copias impresas por obra y tamaño
    const getPrintedCount = (artworkId: number, size: string) => {
        return printedCopies.filter(p => p.artworkId === artworkId && p.size === size).length;
    };

    // Generar e imprimir certificado
    const handlePrintCertificate = () => {
        if (!selectedArtwork || !selectedSizeData) return;

        const code = generateGicleeCode();
        const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

        const GOLD_COLOR = "#b8860b";
        const OUTLINE_WIDTH = "12px";
        const OUTLINE_OFFSET = "12px";

        const contactFooterHtml = `
            <div class="contact-footer">
                <span class="contact-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 0 4 10 15.3 15.3 0 0 0-4 10"/></svg>
                    <a href="${settings.website}">${settings.website.replace('https://', '')}</a>
                </span>
                <span class="contact-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <a href="mailto:${settings.email}">${settings.email}</a>
                </span>
                <span class="contact-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg>
                    ${settings.instagram}
                </span>
            </div>
        `;

        const certificateHtml = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <title>Certificado Giclée - ${selectedArtwork.title}</title>
                <style>
                    body { font-family: 'Palatino Linotype', Georgia, serif; font-size: 12pt; margin: 0; padding: 0; color: #111; }
                    .cert-container {
                        margin: 10mm auto; width: 178mm; box-sizing: border-box;
                        border: 1px solid #000; outline: ${OUTLINE_WIDTH} solid ${GOLD_COLOR}; outline-offset: ${OUTLINE_OFFSET};
                        padding: 4mm 35px;
                    }
                    .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #ddd; margin-bottom: 15px; }
                    .logo { max-height: 80px; width: auto; margin-bottom: 5px; opacity: 0.9; }
                    .subtitle { font-size: 10pt; text-transform: uppercase; letter-spacing: 2px; color: #555; margin-top: 0; }
                    h1 { font-size: 26pt; text-align: center; margin: 0; font-weight: 300; letter-spacing: 5px; color: ${GOLD_COLOR}; text-transform: uppercase; }
                    .fixed-text { text-align: center; font-size: 10pt; color: #333; margin: 15px 0; line-height: 1.5; }
                    .fixed-text strong { font-size: 14pt; color: #000; display: block; margin-top: 5px; }
                    .artwork-image-section { width: 70%; max-width: 140px; max-height: 160px; overflow: hidden; margin: 10px auto; border: 1px solid #ccc; padding: 5px; box-shadow: 0 0 8px rgba(0,0,0,0.1); text-align: center; }
                    .artwork-image-section img { width: 100%; height: auto; display: block; }
                    .details-grid { width: 90%; margin: 15px auto 30px auto; font-size: 11pt; }
                    .details-grid p { margin: 10px 0; display: flex; justify-content: space-between; border-bottom: 1px dashed #ccc; padding-bottom: 5px; }
                    .details-grid strong { font-weight: bold; color: #000; width: 150px; }
                    .details-grid span { text-align: right; color: #333; flex-grow: 1; }
                    .code-display { font-weight: bold; color: #333; font-family: 'Courier New', monospace; }
                    .contact-footer { font-size: 9pt; text-align: center; color: #555; margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; display: flex; justify-content: center; gap: 15px; }
                    .contact-item { display: flex; align-items: center; gap: 4px; }
                    .contact-item a { color: #555; text-decoration: none; }
                    .signature-row { display: flex; justify-content: space-between; align-items: flex-start; margin-top: 20px; padding-top: 20px; }
                    .date-col { flex-basis: 45%; text-align: left; font-size: 10pt; color: #333; }
                    .signature-col { flex-basis: 45%; text-align: right; padding-top: 15px; }
                    .signature-line { border-top: 1px solid #000; display: block; width: 100%; margin-bottom: 5px; }
                    .artist-title-style { font-size: 10pt; color: #333; margin-top: 2px; }
                    @media print {
                        body { margin: 0; padding: 0; }
                        .cert-container { box-shadow: none; margin: 10mm auto !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
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
                        <p>Por la presente se certifica que la reproducción Giclée descrita a continuación es una impresión autorizada y numerada. Todos los derechos de autor están reservados por la artista:</p>
                        <strong>${settings.artistName}</strong>
                        <span class="artist-title-style">${settings.artistTitle}</span>
                    </div>
                    <div class="artwork-image-section">
                        <img src="${selectedArtwork.image}" alt="${selectedArtwork.title}"/>
                    </div>
                    <div class="details-grid">
                        <p><strong>Título de la Obra:</strong><span>${selectedArtwork.title}</span></p>
                        <p><strong>Técnica Original:</strong><span>${selectedArtwork.technique}</span></p>
                        <p><strong>Medidas Original:</strong><span>${selectedArtwork.dimensions}</span></p>
                        <p><strong>Medidas Impresión:</strong><span>${selectedSizeData.dimensions}</span></p>
                        <p><strong>Soporte:</strong><span>Papel Hahnemühle Textured - William Turner</span></p>
                        <p><strong>ID de Referencia:</strong><span class="code-display">${code}</span></p>
                        <p style="${hologramNumber ? '' : 'border-bottom: none;'}"><strong>Edición:</strong><span>${copyNumber}/10</span></p>
                        ${hologramNumber ? `<p style="border-bottom: none;"><strong style="font-size: 9pt; color: #666;">Nº Holograma:</strong><span style="font-size: 9pt; color: #666; font-family: monospace;">${hologramNumber}</span></p>` : ''}
                    </div>
                    <div class="signature-row">
                        <div class="date-col"><p>FECHA: ${today}</p></div>
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

        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (printWindow) {
            printWindow.document.write(certificateHtml);
            printWindow.document.close();
            // Registrar la impresión en el inventario
            registerPrint();
            setTimeout(() => printWindow.print(), 500);
        }
    };

    // Obras disponibles para Giclée (las principales)
    const gicleeArtworks = artworks.filter(a =>
        ['Sara en Marquesina', 'Laura en el Crepúsculo', 'Sara bajo la farola', 'Ana y la Habana',
         'Joven con vela en la bruma', 'Abruma y belleza', 'Memorias de Mekong I', 'Pablo en Cascada'].includes(a.title)
    );

    return (
        <div className="fixed inset-0 bg-slate-900/95 z-[80] overflow-y-auto">
            <div className="min-h-screen p-6">

                {/* Header */}
                <div className="max-w-7xl mx-auto mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Printer size={24} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Gestión Giclée</h1>
                                <p className="text-amber-200/80 text-sm">Certificados e Inventario de Ediciones</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white/60 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-all"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mt-6">
                        <button
                            onClick={() => setActiveTab('generate')}
                            className={`px-6 py-3 rounded-t-xl font-semibold transition-all ${
                                activeTab === 'generate'
                                    ? 'bg-white text-slate-800'
                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                        >
                            <Printer size={16} className="inline mr-2" />
                            Generar Certificado
                        </button>
                        <button
                            onClick={() => setActiveTab('inventory')}
                            className={`px-6 py-3 rounded-t-xl font-semibold transition-all ${
                                activeTab === 'inventory'
                                    ? 'bg-white text-slate-800'
                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                        >
                            <Hash size={16} className="inline mr-2" />
                            Inventario ({printedCopies.length} impresas)
                        </button>
                    </div>
                </div>

                {/* Contenido */}
                <div className="max-w-7xl mx-auto bg-white rounded-xl rounded-tl-none shadow-2xl overflow-hidden">

                    {/* TAB: GENERAR CERTIFICADO */}
                    {activeTab === 'generate' && (
                        <div className="p-6">
                            <div className="grid lg:grid-cols-3 gap-6">

                                {/* Columna 1: Selección de obra */}
                                <div className="lg:col-span-1">
                                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">1. Selecciona Obra</h3>
                                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                                        {gicleeArtworks.map(art => {
                                            const totalPrinted = GICLEE_SIZES.reduce((acc, size) => acc + getPrintedCount(art.id, size.id), 0);
                                            return (
                                                <button
                                                    key={art.id}
                                                    onClick={() => setSelectedArtworkId(art.id)}
                                                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                                                        selectedArtworkId === art.id
                                                            ? 'border-amber-500 bg-amber-50 shadow-lg'
                                                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                                    }`}
                                                >
                                                    <img
                                                        src={art.image}
                                                        alt={art.title}
                                                        className="w-16 h-16 object-cover rounded-lg shadow"
                                                    />
                                                    <div className="flex-1 text-left">
                                                        <p className="font-semibold text-slate-800 text-sm leading-tight">{art.title}</p>
                                                        <p className="text-xs text-slate-500 mt-1">{art.dimensions}</p>
                                                        {totalPrinted > 0 && (
                                                            <p className="text-xs text-emerald-600 font-medium mt-1">
                                                                {totalPrinted} copia{totalPrinted > 1 ? 's' : ''} impresa{totalPrinted > 1 ? 's' : ''}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {selectedArtworkId === art.id && (
                                                        <Check size={20} className="text-amber-600" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Columna 2: Tamaño y Grid de copias */}
                                <div className="lg:col-span-1">
                                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">2. Tamaño y Copia</h3>

                                    {/* Selector de tamaño */}
                                    <div className="space-y-2 mb-6">
                                        {GICLEE_SIZES.map(size => {
                                            const printed = selectedArtworkId ? getPrintedCount(selectedArtworkId, size.id) : 0;
                                            const available = 10 - printed;
                                            return (
                                                <button
                                                    key={size.id}
                                                    onClick={() => setSelectedSize(size.id)}
                                                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                                                        selectedSize === size.id
                                                            ? 'border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50'
                                                            : 'border-slate-200 hover:border-slate-300'
                                                    }`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-left">
                                                            <span className="font-bold text-slate-800">{size.name}</span>
                                                            <span className="text-slate-500 text-sm ml-2">{size.dimensions}</span>
                                                        </div>
                                                        <span className="font-bold text-lg text-amber-600">{size.price}€</span>
                                                    </div>
                                                    {selectedArtworkId && (
                                                        <div className="mt-2 flex items-center gap-2">
                                                            <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                                                                <div
                                                                    className="bg-emerald-500 h-full transition-all"
                                                                    style={{ width: `${(printed / 10) * 100}%` }}
                                                                />
                                                            </div>
                                                            <span className={`text-xs font-medium ${available === 0 ? 'text-red-500' : 'text-slate-500'}`}>
                                                                {available === 0 ? 'AGOTADO' : `${available} disp.`}
                                                            </span>
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Grid visual de las 10 copias */}
                                    {selectedArtworkId && (
                                        <div>
                                            <p className="text-xs font-semibold text-slate-500 mb-2">Edición de 10 copias:</p>
                                            <div className="grid grid-cols-5 gap-2">
                                                {[1,2,3,4,5,6,7,8,9,10].map(num => {
                                                    const isPrinted = isCopyPrinted(selectedArtworkId, selectedSize, num);
                                                    const isSelected = copyNumber === num;
                                                    return (
                                                        <button
                                                            key={num}
                                                            onClick={() => !isPrinted && setCopyNumber(num)}
                                                            disabled={isPrinted}
                                                            className={`aspect-square rounded-lg font-bold text-lg transition-all ${
                                                                isPrinted
                                                                    ? 'bg-emerald-500 text-white cursor-not-allowed'
                                                                    : isSelected
                                                                        ? 'bg-amber-500 text-white ring-4 ring-amber-200'
                                                                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                                            }`}
                                                            title={isPrinted ? 'Ya impresa' : `Seleccionar copia ${num}`}
                                                        >
                                                            {num}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            <div className="flex gap-4 mt-3 text-xs text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <span className="w-3 h-3 bg-emerald-500 rounded"></span> Impresa
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <span className="w-3 h-3 bg-amber-500 rounded"></span> Seleccionada
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <span className="w-3 h-3 bg-slate-100 rounded border"></span> Disponible
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Columna 3: Datos y Generar */}
                                <div className="lg:col-span-1">
                                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">3. Datos del Certificado</h3>

                                    {selectedArtwork ? (
                                        <div className="space-y-4">
                                            {/* Preview de la obra seleccionada */}
                                            <div className="bg-slate-100 rounded-xl p-4">
                                                <img
                                                    src={selectedArtwork.image}
                                                    alt={selectedArtwork.title}
                                                    className="w-full h-40 object-cover rounded-lg shadow-lg mb-3"
                                                />
                                                <p className="font-bold text-slate-800">{selectedArtwork.title}</p>
                                                <p className="text-sm text-slate-500">{selectedSizeData?.name} - {selectedSizeData?.dimensions}</p>
                                            </div>

                                            {/* Número de holograma */}
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">Nº Holograma Hahnemühle</label>
                                                <input
                                                    type="text"
                                                    value={hologramNumber}
                                                    onChange={(e) => setHologramNumber(e.target.value.toUpperCase())}
                                                    placeholder="Ej: 287213"
                                                    className="w-full p-3 border-2 border-slate-200 rounded-xl font-mono text-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                                                />
                                            </div>

                                            {/* Código generado */}
                                            <div className="bg-slate-800 rounded-xl p-4">
                                                <p className="text-xs text-slate-400 mb-1">Código del certificado:</p>
                                                <p className="font-mono text-xl text-amber-400">{generateGicleeCode()}</p>
                                            </div>

                                            {/* Botón generar */}
                                            <button
                                                onClick={handlePrintCertificate}
                                                disabled={isCopyPrinted(selectedArtworkId!, selectedSize, copyNumber)}
                                                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold text-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                <Printer size={20} /> IMPRIMIR CERTIFICADO
                                            </button>

                                            {isCopyPrinted(selectedArtworkId!, selectedSize, copyNumber) && (
                                                <p className="text-center text-red-500 text-sm font-medium">
                                                    Esta copia ya fue impresa. Selecciona otra.
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="bg-slate-100 rounded-xl p-8 text-center">
                                            <ImageIcon size={48} className="mx-auto text-slate-300 mb-3" />
                                            <p className="text-slate-500">Selecciona una obra para comenzar</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: INVENTARIO */}
                    {activeTab === 'inventory' && (
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-slate-800">Historial de Impresiones</h3>
                                <div className="flex items-center gap-3">
                                    <p className="text-sm text-slate-500">{printedCopies.length} certificados generados</p>
                                    {printedCopies.length > 0 && (
                                        <button
                                            onClick={() => {
                                                const date = new Date().toLocaleDateString('es-ES');
                                                let content = `INVENTARIO GICLÉE - MYRIAM ALCARAZ\nFecha: ${date}\n\n`;
                                                content += `Total de certificados generados: ${printedCopies.length}\n`;
                                                content += `═══════════════════════════════════════════════════════════════\n\n`;

                                                // Agrupar por obra
                                                const byArtwork: { [key: string]: GicleePrint[] } = {};
                                                printedCopies.forEach(p => {
                                                    if (!byArtwork[p.artworkTitle]) byArtwork[p.artworkTitle] = [];
                                                    byArtwork[p.artworkTitle].push(p);
                                                });

                                                Object.entries(byArtwork).forEach(([title, prints]) => {
                                                    content += `▸ ${title} (${prints.length} copia${prints.length > 1 ? 's' : ''})\n`;
                                                    content += `───────────────────────────────────────────────────────────────\n`;
                                                    prints.forEach(p => {
                                                        content += `  • Copia ${p.copyNumber}/10 - ${p.sizeName} (${p.dimensions})\n`;
                                                        content += `    Código: ${p.code}\n`;
                                                        content += `    Holograma: ${p.hologramNumber || 'No registrado'}\n`;
                                                        content += `    Fecha: ${new Date(p.date).toLocaleDateString('es-ES')}\n\n`;
                                                    });
                                                });

                                                const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                                                const url = URL.createObjectURL(blob);
                                                const link = document.createElement('a');
                                                link.href = url;
                                                link.download = `inventario-giclee-${new Date().toISOString().split('T')[0]}.txt`;
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                                URL.revokeObjectURL(url);
                                            }}
                                            className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors"
                                        >
                                            <FileText size={16} /> Exportar
                                        </button>
                                    )}
                                </div>
                            </div>

                            {printedCopies.length === 0 ? (
                                <div className="text-center py-16 bg-slate-50 rounded-xl">
                                    <Printer size={48} className="mx-auto text-slate-300 mb-4" />
                                    <p className="text-slate-500 text-lg">No hay impresiones registradas</p>
                                    <p className="text-slate-400 text-sm mt-1">Cuando generes certificados, aparecerán aquí</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b-2 border-slate-200">
                                                <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase">Obra</th>
                                                <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase">Tamaño</th>
                                                <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase">Copia</th>
                                                <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase">Código</th>
                                                <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase">Holograma</th>
                                                <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase">Fecha</th>
                                                <th className="text-right py-3 px-4"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {printedCopies
                                                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                                .map(print => (
                                                <tr key={print.id} className="border-b border-slate-100 hover:bg-slate-50">
                                                    <td className="py-3 px-4">
                                                        <span className="font-medium text-slate-800">{print.artworkTitle}</span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className="text-sm text-slate-600">{print.sizeName}</span>
                                                        <span className="text-xs text-slate-400 ml-1">({print.dimensions})</span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg font-bold">
                                                            {print.copyNumber}
                                                        </span>
                                                        <span className="text-slate-400 ml-1">/10</span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <code className="text-xs bg-slate-100 px-2 py-1 rounded font-mono">{print.code}</code>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className="text-sm font-mono text-slate-600">{print.hologramNumber || '—'}</span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className="text-sm text-slate-500">
                                                            {new Date(print.date).toLocaleDateString('es-ES')}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-right">
                                                        <button
                                                            onClick={() => deletePrint(print.id)}
                                                            className="text-red-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                                                            title="Eliminar registro"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Resumen por obra */}
                            {printedCopies.length > 0 && (
                                <div className="mt-8 pt-6 border-t border-slate-200">
                                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Resumen por Obra</h4>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {gicleeArtworks.map(art => {
                                            const artPrints = printedCopies.filter(p => p.artworkId === art.id);
                                            if (artPrints.length === 0) return null;
                                            return (
                                                <div key={art.id} className="bg-slate-50 rounded-xl p-4">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <img src={art.image} alt={art.title} className="w-12 h-12 object-cover rounded-lg" />
                                                        <div>
                                                            <p className="font-semibold text-slate-800 text-sm">{art.title}</p>
                                                            <p className="text-xs text-emerald-600">{artPrints.length} impresa{artPrints.length > 1 ? 's' : ''}</p>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        {GICLEE_SIZES.map(size => {
                                                            const count = artPrints.filter(p => p.size === size.id).length;
                                                            if (count === 0) return null;
                                                            return (
                                                                <div key={size.id} className="flex justify-between text-xs">
                                                                    <span className="text-slate-500">{size.name}:</span>
                                                                    <span className="font-medium text-slate-700">{count}/10</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


// =========================================================
// 🔢 COMPONENTE: MODAL DE AJUSTE MANUAL DE EDICIÓN
// =========================================================
interface EditionAdjustModalProps {
    artworks: Artwork[];
    onAdjust: (artworkId: number, newSeriesIndex: number) => void;
    onClose: () => void;
    onConfigureSeries: (artwork: Artwork) => void; // Para abrir el editor de una obra
}

const EditionAdjustModal: React.FC<EditionAdjustModalProps> = ({ artworks, onAdjust, onClose, onConfigureSeries }) => {
    // Obras con edición seriada limitada - ORDENADAS ALFABÉTICAMENTE
    const seriesArtworks = artworks
        .filter(a => a.seriesIndex !== null && a.seriesTotal !== null && !a.isOpenSeries)
        .sort((a, b) => a.title.localeCompare(b.title, 'es'));

    // Obras sin serie configurada - ORDENADAS ALFABÉTICAMENTE
    const nonSeriesArtworks = artworks
        .filter(a => a.seriesTotal === null && !a.isOpenSeries)
        .sort((a, b) => a.title.localeCompare(b.title, 'es'));

    const [selectedArtworkId, setSelectedArtworkId] = useState<number | null>(
        seriesArtworks.length > 0 ? seriesArtworks[0].id : null
    );
    const [soldUpTo, setSoldUpTo] = useState<number>(0); // "Ya he vendido hasta la número X"
    const [confirmText, setConfirmText] = useState<string | null>(null);

    const selectedArtwork = artworks.find(a => a.id === selectedArtworkId);

    // Calcular el próximo número disponible
    const nextAvailable = soldUpTo + 1;

    const handleSave = () => {
        if (!selectedArtworkId || !selectedArtwork) return;

        // Validar que el próximo disponible sea válido
        if (selectedArtwork.seriesTotal && nextAvailable > selectedArtwork.seriesTotal) {
            alert(`¡Cuidado! Solo hay ${selectedArtwork.seriesTotal} copias en esta edición.`);
            return;
        }

        onAdjust(selectedArtworkId, nextAvailable);
        setConfirmText(`✅ ¡Listo! La próxima copia será la ${nextAvailable}/${selectedArtwork.seriesTotal}`);

        setTimeout(() => {
            setConfirmText(null);
        }, 3000);
    };

    // Actualizar cuando se cambia de obra
    useEffect(() => {
        if (selectedArtwork && selectedArtwork.seriesIndex) {
            // Si la edición actual es 5, significa que ya vendió hasta la 4
            setSoldUpTo(Math.max(0, selectedArtwork.seriesIndex - 1));
        } else {
            setSoldUpTo(0);
        }
    }, [selectedArtworkId, selectedArtwork]);

    const handleConfigureClick = (artwork: Artwork) => {
        onClose();
        onConfigureSeries(artwork);
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">

                {/* Header compacto */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-3 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <Hash size={24} />
                        <div>
                            <h2 className="text-lg font-bold">Ajuste Manual de Edición</h2>
                            <p className="text-purple-200 text-xs">Registra ventas realizadas fuera de la web</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/70 hover:text-white transition-colors p-1"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Contenido scrollable */}
                <div className="p-5 space-y-4 overflow-y-auto flex-1">

                    {seriesArtworks.length === 0 ? (
                        /* Estado vacío - Mensaje amigable con acceso directo */
                        <div className="text-center py-4">
                            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Hash size={28} className="text-purple-500" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-700 mb-2">
                                No tienes obras con edición seriada
                            </h3>
                            <p className="text-slate-500 text-sm mb-4 max-w-sm mx-auto">
                                Selecciona una obra para configurarla como "Edición Seriada Limitada" (ej. 1/30).
                            </p>

                            {nonSeriesArtworks.length > 0 ? (
                                <div className="space-y-3">
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                        Selecciona una obra para configurar como serie ({nonSeriesArtworks.length} disponibles):
                                    </p>
                                    {/* Lista ampliada - altura para ver 5+ obras */}
                                    <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                                        {nonSeriesArtworks.map(artwork => (
                                            <button
                                                key={artwork.id}
                                                onClick={() => handleConfigureClick(artwork)}
                                                className="w-full flex items-center gap-4 p-3 bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-xl transition-all text-left group"
                                            >
                                                <img
                                                    src={artwork.image}
                                                    alt={artwork.title}
                                                    className="w-14 h-14 object-cover rounded-lg shadow-sm"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-slate-700">{artwork.title}</p>
                                                    <p className="text-xs text-slate-400 mt-0.5">{artwork.technique} • {artwork.dimensions}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-full">Única</span>
                                                    <Settings size={18} className="text-slate-400 group-hover:text-purple-500 transition-colors" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={onClose}
                                    className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
                                >
                                    Entendido
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Selector de Obra - Lista visual */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Selecciona la obra a ajustar ({seriesArtworks.length} con serie)
                                </label>
                                {/* Lista scrollable de obras seriadas */}
                                <div className="max-h-56 overflow-y-auto border border-slate-200 rounded-xl bg-slate-50 divide-y divide-slate-100">
                                    {seriesArtworks.map(art => (
                                        <button
                                            key={art.id}
                                            onClick={() => setSelectedArtworkId(art.id)}
                                            className={`w-full flex items-center gap-3 p-3 text-left transition-all ${
                                                selectedArtworkId === art.id
                                                    ? 'bg-purple-100 border-l-4 border-purple-500'
                                                    : 'hover:bg-white border-l-4 border-transparent'
                                            }`}
                                        >
                                            <img
                                                src={art.image}
                                                alt={art.title}
                                                className="w-12 h-12 object-cover rounded-lg shadow-sm"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className={`font-medium truncate ${selectedArtworkId === art.id ? 'text-purple-800' : 'text-slate-700'}`}>
                                                    {art.title}
                                                </p>
                                                <p className="text-xs text-slate-400">{art.dimensions}</p>
                                            </div>
                                            <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                                                selectedArtworkId === art.id
                                                    ? 'bg-purple-600 text-white'
                                                    : 'bg-slate-200 text-slate-600'
                                            }`}>
                                                {art.seriesIndex}/{art.seriesTotal}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Info de la obra seleccionada - Compacta */}
                            {selectedArtwork && (
                                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-3 border border-purple-200">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={selectedArtwork.image}
                                            alt={selectedArtwork.title}
                                            className="w-16 h-16 object-cover rounded-lg shadow-md"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-800">{selectedArtwork.title}</h4>
                                            <p className="text-xs text-slate-500">{selectedArtwork.technique}</p>
                                            <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                                                <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full font-bold">
                                                    Actual: {selectedArtwork.seriesIndex}/{selectedArtwork.seriesTotal}
                                                </span>
                                                {selectedArtwork.code && (
                                                    <span className="text-[10px] bg-white text-purple-700 px-2 py-0.5 rounded-full font-mono border border-purple-200">
                                                        {selectedArtwork.code}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Input principal - Ventas externas */}
                            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                                <label className="block text-sm font-bold text-amber-800 mb-3">
                                    📦 ¿Cuántas copias vendiste fuera de la web?
                                </label>
                                <div className="flex items-center gap-3">
                                    <span className="text-slate-600 text-sm">Ya vendí hasta la copia nº</span>
                                    <input
                                        type="number"
                                        min={0}
                                        max={(selectedArtwork?.seriesTotal || 1) - 1}
                                        value={soldUpTo}
                                        onChange={(e) => setSoldUpTo(Math.max(0, Number(e.target.value)))}
                                        className="w-20 p-2 border-2 border-amber-300 rounded-lg text-center text-xl font-bold text-amber-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all bg-white"
                                    />
                                    <span className="text-slate-600 text-sm">de {selectedArtwork?.seriesTotal}</span>
                                </div>

                                {/* Vista previa del resultado */}
                                <div className="mt-4 p-3 bg-white rounded-lg border border-amber-200">
                                    <p className="text-xs text-slate-500 mb-1">El próximo certificado será:</p>
                                    <p className="text-2xl font-bold text-purple-600">
                                        Copia {nextAvailable} de {selectedArtwork?.seriesTotal}
                                        <span className="text-sm font-normal text-slate-400 ml-2">
                                            ({selectedArtwork?.seriesTotal ? selectedArtwork.seriesTotal - nextAvailable + 1 : '?'} restantes)
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Mensaje de confirmación */}
                            {confirmText && (
                                <div className="bg-green-50 text-green-700 p-4 rounded-xl text-center font-medium animate-in fade-in duration-300 border border-green-200">
                                    {confirmText}
                                </div>
                            )}

                            {/* Botones */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-3 px-4 border-2 border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={soldUpTo < 0 || (selectedArtwork?.seriesTotal && nextAvailable > selectedArtwork.seriesTotal)}
                                    className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save size={18} /> Guardar Ajuste
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};


// =========================================================
// ⚙️ COMPONENTE PRINCIPAL DEL DASHBOARD (CONTENEDOR)
// =========================================================
interface ArtistDashboardProps {
    onLogout: () => void;
}
export const ArtistDashboard: React.FC<ArtistDashboardProps> = ({ onLogout }) => {

    // 🛑 Inicialización con los datos REALES del catálogo completo
    const [artworks, setArtworks] = useState<Artwork[]>(REAL_ARTWORKS);

    // 🛑 Inicialización con los datos CORREGIDOS
    const [documentSettings, setDocumentSettings] = useState<DocumentSettings>(initialSettings);

    // 🛑 CAMBIADO: artworkToManage se inicializa en null, pero en el botón se le asigna NEW_WORK_PLACEHOLDER (id: 0)
    const [artworkToManage, setArtworkToManage] = useState<Artwork | null>(null);

    // 🎨 Estado para el Panel Giclée
    const [showGicleePanel, setShowGicleePanel] = useState(false);

    // 👁️ Estado para la vista previa del certificado
    const [previewArtwork, setPreviewArtwork] = useState<Artwork | null>(null);

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


    // Estadísticas del catálogo
    const stats = useMemo(() => {
        const pendientes = artworks.filter(a => a.status === 'PENDIENTE');
        const asignados = artworks.filter(a => a.status === 'GENERADO');
        return { total: artworks.length, pendientes, asignados };
    }, [artworks]);

    // Exportar listado a CSV/texto
    const handleExportList = () => {
        const date = new Date().toLocaleDateString('es-ES');
        let content = `LISTADO DE OBRAS - MYRIAM ALCARAZ\nFecha de exportación: ${date}\n\n`;
        content += `════════════════════════════════════════════════════════════\n`;
        content += `RESUMEN: ${stats.total} obras | ${stats.asignados.length} con código | ${stats.pendientes.length} pendientes\n`;
        content += `════════════════════════════════════════════════════════════\n\n`;

        if (stats.asignados.length > 0) {
            content += `✓ OBRAS CON CÓDIGO ASIGNADO (${stats.asignados.length})\n`;
            content += `────────────────────────────────────────────────────────────\n`;
            stats.asignados.forEach(art => {
                content += `• ${art.title}\n`;
                content += `  Código: ${art.code}\n`;
                content += `  Dimensiones: ${art.dimensions} | Técnica: ${art.technique}\n`;
                content += `  Tipo: ${art.isOpenSeries ? 'Giclée' : art.seriesTotal ? `Serie ${art.seriesIndex}/${art.seriesTotal}` : 'Obra única'}\n\n`;
            });
        }

        if (stats.pendientes.length > 0) {
            content += `\n○ OBRAS PENDIENTES DE CÓDIGO (${stats.pendientes.length})\n`;
            content += `────────────────────────────────────────────────────────────\n`;
            stats.pendientes.forEach(art => {
                content += `• ${art.title}\n`;
                content += `  Dimensiones: ${art.dimensions} | Técnica: ${art.technique}\n\n`;
            });
        }

        // Crear y descargar archivo
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `inventario-obras-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-stone-100 p-6 md:p-8 font-sans">

            <div className="max-w-4xl mx-auto">

                {/* CABECERA ELEGANTE */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Layout size={28} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">TALLER / ESTUDIO</h1>
                                <p className="text-sm text-slate-500">Panel de gestión privado</p>
                            </div>
                        </div>

                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-500 transition-colors"
                        >
                            <LogOut size={16} /> Cerrar sesión
                        </button>
                    </div>
                </div>

                {/* ACCIONES PRINCIPALES */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">

                    {/* Botón GICLÉE - Principal */}
                    <button
                        onClick={() => setShowGicleePanel(true)}
                        className="bg-gradient-to-br from-amber-400 to-orange-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] group"
                    >
                        <Printer size={32} className="mb-3 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-lg">Gestión Giclée</h3>
                        <p className="text-amber-100 text-sm mt-1">Certificados e inventario</p>
                    </button>

                    {/* Botón NUEVA OBRA */}
                    <button
                        onClick={() => setArtworkToManage(NEW_WORK_PLACEHOLDER)}
                        className="bg-white border-2 border-dashed border-slate-300 text-slate-600 p-6 rounded-2xl hover:border-gold-400 hover:bg-gold-50 transition-all group"
                    >
                        <Plus size={32} className="mb-3 text-slate-400 group-hover:text-gold-500 transition-colors" />
                        <h3 className="font-bold text-lg">Nueva Obra</h3>
                        <p className="text-slate-400 text-sm mt-1">Añadir al catálogo</p>
                    </button>

                    {/* Botón EXPORTAR */}
                    <button
                        onClick={handleExportList}
                        className="bg-white border-2 border-slate-200 text-slate-600 p-6 rounded-2xl hover:border-emerald-400 hover:bg-emerald-50 transition-all group"
                    >
                        <FileText size={32} className="mb-3 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                        <h3 className="font-bold text-lg">Exportar Listado</h3>
                        <p className="text-slate-400 text-sm mt-1">Descargar inventario</p>
                    </button>
                </div>

                {/* RESUMEN DEL INVENTARIO */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                    {/* Stats Header */}
                    <div className="bg-slate-800 text-white p-4 flex items-center justify-between">
                        <h2 className="font-bold flex items-center gap-2">
                            <ImageIcon size={20} /> Inventario de Obras
                        </h2>
                        <div className="flex gap-4 text-sm">
                            <span className="flex items-center gap-1">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                                {stats.asignados.length} con código
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                                {stats.pendientes.length} pendientes
                            </span>
                        </div>
                    </div>

                    {/* Lista compacta de obras */}
                    <div className="max-h-[400px] overflow-y-auto">
                        {sortedArtworks.length === 0 ? (
                            <div className="p-8 text-center text-slate-400">
                                <p>No hay obras en el catálogo</p>
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead className="bg-slate-50 sticky top-0">
                                    <tr>
                                        <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase">Obra</th>
                                        <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase">Dimensiones</th>
                                        <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase">Código</th>
                                        <th className="text-right py-3 px-4 text-xs font-bold text-slate-500 uppercase">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedArtworks.map(artwork => (
                                        <tr key={artwork.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={artwork.image}
                                                        alt={artwork.title}
                                                        className="w-10 h-10 object-cover rounded-lg shadow-sm"
                                                    />
                                                    <span className="font-medium text-slate-800 text-sm">{artwork.title}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-slate-500">{artwork.dimensions}</td>
                                            <td className="py-3 px-4">
                                                {artwork.code ? (
                                                    <code className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-mono">
                                                        {artwork.code}
                                                    </code>
                                                ) : (
                                                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded font-medium">
                                                        Pendiente
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <div className="flex gap-1 justify-end">
                                                    {/* Botón Ver Certificado */}
                                                    <button
                                                        onClick={() => setPreviewArtwork(artwork)}
                                                        className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded transition-colors"
                                                        title="Ver certificado"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => setArtworkToManage(artwork)}
                                                        className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
                                                        title="Editar"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    {!artwork.code && (
                                                        <button
                                                            onClick={() => handleGenerateCode(artwork.id)}
                                                            className="p-1.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded transition-colors"
                                                            title="Generar código"
                                                        >
                                                            <Code size={16} />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDeleteArtwork(artwork.id)}
                                                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                                        title="Eliminar"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
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

            {/* 🎨 PANEL GICLÉE */}
            {showGicleePanel && (
                <GicleePanel
                    artworks={artworks}
                    settings={documentSettings}
                    onClose={() => setShowGicleePanel(false)}
                />
            )}

            {/* ============================================
                MODAL VISTA PREVIA - ESTRUCTURA DE 2 BLOQUES
                Idéntico al Portfolio para consistencia
                ============================================ */}
            {previewArtwork && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 animate-in fade-in duration-200 overflow-y-auto py-6"
                    onClick={() => setPreviewArtwork(null)}
                >
                    {/* Botón cerrar */}
                    <button
                        onClick={() => setPreviewArtwork(null)}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-50"
                    >
                        <X size={20} className="text-white" />
                    </button>

                    {/* Contenido del modal - DOS BLOQUES */}
                    <div
                        className="max-w-5xl w-full mx-8 flex flex-col lg:flex-row gap-8 items-stretch"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* ========================================
                            BLOQUE IZQUIERDO: Imagen + Ficha Técnica
                            ======================================== */}
                        <div className="flex-1 flex flex-col gap-4">
                            {/* Imagen de la obra */}
                            <div className="flex items-center justify-center bg-black/20 rounded-xl p-4">
                                <img
                                    src={previewArtwork.image}
                                    alt={previewArtwork.title}
                                    className="max-w-full max-h-[50vh] object-contain rounded-lg shadow-2xl"
                                />
                            </div>

                            {/* Ficha Técnica - DEBAJO de la imagen */}
                            <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 text-white">
                                <h3 className="text-[10px] tracking-[0.3em] text-amber-400 uppercase mb-4">Ficha Técnica</h3>
                                <h2 className="font-serif text-xl md:text-2xl mb-4 text-white leading-tight">{previewArtwork.title}</h2>

                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <span className="text-stone-400 block text-[10px] uppercase tracking-wider mb-1">Dimensiones</span>
                                        <span className="font-medium text-white text-sm">{previewArtwork.dimensions}</span>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <span className="text-stone-400 block text-[10px] uppercase tracking-wider mb-1">Técnica</span>
                                        <span className="font-medium text-white text-sm">{previewArtwork.technique}</span>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <span className="text-stone-400 block text-[10px] uppercase tracking-wider mb-1">Año</span>
                                        <span className="font-medium text-white text-sm">{previewArtwork.certificationDate.split('-')[0]}</span>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <span className="text-stone-400 block text-[10px] uppercase tracking-wider mb-1">Estado</span>
                                        <span className={`font-medium text-sm ${previewArtwork.code ? 'text-emerald-400' : 'text-amber-400'}`}>
                                            {previewArtwork.code ? 'Certificado' : 'Pendiente'}
                                        </span>
                                    </div>
                                </div>

                                {/* Info adicional para Giclée */}
                                {previewArtwork.hologramNumber && (
                                    <div className="mt-3 pt-3 border-t border-white/10">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-amber-400">Nº Holograma:</span>
                                            <span className="font-mono font-bold text-amber-300">{previewArtwork.hologramNumber}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ========================================
                            BLOQUE DERECHO: Certificado de Autenticidad
                            Con filtro de blur para seguridad
                            ======================================== */}
                        <div className="lg:w-64 w-full flex flex-col">
                            <h3 className="text-[10px] tracking-[0.3em] text-amber-400 uppercase mb-3 text-center">
                                Certificado de Autenticidad
                            </h3>

                            {/* Contenedor del certificado con BLUR de seguridad */}
                            <div className="relative flex-1">
                                {/* Certificado con filtro de desenfoque */}
                                <div className="filter blur-[1.5px] hover:blur-[0.5px] transition-all duration-300">
                                    <CertificatePreview
                                        titulo={previewArtwork.title}
                                        imagen={previewArtwork.image}
                                        año={parseInt(previewArtwork.certificationDate.split('-')[0]) || 2026}
                                        dimensiones={previewArtwork.dimensions}
                                        tecnica={previewArtwork.technique}
                                        isGiclee={!!previewArtwork.hologramNumber || !!previewArtwork.gicleeDimensions}
                                        tecnicaOriginal={previewArtwork.technique}
                                        medidasOriginal={previewArtwork.originalDimensions || previewArtwork.dimensions}
                                        medidasImpresion={previewArtwork.gicleeDimensions}
                                        idReferencia={previewArtwork.code}
                                        edicion={previewArtwork.seriesIndex && previewArtwork.seriesTotal ? `${previewArtwork.seriesIndex}/${previewArtwork.seriesTotal}` : undefined}
                                        hologramNumber={previewArtwork.hologramNumber}
                                    />
                                </div>

                                {/* Overlay de protección */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none rounded-lg" />

                                {/* Badge de seguridad */}
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-amber-500/90 text-white text-[10px] px-3 py-1.5 rounded-full font-medium backdrop-blur-sm flex items-center gap-1.5 shadow-lg">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Documento Protegido
                                </div>
                            </div>

                            {/* Nota informativa */}
                            <p className="text-stone-500 text-[10px] text-center mt-3 leading-relaxed">
                                Vista previa protegida. El certificado original incluye holograma de seguridad.
                            </p>
                        </div>
                    </div>
                </div>
            )}

        </div>
        </>
    );
};

export default ArtistDashboard;
