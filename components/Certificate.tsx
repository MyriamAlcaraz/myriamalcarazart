// ARCHIVO: ./components/Certificate.tsx - CÓDIGO FINAL ESTABLE Y CLEAN (LISTO PARA IMPRIMIR)

import React from 'react';
import { Artwork } from '../constants'; 
import { format } from 'date-fns';

interface CertificateProps {
  artwork: Artwork;
  isPixelatedDemo: boolean;
}

export const Certificate: React.FC<CertificateProps> = ({ artwork, isPixelatedDemo }) => {
  const currentDate = format(new Date(), 'dd/MM/yyyy');
  const displayYear = artwork.year && artwork.year.toString().trim() !== '' 
                      ? artwork.year 
                      : '2025'; 

  // Clases CSS que aplican el efecto borroso si es modo demo
  const blurClass = isPixelatedDemo ? 'filter blur-sm pointer-events-none opacity-50' : '';

  return (
    <div className={`p-4 md:p-10 w-[210mm] h-[297mm] bg-white text-slate-800 shadow-xl ${blurClass} print:shadow-none print:p-0 print:m-0`}>
      <div className="border border-gold-600 p-6 h-full flex flex-col justify-between">
        
        {/* ENCABEZADO Y TÍTULO */}
        <header className="text-center mb-8">
          <h1 className="font-serif text-5xl font-bold text-gold-600 mb-2">Myriam Alcaraz</h1>
          <h2 className="text-lg uppercase tracking-widest font-semibold text-slate-700">CERTIFICADO DE AUTENTICIDAD</h2>
          <p className="mt-4 text-sm max-w-lg mx-auto border-t border-b py-2 border-slate-200">
            Por la presente se certifica que la obra descrita es una creación original y auténtica de la artista.
          </p>
        </header>

        {/* DETALLES DE LA OBRA */}
        <section className="flex-grow flex items-start justify-center">
            <div className="w-full max-w-2xl">
                <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-left">
                    
                    <DetailRow label="Título de la Obra" value={artwork.title} />
                    <DetailRow label="ID de Referencia" value={artwork.id} />
                    
                    <DetailRow label="Año de Creación" value={displayYear} />
                    <DetailRow label="Técnica / Medio" value={artwork.technique} />
                    
                    <DetailRow label="Dimensiones" value={artwork.dimensions} />
                    <DetailRow label="Categoría" value="Pintura Figurativa Contemporánea" />

                </div>
            </div>
        </section>

        {/* PIE DE PÁGINA Y FIRMAS */}
        <footer className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-center text-sm mb-6 italic">
            Este documento certifica que la obra ha sido inspeccionada y aprobada personalmente por la artista.
          </p>

          <div className="flex justify-center items-end text-center max-w-xl mx-auto">
            
            {/* CAJA DE LA FIRMA (Espacio para firma física) */}
            <div className="w-1/2 mx-8">
                <div className="h-12 flex justify-center items-center mb-1">
                    {/* Espacio en blanco para la firma en persona */}
                </div>
                {/* Línea para firmar */}
                <div className="border-t border-slate-600 pt-1 text-sm font-semibold">Firma de la Artista</div>
            </div>

            {/* CAJA DE LA FECHA */}
            <div className="w-1/2 mx-8">
                <div className="h-12 flex justify-center items-center mb-1">
                    <span className="text-lg font-bold">{currentDate}</span>
                </div>
                <div className="border-t border-slate-600 pt-1 text-sm font-semibold">Fecha de Emisión</div>
            </div>

          </div>
          
          <div className="text-center mt-6 text-xs text-slate-500 border-t border-slate-100 pt-4">
            <span className="mx-2">https://myriamalcaraz.wordpress.com</span> | 
            <span className="mx-2">@myriamalcaraz.artist</span> | 
            <span className="mx-2">myriamhotmail@hotmail.com</span>
          </div>

        </footer>
      </div>
    </div>
  );
};

// Componente auxiliar para los detalles
const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex justify-between items-center border-b border-dashed border-slate-300 pb-1">
        <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">{label}:</span>
        <span className="text-base font-medium text-slate-800">{value}</span>
    </div>
);