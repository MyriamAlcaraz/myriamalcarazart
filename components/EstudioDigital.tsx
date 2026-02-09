import React, { useState, useMemo } from 'react';
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
// APP 1: COMPOSICIÓN ÁUREA (Funcional)
// ============================================
const ComposicionAurea: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [width, setWidth] = useState<number>(100);
  const [height, setHeight] = useState<number>(81);
  const [showSpiral, setShowSpiral] = useState(true);
  const [showThirds, setShowThirds] = useState(true);

  // Constante PHI (proporción áurea)
  const PHI = 1.618033988749895;

  // Calcular dimensiones del canvas manteniendo proporción
  const canvasSize = useMemo(() => {
    const maxWidth = 500;
    const maxHeight = 400;
    const ratio = width / height;

    if (ratio > maxWidth / maxHeight) {
      return { w: maxWidth, h: maxWidth / ratio };
    } else {
      return { w: maxHeight * ratio, h: maxHeight };
    }
  }, [width, height]);

  // Generar puntos de la espiral áurea
  const generateSpiralPath = () => {
    const { w, h } = canvasSize;
    const points: string[] = [];
    let x = 0, y = 0;
    let currentW = w, currentH = h;

    // Generar arcos para la espiral
    for (let i = 0; i < 8; i++) {
      const size = i % 2 === 0 ? currentW / PHI : currentH / PHI;
      const startAngle = (i * 90) * Math.PI / 180;
      const endAngle = ((i + 1) * 90) * Math.PI / 180;

      for (let t = 0; t <= 20; t++) {
        const angle = startAngle + (endAngle - startAngle) * (t / 20);
        const radius = size * (1 - t / 20 * 0.382);
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        points.push(`${px},${py}`);
      }

      if (i % 2 === 0) currentW = currentW / PHI;
      else currentH = currentH / PHI;
    }

    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header con botón volver */}
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
        <h2 className="font-serif text-4xl md:text-5xl text-slate-900 tracking-wide mb-6">
          Master de Composición Áurea
        </h2>
        <p className="text-stone-500 text-lg leading-relaxed">
          Introduce las medidas de tu bastidor y visualiza las guías de composición clásicas.
        </p>
      </header>

      {/* Controles */}
      <section className="max-w-xl mx-auto">
        <div className="bg-white border border-stone-200 p-8">
          <label className="block text-xs tracking-[0.3em] text-slate-600 uppercase mb-6 font-medium text-center">
            Medidas del lienzo (cm)
          </label>
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-24 border border-stone-300 text-center py-3 text-2xl font-light text-slate-800 focus:border-gold-500 focus:outline-none transition-colors"
              />
              <p className="text-xs text-stone-400 mt-2 tracking-wide">Ancho</p>
            </div>
            <span className="text-3xl text-stone-300 font-light">×</span>
            <div className="text-center">
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-24 border border-stone-300 text-center py-3 text-2xl font-light text-slate-800 focus:border-gold-500 focus:outline-none transition-colors"
              />
              <p className="text-xs text-stone-400 mt-2 tracking-wide">Alto</p>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex justify-center gap-8 mt-8 pt-6 border-t border-stone-100">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showThirds}
                onChange={(e) => setShowThirds(e.target.checked)}
                className="w-5 h-5 accent-gold-500"
              />
              <span className="text-sm text-slate-700">Regla de los Tercios</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showSpiral}
                onChange={(e) => setShowSpiral(e.target.checked)}
                className="w-5 h-5 accent-gold-500"
              />
              <span className="text-sm text-slate-700">Espiral Áurea</span>
            </label>
          </div>
        </div>
      </section>

      {/* Visualización */}
      <section className="max-w-3xl mx-auto">
        <div className="bg-slate-900 p-8 md:p-12 flex items-center justify-center">
          <svg
            width={canvasSize.w}
            height={canvasSize.h}
            viewBox={`0 0 ${canvasSize.w} ${canvasSize.h}`}
            className="bg-slate-800 shadow-2xl"
            style={{ maxWidth: '100%', height: 'auto' }}
          >
            {/* Fondo del lienzo */}
            <rect x="0" y="0" width={canvasSize.w} height={canvasSize.h} fill="#f5f5f4" />

            {/* Regla de los Tercios */}
            {showThirds && (
              <g className="animate-fade-in">
                {/* Líneas verticales */}
                <line x1={canvasSize.w / 3} y1="0" x2={canvasSize.w / 3} y2={canvasSize.h} stroke="#c5a059" strokeWidth="1" opacity="0.7" />
                <line x1={(canvasSize.w * 2) / 3} y1="0" x2={(canvasSize.w * 2) / 3} y2={canvasSize.h} stroke="#c5a059" strokeWidth="1" opacity="0.7" />
                {/* Líneas horizontales */}
                <line x1="0" y1={canvasSize.h / 3} x2={canvasSize.w} y2={canvasSize.h / 3} stroke="#c5a059" strokeWidth="1" opacity="0.7" />
                <line x1="0" y1={(canvasSize.h * 2) / 3} x2={canvasSize.w} y2={(canvasSize.h * 2) / 3} stroke="#c5a059" strokeWidth="1" opacity="0.7" />
                {/* Puntos de interés */}
                <circle cx={canvasSize.w / 3} cy={canvasSize.h / 3} r="6" fill="#c5a059" opacity="0.8" />
                <circle cx={(canvasSize.w * 2) / 3} cy={canvasSize.h / 3} r="6" fill="#c5a059" opacity="0.8" />
                <circle cx={canvasSize.w / 3} cy={(canvasSize.h * 2) / 3} r="6" fill="#c5a059" opacity="0.8" />
                <circle cx={(canvasSize.w * 2) / 3} cy={(canvasSize.h * 2) / 3} r="6" fill="#c5a059" opacity="0.8" />
              </g>
            )}

            {/* Espiral Áurea (simplificada como rectángulos) */}
            {showSpiral && (
              <g className="animate-fade-in">
                {/* Rectángulos áureos */}
                <rect x="0" y="0" width={canvasSize.w / PHI} height={canvasSize.h} fill="none" stroke="#1e293b" strokeWidth="1.5" opacity="0.6" />
                <rect x={canvasSize.w / PHI} y="0" width={canvasSize.w - canvasSize.w / PHI} height={canvasSize.h / PHI} fill="none" stroke="#1e293b" strokeWidth="1.5" opacity="0.5" />
                <rect x={canvasSize.w / PHI} y={canvasSize.h / PHI} width={(canvasSize.w - canvasSize.w / PHI) / PHI} height={canvasSize.h - canvasSize.h / PHI} fill="none" stroke="#1e293b" strokeWidth="1.5" opacity="0.4" />

                {/* Curva espiral aproximada */}
                <path
                  d={`M ${canvasSize.w / PHI} 0
                      Q ${canvasSize.w / PHI} ${canvasSize.h / 2}, ${canvasSize.w / PHI + (canvasSize.w - canvasSize.w / PHI) / 2} ${canvasSize.h / PHI}
                      Q ${canvasSize.w} ${canvasSize.h / PHI}, ${canvasSize.w / PHI + (canvasSize.w - canvasSize.w / PHI) / PHI} ${canvasSize.h / PHI + (canvasSize.h - canvasSize.h / PHI) / 2}`}
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="2"
                  opacity="0.7"
                />
              </g>
            )}

            {/* Marco */}
            <rect x="0" y="0" width={canvasSize.w} height={canvasSize.h} fill="none" stroke="#1e293b" strokeWidth="3" />
          </svg>
        </div>

        {/* Leyenda */}
        <div className="flex justify-center gap-8 mt-6">
          {showThirds && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gold-500 rounded-full"></div>
              <span className="text-sm text-stone-600">Puntos de interés (Tercios)</span>
            </div>
          )}
          {showSpiral && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-slate-800"></div>
              <span className="text-sm text-stone-600">Proporción Áurea (φ = 1.618)</span>
            </div>
          )}
        </div>
      </section>

      {/* Información educativa */}
      <section className="max-w-3xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-stone-200 p-6">
            <h4 className="font-serif text-lg text-slate-900 mb-3">Regla de los Tercios</h4>
            <p className="text-stone-600 text-sm leading-relaxed">
              Dividir el lienzo en nueve partes iguales crea cuatro puntos de intersección donde
              el ojo humano se dirige naturalmente. Colocar los elementos clave en estos puntos
              genera composiciones más dinámicas y visualmente equilibradas.
            </p>
          </div>
          <div className="bg-white border border-stone-200 p-6">
            <h4 className="font-serif text-lg text-slate-900 mb-3">Proporción Áurea (φ)</h4>
            <p className="text-stone-600 text-sm leading-relaxed">
              La razón 1:1.618 aparece en la naturaleza, el arte clásico y la arquitectura.
              Leonardo, Vermeer y Bouguereau la emplearon para crear armonía visual.
              Guía el recorrido del ojo de forma orgánica y placentera.
            </p>
          </div>
        </div>
      </section>

      {/* Medidas calculadas */}
      <section className="max-w-xl mx-auto text-center">
        <div className="bg-stone-50 border border-stone-200 p-6">
          <p className="text-xs tracking-[0.3em] text-stone-400 uppercase mb-4">Tu lienzo de {width}×{height} cm</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-stone-500">División en tercios</p>
              <p className="text-slate-800 font-medium">{(width / 3).toFixed(1)} cm × {(height / 3).toFixed(1)} cm</p>
            </div>
            <div>
              <p className="text-stone-500">Sección áurea mayor</p>
              <p className="text-slate-800 font-medium">{(width / PHI).toFixed(1)} cm × {height} cm</p>
            </div>
          </div>
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
