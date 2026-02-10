import React, { useState } from 'react';
import { ArrowLeft, Download, FileSpreadsheet, Shield } from 'lucide-react';

// ============================================
// TIPOS
// ============================================
type AppView = 'gallery' | 'composicion' | 'pigmentos' | 'certificados';

// ============================================
// BASE DE DATOS DE OBRAS
// ============================================
interface Obra {
  id: string;
  titulo: string;
  referencia: string;
  holograma: string;
  papelImpresion: string;
  dimensionesOriginal: string;
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
    copiasTotales: 10,
    copiasVendidas: 0
  }
];

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const PanelCertificados: React.FC = () => {
  const [obras, setObras] = useState<Obra[]>(OBRAS_DB);
  const [generando, setGenerando] = useState<string | null>(null);

  // Generar PDF del certificado
  const generarCertificadoPDF = (obra: Obra) => {
    setGenerando(obra.id);
    
    // Simulación de generación de PDF
    setTimeout(() => {
      // Crear contenido del PDF
      const pdfContent = `
CERTIFICADO DE AUTENTICIDAD
============================

Obra: ${obra.titulo}
Referencia: ${obra.referencia}
Artista: Myriam Alcaraz
Año: 2025

DIMENSIONES OBRA ORIGINAL
${obra.dimensionesOriginal} cm

DIMENSIONES IMPRESIÓN GICLÉE
${obra.papelImpresion} cm

Holograma Hahnemühle Nº: ${obra.holograma}

Impresión Giclée de calidad archivo sobre papel 100% algodón.

Este certificado garantiza la autenticidad de la obra y su 
limitada producción según las especificaciones del artista.

Firma: ______________________
Fecha: ${new Date().toLocaleDateString('es-ES')}
      `;

      // Crear blob y descargar
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Certificado_${obra.referencia}.txt`;
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

      setGenerando(null);
    }, 1500);
  };

  // Exportar registro de ventas a CSV
  const exportarRegistroVentas = () => {
    const csvContent = [
      ['Obra', 'Referencia', 'Holograma', 'Copias Totales', 'Copias Vendidas', 'Copias Disponibles'],
      ...obras.map(obra => [
        obra.titulo,
        obra.referencia,
        obra.holograma,
        obra.copiasTotales.toString(),
        obra.copiasVendidas.toString(),
        (obra.copiasTotales - obra.copiasVendidas).toString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Registro_Ventas_MyriamAlcaraz_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <header className="text-center max-w-4xl mx-auto pt-4">
        <p className="text-xs tracking-[0.5em] text-stone-400 uppercase mb-8 font-light">
          Panel de Gestión Profesional
        </p>
        <h2 className="font-serif text-5xl md:text-6xl text-slate-900 tracking-wide mb-8 leading-tight">
          Certificados y Registro
        </h2>
        <div className="w-24 h-px bg-gold-500 mx-auto mb-10"></div>
        <p className="text-stone-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          Sistema de certificación y registro de obras de arte.
        </p>
      </header>

      {/* Botón de exportación */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-stone-50 border border-stone-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileSpreadsheet size={24} className="text-gold-600" />
              <div>
                <h3 className="font-serif text-lg text-slate-900">Registro de Ventas</h3>
                <p className="text-sm text-stone-600">Exporta el estado actual de todas las obras</p>
              </div>
            </div>
            <button
              onClick={exportarRegistroVentas}
              className="flex items-center gap-2 bg-gold-500 text-white px-6 py-3 rounded-lg hover:bg-gold-600 transition-colors"
            >
              <Download size={20} />
              <span className="font-medium">Actualizar Registro</span>
            </button>
          </div>
        </div>
      </section>

      {/* Grid de obras */}
      <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {obras.map((obra) => {
            const copiasDisponibles = obra.copiasTotales - obra.copiasVendidas;
            const siguienteCopia = obra.copiasVendidas + 1;

            return (
              <div key={obra.id} className="bg-white border border-stone-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {/* Header de la obra */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-xl text-slate-900 mb-2">{obra.titulo}</h3>
                    <p className="text-sm text-gold-600 font-medium">{obra.referencia}</p>
                  </div>
                  <div className="flex items-center gap-2 text-stone-500">
                    <Shield size={20} />
                    <span className="text-xs">Certificado</span>
                  </div>
                </div>

                {/* Información técnica */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Holograma:</span>
                    <span className="font-medium text-slate-700">{obra.holograma}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Original:</span>
                    <span className="font-medium text-slate-700">{obra.dimensionesOriginal} cm</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Impresión:</span>
                    <span className="font-medium text-slate-700">{obra.papelImpresion} cm</span>
                  </div>
                </div>

                {/* Estado de copias */}
                <div className="bg-stone-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Estado de Edición</span>
                    <span className="text-xs text-stone-500">Limitada</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600">Copias vendidas:</span>
                    <span className="font-medium text-slate-900">{obra.copiasVendidas}/{obra.copiasTotales}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600">Disponibles:</span>
                    <span className={`font-medium ${copiasDisponibles > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {copiasDisponibles}/{obra.copiasTotales}
                    </span>
                  </div>
                  {copiasDisponibles > 0 && (
                    <div className="mt-3 pt-3 border-t border-stone-200">
                      <p className="text-xs text-stone-500">
                        Siguiente copia: <span className="font-medium text-slate-700">{siguienteCopia}/{obra.copiasTotales}</span>
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
                      <span>Generando...</span>
                    </>
                  ) : copiasDisponibles === 0 ? (
                    <>
                      <Shield size={20} />
                      <span>Edición Agotada</span>
                    </>
                  ) : (
                    <>
                      <Download size={20} />
                      <span>Generar Certificado</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Información legal */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-stone-50 border border-stone-200 p-6 text-center">
          <p className="text-stone-600 text-sm leading-relaxed">
            <strong>Nota importante:</strong> Cada certificado generado actualiza automáticamente el registro de ventas. 
            Los certificados incluyen número de holograma, dimensiones de obra original e impresión, y el texto legal 
            de autenticidad requerido para galerías y coleccionistas.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PanelCertificados;