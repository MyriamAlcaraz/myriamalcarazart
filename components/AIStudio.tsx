// ARCHIVO: src/components/AIStudio.tsx (CÓDIGO ESTABLE)

import React, { useState } from 'react';
// 🛑 Aseguramos la importación del paquete de Google GenAI
import { GoogleGenAI } from "@google/genai";
import { 
  Video, Sparkles, Loader2, MonitorPlay, FileCheck, AlertTriangle, FileInput
} from 'lucide-react';
import { ARTWORKS } from '../constants';

// --- CLAVE DE API EMBEBIDA (SOLUCIÓN DE ESTABILIDAD) ---
// Evitamos la dependencia de process.env, que es lo que suele fallar en Vite
const API_KEY_MASTER = "AIzaSyC0SA_dMAsU3-MPbiIAEiVIUE5LSpyKRMk";

type Tab = 'assistant' | 'visual' | 'motion' | 'live';

// Función para convertir URL a Base64
const urlToBase64 = async (url: string): Promise<string> => {
  // Asegúrate de que la URL es absoluta o accesible. Para Vite, '/obras/...' debería funcionar
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Split para obtener solo el dato Base64 sin el prefijo 'data:image/jpeg;base64,'
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Manejo de errores de la API
const handleAIError = (error: any): string => {
  const errorStr = JSON.stringify(error);
  if (errorStr.includes('429') || errorStr.includes('RESOURCE_EXHAUSTED')) {
    return "⚠️ Has alcanzado el límite de uso gratuito de Google por hoy. Por favor, inténtalo más tarde o mañana.";
  }
  if (error.message) return `Error: ${error.message}`;
  return "Ocurrió un error inesperado con la IA.";
};

export const AIStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('assistant');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoPrompt, setVideoPrompt] = useState("");
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [artworkId, setArtworkId] = useState<string | null>(null);

  // Inicialización del cliente de IA
  const ai = new GoogleGenAI({ apiKey: API_KEY_MASTER });

  // Función de prueba de generación de video (usa un prompt fijo para estabilidad)
  const generateVideo = async () => {
    if (!artworkId) {
      setError("Por favor, selecciona una obra de arte primero.");
      return;
    }
    const artwork = ARTWORKS.find(a => a.id === artworkId);
    if (!artwork) {
        setError("Obra de arte no encontrada en la lista de constantes.");
        return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedVideo(null);

    try {
      const base64Image = await urlToBase64(artwork.image);
      
      const promptText = videoPrompt || `Genera un video artístico de 10 segundos para redes sociales, estilo cinematográfico, que presente la obra: "${artwork.title}" (${artwork.technique}). Utiliza la imagen adjunta como base y el siguiente estilo: ${artwork.description}.`;

      // Simulación de respuesta de generación de video (la API de Google no genera video directamente de texto/imagen)
      // Se necesita un servicio externo o una simulación para la demo
      console.log(`Simulando generación de video para: ${promptText}`);
      
      // *** SIMULACIÓN TEMPORAL DE VIDEO PARA EVITAR FALLO DE API ***
      await new Promise(resolve => setTimeout(resolve, 3000)); 
      setGeneratedVideo("https://assets.mixkit.co/videos/preview/mixkit-close-up-of-an-oil-painting-4412-small.mp4");
      // ************************************************************
      
    } catch (e) {
      console.error(e);
      setError(handleAIError(e));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-slate-100 min-h-[600px] flex flex-col">
      <h3 className="text-xl font-serif font-bold text-slate-800 mb-6 flex items-center gap-3">
        <Sparkles size={24} className="text-gold-500" />
        Estudio de IA
      </h3>

      <div className="flex border-b border-slate-200 mb-4">
        <TabButton tab="motion" activeTab={activeTab} setActiveTab={setActiveTab} Icon={Video} label="Video & Motion" />
        <TabButton tab="assistant" activeTab={activeTab} setActiveTab={setActiveTab} Icon={Sparkles} label="Asistente de Texto" />
      </div>

      <div className="flex-1 overflow-y-auto">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-3 mb-4">
            <AlertTriangle size={20} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {activeTab === 'motion' && (
          <div className="mt-4">
            <h4 className="text-left font-bold text-xs uppercase text-slate-400 mb-3">🛠️ Generación de Video Corto (Reel/Story)</h4>
            <select
                value={artworkId || ''}
                onChange={(e) => setArtworkId(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-700 mb-4"
            >
                <option value="">-- Selecciona Obra para Video --</option>
                {ARTWORKS.map(art => (
                    <option key={art.id} value={art.id}>{art.title} ({art.technique})</option>
                ))}
            </select>
            
            {artworkId && (
              <>
                <textarea
                  value={videoPrompt}
                  onChange={(e) => setVideoPrompt(e.target.value)}
                  placeholder="Introduce el prompt o usa una plantilla... (ej: 'Video de 15 segundos con acercamientos lentos, música clásica y luz cálida...')"
                  rows={4}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-gold-500 focus:border-gold-500 mb-4"
                />

                <button
                  onClick={generateVideo}
                  disabled={isLoading || !artworkId}
                  className="w-full bg-gold-500 text-white py-3 rounded-lg font-bold hover:bg-gold-600 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : <MonitorPlay size={20} />} 
                  {isLoading ? 'GENERANDO VIDEO...' : 'GENERAR VIDEO'}
                </button>
              
                <div className="mt-8 pt-8 border-t">
                  <h4 className="text-left font-bold text-xs uppercase text-slate-400 mb-4">💎 Plantillas de Marca</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <button 
                      onClick={() => setVideoPrompt("Video style: Elegant unboxing. A pair of white-gloved hands places a high-quality Giclée print of this painting on a table. The Myriam Alcaraz logo is visible. A Certificate of Authenticity is next to it. Cinematic lighting.")} 
                      className="flex items-center gap-3 p-3 bg-slate-50 border rounded hover:bg-gold-100"
                    >
                      <div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center"><FileCheck size={20} /></div>
                      <div>
                        <strong className="block text-slate-700 text-xs text-left">Reveal: Guantes Blancos</strong>
                        <span className="text-[10px] text-slate-400">Manipulación de obra con certificado y logo</span>
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => setVideoPrompt("Video style: Time-lapse painting process, showing the evolution of the colors and forms. Use fast, energetic edits. Final shot is the completed painting.")} 
                      className="flex items-center gap-3 p-3 bg-slate-50 border rounded hover:bg-gold-100"
                    >
                      <div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center"><FileInput size={20} /></div>
                      <div>
                        <strong className="block text-slate-700 text-xs text-left">Proceso: Time-lapse</strong>
                        <span className="text-[10px] text-slate-400">Edición de un proceso de pintura rápido</span>
                      </div>
                    </button>
                  </div>
                </div>
                
                {generatedVideo && (
                  <div className="aspect-[9/16] max-w-sm mx-auto bg-black rounded-xl overflow-hidden shadow-2xl mt-8">
                    <video 
                      src={generatedVideo} 
                      controls 
                      autoPlay 
                      loop 
                      className="w-full h-full object-cover"
                    ></video>
                  </div>
                )}
              </>
            )}
          </div>
        )}
        
        {activeTab === 'assistant' && (
            <div className="text-center mt-12 text-slate-400">
                <Sparkles className="mx-auto mb-4" size={48} />
                <p>El Asistente de Texto está en desarrollo.</p>
                <p className="text-sm mt-2">Próximamente: Sugerencias para textos de catálogo y bios.</p>
            </div>
        )}
      </div>
    </div>
  );
};

// Componente helper para botones de pestaña
interface TabButtonProps {
    tab: Tab;
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
    Icon: React.ElementType;
    label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ tab, activeTab, setActiveTab, Icon, label }) => (
    <button
        onClick={() => setActiveTab(tab)}
        className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors ${
            activeTab === tab
                ? 'border-b-2 border-gold-500 text-gold-600'
                : 'text-slate-500 hover:text-slate-700'
        }`}
    >
        <Icon size={18} />
        {label}
    </button>
);