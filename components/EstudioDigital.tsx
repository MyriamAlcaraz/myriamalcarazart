import React, { useState, useMemo, useRef } from 'react';
import { ArrowLeft, Gift, Crown, Sparkles } from 'lucide-react';

// ============================================
// TIPOS
// ============================================
type AppView = 'gallery' | 'composicion' | 'pigmentos' | 'analizador' | 'circuloCromatico' | 'proporciones' | 'valores';

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
      {currentView === 'circuloCromatico' && <CirculoCromatico onBack={() => setCurrentView('gallery')} />}
      {currentView === 'proporciones' && <CalculadoraProporciones onBack={() => setCurrentView('gallery')} />}
      {currentView === 'valores' && <SimuladorValores onBack={() => setCurrentView('gallery')} />}
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
          Cinco herramientas gratuitas como <span className="font-medium">cortesía de Myriam Alcaraz</span> para la comunidad artística
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

        {/* APP 3: Círculo Cromático - GRATIS */}
        <button
          onClick={() => onOpenApp('circuloCromatico')}
          className="group bg-white border border-stone-200 p-8 flex flex-col hover:border-gold-400 hover:shadow-xl transition-all duration-500 text-left"
        >
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 via-blue-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
              <svg className="w-10 h-10 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v3m0 12v3M3 12h3m12 0h3M5.636 5.636l2.122 2.122m8.484 8.484l2.122 2.122M5.636 18.364l2.122-2.122m8.484-8.484l2.122-2.122" />
              </svg>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.3em] text-emerald-600 uppercase font-medium bg-emerald-50 px-3 py-1">
              <Gift size={12} /> Gratuito
            </span>
          </div>

          <h3 className="font-serif text-2xl text-slate-900 text-center mb-3 leading-snug">
            Círculo Cromático
          </h3>

          <p className="text-stone-500 text-base leading-relaxed text-center flex-grow mb-6">
            Explora armonías de color: complementarios, análogos, triádicos y más.
            Visualiza las relaciones entre colores.
          </p>

          <div className="border-t border-stone-100 pt-6 text-center">
            <span className="inline-block border border-gold-500 text-gold-600 py-3 px-8 text-sm tracking-[0.2em] uppercase group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
              Abrir herramienta
            </span>
          </div>
        </button>

        {/* APP 4: Calculadora de Proporciones - GRATIS */}
        <button
          onClick={() => onOpenApp('proporciones')}
          className="group bg-white border border-stone-200 p-8 flex flex-col hover:border-gold-400 hover:shadow-xl transition-all duration-500 text-left"
        >
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
              <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5h16M4 8h16M4 11h16M4 14h10M4 17h6" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 14l-4 4m0-4l4 4" />
              </svg>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.3em] text-emerald-600 uppercase font-medium bg-emerald-50 px-3 py-1">
              <Gift size={12} /> Gratuito
            </span>
          </div>

          <h3 className="font-serif text-2xl text-slate-900 text-center mb-3 leading-snug">
            Calculadora de Proporciones
          </h3>

          <p className="text-stone-500 text-base leading-relaxed text-center flex-grow mb-6">
            Calcula formatos de lienzo, sección áurea y proporciones armónicas para tus composiciones.
          </p>

          <div className="border-t border-stone-100 pt-6 text-center">
            <span className="inline-block border border-gold-500 text-gold-600 py-3 px-8 text-sm tracking-[0.2em] uppercase group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
              Abrir herramienta
            </span>
          </div>
        </button>

        {/* APP 5: Simulador de Valores Tonales - GRATIS */}
        <button
          onClick={() => onOpenApp('valores')}
          className="group bg-white border border-stone-200 p-8 flex flex-col hover:border-gold-400 hover:shadow-xl transition-all duration-500 text-left"
        >
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
              <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.3em] text-emerald-600 uppercase font-medium bg-emerald-50 px-3 py-1">
              <Gift size={12} /> Gratuito
            </span>
          </div>

          <h3 className="font-serif text-2xl text-slate-900 text-center mb-3 leading-snug">
            Simulador de Valores
          </h3>

          <p className="text-stone-500 text-base leading-relaxed text-center flex-grow mb-6">
            Convierte tu imagen a escala de grises para analizar la estructura tonal y el contraste.
          </p>

          <div className="border-t border-stone-100 pt-6 text-center">
            <span className="inline-block border border-gold-500 text-gold-600 py-3 px-8 text-sm tracking-[0.2em] uppercase group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
              Abrir herramienta
            </span>
          </div>
        </button>

        {/* APP 6: Analizador Premium - DE PAGO */}
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

