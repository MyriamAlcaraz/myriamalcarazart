// ARCHIVO: src/components/Certificate.tsx

import React from 'react';
import { ARTIST_INFO } from '../constants';
import { Artwork } from '../types';

export const Certificate: React.FC<{ artwork: Artwork }> = ({ artwork }) => {
  // Inicializa la fecha en formato día, mes y año largo
  const currentDate = new Date().toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });
  
  // Función auxiliar para formatear precio con puntos y euros (Mantenida por si acaso)
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(price);

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] p-[20mm] mx-auto shadow-2xl relative text-slate-900 font-sans print:shadow-none print:w-full print:h-full">
      {/* Marco Exterior */}
      <div className="border-2 border-gold-500 h-full p-[15mm] relative flex flex-col justify-between">
        <div className="absolute inset-2 border border-gold-500 opacity-60 pointer-events-none"></div>

        {/* 1. SECCIÓN SUPERIOR Y DETALLE */}
        <div className="text-center relative z-10">
            
            {/* ENCABEZADO: Nombre y Frase Corporativa */}
            <div className="flex flex-col items-center mb-6">
                <h1 className="font-serif text-2xl md:text-3xl tracking-[0.3em] text-gold-600 uppercase mb-1">{ARTIST_INFO.name}</h1>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-6">{ARTIST_INFO.tagline}</p>
            </div>

            {/* TÍTULO PRINCIPAL */}
            <h2 className="font-serif text-4xl tracking-[0.2em] text-slate-900 border-b-2 border-gold-500 inline-block pb-4 mb-2">CERTIFICADO DE AUTENTICIDAD</h2>
            
            {/* Subtítulo del Tipo de Obra */}
            <p className="text-base text-slate-700 font-serif italic mb-6">PINTURA FIGURATIVA CONTEMPORÁNEA</p>
            
            {/* Texto de Certificación */}
            <p className="text-sm text-slate-600 mb-8">Por la presente se certifica que la obra de arte descrita a continuación es una creación original y auténtica de la artista Myriam Alcaraz.</p>

            {/* IMAGEN DE LA OBRA */}
            <div className="flex justify-center mb-10">
                <img 
                    src={artwork.image} 
                    alt={artwork.title} 
                    className="max-w-xs max-h-56 object-contain shadow-lg border border-slate-200" 
                />
            </div>

            {/* 🛑 DETALLES DE LA OBRA (CORREGIDOS) 🛑 */}
            <div className="max-w-xl mx-auto text-left border-t border-slate-300 pt-4">
              
              {/* 1. Título de la Obra */}
              <div className="flex py-2">
                <span className="w-40 font-bold text-slate-700 text-sm uppercase tracking-wide">Título de la Obra:</span>
                <span className="flex-1 text-lg text-slate-800 font-serif italic">{artwork.title}</span>
              </div>
              
              {/* 2. Dimensiones */}
              <div className="flex border-b border-slate-300 py-2">
                <span className="w-40 font-bold text-slate-700 text-sm uppercase tracking-wide">Dimensiones:</span>
                <span className="flex-1 text-lg text-slate-800">{artwork.dimensions}</span>
              </div>
              
              {/* 3. Técnica / Medio */}
              <div className="flex border-b border-slate-300 py-2">
                <span className="w-40 font-bold text-slate-700 text-sm uppercase tracking-wide">Técnica / Medio:</span>
                <span className="flex-1 text-lg text-slate-800">{artwork.technique}</span>
              </div>
              
              {/* 4. ID de Referencia */}
              <div className="flex border-b border-slate-300 py-2">
                <span className="w-40 font-bold text-slate-700 text-sm uppercase tracking-wide">ID de Referencia:</span>
                {/* Usamos el ID de la obra y el año actual, como en su borrador */}
                <span className="flex-1 text-lg text-slate-800">MA-{new Date().getFullYear()}-{artwork.id.padStart(2,'0')}</span>
              </div>

              {/* Se eliminan: Año de Creación y Precio Certificado */}
            </div>
        </div>

        {/* 2. PIE DE PÁGINA (Footer) */}
        <div className="text-center relative z-10 mt-auto">
          {/* Notas de Certificación y Derechos */}
          <p className="text-slate-500 italic text-sm mb-12">
            Este documento certifica que la obra ha sido inspeccionada y aprobada personalmente por la artista.<br/>
            Todos los derechos de autor y reproducción están reservados.
          </p>
          
          {/* Secciones de Fecha y Firma */}
          <div className="flex justify-between px-16 items-end mb-12">
            <div className="text-center w-40">
                <div className="h-16 mb-2 flex items-end justify-center pb-2 text-slate-600 font-serif">{currentDate}</div>
                <div className="border-b border-slate-900/20 w-full"></div>
                <p className="font-serif text-xs font-bold uppercase tracking-wider text-slate-700">Fecha de Emisión</p>
            </div>
            <div className="text-center w-40">
                <div className="h-16 mb-2 border-b border-slate-900/20"></div>
                <p className="font-serif text-xs font-bold uppercase tracking-wider text-slate-700">Firma de la Artista</p>
            </div>
          </div>
          
          {/* Información de Contacto al Pie */}
          <div className="mt-8 text-[10px] text-slate-500 uppercase tracking-wider space-x-4">
              <span>{ARTIST_INFO.website}</span> |
              <span>{ARTIST_INFO.email}</span> |
              <span>{ARTIST_INFO.instagram}</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};