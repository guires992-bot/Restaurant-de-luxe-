import React, { useState } from 'react';
import { Sparkles, Wine, Check, ArrowRight } from 'lucide-react';
import { TASTING_MENUS } from '../data/restaurantData';

interface TastingMenuSectionProps {
  onOpenReservation: (menuName?: string) => void;
}

export const TastingMenuSection: React.FC<TastingMenuSectionProps> = ({ onOpenReservation }) => {
  const [includePairing, setIncludePairing] = useState<Record<number, boolean>>({ 0: true, 1: true });

  const togglePairing = (index: number) => {
    setIncludePairing((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section id="degustation" className="py-20 lg:py-28 bg-[#110F0D] border-b border-[#2C241D] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-3">
            <span>03. Expériences Immersives</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F7F3EE]">
            Les Menus Dégustation MORRA
          </h2>
          <p className="mt-4 text-[#A89A8C] text-base leading-relaxed">
            Servis pour l'ensemble des convives de la table, ces parcours d’exception subliment l’alchimie entre la minéralité de la pierre et la générosité des terroirs.
          </p>
        </div>

        {/* 2 Tasting Menus Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {TASTING_MENUS.map((menu, idx) => {
            const hasPairing = includePairing[idx];
            const totalPrice = hasPairing ? menu.price + menu.winePairingPrice : menu.price;

            return (
              <div
                key={menu.name}
                className="bg-[#15120F] border border-[#2D241C] p-8 lg:p-10 flex flex-col justify-between relative hover:border-[#D4AF37]/60 transition-all shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#261E17]">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                        Service du Soir &middot; {menu.coursesCount} Temps
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif text-[#F7F3EE] mt-1">
                        {menu.name}
                      </h3>
                    </div>

                    <div className="text-right">
                      <div className="font-mono-numbers text-3xl font-semibold text-[#E5C378]">
                        {totalPrice} €
                      </div>
                      <div className="text-[11px] text-[#8E8072]">
                        {hasPairing ? 'avec accords grands crus' : 'mets uniquement'}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#A89A8C] leading-relaxed my-6 italic">
                    "{menu.description}"
                  </p>

                  {/* Wine Pairing Toggle */}
                  <div className="p-4 bg-[#100E0C] border border-[#241D16] mb-8 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Wine className="w-4 h-4 text-[#D4AF37]" />
                      <div className="text-xs">
                        <span className="font-medium text-[#EDE5DA] block">
                          Accords Grands Crus &amp; Flacons Rares
                        </span>
                        <span className="text-[#8E8072]">
                          Sélection exclusive par notre Sommelier (+{menu.winePairingPrice} € / convive)
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => togglePairing(idx)}
                      className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 border ${
                        hasPairing
                          ? 'bg-[#D4AF37] text-[#0D0B0A] border-[#F3DC9B]'
                          : 'bg-transparent text-[#8E8072] border-[#382D23] hover:text-[#EDE5DA]'
                      }`}
                    >
                      {hasPairing ? 'Inclus' : 'Ajouter'}
                    </button>
                  </div>

                  {/* List of Courses */}
                  <div className="space-y-4 mb-8">
                    <div className="text-xs uppercase tracking-widest text-[#7A6D5F] font-semibold">
                      Déroulé du Parcours
                    </div>

                    {menu.courses.map((course, cIdx) => (
                      <div
                        key={cIdx}
                        className="pb-3 border-b border-[#1E1812] last:border-0 flex items-start gap-4"
                      >
                        <span className="font-serif text-sm font-semibold text-[#D4AF37] w-6 shrink-0 pt-0.5">
                          {course.number}
                        </span>
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-serif font-medium text-[#EDE5DA]">
                            {course.title}
                          </h4>
                          <p className="text-xs text-[#8E8072]">
                            {course.description}
                          </p>
                          {hasPairing && course.pairing && (
                            <div className="text-[11px] text-[#C5B396] italic flex items-center gap-1 mt-0.5">
                              <Wine className="w-3 h-3 text-[#D4AF37] shrink-0" />
                              <span>{course.pairing}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-6 border-t border-[#261E17] flex items-center justify-between">
                  <div className="text-xs text-[#8E8072]">
                    Durée conseillée : ~2h30 à 3h00
                  </div>
                  <button
                    onClick={() => onOpenReservation(menu.name)}
                    className="flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0D0B0A] bg-[#D4AF37] hover:bg-[#E5C378] active:scale-[0.98] transition-all border border-[#F3DC9B]"
                  >
                    <span>Réserver ce Menu</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0D0B0A]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
