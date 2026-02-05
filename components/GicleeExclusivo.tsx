import React, { useState } from 'react';
import { ArrowLeft, Check, Shield, Award } from 'lucide-react';

interface GicleeExclusivoProps {
  onBack: () => void;
}

const GicleeExclusivo: React.FC<GicleeExclusivoProps> = ({ onBack }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const sizes = [
    { id: 'xs', name: 'XS (Escritorio)', price: '120€', description: 'Perfecto para tu espacio de trabajo' },
    { id: 'small', name: 'Pequeño (30x40)', price: '180€', description: 'Ideal para paredes modestas' },
    { id: 'medium', name: 'Mediano (50x70)', price: '450€', description: 'Presencia elegante en cualquier sala' },
    { id: 'large', name: 'Grande (Escala superior)', price: '650€', description: 'Punto focal dominante' },
    { id: 'special', name: 'Especial (Original del Óleo)', price: '950€', description: 'Obra maestra única' }
  ];

  return (
    <div className="min-h-screen bg-stone-50 animate-fade-in">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-12">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-stone-600 hover:text-gold-500 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span className="text-sm tracking-wider uppercase">Volver</span>
          </button>

          <h1 className="text-4xl md:text-5xl font-serif text-slate-800 mb-4">
            Giclée Exclusivo
          </h1>
          <div className="w-24 h-1 bg-gold-500 mb-8"></div>
          <p className="text-xl text-stone-600 font-light leading-relaxed">
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
                      <p className="text-sm text-stone-600">{size.description}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gold-500">{size.price}</div>
                </div>
              </div>
            ))}
          </div>
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