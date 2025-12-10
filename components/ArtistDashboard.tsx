import React, { useState } from 'react';
import { LogOut, Layout, Palette, Users, BarChart, FileText, Image as ImageIcon, CreditCard, ShieldCheck, Settings, X, Edit, ChevronRight, Download } from 'lucide-react'; 
import { ARTIST_INFO, ARTWORKS, PRICING_TABLE, ANALYSIS_POINTS } from '../constants';
// 🛑 IMPORTACIÓN CLAVE: Necesitamos DigitalCompanion aquí para el Certificado
import { DigitalCompanion } from './DigitalCompanion'; 

// --- INTERFACES ---
interface ArtistDashboardProps {
  onLogout: () => void;
}

// =======================================================
// 1. COMPONENTE: VISIÓN GENERAL (Dashboard Home)
// ... (Sin cambios aquí)
// =======================================================
const DashboardOverview: React.FC = () => {
    // Datos de ejemplo para las métricas (pueden ser dinámicos en el futuro)
    const stats = [
        { title: "Obras en Catálogo", value: ARTWORKS.length, icon: Palette, color: "gold" },
        { title: "Certificados Emitidos", value: 12, icon: ShieldCheck, color: "slate" }, // Ejemplo
        { title: "Margen Bruto Giclée", value: "72%", icon: CreditCard, color: "gold" },
        { title: "Ventas (Último Mes)", value: "€ 3.400", icon: BarChart, color: "slate" }, // Ejemplo
    ];
    
    const renderAnalysisPoints = (title: string, items: string[], icon: React.ElementType, color: string) => (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100 h-full">
            <h3 className={`text-xl font-serif font-bold mb-4 flex items-center gap-3 text-${color}-700 border-b border-${color}-100 pb-3`}>
                {React.createElement(icon, { size: 20 })} {title}
            </h3>
            <ul className="space-y-3">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start text-sm text-slate-700">
                        <ChevronRight size={16} className={`flex-shrink-0 mr-2 mt-1 text-${color}-500`} />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );


    return (
        <div className="space-y-8">
            <h2 className="font-serif text-4xl font-bold text-slate-800 border-b border-stone-200 pb-4">Taller Práctico: Resumen Ejecutivo</h2>
            
            {/* Fila de Métricas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-gold-500">
                        <stat.icon size={24} className={`text-${stat.color}-600 mb-2 opacity-70`} />
                        <p className="text-sm font-semibold text-slate-500">{stat.title}</p>
                        <p className="text-3xl font-serif font-bold text-slate-900 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Análisis DAFO Rápido */}
            <h2 className="font-serif text-3xl font-bold text-slate-800 pt-4">Análisis de Posicionamiento</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {renderAnalysisPoints("Puntos Fuertes Clave", ANALYSIS_POINTS.strengths, ShieldCheck, "gold")}
                {renderAnalysisPoints("Oportunidades Estratégicas", ANALYSIS_POINTS.opportunities, FileText, "slate")}
            </div>
            
            {/* Llama a la acción para gestionar */}
            <div className="bg-stone-100 p-6 rounded-xl text-center mt-8">
                <p className="font-serif text-xl font-semibold text-slate-700 mb-3">Tu Kit de Herramientas de Lujo</p>
                <p className="text-slate-600 text-sm">Usa la barra lateral para acceder a la gestión de **Inventario** o generar **Certificados y Listas de Precio**.</p>
            </div>
        </div>
    );
}

