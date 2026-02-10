import React, { useState, useMemo } from 'react';
import { Printer, FileText, Check, Crown, Info, Package, Palette } from 'lucide-react';

// ---------------------------------------------------------
// DATOS DE CONFIGURACIÓN GICLÉE
// ---------------------------------------------------------

// Tamaños disponibles con precios y costes
const GICLEE_SIZES = [
  {
    id: 'S',
    name: 'Pequeño',
    dimensions: '30 x 40 cm',
    price: 195,
    cost: 19.30,
    edition: 10,
    description: 'Ideal para espacios íntimos'
  },
  {
    id: 'M',
    name: 'Mediano',
    dimensions: '50 x 63 cm',
    price: 420,
    cost: 25.70,
    edition: 10,
    description: 'Presencia elegante'
  },
  {
    id: 'L',
    name: 'Grande',
    dimensions: '60 x 93 cm',
    price: 780,
    cost: 88.00,
    edition: 10,
    description: 'Tamaño original - La joya de la corona',
    isOriginalSize: true
  }
];

// Obras disponibles para Giclée (catálogo completo)
const GICLEE_ARTWORKS = [
  { id: 'sara-farola', title: 'Sara bajo la farola', originalDimensions: '92 x 60 cm', technique: 'Óleo sobre tela', year: 2024, image: '/obras/OBRA_03.jpg' },
  { id: 'sara-marquesina', title: 'Sara en Marquesina', originalDimensions: '100 x 81 cm', technique: 'Óleo en tela', year: 2024, image: '/obras/OBRA_04.jpg' },
  { id: 'laura-crepusculo', title: 'Laura en el Crepúsculo', originalDimensions: '100 x 81 cm', technique: 'Óleo en tela montada en tabla', year: 2024, image: '/obras/OBRA_02.jpg' },
  { id: 'autorretrato-xix', title: 'Autorretrato en siglo XIX', originalDimensions: '100 x 81 cm', technique: 'Óleo en tela montada en tabla', year: 2025, image: '/obras/OBRA_01.jpg' },
  { id: 'ana-habana', title: 'Ana y la Habana', originalDimensions: '92 x 60 cm', technique: 'Óleo sobre tela', year: 2024, image: '/obras/OBRA_05.jpg' },
  { id: 'viajera', title: 'Viajera', originalDimensions: '81 x 100 cm', technique: 'Óleo sobre tela', year: 2024, image: '/obras/OBRA_06.jpg' },
  { id: 'mekong-i', title: 'Memorias de Mekong I', originalDimensions: '100 x 65 cm', technique: 'Óleo sobre tela', year: 2024, image: '/obras/OBRA_07.jpg' },
  { id: 'mekong-ii', title: 'Memorias de Mekong II', originalDimensions: '100 x 65 cm', technique: 'Óleo sobre tela', year: 2024, image: '/obras/OBRA_08.jpg' },
  { id: 'nino-capucha', title: 'El niño de la capucha', originalDimensions: '92 x 65 cm', technique: 'Óleo sobre tela', year: 2024, image: '/obras/OBRA_09.jpg' },
  { id: 'joven-piscina', title: 'Joven en piscina', originalDimensions: '73 x 100 cm', technique: 'Óleo sobre lienzo', year: 2024, image: '/obras/OBRA_10.jpg' },
  { id: 'pablo-cascada', title: 'Pablo en Cascada', originalDimensions: '55 x 46 cm', technique: 'Óleo sobre tela', year: 2022, image: '/obras/OBRA_11.jpg' },
  { id: 'pablo-cascada-ii', title: 'Pablo en Cascada II', originalDimensions: '80 x 65 cm', technique: 'Óleo sobre tela', year: 2023, image: '/obras/OBRA_12.jpg' },
  { id: 'ninos-playa-valencia', title: 'Niños en playa valenciana', originalDimensions: '80 x 60 cm', technique: 'Óleo sobre tela', year: 2024, image: '/obras/OBRA_13.jpg' },
  { id: 'buceando', title: 'Buceando', originalDimensions: '100 x 65 cm', technique: 'Óleo sobre tela', year: 2024, image: '/obras/OBRA_14.jpg' },
  { id: 'ninos-capucha', title: 'Niños con capucha', originalDimensions: '100 x 81 cm', technique: 'Óleo sobre tela', year: 2024, image: '/obras/OBRA_15.jpg' },
  { id: 'ninos-playa-rocosa', title: 'Niños en playa rocosa', originalDimensions: '55 x 46 cm', technique: 'Óleo sobre lienzo', year: 2024, image: '/obras/OBRA_16.jpg' },
  { id: 'porteadores', title: 'Porteadores', originalDimensions: '55 x 46 cm', technique: 'Óleo sobre lienzo', year: 2024, image: '/obras/OBRA_18.jpg' },
  { id: 'carpe-diem', title: 'Carpe Diem', originalDimensions: '140 x 50 cm', technique: 'Óleo sobre tela', year: 2024, image: '/obras/OBRA_19.jpg' },
  { id: 'mas-que-amigos', title: 'Más que amigos', originalDimensions: '100 x 60 cm', technique: 'Óleo sobre tela', year: 2024, image: '/obras/OBRA_20.jpg' },
  { id: 'abruma-belleza', title: 'Abruma y belleza', originalDimensions: '100 x 73 cm', technique: 'Óleo sobre tela', year: 2026, image: '/obras/OBRA_21.jpg' },
  { id: 'joven-vela-bruma', title: 'Joven con vela en la bruma', originalDimensions: '100 x 73 cm', technique: 'Óleo sobre tela', year: 2026, image: '/obras/OBRA_22.jpg' },
  { id: 'sara-retiro', title: 'Sara en Retiro', originalDimensions: '100 x 80 cm', technique: 'Óleo sobre papel encolado en tabla', year: 2026, image: '/obras/OBRA_23.jpg' },
];

