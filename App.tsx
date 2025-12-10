import React, { useState, useEffect } from 'react';
// 🛑 RUTAS CORREGIDAS: Asumiendo que todos los componentes están en el mismo directorio.
import { PublicSite } from './PublicSite'; 
import { ArtistDashboard } from './ArtistDashboard';
import { DigitalCompanion } from './DigitalCompanion';
import { Layout, Palette, Lock, ArrowRight, Eye, EyeOff, X, Shield } from 'lucide-react'; 

// --- CONFIGURACIÓN DE SEGURIDAD (PASSWORD) ---
const PASSWORD = "arte2026"; 

const App: React.FC = () => {
  // --- ESTADO Y HOOKS ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); 
  
  // 🛑 ESTADO: Para el segundo candado (acceso a ESTUDIO)
  const [showStudioLoginModal, setShowStudioLoginModal] = useState(false);

  // 'public' = Web en modo "Vista Previa" o "En Construcción"
  // 'artist' = ESTUDIO
  const [view, setView] = useState<'public' | 'artist'>('public');
  const [selectedCompanionId, setSelectedCompanionId] = useState<string | null>(null);
  
  // Hooks para el formulario de login (reutilizados para ambos candados)
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem('myriam_auth');
    if (savedAuth === 'true') {
        setIsAuthenticated(true);
        // Si el usuario ya está autenticado, lo dejamos en la vista pública por defecto al cargar.
        setView('public'); 
    }
  }, []);
  
  // 🚀 SOLUCIÓN A LA VENTANA EN BLANCO: Cierra el modal solo cuando el cambio de vista a 'artist' ha sido confirmado.
  useEffect(() => {
    if (view === 'artist' && showStudioLoginModal) {
      // Usamos un ligero timeout para darle tiempo a React de renderizar ArtistDashboard
      const timer = setTimeout(() => {
        setShowStudioLoginModal(false);
      }, 50); 
      
      return () => clearTimeout(timer);
    }
  }, [view, showStudioLoginModal]); // Depende solo de la vista y si el modal está abierto.

  // Handler para el PRIMER candado (Acceso inicial a la web/Preview)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('myriam_auth', 'true');
      setError(false);
      setShowLoginModal(false); 
      setView('public'); 
      setPasswordInput(""); // Limpiar para el siguiente uso
    } else {
      setError(true);
      setPasswordInput(""); 
    }
  };

  // 🛑 HANDLER para el SEGUNDO candado (Acceso al ESTUDIO)
  const handleStudioLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
        setView('artist'); // Cambia a la vista de ESTUDIO (esto dispara el useEffect de cierre)
        setError(false);
        // 🛑 Importante: NO cerramos el modal aquí, el useEffect lo hará.
        setPasswordInput(""); // Limpiar la clave
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
        <PublicSite 
            onOpenCompanion={(id) => setSelectedCompanionId(id)} 
            onOpenStudioLogin={() => setShowStudioLoginModal(true)}
        />
      ) : (
        <ArtistDashboard onLogout={handleLogout} /> 
      )}

      {/* 🛡️ SISTEMA DE NAVEGACIÓN PRIVADO (Solo el botón ESTUDIO/PREVIEW) */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 items-end">
        
        {/* 🛑 Botón de ESTUDIO/Vista Previa */}
        <button 
          onClick={() => {
            // Si está en vista pública, activa el segundo candado (el modal)
            if (view === 'public') {
              setShowStudioLoginModal(true);
            } else {
              // Si está en ESTUDIO, vuelve directamente a la vista pública
              setView('public'); 
            }
          }}
          className="bg-slate-900/50 backdrop-blur p-2 rounded-full shadow-xl transition-all hover:scale-110 text-white/70 hover:text-gold-500"
          // 🛑 TEXTO RENOMBRADO
          title={view === 'public' ? "Entrar en ESTUDIO" : "Volver a Vista Previa"} 
        >
          {view === 'public' ? <Lock size={16} /> : <Eye size={16} />} 
        </button>
        
      </div>

      {/* 🛑 MODAL DEL SEGUNDO CANDADO (ACCESO A ESTUDIO) */}
      {showStudioLoginModal && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full relative animate-scale-in">
              
              <button 
                onClick={() => {
                    setShowStudioLoginModal(false);
                    setError(false);
                    setPasswordInput(""); // Limpiar input
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <Shield size={32} className="text-gold-500 mx-auto mb-2" />
                <h2 className="text-xl font-bold text-slate-800">Acceso a ESTUDIO</h2> {/* Renombrado */}
                <p className="text-sm text-slate-500">Introduce la clave para acceder a la gestión.</p>
              </div>

              {/* Utiliza el nuevo handler handleStudioLogin */}
              <form onSubmit={handleStudioLogin} className="flex flex-col gap-4"> 
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
                    ACCEDER AL ESTUDIO <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
      )}

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