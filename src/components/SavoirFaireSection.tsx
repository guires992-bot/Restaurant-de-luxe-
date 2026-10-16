import React from 'react';
import atelierPhoto from '../assets/images/atelier_savoir_faire_1792184728846.jpg';

export const SavoirFaireSection: React.FC = () => {
  return (
    <section id="savoir-faire" className="py-20 md:py-28 bg-[#FAF8F5] border-t border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#736E67] mb-2 font-medium">
            <span>Transmission &amp; Métiers d’Art</span>
            <span aria-hidden="true">·</span>
            <span>Atelier Vendôme</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-[#171615] leading-tight">
            L’Éloge du Temps Long &amp; du Fait Main
          </h2>
          <p className="text-sm md:text-base text-[#5C564E] mt-4 leading-relaxed font-normal">
            À l’heure de la reproductibilité mécanique, la Maison D’Orsay maintient vivante la tradition séculaire du tailleur parisien. Chaque geste — du tracé à la craie jusqu’au point d’arrêt invisible — exige une patience inouïe.
          </p>
        </div>

        {/* Large Visual Feature */}
        <div className="relative aspect-[16/9] overflow-hidden bg-[#F3EFEA] border border-[#E8E2D9] mb-16 shadow-sm">
          <img
            src={atelierPhoto}
            alt="Mains d'artisan tailleur piquant un col dans l'atelier parisien Maison D'Orsay"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#FAF8F5]/95 backdrop-blur-md p-4 border border-[#E8E2D9] max-w-md">
            <span className="text-[10px] tracking-widest uppercase text-[#C5A880] font-semibold block mb-1">
              Table de Coupe N° 2 · Rue de l’Université
            </span>
            <p className="text-xs text-[#5C564E] leading-relaxed">
              Le montage traditionnel au crin de cheval naturel : aucune colle thermo-adhésive n’est tolérée. Le tissu respire et épouse l’anatomie de son propriétaire.
            </p>
          </div>
        </div>

        {/* 3 Editorial Chapters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-6">
          <div className="space-y-3">
            <span className="font-mono-numbers text-sm text-[#C5A880] font-semibold">
              01.
            </span>
            <h3 className="text-xl font-serif text-[#171615]">
              Le Patronage Tracé à la Craie
            </h3>
            <p className="text-xs sm:text-sm text-[#736E67] leading-relaxed">
              Avant le premier coup de ciseaux, chaque toile est dessinée à la main sur papier kraft à l’échelle 1:1. Les lignes de force sont ajustées au millimètre près pour conférer un aplomb naturel à la silhouette sans entraver la liberté de mouvement.
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-mono-numbers text-sm text-[#C5A880] font-semibold">
              02.
            </span>
            <h3 className="text-xl font-serif text-[#171615]">
              La Sélection des Fibres Rares
            </h3>
            <p className="text-xs sm:text-sm text-[#736E67] leading-relaxed">
              Nous sélectionnons uniquement des toisons peignées à la main : cachemire double-face Loro Piana de Mongolie, soie de mûrier lyonnaise et veau Barénia d’Alsace. Toutes nos fibres animales sont certifiées respectueuses du bien-être et de la biodiversité.
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-mono-numbers text-sm text-[#C5A880] font-semibold">
              03.
            </span>
            <h3 className="text-xl font-serif text-[#171615]">
              Le Point Sellier &amp; La Garantie à Vie
            </h3>
            <p className="text-xs sm:text-sm text-[#736E67] leading-relaxed">
              Chaque couture maîtresse est effectuée au fil de lin enduit de cire d’abeille avec deux aiguilles croisées. Une technique immémoriale qui empêche tout démaillage. Maison D’Orsay assure gratuitement l’entretien et les retouches de ses pièces pour toujours.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
