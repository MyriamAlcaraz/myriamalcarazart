import React, { useState } from 'react';
// Mantenemos todas las importaciones necesarias
import { ARTWORKS, ARTIST_INFO } from '../constants';
import { Certificate } from './Certificate';
import { 
  Lightbulb, FileText, Share2, Kanban, Copy, Check, TrendingUp, AlertCircle, Sparkles, Printer, X, Mail
} from 'lucide-react';

// --- COMPONENTE CARTA DE BIENVENIDA (Posición de Firma y Pie de Página Finales) ---
const WelcomeLetter: React.FC<{ artworkId: string }> = ({ artworkId }) => {
    const artwork = ARTWORKS.find(a => a.id === artworkId);
    if (!artwork) return null;
    return (
        <div className="bg-white p-12 max-w-2xl mx-auto shadow-lg text-slate-800 font-serif leading-relaxed relative">
            <div className="text-center mb-12">
                <img src="/logo-myriam.png" alt="Logo" className="h-16 mx-auto mb-4" />
                <p className="text-xs uppercase tracking-[0.3em] text-gold-600">Arte con Alma y Sofisticación</p>
            </div>
            <p className="text-right text-sm italic text-slate-500 mb-8">Madrid, {new Date().toLocaleDateString()}</p>
            <p className="mb-6">Estimado/a Coleccionista,</p>
            <p className="mb-4">Es un honor saber que <strong>"{artwork.title}"</strong> ha encontrado su lugar en su colección personal.</p>
            <p className="mb-4">Esta pieza no es solo pintura sobre lienzo; es el resultado de un proceso íntimo de búsqueda de la luz y la atmósfera que ahora, gracias a usted, completa su ciclo.</p>
            <p className="mb-8">Adjunto encontrará el <strong>Certificado de Autenticidad Oficial</strong> con mi sello seco personal, que garantiza la procedencia y el valor de su adquisición. La obra viaja en camino desde el taller de impresión y llegará a sus manos con el máximo cuidado.</p>
            <p className="mb-12">Espero que la disfrute tanto como yo disfruté creándola.</p>
            <p>Con gratitud,</p>

            {/* Firma: Baja 2 espacios más */}
            <div className="flex justify-end mt-24 mb-24"> 
                <div className="text-right">
                    <p className="font-bold text-sm">{ARTIST_INFO.name}</p>
                </div>
            </div>

            {/* Pie de página: Pegado al borde */}
            <div className="absolute bottom-0 left-0 right-0 text-center text-[10px] text-slate-400 uppercase tracking-widest">{ARTIST_INFO.email} • @myriamalcaraz.artist</div>
        </div>
    );
};
// --- FIN COMPONENTE CARTA DE BIENVENIDA ---

