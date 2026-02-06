// ARCHIVO: src/components/AIStudio.tsx (EL QUE TIENE VIDA)

import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Video, Sparkles, Loader2, MonitorPlay, FileCheck, AlertTriangle, FileInput
} from 'lucide-react';
import { ARTWORKS } from '../constants';

// Cargamos la clave que guardamos en .env.local
const API_KEY_MASTER = import.meta.env.VITE_GEMINI_API_KEY;

type Tab = 'assistant' | 'visual';

const urlToBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const AIStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('assistant');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [respuestaIA, setRespuestaIA] = useState<string | null>(null);
  const [artworkId, setArtworkId] = useState<string | null>(null);

  const ejecutarIA = async () => {
    if (!API_KEY_MASTER) {
      setError("Falta la API Key. Asegúrate de haber ejecutado el comando del .env.local");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY_MASTER);
      // Usamos el modelo Flash que es rápido y gratuito
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      let result;
      if (artworkId) {
        const artwork = ARTWORKS.find(a => a.id === artworkId);
        if (artwork) {
          const base64Image = await urlToBase64(artwork.image);
          result = await model.generateContent([
            prompt || "Describe esta obra y sugiere un pie de foto para Instagram.",
            { inlineData: { data: base64Image, mimeType: "image/jpeg" } }
          ]);
        }
      } else {
        result = await model.generateContent(prompt || "Dame una frase inspiradora sobre el arte contemporáneo.");
      }

      const response = await result?.response;
      setRespuestaIA(response?.text() || "Gemini no ha devuelto texto.");
    } catch (e: any) {
      console.error(e);
      setError("Error de conexión: " + e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-slate-100 min-h-[600px] flex flex-col">
      <h3 className="text-xl font-serif font-bold text-slate-800 mb-6 flex items-center gap-3">
        <Sparkles size={24} className="text-amber-500" />
        Estudio Creativo Myriam Alcaraz
      </h3>

      <div className="flex-1">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-3 mb-4 text-xs">
            <AlertTriangle size={20} />
            {error}
          </div>
        )}

        <div className="mt-4">
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Selecciona una de tus obras (Opcional)</label>
          <select
            value={artworkId || ''}
            onChange={(e) => setArtworkId(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg text-slate-700 mb-4 text-sm"
          >
            <option value="">-- Solo consulta de texto --</option>
            {ARTWORKS.map(art => (
              <option key={art.id} value={art.id}>{art.title}</option>
            ))}
          </select>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ejemplo: ¿Qué colores destacarías de esta obra para una crítica de arte?"
            rows={4}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 mb-4 text-sm"
          />

          <button
            onClick={ejecutarIA}
            disabled={isLoading}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 shadow-md"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
            {isLoading ? 'CONECTANDO CON GEMINI...' : 'PEDIR ANÁLISIS A LA IA'}
          </button>

          {respuestaIA && (
            <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="font-bold text-slate-400 text-[10px] uppercase mb-2 tracking-widest">Resultado del Análisis</h4>
              <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">
                {respuestaIA}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};