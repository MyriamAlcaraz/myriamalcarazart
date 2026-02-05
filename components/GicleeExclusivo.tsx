import React, { useState } from 'react';
import { ArrowLeft, Check, Shield, Award, Crown } from 'lucide-react';

interface GicleeExclusivoProps {
  onBack: () => void;
}

const GicleeExclusivo: React.FC<GicleeExclusivoProps> = ({ onBack }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const sizes = [
    { id: 'standard', name: 'Formato Estándar', label: 'Lado mayor aprox. 40 cm', price: '180€' },
    { id: 'intermediate', name: 'Formato Intermedio', label: 'Lado mayor aprox. 50 cm', price: '280€' },
    { id: 'medium', name: 'Formato Mediano', label: 'Lado mayor aprox. 70 cm', price: '450€' },
    { id: 'large', name: 'Formato Grande', label: 'Lado mayor aprox. 90 cm', price: '680€' },
    { id: 'collection', name: 'Formato Colección', label: 'Lado mayor aprox. 100 cm', price: '950€' }
  ];

  return (
    <div className="min-h-screen bg-stone-50 animate-fade-in">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Header - Centrado y con Corona */}
        <div className="mb-12 text-center relative">
          <button
            onClick={onBack}
            className="absolute left-0 top-2 flex items-center gap-2 text-stone-600 hover:text-gold-500 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm tracking-wider uppercase hidden md:inline">Volver</span>
          </button>

          <div className="flex justify-center mb-6">
            <Crown className="text-gold-500" size={48} />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-slate-800 mb-6">
            Giclée Exclusivo
          </h1>
          <div className="w-32 h-1 bg-gold-500 mx-auto mb-8"></div>
          <p className="text-xl text-stone-600 font-light leading-relaxed max-w-2xl mx-auto">
            Ediciones limitadas de máxima calidad para coleccionistas exigentes
          </p>
        </div>

        {/* Calidad Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif text-slate-800 mb-6">La Calidad</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-100">
            <p className="text-stone-700 leading-relaxed text-lg">
              Cada obra se imprime en el prestigioso papel Hahnemühle William Turner de 310g, un papel 100% algodón moldeado en tina. Su superficie tiene una textura mate sutil y genuina que preserva la profundidad y el carácter de mis óleos, aportando una tridimensionalidad y una riqueza cromática que solo los estándares de conservación de museos pueden ofrecer. Una joya eterna para tu colección.
            </p>
          </div>
        </section>

        {/* Garantía Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif text-slate-800 mb-6">Garantía de Autenticidad</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-100">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <Shield className="text-gold-500 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Certificado Hahnemühle</h3>
                  <p className="text-stone-600">Con holograma de autenticidad y número de serie único</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Award className="text-gold-500 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Certificado Myriam Alcaraz</h3>
                  <p className="text-stone-600">Con Sello Seco y firma autógrafa de la artista</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selector de Tamaños */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif text-slate-800 mb-6">Selecciona tu Formato</h2>
          <div className="space-y-4">
            {sizes.map((size) => (
              <div
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`bg-white p-6 rounded-lg border-2 cursor-pointer transition-all ${selectedSize === size.id
                  ? 'border-gold-500 shadow-lg'
                  : 'border-stone-100 hover:border-stone-300'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedSize === size.id ? 'border-gold-500 bg-gold-500' : 'border-stone-300'
                      }`}>
                      {selectedSize === size.id && <Check size={16} className="text-white" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{size.name}</h3>
                      <p className="text-sm text-stone-600">{size.label}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gold-500">{size.price}</div>
                </div>
              </div>
            ))}
            <p className="text-stone-500 text-xs italic text-center mt-6 max-w-lg mx-auto leading-relaxed font-serif">
              * Las dimensiones finales pueden variar ligeramente para respetar la proporción y composición original de la obra, garantizando así la integridad artística de la reproducción.
            </p>
          </div>

          {/* Botón de Acción (Solo aparece si hay tamaño seleccionado) */}
          {selectedSize && (
            <div className="text-center mt-12 animate-fade-in">
              <button
                onClick={() => {
                  const selectedFormat = sizes.find(s => s.id === selectedSize);
                  const subject = encodeURIComponent(`Interés en la adquisición de Giclée: [Título de la Obra]`);
                  const body = encodeURIComponent(
                    `Estimada Myriam Alcaraz,
\nLe escribo interesado/a en la adquisición de una reproducción de alta fidelidad (Giclée) de su obra titulada [Título de la Obra].
\nLos detalles de la selección son los siguientes:
\n• Obra: [Título de la Obra]
• Formato: ${selectedFormat?.name}
• Dimensiones: ${selectedFormat?.label}
• Especificaciones: Impresión pigmentada de alta fidelidad sobre papel Hahnemühle William Turner 310g.
• Certificación: Doble aval (Certificado Hahnemühle con registro digital y Certificado de Artista firmado con sello seco).
• Importe: ${selectedFormat?.price}
\nQuedo a la espera de sus instrucciones personales para formalizar la reserva y proceder con los trámites de adquisición y envío.
\nAtentamente,
\n[Nombre y Apellidos]
[Teléfono de contacto]`
                  );
                  window.location.href = `mailto:myriamhotmail@hotmail.com?subject=${subject}&body=${body}`;
                }}
                className="bg-gold-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gold-600 transition-colors text-lg tracking-wider shadow-xl hover:shadow-2xl transform hover:scale-105 duration-300"
              >
                SOLICITAR ADQUISICIÓN
              </button>
              <p className="text-stone-500 text-sm italic text-center mt-4">
                Se abrirá su cliente de correo para finalizar la solicitud.
              </p>
            </div>
          )}

        </section>

        {/* Nota de Exclusividad */}
        <section className="bg-stone-100 p-8 rounded-lg text-center">
          <p className="text-stone-700 italic text-lg">
            Series estrictamente limitadas. Una vez agotada la edición, no volverá a producirse.
          </p>
        </section>

      </div>
    </div>
  );
};

export default GicleeExclusivo;