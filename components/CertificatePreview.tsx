// ============================================
// CERTIFICADO DE AUTENTICIDAD
// RÉPLICA EXACTA de los PDFs 287213-287216
// Marco dorado, tipografía elegante, proporción A4
// ============================================

import React from 'react';

interface CertificatePreviewProps {
  titulo: string;
  imagen?: string;
  año?: number;
  dimensiones?: string;
  tecnica?: string;
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
  const esGiclee = isGiclee || !!hologramNumber || !!medidasImpresion;

  return (
    <div
      style={{
        aspectRatio: '210 / 297',
        backgroundColor: '#fff',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Montserrat', sans-serif"
      }}
    >
      {/* MARCO DORADO LATERAL IZQUIERDO */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '5%',
          backgroundColor: '#c5a059'
        }}
      />

      {/* CONTENIDO */}
      <div
        style={{
          position: 'absolute',
          top: '4%',
          bottom: '3%',
          left: '8%',
          right: '5%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* LOGO */}
        <div style={{ textAlign: 'center', marginBottom: '2%' }}>
          <img
            src="/logo-myriam.png"
            alt="Myriam Alcaraz"
            style={{ height: '32px', width: 'auto' }}
          />
        </div>

        {/* LEMA */}
        <p style={{
          textAlign: 'center',
          fontSize: '5px',
          letterSpacing: '2.5px',
          color: '#777',
          marginBottom: '3%'
        }}>
          ARTE CON ALMA Y SOFISTICACIÓN
        </p>

        {/* TÍTULO PRINCIPAL */}
        <h1 style={{
          textAlign: 'center',
          fontFamily: "'Cinzel', serif",
          fontSize: '13px',
          fontWeight: 400,
          letterSpacing: '4px',
          color: '#1a1a1a',
          lineHeight: 1.3,
          marginBottom: '2%'
        }}>
          CERTIFICADO DE<br/>AUTENTICIDAD
        </h1>

        {/* LÍNEA DORADA */}
        <div style={{
          width: '75%',
          height: '1px',
          backgroundColor: '#c5a059',
          margin: '0 auto 3%'
        }} />

        {/* TEXTO LEGAL */}
        <p style={{
          textAlign: 'center',
          fontSize: '5.5px',
          lineHeight: 1.7,
          color: '#555',
          marginBottom: '2%',
          padding: '0 5%'
        }}>
          {esGiclee
            ? 'Por la presente se certifica que la reproducción Giclée descrita a continuación es una impresión autorizada y numerada. Todos los derechos de autor están reservados por la artista:'
            : 'Por la presente se certifica que la obra de arte descrita a continuación es una creación original y auténtica. Todos los derechos de autor están reservados por la artista:'
          }
        </p>

        {/* NOMBRE ARTISTA */}
        <p style={{
          textAlign: 'center',
          fontFamily: "'Playfair Display', serif",
          fontSize: '12px',
          fontWeight: 600,
          color: '#1a1a1a',
          marginBottom: '1px'
        }}>
          Myriam Alcaraz
        </p>
        <p style={{
          textAlign: 'center',
          fontSize: '5px',
          color: '#777',
          fontStyle: 'italic',
          marginBottom: '3%'
        }}>
          Pintura Figurativa Contemporánea
        </p>

        {/* IMAGEN DE LA OBRA */}
        {imagen && (
          <div style={{ textAlign: 'center', marginBottom: '3%' }}>
            <div style={{
              display: 'inline-block',
              padding: '2px',
              backgroundColor: '#f5f5f5',
              boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
            }}>
              <img
                src={imagen}
                alt={titulo}
                style={{ height: '50px', width: 'auto', display: 'block' }}
              />
            </div>
          </div>
        )}

        {/* TABLA DE DATOS */}
        <div style={{ flex: 1, padding: '0 3%' }}>
          {esGiclee ? (
            <>
              <DataRow label="Título de la Obra:" value={titulo} />
              <DataRow label="Técnica Original:" value={tecnicaOriginal || tecnica || 'Óleo sobre tela'} />
              <DataRow label="Medidas Original:" value={medidasOriginal || dimensiones || '—'} />
              <DataRow label="Medidas Impresión:" value={medidasImpresion || 'Tamaño original'} />
              <DataRow label="Soporte:" value="Papel Hahnemühle Textured - William Turner" small />
              <DataRow label="ID de Referencia:" value={idReferencia || 'MA-2026-GC-XX-01/10'} mono />
              <DataRow label="Edición:" value={edicion || '1/10'} />
              <DataRow label="Nº Holograma:" value={hologramNumber || 'Pendiente'} gold />
            </>
          ) : (
            <>
              <DataRow label="Título:" value={titulo} />
              <DataRow label="Año de Creación:" value={String(año)} />
              <DataRow label="Medidas:" value={dimensiones || '—'} />
              <DataRow label="Técnica/Medio:" value={tecnica || 'Óleo sobre lienzo'} />
              <DataRow label="ID de Referencia:" value={`MA-${año}-${titulo.substring(0,2).toUpperCase()}1/1`} mono />
              <DataRow label="Edición:" value="Obra Única Original" />
              <DataRow label="Nº Holograma:" value="Incluido con la obra" gold />
            </>
          )}
        </div>

        {/* FECHA Y FIRMA */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginTop: 'auto',
          padding: '0 3%'
        }}>
          <div style={{ fontSize: '5px', color: '#333' }}>
            <span style={{ fontWeight: 600 }}>FECHA: </span>
            <span>10 de febrero de 2026</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ width: '55px', borderTop: '1px solid #333', marginBottom: '2px' }} />
            <p style={{ fontSize: '6px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Myriam Alcaraz</p>
            <p style={{ fontSize: '4px', color: '#777', fontStyle: 'italic', margin: 0 }}>Pintura Figurativa Contemporánea</p>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{
          textAlign: 'center',
          fontSize: '4px',
          color: '#999',
          marginTop: '2%',
          paddingTop: '2%',
          borderTop: '1px solid #eee'
        }}>
          myriamalcaraz.com &nbsp;•&nbsp; myriamhotmail@hotmail.com &nbsp;•&nbsp; @myriamalcaraz.artist
        </div>
      </div>
    </div>
  );
};

// Fila de datos con estilo elegante
const DataRow: React.FC<{
  label: string;
  value: string;
  mono?: boolean;
  small?: boolean;
  gold?: boolean;
}> = ({ label, value, mono, small, gold }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderBottom: '1px dotted #ccc',
    padding: '2.5px 0',
    fontSize: small ? '5px' : '6px'
  }}>
    <span style={{
      fontWeight: 600,
      color: gold ? '#c5a059' : '#333'
    }}>
      {label}
    </span>
    <span style={{
      color: gold ? '#c5a059' : '#444',
      fontFamily: mono ? "'Courier New', monospace" : 'inherit',
      fontSize: mono ? '5px' : (small ? '5px' : '6px'),
      fontWeight: gold ? 600 : 400,
      textAlign: 'right'
    }}>
      {value}
    </span>
  </div>
);

export default CertificatePreview;
