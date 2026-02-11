// ============================================
// CERTIFICADO DE AUTENTICIDAD - RÉPLICA EXACTA DEL PDF
// Basado en: 287216 Certificado Giclée GRANDE - Sara bajo la farola.pdf
// ============================================

import React from 'react';

interface CertificatePreviewProps {
  titulo: string;
  imagen?: string;
  año?: number;
  dimensiones?: string;
  tecnica?: string;
  // Giclée
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
  const fechaActual = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div
      className="bg-white relative"
      style={{
        aspectRatio: '210 / 297',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '10px'
      }}
    >
      {/* BARRA DORADA LATERAL IZQUIERDA */}
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '4%', backgroundColor: '#c5a059' }}
      />

      {/* CONTENIDO PRINCIPAL */}
      <div className="absolute inset-0 pl-[8%] pr-[5%] py-[5%] flex flex-col">

        {/* LOGO */}
        <div className="text-center mb-[2%]">
          <img
            src="/logo-myriam.png"
            alt="Myriam Alcaraz"
            className="mx-auto"
            style={{ height: '8%', width: 'auto', maxHeight: '40px' }}
          />
        </div>

        {/* LEMA */}
        <p
          className="text-center"
          style={{
            fontSize: '0.5em',
            letterSpacing: '0.3em',
            color: '#666',
            marginBottom: '3%'
          }}
        >
          ARTE CON ALMA Y SOFISTICACIÓN
        </p>

        {/* TÍTULO PRINCIPAL */}
        <h1
          className="text-center"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '1.8em',
            letterSpacing: '0.15em',
            color: '#222',
            lineHeight: 1.2,
            marginBottom: '2%'
          }}
        >
          CERTIFICADO DE<br />AUTENTICIDAD
        </h1>

        {/* LÍNEA DORADA */}
        <div
          className="mx-auto"
          style={{
            width: '80%',
            height: '1px',
            backgroundColor: '#c5a059',
            marginBottom: '3%'
          }}
        />

        {/* TEXTO LEGAL */}
        <p
          className="text-center"
          style={{
            fontSize: '0.7em',
            lineHeight: 1.6,
            color: '#444',
            marginBottom: '2%',
            padding: '0 5%'
          }}
        >
          {esGiclee
            ? 'Por la presente se certifica que la reproducción Giclée descrita a continuación es una impresión autorizada y numerada. Todos los derechos de autor están reservados por la artista:'
            : 'Por la presente se certifica que la obra de arte descrita a continuación es una creación original y auténtica. Todos los derechos de autor están reservados por la artista:'
          }
        </p>

        {/* NOMBRE DE LA ARTISTA */}
        <p
          className="text-center"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.4em',
            fontWeight: 600,
            color: '#222',
            marginBottom: '0.5%'
          }}
        >
          Myriam Alcaraz
        </p>
        <p
          className="text-center"
          style={{
            fontSize: '0.65em',
            color: '#666',
            fontStyle: 'italic',
            marginBottom: '3%'
          }}
        >
          Pintura Figurativa Contemporánea
        </p>

        {/* IMAGEN DE LA OBRA */}
        {imagen && (
          <div className="text-center" style={{ marginBottom: '3%' }}>
            <div
              className="inline-block p-[2px]"
              style={{ backgroundColor: '#f0f0f0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            >
              <img
                src={imagen}
                alt={titulo}
                style={{ height: '60px', width: 'auto', display: 'block' }}
              />
            </div>
          </div>
        )}

        {/* TABLA DE DATOS TÉCNICOS */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <div style={{ padding: '0 8%' }}>
            {esGiclee ? (
              // GICLÉE - 8 filas exactas
              <>
                <DataRow label="Título de la Obra:" value={titulo} />
                <DataRow label="Técnica Original:" value={tecnicaOriginal || tecnica || 'Óleo sobre tela'} />
                <DataRow label="Medidas Original:" value={medidasOriginal || dimensiones || '—'} />
                <DataRow label="Medidas Impresión:" value={medidasImpresion || 'Tamaño original'} />
                <DataRow label="Soporte:" value="Papel Hahnemühle Textured - William Turner" />
                <DataRow label="ID de Referencia:" value={idReferencia || 'MA-2026-GC-XX-01/10'} mono />
                <DataRow label="Edición:" value={edicion || '1/10'} />
                <DataRow label="Nº Holograma:" value={hologramNumber || 'Pendiente'} highlight />
              </>
            ) : (
              // OBRA ORIGINAL - 6 filas
              <>
                <DataRow label="Título:" value={titulo} />
                <DataRow label="Año de Creación:" value={String(año)} />
                <DataRow label="Medidas:" value={dimensiones || '—'} />
                <DataRow label="Técnica/Medio:" value={tecnica || 'Óleo sobre lienzo'} />
                <DataRow label="ID de Referencia:" value={`MA-${año}-${titulo.substring(0,2).toUpperCase()}1/1`} mono />
                <DataRow label="Edición:" value="Obra Única Original" />
                <DataRow label="Nº Holograma:" value="Incluido con la obra" highlight />
              </>
            )}
          </div>
        </div>

        {/* FECHA Y FIRMA */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: '0 8%',
            marginTop: 'auto',
            marginBottom: '3%'
          }}
        >
          {/* Fecha */}
          <div style={{ fontSize: '0.7em', color: '#333' }}>
            <span style={{ fontWeight: 600 }}>FECHA: </span>
            <span>{fechaActual}</span>
          </div>

          {/* Firma */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ width: '80px', borderTop: '1px solid #333', marginBottom: '4px' }} />
            <p style={{ fontSize: '0.8em', fontWeight: 600, color: '#222', margin: 0 }}>Myriam Alcaraz</p>
            <p style={{ fontSize: '0.55em', color: '#666', fontStyle: 'italic', margin: 0 }}>Pintura Figurativa Contemporánea</p>
          </div>
        </div>

        {/* FOOTER CON CONTACTO */}
        <div
          style={{
            textAlign: 'center',
            fontSize: '0.5em',
            color: '#888',
            borderTop: '1px solid #eee',
            paddingTop: '2%'
          }}
        >
          <span>myriamalcaraz.com</span>
          <span style={{ margin: '0 8px' }}>•</span>
          <span>myriamhotmail@hotmail.com</span>
          <span style={{ margin: '0 8px' }}>•</span>
          <span>@myriamalcaraz.artist</span>
        </div>
      </div>
    </div>
  );
};

// Componente para cada fila de datos
const DataRow: React.FC<{
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
}> = ({ label, value, mono, highlight }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      borderBottom: '1px dotted #ccc',
      padding: '4px 0',
      fontSize: '0.75em'
    }}
  >
    <span style={{
      fontWeight: 600,
      color: highlight ? '#c5a059' : '#333',
      flexShrink: 0
    }}>
      {label}
    </span>
    <span style={{
      color: highlight ? '#c5a059' : '#555',
      textAlign: 'right',
      fontFamily: mono ? 'monospace' : 'inherit',
      fontWeight: highlight ? 600 : 400,
      fontSize: mono ? '0.9em' : '1em'
    }}>
      {value}
    </span>
  </div>
);

export default CertificatePreview;
