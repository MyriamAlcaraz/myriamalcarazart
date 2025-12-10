import React, { useState } from 'react';
import { LogOut, Printer, Code, Layout, X, Plus } from 'lucide-react';

interface ArtistDashboardProps {
  // Esta prop es esencial ya que la usamos para volver a la vista pública
  onLogout: () => void; 
}

// ---------------------------------------------------------
// 🤖 COMPONENTE DE HERRAMIENTA: Generador de Códigos
// ---------------------------------------------------------
const CertificateCoder: React.FC = () => {
    // Estado inicial de la codificación
    const [projectCode, setProjectCode] = useState('PINT-2026');
    const [artworkIndex, setArtworkIndex] = useState(1);
    const [finalCode, setFinalCode] = useState('');

    const generateCode = () => {
        // Lógica de codificación: PINT-2026-001
        // Asegura que el índice tenga al menos tres dígitos (e.g., 1 -> 001)
        const indexFormatted = String(artworkIndex).padStart(3, '0');
        const newCode = `${projectCode}-${indexFormatted}`;
        setFinalCode(newCode);
        // Sugerencia: Incrementamos el índice automáticamente para el siguiente uso
        setArtworkIndex(prev => prev + 1);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100 transition-shadow">
            <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 mb-4">
                <Code size={20} className="text-gold-500" /> Generador de Códigos de Certificado
            </h3>
            <p className="text-sm text-slate-500 mb-4">
                Genera la clave de trazabilidad única para cada nueva obra.
            </p>
            
            <div className="flex flex-wrap gap-4 items-end mb-4">
                <div>
                    <label className="block text-xs font-medium text-slate-500">Código de Proyecto (Prefijo)</label>
                    <input 
                        type="text" 
                        value={projectCode} 
                        onChange={(e) => setProjectCode(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ''))} // Limpieza de input
                        className="p-2 border rounded text-sm w-32 focus:ring-gold-500 focus:border-gold-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-500">Índice Siguiente</label>
                    <input 
                        type="number" 
                        value={artworkIndex} 
                        onChange={(e) => setArtworkIndex(Math.max(1, Number(e.target.value)))} // Mínimo 1
                        className="p-2 border rounded text-sm w-20 text-center focus:ring-gold-500 focus:border-gold-500"
                    />
                </div>
                <button 
                    onClick={generateCode}
                    className="bg-gold-500 text-white py-2 px-4 rounded-lg font-bold text-sm hover:bg-gold-600 transition-colors flex items-center gap-1"
                >
                    <Plus size={16} /> Generar Siguiente
                </button>
            </div>

            {finalCode && (
                <div className="mt-6 p-4 bg-slate-100 border-l-4 border-gold-500 rounded-lg">
                    <p className="text-sm font-medium text-slate-500 mb-1">CÓDIGO GENERADO:</p>
                    <p className="text-2xl font-mono text-slate-800 break-all select-all">{finalCode}</p>
                    <p className="text-xs mt-2 text-slate-600">
                        *El índice se ha incrementado automáticamente para la siguiente obra.
                    </p>
                </div>
            )}
        </div>
    );
};
// ---------------------------------------------------------


export const ArtistDashboard: React.FC<ArtistDashboardProps> = ({ onLogout }) => {
  const [activeTool, setActiveTool] = useState<'coder' | 'print' | 'layout' | null>(null);

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

        {/* LISTADO DE HERRAMIENTAS */}
        {!activeTool && (
            <>
                <h2 className="text-xl font-semibold text-slate-700 mb-4">Herramientas de Gestión Exclusivas:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    
                    {/* 1. Herramienta: Generador de Códigos */}
                    <button 
                        onClick={() => setActiveTool('coder')}
                        className="flex flex-col items-start p-5 bg-white border border-stone-200 rounded-xl shadow-md transition-all hover:shadow-lg hover:border-gold-500 transform hover:scale-[1.01]"
                    >
                        <Code size={30} className="text-gold-500 mb-2" />
                        <span className="font-bold text-slate-800">Codificación y Trazabilidad</span>
                        <span className="text-sm text-slate-500 text-left">Genera la clave de certificado única (ej. `PINT-2026-001`).</span>
                    </button>
                    
                    {/* 2. Herramienta: Impresión */}
                    <button 
                        onClick={() => setActiveTool('print')}
                        className="flex flex-col items-start p-5 bg-white border border-stone-200 rounded-xl shadow-md transition-all hover:shadow-lg hover:border-gold-500 transform hover:scale-[1.01]"
                    >
                        <Printer size={30} className="text-gold-500 mb-2" />
                        <span className="font-bold text-slate-800">Impresión de Documentos</span>
                        <span className="text-sm text-slate-500 text-left">Genera certificados PDF y cartas para coleccionistas.</span>
                    </button>
                    
                    {/* 3. Herramienta: Plantillas (Ejemplo) */}
                    <button 
                        onClick={() => setActiveTool('layout')}
                        className="flex flex-col items-start p-5 bg-white border border-stone-200 rounded-xl shadow-md transition-all hover:shadow-lg hover:border-gold-500 transform hover:scale-[1.01]"
                    >
                        <Layout size={30} className="text-gold-500 mb-2" />
                        <span className="font-bold text-slate-800">Gestión de Plantillas</span>
                        <span className="text-sm text-slate-500 text-left">Edita y previsualiza los diseños de los documentos generados.</span>
                    </button>

                </div>
            </>
        )}

        {/* VISTA DE HERRAMIENTA ACTIVA */}
        <div className="mt-10">
            {activeTool === 'coder' && <CertificateCoder />}
            
            {activeTool === 'print' && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100">
                    <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 mb-4"><Printer size={20} className="text-gold-500" /> Kit de Impresión</h3>
                    <p className="text-slate-600">
                        Esta sección mostrará una lista de tus obras para seleccionar cuáles necesitan documentos. 
                        Al seleccionar, podrás generar el PDF del certificado y la carta de forma automática y lista para imprimir.
                    </p>
                    <ul className="list-disc list-inside mt-4 text-sm text-slate-600">
                        <li>Certificado de Autenticidad.</li>
                        <li>Carta de Coleccionista personalizada.</li>
                    </ul>
                </div>
            )}
            
            {activeTool === 'layout' && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100">
                    <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 mb-4"><Layout size={20} className="text-gold-500" /> Editor de Plantillas</h3>
                    <p className="text-slate-600">
                        Aquí podrías ajustar los márgenes, fuentes y el logo que aparecen en tus documentos impresos.
                    </p>
                </div>
            )}

            {/* Botón para volver al listado de herramientas */}
            {activeTool && (
                <div className="mt-6 flex justify-center">
                    <button 
                        onClick={() => setActiveTool(null)}
                        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors p-2 rounded-lg bg-white shadow-sm border border-stone-200"
                    >
                        <X size={16} /> Volver a la Lista de Herramientas
                    </button>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};