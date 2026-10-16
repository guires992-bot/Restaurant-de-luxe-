import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Menu, X, Globe } from 'lucide-react';
import { CURRENCIES } from '../data/luxuryFashionData';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAppointment: () => void;
  selectedCurrency: string;
  onCurrencyChange: (code: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAppointment,
  selectedCurrency,
  onCurrencyChange
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9] py-3.5 shadow-sm'
            : 'bg-[#FAF8F5] border-b border-black/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element in display face) */}
          <a
            href="#"
            className="text-lg md:text-xl font-cinzel text-[#171615] tracking-[0.2em] uppercase whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
          >
            MAISON D’ORSAY
          </a>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium tracking-widest uppercase text-[#5C564E]">
            <a
              href="#collections"
              className="hover:text-[#171615] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#171615]"
            >
              Collections
            </a>
            <a
              href="#lookbook"
              className="hover:text-[#171615] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#171615]"
            >
              Lookbook
            </a>
            <a
              href="#savoir-faire"
              className="hover:text-[#171615] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#171615]"
            >
              Savoir-Faire
            </a>
            <button
              onClick={onOpenAppointment}
              className="hover:text-[#171615] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#171615]"
            >
              Atelier Privé
            </button>
            <a
              href="#salons"
              className="hover:text-[#171615] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#171615]"
            >
              Salons
            </a>
          </nav>

          {/* Zone 3: Primary action & discreet utility affordances */}
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            {/* Currency selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="hidden sm:flex items-center gap-1 text-[11px] font-mono-numbers text-[#736E67] hover:text-[#171615] py-1 px-1.5 transition-colors"
                aria-label="Changer de devise"
              >
                <Globe className="w-3 h-3 text-[#A8A29A]" />
                <span>{selectedCurrency}</span>
              </button>

              {currencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-28 bg-white border border-[#E8E2D9] shadow-lg py-1 z-50 text-xs font-mono-numbers"
                  onMouseLeave={() => setCurrencyDropdownOpen(false)}
                >
                  {CURRENCIES.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        onCurrencyChange(curr.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#FAF8F5] transition-colors ${
                        selectedCurrency === curr.code ? 'font-bold text-[#171615] bg-[#F3EFEA]' : 'text-[#5C564E]'
                      }`}
                    >
                      {curr.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-[#5C564E] hover:text-[#171615] transition-colors"
              aria-label="Voir mes coups de cœur"
              title="Mes pièces préférées"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C5A880]" />
              )}
            </button>

            {/* Primary Action: Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 py-2 px-3.5 bg-[#171615] text-[#FAF8F5] hover:bg-[#33312E] transition-colors text-xs font-medium tracking-wider uppercase whitespace-nowrap shrink-0"
              aria-label={`Ouvrir le panier, ${cartCount} articles`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Panier</span>
              <span className="font-mono-numbers text-[11px]">({cartCount})</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#171615]"
              aria-label="Ouvrir le menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (respects 15% sticky height on main screen) */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[57px] bg-[#FAF8F5] border-b border-[#E8E2D9] p-6 z-40 md:hidden shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-4 text-xs font-medium tracking-widest uppercase text-[#5C564E]">
            <a
              href="#collections"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#171615]"
            >
              Collections
            </a>
            <a
              href="#lookbook"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#171615]"
            >
              Lookbook Automne-Hiver
            </a>
            <a
              href="#savoir-faire"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#171615]"
            >
              L’Atelier &amp; Savoir-Faire
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointment();
              }}
              className="py-1 text-left hover:text-[#171615]"
            >
              Réserver un Salon Privé
            </button>
            <a
              href="#salons"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#171615]"
            >
              Nos Salons Internationaux
            </a>
            <div className="pt-3 border-t border-[#E8E2D9] flex items-center justify-between text-xs font-mono-numbers">
              <span className="text-[#736E67]">Devise d’affichage :</span>
              <div className="flex gap-2">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => onCurrencyChange(c.code)}
                    className={`px-2 py-1 ${selectedCurrency === c.code ? 'bg-[#171615] text-white' : 'bg-[#E8E2D9]'}`}
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};
