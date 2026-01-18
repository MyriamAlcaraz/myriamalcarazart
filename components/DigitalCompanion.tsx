import React, { useState, useRef, useEffect } from 'react';
import { Shield, Image as ImageIcon, ZoomIn, Printer, X, AlertTriangle, Mail } from 'lucide-react'; 
import { ARTWORKS, ARTIST_INFO } from '../constants';
import { Certificate } from './Certificate';

interface DigitalCompanionProps {
  artworkId: string | null;
  onClose: () => void;
  showCertificateAccess: boolean; // TRUE solo en MODO ESTUDIO
  initialMode?: 'lupa' | 'certificate'; 
}

export const DigitalCompanion: React.FC<DigitalCompanionProps> = ({ 
    artworkId, 
    onClose,
    showCertificateAccess, 
    initialMode = 'lupa' 
}) => {
  const artwork = artworkId === 'ANALYZER_DEMO' ? null : ARTWORKS.find(a => a.id === artworkId) || ARTWORKS[0];
  
  const [showCertificate, setShowCertificate] = useState(initialMode === 'certificate');
  const [showZoom, setShowZoom] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const [demoUsed, setDemoUsed] = useState(false);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  const displayYear = artwork && artwork.year && artwork.year.toString().trim() !== '' 
                      ? artwork.year 
                      : '2025'; 
  
  // Verificar si el usuario ya usó la demo
  useEffect(() => {
    const hasUsedDemo = localStorage.getItem('analyzer_demo_used');
    if (hasUsedDemo === 'true') {
      setDemoUsed(true);
    }
  }, []);

  const handleDemoClick = () => {
    if (demoUsed) {
      // Mensaje elegante para usuarios que ya usaron la demo
      const message = document.createElement('div');
      message.className = 'fixed inset-0 z-[130] bg-black/90 flex justify-center items-center p-4';
      message.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="font-serif text-xl font-bold text-slate-900 mb-3">Experiencia Completada</h3>
          <p class="text-slate-600 mb-6 leading-relaxed">
            Su sesión de evaluación del Analizador Técnico ha concluido. 
            Para continuar utilizando el sistema sin interrupciones, adquiera la versión profesional.
          </p>
          <div class="space-y-3">
            <button onclick="this.closest('.fixed').remove()" class="w-full bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors">
              Cerrar
            </button>
            <a href="https://496114690192.gumroad.com/l/owesfb" target="_blank" class="block w-full bg-gold-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gold-600 transition-colors">
              Acceder a Versión Completa
            </a>
          </div>
        </div>
      `;
      document.body.appendChild(message);
      return;
    }

    // Verificar si es administrador (para pruebas)
    const isAdmin = localStorage.getItem('is_admin') === 'true';
    if (isAdmin) {
      // Modo administrador - permite múltiples pruebas
      const adminMessage = document.createElement('div');
      adminMessage.className = 'fixed inset-0 z-[130] bg-black/90 flex justify-center items-center p-4';
      adminMessage.innerHTML = `
        <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center text-white">
          <div class="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="font-serif text-xl font-bold mb-3">Modo Administrador</h3>
          <p class="text-slate-300 mb-6 leading-relaxed">
            Acceso de prueba ilimitado para verificar el funcionamiento del sistema.
          </p>
          <div class="bg-slate-700 rounded-lg p-4 mb-6 text-left">
            <p class="text-sm text-slate-300 mb-2">✅ Demo sin restricciones</p>
            <p class="text-sm text-slate-300 mb-2">✅ Múltiples pruebas permitidas</p>
            <p class="text-slate-300">✅ Timer desactivado</p>
          </div>
          <div class="space-y-3">
            <button onclick="this.closest('.fixed').remove()" class="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-gold-600 hover:to-gold-700 transition-all">
              Abrir Aplicación
            </button>
            <button onclick="localStorage.removeItem('is_admin'); this.closest('.fixed').remove()" class="w-full bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors">
              Salir Modo Admin
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(adminMessage);

      // Abrir la aplicación directamente sin restricciones
      const appWindow = window.open('http://localhost:5173/analizador-color.html', 'admin-demo', 'width=1200,height=800,scrollbars=yes,resizable=yes');
      return;
    }

    // Primera vez - marcar como usado inmediatamente para evitar trampas
    localStorage.setItem('analyzer_demo_used', 'true');
    setDemoUsed(true);

    // Mensaje informativo antes de abrir
    const infoMessage = document.createElement('div');
    infoMessage.className = 'fixed inset-0 z-[130] bg-black/90 flex justify-center items-center p-4';
    infoMessage.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
        <div class="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 class="font-serif text-xl font-bold text-slate-900 mb-3">Demo de Evaluación</h3>
        <p class="text-slate-600 mb-6 leading-relaxed">
          Tendrá <span class="font-bold text-gold-600">5 minutos</span> para explorar el Analizador Técnico del Color. 
          Esta es su única oportunidad de evaluación gratuita.
        </p>
        <div class="bg-slate-50 rounded-lg p-4 mb-6 text-left">
          <p class="text-sm text-slate-700 mb-2">✅ Suba sus propias imágenes</p>
          <p class="text-sm text-slate-700 mb-2">✅ Analice colores y pigmentos</p>
          <p class="text-sm text-slate-700">✅ Explore todas las funciones</p>
        </div>
        <div class="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-lg p-4 mb-6">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm text-slate-700 font-medium leading-relaxed">
                <span class="text-amber-600 font-semibold">Nota importante:</span> Esta sesión de evaluación es única e irrepetible. 
                El cronómetro se iniciará automáticamente al procesar su primera imagen.
              </p>
            </div>
          </div>
        </div>
        <button onclick="this.closest('.fixed').remove()" class="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-gold-600 hover:to-gold-700 transition-all">
          Comenzar Demo - 5 Minutos
        </button>
      </div>
    `;
    document.body.appendChild(infoMessage);

    // Esperar a que el usuario haga clic para comenzar
    setTimeout(() => {
      infoMessage.remove();
      
      // Abrir la aplicación real en una nueva ventana
      const appWindow = window.open('http://localhost:5173/analizador-color.html', 'demo', 'width=1200,height=800,scrollbars=yes,resizable=yes');
      
      // Crear mensaje de espera (sin timer todavía)
      const waitMessage = document.createElement('div');
      waitMessage.className = 'fixed top-4 right-4 z-[140] bg-white rounded-lg shadow-2xl p-4 max-w-sm';
      waitMessage.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <p class="font-semibold text-slate-900">Esperando Imagen</p>
            <p class="text-sm text-slate-600">Suba una foto para comenzar</p>
          </div>
        </div>
      `;
      document.body.appendChild(waitMessage);

      // Variable para controlar si el timer ha comenzado
      let timerStarted = false;
      let timerInterval = null;
      let timeLeft = 300; // 5 minutos
      let windowClosed = false;

      const startTimer = () => {
        if (timerStarted || windowClosed) return;
        timerStarted = true;

        // Reemplazar mensaje de espera con timer activo
        waitMessage.innerHTML = `
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p class="font-semibold text-slate-900">Sesión Activa</p>
              <p class="text-sm text-slate-600">Tiempo restante: <span id="demo-timer" class="font-mono text-gold-600">05:00</span></p>
            </div>
          </div>
          <div class="mt-2">
            <div class="w-full bg-slate-200 rounded-full h-1">
              <div id="timer-progress" class="bg-gradient-to-r from-gold-400 to-gold-600 h-1 rounded-full transition-all duration-1000" style="width: 100%"></div>
            </div>
          </div>
        `;

        const timerElement = document.getElementById('demo-timer');
        const progressBar = document.getElementById('timer-progress');
        
        timerInterval = setInterval(() => {
          if (windowClosed) {
            clearInterval(timerInterval);
            return;
          }
          
          timeLeft--;
          const minutes = Math.floor(timeLeft / 60);
          const seconds = timeLeft % 60;
          timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          progressBar.style.width = `${(timeLeft / 300) * 100}%`;
          
          if (timeLeft <= 0) {
            clearInterval(timerInterval);
            waitMessage.remove();
            
            // Cerrar la ventana de la aplicación
            if (appWindow && !appWindow.closed) {
              appWindow.close();
            }
            
            // Mostrar mensaje de compra
            const purchaseMessage = document.createElement('div');
            purchaseMessage.className = 'fixed inset-0 z-[130] bg-black/90 flex justify-center items-center p-4';
            purchaseMessage.innerHTML = `
              <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
                <div class="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                  </svg>
                </div>
                <h3 class="font-serif text-xl font-bold text-slate-900 mb-3">Demo Concluida</h3>
                <p class="text-slate-600 mb-6">
                  Espero que haya disfrutado explorando el Analizador Técnico. 
                  Para continuar utilizando todas las funciones sin limitaciones, acceda a la versión completa.
                </p>
                <a href="https://496114690192.gumroad.com/l/owesfb" target="_blank" class="block w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-gold-600 hover:to-gold-700 transition-all">
                  Adquirir Versión Profesional - €46.99
                </a>
              </div>
            `;
            document.body.appendChild(purchaseMessage);
          }
        }, 1000);
      };

      // Simular detección de subida de imagen (monitorear la ventana)
      const checkImageUpload = setInterval(() => {
        if (appWindow && !appWindow.closed) {
          try {
            // Intentar detectar si se ha subido una imagen
            // Esto es una simulación - en la app real necesitaríamos comunicación entre ventanas
            // Por ahora, iniciamos el timer después de 30 segundos simulando que subieron una imagen
            if (!timerStarted) {
              setTimeout(() => {
                if (!timerStarted && appWindow && !appWindow.closed && !windowClosed) {
                  startTimer();
                }
              }, 30000); // 30 segundos para que suban una imagen
            }
          } catch (e) {
            // Error al acceder a la ventana
          }
        } else {
          windowClosed = true;
          clearInterval(checkImageUpload);
          clearInterval(timerInterval);
          waitMessage.remove();
        }
      }, 1000);

      // Cerrar todo si se cierra la ventana
      const checkWindow = setInterval(() => {
        if (appWindow && appWindow.closed) {
          windowClosed = true;
          clearInterval(checkWindow);
          clearInterval(timerInterval);
          clearInterval(checkImageUpload);
          waitMessage.remove();
        }
      }, 1000);
    }, 3000); // 3 segundos para leer el mensaje
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgContainerRef.current || !artwork) return;
    const { left, top, width, height } = imgContainerRef.current.getBoundingClientRect();
    
    let x = e.clientX - left; 
    let y = e.clientY - top;

    if(x < 0) x = 0; if(x > width) x = width;
    if(y < 0) y = 0; if(y > height) y = height;

    const zoomFactor = 3.5;
    const backgroundPositionX = (x / width) * 100;
    const backgroundPositionY = (y / height) * 100;

    setZoomStyle({
      backgroundImage: `url(${artwork.image})`,
      backgroundPosition: `${backgroundPositionX}% ${backgroundPositionY}%`,
      backgroundSize: `${width * zoomFactor}px ${height * zoomFactor}px`,
      top: y + 20, 
      left: x + 20,
    });
  };

  // Si es el demo del Analizador Técnico
  if (artworkId === 'ANALYZER_DEMO') {
    return (
      <div className="fixed inset-0 z-[110] bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-12 overflow-y-auto flex justify-center items-center">
        <button 
          onClick={onClose} 
          className="fixed top-6 right-6 z-[120] bg-white text-slate-900 p-3 rounded-full hover:bg-red-500 hover:text-white shadow-xl"
        >
          <X size={24} />
        </button>
        
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header del Analizador */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white text-center rounded-t-2xl">
            <div className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="font-serif text-3xl font-bold mb-2">Analizador Técnico del Color</h2>
            <p className="text-gold-400 italic">Herramienta Digital Exclusiva para Artistas</p>
          </div>
          
          {/* Contenido del Demo */}
          <div className="p-8 space-y-8">
            <div className="text-center">
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-4">Análisis Avanzado de Obra</h3>
              <p className="text-slate-600 mb-6">
                Sube una imagen de tu obra y recibe un análisis técnico completo con inteligencia artificial
              </p>
            </div>
            
            {/* Demo Interactivo */}
            <div className="bg-slate-50 p-6 rounded-xl border-2 border-dashed border-gold-500 text-center">
              <div className="space-y-4">
                <div className="w-32 h-32 bg-gold-100 rounded-full mx-auto flex items-center justify-center">
                  <ImageIcon size={48} className="text-gold-600" />
                </div>
                <h4 className="font-semibold text-slate-800">Demo Visual</h4>
                <p className="text-sm text-slate-600">
                  Descubre cómo funciona el análisis técnico del color
                </p>
                
                {/* Video de demostración corregido */}
                <div className="relative rounded-lg overflow-hidden bg-black shadow-lg max-w-md mx-auto">
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-white font-medium mb-2">Demo del Analizador</p>
                      <p className="text-slate-300 text-sm">Video de demostración</p>
                      <p className="text-slate-400 text-xs mt-2">Próximamente disponible</p>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={handleDemoClick}
                  className="bg-gold-500 text-white px-6 py-2 rounded-lg hover:bg-gold-600 transition-colors"
                >
                  Probar Versión Interactiva
                </button>
              </div>
            </div>
            
            {/* Llamada a la acción */}
            <div className="bg-gradient-to-r from-gold-500 to-gold-600 p-6 rounded-xl text-white text-center">
              <h4 className="font-serif text-xl font-bold mb-2">Disfruta y Explora</h4>
              <p className="mb-4">Descubre el poder del análisis técnico del color en tu proceso creativo</p>
              <a 
                href="https://496114690192.gumroad.com/l/owesfb"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-slate-100 transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Adquirir Ahora - €46.99
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si se está mostrando el certificado, renderiza solo el certificado
  if (showCertificate) {
    return (
        <div className="fixed inset-0 z-[110] bg-black/90 p-4 md:p-12 overflow-y-auto flex justify-center items-start print-clean-background">
            <button 
                onClick={initialMode === 'certificate' ? onClose : () => setShowCertificate(false)} 
                className="fixed top-6 right-6 z-[120] bg-white text-slate-900 p-3 rounded-full hover:bg-red-500 hover:text-white shadow-xl"
            >
                <X size={24} />
            </button>
            <div className="transform scale-[0.6] md:scale-90 origin-top">
                
                {/* 🛑 MODIFICACIÓN CLAVE: El mensaje solo se muestra si SÍ tenemos acceso al certificado (Modo Taller) */}
                {showCertificateAccess && (
                    <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-900 p-4 mb-4" role="alert">
                        <p className="font-bold flex items-center gap-2"><AlertTriangle size={16}/> NOTA DE IMPRESIÓN</p>
                        <p className="text-sm">Recuerda usar el botón **Imprimir Original** en la parte inferior para generar el PDF listo.</p>
                    </div>
                )}
                {/* FIN DE LA MODIFICACIÓN */}
                
                <Certificate artwork={artwork} isPixelatedDemo={!showCertificateAccess} /> 
            </div>
            
            {/* BOTÓN DE IMPRESIÓN (Solo visible si es MODO ESTUDIO) */}
            {showCertificateAccess && (
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
                    <button 
                        onClick={() => window.print()} 
                        className="bg-gold-600 text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-gold-700 text-sm font-bold shadow-xl"
                    >
                        <Printer size={18}/> IMPRIMIR ORIGINAL
                    </button>
                </div>
            )}
        </div>
    );
  }

  // Vista por defecto (Lupa)
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center items-center p-4 md:p-8">
      
      {/* Botón de cierre */}
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 z-50 bg-white text-slate-900 p-3 rounded-full hover:bg-red-500 hover:text-white shadow-xl transition-colors"
      >
        <X size={24} />
      </button>

      {/* Contenedor Principal */}
      <div className="bg-white rounded-xl shadow-2xl flex flex-col lg:flex-row max-w-5xl w-full max-h-[95vh] overflow-hidden">
        
        {/* Lado Izquierdo: Imagen y Lupa */}
        <div className="lg:w-1/2 relative bg-slate-100 flex items-center justify-center p-4 flex-grow h-full max-h-full">
          <div 
            ref={imgContainerRef} 
            className="relative w-full h-full cursor-none overflow-hidden group"
            onMouseMove={handleMouseMove} 
            onMouseEnter={() => setShowZoom(true)} 
            onMouseLeave={() => setShowZoom(false)} 
          >
            <img 
              src={artwork.image} 
              alt={artwork.title} 
              className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-80"
            />
            
            {/* LUPA (Magnifier) */}
            {showZoom && (
              <div 
                className="absolute w-36 h-36 border-4 border-gold-500 rounded-full shadow-2xl pointer-events-none transform -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-black/50 transition-opacity duration-200"
                style={zoomStyle}
              >
              </div>
            )}

            {/* Icono de Lupa Hint */}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white p-2 rounded-full flex items-center gap-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={16} /> Detalle de Lujo
            </div>
          </div>
        </div>
        
        {/* Lado Derecho: Metadatos y CTA */}
        <div className="lg:w-1/2 p-8 overflow-y-auto">
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-2">{artwork.title}</h2>
          <p className="text-sm uppercase tracking-widest text-gold-600 font-semibold mb-4">{artwork.technique}</p>

          <div className="space-y-4 border-y border-stone-200 py-6 mb-8">
            <p className="text-slate-600"><span className="font-bold text-slate-800">Dimensiones:</span> {artwork.dimensions}</p>
            <p className="text-slate-600"><span className="font-bold text-slate-800">Año:</span> {displayYear}</p>
            <p className="text-slate-600"><span className="font-bold text-slate-800">Disponibilidad:</span> {artwork.status === 'available' ? 'Disponible para colección' : 'En colección privada (Posible Giclée)'}</p>
          </div>

          <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Narrativa de la Obra</h3>
          <p className="text-slate-700 leading-relaxed mb-6">{artwork.description}</p>

          <div className="space-y-4 pt-4">
            {/* 1. Botón de Certificado (Demo/Real) */}
            <button
                onClick={() => setShowCertificate(true)}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white p-3 rounded font-bold hover:bg-gold-600 transition-colors shadow-md"
            >
                <Shield size={18} /> Ver Demo Certificado
            </button>

            {/* 2. Botón de Consulta / Venta */}
            <a 
              href={`mailto:${ARTIST_INFO.email}?subject=Consulta de Obra: ${artwork.title}`}
              className="w-full flex items-center justify-center gap-2 bg-gold-500 text-white p-3 rounded font-bold hover:bg-gold-600 transition-colors shadow-md"
            >
              <Mail size={18} /> Solicitar Precio y Adquisición
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};