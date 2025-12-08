import React, { useState, useEffect } from 'react';
import { PublicSite } from './components/PublicSite';
import { ArtistDashboard } from './components/ArtistDashboard';
import { DigitalCompanion } from './components/DigitalCompanion';
import { Lock, X, LogOut, Eye } from 'lucide-react';

// --- CONFIGURACIÓN DE SEGURIDAD ---
const PASSWORD = "arte2025"; 

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // 'public' = Web que ve todo el mundo
  // 'artist' = Tu panel de control (Dashboard)
  const [view, setView] = useState<'public' | 'artist'>('public');
  const [selectedCompanionId, setSelectedCompanionId] = useState<string | null>(null);
  
  // Estados del formulario
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    // Comprobar si ya se inició sesión anteriormente
    const savedAuth = localStorage.getItem('myriam_auth');
    if (savedAuth === 'true') {
        setIsAuthenticated(true);
        // Si ya está autenticado, empezamos en la vista pública por defecto,
        // pero el candado le permitirá ir a la gestión.
        setView('public'); 
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('myriam_auth', 'true');
      setError(false);
      setShowLoginModal(false);
      setView('artist'); // Al loguearse por primera vez, entra al Dashboard
    } else {
      setError(true);
      setPasswordInput(""); 
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('myriam_auth');
    setView('public');
  };

  // ---------------------------------------------------------
  // 1. PANTALLA DE "EN CONSTRUCCIÓN" (Bloqueo inicial)
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

        {/* 🔒 BOTÓN DE ACCESO (Candado) */}
        <button 
          onClick={() => setShowLoginModal(true)}
          className="absolute bottom-6 right-6 text-stone-300 hover:text-gold-500 transition-colors p-2"
          title="Acceso Privado"
        >
          <Lock size={20} />
        </button>

        {/* Modal de Login */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full relative animate-scale-in">
              <button 
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <Lock size={32} className="text-gold-500 mx-auto mb-2" />
                <h2 className="text-xl font-bold text-slate-800">Acceso Privado</h2>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                  type="password"
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
                {error && <p className="text-xs text-red-500 text-center font-bold">Clave incorrecta</p>}
                <button type="submit" className="bg-gold-500 text-white py-3 rounded-lg font-bold hover:bg-gold-600 transition-colors text-sm tracking-wider">ENTRAR</button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ---------------------------------------------------------
  // 2. APLICACIÓN (Usuario Autenticado)
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen animate-fade-in relative">
      
      {/* VISTA PRINCIPAL */}
      {view === 'public' ? (
        <PublicSite onOpenCompanion={(id) => setSelectedCompanionId(id)} />
      ) : (
        <ArtistDashboard />
      )}

      {/* 🛡️ SISTEMA DE NAVEGACIÓN PRIVADO (Discreto)
        Este botón reemplaza al botón gigante. Es un pequeño candado o un ojo.
      */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 items-end">
        
        {/* Botón para cambiar de vista (Candado <-> Ojo) */}
        <button 
          onClick={() => setView(view === 'public' ? 'artist' : 'public')}
          className="bg-white/90 backdrop-blur text-stone-400 hover:text-gold-600 p-3 rounded-full shadow-lg border border-stone-200 transition-all hover:scale-110"
          title={view === 'public' ? "Ir a Gestión" : "Ver Web Pública"}
        >
          {view === 'public' ? <Lock size={18} /> : <Eye size={18} />}
        </button>

        {/* Botón de Cerrar Sesión (Solo visible en modo gestión para limpiar) */}
        {view === 'artist' && (
          <button 
            onClick={handleLogout}
            className="bg-slate-900 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-all hover:scale-110"
            title="Cerrar Sesión"
          >
            <LogOut size={18} />
          </button>
        )}
      </div>

      {/* COMPAÑERO DIGITAL (Solo aparece si se selecciona) */}
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