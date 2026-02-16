import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, Upload, Sun, Image as ImageIcon } from 'lucide-react';

interface SolSorollaProps {
  onBack: () => void;
}

interface LightData {
  position: number;
  hour: number;
  period: string;
  skyColor: string;
  sunColor: string;
  sunOpacity: number;
  sunTop: string;
  lightDesc: string;
  pigments: Array<{ name: string; color: string; ratio: string }>;
}

const lightData: LightData[] = [
  {
    position: 0,
    hour: 6.5,
    period: 'Amanecer',
    skyColor: 'linear-gradient(180deg, #2d1b4e 0%, #8b6b7a 40%, #e8c4a8 100%)',
    sunColor: '#ffcc99',
    sunOpacity: 0.6,
    sunTop: '65%',
    lightDesc: 'La luz nácar del amanecer emerge del mar. Tonos rosados y azulados suaves bañan la escena, creando esa atmósfera etérea que Sorolla pintó en sus obras matutinas.',
    pigments: [
      { name: 'Blanco de Plomo', color: '#f5f0e8', ratio: '40%' },
      { name: 'Azul Ultramar', color: '#3d5a80', ratio: '25%' },
      { name: 'Rojo Cadmio Claro', color: '#e07a5f', ratio: '20%' },
      { name: 'Amarillo Ocre', color: '#d4a373', ratio: '15%' }
    ]
  },
  {
    position: 15,
    hour: 8,
    period: 'Mañana temprana',
    skyColor: 'linear-gradient(180deg, #87ceeb 0%, #ffd4a3 60%, #fff5e6 100%)',
    sunColor: '#ffe4b5',
    sunOpacity: 0.7,
    sunTop: '50%',
    lightDesc: 'Luz dorada suave con reflejos perlados. El mar comienza a brillar con tonos celestes que contrastan con la arena húmeda.',
    pigments: [
      { name: 'Blanco de Plomo', color: '#f5f0e8', ratio: '45%' },
      { name: 'Amarillo Nápoles', color: '#ffdb58', ratio: '25%' },
      { name: 'Azul Cobalto', color: '#0047ab', ratio: '20%' },
      { name: 'Tierra de Siena', color: '#a0522d', ratio: '10%' }
    ]
  },
  {
    position: 30,
    hour: 10,
    period: 'Mañana',
    skyColor: 'linear-gradient(180deg, #87ceeb 0%, #b8e0f5 50%, #fff8f0 100%)',
    sunColor: '#fffbf5',
    sunOpacity: 0.85,
    sunTop: '35%',
    lightDesc: 'La luz se vuelve más intensa y dorada. Los reflejos en el agua son más pronunciados, creando esa luminosidad característica de la costa valenciana.',
    pigments: [
      { name: 'Blanco de Plomo', color: '#f5f0e8', ratio: '50%' },
      { name: 'Amarillo Cadmio', color: '#ffc300', ratio: '25%' },
      { name: 'Azul Ultramar', color: '#3d5a80', ratio: '15%' },
      { name: 'Verde Viridian', color: '#40826d', ratio: '10%' }
    ]
  },
  {
    position: 50,
    hour: 12,
    period: 'Mediodía',
    skyColor: 'linear-gradient(180deg, #a8d8ea 0%, #c9e4f5 40%, #ffffff 100%)',
    sunColor: '#ffffff',
    sunOpacity: 1,
    sunTop: '20%',
    lightDesc: 'El sol de Valencia en su momento más intenso. La luz blanca ciega refleja en el agua creando destellos cegadores que Sorolla capturó magistralmente en sus obras marinas.',
    pigments: [
      { name: 'Blanco de Plomo', color: '#f5f0e8', ratio: '60%' },
      { name: 'Amarillo Cadmio', color: '#ffc300', ratio: '20%' },
      { name: 'Azul Cobalto', color: '#0047ab', ratio: '15%' },
      { name: 'Verde Esmeralda', color: '#50c878', ratio: '5%' }
    ]
  },
  {
    position: 65,
    hour: 15,
    period: 'Tarde',
    skyColor: 'linear-gradient(180deg, #87ceeb 0%, #ffd89b 50%, #ffb347 100%)',
    sunColor: '#ffe4b5',
    sunOpacity: 0.9,
    sunTop: '30%',
    lightDesc: 'El sol comienza a descender y la luz se vuelve más cálida y dorada. Los tonos anaranjados empiezan a dominar, creando esa magia luminosa del mediterráneo.',
    pigments: [
      { name: 'Blanco de Plomo', color: '#f5f0e8', ratio: '40%' },
      { name: 'Amarillo Ocre', color: '#d4a373', ratio: '30%' },
      { name: 'Rojo Cadmio', color: '#e63946', ratio: '20%' },
      { name: 'Azul Ultramar', color: '#3d5a80', ratio: '10%' }
    ]
  },
  {
    position: 80,
    hour: 18,
    period: 'Atardecer',
    skyColor: 'linear-gradient(180deg, #4a3f6b 0%, #e8806a 30%, #ffb347 70%, #ffd700 100%)',
    sunColor: '#ff6b35',
    sunOpacity: 0.95,
    sunTop: '55%',
    lightDesc: 'Los violetas y dorados del atardecer mediterráneo. El mar refleja los tonos naranjas y purpúreos del cielo, creando una sinfonía de colores que Sorolla inmortalizó.',
    pigments: [
      { name: 'Rojo Cadmio', color: '#e63946', ratio: '35%' },
      { name: 'Amarillo Nápoles', color: '#ffdb58', ratio: '30%' },
      { name: 'Violeta Cobalto', color: '#7b3f61', ratio: '20%' },
      { name: 'Blanco de Plomo', color: '#f5f0e8', ratio: '15%' }
    ]
  },
  {
    position: 100,
    hour: 20.5,
    period: 'Anochecer',
    skyColor: 'linear-gradient(180deg, #1a1a2e 0%, #4a3f6b 30%, #8b456a 60%, #d4736a 100%)',
    sunColor: '#cc5500',
    sunOpacity: 0.7,
    sunTop: '70%',
    lightDesc: 'La luz se desvanece dejando tonos morados y naranjas intensos. El mar refleja el cielo crepuscular con una atmósfera dramática y melancólica.',
    pigments: [
      { name: 'Azul Ultramar', color: '#3d5a80', ratio: '35%' },
      { name: 'Rojo Carmín', color: '#960018', ratio: '25%' },
      { name: 'Amarillo Ocre', color: '#d4a373', ratio: '25%' },
      { name: 'Negro Marfil', color: '#1a1a1a', ratio: '15%' }
    ]
  }
];

