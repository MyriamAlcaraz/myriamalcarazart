import React, { useState } from 'react';
import { ARTIST_INFO, ARTWORKS } from '../constants';
import { Eye, Lock, Layout, ArrowLeft, Award, Shield, Sparkles, ChevronDown, Check } from 'lucide-react';
import AtlasTransparencias from './AtlasTransparencias';
import PaletasMaestros from './PaletasMaestros';
import SolSorolla from './SolSorolla';

interface PublicSiteProps {
  onOpenCompanion: (id: string) => void;
  onOpenStudioLogin: () => void;
  onOpenGiclee: () => void;
  onTabChange?: (tab: 'portfolio' | 'bio' | 'prices' | 'giclee' | 'app') => void;
}

// Obras disponibles para Giclée con sus dimensiones originales
const GICLEE_OBRAS = [
  { id: 'abruma-belleza', titulo: 'Abruma y belleza', imagen: '/obras/OBRA_21.jpg', dimensionesOriginal: '100x73' },
  { id: 'joven-vela', titulo: 'Joven con vela en la bruma', imagen: '/obras/OBRA_22.jpg', dimensionesOriginal: '100x73' },
  { id: 'sara-retiro', titulo: 'Sara en Retiro', imagen: '/obras/OBRA_23.jpg', dimensionesOriginal: '100x80' },
  { id: 'sara-marquesina', titulo: 'Sara en Marquesina', imagen: '/obras/OBRA_04.jpg', dimensionesOriginal: '100x81' },
  { id: 'laura-crepusculo', titulo: 'Laura en el Crepúsculo', imagen: '/obras/OBRA_02.jpg', dimensionesOriginal: '100x81' },
  { id: 'sara-farola', titulo: 'Sara bajo la farola', imagen: '/obras/OBRA_03.jpg', dimensionesOriginal: '92x60' },
  { id: 'autorretrato', titulo: 'Autorretrato en siglo XIX', imagen: '/obras/OBRA_01.jpg', dimensionesOriginal: '100x81' },
  { id: 'ana-habana', titulo: 'Ana y la Habana', imagen: '/obras/OBRA_05.jpg', dimensionesOriginal: '100x81' },
  { id: 'viajera', titulo: 'Viajera', imagen: '/obras/OBRA_06.jpg', dimensionesOriginal: '81x100' },
  { id: 'memorias-mekong-i', titulo: 'Memorias de Mekong I', imagen: '/obras/OBRA_07.jpg', dimensionesOriginal: '100x65' },
  { id: 'memorias-mekong-ii', titulo: 'Memorias de Mekong II', imagen: '/obras/OBRA_08.jpg', dimensionesOriginal: '100x65' },
  { id: 'nino-capucha', titulo: 'El niño de la capucha', imagen: '/obras/OBRA_09.jpg', dimensionesOriginal: '92x65' },
  { id: 'joven-piscina', titulo: 'Joven en piscina', imagen: '/obras/OBRA_10.jpg', dimensionesOriginal: '73x100' },
  { id: 'pablo-cascada', titulo: 'Pablo en Cascada', imagen: '/obras/OBRA_11.jpg', dimensionesOriginal: '55x46' },
  { id: 'pablo-cascada-ii', titulo: 'Pablo en Cascada II', imagen: '/obras/OBRA_12.jpg', dimensionesOriginal: '80x65' },
  { id: 'ninos-playa-valenciana', titulo: 'Niños en playa valenciana', imagen: '/obras/OBRA_13.jpg', dimensionesOriginal: '80x60' },
  { id: 'buceando', titulo: 'Buceando', imagen: '/obras/OBRA_14.jpg', dimensionesOriginal: '100x65' },
  { id: 'ninos-capucha', titulo: 'Niños con capucha', imagen: '/obras/OBRA_15.jpg', dimensionesOriginal: '100x81' },
  { id: 'ninos-playa-rocosa', titulo: 'Niños en playa rocosa', imagen: '/obras/OBRA_16.jpg', dimensionesOriginal: '55x46' },
  { id: 'porteadores', titulo: 'Porteadores', imagen: '/obras/OBRA_18.jpg', dimensionesOriginal: '55x46' },
  { id: 'carpe-diem', titulo: 'Carpe Diem', imagen: '/obras/OBRA_19.jpg', dimensionesOriginal: '140x50' },
  { id: 'mas-que-amigos', titulo: 'Más que amigos', imagen: '/obras/OBRA_20.jpg', dimensionesOriginal: '100x60' },
];

