import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { LOOKBOOK_SILHOUETTES, PRODUCTS, Product } from '../data/luxuryFashionData';

interface LookbookSectionProps {
  onSelectProduct: (product: Product) => void;
  currencySymbol: string;
  currencyRate: number;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({
  onSelectProduct,
  currencySymbol,
  currencyRate
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentLook = LOOKBOOK_SILHOUETTES[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? LOOKBOOK_SILHOUETTES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === LOOKBOOK_SILHOUETTES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="lookbook" className="py-20 bg-[#111113] text-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-12 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-2 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Défilé Hivernal · Salons Vendôme</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-white">
              Le Lookbook de la Saison
            </h2>
          </div>

          {/* Silhouette Navigation Steppers */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-numbers text-white/50 tracking-wider">
              {currentLook.silhouetteNumber} / 0{LOOKBOOK_SILHOUETTES.length}
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={handlePrev}
                className="p-2.5 border border-white/20 hover:border-white text-white/70 hover:text-white transition-colors"
                aria-label="Silhouette précédente"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 border border-white/20 hover:border-white text-white/70 hover:text-white transition-colors"
                aria-label="Silhouette suivante"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Look Display Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Image Showcase */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-black/40 border border-white/10 shadow-2xl">
              <img
                src={currentLook.image}
                alt={currentLook.title}
                className="w-full h-full object-cover object-top transition-opacity duration-500"
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 text-xs font-mono-numbers text-[#C5A880] border border-white/10">
                SILHOUETTE {currentLook.silhouetteNumber}
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Notes & Clickable Garments */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs tracking-widest uppercase text-white/50 block mb-1">
                {currentLook.season}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white mb-4">
                {currentLook.title}
              </h3>
              <blockquote className="text-sm italic font-serif text-white/80 leading-relaxed border-l border-[#C5A880] pl-4 mb-8">
                {currentLook.quote}
              </blockquote>

              {/* Garments Breakdown */}
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-wider text-white/40 block font-medium">
                  Pièces Composant Cette Allure :
                </span>

                {currentLook.garments.map((garment) => {
                  const matchedProduct = PRODUCTS.find(p => p.id === garment.productId);
                  const priceFmt = Math.round(garment.price * currencyRate).toLocaleString('fr-FR');

                  return (
                    <div
                      key={garment.productId}
                      onClick={() => matchedProduct && onSelectProduct(matchedProduct)}
                      className="p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div>
                        <h4 className="text-xs font-medium text-white group-hover:text-[#C5A880] transition-colors">
                          {garment.label}
                        </h4>
                        <span className="text-[11px] font-mono-numbers text-white/60">
                          {priceFmt} {currencySymbol}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick silhouette thumbnail strip */}
            <div className="pt-4 border-t border-white/10 flex gap-2">
              {LOOKBOOK_SILHOUETTES.map((look, idx) => (
                <button
                  key={look.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex-1 py-2 text-xs font-mono-numbers transition-all border ${
                    currentIndex === idx
                      ? 'border-[#C5A880] text-[#C5A880] bg-[#C5A880]/10 font-bold'
                      : 'border-white/10 text-white/40 hover:text-white'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
