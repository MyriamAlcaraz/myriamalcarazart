// ============================================
// VISTA PREVIA DEL CERTIFICADO DE AUTENTICIDAD
// Diseño elegante basado en el certificado real
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
  edicion?: string; // ej: "1/10"
  soporte?: string; // ej: "Papel Hahnemühle Textured - William Turner"
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
  hologramNumber,
  edicion,
  soporte = 'Papel Hahnemühle Textured - William Turner'
}) => {
  // Es un Giclée si tiene número de holograma o dimensiones de impresión
  const isGiclee = !!hologramNumber || !!dimensionesImpresion;

  // Generar ID si no existe
  const idReferencia = codigoSerie || `MA-${año}-XX-01/1`;

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-2xl"
      style={{
        backgroundColor: '#ffffff',
        fontFamily: "'Montserrat', sans-serif"
      }}
    >
      {/* Barra dorada lateral izquierda */}
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{
          width: '12px',
          backgroundColor: '#c5a059'
        }}
      />

      {/* Contenido del certificado */}
      <div className="pl-6 pr-4 py-5">

        {/* Logo */}
        <div className="text-center mb-2">
          <img
            src="/logo-myriam.png"
            alt="Myriam Alcaraz"
            className="mx-auto"
            style={{ maxWidth: '45px', height: 'auto' }}
          />
        </div>

        {/* Tagline */}
        <p
          className="text-center mb-2"
          style={{
            fontSize: '6px',
            letterSpacing: '3px',
            color: '#888',
            fontWeight: 400
          }}
        >
          ARTE CON ALMA Y SOFISTICACIÓN
        </p>

        {/* Título principal */}
        <h2
          className="text-center mb-3"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '14px',
            letterSpacing: '3px',
            fontWeight: 400,
            color: '#333',
            lineHeight: 1.3
          }}
        >
          CERTIFICADO DE<br />AUTENTICIDAD
        </h2>

        {/* Línea decorativa */}
        <div
          className="mx-auto mb-3"
          style={{
            width: '80%',
            height: '1px',
            backgroundColor: '#c5a059'
          }}
        />

        {/* Texto introductorio */}
        <p
          className="text-center mb-2"
          style={{
            fontSize: '7px',
            lineHeight: 1.5,
            color: '#555'
          }}
        >
          {isGiclee ? (
            <>Por la presente se certifica que la reproducción Giclée descrita a continuación es una impresión autorizada y numerada. Todos los derechos de autor están reservados por la artista:</>
          ) : (
            <>Por la presente se certifica que la obra descrita a continuación es una creación original y auténtica de la artista:</>
          )}
        </p>

        {/* Nombre de la artista */}
        <p
          className="text-center mb-0"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '13px',
            fontWeight: 600,
            color: '#333'
          }}
        >
          Myriam Alcaraz
        </p>
        <p
          className="text-center mb-3"
          style={{
            fontSize: '7px',
            color: '#666',
            fontStyle: 'italic'
          }}
        >
          Pintura Figurativa Contemporánea
        </p>

        {/* Imagen de la obra */}
        {imagen && (
          <div className="text-center mb-3">
            <div
              className="mx-auto inline-block p-1"
              style={{
                backgroundColor: '#f5f5f5',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <img
                src={imagen}
                alt={titulo}
                className="mx-auto"
                style={{ maxHeight: '70px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
          </div>
        )}

        {/* Tabla de datos */}
        <div className="space-y-1 mb-3" style={{ fontSize: '8px' }}>
          {/* Título de la Obra */}
          <div className="flex items-baseline" style={{ borderBottom: '1px dotted #ccc', paddingBottom: '2px' }}>
            <span style={{ fontWeight: 600, color: '#333', width: '45%' }}>Título de la Obra:</span>
            <span style={{ color: '#555', textAlign: 'right', flex: 1 }}>{titulo}</span>
          </div>

          {/* Técnica Original */}
          <div className="flex items-baseline" style={{ borderBottom: '1px dotted #ccc', paddingBottom: '2px' }}>
            <span style={{ fontWeight: 600, color: '#333', width: '45%' }}>Técnica Original:</span>
            <span style={{ color: '#555', textAlign: 'right', flex: 1 }}>{tecnica}</span>
          </div>

          {/* Medidas Original */}
          <div className="flex items-baseline" style={{ borderBottom: '1px dotted #ccc', paddingBottom: '2px' }}>
            <span style={{ fontWeight: 600, color: '#333', width: '45%' }}>Medidas Original:</span>
            <span style={{ color: '#555', textAlign: 'right', flex: 1 }}>{dimensionesOriginal || dimensiones}</span>
          </div>

          {/* Medidas Impresión (solo Giclée) */}
          {isGiclee && (
            <div className="flex items-baseline" style={{ borderBottom: '1px dotted #ccc', paddingBottom: '2px' }}>
              <span style={{ fontWeight: 600, color: '#333', width: '45%' }}>Medidas Impresión:</span>
              <span style={{ color: '#555', textAlign: 'right', flex: 1 }}>
                {dimensionesImpresion || 'Tamaño original'}
              </span>
            </div>
          )}

          {/* Soporte (solo Giclée) */}
          {isGiclee && (
            <div className="flex items-baseline" style={{ borderBottom: '1px dotted #ccc', paddingBottom: '2px' }}>
              <span style={{ fontWeight: 600, color: '#333', width: '45%' }}>Soporte:</span>
              <span style={{ color: '#555', textAlign: 'right', flex: 1, fontSize: '7px' }}>{soporte}</span>
            </div>
          )}

          {/* ID de Referencia */}
          <div className="flex items-baseline" style={{ borderBottom: '1px dotted #ccc', paddingBottom: '2px' }}>
            <span style={{ fontWeight: 600, color: '#333', width: '45%' }}>ID de Referencia:</span>
            <span style={{ color: '#555', textAlign: 'right', flex: 1, fontFamily: 'monospace', fontSize: '7px', letterSpacing: '0.5px' }}>
              {codigoSerie ? (
                <span className="blur-[2px] select-none">{idReferencia}</span>
              ) : (
                <span className="blur-[2px] select-none">MA-20XX-XX-XX/X</span>
              )}
            </span>
          </div>

          {/* Edición (solo si existe) */}
          {(edicion || isGiclee) && (
            <div className="flex items-baseline" style={{ borderBottom: '1px dotted #ccc', paddingBottom: '2px' }}>
              <span style={{ fontWeight: 600, color: '#333', width: '45%' }}>Edición:</span>
              <span style={{ color: '#555', textAlign: 'right', flex: 1 }}>
                <span className="blur-[2px] select-none">{edicion || 'X/10'}</span>
              </span>
            </div>
          )}

          {/* Nº Holograma (solo Giclée) */}
          {isGiclee && (
            <div className="flex items-baseline" style={{ paddingBottom: '2px' }}>
              <span style={{ fontWeight: 600, color: '#c5a059', width: '45%' }}>Nº Holograma:</span>
              <span style={{ color: '#c5a059', textAlign: 'right', flex: 1, fontWeight: 600 }}>
                {hologramNumber || <span className="blur-[2px] select-none">XXXXXX</span>}
              </span>
            </div>
          )}
        </div>

        {/* Fecha y Firma */}
        <div className="flex justify-between items-end mt-4 pt-2" style={{ fontSize: '7px' }}>
          {/* Fecha */}
          <div>
            <span style={{ color: '#333', fontWeight: 500 }}>FECHA: </span>
            <span className="blur-[2px] select-none" style={{ color: '#555' }}>
              XX de XXXX de 20XX
            </span>
          </div>

          {/* Firma */}
          <div className="text-right">
            <div
              style={{
                width: '70px',
                borderTop: '1px solid #333',
                marginBottom: '3px'
              }}
            />
            <p style={{ fontWeight: 600, color: '#333', fontSize: '8px', margin: 0 }}>Myriam Alcaraz</p>
            <p style={{ color: '#666', fontSize: '6px', fontStyle: 'italic', margin: 0 }}>Pintura Figurativa Contemporánea</p>
          </div>
        </div>

        {/* Footer con contacto */}
        <div
          className="flex justify-center items-center gap-3 mt-3 pt-2"
          style={{
            borderTop: '1px solid #eee',
            fontSize: '6px',
            color: '#888'
          }}
        >
          <span>myriamalcaraz.com</span>
          <span>•</span>
          <span>myriamhotmail@hotmail.com</span>
          <span>•</span>
          <span>@myriamalcaraz.artist</span>
        </div>
      </div>
    </div>
  );
};

export default CertificatePreview;
