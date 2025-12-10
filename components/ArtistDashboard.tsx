import React, { useState, useMemo } from 'react';
import { LogOut, Printer, Code, Layout, Plus, Trash2, CheckCircle, FileText, Settings, Edit, Image as ImageIcon, Briefcase, MinusCircle, Check } from 'lucide-react'; 

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

// Opciones para el campo "Tipo de Obra"
const typeOptions = {
    'PT': 'Pintura',
    'SC': 'Escultura',
    'DI': 'Dibujo',
    'OT': 'Otro'
};

// 🛑 ESTADO INICIAL DE LAS PLANTILLAS
const initialSettings: DocumentSettings = {
    artistName: "Myriam Alcaraz",
    artistTitle: "Artista Visual",
    cycleName: "Serie 'Las Ciudades Invisibles'", 
    city: "Madrid", 
    letterOpening: "Estimado Coleccionista,",
    letterClosing: "Agradeciendo profundamente su apoyo a mi trayectoria artística, quedo a su disposición para cualquier consulta. Con mis mejores deseos," 
};


// ---------------------------------------------------------
// 🚀 FUNCIÓN CENTRAL: CODIFICACIÓN INTELIGENTE (MA-YYYY-YYMM(IIJJ))
// ---------------------------------------------------------
const generateSmartCode = (artworkToCode: Artwork): string => {
    const dateParts = artworkToCode.certificationDate.split('-'); 
    const year = dateParts[0];
    const yearShort = year.substring(2);
    const month = dateParts[1];
    const dateCode = `${yearShort}${month}`;

    let seriesCode = '';
    if (artworkToCode.seriesIndex !== null && artworkToCode.seriesTotal !== null) {
        const indexFmtd = String(artworkToCode.seriesIndex).padStart(2, '0');
        const totalFmtd = String(artworkToCode.seriesTotal).padStart(2, '0');
        seriesCode = `${indexFmtd}${totalFmtd}`;
    }
    
    return `MA-${year}-${dateCode}${seriesCode}`;
};


// ---------------------------------------------------------
// 📄 GENERADORES DE HTML PARA IMPRESIÓN (VERSIONES MEJORADAS)
// ---------------------------------------------------------
const getSeriesText = (artwork: Artwork) => {
    return artwork.seriesIndex !== null && artwork.seriesTotal !== null
        ? `Edición ${artwork.seriesIndex}/${artwork.seriesTotal}`
        : `Obra Única`;
}

/**
 * 🛑 FUNCIÓN MEJORADA: Genera el HTML del CERTIFICADO (Fiel al borrador.pdf con ajustes de tamaño de imagen).
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
                    /* Simula el doble borde dorado/negro */
                    box-shadow: 0 0 0 5px #d4af37; 
                    max-width: 550px; /* 🛑 AJUSTADO: Un poco más estrecho */
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
                    width: 70%; /* 🛑 AJUSTADO: Más pequeño */
                    max-width: 300px; /* 🛑 AJUSTADO: Más pequeño */
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
                    /* Estilo de la tabla de datos en el borrador */
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
                    text-align: right; /* Firma a la derecha para sello en seco */
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
                        <span>${seriesText}</span>
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

/**
 * FUNCIÓN DE CARTA (Sin cambios de formato, solo ajustes de limpieza)
 */
