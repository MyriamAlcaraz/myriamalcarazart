import React, { useState } from 'react';
import { LogOut, Printer, Code, Layout, Plus, Trash2, Download, CheckCircle, Eye, FileText, ChevronLeft, Send } from 'lucide-react';

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


// =========================================================
// 📄 COMPONENTE 2: Generación de Documentos (Carta y Certificado)
// =========================================================
interface DocumentCreationPanelProps {
    artwork: Artwork;
    onBack: () => void;
}

const DocumentCreationPanel: React.FC<DocumentCreationPanelProps> = ({ artwork, onBack }) => {
    
    // --- LÓGICA DE IMPRESIÓN/PDF (OPTIMIZADA) ---

    /**
     * Genera el HTML de la Carta y el Certificado listos para la impresión/PDF.
     * Mantiene los datos dinámicos (Código, Título, Edición, Fecha).
     */
    const getPrintContent = (artwork: Artwork): string => {
        const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
        const seriesText = artwork.seriesIndex !== null && artwork.seriesTotal !== null
            ? ` (Edición ${artwork.seriesIndex}/${artwork.seriesTotal})`
            : ` (Obra Única)`;

        // 💡 PERSONALIZA ESTO: Nombre del ciclo o serie artística
        const cycleName = "[NOMBRE DEL CICLO DE LA OBRA]"; 
        
        return `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <title>Documentos - ${artwork.title}</title>
                <style>
                    /* Estilos base de impresión */
                    body { font-family: 'Georgia', serif; font-size: 11pt; margin: 30mm; color: #333; }
                    .date { text-align: right; font-size: 9pt; margin-bottom: 50px; }
                    
                    /* Certificado */
                    .cert-box { border: 2px solid #999; padding: 30px; margin-top: 40px; }
                    h1 { font-size: 18pt; text-align: center; margin-bottom: 30px; font-weight: bold; }
                    .details p { margin: 10px 0; }
                    .code-display { font-size: 14pt; font-weight: bold; color: #000; border: 1px dashed #ccc; padding: 5px 10px; display: inline-block; margin-left: 10px; }
                    
                    /* Firma */
                    .signature { margin-top: 80px; text-align: left; }
                    .signature .artist-name { font-weight: bold; font-size: 12pt; }
                    .signature-line { border-top: 1px solid #333; display: inline-block; width: 250px; padding-top: 5px; }
                    
                    /* Control de impresión */
                    @media print {
                        body { margin: 0; padding: 0; }
                    }
                </style>
            </head>
            <body>
                
                <div class="date">Móstoles, a ${today}</div>
                
                <p>Estimado Coleccionista,</p>

                <p style="margin-top: 20px;">
                    Me dirijo a usted con gran entusiasmo para adjuntarle el Certificado de Autenticidad de la obra que ahora forma parte de su colección. Este documento garantiza la originalidad y la procedencia directa de mi estudio.
                </p>
                
                <p style="margin-top: 20px;">
                    La pieza, <strong>"${artwork.title}"</strong>${seriesText}, con código de trazabilidad **${artwork.code}**, fue creada durante mi ${cycleName}. Espero que le proporcione tanta satisfacción como a mí me dio crearla.
                </p>
                
                <p style="margin-top: 40px;">
                    Le agradezco sinceramente su apoyo y su pasión por el arte.
                </p>
                
                <div class="signature">
                    <p>Con mis mejores deseos,</p>
                    <p class="artist-name">Myriam Alcaraz</p>
                    <p>Artista Visual</p>
                </div>

                <div style="page-break-before: always;"></div>

                <div class="cert-box">
                    <h1>CERTIFICADO DE AUTENTICIDAD</h1>
                    <div class="details">
                        <p><strong>Artista:</strong> Myriam Alcaraz (MA)</p>
                        <p><strong>Título de la Obra:</strong> ${artwork.title}</p>
                        <p><strong>Código de Trazabilidad:</strong> <span class="code-display">${artwork.code}</span></p>
                        <p><strong>Tipo de Obra:</strong> ${typeOptions[artwork.type]}</p>
                        <p><strong>Año de Creación:</strong> ${artwork.certificationDate.substring(0, 4)}</p>
                        <p><strong>Edición:</strong> ${seriesText.trim() || 'Obra Única'}</p>
                        <p><strong>Medidas:</strong> [DIMENSIONES EN CM]</p>
                        <p style="margin-top: 20px;">
                            <strong>Garantía:</strong> Por la presente, certifico que la obra descrita es original y ha sido creada y firmada por la artista Myriam Alcaraz.
                        </p>
                    </div>
                </div>

                <div class="signature">
                    <p style="font-size: 9pt; margin-bottom: 5px;">Fecha de Certificación: ${today}</p>
                    <span class="signature-line"></span>
                    <p class="artist-name" style="margin-top: 5px;">Firma de Myriam Alcaraz</p>
                </div>
                
            </body>
            </html>
        `;
    };

    const handlePrint = () => {
        const printContent = getPrintContent(artwork);

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            // Disparar la impresión (donde se puede elegir PDF)
            setTimeout(() => {
                printWindow.print();
            }, 500); 
        } else {
            alert("Por favor, permite las ventanas emergentes para generar el documento.");
        }
    };
    
    // --- VISTA PREVIA (Para mostrar en el dashboard) ---
    
    const seriesTextPreview = artwork.seriesIndex !== null && artwork.seriesTotal !== null
        ? `Pieza ${artwork.seriesIndex} de ${artwork.seriesTotal}`
        : `Obra Única`;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100 transition-shadow">
            <button 
                onClick={onBack} 
                className="mb-4 text-slate-500 hover:text-gold-500 transition-colors flex items-center gap-1 text-sm font-semibold"
            >
                <ChevronLeft size={16} /> Volver a la Gestión
            </button>
            
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6 border-b pb-3">
                <FileText size={28} className="text-gold-500" /> Documentos para: "{artwork.title}"
            </h3>

            <div className="flex gap-6">
                
                {/* CUADRO 2 y 3: Impresión y Carta (Combinados en un flujo) */}
                <div className="w-1/2">
                    <div className="p-5 border-2 border-dashed border-gold-300 bg-gold-50 rounded-lg mb-6">
                        <h4 className="text-lg font-bold text-gold-800 flex items-center gap-2 mb-3"><FileText size={20} /> DETALLES Y CÓDIGO FINAL</h4>
                        <p className="text-sm">Código Generado:</p>
                        <p className="text-2xl font-mono font-bold text-slate-900 border-b-2 border-slate-900 inline-block pb-1">{artwork.code}</p>
                        <p className="mt-3 text-sm text-slate-700">**{seriesTextPreview}** / Certificada el {artwork.certificationDate}</p>
                    </div>

                    <button
                        onClick={handlePrint}
                        className="bg-red-600 text-white py-3 px-6 rounded-lg font-bold text-base hover:bg-red-700 transition-colors flex items-center justify-center gap-2 w-full shadow-lg"
                        title="Abrirá una ventana con la Carta y el Certificado listos para Imprimir o Guardar como PDF."
                    >
                        <Printer size={20} /> GENERAR & GUARDAR COMO PDF
                    </button>
                    
                    <p className="mt-3 text-xs text-slate-500 text-center">
                        *El navegador le pedirá que imprima. En las opciones de destino, elija "Guardar como PDF".
                    </p>
                </div>
                
                {/* VISTA PREVIA del Certificado */}
                <div className="w-1/2 bg-white p-5 border border-slate-200 rounded-lg shadow-inner">
                    <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2"><Eye size={18} /> Vista Previa (Simulada)</h4>
                    <div className="border border-stone-300 p-4 bg-white font-serif text-xs leading-relaxed max-h-[300px] overflow-hidden relative">
                        {/* Contenido simulado de la Carta */}
                        <p className="text-right text-slate-500 mb-3">Móstoles, a [Fecha Actual]</p>
                        <p className="font-bold mb-2">Estimado Coleccionista,</p>
                        <p className="mb-2">Me dirijo a usted para adjuntarle el Certificado de Autenticidad de la obra...</p>
                        <p className="mb-4">La pieza, <strong>"{artwork.title}"</strong>, con código <strong>{artwork.code}</strong>, fue creada durante mi [Ciclo].</p>
                        <p className="text-right mt-6">Atentamente, Myriam Alcaraz</p>
                        
                        {/* Certificado - Separador */}
                        <div className="h-0.5 bg-slate-200 my-4"></div>
                        
                        {/* Contenido simulado del Certificado */}
                        <p className="text-center font-bold text-sm mb-2">CERTIFICADO DE AUTENTICIDAD</p>
                        <p className="text-left">Título: {artwork.title}</p>
                        <p className="text-left">Código: <span className="font-mono text-xs">{artwork.code}</span></p>
                        <p className="text-left">Edición: {seriesTextPreview}</p>
                        
                        {/* Gradiente de ocultación */}
                        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 text-center">
                        *La ventana de impresión contendrá ambos documentos con salto de página.
                    </p>
                </div>
            </div>
        </div>
    );
};


