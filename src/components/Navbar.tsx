import React from 'react';
import { Calendar } from 'lucide-react';

interface NavbarProps {
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0D0B0A]/95 border-b border-[#2C241D] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand wordmark as single text element matching the image sign */}
        <a 
          href="#top" 
          className="font-cinzel text-2xl sm:text-3xl font-bold tracking-[0.25em] text-[#E5C378] hover:text-[#F3DC9B] transition-colors whitespace-nowrap shrink-0"
        >
          MORRA
        </a>

        {/* Zone 2: 4-5 single-line clean text links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-[#B8A898]">
          <a href="#pavillon" className="hover:text-[#F3DC9B] transition-colors whitespace-nowrap shrink-0">
            Le Pavillon
          </a>
          <a href="#carte" className="hover:text-[#F3DC9B] transition-colors whitespace-nowrap shrink-0">
            La Carte
          </a>
          <a href="#degustation" className="hover:text-[#F3DC9B] transition-colors whitespace-nowrap shrink-0">
            Dégustation
          </a>
          <a href="#sommelier" className="hover:text-[#F3DC9B] transition-colors whitespace-nowrap shrink-0">
            La Cave
          </a>
          <a href="#acces" className="hover:text-[#F3DC9B] transition-colors whitespace-nowrap shrink-0">
            Accès & Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenReservation}
            className="flex items-center gap-2.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0D0B0A] bg-[#D4AF37] hover:bg-[#E5C378] active:scale-[0.98] transition-all rounded-none border border-[#F3DC9B] shadow-sm whitespace-nowrap shrink-0"
          >
            <Calendar className="w-3.5 h-3.5 text-[#0D0B0A]" />
            <span>Réserver une Table</span>
          </button>
        </div>
      </div>
    </header>
  );
};