// Información del papel certificado
const PAPER_INFO = {
  name: 'Hahnemühle Textured',
  weight: '310g',
  type: '100% algodón',
  texture: 'Textura mate',
  certification: 'Sistema de Hologramas Hahnemühle',
  durability: '+100 años (calidad museo)',
  printPaper: 'Papel verjurado' // Para el certificado impreso
};

// ---------------------------------------------------------
// GENERADOR DE CÓDIGO LEGAL
// ---------------------------------------------------------
const generateGicleeCode = (
  artworkId: string,
  sizeId: string,
  copyNumber: number,
  totalEdition: number = 10,
  year: number = new Date().getFullYear()
): string => {
  // Formato: MA-AÑO-GC-[2 letras obra]-[Nº]/[Total]-[Tamaño]
  // Ejemplo: MA-2026-GC-SF-03/10-M
  const artworkInitials = artworkId
    .split('-')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);

  const paddedCopy = String(copyNumber).padStart(2, '0');

  return `MA-${year}-GC-${artworkInitials}-${paddedCopy}/${totalEdition}-${sizeId}`;
};

// ---------------------------------------------------------
// COMPONENTE: TARJETA DE TAMAÑO
// ---------------------------------------------------------
interface SizeCardProps {
  size: typeof GICLEE_SIZES[0];
  isSelected: boolean;
  onSelect: () => void;
  copyNumber: number;
}

