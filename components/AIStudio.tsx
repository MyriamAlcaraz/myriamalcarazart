import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  Video, Sparkles, Loader2, MonitorPlay, FileCheck, AlertTriangle
} from 'lucide-react';
import { ARTWORKS } from '../constants';

const API_KEY_MASTER = "AIzaSyC0SA_dMAsU3-MPbiIAEiVIUE5LSpyKRMk";

type Tab = 'assistant' | 'visual' | 'motion' | 'live';

const urlToBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [videoPrompt, setVideoPrompt] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [selectedArtworkForVideo, setSelectedArtworkForVideo] = useState<string | null>(null);

  const handleVideoGen = async () => {
    if (!videoPrompt) return;
    setIsLoading(true);
    setGeneratedVideo(null);
    setErrorMessage(null);
    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY_MASTER });
      let inputImage = undefined;
      if (selectedArtworkForVideo) {
        const artwork = ARTWORKS.find(a => a.id === selectedArtworkForVideo);
        if (artwork) {
            const base64 = await urlToBase64(artwork.image);
            inputImage = { imageBytes: base64, mimeType: 'image/jpeg' };
        }
      }
      
      const operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: videoPrompt,
        image: inputImage,
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '9:16' }
      });
      
      let op = operation;
      let attempts = 0;
      while (!op.done && attempts < 60) { 
        await new Promise(r => setTimeout(r, 5000));
        op = await ai.operations.getVideosOperation({ operation: op });
        attempts++;
      }
      
      const uri = op.response?.generatedVideos?.[0]?.video?.uri;
      if (uri) {
          const res = await fetch(`${uri}&key=${API_KEY_MASTER}`);
          if (!res.ok) throw new Error("Error al descargar el video de Google");
          const blob = await res.blob();
          setGeneratedVideo(URL.createObjectURL(blob));
      } else {
          throw new Error("Tiempo de espera agotado.");
      }
    } catch (error: any) {
      setErrorMessage(handleAIError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="flex border-b bg-white px-6 pt-4 sticky top-0 z-10">
        {[{ id: 'assistant', label: 'Asistente', icon: <Sparkles size={16}/> }, { id: 'motion', label: 'Cineasta (Veo)', icon: <Video size={16}/> }].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as Tab)} className={`flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-medium ${activeTab === tab.id ? 'border-gold-500 text-gold-600' : 'border-transparent text-slate-500'}`}>{tab.icon} {tab.label}</button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        {errorMessage && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex gap-3 text-sm"><AlertTriangle size={20}/>{errorMessage}</div>}
        {activeTab === 'motion' && (
          <div className="max-w-2xl mx-auto text-center">
             <div className="bg-white p-8 rounded-lg shadow-sm border">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"><Video className="text-purple-600" size={32} /></div>
                <h3 className="text-2xl font-serif mb-2">Creador de Reels (Veo)</h3>
                <div className="mb-6"><label className="block text-xs font-bold text-slate-500 mb-2">1. Selecciona Obra:</label><select className="w-full p-2 border rounded bg-slate-50 text-sm" onChange={(e) => setSelectedArtworkForVideo(e.target.value)} value={selectedArtworkForVideo || ''}><option value="">-- Catálogo --</option>{ARTWORKS.slice(0, 10).map(art => (<option key={art.id} value={art.id}>{art.title}</option>))}</select></div>
                <div className="relative mb-6"><textarea value={videoPrompt} onChange={(e) => setVideoPrompt(e.target.value)} className="w-full p-4 bg-slate-50 border rounded-xl h-32" placeholder="2. Describe el movimiento..." /><button onClick={handleVideoGen} disabled={isLoading} className="mt-4 w-full bg-purple-600 text-white py-3 rounded-full flex items-center justify-center gap-2 font-bold">{isLoading ? <Loader2 className="animate-spin"/> : <MonitorPlay size={20}/>} GENERAR VIDEO</button></div>
                <div className="mt-8 pt-8 border-t"><h4 className="text-left font-bold text-xs uppercase text-slate-400 mb-4">💎 Plantillas de Marca</h4><div className="grid grid-cols-1 gap-3"><button onClick={() => setVideoPrompt("Video style: Elegant unboxing. A pair of white-gloved hands places a high-quality Giclée print of this painting on a table. The Myriam Alcaraz logo is visible. A Certificate of Authenticity is next to it. Cinematic lighting.")} className="flex items-center gap-3 p-3 bg-slate-50 border rounded hover:bg-gold-50"><div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center"><FileCheck size={20} /></div><div><strong className="block text-slate-700 text-xs text-left">Reveal: Guantes Blancos</strong><span className="text-[10px] text-slate-400">Manipulación de obra con certificado y logo</span></div></button></div></div>
             </div>
             {generatedVideo && (<div className="aspect-[9/16] max-w-sm mx-auto bg-black rounded-xl overflow-hidden shadow-2xl mt-8"><video src={generatedVideo} controls autoPlay loop className="w-full h-full"></video></div>)}
          </div>
        )}
        {activeTab === 'assistant' && (
            <div className="text-center mt-12 text-slate-400">
                <Sparkles className="mx-auto mb-4" size={48}/>
                <p>El asistente de texto está en mantenimiento. Usa la sección de Video.</p>
            </div>
        )}
      </div>
    </div>
  );
};