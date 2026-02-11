// ============================================
// CERTIFICADO DE AUTENTICIDAD - VISTA PREVIA
// Modelo final - Estructura exacta de archivos maestros
// ============================================

import React from 'react';

interface CertificatePreviewProps {
  // Campos comunes
  titulo: string;
  imagen?: string;

  // Para OBRA ORIGINAL
  año?: number;
  dimensiones?: string;
  tecnica?: string;

  // Para GICLÉE (8 campos obligatorios)
  isGiclee?: boolean;
  tecnicaOriginal?: string;
  medidasOriginal?: string;
  medidasImpresion?: string;
  idReferencia?: string | null;
  edicion?: string;
  hologramNumber?: string | null;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  titulo,
  imagen,
  año = 2026,
  dimensiones,
  tecnica,
  isGiclee = false,
  tecnicaOriginal,
  medidasOriginal,
  medidasImpresion,
  idReferencia,
  edicion,
  hologramNumber
}) => {
  // Determinar si es Giclée
  const esGiclee = isGiclee || !!hologramNumber || !!medidasImpresion;

  // ID por defecto para obra original: MA-2026-AB1/1
  const idDefault = `MA-${año}-${titulo.substring(0, 2).toUpperCase()}1/1`;

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-2xl bg-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Barra dorada lateral izquierda */}
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '12px', backgroundColor: '#c5a059' }}
      />

      {/* Contenido */}
      <div className="pl-6 pr-4 py-5">

        {/* ========== ENCABEZADO ========== */}

        {/* Logo */}
        <div className="text-center mb-2">
          <img
            src="/logo-myriam.png"
            alt="Myriam Alcaraz"
            className="mx-auto"
            style={{ maxWidth: '45px', height: 'auto' }}
          />
        </div>

        {/* Lema */}
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

        {/* Título del Certificado */}
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
        <div className="mx-auto mb-3" style={{ width: '80%', height: '1px', backgroundColor: '#c5a059' }} />

        {/* ========== TEXTO LEGAL (CONDICIONAL) ========== */}
        <p className="text-center mb-3" style={{ fontSize: '7px', lineHeight: 1.5, color: '#555' }}>
          {esGiclee ? (
            <>Por la presente se certifica que la reproducción Giclée descrita a continuación es una impresión autorizada y numerada. Todos los derechos de autor están reservados por la artista:</>
          ) : (
            <>Por la presente se certifica que la obra de arte descrita a continuación es una creación original y auténtica. Todos los derechos de autor están reservados por la artista:</>
          )}
        </p>

        {/* Nombre de la artista */}
        <p className="text-center mb-0" style={{ fontFamily: "'Playfair Display', serif", fontSize: '13px', fontWeight: 600, color: '#333' }}>
          Myriam Alcaraz
        </p>
        <p className="text-center mb-3" style={{ fontSize: '7px', color: '#888', fontStyle: 'italic' }}>
          Pintura Figurativa Contemporánea
        </p>

        {/* Imagen de la obra */}
        {imagen && (
          <div className="text-center mb-3">
            <div className="mx-auto inline-block p-1" style={{ backgroundColor: '#f5f5f5', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <img src={imagen} alt={titulo} style={{ maxHeight: '70px', width: 'auto', objectFit: 'contain' }} />
            </div>
          </div>
        )}

        {/* ========== TABLA DE DATOS TÉCNICOS ========== */}
        <div className="mb-3" style={{ fontSize: '8px' }}>

          {esGiclee ? (
            /* ==========================================
               GICLÉE - 8 FILAS EXACTAS EN ESTE ORDEN:
               1. Título de la Obra
               2. Técnica Original
               3. Medidas Original
               4. Medidas Impresión
               5. Soporte
               6. ID de Referencia
               7. Edición
               8. Nº Holograma
               ========================================== */
            <>
              {/* 1. Título de la Obra */}
              <div className="flex py-1" style={{ borderBottom: '1px dotted #ccc' }}>
                <span style={{ fontWeight: 600, color: '#333', width: '45%' }}>Título de la Obra:</span>
                <span style={{ color: '#555', textAlign: 'right', flex: 1 }}>{titulo}</span>
              </div>

              {/* 2. Técnica Original */}
              <div className="flex py-1" style={{ borderBottom: '1px dotted #ccc' }}>
                <span style={{ fontWeight: 600, color: '#333', width: '45%' }}>Técnica Original:</span>
                <span style={{ color: '#555', textAlign: 'right', flex: 1 }}>{tecnicaOriginal || tecnica || 'Óleo sobre tela'}</span>
              </div>

              {/* 3. Medidas Original */}
              <div className="flex py-1" style={{ borderBottom: '1px dotted #ccc' }}>
                <span style={{ fontWeight: 600, color: '#333', width: '45%' }}>Medidas Original:</span>
                <span style={{ color: '#555', textAlign: 'right', flex: 1 }}>{medidasOriginal || dimensiones || '—'}</span>
              </div>

              {/* 4. Medidas Impresión */}
              <div className="flex py-1" style={{ borderBottom: '1px dotted #ccc' }}>
                <span style={{ fontWeight: 600, color: '#333', width: '45%' }}>Medidas Impresión:</span>
                <span style={{ color: '#555', textAlign: 'right', flex: 1 }}>{medidasImpresion || 'Tamaño original'}</span>
              </div>

              {/* 5. Soporte (SIEMPRE este valor) */}
              <div className="flex py-1" style={{ borderBottom: '1px dotted #ccc' }}>
                <span style={{ fontWeight: 600, color: '#333', width: '45%' }}>Soporte:</span>
                <span style={{ color: '#555', textAlign: 'right', flex: 1, fontSize: '7px' }}>Papel Hahnemühle Textured - William Turner</span>
              </div>

              {/* 6. ID de Referencia (formato: MA-2026-GC-XX-01/10-S/M/L) */}
              <div className="flex py-1" style={{ borderBottom: '1px dotted #ccc' }}>
                <span style={{ fontWeight: 600, color: '#333', width: '45%' }}>ID de Referencia:</span>
                <span style={{
                  color: '#555',
                  textAlign: 'right',
                  flex: 1,
                  fontFamily: 'monospace',
                  fontSize: '7px',
                  letterSpacing: '0.5px'
                }}>
                  {idReferencia || <span className="blur-[2px] select-none">MA-2026-GC-XX-01/10-X</span>}
                </span>
              </div>

              {/* 7. Edición */}
              <div className="flex py-1" style={{ borderBottom: '1px dotted #ccc' }}>
                <span style={{ fontWeight: 600, color: '#333', width: '45%' }}>Edición:</span>
                <span style={{ color: '#555', textAlign: 'right', flex: 1 }}>
                  {edicion || <span className="blur-[2px] select-none">X/10</span>}
                </span>
              </div>

              {/* 8. Nº Holograma (CAMPO CRÍTICO - SIEMPRE VISIBLE SI EXISTE) */}
              <div className="flex py-1.5" style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', borderRadius: '4px', marginTop: '4px', padding: '6px 8px' }}>
                <span style={{ fontWeight: 700, color: '#c5a059', width: '45%' }}>Nº Holograma:</span>
                <span style={{
                  color: '#c5a059',
                  textAlign: 'right',
                  flex: 1,
                  fontWeight: 700,
                  fontSize: '10px',
                  fontFamily: 'monospace',
                  letterSpacing: '1px'
                }}>
                  {hologramNumber || <span className="blur-[2px] select-none text-gray-400" style={{ fontWeight: 400, fontSize: '8px' }}>XXXXXX</span>}
                </span>
              </div>
            </>
          ) : (
            /* ==========================================
               OBRA ORIGINAL - 6 FILAS:
               1. Título
               2. Año de Creación
               3. Medidas
               4. Técnica/Medio
               5. ID de Referencia
               6. Edición (Obra Única Original)
               ========================================== */
            <>
              {/* 1. Título */}
              <div className="flex py-1" style={{ borderBottom: '1px dotted #ccc' }}>
                <span style={{ fontWeight: 600, color: '#333', width: '45%' }}>Título:</span>
                <span style={{ color: '#555', textAlign: 'right', flex: 1 }}>{titulo}</span>
              </div>

              {/* 2. Año de Creación */}
              <div className="flex py-1" style={{ borderBottom: '1px dotted #ccc' }}>
                <span style={{ fontWeight: 600, color: '#333', width: '45%' }}>Año de Creación:</span>
                <span style={{ color: '#555', textAlign: 'right', flex: 1 }}>{año}</span>
              </div>

              {/* 3. Medidas */}
              <div className="flex py-1" style={{ borderBottom: '1px dotted #ccc' }}>
                <span style={{ fontWeight: 600, color: '#333', width: '45%' }}>Medidas:</span>
                <span style={{ color: '#555', textAlign: 'right', flex: 1 }}>{dimensiones || '—'}</span>
              </div>

              {/* 4. Técnica/Medio */}
              <div className="flex py-1" style={{ borderBottom: '1px dotted #ccc' }}>
                <span style={{ fontWeight: 600, color: '#333', width: '45%' }}>Técnica/Medio:</span>
                <span style={{ color: '#555', textAlign: 'right', flex: 1 }}>{tecnica || 'Óleo sobre lienzo'}</span>
              </div>

              {/* 5. ID de Referencia (formato: MA-2026-AB1/1) */}
              <div className="flex py-1" style={{ borderBottom: '1px dotted #ccc' }}>
                <span style={{ fontWeight: 600, color: '#333', width: '45%' }}>ID de Referencia:</span>
                <span className="blur-[2px] select-none" style={{
                  color: '#555',
                  textAlign: 'right',
                  flex: 1,
                  fontFamily: 'monospace',
                  fontSize: '7px'
                }}>
                  {idDefault}
                </span>
              </div>

              {/* 6. Edición */}
              <div className="flex py-1" style={{ borderBottom: '1px dotted #ccc' }}>
                <span style={{ fontWeight: 600, color: '#333', width: '45%' }}>Edición:</span>
                <span style={{ color: '#555', textAlign: 'right', flex: 1 }}>Obra Única Original</span>
              </div>
            </>
          )}
        </div>

        {/* ========== PIE DE PÁGINA ========== */}

        {/* Fecha y Firma */}
        <div className="flex justify-between items-end mt-4 pt-3" style={{ fontSize: '7px', borderTop: '1px solid #eee' }}>
          {/* Fecha */}
          <div>
            <span style={{ color: '#333', fontWeight: 500 }}>FECHA: </span>
            <span className="blur-[2px] select-none" style={{ color: '#666' }}>XX de XXXX de 20XX</span>
          </div>

          {/* Firma */}
          <div className="text-right">
            <div style={{ width: '70px', borderTop: '1px solid #333', marginBottom: '3px' }} />
            <p style={{ fontWeight: 600, color: '#333', fontSize: '8px', margin: 0 }}>Myriam Alcaraz</p>
            <p style={{ color: '#888', fontSize: '6px', fontStyle: 'italic', margin: 0 }}>Pintura Figurativa Contemporánea</p>
          </div>
        </div>

        {/* Contacto */}
        <div className="flex justify-center items-center gap-3 mt-3 pt-2" style={{ fontSize: '6px', color: '#999' }}>
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
