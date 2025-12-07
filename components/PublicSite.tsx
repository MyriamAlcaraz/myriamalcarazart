// ARCHIVO: src/components/PublicSite.tsx (Solo la sección de Biografía)

// ... (Código superior, imports, etc.) ...

        {/* Biografía (CORREGIDO PARA INCLUIR LA FOTO CON EFECTO) */}
        {activeTab === 'bio' && (
          <div className="pt-8 max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl text-gold-600 mb-6 text-center border-b-2 border-gold-300 inline-block pb-2">Biografía y Declaración Artística</h2>
            <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col md:flex-row gap-8 items-start">
              
              {/* Bloque de Imagen (Añadido el efecto de escala de grises al hacer hover) */}
              <div className="w-full md:w-1/3 flex-shrink-0">
                  <img 
                      src="/bio-photo.jpg" 
                      alt="Fotografía de la artista Myriam Alcaraz" 
                      // 🛑 CLASES CRUCIALES PARA EL EFECTO: 
                      // 1. grayscale: Pone la imagen en blanco y negro por defecto.
                      // 2. hover:grayscale-0: Quita el filtro al hacer hover.
                      // 3. transition-all: Asegura una animación suave.
                      className="w-full h-auto object-cover rounded-lg shadow-lg border-2 border-gold-100 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
                  />
                  <p className="text-center text-xs text-slate-500 mt-2 italic">Myriam Alcaraz en su estudio.</p>
              </div>

              {/* Bloque de Texto */}
              <div className="w-full md:w-2/3 text-left">
                <h3 className="font-serif text-xl text-slate-900 mb-3">La Artista</h3>
                <p className="mb-6 leading-relaxed text-slate-700">{ARTIST_INFO.bioShort}</p>
                
                <h3 className="font-serif text-xl text-slate-900 mb-3 border-t border-slate-200 pt-4 mt-4">Declaración Artística (Artist Statement)</h3>
                <p className="italic leading-relaxed text-slate-700">"{ARTIST_INFO.statement}"</p>
              </div>
            </div>
          </div>
        )}

// ... (Resto del código) ...