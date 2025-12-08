import React, { useState, useEffect } from 'react';
import { PublicSite } from './components/PublicSite';
import { ArtistDashboard } from './components/ArtistDashboard';
import { DigitalCompanion } from './components/DigitalCompanion';
import { Layout, Palette, Lock, ArrowRight, X } from 'lucide-react';

// --- CONFIGURACIÓN DE SEGURIDAD ---
const PASSWORD = "arte2025"; // La clave correcta (interna)

const App: React.FC = () => {
  // Estados de la aplicación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // Controla si se ve el formulario
  const [view, setView] = useState<'public' | 'artist'>('public');
  const [selectedCompanionId, setSelectedCompanionId] = useState<string | null>(null);
  
  // Estados del formulario de login
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    // Comprobar si ya se inició sesión anteriormente
    const savedAuth = localStorage.getItem('myriam_auth');
    if (savedAuth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('myriam_auth', 'true');
      setError(false);
      setShowLoginModal(false);
    } else {
      setError(true);
      setPasswordInput(""); 
    }
  };

  // ---------------------------------------------------------
  // 🚧 1. PANTALLA DE "EN CONSTRUCCIÓN" (Vista por defecto)
  // ---------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 relative font-serif">
        
        {/* Contenido Público: Solo Logo y Mensaje */}
        <div className="text-center animate-fade-in">
          <img 
            src="/logo-myriam.png" 
            alt="Myriam Alcaraz" 
            className="h-24 md:h-32 w-auto mx-auto mb-8 object-contain opacity-90" 
          />
          <h1 className="text-2xl md:text-4xl text-slate-800 tracking-widest uppercase mb-4">
            Sitio Web en Construcción
          </h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto mb-6"></div>
          <p className="text-slate-500 font-light text-lg">
            Estamos preparando una nueva experiencia artística. <br />
            Próximamente disponible.
          </p>
        </div>

        {/* 🔒 ACCESO PRIVADO (Botón Discreto en la esquina) */}
        <button 
          onClick={() => setShowLoginModal(true)}
          className="absolute bottom-6 right-6 text-stone-300 hover:text-gold-500 transition-colors p-2"
          title="Acceso Artista"
        >
          <Lock size={20} />
        </button>

        {/* 🔑 MODAL DE LOGIN (Solo aparece si pulsas el candado) */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full relative animate-scale-in">
              
              {/* Botón Cerrar */}
              <button 
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <Lock size={32} className="text-gold-500 mx-auto mb-2" />
                <h2 className="text-xl font-bold text-slate-800">Acceso Privado</h2>
                <p className="text-xs text-slate-500">Área exclusiva para gestión interna.</p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                  type="password"
                  // 🛑 AQUÍ ESTÁ LA CORRECCIÓN: Placeholder genérico
                  placeholder="Introduce contraseña..." 
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (error) setError(false);
                  }}
                  className={`w-full p-3 text-center border-2 rounded-lg outline-none transition-all focus:border-gold-500 ${
                    error ? 'border-red-500 bg-red-50' : 'border-stone-200'
                  }`}
                  autoFocus
                />
                
                {error && (
                  <p className="text-xs text-red-500 text-center font-bold">Clave incorrecta</p>
                )}

                <button
                  type="submit"
                  className="bg-gold-500 text-white py-3 rounded-lg font-bold hover:bg-gold-600 transition-colors text-sm tracking-wider"
                >
                  ENTRAR
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ---------------------------------------------------------
  // ✅ 2. APLICACIÓN COMPLETA (Solo si está autenticado)
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen animate-fade-in">
      {view === 'public' ? (
        <PublicSite onOpenCompanion={(id) => setSelectedCompanionId(id)} />
      ) : (
        <ArtistDashboard />
      )}

      {/* Botón Flotante para cambiar entre Vista Pública y Gestión */}
      <div className="fixed bottom-8 right-8 z-[9999] group">
        <button 
          onClick={() => setView(view === 'public' ? 'artist' : 'public')}
          className="bg-gold-500 text-white p-4 rounded-full shadow-2xl hover:bg-gold-600 transition-all hover:scale-110 flex items-center gap-3 pr-6"
        >
          <div className="bg-white/20 p-2 rounded-full">
            {view === 'public' ? <Palette size={20} /> : <Layout size={20} />}
          </div>
          <div className="text-left hidden group-hover:block whitespace-nowrap overflow-hidden transition-all duration-300">
            <span className="block text-[10px] uppercase opacity-80">Cambiar a</span>
            <span className="block font-bold font-serif text-sm">
              {view === 'public' ? 'MODO GESTIÓN' : 'VISTA PÚBLICA'}
            </span>
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