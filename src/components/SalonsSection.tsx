import React from 'react';
import { MapPin, Phone, Clock, Sparkles } from 'lucide-react';
import { SALONS_LOCATIONS } from '../data/luxuryFashionData';

interface SalonsSectionProps {
  onOpenAppointment: (salonCity: string) => void;
}

export const SalonsSection: React.FC<SalonsSectionProps> = ({ onOpenAppointment }) => {
  return (
    <section id="salons" className="py-20 bg-[#FAF8F5] border-t border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E8E2D9] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#736E67] mb-2 font-medium">
              <span>Boutiques &amp; Salons Particuliers</span>
              <span aria-hidden="true">·</span>
              <span>Europe</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#171615]">
              Nos Adresses Privilégiées
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#736E67] max-w-md leading-relaxed font-normal">
            Poussez les portes de nos hôtels particuliers pour vivre une expérience d’essayage intime, guidé par nos directeurs de salon.
          </p>
        </div>

        {/* Salons Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SALONS_LOCATIONS.map((salon) => (
            <div
              key={salon.city}
              className="bg-white border border-[#E8E2D9] p-7 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                <span className="text-xs font-cinzel text-[#C5A880] tracking-[0.2em] uppercase block mb-1">
                  Salon {salon.city}
                </span>
                <h3 className="text-xl font-serif text-[#171615] mb-4">
                  {salon.name}
                </h3>

                <div className="space-y-3 text-xs text-[#5C564E] mb-6">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#736E67] shrink-0 mt-0.5" />
                    <span>{salon.address}, {salon.postalCode}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#736E67] shrink-0" />
                    <span className="font-mono-numbers">{salon.phone}</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#736E67] shrink-0 mt-0.5" />
                    <span>{salon.hours}</span>
                  </div>
                </div>

                <div className="p-3 bg-[#F3EFEA] text-[11px] text-[#736E67] leading-relaxed mb-6 border-l border-[#C5A880]">
                  {salon.privilege}
                </div>
              </div>

              <button
                onClick={() => onOpenAppointment(salon.city)}
                className="w-full py-3 px-4 text-xs uppercase tracking-wider font-medium text-[#171615] bg-[#FAF8F5] hover:bg-[#171615] hover:text-[#FAF8F5] border border-[#171615] transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Réserver à {salon.city}</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
