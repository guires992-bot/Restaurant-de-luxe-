import React, { useState } from 'react';
import { ArrowDown, X, Sparkles } from 'lucide-react';
import heroImage from '../assets/images/hero_couture_campaign_1792184725517.jpg';

interface HeroProps {
  onOpenAppointment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAppointment }) => {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF8F5]">
      {/* Slim Promotional Bar (≤ 40px, dismissible) */}
      {showBanner && (
        <div className="bg-[#171615] text-[#FAF8F5] px-4 py-2 text-xs flex items-center justify-between transition-all">
          <div className="flex-1 text-center font-normal tracking-wider text-[11px] sm:text-xs">
            <span>Privilège Automne-Hiver</span>
            <span className="mx-2 opacity-50" aria-hidden="true">·</span>
            <span>Livraison gant blanc offerte en France &amp; Union Européenne dès 500 €</span>
            <span className="mx-2 opacity-50 hidden md:inline" aria-hidden="true">·</span>
            <span className="hidden md:inline">Code de bienvenue : <strong className="font-mono-numbers text-[#C5A880]">VENDOME</strong> (-10%)</span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="p-1 text-[#A8A29A] hover:text-[#FAF8F5] transition-colors"
            aria-label="Fermer la bannière d'annonce"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Campaign Stage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Haute Couture Editorial Presentation */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            {/* Clean unboxed metadata (NO PILLS) */}
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#736E67]">
              <span>Haute Couture Paris</span>
              <span aria-hidden="true">·</span>
              <span>Hiver 2026</span>
              <span aria-hidden="true">·</span>
              <span>Place Vendôme</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#171615] leading-[1.08] font-normal [text-wrap:balance]">
              L’Épure du Geste &amp; La Noblesse du Cachemire.
            </h1>

            <p className="text-sm md:text-base text-[#5C564E] leading-relaxed max-w-lg font-normal">
              Chaque silhouette Maison D’Orsay naît d’une recherche architecturale : des coupes franches taillées dans les étoffes les plus rares d’Europe, façonnées patiemment par nos maîtres tailleurs dans le secret de l’Atelier Vendôme.
            </p>

            {/* Direct routes into collection and private booking */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#collections"
                className="py-4 px-8 text-xs uppercase tracking-widest font-medium bg-[#171615] text-[#FAF8F5] hover:bg-[#33312E] transition-colors text-center whitespace-nowrap"
              >
                Explorer le Vestiaire
              </a>
              
              <button
                onClick={onOpenAppointment}
                className="py-4 px-6 text-xs uppercase tracking-wider font-medium text-[#171615] border border-[#171615] hover:bg-[#171615] hover:text-[#FAF8F5] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Rendez-vous en Salon</span>
              </button>
            </div>

            {/* Proof marker / Atelier stats unboxed */}
            <div className="pt-4 border-t border-[#E8E2D9] grid grid-cols-3 gap-4 text-xs text-[#736E67]">
              <div>
                <span className="font-mono-numbers block text-base md:text-lg text-[#171615] font-semibold">100%</span>
                <span>Fait main à Paris</span>
              </div>
              <div>
                <span className="font-mono-numbers block text-base md:text-lg text-[#171615] font-semibold">42h</span>
                <span>Moyenne par pièce</span>
              </div>
              <div>
                <span className="font-mono-numbers block text-base md:text-lg text-[#171615] font-semibold">CITES</span>
                <span>Fibres certifiées</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Focal Point */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/10] overflow-hidden bg-[#F3EFEA] border border-[#E8E2D9] shadow-sm group">
              <img
                src={heroImage}
                alt="Campagne Haute Couture Maison D'Orsay Hiver 2026"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              />
              
              {/* Subtle caption bottom overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 text-white flex justify-between items-end">
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-[#C5A880] block mb-1">
                    Silhouette de Campagne N° 01
                  </span>
                  <p className="text-sm font-serif italic text-white/95">
                    Le Manteau Auguste &amp; Pantalon Palazzo en Soie
                  </p>
                </div>
                <a
                  href="#collections"
                  className="text-xs uppercase tracking-wider text-white underline underline-offset-4 hover:text-[#C5A880] transition-colors"
                >
                  Découvrir
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Subtle down anchor */}
      <div className="flex justify-center pb-4 text-[#A8A29A]">
        <a href="#collections" className="hover:text-[#171615] transition-colors p-2" aria-label="Défiler vers la collection">
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
