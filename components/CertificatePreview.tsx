// ============================================
// VISTA PREVIA DEL CERTIFICADO DE AUTENTICIDAD
// Versión compacta y elegante para web
// ============================================

import React from 'react';

interface CertificatePreviewProps {
  titulo: string;
  dimensiones: string;
  tecnica: string;
  año: number;
  imagen?: string;
  // Campos específicos para Giclée
  codigoSerie?: string | null;
  dimensionesOriginal?: string;
  dimensionesImpresion?: string;
  hologramNumber?: string | null;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  titulo,
  dimensiones,
  tecnica,
  año,
  imagen,
  codigoSerie,
  dimensionesOriginal,
  dimensionesImpresion,
  hologramNumber
}) => {
  // Usar código de serie si existe, sino generar ID parcialmente oculto
  const titleInitials = titulo.split(' ')[0].substring(0, 2).toUpperCase();
  const certificateIdVisible = codigoSerie || `MA-${año}-${titleInitials}`;
  const certificateIdHidden = codigoSerie ? '' : '••/•';

  // Es un Giclée si tiene dimensiones de impresión o número de holograma
  const isGiclee = !!dimensionesImpresion || !!hologramNumber;

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-2xl"
      style={{
        backgroundColor: '#fffdf8',
        fontFamily: "'Montserrat', sans-serif"
      }}
    >
      {/* Marco dorado exterior */}
      <div
        className="p-4"
        style={{ border: '6px solid #c5a059' }}
      >
        {/* Marco interior decorativo */}
        <div
          className="relative p-4"
          style={{
            border: '1px solid rgba(197, 160, 89, 0.4)'
          }}
        >
          {/* Logo */}
          <div className="text-center mb-3">
            <img
              src="/logo-myriam.png"
              alt="Myriam Alcaraz"
              className="mx-auto"
              style={{ maxWidth: '50px', height: 'auto' }}
            />
          </div>

          {/* Título del certificado */}
          <h3
            className="text-center mb-3"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '11px',
              letterSpacing: '2px',
              fontWeight: 400,
              color: '#1a1a1a',
              borderBottom: '1px solid #c5a059',
              paddingBottom: '4px',
              display: 'inline-block',
              width: '100%'
            }}
          >
            CERTIFICADO DE AUTENTICIDAD
          </h3>

          {/* Texto introductorio */}
          <p
            className="text-center mb-3"
            style={{
              fontSize: '8px',
              lineHeight: '1.4',
              color: '#555'
            }}
          >
            Creación original y auténtica de
          </p>
          <p
            className="text-center mb-3"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '1px',
              color: '#c5a059'
            }}
          >
            MYRIAM ALCARAZ
          </p>

          {/* Miniatura de la obra */}
          {imagen && (
            <div className="text-center mb-3">
              <div
                className="mx-auto p-1 inline-block"
                style={{
                  backgroundColor: '#f5f5f0',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                <img
                  src={imagen}
                  alt={titulo}
                  className="mx-auto"
                  style={{ maxHeight: '80px', width: 'auto', objectFit: 'contain' }}
                />
              </div>
            </div>
          )}

          {/* Detalles de la obra */}
          <div className="space-y-1 mb-3" style={{ fontSize: '9px' }}>
            <div className="flex justify-between">
              <span style={{ color: '#666', fontWeight: 500 }}>Título:</span>
              <span style={{ color: '#1a1a1a', fontStyle: 'italic' }}>{titulo}</span>
            </div>
            {isGiclee ? (
              <>
                <div className="flex justify-between">
                  <span style={{ color: '#666', fontWeight: 500 }}>Original:</span>
                  <span style={{ color: '#1a1a1a' }}>{dimensionesOriginal || dimensiones}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#666', fontWeight: 500 }}>Impresión:</span>
                  <span style={{ color: '#1a1a1a' }}>{dimensionesImpresion}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between">
                <span style={{ color: '#666', fontWeight: 500 }}>Dimensiones:</span>
                <span style={{ color: '#1a1a1a' }}>{dimensiones}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span style={{ color: '#666', fontWeight: 500 }}>Técnica:</span>
              <span style={{ color: '#1a1a1a' }}>{isGiclee ? 'Giclée Fine Art' : tecnica}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#666', fontWeight: 500 }}>Año:</span>
              <span style={{ color: '#1a1a1a' }}>{año}</span>
            </div>
          </div>

          {/* ID de referencia - parcialmente oculto */}
          <div
            className="text-center py-2 mb-3 rounded"
            style={{
              backgroundColor: 'rgba(197, 160, 89, 0.1)',
              border: '1px dashed rgba(197, 160, 89, 0.3)'
            }}
          >
            <span style={{ fontSize: '7px', color: '#888', display: 'block', marginBottom: '2px' }}>
              ID REFERENCIA
            </span>
            <span style={{ fontSize: '10px', color: '#c5a059', fontWeight: 600, letterSpacing: '1px' }}>
              {certificateIdVisible}
              <span className="blur-[2px] select-none">{certificateIdHidden}</span>
            </span>
          </div>

          {/* Zona de firma - pixelada */}
          <div className="relative">
            <div
              className="flex justify-between items-end px-2"
              style={{ fontSize: '8px' }}
            >
              {/* Fecha */}
              <div className="text-left">
                <span style={{ color: '#888' }}>FECHA:</span>
                <span className="blur-[3px] select-none ml-1" style={{ color: '#333' }}>
                  ••/••/••••
                </span>
              </div>

              {/* Firma */}
              <div className="text-right">
                <div
                  className="blur-[3px] select-none"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    fontSize: '14px',
                    color: '#333',
                    marginBottom: '2px'
                  }}
                >
                  Myriam Alcaraz
                </div>
                <div
                  style={{
                    borderTop: '1px solid #999',
                    width: '80px',
                    marginLeft: 'auto'
                  }}
                />
              </div>
            </div>

            {/* Overlay de protección */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(197, 160, 89, 0.03) 2px, rgba(197, 160, 89, 0.03) 4px)'
              }}
            />
          </div>

          {/* Sello de verificación con número de holograma */}
          <div className="text-center mt-3 pt-2" style={{ borderTop: '1px solid #eee' }}>
            {hologramNumber ? (
              // Mostrar número de holograma real
              <div className="space-y-1">
                <div
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg"
                  style={{
                    backgroundColor: 'rgba(197, 160, 89, 0.2)',
                    border: '1px solid rgba(197, 160, 89, 0.4)'
                  }}
                >
                  <svg className="w-4 h-4" fill="#c5a059" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className="text-left">
                    <span style={{ fontSize: '6px', color: '#888', display: 'block', letterSpacing: '0.5px' }}>
                      Nº HOLOGRAMA HAHNEMÜHLE
                    </span>
                    <span style={{ fontSize: '11px', color: '#c5a059', fontWeight: 700, letterSpacing: '1px', fontFamily: 'monospace' }}>
                      {hologramNumber}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              // Mostrar badge genérico
              <div
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full"
                style={{
                  backgroundColor: 'rgba(197, 160, 89, 0.15)',
                  fontSize: '7px',
                  color: '#c5a059',
                  fontWeight: 500,
                  letterSpacing: '0.5px'
                }}
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                HOLOGRAMA VERIFICADO
              </div>
            )}
          </div>

          {/* Contacto */}
          <div
            className="text-center mt-2 uppercase"
            style={{
              fontSize: '6px',
              letterSpacing: '0.5px',
              color: '#aaa'
            }}
          >
            myriamalcaraz.com
          </div>
        </div>
      </div>

      {/* Efecto de brillo sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(197, 160, 89, 0.05) 100%)'
        }}
      />
    </div>
  );
};

export default CertificatePreview;
