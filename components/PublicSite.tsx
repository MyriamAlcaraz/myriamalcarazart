// ARCHIVO: ./components/PublicSite.tsx
// ... (Al principio, después de las importaciones y la interfaz PublicSiteProps)

// =======================================================
// 🛑 INSERTA ESTE BLOQUE: LÓGICA DE GENERACIÓN DE HTML DEL CERTIFICADO (PARA DEMO)
// Necesario para que App.tsx pueda mostrar la demo bonita
// =======================================================

interface DemoArtwork {
  title: string;
  certificationDate: string; // YYYY-MM-DD
  seriesIndex: number | null;
  seriesTotal: number | null;
  code: string | null;
  image: string; // URL
  dimensions: string; 
  technique: string; 
  isOpenSeries: boolean; 
}

interface DemoSettings {
  artistName: string;
  artistTitle: string;
  website: string;
  email: string;
  instagram: string;
}

// 🛑 DATOS DE CONFIGURACIÓN DE LA ARTISTA (Usando ARTIST_INFO importado)
const DEMO_SETTINGS: DemoSettings = {
    artistName: ARTIST_INFO.name, 
    artistTitle: ARTIST_INFO.tagline, // Usamos tagline como título artístico
    website: ARTIST_INFO.website,
    email: ARTIST_INFO.email,
    instagram: ARTIST_INFO.instagram,
};

// 🛑 DATOS DE LA OBRA DE DEMOSTRACIÓN (Obra de ejemplo)
const DEMO_ARTWORK: DemoArtwork = {
    title: "El Alma de Mónaco",
    certificationDate: "2025-11-20", 
    seriesIndex: 1,
    seriesTotal: 50,
    code: "MA-GCL-MNC-001",
    image: "/artworks/alma-monaco.jpg",
    dimensions: "60 x 60 cm", 
    technique: "Giclée Fine Art sobre Canvas",
    isOpenSeries: false,
};

