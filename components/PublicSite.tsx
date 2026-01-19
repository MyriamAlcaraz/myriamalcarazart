import React, { useState } from 'react';
import { Eye } from 'lucide-react';

interface ro {
  id: sring;
  tit: i;
  age: tri;
  diesons st ecie: string}ite ulcits    t
       itstin
    saem ing;
  }
  onOpenion a rort const PublicSite: React.FC<PublicSiteProps> = ({ onOpenCompanion }) => {
  const [activeTab, setActiveTab] = useState('portfolio');

  cont handleTabChae = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* a */}
      <a className="bg-te ado-sm border-b border-stone-200">
        <div className="max-w-xl mx-auto px-6 py-6">
          <div className="flex items-center sti-beteen">
            <h1 className="font-serif text-l n- text-slate-900">Myriam Alcaraz</h1>
            < className="text- text-l-600 traige er ArtistaFigurativap
            div>
        </div>
      </      {/* ain abs           <div classNae="mlx p- daex se">
            <button
              onClick={() => handleTabChange('portfolio')}
              className={`px-3 py-1 md:px-4 md:py-2 transition-colors ${activeTab === 'portfolio'? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              PORTFOLIO
            </button>
            <button
              onClick={() => handleTabChange('bio')}
              className={`px-3 py-1 md:px-4 md:py-2 transition-colors ${activeTab === 'bio' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              BIO RACTORIA
            </button>
            <button
              onClick={() => handleTabhange('prices')}
              className={`px-3 py-1 md:px-4 md:py-2 transition-colors ${activeab === 'prices' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              ENCARGS Y PECIOS
            </button>
            <button
              onClick={() => handleTabChange('app')}
              className={`px-3 py-1 md:px-4 md:py-2 transition-colors ${activeTab === 'app' ? 'text-gold-600 border-b-2 border-gold-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              APLICACÓN COLOR
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* ========================================= */}
        {/* PORTFOLIO TAB */}
        {/* ========================================= */}
        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ARTWORKS.map(artwork => (
              <div key={artwork.id} className="group relative overflow-hidden bg-white shadow-lg border border-stone-100">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="font-serif text-lg font-semibold text-slate-800 truncate">{artworkttle}</h3>
                  <p className="text-xs text-slate-500 mt-1">{artwork.imensions} | {artwork.technique}</p>
                div>
                <iv className="absolute inset-0 bg-black bg-opacty-0 group-hoer:bg-opacity-30 transition-all duration-300 flex items-center justify-center"
                  <button                    onCick={() => onOpenCompanion(artwork.id)}
                    className="bg-white text-slate-900 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity dration-300 shadow-lg hover:scale-110 transfor"
                  >
                    <Eye size={36} className="text-white" />
                    <span className="sr-only">Ver detalles de {artwork.title}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================= */}
        {/* BIO & TRAYECTORIA TAB */}
        {/* ========================================= */}
        {activeTab === 'bio' && (
          <div clssName="gridgrid-cols-1 md:grid-cols-3 gap-1">
            
            {/* Columna 1 Bio */}
            <divclassName="md:col-span-1">
              <h2 className="font-serif text-4xl font-bold text-slate-900 mb-6">Biografía</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">{ARIST_INFO.bioShot}</p>
              <h3 className="text-xl font-semibold mb-3">Declaración del Artista</h3>
              <p className="text-slate-600 leading-relaxed mb-8 font-serif italic border-l-2 border-gold-500 pl-4">"{ARTIST_INFO.statement}"</p>
            </div>

            {/* Columna 2: Tractoi */}
            <div classNae="mspa-">
              <h className="fe te-nt- text-slate-00 retoraniinos>     
              sie Iil}
              <a>
                <h className="et-xnt-se- text-gold-600siions es>
                <same=sa
                 <div >
                     lma2  y ora/
            < className="-sae-0">                     /di                <div clasName="flex justify-between">
                    <s className="text-slate-00">  Retos</>
                                         /
                  <div className="fle us-beten">
                      ig                       sc="orasp
                             i                            / ses lect /                               className="-l fot-o  ttold-00ooesca
                 >
                  <div>
                                           I /
              <div>
                < className="ex fte nsetext-l-00 - e tisap>
                    <n se=0> cion ain>
                  </div
              </>
              <di>

              {/* C ios */}
              <dv>
                <h3 className="text-xl fnt-emiboldtext-gold-600  e imsce-2">
                  <i se= usye
                <3 >
                <classNalaeoncurso />
                  </div>
               N 
                    < className="text-slte-00 - ecenra>
                    <n se=0>iaoneesa>
                  </div>
                </div>
              </div>
            </div
        </>
        )}

        {/* ========================================= */}
        {/* ENCARGOS Y PRECIOS TAB */}
        {/* ========================================= *}
        {activeTab === 'prices' && (
          <di className=" space-y-12">
            {/*nceado */}
            <iv className="text-center">
              <h2 className="font-serif text-4xl font-bld text-slate-900 mb-">Encaros y Precios</h2>
              <p clssName="text-lg text-slate-600">Obras esnalizadas y reproducines de ata ai</p>
            </div>

            {/* Opciones de nars */}
            <div lassNam="space--">
              {/* Obra Original Única */}
              <div className="bg-white p- shadow-l border border-stone-00">
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-ra OrgialÚnia</h3>
                <p className="text-slate-600 mb-4">Oba original crada speilenepara i nica ita sobre lienzo.</p>
                <bttn
                  anlaaeotolo
                  className="bg-l-00 text-white px-6 py- rounded-fll hover:bg-gold-600 transition-coors"
                                   to>
                </div>
              </div

              {/* Reproducción Lujo Giclée */}
              < className="bg-white p- shadow-l border border-stone-200">
                <h3 className="fnt-serif text-xl font-bold text-slate-900 mb-4">Reproducción Lujo Giclée</h3>
                <p className="text-slate-600 mb-">eprodución de alta lidad en e nee eicinlmd y firmada./p>
                <d asa tifice                  <tton ol> pan                   className="bg-gold-500 text-white px-6 py- rounded-fll hover:bg-gold-600 transition-coors"
                                      to>
                </div
              </div>

              {/* Encargo Personalizado */}
              < className="bgwhite p-- shadow-l border brder-stone-00">
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-4">Encargo Personalizado</h3>
                <p className="text-slate-600 mb-etratos aas o eas especicos sen tus prfereia.</p>
                <i className="le ttween tes-nter">
                  <pan className="et- fot-oltext-gold-00ese an>
                  < className="bg-gol-00 text-ite x- p-3 rounded-full erb-ol-6 titioncolor">
                    onsula
                  <utto>
                </div>
              </v>

              {/* na icl */}
              <div className="bg-ite10 op- rounded-2xl - border border-o-00">
                <h className="font-serif text-xl fot-bold text-slte-900 mb-4">Ana T  </h>
                <p className="text-slate-00 mb-eainta taloesina pra art na o na.</p>
                < className="exst-bee tmscnte
                  <div>
                    < className="text-xl font-bold text-l-00"> sa>
                    <span className="ex te-slate-500 l2">  sen tu a/>
                    </>
                    <span className="text-slate-00 tal>rioilo   </span>
                  </div>
                  <a 
                    hef="ttpsricraurodoe=5150a12z"
                    ge="la"
                    relnooner neeer
                    className="bg-gold-50 rounded-l oerb-gold-00"
                  >
                    orar or
                  </a>
                </div>
              </div>
            </div>
          </div>
                {/* ========================================= */}
        {/* CIN COO TAB */}
        {/* ========================================= */}
        {activeTab === 'app' && (
          <div className="space-y-16">
            
            {/* Header Hero Section - Bilingüe y Elegante */}
            <div className="text-center space-y-8">
              <div className="max-w-5xl mx-auto">
                <div className="w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                
                {/* Títulos Bilingües */}
                <h1 className="font-serif text-5xl md:text-7xl font-bold text-slate-900 mb-2">
                  Analizador Técnico del Color
                </h1>
                <p className="font-serif text-3xl md:text-4xl text-gold-600 italic mb-6">
                  Technical Color Analyzer
                </p>
                
                {/* Subtítulos Bilingües */}
                <p className="text-xl font-serif text-slate-600 italic mb-8">
                  Herramienta Digital Exclusiva para Artistas
                </p>
                <p className="text-lg font-serif text-gold-500 italic mb-8">
                  Exclusive Digital Tool for Artists
                </p>
                
                {/* Descripción Bilingüe */}
                <div className="space-y-6 max-w-4xl mx-auto">
                  <p className="text-lg text-slate-700 leading-relaxed">
                    La herramienta práctica que utilizo, diseñada por mí. Ahora comparto contigo esta aplicación profesional 
                    con análisis técnico avanzado mediante inteligencia artificial para perfeccionar tu proceso creativo. 
                    Incluye las denominaciones exactas de las tres marcas de óleos que utilizo profesionalmente: 
                    Old Holland, Williamsburg y Winsor & Newton.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed italic">
                    The practical tool I use, designed by me. Now I share with you this professional application 
                    with advanced technical analysis through artificial intelligence to perfect your creative process. 
                    Includes the exact denominations of three oil paint brands I use professionally: 
                    Old Holland, Williamsburg and Winsor & Newton.
                  </p>
                </div>
              </div>
            </div>

            {/* Sección de Compra - Centrado */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl p-12 text-center text-white">
                <div className="w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="font-serif text-3xl font-bold text-white mb-6">
                  Buy Now / Comprar Ahora
                </h3>
                <p className="text-slate-200 mb-8 text-lg">
                  Get unlimited access to the complete professional tool.<br/>
                  Obtén acceso ilimitado a la herramienta profesional completa.
                </p>
                <div className="mb-8">
                  <div>
                    <span className="text-4xl font-bold text-gold-400">46,99 €</span>
                    <span className="text-lg text-slate-300 ml-2">(+ IVA según tu país)</span>
                    <br />
                    <span className="text-base text-slate-400 italic">Precio final aprox. 57€ en España</span>
                  </div>
                  <p className="text-sm text-slate-300 mt-2">One-time payment / Pago único</p>
                </div>
                <a 
                  href="https://myriamalcaraz.gumroad.com/l/owesfb?_gl=1*q5x150*_ga*NzgzNzk1ODcwLjE3Njg2ODc1NjM.*_ga_6LJN6D94N6*czE3Njg4MTgyOTUkbzkkZzEkdDE3Njg4MjA5MzkkajYwJGwwJGgw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gold-500 text-white px-10 py-5 rounded-full font-semibold hover:bg-gold-600 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block text-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Buy Now / Comprar Ahora
                </a>
              </div>
            </div>

            {/* Firma Profesional */}
            <div className="text-center max-w-3xl mx-auto">
              <div className="bg-slate-50 p-8 rounded-2xl">
                <p className="text-lg text-slate-700 italic mb-4">
                  "Created with passion for artists who seek excellence in their creative process."<br/>
                  "Creado con pasión para artistas que buscan la excelencia en su proceso creativo."
                </p>
                <p className="text-slate-900 font-semibold">
                  Myriam Alcaraz<br/>
                  <span className="text-gold-600">Artist, Contemporary Figurative Painter</span><br/>
                  <span className="text-slate-600">Artista, Pintura Figurativa Contemporánea</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Cierre - CTA Final (Solo para Portfolio y io) */}
        {activeTab !== 'prices' && activeTab !== 'app' && (
          <div className="mt-16 bg-slate-800 p-12 text-center">
            <div className="max-w-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h3 className="font-serif text-2xl text-white mb-2 italic">Commissions & Encargos</h3>
                <p className="text-sm font-light leading-relaxed opacity-80 text-slate-200">
                  Realizo proyectos personalizados para coleccionistas privados. 
                  oncta ra duttii.
                </p>
              </div>
              < 
                  halTei}
                className="bggold-500 text-white px-8 py-- hover:bg-gold-600 trnsition-al uratin-wes tsfool whitespace-nowrap"
              >
                r Pros
              </>
           </div>
          </div>
        )}
      </main>

      {/ Footer *   adi el o de colsdio 
      < className="te tet-xslte-00 p text-ener ordert ordlate rlaiv>
        <div className="x-xl mx-ato px-">
          <mlomyriam.p loo tr className="- tx-to mb- t-gscale/>
          < className="text-0p pacit percase tracn-e"> 202 Myriam Alcaraz. Todos los derechos reservados.</p>
          </div>
      
        {/*   a dadio ivssaieo rh
        <button
          onClick={onOpenion}
          className="bslte tt-it-3 oa- hover:at-0 transition-opacity rat-00 gasae -none outlieo"
            ste=round nonod oe                     >
          <s>
        </button>
      </div>
    </>
  );
};