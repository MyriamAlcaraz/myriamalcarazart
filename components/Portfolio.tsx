import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

// ============================================
// GALERÍA PÚBLICA - PORTFOLIO DE MYRIAM ALCARAZ
// ============================================

interface ObraPublica {
  id: string;
  titulo: string;
  imagen: string;
  dimensiones: string;
  tecnica: string;
  año: number;
  disponible: boolean;
}

// Base de datos de obras públicas (imágenes reales)
const OBRAS_GALERIA: ObraPublica[] = [
  {
    id: '1',
    titulo: 'Composición I',
    imagen: '/obras/OBRA_01.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2024,
    disponible: true
  },
  {
    id: '2',
    titulo: 'Composición II',
    imagen: '/obras/OBRA_02.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2024,
    disponible: true
  },
  {
    id: '3',
    titulo: 'Composición III',
    imagen: '/obras/OBRA_03.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2024,
    disponible: true
  },
  {
    id: '4',
    titulo: 'Composición IV',
    imagen: '/obras/OBRA_04.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2024,
    disponible: false
  },
  {
    id: '5',
    titulo: 'Composición V',
    imagen: '/obras/OBRA_05.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2024,
    disponible: true
  },
  {
    id: '6',
    titulo: 'Composición VI',
    imagen: '/obras/OBRA_06.jpg',
    dimensiones: '80 x 60 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2024,
    disponible: true
  },
  {
    id: '7',
    titulo: 'Composición VII',
    imagen: '/obras/OBRA_07.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2024,
    disponible: true
  },
  {
    id: '8',
    titulo: 'Composición VIII',
    imagen: '/obras/OBRA_08.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2024,
    disponible: false
  },
  {
    id: '9',
    titulo: 'Composición IX',
    imagen: '/obras/OBRA_09.jpg',
    dimensiones: '120 x 100 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2025,
    disponible: true
  },
  {
    id: '10',
    titulo: 'Composición X',
    imagen: '/obras/OBRA_10.jpg',
    dimensiones: '120 x 100 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2025,
    disponible: true
  },
  {
    id: '11',
    titulo: 'Composición XI',
    imagen: '/obras/OBRA_11.jpg',
    dimensiones: '120 x 100 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2025,
    disponible: true
  },
  {
    id: '12',
    titulo: 'Composición XII',
    imagen: '/obras/OBRA_12.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2025,
    disponible: true
  },
  {
    id: '13',
    titulo: 'Composición XIII',
    imagen: '/obras/OBRA_13.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2024,
    disponible: true
  },
  {
    id: '14',
    titulo: 'Composición XIV',
    imagen: '/obras/OBRA_14.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2024,
    disponible: true
  },
  {
    id: '15',
    titulo: 'Composición XV',
    imagen: '/obras/OBRA_15.jpg',
    dimensiones: '120 x 100 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2025,
    disponible: true
  },
  {
    id: '16',
    titulo: 'Composición XVI',
    imagen: '/obras/OBRA_16.jpg',
    dimensiones: '120 x 100 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2025,
    disponible: true
  },
  {
    id: '17',
    titulo: 'Composición XVII',
    imagen: '/obras/OBRA_17.jpg',
    dimensiones: '120 x 100 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2025,
    disponible: true
  },
  {
    id: '18',
    titulo: 'Composición XVIII',
    imagen: '/obras/OBRA_18.jpg',
    dimensiones: '80 x 60 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2025,
    disponible: true
  },
  {
    id: '19',
    titulo: 'Composición XIX',
    imagen: '/obras/OBRA_19.jpg',
    dimensiones: '100 x 81 cm',
    tecnica: 'Óleo sobre lienzo',
    año: 2025,
    disponible: true
  }
];

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const Portfolio: React.FC = () => {
  const [selectedObra, setSelectedObra] = useState<ObraPublica | null>(null);
  const [lupaPosition, setLupaPosition] = useState({ x: 0, y: 0, visible: false });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Estado para zoom en el modal
  const [modalZoom, setModalZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  // Navegar entre obras en el modal
  const navegarObra = (direccion: 'prev' | 'next') => {
    if (!selectedObra) return;
    const currentIndex = OBRAS_GALERIA.findIndex(o => o.id === selectedObra.id);
    let newIndex: number;

    if (direccion === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : OBRAS_GALERIA.length - 1;
    } else {
      newIndex = currentIndex < OBRAS_GALERIA.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedObra(OBRAS_GALERIA[newIndex]);
  };

  // Manejar movimiento de lupa
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, obraId: string) => {
    if (hoveredCard !== obraId) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setLupaPosition({ x, y, visible: true });
  };

  const handleMouseEnter = (obraId: string) => {
    setHoveredCard(obraId);
    setLupaPosition(prev => ({ ...prev, visible: true }));
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
    setLupaPosition({ x: 0, y: 0, visible: false });
  };

  // Manejar zoom en el modal
  const handleModalImageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedObra(null);
      if (e.key === 'ArrowLeft') navegarObra('prev');
      if (e.key === 'ArrowRight') navegarObra('next');
    };

    if (selectedObra) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedObra]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-serif font-bold text-xl">M</span>
              </div>
              <div>
                <h1 className="text-xl font-serif text-slate-900 tracking-wide">MYRIAM ALCARAZ</h1>
                <p className="text-xs text-stone-500 tracking-widest">ARTISTA PLÁSTICA</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Título de sección */}
      <section className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-xs tracking-[0.5em] text-stone-400 uppercase mb-4">Colección de Arte Contemporáneo</p>
        <h2 className="text-5xl md:text-6xl font-serif text-slate-900 mb-6">Galería de Obra</h2>
        <div className="w-24 h-px bg-amber-500 mx-auto mb-6"></div>
        <p className="text-stone-600 text-lg max-w-2xl mx-auto">
          Obras seleccionadas con la pasión y el cuidado que caracterizan cada pieza única
        </p>
      </section>

      {/* Galería Grid - Proporciones Perfectas */}
      <main className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {OBRAS_GALERIA.map((obra) => (
            <div
              key={obra.id}
              className="group relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              onClick={() => setSelectedObra(obra)}
              onMouseMove={(e) => handleMouseMove(e, obra.id)}
              onMouseEnter={() => handleMouseEnter(obra.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Contenedor de imagen con aspecto ratio fijo */}
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                <img
                  src={obra.imagen}
                  alt={obra.titulo}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlay sutil en hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Lupa flotante - sigue al cursor */}
                {hoveredCard === obra.id && lupaPosition.visible && (
                  <div
                    className="absolute w-16 h-16 pointer-events-none transition-opacity duration-150 z-10"
                    style={{
                      left: lupaPosition.x - 32,
                      top: lupaPosition.y - 32,
                      opacity: 1
                    }}
                  >
                    <div className="w-full h-full rounded-full border-2 border-white/80 bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <ZoomIn size={20} className="text-white drop-shadow-md" />
                    </div>
                  </div>
                )}

                {/* Badge de disponibilidad */}
                {obra.disponible && (
                  <div className="absolute top-3 right-3 bg-emerald-500/90 text-white text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm">
                    Disponible
                  </div>
                )}
              </div>

              {/* Información de la obra */}
              <div className="p-4">
                <h3 className="font-serif text-lg text-slate-900 mb-1 truncate">{obra.titulo}</h3>
                <div className="flex items-center justify-between text-sm text-stone-500">
                  <span>{obra.dimensiones}</span>
                  <span>{obra.año}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ============================================
          MODAL DE VISTA DETALLADA - ESTRUCTURA DE 2 BLOQUES
          Bloque Izquierdo: Imagen + Ficha Técnica (debajo)
          Bloque Derecho: Certificado con blur de seguridad
          ============================================ */}
      {selectedObra && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 animate-fade-in overflow-y-auto py-6"
          onClick={() => setSelectedObra(null)}
        >
          {/* Botón cerrar */}
          <button
            onClick={() => setSelectedObra(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-50"
          >
            <X size={20} className="text-white" />
          </button>

          {/* Navegación anterior */}
          <button
            onClick={(e) => { e.stopPropagation(); navegarObra('prev'); }}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-50"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>

          {/* Navegación siguiente */}
          <button
            onClick={(e) => { e.stopPropagation(); navegarObra('next'); }}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-50"
          >
            <ChevronRight size={24} className="text-white" />
          </button>

          {/* ============================================
              LAYOUT SORPRENDENTE: Imagen protagonista + Certificado flotante
              ============================================ */}
          <div
            className="max-w-6xl w-full mx-4 md:mx-12 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* TÍTULO DE LA OBRA - Prominente arriba */}
            <div className="text-center mb-6">
              <span className="text-stone-500 text-xs">
                {OBRAS_GALERIA.findIndex(o => o.id === selectedObra.id) + 1} / {OBRAS_GALERIA.length}
              </span>
              <h2 className="font-serif text-2xl md:text-4xl text-white mt-1">{selectedObra.titulo}</h2>
              <div className="flex items-center justify-center gap-4 mt-2 text-stone-400 text-sm">
                <span>{selectedObra.tecnica}</span>
                <span className="text-amber-500">•</span>
                <span>{selectedObra.dimensiones}</span>
                <span className="text-amber-500">•</span>
                <span>{selectedObra.año}</span>
              </div>
            </div>

            {/* COMPOSICIÓN PRINCIPAL */}
            <div className="flex flex-col lg:flex-row gap-6 items-start">

              {/* IMAGEN PROTAGONISTA con zoom */}
              <div className="flex-1 relative">
                <div
                  className="relative flex items-center justify-center bg-gradient-to-br from-stone-900/50 to-black/50 rounded-2xl p-6 cursor-zoom-in group"
                  onClick={() => setModalZoom(!modalZoom)}
                  onMouseMove={modalZoom ? handleModalImageMove : undefined}
                  onMouseLeave={() => modalZoom && setModalZoom(false)}
                >
                  <div
                    className="relative overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10"
                    style={{ maxHeight: modalZoom ? '70vh' : '60vh' }}
                  >
                    <img
                      src={selectedObra.imagen}
                      alt={selectedObra.titulo}
                      className="w-full h-full object-contain transition-transform duration-200"
                      style={modalZoom ? {
                        transform: 'scale(2.5)',
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        cursor: 'zoom-out'
                      } : { cursor: 'zoom-in' }}
                    />
                  </div>

                  {/* Lupita */}
                  {!modalZoom && (
                    <div className="absolute bottom-8 right-8 bg-amber-500/80 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                      <ZoomIn size={20} className="text-white" />
                    </div>
                  )}
                </div>

                {/* ESTADO - Badge flotante sobre la imagen */}
                <div className={`absolute top-8 left-8 px-4 py-2 rounded-full text-sm font-medium shadow-lg ${
                  selectedObra.disponible
                    ? 'bg-emerald-500/90 text-white'
                    : 'bg-red-500/90 text-white'
                }`}>
                  {selectedObra.disponible ? '● Disponible' : '● Vendida'}
                </div>
              </div>

              {/* CERTIFICADO DE AUTENTICIDAD - Columna derecha elegante */}
              <div className="lg:w-72 w-full flex flex-col">
                {/* Encabezado con línea dorada */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/50"></div>
                  <h3 className="text-[11px] tracking-[0.25em] text-amber-400 uppercase whitespace-nowrap">
                    Certificado de Autenticidad
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/50"></div>
                </div>

                {/* CERTIFICADO — Diseño V15 Serif Clásico */}
                <div className="relative transform hover:scale-[1.02] transition-transform duration-300">
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{
                      border: '4px solid #c5a059',
                      boxShadow: '0 25px 60px rgba(197, 160, 89, 0.35), 0 15px 40px rgba(0,0,0,0.5)'
                    }}
                  >
                    <div style={{
                      fontFamily: "'Palatino Linotype', Palatino, Georgia, serif",
                      backgroundColor: '#fffdf8',
                      padding: '18px 22px',
                      color: '#111',
                      lineHeight: 1.5,
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {/* Marco interior dorado */}
                      <div style={{
                        position: 'absolute', top: 6, left: 6, right: 6, bottom: 6,
                        border: '1px solid #b8860b', opacity: 0.35, pointerEvents: 'none'
                      }} />

                      {/* Marca de agua diagonal */}
                      <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%) rotate(-28deg)',
                        fontSize: '22px', fontWeight: 700,
                        color: '#b8860b', opacity: 0.1,
                        letterSpacing: '3px', whiteSpace: 'nowrap',
                        pointerEvents: 'none', zIndex: 2,
                        textTransform: 'uppercase'
                      }}>
                        CERTIFICADO OFICIAL
                      </div>

                      {/* Logo */}
                      <div style={{ textAlign: 'center', marginBottom: '6px' }}>
                        <img src="/logo-myriam.png" alt="Myriam Alcaraz"
                          style={{ height: '28px', width: 'auto', opacity: 0.9 }} />
                      </div>

                      {/* Lema */}
                      <p style={{
                        textAlign: 'center', fontSize: '5pt',
                        letterSpacing: '2px', color: '#777',
                        textTransform: 'uppercase', margin: '0 0 6px'
                      }}>Pintura Figurativa Contemporánea</p>

                      {/* Título del certificado */}
                      <h1 style={{
                        textAlign: 'center', fontFamily: 'inherit',
                        fontSize: '10.5pt', fontWeight: 300,
                        letterSpacing: '4px', color: '#b8860b',
                        textTransform: 'uppercase',
                        borderBottom: '2px solid #b8860b',
                        paddingBottom: '5px', marginBottom: '8px'
                      }}>Certificado de Autenticidad</h1>

                      {/* Texto introductorio */}
                      <p style={{
                        textAlign: 'center', fontSize: '6pt',
                        color: '#333', lineHeight: 1.6, marginBottom: '3px'
                      }}>
                        Por la presente se certifica que la obra de arte descrita a continuación
                        es una creación original y auténtica de la artista:
                      </p>
                      <p style={{
                        textAlign: 'center', fontWeight: 700,
                        fontSize: '9pt', letterSpacing: '2px',
                        color: '#000', marginBottom: '1px'
                      }}>MYRIAM ALCARAZ</p>
                      <p style={{
                        textAlign: 'center', fontSize: '5pt',
                        letterSpacing: '2px', color: '#555',
                        textTransform: 'uppercase', marginBottom: '10px'
                      }}>Pintura Figurativa Contemporánea</p>

                      {/* Campos públicos — totalmente visibles */}
                      {[
                        { label: 'Título:', value: selectedObra.titulo },
                        { label: 'Año:', value: String(selectedObra.año) },
                        { label: 'Dimensiones:', value: selectedObra.dimensiones },
                        { label: 'Técnica:', value: selectedObra.tecnica },
                      ].map((item, i) => (
                        <div key={i} style={{
                          display: 'flex', alignItems: 'baseline',
                          borderBottom: '1px dotted #bbb',
                          marginBottom: '4px', paddingBottom: '3px', fontSize: '6pt'
                        }}>
                          <span style={{ fontWeight: 600, minWidth: '80px', color: '#444' }}>{item.label}</span>
                          <span style={{ flex: 1, fontStyle: 'italic', color: '#111' }}>{item.value}</span>
                        </div>
                      ))}

                      {/* Campos sensibles — marca de agua parcial */}
                      <div style={{ opacity: 0.28, position: 'relative' }}>
                        {[
                          { label: 'ID Referencia:', value: 'MA-XXXX·GC·XX·01/10' },
                          { label: 'Nº Holograma:', value: '●●●●●●' },
                        ].map((item, i) => (
                          <div key={i} style={{
                            display: 'flex', alignItems: 'baseline',
                            borderBottom: '1px dotted #bbb',
                            marginBottom: '4px', paddingBottom: '3px', fontSize: '6pt'
                          }}>
                            <span style={{ fontWeight: 600, minWidth: '80px', color: '#b8860b' }}>{item.label}</span>
                            <span style={{ flex: 1, fontStyle: 'italic', color: '#111', letterSpacing: '1px' }}>{item.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Nota de certificación */}
                      <p style={{
                        textAlign: 'center', fontStyle: 'italic',
                        fontSize: '5.5pt', color: '#555',
                        lineHeight: 1.4, margin: '8px 0 10px'
                      }}>
                        Este documento certifica que la obra ha sido inspeccionada y aprobada<br />
                        personalmente por la artista. Todos los derechos reservados.
                      </p>

                      {/* Fecha y firma — opacidad reducida */}
                      <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'flex-end', opacity: 0.3
                      }}>
                        <div style={{ fontSize: '5.5pt', color: '#333' }}>
                          <span style={{ fontWeight: 600 }}>FECHA: </span>
                          <span>2 de marzo de 2026</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ height: '28px' }} />
                          <div style={{ borderTop: '1px solid #333', width: '75px', marginBottom: '2px' }} />
                          <p style={{ fontSize: '6pt', fontWeight: 600, color: '#000', margin: 0 }}>Myriam Alcaraz</p>
                          <p style={{ fontSize: '4.5pt', color: '#555', fontStyle: 'italic', margin: 0 }}>Pintura Figurativa Contemporánea</p>
                        </div>
                      </div>

                      {/* Pie de contacto */}
                      <div style={{
                        textAlign: 'center', fontSize: '4pt',
                        color: '#999', marginTop: '8px',
                        paddingTop: '5px', borderTop: '1px solid #eee',
                        letterSpacing: '0.5px', textTransform: 'uppercase'
                      }}>
                        myriamalcaraz.com&nbsp;•&nbsp;myriamhotmail@hotmail.com&nbsp;•&nbsp;@myriamalcaraz.artist
                      </div>
                    </div>
                  </div>

                  {/* Sello MYRIAM ALCARAZ */}
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full shadow-2xl flex items-center justify-center transform rotate-12"
                       style={{ background: 'linear-gradient(135deg, #c5a059 0%, #8b6914 100%)' }}>
                    <div className="text-center leading-tight">
                      <div className="text-[8px] text-white font-bold tracking-widest">MYRIAM</div>
                      <div className="text-[9px] text-white font-black tracking-wider">ALCARAZ</div>
                      <div className="w-8 h-px bg-white/50 mx-auto my-0.5"></div>
                      <div className="text-[6px] text-white/90 tracking-wide">AUTÉNTICO</div>
                    </div>
                  </div>
                </div>

                {/* Información adicional */}
                <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-amber-500/20">
                  <div className="flex items-center gap-2 text-amber-400 mb-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-medium">Garantía de autenticidad</span>
                  </div>
                  <p className="text-stone-400 text-[10px] leading-relaxed">
                    Cada obra incluye certificado firmado por la artista con holograma de seguridad Hahnemühle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos de animación */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
