import React, { useState } from 'react';
import { LogOut, Printer, Code, Layout, X, Plus, Trash2, Download, CheckCircle, Eye } from 'lucide-react';

// ---------------------------------------------------------
// 🎨 DEFINICIÓN DE TIPOS
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

// Opciones para el campo "Tipo de Obra" (para tu catalogación interna)
const typeOptions = {
    'PT': 'Pintura',
    'SC': 'Escultura',
    'DI': 'Dibujo',
    'OT': 'Otro'
};


// ---------------------------------------------------------
// 🛠️ COMPONENTE: TABLA DE GESTIÓN Y CODIFICACIÓN (CON IMPRESIÓN/PDF)
// ---------------------------------------------------------
const WorkManagementTable: React.FC = () => {
    // Lista de obras de ejemplo (datos simulados)
    const [artworks, setArtworks] = useState<Artwork[]>([
        // Ejemplo de obra única (Cert. Dic 2025)
        { id: 1, title: 'El Viaje a Ítaca', certificationDate: '2025-12-15', type: 'PT', seriesIndex: null, seriesTotal: null, code: 'MA-2025-2512', status: 'GENERADO' },
        // Ejemplo de serie (Pieza 1 de 5, Cert. Ene 2026)
        { id: 2, title: 'Retrato de Otoño (Ser. 1)', certificationDate: '2026-01-20', type: 'PT', seriesIndex: 1, seriesTotal: 5, code: 'MA-2026-26010105', status: 'GENERADO' },
        { id: 3, title: 'Formas en Movimiento', certificationDate: '2025-10-01', type: 'SC', seriesIndex: null, seriesTotal: null, code: null, status: 'PENDIENTE' },
    ]);
    
    // Estados para el formulario de añadir nueva obra
    const [newTitle, setNewTitle] = useState('');
    // Inicializa la fecha con el día actual en formato YYYY-MM-DD
    const [newCertificationDate, setNewCertificationDate] = useState(new Date().toISOString().substring(0, 10));
    const [newType, setNewType] = useState<'PT' | 'SC' | 'DI' | 'OT'>('PT');
    const [newSeriesIndex, setNewSeriesIndex] = useState<number | ''>('');
    const [newSeriesTotal, setNewSeriesTotal] = useState<number | ''>('');

    
    /**
     * 🚀 FUNCIÓN DE CODIFICACIÓN INTELIGENTE (Tu fórmula: MA-YYYY-YYMMIIJJ)
     */
    const generateSmartCode = (artworkToCode: Artwork): string => {
        
        // 1. Extraer las partes de la fecha (YYYY-MM-DD)
        const dateParts = artworkToCode.certificationDate.split('-'); 
        const year = dateParts[0]; // Año completo (Ej: '2025')
        const yearShort = year.substring(2); // Año corto (Ej: '25')
        const month = dateParts[1]; // Mes (Ej: '12')
        
        // 2. Componente de Fecha (YYMM)
        const dateCode = `${yearShort}${month}`; // Ej: '2512'

        // 3. Componente de Serie (opcional): IIJJ
        let seriesCode = '';
        if (artworkToCode.seriesIndex !== null && artworkToCode.seriesTotal !== null) {
            // Formatea el índice y el total a 2 dígitos (Ej: 1 -> 01, 10 -> 10)
            const indexFmtd = String(artworkToCode.seriesIndex).padStart(2, '0');
            const totalFmtd = String(artworkToCode.seriesTotal).padStart(2, '0');
            seriesCode = `${indexFmtd}${totalFmtd}`; // Ej: '0110'
        }
        
        // 4. Formato final: MA-YYYY-YYMM(IIJJ)
        return `MA-${year}-${dateCode}${seriesCode}`;
    };

    /**
     * Handler para generar e imprimir la Carta y Certificado.
     * Genera una nueva ventana con el HTML listo para imprimir/Guardar como PDF.
     */
    const handlePrintCertificate = (artwork: Artwork) => {
        if (!artwork.code) {
            alert("¡Error! La obra debe tener un código asignado antes de generar documentos.");
            return;
        }

        // --- 1. PREPARAR DATOS Y TEXTOS ---
        const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
        const seriesText = artwork.seriesIndex !== null && artwork.seriesTotal !== null
            ? ` (Edición ${artwork.seriesIndex}/${artwork.seriesTotal})`
            : ` (Obra Única)`;

        // 💡 CAMBIA ESTE TEXTO CON EL NOMBRE DE TU CICLO/SERIE ARTÍSTICA
        const cycleName = "Ciclo [TU NOMBRE DE SERIE ARTÍSTICA]"; 
        
        // --- 2. GENERAR CONTENIDO HTML PARA LA IMPRESIÓN ---
        // Este HTML se abrirá en una nueva ventana/pestaña para imprimir.
        const printContent = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <title>Documentos - ${artwork.title}</title>
                <style>
                    /* Estilos para impresión, que simulan el diseño en papel */
                    body { font-family: serif; font-size: 11pt; margin: 30mm; color: #333; }
                    .header { text-align: right; font-size: 9pt; margin-bottom: 50px; }
                    
                    /* Estilo para el certificado (opcionalmente un borde decorativo) */
                    .cert-box { border: 2px solid #555; padding: 25px; margin-top: 40px; }
                    h1 { font-size: 18pt; text-align: center; margin-bottom: 30px; font-weight: bold; }
                    .details p { margin: 8px 0; }
                    .signature { margin-top: 80px; text-align: right; }
                    .signature p { margin: 0; font-size: 10pt; }
                    .signature .artist-name { font-weight: bold; font-size: 12pt; }
                    
                    /* Asegura que la impresión a PDF se vea correctamente */
                    @media print {
                        body { margin: 0; padding: 0; }
                    }
                </style>
            </head>
            <body>
                
                <div class="header">Móstoles, a ${today}</div>
                
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
                        <p><strong>Código de Trazabilidad:</strong> <strong style="font-size: 12pt;">${artwork.code}</strong></p>
                        <p><strong>Tipo de Obra:</strong> ${typeOptions[artwork.type]}</p>
                        <p><strong>Año de Creación:</strong> ${artwork.certificationDate.substring(0, 4)}</p>
                        <p><strong>Edición:</strong> ${seriesText.trim() || 'Obra Única'}</p>
                        <p><strong>Medidas:</strong> [DIMENSIONES DE LA OBRA]</p> 
                        <p style="margin-top: 20px;">
                            <strong>Garantía:</strong> Por la presente, certifico que la obra descrita es original y ha sido creada y firmada por la artista Myriam Alcaraz.
                        </p>
                    </div>
                </div>

                <div class="signature" style="text-align: left;">
                    <p style="font-size: 9pt; margin-bottom: 5px;">Fecha de Certificación: ${today}</p>
                    <p style="border-top: 1px solid #333; display: inline-block; width: 200px; padding-top: 5px;"></p>
                    <p class="artist-name" style="margin-top: 5px;">Firma de Myriam Alcaraz</p>
                </div>
                
            </body>
            </html>
        `;

        // --- 3. ABRIR VENTANA E IMPRIMIR ---
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            // Esto dispara el diálogo de impresión (donde puedes elegir Guardar como PDF)
            setTimeout(() => {
                printWindow.print();
            }, 500); 
        } else {
            alert("Por favor, permite las ventanas emergentes para generar el documento.");
        }
    };


    // -------------------------------------------------------------------
    // --- Resto de Handlers (Se mantienen) ---
    // -------------------------------------------------------------------
    
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
     * Handler para añadir una nueva obra desde el formulario
     */
    const handleAddArtwork = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validaciones de la serie
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

        const newId = Math.max(0, ...artworks.map(a => a.id)) + 1;
        const newArtwork: Artwork = {
            id: newId,
            title: newTitle.trim(),
            certificationDate: newCertificationDate,
            type: newType,
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
    
    /**
     * Handler para eliminar una obra
     */
    const handleDeleteArtwork = (id: number) => {
        if (window.confirm("¿Seguro que quieres eliminar esta obra de la lista de gestión?")) {
            setArtworks(prevArtworks => prevArtworks.filter(artwork => artwork.id !== id));
        }
    };
    
    /**
     * Convierte la lista de obras a formato CSV y la descarga (para copias de seguridad).
     */
    const handleExportCSV = () => {
        // 1. Definir los encabezados del CSV
        const headers = [
            "ID", 
            "Título", 
            "Fecha Certificación", 
            "Tipo Obra", 
            "Serie Pieza N°", 
            "Serie Total", 
            "CÓDIGO FINAL",
            "Estado"
        ];
        
        // 2. Mapear los datos de las obras
        const csvRows = artworks.map(artwork => {
            return [
                artwork.id,
                `"${artwork.title.replace(/"/g, '""')}"`, // Escapa comillas dentro del título
                artwork.certificationDate,
                typeOptions[artwork.type],
                artwork.seriesIndex !== null ? artwork.seriesIndex : '',
                artwork.seriesTotal !== null ? artwork.seriesTotal : '',
                artwork.code || '',
                artwork.status
            ].join(','); // Une los campos con comas
        });
        
        // 3. Unir encabezados y filas
        const csvString = [
            headers.join(','),
            ...csvRows
        ].join('\n'); // Une las filas con saltos de línea
        
        // 4. Crear un Blob (archivo virtual) y descargarlo
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
                <Code size={24} className="text-gold-500" /> Gestión de Obras y Certificación
            </h3>
            
            {/* Formulario para Añadir Obra */}
            <form onSubmit={handleAddArtwork} className="flex flex-wrap items-end gap-3 p-4 mb-6 border-b border-gold-100">
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
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Certificación / Tipo</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Serie (Edición)</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">CÓDIGO DE AUTENTICIDAD</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-stone-100">
                        {artworks.map(artwork => (
                            <tr key={artwork.id}>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-800">
                                    {artwork.title}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">
                                    {artwork.certificationDate} / {typeOptions[artwork.type]}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">
                                    {artwork.seriesIndex !== null ? `Pieza ${artwork.seriesIndex} de ${artwork.seriesTotal}` : 'Obra Única'}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-slate-900">
                                    {artwork.code || <span className="text-red-500 italic">PENDIENTE DE ASIGNAR</span>}
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
                                            onClick={() => handlePrintCertificate(artwork)} // 💡 AHORA LLAMA A LA FUNCIÓN DE IMPRESIÓN
                                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1 p-1 rounded hover:bg-blue-50 transition"
                                            title="Generar e imprimir Carta/Certificado (Guardar como PDF)"
                                        >
                                            <Printer size={16} /> Imprimir/PDF
                                        </button>
                                    )}
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
                    **Ej. Obra Única:** `MA-2025-2512` (Certificada en Diciembre 2025)
                </p>
                <p className="text-xs text-slate-500 mt-1">
                    **Ej. Obra en Serie:** `MA-2026-26010210` (Certificada en Enero 2026, Pieza 02 de 10)
                </p>
            </div>
        </div>
    );
};
// ---------------------------------------------------------


