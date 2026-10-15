import React, { useState } from 'react';
import { Columns, Sparkles, Droplets, Flower2, ArrowRight, Check } from 'lucide-react';
import { DINING_ZONES, DiningZone } from '../data/restaurantData';

interface InteriorDesignStoryProps {
  onSelectZoneForReservation: (zoneId: string) => void;
}

export const InteriorDesignStory: React.FC<InteriorDesignStoryProps> = ({ onSelectZoneForReservation }) => {
  const [selectedZone, setSelectedZone] = useState<DiningZone>(DINING_ZONES[0]);

  return (
    <section id="pavillon" className="py-20 lg:py-28 bg-[#110F0D] border-b border-[#2C241D] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-3">
            <span>01. Scénographie &amp; Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F7F3EE] [text-wrap:balance]">
            Le Dialogue entre la Pierre Sculptée, la Lumière et l'Eau Vive
          </h2>
          <p className="mt-4 text-[#A89A8C] leading-relaxed text-base sm:text-lg">
            Né d'une vision audacieuse alliant classicisme monumental et biomorphisme organique, le pavillon de <strong className="text-[#EDE5DA] font-medium font-cinzel">MORRA</strong> a été pensé comme un écrin lumineux où chaque détail architectural prolonge l'expérience gustative.
          </p>
        </div>

        {/* 4 Pillars Grid directly matching the uploaded facade */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          
          <div className="p-6 bg-[#161310] border border-[#2B231B] transition-all hover:border-[#D4AF37]/50 group">
            <div className="w-10 h-10 flex items-center justify-center text-[#D4AF37] bg-[#201B16] border border-[#3A3026] mb-5">
              <Flower2 className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-xl text-[#F2ECE4] mb-2">Le Portail Pétales</h3>
            <p className="text-sm text-[#9E9081] leading-relaxed">
              Une corolle monumentale en travertin sculpté en bas-relief, évoquant l’éclosion végétale et invitant les convives au cœur du sanctuaire.
            </p>
          </div>

          <div className="p-6 bg-[#161310] border border-[#2B231B] transition-all hover:border-[#D4AF37]/50 group">
            <div className="w-10 h-10 flex items-center justify-center text-[#D4AF37] bg-[#201B16] border border-[#3A3026] mb-5">
              <Columns className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-xl text-[#F2ECE4] mb-2">Grandes Arches de 8m</h3>
            <p className="text-sm text-[#9E9081] leading-relaxed">
              Des baies vitrées colossales couronnées d'arcs en plein cintre qui inondent la salle de lumière dorée et offrent une perspective panoramique.
            </p>
          </div>

          <div className="p-6 bg-[#161310] border border-[#2B231B] transition-all hover:border-[#D4AF37]/50 group">
            <div className="w-10 h-10 flex items-center justify-center text-[#D4AF37] bg-[#201B16] border border-[#3A3026] mb-5">
              <Droplets className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-xl text-[#F2ECE4] mb-2">Bassin Miroir &amp; Jets</h3>
            <p className="text-sm text-[#9E9081] leading-relaxed">
              Un miroir d'eau cristallin devant le restaurant dont les fontaines dansantes apaisent l'esprit et reflètent la façade étincelante.
            </p>
          </div>

          <div className="p-6 bg-[#161310] border border-[#2B231B] transition-all hover:border-[#D4AF37]/50 group">
            <div className="w-10 h-10 flex items-center justify-center text-[#D4AF37] bg-[#201B16] border border-[#3A3026] mb-5">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-xl text-[#F2ECE4] mb-2">Orbes Lumineux</h3>
            <p className="text-sm text-[#9E9081] leading-relaxed">
              Des sphères de lumière chaude disséminées dans les massifs végétaux, tissant au crépuscule une constellation féerique à hauteur de regard.
            </p>
          </div>

        </div>

        {/* Interactive Zone Explorer */}
        <div className="bg-[#15120F] border border-[#2D241C] p-6 lg:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#282018]">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                Atmosphères &amp; Emplacements
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#F2ECE4] mt-1">
                Choisissez Votre Table au Cœur du Pavillon
              </h3>
            </div>
            <p className="text-xs text-[#8E8072] max-w-md">
              Chaque espace de MORRA offre une perspective scénographique unique. Sélectionnez une zone pour découvrir son atmosphère et la garantir lors de votre réservation.
            </p>
          </div>

          {/* Functional Segmented Zone Selector Buttons */}
          <div className="flex flex-wrap gap-2 mt-6 mb-8">
            {DINING_ZONES.map((zone) => {
              const isActive = selectedZone.id === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-5 py-2.5 text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap shrink-0 border ${
                    isActive
                      ? 'bg-[#D4AF37] text-[#0D0B0A] border-[#F3DC9B] font-semibold shadow-md'
                      : 'bg-[#120F0D] text-[#A89A8C] border-[#30261E] hover:border-[#5E4D3E] hover:text-[#EDE5DA]'
                  }`}
                >
                  {zone.name}
                </button>
              );
            })}
          </div>

          {/* Selected Zone Card Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#100E0C] border border-[#241D17] p-6 lg:p-8">
            
            {/* Visual Column */}
            <div className="lg:col-span-7 overflow-hidden border border-[#2D241C] relative">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={selectedZone.image}
                  alt={selectedZone.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute top-3 left-3 bg-[#0D0B0A]/90 px-3 py-1 border border-[#3E342B] text-[11px] font-cinzel text-[#F3DC9B]">
                {selectedZone.tag}
              </div>
            </div>

            {/* Details Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-[#D4AF37] mb-1 font-semibold">
                  Ambiance : {selectedZone.ambiance}
                </div>
                <h4 className="text-2xl font-serif text-[#F7F3EE] mb-3">
                  {selectedZone.name}
                </h4>
                <p className="text-sm text-[#A89A8C] leading-relaxed mb-6">
                  {selectedZone.description}
                </p>

                {/* Characteristics with clean checkmarks */}
                <div className="space-y-2.5 pt-4 border-t border-[#231C16]">
                  {selectedZone.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-[#D8CDC0]">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#231C16] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="text-xs text-[#8E8072]">
                  <span className="block text-[#EDE5DA] font-medium">Capacité conseillée</span>
                  <span>{selectedZone.capacity}</span>
                </div>

                <button
                  onClick={() => onSelectZoneForReservation(selectedZone.id)}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0D0B0A] bg-[#D4AF37] hover:bg-[#E5C378] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 border border-[#F3DC9B]"
                >
                  <span>Choisir cet Espace</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0D0B0A]" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
