import React, { useState, useMemo } from 'react';
import { ArrowLeft, Eye, Droplets, Square, Layers, Sun, Moon, Search, Sparkles } from 'lucide-react';

interface AtlasTransparenciasProps {
  onBack: () => void;
}

// Base de datos ampliada de pigmentos con transparencias reales
const PIGMENTOS = {
  'Old Holland': [
    // Blancos
    { nombre: 'Titanium White', codigo: 'A168', transparencia: 'opaco', hex: '#FAFAFA', familia: 'Blancos', notas: 'Máximo poder cubriente. El blanco estándar moderno. Ideal para luces opacas.', secado: 'Medio' },
    { nombre: 'Lead White', codigo: 'A2', transparencia: 'semiopaco', hex: '#F5F5F0', familia: 'Blancos', notas: 'El blanco de los maestros antiguos. Mezclas sedosas y luminosas. Requiere precaución.', secado: 'Rápido' },
    { nombre: 'Zinc White', codigo: 'A166', transparencia: 'transparente', hex: '#FDFDFD', familia: 'Blancos', notas: 'Blanco transparente ideal para veladuras luminosas. Fragilidad en capas gruesas.', secado: 'Lento' },
    // Amarillos
    { nombre: 'Yellow Ochre Light', codigo: 'B5', transparencia: 'semiopaco', hex: '#C4A035', familia: 'Tierras', notas: 'Excelente para veladuras cálidas. Pigmento natural de gran permanencia.', secado: 'Rápido' },
    { nombre: 'Cadmium Yellow Light', codigo: 'B192', transparencia: 'opaco', hex: '#FFE135', familia: 'Cadmios', notas: 'Máxima saturación y cubrición. El amarillo más luminoso.', secado: 'Medio' },
    { nombre: 'Cadmium Yellow Deep', codigo: 'B193', transparencia: 'opaco', hex: '#FFB800', familia: 'Cadmios', notas: 'Amarillo cálido intenso. Excelente para mezclas anaranjadas.', secado: 'Medio' },
    { nombre: 'Naples Yellow', codigo: 'B8', transparencia: 'opaco', hex: '#FADA5E', familia: 'Históricos', notas: 'Color histórico para carnaciones. Opaco y luminoso.', secado: 'Medio' },
    // Naranjas y Rojos
    { nombre: 'Cadmium Orange', codigo: 'B32', transparencia: 'opaco', hex: '#FF7F00', familia: 'Cadmios', notas: 'Naranja intenso y permanente. Poder cubriente excepcional.', secado: 'Medio' },
    { nombre: 'Cadmium Red Medium', codigo: 'B37', transparencia: 'opaco', hex: '#E31C23', familia: 'Cadmios', notas: 'Rojo intenso y permanente. El estándar profesional.', secado: 'Medio' },
    { nombre: 'Vermilion', codigo: 'B40', transparencia: 'opaco', hex: '#E34234', familia: 'Históricos', notas: 'El bermellón histórico. Rojo vibrante de los maestros antiguos.', secado: 'Medio' },
    { nombre: 'Alizarin Crimson', codigo: 'B21', transparencia: 'transparente', hex: '#E32636', familia: 'Orgánicos', notas: 'Carmín transparente ideal para veladuras rojas profundas.', secado: 'Lento' },
    // Tierras
    { nombre: 'Raw Sienna', codigo: 'B7', transparencia: 'transparente', hex: '#8B6914', familia: 'Tierras', notas: 'Transparencia excepcional. Ideal para capas base y veladuras doradas.', secado: 'Rápido' },
    { nombre: 'Burnt Sienna', codigo: 'B9', transparencia: 'transparente', hex: '#8A3324', familia: 'Tierras', notas: 'El más transparente de los rojos tierra. Veladuras luminosas.', secado: 'Rápido' },
    { nombre: 'Raw Umber', codigo: 'B13', transparencia: 'semiopaco', hex: '#5C4827', familia: 'Tierras', notas: 'Secado ultra rápido. Excelente para imprimaciones tonales.', secado: 'Muy Rápido' },
    { nombre: 'Burnt Umber', codigo: 'B14', transparencia: 'transparente', hex: '#3D2B1F', familia: 'Tierras', notas: 'Gran profundidad en sombras. Secativo natural.', secado: 'Muy Rápido' },
    // Azules
    { nombre: 'Ultramarine Blue Deep', codigo: 'B80', transparencia: 'transparente', hex: '#1E3A8A', familia: 'Azules', notas: 'El azul más versátil. Excelente para cielos y veladuras profundas.', secado: 'Medio' },
    { nombre: 'Cobalt Blue', codigo: 'B75', transparencia: 'semiopaco', hex: '#0047AB', familia: 'Azules', notas: 'Equilibrio perfecto entre transparencia y cubriente.', secado: 'Rápido' },
    { nombre: 'Cerulean Blue', codigo: 'B77', transparencia: 'semiopaco', hex: '#2A52BE', familia: 'Azules', notas: 'Azul cielo por excelencia. Opaco y granuloso.', secado: 'Rápido' },
    { nombre: 'Prussian Blue', codigo: 'B82', transparencia: 'transparente', hex: '#003153', familia: 'Azules', notas: 'Azul verdoso de gran poder de tinción. Ideal para marinas.', secado: 'Medio' },
    // Verdes
    { nombre: 'Viridian', codigo: 'B116', transparencia: 'transparente', hex: '#40826D', familia: 'Verdes', notas: 'Verde transparente frío. Ideal para veladuras en paisajes.', secado: 'Lento' },
    { nombre: 'Chromium Oxide Green', codigo: 'B115', transparencia: 'opaco', hex: '#4A7023', familia: 'Verdes', notas: 'Verde opaco terroso. Excelente para vegetación mate.', secado: 'Medio' },
    // Violetas
    { nombre: 'Cobalt Violet', codigo: 'B91', transparencia: 'semiopaco', hex: '#6B3FA0', familia: 'Violetas', notas: 'Violeta puro y luminoso. Ideal para sombras frías.', secado: 'Rápido' },
    // Negros
    { nombre: 'Ivory Black', codigo: 'A1', transparencia: 'semiopaco', hex: '#1C1C1C', familia: 'Negros', notas: 'Negro cálido, ideal para retratos. Secado lento.', secado: 'Lento' },
    { nombre: 'Mars Black', codigo: 'A4', transparencia: 'opaco', hex: '#0D0D0D', familia: 'Negros', notas: 'Negro más opaco y frío. Secado rápido.', secado: 'Rápido' },
  ],
  'Williamsburg': [
    // Blancos
    { nombre: 'Titanium White', codigo: 'TW', transparencia: 'opaco', hex: '#FFFFFF', familia: 'Blancos', notas: 'Formulación con aceite de cártamo. Menos amarilleo.', secado: 'Medio' },
    { nombre: 'Flake White', codigo: 'FW', transparencia: 'semiopaco', hex: '#F8F6F0', familia: 'Blancos', notas: 'Carbonato de plomo auténtico. Flexibilidad y luminosidad excepcionales.', secado: 'Rápido' },
    // Amarillos
    { nombre: 'Yellow Ochre', codigo: 'YO', transparencia: 'semiopaco', hex: '#C9A227', familia: 'Tierras', notas: 'Molido grueso tradicional. Textura artesanal excepcional.', secado: 'Rápido' },
    { nombre: 'Cadmium Yellow Medium', codigo: 'CYM', transparencia: 'opaco', hex: '#FFCD00', familia: 'Cadmios', notas: 'Sulfuro de cadmio puro. Intensidad máxima.', secado: 'Medio' },
    { nombre: 'Cadmium Yellow Deep', codigo: 'CYD', transparencia: 'opaco', hex: '#FFB300', familia: 'Cadmios', notas: 'Amarillo anaranjado saturado y permanente.', secado: 'Medio' },
    // Naranjas y Rojos
    { nombre: 'Cadmium Orange', codigo: 'CO', transparencia: 'opaco', hex: '#FF8C00', familia: 'Cadmios', notas: 'Naranja puro y vibrante. Formulación tradicional.', secado: 'Medio' },
    { nombre: 'Cadmium Red Light', codigo: 'CRL', transparencia: 'opaco', hex: '#E34234', familia: 'Cadmios', notas: 'Cadmio selenio. Permanencia absoluta.', secado: 'Medio' },
    { nombre: 'Vermilion', codigo: 'VER', transparencia: 'opaco', hex: '#E23D28', familia: 'Históricos', notas: 'Sulfuro de mercurio sintético. Brillo histórico.', secado: 'Medio' },
    { nombre: 'Alizarin Crimson', codigo: 'AC', transparencia: 'transparente', hex: '#DC143C', familia: 'Orgánicos', notas: 'Laca de alizarina tradicional para veladuras.', secado: 'Lento' },
    // Tierras
    { nombre: 'Italian Raw Sienna', codigo: 'IRS', transparencia: 'transparente', hex: '#906E3E', familia: 'Tierras', notas: 'De las minas italianas originales. Transparencia histórica.', secado: 'Rápido' },
    { nombre: 'Burnt Sienna', codigo: 'BS', transparencia: 'transparente', hex: '#9C4324', familia: 'Tierras', notas: 'Calcinación tradicional. Rojo tierra luminoso.', secado: 'Rápido' },
    { nombre: 'Raw Umber', codigo: 'RU', transparencia: 'semiopaco', hex: '#5D4E37', familia: 'Tierras', notas: 'De Umbría, Italia. Tono verdoso característico.', secado: 'Muy Rápido' },
    { nombre: 'Burnt Umber', codigo: 'BU', transparencia: 'transparente', hex: '#4A3728', familia: 'Tierras', notas: 'Profundidad inigualable en sombras cálidas.', secado: 'Muy Rápido' },
    // Azules
    { nombre: 'French Ultramarine', codigo: 'FU', transparencia: 'transparente', hex: '#2A4B8C', familia: 'Azules', notas: 'Tono violáceo profundo. El azul de los impresionistas.', secado: 'Medio' },
    { nombre: 'Cobalt Blue', codigo: 'CB', transparencia: 'semiopaco', hex: '#0D5CAB', familia: 'Azules', notas: 'Aluminato de cobalto auténtico. Nobleza cromática.', secado: 'Rápido' },
    { nombre: 'Cerulean Blue', codigo: 'CEB', transparencia: 'semiopaco', hex: '#2E7BC7', familia: 'Azules', notas: 'Estannato de cobalto. Granulación natural.', secado: 'Rápido' },
    // Verdes
    { nombre: 'Viridian', codigo: 'VIR', transparencia: 'transparente', hex: '#40826D', familia: 'Verdes', notas: 'Óxido de cromo hidratado. Verde esmeralda transparente.', secado: 'Lento' },
    { nombre: 'Chromium Oxide Green', codigo: 'COG', transparencia: 'opaco', hex: '#556B2F', familia: 'Verdes', notas: 'Verde militar opaco. Excelente cubrición.', secado: 'Medio' },
    // Violetas
    { nombre: 'Cobalt Violet', codigo: 'CV', transparencia: 'semiopaco', hex: '#8B008B', familia: 'Violetas', notas: 'Fosfato de cobalto. Violeta puro sin mezcla.', secado: 'Rápido' },
    // Negros
    { nombre: 'Ivory Black', codigo: 'IB', transparencia: 'semiopaco', hex: '#232323', familia: 'Negros', notas: 'Hueso calcinado tradicional. El negro de Rembrandt.', secado: 'Lento' },
  ],
  'Winsor & Newton': [
    // Blancos
    { nombre: 'Titanium White', codigo: '644', transparencia: 'opaco', hex: '#FCFCFC', familia: 'Blancos', notas: 'PW6. Máxima opacidad y brillo.', secado: 'Medio' },
    { nombre: 'Flake White Hue', codigo: '242', transparencia: 'semiopaco', hex: '#F5F3ED', familia: 'Blancos', notas: 'Alternativa sin plomo al blanco de plomo histórico.', secado: 'Medio' },
    { nombre: 'Zinc White', codigo: '748', transparencia: 'transparente', hex: '#FEFEFE', familia: 'Blancos', notas: 'PW4. Blanco frío y transparente para veladuras.', secado: 'Lento' },
    // Amarillos
    { nombre: 'Yellow Ochre', codigo: '744', transparencia: 'semiopaco', hex: '#D4A82F', familia: 'Tierras', notas: 'PY43. Óxido de hierro natural versátil.', secado: 'Rápido' },
    { nombre: 'Cadmium Yellow', codigo: '108', transparencia: 'opaco', hex: '#FFE600', familia: 'Cadmios', notas: 'PY37. Permanencia Serie AA.', secado: 'Medio' },
    { nombre: 'Cadmium Yellow Deep', codigo: '111', transparencia: 'opaco', hex: '#FFB800', familia: 'Cadmios', notas: 'PY37/PR108. Amarillo anaranjado brillante.', secado: 'Medio' },
    { nombre: 'Naples Yellow', codigo: '422', transparencia: 'opaco', hex: '#FADA5E', familia: 'Históricos', notas: 'Mezcla moderna del amarillo de Nápoles.', secado: 'Medio' },
    // Naranjas y Rojos
    { nombre: 'Cadmium Orange', codigo: '089', transparencia: 'opaco', hex: '#FF6600', familia: 'Cadmios', notas: 'PO20. Naranja puro y permanente.', secado: 'Medio' },
    { nombre: 'Cadmium Red', codigo: '094', transparencia: 'opaco', hex: '#E52B2B', familia: 'Cadmios', notas: 'PR108. El rojo más intenso y permanente.', secado: 'Medio' },
    { nombre: 'Vermilion Hue', codigo: '682', transparencia: 'opaco', hex: '#E34234', familia: 'Históricos', notas: 'Alternativa moderna al bermellón histórico.', secado: 'Medio' },
    { nombre: 'Alizarin Crimson', codigo: '004', transparencia: 'transparente', hex: '#E32636', familia: 'Orgánicos', notas: 'PR83. Carmín transparente clásico.', secado: 'Lento' },
    // Tierras
    { nombre: 'Raw Sienna', codigo: '552', transparencia: 'transparente', hex: '#A67C52', familia: 'Tierras', notas: 'PBr7. Gran transparencia y calidez.', secado: 'Rápido' },
    { nombre: 'Burnt Sienna', codigo: '074', transparencia: 'transparente', hex: '#8D4925', familia: 'Tierras', notas: 'PBr7. El más vendido de la gama.', secado: 'Rápido' },
    { nombre: 'Raw Umber', codigo: '554', transparencia: 'transparente', hex: '#6B5344', familia: 'Tierras', notas: 'PBr7. Secado ultra rápido.', secado: 'Muy Rápido' },
    { nombre: 'Burnt Umber', codigo: '076', transparencia: 'transparente', hex: '#4D3D30', familia: 'Tierras', notas: 'PBr7. Sombras profundas y cálidas.', secado: 'Muy Rápido' },
    // Azules
    { nombre: 'French Ultramarine', codigo: '263', transparencia: 'transparente', hex: '#273E8C', familia: 'Azules', notas: 'PB29. Tono profundo violáceo.', secado: 'Medio' },
    { nombre: 'Cobalt Blue', codigo: '178', transparencia: 'semiopaco', hex: '#0062A8', familia: 'Azules', notas: 'PB28. Pureza absoluta del cobalto.', secado: 'Rápido' },
    { nombre: 'Cerulean Blue', codigo: '137', transparencia: 'semiopaco', hex: '#2A52BE', familia: 'Azules', notas: 'PB35. Azul cielo granulado.', secado: 'Rápido' },
    { nombre: 'Prussian Blue', codigo: '538', transparencia: 'transparente', hex: '#003153', familia: 'Azules', notas: 'PB27. Azul verdoso intenso.', secado: 'Medio' },
    // Verdes
    { nombre: 'Viridian', codigo: '692', transparencia: 'transparente', hex: '#40826D', familia: 'Verdes', notas: 'PG18. Verde esmeralda transparente.', secado: 'Lento' },
    { nombre: 'Oxide of Chromium', codigo: '459', transparencia: 'opaco', hex: '#4A7023', familia: 'Verdes', notas: 'PG17. Verde opaco permanente.', secado: 'Medio' },
    // Violetas
    { nombre: 'Cobalt Violet', codigo: '192', transparencia: 'semiopaco', hex: '#6B3FA0', familia: 'Violetas', notas: 'PV14. Violeta puro del cobalto.', secado: 'Rápido' },
    // Negros
    { nombre: 'Ivory Black', codigo: '331', transparencia: 'semiopaco', hex: '#292929', familia: 'Negros', notas: 'PBk9. Negro azulado sutil.', secado: 'Lento' },
    { nombre: 'Lamp Black', codigo: '337', transparencia: 'semiopaco', hex: '#1C1C1C', familia: 'Negros', notas: 'PBk6. Negro puro carbono.', secado: 'Medio' },
  ]
};