// Configuración de tamaños Giclée - Precios fijos profesionales
const GICLEE_SIZES = {
  pequeno: { label: 'Pequeño', dimensions: '30x40', precio: 245, edicion: 10 },
  mediano: { label: 'Mediano', dimensions: '50x63', precio: 425, edicion: 10 },
  original: { label: 'Original', precio: 780, edicion: 10 }
};

const AccoladeList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
    {items.map((item, index) => (
      <li key={index} className="pl-1 leading-relaxed">{item}</li>
    ))}
  </ul>
);

const PublicSite: React.FC<PublicSiteProps> = ({ onOpenCompanion, onOpenStudioLogin, onOpenGiclee, onTabChange }) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'bio' | 'prices' | 'giclee' | 'app'>('portfolio');
  const [activeDigitalTool, setActiveDigitalTool] = useState<'none' | 'atlas' | 'maestros' | 'sorolla'>('none');

  // Estado para Giclée
  const [selectedObra, setSelectedObra] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleTabChange = (tab: 'portfolio' | 'bio' | 'prices' | 'giclee' | 'app') => {
    setActiveTab(tab);
    if (tab !== 'giclee') {
      onTabChange?.(tab);
    }
  };

  // Obtener obra seleccionada
  const obraActual = GICLEE_OBRAS.find(o => o.id === selectedObra);

  // Obtener precio según tamaño
  const calcularPrecio = (size: 'pequeno' | 'mediano' | 'original') => {
    return GICLEE_SIZES[size].precio;
  };

  // Calcular dimensiones proporcionales para tamaño original
  const getDimensionesOriginal = () => {
    if (!obraActual) return '—';
    return obraActual.dimensionesOriginal + ' cm';
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <img src="/logo-myriam.png" alt="Myriam Alcaraz Logo" className="h-12 w-auto md:h-16 object-contain" />
            <div className="hidden md:block border-l border-slate-300 pl-4">
              <h1 className="font-serif text-lg tracking-[0.2em] text-slate-900 uppercase">Myriam Alcaraz</h1>
              <p className="text-[10px] text-gold-600 tracking-[0.3em] uppercase">Artista Figurativa</p>
            </div>
          </div>
          {/* Main Tabs */}
          <div className="flex gap-1 md:gap-4 text-sm font-semibold">
            <button
              onClick={() => handleTabChange('portfolio')}
              className={`px-3 py-1 md:px-4 md:py-2 transition-colors ${activeTab === 'portfolio' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              PORTFOLIO
            </button>
            <button
              onClick={() => handleTabChange('bio')}
              className={`px-3 py-1 md:px-4 md:py-2 transition-colors ${activeTab === 'bio' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              TRAYECTORIA & BIO
            </button>
            <button
              onClick={() => handleTabChange('prices')}
              className={`px-3 py-1 md:px-4 md:py-2 transition-colors ${activeTab === 'prices' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              ENCARGOS & PRECIOS
            </button>
            <button
              onClick={() => handleTabChange('giclee')}
              className={`px-3 py-1 md:px-4 md:py-2 transition-colors ${activeTab === 'giclee' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              GICLÉE
            </button>
            <button
              onClick={() => handleTabChange('app')}
              className={`px-3 py-1 md:px-4 md:py-2 transition-colors ${activeTab === 'app' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              ESTUDIO DIGITAL
            </button>
            <a
              href="/alquimia/alquimia-ia.html"
              className="px-3 py-1 md:px-4 md:py-2 transition-colors text-slate-500 hover:text-slate-800"
            >
              ALQUIMIA IA
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* ========================================= */}
        {/* PORTFOLIO TAB */}
        {/* ========================================= */}
        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ARTWORKS.map(artwork => (
              <div key={artwork.id} className="group relative overflow-hidden bg-white shadow-lg border border-stone-100">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="font-serif text-lg font-semibold text-slate-800 truncate">{artwork.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{artwork.dimensions} | {artwork.technique}</p>
                </div>
                {/* Overlay for Detail View */}
                <button
                  onClick={() => onOpenCompanion(artwork.id)}
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Eye size={36} className="text-white" />
                  <span className="sr-only">Ver detalles de {artwork.title}</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ========================================= */}
        {/* BIO & TRAYECTORIA TAB */}
        {/* ========================================= */}
        {activeTab === 'bio' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Columna 1: Bio */}
            <div className="md:col-span-1">
              <h2 className="font-serif text-4xl font-bold text-slate-900 mb-6">Biografía</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">{ARTIST_INFO.bioShort}</p>
              <h3 className="text-xl font-semibold mb-3">Declaración del Artista</h3>
              <p className="text-slate-600 leading-relaxed mb-8 font-serif italic border-l-2 border-gold-500 pl-4">"{ARTIST_INFO.statement}"</p>

              {/* Contacto Rápido */}
              <div className="space-y-3">
                <a href={`mailto:${ARTIST_INFO.email}`} className="flex items-center gap-2 text-slate-600 hover:text-gold-600 transition-colors text-sm">
                  {ARTIST_INFO.email}
                </a>
                <a href={`https://www.instagram.com/${ARTIST_INFO.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-gold-600 transition-colors text-sm">
                  {ARTIST_INFO.instagram}
                </a>
              </div>
            </div>

            {/* Columna 2 & 3: Trayectoria */}
            <div className="md:col-span-2 space-y-10">

              {/* Contenedor del Título y la Foto para posicionarla en la esquina */}
              <div className="flex justify-between items-start relative">
                <h2 className="font-serif text-4xl font-bold text-slate-900">Trayectoria & Reconocimientos</h2>

                {/* FOTO DEL ARTISTA */}
                <div className="w-60 h-60 overflow-hidden rounded-lg shadow-lg border-2 border-stone-200 ml-4 group transition-all duration-300 hover:shadow-xl">
                  <img
                    src="/obras/ARTISTA.jpg"
                    alt="Retrato de la Artista Myriam Alcaraz"
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                  />
                </div>
              </div>

              {/* EXPOSICIONES */}
              <div>
                <h3 className="text-2xl font-serif font-semibold text-gold-600 mb-4">
                  Exposiciones Colectivas (Selección)
                </h3>
                <AccoladeList items={ARTIST_INFO.accolades.exposiciones} />
              </div>

              {/* CONCURSOS */}
              <div>
                <h3 className="text-2xl font-serif font-semibold text-gold-600 mb-4">
                  Concursos y Premios
                </h3>
                <AccoladeList items={ARTIST_INFO.accolades.concursos} />
              </div>

              {/* PUBLICACIONES */}
              <div>
                <h3 className="text-2xl font-serif font-semibold text-gold-600 mb-4">
                  Publicaciones Destacadas
                </h3>
                <AccoladeList items={ARTIST_INFO.publications} />
              </div>

            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* ENCARGOS Y PRECIOS TAB */}
        {/* ========================================= */}
        {activeTab === 'prices' && (
          <div className="space-y-12">

            {/* Introducción de Lujo */}
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-5xl font-bold text-slate-900 mb-4">El Arte de Coleccionar</h2>
              <p className="text-xl font-serif italic text-slate-600 border-b border-gold-500 pb-4">
                "Arte con alma y sofisticación para tu espacio."
              </p>
              <p className="text-slate-700 leading-relaxed mt-6">
                Llevar una pieza de arte a tu hogar o espacio de trabajo es una decisión íntima y transformadora.
                Para adaptarme a tu visión, proceso y presupuesto, ofrezco tres caminos exclusivos para que inicies o amplíes tu colección.
              </p>
            </div>

            {/* Opciones de Coleccionismo (Grid de 3 Columnas) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Opción 1: Obra Original Única */}
              <div className="bg-white p-6 shadow-xl border-t-4 border-gold-500 flex flex-col items-center text-center">
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">1. Obra Original Única</h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed flex-grow">
                  Explora mi galería de obras disponibles en el **PORTFOLIO**. Cada pieza que ves es una creación única, pintada al óleo sobre lienzo o tabla, lista para dar un toque de elegancia y profundidad a tu colección.
                </p>
                <button
                  onClick={() => handleTabChange('portfolio')}
                  className="mt-4 bg-slate-800 text-white px-6 py-2 rounded text-sm font-semibold hover:bg-gold-600 transition-colors"
                >
                  Explorar Portafolio
                </button>
              </div>

              {/* Opción 2: Reproducción de Lujo Giclée */}
              <div className="bg-white p-6 shadow-xl border-t-4 border-gold-500 flex flex-col items-center text-center">
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">2. Reproducción Lujo Giclée</h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  ¿Buscas una opción más accesible o un formato específico? Ofrezco copias de museo Giclée (impresión de altísima fidelidad). Cada reproducción incluye un **Certificado de Autenticidad** original, numerado y firmado.
                </p>
                <button
                  onClick={() => handleTabChange('giclee')}
                  className="mt-4 bg-gold-500 text-white px-6 py-2 rounded text-sm font-semibold hover:bg-gold-600 transition-colors flex items-center gap-2"
                >
                  <Layout size={16} /> Ver Catálogo Giclée
                </button>
              </div>

              {/* Opción 3: Encargo Personalizado */}
              <div className="bg-white p-6 shadow-xl border-t-4 border-gold-500 flex flex-col items-center text-center">
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">3. Encargo Personalizado</h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed flex-grow">
                  Partimos de tus fotografías o ideas más queridas para crear una obra única, **pintada desde cero**. El precio se determina antes de comenzar, tras una consulta personal sobre el formato y la complejidad.
                </p>
                <a
                  href={`mailto:${ARTIST_INFO.email}?subject=Consulta sobre encargo personalizado&body=Estimada Myriam,%0A%0AMe gustaría explorar la posibilidad de encargar una obra personalizada.%0A%0ATengo en mente:%0A• Tema o referencia: [Describe brevemente tu idea o adjunta foto]%0A• Tamaño aproximado: [Ej: 80x60 cm]%0A• Espacio donde irá: [Salón, despacho, regalo...]%0A%0AMe encantaría conocer tu visión artística y recibir un presupuesto orientativo.%0A%0AQuedo a la espera de tu respuesta.%0A%0AUn cordial saludo.`}
                  className="mt-4 bg-slate-800 text-white px-6 py-2 rounded text-sm font-semibold hover:bg-gold-600 transition-colors"
                >
                  Solicitar Consulta
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* GICLÉE TAB */}
        {/* ========================================= */}
        {activeTab === 'giclee' && (
          <div className="max-w-5xl mx-auto">

            {/* Header elegante */}
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.4em] text-gold-500 uppercase mb-4 flex items-center justify-center gap-2">
                <Sparkles size={14} />
                Edición Limitada
                <Sparkles size={14} />
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-slate-900 mb-4">
                Reproducciones Giclée
              </h1>
              <div className="w-24 h-px bg-gold-500 mx-auto mb-6"></div>
              <p className="text-stone-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Impresiones de museo sobre papel <span className="font-semibold text-slate-800">Hahnemühle William Turner 310g</span>,
                100% algodón. Cada pieza incluye certificación oficial con holograma único.
              </p>
            </div>

            {/* Badges de garantía */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-stone-100">
                <Shield size={16} className="text-gold-600" />
                <span className="text-xs text-slate-700 font-medium">Certificado Oficial con Holograma</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-stone-100">
                <Award size={16} className="text-gold-600" />
                <span className="text-xs text-slate-700 font-medium">Numerado y Autenticado</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-stone-100">
                <Sparkles size={16} className="text-gold-600" />
                <span className="text-xs text-slate-700 font-medium">Edición Limitada: 10 unidades</span>
              </div>
            </div>

            {/* Selector de Obra */}
            <div className="mb-12">
              <label className="block text-sm font-semibold text-slate-700 mb-3 text-center">
                Selecciona una obra
              </label>
              <div className="relative max-w-md mx-auto">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-white border-2 border-stone-200 rounded-lg px-4 py-4 flex items-center justify-between hover:border-gold-400 transition-colors shadow-sm"
                >
                  {selectedObra ? (
                    <div className="flex items-center gap-4">
                      <img
                        src={obraActual?.imagen}
                        alt={obraActual?.titulo}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="text-left">
                        <p className="font-serif text-slate-800">{obraActual?.titulo}</p>
                        <p className="text-xs text-stone-500">Original: {obraActual?.dimensionesOriginal} cm</p>
                      </div>
                    </div>
                  ) : (
                    <span className="text-stone-400">Elige una obra del catálogo...</span>
                  )}
                  <ChevronDown
                    size={20}
                    className={`text-stone-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown con obras */}
                {isDropdownOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-stone-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
                    {GICLEE_OBRAS.map((obra) => (
                      <button
                        key={obra.id}
                        onClick={() => {
                          setSelectedObra(obra.id);
                          setIsDropdownOpen(false);
                          setSelectedSize(null);
                        }}
                        className={`w-full px-4 py-3 flex items-center gap-4 hover:bg-gold-50 transition-colors border-b border-stone-100 last:border-b-0 ${
                          selectedObra === obra.id ? 'bg-gold-50' : ''
                        }`}
                      >
                        <img
                          src={obra.imagen}
                          alt={obra.titulo}
                          className="w-14 h-14 object-cover rounded shadow-sm"
                        />
                        <div className="text-left flex-grow">
                          <p className="font-serif text-slate-800 text-sm">{obra.titulo}</p>
                          <p className="text-xs text-stone-500">Original: {obra.dimensionesOriginal} cm</p>
                        </div>
                        {selectedObra === obra.id && (
                          <Check size={18} className="text-gold-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tarjetas de Tamaños - Solo visibles cuando hay obra seleccionada */}
            {selectedObra && (
              <div className="animate-fade-in">
                <h2 className="text-center font-serif text-2xl text-slate-800 mb-8">
                  Elige tu formato
                </h2>

                <div className="grid md:grid-cols-3 gap-6 mb-12">

                  {/* Tamaño Pequeño */}
                  <div
                    onClick={() => setSelectedSize('pequeno')}
                    className={`bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      selectedSize === 'pequeno'
                        ? 'ring-2 ring-gold-500 shadow-xl'
                        : 'shadow-lg border border-stone-100'
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={obraActual?.imagen}
                        alt={obraActual?.titulo}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs font-semibold text-slate-700">30 × 40 cm</span>
                      </div>
                      {selectedSize === 'pequeno' && (
                        <div className="absolute top-3 left-3 bg-gold-500 p-1.5 rounded-full">
                          <Check size={14} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="font-serif text-xl text-slate-800 mb-1">Pequeño</h3>
                      <p className="text-xs text-stone-500 mb-4">Formato íntimo</p>
                      <div className="border-t border-stone-100 pt-4">
                        <p className="text-3xl font-serif text-slate-900">{calcularPrecio('pequeno')} €</p>
                        <p className="text-xs text-stone-400 mt-1">Ed. limitada 1/{GICLEE_SIZES.pequeno.edicion}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tamaño Mediano - Destacado */}
                  <div
                    onClick={() => setSelectedSize('mediano')}
                    className={`bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative ${
                      selectedSize === 'mediano'
                        ? 'ring-2 ring-gold-500 shadow-xl'
                        : 'shadow-lg border-2 border-gold-200'
                    }`}
                  >
                    <div className="absolute -top-0 left-1/2 -translate-x-1/2 bg-gold-500 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1 rounded-b-lg z-10">
                      Recomendado
                    </div>
                    <div className="relative">
                      <img
                        src={obraActual?.imagen}
                        alt={obraActual?.titulo}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs font-semibold text-slate-700">50 × 63 cm</span>
                      </div>
                      {selectedSize === 'mediano' && (
                        <div className="absolute top-3 left-3 bg-gold-500 p-1.5 rounded-full">
                          <Check size={14} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 text-center bg-gradient-to-b from-white to-gold-50/30">
                      <h3 className="font-serif text-xl text-slate-800 mb-1">Mediano</h3>
                      <p className="text-xs text-stone-500 mb-4">Presencia elegante</p>
                      <div className="border-t border-gold-200 pt-4">
                        <p className="text-3xl font-serif text-slate-900">{calcularPrecio('mediano')} €</p>
                        <p className="text-xs text-stone-400 mt-1">Ed. limitada 1/{GICLEE_SIZES.mediano.edicion}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tamaño Original */}
                  <div
                    onClick={() => setSelectedSize('original')}
                    className={`bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      selectedSize === 'original'
                        ? 'ring-2 ring-gold-500 shadow-xl'
                        : 'shadow-lg border border-stone-100'
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={obraActual?.imagen}
                        alt={obraActual?.titulo}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs font-semibold text-white">{getDimensionesOriginal()}</span>
                      </div>
                      {selectedSize === 'original' && (
                        <div className="absolute top-3 left-3 bg-gold-500 p-1.5 rounded-full">
                          <Check size={14} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="font-serif text-xl text-slate-800 mb-1">Tamaño Original</h3>
                      <p className="text-xs text-stone-500 mb-4">Escala museo</p>
                      <div className="border-t border-stone-100 pt-4">
                        <p className="text-3xl font-serif text-slate-900">{calcularPrecio('original')} €</p>
                        <p className="text-xs text-stone-400 mt-1">Ed. limitada 1/{GICLEE_SIZES.original.edicion}</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Botón de solicitud */}
                {selectedSize && (
                  <div className="text-center animate-fade-in">
                    <a
                      href={`mailto:${ARTIST_INFO.email}?subject=Solicitud Giclée: ${obraActual?.titulo} - Tamaño ${GICLEE_SIZES[selectedSize as keyof typeof GICLEE_SIZES].label}&body=Hola Myriam,%0A%0AMe gustaría solicitar información sobre la reproducción Giclée:%0A%0A• Obra: ${obraActual?.titulo}%0A• Tamaño: ${selectedSize === 'original' ? getDimensionesOriginal() : GICLEE_SIZES[selectedSize as keyof typeof GICLEE_SIZES].dimensions + ' cm'}%0A• Precio: ${calcularPrecio(selectedSize as 'pequeno' | 'mediano' | 'original')} €%0A%0AGracias.`}
                      className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-lg font-semibold hover:bg-gold-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Award size={20} />
                      Solicitar esta Giclée
                    </a>
                    <p className="text-xs text-stone-400 mt-4">
                      Recibirás respuesta en 24-48 horas con los detalles de envío
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Certificados de Autenticidad */}
            <div className="mt-16 border-t border-stone-200 pt-12">
              <h3 className="text-center font-serif text-2xl text-slate-800 mb-10">Certificación de Autenticidad</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-stone-100 rounded-lg p-6 flex items-start gap-4">
                  <Shield size={22} className="text-gold-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif text-lg text-slate-800 mb-3">Certificado Hahnemühle</h4>
                    <ul className="space-y-1.5 text-sm text-stone-500">
                      <li>Papel William Turner 310g · 100% algodón</li>
                      <li>Holograma de seguridad con número de serie inviolable</li>
                      <li>Registro permanente en MyArtRegistry</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-white border border-stone-100 rounded-lg p-6 flex items-start gap-4">
                  <Award size={22} className="text-gold-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif text-lg text-slate-800 mb-3">Certificado de Artista</h4>
                    <ul className="space-y-1.5 text-sm text-stone-500">
                      <li>Sello Seco en relieve sobre el reverso</li>
                      <li>Firma autógrafa de Myriam Alcaraz</li>
                      <li>Numeración individual de la serie</li>
                    </ul>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-stone-400">
                La obra se entrega en tubo rígido de alta protección, garantizando su llegada en perfectas condiciones.
              </p>
            </div>

            {/* Nota sobre Hahnemühle */}
            <div className="mt-12 text-center">
              <p className="text-xs text-stone-400 tracking-wide mb-2">Papel certificado</p>
              <p className="font-serif text-lg text-slate-700 italic">
                "Hahnemühle William Turner 310g · 100% Algodón · Libre de Ácido"
              </p>
              <p className="text-xs text-stone-400 mt-2">
                Durabilidad de museo · Resistencia a la luz superior a 100 años
              </p>
            </div>

          </div>
        )}

        {/* ========================================= */}
        {/* ESTUDIO DIGITAL TAB */}
        {/* ========================================= */}
        {activeTab === 'app' && activeDigitalTool === 'atlas' && (
          <AtlasTransparencias onBack={() => setActiveDigitalTool('none')} />
        )}

        {activeTab === 'app' && activeDigitalTool === 'maestros' && (
          <PaletasMaestros onBack={() => setActiveDigitalTool('none')} />
        )}

        {activeTab === 'app' && activeDigitalTool === 'sorolla' && (
          <SolSorolla onBack={() => setActiveDigitalTool('none')} />
        )}

        {activeTab === 'app' && activeDigitalTool === 'none' && (
          <div className="max-w-5xl mx-auto py-8">

            {/* Header minimalista */}
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.4em] text-stone-400 uppercase mb-6">Investigación & Tecnología</p>
              <h1 className="font-serif text-4xl md:text-5xl text-slate-900 mb-4">
                Estudio Digital
              </h1>
              <div className="w-16 h-px bg-gold-500 mx-auto mb-8"></div>
              <p className="text-stone-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Herramientas digitales para la exploración técnica del color y los pigmentos históricos.
              </p>
            </div>

            {/* Grid de 4 herramientas */}
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">

              {/* ============================================ */}
              {/* HERRAMIENTA 1: ATLAS DE TRANSPARENCIAS (GRATIS) */}
              {/* ============================================ */}
              <div className="bg-white border border-stone-200 rounded-lg overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 text-center border-b border-stone-100">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-inner flex items-center justify-center">
                    <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <span className="text-[10px] tracking-[0.3em] text-amber-700 uppercase font-medium">Acceso Libre</span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-slate-900 mb-2 text-center">Atlas de Transparencias</h3>
                  <p className="text-sm text-stone-500 text-center mb-4 leading-relaxed">
                    Visualización del comportamiento lumínico de cada pigmento. Opacidad, veladura y poder cubriente en Old Holland, Williamsburg y W&N.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-1 rounded">Transparente</span>
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-1 rounded">Semiopaco</span>
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-1 rounded">Opaco</span>
                  </div>
                  <button
                    onClick={() => setActiveDigitalTool('atlas')}
                    className="w-full py-2 text-sm text-amber-700 border border-amber-200 rounded hover:bg-amber-50 transition-colors"
                  >
                    Explorar Atlas
                  </button>
                </div>
              </div>

              {/* ============================================ */}
              {/* HERRAMIENTA 2: PALETAS DE LOS MAESTROS (GRATIS) */}
              {/* ============================================ */}
              <div className="bg-white border border-stone-200 rounded-lg overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-stone-100 to-stone-50 p-6 text-center border-b border-stone-100">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-inner flex items-center justify-center">
                    <svg className="w-8 h-8 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className="text-[10px] tracking-[0.3em] text-stone-600 uppercase font-medium">Acceso Libre</span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-slate-900 mb-2 text-center">Paletas de los Maestros</h3>
                  <p className="text-sm text-stone-500 text-center mb-4 leading-relaxed">
                    Las paletas reales de Velázquez, Rembrandt, Sorolla y Zorn. Pigmentos históricos con sus equivalentes modernos.
                  </p>
                  <div className="flex justify-center gap-1 mb-4">
                    <div className="w-6 h-6 rounded-full bg-amber-900 border border-white shadow-sm" title="Tierra Sombra"></div>
                    <div className="w-6 h-6 rounded-full bg-yellow-600 border border-white shadow-sm" title="Ocre Amarillo"></div>
                    <div className="w-6 h-6 rounded-full bg-red-800 border border-white shadow-sm" title="Rojo Venecia"></div>
                    <div className="w-6 h-6 rounded-full bg-slate-900 border border-white shadow-sm" title="Negro Marfil"></div>
                    <div className="w-6 h-6 rounded-full bg-stone-100 border border-stone-300 shadow-sm" title="Blanco Plomo"></div>
                  </div>
                  <button
                    onClick={() => setActiveDigitalTool('maestros')}
                    className="w-full py-2 text-sm text-stone-600 border border-stone-200 rounded hover:bg-stone-50 transition-colors"
                  >
                    Ver Paletas
                  </button>
                </div>
              </div>

              {/* ============================================ */}
              {/* HERRAMIENTA 3: EL SOL DE SOROLLA (GRATIS) */}
              {/* ============================================ */}
              <div className="bg-white border border-stone-200 rounded-lg overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 text-center border-b border-stone-100">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-inner flex items-center justify-center">
                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <span className="text-[10px] tracking-[0.3em] text-yellow-700 uppercase font-medium">Acceso Libre</span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-slate-900 mb-2 text-center">El Sol de Sorolla</h3>
                  <p className="text-xs text-stone-400 text-center mb-2 italic">La Luz de la Malvarrosa</p>
                  <p className="text-sm text-stone-500 text-center mb-4 leading-relaxed">
                    Simula la luz natural de diferentes horas del día sobre tus obras. Estudio de volumen, sombras y recomendaciones de pigmentos según la hora.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-1 rounded">Amanecer</span>
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-1 rounded">Mediodía</span>
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-1 rounded">Atardecer</span>
                  </div>
                  <button
                    onClick={() => setActiveDigitalTool('sorolla')}
                    className="w-full py-2 text-sm text-yellow-700 border border-yellow-200 rounded hover:bg-yellow-50 transition-colors"
                  >
                    Explorar Luz
                  </button>
                </div>
              </div>

              {/* ============================================ */}
              {/* HERRAMIENTA 4: ANALIZADOR TÉCNICO (DE PAGO) */}
              {/* ============================================ */}
              <div className="bg-white border-2 border-gold-500 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-slate-900 p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-500 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="text-[10px] tracking-[0.3em] text-gold-400 uppercase font-medium">Herramienta Pro</span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-slate-900 mb-2 text-center">Analizador Técnico</h3>
                  <p className="text-sm text-stone-500 text-center mb-4 leading-relaxed">
                    Sistema de análisis cromático con IA. Identifica pigmentos exactos de cualquier imagen en las 3 marcas profesionales.
                  </p>
                  <div className="text-center mb-4">
                    <span className="text-2xl font-serif text-slate-900">46,99 €</span>
                    <p className="text-xs text-stone-400 mt-1">Acceso único</p>
                  </div>
                  <a
                    href="https://payhip.com/ARTEFIGURATIVO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 text-sm text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors text-center"
                  >
                    Obtener Acceso
                  </a>
                </div>
              </div>

              {/* ============================================ */}
              {/* HERRAMIENTA 5: ATELIER PRO (DE PAGO) */}
              {/* ============================================ */}
              <div className="bg-white border-2 border-gold-500 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-slate-900 p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-500 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <span className="text-[10px] tracking-[0.3em] text-gold-400 uppercase font-medium">Herramienta Pro</span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-slate-900 mb-2 text-center">Atelier Pro</h3>
                  <p className="text-sm text-stone-500 text-center mb-4 leading-relaxed">
                    Estudio de Valores (Carboncillo) y Color (Óleo). Compatible con Windows, Mac Silicon y Mac Intel.
                  </p>
                  <div className="text-center mb-4">
                    <span className="text-2xl font-serif text-slate-900">9,00 €</span>
                    <p className="text-xs text-stone-400 mt-1">Acceso único</p>
                  </div>
                  <a
                    href="https://payhip.com/ARTEFIGURATIVO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 text-sm text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors text-center"
                  >
                    Comprar
                  </a>
                </div>
              </div>

            </div>

            {/* Firma */}
            <div className="text-center border-t border-stone-100 pt-8">
              <p className="text-stone-400 text-sm italic">
                Desarrollado por Myriam Alcaraz · Artista y Creadora Digital
              </p>
            </div>

          </div>
        )}

        {/* Cierre - CTA Final (Solo para Portfolio y Bio) */}
        {activeTab !== 'prices' && activeTab !== 'app' && activeTab !== 'giclee' && (
          <div className="mt-16 bg-slate-800 p-12 text-center">
            <div className="max-w-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h3 className="font-serif text-2xl text-white mb-2 italic">Commissions & Encargos</h3>
                <p className="text-sm font-light leading-relaxed opacity-80 text-slate-200">
                  Realizo proyectos personalizados para coleccionistas privados.
                  Toda obra es entregada con su Certificado de Autenticidad.
                </p>
              </div>
              <a
                href={`mailto:${ARTIST_INFO.email}?subject=Interés en adquirir obra o encargo&body=Estimada Myriam,%0A%0AHe visitado tu portfolio y me ha impresionado tu trabajo.%0A%0AMe gustaría recibir más información sobre:%0A[ ] Una obra específica del portfolio%0A[ ] Posibilidad de encargo personalizado%0A[ ] Reproducciones Giclée%0A%0AComéntame las opciones disponibles.%0A%0AGracias por tu tiempo.%0A%0AUn cordial saludo.`}
                className="bg-gold-500 text-white px-8 py-3 hover:bg-gold-600 transition-colors uppercase tracking-widest text-xs font-bold whitespace-nowrap"
              >
                Solicitar Propuesta
              </a>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white text-slate-500 py-16 text-center border-t border-slate-100 relative">
        <div className="max-w-4xl mx-auto px-6">
          <img src="/logo-myriam.png" alt="Logo Footer" className="h-12 w-auto mx-auto mb-6 opacity-50 grayscale" />

          <p className="text-[10px] opacity-40 uppercase tracking-wide">© 2025 Myriam Alcaraz. Todos los derechos reservados.</p>
        </div>

        {/* 🔒 ACCESO SECRETO AL ESTUDIO - Candadito invisible en esquina inferior derecha */}
        <button
          onClick={onOpenStudioLogin}
          className="absolute bottom-0 left-0 p-5 opacity-0 hover:opacity-20 active:opacity-30 transition-opacity duration-300 bg-transparent border-none outline-none"
          style={{ background: 'none', boxShadow: 'none' }}
          title=""
          aria-hidden="true"
        >
          <Lock size={14} className="text-slate-300" />
        </button>
      </footer>
    </div>
  );
};

export default PublicSite;
