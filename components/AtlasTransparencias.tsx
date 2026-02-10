import React, { useState } from 'react';
import { ArrowLeft, Eye, Droplets, Square } from 'lucide-react';

interface AtlasTransparenciasProps {
  onBack: () => void;
}

// Base de datos de pigmentos con transparencias reales
const PIGMENTOS = {
  'Old Holland': [
    { nombre: 'Yellow Ochre Light', codigo: 'B5', transparencia: 'semiopaco', hex: '#C4A035', familia: 'Tierras', notas: 'Excelente para veladuras cálidas. Pigmento natural de gran permanencia.' },
    { nombre: 'Raw Sienna', codigo: 'B7', transparencia: 'transparente', hex: '#8B6914', familia: 'Tierras', notas: 'Transparencia excepcional. Ideal para capas base y veladuras.' },
    { nombre: 'Burnt Sienna', codigo: 'B9', transparencia: 'transparente', hex: '#8A3324', familia: 'Tierras', notas: 'El más transparente de los rojos tierra. Mezcla luminosas.' },
    { nombre: 'Raw Umber', codigo: 'B13', transparencia: 'semiopaco', hex: '#5C4827', familia: 'Tierras', notas: 'Secado rápido. Excelente para imprimaciones tonales.' },
    { nombre: 'Burnt Umber', codigo: 'B14', transparencia: 'transparente', hex: '#3D2B1F', familia: 'Tierras', notas: 'Gran profundidad en sombras. Secativo natural.' },
    { nombre: 'Ivory Black', codigo: 'A1', transparencia: 'semiopaco', hex: '#1C1C1C', familia: 'Negros', notas: 'Negro cálido, ideal para retratos. Secado lento.' },
    { nombre: 'Titanium White', codigo: 'A168', transparencia: 'opaco', hex: '#FAFAFA', familia: 'Blancos', notas: 'Máximo poder cubriente. Estándar moderno.' },
    { nombre: 'Lead White', codigo: 'A2', transparencia: 'semiopaco', hex: '#F5F5F0', familia: 'Blancos', notas: 'El blanco de los maestros. Mezclas sedosas y luminosas.' },
    { nombre: 'Cadmium Yellow Light', codigo: 'B192', transparencia: 'opaco', hex: '#FFE135', familia: 'Cadmios', notas: 'Máxima saturación. Poder cubriente excepcional.' },
    { nombre: 'Cadmium Red Medium', codigo: 'B37', transparencia: 'opaco', hex: '#E31C23', familia: 'Cadmios', notas: 'Rojo intenso y permanente. El estándar profesional.' },
    { nombre: 'Ultramarine Blue Deep', codigo: 'B80', transparencia: 'transparente', hex: '#1E3A8A', familia: 'Azules', notas: 'El azul más versátil. Excelente para cielos y veladuras.' },
    { nombre: 'Cobalt Blue', codigo: 'B75', transparencia: 'semiopaco', hex: '#0047AB', familia: 'Azules', notas: 'Equilibrio perfecto entre transparencia y cubriente.' },
  ],
  'Williamsburg': [
    { nombre: 'Yellow Ochre', codigo: 'YO', transparencia: 'semiopaco', hex: '#C9A227', familia: 'Tierras', notas: 'Molido grueso tradicional. Textura excepcional.' },
    { nombre: 'Italian Raw Sienna', codigo: 'IRS', transparencia: 'transparente', hex: '#906E3E', familia: 'Tierras', notas: 'De las minas italianas originales. Transparencia histórica.' },
    { nombre: 'Burnt Sienna', codigo: 'BS', transparencia: 'transparente', hex: '#9C4324', familia: 'Tierras', notas: 'Calcinación tradicional. Rojo tierra luminoso.' },
    { nombre: 'Raw Umber', codigo: 'RU', transparencia: 'semiopaco', hex: '#5D4E37', familia: 'Tierras', notas: 'De Umbría, Italia. Tono verdoso característico.' },
    { nombre: 'Burnt Umber', codigo: 'BU', transparencia: 'transparente', hex: '#4A3728', familia: 'Tierras', notas: 'Profundidad inigualable en sombras cálidas.' },
    { nombre: 'Ivory Black', codigo: 'IB', transparencia: 'semiopaco', hex: '#232323', familia: 'Negros', notas: 'Hueso calcinado. El negro de Rembrandt.' },
    { nombre: 'Flake White', codigo: 'FW', transparencia: 'semiopaco', hex: '#F8F6F0', familia: 'Blancos', notas: 'Carbonato de plomo. Flexibilidad y luminosidad.' },
    { nombre: 'Titanium White', codigo: 'TW', transparencia: 'opaco', hex: '#FFFFFF', familia: 'Blancos', notas: 'Formulación con aceite de cártamo.' },
    { nombre: 'Cadmium Yellow Medium', codigo: 'CYM', transparencia: 'opaco', hex: '#FFCD00', familia: 'Cadmios', notas: 'Sulfuro de cadmio puro. Intensidad máxima.' },
    { nombre: 'Cadmium Red Light', codigo: 'CRL', transparencia: 'opaco', hex: '#E34234', familia: 'Cadmios', notas: 'Cadmio selenio. Permanencia absoluta.' },
    { nombre: 'French Ultramarine', codigo: 'FU', transparencia: 'transparente', hex: '#2A4B8C', familia: 'Azules', notas: 'Tono violáceo profundo. El azul de los impresionistas.' },
    { nombre: 'Cobalt Blue', codigo: 'CB', transparencia: 'semiopaco', hex: '#0D5CAB', familia: 'Azules', notas: 'Aluminato de cobalto. Nobleza cromática.' },
  ],
  'Winsor & Newton': [
    { nombre: 'Yellow Ochre', codigo: '744', transparencia: 'semiopaco', hex: '#D4A82F', familia: 'Tierras', notas: 'PY43. Óxido de hierro natural.' },
    { nombre: 'Raw Sienna', codigo: '552', transparencia: 'transparente', hex: '#A67C52', familia: 'Tierras', notas: 'PBr7. Gran transparencia y calidez.' },
    { nombre: 'Burnt Sienna', codigo: '074', transparencia: 'transparente', hex: '#8D4925', familia: 'Tierras', notas: 'PBr7. El más vendido de la gama.' },
    { nombre: 'Raw Umber', codigo: '554', transparencia: 'transparente', hex: '#6B5344', familia: 'Tierras', notas: 'PBr7. Secado ultra rápido.' },
    { nombre: 'Burnt Umber', codigo: '076', transparencia: 'transparente', hex: '#4D3D30', familia: 'Tierras', notas: 'PBr7. Sombras profundas y cálidas.' },
    { nombre: 'Ivory Black', codigo: '331', transparencia: 'semiopaco', hex: '#292929', familia: 'Negros', notas: 'PBk9. Negro azulado sutil.' },
    { nombre: 'Titanium White', codigo: '644', transparencia: 'opaco', hex: '#FCFCFC', familia: 'Blancos', notas: 'PW6. Máxima opacidad.' },
    { nombre: 'Flake White Hue', codigo: '242', transparencia: 'semiopaco', hex: '#F5F3ED', familia: 'Blancos', notas: 'Sin plomo. Imita al original.' },
    { nombre: 'Cadmium Yellow', codigo: '108', transparencia: 'opaco', hex: '#FFE600', familia: 'Cadmios', notas: 'PY37. Permanencia Serie AA.' },
    { nombre: 'Cadmium Red', codigo: '094', transparencia: 'opaco', hex: '#E52B2B', familia: 'Cadmios', notas: 'PR108. El rojo más intenso.' },
    { nombre: 'French Ultramarine', codigo: '263', transparencia: 'transparente', hex: '#273E8C', familia: 'Azules', notas: 'PB29. Tono profundo violáceo.' },
    { nombre: 'Cobalt Blue', codigo: '178', transparencia: 'semiopaco', hex: '#0062A8', familia: 'Azules', notas: 'PB28. Pureza absoluta.' },
  ]
};

