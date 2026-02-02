import React, { useState } from 'react';
import { Check, Shield, Award, Crown } from 'lucide-react';

const GicleeTab: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const sizes = [
    { id: 'xs', name: 'Formato Colección', price: '120€' },
    { id: 'small', name: 'Formato Galería', price: '180€' },
    { id: 'medium', name: 'Formato Intermedio', price: '450€' },
    { id: 'large', name: 'Formato Prestigio', price: '650€' },
    { id: 'special', name: 'Fiel al Óleo Original', price: '950€' }
  ];

  return (
    <div className="w-full min-h-screen bg-white animate-fade-in z-[60] relative">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Crown className="text-gold-500" size={48} />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-slate-800 mb-6">
            Giclée Exclusivo
          </h1>
          <div className="w-32 h-1 bg-gold-500 mx-auto mb-8"></div>
          <p className="text-xl text-stone-600 font-light leading-relaxed max-w-3xl mx-auto">
            Ediciones limitadas de máxima calidad para coleccionistas exigentes
          </p>
        </div>

        {/* Calidad Section */}
        <section>
          <h2 className="text-3xl font-serif text-slate-800 mb-6 text-center">La Calidad</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-100">
            <p className="text-stone-700 leading-relaxed text-lg text-center">
              La Calidad: Hahnemühle William Turner 310g. 100% algodón, textura rugosa que respira la misma alma que el lienzo original. Tintas pigmentadas minerales (duración +100 años).
            </p>
          </div>
        </section>

        {/* Garantía Section */}
        <section>
          <h2 className="text-3xl font-serif text-slate-800 mb-8 text-center">Garantía de Autenticidad</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
              <div className="flex items-start gap-4">
                <Shield className="text-gold-500 mt-1" size={28} />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2 text-lg">Certificado Hahnemühle</h3>
                  <p className="text-stone-600">Con holograma de autenticidad y número de serie único</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
              <div className="flex items-start gap-4">
                <Award className="text-gold-500 mt-1" size={28} />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2 text-lg">Certificado Myriam Alcaraz</h3>
                  <p className="text-stone-600">Con Sello Seco y firma autógrafa de la artista</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selector de Tamaños */}
        <section>
          <h2 className="text-3xl font-serif text-slate-800 mb-8 text-center">Selecciona tu Formato</h2>
          <div className="space-y-4">
            {sizes.map((size) => (
              <div
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`bg-white p-6 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedSize === size.id 
                    ? 'border-gold-500 shadow-lg' 
                    : 'border-stone-100 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedSize === size.id ? 'border-gold-500 bg-gold-500' : 'border-stone-300'
                    }`}>
                      {selectedSize === size.id && <Check size={16} className="text-white" />}
                    </div>
                    <h3 className="font-semibold text-slate-800">{size.name}</h3>
                  </div>
                  <div className="text-2xl font-bold text-gold-500">{size.price}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Nota Técnica sobre Dimensiones */}
          <p className="text-stone-600 text-sm italic text-center mt-6">
            Las dimensiones exactas se ajustarán proporcionalmente a la composición de la obra elegida para respetar la intención de la artista.
          </p>
        </section>

        {/* Nota de Exclusividad */}
        <section className="bg-stone-100 p-8 rounded-lg text-center">
          <p className="text-stone-700 italic text-lg">
            Series estrictamente limitadas. Una vez agotada la edición, no volverá a producirse.
          </p>
        </section>

        {/* Botón de Acción */}
        {selectedSize && (
          <div className="text-center">
            <button className="bg-gold-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gold-600 transition-colors text-lg tracking-wider">
              Solicitar Información
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default GicleeTab;