// ARCHIVO: ./App.tsx - CÓDIGO FINAL Y COMPLETO

import React, { useState, useEffect, useCallback } from 'react';
// 🛑 CRÍTICO: Importar getCertificateDemoHtmlContent
import { PublicSite, getCertificateDemoHtmlContent } from './components/PublicSite'; 
import { ArtistDashboard } from './components/ArtistDashboard';
import { DigitalCompanion } from './components/DigitalCompanion';
// 🛑 CRÍTICO: Importar Printer
import { Layout, Palette, Lock, ArrowRight, Eye, EyeOff, X, Shield, Printer } from 'lucide-react'; 

// --- CONFIGURACIÓN DE SEGURIDAD (PASSWORD) ---
const PASSWORD = "arte2026"; 

const App: React.FC = () => {
  // --- ESTADO Y HOOKS ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); 
  
  // ESTADO: Para el segundo candado (acceso a ESTUDIO)
  const [showStudioLoginModal, setShowStudioLoginModal] = useState(false);

  // 'public' = Web en modo "Vista Previa" o "En Construcción"
  // 'artist' = ESTUDIO
  const [view, setView] = useState<'public' | 'artist'>('public');
  
  // 🛑 ESTADO CLAVE: Gestiona el Companion o la Demo del Certificado
  // Valor: Artwork ID (string) | 'CERTIFICATE_DEMO' | null
  const [selectedCompanionId, setSelectedCompanionId] = useState<string | null>(null); 
  
  // Hooks para el formulario de login (reutilizados para ambos candados)
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem('myriam_auth');
    const savedView = localStorage.getItem('myriam_view');

    if (savedAuth === 'true') {
        setIsAuthenticated(true);
        setView((savedView as 'public' | 'artist') || 'public');
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      setIsAuthenticated(true);
      setError(false);
      setShowLoginModal(false);
      setShowStudioLoginModal(false);
      setView('artist'); // El login siempre lleva al modo Artista/Estudio
      localStorage.setItem('myriam_auth', 'true');
      localStorage.setItem('myriam_view', 'artist');
    } else {
      setError(true);
    }
    setPasswordInput("");
  };

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setView('public');
    localStorage.removeItem('myriam_auth');
    localStorage.removeItem('myriam_view');
  }, []);
  
  // Función para cerrar el modal de login (reutilizable)
  const closeLoginModal = () => {
    setShowLoginModal(false);
    setShowStudioLoginModal(false);
    setPasswordInput("");
    setError(false);
  };

  // 🛑 NUEVA FUNCIÓN CLAVE: Abre el Certificado Demo (llamado desde DigitalCompanion.tsx)
  const handleOpenCertificateDemo = () => {
      // 1. Cierra el Companion y 2. Abre el Certificado
      setSelectedCompanionId('CERTIFICATE_DEMO'); 
  }

  // 🛑 NUEVO COMPONENTE CLAVE: Renderiza el Certificado Demo en un Iframe para simular el PDF
  const renderCertificateDemo = () => {
      const htmlContent = getCertificateDemoHtmlContent();
      
      return (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-[210mm] w-full relative animate-scale-in flex flex-col h-[95vh]">
                
                {/* Header */}
                <header className="flex justify-between items-center p-4 border-b border-stone-100 bg-white rounded-t-xl sticky top-0 z-10">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                        <Shield size={22} className="text-gold-500" /> Demo Certificado de Autenticidad
                    </h2>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => alert("Simulación de Impresión / Exportación a PDF")}
                            className="p-2 rounded text-slate-700 bg-slate-100 hover:bg-gold-500 hover:text-white transition-colors"
                            title="Imprimir"
                        >
                            <Printer size={20} />
                        </button>
                        <button 
                            onClick={() => setSelectedCompanionId(null)} 
                            className="p-1 rounded-full text-slate-400 hover:text-red-500 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </header>
                
                {/* Contenido del Certificado en Iframe */}
                <iframe 
                    srcDoc={htmlContent} 
                    className="flex-1 w-full border-none rounded-b-xl"
                    title="Certificado de Autenticidad Demo"
                ></iframe>

            </div>
        </div>
      );
  }


  // --- RENDERIZADO PRINCIPAL ---
  return (
    <div className="min-h-screen">
      
      {/* 1. MODO ARTISTA (DASHBOARD) */}
      {view === 'artist' ? (
        <ArtistDashboard onLogout={handleLogout} />
      ) : (
        // 2. MODO PÚBLICO (SITIO WEB)
        <PublicSite 
          onOpenCompanion={setSelectedCompanionId} 
          onOpenStudioLogin={() => setShowStudioLoginModal(true)} // Abre el segundo candado
        />
      )}

      {/* --- MODAL DE LOGIN (REUTILIZADO) --- */}
      {(showLoginModal || showStudioLoginModal) && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-8 relative animate-scale-in">
                
              <button 
                onClick={closeLoginModal} 
                className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-red-500 transition-colors"
              >
                  <X size={24} />
              </button>
              
              <Lock size={40} className="text-gold-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">Acceso a {showStudioLoginModal ? 'Estudio' : 'Vista Previa'}</h2>
              <p className="text-sm text-slate-500 text-center mb-6">
                {showStudioLoginModal 
                    ? 'Introduce la clave de artista para acceder al Dashboard.' 
                    : 'Accede como Artista/Curador para el modo Estudio.'}
              </p>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="password" className="sr-only">Clave</label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        setError(false);
                      }}
                      placeholder="Introduce la clave"
                      className={`w-full p-3 pr-12 rounded-lg text-sm bg-stone-50 outline-none transition-all focus:border-gold-500 ${
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
                </div>
                {error && <p className="text-xs text-red-500 text-center font-bold">Clave incorrecta</p>}
                <button type="submit" className="bg-gold-500 text-white py-3 rounded-lg font-bold hover:bg-gold-600 transition-colors text-sm tracking-wider flex items-center justify-center gap-2">
                    ACCEDER AL ESTUDIO <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
      )}

      {/* 🛑 RENDERIZADO CONDICIONAL CRÍTICO 🛑 */}
      
      {/* 3. CERTIFICADO DIGITAL (DEMO) */}
      {selectedCompanionId === 'CERTIFICATE_DEMO' && renderCertificateDemo()}

      {/* 4. COMPAÑERO DIGITAL (LUPA/INFO) - SOLO si el ID NO es el de la demo */}
      {selectedCompanionId && selectedCompanionId !== 'CERTIFICATE_DEMO' && (
        <DigitalCompanion 
          artworkId={selectedCompanionId} 
          onClose={() => setSelectedCompanionId(null)} 
          showCertificateAccess={view === 'artist'} 
          // 🛑 PROP CLAVE: Pasa la función para abrir el modal del certificado
          onOpenCertificateDemo={handleOpenCertificateDemo}
        />
      )}
    </div>
  );
};

export default App;