const getLetterHtml = (artwork: Artwork, settings: DocumentSettings): string => {
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    
    // CLAVE: Lógica para incluir la serie SÓLO si es una obra seriada.
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

/**
 * Función genérica para abrir una ventana e imprimir/PDF
 */
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
// 🏭 COMPONENTE: WORKSTATION (Tarjeta de Gestión por Obra - Sin Cambios)
// =========================================================

interface ArtworkWorkstationProps {
    artwork: Artwork;
    settings: DocumentSettings;
    onGenerateCode: (id: number) => void;
    onDelete: (id: number) => void;
}

const ArtworkWorkstation: React.FC<ArtworkWorkstationProps> = ({ artwork, settings, onGenerateCode, onDelete }) => {
    
    const certificateContent = useMemo(() => artwork.code ? getCertificateHtml(artwork, settings) : '', [artwork, settings]);
    const letterContent = useMemo(() => artwork.code ? getLetterHtml(artwork, settings) : '', [artwork, settings]);

    return (
        <div className={`bg-white p-6 rounded-xl shadow-xl transition-all border-l-4 ${artwork.code ? 'border-gold-500' : 'border-red-500'}`}>
            
            <div className="flex justify-between items-start border-b pb-4 mb-4">
                <div className="flex items-center gap-3">
                    <img src={artwork.image} alt={artwork.title} className="h-10 w-10 object-cover rounded-full border border-stone-200" />
                    <div>
                        <h4 className="text-xl font-bold text-slate-800">{artwork.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">
                            Cert. {artwork.certificationDate.substring(0, 4)} | {getSeriesText(artwork)}
                        </p>
                    </div>
                </div>
                
                <button
                    onClick={() => onDelete(artwork.id)}
                    className="text-red-500 hover:text-red-700 p-1 rounded transition"
                    title="Eliminar Obra"
                >
                    <Trash2 size={20} />
                </button>
            </div>

            <div className={`p-3 rounded-lg flex items-center justify-between gap-4 mb-4 ${artwork.code ? 'bg-green-50' : 'bg-red-50'}`}>
                {artwork.code ? (
                    <>
                        <p className="text-sm font-semibold text-green-700 flex items-center gap-2">
                            <CheckCircle size={18} /> CÓDIGO GENERADO:
                        </p>
                        <p className="font-mono text-lg font-bold text-slate-900 border border-dashed border-slate-300 p-1 px-3 rounded">
                            {artwork.code}
                        </p>
                    </>
                ) : (
                    <button
                        onClick={() => onGenerateCode(artwork.id)}
                        className="bg-gold-500 text-white py-2 px-4 rounded-lg font-bold text-sm hover:bg-gold-600 transition-colors flex items-center gap-2 w-full justify-center shadow-md"
                        title="Generar Código Único para esta obra"
                    >
                        <Code size={18} /> GENERAR CÓDIGO ÚNICO
                    </button>
                )}
            </div>
            
            <h5 className="text-sm font-bold text-slate-700 flex items-center gap-1 mt-6 mb-3 border-t pt-4">
                <Briefcase size={16} /> HERRAMIENTAS DE PRODUCCIÓN
            </h5>
            
            <div className="grid grid-cols-2 gap-4">
                
                <button
                    onClick={() => handlePrintDocument(certificateContent, `Certificado ${artwork.code}`)}
                    disabled={!artwork.code}
                    className={`py-3 px-4 rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm ${
                        artwork.code ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-stone-200 text-slate-400 cursor-not-allowed'
                    }`}
                    title={artwork.code ? "Abrir vista de impresión PDF para el Certificado" : "Genere el código primero"}
                >
                    <Printer size={16} /> IMPRIMIR CERTIFICADO
                </button>
                
                <button
                    onClick={() => handlePrintDocument(letterContent, `Carta ${artwork.code}`)}
                    disabled={!artwork.code}
                    className={`py-3 px-4 rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm ${
                        artwork.code ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-stone-200 text-slate-400 cursor-not-allowed'
                    }`}
                    title={artwork.code ? "Abrir vista de impresión PDF para la Carta al Coleccionista" : "Genere el código primero"}
                >
                    <FileText size={16} /> IMPRIMIR CARTA
                </button>
            </div>
            
            {!artwork.code && (
                <p className="text-xs text-red-500 mt-3 text-center flex items-center justify-center gap-1">
                    <MinusCircle size={14} /> La documentación requiere un Código de Trazabilidad.
                </p>
            )}

        </div>
    );
};


// =========================================================
// ⚙️ COMPONENTE: PANEL DE AJUSTES DE MARCA (Sin Cambios)
// =========================================================
interface SettingsPanelProps {
    settings: DocumentSettings;
    setSettings: React.Dispatch<React.SetStateAction<DocumentSettings>>;
    onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, setSettings, onClose }) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
            <div className="w-full max-w-md bg-white p-8 overflow-y-auto shadow-2xl">
                
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                        <Settings size={28} className="text-gold-500" /> Ajustes de Marca y Plantillas
                    </h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-green-500 p-2">
                        <Check size={24} title="Cerrar y Guardar Cambios" />
                    </button>
                </div>

                <p className="text-slate-600 mb-6 border-l-4 border-gold-300 pl-3 py-1">
                    Personalice los datos estáticos que aparecerán en todos sus Certificados y Cartas.
                </p>

                <div className="space-y-6">
                    {/* Ajustes de Identidad */}
                    <div className="p-4 border rounded-lg bg-stone-50">
                        <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-1"><Edit size={16} /> Identidad</h4>
                        
                        <label className="block text-xs font-medium text-slate-500 mb-1">Nombre del Artista (Firma)</label>
                        <input type="text" name="artistName" value={settings.artistName} onChange={handleChange} className="w-full p-2 border rounded text-sm mb-3 focus:ring-gold-500 focus:border-gold-500" />
                        
                        <label className="block text-xs font-medium text-slate-500 mb-1">Título / Cargo</label>
                        <input type="text" name="artistTitle" value={settings.artistTitle} onChange={handleChange} className="w-full p-2 border rounded text-sm mb-3 focus:ring-gold-500 focus:border-gold-500" />

                        <label className="block text-xs font-medium text-slate-500 mb-1">Ciudad de Emisión</label>
                        <input type="text" name="city" value={settings.city} onChange={handleChange} className="w-full p-2 border rounded text-sm focus:ring-gold-500 focus:border-gold-500" />
                    </div>

                    {/* Ajustes de Carta */}
                    <div className="p-4 border rounded-lg bg-stone-50">
                        <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-1"><FileText size={16} /> Plantilla de Carta</h4>
                        
                        <label className="block text-xs font-medium text-slate-500 mb-1">Ciclo Artístico General (Mencionado en la Carta si es SERIADA)</label>
                        <input type="text" name="cycleName" value={settings.cycleName} onChange={handleChange} placeholder="Ej: Serie 'Las Ciudades Invisibles'" className="w-full p-2 border rounded text-sm mb-3 focus:ring-gold-500 focus:border-gold-500" />
                        
                        <label className="block text-xs font-medium text-slate-500 mb-1">Apertura (Ej: Estimado Coleccionista,)</label>
                        <input type="text" name="letterOpening" value={settings.letterOpening} onChange={handleChange} className="w-full p-2 border rounded text-sm mb-3 focus:ring-gold-500 focus:border-gold-500" />

                        <label className="block text-xs font-medium text-slate-500 mb-1">Cierre y Agradecimiento</label>
                        <textarea name="letterClosing" value={settings.letterClosing} onChange={handleChange} rows={3} className="w-full p-2 border rounded text-sm resize-none focus:ring-gold-500 focus:border-gold-500"></textarea>
                    </div>
                </div>
                
                <button
                    onClick={onClose}
                    className="mt-8 w-full bg-gold-500 text-white py-3 rounded-lg font-bold text-sm hover:bg-gold-600 transition-colors"
                >
                    Aplicar y Cerrar
                </button>
            </div>
        </div>
    );
}

