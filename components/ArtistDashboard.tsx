import React, { useState, useMemo } from 'react';
import { LogOut, Printer, Code, Layout, Plus, Trash2, Download, CheckCircle, FileText, Settings, Edit, Image as ImageIcon, Briefcase, MinusCircle, Check } from 'lucide-react';

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

// 🛑 ESTADO INICIAL DE LAS PLANTILLAS (MADRID y texto elegante)
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
        // Aseguramos que tengan 2 dígitos
        const indexFmtd = String(artworkToCode.seriesIndex).padStart(2, '0');
        const totalFmtd = String(artworkToCode.seriesTotal).padStart(2, '0');
        seriesCode = `${indexFmtd}${totalFmtd}`;
    }
    
    return `MA-${year}-${dateCode}${seriesCode}`;
};


// ---------------------------------------------------------
// 📄 GENERADORES DE HTML PARA IMPRESIÓN (EXQUISITAMENTE SOFISTICADO)
// ---------------------------------------------------------
const getSeriesText = (artwork: Artwork) => {
    return artwork.seriesIndex !== null && artwork.seriesTotal !== null
        ? `Edición ${artwork.seriesIndex}/${artwork.seriesTotal}`
        : `Obra Única`;
}

/**
 * Genera el HTML limpio y profesional del CERTIFICADO.
 */
