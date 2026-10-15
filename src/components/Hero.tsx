import React, { useState } from 'react';
import { Calendar, ChevronRight, Sparkles, Droplets, Moon, Sun, Compass } from 'lucide-react';
import { RESTAURANT_IMAGES, RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, onExploreMenu }) => {
  const [fountainMode, setFountainMode] = useState<'calm' | 'ballet'>('calm');
  const [lightingMode, setLightingMode] = useState<'twilight' | 'nocturne'>('twilight');

  return (
    <section id="top" className="relative w-full overflow-hidden bg-[#0D0B0A] border-b border-[#2C241D]">
      {/* Background ambient radial glow evoking the warm travertine lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.14),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Proposition & Architectural Soul */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
              <span>Pavillon de Haute Gastronomie</span>
            </div>

            <div className="space-y-3">
              <span className="font-cinzel text-sm sm:text-base tracking-[0.3em] text-[#B8A898] uppercase block">
                Architecture &middot; Braises &middot; Grand Cru
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#F7F3EE] leading-[1.12] [text-wrap:balance]">
                L'Élégance Monumentale entre Pierre Calcaire et Miroir d'Eau
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#B5A99D] font-light leading-relaxed max-w-xl">
              Au cœur de la cité, le pavillon <span className="text-[#F3DC9B] font-medium font-cinzel">MORRA</span> déploie ses grandes arches de travertin, son portail sculpté en corolle de pétales et son bassin où scintillent les orbes dorés. Une scène grandiose orchestrée pour une haute cuisine d’émotion et de mémoire.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenReservation}
                className="flex items-center justify-center gap-3 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-[#0D0B0A] bg-[#D4AF37] hover:bg-[#E5C378] active:scale-[0.98] transition-all border border-[#F3DC9B] shadow-xl shadow-[#D4AF37]/10"
              >
                <Calendar className="w-4 h-4 text-[#0D0B0A]" />
                <span>Réserver une Table</span>
              </button>

              <button
                onClick={onExploreMenu}
                className="flex items-center justify-center gap-2 px-6 py-4 text-xs font-medium uppercase tracking-wider text-[#E8E1D9] bg-transparent hover:bg-[#1A1613] border border-[#3E342B] hover:border-[#736353] transition-all"
              >
                <span>Découvrir la Carte</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </div>

            {/* Unboxed Metadata without pill badges */}
            <div className="pt-6 border-t border-[#241E18] flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#8E8072]">
              <span className="flex items-center gap-1.5 text-[#D4AF37]">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[#EDE5DA] font-medium">Candidat 3 Étoiles Michelin 2026</span>
              </span>
              <span aria-hidden="true" className="text-[#3E342B]">&middot;</span>
              <span>{RESTAURANT_INFO.address}</span>
              <span aria-hidden="true" className="text-[#3E342B]">&middot;</span>
              <span>Service Soirée 19h00 – 23h30</span>
            </div>
          </div>

          {/* Right Column: Hero Visual featuring the MORRA Facade */}
          <div className="lg:col-span-6 relative">
            <div className="relative group overflow-hidden border border-[#3A3026] bg-[#14110E] shadow-2xl">
              
              {/* Interactive Atmospheric Overlay Controls (Functional Buttons) */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-[#0D0B0A]/85 backdrop-blur-md p-1 border border-[#3E342B]">
                <button
                  onClick={() => setLightingMode(lightingMode === 'twilight' ? 'nocturne' : 'twilight')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-[#EDE5DA] hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
                  title="Changer l'ambiance lumineuse"
                >
                  {lightingMode === 'twilight' ? <Sun className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Moon className="w-3.5 h-3.5 text-[#D4AF37]" />}
                  <span>{lightingMode === 'twilight' ? 'Crépuscule Doré' : 'Nuit Étoilée'}</span>
                </button>
                <span className="text-[#3E342B]">&middot;</span>
                <button
                  onClick={() => setFountainMode(fountainMode === 'calm' ? 'ballet' : 'calm')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-[#EDE5DA] hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
                  title="Activer le ballet des jets d'eau"
                >
                  <Droplets className={`w-3.5 h-3.5 ${fountainMode === 'ballet' ? 'text-[#38BDF8] animate-pulse' : 'text-[#8E8072]'}`} />
                  <span>{fountainMode === 'ballet' ? 'Jets en Ballet' : 'Miroir Calme'}</span>
                </button>
              </div>

              {/* Main Facade Image */}
              <div className="aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] w-full overflow-hidden relative">
                <img
                  src={RESTAURANT_IMAGES.hero}
                  alt="Façade monumentale du restaurant MORRA avec arches de travertin, portail en pétales de pierre et bassin illuminé"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.02] ${
                    lightingMode === 'nocturne' ? 'brightness-90 contrast-110' : 'brightness-100'
                  }`}
                />

                {/* Subtle animated fountain ripple overlay when ballet is active */}
                {fountainMode === 'ballet' && (
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0284C7]/20 via-transparent to-transparent pointer-events-none animate-pulse" />
                )}
              </div>

              {/* Architectural Caption Strip */}
              <div className="p-4 bg-[#14110E] border-t border-[#2A231C] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#A89A8C]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                  <span className="font-serif text-sm text-[#F0EBE1] italic">
                    Le Pavillon MORRA &middot; Portail Pétales &amp; Miroir d'Eau
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-[#8E8072]">
                  <span>Arches de 8 mètres</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>140 couverts sur deux niveaux</span>
                </div>
              </div>
            </div>

            {/* Corner architectural brass accent */}
            <div className="hidden sm:block absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-[#D4AF37]/40 pointer-events-none" />
          </div>

        </div>

        {/* 4-Column Architectural Pillar Strip */}
        <div className="mt-14 pt-8 border-t border-[#241E18] grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#7A6D5F] mb-1">Architecture</div>
            <div className="font-serif text-base text-[#EDE5DA]">Travertin &amp; Verre Monumental</div>
            <div className="text-xs text-[#9E9081] mt-0.5">Arches de 8m &amp; corolle sculptée</div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-[#7A6D5F] mb-1">Cuisine</div>
            <div className="font-serif text-base text-[#EDE5DA]">Haute Gastronomie au Feu</div>
            <div className="text-xs text-[#9E9081] mt-0.5">Produits rares, poissons &amp; wagyu A5</div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-[#7A6D5F] mb-1">Scénographie</div>
            <div className="font-serif text-base text-[#EDE5DA]">Miroir d'Eau &amp; Orbes Dorés</div>
            <div className="text-xs text-[#9E9081] mt-0.5">Bassin réfléchissant &amp; fontaines</div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-[#7A6D5F] mb-1">La Cave</div>
            <div className="font-serif text-base text-[#EDE5DA]">1 800 Références d'Exception</div>
            <div className="text-xs text-[#9E9081] mt-0.5">Grands Crus &amp; Champagnes rares</div>
          </div>
        </div>

      </div>
    </section>
  );
};
