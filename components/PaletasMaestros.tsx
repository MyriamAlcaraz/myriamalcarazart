import React, { useState } from 'react';
import { ArrowLeft, Palette, Info } from 'lucide-react';

interface PaletasMaestrosProps {
  onBack: () => void;
}

// Paletas históricas de los grandes maestros
const MAESTROS = [
  {
    id: 'velazquez',
    nombre: 'Diego Velázquez',
    periodo: '1599–1660',
    escuela: 'Barroco Español',
    imagen: '/obras/ARTISTA.jpg', // Placeholder
    descripcion: 'Maestro de la luz y la atmósfera. Su paleta austera basada en tierras logró efectos de profundidad inigualables.',
    cita: '"La verdad, no la verosimilitud"',
    pigmentos: [
      { nombre: 'Blanco de Plomo', hex: '#F5F3E8', rol: 'Luces', equivalentes: { 'Old Holland': 'Lead White (A2)', 'Williamsburg': 'Flake White', 'W&N': 'Flake White Hue (242)' } },
      { nombre: 'Ocre Amarillo', hex: '#C4A035', rol: 'Carnaciones', equivalentes: { 'Old Holland': 'Yellow Ochre Light (B5)', 'Williamsburg': 'Yellow Ochre', 'W&N': 'Yellow Ochre (744)' } },
      { nombre: 'Tierra Sombra', hex: '#5C4827', rol: 'Sombras medias', equivalentes: { 'Old Holland': 'Raw Umber (B13)', 'Williamsburg': 'Raw Umber', 'W&N': 'Raw Umber (554)' } },
      { nombre: 'Rojo Venecia', hex: '#8A3324', rol: 'Carnaciones cálidas', equivalentes: { 'Old Holland': 'Burnt Sienna (B9)', 'Williamsburg': 'Burnt Sienna', 'W&N': 'Burnt Sienna (074)' } },
      { nombre: 'Negro de Hueso', hex: '#1C1C1C', rol: 'Sombras profundas', equivalentes: { 'Old Holland': 'Ivory Black (A1)', 'Williamsburg': 'Ivory Black', 'W&N': 'Ivory Black (331)' } },
      { nombre: 'Azul Esmalte', hex: '#1E3A8A', rol: 'Cielos y ropajes', equivalentes: { 'Old Holland': 'Ultramarine Deep (B80)', 'Williamsburg': 'French Ultramarine', 'W&N': 'French Ultramarine (263)' } },
    ]
  },
  {
    id: 'rembrandt',
    nombre: 'Rembrandt van Rijn',
    periodo: '1606–1669',
    escuela: 'Barroco Holandés',
    imagen: '/obras/ARTISTA.jpg',
    descripcion: 'El maestro del claroscuro. Capas translúcidas sobre fondos oscuros creaban su característico brillo dorado.',
    cita: '"Elige solo un maestro: la Naturaleza"',
    pigmentos: [
      { nombre: 'Blanco de Plomo', hex: '#F8F6EE', rol: 'Impastos de luz', equivalentes: { 'Old Holland': 'Lead White (A2)', 'Williamsburg': 'Flake White', 'W&N': 'Flake White Hue (242)' } },
      { nombre: 'Ocre Amarillo', hex: '#D4A82F', rol: 'Tonos dorados', equivalentes: { 'Old Holland': 'Yellow Ochre Light (B5)', 'Williamsburg': 'Yellow Ochre', 'W&N': 'Yellow Ochre (744)' } },
      { nombre: 'Siena Tostada', hex: '#8D4925', rol: 'Veladuras cálidas', equivalentes: { 'Old Holland': 'Burnt Sienna (B9)', 'Williamsburg': 'Burnt Sienna', 'W&N': 'Burnt Sienna (074)' } },
      { nombre: 'Sombra Tostada', hex: '#3D2B1F', rol: 'Fondos profundos', equivalentes: { 'Old Holland': 'Burnt Umber (B14)', 'Williamsburg': 'Burnt Umber', 'W&N': 'Burnt Umber (076)' } },
      { nombre: 'Negro Marfil', hex: '#232323', rol: 'Oscuridad absoluta', equivalentes: { 'Old Holland': 'Ivory Black (A1)', 'Williamsburg': 'Ivory Black', 'W&N': 'Ivory Black (331)' } },
      { nombre: 'Bermellón', hex: '#E23D28', rol: 'Acentos de color', equivalentes: { 'Old Holland': 'Vermilion (B40)', 'Williamsburg': 'Vermilion', 'W&N': 'Vermilion Hue (682)' } },
    ]
  },
  {
    id: 'sorolla',
    nombre: 'Joaquín Sorolla',
    periodo: '1863–1923',
    escuela: 'Luminismo Español',
    imagen: '/obras/ARTISTA.jpg',
    descripcion: 'El pintor de la luz mediterránea. Paleta brillante y pincelada vigorosa para capturar el sol de Valencia.',
    cita: '"Yo no puedo pintar sin sol"',
    pigmentos: [
      { nombre: 'Blanco de Zinc', hex: '#FFFFFF', rol: 'Luces brillantes', equivalentes: { 'Old Holland': 'Zinc White (A166)', 'Williamsburg': 'Zinc White', 'W&N': 'Zinc White (748)' } },
      { nombre: 'Amarillo Cadmio', hex: '#FFE135', rol: 'Sol y arena', equivalentes: { 'Old Holland': 'Cadmium Yellow Light (B192)', 'Williamsburg': 'Cadmium Yellow Medium', 'W&N': 'Cadmium Yellow (108)' } },
      { nombre: 'Naranja Cadmio', hex: '#FF8C00', rol: 'Reflejos cálidos', equivalentes: { 'Old Holland': 'Cadmium Orange (B32)', 'Williamsburg': 'Cadmium Orange', 'W&N': 'Cadmium Orange (089)' } },
      { nombre: 'Rosa de Garanza', hex: '#E75480', rol: 'Carnaciones', equivalentes: { 'Old Holland': 'Madder Lake Deep (B22)', 'Williamsburg': 'Alizarin Crimson', 'W&N': 'Rose Madder (587)' } },
      { nombre: 'Azul Cobalto', hex: '#0047AB', rol: 'Mar y cielo', equivalentes: { 'Old Holland': 'Cobalt Blue (B75)', 'Williamsburg': 'Cobalt Blue', 'W&N': 'Cobalt Blue (178)' } },
      { nombre: 'Violeta Cobalto', hex: '#6B3FA0', rol: 'Sombras frías', equivalentes: { 'Old Holland': 'Cobalt Violet (B91)', 'Williamsburg': 'Cobalt Violet', 'W&N': 'Cobalt Violet (192)' } },
      { nombre: 'Verde Viridian', hex: '#40826D', rol: 'Vegetación', equivalentes: { 'Old Holland': 'Viridian (B116)', 'Williamsburg': 'Viridian', 'W&N': 'Viridian (692)' } },
    ]
  },
  {
    id: 'zorn',
    nombre: 'Anders Zorn',
    periodo: '1860–1920',
    escuela: 'Realismo Sueco',
    imagen: '/obras/ARTISTA.jpg',
    descripcion: 'La paleta más limitada de los maestros. Solo 4 colores para lograr cualquier tono. Una lección de economía cromática.',
    cita: '"Un pintor debe saber cuándo parar"',
    pigmentos: [
      { nombre: 'Blanco de Plomo', hex: '#F5F5F0', rol: 'Luces y mezclas', equivalentes: { 'Old Holland': 'Lead White (A2)', 'Williamsburg': 'Flake White', 'W&N': 'Flake White Hue (242)' } },
      { nombre: 'Ocre Amarillo', hex: '#C9A227', rol: 'Tonos cálidos', equivalentes: { 'Old Holland': 'Yellow Ochre Light (B5)', 'Williamsburg': 'Yellow Ochre', 'W&N': 'Yellow Ochre (744)' } },
      { nombre: 'Rojo Cadmio', hex: '#E31C23', rol: 'Rojos y naranjas', equivalentes: { 'Old Holland': 'Cadmium Red Medium (B37)', 'Williamsburg': 'Cadmium Red Light', 'W&N': 'Cadmium Red (094)' } },
      { nombre: 'Negro Marfil', hex: '#1C1C1C', rol: 'Sombras y azules', equivalentes: { 'Old Holland': 'Ivory Black (A1)', 'Williamsburg': 'Ivory Black', 'W&N': 'Ivory Black (331)' } },
    ]
  }
];

