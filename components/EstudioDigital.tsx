import React, { useState, useMemo, useRef } from 'react';
import { ArrowLeft, Gift, Crown, Sparkles } from 'lucide-react';
import PanelCertificados from './PanelCertificados';

// ============================================
// TIPOS
// ============================================
type AppView = 'gallery' | 'composicion' | 'pigmentos' | 'analizador' | 'certificados';

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const EstudioDigital: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('gallery');

  return (
    <div className="space-y-12">
      {currentView === 'gallery' && <GalleryView onOpenApp={setCurrentView} />}
      {currentView === 'composicion' && <ComposicionAurea onBack={() => setCurrentView('gallery')} />}
      {currentView === 'pigmentos' && <DiccionarioPigmentos onBack={() => setCurrentView('gallery')} />}
      {currentView === 'analizador' && <AnalizadorPremium onBack={() => setCurrentView('gallery')} />}
      {currentView === 'certificados' && <PanelCertificados />}
    </div>
  );
};

// ============================================
// VISTA DE GALERÍA
// ============================================
const GalleryView: React.FC<{ onOpenApp: (app: AppView) => void }> = ({ onOpenApp }) => (
  <div className="space-y-16">
    {/* Header */}
    <header className="text-center max-w-4xl mx-auto pt-4">
      <p className="text-xs tracking-[0.5em] text-stone-400 uppercase mb-8 font-light">
        Laboratorio de Innovación Artística
      </p>
      <h2 className="font-serif text-5xl md:text-6xl text-slate-900 tracking-wide mb-8 leading-tight">
        Suite Digital para el Artista
      </h2>
      <div className="w-24 h-px bg-gold-500 mx-auto mb-10"></div>
      <p className="text-stone-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
        Donde la tradición pictórica se encuentra con la tecnología de vanguardia.
      </p>
    </header>

    {/* Mensaje de cortesía */}
    <div className="max-w-3xl mx-auto text-center">
      <div className="inline-flex items-center gap-3 border border-gold-300 bg-gold-50/50 px-6 py-3">
        <Gift size={20} className="text-gold-600" />
        <p className="text-gold-700 text-sm tracking-wide">
          Dos herramientas gratuitas como <span className="font-medium">cortesía de Myriam Alcaraz</span> para la comunidad artística
        </p>
      </div>
    </div>

    {/* Grid de Apps */}
    <section className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* APP 1: Composición Áurea - GRATIS */}
        <button
          onClick={() => onOpenApp('composicion')}
          className="group bg-white border border-stone-200 p-8 flex flex-col hover:border-gold-400 hover:shadow-xl transition-all duration-500 text-left"
        >
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-gold-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
              <svg className="w-10 h-10 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.3em] text-emerald-600 uppercase font-medium bg-emerald-50 px-3 py-1">
              <Gift size={12} /> Gratuito
            </span>
          </div>

          <h3 className="font-serif text-2xl text-slate-900 text-center mb-3 leading-snug">
            Master de Composición Áurea
          </h3>