const SizeCard: React.FC<SizeCardProps> = ({ size, isSelected, onSelect, copyNumber }) => {
  const profit = size.price - size.cost;
  const remaining = size.edition - copyNumber + 1;

  return (
    <div
      onClick={onSelect}
      className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'border-gold-500 bg-gradient-to-br from-amber-50 to-white shadow-lg scale-[1.02]'
          : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-md'
      }`}
    >
      {/* Badge para tamaño original */}
      {size.isOriginalSize && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
          <Crown size={12} /> TAMAÑO ORIGINAL
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
            isSelected ? 'border-gold-500 bg-gold-500' : 'border-stone-300'
          }`}>
            {isSelected && <Check size={12} className="text-white" />}
          </div>
          <div>
            <h3 className={`font-bold text-lg ${isSelected ? 'text-amber-700' : 'text-slate-700'}`}>
              {size.name}
            </h3>
            <p className="text-sm text-slate-500">{size.description}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${isSelected ? 'text-amber-600' : 'text-slate-700'}`}>
            {size.price}€
          </p>
          <p className="text-xs text-slate-400">PVP</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-stone-100">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-slate-600">
            <strong>{size.dimensions}</strong>
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            remaining <= 3
              ? 'bg-red-100 text-red-700'
              : remaining <= 5
                ? 'bg-amber-100 text-amber-700'
                : 'bg-green-100 text-green-700'
          }`}>
            {remaining} disponibles
          </span>
        </div>
        {isSelected && (
          <span className="text-xs text-green-600 font-medium">
            Beneficio: +{profit.toFixed(0)}€
          </span>
        )}
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// COMPONENTE: GENERADOR HTML DEL CERTIFICADO GICLÉE
// ---------------------------------------------------------
const getGicleeCertificateHtml = (
  artwork: typeof GICLEE_ARTWORKS[0],
  size: typeof GICLEE_SIZES[0],
  copyNumber: number,
  code: string,
  hahnemuehleLot?: string,
  hologramNumber?: string
): string => {
  const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

  // Parámetros de Estilo EXACTOS del certificado original
  const GOLD_COLOR = "#b8860b";
  const OUTLINE_WIDTH = "12px";
  const OUTLINE_OFFSET = "12px";
  const MARGIN_SAFETY_CSS = "10mm auto 0 auto";

  // Footer con iconos SVG (idéntico al original)
  const contactFooterHtml = `
    <div class="contact-footer">
      <span class="contact-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 0 4 10 15.3 15.3 0 0 0-4 10zM22 12A15.3 15.3 0 0 0 18 8m-4-4a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10"/></svg>
        <a href="https://myriamalcaraz.com" target="_blank">myriamalcaraz.com</a>
      </span>
      <span class="contact-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <a href="mailto:myriamhotmail@hotmail.com">myriamhotmail@hotmail.com</a>
      </span>
      <span class="contact-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        @myriamalcaraz.artist
      </span>
    </div>
  `;

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <title>Certificado Giclée - ${artwork.title} - ${code}</title>
      <style>
        /* ESTILOS EXACTOS DEL CERTIFICADO ORIGINAL */
        body {
          font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif;
          font-size: 12pt;
          margin: 0mm;
          padding: 0;
          color: #111;
        }

        .cert-container {
          margin: ${MARGIN_SAFETY_CSS} !important;
          width: 178mm;
          box-sizing: border-box;

          /* Borde fino (1px negro) + Outline grueso (12px dorado) */
          border: 1px solid #000;
          outline: ${OUTLINE_WIDTH} solid ${GOLD_COLOR};
          outline-offset: ${OUTLINE_OFFSET};

          padding: 4mm 35px 4mm 35px;
        }

        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #ddd;
          margin-bottom: 15px;
        }

        .logo {
          max-height: 80px;
          width: auto;
          margin-bottom: 5px;
          opacity: 0.9;
        }

        .subtitle {
          font-size: 10pt;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #555;
          margin-top: 0;
        }

        h1 {
          font-size: 26pt;
          text-align: center;
          margin: 0;
          font-weight: 300;
          letter-spacing: 5px;
          color: ${GOLD_COLOR};
          text-transform: uppercase;
        }

        .fixed-text {
          text-align: center;
          font-size: 10pt;
          color: #333;
          margin: 15px 0;
          line-height: 1.5;
        }

        .fixed-text strong {
          font-size: 14pt;
          color: #000;
          display: block;
          margin-top: 5px;
        }

        .artwork-image-section {
          width: 70%;
          max-width: 160px;
          max-height: 180px;
          overflow: hidden;
          margin: 10px auto;
          border: 1px solid #ccc;
          padding: 5px;
          box-shadow: 0 0 8px rgba(0,0,0,0.1);
          text-align: center;
        }

        .artwork-image-section img {
          width: 100%;
          height: auto;
          display: block;
        }

        .details-grid {
          width: 90%;
          margin: 15px auto 30px auto;
          font-size: 11pt;
        }

        .details-grid p {
          margin: 10px 0;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px dashed #ccc;
          padding-bottom: 5px;
        }

        .details-grid strong {
          font-weight: bold;
          color: #000;
          width: 150px;
        }

        .details-grid span {
          text-align: right;
          color: #333;
          flex-grow: 1;
        }

        .code-display {
          font-weight: bold;
          color: #333;
          padding: 0;
          font-family: 'Courier New', monospace;
        }

        .hologram-subtle {
          font-size: 9pt;
          color: #666;
          font-style: italic;
        }

        .contact-footer {
          font-size: 9pt;
          text-align: center;
          color: #555;
          margin-top: 20px;
          padding-top: 15px;
          border-top: 1px solid #eee;
          display: flex;
          justify-content: center;
          gap: 15px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .contact-item a {
          color: #555;
          text-decoration: none;
        }

        .contact-item svg {
          flex-shrink: 0;
        }

        .signature-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-top: 20px;
          padding-top: 20px;
        }

        .date-col {
          flex-basis: 45%;
          text-align: left;
          font-size: 10pt;
          color: #333;
        }

        .signature-col {
          flex-basis: 45%;
          text-align: right;
          padding-top: 15px;
        }

        .signature-line {
          border-top: 1px solid #000;
          display: block;
          width: 100%;
          margin-bottom: 5px;
        }

        .artist-title-style {
          font-size: 10pt;
          color: #333;
          margin-top: 2px;
        }

        @media print {
          body { margin: 0; padding: 0; }
          .cert-container {
            box-shadow: none;
            margin: ${MARGIN_SAFETY_CSS} !important;
            width: 178mm !important;
            border: 1px solid #000 !important;
            outline: ${OUTLINE_WIDTH} solid ${GOLD_COLOR} !important;
            outline-offset: ${OUTLINE_OFFSET} !important;
            padding: 4mm 35px 4mm 35px !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="cert-container">
        <div class="header">
          <img src="/logo-myriam.png" alt="Myriam Alcaraz Logo" class="logo"/>
          <p class="subtitle">ARTE CON ALMA Y SOFISTICACIÓN</p>
          <h1>CERTIFICADO DE AUTENTICIDAD</h1>
        </div>

        <div class="fixed-text">
          <p style="font-size: 10pt; color: #333; margin: 0; line-height: 1.5;">
            Por la presente se certifica que la reproducción Giclée descrita a continuación es una impresión autorizada y numerada de la obra original. Todos los derechos de autor y reproducción están reservados por la artista:
          </p>
          <strong>Myriam Alcaraz</strong>
          <span class="artist-title-style">Pintura Figurativa Contemporánea</span>
        </div>

        <div class="artwork-image-section">
          <img src="${artwork.image}" alt="${artwork.title} - Foto de Obra"/>
        </div>

        <div class="details-grid">
          <p>
            <strong>Título de la Obra:</strong>
            <span>${artwork.title}</span>
          </p>
          <p>
            <strong>Técnica Original:</strong>
            <span>${artwork.technique}</span>
          </p>
          <p>
            <strong>Medidas Original:</strong>
            <span>${artwork.originalDimensions}</span>
          </p>
          <p>
            <strong>Medidas Impresión:</strong>
            <span>${size.dimensions}</span>
          </p>
          <p>
            <strong>Soporte:</strong>
            <span>Papel Hahnemühle Textured - William Turner</span>
          </p>
          <p>
            <strong>ID de Referencia:</strong>
            <span class="code-display">${code}</span>
          </p>
          <p style="border-bottom: none;">
            <strong>Edición:</strong>
            <span>${copyNumber}/${size.edition}</span>
          </p>
          ${hologramNumber ? `
          <p style="border-bottom: none; margin-top: 5px;">
            <span class="hologram-subtle">Nº Holograma Hahnemühle:</span>
            <span class="hologram-subtle">${hologramNumber}</span>
          </p>
          ` : ''}
        </div>

        <div class="signature-row">
          <div class="date-col">
            <p>FECHA: ${today}</p>
          </div>

          <div class="signature-col">
            <span class="signature-line"></span>
            <p class="artist-name">Myriam Alcaraz</p>
            <p class="artist-title-style">Pintura Figurativa Contemporánea</p>
          </div>
        </div>

        ${contactFooterHtml}

      </div>
    </body>
    </html>
  `;
};

// ---------------------------------------------------------
// COMPONENTE PRINCIPAL: GENERADOR DE CERTIFICADOS GICLÉE
// ---------------------------------------------------------
interface GicleeCertificateGeneratorProps {
  onClose?: () => void;
}

export const GicleeCertificateGenerator: React.FC<GicleeCertificateGeneratorProps> = ({ onClose }) => {
  // Estados del formulario
  const [selectedArtwork, setSelectedArtwork] = useState<string>(GICLEE_ARTWORKS[0]?.id || '');
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [copyNumber, setCopyNumber] = useState<number>(1);
  const [hahnemuehleLot, setHahnemuehleLot] = useState<string>('');
  const [hologramNumber, setHologramNumber] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);

  // Obtener datos seleccionados
  const artwork = useMemo(() =>
    GICLEE_ARTWORKS.find(a => a.id === selectedArtwork),
    [selectedArtwork]
  );

  const size = useMemo(() =>
    GICLEE_SIZES.find(s => s.id === selectedSize),
    [selectedSize]
  );

  // Generar código
  const code = useMemo(() => {
    if (!artwork || !size) return '';
    return generateGicleeCode(artwork.id, size.id, copyNumber, size.edition);
  }, [artwork, size, copyNumber]);

  // Handler para imprimir
  const handlePrint = () => {
    if (!artwork || !size) return;

    const html = getGicleeCertificateHtml(
      artwork,
      size,
      copyNumber,
      code,
      hahnemuehleLot || undefined,
      hologramNumber || undefined
    );

    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.title = `Certificado Giclée - ${code}`;
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 500);
    }
  };

  if (!artwork || !size) return null;

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-stone-50 rounded-2xl shadow-xl border border-amber-100 overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Crown size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-wide">Generador de Certificados Giclée</h2>
              <p className="text-amber-100 text-sm">Ediciones limitadas numeradas</p>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-white/70 hover:text-white text-2xl">×</button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">

        {/* Paso 1: Selección de obra */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
            <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
            Selecciona la obra
          </label>
          <select
            value={selectedArtwork}
            onChange={(e) => setSelectedArtwork(e.target.value)}
            className="w-full p-4 border-2 border-stone-200 rounded-xl text-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-100 bg-white cursor-pointer"
          >
            {GICLEE_ARTWORKS.map(art => (
              <option key={art.id} value={art.id}>
                {art.title} — Original: {art.originalDimensions}
              </option>
            ))}
          </select>
        </div>

        {/* Paso 2: Selección de tamaño */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
            <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
            Selecciona el tamaño
          </label>
          <div className="grid gap-4">
            {GICLEE_SIZES.map(s => (
              <SizeCard
                key={s.id}
                size={s}
                isSelected={selectedSize === s.id}
                onSelect={() => setSelectedSize(s.id)}
                copyNumber={copyNumber}
              />
            ))}
          </div>
        </div>

        {/* Paso 3: Número de copia */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
              <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs">3</span>
              Número de copia
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                max={size.edition}
                value={copyNumber}
                onChange={(e) => setCopyNumber(Math.min(size.edition, Math.max(1, Number(e.target.value))))}
                className="w-24 p-4 border-2 border-stone-200 rounded-xl text-2xl font-bold text-center focus:border-amber-500"
              />
              <span className="text-2xl text-slate-400">/</span>
              <span className="text-2xl font-bold text-slate-600">{size.edition}</span>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
              <Package size={16} className="text-amber-500" />
              Lote Hahnemühle (opcional)
            </label>
            <input
              type="text"
              value={hahnemuehleLot}
              onChange={(e) => setHahnemuehleLot(e.target.value)}
              placeholder="Ej: WT-2026-0142"
              className="w-full p-4 border-2 border-stone-200 rounded-xl focus:border-amber-500"
            />
          </div>
        </div>

        {/* Paso 4: Número de Holograma Hahnemühle */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-5">
          <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
            <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs">4</span>
            Número de Holograma Hahnemühle
            <span className="ml-auto text-xs text-slate-400 font-normal">Sistema oficial de autenticidad</span>
          </label>
          <input
            type="text"
            value={hologramNumber}
            onChange={(e) => setHologramNumber(e.target.value.toUpperCase())}
            placeholder="Ej: HAH-2026-XXXXXX"
            className="w-full p-4 border-2 border-slate-600 bg-slate-700 text-white rounded-xl focus:border-amber-500 font-mono text-lg tracking-wider placeholder:text-slate-500"
          />
          <p className="text-xs text-slate-400 mt-2">
            Este número aparece en el holograma adherido a la impresión. Verificable en MyArtRegistry.com
          </p>
        </div>

        {/* Vista previa del código */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Código de Certificado</p>
              <p className="font-mono text-2xl tracking-wider">{code}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Precio</p>
              <p className="text-3xl font-bold text-amber-400">{size.price}€</p>
            </div>
          </div>
        </div>

        {/* Resumen de datos del certificado */}
        <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Info size={16} className="text-amber-500" /> Datos del Certificado
          </h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-slate-500">Obra:</span> <strong>{artwork.title}</strong></div>
            <div><span className="text-slate-500">Medidas Original:</span> <strong>{artwork.originalDimensions}</strong></div>
            <div><span className="text-slate-500">Medidas Giclée:</span> <strong>{size.dimensions}</strong></div>
            <div><span className="text-slate-500">Edición:</span> <strong>{copyNumber}/{size.edition}</strong></div>
            <div><span className="text-slate-500">Soporte:</span> <strong>{PAPER_INFO.name} {PAPER_INFO.weight}</strong></div>
            <div><span className="text-slate-500">Holograma:</span> <strong>{hologramNumber || '(pendiente)'}</strong></div>
          </div>
          <div className="mt-3 pt-3 border-t border-stone-200 text-xs text-slate-500">
            <strong>Nota:</strong> Este certificado se imprimirá en papel verjurado.
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4">
          <button
            onClick={() => setShowPreview(true)}
            className="flex-1 flex items-center justify-center gap-2 py-4 px-6 border-2 border-amber-500 text-amber-600 rounded-xl font-semibold hover:bg-amber-50 transition-all"
          >
            <FileText size={20} /> Vista Previa
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-200"
          >
            <Printer size={20} /> IMPRIMIR CERTIFICADO
          </button>
        </div>

        {/* Nota sobre el papel y holograma */}
        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <Palette className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
          <div className="text-sm text-amber-800">
            <p className="mb-2">
              <strong>Papel Giclée:</strong> {PAPER_INFO.name} {PAPER_INFO.weight}, {PAPER_INFO.type}. Durabilidad: {PAPER_INFO.durability}.
            </p>
            <p className="mb-2">
              <strong>Sistema Holograma:</strong> Cada impresión incluye holograma oficial Hahnemühle verificable en MyArtRegistry.com
            </p>
            <p className="text-amber-600 text-xs">
              <strong>Certificado:</strong> Se imprimirá en papel verjurado.
            </p>
          </div>
        </div>
      </div>

      {/* Modal de vista previa */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg">Vista Previa del Certificado</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ×
              </button>
            </div>
            <div
              className="p-8"
              dangerouslySetInnerHTML={{
                __html: getGicleeCertificateHtml(artwork, size, copyNumber, code, hahnemuehleLot || undefined, hologramNumber || undefined)
                  .replace('<body>', '<div>')
                  .replace('</body>', '</div>')
                  .replace('<html lang="es">', '')
                  .replace('</html>', '')
                  .replace(/<head>[\s\S]*?<\/head>/, '')
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GicleeCertificateGenerator;
