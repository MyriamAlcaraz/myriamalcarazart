import React, { useState } from 'react';
import { ArrowLeft, Gift } from 'lucide-react';

const pigmentosSorolla = {
  blancos: [
    { nombre: 'Albayalde (Blanco de Plomo)', hex: '#F5F5F0', uso: 'Base luminosa, empastes de luz mediterránea', toxicidad: 'Alta - usar con precaución' },
    { nombre: 'Blanco de Zinc', hex: '#FAFAFA', uso: 'Mezclas frías, veladuras', toxicidad: 'Baja' },
    { nombre: 'Litopón', hex: '#F0EDE5', uso: 'Imprimaciones, base económica', toxicidad: 'Baja' },
  ],
  azules: [
    { nombre: 'Azul Ultramar', hex: '#1E3A8A', uso: 'Cielos profundos, sombras frías', toxicidad: 'Baja' },
    { nombre: 'Azul de Prusia', hex: '#003153', uso: 'Oscuros intensos, marinas', toxicidad: 'Baja' },
    { nombre: 'Azul Cobalto', hex: '#0047AB', uso: 'Cielos luminosos, agua clara', toxicidad: 'Media' },
    { nombre: 'Azul Cerúleo', hex: '#2A52BE', uso: 'Cielos mediterráneos, reflejos', toxicidad: 'Media' },
  ],
  amarillos: [
    { nombre: 'Amarillo de Cromo', hex: '#FFC300', uso: 'Luces cálidas, arena iluminada', toxicidad: 'Alta' },
    { nombre: 'Amarillo de Cadmio', hex: '#FDDA0D', uso: 'Luces intensas, brillos solares', toxicidad: 'Alta' },
    { nombre: 'Amarillo de Estroncio', hex: '#F4D03F', uso: 'Tonos suaves, luces difusas', toxicidad: 'Media' },
    { nombre: 'Aureolina', hex: '#FDEE00', uso: 'Transparencias, veladuras doradas', toxicidad: 'Baja' },
  ],
  rojos: [
    { nombre: 'Bermellón', hex: '#E34234', uso: 'Carnaciones, acentos cálidos', toxicidad: 'Alta - contiene mercurio' },
    { nombre: 'Laca Roja', hex: '#C41E3A', uso: 'Veladuras, telas', toxicidad: 'Baja' },
    { nombre: 'Carmín', hex: '#960018', uso: 'Sombras cálidas, labios', toxicidad: 'Baja' },
  ],
  violetas: [
    { nombre: 'Violeta de Manganeso', hex: '#8B5CF6', uso: 'REVOLUCIONARIO: Sombras en lugar de tierras', toxicidad: 'Baja' },
    { nombre: 'Violeta de Cobalto', hex: '#7C3AED', uso: 'Sombras frías luminosas', toxicidad: 'Media' },
  ],
  tierras: [
    { nombre: 'Negro de Hueso', hex: '#1C1917', uso: 'Acentos oscuros, ojos', toxicidad: 'Baja' },
    { nombre: 'Negro Vegetal', hex: '#0F0F0F', uso: 'Oscuros profundos', toxicidad: 'Baja' },
  ],
};

