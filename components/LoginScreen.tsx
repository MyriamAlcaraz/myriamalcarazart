// ARCHIVO: src/components/LoginScreen.tsx (CÓDIGO COMPLETO Y FIABLE)

import React, { useState } from 'react';
import { Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { PASSWORD } from '../constants'; 

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      localStorage.setItem('myriam_auth', 'true');
      onLoginSuccess(); 
      setError(false);
    } else {
      setError(true);
      setPasswordInput(""); 
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4 font-serif">
      <div className="text-center max-w-md bg-white p-8 rounded-xl shadow-2xl border border-stone-100 animate-fade-in">
        
        <Lock size={48} className="text-gold-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Acceso a Estudio Privado</h1>
        <p className="text-gray-600 mb-6">Introduce la clave de artista para acceder a la gestión y vista previa de la web.</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Clave: arte2025"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                if (error) setError(false);
              }}
              className={`w-full p-3 pr-12 text-lg border-2 rounded-lg transition-all focus:ring-2 focus:ring-gold-500 focus:border-gold-500 ${
                error ? 'border-red-500' : 'border-stone-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gold-500"
              aria-label={showPassword ? "Ocultar clave" : "Mostrar clave"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {error && (
            <p className="text-sm text-red-500 font-sans mt-[-8px]">Clave incorrecta. Vuelve a intentarlo.</p>
          )}

          <button
            type="submit"
            className="flex items-center justify-center gap-3 bg-gold-500 text-white p-3 rounded-lg font-bold hover:bg-gold-600 transition-all shadow-md shadow-gold-500/30"
          >
            ACCEDER AL ESTUDIO <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};