const getCertificateHtml = (artwork: Artwork, settings: DocumentSettings): string => {
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    const seriesText = getSeriesText(artwork);

    // HTML con estilos en línea optimizados para una apariencia sofisticada (Palatino, borde sutil dorado)
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <title>Certificado - ${artwork.title}</title>
            <style>
                /* Estilos Exquisitos: Tipografía Serifa, Márgenes amplios y color sutil */
                body { font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif; font-size: 12pt; margin: 30mm; color: #111; }
                .cert-container { 
                    border: 1px solid #000; 
                    padding: 50px; 
                    /* Simula un borde dorado sutil - ESTO LE DA LA SOFISTICACIÓN */
                    box-shadow: 0 0 0 5px #d4af37; 
                }
                h1 { 
                    font-size: 30pt; 
                    text-align: center; 
                    margin-bottom: 5px; 
                    font-weight: 300; 
                    letter-spacing: 5px; 
                    color: #d4af37; /* Color dorado/marrón sutil */
                    text-transform: uppercase;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 20px;
                }
                h2 { 
                    font-size: 14pt; 
                    text-align: center; 
                    margin-bottom: 50px; 
                    font-weight: normal; 
                    color: #555; 
                    font-style: italic; 
                }
                .details p { margin: 20px 0; font-size: 14pt; line-height: 1.6;}
                .details strong { color: #000; font-weight: bold; display: inline-block; width: 250px; } /* Alineación profesional */
                .code-display { 
                    font-size: 18pt; 
                    font-weight: bold; 
                    color: #333; 
                    border: 1px solid #ccc; 
                    padding: 8px 15px; 
                    display: inline-block; 
                    margin-left: 20px; 
                    font-family: 'Courier New', monospace; 
                    background: #f9f9f9;
                }
                .guarantee { margin-top: 60px; font-size: 11pt; border-top: 1px solid #eee; padding-top: 20px; font-style: italic; color: #444; }
                .signature-area { margin-top: 80px; text-align: left; }
                .signature-line { border-top: 1px solid #000; display: block; width: 45%; padding-top: 5px; margin-bottom: 5px; }
                .artist-name { font-weight: bold; font-size: 16pt; margin-top: 10px; }
                @media print { body { margin: 0; padding: 0; } }
            </style>
        </head>
        <body>
            <div class="cert-container">
                <h1>AUTENTICIDAD</h1>
                <h2>Certificado de Obra Original</h2>
                <div class="details">
                    <p><strong>Artista:</strong> ${settings.artistName}</p>
                    <p><strong>Título:</strong> ${artwork.title}</p>
                    <p><strong>Tipo de Obra:</strong> ${typeOptions[artwork.type]}</p>
                    <p><strong>Año de Creación:</strong> ${artwork.certificationDate.substring(0, 4)}</p>
                    <p><strong>Edición:</strong> ${seriesText}</p>
                    <p><strong>Código de Trazabilidad:</strong> <span class="code-display">${artwork.code}</span></p>
                    <p><strong>Medidas:</strong> [DIMENSIONES EN CM]</p>
                    
                    <div class="guarantee">
                        La artista certifica que la obra anteriormente descrita es original, ha sido creada en su estudio y registrada bajo el código único de trazabilidad. Este certificado es la máxima garantía de procedencia y autoría.
                    </div>
                </div>

                <div class="signature-area">
                    <p style="font-size: 10pt; margin-bottom: 5px;">Fecha de Emisión: ${today}</p>
                    <span class="signature-line"></span>
                    <p class="artist-name">${settings.artistName}</p>
                    <p>${settings.artistTitle}</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

/**
 * Genera el HTML limpio y profesional de la CARTA.
 */
const getLetterHtml = (artwork: Artwork, settings: DocumentSettings): string => {
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    
    // HTML con estilos en línea optimizados para una apariencia sofisticada (Palatino, estructura de carta formal)
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
                    La pieza, <span class="artwork-ref">"${artwork.title}"</span> (${getSeriesText(artwork)}), pertenece a mi <span class="artwork-ref">${settings.cycleName}</span> y ha sido registrada con el código de trazabilidad **${artwork.code}**. Espero sinceramente que el diálogo con esta obra le brinde tanta satisfacción como la que encontré al concebirla.
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
        // Damos tiempo a que se carguen los estilos antes de llamar a la impresión
        setTimeout(() => {
            printWindow.print();
        }, 500); 
    } else {
        alert("Por favor, permite las ventanas emergentes para generar el documento.");
    }
}


// =========================================================
// 🏭 COMPONENTE: WORKSTATION (Tarjeta de Gestión por Obra)
// =========================================================

interface ArtworkWorkstationProps {
    artwork: Artwork;
    settings: DocumentSettings;
    onGenerateCode: (id: number) => void;
    onDelete: (id: number) => void;
}

const ArtworkWorkstation: React.FC<ArtworkWorkstationProps> = ({ artwork, settings, onGenerateCode, onDelete }) => {
    
    // Generación de contenido usando la configuración global
    const certificateContent = useMemo(() => artwork.code ? getCertificateHtml(artwork, settings) : '', [artwork, settings]);
    const letterContent = useMemo(() => artwork.code ? getLetterHtml(artwork, settings) : '', [artwork, settings]);

    return (
        <div className={`bg-white p-6 rounded-xl shadow-xl transition-all border-l-4 ${artwork.code ? 'border-gold-500' : 'border-red-500'}`}>
            
            {/* CABECERA Y TÍTULO */}
            <div className="flex justify-between items-start border-b pb-4 mb-4">
                <div className="flex items-center gap-3">
                    <ImageIcon size={24} className="text-slate-600" />
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

            {/* CÓDIGO DE TRAZABILIDAD */}
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
            
            {/* HERRAMIENTAS DE DOCUMENTACIÓN */}
            <h5 className="text-sm font-bold text-slate-700 flex items-center gap-1 mt-6 mb-3 border-t pt-4">
                <Briefcase size={16} /> HERRAMIENTAS DE PRODUCCIÓN
            </h5>
            
            <div className="grid grid-cols-2 gap-4">
                
                {/* Botón Certificado */}
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
                
                {/* Botón Carta */}
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
// ⚙️ COMPONENTE: PANEL DE AJUSTES DE MARCA
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
                        
                        <label className="block text-xs font-medium text-slate-500 mb-1">Ciclo Artístico General (Mencionado en la Carta)</label>
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
// ➕ COMPONENTE: FORMULARIO DE AÑADIR OBRA
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
        if (title.trim() === '') {
             alert("El título de la obra es obligatorio.");
             return;
        }

        onAdd({
            title: title.trim(),
            certificationDate: certificationDate,
            type: 'PT', // Pintura por defecto
            seriesIndex: index, 
            seriesTotal: total,
        });

        // Limpiar formulario
        setTitle('');
        setSeriesIndex('');
        setSeriesTotal('');
        setIsSeries(false);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-lg border border-stone-100 mb-8">
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6">
                <Plus size={24} className="text-gold-500" /> Añadir Nueva Obra al Catálogo
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                
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
                
                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Fecha de Certificación</label>
                    <input 
                        type="date" 
                        value={certificationDate} 
                        onChange={(e) => setCertificationDate(e.target.value)}
                        className="p-2 border rounded text-sm w-full text-center focus:ring-gold-500 focus:border-gold-500"
                        max={new Date().toISOString().substring(0, 10)}
                        required
                    />
                </div>
                
                {/* Control de Serie */}
                <div className="flex flex-col gap-2">
                    <label className="flex items-center text-xs font-medium text-slate-500 cursor-pointer">
                        <input 
                            type="checkbox"
                            checked={isSeries}
                            onChange={(e) => setIsSeries(e.target.checked)}
                            className="mr-2 rounded text-gold-500 focus:ring-gold-500"
                        />
                        ¿Obra Seriada?
                    </label>
                    {isSeries && (
                        <div className="flex gap-2">
                            <input 
                                type="number" 
                                value={seriesIndex} 
                                onChange={(e) => setSeriesIndex(e.target.value === '' ? '' : Math.max(1, Number(e.target.value)))}
                                placeholder="N°"
                                className="p-2 border rounded text-sm w-1/2 text-center focus:ring-gold-500 focus:border-gold-500"
                                min="1"
                                required={isSeries}
                            />
                            <input 
                                type="number" 
                                value={seriesTotal} 
                                onChange={(e) => setSeriesTotal(e.target.value === '' ? '' : Math.max(1, Number(e.target.value)))}
                                placeholder="Total"
                                className="p-2 border rounded text-sm w-1/2 text-center focus:ring-gold-500 focus:border-gold-500"
                                min="1"
                                required={isSeries}
                            />
                        </div>
                    )}
                </div>
                
                <button 
                    type="submit