// ARCHIVO: components/AIStudio.tsx - Asistente IA Compacto y Colapsable

import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Sparkles, Loader2, AlertTriangle, X, Bot, Cpu
} from 'lucide-react';
import { ARTWORKS } from '../constants';

// API Keys desde variables de entorno
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;

type AIProvider = 'gemini' | 'claude';

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [respuestaIA, setRespuestaIA] = useState<string | null>(null);
  const [artworkId, setArtworkId] = useState<string | null>(null);
  const [provider, setProvider] = useState<AIProvider>('gemini');

  const ejecutarGemini = async () => {
    if (!GEMINI_API_KEY) {
      throw new Error("Falta VITE_GEMINI_API_KEY en .env.local");
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    // Modelo actualizado: gemini-1.5-flash-latest (más estable)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    let result;
    if (artworkId) {
      const artwork = ARTWORKS.find(a => a.id === artworkId);
      if (artwork) {
        const base64Image = await urlToBase64(artwork.image);
        result = await model.generateContent([
          prompt || "Describe esta obra de arte y sugiere un pie de foto para Instagram.",
          { inlineData: { data: base64Image, mimeType: "image/jpeg" } }
        ]);
      }
    } else {
      result = await model.generateContent(prompt || "Dame una frase inspiradora sobre el arte contemporáneo.");
    }

    const response = await result?.response;
    return response?.text() || "Gemini no ha devuelto texto.";
  };

  const ejecutarClaude = async () => {
    if (!CLAUDE_API_KEY) {
      throw new Error("Falta VITE_CLAUDE_API_KEY en .env.local");
    }

    // Contexto de la obra seleccionada
    let contextoObra = "";
    if (artworkId) {
      const artwork = ARTWORKS.find(a => a.id === artworkId);
      if (artwork) {
        contextoObra = `\n\nContexto de la obra seleccionada:\n- Título: "${artwork.title}"\n- Técnica: ${artwork.technique}\n- Dimensiones: ${artwork.dimensions}\n- Descripción: ${artwork.description || 'No disponible'}`;
      }
    }

    const mensajeCompleto = (prompt || "Dame una frase inspiradora sobre el arte contemporáneo.") + contextoObra;

    // Llamada a Claude API vía proxy o directamente
    const response = await fetch('/api/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: mensajeCompleto
          }
        ],
        system: "Eres un asistente experto en arte contemporáneo y pintura figurativa. Ayudas a la artista Myriam Alcaraz con análisis de sus obras, textos para redes sociales, y consultas sobre técnica artística. Responde siempre en español, de forma profesional pero cercana."
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.content?.[0]?.text || "Claude no ha devuelto texto.";
  };

  const ejecutarIA = async () => {
    setIsLoading(true);
    setError(null);
    setRespuestaIA(null);

    try {
      let resultado: string;
      if (provider === 'gemini') {
        resultado = await ejecutarGemini();
      } else {
        resultado = await ejecutarClaude();
      }
      setRespuestaIA(resultado);
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Error de conexión");
    } finally {
      setIsLoading(false);
    }
  };

  // ========================================
  // VISTA COLAPSADA (Botón flotante pequeño)
  // ========================================
  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        title="Abrir Asistente IA"
      >
        <Sparkles size={24} className="group-hover:animate-pulse" />
      </button>
    );
  }

  // ========================================
  // VISTA EXPANDIDA (Panel compacto)
  // ========================================
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-80 max-h-[500px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">

      {/* Header compacto */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-amber-400" />
          <span className="font-semibold text-sm">Asistente IA</span>
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-slate-400 hover:text-white transition-colors p-1"
          title="Minimizar"
        >
          <X size={18} />
        </button>
      </div>

      {/* Contenido scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {/* Selector de Proveedor IA */}
        <div className="flex gap-2">
          <button
            onClick={() => setProvider('gemini')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              provider === 'gemini'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Cpu size={14} /> Gemini
          </button>
          <button
            onClick={() => setProvider('claude')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              provider === 'claude'
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Bot size={14} /> Claude
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 p-2 rounded-lg flex items-start gap-2 text-xs">
            <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Selector de obra */}
        <select
          value={artworkId || ''}
          onChange={(e) => setArtworkId(e.target.value || null)}
          className="w-full p-2 border border-slate-200 rounded-lg text-slate-700 text-xs bg-slate-50 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        >
          <option value="">📝 Solo texto (sin obra)</option>
          {ARTWORKS.map(art => (
            <option key={art.id} value={art.id}>🖼️ {art.title}</option>
          ))}
        </select>

        {/* Prompt */}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ej: Sugiere un pie de foto para Instagram..."
          rows={3}
          className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-xs resize-none"
        />

        {/* Botón ejecutar */}
        <button
          onClick={ejecutarIA}
          disabled={isLoading}
          className={`w-full py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-md ${
            provider === 'gemini'
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-orange-500 hover:bg-orange-600 text-white'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Analizando...
            </>
          ) : (
            <>
              <Sparkles size={14} />
              Analizar con {provider === 'gemini' ? 'Gemini' : 'Claude'}
            </>
          )}
        </button>

        {/* Respuesta */}
        {respuestaIA && (
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${provider === 'gemini' ? 'bg-blue-500' : 'bg-orange-500'}`} />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Respuesta de {provider === 'gemini' ? 'Gemini' : 'Claude'}
              </span>
            </div>
            <p className="text-slate-700 text-xs whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
              {respuestaIA}
            </p>
          </div>
        )}
      </div>

      {/* Footer con info */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-100">
        <p className="text-[10px] text-slate-400 text-center">
          {provider === 'gemini' ? '🔵 Google AI' : '🟠 Anthropic'} • Myriam Alcaraz Studio
        </p>
      </div>
    </div>
  );
};
