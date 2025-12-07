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

            {/* 🛑 DETALLES DE LA OBRA (CORREGIDO CON BORDES) 🛑 */}
            <div className="max-w-xl mx-auto text-left border-t border-slate-300 pt-4">
              
              {/* 1. Título de la Obra - AÑADIDO: Borde inferior */}
              <div className="flex border-b border-slate-300 py-2"> 
                <span className="w-40 font-bold text-slate-700 text-sm uppercase tracking-wide">Título de la Obra:</span>
                <span className="flex-1 text-lg text-slate-800 font-serif italic">{artwork.title}</span>
              </div>
              
              {/* 2. Dimensiones - Borde inferior */}
              <div className="flex border-b border-slate-300 py-2">
                <span className="w-40 font-bold text-slate-700 text-sm uppercase