// ============================================
// APP 4: CÍRCULO CROMÁTICO INTERACTIVO
// ============================================
const CirculoCromatico: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedColor, setSelectedColor] = useState<number>(0); // Ángulo en grados (0-360)
  const [harmonyType, setHarmonyType] = useState<'complementario' | 'analogo' | 'triadico' | 'split' | 'tetradico'>('complementario');

  // Convertir HSL a HEX
  const hslToHex = (h: number, s: number, l: number): string => {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  // Calcular colores de armonía
  const getHarmonyColors = () => {
    const base = selectedColor;
    switch (harmonyType) {
      case 'complementario':
        return [base, (base + 180) % 360];
      case 'analogo':
        return [(base - 30 + 360) % 360, base, (base + 30) % 360];
      case 'triadico':
        return [base, (base + 120) % 360, (base + 240) % 360];
      case 'split':
        return [base, (base + 150) % 360, (base + 210) % 360];
      case 'tetradico':
        return [base, (base + 90) % 360, (base + 180) % 360, (base + 270) % 360];
      default:
        return [base];
    }
  };

  const harmonyColors = getHarmonyColors();

  // Generar segmentos del círculo cromático
  const segments = Array.from({ length: 12 }, (_, i) => i * 30);

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
          Círculo Cromático Interactivo
        </h2>
        <p className="text-stone-500 text-lg leading-relaxed">
          Explora las armonías de color y descubre combinaciones perfectas para tu paleta.
        </p>
      </header>

      {/* Selector de tipo de armonía */}
      <section className="max-w-3xl mx-auto">
        <div className="flex justify-center gap-2 flex-wrap">
          {[
            { id: 'complementario', label: 'Complementario' },
            { id: 'analogo', label: 'Análogo' },
            { id: 'triadico', label: 'Triádico' },
            { id: 'split', label: 'Complementario Dividido' },
            { id: 'tetradico', label: 'Tetrádico' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setHarmonyType(id as typeof harmonyType)}
              className={`px-5 py-2 text-sm tracking-wide transition-all duration-300 ${
                harmonyType === id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-stone-200 text-stone-600 hover:border-gold-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Círculo Cromático y Paleta */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-white border border-stone-200 p-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            {/* Círculo Cromático SVG */}
            <div className="relative">
              <svg width="320" height="320" viewBox="0 0 320 320" className="drop-shadow-lg">
                {/* Segmentos del círculo */}
                {segments.map((hue, index) => {
                  const startAngle = (hue - 15) * Math.PI / 180;
                  const endAngle = (hue + 15) * Math.PI / 180;
                  const innerRadius = 80;
                  const outerRadius = 140;

                  const x1 = 160 + innerRadius * Math.cos(startAngle - Math.PI / 2);
                  const y1 = 160 + innerRadius * Math.sin(startAngle - Math.PI / 2);
                  const x2 = 160 + outerRadius * Math.cos(startAngle - Math.PI / 2);
                  const y2 = 160 + outerRadius * Math.sin(startAngle - Math.PI / 2);
                  const x3 = 160 + outerRadius * Math.cos(endAngle - Math.PI / 2);
                  const y3 = 160 + outerRadius * Math.sin(endAngle - Math.PI / 2);
                  const x4 = 160 + innerRadius * Math.cos(endAngle - Math.PI / 2);
                  const y4 = 160 + innerRadius * Math.sin(endAngle - Math.PI / 2);

                  const isSelected = harmonyColors.includes(hue);

                  return (
                    <path
                      key={hue}
                      d={`M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}`}
                      fill={hslToHex(hue, 80, 55)}
                      stroke={isSelected ? '#1e293b' : '#fff'}
                      strokeWidth={isSelected ? 4 : 1}
                      className="cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => setSelectedColor(hue)}
                    />
                  );
                })}

                {/* Centro */}
                <circle cx="160" cy="160" r="70" fill="#f8f8f8" stroke="#e5e5e5" strokeWidth="2" />
                <text x="160" y="155" textAnchor="middle" className="text-xs fill-stone-500 uppercase tracking-widest">Color</text>
                <text x="160" y="175" textAnchor="middle" className="text-lg fill-slate-700 font-serif">{selectedColor}°</text>

                {/* Indicadores de armonía */}
                {harmonyColors.map((hue, index) => {
                  const angle = (hue - 90) * Math.PI / 180;
                  const x = 160 + 150 * Math.cos(angle);
                  const y = 160 + 150 * Math.sin(angle);
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="8"
                      fill={hslToHex(hue, 80, 55)}
                      stroke="#1e293b"
                      strokeWidth="3"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Paleta resultante */}
            <div className="flex-1 w-full lg:w-auto">
              <h3 className="font-serif text-xl text-slate-900 mb-4 text-center lg:text-left">Paleta de Armonía</h3>
              <div className="space-y-3">
                {harmonyColors.map((hue, index) => {
                  const hex = hslToHex(hue, 80, 55);
                  const hexLight = hslToHex(hue, 70, 75);
                  const hexDark = hslToHex(hue, 85, 35);
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div
                          className="w-12 h-12 border border-stone-200 shadow-sm"
                          style={{ backgroundColor: hexLight }}
                          title="Tinte claro"
                        />
                        <div
                          className="w-16 h-12 border-2 border-stone-300 shadow-md"
                          style={{ backgroundColor: hex }}
                          title="Color base"
                        />
                        <div
                          className="w-12 h-12 border border-stone-200 shadow-sm"
                          style={{ backgroundColor: hexDark }}
                          title="Sombra oscura"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">{hue}°</p>
                        <p className="text-xs text-stone-500 font-mono">{hex.toUpperCase()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Descripción de la armonía */}
              <div className="mt-6 p-4 bg-stone-50 border border-stone-200">
                <p className="text-sm text-stone-600 leading-relaxed">
                  {harmonyType === 'complementario' && 'Los colores complementarios están opuestos en el círculo. Crean el máximo contraste y vibración.'}
                  {harmonyType === 'analogo' && 'Los colores análogos son vecinos en el círculo. Crean armonía suave y natural.'}
                  {harmonyType === 'triadico' && 'Tres colores equidistantes forman un triángulo. Ofrecen equilibrio con variedad.'}
                  {harmonyType === 'split' && 'El color base con los dos adyacentes a su complementario. Contraste suavizado.'}
                  {harmonyType === 'tetradico' && 'Cuatro colores en un cuadrado. Ofrecen la paleta más rica y variada.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Información adicional */}
      <section className="max-w-3xl mx-auto">
        <div className="bg-stone-50 border border-stone-200 p-8 text-center">
          <p className="text-stone-600 text-base leading-relaxed font-serif">
            <strong>El círculo cromático es la herramienta fundamental del colorista.</strong> Selecciona un color
            haciendo clic en cualquier segmento y explora diferentes esquemas de armonía para encontrar
            combinaciones que funcionen en tu obra.
          </p>
        </div>
      </section>
    </div>
  );
};

// ============================================
// APP 5: CALCULADORA DE PROPORCIONES
// ============================================
const CalculadoraProporciones: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [modo, setModo] = useState<'aurea' | 'formato' | 'escala'>('aurea');
  const [medidaBase, setMedidaBase] = useState<number>(100);
  const [formatoOrigen, setFormatoOrigen] = useState({ ancho: 100, alto: 81 });
  const [escalaDeseada, setEscalaDeseada] = useState<number>(50);

  const PHI = 1.618033988749895;

  // Formatos estándar de lienzo
  const formatosEstandar = [
    { nombre: 'Figura (F)', ratio: 1.236, descripcion: 'Retrato, figura humana' },
    { nombre: 'Paisaje (P)', ratio: 1.382, descripcion: 'Paisajes horizontales' },
    { nombre: 'Marina (M)', ratio: 1.618, descripcion: 'Marinas, proporción áurea' },
    { nombre: 'Cuadrado', ratio: 1.0, descripcion: 'Formato cuadrado' },
    { nombre: 'Panorámico', ratio: 2.0, descripcion: 'Vistas panorámicas' },
    { nombre: 'Áureo', ratio: 1.618, descripcion: 'Sección áurea exacta' },
  ];

  // Cálculos áureos
  const seccionAurea = {
    mayor: medidaBase,
    menor: medidaBase / PHI,
    total: medidaBase * PHI,
    inverso: medidaBase * (PHI - 1),
  };

  // Escala proporcional
  const escalaResultado = {
    nuevoAncho: (formatoOrigen.ancho * escalaDeseada) / 100,
    nuevoAlto: (formatoOrigen.alto * escalaDeseada) / 100,
  };

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
          Calculadora de Proporciones
        </h2>
        <p className="text-stone-500 text-lg leading-relaxed">
          Calcula proporciones áureas, formatos de lienzo y escalas para tus composiciones.
        </p>
      </header>

      {/* Selector de modo */}
      <section className="max-w-2xl mx-auto">
        <div className="flex justify-center gap-2 flex-wrap">
          {[
            { id: 'aurea', label: 'Sección Áurea' },
            { id: 'formato', label: 'Formatos de Lienzo' },
            { id: 'escala', label: 'Escalador' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setModo(id as typeof modo)}
              className={`px-6 py-3 text-sm tracking-wide transition-all duration-300 ${
                modo === id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-stone-200 text-stone-600 hover:border-gold-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Contenido según modo */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-white border border-stone-200 p-8">

          {/* MODO: Sección Áurea */}
          {modo === 'aurea' && (
            <div className="space-y-8">
              <div className="text-center">
                <label className="block text-[10px] tracking-[0.2em] text-slate-500 uppercase mb-3">
                  Medida base (cm)
                </label>
                <input
                  type="number"
                  value={medidaBase}
                  onChange={(e) => setMedidaBase(Math.max(1, parseFloat(e.target.value) || 1))}
                  className="w-32 h-14 border border-stone-300 text-center text-2xl focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Visualización de la sección áurea */}
              <div className="flex justify-center">
                <div className="relative">
                  <div
                    className="bg-gradient-to-r from-gold-100 to-gold-200 border-2 border-gold-400 flex"
                    style={{ width: `${Math.min(seccionAurea.total * 2.5, 400)}px`, height: '80px' }}
                  >
                    <div
                      className="bg-gold-400 flex items-center justify-center text-white font-medium text-sm"
                      style={{ width: `${(seccionAurea.mayor / seccionAurea.total) * 100}%` }}
                    >
                      Mayor
                    </div>
                    <div
                      className="bg-gold-300 flex items-center justify-center text-gold-800 font-medium text-sm"
                      style={{ width: `${(seccionAurea.menor / seccionAurea.total) * 100}%` }}
                    >
                      Menor
                    </div>
                  </div>
                </div>
              </div>

              {/* Resultados */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-stone-50 p-4 text-center">
                  <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Segmento Mayor</p>
                  <p className="text-2xl font-light text-slate-800">{seccionAurea.mayor.toFixed(2)} cm</p>
                </div>
                <div className="bg-stone-50 p-4 text-center">
                  <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Segmento Menor</p>
                  <p className="text-2xl font-light text-slate-800">{seccionAurea.menor.toFixed(2)} cm</p>
                </div>
                <div className="bg-stone-50 p-4 text-center">
                  <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Total (a + b)</p>
                  <p className="text-2xl font-light text-slate-800">{seccionAurea.total.toFixed(2)} cm</p>
                </div>
                <div className="bg-gold-50 p-4 text-center border border-gold-200">
                  <p className="text-xs text-gold-600 uppercase tracking-wide mb-1">Ratio φ</p>
                  <p className="text-2xl font-light text-gold-700">{PHI.toFixed(6)}</p>
                </div>
              </div>

              <p className="text-center text-stone-500 text-sm">
                a/b = (a+b)/a = φ (phi) ≈ 1.618
              </p>
            </div>
          )}

          {/* MODO: Formatos de Lienzo */}
          {modo === 'formato' && (
            <div className="space-y-6">
              <p className="text-center text-stone-600 mb-6">
                Formatos estándar europeos de lienzo para pintura al óleo
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {formatosEstandar.map((formato, index) => (
                  <div
                    key={index}
                    className="bg-stone-50 border border-stone-200 p-5 hover:border-gold-400 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Miniatura del formato */}
                      <div
                        className="bg-white border-2 border-stone-300 flex-shrink-0"
                        style={{
                          width: formato.ratio >= 1 ? '60px' : `${60 / formato.ratio}px`,
                          height: formato.ratio >= 1 ? `${60 / formato.ratio}px` : '60px',
                        }}
                      />
                      <div>
                        <h4 className="font-serif text-lg text-slate-900">{formato.nombre}</h4>
                        <p className="text-gold-600 font-medium">Ratio: {formato.ratio.toFixed(3)}</p>
                        <p className="text-stone-500 text-sm mt-1">{formato.descripcion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tabla de tamaños comunes */}
              <div className="mt-8 bg-stone-50 p-6">
                <h4 className="font-serif text-lg text-slate-900 mb-4 text-center">Tamaños Comunes (cm)</h4>
                <div className="grid grid-cols-4 gap-2 text-center text-sm">
                  <div className="font-medium text-slate-700">Número</div>
                  <div className="font-medium text-slate-700">Figura (F)</div>
                  <div className="font-medium text-slate-700">Paisaje (P)</div>
                  <div className="font-medium text-slate-700">Marina (M)</div>

                  <div className="text-stone-600">4</div>
                  <div className="text-stone-600">33×24</div>
                  <div className="text-stone-600">33×22</div>
                  <div className="text-stone-600">33×19</div>

                  <div className="text-stone-600">8</div>
                  <div className="text-stone-600">46×38</div>
                  <div className="text-stone-600">46×33</div>
                  <div className="text-stone-600">46×27</div>

                  <div className="text-stone-600">12</div>
                  <div className="text-stone-600">61×50</div>
                  <div className="text-stone-600">61×46</div>
                  <div className="text-stone-600">61×38</div>

                  <div className="text-stone-600">20</div>
                  <div className="text-stone-600">73×60</div>
                  <div className="text-stone-600">73×54</div>
                  <div className="text-stone-600">73×50</div>

                  <div className="text-stone-600">40</div>
                  <div className="text-stone-600">100×81</div>
                  <div className="text-stone-600">100×73</div>
                  <div className="text-stone-600">100×65</div>
                </div>
              </div>
            </div>
          )}

          {/* MODO: Escalador */}
          {modo === 'escala' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] text-slate-500 uppercase mb-2">
                    Ancho original (cm)
                  </label>
                  <input
                    type="number"
                    value={formatoOrigen.ancho}
                    onChange={(e) => setFormatoOrigen({ ...formatoOrigen, ancho: parseFloat(e.target.value) || 1 })}
                    className="w-full h-12 border border-stone-300 text-center text-lg focus:border-gold-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.2em] text-slate-500 uppercase mb-2">
                    Alto original (cm)
                  </label>
                  <input
                    type="number"
                    value={formatoOrigen.alto}
                    onChange={(e) => setFormatoOrigen({ ...formatoOrigen, alto: parseFloat(e.target.value) || 1 })}
                    className="w-full h-12 border border-stone-300 text-center text-lg focus:border-gold-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.2em] text-slate-500 uppercase mb-2">
                    Escala (%)
                  </label>
                  <input
                    type="number"
                    value={escalaDeseada}
                    onChange={(e) => setEscalaDeseada(parseFloat(e.target.value) || 1)}
                    className="w-full h-12 border border-stone-300 text-center text-lg focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Slider de escala */}
              <div className="px-4">
                <input
                  type="range"
                  min="10"
                  max="300"
                  value={escalaDeseada}
                  onChange={(e) => setEscalaDeseada(parseFloat(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-stone-400 mt-1">
                  <span>10%</span>
                  <span>100%</span>
                  <span>200%</span>
                  <span>300%</span>
                </div>
              </div>

              {/* Visualización comparativa */}
              <div className="flex justify-center items-end gap-8">
                <div className="text-center">
                  <div
                    className="bg-stone-200 border border-stone-300 mx-auto mb-2"
                    style={{
                      width: `${Math.min(formatoOrigen.ancho * 1.5, 150)}px`,
                      height: `${Math.min(formatoOrigen.alto * 1.5, 120)}px`,
                    }}
                  />
                  <p className="text-sm text-stone-500">Original</p>
                  <p className="text-xs text-stone-400">{formatoOrigen.ancho} × {formatoOrigen.alto} cm</p>
                </div>
                <div className="text-center">
                  <div
                    className="bg-gold-200 border-2 border-gold-400 mx-auto mb-2"
                    style={{
                      width: `${Math.min(escalaResultado.nuevoAncho * 1.5, 300)}px`,
                      height: `${Math.min(escalaResultado.nuevoAlto * 1.5, 240)}px`,
                    }}
                  />
                  <p className="text-sm text-gold-600 font-medium">Escalado ({escalaDeseada}%)</p>
                  <p className="text-xs text-gold-500">{escalaResultado.nuevoAncho.toFixed(1)} × {escalaResultado.nuevoAlto.toFixed(1)} cm</p>
                </div>
              </div>

              {/* Resultados */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-gold-50 border border-gold-200 p-4 text-center">
                  <p className="text-xs text-gold-600 uppercase tracking-wide mb-1">Nuevo Ancho</p>
                  <p className="text-3xl font-light text-gold-700">{escalaResultado.nuevoAncho.toFixed(2)} cm</p>
                </div>
                <div className="bg-gold-50 border border-gold-200 p-4 text-center">
                  <p className="text-xs text-gold-600 uppercase tracking-wide mb-1">Nuevo Alto</p>
                  <p className="text-3xl font-light text-gold-700">{escalaResultado.nuevoAlto.toFixed(2)} cm</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// ============================================
// APP 6: SIMULADOR DE VALORES TONALES
// ============================================
const SimuladorValores: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showGrayscale, setShowGrayscale] = useState(false);
  const [contrast, setContrast] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Manejar subida de imagen
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setShowGrayscale(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Procesar imagen a escala de grises
  const processToGrayscale = () => {
    if (!canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imageRef.current;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.filter = `grayscale(100%) contrast(${contrast}%)`;
    ctx.drawImage(img, 0, 0);
  };

  // Efecto para procesar imagen cuando cambian los parámetros
  React.useEffect(() => {
    if (showGrayscale && uploadedImage) {
      // Esperar a que la imagen cargue
      const img = new Image();
      img.onload = () => {
        if (imageRef.current) {
          imageRef.current.src = uploadedImage;
          setTimeout(processToGrayscale, 100);
        }
      };
      img.src = uploadedImage;
    }
  }, [showGrayscale, contrast, uploadedImage]);

  // Escala de valores de referencia
  const valueScale = [
    { value: 0, label: 'Negro puro', color: '#000000' },
    { value: 1, label: 'Muy oscuro', color: '#1a1a1a' },
    { value: 2, label: 'Oscuro', color: '#333333' },
    { value: 3, label: 'Medio oscuro', color: '#4d4d4d' },
    { value: 4, label: 'Medio bajo', color: '#666666' },
    { value: 5, label: 'Medio', color: '#808080' },
    { value: 6, label: 'Medio alto', color: '#999999' },
    { value: 7, label: 'Claro', color: '#b3b3b3' },
    { value: 8, label: 'Muy claro', color: '#cccccc' },
    { value: 9, label: 'Casi blanco', color: '#e6e6e6' },
    { value: 10, label: 'Blanco puro', color: '#ffffff' },
  ];

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
          Simulador de Valores Tonales
        </h2>
        <p className="text-stone-500 text-lg leading-relaxed">
          Analiza la estructura tonal de tu obra convirtiendo a escala de grises.
          Esencial para entender el contraste y la composición.
        </p>
      </header>

      {/* Panel de control */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-white border border-stone-200 p-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Subida de imagen */}
            <label className="flex items-center justify-center h-12 px-6 border border-dashed border-stone-300 hover:border-gold-400 cursor-pointer bg-stone-50 hover:bg-stone-100 transition-colors">
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

            {/* Toggle de vista */}
            {uploadedImage && (
              <button
                onClick={() => setShowGrayscale(!showGrayscale)}
                className={`h-12 px-6 text-sm tracking-wide transition-all ${
                  showGrayscale
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-stone-300 text-stone-600 hover:border-gold-400'
                }`}
              >
                {showGrayscale ? 'Ver Original' : 'Ver Valores Tonales'}
              </button>
            )}

            {/* Control de contraste */}
            {uploadedImage && showGrayscale && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-500 uppercase tracking-wide">Contraste:</span>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={contrast}
                  onChange={(e) => setContrast(parseInt(e.target.value))}
                  className="w-32 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-stone-600 w-12">{contrast}%</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Área de visualización */}
      <section className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 md:p-10">
          {!uploadedImage ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <svg className="w-20 h-20 text-slate-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-slate-400 text-lg">Sube una imagen para analizar sus valores tonales</p>
            </div>
          ) : (
            <div className="relative">
              {/* Imagen oculta para referencia */}
              <img
                ref={imageRef}
                src={uploadedImage}
                alt="Referencia"
                className="hidden"
                crossOrigin="anonymous"
              />

              {/* Vista original o procesada */}
              {!showGrayscale ? (
                <img
                  src={uploadedImage}
                  alt="Tu obra"
                  className="max-w-full max-h-[600px] mx-auto shadow-2xl"
                />
              ) : (
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Tu obra en escala de grises"
                    className="max-w-full max-h-[600px] mx-auto shadow-2xl"
                    style={{ filter: `grayscale(100%) contrast(${contrast}%)` }}
                  />
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              )}

              {/* Indicador de modo */}
              <div className="absolute top-4 right-4 bg-black/70 px-4 py-2 text-white text-sm uppercase tracking-wide">
                {showGrayscale ? 'Valores Tonales' : 'Original'}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Escala de valores de referencia */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-white border border-stone-200 p-8">
          <h3 className="font-serif text-xl text-slate-900 mb-6 text-center">
            Escala de Valores de Referencia (0-10)
          </h3>
          <div className="flex gap-0.5">
            {valueScale.map((item) => (
              <div key={item.value} className="flex-1 text-center">
                <div
                  className="h-16 border border-stone-300 mb-2"
                  style={{ backgroundColor: item.color }}
                />
                <p className="text-lg font-light text-slate-700">{item.value}</p>
                <p className="text-[10px] text-stone-400 leading-tight">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Información educativa */}
      <section className="max-w-3xl mx-auto">
        <div className="bg-stone-50 border border-stone-200 p-8">
          <h4 className="font-serif text-lg text-slate-900 mb-4">¿Por qué analizar valores?</h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-gold-600 font-medium mb-2">Composición</p>
              <p className="text-stone-600 text-sm leading-relaxed">
                Los valores guían la mirada del espectador. Alto contraste atrae la atención.
              </p>
            </div>
            <div>
              <p className="text-gold-600 font-medium mb-2">Atmósfera</p>
              <p className="text-stone-600 text-sm leading-relaxed">
                Valores cercanos crean calma. Valores contrastados generan drama.
              </p>
            </div>
            <div>
              <p className="text-gold-600 font-medium mb-2">Legibilidad</p>
              <p className="text-stone-600 text-sm leading-relaxed">
                Una obra que funciona en grises, funcionará siempre en color.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EstudioDigital;
