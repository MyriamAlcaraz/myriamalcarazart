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
    
    // Estado para la obra seleccionada dentro del Laboratorio
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
    
    // Si no hay obra seleccionada, seleccionamos la primera por defecto
    if (!selectedArtwork) {
        return (
            <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-100 transition-shadow">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
                    <FileText size={24} className="text-gold-500" /> LABORATORIO DE DOCUMENTOS
                </h3>
                 <p className="text-slate-600">Seleccione una obra codificada de la lista a continuación para visualizar sus documentos.</p>
                <select
                    className="mt-4 p-2 border rounded text-sm w-full focus:ring-gold-500 focus:border-gold-500"
                    onChange={(e) => setSelectedId(Number(e.target.value))}
                    value={selectedId || (codedArtworks.length > 0 ? codedArtworks[0].id : '')}
                >
                    {codedArtworks.map(a => (
                        <option key={a.id} value={a.id}>
                            {a.title} ({a.code})
                        </option>
                    ))}
                </select>
            </div>
        );
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
                    onChange={(e) => setSelectedId(Number(e.target.value))}
                    value={selectedId}
                >
                    {codedArtworks.map(a => (
                        <option key={a.id} value={a.id}>
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
                    className="bg-slate-700 text-white py-2 px-4 rounded-lg font-bold