<p className="text-stone-500 text-base leading-relaxed text-center flex-grow mb-6">
             Aplica la Regla de los Tercios a cualquier formato de lienzo.
             Encuentra los puntos de fuerza para una composición equilibrada.
           </p>

          <div className="border-t border-stone-100 pt-6 text-center">
            <span className="inline-block border border-gold-500 text-gold-600 py-3 px-8 text-sm tracking-[0.2em] uppercase group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
              Abrir herramienta
            </span>
          </div>
        </button>

        {/* APP 2: Diccionario de Pigmentos - GRATIS */}
        <button
          onClick={() => onOpenApp('pigmentos')}
          className="group bg-white border border-stone-200 p-8 flex flex-col hover:border-gold-400 hover:shadow-xl transition-all duration-500 text-left"
        >
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
              <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.3em] text-emerald-600 uppercase font-medium bg-emerald-50 px-3 py-1">
              <Gift size={12} /> Gratuito
            </span>
          </div>

          <h3 className="font-serif text-2xl text-slate-900 text-center mb-3 leading-snug">
            Diccionario de Pigmentos
          </h3>

          <p className="text-stone-500 text-base leading-relaxed text-center flex-grow mb-6">
            Consulta la opacidad, permanencia y comportamiento histórico de los pigmentos clásicos.
            Cadmios, Cobaltos, Tierras y más.
          </p>

          <div className="border-t border-stone-100 pt-6 text-center">
            <span className="inline-block border border-gold-500 text-gold-600 py-3 px-8 text-sm tracking-[0.2em] uppercase group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
              Abrir herramienta
            </span>
          </div>
        </button>

        {/* APP 3: Analizador Premium - DE PAGO */}
        <button
          onClick={() => onOpenApp('analizador')}
          className="group bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-8 flex flex-col hover:shadow-2xl transition-all duration-500 text-left relative overflow-hidden"
        >
          {/* Efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

          <div className="text-center mb-6 relative">
            <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-gold-500/30">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.3em] text-gold-400 uppercase font-medium bg-gold-500/20 px-3 py-1">
              <Sparkles size={12} /> Profesional
            </span>
          </div>

          <h3 className="font-serif text-2xl text-white text-center mb-3 leading-snug">
            Analizador Técnico de Pigmentos
          </h3>

          <p className="text-slate-400 text-base leading-relaxed text-center flex-grow mb-6">
            Inteligencia artificial para identificar pigmentos exactos.
            Paletas de Old Holland, Williamsburg y Winsor & Newton.
            La herramienta definitiva.
          </p>

          <div className="border-t border-slate-700 pt-6 text-center relative">
            <p className="text-2xl text-gold-400 font-light mb-4">47 <span className="text-base text-slate-500">EUR</span></p>
            <span className="inline-block bg-gold-500 text-white py-3 px-8 text-sm tracking-[0.2em] uppercase group-hover:bg-gold-400 transition-all duration-300">
              Acceder
            </span>
          </div>
        </button>

        {/* APP 4: Panel de Certificados - PROFESIONAL */}
        <button
          onClick={() => onOpenApp('certificados')}
          className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 flex flex-col hover:shadow-2xl transition-all duration-500 text-left relative overflow-hidden"
        >
          {/* Efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

          <div className="text-center mb-6 relative">
            <div className="w-20 h-20 bg-gradient-to-br from-gold-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-gold-500/30">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.3em] text-gold-400 uppercase font-medium bg-gold-500/20 px-3 py-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Profesional
            </span>
          </div>

          <h3 className="font-serif text-2xl text-white text-center mb-3 leading-snug">
            Panel de Certificados
          </h3>

          <p className="text-slate-400 text-base leading-relaxed text-center flex-grow mb-6">
            Sistema profesional de certificación y registro de obras.
            Gestión de hologramas y edición limitada.
          </p>

          <div className="border-t border-slate-700 pt-6 text-center relative">
            <p className="text-gold-400 text-sm mb-4">Gestión Completa</p>
            <span className="inline-block bg-gold-500 text-white py-3 px-8 text-sm tracking-[0.2em] uppercase group-hover:bg-gold-400 transition-all duration-300">
              Acceder
            </span>
          </div>
        </button>

      </div>
    </section>

    {/* Nota final */}
    <section className="text-center pt-4">
      <p className="text-stone-500 text-base leading-relaxed italic font-serif max-w-2xl mx-auto">
        "Herramientas creadas desde la experiencia real del estudio, para artistas que buscan la excelencia."
      </p>
    </section>
  </div>
);