const TRANSPARENCIAS = {
  transparente: {
    label: 'Transparente',
    icon: Eye,
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    gradient: 'from-sky-400 to-blue-500',
    description: 'Deja pasar la luz completamente. Ideal para veladuras, esmaltes y capas luminosas.',
    tecnica: 'Aplicar en capas finas sobre fondos secos. La luz atraviesa y rebota creando profundidad.',
    simbolo: '○'
  },
  semiopaco: {
    label: 'Semiopaco',
    icon: Droplets,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    gradient: 'from-amber-400 to-orange-500',
    description: 'Versatilidad total. Funciona tanto en veladuras como en empastes moderados.',
    tecnica: 'El más versátil. Puede modificar su opacidad según la cantidad de médium.',
    simbolo: '◐'
  },
  opaco: {
    label: 'Opaco',
    icon: Square,
    color: 'text-slate-600',
    bg: 'bg-slate-100',
    border: 'border-slate-200',
    gradient: 'from-slate-500 to-slate-700',
    description: 'Máximo poder cubriente. Para luces, empastes densos y correcciones.',
    tecnica: 'Bloquea completamente lo que hay debajo. Ideal para highlights y áreas de máxima luz.',
    simbolo: '●'
  }
};

const FAMILIAS = [
  { id: 'Todos', color: '#6B7280' },
  { id: 'Blancos', color: '#F5F5F5' },
  { id: 'Tierras', color: '#8B6914' },
  { id: 'Cadmios', color: '#FF6600' },
  { id: 'Azules', color: '#0047AB' },
  { id: 'Verdes', color: '#40826D' },
  { id: 'Violetas', color: '#6B3FA0' },
  { id: 'Negros', color: '#1C1C1C' },
  { id: 'Históricos', color: '#C9A227' },
  { id: 'Orgánicos', color: '#E32636' },
];

