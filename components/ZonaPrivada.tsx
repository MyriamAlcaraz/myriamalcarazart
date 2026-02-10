import React, { useState } from 'react';
import { ArrowLeft, Download, FileSpreadsheet, Shield, Lock, Eye, EyeOff, Printer } from 'lucide-react';

// ============================================
// BASE DE DATOS DE OBRAS - DATOS REALES DE RAÚL
// ============================================
interface Obra {
  id: string;
  titulo: string;
  referencia: string;
  holograma: string;
  papelImpresion: string;
  dimensionesOriginal: string;
  dimensionesBastidor: string;
  tipoPapel: string;
  serie: string;
  copiasTotales: number;
  copiasVendidas: number;
}

const OBRAS_DB: Obra[] = [
  {
    id: 'joven-vela',
    titulo: 'Joven con vela',
    referencia: 'MA-2025-JV1',
    holograma: '287213',
    papelImpresion: '30x40',
    dimensionesOriginal: '40x30',
    dimensionesBastidor: '42x32',
    tipoPapel: 'Hahnemühle Photo Rag 308gsm',
    serie: 'PEQUEÑO',
    copiasTotales: 10,
    copiasVendidas: 0
  },
  {
    id: 'sara-marquesina',
    titulo: 'Sara marquesina',
    referencia: 'MA-2025-SA-M1',
    holograma: '287214',
    papelImpresion: '50x61.5',
    dimensionesOriginal: '100x81',
    dimensionesBastidor: '102x83',
    tipoPapel: 'Hahnemühle Photo Rag 308gsm',
    serie: 'MEDIANO',
    copiasTotales: 10,
    copiasVendidas: 0
  },
  {
    id: 'laura-crepusculo',
    titulo: 'Laura crepúsculo',
    referencia: 'MA-2025-LA1',
    holograma: '287215',
    papelImpresion: '50x61.5',
    dimensionesOriginal: '100x81',
    dimensionesBastidor: '102x83',
    tipoPapel: 'Hahnemühle Photo Rag 308gsm',
    serie: 'MEDIANO',
    copiasTotales: 10,
    copiasVendidas: 0
  },
  {
    id: 'sara-farola',
    titulo: 'Sara farola',
    referencia: 'MA-2025-SA1',
    holograma: '287216',
    papelImpresion: '60x93.3',
    dimensionesOriginal: '100x81',
    dimensionesBastidor: '102x83',
    tipoPapel: 'Hahnemühle Photo Rag 308gsm',
    serie: 'GRANDE',
    copiasTotales: 10,
    copiasVendidas: 0
  }
];

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const ZonaPrivada: React.FC = () => {
  const [obras, setObras] = useState<Obra[]>(OBRAS_DB);
  const [generando, setGenerando] = useState<string | null>(null);
  const [accesoPermitido, setAccesoPermitido] = useState(false);
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);

  // Verificar acceso
  const verificarAcceso = () => {
    if (password === 'Myriam2025') {
      setAccesoPermitido(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  // Generar e imprimir certificado
  const generarCertificadoPDF = (obra: Obra) => {
    setGenerando(obra.id);
    
    setTimeout(() => {
      const siguienteCopia = obra.copiasVendidas + 1;
      
      const pdfContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Certificado de Autenticidad - ${obra.titulo}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Cormorant+Garamond:wght@300;400;600&display=swap');
    
    body {
      font-family: 'Cormorant Garamond', serif;
      line-height: 1.6;
      color: #2c3e50;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 30px;
      background: #fafafa;
    }
    
    .header {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 2px solid #d4af37;
      padding-bottom: 15px;
    }
    
    .titulo {
      font-family: 'Playfair Display', serif;
      font-size: 24px;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 8px;
    }
    
    .subtitulo {
      font-size: 16px;
      color: #666;
      font-weight: 300;
    }
    
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .info-section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .info-title {
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      font-weight: 600;
      color: #d4af37;
      margin-bottom: 15px;
      border-bottom: 1px solid #eee;
      padding-bottom: 8px;
    }
    
    .info-item {
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .info-label {
      font-weight: 600;
      color: #555;
      font-size: 14px;
    }
    
    .info-value {
      font-weight: 400;
      color: #2c3e50;
      font-size: 14px;
    }
    
    .imagen-container {
      text-align: center;
      background: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .imagen-placeholder {
      width: 100%;
      max-width: 180px;
      height: 120px;
      background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      font-style: italic;
      font-size: 12px;
    }
    
    .legal {
      background: #f8f8f8;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #d4af37;
      margin-bottom: 20px;
      grid-column: 1 / -1;
    }
    
    .legal-text {
      font-size: 13px;
      line-height: 1.6;
      color: #555;
    }
    
    .firma {
      text-align: right;
      margin-top: 20px;
      grid-column: 1 / -1;
    }
    
    .firma-linea {
      border-bottom: 1px solid #999;
      width: 200px;
      margin-left: auto;
      margin-bottom: 5px;
    }
    
    .firma-texto {
      font-size: 12px;
      color: #666;
    }
    
    .numeracion {
      position: absolute;
      top: 30px;
      right: 30px;
      background: #d4af37;
      color: white;
      padding: 6px 12px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 12px;
    }
    
    .edicion-limitada {
      background: linear-gradient(135deg, #d4af37 0%, #f4e4c1 100%);
      color: #1a1a1a;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 12px;
      text-align: center;
      margin-bottom: 15px;
    }
    
    @media print {
      body { 
        padding: 20px; 
        font-size: 12px;
      }
      .numeracion { 
        position: fixed; 
        top: 20px;
        right: 20px;
      }
      .content {
        grid-template-columns: 1fr;
        gap: 15px;
      }
      .imagen-placeholder {
        max-width: 120px;
        height: 80px;
      }
    }
  </style>
</head>
<body>
  <div class="numeracion">${siguienteCopia}/${obra.copiasTotales}</div>
  
  <div class="header">
    <div class="titulo">CERTIFICADO DE AUTENTICIDAD</div>
    <div class="subtitulo">Myriam Alcaraz - Artista Plástica</div>
  </div>
  
  <div class="edicion-limitada">
    EDICIÓN LIMITADA 1/10
  </div>
  
  <div class="content">
    <div class="info-section">
      <div class="info-title">Información de la Obra</div>
      
      <div class="info-item">
        <span class="info-label">Título:</span>
        <span class="info-value">${obra.titulo}</span>
      </div>
      
      <div class="info-item">
        <span class="info-label">Referencia:</span>
        <span class="info-value">${obra.referencia}</span>
      </div>
      
      <div class="info-item">
        <span class="info-label">Año:</span>
        <span class="info-value">2025</span>
      </div>
      
      <div class="info-item">
        <span class="info-label">Serie:</span>
        <span class="info-value">${obra.serie}</span>
      </div>
    </div>
    
    <div class="imagen-container">
      <div class="imagen-placeholder">
        ${obra.titulo}
      </div>
    </div>
    
    <div class="info-section">
      <div class="info-title">Especificaciones Técnicas</div>
      
      <div class="info-item">
        <span class="info-label">Medida Original (Bastidor):</span>
        <span class="info-value">${obra.dimensionesBastidor} cm</span>
      </div>
      
      <div class="info-item">
        <span class="info-label">Medida Impresión (Raúl):</span>
        <span class="info-value">${obra.papelImpresion} cm</span>
      </div>
      
      <div class="info-item">
        <span class="info-label">Holograma Hahnemühle:</span>
        <span class="info-value">${obra.holograma}</span>
      </div>
      
      <div class="info-item">
        <span class="info-label">Tipo de Papel:</span>
        <span class="info-value">100% Algodón</span>
      </div>
      
      <div class="info-item">
        <span class="info-label">Calidad:</span>
        <span class="info-value">${obra.tipoPapel}</span>
      </div>
    </div>
  </div>
  
  <div class="legal">
    <div class="legal-text">
      <strong>Declaración de Autenticidad:</strong><br>
      Este certificado garantiza que la impresión Giclée "${obra.titulo}" es una reproducción 
      de calidad archivo sobre papel 100% algodón, realizada bajo la supervisión directa de la artista. 
      Esta es una EDICIÓN LIMITADA de 1/10 copias, numerada y firmada, asegurando su valor 
      como pieza de colección. El holograma Hahnemühle Nº${obra.holograma} certifica la autenticidad 
      del papel y la procedencia de la impresión según las especificaciones de Raúl.
    </div>
  </div>
  
  <div class="firma">
    <div class="firma-linea"></div>
    <div class="firma-texto">Myriam Alcaraz - ${new Date().toLocaleDateString('es-ES')}</div>
  </div>
</body>
</html>
      `;

      // Crear blob y descargar
      const blob = new Blob([pdfContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Certificado_${obra.referencia}_${siguienteCopia}de${obra.copiasTotales}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      // Actualizar contador de copias vendidas
      setObras(prev => prev.map(o => 
        o.id === obra.id 
          ? { ...o, copiasVendidas: o.copiasVendidas + 1 }
          : o
      ));

      // Auto-imprimir después de generar
      setTimeout(() => {
        window.print();
      }, 1000);

      setGenerando(null);
    }, 2000);
  };

  // Exportar registro completo a Excel/CSV
  const exportarRegistroCompleto = () => {
    const fechaActual = new Date().toLocaleDateString('es-ES');
    
    const csvContent = [
      // Encabezados detallados
      [
        'Referencia Completa',
        'Título de la Obra',
        'Serie (por tamaño)',
        'Nº de Holograma',
        'Numeración (X/10)',
        'Medidas de Impresión',
        'Dimensiones Original',
        'Dimensiones Bastidor',
        'Tipo de Papel',
        'Copias Totales',
        'Copias Vendidas',
        'Copias Disponibles',
        'Fecha de Registro',
        'Estado'
      ],
      // Datos de cada obra
      ...obras.map(obra => {
        const siguienteCopia = obra.copiasVendidas + 1;
        const copiasDisponibles = obra.copiasTotales - obra.copiasVendidas;
        const estado = copiasDisponibles > 0 ? 'Disponible' : 'Agotado';
        
        return [
          obra.referencia,
          obra.titulo,
          obra.serie,
          obra.holograma,
          `${siguienteCopia}/${obra.copiasTotales}`,
          obra.papelImpresion,
          obra.dimensionesOriginal,
          obra.dimensionesBastidor,
          obra.tipoPapel,
          obra.copiasTotales.toString(),
          obra.copiasVendidas.toString(),
          copiasDisponibles.toString(),
          fechaActual,
          estado
        ];
      })
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Registro_Completo_Certificados_MyriamAlcaraz_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Si no hay acceso permitido, mostrar pantalla de login
  if (!accesoPermitido) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={40} className="text-white" />
            </div>
            <h2 className="font-serif text-3xl text-slate-900 mb-2">Zona Privada</h2>
            <p className="text-stone-600">Panel de Certificados y Registro</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Contraseña de Acceso
              </label>
              <div className="relative">
                <input
                  type={mostrarPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && verificarAcceso()}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 pr-12"
                  placeholder="Introduce la contraseña"
                />
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {mostrarPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <button
              onClick={verificarAcceso}
              className="w-full bg-gold-500 text-white py-3 px-6 rounded-lg hover:bg-gold-600 transition-colors font-medium"
            >
              Acceder
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-stone-200">
            <p className="text-xs text-stone-500 text-center">
              Área restringida al artista y personal autorizado
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <header className="text-center max-w-4xl mx-auto pt-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Shield size={24} className="text-gold-600" />
          <span className="text-xs tracking-[0.5em] text-gold-600 uppercase font-medium">
            Zona Privada
          </span>
        </div>
        <h2 className="font-serif text-5xl md:text-6xl text-slate-900 tracking-wide mb-8 leading-tight">
          Panel de Certificados
        </h2>
        <div className="w-24 h-px bg-gold-500 mx-auto mb-10"></div>
        <p className="text-stone-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          Sistema profesional de certificación y registro de obras de arte.
        </p>
      </header>

      {/* Botón de exportación completa */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-stone-50 to-stone-100 border border-stone-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileSpreadsheet size={24} className="text-gold-600" />
              <div>
                <h3 className="font-serif text-lg text-slate-900">Registro Completo de Ventas</h3>
                <p className="text-sm text-stone-600">Exporta todos los datos con referencias, series y hologramas</p>
              </div>
            </div>
            <button
              onClick={exportarRegistroCompleto}
              className="flex items-center gap-2 bg-gold-500 text-white px-6 py-3 rounded-lg hover:bg-gold-600 transition-colors"
            >
              <Download size={20} />
              <span className="font-medium">Actualizar Excel</span>
            </button>
          </div>
        </div>
      </section>

      {/* Grid de obras con series */}
      <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {obras.map((obra) => {
            const copiasDisponibles = obra.copiasTotales - obra.copiasVendidas;
            const siguienteCopia = obra.copiasVendidas + 1;

            return (
              <div key={obra.id} className="bg-white border border-stone-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {/* Header de la obra con serie */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-xl text-slate-900 mb-2">{obra.titulo}</h3>
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-gold-600 font-medium">{obra.referencia}</p>
                      <span className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded">
                        Serie {obra.serie}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-stone-500">
                    <Shield size={20} />
                    <span className="text-xs">Certificado</span>
                  </div>
                </div>

                {/* Información técnica detallada */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Holograma:</span>
                    <span className="font-medium text-slate-700">{obra.holograma}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Original (Bastidor):</span>
                    <span className="font-medium text-slate-700">{obra.dimensionesBastidor} cm</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Impresión (Papel):</span>
                    <span className="font-medium text-slate-700">{obra.papelImpresion} cm</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Tipo Papel:</span>
                    <span className="font-medium text-slate-700">100% Algodón</span>
                  </div>
                </div>

                {/* Estado de copias por serie */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Edición Limitada</span>
                    <span className="text-xs text-amber-700 font-medium">
                      Serie {obra.serie}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600">Numeración:</span>
                    <span className="font-medium text-slate-900">
                      {obra.copiasVendidas}/{obra.copiasTotales}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600">Disponibles:</span>
                    <span className={`font-medium ${copiasDisponibles > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {copiasDisponibles}/{obra.copiasTotales}
                    </span>
                  </div>
                  {copiasDisponibles > 0 && (
                    <div className="mt-3 pt-3 border-t border-amber-200">
                      <p className="text-xs text-amber-700">
                        Siguiente certificado: <span className="font-medium text-slate-900">
                          {siguienteCopia}/{obra.copiasTotales}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Botón de acción */}
                <button
                  onClick={() => generarCertificadoPDF(obra)}
                  disabled={copiasDisponibles === 0 || generando === obra.id}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                    copiasDisponibles === 0
                      ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                      : generando === obra.id
                      ? 'bg-amber-100 text-amber-700 cursor-wait'
                      : 'bg-gold-500 text-white hover:bg-gold-600'
                  }`}
                >
                  {generando === obra.id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Generando e Imprimiendo...</span>
                    </>
                  ) : copiasDisponibles === 0 ? (
                    <>
                      <Shield size={20} />
                      <span>Serie Agotada</span>
                    </>
                  ) : (
                    <>
                      <Printer size={20} />
                      <span>Imprimir Certificado</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Información del sistema */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-stone-50 border border-stone-200 p-6 text-center">
          <p className="text-stone-600 text-sm leading-relaxed">
            <strong>Sistema de Certificados:</strong> Todos los certificados se generan con los datos de Raúl 
            (Hologramas 287213-287216), incluyen dobles medidas (Bastidor vs Papel), y se imprimen automáticamente. 
            El registro Excel recopila Referencia, Título, Serie y Holograma para un control total.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ZonaPrivada;