// =========================================================
// 🖼️ COMPONENTE 1: Gestión de Obras (Tabla)
// =========================================================
interface WorkManagementTableProps {
    onSelectArtwork: (artwork: Artwork) => void;
}

const WorkManagementTable: React.FC<WorkManagementTableProps> = ({ onSelectArtwork }) => {
    // Lista de obras (inicia vacía, ya que quieres borrar los ejemplos)
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    
    // Estados para el formulario de añadir nueva obra
    const [newTitle, setNewTitle] = useState('');
    const [newCertificationDate, setNewCertificationDate] = useState(new Date().toISOString().substring(0, 10));
    const [newSeriesIndex, setNewSeriesIndex] = useState<number | ''>('');
    const [newSeriesTotal, setNewSeriesTotal] = useState<number | ''>('');

    
    /**
     * Handler para asignar el código a una obra pendiente
     */
    const handleGenerateCode = (id: number) => {
        setArtworks(prevArtworks => prevArtworks.map(artwork => {
            if (artwork.id === id && artwork.status === 'PENDIENTE') {
                const newCode = generateSmartCode(artwork); 
                
                return { 
                    ...artwork, 
                    code: newCode, 
                    status: 'GENERADO' 
                };
            }
            return artwork;
        }));
    };
    
    /**
     * Handler para añadir una nueva obra
     */
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
            type: 'PT', // Fijo por simplicidad, puedes añadir el selector si lo necesitas
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
    const handleExportCSV = () => { /* ... (mismo código de exportación) ... */
        const headers = ["ID", "Título", "Fecha Certificación", "Tipo Obra", "Serie Pieza N°", "Serie Total", "CÓDIGO FINAL", "Estado"];
        
        const csvRows = artworks.map(artwork => {
            return [
                artwork.id,
                `"${artwork.title.replace(/"/g, '""')}"`,
                artwork.certificationDate,
                typeOptions[artwork.type],
                artwork.seriesIndex !== null ? artwork.seriesIndex : '',
                artwork.seriesTotal !== null ? artwork.seriesTotal : '',
                artwork.code || '',
                artwork.status
            ].join(',');
        });
        
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
                            <th className="px-4 py-2 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Documentos</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Eliminar</th>
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
                                            // Pasa la obra al panel de creación de documentos
                                            onClick={() => onSelectArtwork(artwork)}
                                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1 p-1 rounded hover:bg-blue-50 transition"
                                            title="Ir al CUADRO 2 y 3: Generar Carta y Certificado"
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
                <p className="text-xs text-slate-500 mt-1">
                    **Ej. Obra Única:** `MA-2025-2512`
                </p>
            </div>
        </div>
    );
};


