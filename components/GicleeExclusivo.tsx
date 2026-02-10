import React, { useState, useMemo } from 'react';
import { ArrowLeft, Check, Shield, Award, Crown, ChevronDown } from 'lucide-react';

interface GicleeExclusivoProps {
  onBack: () => void;
}

// Base de datos de obras disponibles para Giclée
// Las medidas son del PAPEL Giclée (100% = tamaño máximo disponible)
const OBRAS_GICLEE = [
  {
    id: 'joven-vela',
    titulo: 'Joven con vela',
    referencia: 'MA-2025-JV1',
    holograma: '287213',
    // Papel: 30x40 cm (vertical)
    papelWidth: 30,
    papelHeight: 40,
    imagen: '/obras/OBRA_01.jpg'
  },
  {
    id: 'sara-marquesina',
    titulo: 'Sara en marquesina',
    referencia: 'MA-2025-SA-M1',
    holograma: '287214',
    // Papel: 50x61,5 cm
    papelWidth: 62,
    papelHeight: 50,
    imagen: '/obras/OBRA_02.jpg'
  },
  {
    id: 'laura-crepusculo',
    titulo: 'Laura en el crepúsculo',
    referencia: 'MA-2025-LA1',
    holograma: '287215',
    // Papel: 50x61,5 cm
    papelWidth: 62,
    papelHeight: 50,
    imagen: '/obras/OBRA_03.jpg'
  },
  {
    id: 'sara-farola',
    titulo: 'Sara bajo la farola',
    referencia: 'MA-2025-SA1',
    holograma: '287216',
    // Papel: 60x93,3 cm → 92x60 redondeado
    papelWidth: 92,
    papelHeight: 60,
    imagen: '/obras/OBRA_04.jpg'
  }
];

