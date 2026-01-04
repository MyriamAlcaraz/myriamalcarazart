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
			className="w-[210mm] h-[297mm] p-[20mm] mx-auto shadow-2xl relative text-slate-800 print:shadow-none print:w-full print:h-full overflow-hidden"
			style={{ 
				backgroundColor: '#fffdf8',
				fontFamily: "'Montserrat', sans-serif"
			}}
		>
			{/* Marco Exterior Dorado */}
			<div 
				className="h-full p-[15mm] relative flex flex-col"
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
				<header className="text-center mb-4">
					<img 
						src="/logo-myriam.png" 
						alt="Logo Myriam Alcaraz" 
						className="mx-auto"
						style={{ maxWidth: '160px', height: 'auto' }}
					/>
					<p 
						className="tracking-widest mt-1"
						style={{ 
							fontFamily: "'Cinzel', serif",
							fontSize: '9pt',
							color: '#c5a059',
							letterSpacing: '2px'
						}}
					>
						Arte con alma y sofisticación
					</p>
				</header>

				{/* 2. TÍTULO DEL CERTIFICADO */}
				<div className="text-center mb-6">
					<h1 
						className="inline-block"
						style={{ 
							fontFamily: "'Cinzel', serif",
							fontSize: '22pt',
							letterSpacing: '4px',
							fontWeight: 400,
							color: '#1a1a1a',
							borderBottom: '2px solid #c5a059',
							paddingBottom: '8px'
						}}
					>
						Certificado de Autenticidad
					</h1>
				</div>

				{/* 3. TEXTO INTRODUCTORIO */}
				<div 
					className="text-center mb-6"
					style={{ 
						fontSize: '10pt',
						lineHeight: '1.7',
						fontWeight: 300,
						color: '#333'
					}}
				>
					<p>
						Por la presente se certifica que la obra de arte descrita a continuación<br/>
						es una creación original y auténtica de la artista:
					</p>
					<span 
						className="block mt-3 mb-1"
						style={{ 
							fontFamily: "'Cinzel', serif",
							fontSize: '16pt',
							fontWeight: 700,
							letterSpacing: '2px',
							color: '#c5a059'
						}}
					>
						{ARTIST_INFO.name.toUpperCase()}
					</span>
					<span 
						className="block uppercase"
						style={{ 
							fontSize: '9pt',
							letterSpacing: '3px',
							color: '#555'
						}}
					>
						Pintura Figurativa Contemporánea
					</span>
				</div>

				{/* 4. IMAGEN DE LA OBRA (PIXELADO EN DEMO) */}
				<div className={`text-center mb-6 ${pixelationClass}`}>
					<div 
						className="mx-auto p-2 inline-block"
						style={{ 
							backgroundColor: '#f5f5f0',
							boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
						}}
					>
						<img 
							src={artwork.image} 
							alt={`Obra: ${artwork.title}`} 
							className="mx-auto"
							style={{ maxHeight: '140px', width: 'auto', objectFit: 'contain' }}
						/>
					</div>
					<p style={{ fontSize: '8pt', color: '#777', marginTop: '4px', fontStyle: 'italic' }}>
						Fotografía de referencia
					</p>
				</div>

				{/* 5. SECCIÓN DE DETALLES DE LA OBRA (PIXELADO EN DEMO) */}
				<div 
					className={`mx-auto w-[85%] mb-6 ${pixelationClass}`}
					style={{ fontFamily: "'Playfair Display', serif" }}
				>
					{[
						{ label: 'Título de la Obra:', value: artwork.title },
						{ label: 'Año de Creación:', value: artwork.year },
						{ label: 'Dimensiones:', value: artwork.dimensions },
						{ label: 'Técnica / Medio:', value: artwork.technique },
						{ label: 'ID de Referencia:', value: certificateId }
					].map((item, index) => (
						<div key={index} className="flex mb-3 items-baseline">
							<span 
								className="flex-shrink-0"
								style={{ 
									fontWeight: 600, 
									fontSize: '10pt', 
									width: '160px',
									color: '#444'
								}}
							>
								{item.label}
							</span>
							<span 
								className="flex-grow italic pl-2"
								style={{ 
									borderBottom: '1px dotted #999',
									fontSize: '10pt',
									color: '#000'
								}}
							>
								{item.value}
							</span>
						</div>
					))}
				</div>

				{/* 6. NOTA DE CERTIFICACIÓN */}
				<p 
					className="text-center italic mb-6"
					style={{ fontSize: '9pt', color: '#555' }}
				>
					Este documento certifica que la obra ha sido inspeccionada y aprobada personalmente por la artista.<br/>
					Todos los derechos de autor y reproducción están reservados.
				</p>

				{/* 7. BLOQUE DE FIRMAS (PIXELADO EN DEMO) */}
				<div className={`flex justify-between px-10 mb-4 ${pixelationClass}`}>
					<div className="text-center" style={{ width: '180px' }}>
						<div style={{ height: '40px' }}></div>
						<div 
							className="pt-2"
							style={{ 
								borderTop: '1px solid #333',
								fontFamily: "'Cinzel', serif",
								fontSize: '9pt',
								letterSpacing: '1px'
							}}
						>
							Firma de la Artista
						</div>
					</div>
					<div className="text-center" style={{ width: '180px' }}>
						<div style={{ height: '40px' }}></div>
						<div 
							className="pt-2"
							style={{ 
								borderTop: '1px solid #333',
								fontFamily: "'Cinzel', serif",
								fontSize: '9pt',
								letterSpacing: '1px'
							}}
						>
							Fecha: {currentDate}
						</div>
					</div>
				</div>

				{/* 8. INFORMACIÓN DE CONTACTO */}
				<div 
					className="text-center uppercase pt-3 mt-auto"
					style={{ 
						fontSize: '8pt',
						letterSpacing: '2px',
						color: '#777',
						borderTop: '1px solid #ddd'
					}}
				>
					<span className="mx-2">myriamalcaraz.com</span>
					<span className="mx-2">•</span>
					<span className="mx-2">{ARTIST_INFO.email}</span>
					<span className="mx-2">•</span>
					<span className="mx-2">@myriamalcaraz.artist</span>
				</div>
			</div>
		</div>
	);
};
