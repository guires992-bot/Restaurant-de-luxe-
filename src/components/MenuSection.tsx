import React, { useState } from 'react';
import { Wine, Sparkles, X, Info, UtensilsCrossed, Calendar } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/restaurantData';

interface MenuSectionProps {
  onOpenReservation: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onOpenReservation }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeDietary, setActiveDietary] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const categories = [
    { id: 'all', label: 'Toute la Carte' },
    { id: 'entrees', label: 'Entrées Ciselées' },
    { id: 'plats', label: 'Plats & Braises' },
    { id: 'desserts', label: 'Douceurs Minérales' },
    { id: 'cocktails', label: 'Mixologie du Bassin' },
    { id: 'vins', label: 'Grands Flacons' }
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesDiet =
      activeDietary === 'all' ||
      (activeDietary === 'veg' && item.dietary?.includes('Végétarien')) ||
      (activeDietary === 'gf' && item.dietary?.includes('gluten'));
    return matchesCat && matchesDiet;
  });

  return (
    <section id="carte" className="py-20 lg:py-28 bg-[#0D0B0A] border-b border-[#2C241D]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-3">
              <span>02. Gastronomie d’Auteur</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F7F3EE]">
              La Carte &amp; Les Créations Singulières
            </h2>
            <p className="mt-3 text-[#A89A8C] max-w-xl text-sm sm:text-base">
              Une partition culinaire pensée comme un prolongement de la façade : géométrie des corolles, nacres marines, braises incandescentes et grands terroirs.
            </p>
          </div>

          {/* Dietary Filter Segmented Bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#8E8072] uppercase tracking-wider">Préférences :</span>
            <div className="flex items-center gap-1 bg-[#14110E] p-1 border border-[#30261E]">
              <button
                onClick={() => setActiveDietary('all')}
                className={`px-3 py-1.5 text-xs font-medium transition-all ${
                  activeDietary === 'all' ? 'bg-[#D4AF37] text-[#0D0B0A] font-semibold' : 'text-[#8E8072] hover:text-[#EDE5DA]'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setActiveDietary('veg')}
                className={`px-3 py-1.5 text-xs font-medium transition-all ${
                  activeDietary === 'veg' ? 'bg-[#D4AF37] text-[#0D0B0A] font-semibold' : 'text-[#8E8072] hover:text-[#EDE5DA]'
                }`}
              >
                Végétarien
              </button>
              <button
                onClick={() => setActiveDietary('gf')}
                className={`px-3 py-1.5 text-xs font-medium transition-all ${
                  activeDietary === 'gf' ? 'bg-[#D4AF37] text-[#0D0B0A] font-semibold' : 'text-[#8E8072] hover:text-[#EDE5DA]'
                }`}
              >
                Sans Gluten
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs (Interactive Segmented Bar) */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-10 border-b border-[#221C16] no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap shrink-0 border ${
                activeCategory === cat.id
                  ? 'bg-[#D4AF37] text-[#0D0B0A] border-[#F3DC9B] font-semibold shadow-sm'
                  : 'bg-[#120F0D] text-[#A89A8C] border-[#2B221A] hover:border-[#524133] hover:text-[#EDE5DA]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-[#14110E] border border-[#2B221A] p-6 flex flex-col justify-between hover:border-[#D4AF37]/60 transition-all cursor-pointer group shadow-lg"
            >
              <div>
                {/* Optional Photo Thumbnail */}
                {item.image && (
                  <div className="mb-4 aspect-[16/10] overflow-hidden border border-[#2B221A] bg-[#0D0B0A]">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Title & Price */}
                <div className="flex items-baseline justify-between gap-4 mb-2 pb-2 border-b border-[#221C16]">
                  <h3 className="font-serif text-lg sm:text-xl text-[#F2ECE4] group-hover:text-[#F3DC9B] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <span className="font-mono-numbers text-base font-semibold text-[#D4AF37] shrink-0">
                    {item.price} €
                  </span>
                </div>

                <p className="text-xs text-[#9E9081] leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1F1913] space-y-2">
                {/* Clean unboxed metadata */}
                <div className="flex flex-wrap items-center gap-x-2 text-[11px] text-[#8E8072]">
                  {item.highlight && <span className="text-[#D4AF37] font-medium">{item.highlight}</span>}
                  {item.dietary && (
                    <>
                      <span aria-hidden="true">&middot;</span>
                      <span>{item.dietary}</span>
                    </>
                  )}
                </div>

                {item.pairing && (
                  <div className="flex items-center gap-1.5 text-[11px] text-[#A89A8C] italic">
                    <Wine className="w-3 h-3 text-[#D4AF37] shrink-0" />
                    <span className="truncate">Accord : {item.pairing}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Call to Action */}
        <div className="mt-14 p-8 bg-[#14110E] border border-[#2D241C] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-xl text-[#F2ECE4]">
              Vous désirez une création sur mesure pour votre table ?
            </h4>
            <p className="text-xs text-[#8E8072]">
              Notre Chef Alexandre Morra adapte l'ensemble des créations selon vos souhaits et régimes alimentaires lors de votre réservation.
            </p>
          </div>
          <button
            onClick={onOpenReservation}
            className="flex items-center gap-2.5 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0D0B0A] bg-[#D4AF37] hover:bg-[#E5C378] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 border border-[#F3DC9B]"
          >
            <Calendar className="w-3.5 h-3.5 text-[#0D0B0A]" />
            <span>Réserver &amp; Préciser vos Souhaits</span>
          </button>
        </div>

      </div>

      {/* Modal Item Details */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#14110E] border border-[#3E342B] p-6 lg:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 text-[#8E8072] hover:text-[#EDE5DA] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedItem.image && (
              <div className="mb-6 aspect-[16/10] overflow-hidden border border-[#2D241C]">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">
              <span>{selectedItem.highlight || 'Haute Création MORRA'}</span>
              {selectedItem.dietary && (
                <>
                  <span aria-hidden="true">&middot;</span>
                  <span className="text-[#8E8072]">{selectedItem.dietary}</span>
                </>
              )}
            </div>

            <h3 className="font-serif text-2xl text-[#F7F3EE] mb-3">
              {selectedItem.name}
            </h3>

            <p className="text-sm text-[#B5A99D] leading-relaxed mb-6">
              {selectedItem.description}
            </p>

            {selectedItem.pairing && (
              <div className="p-4 bg-[#1C1713] border border-[#2E241B] mb-6 space-y-1">
                <div className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-2">
                  <Wine className="w-3.5 h-3.5" />
                  <span>Accord Sommelier Conseillé</span>
                </div>
                <div className="text-xs text-[#EDE5DA] italic">
                  {selectedItem.pairing}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-[#241E18]">
              <span className="font-mono-numbers text-2xl font-semibold text-[#D4AF37]">
                {selectedItem.price} €
              </span>
              <button
                onClick={() => {
                  setSelectedItem(null);
                  onOpenReservation();
                }}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0D0B0A] bg-[#D4AF37] hover:bg-[#E5C378] transition-all border border-[#F3DC9B]"
              >
                Réserver pour Déguster
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
