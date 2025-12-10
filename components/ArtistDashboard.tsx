import React, { useState, useMemo, useEffect } from 'react';
import { LogOut, Printer, Code, Layout, Plus, Trash2, CheckCircle, FileText, Settings, Edit, Briefcase, MinusCircle, Check, X, Copy, Image as ImageIcon } from 'lucide-react'; 

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
}

interface DocumentSettings {
  artistName: string;
  artistTitle: string;
  cycleName: string; 
  city: string;
  letterOpening: string;
  letterClosing: string;
}

interface ArtistDashboardProps {
  onLogout: () => void;
}

// ESTADO INICIAL DE LAS PLANTILLAS
const initialSettings: DocumentSettings = {
    artistName: "Myriam Alcaraz",
    artistTitle: "Artista Visual",
    cycleName: "Serie 'Las Ciudades Invisibles'", 
    city: "Madrid", 
    letterOpening: "Estimado Coleccionista,",
    letterClosing: "Agradeciendo profundamente su apoyo a mi trayectoria artística, quedo a su disposición para cualquier consulta. Con mis mejores deseos," 
};


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
    if (artworkToCode.seriesIndex !== null && artworkToCode.seriesTotal !== null) {
        // Aseguramos que el índice y el total sean de 2 dígitos
        const indexFmtd = String(artworkToCode.seriesIndex).padStart(2, '0');
        const totalFmtd = String(artworkToCode.seriesTotal).padStart(2, '0');
        seriesCode = `${indexFmtd}${totalFmtd}`;
    }
    
    // El formato final es MA-AÑOCOMPLETO-AÑOMES(INDEXTOTAL)
    return `MA-${year}-${dateCode}${seriesCode}`;
};


// ---------------------------------------------------------
// 📄 GENERADORES DE HTML PARA IMPRESIÓN (Sin cambios)
// ---------------------------------------------------------
const getSeriesText = (artwork: Artwork) => {
    return artwork.seriesIndex !== null && artwork.seriesTotal !== null
        ? `Edición ${artwork.seriesIndex}/${artwork.seriesTotal}`
        : `Obra Única`;
}

/**
 * Genera el HTML del CERTIFICADO.
 */
