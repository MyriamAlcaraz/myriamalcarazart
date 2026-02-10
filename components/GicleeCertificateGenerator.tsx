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
  name: 'Hahnemühle William Turner',
  weight: '310g',
  type: '100% algodón',
  texture: 'Textura mate moldeado en tina',
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
  const today = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const GOLD_COLOR = "#b8860b";

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <title>Certificado Giclée - ${artwork.title} - ${code}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Montserrat', sans-serif;
          background: #f5f5f0;
          padding: 20mm;
        }

        .certificate {
          width: 180mm;
          margin: 0 auto;
          background: linear-gradient(135deg, #fffdf8 0%, #fff 100%);
          border: 2px solid #111;
          outline: 10px solid ${GOLD_COLOR};
          outline-offset: 8px;
          padding: 25mm 20mm;
          position: relative;
        }

        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-30deg);
          font-size: 80pt;
          font-family: 'Playfair Display', serif;
          color: rgba(197, 160, 89, 0.05);
          font-weight: 700;
          letter-spacing: 10px;
          white-space: nowrap;
          pointer-events: none;
          z-index: 0;
        }

        .content { position: relative; z-index: 1; }

        .header {
          text-align: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #ddd;
        }

        .logo {
          max-height: 60px;
          margin-bottom: 10px;
          opacity: 0.9;
        }

        .badge {
          display: inline-block;
          background: linear-gradient(135deg, ${GOLD_COLOR}, #d4a84b);
          color: white;
          padding: 6px 20px;
          border-radius: 20px;
          font-size: 9pt;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 15px;
        }

        .title {
          font-family: 'Playfair Display', serif;
          font-size: 22pt;
          color: #111;
          letter-spacing: 4px;
          font-weight: 400;
          text-transform: uppercase;
        }

        .subtitle {
          font-size: 9pt;
          color: #666;
          letter-spacing: 2px;
          margin-top: 5px;
        }

        .artwork-section {
          display: flex;
          gap: 20px;
          margin: 25px 0;
          align-items: flex-start;
        }

        .artwork-image {
          width: 120px;
          flex-shrink: 0;
        }

        .artwork-image img {
          width: 100%;
          border: 1px solid #ddd;
          padding: 5px;
          background: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .artwork-details {
          flex: 1;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px dotted #ccc;
          font-size: 10pt;
        }

        .detail-row:last-child { border-bottom: none; }

        .detail-label {
          color: #555;
          font-weight: 500;
        }

        .detail-value {
          color: #111;
          font-weight: 600;
          text-align: right;
        }

        .edition-box {
          background: linear-gradient(135deg, #f8f6f0, #fff);
          border: 2px solid ${GOLD_COLOR};
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          margin: 25px 0;
        }

        .edition-number {
          font-family: 'Playfair Display', serif;
          font-size: 36pt;
          color: ${GOLD_COLOR};
          font-weight: 700;
          letter-spacing: 3px;
        }

        .edition-label {
          font-size: 9pt;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-top: 5px;
        }

        .code-display {
          font-family: 'Courier New', monospace;
          font-size: 11pt;
          background: #f5f5f0;
          padding: 8px 15px;
          border-radius: 5px;
          display: inline-block;
          margin-top: 10px;
          letter-spacing: 1px;
        }

        .paper-section {
          background: #f9f9f6;
          border-left: 3px solid ${GOLD_COLOR};
          padding: 15px 20px;
          margin: 20px 0;
        }

        .paper-title {
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
          font-size: 10pt;
        }

        .paper-details {
          font-size: 9pt;
          color: #555;
          line-height: 1.6;
        }

        .signature-section {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
          padding-top: 20px;
        }

        .date-col {
          width: 40%;
        }

        .signature-col {
          width: 50%;
          text-align: right;
        }

        .signature-line {
          border-top: 1px solid #333;
          margin-top: 50px;
          margin-bottom: 8px;
        }

        .signature-name {
          font-family: 'Playfair Display', serif;
          font-size: 12pt;
          font-weight: 600;
        }

        .signature-title {
          font-size: 9pt;
          color: #555;
        }

        .footer {
          text-align: center;
          margin-top: 25px;
          padding-top: 15px;
          border-top: 1px solid #eee;
          font-size: 8pt;
          color: #888;
          letter-spacing: 1px;
        }

        .footer a { color: #888; text-decoration: none; }

        @media print {
          body {
            padding: 0;
            background: white;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .certificate {
            box-shadow: none;
            margin: 10mm auto;
          }
        }
      </style>
    </head>
    <body>
      <div class="certificate">
        <div class="watermark">GICLÉE</div>

        <div class="content">
          <div class="header">
            <img src="/logo-myriam.png" alt="Myriam Alcaraz" class="logo" />
            <div class="badge">Edición Limitada Giclée</div>
            <h1 class="title">Certificado de Autenticidad</h1>
            <p class="subtitle">Reproducción de Alta Fidelidad sobre Papel Certificado</p>
          </div>

          <div class="artwork-section">
            <div class="artwork-image">
              <img src="${artwork.image}" alt="${artwork.title}" />
            </div>
            <div class="artwork-details">
              <div class="detail-row">
                <span class="detail-label">Título de la Obra:</span>
                <span class="detail-value">${artwork.title}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Técnica Original:</span>
                <span class="detail-value">${artwork.technique}</span>
              </div>
            </div>
          </div>

          <!-- BLOQUE DE MEDIDAS DESTACADO -->
          <div style="display: flex; gap: 15px; margin: 20px 0;">
            <div style="flex: 1; background: linear-gradient(135deg, #f8f6f0, #fff); border: 2px solid #ddd; border-radius: 10px; padding: 15px; text-align: center;">
              <p style="font-size: 8pt; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Medidas Obra Original</p>
              <p style="font-size: 16pt; font-weight: 700; color: #333; font-family: 'Playfair Display', serif;">${artwork.originalDimensions}</p>
            </div>
            <div style="flex: 1; background: linear-gradient(135deg, #fffbeb, #fff); border: 2px solid ${GOLD_COLOR}; border-radius: 10px; padding: 15px; text-align: center;">
              <p style="font-size: 8pt; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Medidas Impresión Giclée</p>
              <p style="font-size: 16pt; font-weight: 700; color: ${GOLD_COLOR}; font-family: 'Playfair Display', serif;">${size.dimensions}</p>
              ${size.isOriginalSize ? '<span style="display: inline-block; background: ' + GOLD_COLOR + '; color: white; font-size: 7pt; padding: 2px 8px; border-radius: 10px; margin-top: 5px;">TAMAÑO ORIGINAL</span>' : ''}
            </div>
          </div>

          <div class="edition-box">
            <div class="edition-number">${copyNumber} / ${size.edition}</div>
            <div class="edition-label">Ejemplar Numerado de Edición Limitada</div>
            <div class="code-display">${code}</div>
          </div>

          <div class="paper-section">
            <div class="paper-title">Especificaciones del Soporte Certificado</div>
            <div class="paper-details">
              <strong>Papel:</strong> ${PAPER_INFO.name} ${PAPER_INFO.weight}<br/>
              <strong>Composición:</strong> ${PAPER_INFO.type} - ${PAPER_INFO.texture}<br/>
              <strong>Durabilidad:</strong> ${PAPER_INFO.durability}<br/>
              ${hahnemuehleLot ? `<strong>N° Lote Hahnemühle:</strong> ${hahnemuehleLot}<br/>` : ''}
            </div>
          </div>

          <!-- HOLOGRAMA HAHNEMÜHLE - DESTACADO -->
          ${hologramNumber ? `
          <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); border-radius: 12px; padding: 18px; margin: 20px 0; text-align: center; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 20px);"></div>
            <div style="position: relative; z-index: 1;">
              <p style="font-size: 8pt; color: #aaa; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">
                ✦ Holograma de Autenticidad Hahnemühle ✦
              </p>
              <p style="font-family: 'Courier New', monospace; font-size: 18pt; font-weight: bold; color: #e8d5b7; letter-spacing: 3px; text-shadow: 0 0 10px rgba(232,213,183,0.3);">
                ${hologramNumber}
              </p>
              <p style="font-size: 7pt; color: #888; margin-top: 8px;">
                Verificable en MyArtRegistry.com
              </p>
            </div>
          </div>
          ` : ''}

          <p style="font-size: 9pt; color: #555; text-align: center; line-height: 1.5; margin: 15px 0;">
            Este certificado garantiza que la presente reproducción Giclée es una impresión autorizada,
            numerada y limitada de la obra original de la artista. Todos los derechos de autor están reservados.
          </p>

          <div class="signature-section">
            <div class="date-col">
              <p style="font-size: 10pt; color: #333;">
                Madrid, a ${today}
              </p>
            </div>
            <div class="signature-col">
              <div class="signature-line"></div>
              <p class="signature-name">Myriam Alcaraz</p>
              <p class="signature-title">Pintura Figurativa Contemporánea</p>
            </div>
          </div>

          <div class="footer">
            myriamalcaraz.com &nbsp;•&nbsp; myriamhotmail@hotmail.com &nbsp;•&nbsp; @myriamalcaraz.artist
          </div>
        </div>
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
            <div><span className="text-slate-500">Original:</span> <strong>{artwork.originalDimensions}</strong></div>
            <div><span className="text-slate-500">Tamaño Giclée:</span> <strong>{size.dimensions}</strong></div>
            <div><span className="text-slate-500">Edición:</span> <strong>{copyNumber}/{size.edition}</strong></div>
            <div><span className="text-slate-500">Papel impresión:</span> <strong>{PAPER_INFO.name}</strong></div>
            <div><span className="text-slate-500">Holograma:</span> <strong>{hologramNumber || '(pendiente)'}</strong></div>
          </div>
          <div className="mt-3 pt-3 border-t border-stone-200 text-xs text-slate-500">
            <strong>Nota:</strong> Este certificado se imprimirá en papel verjurado para mayor autenticidad.
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
              <strong>Papel Giclée:</strong> {PAPER_INFO.name} {PAPER_INFO.weight}, algodón con textura mate. Durabilidad: {PAPER_INFO.durability}.
            </p>
            <p>
              <strong>Sistema Holograma:</strong> Cada impresión incluye holograma oficial Hahnemühle verificable en MyArtRegistry.com
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