// ---------------------------------------------------------
// ⚙️ COMPONENTE PRINCIPAL DEL DASHBOARD
// ---------------------------------------------------------
export const ArtistDashboard: React.FC<ArtistDashboardProps> = ({ onLogout }) => {
  // Establece la gestión de obras como vista por defecto
  const [activeTool, setActiveTool] = useState<'management' | 'print' | 'layout' | null>('management'); 

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
                <Code size={18} /> Gestión y Codificación
            </button>
            <button 
                onClick={() => setActiveTool('print')}
                className={`py-2 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                    activeTool === 'print' ? 'bg-gold-500 text-white' : 'bg-white text-slate-700 hover:bg-stone-100 border'
                }`}
            >
                <Printer size={18} /> Plantillas y Cartas
            </button>
            <button 
                onClick={() => setActiveTool('layout')}
                className={`py-2 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                    activeTool === 'layout' ? 'bg-gold-500 text-white' : 'bg-white text-slate-700 hover:bg-stone-100 border'
                }`}
            >
                <Layout size={18} /> (Otros Ajustes)
            </button>
        </div>

        {/* VISTA DE HERRAMIENTA ACTIVA */}
        <div className="mt-6">
            {activeTool === 'management' && <WorkManagementTable />}
            {activeTool === 'print' && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100">
                    <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 mb-4"><Printer size={20} className="text-gold-500" /> Plantillas de Documentos</h3>
                    <p className="text-slate-600">
                        La función de impresión se ha integrado directamente en el botón **'Imprimir/PDF'** de la tabla de Gestión para un acceso más rápido.
                    </p>
                    <p className="text-sm text-slate-500 mt-3">
                         Al hacer clic en ese botón, se abrirá una nueva ventana con la Carta y el Certificado listos para usar la función **Imprimir/Guardar como PDF** de tu navegador.
                    </p>
                </div>
            )}
            {activeTool === 'layout' && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100">
                    <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 mb-4"><Layout size={20} className="text-gold-500" /> Otros Ajustes del Estudio</h3>
                    <p className="text-slate-600">
                        Espacio reservado para herramientas futuras (ajustes de API, etc.).
                    </p>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};