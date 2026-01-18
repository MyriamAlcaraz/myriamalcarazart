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
    // Demo instantánea y simple
    const demoWindow = window.open('', 'demo', 'width=800,height=600,scrollbars=yes,resizable=yes');
    
    if (demoWindow) {
      demoWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Analizador Técnico del Color - Demo</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              margin: 0; 
              padding: 20px; 
              color: white;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
            .container {
              background: white;
              border-radius: 20px;
              padding: 40px;
              box-shadow: 0 20px 40px rgba(0,0,0,0.2);
              text-align: center;
              max-width: 500px;
              color: #333;
            }
            .icon {
              width: 80px;
              height: 80px;
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
              border-radius: 50%;
              margin: 0 auto 20px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            h1 { color: #333; margin-bottom: 20px; font-size: 24px; }
            p { color: #666; line-height: 1.6; margin-bottom: 30px; }
            .features {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 10px;
              margin: 20px 0;
              text-align: left;
            }
            .feature { margin: 10px 0; }
            .buy-btn {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border: none;
              padding: 15px 30px;
              border-radius: 30px;
              font-size: 16px;
              font-weight: bold;
              cursor: pointer;
              text-decoration: none;
              display: inline-block;
              transition: transform 0.3s ease;
            }
            .buy-btn:hover { transform: translateY(-2px); }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h1>Analizador Técnico del Color</h1>
            <p>Descubre los pigmentos y recetas exactas de tus obras con inteligencia artificial.</p>
            
            <div class="features">
              <div class="feature">🎨 <strong>Análisis de Pigmentos:</strong> Identifica PW6, PR101, PY42...</div>
              <div class="feature">📊 <strong>Recetas de Mezcla:</strong> Porcentajes precisos</div>
              <div class="feature">🏷️ <strong>Referencias de Marcas:</strong> Winsor & Newton, Old Holland...</div>
            </div>
            
            <a href="https://496114690192.gumroad.com/l/owesfb" target="_blank" class="buy-btn">
              Adquirir Versión Completa - €46.99
            </a>
          </div>
        </body>
        </html>
      `);
      demoWindow.document.close();
    }
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