const GicleeExclusivo: React.FC<GicleeExclusivoProps> = ({ onBack }) => {
  const [selectedObra, setSelectedObra] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Obtener obra seleccionada
  const obra = useMemo(() =>
    OBRAS_GICLEE.find(o => o.id === selectedObra),
    [selectedObra]
  );

  // Calcular medidas según el tamaño seleccionado (basado en el tamaño del papel)
  const calcularMedidas = (porcentaje: number) => {
    if (!obra) return { width: 0, height: 0 };
    const width = Math.round(obra.papelWidth * porcentaje);
    const height = Math.round(obra.papelHeight * porcentaje);
    return { width, height };
  };

  // Definir los 3 tamaños
  const tamaños = [
    { id: 'pequeño', nombre: 'Pequeño', porcentaje: 0.5, label: '50% del original' },
    { id: 'mediano', nombre: 'Mediano', porcentaje: 0.75, label: '75% del original' },
    { id: 'grande', nombre: 'Grande', porcentaje: 1, label: 'Tamaño Original' }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-16 text-center relative">
          <button
            onClick={onBack}
            className="absolute left-0 top-2 flex items-center gap-2 text-stone-500 hover:text-gold-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm tracking-widest uppercase hidden md:inline">Volver</span>
          </button>

          <div className="flex justify-center mb-8">
            <Crown className="text-gold-500" size={40} />
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4 tracking-wide">
            Giclée Exclusivo
          </h1>

          <div className="w-24 h-px bg-gold-500 mx-auto mb-6"></div>

          <p className="text-stone-500 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Reproducciones de alta fidelidad sobre papel Hahnemühle
          </p>
        </div>

        {/* Selector de Obra */}
        <section className="mb-12">
          <h2 className="text-xl font-serif text-slate-800 mb-4">Selecciona la obra</h2>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-white border border-stone-200 rounded-lg p-4 flex items-center justify-between hover:border-gold-500 transition-colors"
            >
              <span className={obra ? 'text-slate-900' : 'text-stone-400'}>
                {obra ? obra.titulo : 'Elige una obra...'}
              </span>
              <ChevronDown
                size={20}
                className={`text-stone-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-stone-200 rounded-lg shadow-xl overflow-hidden">
                {OBRAS_GICLEE.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => {
                      setSelectedObra(o.id);
                      setIsDropdownOpen(false);
                      setSelectedSize(null);
                    }}
                    className={`w-full p-4 text-left hover:bg-stone-50 transition-colors border-b border-stone-100 last:border-0 ${
                      selectedObra === o.id ? 'bg-gold-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 bg-stone-100 rounded overflow-hidden">
                        <img src={o.imagen} alt={o.titulo} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{o.titulo}</p>
                        <p className="text-sm text-stone-500">Máx: {o.papelWidth}×{o.papelHeight} cm</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Selector de Tamaño - Solo visible si hay obra seleccionada */}
        {obra && (
          <section className="mb-12 animate-fade-in">
            <h2 className="text-xl font-serif text-slate-800 mb-4">Elige el tamaño</h2>

            <div className="grid grid-cols-3 gap-4">
              {tamaños.map((t) => {
                const medidas = calcularMedidas(t.porcentaje);
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedSize(t.id)}
                    className={`relative p-6 rounded-lg border-2 transition-all text-center ${
                      selectedSize === t.id
                        ? 'border-gold-500 bg-gold-50 shadow-lg'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    {selectedSize === t.id && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    )}

                    <p className="font-serif text-lg text-slate-900 mb-1">{t.nombre}</p>
                    <p className="text-xs text-stone-400 mb-3">{t.label}</p>

                    <div className="bg-stone-100 rounded px-3 py-2">
                      <p className="text-lg font-semibold text-slate-800">
                        {medidas.width} × {medidas.height} cm
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Resumen y Acción */}
        {obra && selectedSize && (
          <section className="mb-12 animate-fade-in">
            <div className="bg-white border border-stone-200 rounded-lg p-8">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-20 bg-stone-100 rounded overflow-hidden flex-shrink-0">
                  <img src={obra.imagen} alt={obra.titulo} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-slate-900 mb-1">{obra.titulo}</h3>
                  <p className="text-stone-500 text-sm mb-2">Ref: {obra.referencia}</p>
                  <p className="text-gold-600 font-medium">
                    {tamaños.find(t => t.id === selectedSize)?.nombre} — {' '}
                    {calcularMedidas(tamaños.find(t => t.id === selectedSize)?.porcentaje || 1).width} × {' '}
                    {calcularMedidas(tamaños.find(t => t.id === selectedSize)?.porcentaje || 1).height} cm
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  const tamañoSeleccionado = tamaños.find(t => t.id === selectedSize);
                  const medidas = calcularMedidas(tamañoSeleccionado?.porcentaje || 1);
                  const subject = encodeURIComponent(`Solicitud Giclée: ${obra.titulo}`);
                  const body = encodeURIComponent(
`Estimada Myriam Alcaraz,

Deseo solicitar información para adquirir una reproducción Giclée de su obra.

DETALLES DE LA SELECCIÓN:
• Obra: ${obra.titulo}
• Referencia: ${obra.referencia}
• Tamaño: ${tamañoSeleccionado?.nombre} (${tamañoSeleccionado?.label})
• Dimensiones: ${medidas.width} × ${medidas.height} cm
• Papel: Hahnemühle William Turner 310g
• Certificación: Hahnemühle + Artista

Quedo a la espera de sus indicaciones.

Atentamente,
[Nombre]
[Teléfono]`
                  );
                  window.location.href = `mailto:myriamhotmail@hotmail.com?subject=${subject}&body=${body}`;
                }}
                className="w-full bg-slate-900 text-white py-4 rounded-lg font-medium hover:bg-slate-800 transition-colors tracking-wide"
              >
                SOLICITAR INFORMACIÓN
              </button>
            </div>
          </section>
        )}

        {/* Garantías */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-6 bg-white rounded-lg border border-stone-100">
              <Shield className="text-gold-500 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-medium text-slate-900 mb-1">Certificado Hahnemühle</h3>
                <p className="text-sm text-stone-500">Holograma de autenticidad y número de serie único</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white rounded-lg border border-stone-100">
              <Award className="text-gold-500 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-medium text-slate-900 mb-1">Certificado de Artista</h3>
                <p className="text-sm text-stone-500">Sello seco y firma autógrafa de Myriam Alcaraz</p>
              </div>
            </div>
          </div>
        </section>

        {/* Edición Limitada */}
        <section className="text-center py-8 border-t border-stone-200">
          <p className="text-stone-600 font-serif italic">
            Edición limitada de 50 ejemplares, numerados y firmados
          </p>
          <p className="text-stone-400 text-sm mt-2">
            Con certificado de autenticidad Hahnemühle
          </p>
        </section>

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

export default GicleeExclusivo;