const TRANSPARENCIAS = {
  transparente: { label: 'Transparente', icon: Eye, color: 'text-sky-600', bg: 'bg-sky-50', description: 'Deja pasar la luz. Ideal para veladuras y capas luminosas.' },
  semiopaco: { label: 'Semiopaco', icon: Droplets, color: 'text-amber-600', bg: 'bg-amber-50', description: 'Versatilidad total. Funciona en veladuras y empastes.' },
  opaco: { label: 'Opaco', icon: Square, color: 'text-slate-600', bg: 'bg-slate-100', description: 'Máximo poder cubriente. Para luces y empastes densos.' }
};

const AtlasTransparencias: React.FC<AtlasTransparenciasProps> = ({ onBack }) => {
  const [marcaActiva, setMarcaActiva] = useState<keyof typeof PIGMENTOS>('Old Holland');
  const [filtroTransparencia, setFiltroTransparencia] = useState<string | null>(null);
  const [pigmentoSeleccionado, setPigmentoSeleccionado] = useState<typeof PIGMENTOS['Old Holland'][0] | null>(null);

  const pigmentosFiltrados = filtroTransparencia
    ? PIGMENTOS[marcaActiva].filter(p => p.transparencia === filtroTransparencia)
    : PIGMENTOS[marcaActiva];

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
            <h1 className="font-serif text-4xl md:text-5xl text-slate-900 mb-4">Atlas de Transparencias</h1>
            <div className="w-16 h-px bg-gold-500 mx-auto mb-6"></div>
            <p className="text-stone-600 max-w-xl mx-auto">
              Explora el comportamiento lumínico de cada pigmento. Descubre cuáles son ideales para veladuras y cuáles para empastes opacos.
            </p>
          </div>
        </div>

        {/* Selector de Marca */}
        <div className="flex justify-center gap-2 mb-8">
          {Object.keys(PIGMENTOS).map((marca) => (
            <button
              key={marca}
              onClick={() => { setMarcaActiva(marca as keyof typeof PIGMENTOS); setPigmentoSeleccionado(null); }}
              className={`px-6 py-3 text-sm tracking-wide transition-all rounded-lg ${
                marcaActiva === marca
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-stone-200 hover:border-slate-400'
              }`}
            >
              {marca}
            </button>
          ))}
        </div>

        {/* Filtros de Transparencia */}
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setFiltroTransparencia(null)}
            className={`px-4 py-2 text-xs tracking-wide rounded-full transition-all ${
              !filtroTransparencia ? 'bg-gold-500 text-white' : 'bg-white text-stone-500 border border-stone-200'
            }`}
          >
            Todos
          </button>
          {Object.entries(TRANSPARENCIAS).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setFiltroTransparencia(key)}
              className={`px-4 py-2 text-xs tracking-wide rounded-full transition-all flex items-center gap-2 ${
                filtroTransparencia === key ? `${val.bg} ${val.color} border-2 border-current` : 'bg-white text-stone-500 border border-stone-200'
              }`}
            >
              <val.icon size={14} />
              {val.label}
            </button>
          ))}
        </div>

        {/* Grid de Pigmentos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {pigmentosFiltrados.map((pigmento, idx) => {
            const trans = TRANSPARENCIAS[pigmento.transparencia as keyof typeof TRANSPARENCIAS];
            return (
              <button
                key={idx}
                onClick={() => setPigmentoSeleccionado(pigmento)}
                className={`bg-white rounded-lg border overflow-hidden text-left transition-all hover:shadow-lg ${
                  pigmentoSeleccionado?.nombre === pigmento.nombre ? 'border-gold-500 shadow-lg' : 'border-stone-200'
                }`}
              >
                {/* Muestra de color */}
                <div
                  className="h-20 relative"
                  style={{ backgroundColor: pigmento.hex }}
                >
                  {/* Indicador de transparencia visual */}
                  <div className="absolute inset-0 flex items-end justify-end p-2">
                    <span className={`text-[10px] px-2 py-1 rounded-full ${trans.bg} ${trans.color} font-medium`}>
                      {trans.label}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="font-medium text-slate-900 text-sm truncate">{pigmento.nombre}</p>
                  <p className="text-xs text-stone-400">{pigmento.familia} · {pigmento.codigo}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Panel de Detalle */}
        {pigmentoSeleccionado && (
          <div className="bg-white rounded-xl border border-stone-200 p-8 mb-12 animate-fade-in">
            <div className="flex gap-8">
              {/* Muestra grande */}
              <div
                className="w-32 h-32 rounded-lg shadow-inner flex-shrink-0"
                style={{ backgroundColor: pigmentoSeleccionado.hex }}
              />

              {/* Información */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-2xl text-slate-900">{pigmentoSeleccionado.nombre}</h3>
                    <p className="text-stone-500">{marcaActiva} · {pigmentoSeleccionado.codigo}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${TRANSPARENCIAS[pigmentoSeleccionado.transparencia as keyof typeof TRANSPARENCIAS].bg} ${TRANSPARENCIAS[pigmentoSeleccionado.transparencia as keyof typeof TRANSPARENCIAS].color}`}>
                    {TRANSPARENCIAS[pigmentoSeleccionado.transparencia as keyof typeof TRANSPARENCIAS].label}
                  </span>
                </div>

                <p className="text-stone-600 mb-4">{pigmentoSeleccionado.notas}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-stone-50 rounded-lg p-3">
                    <p className="text-stone-400 text-xs uppercase tracking-wide mb-1">Familia</p>
                    <p className="text-slate-900 font-medium">{pigmentoSeleccionado.familia}</p>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-3">
                    <p className="text-stone-400 text-xs uppercase tracking-wide mb-1">Uso recomendado</p>
                    <p className="text-slate-900 font-medium">
                      {pigmentoSeleccionado.transparencia === 'transparente' ? 'Veladuras y capas' :
                       pigmentoSeleccionado.transparencia === 'opaco' ? 'Luces y empastes' : 'Versátil'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leyenda */}
        <div className="bg-stone-100 rounded-lg p-6">
          <h4 className="font-serif text-lg text-slate-900 mb-4 text-center">Guía de Transparencias</h4>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(TRANSPARENCIAS).map(([key, val]) => (
              <div key={key} className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg ${val.bg} flex items-center justify-center flex-shrink-0`}>
                  <val.icon size={20} className={val.color} />
                </div>
                <div>
                  <p className={`font-medium ${val.color}`}>{val.label}</p>
                  <p className="text-sm text-stone-500">{val.description}</p>
                </div>
              </div>
            ))}
          </div>
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

export default AtlasTransparencias;