const getCertificateHtml = (artwork: Artwork, settings: DocumentSettings): string => {
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    const seriesText = getSeriesText(artwork);
    const creationMonthAndYear = new Date(artwork.certificationDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });

    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <title>Certificado - ${artwork.title}</title>
            <style>
                /* Estilos Fieles al Borrador: Tipografía Serifa, Doble Borde, Centro */
                body { font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif; font-size: 12pt; margin: 20mm; color: #111; }
                .cert-container { 
                    border: 1px solid #000; 
                    padding: 40px; 
                    box-shadow: 0 0 0 5px #d4af37; 
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
                    width: 70%; 
                    max-width: 300px; 
                    margin: 30px auto;
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
                .footer-text {
                    font-size: 10pt;
                    text-align: center;
                    color: #555;
                    margin-top: 20px;
                }
                .signature-area { 
                    margin-top: 60px; 
                    text-align: right; 
                    border-top: 1px solid #ddd;
                    padding-top: 15px;
                }
                .signature-line { 
                    border-top: 1px solid #000; 
                    display: inline-block; 
                    width: 45%; 
                    margin-bottom: 5px; 
                }
                .artist-title-style {
                    font-size: 10pt; 
                    color: #333; 
                    margin-top: 2px;
                }
                @media print { body { margin: 0; padding: 0; } .cert-container { box-shadow: none; border: 1px solid #000; max-width: 100%; } }
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
                    Por la presente se certifica que la obra de arte descrita a continuación 
                    es una creación original y auténtica de la artista:
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

                <div class="fixed-text" style="border-top: 1px solid #eee; padding-top: 15px; margin-bottom: 5px;">
                    Todos los derechos de autor y reproducción están reservados por la artista.
                </div>

                <div class="signature-area">
                    <p style="font-size: 10pt; margin-bottom: 5px;">
                        FECHA: ${today}
                    </p>
                    <span class="signature-line"></span>
                    <p class="artist-name">${settings.artistName}</p>
                    <p class="artist-title-style">${settings.artistTitle}</p>
                    <p style="font-size: 8pt; margin-top: 5px;">*Espacio reservado para Sello en Seco</p>
                </div>
                
                <div class="footer-text">
                    <a href="https://myriamalcaraz.art" style="color: #333; text-decoration: none;">HTTPS://MYRIAMALCARAZ.ART</a> | MYRIAMHOTMAIL@HOTMAIL.COM | MYRIAMALCARAZ.ARTIST
                </div>
            </div>
        </body>
        </html>
    `;
};

const getLetterHtml = (artwork: Artwork, settings: DocumentSettings): string => {
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    
    const seriesText = getSeriesText(artwork);
    const seriesReference = artwork.seriesIndex !== null
        ? `y pertenece a mi ciclo <span class="artwork-ref">${settings.cycleName}</span>.`
        : `y es una pieza única.`;
    
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <title>Carta Personalizada - ${artwork.title}</title>
            <style>
                body { font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif; font-size: 13pt; margin: 30mm; color: #111; line-height: 1.8; }
                .header { text-align: right; margin-bottom: 60px; }
                .header p { margin: 0; font-size: 11pt; color: #333; }
                .body-content { margin-top: 30px; }
                .artwork-ref { font-style: italic; font-weight: bold; color: #000; }
                .signature-area { margin-top: 100px; text-align: left; }
                .signature-line { height: 50px; border-bottom: 1px dashed #999; width: 50%; margin-bottom: 5px; }
                .signature-area p { margin: 5px 0; }
                .artist-name { font-weight: bold; font-size: 16pt; margin-top: 10px; }
                @media print { body { margin: 0; padding: 0; } }
            </style>
        </head>
        <body>
            <div class="header">
                <p>${settings.city}, a ${today}</p>
            </div>
            
            <p style="font-weight: bold; margin-bottom: 40px;">${settings.letterOpening}</p>

            <div class="body-content">
                <p>
                    Es un honor para mí que haya elegido una de mis creaciones para enriquecer su colección. Con esta carta, le hago entrega formal del Certificado de Autenticidad, el cual respalda la procedencia y la unicidad de su nueva obra.
                </p>
                
                <p style="margin-top: 30px;">
                    La pieza, <span class="artwork-ref">"${artwork.title}"</span> (${seriesText}), ha sido registrada con el código de trazabilidad **${artwork.code}** ${seriesReference}
                </p>
                
                <p style="margin-top: 40px;">
                    ${settings.letterClosing}
                </p>
            </div>
            
            <div class="signature-area">
                <p style="font-style: italic; margin-bottom: 15px;">Reciba un cordial saludo,</p>
                <div class="signature-line"></div>
                <p class="artist-name">${settings.artistName}</p>
                <p>${settings.artistTitle}</p>
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
// (La vista de cada foto individual)
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
                    className="w-full h-full object-cover transition-opacity group-hover:opacity-50" 
                />
                
                {/* Overlay con los botones de Certificado/Carta (Aparece al hacer hover/click) */}
                <div className={`absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity p-4 ${!artwork.code && 'opacity-100 bg-red-800/80'}`}>
                    
                    {/* ACCIÓN PRINCIPAL (GENERAR CÓDIGO) */}
                    {!artwork.code ? (
                        // Esto solo se mostrará para las obras que añada el usuario sin código.
                        <>
                            <p className="text-white text-xs font-semibold uppercase tracking-wider mb-2">Paso Requerido</p>
                            <button
                                onClick={() => onGenerateCode(artwork.id)}
                                className="bg-gold-500 text-white py-3 px-6 rounded-lg font-bold text-sm hover:bg-gold-600 transition-colors flex items-center gap-2 w-full justify-center shadow-lg"
                                title="Generar Código Único de Trazabilidad para esta obra"
                            >
                                <Code size={18} /> GENERAR CÓDIGO
                            </button>
                        </>
                    ) : (
                        // ACCIONES DE DOCUMENTACIÓN (CERTIFICADO Y CARTA) - Esto se verá si ya tienen código.
                        <>
                            <p className="text-white text-xs font-semibold uppercase tracking-wider mb-2">Documentos Listos</p>
                            
                            <button
                                onClick={() => handlePrintDocument(certificateContent, `Certificado ${artwork.code}`)}
                                className="bg-blue-600 text-white py-3 px-6 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 w-full shadow-lg"
                            >
                                <Printer size={16} /> CERTIFICADO
                            </button>
                            
                            <button
                                onClick={() => handlePrintDocument(letterContent, `Carta ${artwork.code}`)}
                                className="bg-blue-600/80 text-white py-3 px-6 rounded-lg font-bold text-sm hover:bg-blue-700/80 transition-colors flex items-center justify-center gap-2 w-full shadow-lg"
                            >
                                <FileText size={16} /> CARTA
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
    onSave: (artwork: Omit<Artwork, 'id' | 'code' | 'status'>, idToUpdate: number | null) => void;
    artworkToManage: Artwork | null;
    onCancel: () => void;
}

const ArtworkManagementForm: React.FC<ArtworkFormProps> = ({ onSave, artworkToManage, onCancel }) => {
    
    // Estado interno del formulario
    const isEditing = artworkToManage && artworkToManage.id > 0; // Si tiene ID positivo, es una obra existente
    const isDuplicating = artworkToManage && artworkToManage.id === -1; // Indicador temporal para duplicación (ID -1)

    const [title, setTitle] = useState('');
    const [certificationDate, setCertificationDate] = useState(new Date().toISOString().substring(0, 10));
    const [seriesIndex, setSeriesIndex] = useState<number | ''>('');
    const [seriesTotal, setSeriesTotal] = useState<number | ''>('');
    const [isSeries, setIsSeries] = useState(false);
    const [imagePath, setImagePath] = useState(''); 
    const [dimensions, setDimensions] = useState('');
    const [technique, setTechnique] = useState('');
    
    // Hook para PRE-RELLENAR el formulario (al añadir, duplicar o editar)
    useEffect(() => {
        if (artworkToManage) {
            // Carga los datos existentes (para duplicar o editar)
            setTitle(artworkToManage.title);
            // Si es una duplicación, usa la fecha de hoy y sugiere el siguiente índice
            setCertificationDate(isDuplicating ? new Date().toISOString().substring(0, 10) : artworkToManage.certificationDate); 
            setSeriesIndex(isDuplicating && artworkToManage.seriesIndex !== null ? artworkToManage.seriesIndex + 1 : artworkToManage.seriesIndex ?? '');
            setSeriesTotal(artworkToManage.seriesTotal ?? '');
            setIsSeries(artworkToManage.seriesIndex !== null);
            setImagePath(artworkToManage.image);
            setDimensions(artworkToManage.dimensions);
            setTechnique(artworkToManage.technique);
        } else {
            // Valores por defecto para "Añadir Nueva Obra"
            setTitle('');
            setCertificationDate(new Date().toISOString().substring(0, 10));
            setSeriesIndex('');
            setSeriesTotal('');
            setIsSeries(false);
            setImagePath('');
            setDimensions(''); 
            setTechnique(''); 
        }
    }, [artworkToManage, isDuplicating]); 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        let index = isSeries ? (seriesIndex === '' ? null : Number(seriesIndex)) : null;
        let total = isSeries ? (seriesTotal === '' ? null : Number(seriesTotal)) : null;

        if (isSeries) {
            if (index === null || total === null || index > total) {
                alert("Revise los campos de la edición seriada (N° Pieza y Total Edición).");
                return;
            }
        }
        if (title.trim() === '' || dimensions.trim() === '' || technique.trim() === '') {
             alert("El título, las dimensiones y la técnica de la obra son obligatorios.");
             return;
        }

        const newArtworkData: Omit<Artwork, 'id' | 'code' | 'status'> = {
            title: title.trim(),
            certificationDate: certificationDate,
            type: 'PT', // Pintura por defecto
            seriesIndex: index, 
            seriesTotal: total,
            image: imagePath || '/obras/placeholder-work.jpg', 
            dimensions: dimensions.trim(), 
            technique: technique.trim(), 
        };

        // Si estamos editando un elemento existente, pasamos su ID. Si estamos duplicando o añadiendo, pasamos null.
        const idToUpdate = isEditing ? artworkToManage.id : null;

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
                    
                    {/* Control de Serie */}
                    <div className="flex flex-col gap-2 col-span-1 md:col-span-3">
                        <label className="flex items-center text-xs font-medium text-slate-500 cursor-pointer">
                            <input 
                                type="checkbox"
                                checked={isSeries}
                                onChange={(e) => setIsSeries(e.target.checked)}
                                className="mr-2 rounded text-gold-500 focus:ring-gold-500"
                            />
                            ¿Obra Seriada?
                        </label>
                        <div className="flex gap-2">
                            <input 
                                type="number" 
                                value={seriesIndex} 
                                onChange={(e) => setSeriesIndex(e.target.value === '' ? '' : Math.max(1, Number(e.target.value)))}
                                placeholder="N° Pieza"
                                className="p-2 border rounded text-sm w-1/2 text-center focus:ring-gold-500 focus:border-gold-500"
                                min="1"
                                required={isSeries}
                                disabled={!isSeries}
                            />
                            <input 
                                type="number" 
                                value={seriesTotal} 
                                onChange={(e) => setSeriesTotal(e.target.value === '' ? '' : Math.max(1, Number(e.target.value)))}
                                placeholder="Total Edición"
                                className="p-2 border rounded text-sm w-1/2 text-center focus:ring-gold-500 focus:border-gold-500"
                                min="1"
                                required={isSeries}
                                disabled={!isSeries}
                            />
                        </div>
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
    
    // 🛑 -------------------------------------------------------------------------
    // 🛑 AQUÍ DEBE INTRODUCIR LA LISTA COMPLETA DE SU CATÁLOGO DE OBRAS. 
    // 🛑 SUSTITUYA EL CONTENIDO DE ESTE ARRAY CON TODAS SUS OBRAS.
    // 🛑 -------------------------------------------------------------------------
    const [artworks, setArtworks] = useState<Artwork[]>([
        // Por favor, reemplace estos ejemplos con su catálogo.
        { id: 1, title: 'Sara bajo Farola', certificationDate: '2025-12-15', type: 'PT', seriesIndex: null, seriesTotal: null, code: 'MA-2025-2512', status: 'GENERADO', image: '/obras/demo-obra.jpg', dimensions: '100x81 cm', technique: 'Óleo sobre tela montada en tabla con bastidor' },
        { id: 2, title: 'Retrato de Otoño (Ed. 1/5)', certificationDate: '2026-01-20', type: 'PT', seriesIndex: 1, seriesTotal: 5, code: 'MA-2026-26010105', status: 'GENERADO', image: '/obras/demo-obra-seriada.jpg', dimensions: '50x70 cm', technique: 'Impresión Giclée sobre papel de algodón' },
        { id: 3, title: 'El Silencio del Estudio', certificationDate: '2025-10-01', type: 'SC', seriesIndex: null, seriesTotal: null, code: 'MA-2025-2510', status: 'GENERADO', image: '/obras/placeholder-work.jpg', dimensions: '30x30x60 cm', technique: 'Escultura en bronce a la cera perdida' },
        { id: 4, title: 'Geometría Urbana N°4 (Ed. 4/10)', certificationDate: '2024-05-10', type: 'DI', seriesIndex: 4, seriesTotal: 10, code: 'MA-2024-24050410', status: 'GENERADO', image: '/obras/demo-obra-seriada.jpg', dimensions: '30x40 cm', technique: 'Tinta y carbón sobre papel' }, 
        { id: 5, title: 'La Mirada de Clara', certificationDate: '2025-08-22', type: 'PT', seriesIndex: null, seriesTotal: null, code: 'MA-2025-2508', status: 'GENERADO', image: '/obras/demo-obra.jpg', dimensions: '70x70 cm', technique: 'Acrílico y collage sobre lienzo' }, 
    ]);
    
    const [documentSettings, setDocumentSettings] = useState<DocumentSettings>(initialSettings);
    const [artworkToManage, setArtworkToManage] = useState<Artwork | null>(null);

    // Handler para añadir o editar obra
    const handleSaveArtwork = (newArtworkData: Omit<Artwork, 'id' | 'code' | 'status'>, idToUpdate: number | null) => {
        
        if (idToUpdate) {
            // EDICIÓN
            setArtworks(prevArtworks => prevArtworks.map(artwork => {
                if (artwork.id === idToUpdate) {
                    // Mantiene el código y el estado si existían, solo actualiza los datos
                    return { 
                        ...artwork, 
                        ...newArtworkData,
                    };
                }
                return artwork;
            }));
        } else {
            // AÑADIR NUEVA
            const newId = Math.max(0, ...artworks.map(a => a.id)) + 1;
            const newArtwork: Artwork = {
                id: newId,
                ...newArtworkData,
                code: null, // El código se generará en el siguiente paso (GENERAR CÓDIGO)
                status: 'PENDIENTE'
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
            code: null,
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
    
    // Obras ordenadas: Generadas primero, luego pendientes.
    const sortedArtworks = useMemo(() => {
        const generated = artworks.filter(a => a.status === 'GENERADO');
        const pending = artworks.filter(a => a.status === 'PENDIENTE');
        // Ordenar por ID para mantener un orden consistente dentro de cada grupo
        generated.sort((a, b) => b.id - a.id);
        pending.sort((a, b) => b.id - a.id);
        return [...generated, ...pending];
    }, [artworks]);


    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
        
            <div className="max-w-6xl mx-auto">
                
                {/* CABECERA Y BOTONES GLOBALES (LIMPIOS) */}
                <div className="flex justify-between items-center mb-10 border-b pb-4">
                    <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                        <Layout size={28} className="text-gold-500" /> TALLER / ESTUDIO
                    </h1>
                    {/* 🛑 SOLO MOSTRAR BOTÓN DE SALIR */}
                    <div className="flex gap-4">
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
                            {/* Única forma de añadir la primera obra, ya que se eliminó el botón "+ NUEVA OBRA" */}
                            <p className="text-slate-400 mt-2">
                                Para añadir su primera pieza, haga click aquí:
                                <button 
                                    onClick={() => setArtworkToManage(null)} 
                                    className="ml-2 text-blue-500 hover:text-blue-700 font-semibold underline"
                                >
                                    Añadir Obra Nueva
                                </button>
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
            
            {/* 🛑 FORMULARIO DE GESTIÓN DE OBRA (Flotante - accesible solo desde los iconos de las tarjetas) */}
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