// ============================================
// APP 1: COMPOSICIÓN ÁUREA - Herramienta de Precisión
// ============================================
const ComposicionAurea: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  // Estados principales
  const [width, setWidth] = useState<number>(100);
  const [height, setHeight] = useState<number>(81);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeOverlay, setActiveOverlay] = useState<'thirds'>('thirds');

  // Estados para drag & drop de la imagen
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Constante PHI
  const PHI = 1.618033988749895;

  // Referencia al contenedor
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Manejar subida de imagen
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calcular dimensiones del canvas
  const canvasSize = useMemo(() => {
    const maxWidth = 700;
    const maxHeight = 550;
    const ratio = width / height;

    if (ratio > maxWidth / maxHeight) {
      return { w: maxWidth, h: maxWidth / ratio };
    } else {
      return { w: maxHeight * ratio, h: maxHeight };
    }
  }, [width, height]);

  // Color de la rejilla
  const gridStroke = '#d4af37';

  

  // Handlers para Drag & Drop de la imagen
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!uploadedImage) return;
    
    setIsDragging(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setImagePosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset posición de la imagen
  const resetPosition = () => {
    setImagePosition({ x: 0, y: 0 });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-stone-400 hover:text-gold-600 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm tracking-widest uppercase">Volver</span>
        </button>
      </div>

      {/* Título */}
      <header className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-emerald-600 uppercase font-medium bg-emerald-50 px-4 py-2 mb-6">
          <Gift size={14} /> Herramienta gratuita
        </span>
<h2 className="font-serif text-4xl md:text-5xl text-slate-900 tracking-wide mb-4">
          Máster de Composición: Regla de los Tercios
        </h2>
        <p className="text-stone-500 text-lg leading-relaxed">
          Encuadra tu obra utilizando los puntos de fuerza para lograr un equilibrio visual perfecto.
        </p>
      </header>

      {/* Panel de Control */}
      <section className="max-w-5xl mx-auto">
        <div className="bg-white border border-stone-200 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

            {/* Subida de imagen */}
            <div className="col-span-2">
              <label className="block text-[10px] tracking-[0.2em] text-slate-500 uppercase mb-2">
                Tu obra
              </label>
              <label className="flex items-center justify-center h-12 border border-dashed border-stone-300 hover:border-gold-400 cursor-pointer bg-stone-50 hover:bg-stone-100 transition-colors">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                {uploadedImage ? (
                  <span className="text-sm text-emerald-600 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Imagen cargada
                  </span>
                ) : (
                  <span className="text-sm text-stone-500">Subir imagen</span>
                )}
              </label>
            </div>

            {/* Medidas */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] text-slate-500 uppercase mb-2">
                Ancho (cm)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full h-12 border border-stone-300 text-center text-lg focus:border-gold-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] text-slate-500 uppercase mb-2">
                Alto (cm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full h-12 border border-stone-300 text-center text-lg focus:border-gold-500 focus:outline-none"
              />
            </div>

            
          </div>

          {/* Control de Reset */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-stone-100">
            <button
              onClick={resetPosition}
              className="px-4 py-2 text-xs tracking-wide uppercase bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
            >
              Centrar imagen
            </button>
          </div>
        </div>
      </section>

      {/* Mesa de Composición */}
      <section className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 shadow-2xl">
          <div className="text-center mb-4">
<p className="text-[10px] tracking-[0.4em] text-slate-500 uppercase">
               Regla de los Tercios - Arrastra tu imagen para encuadrar
             </p>
          </div>

          {/* Canvas interactivo */}
          <div
            ref={containerRef}
            className="flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="relative shadow-2xl overflow-hidden"
              style={{
                width: canvasSize.w,
                height: canvasSize.h,
                maxWidth: '100%',
                cursor: uploadedImage ? (isDragging ? 'grabbing' : 'grab') : 'default'
              }}
              onMouseDown={handleMouseDown}
            >
{/* Imagen de fondo con drag */}
              {uploadedImage ? (
                <img 
                  src={uploadedImage} 
                  alt="Tu obra" 
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  style={{
                    transform: `translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                    transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                  }}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300" />
              )}

              {/* SVG con la rejilla de tercios fija */}
              <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${canvasSize.w} ${canvasSize.h}`}
                className="absolute inset-0 pointer-events-none"
              >
                {/* Regla de los Tercios - siempre cubre 100% del lienzo */}
                <g>
                  {/* Líneas verticales - muy finas para no molestar */}
                  <line x1={canvasSize.w / 3} y1="0" x2={canvasSize.w / 3} y2={canvasSize.h} stroke={gridStroke} strokeWidth="0.5" />
                  <line x1={(canvasSize.w * 2) / 3} y1="0" x2={(canvasSize.w * 2) / 3} y2={canvasSize.h} stroke={gridStroke} strokeWidth="0.5" />
                  
                  {/* Líneas horizontales - muy finas para no molestar */}
                  <line x1="0" y1={canvasSize.h / 3} x2={canvasSize.w} y2={canvasSize.h / 3} stroke={gridStroke} strokeWidth="0.5" />
                  <line x1="0" y1={(canvasSize.h * 2) / 3} x2={canvasSize.w} y2={(canvasSize.h * 2) / 3} stroke={gridStroke} strokeWidth="0.5" />
                  
                  {/* Puntos de interés - círculos sutiles de color oro en las intersecciones */}
                  {[
                    [canvasSize.w / 3, canvasSize.h / 3],
                    [(canvasSize.w * 2) / 3, canvasSize.h / 3],
                    [canvasSize.w / 3, (canvasSize.h * 2) / 3],
                    [(canvasSize.w * 2) / 3, (canvasSize.h * 2) / 3],
                  ].map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="3" fill="#d4af37" opacity="0.8" />
                  ))}
                </g>
              </svg>

              {/* Marco */}
              <div className="absolute inset-0 border border-slate-600 pointer-events-none" />
            </div>
          </div>

          {/* Info */}
          <div className="flex justify-center gap-6 mt-4 text-slate-500 text-xs tracking-wide">
            <span>Lienzo: {width} × {height} cm</span>
            <span>φ = 1.618</span>
          </div>
        </div>
      </section>

{/* Texto explicativo */}
      <section className="max-w-3xl mx-auto">
        <div className="bg-stone-50 border border-stone-200 p-8 text-center">
          <p className="text-stone-600 text-base leading-relaxed font-serif">
            <strong>La Regla de los Tercios ayuda a equilibrar tu obra.</strong> Coloca el centro de atención 
            (ojos, luces principales o elementos clave) sobre uno de los 4 puntos de intersección para crear 
            una composición dinámica y profesional.
          </p>
        </div>
      </section>
    </div>
  );
};

// ============================================
// APP 2: DICCIONARIO DE PIGMENTOS
// ============================================
const PIGMENTS_DATA = [
  // BLANCOS (más claros)
  { name: 'Blanco de Titanio', pigment: 'PW6', opacity: 'Opaco', permanence: 'Excelente', family: 'Winsor & Newton', color: '#ffffff', history: 'El blanco más cubriente y versátil. Desde 1921, reemplazó al tóxico Blanco de Plomo.' },
  { name: 'Blanco de Zinc', pigment: 'PW4', opacity: 'Semi-transparente', permanence: 'Excelente', family: 'Old Holland', color: '#f8f8f8', history: 'Blanco más frío y transparente. Ideal para veladuras y mezclas delicadas.' },
  { name: 'Blanco de Plata', pigment: 'PW7', opacity: 'Semi-opaco', permanence: 'Excelente', family: 'Williamsburg', color: '#f5f5f5', history: 'Blanco semicubriente con ligero tono amarillento. Excelente para piel.' },
  
  // AMARILLOS
  { name: 'Amarillo Cadmio Claro', pigment: 'PY35', opacity: 'Opaco', permanence: 'Excelente', family: 'Old Holland', color: '#fff44f', history: 'Amarillo limón brillante. Sintetizado en 1817, usado por Monet y Van Gogh.' },
  { name: 'Amarillo Cadmio Medio', pigment: 'PY37', opacity: 'Opaco', permanence: 'Excelente', family: 'Williamsburg', color: '#ffb300', history: 'El cadmio más versátil. Cálido y luminoso, ideal para mezclas con naranjas.' },
  { name: 'Amarillo Nápoles', pigment: 'PY41', opacity: 'Opaco', permanence: 'Excelente', family: 'Winsor & Newton', color: '#ffeb3b', history: 'Clásico amarillo italiano. Opaco y cálido, perfecto para arquitectura.' },
  { name: 'Amarillo Ocre', pigment: 'PY43', opacity: 'Semi-opaco', permanence: 'Excelente', family: 'Old Holland', color: '#cc7722', history: 'El pigmento más antiguo conocido. Usado desde el Renacimiento.' },
  
  // OCREs Y TIERRAS
  { name: 'Ocre Amarillo', pigment: 'PY43', opacity: 'Opaco', permanence: 'Excelente', family: 'Williamsburg', color: '#d4a76a', history: 'Tierra amarilla clásica. Estable y versátil para paisajes.' },
  { name: 'Siena Natural', pigment: 'PBr7', opacity: 'Transparente', permanence: 'Excelente', family: 'Winsor & Newton', color: '#a0522d', history: 'De la región de Siena, Italia. Ideal para veladuras cálidas.' },
  { name: 'Siena Tostada', pigment: 'PBr7', opacity: 'Transparente', permanence: 'Excelente', family: 'Old Holland', color: '#8b4513', history: 'Siena calcinada. Rembrandt la mezclaba con negros para sombras.' },
  { name: 'Sombra Natural', pigment: 'PBr7', opacity: 'Transparente', permanence: 'Excelente', family: 'Williamsburg', color: '#635147', history: 'De Umbría, Italia. Más fría que las Sienas. Velázquez la usó en fondos.' },
  { name: 'Sombra Tostada', pigment: 'PBr7', opacity: 'Semi-transparente', permanence: 'Excelente', family: 'Old Holland', color: '#4a3728', history: 'Marrón cálido profundo. Caravaggio construyó su claroscuro sobre esta base.' },
  
  // NARANJAS
  { name: 'Naranja Cadmio', pigment: 'PO20', opacity: 'Opaco', permanence: 'Excelente', family: 'Old Holland', color: '#ff6b35', history: 'Naranja cálido y vibrante. Excelente para mezclas de piel y atardeceres.' },
  { name: 'Naranja Cadmio Claro', pigment: 'PO20', opacity: 'Opaco', permanence: 'Excelente', family: 'Williamsburg', color: '#ffa502', history: 'Naranja brillante y luminoso. Excelente para resaltar y mezclas vibrantes.' },
  { name: 'Naranja Cadmio Brillante', pigment: 'PO20', opacity: 'Opaco', permanence: 'Excelente', family: 'Winsor & Newton', color: '#ff7675', history: 'Naranja intenso y brillante. Excelente cubrición y luminosidad.' },
  
  // ROJOS
  { name: 'Rojo Cadmio', pigment: 'PR108', opacity: 'Opaco', permanence: 'Excelente', family: 'Williamsburg', color: '#e63946', history: 'Disponible desde 1910. Reemplazó al Bermellón por su estabilidad.' },
  { name: 'Bermellón', pigment: 'PR106', opacity: 'Opaco', permanence: 'Buena', family: 'Old Holland', color: '#ff4757', history: 'Rojo histórico y vibrante. Usado por los grandes maestros. Requiere cuidado.' },
  { name: 'Bermellón Moderno', pigment: 'PR106', opacity: 'Opaco', permanence: 'Buena', family: 'Williamsburg', color: '#ff6348', history: 'Versión segura del bermellón clásico. Rojo vibrante y estable.' },
  { name: 'Bermellón Winsor', pigment: 'PR106', opacity: 'Opaco', permanence: 'Buena', family: 'Winsor & Newton', color: '#ff4757', history: 'Versión segura del bermellón clásico. Rojo vibrante y estable.' },
  
  // MAGENTAS Y QUINACRIDONAS
  { name: 'Magenta Quinacridona', pigment: 'PR122', opacity: 'Transparente', permanence: 'Excelente', family: 'Old Holland', color: '#e84393', history: 'Alta transparencia y gran poder de tinción. Magenta vibrante para mezclas modernas.' },
  { name: 'Rojo Quinacridona', pigment: 'PV19', opacity: 'Transparente', permanence: 'Excelente', family: 'Old Holland', color: '#d63031', history: 'Alta transparencia y gran poder de tinción. Rojo intenso y profundo, ideal para veladuras.' },
  { name: 'Magenta Brillante', pigment: 'PR122', opacity: 'Transparente', permanence: 'Excelente', family: 'Williamsburg', color: '#fd79a8', history: 'Alta transparencia y gran poder de tinción. Magenta vibrante y moderno.' },
  { name: 'Rojo Quinacridona Profundo', pigment: 'PV19', opacity: 'Transparente', permanence: 'Excelente', family: 'Williamsburg', color: '#c44569', history: 'Alta transparencia y gran poder de tinción. Rojo profundo y elegante.' },
  { name: 'Magenta Winsor', pigment: 'PR122', opacity: 'Transparente', permanence: 'Excelente', family: 'Winsor & Newton', color: '#e84393', history: 'Alta transparencia y gran poder de tinción. Magenta vibrante y puro.' },
  { name: 'Rojo Quinacridona Rosa', pigment: 'PV19', opacity: 'Transparente', permanence: 'Excelente', family: 'Winsor & Newton', color: '#fab1a0', history: 'Alta transparencia y gran poder de tinción. Rosado intenso y versátil.' },
  
  // CARMÍN Y ALCARAZ
  { name: 'Carmín Alizarina', pigment: 'PR83', opacity: 'Transparente', permanence: 'Excelente', family: 'Old Holland', color: '#e63946', history: 'Rojo profundo y transparente. Ideal para veladuras y mezclas de sombras.' },
  { name: 'Carmín Alizarina Permanente', pigment: 'PR83', opacity: 'Transparente', permanence: 'Excelente', family: 'Williamsburg', color: '#d63031', history: 'Rojo profundo y estable. Perfecto para veladuras y glaseados.' },
  { name: 'Carmín Alizarina Winsor', pigment: 'PR83', opacity: 'Transparente', permanence: 'Excelente', family: 'Winsor & Newton', color: '#ff6b9d', history: 'Rojo profundo y transparente. Perfecto para veladuras y flores.' },
  
  // VIOLETAS
  { name: 'Violeta Cobalto', pigment: 'PV14', opacity: 'Semi-opaco', permanence: 'Excelente', family: 'Old Holland', color: '#7f00ff', history: 'El violeta más permanente. Monet lo usó extensivamente en sus series de catedrales.' },
  { name: 'Violeta Quinacridona', pigment: 'PV19', opacity: 'Transparente', permanence: 'Excelente', family: 'Williamsburg', color: '#8e44ad', history: 'Violeta transparente y moderno. Ideal para flores y atmósferas.' },
  { name: 'Violeta Winsor', pigment: 'PV23', opacity: 'Semi-transparente', permanence: 'Excelente', family: 'Winsor & Newton', color: '#9b59b6', history: 'Violeta profundo y estable. Excelente para sombras y nocturnos.' },
  
  // AZULES
  { name: 'Azul Cerúleo', pigment: 'PB35', opacity: 'Opaco', permanence: 'Excelente', family: 'Old Holland', color: '#2a52be', history: 'Introducido en 1860. Perfecto para cielos por su tono frío y granulación.' },
  { name: 'Azul Cobalto', pigment: 'PB28', opacity: 'Semi-opaco', permanence: 'Excelente', family: 'Williamsburg', color: '#0047ab', history: 'Descubierto en 1802. Renoir lo consideraba indispensable. Secado rápido.' },
  { name: 'Azul Ultramar', pigment: 'PB29', opacity: 'Semi-opaco', permanence: 'Excelente', family: 'Old Holland', color: '#5f3dc4', history: 'Azul cálido y profundo. Excelente para atmósferas y sombras. Granulador natural.' },
  { name: 'Azul Ultramar Francés', pigment: 'PB29', opacity: 'Semi-opaco', permanence: 'Excelente', family: 'Williamsburg', color: '#6c5ce7', history: 'Azul cálido clásico. Granulador natural, ideal para atmósferas.' },
  { name: 'Azul Ultramar Winsor', pigment: 'PB29', opacity: 'Semi-opaco', permanence: 'Excelente', family: 'Winsor & Newton', color: '#a29bfe', history: 'Azul cálido y luminoso. Granulador natural, ideal para cielos.' },
  { name: 'Azul Real', pigment: 'PB29', opacity: 'Semi-opaco', permanence: 'Excelente', family: 'Old Holland', color: '#1e3a8a', history: 'Azul profundo y real. Excelente para marinas y cielos nocturnos.' },
  { name: 'Azul Real Profundo', pigment: 'PB29', opacity: 'Semi-opaco', permanence: 'Excelente', family: 'Williamsburg', color: '#2d3436', history: 'Azul oscuro y profundo. Ideal para marinas y nocturnos.' },
  { name: 'Azul Real Winsor', pigment: 'PB29', opacity: 'Semi-opaco', permanence: 'Excelente', family: 'Winsor & Newton', color: '#0984e3', history: 'Azul profundo y real. Excelente para marinas y cielos.' },
  
  // AZULES PHALO (FTALOCIANINAS)
  { name: 'Azul Ftalocianina', pigment: 'PB15', opacity: 'Transparente', permanence: 'Excelente', family: 'Old Holland', color: '#0047AB', history: 'Alta transparencia y gran poder de tinción. Azul verdoso profundo y frío, perfecto para cielos y aguas.' },
  { name: 'Azul Ftalocianina Verde', pigment: 'PB15:3', opacity: 'Transparente', permanence: 'Excelente', family: 'Williamsburg', color: '#006994', history: 'Alta transparencia y gran poder de tinción. Azul verdoso intenso y característico.' },
  { name: 'Azul Ftalocianina Winsor', pigment: 'PB15', opacity: 'Transparente', permanence: 'Excelente', family: 'Winsor & Newton', color: '#005A9C', history: 'Alta transparencia y gran poder de tinción. Azul verdoso profundo y moderno.' },
  
  // VERDES
  { name: 'Verde Vejiga', pigment: 'PG18', opacity: 'Semi-opaco', permanence: 'Excelente', family: 'Old Holland', color: '#556b2f', history: 'Verde terroso y natural. Granulador, perfecto para paisajes y vegetación.' },
  { name: 'Verde Vejiga Italiano', pigment: 'PG18', opacity: 'Semi-opaco', permanence: 'Excelente', family: 'Williamsburg', color: '#6b8e23', history: 'Verde terroso clásico. Granulador, ideal para paisajes mediterráneos.' },
  { name: 'Verde Vejiga Winsor', pigment: 'PG18', opacity: 'Semi-opaco', permanence: 'Excelente', family: 'Winsor & Newton', color: '#81ecec', history: 'Verde terroso y natural. Granulador, ideal para paisajes.' },
  
  // VERDES PHALO (FTALOCIANINAS)
  { name: 'Verde Ftalocianina', pigment: 'PG7', opacity: 'Transparente', permanence: 'Excelente', family: 'Old Holland', color: '#00b894', history: 'Verde intenso y brillante. Alta transparencia, ideal para vegetación y paisajes.' },
  { name: 'Verde Ftalocianina Intenso', pigment: 'PG7', opacity: 'Transparente', permanence: 'Excelente', family: 'Williamsburg', color: '#00b894', history: 'Verde brillante y moderno. Alta transparencia para efectos de luz.' },
  { name: 'Verde Ftalocianina Winsor', pigment: 'PG7', opacity: 'Transparente', permanence: 'Excelente', family: 'Winsor & Newton', color: '#55efc4', history: 'Verde brillante y limpio. Alta transparencia para efectos de luz.' },
  
  // TIERRAS Y ÓXIDOS
  { name: 'Pardo Óxido Transparente', pigment: 'PBr6', opacity: 'Transparente', permanence: 'Excelente', family: 'Old Holland', color: '#4E342E', history: 'Marrón rojizo oscuro y cálido. Transparente profundo, ideal para veladuras y envejecimiento.' },
  { name: 'Pardo Óxido Transparente Profundo', pigment: 'PBr6', opacity: 'Transparente', permanence: 'Excelente', family: 'Williamsburg', color: '#5D4037', history: 'Marrón chocolate tostado profundo. Transparente intenso, perfecto para efectos de envejecimiento.' },
  { name: 'Pardo Óxido Transparente Winsor', pigment: 'PBr6', opacity: 'Transparente', permanence: 'Excelente', family: 'Winsor & Newton', color: '#4E342E', history: 'Marrón rojizo oscuro transparente. Ideal para veladuras y efectos de envejecimiento.' },
  { name: 'Rojo Óxido Transparente', pigment: 'PR101', opacity: 'Transparente', permanence: 'Excelente', family: 'Old Holland', color: '#8B4513', history: 'Terracota rojiza transparente. Perfecto para óxidos y efectos de envejecimiento.' },
  { name: 'Rojo Óxido Transparente Cálido', pigment: 'PR101', opacity: 'Transparente', permanence: 'Excelente', family: 'Williamsburg', color: '#A0522D', history: 'Terracota cálida transparente. Ideal para óxidos y efectos naturales.' },
  { name: 'Rojo Óxido Transparente Winsor', pigment: 'PR101', opacity: 'Transparente', permanence: 'Excelente', family: 'Winsor & Newton', color: '#8B4513', history: 'Terracota rojiza transparente. Perfecto para óxidos y rust.' },
  
  // NEGROS (más oscuros)
  { name: 'Negro Marfil', pigment: 'PBk9', opacity: 'Semi-opaco', permanence: 'Excelente', family: 'Old Holland', color: '#4a4a4a', history: 'Negro cálido y natural. Ideal para mezclas y sombras suaves.' },
  { name: 'Negro Marfil Frío', pigment: 'PBk9', opacity: 'Semi-opaco', permanence: 'Excelente', family: 'Williamsburg', color: '#636e72', history: 'Negro frío y natural. Excelente para mezclas de sombras.' },
  { name: 'Negro Marfil Winsor', pigment: 'PBk9', opacity: 'Semi-opaco', permanence: 'Excelente', family: 'Winsor & Newton', color: '#b2bec3', history: 'Negro cálido y suave. Excelente para mezclas y sombras.' },
];

const DiccionarioPigmentos: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedFamily, setSelectedFamily] = useState<string>('Todos');
  const [selectedPigment, setSelectedPigment] = useState<typeof PIGMENTS_DATA[0] | null>(null);

  const families = ['Todos', 'Old Holland', 'Williamsburg', 'Winsor & Newton'];

  const filteredPigments = selectedFamily === 'Todos'
    ? PIGMENTS_DATA
    : PIGMENTS_DATA.filter(p => p.family === selectedFamily);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-stone-400 hover:text-gold-600 transition-colors">
          <ArrowLeft size={20} />
          <span className="text-sm tracking-widest uppercase">Volver</span>
        </button>
      </div>

      <header className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-emerald-600 uppercase font-medium bg-emerald-50 px-4 py-2 mb-6">
          <Gift size={14} /> Herramienta gratuita
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-slate-900 tracking-wide mb-6">
          Diccionario de Pigmentos
        </h2>
        <p className="text-stone-500 text-lg leading-relaxed">
          Consulta las propiedades técnicas e históricas de los pigmentos clásicos del óleo.
        </p>
      </header>

      {/* Filtros por familia */}
      <section className="max-w-2xl mx-auto">
        <div className="flex justify-center gap-2 flex-wrap">
          {families.map(family => (
            <button
              key={family}
              onClick={() => setSelectedFamily(family)}
              className={`px-5 py-2 text-sm tracking-wide transition-all duration-300 ${
                selectedFamily === family
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-stone-200 text-stone-600 hover:border-gold-400'
              }`}
            >
              {family}
            </button>
          ))}
        </div>
      </section>

      {/* Grid de pigmentos - diseño profesional de bellas artes */}
      <section className="max-w-7xl mx-auto px-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filteredPigments.map((pigment, index) => (
            <button
              key={index}
              onClick={() => setSelectedPigment(pigment)}
              className={`group bg-white border p-3 text-left transition-all duration-300 hover:shadow-lg ${
                selectedPigment?.name === pigment.name ? 'border-gold-500 shadow-lg' : 'border-stone-200 hover:border-gold-300'
              }`}
            >
              {/* PRIORIDAD VISUAL: Indicador elegante de Transparencia/Opacidad */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  {pigment.opacity === 'Opaco' ? (
                    <div className="w-4 h-4 bg-slate-900 rounded-sm"></div>
                  ) : pigment.opacity === 'Semi-opaco' ? (
                    <div className="w-4 h-4 bg-gradient-to-r from-slate-900 to-slate-500 rounded-sm"></div>
                  ) : pigment.opacity === 'Semi-transparente' ? (
                    <div className="w-4 h-4 bg-gradient-to-r from-slate-500 via-slate-300 to-transparent rounded-sm"></div>
                  ) : (
                    <div className="w-4 h-4 border-2 border-slate-400 rounded-sm bg-transparent"></div>
                  )}
                </div>
                <span className="text-xs text-stone-500 font-medium">
                  {pigment.opacity === 'Semi-transparente' ? 'Semi-trans' : 
                   pigment.opacity === 'Semi-opaco' ? 'Semi-opaco' : 
                   pigment.opacity}
                </span>
              </div>
              
              {/* Muestra de color */}
              <div
                className="w-full h-16 mb-3 border border-stone-200 rounded group-hover:scale-105 transition-transform duration-300 shadow-sm"
                style={{ backgroundColor: pigment.color }}
              ></div>
              
              {/* Información del pigmento */}
              <h4 className="font-serif text-xs text-slate-900 mb-1 leading-tight font-medium">{pigment.name}</h4>
              <p className="text-xs text-stone-500 mb-1">{pigment.pigment}</p>
              <p className="text-xs text-stone-400">{pigment.family}</p>
            </button>
          ))}
        </div>
      </section>