const PaletasMaestros: React.FC<PaletasMaestrosProps> = ({ onBack }) => {
  const [maestroActivo, setMaestroActivo] = useState(MAESTROS[0]);
  const [pigmentoSeleccionado, setPigmentoSeleccionado] = useState<typeof MAESTROS[0]['pigmentos'][0] | null>(null);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-12 relative">
          <button
            onClick={onBack}
            className="absolute left-0 top-0 flex items-center gap-2 text-stone-500 hover:text-gold-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm tracking-widest uppercase hidden md:inline">Volver</span>
          </button>

          <div className="text-center">
            <p className="text-xs tracking-[0.4em] text-stone-400 uppercase mb-4">Herramienta Gratuita</p>
            <h1 className="font-serif text-4xl md:text-5xl text-slate-900 mb-4">Paletas de los Maestros</h1>
            <div className="w-16 h-px bg-gold-500 mx-auto mb-6"></div>
            <p className="text-stone-600 max-w-xl mx-auto">
              Las paletas reales de los grandes pintores de la historia. Pigmentos históricos con sus equivalentes modernos.
            </p>
          </div>
        </div>

        {/* Selector de Maestros */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {MAESTROS.map((maestro) => (
            <button
              key={maestro.id}
              onClick={() => { setMaestroActivo(maestro); setPigmentoSeleccionado(null); }}
              className={`px-5 py-3 text-sm transition-all rounded-lg ${
                maestroActivo.id === maestro.id
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white text-slate-600 border border-stone-200 hover:border-slate-400'
              }`}
            >
              {maestro.nombre.split(' ').pop()}
            </button>
          ))}
        </div>

        {/* Tarjeta del Maestro */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden mb-10">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gold-400 text-sm tracking-wide mb-2">{maestroActivo.escuela}</p>
                <h2 className="font-serif text-3xl mb-1">{maestroActivo.nombre}</h2>
                <p className="text-slate-400">{maestroActivo.periodo}</p>
              </div>
              <div className="text-right">
                <Palette size={32} className="text-gold-500" />
              </div>
            </div>
            <p className="mt-4 text-slate-300 italic border-l-2 border-gold-500 pl-4">
              {maestroActivo.cita}
            </p>
          </div>

          <div className="p-6">
            <p className="text-stone-600 mb-6">{maestroActivo.descripcion}</p>

            {/* Preview de la paleta completa */}
            <div className="flex gap-1 mb-8 justify-center">
              {maestroActivo.pigmentos.map((p, idx) => (
                <div
                  key={idx}
                  className="w-12 h-12 rounded-lg shadow-inner cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: p.hex }}
                  onClick={() => setPigmentoSeleccionado(p)}
                  title={p.nombre}
                />
              ))}
            </div>

            {/* Grid de pigmentos */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {maestroActivo.pigmentos.map((pigmento, idx) => (
                <button
                  key={idx}
                  onClick={() => setPigmentoSeleccionado(pigmento)}
                  className={`text-left rounded-lg border overflow-hidden transition-all hover:shadow-md ${
                    pigmentoSeleccionado?.nombre === pigmento.nombre
                      ? 'border-gold-500 shadow-md'
                      : 'border-stone-200'
                  }`}
                >
                  <div className="flex items-stretch">
                    <div
                      className="w-16 flex-shrink-0"
                      style={{ backgroundColor: pigmento.hex }}
                    />
                    <div className="p-3 flex-1">
                      <p className="font-medium text-slate-900 text-sm">{pigmento.nombre}</p>
                      <p className="text-xs text-stone-400">{pigmento.rol}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Panel de Equivalentes Modernos */}
        {pigmentoSeleccionado && (
          <div className="bg-white rounded-xl border border-gold-200 p-6 mb-10 animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-lg shadow-inner"
                style={{ backgroundColor: pigmentoSeleccionado.hex }}
              />
              <div>
                <h3 className="font-serif text-xl text-slate-900">{pigmentoSeleccionado.nombre}</h3>
                <p className="text-stone-500 text-sm">Función: {pigmentoSeleccionado.rol}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4 text-sm text-stone-600">
              <Info size={16} />
              <span>Equivalentes modernos en las 3 marcas profesionales:</span>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(pigmentoSeleccionado.equivalentes).map(([marca, nombre]) => (
                <div key={marca} className="bg-stone-50 rounded-lg p-4">
                  <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">{marca}</p>
                  <p className="text-slate-900 font-medium text-sm">{nombre}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nota educativa */}
        <div className="bg-stone-100 rounded-lg p-6 text-center">
          <p className="text-stone-600 italic">
            "Estudiar las paletas de los maestros no es copiarlos, es aprender sus decisiones."
          </p>
          <p className="text-stone-400 text-sm mt-2">— Myriam Alcaraz</p>
        </div>

      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PaletasMaestros;