// =======================================================
// 2. COMPONENTE: KIT DE DOCUMENTOS (Certificados y Precios) 🛑 MODIFICADO
// =======================================================
const DocumentsKit: React.FC = () => {

    const [selectedArtworkId, setSelectedArtworkId] = useState<string | null>(null);
    const [showCertificateModal, setShowCertificateModal] = useState(false);

    // Función para obtener la fila de precios del tamaño (Se mantiene)
    const getPriceRow = (dimensions: string) => {
        return PRICING_TABLE.find(row => row.dimensions === dimensions);
    }
    
    // Función para abrir el modal del Certificado
    const handleOpenCertificate = (id: string) => {
        setSelectedArtworkId(id);
        setShowCertificateModal(true);
    }
    
    // Función para cerrar el modal del Certificado
    const handleCloseCertificate = () => {
        setShowCertificateModal(false);
        setSelectedArtworkId(null);
    }

    return (
        <div className="space-y-8">
            <h2 className="font-serif text-4xl font-bold text-slate-800 border-b border-gold-500 pb-4 flex items-center gap-3">
                <FileText size={30} className="text-gold-600"/> Kit de Documentos de Lujo
            </h2>
            
            <p className="text-slate-700 max-w-3xl">Genera en segundos el Certificado de Autenticidad definitivo para cada obra vendida y gestiona tus Listas de Precio de forma profesional.</p>

            {/* Subsección 1: Generador de Certificados */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100">
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <ShieldCheck size={24} className="text-gold-500"/> Certificado de Autenticidad
                </h3>
                <p className="text-sm text-slate-600 mb-4">Selecciona la obra para generar y imprimir el Certificado de Autenticidad definitivo (vista de alta resolución).</p>
                
                {/* Selector de Obra */}
                <div className="flex items-center gap-4">
                    <select
                        onChange={(e) => setSelectedArtworkId(e.target.value)}
                        className="p-3 border border-stone-300 rounded-lg flex-grow max-w-md"
                        defaultValue=""
                    >
                        <option value="" disabled>-- Selecciona una Obra --</option>
                        {ARTWORKS.map(a => (
                            <option key={a.id} value={a.id}>
                                {a.title} ({a.year || '2025'})
                            </option>
                        ))}
                    </select>

                    <button 
                        onClick={() => selectedArtworkId && handleOpenCertificate(selectedArtworkId)}
                        disabled={!selectedArtworkId}
                        className={`text-white px-6 py-3 rounded-lg font-bold transition-colors text-sm flex items-center gap-2 ${
                            selectedArtworkId ? 'bg-gold-500 hover:bg-gold-600' : 'bg-stone-300 cursor-not-allowed'
                        }`}
                    >
                        <Download size={18}/> {selectedArtworkId ? 'VER E IMPRIMIR CERTIFICADO' : 'Selecciona una obra'}
                    </button>
                </div>
            </div>

            {/* Subsección 2: Listas de Precios (Se mantiene) */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100">
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <CreditCard size={24} className="text-gold-500"/> Listas de Precio (Giclée / Encargo)
                </h3>
                <p className="text-sm text-slate-600 mb-4">Tabla de referencia para establecer precios de obra original y para guiar presupuestos de encargos. (Precios sin IVA).</p>
                
                {/* Tabla de Precios (Se mantiene) */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-stone-200">
                        <thead className="bg-stone-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Dimensiones (cm)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Precio Base (Original - €)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Precio con Impuestos (21% - €)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Ratio Precio/cm²</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-stone-200">
                            {PRICING_TABLE.map((row, index) => {
                                const areaCm2 = parseFloat(row.dimensions.split('x')[0]) * parseFloat(row.dimensions.split('x')[1]);
                                const ratio = row.priceBase / areaCm2;
                                return (
                                    <tr key={index} className="hover:bg-gold-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{row.dimensions}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{row.priceBase.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{row.priceWithTax.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">{ratio.toFixed(4)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 🛑 MODAL DEL CERTIFICADO (DigitalCompanion en modo Certificado) */}
            {showCertificateModal && selectedArtworkId && (
                <DigitalCompanion
                    artworkId={selectedArtworkId}
                    onClose={handleCloseCertificate}
                    showCertificateAccess={true} // Siempre TRUE porque estamos en el TALLER
                    initialMode='certificate' // Forzamos la apertura directa al certificado
                />
            )}
        </div>
    );
}

// ... (DigitalInventory y ArtistDashboard se mantienen iguales, pero ahora DocumentsKit es más funcional)
// =======================================================
// 3. COMPONENTE: INVENTARIO DIGITAL
// =======================================================
const DigitalInventory: React.FC = () => {
    
    // Simulación de una Obra seleccionada para edición
    const [editingArtwork, setEditingArtwork] = useState<typeof ARTWORKS[0] | null>(null);

    return (
        <div className="space-y-8">
            <h2 className="font-serif text-4xl font-bold text-slate-800 border-b border-gold-500 pb-4 flex items-center gap-3">
                <ImageIcon size={30} className="text-gold-600"/> Inventario Digital & Metadatos
            </h2>
            
            <p className="text-slate-700 max-w-3xl">Control total sobre tus obras. Edita títulos, dimensiones, descripciones y el estado de disponibilidad (Vendido / Disponible).</p>

            {/* Modal de Edición */}
            {editingArtwork && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-8 shadow-2xl max-w-lg w-full relative">
                        <button 
                            onClick={() => setEditingArtwork(null)}
                            className="absolute top-4 right-4 text-slate-500 hover:text-red-500 transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <h3 className="font-serif text-2xl font-bold text-slate-800 mb-4">Editar: {editingArtwork.title}</h3>
                        <form className="space-y-4">
                            <label className="block">
                                <span className="text-sm font-semibold text-slate-700">Título</span>
                                <input type="text" defaultValue={editingArtwork.title} className="mt-1 w-full p-2 border border-stone-300 rounded" />
                            </label>
                            <label className="block">
                                <span className="text-sm font-semibold text-slate-700">Año de Creación</span>
                                <input type="text" defaultValue={editingArtwork.year} className="mt-1 w-full p-2 border border-stone-300 rounded" />
                            </label>
                            <label className="block">
                                <span className="text-sm font-semibold text-slate-700">Precio Base (€)</span>
                                <input type="number" defaultValue={editingArtwork.priceBase} className="mt-1 w-full p-2 border border-stone-300 rounded" />
                            </label>
                            <label className="block">
                                <span className="text-sm font-semibold text-slate-700">Estado</span>
                                <select defaultValue={editingArtwork.status} className="mt-1 w-full p-2 border border-stone-300 rounded">
                                    <option value="available">Disponible</option>
                                    <option value="sold">Vendido</option>
                                    <option value="private">Colección Privada</option>
                                </select>
                            </label>
                            <button 
                                type="submit" 
                                onClick={(e) => { e.preventDefault(); alert(`Obra ${editingArtwork.title} actualizada! (Simulación)`); setEditingArtwork(null); }}
                                className="bg-gold-500 text-white w-full py-2 rounded font-bold hover:bg-gold-600 transition-colors mt-4"
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Listado de Obras */}
            <div className="bg-white rounded-xl shadow-lg border border-stone-100 overflow-hidden">
                <table className="min-w-full divide-y divide-stone-200">
                    <thead className="bg-stone-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-1/4">Obra</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Dimensiones</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Año</th>
                            <th className="px-6 py-3 text-left text-xs font-font-medium text-slate-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Precio Base</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-stone-200">
                        {ARTWORKS.map((artwork) => (
                            <tr key={artwork.id} className="hover:bg-gold-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 flex items-center gap-3">
                                    <img src={artwork.image} alt={artwork.title} className="h-10 w-10 object-cover rounded" />
                                    {artwork.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{artwork.dimensions}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{artwork.year || '2025'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        artwork.status === 'available' ? 'bg-green-100 text-green-800' : 
                                        artwork.status === 'sold' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {artwork.status === 'available' ? 'Disponible' : artwork.status === 'sold' ? 'Vendido' : 'Privada'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{artwork.priceBase.toFixed(2)} €</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        onClick={() => setEditingArtwork(artwork)} 
                                        className="text-gold-600 hover:text-gold-900 transition-colors"
                                        aria-label={`Editar ${artwork.title}`}
                                    >
                                        <Edit size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// =======================================================
// 4. COMPONENTE PRINCIPAL: ArtistDashboard
// =======================================================
export const ArtistDashboard: React.FC<ArtistDashboardProps> = ({ onLogout }) => {
  // Define las vistas del dashboard
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'kit' | 'settings'>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'inventory':
        return <DigitalInventory />;
      case 'kit':
        return <DocumentsKit />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardOverview />;
    }
  };
  
  // Componente placeholder para Settings
  const SettingsView = () => (
      <div className="p-8 bg-white rounded-xl shadow-lg border border-stone-100">
          <h2 className="font-serif text-3xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <Settings size={24} className="text-slate-600"/> Configuración del Estudio
          </h2>
          <p className="text-slate-600">Aquí podrás gestionar la clave de acceso, el email de contacto y otros parámetros de la web.</p>
          <button 
              onClick={onLogout} 
              className="mt-6 bg-red-500 text-white px-6 py-2 rounded font-bold hover:bg-red-600 transition-colors text-sm flex items-center gap-2"
          >
              <LogOut size={16}/> Cerrar Sesión
          </button>
      </div>
  );


  return (
    <div className="flex min-h-screen bg-stone-100">
      
      {/* 🛑 LADO IZQUIERDO: Barra de Navegación del Estudio (Elegante y Fija) */}
      <nav className="w-64 bg-white shadow-2xl fixed h-screen flex flex-col justify-between p-6">
        <div>
          {/* Título del Taller */}
          <div className="mb-10 pt-4 border-b border-stone-200 pb-4">
              <h1 className="font-serif text-xl tracking-[0.05em] text-slate-900 font-bold">MYRIAM ALCARAZ</h1>
              <p className="text-[10px] text-gold-600 tracking-[0.2em] uppercase mt-1">Taller Práctico (Dashboard)</p>
          </div>
          
          {/* Menu Principal */}
          <ul className="space-y-2">
            {[
              { id: 'dashboard', label: 'Resumen Ejecutivo', icon: Layout },
              { id: 'inventory', label: 'Inventario Digital', icon: ImageIcon },
              { id: 'kit', label: 'Kit de Documentos', icon: FileText },
              { id: 'settings', label: 'Configuración', icon: Settings },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id as 'dashboard' | 'inventory' | 'kit' | 'settings')}
                  className={`flex items-center w-full p-3 rounded-lg text-sm font-semibold transition-colors gap-3 ${
                    activeTab === item.id
                      ? 'bg-gold-100 text-gold-700'
                      : 'text-slate-700 hover:bg-stone-100'
                  }`}
                >
                  <item.icon size={18} /> {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Botón de Logout */}
        <div className="pb-4">
            <button
              onClick={onLogout}
              className="flex items-center w-full p-3 rounded-lg text-sm font-semibold transition-colors gap-3 text-red-500 hover:bg-red-50 hover:text-red-700 border border-red-100"
            >
              <LogOut size={18} /> Cerrar Sesión
            </button>
        </div>
      </nav>

      {/* 🛑 LADO DERECHO: Contenido Principal */}
      <main className="flex-1 ml-64 p-8"> {/* ml-64 = w-64 de la barra lateral */}
        <div className="bg-white p-8 rounded-xl shadow-inner border border-stone-200 min-h-[90vh]">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};