{/* Detalle del pigmento seleccionado - prioridad visual en transparencia */}
      {selectedPigment && (
        <section className="max-w-4xl mx-auto animate-fade-in px-2">
          <div className="bg-white border border-stone-200 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 items-start">
              <div
                className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 border border-stone-200 rounded-lg shadow-md"
                style={{ backgroundColor: selectedPigment.color }}
              ></div>
              <div className="flex-grow">
                <h3 className="font-serif text-lg sm:text-2xl text-slate-900 mb-2">{selectedPigment.name}</h3>
                <p className="text-sm text-gold-600 mb-3 sm:mb-4 font-medium">{selectedPigment.pigment} · {selectedPigment.family}</p>

                {/* PRIORIDAD VISUAL: Transparencia/Opacidad elegante en la parte superior */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg mb-4 sm:mb-6 border border-amber-200">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Transparencia / Opacidad</p>
                    <div className="flex items-center gap-2">
                      {selectedPigment.opacity === 'Opaco' ? (
                        <div className="w-6 h-6 bg-slate-900 rounded-sm"></div>
                      ) : selectedPigment.opacity === 'Semi-opaco' ? (
                        <div className="w-6 h-6 bg-gradient-to-r from-slate-900 to-slate-500 rounded-sm"></div>
                      ) : selectedPigment.opacity === 'Semi-transparente' ? (
                        <div className="w-6 h-6 bg-gradient-to-r from-slate-500 via-slate-300 to-transparent rounded-sm"></div>
                      ) : (
                        <div className="w-6 h-6 border-2 border-slate-400 rounded-sm bg-transparent"></div>
                      )}
                      <span className="text-xs text-amber-700 font-medium">
                        {selectedPigment.opacity === 'Transparente' ? 'Transparente' :
                         selectedPigment.opacity === 'Semi-transparente' ? 'Semi-transparente' :
                         selectedPigment.opacity === 'Semi-opaco' ? 'Semi-opaco' :
                         'Opaco'}
                      </span>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-slate-900 mb-1">{selectedPigment.opacity}</p>
                  <p className="text-xs text-stone-600">
                    {selectedPigment.opacity === 'Opaco' ? 'Totalmente cubriente, ideal para capas base.' :
                     selectedPigment.opacity === 'Semi-opaco' ? 'Cubriente con algo de transparencia.' :
                     selectedPigment.opacity === 'Semi-transparente' ? 'Transparencia media, bueno para veladuras.' :
                     'Altamente transparente, perfecto para glaseados y veladuras.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-stone-50 p-3 rounded-lg">
                    <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Permanencia</p>
                    <span className="text-slate-700 font-medium">{selectedPigment.permanence}</span>
                  </div>
                  <div className="bg-stone-50 p-3 rounded-lg">
                    <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Código</p>
                    <span className="text-slate-700 font-medium">{selectedPigment.pigment}</span>
                  </div>
                </div>

                <div className="border-t border-stone-100 pt-4">
                  <p className="text-xs text-stone-400 uppercase tracking-wide mb-2">Historia y uso</p>
                  <p className="text-stone-600 leading-relaxed text-sm sm:text-base">{selectedPigment.history}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

// ============================================
// APP 3: ANALIZADOR PREMIUM
// ============================================
const AnalizadorPremium: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="space-y-10 animate-fade-in">
    {/* Header */}
    <div className="flex items-center gap-4">
      <button onClick={onBack} className="flex items-center gap-2 text-stone-400 hover:text-gold-600 transition-colors">
        <ArrowLeft size={20} />
        <span className="text-sm tracking-widest uppercase">Volver</span>
      </button>
    </div>

    <header className="text-center max-w-3xl mx-auto">
      <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-gold-600 uppercase font-medium bg-gold-100 px-4 py-2 mb-6">
        <Crown size={14} /> Acceso Profesional
      </span>
      <h2 className="font-serif text-4xl md:text-5xl text-slate-900 tracking-wide mb-6">
        Analizador Técnico de Pigmentos
      </h2>
      <p className="text-stone-500 text-lg leading-relaxed">
        La herramienta definitiva para identificar pigmentos exactos mediante inteligencia artificial.
      </p>
    </header>

    {/* Preview de funcionalidades */}
    <section className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 md:p-16 text-center">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-white font-serif text-lg mb-2">Análisis de Imagen</h4>
            <p className="text-slate-400 text-sm">Sube cualquier imagen y extrae su paleta cromática</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 className="text-white font-serif text-lg mb-2">IA Avanzada</h4>
            <p className="text-slate-400 text-sm">Identifica pigmentos exactos de marcas profesionales</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h4 className="text-white font-serif text-lg mb-2">3 Marcas Premium</h4>
            <p className="text-slate-400 text-sm">Old Holland, Williamsburg, Winsor & Newton</p>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-10">
          <p className="text-3xl text-gold-400 font-light mb-2">47 <span className="text-lg text-slate-500">EUR</span></p>
          <p className="text-slate-500 text-sm mb-6">Pago único · Acceso ilimitado</p>
          <a
            href="https://payhip.com/ARTEFIGURATIVO"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold-500 text-white py-4 px-12 text-sm tracking-[0.2em] uppercase hover:bg-gold-400 transition-all duration-300"
          >
            Obtener acceso
          </a>
        </div>
      </div>
    </section>

    {/* Testimonio/Nota */}
    <section className="text-center max-w-2xl mx-auto">
      <blockquote className="font-serif text-xl text-slate-700 italic leading-relaxed">
        "La herramienta que uso en mi propio estudio. Diseñada desde la necesidad real de recrear
        paletas con precisión profesional."
      </blockquote>
      <p className="text-stone-500 mt-4">— Myriam Alcaraz</p>
    </section>
  </div>
);

export default EstudioDigital;
