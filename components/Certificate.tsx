// ARCHIVO: src/components/Certificate.tsx

import React from 'react';
import { ARTIST_INFO } from '../constants';
import { Artwork } from '../types';

// 🛑 MODIFICAR INTERFAZ DE PROPS
interface CertificateProps {
    artwork: Artwork;
    isPixelatedDemo?: boolean; // Nuevo prop opcional para el pixelado
}

// 🛑 USAR LA NUEVA INTERFAZ Y EL PROP
export const Certificate: React.FC<CertificateProps> = ({ artwork, isPixelatedDemo = false }) => {
	// Inicializa la fecha en formato día, mes y año largo
	const currentDate = new Date().toLocaleDateString('es-ES', {	
		day: '2-digit',	
		month: 'long',	
		year: 'numeric'	
	});
	
	// Función auxiliar para formatear precio con puntos y euros (Mantenida por si acaso)
	const formatPrice = (price: number) =>	
		new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(price);

	// ID de certificado simulado para la demo
    const certificateId = isPixelatedDemo ? 'DEMO-PIXELADO' : `MA-AOC-${artwork.id.slice(-4).toUpperCase()}-${artwork.year}`;

	// Clase CSS condicional para pixelar
	const pixelationClass = isPixelatedDemo ? 'filter blur-sm pointer-events-none' : '';

	return (
		<div className="bg-white w-[210mm] min-h-[297mm] p-[20mm] mx-auto shadow-2xl relative text-slate-900 font-sans print:shadow-none print:w-full print:h-full">
			{/* Marco Exterior */}
			<div className="border-2 border-gold-500 h-full p-[15mm] relative flex flex-col justify-between">
				<div className="absolute inset-2 border border-gold-500 opacity-60 pointer-events-none"></div>

				{/* --- 1. Encabezado y Titular --- */}
				<header className="text-center mb-12">
					<img src="/logo-myriam.png" alt="Logo Myriam Alcaraz" className="h-16 mx-auto mb-4" />
					<h1 className="font-serif text-4xl font-bold text-slate-900 mb-2">CERTIFICADO DE AUTENTICIDAD</h1>
					<h2 className="text-sm uppercase tracking-[0.3em] text-gold-600">{ARTIST_INFO.tagline}</h2>
				</header>

				<main className="flex-grow">
					
					{/* 🛑 Bloque de ID de Registro (PIXELADO) */}
					<div className={`text-center py-2 mb-8 bg-stone-100/50 rounded-lg ${pixelationClass}`}>
						<p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-1">ID de Registro Único</p>
						<p className="font-mono text-xl font-bold text-slate-800">{certificateId}</p>
					</div>

					{/* --- 2. Bloque de Obra Certificada --- */}
					<h2 className="text-2xl font-serif font-bold text-gold-600 mb-6 border-b border-gold-500 pb-2">Obra Certificada</h2>
					
					{/* 🛑 DATOS DE LA OBRA (PIXELADO) */}
					<div className={`grid grid-cols-2 gap-x-12 gap-y-6 text-sm mb-12 ${pixelationClass}`}>
						
						{/* Columna Izquierda: Datos Técnicos */}
						<div className="space-y-4">
							<div className="border-b border-stone-200 pb-1">
								<span className="font-semibold block text-slate-700">Título:</span>
								<span className="font-serif italic text-lg">{artwork.title}</span>
							</div>
							<div className="border-b border-stone-200 pb-1">
								<span className="font-semibold block text-slate-700">Artista:</span>
								<span className="font-serif italic text-lg">{ARTIST_INFO.name}</span>
							</div>
							<div className="border-b border-stone-200 pb-1">
								<span className="font-semibold block text-slate-700">Año de Creación:</span>
								<span className="font-serif italic text-lg">{artwork.year}</span>
							</div>
							<div className="border-b border-stone-200 pb-1">
								<span className="font-semibold block text-slate-700">Técnica:</span>
								<span className="font-serif italic text-lg">{artwork.technique}</span>
							</div>
							<div className="border-b border-stone-200 pb-1">
								<span className="font-semibold block text-slate-700">Dimensiones:</span>
								<span className="font-serif italic text-lg">{artwork.dimensions}</span>
							</div>
						</div>

						{/* Columna Derecha: Imagen y Precios */}
						<div className="space-y-4">
							<div className="bg-stone-50 p-3 shadow-inner">
								<img src={artwork.image} alt={`Obra: ${artwork.title}`} className="w-full h-auto object-contain max-h-56 mx-auto" />
								<p className="text-xs text-center text-slate-500 italic mt-2">Fotografía de Referencia</p>
							</div>
							<div className="pt-2">
								<span className="font-semibold block text-slate-700">Precio de Venta Original:</span>
								<span className="font-serif text-xl font-bold text-gold-600">{formatPrice(artwork.price)}</span>
							</div>
						</div>
					</div>

					{/* --- 3. Declaración y Sello Seco --- */}
					<p className="text-slate-500 italic text-sm mb-12">
						Este documento certifica que la obra ha sido inspeccionada y aprobada personalmente por la artista.<br/>
						Todos los derechos de autor y reproducción están reservados.
					</p>
					

				</main>
				
				{/* --- 4. Bloque de Autenticación y Firma --- */}
				<footer className="flex justify-between px-16 items-end">
					
					{/* Bloque de Fecha */}
					<div className="text-center w-40">
						<div className="h-16 mb-2 flex items-end justify-center pb-2 text-slate-600 font-serif">{currentDate}</div>
						<div className="border-b border-slate-900/20 w-full"></div>
						<p className="font-serif text-xs font-bold uppercase tracking-wider text-slate-700">Fecha de Emisión</p>
					</div>

					{/* Bloque de Firma 🛑 (PIXELADO EN DEMO) */}
					<div className="text-center w-60 relative">
						<div className={`h-24 mb-1 border-b-2 border-slate-900/10 ${pixelationClass}`}>
							{/* Imagen de la firma */}
							<img src="/obras/FIRMA.png" alt="Firma de Myriam Alcaraz" className="max-h-full w-auto mx-auto object-contain" />
						</div>
						<p className="font-serif text-sm font-bold uppercase tracking-wider text-slate-700">Myriam Alcaraz</p>
					</div>
				</footer>
			</div>
		</div>
	);
};