// ---------------------------------------------------------
// ⚙️ COMPONENTE PRINCIPAL DEL DASHBOARD (CONTENEDOR)
// ---------------------------------------------------------
export const ArtistDashboard: React.FC<ArtistDashboardProps> = ({ onLogout }) => {
    // Estado para saber qué obra se está preparando para documentar
    const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
    
    // Estado para la navegación entre paneles (solo usamos 'management' por ahora)
    const [activeTool, setActiveTool] = useState<'management' | 'layout'>('management'); 

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

            {/* VISTA DE HERRAMIENTA ACTIVA */}
            <div className="mt-6">
                
                {/* 🎨 Si hay una obra seleccionada para documentar, muestra el Panel 2/3 */}
                {selectedArtwork ? (
                    <DocumentCreationPanel 
                        artwork={selectedArtwork} 
                        onBack={() => setSelectedArtwork(null)} 
                    />
                ) : (
                    // 🗄️ Si no hay obra seleccionada, muestra la Tabla de Gestión (Panel 1)
                    <WorkManagementTable 
                        onSelectArtwork={setSelectedArtwork}
                    />
                )}
                
                {/* Herramientas de navegación (Mantenemos la estructura por si la quieres usar más tarde) */}
                <div className="mt-8">
                    {/* Puedes añadir otros paneles aquí si los necesitas */}
                </div>

            </div>

        </div>
        </div>
    );
};