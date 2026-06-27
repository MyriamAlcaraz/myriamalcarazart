import React, { useState, useEffect } from 'react';
import { ARTIST_INFO, ARTWORKS } from '../constants';
import { Eye, Lock, Layout, ArrowLeft, Award, Shield, Sparkles, ChevronDown, Check, Mail, Instagram, Globe } from 'lucide-react';
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

// Configuración de tamaños Giclée
const GICLEE_SIZES = {
  pequeno: { label: 'Pequeño', dimensions: '30x40', edicion: 10 },
  mediano: { label: 'Mediano', dimensions: '50x63', edicion: 10 },
  original: { label: 'Original', edicion: 10 }
};

const AccoladeList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
    {items.map((item, index) => (
      <li key={index} className="pl-1 leading-relaxed">{item}</li>
    ))}
  </ul>
);

const PublicSite: React.FC<PublicSiteProps> = ({ onOpenCompanion, onOpenStudioLogin, onOpenGiclee, onTabChange }) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'bio' | 'prices' | 'contact' | 'giclee' | 'app'>('portfolio');
  const [activeDigitalTool, setActiveDigitalTool] = useState<'none' | 'atlas' | 'maestros' | 'sorolla'>('none');

  // Estado para Giclée
  const [selectedObra, setSelectedObra] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleTabChange = (tab: 'portfolio' | 'bio' | 'prices' | 'contact' | 'giclee' | 'app') => {
    setActiveTab(tab);
    if (tab !== 'giclee') {
      onTabChange?.(tab as any);
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Observer que añade .is-visible a los .reveal cuando entran en pantalla
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [activeTab]);

  // Obtener obra seleccionada
  const obraActual = GICLEE_OBRAS.find(o => o.id === selectedObra);

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
            <div className="relative">
              <img src="/logo-myriam.png" alt="Myriam Alcaraz Logo" className="h-12 w-auto md:h-16 object-contain" />
              {/* 🔒 ACCESO SECRETO — invisible sobre el logo */}
              <button
                onClick={onOpenStudioLogin}
                className="absolute inset-0 z-[100000] opacity-0 cursor-default bg-transparent border-none outline-none"
                style={{ boxShadow: 'none' }}
                title=""
                aria-hidden="true"
              />
            </div>
            <div className="hidden md:block border-l border-slate-300 pl-4">
              <h1 className="font-serif text-lg tracking-[0.2em] text-slate-900 uppercase">Myriam Alcaraz</h1>
              <p className="text-[10px] text-gold-600 tracking-[0.3em] uppercase">Artista Figurativa</p>
            </div>
          </div>
          {/* Main Tabs — jerarquía limpia: solo obra original al frente */}
          <div className="flex gap-2 md:gap-6 text-xs md:text-sm tracking-[0.18em]">
            <button
              onClick={() => handleTabChange('portfolio')}
              className={`px-2 py-1 md:px-3 md:py-2 transition-colors ${activeTab === 'portfolio' ? 'text-gold-600 border-b border-gold-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              OBRA
            </button>
            <button
              onClick={() => handleTabChange('bio')}
              className={`px-2 py-1 md:px-3 md:py-2 transition-colors ${activeTab === 'bio' ? 'text-gold-600 border-b border-gold-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              TRAYECTORIA
            </button>
            <button
              onClick={() => handleTabChange('prices')}
              className={`px-2 py-1 md:px-3 md:py-2 transition-colors ${activeTab === 'prices' ? 'text-gold-600 border-b border-gold-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              ENCARGOS
            </button>
            <button
              onClick={() => handleTabChange('contact')}
              className={`px-2 py-1 md:px-3 md:py-2 transition-colors ${activeTab === 'contact' ? 'text-gold-600 border-b border-gold-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              CONTACTO
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* ========================================= */}
        {/* PORTFOLIO TAB — Hero editorial + grid de obras */}
        {/* ========================================= */}
        {activeTab === 'portfolio' && (
          <>
            {/* HERO editorial */}
            <section className="reveal grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center mb-20 md:mb-28">
              <div className="md:col-span-7 order-2 md:order-1">
                <p className="text-[10px] tracking-[0.35em] text-gold-600 mb-6">ARTISTA FIGURATIVA</p>
                <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] text-slate-900 mb-8">
                  La figura humana<br/>
                  desde una mirada<br/>
                  <em className="text-gold-600 not-italic font-serif italic">íntima</em> y contemporánea.
                </h2>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mb-10 font-serif italic">
                  "{ARTIST_INFO.statement}"
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      document.getElementById('obra-disponible')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-3 px-6 py-3 border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-stone-50 transition-all text-xs tracking-[0.25em]"
                  >
                    VER OBRA DISPONIBLE
                  </button>
                  <button
                    onClick={() => handleTabChange('prices')}
                    className="inline-flex items-center gap-3 px-6 py-3 text-slate-600 hover:text-gold-600 transition-colors text-xs tracking-[0.25em]"
                  >
                    ENCARGO A MEDIDA →
                  </button>
                </div>
              </div>
              <div className="md:col-span-5 order-1 md:order-2">
                <div className="relative overflow-hidden shadow-2xl">
                  <img
                    src={ARTWORKS.find(a => a.title === 'Sara en Marquesina')?.image || ARTWORKS[0].image}
                    alt="Obra destacada — Sara en Marquesina"
                    className="w-full h-[60vh] md:h-[70vh] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-stone-50">
                    <p className="font-serif italic text-sm md:text-base">Sara en marquesina</p>
                    <p className="text-[10px] tracking-[0.2em] opacity-80 mt-1">100 × 81 cm · ÓLEO SOBRE TELA · 92 SALÓN DE OTOÑO</p>
                  </div>
                </div>
              </div>
            </section>

            {/* OBRA DISPONIBLE — grid */}
            <section id="obra-disponible" className="mb-24">
              <div className="flex items-end justify-between mb-10 border-b border-stone-200 pb-4">
                <h2 className="font-serif text-2xl md:text-3xl text-slate-900">Obra disponible</h2>
                <p className="text-[10px] tracking-[0.3em] text-gold-600">2025 — 2026</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
                {ARTWORKS.map((artwork, idx) => (
                  <div
                    key={artwork.id}
                    className="reveal group cursor-pointer"
                    style={{ transitionDelay: `${(idx % 4) * 80}ms` }}
                    onClick={() => onOpenCompanion(artwork.id)}
                  >
                    <div className="relative overflow-hidden bg-stone-100 aspect-[4/5] mb-3">
                      <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-all duration-500 flex items-center justify-center">
                        <Eye size={28} className="text-stone-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      {artwork.status === 'sold' && (
                        <div className="absolute top-3 left-3 bg-slate-900/80 text-stone-50 text-[9px] tracking-[0.2em] px-2 py-1">VENDIDA</div>
                      )}
                    </div>
                    <h3 className="font-serif text-base text-slate-900 leading-snug">{artwork.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-1 tracking-wide">{artwork.dimensions} · {artwork.technique}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ========================================= */}
        {/* BIO & TRAYECTORIA TAB */}
        {/* ========================================= */}
        {activeTab === 'bio' && (
          <div className="max-w-5xl mx-auto">

            {/* HERO editorial Trayectoria */}
            <section className="reveal grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center mb-24">
              <div className="md:col-span-7 order-2 md:order-1">
                <p className="text-[10px] tracking-[0.35em] text-gold-600 mb-6">BIOGRAFÍA</p>
                <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] text-slate-900 mb-8">
                  Una <em className="text-gold-600 not-italic font-serif italic">voz</em> propia<br/>
                  construida con rigor.
                </h2>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-8">
                  {ARTIST_INFO.bioShort}
                </p>
                <div className="border-l-2 border-gold-500 pl-5 py-1">
                  <p className="text-[10px] tracking-[0.3em] text-gold-600 mb-2">DECLARACIÓN DE LA ARTISTA</p>
                  <p className="text-slate-700 leading-relaxed font-serif italic">
                    "{ARTIST_INFO.statement}"
                  </p>
                </div>
              </div>
              <div className="md:col-span-5 order-1 md:order-2">
                <div className="relative overflow-hidden">
                  <img
                    src="/obras/ARTISTA.jpg"
                    alt="Retrato de Myriam Alcaraz"
                    className="w-full h-[60vh] md:h-[70vh] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <p className="text-[10px] tracking-[0.3em] text-slate-500 mt-3 text-right">MYRIAM ALCARAZ · MADRID</p>
              </div>
            </section>

            {/* EXPOSICIONES */}
            <section className="reveal mb-24">
              <div className="flex items-baseline justify-between border-b border-stone-200 pb-4 mb-10">
                <h3 className="font-serif text-2xl md:text-3xl text-slate-900">Exposiciones colectivas</h3>
                <span className="text-[10px] tracking-[0.3em] text-gold-600">SELECCIÓN</span>
              </div>
              <div className="space-y-8">
                {ARTIST_INFO.accolades.exposiciones.map((item, idx) => (
                  <div key={idx} className="reveal flex gap-6 md:gap-10 items-start" style={{ transitionDelay: `${idx * 60}ms` }}>
                    <span className="font-serif text-2xl text-gold-500 leading-none w-10 flex-shrink-0 pt-1">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm md:text-base text-slate-700 leading-relaxed border-l border-stone-200 pl-6">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* CONCURSOS Y PREMIOS */}
            <section className="reveal mb-24">
              <div className="flex items-baseline justify-between border-b border-stone-200 pb-4 mb-10">
                <h3 className="font-serif text-2xl md:text-3xl text-slate-900">Concursos y premios</h3>
                <span className="text-[10px] tracking-[0.3em] text-gold-600">INTERNACIONALES</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ARTIST_INFO.accolades.concursos.map((item, idx) => (
                  <div key={idx} className="reveal p-6 border border-stone-200 bg-stone-50/50" style={{ transitionDelay: `${idx * 80}ms` }}>
                    <Award size={20} className="text-gold-600 mb-3" />
                    <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* PUBLICACIONES */}
            <section className="reveal mb-12">
              <div className="flex items-baseline justify-between border-b border-stone-200 pb-4 mb-10">
                <h3 className="font-serif text-2xl md:text-3xl text-slate-900">Publicaciones destacadas</h3>
                <span className="text-[10px] tracking-[0.3em] text-gold-600">CATÁLOGOS Y GUÍAS</span>
              </div>
              <ul className="space-y-5">
                {ARTIST_INFO.publications.map((item, idx) => (
                  <li key={idx} className="reveal flex gap-5 items-start" style={{ transitionDelay: `${idx * 70}ms` }}>
                    <span className="w-2 h-2 rounded-full bg-gold-500 mt-2 flex-shrink-0" />
                    <p className="text-sm md:text-base text-slate-700 leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </section>

          </div>
        )}

        {/* ========================================= */}
        {/* ENCARGOS Y PRECIOS TAB */}
        {/* ========================================= */}
        {activeTab === 'prices' && (
          <div className="max-w-5xl mx-auto">

            {/* HERO de Encargos */}
            <section className="reveal text-center mb-24">
              <p className="text-[10px] tracking-[0.35em] text-gold-600 mb-6">ENCARGOS</p>
              <h2 className="font-serif text-4xl md:text-6xl text-slate-900 leading-[1.1] mb-8">
                Tres caminos para<br/>
                tener la <em className="text-gold-600 not-italic font-serif italic">obra</em> contigo.
              </h2>
              <p className="text-base md:text-lg text-slate-600 font-serif italic max-w-2xl mx-auto leading-relaxed">
                "Cada vía respeta el tiempo del óleo, el oficio de la mano y la conversación previa.
                Ninguna sustituye a las otras — eliges según el momento."
              </p>
            </section>

            {/* TRES CAMINOS */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-28">

              {/* I — Obra original */}
              <div className="reveal group flex flex-col bg-white border border-stone-200 hover:border-gold-500 transition-colors p-8" style={{ transitionDelay: '0ms' }}>
                <p className="font-serif text-5xl text-gold-500 mb-6 leading-none">I</p>
                <h3 className="font-serif text-xl text-slate-900 mb-3">Obra original disponible</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-8 flex-grow">
                  Una pieza única ya pintada, esperando colección. Óleo sobre tela o tabla,
                  firmado en el reverso. Disponibilidad limitada al inventario actual.
                </p>
                <button
                  onClick={() => handleTabChange('portfolio')}
                  className="text-[11px] tracking-[0.25em] text-slate-900 group-hover:text-gold-600 transition-colors text-left"
                >
                  VER OBRA DISPONIBLE →
                </button>
              </div>

              {/* II — Encargo a medida */}
              <div className="reveal group flex flex-col bg-slate-900 text-stone-100 border border-slate-900 hover:border-gold-500 transition-colors p-8 md:scale-[1.02] shadow-2xl" style={{ transitionDelay: '120ms' }}>
                <p className="font-serif text-5xl text-gold-500 mb-6 leading-none">II</p>
                <p className="text-[10px] tracking-[0.3em] text-gold-500 mb-2">RECOMENDADO</p>
                <h3 className="font-serif text-xl text-stone-50 mb-3">Encargo a medida</h3>
                <p className="text-sm text-stone-300 leading-relaxed mb-8 flex-grow">
                  Partimos de tus fotografías, recuerdos o ideas. Definimos juntos formato, tono y
                  escena. Te confirmo todos los detalles antes de empezar — sin sorpresas.
                </p>
                <a
                  href={`mailto:${ARTIST_INFO.email}?subject=Consulta%20encargo%20a%20medida&body=Hola%20Myriam%2C%0A%0AMe%20gustar%C3%ADa%20explorar%20un%20encargo%20a%20medida.%0A%0A%E2%80%A2%20Tema%20o%20referencia%3A%20%5Bdescribe%20brevemente%20o%20adjunta%20foto%5D%0A%E2%80%A2%20Tama%C3%B1o%20aproximado%3A%20%5Bej.%2080x60%20cm%5D%0A%E2%80%A2%20Espacio%20donde%20ir%C3%A1%3A%20%5Bsal%C3%B3n%2C%20despacho%2C%20regalo...%5D%0A%0AQuedo%20a%20la%20espera%20de%20tu%20respuesta.%0A%0AUn%20saludo.`}
                  className="text-[11px] tracking-[0.25em] text-gold-500 hover:text-stone-50 transition-colors"
                >
                  SOLICITAR PROPUESTA →
                </a>
              </div>

              {/* III — Ediciones giclée */}
              <div className="reveal group flex flex-col bg-white border border-stone-200 hover:border-gold-500 transition-colors p-8" style={{ transitionDelay: '240ms' }}>
                <p className="font-serif text-5xl text-gold-500 mb-6 leading-none">III</p>
                <h3 className="font-serif text-xl text-slate-900 mb-3">Edición giclée firmada</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-8 flex-grow">
                  Reproducción de museo en papel de algodón. Tirada limitada a diez piezas
                  numeradas con certificado original y sello seco.
                </p>
                <button
                  onClick={() => handleTabChange('giclee')}
                  className="text-[11px] tracking-[0.25em] text-slate-900 group-hover:text-gold-600 transition-colors text-left"
                >
                  VER CATÁLOGO GICLÉE →
                </button>
              </div>
            </section>

            {/* PROCESO DEL ENCARGO */}
            <section className="reveal mb-24">
              <div className="text-center mb-16">
                <p className="text-[10px] tracking-[0.35em] text-gold-600 mb-4">EL PROCESO</p>
                <h3 className="font-serif text-3xl md:text-4xl text-slate-900 mb-4">De la idea al óleo</h3>
                <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                  Cuatro pasos. Sin prisa. Cada obra encuentra su tiempo.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
                {[
                  {
                    n: '01',
                    t: 'Conversación',
                    d: 'Me escribes con la idea, las fotografías o el recuerdo. Hablamos del formato, del espacio que va a ocupar y del tono.',
                  },
                  {
                    n: '02',
                    t: 'Propuesta',
                    d: 'Te envío una propuesta personal con el enfoque artístico, el formato definitivo y la inversión orientativa.',
                  },
                  {
                    n: '03',
                    t: 'Estudio',
                    d: 'Trabajo desde mi estudio en Madrid. Te comparto fotos del proceso si lo prefieres, o respeto la sorpresa final.',
                  },
                  {
                    n: '04',
                    t: 'Entrega',
                    d: 'Embalaje profesional y envío asegurado a tu domicilio. Firma en el reverso y certificado de autoría.',
                  },
                ].map((step, idx) => (
                  <div key={step.n} className="reveal" style={{ transitionDelay: `${idx * 90}ms` }}>
                    <p className="font-serif text-4xl md:text-5xl text-gold-500 mb-4 leading-none">{step.n}</p>
                    <h4 className="font-serif text-lg text-slate-900 mb-2">{step.t}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* NOTA SOBRE INVERSIÓN */}
            <section className="reveal mb-24 max-w-3xl mx-auto text-center">
              <p className="text-[10px] tracking-[0.35em] text-gold-600 mb-4">SOBRE LA INVERSIÓN</p>
              <p className="font-serif text-xl md:text-2xl text-slate-900 italic leading-relaxed">
                Cada obra al óleo es única. El valor responde al formato, al detalle y al tiempo dedicado.
                Te comparto la propuesta personal en la conversación previa, sin compromiso.
              </p>
            </section>

            {/* CTA FINAL */}
            <section className="reveal bg-stone-50 border border-stone-200 p-10 md:p-16 text-center mb-12">
              <p className="text-[10px] tracking-[0.35em] text-gold-600 mb-4">¿LISTA PARA EMPEZAR?</p>
              <h3 className="font-serif text-2xl md:text-3xl text-slate-900 mb-4 max-w-2xl mx-auto leading-snug">
                Cuéntame tu idea y te respondo personalmente.
              </h3>
              <p className="text-sm text-slate-600 mb-8 max-w-xl mx-auto">
                Respuesta en 24-48 horas. Conversación sin compromiso.
              </p>
              <a
                href={`mailto:${ARTIST_INFO.email}?subject=Consulta%20encargo%20a%20medida`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-stone-50 hover:bg-gold-600 transition-colors text-xs tracking-[0.3em]"
              >
                ESCRIBIR A LA ARTISTA
              </a>
            </section>

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
                        <p className="font-serif text-xl text-slate-900 italic">Bajo consulta</p>
                        <p className="text-[10px] tracking-[0.25em] text-gold-600 mt-2">EDICIÓN DE {GICLEE_SIZES.pequeno.edicion} PIEZAS</p>
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
                        <p className="font-serif text-xl text-slate-900 italic">Bajo consulta</p>
                        <p className="text-[10px] tracking-[0.25em] text-gold-600 mt-2">EDICIÓN DE {GICLEE_SIZES.mediano.edicion} PIEZAS</p>
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
                        <p className="font-serif text-xl text-slate-900 italic">Bajo consulta</p>
                        <p className="text-[10px] tracking-[0.25em] text-gold-600 mt-2">EDICIÓN DE {GICLEE_SIZES.original.edicion} PIEZAS</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Botón de solicitud */}
                {selectedSize && (
                  <div className="text-center animate-fade-in">
                    <a
                      href={`mailto:${ARTIST_INFO.email}?subject=Solicitud Giclée: ${obraActual?.titulo} - Tamaño ${GICLEE_SIZES[selectedSize as keyof typeof GICLEE_SIZES].label}&body=Hola Myriam,%0A%0AMe gustaría solicitar información sobre la reproducción Giclée:%0A%0A• Obra: ${obraActual?.titulo}%0A• Tamaño: ${selectedSize === 'original' ? getDimensionesOriginal() : (GICLEE_SIZES[selectedSize as keyof typeof GICLEE_SIZES] as { dimensions: string }).dimensions + ' cm'}%0A%0AQuedo a la espera de la información.%0A%0AUn saludo.`}
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
                    <p className="text-[10px] tracking-[0.3em] text-gold-600">ACCESO ÚNICO</p>
                  </div>
                  <a
                    href="https://payhip.com/ARTEFIGURATIVO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 text-sm text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors text-center"
                  >
                    Más información
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
                    <p className="text-[10px] tracking-[0.3em] text-gold-600">ACCESO ÚNICO</p>
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
        {/* ========================================= */}
        {/* CONTACTO TAB */}
        {/* ========================================= */}
        {activeTab === 'contact' && (
          <div className="reveal max-w-3xl mx-auto py-12">
            <p className="text-[10px] tracking-[0.35em] text-gold-600 mb-6">CONTACTO</p>
            <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-8 leading-tight">
              Escribir antes que <em className="text-gold-600 not-italic font-serif italic">elegir</em>.
            </h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed font-serif italic mb-12">
              "Cada encargo empieza con una conversación. Cuéntame qué imaginas — la persona, el lugar, el momento —
              y te respondo personalmente con una propuesta a medida."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <a
                href={`mailto:${ARTIST_INFO.email}?subject=Consulta%20desde%20la%20web`}
                className="group flex items-start gap-4 p-6 border border-stone-200 hover:border-gold-500 transition-colors"
              >
                <Mail size={20} className="text-gold-600 mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] tracking-[0.3em] text-slate-500 mb-2">CORREO DIRECTO</p>
                  <p className="font-serif text-base text-slate-900 break-all group-hover:text-gold-600 transition-colors">{ARTIST_INFO.email}</p>
                </div>
              </a>
              <a
                href={`https://www.instagram.com/${ARTIST_INFO.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-6 border border-stone-200 hover:border-gold-500 transition-colors"
              >
                <Instagram size={20} className="text-gold-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-slate-500 mb-2">INSTAGRAM</p>
                  <p className="font-serif text-base text-slate-900 group-hover:text-gold-600 transition-colors">{ARTIST_INFO.instagram}</p>
                </div>
              </a>
            </div>

            <div className="border-t border-stone-200 pt-8 text-xs text-slate-500 tracking-wide leading-relaxed">
              <p>Respuesta personal en 24-48 h. Atelier en Madrid, encargos enviados con embalaje profesional a toda España y Europa. Posibilidad de visita previa al estudio con cita.</p>
            </div>
          </div>
        )}

      </main>

      {/* ============================================== */}
      {/* OTRAS VÍAS DE COLECCIONAR — solo en pestaña OBRA */}
      {/* ============================================== */}
      {activeTab === 'portfolio' && (
        <section className="bg-[#F0EBE0] border-t border-stone-200 mt-12 py-20">
          <div className="reveal max-w-6xl mx-auto px-6">
            <p className="text-[10px] tracking-[0.35em] text-gold-600 mb-4">OTRAS VÍAS DE COLECCIONAR</p>
            <h3 className="font-serif text-2xl md:text-3xl text-slate-900 mb-12 max-w-2xl">
              Más allá del óleo único, otras formas de tener la obra cerca.
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => handleTabChange('giclee')}
                className="group text-left p-8 bg-white hover:bg-stone-50 border border-stone-200 hover:border-gold-500 transition-all"
              >
                <p className="text-[10px] tracking-[0.3em] text-gold-600 mb-3">EDICIONES LIMITADAS</p>
                <h4 className="font-serif text-xl text-slate-900 mb-3 group-hover:text-gold-700 transition-colors">Giclée firmadas</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Tiradas limitadas de diez piezas con certificado original numerado, firmado y sello seco.
                  Tres formatos disponibles, papel de algodón de archivo.
                </p>
                <span className="text-[11px] tracking-[0.25em] text-slate-900 group-hover:text-gold-600 transition-colors">EXPLORAR →</span>
              </button>
              <button
                onClick={() => handleTabChange('app')}
                className="group text-left p-8 bg-white hover:bg-stone-50 border border-stone-200 hover:border-gold-500 transition-all"
              >
                <p className="text-[10px] tracking-[0.3em] text-gold-600 mb-3">LABORATORIO</p>
                <h4 className="font-serif text-xl text-slate-900 mb-3 group-hover:text-gold-700 transition-colors">Estudio digital</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Atlas de transparencias, paletas de los maestros y Sol de Sorolla.
                  Herramientas pensadas para artistas y curiosos del oficio.
                </p>
                <span className="text-[11px] tracking-[0.25em] text-slate-900 group-hover:text-gold-600 transition-colors">DESCUBRIR →</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-stone-300 py-16 relative">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <p className="font-serif text-lg tracking-[0.18em] text-stone-50 mb-2">MYRIAM ALCARAZ</p>
            <p className="text-[10px] tracking-[0.3em] text-gold-500 mb-4">ARTISTA FIGURATIVA</p>
            <p className="text-xs text-stone-400 leading-relaxed max-w-xs">{ARTIST_INFO.tagline}</p>
          </div>
          <div className="text-sm space-y-2">
            <p className="text-[10px] tracking-[0.3em] text-gold-500 mb-3">CONTACTO</p>
            <a href={`mailto:${ARTIST_INFO.email}`} className="block text-stone-300 hover:text-gold-500 transition-colors break-all">{ARTIST_INFO.email}</a>
            <a href={`https://www.instagram.com/${ARTIST_INFO.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="block text-stone-300 hover:text-gold-500 transition-colors">{ARTIST_INFO.instagram}</a>
          </div>
          <div className="text-sm space-y-2">
            <p className="text-[10px] tracking-[0.3em] text-gold-500 mb-3">NAVEGAR</p>
            <button onClick={() => handleTabChange('portfolio')} className="block text-stone-300 hover:text-gold-500 transition-colors">Obra</button>
            <button onClick={() => handleTabChange('bio')} className="block text-stone-300 hover:text-gold-500 transition-colors">Trayectoria</button>
            <button onClick={() => handleTabChange('prices')} className="block text-stone-300 hover:text-gold-500 transition-colors">Encargos</button>
            <button onClick={() => handleTabChange('giclee')} className="block text-stone-300 hover:text-gold-500 transition-colors">Giclée</button>
            <button onClick={() => handleTabChange('app')} className="block text-stone-300 hover:text-gold-500 transition-colors">Estudio digital</button>
            <a href="/alquimia/alquimia-ia.html" className="block text-stone-300 hover:text-gold-500 transition-colors">Alquimia IA</a>
          </div>
        </div>
        <div className="border-t border-stone-700 pt-6 max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-3 text-[10px] tracking-wide text-stone-500">
          <p>© 2026 Myriam Alcaraz · Todos los derechos reservados.</p>
          <p>Pintura figurativa al óleo · Madrid</p>
        </div>
      </footer>

    </div>
  );
};

export default PublicSite;
