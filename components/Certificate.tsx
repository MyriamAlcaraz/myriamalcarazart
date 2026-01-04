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
			className="w-[210mm] h-[297mm] p-[18mm] mx-auto shadow-2xl relative text-slate-800 print:shadow-none print:w-full print:h-full overflow-hidden"
			style={{ 
				backgroundColor: '#fffdf8',
				fontFamily: "'Montserrat', sans-serif"
			}}
		>
			{/* Marco Exterior Dorado */}
			<div 
				className="h-full p-[12mm] relative flex flex-col"
				style={{ border: '2px solid #c5a059' }}
			>
				{/* Marco Interior Decorativo */}
				<div 
					className="absolute pointer-events-none"
					style={{ 
						top: '6px', 
						left: '6px', 
						right: '6px', 
						bottom: '6px',
						border: '1px solid #c5a059',
						opacity: 0.6
					}}
				></div>

				{/* 1. LOGO PEQUEÑO */}
				<header className="text-center mb-2">
					<img 
						src="/logo-myriam.png" 
						alt="Logo Myriam Alcaraz" 
						className="mx-auto"
						style={{ maxWidth: '80px', height: 'auto' }}
					/>
				</header>

				{/* 2. TÍTULO DEL CERTIFICADO */}
				<div className="text-center mb-4">
					<h1 
						className="inline-block"
						style={{ 
							fontFamily: "'Cinzel', serif",
							fontSize: '20pt',
							letterSpacing: '4px',
							fontWeight: 400,
							color: '#1a1a1a',
							borderBottom: '2px solid #c5a059',
							paddingBottom: '6px'
						}}
					>
						Certificado de Autenticidad
					</h1>
				</div>

				{/* 3. TEXTO INTRODUCTORIO - TODO JUNTO */}
				<div 
					className="text-center mb-4"
					style={{ 
						fontSize: '10pt',
						lineHeight: '1.6',
						fontWeight: 300,
						color: '#333'
					}}
				>
					<p style={{ marginBottom: '2px' }}>
						Por la presente se certifica que la obra de arte descrita a continuación
						es una creación original y auténtica de la artista:
					</p>
					<span 
						className="inline-block"
						style={{ 
							fontFamily: "'Cinzel', serif",
							fontSize: '14pt',
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
							fontSize: '8pt',
							letterSpacing: '2px',
							color: '#555'
						}}
					>
						Pintura Figurativa Contemporánea
					</span>
				</div>

				{/* 4. IMAGEN DE LA OBRA - MÁS GRANDE (PIXELADO EN DEMO) */}
				<div className={`text-center mb-4 ${pixelationClass}`}>
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
							style={{ maxHeight: '180px', width: 'auto', objectFit: 'contain' }}
						/>
					</div>
					<p style={{ fontSize: '7pt', color: '#777', marginTop: '2px', fontStyle: 'italic' }}>
						Fotografía de referencia
					</p>
				</div>

				{/* 5. DETALLES DE LA OBRA (PIXELADO EN DEMO) */}
				<div 
					className={`mx-auto w-[90%] mb-4 ${pixelationClass}`}
					style={{ fontFamily: "'Playfair Display', serif" }}
				>
					{[
						{ label: 'Título:', value: artwork.title },
						{ label: 'Año:', value: artwork.year },
						{ label: 'Dimensiones:', value: artwork.dimensions },
						{ label: 'Técnica:', value: artwork.technique },
						{ label: 'ID Referencia:', value: certificateId }
					].map((item, index) => (
						<div key={index} className="flex mb-2 items-baseline">
							<span 
								className="flex-shrink-0"
								style={{ 
									fontWeight: 600, 
									fontSize: '9pt', 
									width: '100px',
									color: '#444'
								}}
							>
								{item.label}
							</span>
							<span 
								className="flex-grow italic pl-2"
								style={{ 
									borderBottom: '1px dotted #999',
									fontSize: '9pt',
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
					className="text-center italic mb-4"
					style={{ fontSize: '8pt', color: '#555', lineHeight: '1.4' }}
				>
					Este documento certifica que la obra ha sido inspeccionada y aprobada personalmente por la artista.<br/>
					Todos los derechos de autor y reproducción están reservados.
				</p>

				{/* 7. FECHA (izq) Y FIRMA (der) - PIXELADO EN DEMO */}
				<div className={`flex justify-between px-8 mb-4 ${pixelationClass}`}>
					{/* Fecha a la IZQUIERDA */}
					<div className="text-center" style={{ width: '160px' }}>
						<div style={{ height: '50px' }}></div>
						<div style={{ borderTop: '1px solid #333', marginBottom: '4px' }}></div>
						<div 
							style={{ 
								fontFamily: "'Cinzel', serif",
								fontSize: '8pt',
								letterSpacing: '1px',
								color: '#555'
							}}
						>
							Fecha: {currentDate}
						</div>
					</div>
					{/* Firma a la DERECHA (para sello seco) */}
					<div className="text-center" style={{ width: '160px' }}>
						<div style={{ height: '50px' }}></div>
						<div style={{ borderTop: '1px solid #333', marginBottom: '4px' }}></div>
						<div 
							style={{ 
								fontFamily: "'Cinzel', serif",
								fontSize: '8pt',
								letterSpacing: '1px',
								color: '#555'
							}}
						>
							Firma de la Artista
						</div>
					</div>
				</div>

				{/* 8. INFORMACIÓN DE CONTACTO - AL FINAL */}
				<div 
					className="text-center uppercase pt-2 mt-auto"
					style={{ 
						fontSize: '7pt',
						letterSpacing: '1px',
						color: '#777',
						borderTop: '1px solid #ddd'
					}}
				>
					<span className="mx-1">myriamalcaraz.com</span>
					<span className="mx-1">•</span>
					<span className="mx-1">{ARTIST_INFO.email}</span>
					<span className="mx-1">•</span>
					<span className="mx-1">@myriamalcaraz.artist</span>
				</div>
			</div>
		</div>
	);
};
