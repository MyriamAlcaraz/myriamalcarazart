import React, { useState } from 'react';
import { LogOut, Layout, Palette, Users, BarChart, FileText, Image as ImageIcon, CreditCard, ShieldCheck, Settings, X, Edit, ChevronRight, Download, Printer } from 'lucide-react'; 
import { ARTIST_INFO, ARTWORKS, PRICING_TABLE, ANALYSIS_POINTS } from '../constants';
// 🛑 Importación CLAVE: Necesitamos el componente Certificate directamente aquí.
import { Certificate } from './Certificate'; 
// DigitalCompanion se mantiene importado si se necesita globalmente, pero no lo usamos dentro del Kit de Documentos.

// --- INTERFACES ---
interface ArtistDashboardProps {
  onLogout: () => void;
}

// ... (DashboardOverview y DigitalInventory se mantienen sin cambios) ...

// =======================================================
// 2. COMPONENTE: KIT DE DOCUMENTOS (Certificados y Precios) 🛑 CORREGIDO
// =======================================================
const DocumentsKit: React.FC = () => {

    const [selectedArtworkId, setSelectedArtworkId] = useState<string | null>(null);
    
    // Obtenemos la obra seleccionada para la vista previa
    const selectedArtwork = ARTWORKS.find(a => a.id === selectedArtworkId) || null;

    // Función para imprimir el certificado
    const handlePrintCertificate = () => {
        if (selectedArtwork) {
            // Se utiliza window.print() para imprimir el Certificado.
            // En una aplicación real, esto activaría un CSS especial para impresión.
            window.print();
        }
    };

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
                <p className="text-sm text-slate-600 mb-4">Selecciona la obra para previsualizar y generar el Certificado de Autenticidad (PDF para imprimir).</p>
                
                {/* Selector de Obra y Botón */}
                <div className="flex items-center gap-4 mb-6 border-b border-stone-200 pb-6">
                    <select
                        onChange={(e) => setSelectedArtworkId(e.target.value)}
                        className="p-3 border border-stone-300 rounded-lg flex-grow max-w-sm"
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
                        onClick={handlePrintCertificate}
                        disabled={!selectedArtwork}
                        className={`text-white px-6 py-3 rounded-lg font-bold transition-colors text-sm flex items-center gap-2 ${
                            selectedArtwork ? 'bg-gold-500 hover:bg-gold-600' : 'bg-stone-300 cursor-not-allowed'
                        }`}
                    >
                        <Printer size={18}/> {selectedArtwork ? 'IMPRIMIR CERTIFICADO' : 'Selecciona una obra'}
                    </button>
                </div>

                {/* Vista Previa del Certificado */}
                {selectedArtwork ? (
                    <div className="mt-6 p-4 bg-stone-50 rounded-lg border border-stone-200">
                        <p className="text-sm font-semibold text-slate-700 mb-4">Vista Previa de Impresión:</p>
                        {/* 🛑 INTEGRACIÓN CLAVE: Usamos el componente Certificate directamente */}
                        <div className="max-w-4xl mx-auto shadow-2xl p-4 bg-white border border-stone-300">
                            <Certificate 
                                artwork={selectedArtwork} 
                                isPixelatedDemo={false} // Siempre FALSE en el Taller (acceso total)
                            />
                        </div>
                        <p className="text-xs text-center text-slate-500 mt-4">Usa el botón "IMPRIMIR CERTIFICADO" para generar el documento final.</p>
                    </div>
                ) : (
                    <div className="text-center p-12 bg-stone-50 rounded-lg border-2 border-dashed border-stone-300">
                        <ShieldCheck size={48} className="text-stone-400 mx-auto mb-3" />
                        <p className="text-slate-600">Selecciona una obra del menú superior para cargar la vista previa del Certificado de Autenticidad.</p>
                    </div>
                )}
            </div>

            {/* Subsección 2: Listas de Precios (Se mantiene) */}
            {/* ... (El resto del DocumentsKit y el resto del ArtistDashboard se mantienen iguales) */}

            <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100">
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <CreditCard size={24} className="text-gold-500"/> Listas de Precio (Giclée / Encargo)
                </h3>
                <p className="text-sm text-slate-600 mb-4">Tabla de referencia para establecer precios de obra original y para guiar presupuestos de encargos. (Precios sin IVA).</p>
                
                {/* Tabla de Precios */}
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
                                // Cálculo del ratio (Base / Área en cm²)
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
        </div>
    );
}
// ... (El resto de ArtistDashboard, DigitalInventory, etc., se mantiene igual) ...

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