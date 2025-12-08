import React, { useState, useEffect } from 'react';
import { PublicSite } from './components/PublicSite'; 
import { ArtistDashboard } from './components/ArtistDashboard';
import { DigitalCompanion } from './components/DigitalCompanion';
// Se ha eliminado LogOut de las importaciones ya que no se usa
import { Layout, Palette, Lock, ArrowRight, Eye, EyeOff, X, Shield } from 'lucide-react'; 

// --- CONFIGURACIÓN DE SEGURIDAD (PASSWORD) ---
const PASSWORD = "arte2026"; 

const App: React.FC = () => {
  // --- ESTADO Y HOOKS ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); 
  
  // 'public' = Web en modo "Vista Previa" o "En Construcción"
  // 'artist' = MODO GESTIÓN/ESTUDIO
  const [view, setView] = useState<'public' | 'artist'>('public');
  const [selectedCompanionId, setSelectedCompanionId] = useState<string | null>(null);
  
  // Hooks para el formulario de login 
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Comprobar si ya se inició sesión
    const savedAuth = localStorage.getItem('myriam_auth');
    if (savedAuth === 'true') {
        setIsAuthenticated(true);
        setView('public'); // Entra por defecto en la Vista Previa de la web
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('myriam_auth', 'true');
      setError(false);
      setShowLoginModal(false); 
      setView('public'); 
    } else {
      setError(true);
      setPasswordInput(""); 
    }
  };

  // 🛑 MANTENEMOS la función handleLogout, pero ahora solo se puede llamar
  // si borras la información del navegador manualmente (localStorage)
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('myriam_auth');
    setView('public'); // Vuelve a la pantalla de construcción
  };


  // ---------------------------------------------------------
  // 🔒 PANTALLA DE CONSTRUCCIÓN / PRIMER CANDADO (No Autenticado)
  // ---------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 relative font-serif">
        
        {/* Contenido Público: Logo y Mensaje de Construcción */}
        <div className="text-center animate-fade-in max-w-lg">
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

        {/* 🔒 BOTÓN DE ACCESO PRIVADO (Candado discreto) */}
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
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <Shield size={32} className="text-gold-500 mx-auto mb-2" />
                <h2 className="text-xl font-bold text-slate-800">Acceso de Artista</h2>
                <p className="text-sm text-slate-500">Para ver la web en vista previa.</p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Introduce tu clave privada" 
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (error) setError(false);
                    }}
                    className={`w-full p-3 pr-12 text-center border-2 rounded-lg outline-none transition-all focus:border-gold-500 ${
                      error ? 'border-red-500 bg-red-50' : 'border-stone-200'
                    }`}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gold-500"
                    aria-label={showPassword ? "Ocultar clave" : "Mostrar clave"}
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                {error && <p className="text-xs text-red-500 text-center font-bold">Clave incorrecta</p>}
                <button type="submit" className="bg-gold-500 text-white py-3 rounded-lg font-bold hover:bg-gold-600 transition-colors text-sm tracking-wider flex items-center justify-center gap-2">
                    ACCEDER A LA PREVIEW <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ---------------------------------------------------------
  // CONTENIDO DE LA APP (Usuario Autenticado)
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen animate-fade-in relative">
      
      {/* VISTA PRINCIPAL (Alterna entre PublicSite y ArtistDashboard) */}
      {view === 'public' ? (
        <PublicSite onOpenCompanion={(id) => setSelectedCompanionId(id)} />
      ) : (
        <ArtistDashboard />
      )}

      {/* 🛡️ SISTEMA DE NAVEGACIÓN PRIVADO (Solo el botón de MODO GESTIÓN) */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 items-end">
        
        {/* 🛑 Botón de MODO GESTIÓN/Vista Previa (Más discreto) */}
        <button 
          onClick={() => setView(view === 'public' ? 'artist' : 'public')}
          // Estilo modificado para ser más discreto: más pequeño y oscuro
          className="bg-slate-900/50 backdrop-blur p-2 rounded-full shadow-xl transition-all hover:scale-110 text-white/70 hover:text-gold-500"
          title={view === 'public' ? "Entrar en MODO GESTIÓN" : "Volver a Vista Previa"}
        >
          {/* Tamaño del icono reducido */}
          {view === 'public' ? <Lock size={16} /> : <Eye size={16} />} 
        </button>

        {/* 🛑 El botón de Cerrar Sesión ha sido ELIMINADO */}
        
      </div>

      {/* COMPAÑERO DIGITAL */}
      {selectedCompanionId && (
        <DigitalCompanion 
          artworkId={selectedCompanionId} 
          onClose={() => setSelectedCompanionId(null)} 
          // Mantenemos la lógica para el siguiente paso (certificados)
          showCertificateAccess={view === 'artist'} 
        />
      )}
    </div>
  );
};

export default App;