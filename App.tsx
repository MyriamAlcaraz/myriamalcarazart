// ARCHIVO: App.tsx - CÓDIGO FINAL Y COMPLETO

import React, { useState, useEffect } from 'react';
// 🛑 MODIFICACIÓN 1: Importamos la función de generación de HTML
import { PublicSite, getCertificateDemoHtmlContent } from './components/PublicSite'; 
import { ArtistDashboard } from './components/ArtistDashboard';
import { DigitalCompanion } from './components/DigitalCompanion';
// 🛑 MODIFICACIÓN 2: Añadimos ShieldCheck a la lista de íconos
import { Layout, Palette, Lock, ArrowRight, Eye, EyeOff, X, Shield, ShieldCheck } from 'lucide-react'; 

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
  // selectedCompanionId contendrá el ID de la obra o 'CERTIFICATE_DEMO'
  const [selectedCompanionId, setSelectedCompanionId] = useState<string | null>(null);
  
  // Hooks para el formulario de login (reutilizados para ambos candados)
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem('myriam_auth');
    if (savedAuth === 'true') {
        setIsAuthenticated(true);
        setView('public'); 
    }
  }, []);
  

  // Handler para el PRIMER candado (Acceso inicial a la web/Preview)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('myriam_auth', 'true');
      setError(false);
      setShowLoginModal(false); 
      setView('public'); 
      setPasswordInput(""); 
    } else {
      setError(true);
      setPasswordInput(""); 
    }
  };

  // Handler para el SEGUNDO candado (Acceso a ESTUDIO)
  const handleStudioLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
        setShowStudioLoginModal(false);
        setView('artist'); 
        setError(false);
        setPasswordInput(""); 
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
  
  // Función de cierre del Compañero (reutilizada para la demo)
  const handleCloseCompanion = () => setSelectedCompanionId(null); 


  // ---------------------------------------------------------
  // 🛑 MODIFICACIÓN 3: Función para Renderizar el Certificado BONITO
  // ---------------------------------------------------------
  const renderCertificateDemo = () => {
    // Llama a la función que genera el HTML bonito (exportada de PublicSite.tsx)
    const htmlContent = getCertificateDemoHtmlContent(); 
    
    return (
        // Contenedor del Modal (fondo oscuro)
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-2xl relative">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                        <ShieldCheck size={28} className="text-gold-500" /> Demo: Certificado de Autenticidad
                    </h3>
                    <button onClick={handleCloseCompanion} className="p-1 rounded-full text-slate-400 hover:text-red-500 transition-colors">
                        <X size={24} />
                    </button>
                </div>
                
                <p className="text-sm text-slate-600 mb-4">
                    Visualización en tiempo real del documento que reciben los coleccionistas. (Simulación de impresión A4).
                </p>
                
                <div className="w-full h-[600px] border border-gray-300 rounded-lg overflow-hidden shadow-inner bg-slate-50">
                    <iframe
                        title="Certificado Demo Preview"
                        srcDoc={htmlContent} // ¡Usa el HTML generado!
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            border: 'none',
                            transform: 'scale(0.8)', 
                            transformOrigin: 'top left' 
                        }}
                        sandbox="allow-scripts allow-same-origin"
                    />
                </div>
                
                <div className="mt-4 text-right">
                    <button onClick={handleCloseCompanion} className="bg-slate-500 text-white px-4 py-2 rounded font-semibold hover:bg-slate-600">Cerrar Demo</button>
                </div>
            </div>
        </div>
    );
  };
  // ---------------------------------------------------------


  // ---------------------------------------------------------
  // 🔒 PANTALLA DE CONSTRUCCIÓN / PRIMER CANDADO (No Autenticado)
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
            if (view === 'public') {
              setShowStudioLoginModal(true);
            } else {
              setView('public'); 
            }
          }}
          className="bg-slate-900/50 backdrop-blur p-2 rounded-full shadow-xl transition-all hover:scale-110 text-white/70 hover:text-gold-500"
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
                    setPasswordInput(""); 
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <Shield size={32} className="text-gold-500 mx-auto mb-2" />
                <h2 className="text-xl font-bold text-slate-800">Acceso a ESTUDIO</h2>
                <p className="text-sm text-slate-500">Introduce la clave para acceder a la gestión.</p>
              </div>

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

      {/* 🛑 MODIFICACIÓN 4: Renderizado Condicional del Certificado Bonito o del Compañero Digital */}
      {selectedCompanionId === 'CERTIFICATE_DEMO' ? (
          // 1. Si el ID es la cadena de la demo, renderiza el modal completo (el bonito)
          renderCertificateDemo()
      ) : selectedCompanionId && (
        // 2. Si hay un ID pero no es la demo (será un ID de obra), renderiza el Compañero Digital
        <DigitalCompanion 
          artworkId={selectedCompanionId} 
          onClose={handleCloseCompanion} 
          showCertificateAccess={view === 'artist'} 
          // 🛑 MODIFICACIÓN 5: Pasamos la función que abre el modal bonito
          onOpenCertificateDemo={() => setSelectedCompanionId('CERTIFICATE_DEMO')} 
        />
      )}
    </div>
  );
};

export default App;