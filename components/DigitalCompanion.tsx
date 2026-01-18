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
          <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="font-serif text-xl font-bold text-slate-900 mb-3">Demo Utilizada</h3>
          <p class="text-slate-600 mb-6 leading-relaxed">
            Su evaluación gratuita del Analizador Técnico del Color ha sido utilizada. 
            Para acceder al análisis completo y sin limitaciones, adquiera la versión profesional.
          </p>
          <div class="space-y-3">
            <button onclick="this.closest('.fixed').remove()" class="w-full bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors">
              Cerrar
            </button>
            <a href="https://496114690192.gumroad.com/l/owesfb" target="_blank" class="block w-full bg-gold-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gold-600 transition-colors">
              Adquirir Versión Completa
            </a>
          </div>
        </div>
      `;
      document.body.appendChild(message);
      return;
    }

    // Primera vez usando la demo
    localStorage.setItem('analyzer_demo_used', 'true');
    setDemoUsed(true);

    const message = document.createElement('div');
    message.className = 'fixed inset-0 z-[130] bg-black/90 flex justify-center items-center p-4';
    message.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 text-center">
        <div class="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <h3 class="font-serif text-2xl font-bold text-slate-900 mb-4">Análisis Técnico Iniciado</h3>
        <div class="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-6 mb-6">
          <p class="text-slate-700 leading-relaxed mb-4">
            <span class="font-semibold text-gold-600">Demo de Evaluación Activada</span><br/>
            Sistema analizando muestra cromática con 12 pigmentos referenciales.
          </p>
          <div class="grid grid-cols-3 gap-2 text-xs text-slate-600">
            <div class="bg-white p-2 rounded">🔴 Rojo Óxido</div>
            <div class="bg-white p-2 rounded">🔵 Azul Cobalto</div>
            <div class="bg-white p-2 rounded">🟡 Amarillo Ocre</div>
            <div class="bg-white p-2 rounded">🟢 Verde Esmeralda</div>
            <div class="bg-white p-2 rounded">🟣 Violeta</div>
            <div class="bg-white p-2 rounded">⚪ Blanco Titanio</div>
          </div>
        </div>
        <div class="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 text-left">
          <p class="text-sm text-amber-800">
            <span class="font-semibold">Versión Profesional Incluye:</span><br/>
            • Análisis ilimitado de obras personales<br/>
            • Identificación precisa de pigmentos (PW6, PR101, PY42...)<br/>
            • Recetas de mezcla con porcentajes exactos<br/>
            • Referencias cruzadas de 3 marcas premium
          </p>
        </div>
        <div class="space-y-3">
          <button onclick="this.closest('.fixed').remove()" class="w-full bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors">
            Cerrar Demo
          </button>
          <a href="https://496114690192.gumroad.com/l/owesfb" target="_blank" class="block w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-gold-600 hover:to-gold-700 transition-all shadow-lg">
            Acceder a Versión Completa - €46.99
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(message);
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
                <h4 className="font-semibold text-slate-800">Demo Interactiva</h4>
                <p className="text-sm text-slate-600">
                  Arrastra una imagen aquí para ver cómo funciona el análisis
                </p>
                <button 
                  onClick={handleDemoClick}
                  className="bg-gold-500 text-white px-6 py-2 rounded-lg hover:bg-gold-600 transition-colors"
                >
                  Probar con Imagen de Ejemplo
                </button>
              </div>
            </div>
            
            {/* Características */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h5 className="font-semibold text-slate-800 mb-2">Composición</h5>
                <p className="text-sm text-slate-600">Análisis de estructura, equilibrio y flujo visual</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h5 className="font-semibold text-slate-800 mb-2">Cromatismo</h5>
                <p className="text-sm text-slate-600">Estudio de paleta, armonía y contraste cromático</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h5 className="font-semibold text-slate-800 mb-2">Certificado</h5>
                <p className="text-sm text-slate-600">Genera certificado de autenticidad digital</p>
              </div>
            </div>
            
            {/* Llamada a la acción */}
            <div className="bg-gradient-to-r from-gold-500 to-gold-600 p-6 rounded-xl text-white text-center">
              <h4 className="font-serif text-xl font-bold mb-2">Próximamente Disponible</h4>
              <p className="mb-4">Sé el primero en acceder a esta herramienta revolucionaria</p>
              <a 
                href={`mailto:${ARTIST_INFO.email}?subject=Interés en Analizador Técnico del Color&body=Hola Myriam, estoy interesado en el Analizador Técnico del Color. Por favor, avísenme cuando esté disponible.`}
                className="bg-white text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-slate-100 transition-colors inline-flex items-center gap-2"
              >
                <Mail size={18} /> Solicitar Acceso Prioritario
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