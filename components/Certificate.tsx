// ARCHIVO: src/components/Certificate.tsx (CÓDIGO ESTABLE)

import React from 'react';
import { ARTIST_INFO } from '../constants';
import { Artwork } from '../types';

export const Certificate: React.FC<{ artwork: Artwork }> = ({ artwork }) => {
  // Aseguramos la inicialización correcta de la fecha para evitar errores de locales
  const currentDate = new Date().toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] p-[20mm] mx-auto shadow-2xl relative text-slate-900 font-sans print:shadow-none print:w-full print:h-full">
      <div className="border-2 border-gold-500 h-full p-[15mm] relative flex flex-col justify-between">
        <div className="absolute inset-2 border border-gold-500 opacity-60 pointer-events-none"></div>
        <div className="text-center relative z-10">
            <div className="flex justify-center mb-6"><img src="/logo-myriam.png" alt="Myriam Alcaraz" className="w-32 opacity-90" /></div>
          <h1 className="font-serif text-4xl tracking-[0.2em] text-slate-900 border-b-2 border-gold-500 inline-block pb-4 mb-2">CERTIFICADO DE AUTENTICIDAD</h1>
          <p className="font-serif text-gold-600 text-sm tracking-widest mt-2 uppercase">Arte con Alma y Sofisticación</p>
        </div>
        <div className="text-center relative z-10 mt-12 mb-12">
            <h2 className="text-2xl font-serif italic text-slate-800 mb-6">Esta obra certifica la autenticidad de:</h2>
            <p className="text-5xl font-serif font-bold text-slate-900 mb-6">{artwork.title}</p>
            <div className="max-w-xl mx-auto border-2 border-slate-100 rounded-xl overflow-hidden shadow-lg">
                <img src={artwork.image} alt={artwork.title} className="w-full h-auto object-cover max-h-64" />
            </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8 text-left mt-12">
          <div className="space-y-4">
            <div className="flex border-b border-slate-300 py-2"><span className="w-40 font-bold text-slate-700 text-sm uppercase tracking-wide">Artista:</span><span className="flex-1 text-lg text-slate-800">{ARTIST_INFO.name}</span></div>
            <div className="flex border-b border-slate-300 py-2"><span className="w-40 font-bold text-slate-700 text-sm uppercase tracking-wide">Título:</span><span className="flex-1 text-lg text-slate-800">{artwork.title}</span></div>
            <div className="flex border-b border-slate-300 py-2"><span className="w-40 font-bold text-slate-700 text-sm uppercase tracking-wide">Técnica:</span><span className="flex-1 text-lg text-slate-800">{artwork.technique}</span></div>
          </div>
          <div className="space-y-4">
            <div className="flex border-b border-slate-300 py-2"><span className="w-40 font-bold text-slate-700 text-sm uppercase tracking-wide">Año:</span><span className="flex-1 text-lg text-slate-800">{artwork.year || 'N/A'}</span></div>
            <div className="flex border-b border-slate-300 py-2"><span className="w-40 font-bold text-slate-700 text-sm uppercase tracking-wide">Dimensiones:</span><span className="flex-1 text-lg text-slate-800">{artwork.dimensions}</span></div>
            <div className="flex border-b border-slate-300 py-2"><span className="w-40 font-bold text-slate-700 text-sm uppercase tracking-wide">ID:</span><span className="flex-1 text-lg text-slate-800">MA-{new Date().getFullYear()}-{artwork.id.padStart(2,'0')}</span></div>
          </div>
        </div>
        <div className="text-center relative z-10 mt-auto">
          <p className="text-slate-500 italic text-sm mb-12">Este documento certifica que la obra ha sido inspeccionada y aprobada personalmente por la artista.<br/>Todos los derechos de autor y reproducción están reservados.</p>
          <div className="flex justify-between px-16 items-end mb-12">
            <div className="text-center w-40"><div className="h-16 mb-2 flex items-end justify-center pb-2 text-slate-600 font-serif">{currentDate}</div><div className="border-b border-slate-900/20 w-full"></div><p className="font-serif text-xs font-bold uppercase tracking-wider text-slate-700">Fecha de Emisión</p></div>
            <div className="text-center w-40"><div className="h-16 mb-2 border-b border-slate-900/20"></div><p className="font-serif text-xs font-bold uppercase tracking-wider text-slate-700">Firma de la Artista</p></div>
          </div>
          <div className="text-[10px] text-slate-400 uppercase tracking-widest">{ARTIST_INFO.email} • {ARTIST_INFO.phone}</div>
        </div>
      </div>
    </div>
  );
};