import React, { useState, useEffect } from 'react';
import { PublicSite } from './components/PublicSite';
import { ArtistDashboard } from './components/ArtistDashboard';
import { DigitalCompanion } from './components/DigitalCompanion';
import { Layout, Palette, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

// --- CONFIGURACIÓN DE SEGURIDAD ---
// Esta es tu contraseña secreta
const PASSWORD = "arte2025"; 

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  useEffect(() => {
    // Intenta recuperar la sesión si ya habías iniciado antes
    const savedAuth = localStorage.getItem('myriam_auth');
    if (savedAuth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('myriam_auth', 'true');
      setError(false);
    } else {
      setError(true);
      // Borrar input si falla para reintentar limpio
      setPasswordInput(""); 
    }
  };

  // --- PANTALLA DE BLOQUEO (CANDADO) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4 font-serif">
        <div className="text-center max-w-md w-full animate-fade-in">
          {/* Asegúrate de que este archivo '/logo-myriam.png' existe en tu carpeta 'public' */}
          <img src="/logo-myriam.png" alt="Logo" className="h-24 mx-auto mb-8 opacity-80" />
          <h1 className="text-3xl text-slate-900 mb-2">Próximamente</h1>
          <p className="text-slate-500 mb-8 italic text-sm">Sitio web oficial en construcción. Acceso privado.</p>
          
          <form onSubmit={handleLogin} className="relative w-full max-w-xs mx-auto">
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <input 
                    type={showPassword ? "text" : "password"} 
                    value={passwordInput}
                    onChange={(e) => { setPasswordInput(e.target.value); setError(false); }}
                    placeholder="Contraseña de acceso"
                    className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-full focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm bg-white shadow-sm"
                />
                
                {/* Botón Ojito para ver clave */}
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff size={14}/> : <Eye size={14}/>}
                </button>

                <button type="submit" className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white p-2 rounded-full hover:bg-gold-600 transition-colors">
                    <ArrowRight size={16} />
                </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-3 font-bold animate-pulse">Clave incorrecta. Inténtalo de nuevo.</p>}
          </form>
          
          <p className="mt-12 text-[10px] text-slate-300 uppercase tracking-widest">© 2025 Myriam Alcaraz</p>
        </div>
      </div>
    );
  }

  // --- WEB REAL ---
  
  const [view, setView] = useState<'public' | 'artist'>('public');
  const [selectedCompanionId, setSelectedCompanionId] = useState<string | null>(null);

  // Protección extra: Si falla algo al cargar, mostrar error en vez de blanco
  try {
    return (
      <div className="relative min-h-screen animate-fade-in">
        {view === 'public' ? (
          <PublicSite onOpenCompanion={(id) => setSelectedCompanionId(id)} />
        ) : (
          <ArtistDashboard />
        )}

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
  } catch (err) {
    // Si la web pública o el dashboard fallan, al menos se ve este mensaje
    return <div className="p-8 text-center text-red-500 font-serif">Ha ocurrido un error al cargar la web. Por favor recarga o contacta con el soporte técnico.</div>;
  }
};

export default App;