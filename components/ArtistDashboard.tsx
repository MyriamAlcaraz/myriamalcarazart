import React, { useState, useMemo } from 'react';
import { LogOut, Printer, Code, Layout, Plus, Trash2, Download, CheckCircle, FileText, Settings, Image as ImageIcon, Edit, Check } from 'lucide-react';

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

// 🛑 ESTADO INICIAL DE LAS PLANTILLAS (Personalizable en CUADRO 3)
const initialSettings: DocumentSettings = {
    artistName: "Myriam Alcaraz",
    artistTitle: "Artista Visual",
    cycleName: "Serie 'Ítaca' de la Temporada 2024",
    city: "Móstoles",
    letterOpening: "Estimado Coleccionista,",
    letterClosing: "Con mis mejores deseos, le agradezco sinceramente su apoyo y su pasión por el arte."
};


// ---------------------------------------------------------
// 🚀 FUNCIÓN CENTRAL: CODIFICACIÓN INTELIGENTE
// ---------------------------------------------------------
const generateSmartCode = (artworkToCode: Artwork): string => {
    // Implementación de la fórmula: MA-YYYY-YYMM(IIJJ)
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
// 📄 GENERADORES DE HTML PARA IMPRESIÓN (Optimizado para PDF)
// ---------------------------------------------------------

const getSeriesText = (artwork: Artwork) => {
    return artwork.seriesIndex !== null && artwork.seriesTotal !== null
        ? `Edición ${artwork.seriesIndex}/${artwork.seriesTotal}`
        : `Obra Única`;
}

/**
 * Genera el HTML exclusivo del CERTIFICADO, usando la configuración global.
 */
const getCertificateHtml = (artwork: Artwork, settings: DocumentSettings): string => {
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    const seriesText = getSeriesText(artwork);

    // 🛑 ESTILOS PROFESIONALES EN LÍNEA para garantizar la impresión
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <title>Certificado - ${artwork.title}</title>
            <style>
                body { font-family: 'Times New Roman', serif; font-size: 11pt; margin: 30mm; color: #000; }
                .cert-box { border: 4px solid #000; padding: 40px; }
                h1 { font-size: 26pt; text-align: center; margin-bottom: 50px; font-weight: bold; text-transform: uppercase; }
                .details p { margin: 15px 0; font-size: 13pt; line-height: 1.4;}
                .code-display { font-size: 20pt; font-weight: bold; color: #000; border: 2px dashed #ccc; padding: 5px 15px; display: inline-block; margin-left: 20px; font-family: 'Courier New', monospace; }
                .signature { margin-top: 100px; text-align: left; }
                .signature-line { border-top: 1px solid #000; display: block; width: 40%; padding-top: 5px; }
                .artist-name { font-weight: bold; font-size: 14pt; margin-top: 10px; }
                @media print { body { margin: 0; padding: 0; } }
            </style>
        </head>
        <body>
            <div class="cert-box">
                <h1>CERTIFICADO DE AUTENTICIDAD</h1>
                <div class="details">
                    <p><strong>Artista:</strong> ${settings.artistName}</p>
                    <p><strong>Título de la Obra:</strong> ${artwork.title}</p>
                    <p><strong>Código de Trazabilidad:</strong> <span class="code-display">${artwork.code}</span></p>
                    <p><strong>Tipo de Obra:</strong> ${typeOptions[artwork.type]}</p>
                    <p><strong>Año de Creación:</strong> ${artwork.certificationDate.substring(0, 4)}</p>
                    <p><strong>Edición:</strong> ${seriesText}</p>
                    <p><strong>Medidas:</strong> [DIMENSIONES EN CM]</p>
                    <p style="margin-top: 40px; font-size: 12pt; font-style: italic;">
                        <strong>Garantía:</strong> Por la presente, certifico que la obra descrita es original y ha sido creada y firmada por la artista ${settings.artistName}, ${settings.artistTitle}.
                    </p>
                </div>
            </div>

            <div class="signature">
                <p style="font-size: 10pt; margin-bottom: 5px;">Fecha de Emisión: ${today}</p>
                <span class="signature-line"></span>
                <p class="artist-name">Firma de ${settings.artistName}</p>
            </div>
        </body>
        </html>
    `;
};

/**
 * Genera el HTML exclusivo de la CARTA, usando la configuración global.
 */
const getLetterHtml = (artwork: Artwork, settings: DocumentSettings): string => {
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    const seriesText = getSeriesText(artwork);

    // 🛑 ESTILOS PROFESIONALES EN LÍNEA para garantizar la impresión
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <title>Carta - ${artwork.title}</title>
            <style>
                body { font-family: 'Times New Roman', serif; font-size: 12pt; margin: 30mm; color: #000; line-height: 1.8; }
                .date { text-align: right; font-size: 11pt; margin-bottom: 50px; }
                .signature { margin-top: 80px; text-align: left; }
                .signature p { margin: 5px 0; }
                .signature .artist-name { font-weight: bold; font-size: 14pt; }
                @media print { body { margin: 0; padding: 0; } }
            </style>
        </head>
        <body>
            <div class="date">${settings.city}, a ${today}</div>
            
            <p style="font-weight: bold; margin-bottom: 30px;">${settings.letterOpening}</p>

            <p>
                Me dirijo a usted con gran entusiasmo para adjuntarle el Certificado de Autenticidad de la obra que ahora forma parte de su colección. Este documento garantiza la originalidad y la procedencia directa de mi estudio.
            </p>
            
            <p style="margin-top: 25px;">
                La pieza, <strong>"${artwork.title}"</strong> (${seriesText}), con código de trazabilidad **${artwork.code}**, fue creada durante mi ${settings.cycleName}. Espero que le proporcione tanta satisfacción como a mí me dio crearla.
            </p>
            
            <p style="margin-top: 40px;">
                ${settings.letterClosing}
            </p>
            
            <div class="signature">
                <p style="font-style: italic; margin-bottom: 15px;">Atentamente,</p>
                <p style="height: 50px; border-bottom: 1px dashed #999; width: 50%; margin-bottom: 5px;"></p>
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
// ⚙️ CUADRO 3: CENTRO DE CONTENIDO Y PLANTILLAS (NUEVO)
// =========================================================
interface ContentSettingsProps {
    settings: DocumentSettings;
    setSettings: React.Dispatch<React.SetStateAction<DocumentSettings>>;
}

const ContentSettings: React.FC<ContentSettingsProps> = ({ settings, setSettings }) => {
    const [isSaved, setIsSaved] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
        setIsSaved(false);
    };
    
    const handleSave = () => {
        // En un entorno real, aquí se guardaría en una base de datos.
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100 transition-shadow">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6 border-b pb-3">
                <Settings size={24} className="text-gold-500" /> CUADRO 3: Centro de Contenido y Plantillas
            </h3>
            
            <p className="text-slate-600 mb-6">
                Personalice los datos estáticos de sus documentos. Estos ajustes se aplicarán inmediatamente en el **Laboratorio de Documentos** (Cuadro 2).
            </p>

            <div className="grid grid-cols-2 gap-6">
                {/* Ajustes de Identidad */}
                <div className="p-4 border rounded-lg bg-stone-50">
                    <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-1"><Edit size={16} /> Identidad</h4>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Nombre del Artista (Para firma)</label>
                    <input type="text" name="artistName" value={settings.artistName} onChange={handleChange} className="w-full p-2 border rounded text-sm mb-3" />
                    
                    <label className="block text-xs font-medium text-slate-500 mb-1">Título / Cargo</label>
                    <input type="text" name="artistTitle" value={settings.artistTitle} onChange={handleChange} className="w-full p-2 border rounded text-sm mb-3" />

                    <label className="block text-xs font-medium text-slate-500 mb-1">Ciudad de Emisión</label>
                    <input type="text" name="city" value={settings.city} onChange={handleChange} className="w-full p-2 border rounded text-sm mb-3" />
                </div>

                {/* Ajustes de Carta */}
                <div className="p-4 border rounded-lg bg-stone-50">
                    <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-1"><FileText size={16} /> Plantilla de Carta</h4>
                    
                    <label className="block text-xs font-medium text-slate-500 mb-1">Ciclo Artístico General</label>
                    <input type="text" name="cycleName" value={settings.cycleName} onChange={handleChange} placeholder="Ej: Serie 'Las Ciudades Invisibles'" className="w-full p-2 border rounded text-sm mb-3" />
                    
                    <label className="block text-xs font-medium text-slate-500 mb-1">Apertura (Ej: Estimado Coleccionista,)</label>
                    <input type="text" name="letterOpening" value={settings.letterOpening} onChange={handleChange} className="w-full p-2 border rounded text-sm mb-3" />

                    <label className="block text-xs font-medium text-slate-500 mb-1">Cierre y Agradecimiento</label>
                    <textarea name="letterClosing" value={settings.letterClosing} onChange={handleChange} rows={3} className="w-full p-2 border rounded text-sm resize-none"></textarea>
                </div>
            </div>
            
            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSave}
                    className={`py-2 px-4 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
                        isSaved ? 'bg-green-500 text-white' : 'bg-gold-500 text-white hover:bg-gold-600'
                    }`}
                >
                    {isSaved ? <Check size={16} /> : <Edit size={16} />} 
                    {isSaved ? 'Guardado' : 'Guardar Configuración'}
                </button>
            </div>
        </div>
    );
}


// =========================================================
// 🔬 CUADRO 2: LABORATORIO DE DOCUMENTOS
// =========================================================
interface DocumentLaboratoryProps {
    artworks: Artwork[];
    settings: DocumentSettings;
}

const DocumentLaboratory: React.FC<DocumentLaboratoryProps> = ({ artworks, settings }) => {
    
    const codedArtworks = useMemo(() => artworks.filter(a => a.code), [artworks]);
    
    // El estado guarda el ID de la obra seleccionada.
    const [selectedId, setSelectedId] = useState<number | null>(codedArtworks.length > 0 ? codedArtworks[0].id : null);
    
    // Obra actualmente visible
    const selectedArtwork = useMemo(() => 
        artworks.find(a => a.id === selectedId), 
        [artworks, selectedId]
    );

    // Ajuste: Sincronizar selectedId si la lista cambia y la ID no existe.
    if (codedArtworks.length > 0 && (!selectedArtwork || selectedId === null)) {
        // CORRECCIÓN: Si no hay obra seleccionada, pero hay obras, selecciona la primera.
        setSelectedId(codedArtworks[0].id);
    }

    if (codedArtworks.length === 0) {
        return (
            <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-100 transition-shadow text-center">
                <h3 className="text-xl font-bold text-slate-800 flex items-center justify-center gap-2 mb-4">
                    <FileText size={24} className="text-gold-500" /> CUADRO 2: LABORATORIO DE DOCUMENTOS
                </h3>
                <p className="text-slate-600 mt-4">
                    Primero debe <strong className="text-gold-600">Generar el Código</strong> de autenticidad en el Cuadro 1 para que las obras aparezcan aquí.
                </p>
            </div>
        );
    }
    
    if (!selectedArtwork) return <p className="p-4 text-center text-slate-500">Cargando Laboratorio...</p>;
    
    // Generación de contenido usando la configuración global
    const certificateContent = getCertificateHtml(selectedArtwork, settings);
    const letterContent = getLetterHtml(selectedArtwork, settings);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100 transition-shadow">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6 border-b pb-3">
                <FileText size={24} className="text-gold-500" /> CUADRO 2: LABORATORIO DE DOCUMENTOS
            </h3>
            
            {/* Selector de Obra */}
            <div className="mb-4 flex items-center gap-4">
                <label className="text-sm font-medium text-slate-600 whitespace-nowrap">Obra Seleccionada:</label>
                <select
                    className="p-2 border rounded text-sm flex-1 focus:ring-gold-500 focus:border-gold-500"
                    // CORRECCIÓN PERMANENTE: Convertimos el ID a string para el SELECT.
                    onChange={(e) => setSelectedId(Number(e.target.value))}
                    value={String(selectedId)} 
                >
                    {codedArtworks.map(a => (
                        <option 
                            key={a.id} 
                            value={String(a.id)}
                        >
                            {a.title} ({a.code})
                        </option>
                    ))}
                </select>
            </div>


            {/* ESTRUCTURA DE 3 COLUMNAS: Miniatura | Certificado | Carta */}
            <div className="grid grid-cols-3 gap-6">
                
                {/* COLUMNA 1: FOTO/MINIATURA */}
                <div className="col-span-1 border border-stone-200 p-4 rounded-lg bg-stone-50">
                    <h4 className="text-sm font-bold text-slate-700 flex items-center gap-1 mb-3">
                        <ImageIcon size={16} /> Detalle de Obra
                    </h4>
                    <div className="aspect-[4/3] bg-stone-200 flex items-center justify-center text-slate-500 rounded mb-4">
                        [ESPACIO PARA MINIATURA DE OBRA]
                    </div>
                    <p className="text-xs text-slate-600 font-semibold mb-1">Título: {selectedArtwork.title}</p>
                    <p className="text-xs font-mono text-slate-700">Código: {selectedArtwork.code}</p>
                    <p className="text-xs text-slate-500 mt-2">
                        {getSeriesText(selectedArtwork)} / Creado en {selectedArtwork.certificationDate.substring(0, 4)}
                    </p>
                    <p className="text-xs text-gold-600 mt-4 font-bold">Configuración de Plantilla Activa:</p>
                    <p className="text-xs text-slate-500">Ciclo: {settings.cycleName}</p>
                    <p className="text-xs text-slate-500">Firma: {settings.artistName}</p>
                </div>
                
                {/* COLUMNA 2: CERTIFICADO */}
                <div className="col-span-1 border border-stone-200 p-4 rounded-lg bg-white flex flex-col justify-between">
                    <div>
                        <h4 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-1">
                            Certificado de Autenticidad
                        </h4>
                        <div className="p-3 border border-dashed border-blue-300 bg-blue-50 text-xs font-serif leading-snug max-h-[300px] overflow-hidden relative">
                            <p className="text-center font-bold text-sm mb-2">CERTIFICADO DE AUTENTICIDAD</p>
                            <p className="text-left mt-2">Título: {selectedArtwork.title}</p>
                            <p className="text-left">Código: <span className="font-mono">{selectedArtwork.code}</span></p>
                            <p className="text-left mt-4 text-xs font-bold">Listo para Impresión Profesional.</p>
                             <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                        </div>
                    </div>

                    <button
                        onClick={() => handlePrintDocument(certificateContent, `Certificado ${selectedArtwork.code}`)}
                        className="mt-4 bg-red-600 text-white py-3 px-3 rounded-lg font-bold text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-1 w-full shadow-md"
                        title="Genera un PDF limpio para impresión de alta calidad."
                    >
                        <Printer size={16} /> GENERAR PDF (Certificado)
                    </button>
                </div>

                {/* COLUMNA 3: CARTA */}
                <div className="col-span-1 border border-stone-200 p-4 rounded-lg bg-white flex flex-col justify-between">
                    <div>
                        <h4 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-1">
                            Carta al Coleccionista
                        </h4>
                        <div className="p-3 border border-dashed border-red-300 bg-red-50 text-xs font-serif leading-snug max-h-[300px] overflow-hidden relative">
                            <p className="text-right text-slate-500 mb-3">{settings.city}, [Fecha Actual]</p>
                            <p className="font-bold mb-2">{settings.letterOpening}</p>
                            <p className="mb-2">La pieza, **{selectedArtwork.title}**, con código **{selectedArtwork.code}**, fue creada durante mi {settings.cycleName}...</p>
                            <p className="text-right mt-6">Atentamente, {settings.artistName}</p>
                            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => handlePrintDocument(letterContent, `Carta ${selectedArtwork.code}`)}
                        className="mt-4 bg-red-600 text-white py-3 px-3 rounded-lg font-bold text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-1 w-full shadow-md"
                        title="Genera un PDF limpio para impresión de alta calidad."
                    >
                        <Printer size={16} /> GENERAR PDF (Carta)
                    </button>
                </div>
            </div>
            
            <p className="text-xs text-slate-500 mt-6 p-2 border-t text-center">
                *Los botones **GENERAR PDF** abrirán la ventana de impresión de su navegador. Para el PDF, elija "Guardar como PDF" como destino de impresión.
            </p>
        </div>
    );
};


// =========================================================
// 🖼️ CUADRO 1: Gestión de Obras (Tabla)
// =========================================================
interface WorkManagementTableProps {
    artworks: Artwork[];
    setArtworks: React.Dispatch<React.SetStateAction<Artwork[]>>;
    onNavigateTo: (tool: 'management' | 'print' | 'settings') => void;
}

const WorkManagementTable: React.FC<WorkManagementTableProps> = ({ artworks, setArtworks, onNavigateTo }) => {
    
    // ... (Estados y Handlers de Formulario y Código) ...
    const [newTitle, setNewTitle] = useState('');
    const [newCertificationDate, setNewCertificationDate] = useState(new Date().toISOString().substring(0, 10));
    const [newSeriesIndex, setNewSeriesIndex] = useState<number | ''>('');
    const [newSeriesTotal, setNewSeriesTotal] = useState<number | ''>('');

    // Handler para asignar el código a una obra pendiente
    const handleGenerateCode = (id: number) => {
        setArtworks(prevArtworks => prevArtworks.map(artwork => {
            if (artwork.id === id && artwork.status === 'PENDIENTE') {
                const newCode = generateSmartCode(artwork); 
                return { ...artwork, code: newCode, status: 'GENERADO' };
            }
            return artwork;
        }));
    };
    
    // Handler para añadir una nueva obra
    const handleAddArtwork = (e: React.FormEvent) => {
        e.preventDefault();
        
        let index = newSeriesIndex === '' ? null : Number(newSeriesIndex);
        let total = newSeriesTotal === '' ? null : Number(newSeriesTotal);

        if (index !== null && total === null || index === null && total !== null) {
            alert("Si introduces un número de pieza, debes introducir el total de la edición.");
            return;
        }
        if (index !== null && total !== null && index > total) {
             alert("El índice de la pieza no puede ser mayor que el total de la serie.");
            return;
        }
        if (newTitle.trim() === '') {
             alert("El título de la obra es obligatorio.");
             return;
        }

        const newId = Math.max(0, ...artworks.map(a => a.id)) + 1;
        const newArtwork: Artwork = {
            id: newId,
            title: newTitle.trim(),
            certificationDate: newCertificationDate,
            type: 'PT', // Fijo por simplicidad
            seriesIndex: index, 
            seriesTotal: total,
            code: null,
            status: 'PENDIENTE'
        };

        setArtworks(prevArtworks => [...prevArtworks, newArtwork]);
        // Limpiar formulario
        setNewTitle('');
        setNewSeriesIndex('');
        setNewSeriesTotal('');
    };
    
    // Handler para eliminar una obra
    const handleDeleteArtwork = (id: number) => {
        if (window.confirm("¿Seguro que quieres eliminar esta obra de la lista de gestión?")) {
            setArtworks(prevArtworks => prevArtworks.filter(artwork => artwork.id !== id));
        }
    };
    
    // Handler para Exportar a CSV (Mantenido)
    const handleExportCSV = () => { 
        const headers = ["ID", "Título", "Fecha Certificación", "Tipo Obra", "Serie Pieza N°", "Serie Total", "CÓDIGO FINAL", "Estado"];
        const csvRows = artworks.map(artwork => [
            artwork.id, `"${artwork.title.replace(/"/g, '""')}"`, artwork.certificationDate, typeOptions[artwork.type],
            artwork.seriesIndex !== null ? artwork.seriesIndex : '', artwork.seriesTotal !== null ? artwork.seriesTotal : '',
            artwork.code || '', artwork.status
        ].join(','));
        const csvString = [headers.join(','), ...csvRows].join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `MA_Obras_${new Date().getFullYear()}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100 transition-shadow">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
                <Code size={24} className="text-gold-500" /> CUADRO 1: Gestión de Obras y Generación de Código
            </h3>
            
            {/* Formulario para Añadir Obra */}
            <form onSubmit={handleAddArtwork} className="flex flex-wrap items-end gap-3 p-4 mb-6 border-b border-gold-100">
                {/* ... (Controles del formulario) ... */}
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-xs font-medium text-slate-500 mb-1">Título de la Obra</label>
                    <input 
                        type="text" 
                        value={newTitle} 
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Ej: El Viaje a Ítaca"
                        className="w-full p-2 border rounded text-sm focus:ring-gold-500 focus:border-gold-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Fecha de Certificación</label>
                    <input 
                        type="date" 
                        value={newCertificationDate} 
                        onChange={(e) => setNewCertificationDate(e.target.value)}
                        className="p-2 border rounded text-sm w-40 text-center focus:ring-gold-500 focus:border-gold-500"
                        max={new Date().toISOString().substring(0, 10)}
                        required
                    />
                </div>
                 <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Pieza N° (Serie)</label>
                    <input 
                        type="number" 
                        value={newSeriesIndex} 
                        onChange={(e) => setNewSeriesIndex(e.target.value === '' ? '' : Math.max(1, Number(e.target.value)))}
                        className="p-2 border rounded text-sm w-16 text-center focus:ring-gold-500 focus:border-gold-500"
                        min="1"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Total Edición (Serie)</label>
                    <input 
                        type="number" 
                        value={newSeriesTotal} 
                        onChange={(e) => setNewSeriesTotal(e.target.value === '' ? '' : Math.max(1, Number(e.target.value)))}
                        className="p-2 border rounded text-sm w-16 text-center focus:ring-gold-500 focus:border-gold-500"
                        min="1"
                    />
                </div>
                
                <button 
                    type="submit"
                    className="bg-slate-700 text-white py-2 px-4 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors flex items-center gap-1"
                    disabled={!newTitle.trim()}
                >
                    <Plus size={16} /> Añadir Obra
                </button>
                
                <button 
                    type="button" 
                    onClick={handleExportCSV}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors flex items-center gap-1"
                >
                    <Download size={16} /> Exportar CSV
                </button>
                
            </form>
            
            {/* Tabla de Obras */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-stone-200">
                    <thead className="bg-stone-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Título</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Certificación / Edición</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">CÓDIGO DE AUTENTICIDAD</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Acciones</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-slate-500 uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-stone-100">
                        {artworks.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-slate-500 italic">
                                    No hay obras en la lista. ¡Añada su primera obra arriba!
                                </td>
                            </tr>
                        )}
                        {artworks.map(artwork => (
                            <tr key={artwork.id}>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-800">
                                    {artwork.title}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">
                                    {artwork.certificationDate.substring(0, 4)} / {artwork.seriesIndex !== null ? `Pieza ${artwork.seriesIndex} de ${artwork.seriesTotal}` : 'Obra Única'}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-slate-900">
                                    {artwork.code || <span className="text-red-500 italic">PENDIENTE</span>}
                                </td>
                                
                                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium flex justify-center items-center gap-2">
                                    {artwork.status === 'PENDIENTE' ? (
                                        <button
                                            onClick={() => handleGenerateCode(artwork.id)}
                                            className="text-gold-600 hover:text-gold-900 flex items-center gap-1 p-1 rounded hover:bg-gold-50 transition"
                                            title="Generar Código Único"
                                        >
                                            <Code size={16} /> Asignar Código
                                        </button>
                                    ) : (
                                        <button
                                            // Navega al Laboratorio
                                            onClick={() => onNavigateTo('print')}
                                            className="text-red-600 hover:text-red-900 flex items-center gap-1 p-1 rounded hover:bg-red-50 transition"
                                            title="Ir al LABORATORIO DE DOCUMENTOS"
                                        >
                                            <FileText size={16} /> Crear Doc.
                                        </button>
                                    )}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium flex justify-center items-center gap-2">
                                    <button
                                        onClick={() => handleDeleteArtwork(artwork.id)}
                                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition"
                                        title="Eliminar Obra"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 p-4 bg-slate-50 border-t border-stone-200 rounded-b-lg">
                <p className="text-xs font-medium text-slate-600">
                    <CheckCircle size={14} className="inline mr-1 text-green-500"/>
                    Fórmula de Codificación: MA-[AÑO COMPLETO]-[AÑO CORTO + MES][ÍNDICE SERIE][TOTAL SERIE]
                </p>
            </div>
        </div>
    );
};


// ---------------------------------------------------------
// ⚙️ COMPONENTE PRINCIPAL DEL DASHBOARD (CONTENEDOR)
// ---------------------------------------------------------
export const ArtistDashboard: React.FC<ArtistDashboardProps> = ({ onLogout }) => {
    
    // 🛑 DATA CENTRAL: Obras
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    
    // 🛑 DATA CENTRAL: Configuración de documentos (Nuevo)
    const [documentSettings, setDocumentSettings] = useState<DocumentSettings>(initialSettings);
    
    // Estado para la navegación entre paneles: 'management', 'print' (Laboratorio) o 'settings' (Plantillas)
    const [activeTool, setActiveTool] = useState<'management' | 'print' | 'settings'>('management'); 
    
    // Filtramos si hay obras codificadas para el botón de navegación
    const hasCodedArtworks = artworks.some(a => a.code);

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
        
        <div className="max-w-6xl mx-auto">
            
            {/* CABECERA Y LOGOUT */}
            <div className="flex justify-between items-center mb-10 border-b pb-4">
                <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                    <Layout size={28} className="text-gold-500" /> TALLER / ESTUDIO Privado
                </h1>
                <button 
                    onClick={onLogout} 
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-500 transition-colors py-2 px-3 border border-stone-200 rounded-lg hover:border-red-500"
                >
                    <LogOut size={16} /> Cerrar Sesión
                </button>
            </div>

            {/* LISTADO DE HERRAMIENTAS DE NAVEGACIÓN (TRES CUADROS) */}
            <div className="flex flex-wrap gap-4 mb-8 border-b pb-4">
                <button 
                    onClick={() => setActiveTool('management')}
                    className={`py-2 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                        activeTool === 'management' ? 'bg-gold-500 text-white' : 'bg-white text-slate-700 hover:bg-stone-100 border'
                    }`}
                >
                    <Code size={18} /> CUADRO 1: Gestión y Codificación
                </button>
                <button 
                    onClick={() => setActiveTool('print')}
                    disabled={!hasCodedArtworks} 
                    className={`py-2 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                        activeTool === 'print' ? 'bg-gold-500 text-white' : 
                        hasCodedArtworks ? 'bg-white text-slate-700 hover:bg-stone-100 border' : 
                        'bg-stone-100 text-slate-400 border cursor-not-allowed'
                    }`}
                    title={!hasCodedArtworks ? "Necesita al menos una obra con código generado" : "Ir al Laboratorio de Documentos"}
                >
                    <Printer size={18} /> CUADRO 2: Laboratorio de Documentos
                </button>
                <button 
                    onClick={() => setActiveTool('settings')}
                    className={`py-2 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                        activeTool === 'settings' ? 'bg-gold-500 text-white' : 'bg-white text-slate-700 hover:bg-stone-100 border'
                    }`}
                >
                    <Settings size={18} /> CUADRO 3: Centro de Plantillas
                </button>
            </div>

            {/* VISTA DE HERRAMIENTA ACTIVA */}
            <div className="mt-6">
                
                {/* 1. Gestión de Obras */}
                {activeTool === 'management' && (
                    <WorkManagementTable 
                        artworks={artworks} 
                        setArtworks={setArtworks} 
                        onNavigateTo={setActiveTool}
                    />
                )}
                
                {/* 2. Laboratorio de Documentos */}
                {activeTool === 'print' && hasCodedArtworks && (
                    <DocumentLaboratory 
                        artworks={artworks} 
                        settings={documentSettings}
                    />
                )}
                
                {/* 3. Centro de Configuración */}
                {activeTool === 'settings' && (
                    <ContentSettings 
                        settings={documentSettings} 
                        setSettings={setDocumentSettings} 
                    />
                )}
                
                {/* Mensaje de Laboratorio vacío (solo si la herramienta activa es 'print' y no hay datos) */}
                {activeTool === 'print' && !hasCodedArtworks && (
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-100 transition-shadow text-center">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center justify-center gap-2 mb-4">
                            <FileText size={24} className="text-gold-500" /> CUADRO 2: LABORATORIO DE DOCUMENTOS
                        </h3>
                        <p className="text-slate-600 mt-4">
                            No hay obras codificadas disponibles. Por favor, vuelva a **Gestión y Codificación** para asignar códigos.
                        </p>
                    </div>
                )}
                
            </div>

        </div>
        </div>
    );
};