// =========================================================
// ➕ COMPONENTE: FORMULARIO DE AÑADIR OBRA (Actualizado)
// =========================================================

interface AddWorkFormProps {
    onAdd: (artwork: Omit<Artwork, 'id' | 'code' | 'status'>) => void;
}

const AddWorkForm: React.FC<AddWorkFormProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [certificationDate, setCertificationDate] = useState(new Date().toISOString().substring(0, 10));
    const [seriesIndex, setSeriesIndex] = useState<number | ''>('');
    const [seriesTotal, setSeriesTotal] = useState<number | ''>('');
    const [isSeries, setIsSeries] = useState(false);
    const [imagePath, setImagePath] = useState(''); 
    const [dimensions, setDimensions] = useState('');
    const [technique, setTechnique] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        let index = isSeries ? (seriesIndex === '' ? null : Number(seriesIndex)) : null;
        let total = isSeries ? (seriesTotal === '' ? null : Number(seriesTotal)) : null;

        if (isSeries) {
            if (index === null || total === null) {
                alert("Debe completar Pieza N° y Total Edición para una obra seriada.");
                return;
            }
            if (index > total) {
                 alert("El índice de la pieza no puede ser mayor que el total de la serie.");
                return;
            }
        }
        if (title.trim() === '' || dimensions.trim() === '' || technique.trim() === '') {
             alert("El título, las dimensiones y la técnica de la obra son obligatorios.");
             return;
        }

        onAdd({
            title: title.trim(),
            certificationDate: certificationDate,
            type: 'PT', // Pintura por defecto
            seriesIndex: index, 
            seriesTotal: total,
            image: imagePath || '/obras/placeholder-work.jpg', 
            dimensions: dimensions.trim(), 
            technique: technique.trim(), 
        });

        // Limpiar formulario
        setTitle('');
        setSeriesIndex('');
        setSeriesTotal('');
        setIsSeries(false);
        setImagePath('');
        setDimensions(''); 
        setTechnique(''); 
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-lg border border-stone-100 mb-8">
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6">
                <Plus size={24} className="text-gold-500" /> Añadir Nueva Obra al Catálogo
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                
                {/* Título */}
                <div className="col-span-1 md:col-span-2">
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
                <div className="col-span-1 md:col-span-1">
                    <label className="block text-xs font-medium text-slate-500 mb-1">Fecha de Creación</label>
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
                <div className="col-span-1 md:col-span-1">
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
                <div className="col-span-1 md:col-span-2">
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
                <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
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
                
                <button 
                    type="submit"
                    className="bg-slate-700 text-white py-3 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-1 shadow-md col-span-1"
                    disabled={!title.trim() || !dimensions.trim() || !technique.trim()}
                >
                    <Plus size={16} /> AÑADIR
                </button>
            </div>
        </form>
    );
};


