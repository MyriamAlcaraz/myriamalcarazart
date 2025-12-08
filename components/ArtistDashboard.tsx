import React, { useState } from 'react';
// Importamos solo los iconos necesarios para el KIT
import { Send, Clipboard, Folder, FileText } from 'lucide-react';

// ÚNICA SECCIÓN REQUERIDA: KIT
const sections = [
  { id: 'kit', name: 'KIT', icon: Clipboard }
];

export const ArtistDashboard: React.FC = () => {
  // Siempre estamos en la sección 'kit' ya que es la única que queda
  const [activeSection] = useState(sections[0].id); 

  // Función que renderiza el contenido del KIT
  const renderContent = () => {
    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2 flex items-center gap-3">
                <Clipboard size={24} className="text-gold-500" /> Kit de Gestión
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Herramienta 1: Cartas de Arte */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100 transition duration-300 hover:shadow-xl">
                    <div className="flex items-center gap-3 mb-4 text-gold-600">
                        <Send size={24} />
                        <h3 className="text-xl font-semibold">Gestión de Cartas de Arte</h3>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">
                        Genera cartas de presentación, agradecimiento y otros documentos personalizados listos para enviar a galerías, clientes o prensa.
                    </p>
                    {/* Botón de ejemplo */}
                    <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gold-500 transition-colors">
                        Abrir Generador
                    </button>
                </div>
                
                {/* Herramienta 2: Certificados y Documentación */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100 transition duration-300 hover:shadow-xl">
                    <div className="flex items-center gap-3 mb-4 text-gold-600">
                        <FileText size={24} />
                        <h3 className="text-xl font-semibold">Certificados Digitales (COA)</h3>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">
                        Accede, revisa y descarga los certificados de autenticidad de tus obras.
                    </p>
                    {/* Botón de ejemplo */}
                    <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gold-500 transition-colors">
                        Gestionar Documentos
                    </button>
                </div>

                {/* Herramienta 3: Archivo Digital */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100 transition duration-300 hover:shadow-xl">
                    <div className="flex items-center gap-3 mb-4 text-gold-600">
                        <Folder size={24} />
                        <h3 className="text-xl font-semibold">Archivo de Obra</h3>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">
                        Organiza y almacena fichas técnicas, imágenes de alta resolución y borradores asociados a cada obra.
                    </p>
                    {/* Botón de ejemplo */}
                    <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gold-500 transition-colors">
                        Ver Archivos
                    </button>
                </div>

            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-stone-100 font-sans">
      <header className="bg-white shadow-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold text-slate-800 uppercase tracking-wider">
            ESTUDIO (Modo Gestión)
          </h1>
        </div>
      </header>

      {/* Navegación - Solo mostramos la pestaña KIT */}
      <div className="bg-stone-100 border-b border-stone-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-4">
          {sections.map(section => (
            <button
              key={section.id}
              // El botón de KIT siempre estará "activo"
              className={`flex items-center space-x-2 py-3 px-4 font-semibold text-sm transition-all text-gold-600 border-b-2 border-gold-600`}
            >
              <section.icon size={18} />
              <span>{section.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};