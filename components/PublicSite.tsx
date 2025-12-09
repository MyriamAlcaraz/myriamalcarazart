// ... (código anterior)

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800">
      {/* Navigation ... (Menú de navegación) */}
      
      {/* Contenido Principal */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Pestaña de Portfolio ... (omitido) */}

        {/* =======================================================
           🛑 SECCIÓN BIOGRAFÍA (TAB: BIO) - ¡ACTUALIZADO!
           ======================================================= */}
        {activeTab === 'bio' && (
          <div className="pt-6">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2">
                <h2 className="font-serif text-3xl font-bold mb-4">Sobre {ARTIST_INFO.name}</h2>
                <p className="text-slate-600 mb-6 leading-relaxed">{ARTIST_INFO.bioShort}</p>
                
                <h3 className="font-serif text-xl font-bold mt-8 mb-4 border-b pb-2">Declaración Artística (Statement)</h3>
                <p className="italic text-slate-700 leading-relaxed border-l-4 border-gold-500/50 pl-4 py-1">{ARTIST_INFO.statement}</p>
              </div>

              <div className="md:col-span-1">
                <img src="/artist_profile.jpg" alt={ARTIST_INFO.name} className="w-full h-auto object-cover shadow-xl rounded-lg border-4 border-gold-500/10" />
              </div>
            </div>

            <hr className="my-12 border-stone-200" />
            
            {/* TRAYECTORIA (Accolades & Publications) - NUEVA ESTRUCTURA */}
            <div className="grid md:grid-cols-2 gap-10">
              
              {/* Columna de ACLAIMACIONES/EXPOSICIONES */}
              <div>
                <h3 className="font-serif text-xl font-bold mb-4 text-gold-600">Aclamaciones y Exhibiciones</h3>
                
                {ARTIST_INFO.accolades?.exposiciones && (
                    <>
                        <h4 className="font-bold mt-6 mb-2 text-slate-700">Exposiciones Colectivas</h4>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                            {ARTIST_INFO.accolades.exposiciones.map((item, index) => (
                                <li key={`exp-${index}`}>{item}</li>
                            ))}
                        </ul>
                    </>
                )}

                {ARTIST_INFO.accolades?.concursos && (
                    <>
                        <h4 className="font-bold mt-6 mb-2 text-slate-700">Concursos y Finalistas</h4>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                            {ARTIST_INFO.accolades.concursos.map((item, index) => (
                                <li key={`conc-${index}`}>{item}</li>
                            ))}
                        </ul>
                    </>
                )}
              </div>

              {/* Columna de PUBLICACIONES */}
              <div>
                <h3 className="font-serif text-xl font-bold mb-4 text-gold-600">Publicaciones</h3>
                {ARTIST_INFO.publications && (
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                        {ARTIST_INFO.publications.map((item, index) => (
                            <li key={`pub-${index}`}>{item}</li>
                        ))}
                    </ul>
                )}
                
                {/* Asumo que aquí se podrían añadir colecciones, pero se deja vacío por ahora */}
              </div>
            </div>
            
          </div>
        )}
        
        {/* Pestaña de Precios ... (omitido) */}

      </main>

      {/* Footer ... (omitido) */}
    </div>
  );
};