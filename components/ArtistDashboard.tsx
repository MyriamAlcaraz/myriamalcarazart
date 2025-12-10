import React, { useState, useMemo } from 'react';
import { LogOut, Printer, Code, Layout, Plus, Trash2, Download, CheckCircle, FileText, ChevronLeft, Image as ImageIcon, Search } from 'lucide-react';

// ---------------------------------------------------------
// 🎨 DEFINICIÓN DE TIPOS Y CONSTANTES
// ---------------------------------------------------------
interface Artwork {
  id: number;
  title: string;
  certificationDate: string; // Formato YYYY-MM-DD
  type: 'PT' | 'SC' | 'DI' | 'OT'; // Pintura, Escultura, Dibujo, Otro
  seriesIndex: number | null; // N de pieza en la serie (Ej: 2)
  seriesTotal: number | null; // Total de la serie (Ej: 10)
  code: string | null;
  status: 'PENDIENTE' | 'GENERADO';
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
// 📄 GENERADORES DE HTML PARA IMPRESIÓN (Separados)
// ---------------------------------------------------------

const getSeriesText = (artwork: Artwork) => {
    return artwork.seriesIndex !== null && artwork.seriesTotal !== null
        ? `Edición ${artwork.seriesIndex}/${artwork.seriesTotal}`
        : `Obra Única`;
}

/**
 * Genera el HTML exclusivo del CERTIFICADO.
 */
const getCertificateHtml = (artwork: Artwork): string => {
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    const seriesText = getSeriesText(artwork);

    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <title>Certificado - ${artwork.title}</title>
            <style>
                body { font-family: 'Georgia', serif; font-size: 11pt; margin: 30mm; color: #333; }
                .cert-box { border: 2px solid #999; padding: 40px; }
                h1 { font-size: 24pt; text-align: center; margin-bottom: 40px; font-weight: bold; }
                .details p { margin: 12px 0; font-size: 12pt;}
                .code-display { font-size: 16pt; font-weight: bold; color: #000; border: 1px dashed #ccc; padding: 5px 10px; display: inline-block; margin-left: 10px; font-family: monospace; }
                .signature { margin-top: 80px; text-align: left; }
                .signature-line { border-top: 1px solid #333; display: block; width: 300px; padding-top: 5px; }
                .artist-name { font-weight: bold; font-size: 14pt; margin-top: 5px; }
                @media print { body { margin: 0; padding: 0; } }
            </style>
        </head>
        <body>
            <div class="cert-box">
                <h1>CERTIFICADO DE AUTENTICIDAD</h1>
                <div class="details">
                    <p><strong>Artista:</strong> Myriam Alcaraz (MA)</p>
                    <p><strong>Título de la Obra:</strong> ${artwork.title}</p>
                    <p><strong>Código de Trazabilidad:</strong> <span class="code-display">${artwork.code}</span></p>
                    <p><strong>Tipo de Obra:</strong> ${typeOptions[artwork.type]}</p>
                    <p><strong>Año de Creación:</strong> ${artwork.certificationDate.substring(0, 4)}</p>
                    <p><strong>Edición:</strong> ${seriesText}</p>
                    <p><strong>Medidas:</strong> [DIMENSIONES EN CM]</p>
                    <p style="margin-top: 40px; font-size: 11pt;">
                        <strong>Garantía:</strong> Por la presente, certifico que la obra descrita es original y ha sido creada y firmada por la artista Myriam Alcaraz.
                    </p>
                </div>
            </div>

            <div class="signature">
                <p style="font-size: 9pt; margin-bottom: 5px;">Fecha de Certificación: ${today}</p>
                <span class="signature-line"></span>
                <p class="artist-name">Firma de Myriam Alcaraz</p>
            </div>
        </body>
        </html>
    `;
};

/**
 * Genera el HTML exclusivo de la CARTA.
 */
const getLetterHtml = (artwork: Artwork): string => {
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    const seriesText = getSeriesText(artwork);
    const cycleName = "[NOMBRE DEL CICLO DE LA OBRA]"; 

    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <title>Carta - ${artwork.title}</title>
            <style>
                body { font-family: 'Georgia', serif; font-size: 12pt; margin: 30mm; color: #333; line-height: 1.6; }
                .date { text-align: right; font-size: 10pt; margin-bottom: 50px; }
                .signature { margin-top: 80px; text-align: right; }
                .signature p { margin: 0; }
                .signature .artist-name { font-weight: bold; font-size: 14pt; }
                @media print { body { margin: 0; padding: 0; } }
            </style>
        </head>
        <body>
            <div class="date">Móstoles, a ${today}</div>
            
            <p>Estimado Coleccionista,</p>

            <p style="margin-top: 30px;">
                Me dirijo a usted con gran entusiasmo para adjuntarle el Certificado de Autenticidad de la obra que ahora forma parte de su colección. Este documento garantiza la originalidad y la procedencia directa de mi estudio.
            </p>
            
            <p style="margin-top: 20px;">
                La pieza, <strong>"${artwork.title}"</strong> (${seriesText}), con código de trazabilidad **${artwork.code}**, fue creada durante mi ${cycleName}. Espero que le proporcione tanta satisfacción como a mí me dio crearla.
            </p>
            
            <p style="margin-top: 40px;">
                Le agradezco sinceramente su apoyo y su pasión por el arte.
            </p>
            
            <div class="signature">
                <p>Con mis mejores deseos,</p>
                <p class="artist-name">Myriam Alcaraz</p>
                <p>Artista Visual</p>
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
// 🔬 COMPONENTE 2 Y 3: LABORATORIO DE DOCUMENTOS (3 Columnas)
// =========================================================
interface DocumentLaboratoryProps {
    artworks: Artwork[];
}

const DocumentLaboratory: React.FC<DocumentLaboratoryProps> = ({ artworks }) => {
    // Buscar todas las obras que ya tienen código asignado
    const codedArtworks = useMemo(() => artworks.filter(a => a.code), [artworks]);
    
    // Estado para la obra seleccionada dentro del Laboratorio (Se inicializa con la primera ID, si existe)
    const [selectedId, setSelectedId] = useState<number | null>(codedArtworks.length > 0 ? codedArtworks[0].id : null);
    
    // Obra actualmente visible
    const selectedArtwork = useMemo(() => 
        artworks.find(a => a.id === selectedId), 
        [artworks, selectedId]
    );

    // Si no hay obras codificadas, muestra un mensaje
    if (codedArtworks.length === 0) {
        return (
            <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-100 transition-shadow text-center">
                <h3 className="text-xl font-bold text-slate-800 flex items-center justify-center gap-2 mb-4">
                    <FileText size={24} className="text-gold-500" /> LABORATORIO DE DOCUMENTOS
                </h3>
                <p className="text-slate-600 mt-4">
                    Primero debe <strong className="text-gold-600">Generar el Código</strong> de autenticidad en el panel de **Gestión de Obras** para que aparezcan aquí.
                </p>
            </div>
        );
    }
    
    // Si la ID seleccionada se ha perdido (ej. la obra se borró), reseteamos a la primera disponible.
    if (!selectedArtwork) {
        // Esto solo ocurre si seleccionId es null o la obra no existe, y codedArtworks tiene elementos.
        // Lo reseteamos a la primera ID disponible para evitar errores.
        setSelectedId(codedArtworks[0].id);
        return <p className="p-4 text-center text-slate-500">Cargando Laboratorio...</p>;
    }
    
    // --- Renderizado de la Vista de 3 Columnas (El Laboratorio) ---
    
    // Prepara el HTML de la Carta y el Certificado (para la impresión)
    const certificateContent = getCertificateHtml(selectedArtwork);
    const letterContent = getLetterHtml(selectedArtwork);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100 transition-shadow">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6 border-b pb-3">
                <FileText size={24} className="text-gold-500" /> LABORATORIO DE DOCUMENTOS
            </h3>
            
            {/* Selector de Obra (Si hay más de una) */}
            <div className="mb-4 flex items-center gap-4">
                <label className="text-sm font-medium text-slate-600 whitespace-nowrap">Obra Seleccionada:</label>
                <select
                    className="p-2 border rounded text-sm flex-1 focus:ring-gold-500 focus:border-gold-500"
                    // Al cambiar, convertimos el valor del string a number
                    onChange={(e) => setSelectedId(Number(e.target.value))}
                    // CORRECCIÓN: Convertimos el ID a string para que el select no dé error de tipado.
                    value={String(selectedId)} 
                >
                    {codedArtworks.map(a => (
                        <option 
                            key={a.id} 
                            // CORRECCIÓN: Aseguramos que el valor de la opción sea un string.
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
                        <ImageIcon size={16} /> FOTO DE OBRA
                    </h4>
                    <div className="aspect-[4/3] bg-stone-200 flex items-center justify-center text-slate-500 rounded mb-4">
                        [IMAGEN DE LA OBRA O MINIATURA]
                    </div>
                    <p className="text-xs text-slate-600 font-semibold mb-1">Título: {selectedArtwork.title}</p>
                    <p className="text-xs font-mono text-slate-700">Código: {selectedArtwork.code}</p>
                    <p className="text-xs text-slate-500 mt-2">
                        {getSeriesText(selectedArtwork)} / {typeOptions[selectedArtwork.type]}
                    </p>
                </div>
                
                {/* COLUMNA 2: CERTIFICADO */}
                <div className="col-span-1 border border-stone-200 p-4 rounded-lg bg-white flex flex-col justify-between">
                    <div>
                        <h4 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-1">
                            CUADRO 2: Certificado
                        </h4>
                        <div className="p-3 border border-dashed border-red-300 bg-red-50 text-xs font-serif leading-snug max-h-[300px] overflow-hidden relative">
                            <p className="text-center font-bold text-sm mb-2">CERTIFICADO DE AUTENTICIDAD</p>
                            <p className="text-left mt-2">Título: {selectedArtwork.title}</p>
                            <p className="text-left">Código: <span className="font-mono">{selectedArtwork.code}</span></p>
                            <p className="text-left mt-4">Garantía: Obra original creada por Myriam Alcaraz...</p>
                             <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                        </div>
                    </div>

                    <button
                        onClick={() => handlePrintDocument(certificateContent, `Certificado ${selectedArtwork.code}`)}
                        className="mt-4 bg-blue-600 text-white py-2 px-3 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 w-full"
                    >
                        <Printer size={16} /> Imprimir / PDF (Certificado)
                    </button>
                </div>

                {/* COLUMNA 3: CARTA */}
                <div className="col-span-1 border border-stone-200 p-4 rounded-lg bg-white flex flex-col justify-between">
                    <div>
                        <h4 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-1">
                            CUADRO 3: Carta
                        </h4>
                        <div className="p-3 border border-dashed border-red-300 bg-red-50 text-xs font-serif leading-snug max-h-[300px] overflow-hidden relative">
                            <p className="text-right text-slate-500 mb-3">[Fecha Actual]</p>
                            <p className="font-bold mb-2">Estimado Coleccionista,</p>
                            <p className="mb-2">Me dirijo a usted con gran entusiasmo para adjuntarle el Certificado...</p>
                            <p className="mb-4">La pieza, **{selectedArtwork.title}**, con código **{selectedArtwork.code}**...</p>
                            <p className="text-right mt-6">Con mis mejores deseos, Myriam Alcaraz</p>
                            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => handlePrintDocument(letterContent, `Carta ${selectedArtwork.code}`)}
                        className="mt-4 bg-blue-600 text-white py-2 px-3 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 w-full"
                    >
                        <Printer size={16} /> Imprimir / PDF (Carta)
                    </button>
                </div>
            </div>
            
            <p className="text-xs text-slate-500 mt-6 p-2 border-t text-center">
                *Haga clic en los botones azules para generar el documento en una nueva ventana. Allí podrá elegir "Guardar como PDF" para la impresión en papel especial.
            </p>
        </div>
    );
};


// =========================================================
// 🖼️ COMPONENTE 1: Gestión de Obras (Tabla)
// =========================================================
interface WorkManagementTableProps {
    artworks: Artwork[];
    setArtworks: React.Dispatch<React.SetStateAction<Artwork[]>>;
    onNavigateTo: (tool: 'management' | 'print') => void;
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
                                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1 p-1 rounded hover:bg-blue-50 transition"
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
    // 🛑 DATA: Inicializa la lista de obras vacía para empezar desde cero
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    
    // Estado para la navegación entre paneles: 'management' o 'print' (Laboratorio)
    const [activeTool, setActiveTool] = useState<'management' | 'print'>('management'); 
    
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

            {/* LISTADO DE HERRAMIENTAS DE NAVEGACIÓN */}
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
                    disabled={!hasCodedArtworks} // Deshabilita si no hay obras codificadas
                    className={`py-2 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                        activeTool === 'print' ? 'bg-gold-500 text-white' : 
                        hasCodedArtworks ? 'bg-white text-slate-700 hover:bg-stone-100 border' : 
                        'bg-stone-100 text-slate-400 border cursor-not-allowed'
                    }`}
                    title={!hasCodedArtworks ? "Necesita al menos una obra con código generado" : "Ir al Laboratorio de Documentos"}
                >
                    <Printer size={18} /> LABORATORIO DE DOCUMENTOS
                </button>
            </div>

            {/* VISTA DE HERRAMIENTA ACTIVA */}
            <div className="mt-6">
                
                {/* Muestra la tabla de gestión */}
                {activeTool === 'management' && (
                    <WorkManagementTable 
                        artworks={artworks} 
                        setArtworks={setArtworks} 
                        onNavigateTo={setActiveTool}
                    />
                )}
                
                {/* Muestra el Laboratorio de Documentos (si hay obras codificadas) */}
                {activeTool === 'print' && hasCodedArtworks && (
                    <DocumentLaboratory 
                        artworks={artworks} 
                    />
                )}

                {/* Mensaje si el Laboratorio está vacío */}
                {activeTool === 'print' && !hasCodedArtworks && (
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-100 transition-shadow text-center">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center justify-center gap-2 mb-4">
                            <FileText size={24} className="text-gold-500" /> LABORATORIO DE DOCUMENTOS
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