const PaletaSorolla: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentCategory, setCurrentCategory] = useState<string>('blancos');
  const [activeModule, setActiveModule] = useState<'paleta' | 'tecnica' | 'obras' | 'luz' | 'evolucion'>('paleta');

  const categories = ['blancos', 'azules', 'amarillos', 'rojos', 'violetas', 'tierras'];

  const renderPigments = () => {
    const pigments = pigmentosSorolla[currentCategory as keyof typeof pigmentosSorolla];
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pigments.map((pigment: any, index: number) => (
          <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden hover:border-amber-400/50 transition-all">
            <div className="h-24 relative" style={{ backgroundColor: pigment.hex }}>
              <span className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs font-mono text-white">
                {pigment.hex}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-serif text-lg text-white mb-2">{pigment.nombre}</h3>
              <p className="text-slate-400 text-sm mb-3">{pigment.uso}</p>
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                pigment.toxicidad.includes('Alta') ? 'bg-red-900/50 text-red-300' :
                pigment.toxicidad.includes('Media') ? 'bg-amber-900/50 text-amber-300' :
                'bg-green-900/50 text-green-300'
              }`}>
                ⚠️ {pigment.toxicidad}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTecnica = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="font-serif text-2xl text-amber-400 mb-4">El Secreto de los Pinceles Largos</h3>
        <p className="text-slate-300 mb-4">
          Sorolla utilizaba pinceles de <strong className="text-amber-400">mangos extremadamente largos</strong> que 
          le permitían mantener distancia del lienzo mientras trabajaba al aire libre.
        </p>
        <ul className="space-y-2 text-slate-400">
          <li className="flex items-start gap-2">
            <span className="text-amber-400">→</span>
            Observar la totalidad de la pieza mientras pintaba
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400">→</span>
            Ejecutar trazos sueltos y gestuales
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400">→</span>
            Capturar el instante en menos de una hora
          </li>
        </ul>
      </div>
      <div className="bg-gradient-to-r from-amber-900/20 to-violet-900/20 border border-amber-400/20 rounded-xl p-6">
        <h3 className="font-serif text-xl text-amber-400 mb-3">☀️ Pintura "Plein Air" Extrema</h3>
        <p className="text-slate-300">
          Sorolla plantaba lienzos monumentales en la playa, amarrándolos con <strong className="text-amber-400">cuerdas, piedras y palos</strong> para 
          resistir el viento mediterráneo. Su disciplina le permitía capturar escenas completas en sesiones de menos de una hora.
        </p>
      </div>
    </div>
  );

  const renderObras = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { titulo: 'Paseo a orilla del mar', año: 1909, secreto: 'Sorolla pintó a su esposa Clotilde y su hija María en la playa de Valencia al atardecer', pigmentos: ['Blanco de plomo', 'Violeta de cobalto', 'Azul cerúleo'] },
        { titulo: 'Chicos en la playa', año: 1909, secreto: 'Los reflejos de luz en la arena mojada se logran con capas de violeta bajo el blanco', pigmentos: ['Azul ultramar', 'Violeta de manganeso', 'Blanco de zinc'] },
        { titulo: '¡Triste herencia!', año: 1899, secreto: 'Enmarcado en el movimiento higienista - regeneración física a través del sol y el mar', pigmentos: ['Blancos luminosos', 'Azules mediterráneos'] },
        { titulo: 'El baño del caballo', año: 1909, secreto: 'Sorolla retiraba pigmento con espátula para crear transparencias en el agua', pigmentos: ['Blanco de plomo', 'Violeta de manganeso'] },
      ].map((obra, index) => (
        <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
          <div className="h-40 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
            <span className="text-6xl">🖼️</span>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-serif text-lg text-white">{obra.titulo}</h3>
              <span className="bg-amber-400/20 text-amber-400 px-2 py-1 rounded text-xs">{obra.año}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {obra.pigmentos.map((p, i) => (
                <span key={i} className="bg-violet-900/30 text-violet-300 px-2 py-1 rounded text-xs">{p}</span>
              ))}
            </div>
            <div className="bg-amber-400/10 border-l-2 border-amber-400 p-3 rounded">
              <p className="text-xs text-amber-200">💡 {obra.secreto}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderLuz = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="font-serif text-xl text-amber-400 mb-3">La Influencia de la Fotografía</h3>
        <p className="text-slate-300">
          Como aprendiz en el taller fotográfico de <strong className="text-amber-400">Antonio García Peris</strong>, 
          Sorolla desarrolló una comprensión única de la luz. Poseía más de <strong className="text-amber-400">6.000 imágenes</strong> que utilizaba como referencia.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: '🌓', title: 'Claroscuro', desc: 'Dominio excepcional de la modulación del color carne' },
          { icon: '📐', title: 'Planos Recortados', desc: 'Composiciones diagonales inspiradas en encuadres fotográficos' },
          { icon: '⚡', title: 'El Instante', desc: 'Captación del movimiento del agua y la luz' },
        ].map((item, index) => (
          <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
            <div className="text-4xl mb-3">{item.icon}</div>
            <h4 className="text-amber-400 font-serif mb-2">{item.title}</h4>
            <p className="text-slate-400 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEvolucion = () => (
    <div className="space-y-4">
      {[
        { periodo: '1863-1875', titulo: 'Orígenes', color: '#78350F', desc: 'Huferfano a los 2 años, criado por su tío cerrajero José Piquér en Valencia.', paleta: 'Formación inicial, tierras y pardos tradicionales' },
        { periodo: '1875-1883', titulo: 'Formación', color: '#92400E', desc: 'Escuela de Artesanos y Bellas Artes. Influencia del taller fotográfico.', paleta: 'Académica: tierras de Marte, pardos' },
        { periodo: '1884-1889', titulo: 'Roma y París', color: '#B45309', desc: 'Beca en Roma. Descubre a Velázquez y el naturalismo francés.', paleta: 'Transición: incorpora azules y empieza a aclarar' },
        { periodo: '1900-1911', titulo: 'Luminismo Pleno', color: '#F59E0B', desc: 'Consagración internacional. Grand Prix París 1900.', paleta: 'REVOLUCIONARIA: Blancos puros, violetas de manganeso' },
      ].map((etapa, index) => (
        <div key={index} className="flex gap-4">
          <div className="w-28 text-right pt-2">
            <span className="font-bold" style={{ color: etapa.color }}>{etapa.periodo}</span>
          </div>
          <div className="flex-1 bg-slate-800/50 border-l-4 border rounded-r-xl p-4" style={{ borderColor: etapa.color }}>
            <h4 className="font-serif text-lg mb-1" style={{ color: etapa.color }}>{etapa.titulo}</h4>
            <p className="text-slate-400 text-sm mb-2">{etapa.desc}</p>
            <p className="text-amber-400/70 text-xs">🎨 {etapa.paleta}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeModule) {
      case 'paleta':
        return (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCurrentCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm capitalize transition-all ${
                    currentCategory === cat
                      ? 'bg-amber-400 text-slate-900'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                  style={currentCategory === cat ? { backgroundColor: pigmentosSorolla[cat as keyof typeof pigmentosSorolla][0]?.hex, color: ['blancos', 'amarillos'].includes(cat) ? '#1a202c' : '#fff' } : {}}
                >
                  {cat}
                </button>
              ))}
            </div>
            {renderPigments()}
            <div className="bg-gradient-to-r from-violet-900/30 to-amber-900/30 border border-violet-400/20 rounded-xl p-6 mt-8">
              <h3 className="text-violet-400 text-sm font-bold uppercase tracking-wider mb-3">💡 El Secreto del Violeta</h3>
              <p className="text-slate-300">
                Mientras los académicos usaban <span className="text-amber-600">tierras y pardos</span> para las sombras, 
                Sorolla descubrió que el <span className="text-violet-400 font-bold">violeta de manganeso</span> reproducía 
                mejor las vibraciones solares reales. Esta decisión técnica es la clave de su luminosidad característica.
              </p>
            </div>
          </div>
        );
      case 'tecnica':
        return renderTecnica();
      case 'obras':
        return renderObras();
      case 'luz':
        return renderLuz();
      case 'evolucion':
        return renderEvolucion();
      default:
        return null;
    }
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
          <Gift size={14} /> Herramienta gratuita
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-slate-900 tracking-wide mb-4">
          La Paleta de Sorolla
        </h2>
        <p className="text-stone-500 text-lg leading-relaxed">
          Descubre los pigmentos revolucionarios que hicieron posible la luz mediterránea de Joaquín Sorolla.
        </p>
      </header>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {[
          { id: 'paleta', label: 'La Paleta del Maestro', icon: '🎨' },
          { id: 'tecnica', label: 'Técnica Pictórica', icon: '🖌️' },
          { id: 'obras', label: 'Análisis de Obras', icon: '🖼️' },
          { id: 'luz', label: 'Capturar la Luz', icon: '☀️' },
          { id: 'evolucion', label: 'Evolución Artística', icon: '📈' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id as any)}
            className={`px-4 py-3 rounded-lg flex items-center gap-2 transition-all ${
              activeModule === item.id
                ? 'bg-amber-400 text-slate-900'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <span>{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default PaletaSorolla;
