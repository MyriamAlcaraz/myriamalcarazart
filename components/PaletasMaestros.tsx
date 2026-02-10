import React, { useState } from 'react';
import { ArrowLeft, Palette, Info, Sparkles, BookOpen, Copy, Check } from 'lucide-react';

interface PaletasMaestrosProps {
  onBack: () => void;
}

// Paletas históricas ampliadas de los grandes maestros
const MAESTROS = [
  {
    id: 'velazquez',
    nombre: 'Diego Velázquez',
    periodo: '1599–1660',
    escuela: 'Barroco Español',
    ubicacion: 'Sevilla / Madrid',
    obraMaestra: 'Las Meninas',
    descripcion: 'Maestro absoluto de la luz y la atmósfera. Su paleta austera, basada principalmente en tierras, logró efectos de profundidad y aire que siguen siendo estudiados. Inventó la "perspectiva aérea" en la pintura española.',
    cita: '"La verdad, no la verosimilitud"',
    estilo: 'Pincelada suelta y empaste en luces, veladuras en sombras. Fondos trabajados húmedo sobre húmedo.',
    pigmentos: [
      { nombre: 'Blanco de Plomo', hex: '#F5F3E8', rol: 'Luces principales', uso: 'Impastos gruesos para máxima luminosidad', equivalentes: { 'Old Holland': 'Lead White (A2)', 'Williamsburg': 'Flake White', 'W&N': 'Flake White Hue (242)' } },
      { nombre: 'Ocre Amarillo', hex: '#C4A035', rol: 'Carnaciones', uso: 'Base de todos los tonos de piel', equivalentes: { 'Old Holland': 'Yellow Ochre Light (B5)', 'Williamsburg': 'Yellow Ochre', 'W&N': 'Yellow Ochre (744)' } },
      { nombre: 'Tierra Sombra Natural', hex: '#5C4827', rol: 'Sombras medias', uso: 'Transiciones y medios tonos verdosos', equivalentes: { 'Old Holland': 'Raw Umber (B13)', 'Williamsburg': 'Raw Umber', 'W&N': 'Raw Umber (554)' } },
      { nombre: 'Rojo Venecia', hex: '#8A3324', rol: 'Carnaciones cálidas', uso: 'Mejillas, labios y tonos rosados', equivalentes: { 'Old Holland': 'Burnt Sienna (B9)', 'Williamsburg': 'Burnt Sienna', 'W&N': 'Burnt Sienna (074)' } },
      { nombre: 'Negro de Hueso', hex: '#1C1C1C', rol: 'Sombras profundas', uso: 'Fondos oscuros y acentos', equivalentes: { 'Old Holland': 'Ivory Black (A1)', 'Williamsburg': 'Ivory Black', 'W&N': 'Ivory Black (331)' } },
      { nombre: 'Azul Esmalte', hex: '#1E3A8A', rol: 'Cielos y ropajes', uso: 'Usado con moderación para realeza', equivalentes: { 'Old Holland': 'Ultramarine Deep (B80)', 'Williamsburg': 'French Ultramarine', 'W&N': 'French Ultramarine (263)' } },
    ],
    consejos: [
      'Trabaja los fondos primero, dejando que respiren',
      'Las carnaciones se construyen en capas: tierra base, rosado encima',
      'El negro mezclado con ocre crea verdes perfectos para sombras'
    ]
  },
  {
    id: 'rembrandt',
    nombre: 'Rembrandt van Rijn',
    periodo: '1606–1669',
    escuela: 'Barroco Holandés',
    ubicacion: 'Leiden / Ámsterdam',
    obraMaestra: 'La ronda de noche',
    descripcion: 'El maestro indiscutible del claroscuro. Sus capas translúcidas sobre fondos oscuros creaban un brillo dorado interior. Inventó técnicas de empaste que tardaron siglos en ser comprendidas.',
    cita: '"Elige solo un maestro: la Naturaleza"',
    estilo: 'Impastos dramáticos en luces, múltiples veladuras oscuras. Fondos marrones calientes.',
    pigmentos: [
      { nombre: 'Blanco de Plomo', hex: '#F8F6EE', rol: 'Impastos de luz', uso: 'Aplicado grueso, casi escultórico en highlights', equivalentes: { 'Old Holland': 'Lead White (A2)', 'Williamsburg': 'Flake White', 'W&N': 'Flake White Hue (242)' } },
      { nombre: 'Ocre Amarillo', hex: '#D4A82F', rol: 'Tonos dorados', uso: 'La base de su famoso brillo dorado', equivalentes: { 'Old Holland': 'Yellow Ochre Light (B5)', 'Williamsburg': 'Yellow Ochre', 'W&N': 'Yellow Ochre (744)' } },
      { nombre: 'Siena Tostada', hex: '#8D4925', rol: 'Veladuras cálidas', uso: 'Capas translúcidas sobre fondos secos', equivalentes: { 'Old Holland': 'Burnt Sienna (B9)', 'Williamsburg': 'Burnt Sienna', 'W&N': 'Burnt Sienna (074)' } },
      { nombre: 'Sombra Tostada', hex: '#3D2B1F', rol: 'Fondos profundos', uso: 'La base de su oscuridad característica', equivalentes: { 'Old Holland': 'Burnt Umber (B14)', 'Williamsburg': 'Burnt Umber', 'W&N': 'Burnt Umber (076)' } },
      { nombre: 'Negro Marfil', hex: '#232323', rol: 'Oscuridad absoluta', uso: 'Solo en las sombras más profundas', equivalentes: { 'Old Holland': 'Ivory Black (A1)', 'Williamsburg': 'Ivory Black', 'W&N': 'Ivory Black (331)' } },
      { nombre: 'Bermellón', hex: '#E23D28', rol: 'Acentos de color', uso: 'Toques estratégicos de color intenso', equivalentes: { 'Old Holland': 'Vermilion (B40)', 'Williamsburg': 'Vermilion', 'W&N': 'Vermilion Hue (682)' } },
      { nombre: 'Laca de Garanza', hex: '#A91B2A', rol: 'Veladuras rojas', uso: 'Profundidad en ropajes y sombras de piel', equivalentes: { 'Old Holland': 'Madder Lake Deep (B22)', 'Williamsburg': 'Alizarin Crimson', 'W&N': 'Alizarin Crimson (004)' } },
    ],
    consejos: [
      'La paciencia es clave: deja secar completamente entre capas',
      'Los fondos oscuros deben ser ricos, no simplemente negros',
      'El empaste extremo solo en los puntos de máxima luz'
    ]
  },
  {
    id: 'sorolla',
    nombre: 'Joaquín Sorolla',
    periodo: '1863–1923',
    escuela: 'Luminismo Español',
    ubicacion: 'Valencia / Madrid',
    obraMaestra: 'Paseo a orillas del mar',
    descripcion: 'El pintor de la luz mediterránea por excelencia. Su paleta brillante y pincelada vigorosa capturaban el sol de Valencia como nadie. Maestro de los reflejos en agua y telas blancas.',
    cita: '"Yo no puedo pintar sin sol"',
    estilo: 'Pincelada directa alla prima. Color puro sin mezclar excesivamente. Trabajo rápido al exterior.',
    pigmentos: [
      { nombre: 'Blanco de Zinc', hex: '#FFFFFF', rol: 'Luces brillantes', uso: 'Mezclado generosamente para luminosidad extrema', equivalentes: { 'Old Holland': 'Zinc White (A166)', 'Williamsburg': 'Zinc White', 'W&N': 'Zinc White (748)' } },
      { nombre: 'Amarillo Cadmio', hex: '#FFE135', rol: 'Sol y arena', uso: 'La luz del Mediterráneo puro', equivalentes: { 'Old Holland': 'Cadmium Yellow Light (B192)', 'Williamsburg': 'Cadmium Yellow Medium', 'W&N': 'Cadmium Yellow (108)' } },
      { nombre: 'Naranja Cadmio', hex: '#FF8C00', rol: 'Reflejos cálidos', uso: 'Pieles bronceadas y arenas', equivalentes: { 'Old Holland': 'Cadmium Orange (B32)', 'Williamsburg': 'Cadmium Orange', 'W&N': 'Cadmium Orange (089)' } },
      { nombre: 'Rosa de Garanza', hex: '#E75480', rol: 'Carnaciones', uso: 'Tonos de piel iluminada', equivalentes: { 'Old Holland': 'Madder Lake Deep (B22)', 'Williamsburg': 'Alizarin Crimson', 'W&N': 'Rose Madder (587)' } },
      { nombre: 'Azul Cobalto', hex: '#0047AB', rol: 'Mar y cielo', uso: 'El azul del Mediterráneo', equivalentes: { 'Old Holland': 'Cobalt Blue (B75)', 'Williamsburg': 'Cobalt Blue', 'W&N': 'Cobalt Blue (178)' } },
      { nombre: 'Violeta Cobalto', hex: '#6B3FA0', rol: 'Sombras frías', uso: 'Sombras en telas blancas y agua', equivalentes: { 'Old Holland': 'Cobalt Violet (B91)', 'Williamsburg': 'Cobalt Violet', 'W&N': 'Cobalt Violet (192)' } },
      { nombre: 'Verde Viridian', hex: '#40826D', rol: 'Vegetación', uso: 'Hojas y reflejos verdes', equivalentes: { 'Old Holland': 'Viridian (B116)', 'Williamsburg': 'Viridian', 'W&N': 'Viridian (692)' } },
      { nombre: 'Ocre Amarillo', hex: '#C4A035', rol: 'Arena húmeda', uso: 'Tierras y arenas mojadas', equivalentes: { 'Old Holland': 'Yellow Ochre Light (B5)', 'Williamsburg': 'Yellow Ochre', 'W&N': 'Yellow Ochre (744)' } },
    ],
    consejos: [
      'Pinta rápido: captura la luz antes de que cambie',
      'El violeta es el secreto de las sombras luminosas',
      'Las telas blancas nunca son blancas: están llenas de color reflejado'
    ]
  },
  {
    id: 'zorn',
    nombre: 'Anders Zorn',
    periodo: '1860–1920',
    escuela: 'Realismo Sueco',
    ubicacion: 'Mora, Suecia / París',
    obraMaestra: 'Muchachas de Dalarna bañándose',
    descripcion: 'La paleta más limitada de los grandes maestros. Solo 4 colores para lograr cualquier tono imaginable. Una lección magistral de economía cromática que demuestra que la restricción genera maestría.',
    cita: '"Un pintor debe saber cuándo parar"',
    estilo: 'Alla prima con paleta mínima. Pincelada segura y decidida. Enfoque en valores sobre color.',
    pigmentos: [
      { nombre: 'Blanco de Plomo', hex: '#F5F5F0', rol: 'Luces y mezclas', uso: 'El 50% de cualquier mezcla', equivalentes: { 'Old Holland': 'Lead White (A2)', 'Williamsburg': 'Flake White', 'W&N': 'Flake White Hue (242)' } },
      { nombre: 'Ocre Amarillo', hex: '#C9A227', rol: 'Tonos cálidos', uso: 'Carnaciones, tierras, dorados', equivalentes: { 'Old Holland': 'Yellow Ochre Light (B5)', 'Williamsburg': 'Yellow Ochre', 'W&N': 'Yellow Ochre (744)' } },
      { nombre: 'Rojo Cadmio', hex: '#E31C23', rol: 'Rojos y naranjas', uso: 'Labios, mejillas, ropajes', equivalentes: { 'Old Holland': 'Cadmium Red Medium (B37)', 'Williamsburg': 'Cadmium Red Light', 'W&N': 'Cadmium Red (094)' } },
      { nombre: 'Negro Marfil', hex: '#1C1C1C', rol: 'Sombras y azules', uso: 'Negro + Blanco = grises azulados', equivalentes: { 'Old Holland': 'Ivory Black (A1)', 'Williamsburg': 'Ivory Black', 'W&N': 'Ivory Black (331)' } },
    ],
    consejos: [
      'El negro mezclado con blanco da azules fríos perfectos',
      'El ocre es la base de todas las carnaciones',
      'La limitación fuerza decisiones de valor, no de color'
    ]
  },
  {
    id: 'vermeer',
    nombre: 'Johannes Vermeer',
    periodo: '1632–1675',
    escuela: 'Barroco Holandés',
    ubicacion: 'Delft, Países Bajos',
    obraMaestra: 'La joven de la perla',
    descripcion: 'El maestro de la luz serena. Su paleta refinada y su dominio de los azules ultramarinos crearon atmósferas de intimidad incomparables. Cada cuadro es una lección de equilibrio cromático.',
    cita: '"La pintura es una poesía muda"',
    estilo: 'Capas meticulosas, puntillismo avant la lettre en highlights. Uso magistral del ultramarino.',
    pigmentos: [
      { nombre: 'Blanco de Plomo', hex: '#F8F6F0', rol: 'Luces nacaradas', uso: 'Puntos de luz con textura', equivalentes: { 'Old Holland': 'Lead White (A2)', 'Williamsburg': 'Flake White', 'W&N': 'Flake White Hue (242)' } },
      { nombre: 'Ocre Amarillo', hex: '#C9A227', rol: 'Tonos dorados', uso: 'Base de cortinas y objetos', equivalentes: { 'Old Holland': 'Yellow Ochre Light (B5)', 'Williamsburg': 'Yellow Ochre', 'W&N': 'Yellow Ochre (744)' } },
      { nombre: 'Azul Ultramarino', hex: '#1E3A8A', rol: 'El azul Vermeer', uso: 'Ropajes, cielos, sombras', equivalentes: { 'Old Holland': 'Ultramarine Deep (B80)', 'Williamsburg': 'French Ultramarine', 'W&N': 'French Ultramarine (263)' } },
      { nombre: 'Amarillo de Plomo', hex: '#FFD700', rol: 'Amarillo brillante', uso: 'Vestidos amarillos icónicos', equivalentes: { 'Old Holland': 'Naples Yellow (B8)', 'Williamsburg': 'Lead Tin Yellow', 'W&N': 'Naples Yellow (422)' } },
      { nombre: 'Siena Natural', hex: '#8B6914', rol: 'Maderas y paredes', uso: 'Interiores cálidos', equivalentes: { 'Old Holland': 'Raw Sienna (B7)', 'Williamsburg': 'Italian Raw Sienna', 'W&N': 'Raw Sienna (552)' } },
      { nombre: 'Negro Marfil', hex: '#232323', rol: 'Oscuros profundos', uso: 'Fondos y contrastes', equivalentes: { 'Old Holland': 'Ivory Black (A1)', 'Williamsburg': 'Ivory Black', 'W&N': 'Ivory Black (331)' } },
    ],
    consejos: [
      'El ultramarino era más caro que el oro - úsalo con reverencia',
      'Los highlights son pequeños puntos, casi impresionistas',
      'La luz siempre viene de la izquierda, de una ventana'
    ]
  },
  {
    id: 'sargent',
    nombre: 'John Singer Sargent',
    periodo: '1856–1925',
    escuela: 'Realismo Americano',
    ubicacion: 'Florencia / París / Londres',
    obraMaestra: 'Madame X',
    descripcion: 'El retratista más cotizado de su época. Su pincelada aparentemente espontánea ocultaba un dominio técnico absoluto. Cada trazo estaba perfectamente calculado para parecer casual.',
    cita: '"Un retrato es una pintura donde algo está mal con la boca"',
    estilo: 'Alla prima con preparación tonal. Pincelada amplia y segura. Maestro del "un trazo, un tono".',
    pigmentos: [
      { nombre: 'Blanco de Plomo', hex: '#FAF8F5', rol: 'Luces y satenes', uso: 'Telas brillantes y piel luminosa', equivalentes: { 'Old Holland': 'Lead White (A2)', 'Williamsburg': 'Flake White', 'W&N': 'Flake White Hue (242)' } },
      { nombre: 'Ocre Amarillo', hex: '#C9A227', rol: 'Base de carnaciones', uso: 'Tono medio de la piel', equivalentes: { 'Old Holland': 'Yellow Ochre Light (B5)', 'Williamsburg': 'Yellow Ochre', 'W&N': 'Yellow Ochre (744)' } },
      { nombre: 'Rojo Venecia', hex: '#8A3324', rol: 'Calor en la piel', uso: 'Mejillas, orejas, dedos', equivalentes: { 'Old Holland': 'Venetian Red (B10)', 'Williamsburg': 'Venetian Red', 'W&N': 'Venetian Red (678)' } },
      { nombre: 'Viridian', hex: '#40826D', rol: 'Complementario al rojo', uso: 'Sombras en carnaciones', equivalentes: { 'Old Holland': 'Viridian (B116)', 'Williamsburg': 'Viridian', 'W&N': 'Viridian (692)' } },
      { nombre: 'Azul Cobalto', hex: '#0047AB', rol: 'Sombras frías', uso: 'Contrabalancear los cálidos', equivalentes: { 'Old Holland': 'Cobalt Blue (B75)', 'Williamsburg': 'Cobalt Blue', 'W&N': 'Cobalt Blue (178)' } },
      { nombre: 'Negro Marfil', hex: '#1C1C1C', rol: 'Profundidad', uso: 'Fondos y acentos oscuros', equivalentes: { 'Old Holland': 'Ivory Black (A1)', 'Williamsburg': 'Ivory Black', 'W&N': 'Ivory Black (331)' } },
    ],
    consejos: [
      'Mezcla en la paleta, no en el lienzo',
      'Cada pincelada debe tener el valor y color correctos antes de tocar el lienzo',
      'El viridian en las sombras de la piel evita que se vean "sucias"'
    ]
  }
];

