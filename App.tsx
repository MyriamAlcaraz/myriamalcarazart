// ARCHIVO: App.tsx (CÓDIGO COMPLETO Y FIABLE)

import React, { useState, useEffect } from 'react';
import { PublicSite } from './components/PublicSite';
import { ArtistDashboard } from './components/ArtistDashboard';
import { DigitalCompanion } from './components/DigitalCompanion';
import { Layout, Palette } from 'lucide-react'; 
// 🛑 Importamos el componente de login externo
import { LoginScreen } from './components/LoginScreen'; 

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<'public' | 'artist'>('public');
  const [selectedCompanionId, setSelectedCompanionId] = useState<string | null>(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem('myriam_auth');
    if (savedAuth === 'true') setIsAuthenticated(true);
  }, []);
  
  const handleSuccessLogin = () => {
    setIsAuthenticated(true);
  };

  // --- SOLUCIÓN AL ERROR DE ESTABILIDAD ---
  if (!isAuthenticated) {
    // Si no está autenticada, SOLO devolvemos el componente de acceso.
    return <LoginScreen onLoginSuccess={handleSuccessLogin} />;
  }

  // --- CONTENIDO DE LA APP ---
  return (
    <div className="min-h-screen animate-fade-in">
      {view === 'public' ? (
        <PublicSite onOpenCompanion={(id) => setSelectedCompanionId(id)} />
      ) : (
        <ArtistDashboard />
      )}

      {/* Botón de Cambiar Vista */}
      <div className="fixed bottom-8 right-8 flex flex-col items-end gap-4 z-[9999]">
        <button 
          onClick={() => setView(view === 'public' ? 'artist' : 'public')}
          className="flex items-center gap-4 bg-gold-500 text-white pl-6 pr-4 py-4 rounded-full shadow-2xl shadow-gold-500/20 hover:bg-gold-600 transition-all hover:scale-105 group"
        >
          <div className="text-right hidden sm:block">
            <div className="text-[10px] uppercase tracking-widest opacity-80">Cambiar Vista</div>
            <div className="text-sm font-bold font-serif">
              {view === 'public' ? 'ENTRAR AL ESTUDIO' : 'VER WEB PÚBLICA'}
            </div>
          </div>
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            {view === 'public' ? <Palette size={24} /> : <Layout size={24} />}
          </div>
        </button>
      </div>

      {selectedCompanionId && (
        <DigitalCompanion 
          artworkId={selectedCompanionId} 
          onClose={() => setSelectedCompanionId(null)} 
        />
      )}
    </div>
  );
};

export default App;