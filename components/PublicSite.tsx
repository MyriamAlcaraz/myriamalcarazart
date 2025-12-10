// ... código anterior (líneas 1 a 144 sin cambios) ...

            {/* Columna 2 & 3: Trayectoria (CORRECCIÓN CON FOTO) */}
            <div className="md:col-span-2 space-y-10">
              
              {/* Contenedor del Título y la Foto para posicionarla en la esquina */}
              <div className="flex justify-between items-start mb-6 relative">
                  <h2 className="font-serif text-4xl font-bold text-slate-900">Trayectoria & Reconocimientos</h2>
                  
                  {/* 🛑 NUEVA FOTO DEL ARTISTA (Pequeña, B/N a Color al Hover) */}
                  <div className="w-28 h-28 overflow-hidden rounded-lg shadow-lg border-2 border-stone-200 ml-4 group transition-all duration-300 hover:shadow-xl">
                      <img
                          src="/obras/ARTISTA.jpg"
                          alt="Retrato de la Artista Myriam Alcaraz"
                          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                      />
                  </div>
              </div>
              
              {/* EXPOSICIONES */}
              <div>
                <h3 className="text-2xl font-serif font-semibold text-gold-600 mb-4 flex items-center gap-2">
                    <ChevronRight size={20} /> Exposiciones Colectivas (Selección)
                </h3>
                <AccoladeList items={ARTIST_INFO.accolades.exposiciones} />
              </div>

              {/* CONCURSOS */}
              <div>
                <h3 className="text-2xl font-serif font-semibold text-gold-600 mb-4 flex items-center gap-2">
                    <ChevronRight size={20} /> Concursos y Premios
                </h3>
                <AccoladeList items={ARTIST_INFO.accolades.concursos} />
              </div>
              
              {/* PUBLICACIONES */}
              <div>
                <h3 className="text-2xl font-serif font-semibold text-gold-600 mb-4 flex items-center gap-2">
                    <ChevronRight size={20} /> Publicaciones Destacadas
                </h3 >
                <AccoladeList items={ARTIST_INFO.publications} />
              </div>

            </div>
          </div>
        )}

// ... resto del código sin cambios ...