import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, ZoomIn, ZoomOut } from 'lucide-react';

const lightData = [
  {
    position: 0,
    hour: 6.5,
    period: 'Amanecer',
    skyColor: 'linear-gradient(180deg, #2d1b4e 0%, #8b6b7a 40%, #e8c4a8 100%)',
    sunColor: '#ffcc99',
    sunOpacity: 0.6,
    sunTop: '65%',
    lightDesc: 'La luz nácar del amanecer emerge del mar. Tonos rosados y azulados suaves.',
    pigments: [
      { name: 'Blanco de Plomo', color: '#f5f0e8', ratio: '40%' },
      { name: 'Azul Ultramar', color: '#3d5a80', ratio: '25%' },
      { name: 'Rojo Cadmio Claro', color: '#e07a5f', ratio: '20%' },
    ]
  },
  {
    position: 25,
    hour: 8,
    period: 'Mañana',
    skyColor: 'linear-gradient(180deg, #87ceeb 0%, #ffd4a3 60%, #fff5e6 100%)',
    sunColor: '#ffe4b5',
    sunOpacity: 0.7,
    sunTop: '50%',
    lightDesc: 'Luz dorada suave con reflejos perlados. El mar comienza a brillar.',
    pigments: [
      { name: 'Blanco de Plomo', color: '#f5f0e8', ratio: '45%' },
      { name: 'Amarillo Nápoles', color: '#ffdb58', ratio: '25%' },
      { name: 'Azul Cobalto', color: '#0047ab', ratio: '20%' },
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
    lightDesc: 'El sol de Valencia en su momento más intenso. La luz blanca ciega refleja en el agua.',
    pigments: [
      { name: 'Blanco de Plomo', color: '#f5f0e8', ratio: '60%' },
      { name: 'Amarillo Cadmio', color: '#ffc300', ratio: '20%' },
      { name: 'Azul Cobalto', color: '#0047ab', ratio: '15%' },
    ]
  },
  {
    position: 75,
    hour: 17,
    period: 'Tarde',
    skyColor: 'linear-gradient(180deg, #87ceeb 0%, #ffd89b 50%, #ffb347 100%)',
    sunColor: '#ffe4b5',
    sunOpacity: 0.9,
    sunTop: '30%',
    lightDesc: 'El sol comienza a descender y la luz se vuelve más cálida y dorada.',
    pigments: [
      { name: 'Blanco de Plomo', color: '#f5f0e8', ratio: '40%' },
      { name: 'Amarillo Ocre', color: '#d4a373', ratio: '30%' },
      { name: 'Rojo Cadmio', color: '#e63946', ratio: '20%' },
    ]
  },
  {
    position: 100,
    hour: 20.5,
    period: 'Atardecer',
    skyColor: 'linear-gradient(180deg, #4a3f6b 0%, #e8806a 30%, #ffb347 70%, #ffd700 100%)',
    sunColor: '#ff6b35',
    sunOpacity: 0.95,
    sunTop: '55%',
    lightDesc: 'Los violetas y dorados del atardecer mediterráneo. El mar refleja los tonos naranjas.',
    pigments: [
      { name: 'Rojo Cadmio', color: '#e63946', ratio: '35%' },
      { name: 'Amarillo Nápoles', color: '#ffdb58', ratio: '30%' },
      { name: 'Violeta Cobalto', color: '#7b3f61', ratio: '20%' },
    ]
  },
];

const SolDeSorolla: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [timePosition, setTimePosition] = useState(50);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [activeTab, setActiveTab] = useState<'pigments' | 'volume'>('pigments');
  const [bwFilter, setBwFilter] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInterpolatedData = (position: number) => {
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
      period: upper.period,
      skyColor: upper.skyColor,
      sunColor: upper.sunColor,
      sunOpacity: lower.sunOpacity + (upper.sunOpacity - lower.sunOpacity) * factor,
      sunTop: upper.sunTop,
      lightDesc: upper.lightDesc,
      pigments: upper.pigments
    };
  };

  const data = getInterpolatedData(timePosition);

  const hours = Math.floor(data.hour);
  const minutes = Math.round((data.hour - hours) * 60);
  const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

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

  const getFilterStyle = () => {
    const p = timePosition / 100;
    let brightness = 1, contrast = 1, saturate = 1, sepia = 0;
    
    if (p <= 0.25) {
      const t = p / 0.25;
      brightness = 0.85 + t * 0.2;
      contrast = 0.9 + t * 0.1;
    } else if (p <= 0.5) {
      const t = (p - 0.25) / 0.25;
      brightness = 1.05 + t * 0.15;
      contrast = 1.0 + t * 0.15;
    } else if (p <= 0.75) {
      const t = (p - 0.5) / 0.25;
      brightness = 1.2 - t * 0.05;
      contrast = 1.15 + t * 0.05;
    } else {
      const t = (p - 0.75) / 0.25;
      brightness = 1.15 - t * 0.15;
      contrast = 1.2 - t * 0.1;
      saturate = 1.15 - t * 0.1;
      sepia = t * 0.2;
    }

    if (bwFilter) {
      return { filter: `grayscale(100%) contrast(${contrast * 1.3})` };
    }
    
    return { 
      filter: `brightness(${brightness}) contrast(${contrast}) saturate(${saturate}) sepia(${sepia})`
    };
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-stone-400 hover:text-gold-600 transition-colors">
          <ArrowLeft size={20} />
          <span className="text-sm tracking-widest uppercase">Volver</span>
        </button>
      </div>

      <header className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-emerald-600 uppercase font-medium bg-emerald-50 px-4 py-2 mb-6">
          <span>☀️</span> Herramienta gratuita
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-slate-900 tracking-wide mb-4">
          El Sol de Sorolla
        </h2>
        <p className="text-stone-500 text-lg leading-relaxed">
          Simula la luz mediterránea sobre tus obras. Ajusta la hora del día y observa cómo cambia el volumen y el color.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        <div 
          className="flex-1 relative min-h-[400px] lg:min-h-[500px] rounded-2xl overflow-hidden"
          style={{
            background: uploadedImage ? `url(${uploadedImage}) center/contain no-repeat, ${data.skyColor}` : data.skyColor,
            ...getFilterStyle()
          }}
        >
          {!uploadedImage && (
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: data.skyColor }}
            >
              <div 
                className="w-32 h-32 rounded-full blur-2xl"
                style={{ backgroundColor: data.sunColor, opacity: data.sunOpacity, top: data.sunTop }}
              />
            </div>
          )}
          
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900/80 backdrop-blur px-3 py-2 rounded-full">
            <button onClick={() => setZoom(Math.max(50, zoom - 25))} className="p-1 hover:bg-slate-700 rounded">
              <ZoomOut size={16} />
            </button>
            <span className="text-xs text-slate-400 w-12 text-center">{zoom}%</span>
            <button onClick={() => setZoom(Math.min(300, zoom + 25))} className="p-1 hover:bg-slate-700 rounded">
              <ZoomIn size={16} />
            </button>
          </div>

          {!uploadedImage && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">{data.sunColor === '#ffffff' ? '☀️' : data.sunColor.includes('ff6') ? '🌅' : '🌤️'}</div>
                <div className="text-5xl font-serif text-white/90 mb-2" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
                  {timeStr}
                </div>
                <div className="text-lg text-white/70 uppercase tracking-widest">{data.period}</div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-72 bg-slate-900 rounded-2xl p-5 space-y-4">
          <div className="text-center border-b border-slate-700 pb-4">
            <h3 className="font-serif text-xl text-amber-400">El Sol de Sorolla</h3>
            <p className="text-xs text-slate-500 mt-1">La Luz de la Malvarrosa</p>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 py-2 border border-amber-400 text-amber-400 rounded-lg hover:bg-amber-400 hover:text-slate-900 transition-all text-sm"
          >
            <Upload size={16} />
            Subir obra
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

          <div>
            <label className="text-xs uppercase tracking-widest text-slate-500 block mb-2">Hora del día</label>
            <input
              type="range"
              min="0"
              max="100"
              value={timePosition}
              onChange={(e) => setTimePosition(parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: 'linear-gradient(to right, #e8d5c4 0%, #fff8e7 30%, #ffe4b5 60%, #ffb366 85%, #cc8866 100%)'
              }}
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Amanecer</span>
              <span>Mediodía</span>
              <span>Atardecer</span>
            </div>
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('pigments')}
              className={`flex-1 py-2 text-xs rounded ${activeTab === 'pigments' ? 'bg-amber-400 text-slate-900' : 'bg-slate-800 text-slate-400'}`}
            >
              Pigmentos
            </button>
            <button
              onClick={() => setActiveTab('volume')}
              className={`flex-1 py-2 text-xs rounded ${activeTab === 'volume' ? 'bg-amber-400 text-slate-900' : 'bg-slate-800 text-slate-400'}`}
            >
              Volumen
            </button>
          </div>

          {activeTab === 'pigments' ? (
            <div className="space-y-3">
              <div className="bg-slate-800 rounded-lg p-3">
                <h4 className="text-amber-400 text-sm font-serif mb-2">📖 Calidad de la luz</h4>
                <p className="text-slate-400 text-xs">{data.lightDesc}</p>
              </div>
              <div>
                <h4 className="text-amber-400 text-sm font-serif mb-2">🎨 Mezcla recomendada</h4>
                <div className="space-y-2">
                  {data.pigments.map((pigment, index) => (
                    <div key={index} className="flex items-center gap-2 bg-slate-800 p-2 rounded">
                      <div className="w-6 h-6 rounded-full border-2 border-slate-600" style={{ backgroundColor: pigment.color }} />
                      <span className="text-xs text-slate-300 flex-1">{pigment.name}</span>
                      <span className="text-xs text-amber-400 font-bold">{pigment.ratio}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-slate-800 rounded-lg p-3">
                <h4 className="text-amber-400 text-sm font-serif mb-3 text-center">Simulador de Punto de Luz</h4>
                <div className="relative h-28 bg-gradient-to-b from-slate-700 to-slate-900 rounded-lg overflow-hidden mb-2">
                  <div 
                    className="absolute w-12 h-12 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, #e8d5c4 0%, #8b7355 50%, #3d3428 100%)`,
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                  <div 
                    className="absolute w-4 h-4 rounded-full bg-yellow-300"
                    style={{
                      boxShadow: '0 0 15px 6px rgba(255, 204, 0, 0.4)',
                      top: timePosition < 50 ? '30%' : timePosition < 75 ? '40%' : '60%',
                      left: timePosition < 25 ? '25%' : timePosition < 50 ? '40%' : timePosition < 75 ? '60%' : '75%'
                    }}
                  />
                </div>
                <p className="text-xs text-slate-400 text-center">
                  {timePosition < 25 ? 'Luz baja lateral' : timePosition < 50 ? 'Luz ascendente' : timePosition < 75 ? 'Luz cenital' : 'Luz descendente'}
                </p>
              </div>
              <button
                onClick={() => setBwFilter(!bwFilter)}
                className={`w-full py-2 text-xs rounded ${bwFilter ? 'bg-amber-400 text-slate-900' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}
              >
                {bwFilter ? '✓ Solo Sombras Activo' : 'Solo Sombras (B/N)'}
              </button>
            </div>
          )}

          <div className="bg-amber-400/10 border-l-2 border-amber-400 p-3 rounded text-xs text-slate-400">
            💡 Consejo: Añade una pizca de azul cobalto para enfriar los tonos cálidos y crear la profundidad del mar mediterráneo.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolDeSorolla;