// 🛑 FUNCIÓN CLAVE: La exportamos para usarla en App.tsx
export const getCertificateDemoHtmlContent = (
  artwork: DemoArtwork = DEMO_ARTWORK, 
  settings: DemoSettings = DEMO_SETTINGS
): string => {
  const currentDate = new Date().toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });
  
  const seriesInfo = artwork.isOpenSeries 
    ? "Edición Abierta (Open Edition)" 
    : artwork.seriesIndex !== null && artwork.seriesTotal !== null 
      ? `Edición Limitada ${artwork.seriesIndex} / ${artwork.seriesTotal}` 
      : "Obra Única (Original)";

  const seriesCode = artwork.isOpenSeries
      ? artwork.code
      : artwork.seriesIndex !== null
          ? artwork.code?.replace(/0+$/, artwork.seriesIndex.toString().padStart(3, '0'))
          : artwork.code;

  return `
    <html>
    <head>
      <title>Certificado Demo</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;700&display=swap');
        body { margin: 0; padding: 0; font-family: 'Roboto', sans-serif; color: #1e293b; background-color: #f8f8f8; }
        .certificate-container { 
            width: 210mm; min-height: 297mm; padding: 20mm; margin: 0 auto; 
            box-shadow: 0 0 10px rgba(0,0,0,0.1); background-color: white; 
            position: relative; 
        }
        .border-frame { 
            border: 2px solid #a1804f; height: calc(100% - 30mm); padding: 15mm; 
            position: relative; display: flex; flex-direction: column; justify-content: space-between; 
        }
        .header { text-align: center; margin-bottom: 25mm; }
        .title { 
            font-family: 'Playfair Display', serif; font-size: 32pt; font-weight: 700; color: #0f172a; 
            letter-spacing: 2px; text-transform: uppercase; line-height: 1.1; 
        }
        .subtitle { font-size: 10pt; letter-spacing: 3px; color: #a1804f; text-transform: uppercase; margin-top: 5px; font-weight: 400; }
        .section-title { font-family: 'Playfair Display', serif; font-size: 14pt; font-weight: 700; color: #0f172a; margin-bottom: 10px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
        .metadata-grid { display: flex; justify-content: space-between; gap: 20px; margin-bottom: 15mm; }
        .meta-item { width: 50%; }
        .meta-label { font-size: 9pt; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 3px; }
        .meta-value { font-size: 11pt; color: #1e293b; font-weight: 400; }
        .artwork-details { display: flex; gap: 30px; margin-bottom: 20mm; }
        .artwork-image-container { flex: 1; text-align: center; }
        .artwork-image { max-width: 100%; height: 250px; object-fit: contain; border: 1px solid #e2e8f0; padding: 10px; }
        .declaration { font-size: 10pt; color: #475569; font-style: italic; margin-bottom: 20mm; line-height: 1.5; text-align: justify;}
        .footer-content { display: flex; justify-content: space-between; padding: 0 10mm; align-items: flex-end; }
        .signature-block { text-align: center; width: 150pt; }
        .signature-line { height: 60pt; border-bottom: 1px solid #0f172a; margin-bottom: 5pt; background: url('/signature-demo.png') center bottom / contain no-repeat; }
        .signature-label { font-size: 8pt; text-transform: uppercase; font-weight: 700; color: #0f172a; }
        .date-block { text-align: center; width: 150pt; }
        .date-value { height: 60pt; margin-bottom: 5pt; display: flex; align-items: flex-end; justify-content: center; font-family: 'Playfair Display', serif; font-size: 14pt; font-weight: 400; color: #475569;}
        .seal-block { width: 100pt; height: 100pt; background: url('/logo-seal-demo.svg') center center / 80pt no-repeat; opacity: 0.3; }
        .stamp-block { width: 100pt; height: 100pt; background: url('/seal-demo.png') center center / contain no-repeat; opacity: 0.8; }
        
        .contact-info { position: absolute; bottom: 5mm; left: 0; right: 0; text-align: center; font-size: 8pt; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="certificate-container">
        <div class="border-frame">
          
          <header class="header">
            <h1 class="title">CERTIFICADO DE AUTENTICIDAD</h1>
            <h2 class="subtitle">${settings.artistName} - ${settings.artistTitle}</h2>
          </header>

          <main>
            <div class="section-title">Detalles de la Obra</div>
            
            <div class="metadata-grid">
              <div class="meta-item">
                <div class="meta-label">Título</div>
                <div class="meta-value">${artwork.title}</div>
              </div>
              <div class="meta-item">
                <div class="meta-label">ID de Certificado</div>
                <div class="meta-value" style="font-weight: 700; color: #a1804f;">${seriesCode || 'N/A'}</div>
              </div>
            </div>

            <div class="metadata-grid">
              <div class="meta-item">
                <div class="meta-label">Técnica</div>
                <div class="meta-value">${artwork.technique}</div>
              </div>
              <div class="meta-item">
                <div class="meta-label">Dimensiones</div>
                <div class="meta-value">${artwork.dimensions}</div>
              </div>
            </div>

            <div class="metadata-grid">
              <div class="meta-item">
                <div class="meta-label">Tipo de Edición</div>
                <div class="meta-value">${seriesInfo}</div>
              </div>
              <div class="meta-item">
                <div class="meta-label">Fecha de Certificación</div>
                <div class="meta-value">${artwork.certificationDate}</div>
              </div>
            </div>

            <div class="artwork-details">
              <div class="artwork-image-container">
                <img src="${artwork.image}" alt="${artwork.title}" class="artwork-image"/>
                <p style="font-size: 8pt; color: #64748b; font-style: italic; margin-top: 5pt;">Fotografía de Referencia</p>
              </div>
            </div>

            <div class="section-title">Declaración de Autenticidad</div>
            <p class="declaration">
              Este Certificado de Autenticidad declara que la obra descrita arriba es una creación original de ${settings.artistName}. La obra ha sido inspeccionada y aprobada personalmente por la artista.<br/>
              La imagen de referencia está sellada y archivada en nuestro inventario. Todos los derechos de autor y reproducción quedan reservados por la artista.
            </p>
          </main>
          
          <div class="footer-content">
            <div class="date-block">
              <div class="date-value">${currentDate}</div>
              <div class="signature-line" style="border-bottom: none; height: 10pt;"></div>
              <p class="signature-label">Fecha de Emisión</p>
            </div>
            
            <div class="stamp-block" title="Sello Seco Digital"></div>
            
            <div class="signature-block">
              <div class="signature-line"></div>
              <p class="signature-label">Firma de la Artista</p>
            </div>
          </div>
          
          <div class="contact-info">
            ${settings.website} | ${settings.email} | ${settings.instagram}
          </div>

        </div>
      </div>
    </body>
    </html>
  `;
};

// =======================================================
// 🛑 FIN DEL BLOQUE AÑADIDO
// =======================================================

// ... (El resto del código de PublicSite.tsx)