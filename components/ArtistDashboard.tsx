import React, { useState } from 'react';
import { ANALYSIS_POINTS, SOCIAL_CONTENT, MOCK_WORKFLOW, ARTIST_INFO, ARTWORKS } from '../constants';
import { AIStudio } from './AIStudio';
import { Certificate } from './Certificate';
import { 
  Lightbulb, FileText, Share2, Kanban, Copy, Check, TrendingUp, AlertCircle, Sparkles, Printer, X, Mail
} from 'lucide-react';

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
            <div className="h-24 mt-4 border-b border-slate-200 w-48 mb-2"></div>
            <p className="font-bold">{ARTIST_INFO.name}</p>
            <div className="absolute bottom-12 left-0 right-0 text-center text-[10px] text-slate-400 uppercase tracking-widest">{ARTIST_INFO.website} • {ARTIST_INFO.email}</div>
        </div>
    );
};

export const ArtistDashboard: React.FC = () => {
  const [section, setSection] = useState<'strategy' | 'tools' | 'marketing' | 'workflow' | 'ai-studio'>('strategy');
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const selectedArtworkForCert = ARTWORKS.find(a => a.id === selectedCertificate);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800"><h2 className="font-serif text-xl text-gold-500">Artist Studio</h2><p className="text-xs text-slate-400 mt-1">Hub de Gestión Profesional</p></div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setSection('strategy')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${section === 'strategy' ? 'bg-gold-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}><Lightbulb size={18} /> Estrategia & Análisis</button>
          <button onClick={() => setSection('ai-studio')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${section === 'ai-studio' ? 'bg-purple-600 text-white' : 'text-purple-300 hover:bg-slate-800'}`}><Sparkles size={18} /> AI Creative Lab</button>
          <button onClick={() => setSection('tools')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${section === 'tools' ? 'bg-gold-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}><FileText size={18} /> Kit & Contratos</button>
          <button onClick={() => setSection('marketing')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${section === 'marketing' ? 'bg-gold-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}><Share2 size={18} /> Redes Sociales</button>
          <button onClick={() => setSection('workflow')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${section === 'workflow' ? 'bg-gold-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}><Kanban size={18} /> Flujo de Trabajo</button>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-0 md:p-8 relative">
        {section !== 'ai-studio' && (
          <header className="flex justify-between items-center mb-8 px-6 md:px-0 mt-6 md:mt-0">
            <div><h1 className="text-2xl font-serif font-bold text-slate-900 capitalize">{section === 'strategy' ? 'Diagnóstico & Estrategia' : section}</h1><p className="text-slate-500 text-sm">Panel de control de Myriam Alcaraz</p></div>
            <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 text-sm flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div>Estado: Disponible</div>
          </header>
        )}

        {section === 'ai-studio' && <div className="h-full"><AIStudio /></div>}

        {section === 'strategy' && (
          <div className="space-y-6 animate-fade-in px-6 md:px-0">
            <div className="bg-slate-900 text-white p-8 rounded-lg shadow-lg relative overflow-hidden"><div className="absolute top-0 right-0 p-32 bg-gold-500 rounded-full opacity-10 transform translate-x-1/2 -translate-y-1/2"></div><h3 className="font-serif text-2xl mb-2 text-gold-500">Eslogan de Marca</h3><p className="text-3xl font-light italic mb-6">"Arte con Alma y Sofisticación"</p><p className="text-slate-400 max-w-xl text-sm">Esta frase une la profundidad emocional de tu statement ("Alma") con la elegancia visual de tu presentación y precios ("Sofisticación").</p></div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200"><h3 className="flex items-center gap-2 font-bold text-slate-900 mb-4 border-b pb-2"><TrendingUp className="text-green-600" size={20} /> Puntos Fuertes</h3><ul className="space-y-3">{ANALYSIS_POINTS.strengths.map((point, i) => (<li key={i} className="flex gap-3 text-sm text-slate-700"><Check className="text-green-500 flex-shrink-0" size={16} />{point}</li>))}</ul></div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200"><h3 className="flex items-center gap-2 font-bold text-slate-900 mb-4 border-b pb-2"><AlertCircle className="text-amber-600" size={20} /> Oportunidades</h3><ul className="space-y-3">{ANALYSIS_POINTS.opportunities.map((point, i) => (<li key={i} className="flex gap-3 text-sm text-slate-700"><div className="w-4 h-4 rounded-full border border-amber-500 flex items-center justify-center text-[10px] text-amber-600 font-bold flex-shrink-0">!</div>{point}</li>))}</ul></div>
            </div>
          </div>
        )}

        {section === 'tools' && (
          <div className="space-y-8 animate-fade-in px-6 md:px-0">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <div><h3 className="font-bold text-lg text-slate-900">Documentación Oficial (Certificados & Cartas)</h3><p className="text-sm text-slate-500">Genera el Certificado y la Carta de Agradecimiento para tu envío híbrido.</p></div>
                <Printer className="text-slate-300" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {ARTWORKS.map(art => (
                    <div key={art.id} className="border border-slate-200 rounded p-2 hover:border-gold-500 hover:shadow-md transition-all bg-white">
                        <div className="aspect-square bg-slate-100 mb-2 overflow-hidden"><img src={art.image} alt={art.title} className="w-full h-full object-cover" /></div>
                        <p className="font-bold text-xs truncate text-slate-800 mb-2">{art.title}</p>
                        <div className="flex gap-1"><button onClick={() => setSelectedCertificate(art.id)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] py-1 rounded">Certificado</button><button onClick={() => setSelectedLetter(art.id)} className="flex-1 bg-gold-50 hover:bg-gold-100 text-gold-700 text-[10px] py-1 rounded">Carta</button></div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {(selectedCertificate || selectedLetter) && (
            <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-200 p-4 rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto w-fit relative">
                    <button onClick={() => { setSelectedCertificate(null); setSelectedLetter(null); }} className="absolute top-4 right-4 z-50 bg-slate-800 text-white p-2 rounded-full hover:bg-red-500 transition-colors"><X size={20} /></button>
                    <div className="flex justify-end gap-2 mb-4"><button onClick={() => window.print()} className="bg-gold-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gold-700 text-sm font-bold shadow-lg"><Printer size={16}/> Imprimir Documento</button></div>
                    <div className="bg-white shadow-2xl">
                        {selectedCertificate && selectedArtworkForCert && <Certificate artwork={selectedArtworkForCert} />}
                        {selectedLetter && <WelcomeLetter artworkId={selectedLetter} />}
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};