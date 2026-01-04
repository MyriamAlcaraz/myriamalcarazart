// ARCHIVO: src/components/Certificate.tsx

import React from 'react';
import { ARTIST_INFO } from '../constants';
import { Artwork } from '../types';

interface CertificateProps {
    artwork: Artwork;
    isPixelatedDemo?: boolean;
}

export const Certificate: React.FC<CertificateProps> = ({ artwork, isPixelatedDemo = false }) => {
	const currentDate = new Date().toLocaleDateString('es-ES', {	
		day: '2-digit',	
		month: '2-digit',	
		year: 'numeric'	
	});
	
	const certificateId = isPixelatedDemo ? 'MA-XXXX-XX' : `MA-${artwork.year}-${artwork.id.slice(-2).toUpperCase()}`;
	const pixelationClass = isPixelatedDemo ? 'filter blur-sm pointer-events-none select-none' : '';

	return (
		<div 
			className="w-[210mm] min-h-[297mm] p-[25mm] mx-auto shadow-2xl relative text-slate-800 print:shadow-none print:w-full print:h-full"
			style={{ 
				backgroundColor: '#fffdf8',
				fontFamily: "'Montserrat', sans-serif"
			}}
		>
			{/* Marco Exterior Dorado */}
			<div 
				className="h-full p-[20mm] relative flex flex-col justify-between"
				style={{ border: '2px solid #c5a059' }}
			>
				{/* Marco Interior Decorativo */}
				<div 
					className="absolute pointer-events-none"
					style={{ 
						top: '8px', 
						left: '8px', 
						right: '8px', 
						bottom: '8px',
						border: '1px solid #c5a059',
						opacity: 0.6
					}}
				></div>

				{/* 1. ENCABEZADO CON LOGO */}
				<header className="text-center mb-6">
					<img 
						src="/logo-myriam.png" 
						alt="Logo Myriam Alcaraz" 
						className="mx-auto mb-2"
						style={{ maxWidth: '200px', height: 'auto' }}
					/>
					<p 
						className="tracking-widest mt-2"
						style={{ 
							fontFamily: "'Cinzel', serif",
							fontSize: '11pt',
							color: '#c5a059',
							letterSpacing: '3px'
						}}
					>
						Arte con alma y sofisticación
					</p>
				</header>

				{/* 2. TÍTULO DEL CERTIFICADO */}
				<h1 
					className="text-center mx-auto mb-10"
					style={{ 
						fontFamily: "'Cinzel', serif",
						fontSize: '28pt',
						letterSpacing: '6px',
						fontWeight: 400,
						color: '#1a1a1a',
						borderBottom: '2px solid #c5a059',
						paddingBottom: '12px',
						display: 'inline-block',
						position: 'relative',
						left: '50%',
						transform: 'translateX(-50%)'
					}}
				>
					Certificado de Autenticidad
				</h1>

				{/* 3. TEXTO INTRODUCTORIO */}
				<div 
					className="text-center mb-12"
					style={{ 
						fontSize: '12pt',
						lineHeight: '1.9',
						fontWeight: 300,
						color: '#333'
					}}
				>
					<p>
						Por la presente se certifica que la obra de arte descrita a continuación<br/>
						es una creación original y auténtica de la artista:
					</p>
					<span 
						className="block mt-5 mb-2"
						style={{ 
							fontFamily: "'Cinzel', serif",
							fontSize: '20pt',
							fontWeight: 700,
							letterSpacing: '3px',
							color: '#c5a059'
						}}
					>
						{ARTIST_INFO.name.toUpperCase()}
					</span>
					<span 
						className="block uppercase"
						style={{ 
							fontSize: '11pt',
							letterSpacing: '4px',
							color: '#555'
						}}
					>
						Pintura Figurativa Contemporánea
					</span>
					<p className="mt-4" style={{ fontSize: '9pt', color: '#555' }}>
						Todos los derechos de autor y reproducción están reservados por la artista.
					</p>
				</div>

				{/* 4. SECCIÓN DE DETALLES DE LA OBRA (PIXELADO EN DEMO) */}
				<div 
					className={`mx-auto w-[90%] mb-10 ${pixelationClass}`}
					style={{ fontFamily: "'Playfair Display', serif" }}
				>
					{/* Título de la Obra */}
					<div className="flex mb-5 items-baseline">
						<span 
							className="flex-shrink-0"
							style={{ 
								fontWeight: 600, 
								fontSize: '12pt', 
								width: '200px',
								color: '#444'
							}}
						>
							Título de la Obra:
						</span>
						<span 
							className="flex-grow italic pl-2"
							style={{ 
								borderBottom: '1px dotted #999',
								fontSize: '12pt',
								color: '#000'
							}}
						>
							{artwork.title}
						</span>
					</div>

					{/* Año de Creación */}
					<div className="flex mb-5 items-baseline">
						<span 
							className="flex-shrink-0"
							style={{ 
								fontWeight: 600, 
								fontSize: '12pt', 
								width: '200px',
								color: '#444'
							}}
						>
							Año de Creación:
						</span>
						<span 
							className="flex-grow italic pl-2"
							style={{ 
								borderBottom: '1px dotted #999',
								fontSize: '12pt',
								color: '#000'
							}}
						>
							{artwork.year}
						</span>
					</div>

					{/* Dimensiones */}
					<div className="flex mb-5 items-baseline">
						<span 
							className="flex-shrink-0"
							style={{ 
								fontWeight: 600, 
								fontSize: '12pt', 
								width: '200px',
								color: '#444'
							}}
						>
							Dimensiones:
						</span>
						<span 
							className="flex-grow italic pl-2"
							style={{ 
								borderBottom: '1px dotted #999',
								fontSize: '12pt',
								color: '#000'
							}}
						>
							{artwork.dimensions}
						</span>
					</div>

					{/* Técnica */}
					<div className="flex mb-5 items-baseline">
						<span 
							className="flex-shrink-0"
							style={{ 
								fontWeight: 600, 
								fontSize: '12pt', 
								width: '200px',
								color: '#444'
							}}
						>
							Técnica / Medio:
						</span>
						<span 
							className="flex-grow italic pl-2"
							style={{ 
								borderBottom: '1px dotted #999',
								fontSize: '12pt',
								color: '#000'
							}}
						>
							{artwork.technique}
						</span>
					</div>

					{/* ID de Referencia */}
					<div className="flex mb-5 items-baseline">
						<span 
							className="flex-shrink-0"
							style={{ 
								fontWeight: 600, 
								fontSize: '12pt', 
								width: '200px',
								color: '#444'
							}}
						>
							ID de Referencia:
						</span>
						<span 
							className="flex-grow italic pl-2"
							style={{ 
								borderBottom: '1px dotted #999',
								fontSize: '12pt',
								color: '#000'
							}}
						>
							{certificateId}
						</span>
					</div>
				</div>

				{/* 5. SECCIÓN DE PIE: NOTA Y FIRMAS */}
				<footer className="mt-auto">
					{/* Nota de Certificación */}
					<p 
						className="text-center italic mb-12"
						style={{ fontSize: '10pt', color: '#555' }}
					>
						Este documento certifica que la obra ha sido inspeccionada<br/>
						y aprobada personalmente por la artista.
					</p>

					{/* Bloque de Firmas (PIXELADO EN DEMO) */}
					<div className={`flex justify-between px-16 mb-12 ${pixelationClass}`}>
						{/* Firma de la Artista */}
						<div className="text-center" style={{ width: '220px' }}>
							<div 
								className="pt-3"
								style={{ 
									borderTop: '1px solid #333',
									marginTop: '60px',
									fontFamily: "'Cinzel', serif",
									fontSize: '11pt',
									letterSpacing: '2px'
								}}
							>
								Firma de la Artista
							</div>
						</div>

						{/* Fecha */}
						<div className="text-center" style={{ width: '220px' }}>
							<div 
								className="pt-3"
								style={{ 
									borderTop: '1px solid #333',
									marginTop: '60px',
									fontFamily: "'Cinzel', serif",
									fontSize: '11pt',
									letterSpacing: '2px'
								}}
							>
								Fecha: {currentDate}
							</div>
						</div>
					</div>

					{/* Información de Contacto */}
					<div 
						className="text-center uppercase pt-5"
						style={{ 
							fontSize: '9pt',
							letterSpacing: '3px',
							color: '#777',
							borderTop: '1px solid #ddd'
						}}
					>
						<span className="mx-3">myriamalcaraz.com</span>
						<span className="mx-3">{ARTIST_INFO.email}</span>
						<span className="mx-3">@myriamalcaraz.artist</span>
					</div>
				</footer>
			</div>
		</div>
	);
};
