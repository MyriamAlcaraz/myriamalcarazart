import React, { useState, useMemo, useRef } from 'react';
import { ArrowLeft, Gift, Crown, Sparkles } from 'lucide-react';

// ============================================
// TIPOS
// ============================================
type AppView = 'gallery' | 'composicion' | 'pigmentos' | 'analizador';

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

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
            Calcula la Regla de los Tercios y la Espiral de Oro para cualquier formato de lienzo.
            Visualización interactiva en tiempo real.
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
  const [activeOverlay, setActiveOverlay] = useState<'spiral' | 'thirds'>('spiral');
  const [rotation, setRotation] = useState<0 | 90 | 180 | 270>(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [spiralColor, setSpiralColor] = useState<'gold' | 'white'>('gold');
  const [opacity, setOpacity] = useState<number>(80);

  // Estados para drag & drop
  const [spiralPosition, setSpiralPosition] = useState({ x: 0, y: 0 });
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

  // Colores de la espiral
  const spiralStroke = spiralColor === 'gold' ? '#d4af37' : '#ffffff';

  // Path estático de precisión para la Espiral de Fibonacci
  const STATIC_SPIRAL_PATH = "M0,100 A100,100 0 0,1 100,0 M100,0 A61.8,61.8 0 0,1 161.8,61.8 M161.8,61.8 A38.2,38.2 0 0,1 123.6,100 M123.6,100 A23.6,23.6 0 0,1 100,76.4 M100,76.4 A14.6,14.6 0 0,1 114.6,61.8";

  // Espiral de Fibonacci estática
  const fibonacciSpiralPath = STATIC_SPIRAL_PATH;

  // Calcular centro del "ojo" de la espiral (punto de anclaje)
  const spiralEye = useMemo(() => {
    // Centro estático basado en el path de precisión
    // El último punto del path es (114.6, 61.8)
    return {
      x: 114.6,
      y: 61.8
    };
  }, []);

  // Handlers para Drag & Drop - anclado al centro de la espiral
  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeOverlay !== 'spiral') return;
    
    // Verificar si el clic está cerca del centro de la espiral
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const eyeX = spiralEye.x + spiralPosition.x;
      const eyeY = spiralEye.y + spiralPosition.y;
      
      const distance = Math.sqrt(Math.pow(clickX - eyeX, 2) + Math.pow(clickY - eyeY, 2));
      
      // Solo permitir drag si está cerca del centro (radio de 20px)
      if (distance <= 20) {
        setIsDragging(true);
        setDragStart({
          x: e.clientX - spiralPosition.x,
          y: e.clientY - spiralPosition.y
        });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setSpiralPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset posición
  const resetPosition = () => {
    setSpiralPosition({ x: 0, y: 0 });
  };

  // Transformación de la espiral
  const getSpiralTransform = () => {
    const transforms: string[] = [];
    transforms.push(`translate(${spiralPosition.x}px, ${spiralPosition.y}px)`);
    if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`);
    if (flipH) transforms.push('scaleX(-1)');
    if (flipV) transforms.push('scaleY(-1)');
    return transforms.join(' ');
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
          Master de Composición Áurea
        </h2>
<p className="text-stone-500 text-lg leading-relaxed">
           Arrastra el "ojo" de la espiral sobre tu obra para encontrar el punto focal perfecto.
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

            {/* Tipo de guía */}
            <div className="col-span-2">
              <label className="block text-[10px] tracking-[0.2em] text-slate-500 uppercase mb-2">
                Guía
              </label>
              <div className="flex h-12">
                <button
                  onClick={() => setActiveOverlay('spiral')}
                  className={`flex-1 text-sm transition-all ${
                    activeOverlay === 'spiral' ? 'bg-slate-900 text-white' : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  Espiral
                </button>
                <button
                  onClick={() => setActiveOverlay('thirds')}
                  className={`flex-1 text-sm transition-all ${
                    activeOverlay === 'thirds' ? 'bg-slate-900 text-white' : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  Tercios
                </button>
              </div>
            </div>
          </div>

          {/* Segunda fila de controles */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mt-4 pt-4 border-t border-stone-100">

            {/* Rotación */}
            <div className="col-span-4">
              <label className="block text-[10px] tracking-[0.2em] text-slate-500 uppercase mb-2">
                Rotar
              </label>
              <div className="flex h-10">
                {([0, 90, 180, 270] as const).map((deg) => (
                  <button
                    key={deg}
                    onClick={() => setRotation(deg)}
                    className={`flex-1 text-sm transition-all ${
                      rotation === deg ? 'bg-gold-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {deg}°
                  </button>
                ))}
              </div>
            </div>

            {/* Voltear */}
            <div className="col-span-2">
              <label className="block text-[10px] tracking-[0.2em] text-slate-500 uppercase mb-2">
                Espejo
              </label>
              <div className="flex h-10">
                <button
                  onClick={() => setFlipH(!flipH)}
                  className={`flex-1 text-xs transition-all ${flipH ? 'bg-gold-500 text-white' : 'bg-stone-100 text-stone-600'}`}
                >
                  ↔ H
                </button>
                <button
                  onClick={() => setFlipV(!flipV)}
                  className={`flex-1 text-xs transition-all ${flipV ? 'bg-gold-500 text-white' : 'bg-stone-100 text-stone-600'}`}
                >
                  ↕ V
                </button>
              </div>
            </div>

            {/* Color */}
            <div className="col-span-2">
              <label className="block text-[10px] tracking-[0.2em] text-slate-500 uppercase mb-2">
                Color
              </label>
              <div className="flex h-10">
                <button
                  onClick={() => setSpiralColor('gold')}
                  className={`flex-1 text-xs transition-all bg-gradient-to-r from-amber-300 to-gold-500 ${
                    spiralColor === 'gold' ? 'ring-2 ring-slate-900' : ''
                  }`}
                >
                  Oro
                </button>
                <button
                  onClick={() => setSpiralColor('white')}
                  className={`flex-1 text-xs transition-all bg-white border border-stone-300 ${
                    spiralColor === 'white' ? 'ring-2 ring-slate-900' : ''
                  }`}
                >
                  Blanco
                </button>
              </div>
            </div>
          </div>

          {/* Tercera fila: Opacidad y Reset */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-stone-100">
            <div className="flex-1">
              <label className="block text-[10px] tracking-[0.2em] text-slate-500 uppercase mb-2">
                Opacidad: {opacity}%
              </label>
              <input
                type="range"
                min="20"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(parseInt(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
            </div>
            <button
              onClick={resetPosition}
              className="px-4 py-2 text-xs tracking-wide uppercase bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
            >
              Centrar espiral
            </button>
          </div>
        </div>
      </section>

      {/* Mesa de Composición */}
      <section className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 shadow-2xl">
          <div className="text-center mb-4">
<p className="text-[10px] tracking-[0.4em] text-slate-500 uppercase">
               {activeOverlay === 'spiral' ? 'Arrastra el ojo de la espiral para ajustar' : 'Regla de los Tercios'}
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
                cursor: activeOverlay === 'spiral' ? 'default' : 'default'
              }}
              onMouseDown={handleMouseDown}
            >
              {/* Imagen de fondo */}
              {uploadedImage ? (
                <img src={uploadedImage} alt="Tu obra" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300" />
              )}

              {/* SVG con la espiral */}
              <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${canvasSize.w} ${canvasSize.h}`}
                className="absolute inset-0 pointer-events-none"
                style={{
                  transform: getSpiralTransform(),
                  transformOrigin: `${spiralEye.x}px ${spiralEye.y}px`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                  opacity: opacity / 100
                }}
              >
                {/* Regla de los Tercios */}
                {activeOverlay === 'thirds' && (
                  <g>
                    <line x1={canvasSize.w / 3} y1="0" x2={canvasSize.w / 3} y2={canvasSize.h} stroke={spiralStroke} strokeWidth="1.5" />
                    <line x1={(canvasSize.w * 2) / 3} y1="0" x2={(canvasSize.w * 2) / 3} y2={canvasSize.h} stroke={spiralStroke} strokeWidth="1.5" />
                    <line x1="0" y1={canvasSize.h / 3} x2={canvasSize.w} y2={canvasSize.h / 3} stroke={spiralStroke} strokeWidth="1.5" />
                    <line x1="0" y1={(canvasSize.h * 2) / 3} x2={canvasSize.w} y2={(canvasSize.h * 2) / 3} stroke={spiralStroke} strokeWidth="1.5" />
                    {/* Puntos de interés */}
                    {[
                      [canvasSize.w / 3, canvasSize.h / 3],
                      [(canvasSize.w * 2) / 3, canvasSize.h / 3],
                      [canvasSize.w / 3, (canvasSize.h * 2) / 3],
                      [(canvasSize.w * 2) / 3, (canvasSize.h * 2) / 3],
                    ].map(([cx, cy], i) => (
                      <circle key={i} cx={cx} cy={cy} r="5" fill={spiralStroke} />
                    ))}
                  </g>
                )}

                {/* Espiral de Fibonacci */}
                {activeOverlay === 'spiral' && (
                  <g>
                    {/* Espiral de Fibonacci estática con path de precisión */}
                    <path
                      d={STATIC_SPIRAL_PATH}
                      fill="none"
                      stroke="#D4AF37"
                      stroke-width="1"
                    />

                    {/* Centro de la espiral - punto de anclaje para drag */}
                    <circle
                      cx={spiralEye.x}
                      cy={spiralEye.y}
                      r="8"
                      fill="none"
                      stroke="#D4AF37"
                      stroke-width="1"
                      className="pointer-events-auto cursor-move"
                    />
                    <circle
                      cx={spiralEye.x}
                      cy={spiralEye.y}
                      r="3"
                      fill="#D4AF37"
                    />
                  </g>
                )}
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

      {/* Instrucciones */}
      <section className="max-w-3xl mx-auto">
        <div className="bg-stone-50 border border-stone-200 p-6 text-center">
<p className="text-stone-600 text-sm leading-relaxed">
             <strong>Cómo usar:</strong> Sube tu imagen, ajusta las medidas de tu lienzo, y arrastra el "ojo" de la espiral
             (punto dorado central) hasta que coincida con el punto focal de tu composición.
             Prueba las 4 rotaciones y los espejos para encontrar la orientación perfecta.
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
  { name: 'Amarillo Cadmio Limón', pigment: 'PY37', opacity: 'Opaco', permanence: 'Excelente', family: 'Cadmios', color: '#fff44f', history: 'Sintetizado en 1817. Sustituyó al venenoso Amarillo de Cromo. Usado por Monet y Van Gogh.' },
  { name: 'Amarillo Cadmio Medio', pigment: 'PY37', opacity: 'Opaco', permanence: 'Excelente', family: 'Cadmios', color: '#ffb300', history: 'El cadmio más versátil. Cálido y luminoso, ideal para mezclas con naranjas.' },
  { name: 'Rojo Cadmio', pigment: 'PR108', opacity: 'Opaco', permanence: 'Excelente', family: 'Cadmios', color: '#e63946', history: 'Disponible desde 1910. Reemplazó al Bermellón por su estabilidad y menor toxicidad.' },
  { name: 'Azul Cobalto', pigment: 'PB28', opacity: 'Semi-opaco', permanence: 'Excelente', family: 'Cobaltos', color: '#0047ab', history: 'Descubierto en 1802 por Thénard. Renoir lo consideraba indispensable. Secado rápido.' },
  { name: 'Azul Cerúleo', pigment: 'PB35', opacity: 'Opaco', permanence: 'Excelente', family: 'Cobaltos', color: '#2a52be', history: 'Introducido en 1860. Perfecto para cielos por su tono frío y granulación natural.' },
  { name: 'Violeta Cobalto', pigment: 'PV14', opacity: 'Semi-opaco', permanence: 'Excelente', family: 'Cobaltos', color: '#7f00ff', history: 'El violeta más permanente. Monet lo usó extensamente en sus series de catedrales.' },
  { name: 'Siena Natural', pigment: 'PBr7', opacity: 'Transparente', permanence: 'Excelente', family: 'Tierras', color: '#a0522d', history: 'De la región de Siena, Italia. Usado desde el Renacimiento. Ideal para veladuras cálidas.' },
  { name: 'Siena Tostada', pigment: 'PBr7', opacity: 'Transparente', permanence: 'Excelente', family: 'Tierras', color: '#8b4513', history: 'Siena calcinada. Rembrandt la mezclaba con negros para sombras profundas.' },
  { name: 'Sombra Natural', pigment: 'PBr7', opacity: 'Transparente', permanence: 'Excelente', family: 'Tierras', color: '#635147', history: 'De Umbría, Italia. Más fría que las Sienas. Velázquez la usó en sus fondos.' },
  { name: 'Sombra Tostada', pigment: 'PBr7', opacity: 'Semi-transparente', permanence: 'Excelente', family: 'Tierras', color: '#4a3728', history: 'Marrón cálido profundo. Caravaggio construyó su claroscuro sobre esta base.' },
  { name: 'Ocre Amarillo', pigment: 'PY43', opacity: 'Opaco', permanence: 'Excelente', family: 'Tierras', color: '#cc7722', history: 'El pigmento más antiguo conocido. Pinturas rupestres de 40.000 años lo contienen.' },
  { name: 'Blanco de Titanio', pigment: 'PW6', opacity: 'Opaco', permanence: 'Excelente', family: 'Blancos', color: '#ffffff', history: 'Desde 1921. Reemplazó al tóxico Blanco de Plomo. El blanco más cubriente.' },
];

const DiccionarioPigmentos: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedFamily, setSelectedFamily] = useState<string>('Todos');
  const [selectedPigment, setSelectedPigment] = useState<typeof PIGMENTS_DATA[0] | null>(null);

  const families = ['Todos', 'Cadmios', 'Cobaltos', 'Tierras', 'Blancos'];

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

      {/* Grid de pigmentos */}
      <section className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredPigments.map((pigment, index) => (
            <button
              key={index}
              onClick={() => setSelectedPigment(pigment)}
              className={`group bg-white border p-5 text-left transition-all duration-300 hover:shadow-lg ${
                selectedPigment?.name === pigment.name ? 'border-gold-500 shadow-lg' : 'border-stone-200 hover:border-gold-300'
              }`}
            >
              <div
                className="w-full h-16 mb-4 border border-stone-200 group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundColor: pigment.color }}
              ></div>
              <h4 className="font-serif text-base text-slate-900 mb-1 leading-snug">{pigment.name}</h4>
              <p className="text-xs text-stone-400">{pigment.pigment}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Detalle del pigmento seleccionado */}
      {selectedPigment && (
        <section className="max-w-3xl mx-auto animate-fade-in">
          <div className="bg-white border border-stone-200 p-8">
            <div className="flex gap-8 items-start">
              <div
                className="w-32 h-32 flex-shrink-0 border border-stone-200"
                style={{ backgroundColor: selectedPigment.color }}
              ></div>
              <div className="flex-grow">
                <h3 className="font-serif text-2xl text-slate-900 mb-2">{selectedPigment.name}</h3>
                <p className="text-sm text-gold-600 mb-4">{selectedPigment.pigment} · {selectedPigment.family}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Opacidad</p>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${
                        selectedPigment.opacity === 'Opaco' ? 'bg-slate-900' :
                        selectedPigment.opacity === 'Semi-opaco' ? 'bg-slate-500' :
                        'bg-slate-300 border border-slate-400'
                      }`}></div>
                      <span className="text-slate-700">{selectedPigment.opacity}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Permanencia</p>
                    <span className="text-slate-700">{selectedPigment.permanence}</span>
                  </div>
                </div>

                <div className="border-t border-stone-100 pt-4">
                  <p className="text-xs text-stone-400 uppercase tracking-wide mb-2">Historia y uso</p>
                  <p className="text-stone-600 leading-relaxed">{selectedPigment.history}</p>
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