const AtlasTransparencias: React.FC<AtlasTransparenciasProps> = ({ onBack }) => {
  const [marcaActiva, setMarcaActiva] = useState<keyof typeof PIGMENTOS>('Old Holland');
  const [filtroTransparencia, setFiltroTransparencia] = useState<string | null>(null);
  const [filtroFamilia, setFiltroFamilia] = useState<string>('Todos');
  const [pigmentoSeleccionado, setPigmentoSeleccionado] = useState<typeof PIGMENTOS['Old Holland'][0] | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [vistaComparativa, setVistaComparativa] = useState(false);

  // Filtrar pigmentos
  const pigmentosFiltrados = useMemo(() => {
    let resultado = PIGMENTOS[marcaActiva];

    if (filtroTransparencia) {
      resultado = resultado.filter(p => p.transparencia === filtroTransparencia);
    }

    if (filtroFamilia !== 'Todos') {
      resultado = resultado.filter(p => p.familia === filtroFamilia);
    }

    if (busqueda) {
      const termino = busqueda.toLowerCase();
      resultado = resultado.filter(p =>
        p.nombre.toLowerCase().includes(termino) ||
        p.codigo.toLowerCase().includes(termino) ||
        p.familia.toLowerCase().includes(termino)
      );
    }

    return resultado;
  }, [marcaActiva, filtroTransparencia, filtroFamilia, busqueda]);

  // Estadísticas
  const stats = useMemo(() => {
    const todos = PIGMENTOS[marcaActiva];
    return {
      total: todos.length,
      transparentes: todos.filter(p => p.transparencia === 'transparente').length,
      semiopacos: todos.filter(p => p.transparencia === 'semiopaco').length,
      opacos: todos.filter(p => p.transparencia === 'opaco').length,
    };
  }, [marcaActiva]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">

        {/* Header */}
        <div className="mb-10 relative">
          <button
            onClick={onBack}
            className="absolute left-0 top-0 flex items-center gap-2 text-stone-500 hover:text-gold-600 transition-colors z-10"
          >
            <ArrowLeft size={20} />
            <span className="text-sm tracking-widest uppercase hidden md:inline">Volver</span>
          </button>

          <div className="text-center pt-8 md:pt-0">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs tracking-widest uppercase mb-6">
              <Sparkles size={14} />
              <span>Herramienta Gratuita</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-slate-900 mb-4">Atlas de Transparencias</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-sky-400 via-amber-400 to-slate-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-stone-600 max-w-2xl mx-auto text-lg">
              Explora el comportamiento lumínico de cada pigmento profesional.
              Descubre cuáles son ideales para veladuras y cuáles para empastes opacos.
            </p>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-4 gap-3 mb-8 max-w-2xl mx-auto">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-stone-100">
            <p className="text-2xl font-light text-slate-800">{stats.total}</p>
            <p className="text-xs text-stone-500 uppercase tracking-wide">Total</p>
          </div>
          <div className="bg-sky-50 rounded-xl p-4 text-center border border-sky-100">
            <p className="text-2xl font-light text-sky-700">{stats.transparentes}</p>
            <p className="text-xs text-sky-600 uppercase tracking-wide">○ Trans.</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-100">
            <p className="text-2xl font-light text-amber-700">{stats.semiopacos}</p>
            <p className="text-xs text-amber-600 uppercase tracking-wide">◐ Semi</p>
          </div>
          <div className="bg-slate-100 rounded-xl p-4 text-center border border-slate-200">
            <p className="text-2xl font-light text-slate-700">{stats.opacos}</p>
            <p className="text-xs text-slate-600 uppercase tracking-wide">● Opaco</p>
          </div>
        </div>

        {/* Selector de Marca */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {Object.keys(PIGMENTOS).map((marca) => (
            <button
              key={marca}
              onClick={() => { setMarcaActiva(marca as keyof typeof PIGMENTOS); setPigmentoSeleccionado(null); }}
              className={`px-6 py-3 text-sm tracking-wide transition-all rounded-xl ${
                marcaActiva === marca
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                  : 'bg-white text-slate-600 border border-stone-200 hover:border-slate-400 hover:shadow'
              }`}
            >
              {marca}
            </button>
          ))}
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="bg-white rounded-2xl shadow-lg border border-stone-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Búsqueda */}
            <div className="relative flex-1 max-w-md w-full">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar pigmento..."
                className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
              />
            </div>

            {/* Filtros de Transparencia */}
            <div className="flex gap-2 flex-wrap justify-center">
              <button
                onClick={() => setFiltroTransparencia(null)}
                className={`px-4 py-2 text-xs tracking-wide rounded-full transition-all ${
                  !filtroTransparencia ? 'bg-gold-500 text-white shadow' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                }`}
              >
                Todos
              </button>
              {Object.entries(TRANSPARENCIAS).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setFiltroTransparencia(filtroTransparencia === key ? null : key)}
                  className={`px-4 py-2 text-xs tracking-wide rounded-full transition-all flex items-center gap-2 ${
                    filtroTransparencia === key
                      ? `bg-gradient-to-r ${val.gradient} text-white shadow-lg`
                      : `${val.bg} ${val.color} border ${val.border} hover:shadow`
                  }`}
                >
                  <span className="text-sm">{val.simbolo}</span>
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filtros de Familia */}
          <div className="flex gap-2 mt-4 flex-wrap justify-center">
            {FAMILIAS.map((familia) => (
              <button
                key={familia.id}
                onClick={() => setFiltroFamilia(familia.id)}
                className={`px-3 py-1.5 text-xs rounded-full transition-all flex items-center gap-2 ${
                  filtroFamilia === familia.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-white/50"
                  style={{ backgroundColor: familia.color }}
                />
                {familia.id}
              </button>
            ))}
          </div>
        </div>

        {/* Resultados */}
        <p className="text-center text-stone-500 text-sm mb-4">
          Mostrando {pigmentosFiltrados.length} pigmentos
        </p>

        {/* Grid de Pigmentos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-12">
          {pigmentosFiltrados.map((pigmento, idx) => {
            const trans = TRANSPARENCIAS[pigmento.transparencia as keyof typeof TRANSPARENCIAS];
            const isSelected = pigmentoSeleccionado?.nombre === pigmento.nombre;
            return (
              <button
                key={idx}
                onClick={() => setPigmentoSeleccionado(isSelected ? null : pigmento)}
                className={`bg-white rounded-2xl border overflow-hidden text-left transition-all hover:shadow-xl group ${
                  isSelected ? 'border-gold-400 shadow-xl ring-2 ring-gold-200' : 'border-stone-100 hover:border-stone-300'
                }`}
              >
                {/* Muestra de color con efecto de transparencia visual */}
                <div
                  className="h-24 relative overflow-hidden"
                  style={{ backgroundColor: pigmento.hex }}
                >
                  {/* Patrón de ajedrez para mostrar transparencia */}
                  {pigmento.transparencia === 'transparente' && (
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                      backgroundSize: '10px 10px',
                      backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
                    }} />
                  )}

                  {/* Gradiente para semiopacos */}
                  {pigmento.transparencia === 'semiopaco' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30" />
                  )}

                  {/* Badge de transparencia */}
                  <div className="absolute bottom-2 right-2">
                    <span className={`text-lg px-2 py-0.5 rounded-full ${trans.bg} ${trans.color} font-bold shadow-sm`}>
                      {trans.simbolo}
                    </span>
                  </div>

                  {/* Indicador de secado */}
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs bg-black/60 text-white px-2 py-1 rounded-full">
                      {pigmento.secado}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="font-medium text-slate-900 text-sm truncate group-hover:text-gold-600 transition-colors">
                    {pigmento.nombre}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-stone-400">{pigmento.familia}</p>
                    <p className="text-xs text-stone-500 font-mono">{pigmento.codigo}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Panel de Detalle Expandido */}
        {pigmentoSeleccionado && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl p-6 md:p-10 mb-12 animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Muestra grande con simulación de comportamiento */}
              <div className="flex-shrink-0">
                <div className="relative w-full lg:w-48">
                  {/* Simulación de capas */}
                  <div className="space-y-2 mb-4">
                    <p className="text-xs text-stone-400 uppercase tracking-wide text-center">Simulación de capas</p>
                    <div className="flex gap-2">
                      {/* Una capa */}
                      <div className="flex-1 text-center">
                        <div
                          className="h-16 rounded-lg mb-1 border border-stone-200"
                          style={{
                            backgroundColor: pigmentoSeleccionado.hex,
                            opacity: pigmentoSeleccionado.transparencia === 'transparente' ? 0.5 :
                                     pigmentoSeleccionado.transparencia === 'semiopaco' ? 0.75 : 1
                          }}
                        />
                        <span className="text-[10px] text-stone-400">1 capa</span>
                      </div>
                      {/* Dos capas */}
                      <div className="flex-1 text-center">
                        <div
                          className="h-16 rounded-lg mb-1 border border-stone-200"
                          style={{
                            backgroundColor: pigmentoSeleccionado.hex,
                            opacity: pigmentoSeleccionado.transparencia === 'transparente' ? 0.7 :
                                     pigmentoSeleccionado.transparencia === 'semiopaco' ? 0.9 : 1
                          }}
                        />
                        <span className="text-[10px] text-stone-400">2 capas</span>
                      </div>
                      {/* Tres capas */}
                      <div className="flex-1 text-center">
                        <div
                          className="h-16 rounded-lg mb-1 border border-stone-200"
                          style={{ backgroundColor: pigmentoSeleccionado.hex }}
                        />
                        <span className="text-[10px] text-stone-400">3+ capas</span>
                      </div>
                    </div>
                  </div>

                  {/* Muestra principal */}
                  <div
                    className="w-full h-32 rounded-2xl shadow-inner border border-stone-200"
                    style={{ backgroundColor: pigmentoSeleccionado.hex }}
                  />
                </div>
              </div>

              {/* Información completa */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-serif text-3xl text-slate-900">{pigmentoSeleccionado.nombre}</h3>
                    <p className="text-stone-500 text-lg">{marcaActiva} · {pigmentoSeleccionado.codigo}</p>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${TRANSPARENCIAS[pigmentoSeleccionado.transparencia as keyof typeof TRANSPARENCIAS].gradient} text-white shadow-lg`}>
                    <span className="text-lg">{TRANSPARENCIAS[pigmentoSeleccionado.transparencia as keyof typeof TRANSPARENCIAS].simbolo}</span>
                    {TRANSPARENCIAS[pigmentoSeleccionado.transparencia as keyof typeof TRANSPARENCIAS].label}
                  </div>
                </div>

                <p className="text-stone-600 text-lg mb-6 leading-relaxed">{pigmentoSeleccionado.notas}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-stone-50 rounded-xl p-4">
                    <p className="text-stone-400 text-xs uppercase tracking-wide mb-1">Familia</p>
                    <p className="text-slate-900 font-medium">{pigmentoSeleccionado.familia}</p>
                  </div>
                  <div className="bg-stone-50 rounded-xl p-4">
                    <p className="text-stone-400 text-xs uppercase tracking-wide mb-1">Secado</p>
                    <p className="text-slate-900 font-medium">{pigmentoSeleccionado.secado}</p>
                  </div>
                  <div className="bg-stone-50 rounded-xl p-4">
                    <p className="text-stone-400 text-xs uppercase tracking-wide mb-1">Código HEX</p>
                    <p className="text-slate-900 font-mono font-medium">{pigmentoSeleccionado.hex}</p>
                  </div>
                  <div className="bg-stone-50 rounded-xl p-4">
                    <p className="text-stone-400 text-xs uppercase tracking-wide mb-1">Uso ideal</p>
                    <p className="text-slate-900 font-medium">
                      {pigmentoSeleccionado.transparencia === 'transparente' ? 'Veladuras' :
                       pigmentoSeleccionado.transparencia === 'opaco' ? 'Empastes' : 'Versátil'}
                    </p>
                  </div>
                </div>

                {/* Consejo técnico */}
                <div className={`p-4 rounded-xl border ${TRANSPARENCIAS[pigmentoSeleccionado.transparencia as keyof typeof TRANSPARENCIAS].bg} ${TRANSPARENCIAS[pigmentoSeleccionado.transparencia as keyof typeof TRANSPARENCIAS].border}`}>
                  <p className={`text-sm font-medium ${TRANSPARENCIAS[pigmentoSeleccionado.transparencia as keyof typeof TRANSPARENCIAS].color} mb-1`}>
                    Consejo técnico
                  </p>
                  <p className="text-stone-600 text-sm">
                    {TRANSPARENCIAS[pigmentoSeleccionado.transparencia as keyof typeof TRANSPARENCIAS].tecnica}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Guía completa de Transparencias */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-10">
            <Layers size={40} className="mx-auto text-gold-400 mb-4" />
            <h4 className="font-serif text-2xl md:text-3xl mb-2">Guía de Transparencias del Óleo</h4>
            <p className="text-slate-400">Domina el comportamiento lumínico de tus pigmentos</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(TRANSPARENCIAS).map(([key, val]) => (
              <div key={key} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${val.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                  <span className="text-3xl text-white">{val.simbolo}</span>
                </div>
                <h5 className="font-serif text-xl mb-2">{val.label}</h5>
                <p className="text-slate-300 text-sm mb-4">{val.description}</p>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-gold-400 text-xs uppercase tracking-wide mb-2">Técnica</p>
                  <p className="text-slate-400 text-sm">{val.tecnica}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Diagrama visual */}
          <div className="mt-10 bg-white/5 rounded-2xl p-6 border border-white/10">
            <p className="text-center text-gold-400 text-xs uppercase tracking-widest mb-4">Diagrama de comportamiento lumínico</p>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <Sun size={24} className="mx-auto text-yellow-400 mb-2" />
                <p className="text-xs text-slate-400">Luz</p>
              </div>
              <div className="flex-1 max-w-md">
                <div className="h-8 bg-gradient-to-r from-white/80 via-white/50 to-white/20 rounded-full relative">
                  <div className="absolute inset-0 flex items-center justify-around px-4">
                    <span className="text-slate-800 text-xs font-medium">Opaco</span>
                    <span className="text-slate-700 text-xs font-medium">Semiopaco</span>
                    <span className="text-slate-600 text-xs font-medium">Transparente</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Moon size={24} className="mx-auto text-slate-400 mb-2" />
                <p className="text-xs text-slate-400">Soporte</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AtlasTransparencias;
