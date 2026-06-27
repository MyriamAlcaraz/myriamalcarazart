import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import PublicSite from './components/PublicSite';
import { ArtistDashboard } from './components/ArtistDashboard';
import { DigitalCompanion } from './components/DigitalCompanion';
import { ArrowRight, Eye, EyeOff, X, Shield } from 'lucide-react';

// --- CONFIGURACIÓN DE SEGURIDAD (PASSWORD) ---
const PASSWORD = "arte2026";

const App: React.FC = () => {
  // --- ESTADO Y HOOKS ---
  // 🛑 ESTADO: Para el candado (acceso a ESTUDIO/TALLER)
  const [showStudioLoginModal, setShowStudioLoginModal] = useState(false);

  // 'public' = Web pública (con todas sus pestañas incluida Giclée)
  // 'artist' = ESTUDIO (panel de gestión privado)
  const [view, setView] = useState<'public' | 'artist'>('public');
  const [selectedCompanionId, setSelectedCompanionId] = useState<string | null>(null);

  // Hooks para el formulario de login del ESTUDIO
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handler para el candado (Acceso al ESTUDIO/TALLER)
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

  // Volver a la vista pública desde el ESTUDIO
  const handleLogout = () => {
    setView('public');
  };

  // ---------------------------------------------------------
  // CONTENIDO DE LA APP (Web Pública)
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen animate-fade-in relative">

      {/* VISTA PRINCIPAL (Alterna entre PublicSite y ArtistDashboard) */}
      {view === 'public' ? (
        <PublicSite
          onOpenCompanion={(id) => setSelectedCompanionId(id)}
          onOpenStudioLogin={() => setShowStudioLoginModal(true)}
          onOpenGiclee={() => {}}
        />
      ) : (
        <ArtistDashboard onLogout={handleLogout} />
      )}

      {/* 🛡️ Botón para volver a la web pública (solo visible en modo ESTUDIO) */}
      {view === 'artist' && (
        <div className="fixed bottom-4 right-4 z-[9999]">
          <button
            onClick={() => setView('public')}
            className="p-3 rounded-full bg-slate-900/50 backdrop-blur shadow-xl hover:scale-110 text-white/70 hover:text-gold-500 transition-all"
            title="Volver a la Web Pública"
          >
            <Eye size={18} />
          </button>
        </div>
      )}

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
              <h2 className="text-xl font-bold text-slate-800">Acceso a ESTUDIO</h2>
              <p className="text-sm text-slate-500">Introduce la clave para acceder a la gestión.</p>
            </div>

            {/* Utiliza el handler handleStudioLogin (CORREGIDO) */}
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
                  className={`w-full p-3 pr-12 text-center border-2 rounded-lg outline-none transition-all focus:border-gold-500 ${error ? 'border-red-500 bg-red-50' : 'border-stone-200'
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

      {/* Vercel Analytics — métricas de tráfico anónimas */}
      <Analytics />
    </div>
  );
};

export default App;