const PaletasMaestros: React.FC<PaletasMaestrosProps> = ({ onBack }) => {
  const [maestroActivo, setMaestroActivo] = useState(MAESTROS[0]);
  const [pigmentoSeleccionado, setPigmentoSeleccionado] = useState<typeof MAESTROS[0]['pigmentos'][0] | null>(null);
  const [copiadoIndex, setCopiadoIndex] = useState<number | null>(null);

  const copiarHex = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiadoIndex(index);
    setTimeout(() => setCopiadoIndex(null), 2000);
  };

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
            <h1 className="font-serif text-4xl md:text-6xl text-slate-900 mb-4">Paletas de los Maestros</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 via-gold-500 to-amber-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-stone-600 max-w-2xl mx-auto text-lg">
              Las paletas reales de los grandes pintores de la historia.
              Pigmentos históricos con sus equivalentes modernos exactos.
            </p>
          </div>
        </div>

        {/* Selector de Maestros */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {MAESTROS.map((maestro) => (
            <button
              key={maestro.id}
              onClick={() => { setMaestroActivo(maestro); setPigmentoSeleccionado(null); }}
              className={`px-4 py-3 text-sm transition-all rounded-xl flex flex-col items-center gap-1 min-w-[100px] ${
                maestroActivo.id === maestro.id
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20'
                  : 'bg-white text-slate-600 border border-stone-200 hover:border-slate-400 hover:shadow-md'
              }`}
            >
              <span className="font-medium">{maestro.nombre.split(' ').pop()}</span>
              <span className={`text-[10px] ${maestroActivo.id === maestro.id ? 'text-gold-400' : 'text-stone-400'}`}>
                {maestro.pigmentos.length} colores
              </span>
            </button>
          ))}
        </div>

        {/* Tarjeta del Maestro */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden mb-10">
          {/* Header oscuro */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8 md:p-12 relative overflow-hidden">
            {/* Patrón decorativo */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 right-10 w-64 h-64 border border-white rounded-full"></div>
              <div className="absolute top-20 right-20 w-48 h-48 border border-white rounded-full"></div>
            </div>

            <div className="relative">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-gold-400 text-sm tracking-widest uppercase">{maestroActivo.escuela}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400 text-sm">{maestroActivo.ubicacion}</span>
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl mb-2">{maestroActivo.nombre}</h2>
                  <p className="text-slate-400 text-lg">{maestroActivo.periodo}</p>
                </div>

                <div className="lg:text-right">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Obra maestra</p>
                  <p className="text-gold-400 font-serif text-xl italic">"{maestroActivo.obraMaestra}"</p>
                </div>
              </div>

              <div className="mt-8 flex items-start gap-4 border-l-2 border-gold-500 pl-6">
                <p className="text-slate-300 italic text-lg font-serif leading-relaxed">
                  {maestroActivo.cita}
                </p>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6 md:p-10">
            {/* Descripción y estilo */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div>
                <h3 className="flex items-center gap-2 text-sm text-stone-500 uppercase tracking-wide mb-3">
                  <BookOpen size={16} /> Sobre el maestro
                </h3>
                <p className="text-stone-700 leading-relaxed">{maestroActivo.descripcion}</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-gold-50 rounded-2xl p-6 border border-amber-100">
                <h3 className="flex items-center gap-2 text-sm text-gold-700 uppercase tracking-wide mb-3">
                  <Palette size={16} /> Técnica característica
                </h3>
                <p className="text-stone-700 leading-relaxed">{maestroActivo.estilo}</p>
              </div>
            </div>

            {/* Preview visual de la paleta */}
            <div className="mb-10">
              <h3 className="text-center text-sm text-stone-500 uppercase tracking-widest mb-4">Su paleta completa</h3>
              <div className="flex justify-center gap-2 flex-wrap">
                {maestroActivo.pigmentos.map((p, idx) => (
                  <button
                    key={idx}
                    className={`group relative transition-all duration-300 ${
                      pigmentoSeleccionado?.nombre === p.nombre ? 'scale-110 z-10' : 'hover:scale-105'
                    }`}
                    onClick={() => setPigmentoSeleccionado(pigmentoSeleccionado?.nombre === p.nombre ? null : p)}
                  >
                    <div
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-xl shadow-lg border-2 transition-all ${
                        pigmentoSeleccionado?.nombre === p.nombre
                          ? 'border-gold-500 shadow-gold-200'
                          : 'border-white hover:border-stone-300'
                      }`}
                      style={{ backgroundColor: p.hex }}
                    />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-stone-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {p.nombre.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Grid de pigmentos detallado */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {maestroActivo.pigmentos.map((pigmento, idx) => (
                <div
                  key={idx}
                  onClick={() => setPigmentoSeleccionado(pigmentoSeleccionado?.nombre === pigmento.nombre ? null : pigmento)}
                  className={`rounded-2xl border overflow-hidden transition-all cursor-pointer group ${
                    pigmentoSeleccionado?.nombre === pigmento.nombre
                      ? 'border-gold-400 shadow-xl ring-2 ring-gold-100'
                      : 'border-stone-200 hover:border-stone-300 hover:shadow-lg'
                  }`}
                >
                  <div className="flex">
                    {/* Muestra de color */}
                    <div
                      className="w-24 flex-shrink-0 relative"
                      style={{ backgroundColor: pigmento.hex }}
                    >
                      <button
                        onClick={(e) => { e.stopPropagation(); copiarHex(pigmento.hex, idx); }}
                        className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        title="Copiar HEX"
                      >
                        {copiadoIndex === idx ? (
                          <Check size={14} className="text-emerald-600" />
                        ) : (
                          <Copy size={14} className="text-slate-600" />
                        )}
                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex-1">
                      <p className="font-medium text-slate-900 mb-1">{pigmento.nombre}</p>
                      <p className="text-xs text-gold-600 font-medium mb-2">{pigmento.rol}</p>
                      <p className="text-xs text-stone-500 leading-relaxed">{pigmento.uso}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Consejos del maestro */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 text-white">
              <h3 className="flex items-center gap-2 text-gold-400 text-sm uppercase tracking-widest mb-6">
                <Sparkles size={16} /> Consejos del Atelier
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {maestroActivo.consejos.map((consejo, idx) => (
                  <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <span className="text-gold-400 text-2xl font-serif mr-2">{idx + 1}.</span>
                    <p className="text-slate-300 text-sm inline">{consejo}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Panel de Equivalentes Modernos */}
        {pigmentoSeleccionado && (
          <div className="bg-white rounded-3xl border-2 border-gold-200 shadow-xl p-6 md:p-10 mb-10 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
              <div
                className="w-24 h-24 rounded-2xl shadow-lg flex-shrink-0"
                style={{ backgroundColor: pigmentoSeleccionado.hex }}
              />
              <div className="flex-1">
                <h3 className="font-serif text-2xl text-slate-900 mb-1">{pigmentoSeleccionado.nombre}</h3>
                <p className="text-gold-600 font-medium mb-2">{pigmentoSeleccionado.rol}</p>
                <p className="text-stone-600">{pigmentoSeleccionado.uso}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Código HEX</p>
                <p className="font-mono text-lg text-slate-800">{pigmentoSeleccionado.hex}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <Info size={18} className="text-gold-600" />
              <p className="text-sm text-stone-600">
                Encuentra este pigmento histórico en las 3 marcas profesionales más reconocidas:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(pigmentoSeleccionado.equivalentes).map(([marca, nombre]) => (
                <div key={marca} className="bg-gradient-to-br from-stone-50 to-stone-100 rounded-xl p-5 border border-stone-200">
                  <p className="text-xs text-stone-400 uppercase tracking-wide mb-2">{marca}</p>
                  <p className="text-slate-900 font-medium">{nombre}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nota final */}
        <div className="bg-gradient-to-r from-amber-50 via-gold-50 to-amber-50 rounded-2xl p-8 text-center border border-amber-200">
          <p className="font-serif text-xl text-slate-800 italic mb-2">
            "Estudiar las paletas de los maestros no es copiarlos, es aprender sus decisiones."
          </p>
          <p className="text-gold-600 font-medium">— Myriam Alcaraz</p>
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

export default PaletasMaestros;