const SolSorolla: React.FC<SolSorollaProps> = ({ onBack }) => {
  const [timePosition, setTimePosition] = useState(50);
  const [hasImage, setHasImage] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [currentZoom, setCurrentZoom] = useState(1);
  const [bgPosition, setBgPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [bwFilterActive, setBwFilterActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'pigments' | 'volume'>('pigments');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lightDisplayRef = useRef<HTMLDivElement>(null);
  const lightOverlayRef = useRef<HTMLDivElement>(null);

  const minZoom = 0.5;
  const maxZoom = 3;
  const zoomStep = 0.25;

  // Interpolación de datos según posición
  const getInterpolatedData = useCallback((position: number) => {
    let lower = lightData[0];
    let upper = lightData[lightData.length - 1];
    
    for (let i = 0; i < lightData.length - 1; i++) {
      if (position >= lightData[i].position && position <= lightData[i + 1].position) {
        lower = lightData[i];
        upper = lightData[i + 1];
        break;
      }
    }
    
    const factor = (position - lower.position) / (upper.position - lower.position);
    
    return {
      hour: lower.hour + (upper.hour - lower.hour) * factor,
      period: position < 50 ? (position < 25 ? lower.period : upper.period) : (position < 75 ? upper.period : upper.period),
      skyColor: upper.skyColor,
      sunColor: upper.sunColor,
      sunOpacity: lower.sunOpacity + (upper.sunOpacity - lower.sunOpacity) * factor,
      sunTop: lower.sunTop,
      lightDesc: upper.lightDesc,
      pigments: upper.pigments
    };
  }, []);

  // Calcular filtros de luz según posición
  const calculateLightFilter = useCallback((position: number) => {
    let brightness, contrast, saturate, warmth;
    let filterColor, opacity, blendMode;

    const p = position / 100;

    if (position <= 20) {
      const t = position / 20;
      brightness = 0.85 + t * 0.2;
      contrast = 0.9 + t * 0.1;
      saturate = 0.9 + t * 0.1;
      warmth = 0.15 - t * 0.1;
      filterColor = `rgba(255, 200, 180, ${0.2 - t * 0.1})`;
      opacity = 0.3;
      blendMode = 'soft-light';
    } else if (position <= 40) {
      const t = (position - 20) / 20;
      brightness = 1.05 + t * 0.15;
      contrast = 1.0 + t * 0.15;
      saturate = 1.0 + t * 0.05;
      warmth = 0.05 - t * 0.05;
      filterColor = `rgba(255, 240, 220, ${0.15 - t * 0.05})`;
      opacity = 0.25;
      blendMode = 'soft-light';
    } else if (position <= 60) {
      const t = (position - 40) / 20;
      const peak = 1 - Math.abs(t - 0.5) * 2;
      brightness = 1.2 + peak * 0.1;
      contrast = 1.15 + peak * 0.15;
      saturate = 1.05;
      warmth = 0;
      filterColor = 'rgba(255, 255, 255, 0.08)';
      opacity = 0.15;
      blendMode = 'overlay';
    } else if (position <= 80) {
      const t = (position - 60) / 20;
      brightness = 1.15 - t * 0.15;
      contrast = 1.2 - t * 0.05;
      saturate = 1.05 + t * 0.1;
      warmth = t * 0.2;
      filterColor = `rgba(255, 180, 100, ${0.1 + t * 0.15})`;
      opacity = 0.3 + t * 0.15;
      blendMode = 'multiply';
    } else {
      const t = (position - 80) / 20;
      brightness = 1.0 - t * 0.2;
      contrast = 1.15 + t * 0.1;
      saturate = 1.15 - t * 0.1;
      warmth = 0.2 + t * 0.2;
      filterColor = `rgba(200, 100, 80, ${0.2 + t * 0.15})`;
      opacity = 0.45 + t * 0.1;
      blendMode = 'multiply';
    }

    return { brightness, contrast, saturate, warmth, filterColor, opacity, blendMode };
  }, []);

  // Actualizar filtros de luz
  useEffect(() => {
    if (!hasImage || !lightDisplayRef.current || !lightOverlayRef.current) return;

    if (bwFilterActive) {
      if (lightDisplayRef.current) {
        lightDisplayRef.current.style.filter = 'grayscale(100%) contrast(1.3)';
      }
      if (lightOverlayRef.current) {
        lightOverlayRef.current.style.opacity = '0';
      }
    } else {
      const filter = calculateLightFilter(timePosition);
      if (lightDisplayRef.current) {
        lightDisplayRef.current.style.filter = `brightness(${filter.brightness.toFixed(2)}) contrast(${filter.contrast.toFixed(2)}) saturate(${filter.saturate.toFixed(2)}) sepia(${filter.warmth.toFixed(2)})`;
      }
      if (lightOverlayRef.current) {
        lightOverlayRef.current.style.background = filter.filterColor;
        lightOverlayRef.current.style.opacity = filter.opacity.toString();
        lightOverlayRef.current.style.mixBlendMode = filter.blendMode;
      }
    }
  }, [timePosition, hasImage, bwFilterActive, calculateLightFilter]);

  // Manejar carga de imagen
  const handleImageLoad = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setImageUrl(url);
      setHasImage(true);
      setCurrentZoom(1);
      setBgPosition({ x: 50, y: 50 });
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageLoad(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageLoad(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Manejar zoom
  const handleZoomIn = () => {
    if (currentZoom < maxZoom) {
      setCurrentZoom(Math.min(maxZoom, currentZoom + zoomStep));
    }
  };

  const handleZoomOut = () => {
    if (currentZoom > minZoom) {
      setCurrentZoom(Math.max(minZoom, currentZoom - zoomStep));
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (hasImage) {
      e.preventDefault();
      if (e.deltaY < 0) {
        setCurrentZoom(Math.min(maxZoom, currentZoom + zoomStep));
      } else {
        setCurrentZoom(Math.max(minZoom, currentZoom - zoomStep));
      }
    }
  };

  // Manejar arrastre
  const handleMouseDown = (e: React.MouseEvent) => {
    if (hasImage && currentZoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && lightDisplayRef.current) {
      const dx = ((e.clientX - dragStart.x) / lightDisplayRef.current.offsetWidth) * 100;
      const dy = ((e.clientY - dragStart.y) / lightDisplayRef.current.offsetHeight) * 100;
      setBgPosition(prev => ({
        x: Math.max(0, Math.min(100, prev.x - dx)),
        y: Math.max(0, Math.min(100, prev.y - dy))
      }));
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Calcular posición de luz para estudio de volumen
  const getVolumeStudyData = (position: number) => {
    let lightPos, shadowWidth, shadowX, sphereGradient, lightColor, lightInfo, lightDirection;

    if (position < 25) {
      lightPos = { x: 30, y: 25 };
      shadowWidth = '80px';
      shadowX = '60%';
      sphereGradient = 'radial-gradient(circle at 30% 30%, #f5e6d3 0%, #a08060 50%, #3d3428 100%)';
      lightColor = '#ffcc99';
      lightInfo = 'Luz baja lateral';
      lightDirection = 'Sombras largas hacia un lado';
    } else if (position < 45) {
      const progress = (position - 25) / 20;
      lightPos = { x: 30 + progress * 20, y: 25 - progress * 10 };
      shadowWidth = `${80 - progress * 30}px`;
      shadowX = `${60 - progress * 15}%`;
      sphereGradient = `radial-gradient(circle at ${30 + progress * 10}% ${30 - progress * 10}%, #f5e6d3 0%, #a08060 50%, #3d3428 100%)`;
      lightColor = '#ffe4b5';
      lightInfo = 'Luz ascendente';
      lightDirection = 'Sombras progresivamente más cortas';
    } else if (position >= 45 && position <= 60) {
      lightPos = { x: 50, y: 15 };
      shadowWidth = '40px';
      shadowX = '50%';
      sphereGradient = 'radial-gradient(circle at 40% 30%, #ffffff 0%, #d4c4b0 50%, #8b7355 100%)';
      lightColor = '#ffffff';
      lightInfo = 'Luz cenital desde arriba';
      lightDirection = 'Sombras verticales bajo el rostro';
    } else if (position > 60 && position <= 80) {
      const progress = (position - 60) / 20;
      lightPos = { x: 50 + progress * 35, y: 15 + progress * 30 };
      shadowWidth = `${40 + progress * 50}px`;
      shadowX = `${50 - progress * 20}%`;
      const highlightPos = 40 + progress * 20;
      sphereGradient = `radial-gradient(circle at ${highlightPos}% ${30 - progress * 10}%, #fff5e6 0%, #c9a86c 50%, #5a4535 100%)`;
      lightColor = '#ffb366';
      lightInfo = 'Luz lateral descendente';
      lightDirection = 'Sombras largas enfatizando el relieve';
    } else {
      lightPos = { x: 85, y: 45 };
      shadowWidth = '100px';
      shadowX = '30%';
      sphereGradient = 'radial-gradient(circle at 60% 35%, #cc8866 0%, #6b4535 50%, #2a1f18 100%)';
      lightColor = '#ff6b35';
      lightInfo = 'Luz rasante del atardecer';
      lightDirection = 'Sombras largas y dramáticas';
    }

    return { lightPos, shadowWidth, shadowX, sphereGradient, lightColor, lightInfo, lightDirection };
  };

  const currentData = getInterpolatedData(timePosition);
  const volumeData = getVolumeStudyData(timePosition);
  const hours = Math.floor(currentData.hour);
  const minutes = Math.round((currentData.hour - hours) * 60);
  const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  const lightDisplayStyle: React.CSSProperties = hasImage
    ? {
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        backgroundSize: currentZoom <= 1 ? 'contain' : `${currentZoom * 100}%`,
        backgroundPosition: `${bgPosition.x}% ${bgPosition.y}%`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#0a0908',
        cursor: currentZoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
      }
    : {
        background: currentData.skyColor
      };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-stone-600 hover:text-gold-600 transition-colors"
          >
            <ArrowLeft size={20} />
            Volver al Estudio Digital
          </button>
          <div className="text-center">
            <h1 className="font-serif text-2xl text-slate-900">El Sol de Sorolla</h1>
            <p className="text-xs text-stone-400 italic">La Luz de la Malvarrosa</p>
          </div>
          <div className="w-24"></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* Área principal de visualización */}
        <div
          className={`flex-1 relative flex items-center justify-center min-h-[50vh] lg:min-h-auto transition-all duration-500 ${
            !hasImage ? 'cursor-default' : ''
          }`}
          ref={lightDisplayRef}
          style={lightDisplayStyle}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Indicador de arrastrar imagen cuando no hay imagen */}
          {!hasImage && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center bg-black/40 backdrop-blur-sm px-8 py-6 rounded-lg border-2 border-dashed border-gold-500/50">
                <Upload size={48} className="mx-auto mb-4 text-gold-500" />
                <p className="text-white text-lg font-serif mb-2">Arrastra una imagen aquí</p>
                <p className="text-stone-300 text-sm">o usa el botón "Subir obra"</p>
              </div>
            </div>
          )}
          {/* Overlay de luz */}
          {hasImage && (
            <div
              ref={lightOverlayRef}
              className="absolute inset-0 pointer-events-none transition-all duration-500"
              style={{ mixBlendMode: 'overlay' }}
            />
          )}

          {/* Sol (solo cuando no hay imagen) */}
          {!hasImage && (
            <>
              <div
                className="absolute rounded-full blur-[20px] opacity-90 transition-all duration-800"
                style={{
                  width: '120px',
                  height: '120px',
                  background: currentData.sunColor,
                  opacity: currentData.sunOpacity,
                  top: currentData.sunTop,
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
              />
              {/* Efecto de agua */}
              <div className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none">
                <div className="w-full h-full bg-gradient-to-b from-transparent to-white/10" />
              </div>
            </>
          )}

          {/* Display de hora */}
          {!hasImage && (
            <div className="relative z-10 text-center">
              <div className="font-serif text-6xl font-semibold text-white drop-shadow-lg tracking-wide">
                {timeStr}
              </div>
              <div className="text-xl text-white/80 uppercase tracking-widest mt-2">
                {currentData.period}
              </div>
            </div>
          )}

          {/* Controles de zoom */}
          {hasImage && (
            <div className="absolute bottom-5 right-5 z-50 flex items-center gap-2 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-full border border-gold-500/30">
              <button
                onClick={handleZoomOut}
                className="w-8 h-8 rounded-full border border-gold-500 text-gold-500 flex items-center justify-center hover:bg-gold-500 hover:text-black transition-colors"
                disabled={currentZoom <= minZoom}
              >
                −
              </button>
              <span className="text-xs text-stone-300 min-w-[40px] text-center">
                {Math.round(currentZoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="w-8 h-8 rounded-full border border-gold-500 text-gold-500 flex items-center justify-center hover:bg-gold-500 hover:text-black transition-colors"
                disabled={currentZoom >= maxZoom}
              >
                +
              </button>
            </div>
          )}

          {/* Indicador de arrastrar imagen */}
          {hasImage && currentZoom > 1 && (
            <div className="absolute top-5 left-5 z-50 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded text-xs text-stone-300">
              Arrastra para mover la imagen
            </div>
          )}
        </div>

        {/* Panel de controles */}
        <div className="w-full lg:w-80 bg-stone-800 border-l border-stone-700 p-4 flex flex-col gap-4 overflow-y-auto">
          {/* Botón de subir imagen */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-transparent border border-gold-500 text-gold-500 text-xs uppercase tracking-wider rounded hover:bg-gold-500 hover:text-black transition-colors"
          >
            <Upload size={14} />
            {hasImage ? 'Cambiar imagen' : 'Subir obra'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />

          {/* Slider de hora del día */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-stone-400">Hora del día</label>
            <input
              type="range"
              min="0"
              max="100"
              value={timePosition}
              onChange={(e) => setTimePosition(Number(e.target.value))}
              className="w-full h-1.5 bg-gradient-to-r from-amber-200 via-yellow-100 via-white via-yellow-200 to-orange-300 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: 'linear-gradient(to right, #e8d5c4 0%, #f5e6d3 15%, #fff8e7 30%, #fffbf5 50%, #ffe4b5 70%, #ffb366 85%, #cc8866 100%)'
              }}
            />
            <div className="flex justify-between text-xs text-stone-400">
              <span>Amanecer</span>
              <span>Mediodía</span>
              <span>Anochecer</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('pigments')}
              className={`flex-1 px-3 py-2 text-xs uppercase tracking-wider rounded border transition-colors ${
                activeTab === 'pigments'
                  ? 'bg-gold-500 text-black border-gold-500'
                  : 'bg-transparent border-gold-500/30 text-stone-400 hover:border-gold-500 hover:text-gold-500'
              }`}
            >
              Pigmentos
            </button>
            <button
              onClick={() => setActiveTab('volume')}
              className={`flex-1 px-3 py-2 text-xs uppercase tracking-wider rounded border transition-colors ${
                activeTab === 'volume'
                  ? 'bg-gold-500 text-black border-gold-500'
                  : 'bg-transparent border-gold-500/30 text-stone-400 hover:border-gold-500 hover:text-gold-500'
              }`}
            >
              Estudio de Volumen
            </button>
          </div>

          {/* Contenido de tabs */}
          {activeTab === 'pigments' && (
            <div className="space-y-4">
              {/* Información de luz */}
              <div className="bg-black/20 rounded-lg p-3 border border-gold-500/15">
                <h3 className="font-serif text-sm text-gold-500 mb-2 flex items-center gap-2">
                  <span>◐</span> Calidad de la luz
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">{currentData.lightDesc}</p>
              </div>

              {/* Lista de pigmentos */}
              <div>
                <h3 className="font-serif text-sm text-gold-500 mb-3 flex items-center gap-2">
                  <span>✧</span> Mezcla de pigmentos recomendada
                </h3>
                <div className="space-y-2">
                  {currentData.pigments.map((pigment, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-2 bg-black/20 rounded border border-white/5"
                    >
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white/20 flex-shrink-0"
                        style={{ backgroundColor: pigment.color }}
                      />
                      <span className="flex-1 text-xs text-stone-300">{pigment.name}</span>
                      <span className="text-xs text-amber-600 font-semibold">{pigment.ratio}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'volume' && (
            <div className="space-y-4">
              {/* Simulador de volumen */}
              <div className="bg-black/20 rounded-lg p-3 border border-gold-500/15">
                <h3 className="font-serif text-sm text-gold-500 mb-3 text-center">
                  Simulador de Punto de Luz
                </h3>
                <div className="relative w-full h-32 bg-gradient-to-b from-stone-700 to-stone-900 rounded overflow-hidden mb-2">
                  {/* Esfera */}
                  <div
                    className="absolute w-12 h-12 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg transition-all duration-400"
                    style={{ background: volumeData.sphereGradient }}
                  />
                  {/* Fuente de luz */}
                  <div
                    className="absolute w-3.5 h-3.5 rounded-full transition-all duration-400"
                    style={{
                      left: `${volumeData.lightPos.x}%`,
                      top: `${volumeData.lightPos.y}%`,
                      background: `radial-gradient(circle, #fff 0%, ${volumeData.lightColor} 50%, transparent 70%)`,
                      boxShadow: `0 0 20px 10px ${volumeData.lightColor}66`
                    }}
                  />
                  {/* Indicador de sombra */}
                  <div
                    className="absolute bottom-3 left-1/2 transform -translate-x-1/2 rounded-full blur-sm transition-all duration-400"
                    style={{
                      width: volumeData.shadowWidth,
                      transform: `translateX(calc(-50% + ${(50 - parseFloat(volumeData.shadowX.replace('%', ''))) * 2}px))`,
                      height: '6px',
                      background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.6), transparent)'
                    }}
                  />
                </div>
                <p className="text-xs text-stone-400 text-center mb-1">{volumeData.lightInfo}</p>
                <p className="text-xs text-amber-600 font-semibold text-center">{volumeData.lightDirection}</p>
              </div>

              {/* Filtro blanco y negro */}
              {hasImage && (
                <button
                  onClick={() => setBwFilterActive(!bwFilterActive)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded border transition-colors ${
                    bwFilterActive
                      ? 'bg-gold-500 text-black border-gold-500'
                      : 'bg-black/30 border-white/10 text-stone-300 hover:border-gold-500'
                  }`}
                >
                  <Sun size={16} />
                  <span className="text-xs">Solo Sombras (Blanco y Negro)</span>
                </button>
              )}
            </div>
          )}

          {/* Consejo */}
          <div className="mt-auto pt-4 border-t border-stone-700">
            <div className="bg-gold-500/10 rounded p-3 border-l-2 border-gold-500">
              <p className="text-xs text-stone-400 leading-relaxed">
                Consejo: Añade una pizca de azul cobalto para enfriar los tonos cálidos y crear la profundidad del mar mediterráneo.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #f5f0e8;
          border: 3px solid #d4a853;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          transition: transform 0.2s ease;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        .slider::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #f5f0e8;
          border: 3px solid #d4a853;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

export default SolSorolla;
