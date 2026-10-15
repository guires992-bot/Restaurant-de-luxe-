import React from 'react';
import { MapPin, Phone, Mail, Clock, Compass, Car } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  return (
    <footer id="acces" className="bg-[#0A0908] text-[#A89A8C] border-t border-[#261E17]">
      
      {/* Access & Hours Interactive Bar */}
      <div className="max-w-7xl mx-auto px-6 py-16 border-b border-[#1A1511]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & Address */}
          <div className="space-y-4">
            <span className="font-cinzel text-2xl font-bold tracking-[0.2em] text-[#E5C378] uppercase block">
              {RESTAURANT_INFO.name}
            </span>
            <p className="text-xs text-[#8E8072] leading-relaxed">
              Pavillon culinaire d’exception où dialoguent la pierre de travertin sculptée, les grandes arches de 8 mètres et le reflet des fontaines dansantes.
            </p>
            <div className="text-xs text-[#DDD4CA] space-y-2 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span className="text-[#8E8072]">{RESTAURANT_INFO.metro}</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span className="text-[#8E8072]">{RESTAURANT_INFO.valet}</span>
              </div>
            </div>
          </div>

          {/* Horaires des Services */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Horaires des Services</span>
            </div>
            <ul className="text-xs space-y-2.5 text-[#DDD4CA]">
              {RESTAURANT_INFO.hours.map((h, i) => (
                <li key={i} className="pb-1.5 border-b border-[#1A1511] last:border-0">
                  <div className="text-[#8E8072] font-medium">{h.days}</div>
                  <div>Déjeuner : {h.lunch}</div>
                  <div>Dîner : {h.dinner}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Réservations */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              <span>Conciergerie &amp; Réservations</span>
            </div>
            <div className="text-xs text-[#DDD4CA] space-y-2">
              <div>
                <span className="text-[#8E8072] block">Ligne directe :</span>
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[#F3DC9B] transition-colors font-mono-numbers">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div>
                <span className="text-[#8E8072] block">Contact numérique :</span>
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-[#F3DC9B] transition-colors">
                  {RESTAURANT_INFO.email}
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenReservation}
                  className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#0D0B0A] bg-[#D4AF37] hover:bg-[#E5C378] transition-all border border-[#F3DC9B]"
                >
                  Réserver une Table
                </button>
              </div>
            </div>
          </div>

          {/* Équipe & Architecture */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
              Maison &amp; Création
            </div>
            <div className="text-xs space-y-2 text-[#8E8072]">
              <div>
                <span className="text-[#DDD4CA] block font-medium">Chefs Fondateurs :</span>
                <span>{RESTAURANT_INFO.chef}</span>
              </div>
              <div>
                <span className="text-[#DDD4CA] block font-medium">Chef Sommelier :</span>
                <span>{RESTAURANT_INFO.sommelier}</span>
              </div>
              <div>
                <span className="text-[#DDD4CA] block font-medium">Architecture &amp; Scénographie :</span>
                <span>{RESTAURANT_INFO.architect}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Quiet Legal Bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E6357]">
        <div className="flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} MORRA. Tous droits réservés.</span>
          <span aria-hidden="true">&middot;</span>
          <span>Pavillon Architectural &amp; Haute Gastronomie</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#pavillon" className="hover:text-[#A89A8C] transition-colors">Le Pavillon</a>
          <a href="#carte" className="hover:text-[#A89A8C] transition-colors">La Carte</a>
          <a href="#degustation" className="hover:text-[#A89A8C] transition-colors">Menus</a>
          <a href="#privatisation" className="hover:text-[#A89A8C] transition-colors">Privatisation</a>
        </div>
      </div>

    </footer>
  );
};