// ---------------------------------------------------------
// ⚙️ COMPONENTE PRINCIPAL DEL DASHBOARD (CONTENEDOR)
// ---------------------------------------------------------
export const ArtistDashboard: React.FC<ArtistDashboardProps> = ({ onLogout }) => {
    
    // DATA CENTRAL: Obras (Ejemplo con datos reales)
    const [artworks, setArtworks] = useState<Artwork[]>([
        { id: 1, title: 'Sara bajo Farola', certificationDate: '2025-12-15', type: 'PT', seriesIndex: null, seriesTotal: null, code: 'MA-2025-2512', status: 'GENERADO', image: '/obras/demo-obra.jpg', dimensions: '100x81 cm', technique: 'Óleo sobre tela montada en tabla con bastidor' },
        { id: 2, title: 'Retrato de Otoño', certificationDate: '2026-01-20', type: 'PT', seriesIndex: 1, seriesTotal: 5, code: 'MA-2026-26010105', status: 'GENERADO', image: '/obras/demo-obra-seriada.jpg', dimensions: '50x70 cm', technique: 'Impresión Giclée sobre papel de algodón' },
        { id: 3, title: 'El Silencio del Estudio', certificationDate: '2025-10-01', type: 'SC', seriesIndex: null, seriesTotal: null, code: null, status: 'PENDIENTE', image: '/obras/placeholder-work.jpg', dimensions: '30x30x60 cm', technique: 'Escultura en bronce a la cera perdida' },
    ]);
    
    const [documentSettings, setDocumentSettings] = useState<DocumentSettings>(initialSettings);
    const [showSettingsPanel, setShowSettingsPanel] = useState(false);

    // Handler para añadir obra desde el formulario
    const handleAddArtwork = (newArtworkData: Omit<Artwork, 'id' | 'code' | 'status'>) => {
        const newId = Math.max(0, ...artworks.map(a => a.id)) + 1;
        const newArtwork: Artwork = {
            id: newId,
            ...newArtworkData,
            code: null,
            status: 'PENDIENTE'
        }; 
        
        setArtworks(prevArtworks => [newArtwork, ...prevArtworks]); 
    };
    
    // Handler para generar código
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
        return [...generated, ...pending];
    }, [artworks]);


    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
        
            <div className="max-w-6xl mx-auto">
                
                {/* CABECERA Y LOGOUT */}
                <div className="flex justify-between items-center mb-10 border-b pb-4">
                    <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                        <Layout size={28} className="text-gold-500" /> TALLER / ESTUDIO Privado v2.3 (Certificados Optimizados)
                    </h1>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setShowSettingsPanel(true)} 
                            className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-500 transition-colors py-2 px-3 border border-stone-200 rounded-lg hover:border-blue-500"
                        >
                            <Settings size={16} /> Ajustes de Marca
                        </button>
                        <button 
                            onClick={onLogout} 
                            className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-500 transition-colors py-2 px-3 border border-stone-200 rounded-lg hover:border-red-500"
                        >
                            <LogOut size={16} /> Cerrar Sesión
                        </button>
                    </div>
                </div>

                {/* FORMULARIO DE AÑADIR OBRA */}
                <AddWorkForm onAdd={handleAddArtwork} />

                {/* MURO DE OBRAS */}
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6">
                    <Code size={24} className="text-gold-500" /> Muro de Workstations ({artworks.length} Obras)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {artworks.length === 0 ? (
                        <div className="md:col-span-3 p-12 bg-white rounded-xl shadow-lg border border-stone-100 text-center">
                            <p className="text-xl text-slate-500 font-semibold flex items-center justify-center gap-2">
                                <MinusCircle size={24} /> Aún no hay obras en el catálogo.
                            </p>
                            <p className="text-slate-400 mt-2">Use el formulario de arriba para añadir su primera pieza y comenzar el proceso de codificación.</p>
                        </div>
                    ) : (
                        sortedArtworks.map(artwork => (
                            <ArtworkWorkstation
                                key={artwork.id}
                                artwork={artwork}
                                settings={documentSettings}
                                onGenerateCode={handleGenerateCode}
                                onDelete={handleDeleteArtwork}
                            />
                        ))
                    )}
                </div>

            </div>
            
            {/* PANEL DE AJUSTES FLOTANTE */}
            {showSettingsPanel && (
                <SettingsPanel 
                    settings={documentSettings} 
                    setSettings={setDocumentSettings} 
                    onClose={() => setShowSettingsPanel(false)} 
                />
            )}
            
        </div>
    );
};