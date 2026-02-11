// ============================================
// CERTIFICADO DE AUTENTICIDAD - VISTA PREVIA
// Modelo final según especificaciones
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

  // Para GICLÉE
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
  // Determinar si es Giclée por la presencia de hologramNumber o el flag isGiclee
  const esGiclee = isGiclee || !!hologramNumber;

  // ID por defecto para obra original
  const idDefault = `MA-${año}-${titulo.substring(0, 2).toUpperCase()}1/1`;

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-2xl bg-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Barra dorada lateral izquierda */}
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '10px', backgroundColor: '#c5a059' }}
      />

      {/* Contenido */}
      <div className="pl-5 pr-4 py-4">

        {/* ========== ENCABEZADO ========== */}

        {/* Logo */}
        <div className="text-center mb-2">
          <img
            src="/logo-myriam.png"
            alt="Myriam Alcaraz"
            className="mx-auto"
            style={{ maxWidth: '40px', height: 'auto' }}
          />
        </div>

        {/* Lema */}
        <p
          className="text-center mb-2"
          style={{
            fontSize: '5px',
            letterSpacing: '2px',
            color: '#999',
            fontWeight: 400
          }}
        >
          ARTE CON ALMA Y SOFISTICACIÓN
        </p>

        {/* Título del Certificado */}
        <h2
          className="text-center mb-2"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '12px',
            letterSpacing: '2px',
            fontWeight: 400,
            color: '#333',
            lineHeight: 1.2
          }}
        >
          CERTIFICADO DE<br />AUTENTICIDAD
        </h2>

        {/* Línea decorativa */}
        <div className="mx-auto mb-2" style={{ width: '70%', height: '1px', backgroundColor: '#c5a059' }} />

        {/* ========== TEXTO LEGAL (CONDICIONAL) ========== */}
        <p className="text-center mb-2" style={{ fontSize: '6px', lineHeight: 1.4, color: '#666' }}>
          {esGiclee ? (
            <>Por la presente se certifica que la reproducción Giclée descrita a continuación es una impresión autorizada y numerada. Todos los derechos de autor están reservados por la artista:</>
          ) : (
            <>Por la presente se certifica que la obra de arte descrita a continuación es una creación original y auténtica. Todos los derechos de autor están reservados por la artista:</>
          )}
        </p>

        {/* Nombre de la artista */}
        <p className="text-center mb-0" style={{ fontFamily: "'Playfair Display', serif", fontSize: '11px', fontWeight: 600, color: '#333' }}>
          Myriam Alcaraz
        </p>
        <p className="text-center mb-2" style={{ fontSize: '6px', color: '#888', fontStyle: 'italic' }}>
          Pintura Figurativa Contemporánea
        </p>

        {/* Imagen de la obra */}
        {imagen && (
          <div className="text-center mb-2">
            <div className="mx-auto inline-block p-1" style={{ backgroundColor: '#f8f8f8', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
              <img src={imagen} alt={titulo} style={{ maxHeight: '60px', width: 'auto', objectFit: 'contain' }} />
            </div>
          </div>
        )}

        {/* ========== CAMPOS DE DATOS (CONDICIONAL) ========== */}
        <div className="space-y-0.5 mb-2" style={{ fontSize: '7px' }}>

          {esGiclee ? (
            /* ========== CAMPOS PARA GICLÉE ========== */
            <>
              <DataRow label="Título de la Obra:" value={titulo} />
              <DataRow label="Técnica Original:" value={tecnicaOriginal || tecnica || 'Óleo sobre tela'} />
              <DataRow label="Medidas Original:" value={medidasOriginal || dimensiones || ''} />
              <DataRow label="Medidas Impresión:" value={medidasImpresion || ''} />
              <DataRow label="Soporte:" value="Papel Hahnemühle Textured - William Turner" small />
              <DataRow label="ID de Referencia:" value={idReferencia || ''} mono blur={!idReferencia} />
              <DataRow label="Edición:" value={edicion || '1/10'} blur={!edicion} />
              <DataRow label="Nº Holograma:" value={hologramNumber || ''} highlight blur={!hologramNumber} />
            </>
          ) : (
            /* ========== CAMPOS PARA OBRA ORIGINAL ========== */
            <>
              <DataRow label="Título:" value={titulo} />
              <DataRow label="Año de Creación:" value={String(año)} />
              <DataRow label="Medidas:" value={dimensiones || ''} />
              <DataRow label="Técnica/Medio:" value={tecnica || 'Óleo sobre lienzo'} />
              <DataRow label="ID de Referencia:" value={idReferencia || idDefault} mono blur />
              <DataRow label="Edición:" value="Obra Única Original" />
            </>
          )}
        </div>

        {/* ========== PIE DE PÁGINA ========== */}

        {/* Fecha y Firma */}
        <div className="flex justify-between items-end mt-3 pt-2" style={{ fontSize: '6px', borderTop: '1px solid #eee' }}>
          <div>
            <span style={{ color: '#333', fontWeight: 500 }}>FECHA: </span>
            <span className="blur-[2px] select-none" style={{ color: '#666' }}>XX de XXXX de 20XX</span>
          </div>
          <div className="text-right">
            <div style={{ width: '60px', borderTop: '1px solid #333', marginBottom: '2px' }} />
            <p style={{ fontWeight: 600, color: '#333', fontSize: '7px', margin: 0 }}>Myriam Alcaraz</p>
            <p style={{ color: '#888', fontSize: '5px', fontStyle: 'italic', margin: 0 }}>Pintura Figurativa Contemporánea</p>
          </div>
        </div>

        {/* Contacto */}
        <div className="flex justify-center items-center gap-2 mt-2 pt-1" style={{ fontSize: '5px', color: '#aaa' }}>
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

// Componente auxiliar para las filas de datos
interface DataRowProps {
  label: string;
  value: string;
  mono?: boolean;
  small?: boolean;
  highlight?: boolean;
  blur?: boolean;
}

const DataRow: React.FC<DataRowProps> = ({ label, value, mono, small, highlight, blur }) => (
  <div className="flex items-baseline" style={{ borderBottom: '1px dotted #ddd', paddingBottom: '2px' }}>
    <span style={{ fontWeight: 600, color: highlight ? '#c5a059' : '#444', width: '42%', fontSize: small ? '6px' : undefined }}>
      {label}
    </span>
    <span
      className={blur && !value ? 'blur-[2px] select-none' : ''}
      style={{
        color: highlight ? '#c5a059' : '#555',
        textAlign: 'right',
        flex: 1,
        fontFamily: mono ? 'monospace' : undefined,
        fontSize: small ? '6px' : mono ? '6px' : undefined,
        fontWeight: highlight ? 600 : undefined
      }}
    >
      {value || (blur ? 'XXXXXXXX' : '—')}
    </span>
  </div>
);

export default CertificatePreview;
