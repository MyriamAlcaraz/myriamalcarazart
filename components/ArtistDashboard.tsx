import React, { useState, useMemo, useEffect } from 'react';
import { LogOut, Printer, Code, Layout, Plus, Trash2, CheckCircle, FileText, Settings, Edit, Briefcase, MinusCircle, Check, X, Copy, Image as ImageIcon, Mail, Instagram, Globe, ArrowLeft, AlertTriangle } from 'lucide-react';
import GicleeTab from './GicleeTab';
import { AIStudio } from "./AIStudio";


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

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                    <img src={artwork.image} alt={artwork.title} className="w-full h-48 object-cover rounded-lg shadow-inner" />
                </div>
                <div className="w-full md:w-2/3 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-serif text-gray-800 italic">{artwork.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{artwork.technique} • {artwork.dimensions}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


// =========================================================
// 🎨 COMPONENTE PRINCIPAL: ARTIST DASHBOARD
// =========================================================

interface ArtistDashboardProps {
    onLogout?: () => void;
}

const ArtistDashboard: React.FC<ArtistDashboardProps> = ({ onLogout }) => {
    const [artworks, setArtworks] = useState<Artwork[]>(REAL_ARTWORKS);
    const [settings] = useState<DocumentSettings>(initialSettings);

    const handleGenerateCode = (id: number) => {
        setArtworks(prev => prev.map(art => {
            if (art.id === id) {
                return { ...art, code: generateSmartCode(art), status: 'GENERADO' as const };
            }
            return art;
        }));
    };

    const handleDelete = (id: number) => {
        setArtworks(prev => prev.filter(art => art.id !== id));
    };

    const handleDuplicate = (artwork: Artwork) => {
        const newId = Math.max(...artworks.map(a => a.id)) + 1;
        const newArtwork: Artwork = {
            ...artwork,
            id: newId,
            code: null,
            status: 'PENDIENTE'
        };
        setArtworks(prev => [...prev, newArtwork]);
    };

    const handleEdit = (artwork: Artwork) => {
        setArtworks(prev => prev.map(art => art.id === artwork.id ? artwork : art));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-serif text-gray-800 mb-8">Panel de Artista</h1>

            <div className="grid gap-6">
                {artworks.map(artwork => (
                    <ArtworkWorkstation
                        key={artwork.id}
                        artwork={artwork}
                        settings={settings}
                        onGenerateCode={handleGenerateCode}
                        onDelete={handleDelete}
                        onDuplicate={handleDuplicate}
                        onEdit={handleEdit}
                    />
                ))}
            </div>

            {/* 🤖 ASISTENTE DE IA FLOTANTE */}
            <div className="fixed bottom-6 right-6 z-50 shadow-2xl">
                <AIStudio />
            </div>
        </div>
    );
};

export { ArtistDashboard };
export default ArtistDashboard;
