import React, { useState, useMemo, useRef } from 'react';
import { ArrowLeft, Gift, Crown, Sparkles, Eye, Palette } from 'lucide-react';
import AtlasTransparencias from './AtlasTransparencias';
import PaletasMaestros from './PaletasMaestros';

// ============================================
// TIPOS
// ============================================
type AppView = 'gallery' | 'composicion' | 'pigmentos' | 'analizador' | 'circuloCromatico' | 'proporciones' | 'valores' | 'atlas' | 'maestros';

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
      {currentView === 'atlas' && <AtlasTransparencias onBack={() => setCurrentView('gallery')} />}
      {currentView === 'maestros' && <PaletasMaestros onBack={() => setCurrentView('gallery')} />}
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
          Siete herramientas gratuitas como <span className="font-medium">cortesía de Myriam Alcaraz</span> para la comunidad artística
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

        {/* APP 6: Atlas de Transparencias - GRATIS */}
        <button
          onClick={() => onOpenApp('atlas')}
          className="group bg-white border border-stone-200 p-8 flex flex-col hover:border-gold-400 hover:shadow-xl transition-all duration-500 text-left"
        >
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-sky-100 via-amber-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
              <Eye className="w-10 h-10 text-sky-600" />
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.3em] text-emerald-600 uppercase font-medium bg-emerald-50 px-3 py-1">
              <Gift size={12} /> Gratuito
            </span>
          </div>

          <h3 className="font-serif text-2xl text-slate-900 text-center mb-3 leading-snug">
            Atlas de Transparencias
          </h3>

          <p className="text-stone-500 text-base leading-relaxed text-center flex-grow mb-6">
            Explora el comportamiento lumínico de cada pigmento. Opacidad, veladura y poder cubriente en las 3 marcas premium.
          </p>

          <div className="border-t border-stone-100 pt-6 text-center">
            <span className="inline-block border border-gold-500 text-gold-600 py-3 px-8 text-sm tracking-[0.2em] uppercase group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
              Explorar Atlas
            </span>
          </div>
        </button>

        {/* APP 7: Paletas de los Maestros - GRATIS */}
        <button
          onClick={() => onOpenApp('maestros')}
          className="group bg-white border border-stone-200 p-8 flex flex-col hover:border-gold-400 hover:shadow-xl transition-all duration-500 text-left"
        >
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
              <Palette className="w-10 h-10 text-amber-600" />
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.3em] text-emerald-600 uppercase font-medium bg-emerald-50 px-3 py-1">
              <Gift size={12} /> Gratuito
            </span>
          </div>

          <h3 className="font-serif text-2xl text-slate-900 text-center mb-3 leading-snug">
            Paletas de los Maestros
          </h3>

          <p className="text-stone-500 text-base leading-relaxed text-center flex-grow mb-6">
            Las paletas reales de Velázquez, Rembrandt, Sorolla, Zorn, Vermeer y Sargent con equivalentes modernos.
          </p>

          <div className="border-t border-stone-100 pt-6 text-center">
            <span className="inline-block border border-gold-500 text-gold-600 py-3 px-8 text-sm tracking-[0.2em] uppercase group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
              Ver Paletas
            </span>
          </div>
        </button>

        {/* APP 8: Analizador Premium - DE PAGO */}
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
// APP 4: CÍRCULO CROMÁTICO INTERACTIVO - VERSIÓN PROFESIONAL
// ============================================
const CirculoCromatico: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedHue, setSelectedHue] = useState<number>(0);
  const [saturation, setSaturation] = useState<number>(75);
  const [lightness, setLightness] = useState<number>(50);
  const [harmonyType, setHarmonyType] = useState<'complementario' | 'analogo' | 'triadico' | 'split' | 'tetradico' | 'monocromatico'>('complementario');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(false);

  // Nombres artísticos de los colores
  const getColorName = (hue: number): string => {
    const names: { [key: number]: string } = {
      0: 'Rojo Carmín', 15: 'Rojo Bermellón', 30: 'Naranja Cadmio',
      45: 'Naranja Dorado', 60: 'Amarillo Cadmio', 75: 'Amarillo Limón',
      90: 'Verde Chartreuse', 105: 'Verde Lima', 120: 'Verde Esmeralda',
      135: 'Verde Veronés', 150: 'Verde Aguamarina', 165: 'Turquesa',
      180: 'Cian', 195: 'Azul Cerúleo', 210: 'Azul Cobalto',
      225: 'Azul Ultramar', 240: 'Azul Índigo', 255: 'Violeta Cobalto',
      270: 'Violeta', 285: 'Púrpura', 300: 'Magenta',
      315: 'Magenta Rosa', 330: 'Rosa Carmín', 345: 'Rojo Rosa'
    };
    const nearestHue = Math.round(hue / 15) * 15 % 360;
    return names[nearestHue] || 'Color Personalizado';
  };

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

  // Convertir HEX a RGB
  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
    }
    return '0, 0, 0';
  };

  // Calcular colores de armonía
  const getHarmonyColors = () => {
    const base = selectedHue;
    switch (harmonyType) {
      case 'complementario':
        return [{ hue: base, role: 'Principal' }, { hue: (base + 180) % 360, role: 'Complementario' }];
      case 'analogo':
        return [
          { hue: (base - 30 + 360) % 360, role: 'Análogo Frío' },
          { hue: base, role: 'Principal' },
          { hue: (base + 30) % 360, role: 'Análogo Cálido' }
        ];
      case 'triadico':
        return [
          { hue: base, role: 'Principal' },
          { hue: (base + 120) % 360, role: 'Triádico 2' },
          { hue: (base + 240) % 360, role: 'Triádico 3' }
        ];
      case 'split':
        return [
          { hue: base, role: 'Principal' },
          { hue: (base + 150) % 360, role: 'Split 1' },
          { hue: (base + 210) % 360, role: 'Split 2' }
        ];
      case 'tetradico':
        return [
          { hue: base, role: 'Principal' },
          { hue: (base + 90) % 360, role: 'Cuadrante 2' },
          { hue: (base + 180) % 360, role: 'Opuesto' },
          { hue: (base + 270) % 360, role: 'Cuadrante 4' }
        ];
      case 'monocromatico':
        return [{ hue: base, role: 'Base' }];
      default:
        return [{ hue: base, role: 'Principal' }];
    }
  };

  const harmonyColors = getHarmonyColors();

  // Generar variaciones de un color
  const getColorVariations = (hue: number) => [
    { label: 'Tinte Alto', hex: hslToHex(hue, saturation * 0.4, 90), s: saturation * 0.4, l: 90 },
    { label: 'Tinte', hex: hslToHex(hue, saturation * 0.6, 75), s: saturation * 0.6, l: 75 },
    { label: 'Base', hex: hslToHex(hue, saturation, lightness), s: saturation, l: lightness },
    { label: 'Tono', hex: hslToHex(hue, saturation * 0.7, lightness * 0.7), s: saturation * 0.7, l: lightness * 0.7 },
    { label: 'Sombra', hex: hslToHex(hue, saturation * 0.8, 25), s: saturation * 0.8, l: 25 },
  ];

  // Copiar color al portapapeles
  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Generar segmentos del círculo (24 para más precisión)
  const segments = Array.from({ length: 24 }, (_, i) => i * 15);

  // Armonías info
  const harmonyInfo: { [key: string]: { title: string; description: string; icon: string } } = {
    complementario: {
      title: 'Complementario',
      description: 'Colores opuestos que crean máximo contraste. Ideales para destacar el centro de interés. Vermeer y Monet los usaron magistralmente.',
      icon: '◐'
    },
    analogo: {
      title: 'Análogo',
      description: 'Colores vecinos que crean armonía natural y transiciones suaves. Perfectos para paisajes y atmósferas unificadas.',
      icon: '≋'
    },
    triadico: {
      title: 'Triádico',
      description: 'Tres colores equidistantes que ofrecen equilibrio vibrante. Usado por los impresionistas para capturar la luz.',
      icon: '△'
    },
    split: {
      title: 'Complementario Dividido',
      description: 'El color base con los dos adyacentes a su complementario. Contraste suavizado pero dinámico.',
      icon: '⋔'
    },
    tetradico: {
      title: 'Tetrádico (Cuadrado)',
      description: 'Cuatro colores en cuadrado. La paleta más rica, requiere equilibrar un color dominante.',
      icon: '◇'
    },
    monocromatico: {
      title: 'Monocromático',
      description: 'Un solo matiz en diferentes valores y saturaciones. Elegancia y sofisticación. Ideal para retratos.',
      icon: '●'
    }
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
        <h2 className="font-serif text-4xl md:text-5xl text-slate-900 tracking-wide mb-4">
          Círculo Cromático del Artista
        </h2>
        <p className="text-stone-500 text-lg leading-relaxed">
          Explora armonías de color como los grandes maestros. Genera paletas profesionales
          con un clic y copia los códigos directamente.
        </p>
      </header>

      {/* Selector de armonía con iconos */}
      <section className="max-w-4xl mx-auto">
        <div className="flex justify-center gap-2 flex-wrap">
          {Object.entries(harmonyInfo).map(([id, info]) => (
            <button
              key={id}
              onClick={() => setHarmonyType(id as typeof harmonyType)}
              className={`px-4 py-3 text-sm tracking-wide transition-all duration-300 flex items-center gap-2 ${
                harmonyType === id
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white border border-stone-200 text-stone-600 hover:border-gold-400 hover:shadow'
              }`}
            >
              <span className="text-lg">{info.icon}</span>
              <span className="hidden sm:inline">{info.title}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Panel principal */}
      <section className="max-w-6xl mx-auto">
        <div className="bg-white border border-stone-200 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-0">

            {/* Lado izquierdo: Círculo Cromático */}
            <div className="bg-gradient-to-br from-slate-50 to-stone-100 p-8 flex flex-col items-center justify-center">
              {/* Círculo Cromático SVG Mejorado */}
              <div className="relative mb-6">
                <svg
                  width="340"
                  height="340"
                  viewBox="0 0 340 340"
                  className={`drop-shadow-2xl transition-transform duration-1000 ${isRotating ? 'rotate-180' : ''}`}
                >
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Anillo exterior de saturación */}
                  {segments.map((hue) => {
                    const startAngle = (hue - 7.5) * Math.PI / 180;
                    const endAngle = (hue + 7.5) * Math.PI / 180;
                    const outerRadius = 165;
                    const innerRadius = 145;

                    const x1 = 170 + innerRadius * Math.cos(startAngle - Math.PI / 2);
                    const y1 = 170 + innerRadius * Math.sin(startAngle - Math.PI / 2);
                    const x2 = 170 + outerRadius * Math.cos(startAngle - Math.PI / 2);
                    const y2 = 170 + outerRadius * Math.sin(startAngle - Math.PI / 2);
                    const x3 = 170 + outerRadius * Math.cos(endAngle - Math.PI / 2);
                    const y3 = 170 + outerRadius * Math.sin(endAngle - Math.PI / 2);
                    const x4 = 170 + innerRadius * Math.cos(endAngle - Math.PI / 2);
                    const y4 = 170 + innerRadius * Math.sin(endAngle - Math.PI / 2);

                    return (
                      <path
                        key={`outer-${hue}`}
                        d={`M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}`}
                        fill={hslToHex(hue, 100, 50)}
                        opacity="0.3"
                      />
                    );
                  })}

                  {/* Segmentos principales del círculo */}
                  {segments.map((hue) => {
                    const startAngle = (hue - 7.5) * Math.PI / 180;
                    const endAngle = (hue + 7.5) * Math.PI / 180;
                    const innerRadius = 70;
                    const outerRadius = 140;

                    const x1 = 170 + innerRadius * Math.cos(startAngle - Math.PI / 2);
                    const y1 = 170 + innerRadius * Math.sin(startAngle - Math.PI / 2);
                    const x2 = 170 + outerRadius * Math.cos(startAngle - Math.PI / 2);
                    const y2 = 170 + outerRadius * Math.sin(startAngle - Math.PI / 2);
                    const x3 = 170 + outerRadius * Math.cos(endAngle - Math.PI / 2);
                    const y3 = 170 + outerRadius * Math.sin(endAngle - Math.PI / 2);
                    const x4 = 170 + innerRadius * Math.cos(endAngle - Math.PI / 2);
                    const y4 = 170 + innerRadius * Math.sin(endAngle - Math.PI / 2);

                    const isInHarmony = harmonyColors.some(c => Math.abs(c.hue - hue) < 10 || Math.abs(c.hue - hue) > 350);
                    const isSelected = Math.abs(selectedHue - hue) < 10 || Math.abs(selectedHue - hue) > 350;

                    return (
                      <path
                        key={hue}
                        d={`M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}`}
                        fill={hslToHex(hue, saturation, lightness)}
                        stroke={isSelected ? '#1e293b' : isInHarmony ? '#d4af37' : 'rgba(255,255,255,0.5)'}
                        strokeWidth={isSelected ? 4 : isInHarmony ? 3 : 1}
                        className="cursor-pointer transition-all duration-200 hover:opacity-80"
                        onClick={() => setSelectedHue(hue)}
                        filter={isInHarmony ? 'url(#glow)' : undefined}
                      />
                    );
                  })}

                  {/* Centro con color seleccionado */}
                  <circle
                    cx="170"
                    cy="170"
                    r="65"
                    fill={hslToHex(selectedHue, saturation, lightness)}
                    stroke="#fff"
                    strokeWidth="4"
                    className="drop-shadow-lg"
                  />
                  <circle cx="170" cy="170" r="55" fill="rgba(255,255,255,0.15)" />

                  {/* Líneas de armonía */}
                  {harmonyColors.length > 1 && harmonyColors.map((color, index) => {
                    if (index === 0) return null;
                    const angle1 = (harmonyColors[0].hue - 90) * Math.PI / 180;
                    const angle2 = (color.hue - 90) * Math.PI / 180;
                    const r = 105;
                    return (
                      <line
                        key={`line-${index}`}
                        x1={170 + r * Math.cos(angle1)}
                        y1={170 + r * Math.sin(angle1)}
                        x2={170 + r * Math.cos(angle2)}
                        y2={170 + r * Math.sin(angle2)}
                        stroke="#d4af37"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        opacity="0.7"
                      />
                    );
                  })}

                  {/* Indicadores de armonía */}
                  {harmonyColors.map((color, index) => {
                    const angle = (color.hue - 90) * Math.PI / 180;
                    const x = 170 + 105 * Math.cos(angle);
                    const y = 170 + 105 * Math.sin(angle);
                    return (
                      <g key={`indicator-${index}`}>
                        <circle
                          cx={x}
                          cy={y}
                          r="14"
                          fill={hslToHex(color.hue, saturation, lightness)}
                          stroke="#fff"
                          strokeWidth="3"
                          className="drop-shadow-lg"
                        />
                        <text
                          x={x}
                          y={y + 1}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#fff"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          {index + 1}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Controles de Saturación y Luminosidad */}
              <div className="w-full max-w-xs space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-stone-500 mb-1">
                    <span>Saturación</span>
                    <span>{saturation}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={saturation}
                    onChange={(e) => setSaturation(parseInt(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${hslToHex(selectedHue, 0, lightness)}, ${hslToHex(selectedHue, 100, lightness)})`
                    }}
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-stone-500 mb-1">
                    <span>Luminosidad</span>
                    <span>{lightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={lightness}
                    onChange={(e) => setLightness(parseInt(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${hslToHex(selectedHue, saturation, 10)}, ${hslToHex(selectedHue, saturation, 50)}, ${hslToHex(selectedHue, saturation, 90)})`
                    }}
                  />
                </div>
              </div>

              {/* Nombre del color */}
              <div className="mt-6 text-center">
                <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Color Seleccionado</p>
                <p className="font-serif text-xl text-slate-800">{getColorName(selectedHue)}</p>
                <p className="text-sm text-stone-500 font-mono mt-1">{hslToHex(selectedHue, saturation, lightness).toUpperCase()}</p>
              </div>
            </div>

            {/* Lado derecho: Paleta generada */}
            <div className="p-8 bg-white">
              {/* Info de la armonía */}
              <div className="mb-6 p-4 bg-gradient-to-r from-gold-50 to-amber-50 border border-gold-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{harmonyInfo[harmonyType].icon}</span>
                  <div>
                    <h4 className="font-serif text-lg text-slate-900">{harmonyInfo[harmonyType].title}</h4>
                    <p className="text-sm text-stone-600 leading-relaxed mt-1">{harmonyInfo[harmonyType].description}</p>
                  </div>
                </div>
              </div>

              {/* Paleta completa */}
              <h3 className="font-serif text-lg text-slate-900 mb-4">Tu Paleta Personalizada</h3>

              <div className="space-y-6">
                {harmonyColors.map((color, colorIndex) => (
                  <div key={colorIndex} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-500 uppercase tracking-wide">{color.role}</span>
                      <span className="text-xs text-stone-400">{getColorName(color.hue)}</span>
                    </div>

                    {/* Variaciones del color */}
                    <div className="flex gap-1">
                      {getColorVariations(color.hue).map((variation, i) => (
                        <button
                          key={i}
                          onClick={() => copyColor(variation.hex)}
                          className="flex-1 group relative"
                          title={`${variation.label}: ${variation.hex}`}
                        >
                          <div
                            className="h-16 rounded-sm transition-transform duration-200 group-hover:scale-105 group-hover:shadow-lg border border-stone-200"
                            style={{ backgroundColor: variation.hex }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            {copiedColor === variation.hex ? (
                              <span className="bg-black/80 text-white text-xs px-2 py-1 rounded">Copiado</span>
                            ) : (
                              <span className="bg-black/60 text-white text-xs px-2 py-1 rounded">Copiar</span>
                            )}
                          </div>
                          <p className="text-[9px] text-stone-400 text-center mt-1 truncate">{variation.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Códigos de la paleta principal */}
              <div className="mt-8 p-4 bg-slate-50 rounded-lg">
                <h4 className="text-xs text-stone-500 uppercase tracking-wide mb-3">Códigos de tu paleta</h4>
                <div className="grid grid-cols-2 gap-2">
                  {harmonyColors.map((color, i) => {
                    const hex = hslToHex(color.hue, saturation, lightness);
                    return (
                      <button
                        key={i}
                        onClick={() => copyColor(hex)}
                        className="flex items-center gap-2 p-2 bg-white border border-stone-200 rounded hover:border-gold-400 transition-colors group"
                      >
                        <div
                          className="w-8 h-8 rounded border border-stone-200"
                          style={{ backgroundColor: hex }}
                        />
                        <div className="text-left flex-1">
                          <p className="text-xs font-mono text-slate-700">{hex.toUpperCase()}</p>
                          <p className="text-[10px] text-stone-400">RGB: {hexToRgb(hex)}</p>
                        </div>
                        <span className="text-xs text-stone-400 opacity-0 group-hover:opacity-100">
                          {copiedColor === hex ? '✓' : 'Copiar'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consejo del maestro */}
      <section className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-center">
          <p className="text-[10px] tracking-[0.3em] text-gold-400 uppercase mb-4">Consejo del Maestro</p>
          <p className="text-white text-lg leading-relaxed font-serif italic">
            "En la paleta del artista, menos es más. Domina primero una armonía simple
            antes de aventurarte en combinaciones complejas. El ojo entrenado reconoce
            la elegancia de la restricción."
          </p>
          <p className="text-gold-400 mt-4 text-sm">— Tradición del Atelier</p>
        </div>
      </section>
    </div>
  );
};

// ============================================
// APP 5: CALCULADORA DE PROPORCIONES - VERSIÓN PROFESIONAL
// ============================================
const CalculadoraProporciones: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [modo, setModo] = useState<'aurea' | 'formato' | 'escala' | 'personalizado'>('aurea');
  const [medidaBase, setMedidaBase] = useState<number>(100);
  const [formatoOrigen, setFormatoOrigen] = useState({ ancho: 100, alto: 81 });
  const [escalaDeseada, setEscalaDeseada] = useState<number>(50);
  const [orientacion, setOrientacion] = useState<'horizontal' | 'vertical'>('horizontal');
  const [formatoSeleccionado, setFormatoSeleccionado] = useState<string | null>(null);
  const [anchoDeseado, setAnchoDeseado] = useState<number>(100);

  const PHI = 1.618033988749895;

  // Secuencia de Fibonacci para la espiral
  const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

  // Formatos estándar de lienzo con más detalle
  const formatosEstandar = [
    { nombre: 'Figura (F)', ratio: 1.236, descripcion: 'Retrato y figura humana', uso: 'Retratos, figura completa', icono: '👤' },
    { nombre: 'Paisaje (P)', ratio: 1.382, descripcion: 'Vistas horizontales', uso: 'Paisajes, escenas amplias', icono: '🏞️' },
    { nombre: 'Marina (M)', ratio: 1.618, descripcion: 'Proporción áurea exacta', uso: 'Marinas, horizontes', icono: '🌊' },
    { nombre: 'Cuadrado', ratio: 1.0, descripcion: 'Formato cuadrado', uso: 'Bodegones, retratos íntimos', icono: '⬜' },
  ];

  // Tabla completa de medidas
  const tablaMedidas = [
    { num: 0, f: '18×14', p: '18×12', m: '18×10' },
    { num: 1, f: '22×16', p: '22×14', m: '22×12' },
    { num: 2, f: '24×19', p: '24×16', m: '24×14' },
    { num: 3, f: '27×22', p: '27×19', m: '27×16' },
    { num: 4, f: '33×24', p: '33×22', m: '33×19' },
    { num: 5, f: '35×27', p: '35×24', m: '35×22' },
    { num: 6, f: '41×33', p: '41×27', m: '41×24' },
    { num: 8, f: '46×38', p: '46×33', m: '46×27' },
    { num: 10, f: '55×46', p: '55×38', m: '55×33' },
    { num: 12, f: '61×50', p: '61×46', m: '61×38' },
    { num: 15, f: '65×54', p: '65×50', m: '65×46' },
    { num: 20, f: '73×60', p: '73×54', m: '73×50' },
    { num: 25, f: '81×65', p: '81×60', m: '81×54' },
    { num: 30, f: '92×73', p: '92×65', m: '92×60' },
    { num: 40, f: '100×81', p: '100×73', m: '100×65' },
    { num: 50, f: '116×89', p: '116×81', m: '116×73' },
    { num: 60, f: '130×97', p: '130×89', m: '130×81' },
    { num: 80, f: '146×114', p: '146×97', m: '146×89' },
    { num: 100, f: '162×130', p: '162×114', m: '162×97' },
    { num: 120, f: '195×130', p: '195×114', m: '195×97' },
  ];

  // Cálculos áureos completos
  const seccionAurea = {
    mayor: medidaBase,
    menor: medidaBase / PHI,
    total: medidaBase + medidaBase / PHI,
    lienzo: { ancho: medidaBase, alto: medidaBase / PHI },
  };

  // Escala proporcional
  const escalaResultado = {
    nuevoAncho: (formatoOrigen.ancho * escalaDeseada) / 100,
    nuevoAlto: (formatoOrigen.alto * escalaDeseada) / 100,
    area: ((formatoOrigen.ancho * escalaDeseada) / 100) * ((formatoOrigen.alto * escalaDeseada) / 100),
    areaOriginal: formatoOrigen.ancho * formatoOrigen.alto,
  };

  // Calcular medidas para formato seleccionado
  const calcularMedidasFormato = (ratio: number, ancho: number) => {
    if (orientacion === 'horizontal') {
      return { ancho, alto: ancho / ratio };
    } else {
      return { ancho: ancho / ratio, alto: ancho };
    }
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
        <h2 className="font-serif text-4xl md:text-5xl text-slate-900 tracking-wide mb-4">
          Calculadora de Proporciones
        </h2>
        <p className="text-stone-500 text-lg leading-relaxed">
          Domina la proporción áurea, los formatos clásicos y las escalas perfectas
          para crear composiciones magistrales.
        </p>
      </header>

      {/* Selector de modo */}
      <section className="max-w-3xl mx-auto">
        <div className="flex justify-center gap-2 flex-wrap">
          {[
            { id: 'aurea', label: 'Sección Áurea', icon: 'φ' },
            { id: 'formato', label: 'Formatos Clásicos', icon: '▭' },
            { id: 'escala', label: 'Escalador', icon: '⇲' },
            { id: 'personalizado', label: 'Personalizado', icon: '✎' },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setModo(id as typeof modo)}
              className={`px-5 py-3 text-sm tracking-wide transition-all duration-300 flex items-center gap-2 ${
                modo === id
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white border border-stone-200 text-stone-600 hover:border-gold-400'
              }`}
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Contenido según modo */}
      <section className="max-w-5xl mx-auto">

        {/* MODO: Sección Áurea */}
        {modo === 'aurea' && (
          <div className="bg-white border border-stone-200 shadow-xl">
            <div className="grid lg:grid-cols-2">
              {/* Visualización de la espiral */}
              <div className="bg-gradient-to-br from-amber-50 to-gold-100 p-8 flex flex-col items-center justify-center">
                <p className="text-xs text-gold-600 uppercase tracking-widest mb-6">Rectángulo Áureo con Espiral</p>

                {/* SVG del rectángulo áureo con espiral de Fibonacci */}
                <svg viewBox="0 0 377 233" className="w-full max-w-md drop-shadow-lg">
                  {/* Rectángulo principal */}
                  <rect x="0" y="0" width="377" height="233" fill="#fef3c7" stroke="#d4af37" strokeWidth="2" />

                  {/* Cuadrados de Fibonacci */}
                  <rect x="0" y="0" width="233" height="233" fill="rgba(212, 175, 55, 0.1)" stroke="#d4af37" strokeWidth="1" />
                  <rect x="233" y="0" width="144" height="144" fill="rgba(212, 175, 55, 0.15)" stroke="#d4af37" strokeWidth="1" />
                  <rect x="233" y="144" width="89" height="89" fill="rgba(212, 175, 55, 0.2)" stroke="#d4af37" strokeWidth="1" />
                  <rect x="322" y="144" width="55" height="55" fill="rgba(212, 175, 55, 0.25)" stroke="#d4af37" strokeWidth="1" />
                  <rect x="322" y="199" width="34" height="34" fill="rgba(212, 175, 55, 0.3)" stroke="#d4af37" strokeWidth="1" />
                  <rect x="356" y="199" width="21" height="21" fill="rgba(212, 175, 55, 0.35)" stroke="#d4af37" strokeWidth="1" />

                  {/* Espiral aproximada */}
                  <path
                    d="M 233 233
                       A 233 233 0 0 1 0 0
                       A 144 144 0 0 1 377 144
                       A 89 89 0 0 1 233 233
                       A 55 55 0 0 1 322 144
                       A 34 34 0 0 1 356 199
                       A 21 21 0 0 1 322 220"
                    fill="none"
                    stroke="#92400e"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Números de Fibonacci */}
                  <text x="116" y="120" textAnchor="middle" fill="#92400e" fontSize="24" fontWeight="bold">1</text>
                  <text x="305" y="75" textAnchor="middle" fill="#92400e" fontSize="18" fontWeight="bold">0.618</text>
                </svg>

                {/* Input de medida base */}
                <div className="mt-8 text-center">
                  <label className="block text-[10px] tracking-[0.2em] text-gold-700 uppercase mb-2">
                    Medida del lado mayor (cm)
                  </label>
                  <input
                    type="number"
                    value={medidaBase}
                    onChange={(e) => setMedidaBase(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-36 h-14 border-2 border-gold-400 text-center text-2xl focus:border-gold-600 focus:outline-none bg-white rounded-lg"
                  />
                </div>
              </div>

              {/* Resultados y explicación */}
              <div className="p-8">
                <h3 className="font-serif text-2xl text-slate-900 mb-6">La Divina Proporción</h3>

                {/* Resultados calculados */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-gold-50 to-amber-50 p-5 rounded-lg border border-gold-200">
                    <p className="text-xs text-gold-600 uppercase tracking-wide mb-1">Lado Mayor (a)</p>
                    <p className="text-3xl font-light text-gold-800">{seccionAurea.mayor.toFixed(2)}</p>
                    <p className="text-xs text-gold-600">centímetros</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-5 rounded-lg border border-amber-200">
                    <p className="text-xs text-amber-600 uppercase tracking-wide mb-1">Lado Menor (b)</p>
                    <p className="text-3xl font-light text-amber-800">{seccionAurea.menor.toFixed(2)}</p>
                    <p className="text-xs text-amber-600">centímetros</p>
                  </div>
                  <div className="bg-stone-50 p-5 rounded-lg border border-stone-200">
                    <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">Total (a + b)</p>
                    <p className="text-2xl font-light text-slate-700">{seccionAurea.total.toFixed(2)} cm</p>
                  </div>
                  <div className="bg-slate-900 p-5 rounded-lg text-white">
                    <p className="text-xs text-gold-400 uppercase tracking-wide mb-1">Ratio φ (Phi)</p>
                    <p className="text-2xl font-light">{PHI.toFixed(8)}</p>
                  </div>
                </div>

                {/* Lienzo áureo sugerido */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-lg text-white mb-6">
                  <p className="text-xs text-gold-400 uppercase tracking-widest mb-3">Lienzo Áureo Perfecto</p>
                  <div className="flex items-center justify-center gap-4">
                    <div
                      className="border-2 border-gold-400 bg-gold-400/20"
                      style={{
                        width: `${Math.min(seccionAurea.lienzo.ancho * 1.2, 150)}px`,
                        height: `${Math.min(seccionAurea.lienzo.alto * 1.2, 100)}px`,
                      }}
                    />
                    <div className="text-center">
                      <p className="text-3xl font-light text-gold-400">
                        {seccionAurea.lienzo.ancho.toFixed(1)} × {seccionAurea.lienzo.alto.toFixed(1)}
                      </p>
                      <p className="text-sm text-slate-400">centímetros</p>
                    </div>
                  </div>
                </div>

                {/* Fórmula */}
                <div className="text-center p-4 bg-stone-50 rounded-lg">
                  <p className="font-mono text-lg text-slate-700">a/b = (a+b)/a = φ ≈ 1.618</p>
                  <p className="text-sm text-stone-500 mt-2">
                    "La proporción que el todo guarda con la parte mayor es igual a la que la parte mayor guarda con la menor"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODO: Formatos Clásicos */}
        {modo === 'formato' && (
          <div className="bg-white border border-stone-200 shadow-xl p-8">
            {/* Selector de orientación */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setOrientacion('horizontal')}
                className={`px-6 py-3 flex items-center gap-2 transition-all ${
                  orientacion === 'horizontal' ? 'bg-slate-900 text-white' : 'bg-stone-100 text-stone-600'
                }`}
              >
                <span className="text-xl">▭</span> Horizontal
              </button>
              <button
                onClick={() => setOrientacion('vertical')}
                className={`px-6 py-3 flex items-center gap-2 transition-all ${
                  orientacion === 'vertical' ? 'bg-slate-900 text-white' : 'bg-stone-100 text-stone-600'
                }`}
              >
                <span className="text-xl rotate-90">▭</span> Vertical
              </button>
            </div>

            {/* Grid de formatos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {formatosEstandar.map((formato, index) => {
                const medidas = calcularMedidasFormato(formato.ratio, anchoDeseado);
                const isSelected = formatoSeleccionado === formato.nombre;
                return (
                  <button
                    key={index}
                    onClick={() => setFormatoSeleccionado(formato.nombre)}
                    className={`p-6 text-left transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-br from-gold-100 to-amber-100 border-2 border-gold-400 shadow-lg'
                        : 'bg-stone-50 border border-stone-200 hover:border-gold-300 hover:shadow'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{formato.icono}</span>
                      <div
                        className={`border-2 ${isSelected ? 'border-gold-500 bg-gold-200' : 'border-stone-300 bg-white'}`}
                        style={{
                          width: orientacion === 'horizontal' ? '40px' : `${40 / formato.ratio}px`,
                          height: orientacion === 'horizontal' ? `${40 / formato.ratio}px` : '40px',
                        }}
                      />
                    </div>
                    <h4 className="font-serif text-lg text-slate-900">{formato.nombre}</h4>
                    <p className="text-gold-600 font-medium text-sm">Ratio: {formato.ratio.toFixed(3)}</p>
                    <p className="text-stone-500 text-xs mt-1">{formato.uso}</p>
                    {isSelected && (
                      <p className="text-gold-700 font-medium mt-2">
                        {medidas.ancho.toFixed(1)} × {medidas.alto.toFixed(1)} cm
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Input de ancho deseado */}
            {formatoSeleccionado && (
              <div className="bg-gradient-to-r from-gold-50 to-amber-50 p-6 rounded-lg border border-gold-200 mb-8">
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <div>
                    <label className="block text-xs text-gold-700 uppercase tracking-wide mb-2">
                      {orientacion === 'horizontal' ? 'Ancho deseado' : 'Alto deseado'} (cm)
                    </label>
                    <input
                      type="number"
                      value={anchoDeseado}
                      onChange={(e) => setAnchoDeseado(Math.max(1, parseFloat(e.target.value) || 1))}
                      className="w-32 h-12 border-2 border-gold-400 text-center text-xl focus:border-gold-600 focus:outline-none rounded"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gold-600 uppercase tracking-wide mb-1">Tu lienzo será:</p>
                    <p className="text-3xl font-light text-gold-800">
                      {calcularMedidasFormato(
                        formatosEstandar.find(f => f.nombre === formatoSeleccionado)?.ratio || 1,
                        anchoDeseado
                      ).ancho.toFixed(1)} × {calcularMedidasFormato(
                        formatosEstandar.find(f => f.nombre === formatoSeleccionado)?.ratio || 1,
                        anchoDeseado
                      ).alto.toFixed(1)} cm
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tabla completa de medidas */}
            <div className="bg-slate-900 rounded-lg p-6 overflow-x-auto">
              <h4 className="font-serif text-lg text-white mb-4 text-center">Tabla Completa de Medidas Estándar (cm)</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gold-400 text-xs uppercase tracking-wide">
                    <th className="py-2 px-3 text-left">Nº</th>
                    <th className="py-2 px-3 text-center">Figura (F)</th>
                    <th className="py-2 px-3 text-center">Paisaje (P)</th>
                    <th className="py-2 px-3 text-center">Marina (M)</th>
                  </tr>
                </thead>
                <tbody>
                  {tablaMedidas.map((row, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-slate-800/50' : ''} text-slate-300`}>
                      <td className="py-2 px-3 font-medium text-gold-400">{row.num}</td>
                      <td className="py-2 px-3 text-center">{row.f}</td>
                      <td className="py-2 px-3 text-center">{row.p}</td>
                      <td className="py-2 px-3 text-center">{row.m}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODO: Escalador */}
        {modo === 'escala' && (
          <div className="bg-white border border-stone-200 shadow-xl p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Controles */}
              <div className="space-y-6">
                <h3 className="font-serif text-xl text-slate-900">Dimensiones Originales</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-500 uppercase tracking-wide mb-2">Ancho (cm)</label>
                    <input
                      type="number"
                      value={formatoOrigen.ancho}
                      onChange={(e) => setFormatoOrigen({ ...formatoOrigen, ancho: parseFloat(e.target.value) || 1 })}
                      className="w-full h-14 border-2 border-stone-300 text-center text-xl focus:border-gold-500 focus:outline-none rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-500 uppercase tracking-wide mb-2">Alto (cm)</label>
                    <input
                      type="number"
                      value={formatoOrigen.alto}
                      onChange={(e) => setFormatoOrigen({ ...formatoOrigen, alto: parseFloat(e.target.value) || 1 })}
                      className="w-full h-14 border-2 border-stone-300 text-center text-xl focus:border-gold-500 focus:outline-none rounded-lg"
                    />
                  </div>
                </div>

                {/* Slider de escala */}
                <div className="pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs text-stone-500 uppercase tracking-wide">Escala</label>
                    <span className="text-2xl font-light text-gold-600">{escalaDeseada}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="400"
                    value={escalaDeseada}
                    onChange={(e) => setEscalaDeseada(parseFloat(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-stone-200 via-gold-200 to-amber-300 rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-stone-400 mt-2">
                    <span>10%</span>
                    <span>100%</span>
                    <span>200%</span>
                    <span>400%</span>
                  </div>
                </div>

                {/* Botones de escala rápida */}
                <div className="flex flex-wrap gap-2">
                  {[25, 50, 75, 100, 150, 200, 300].map(scale => (
                    <button
                      key={scale}
                      onClick={() => setEscalaDeseada(scale)}
                      className={`px-4 py-2 text-sm transition-all ${
                        escalaDeseada === scale
                          ? 'bg-gold-500 text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-gold-100'
                      }`}
                    >
                      {scale}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Visualización */}
              <div className="flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-stone-100 rounded-xl p-8">
                <div className="relative flex items-end justify-center gap-6 mb-6">
                  {/* Original */}
                  <div className="text-center">
                    <div
                      className="bg-stone-300 border-2 border-stone-400 shadow-inner mx-auto"
                      style={{
                        width: `${Math.min(formatoOrigen.ancho * 0.8, 100)}px`,
                        height: `${Math.min(formatoOrigen.alto * 0.8, 80)}px`,
                      }}
                    />
                    <p className="text-sm text-stone-600 mt-2">Original</p>
                    <p className="text-xs text-stone-400">{formatoOrigen.ancho} × {formatoOrigen.alto}</p>
                  </div>

                  {/* Flecha */}
                  <div className="text-3xl text-gold-500 pb-8">→</div>

                  {/* Escalado */}
                  <div className="text-center">
                    <div
                      className="bg-gradient-to-br from-gold-300 to-amber-400 border-2 border-gold-500 shadow-lg mx-auto"
                      style={{
                        width: `${Math.min(escalaResultado.nuevoAncho * 0.8, 200)}px`,
                        height: `${Math.min(escalaResultado.nuevoAlto * 0.8, 160)}px`,
                      }}
                    />
                    <p className="text-sm text-gold-700 font-medium mt-2">Escalado</p>
                    <p className="text-xs text-gold-600">
                      {escalaResultado.nuevoAncho.toFixed(1)} × {escalaResultado.nuevoAlto.toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Resultados detallados */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-gold-50 border border-gold-200 p-4 rounded-lg text-center">
                <p className="text-xs text-gold-600 uppercase tracking-wide mb-1">Nuevo Ancho</p>
                <p className="text-2xl font-light text-gold-800">{escalaResultado.nuevoAncho.toFixed(2)} cm</p>
              </div>
              <div className="bg-gold-50 border border-gold-200 p-4 rounded-lg text-center">
                <p className="text-xs text-gold-600 uppercase tracking-wide mb-1">Nuevo Alto</p>
                <p className="text-2xl font-light text-gold-800">{escalaResultado.nuevoAlto.toFixed(2)} cm</p>
              </div>
              <div className="bg-stone-50 border border-stone-200 p-4 rounded-lg text-center">
                <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">Área Original</p>
                <p className="text-2xl font-light text-slate-700">{escalaResultado.areaOriginal.toFixed(0)} cm²</p>
              </div>
              <div className="bg-stone-50 border border-stone-200 p-4 rounded-lg text-center">
                <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">Área Nueva</p>
                <p className="text-2xl font-light text-slate-700">{escalaResultado.area.toFixed(0)} cm²</p>
              </div>
            </div>
          </div>
        )}

        {/* MODO: Personalizado */}
        {modo === 'personalizado' && (
          <div className="bg-white border border-stone-200 shadow-xl p-8">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="font-serif text-2xl text-slate-900 mb-4">Calculadora de Ratio Personalizado</h3>
              <p className="text-stone-500 mb-8">
                Introduce las medidas de tu obra y descubre su proporción exacta
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-xs text-stone-500 uppercase tracking-wide mb-2">Ancho (cm)</label>
                  <input
                    type="number"
                    value={formatoOrigen.ancho}
                    onChange={(e) => setFormatoOrigen({ ...formatoOrigen, ancho: parseFloat(e.target.value) || 1 })}
                    className="w-full h-16 border-2 border-stone-300 text-center text-2xl focus:border-gold-500 focus:outline-none rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-500 uppercase tracking-wide mb-2">Alto (cm)</label>
                  <input
                    type="number"
                    value={formatoOrigen.alto}
                    onChange={(e) => setFormatoOrigen({ ...formatoOrigen, alto: parseFloat(e.target.value) || 1 })}
                    className="w-full h-16 border-2 border-stone-300 text-center text-2xl focus:border-gold-500 focus:outline-none rounded-lg"
                  />
                </div>
              </div>

              {/* Resultado del ratio */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-xl text-white">
                <p className="text-gold-400 text-xs uppercase tracking-widest mb-2">Tu Proporción</p>
                <p className="text-5xl font-light mb-4">
                  1 : {(formatoOrigen.ancho / formatoOrigen.alto).toFixed(3)}
                </p>

                {/* Comparación con estándares */}
                <div className="border-t border-slate-700 pt-6 mt-6">
                  <p className="text-sm text-slate-400 mb-4">Comparación con formatos estándar:</p>
                  <div className="grid grid-cols-2 gap-4">
                    {formatosEstandar.map((formato, i) => {
                      const userRatio = formatoOrigen.ancho / formatoOrigen.alto;
                      const diff = Math.abs(userRatio - formato.ratio);
                      const similarity = Math.max(0, 100 - diff * 100);
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <div className="flex-1 bg-slate-700 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full bg-gold-400"
                              style={{ width: `${similarity}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-400 w-24">{formato.nombre}</span>
                          <span className="text-xs text-gold-400 w-12">{similarity.toFixed(0)}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

// ============================================
// APP 6: SIMULADOR DE VALORES TONALES - VERSIÓN PROFESIONAL
// ============================================
const SimuladorValores: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'original' | 'grayscale' | 'posterize' | 'split' | 'squint'>('original');
  const [contrast, setContrast] = useState(100);
  const [posterizeLevels, setPosterilevels] = useState(5);
  const [splitPosition, setSplitPosition] = useState(50);
  const [isDraggingSplit, setIsDraggingSplit] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Manejar subida de imagen
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setViewMode('original');
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejar arrastre del divisor en modo split
  const handleSplitMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingSplit || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSplitPosition(Math.max(5, Math.min(95, position)));
  };

  // Obtener filtro CSS según el modo
  const getImageFilter = (mode: typeof viewMode) => {
    switch (mode) {
      case 'grayscale':
        return `grayscale(100%) contrast(${contrast}%)`;
      case 'posterize':
        return `grayscale(100%) contrast(${contrast + 30}%)`;
      case 'squint':
        return `grayscale(100%) contrast(${contrast}%) blur(8px)`;
      default:
        return 'none';
    }
  };

  // Escala de valores con descripciones artísticas
  const valueScale = [
    { value: 0, label: 'Negro Absoluto', color: '#000000', uso: 'Acentos, pupilas' },
    { value: 1, label: 'Negro Profundo', color: '#1a1a1a', uso: 'Sombras más oscuras' },
    { value: 2, label: 'Oscuro Rico', color: '#333333', uso: 'Sombras de forma' },
    { value: 3, label: 'Oscuro Medio', color: '#4d4d4d', uso: 'Transición a sombra' },
    { value: 4, label: 'Gris Oscuro', color: '#666666', uso: 'Medios tonos bajos' },
    { value: 5, label: 'Gris Medio', color: '#808080', uso: 'Valor central' },
    { value: 6, label: 'Gris Claro', color: '#999999', uso: 'Medios tonos altos' },
    { value: 7, label: 'Luz Suave', color: '#b3b3b3', uso: 'Transición a luz' },
    { value: 8, label: 'Luz Media', color: '#cccccc', uso: 'Áreas iluminadas' },
    { value: 9, label: 'Luz Brillante', color: '#e6e6e6', uso: 'Highlights suaves' },
    { value: 10, label: 'Blanco Puro', color: '#ffffff', uso: 'Brillos especulares' },
  ];

  // Modos de visualización
  const viewModes = [
    { id: 'original', label: 'Original', icon: '🎨', description: 'Tu imagen en color' },
    { id: 'grayscale', label: 'Valores', icon: '◐', description: 'Escala de grises pura' },
    { id: 'posterize', label: 'Posterizar', icon: '▤', description: 'Simplifica a zonas de valor' },
    { id: 'split', label: 'Comparar', icon: '◧', description: 'Lado a lado interactivo' },
    { id: 'squint', label: 'Entrecerrar', icon: '👁', description: 'Simula visión borrosa' },
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
        <h2 className="font-serif text-4xl md:text-5xl text-slate-900 tracking-wide mb-4">
          Laboratorio de Valores Tonales
        </h2>
        <p className="text-stone-500 text-lg leading-relaxed">
          Analiza la estructura tonal de tu obra como los grandes maestros.
          Cinco modos de visualización para dominar el claroscuro.
        </p>
      </header>

      {/* Panel de control principal */}
      <section className="max-w-5xl mx-auto">
        <div className="bg-white border border-stone-200 shadow-lg">
          {/* Subida de imagen */}
          <div className="p-6 border-b border-stone-100">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <label className="flex items-center justify-center h-14 px-8 border-2 border-dashed border-stone-300 hover:border-gold-400 cursor-pointer bg-stone-50 hover:bg-gold-50 transition-all rounded-lg group">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                {uploadedImage ? (
                  <span className="text-sm text-emerald-600 flex items-center gap-2 font-medium">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Imagen cargada · Cambiar
                  </span>
                ) : (
                  <span className="text-stone-500 flex items-center gap-2 group-hover:text-gold-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Subir tu obra o fotografía
                  </span>
                )}
              </label>
            </div>
          </div>

          {/* Selector de modos */}
          {uploadedImage && (
            <div className="p-4 bg-slate-50 border-b border-stone-100">
              <div className="flex justify-center gap-2 flex-wrap">
                {viewModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id as typeof viewMode)}
                    className={`px-4 py-3 text-sm transition-all duration-300 flex items-center gap-2 rounded-lg ${
                      viewMode === mode.id
                        ? 'bg-slate-900 text-white shadow-lg'
                        : 'bg-white border border-stone-200 text-stone-600 hover:border-gold-400'
                    }`}
                    title={mode.description}
                  >
                    <span className="text-lg">{mode.icon}</span>
                    <span className="hidden sm:inline">{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Controles específicos del modo */}
          {uploadedImage && (viewMode === 'grayscale' || viewMode === 'posterize' || viewMode === 'squint') && (
            <div className="p-4 bg-stone-50 flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-500 uppercase tracking-wide w-20">Contraste</span>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={contrast}
                  onChange={(e) => setContrast(parseInt(e.target.value))}
                  className="w-40 h-2 bg-gradient-to-r from-stone-300 to-stone-600 rounded-full appearance-none cursor-pointer"
                />
                <span className="text-sm text-slate-700 w-12 font-medium">{contrast}%</span>
              </div>

              {viewMode === 'posterize' && (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-stone-500 uppercase tracking-wide w-20">Niveles</span>
                  <div className="flex gap-1">
                    {[3, 4, 5, 6, 7].map(level => (
                      <button
                        key={level}
                        onClick={() => setPosterilevels(level)}
                        className={`w-8 h-8 text-sm rounded transition-all ${
                          posterizeLevels === level
                            ? 'bg-gold-500 text-white'
                            : 'bg-white border border-stone-300 text-stone-600 hover:border-gold-400'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Área de visualización */}
      <section className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 shadow-2xl rounded-lg">
          {!uploadedImage ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center mb-8">
                <svg className="w-16 h-16 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-slate-400 text-xl font-serif mb-2">Sube una imagen para comenzar</p>
              <p className="text-slate-500 text-sm">Fotografías, bocetos, obras en proceso...</p>
            </div>
          ) : viewMode === 'split' ? (
            /* Modo Split - Comparación lado a lado */
            <div
              ref={containerRef}
              className="relative overflow-hidden cursor-col-resize select-none"
              style={{ maxHeight: '600px' }}
              onMouseMove={handleSplitMove}
              onMouseUp={() => setIsDraggingSplit(false)}
              onMouseLeave={() => setIsDraggingSplit(false)}
              onTouchMove={handleSplitMove}
              onTouchEnd={() => setIsDraggingSplit(false)}
            >
              {/* Imagen original (fondo) */}
              <img
                src={uploadedImage}
                alt="Original"
                className="w-full h-auto max-h-[600px] object-contain mx-auto"
              />

              {/* Imagen en grises (clip) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - splitPosition}% 0 0)` }}
              >
                <img
                  src={uploadedImage}
                  alt="Valores"
                  className="w-full h-auto max-h-[600px] object-contain mx-auto"
                  style={{ filter: 'grayscale(100%)' }}
                />
              </div>

              {/* Divisor */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-gold-400 cursor-col-resize z-10"
                style={{ left: `${splitPosition}%` }}
                onMouseDown={() => setIsDraggingSplit(true)}
                onTouchStart={() => setIsDraggingSplit(true)}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">⇔</span>
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 bg-black/70 px-3 py-1.5 text-white text-xs uppercase tracking-wide rounded">
                Color
              </div>
              <div className="absolute top-4 right-4 bg-black/70 px-3 py-1.5 text-white text-xs uppercase tracking-wide rounded">
                Valores
              </div>
            </div>
          ) : (
            /* Otros modos */
            <div className="relative">
              <img
                src={uploadedImage}
                alt="Tu obra"
                className="max-w-full max-h-[600px] mx-auto shadow-2xl rounded transition-all duration-500"
                style={{ filter: getImageFilter(viewMode) }}
              />

              {/* Indicador de modo */}
              <div className="absolute top-4 right-4 bg-black/80 px-4 py-2 text-white text-sm uppercase tracking-wide rounded-lg flex items-center gap-2">
                <span className="text-lg">{viewModes.find(m => m.id === viewMode)?.icon}</span>
                <span>{viewModes.find(m => m.id === viewMode)?.label}</span>
              </div>

              {/* Descripción del modo */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 px-4 py-3 text-white text-sm rounded-lg">
                <p className="text-gold-400 font-medium mb-1">
                  {viewModes.find(m => m.id === viewMode)?.label}
                </p>
                <p className="text-slate-300 text-xs">
                  {viewMode === 'original' && 'Tu imagen original con todos sus colores.'}
                  {viewMode === 'grayscale' && 'Elimina el color para ver solo la estructura de valores. Ajusta el contraste para estudiar las transiciones.'}
                  {viewMode === 'posterize' && 'Simplifica la imagen en zonas de valor definidas. Ideal para planificar un estudio de claroscuro.'}
                  {viewMode === 'squint' && 'Simula entrecerrar los ojos: elimina detalles y muestra solo las masas de valor principales.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Escala de valores profesional */}
      <section className="max-w-5xl mx-auto">
        <div className="bg-white border border-stone-200 shadow-lg rounded-lg overflow-hidden">
          <div className="bg-slate-900 p-4">
            <h3 className="font-serif text-xl text-white text-center">
              Escala de Munsell Simplificada (0-10)
            </h3>
            <p className="text-slate-400 text-sm text-center mt-1">
              La herramienta fundamental del pintor para entender luz y sombra
            </p>
          </div>

          <div className="p-6">
            {/* Barra de valores */}
            <div className="flex mb-4">
              {valueScale.map((item) => (
                <div
                  key={item.value}
                  className="flex-1 h-20 first:rounded-l-lg last:rounded-r-lg transition-transform hover:scale-105 hover:z-10 cursor-pointer group relative"
                  style={{ backgroundColor: item.color }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-16 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap z-20 transition-opacity">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-slate-400">{item.uso}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Números */}
            <div className="flex">
              {valueScale.map((item) => (
                <div key={item.value} className="flex-1 text-center">
                  <p className="text-lg font-medium text-slate-700">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Leyenda de zonas */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-stone-100">
              <div className="text-center p-4 bg-gradient-to-b from-slate-900 to-slate-700 rounded-lg">
                <p className="text-white font-medium mb-1">Sombras</p>
                <p className="text-slate-300 text-sm">Valores 0-3</p>
                <p className="text-slate-400 text-xs mt-2">Profundidad y misterio</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-b from-stone-400 to-stone-500 rounded-lg">
                <p className="text-white font-medium mb-1">Medios Tonos</p>
                <p className="text-stone-100 text-sm">Valores 4-6</p>
                <p className="text-stone-200 text-xs mt-2">Transición y forma</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-b from-stone-100 to-white rounded-lg border border-stone-200">
                <p className="text-slate-800 font-medium mb-1">Luces</p>
                <p className="text-slate-600 text-sm">Valores 7-10</p>
                <p className="text-slate-500 text-xs mt-2">Iluminación y brillo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consejos de los maestros */}
      <section className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-lg">
            <p className="text-gold-400 text-xs uppercase tracking-widest mb-3">Técnica del Maestro</p>
            <p className="text-white font-serif text-lg italic leading-relaxed">
              "Entrecierra los ojos para ver las masas. Si tu composición no funciona
              así, tampoco funcionará con los ojos abiertos."
            </p>
            <p className="text-slate-400 mt-3 text-sm">— Principio del Atelier</p>
          </div>
          <div className="bg-gradient-to-br from-stone-100 to-stone-50 p-6 rounded-lg border border-stone-200">
            <p className="text-gold-600 text-xs uppercase tracking-widest mb-3">Regla de Oro</p>
            <p className="text-slate-700 font-serif text-lg italic leading-relaxed">
              "Limita tu paleta de valores a 5-7 niveles. Los grandes maestros nunca
              usaron más. La simplicidad es poder."
            </p>
            <p className="text-stone-500 mt-3 text-sm">— Tradición Académica</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EstudioDigital;