export const ArtistDashboard: React.FC = () => {
  // ÚNICO ESTADO: Siempre en 'tools', que ahora será el KIT
  const [section] = useState<'tools'>('tools'); 
  
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const selectedArtworkForCert = ARTWORKS.find(a => a.id === selectedCertificate);

  // 🛑 MODIFICACIÓN: Función que renderiza el contenido del KIT (Trayectoria y Publicaciones actualizadas)
  const renderContent = () => {
    return (
        <div className="space-y-8 animate-fade-in px-6 md:px-0">
            {/* 1. DOCUMENTACIÓN OFICIAL (KIT) */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <div>
                    <h3 className="font-bold text-lg text-slate-900">Documentación Oficial (Certificados & Cartas)</h3>
                    <p className="text-sm text-slate-500">Genera el Certificado y la Carta de Agradecimiento para tu envío híbrido.</p>
                </div>
                <Printer className="text-slate-300" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {ARTWORKS.map(art => (
                    <div key={art.id} className="border border-slate-200 rounded p-2 hover:border-gold-500 hover:shadow-md transition-all bg-white">
                        <div className="aspect-square bg-slate-100 mb-2 overflow-hidden">
                            <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
                        </div>
                        <p className="font-bold text-xs truncate text-slate-800 mb-2">{art.title}</p>
                        <div className="flex gap-1">
                            <button onClick={() => setSelectedCertificate(art.id)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] py-1 rounded">Certificado</button>
                            <button onClick={() => setSelectedLetter(art.id)} className="flex-1 bg-gold-50 hover:bg-gold-100 text-gold-700 text-[10px] py-1 rounded">Carta</button>
                        </div>
                    </div>
                ))}
              </div>
            </div>

            {/* 2. TRAYECTORIA & RECONOCIMIENTOS */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-4 mb-4">Trayectoria & Reconocimientos</h3>
                
                {/* EXPOSICIONES COLECTIVAS */}
                <h4 className="font-semibold text-base text-gold-700 mt-6 mb-2">EXPOSICIONES COLECTIVAS:</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                    {ARTIST_INFO.accolades.exposiciones.map((item, index) => (
                        <li key={`exp-${index}`}>{item}</li>
                    ))}
                </ul>
                
                {/* CONCURSOS */}
                <h4 className="font-semibold text-base text-gold-700 mt-6 mb-2">CONCURSOS:</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                    {ARTIST_INFO.accolades.concursos.map((item, index) => (
                        <li key={`conc-${index}`}>{item}</li>
                    ))}
                </ul>
            </div>

            {/* 3. PUBLICACIONES */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-4 mb-4">PUBLICACIONES</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                    {ARTIST_INFO.publications.map((item, index) => (
                        <li key={`pub-${index}`}>{item}</li>
                    ))}
                </ul>
            </div>
          </div>
    );
  };
  
  // ... (El resto del componente ArtistDashboard se mantiene igual, incluyendo los estilos de impresión inyectados)
  return (
    <>
    {/* INYECCIÓN DE ESTILOS DE IMPRESIÓN */}
    <style>
        {`
        @media print {
            /* Oculta los botones y elementos de interfaz */
            .print-hidden {
                display: none !important;
            }
            /* Limpia el fondo del modal y lo hace de página completa */
            .print-clean-background {
                position: static !important;
                background-color: white !important; 
                box-shadow: none !important;
                padding: 0 !important;
                margin: 0 auto !important;
                width: 100% !important;
                max-width: 210mm !important; /* Limita el ancho al tamaño A4 para impresión */
                max-height: none !important;
                overflow: visible !important;
            }
        }
        `}
    </style>
    
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      
      {/* NAVEGACIÓN LATERAL (ASIDE) - print-hidden */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col print-hidden">
        <div className="p-6 border-b border-slate-800">
            <h2 className="font-serif text-xl text-gold-500">ESTUDIO</h2>
            <p className="text-xs text-slate-400 mt-1">Hub de Gestión Profesional</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => {}} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors bg-gold-600 text-white`}
          >
            <FileText size={18} /> 
            KIT
          </button>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-0 md:p-8 relative">
        
        {/* HEADER - print-hidden */}
        <header className="flex justify-between items-center mb-8 px-6 md:px-0 mt-6 md:mt-0 print-hidden">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900 capitalize">KIT</h1>
            <p className="text-slate-500 text-sm">Panel de control de Myriam Alcaraz</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 text-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Estado: Disponible
          </div>
        </header>

        {/* SECCIÓN 'tools' (KIT) - renderContent */}
        {section === 'tools' && <div>{renderContent()}</div>}
        
        {/* MODAL DE IMPRESIÓN (Certificado/Carta) */}
        {(selectedCertificate || selectedLetter) && (
            <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 print-clean-background">
                <div className="bg-slate-200 p-4 rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto w-fit relative print-clean-background">
                    
                    {/* Botón de cierre (Oculto en impresión) */}
                    <button onClick={() => { setSelectedCertificate(null); setSelectedLetter(null); }} className="absolute top-4 right-4 z-50 bg-slate-800 text-white p-2 rounded-full hover:bg-red-500 transition-colors print-hidden"><X size={20} /></button>
                    
                    {/* Contenedor del botón de impresión (Oculto en impresión) */}
                    <div className="flex justify-end gap-2 mb-4 print-hidden">
                        <button onClick={() => window.print()} className="bg-gold-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gold-700 text-sm font-bold shadow-lg">
                            <Printer size={16}/> Imprimir Documento
                        </button>
                    </div>
                    
                    <div className="bg-white shadow-2xl">
                        {/* Aquí se renderiza el documento para su impresión */}
                        {selectedCertificate && selectedArtworkForCert && <Certificate artwork={selectedArtworkForCert} />}
                        {selectedLetter && <WelcomeLetter artworkId={selectedLetter} />}
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
    </>
  );
};