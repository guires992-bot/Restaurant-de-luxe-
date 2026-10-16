import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Truck, Sparkles, Check, ChevronDown, ChevronUp, Ruler } from 'lucide-react';
import { Product } from '../data/luxuryFashionData';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onOpenSizeGuide: () => void;
  onOpenAppointment: (productRef: string) => void;
  currencySymbol: string;
  currencyRate: number;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onOpenSizeGuide,
  onOpenAppointment,
  currencySymbol,
  currencyRate
}) => {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0] || '38');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [activeAccordion, setActiveAccordion] = useState<string>('cut');
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const priceFormatted = Math.round(product.priceEUR * currencyRate).toLocaleString('fr-FR');

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? '' : id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-5xl bg-[#FAF8F5] text-[#171615] shadow-2xl border border-[#E8E2D9] max-h-[94vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-white/80 backdrop-blur-sm border border-[#E8E2D9] text-[#171615] hover:bg-[#171615] hover:text-[#FAF8F5] transition-colors"
          aria-label="Fermer la vue détaillée"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Column: Gallery / Visual (sticky feel) */}
          <div className="lg:col-span-7 bg-[#F3EFEA] relative flex flex-col justify-center items-center p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-[#E8E2D9]">
            <div className="relative w-full max-w-lg aspect-[4/3] overflow-hidden bg-white/40 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {product.limitedEdition && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-medium tracking-wider text-[#171615] border border-black/5">
                  {product.limitedEdition}
                </div>
              )}
            </div>

            {/* Micro Provenance Bar below image */}
            <div className="w-full max-w-lg mt-6 pt-4 border-t border-[#171615]/10 flex items-center justify-between text-xs text-[#736E67]">
              <span>Réf. {product.reference}</span>
              <span>{product.craftsmanshipTime}</span>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Header metadata */}
              <div className="flex items-center gap-2 text-xs text-[#736E67] tracking-wider uppercase mb-1">
                <span>{product.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>Atelier Paris</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-serif text-[#171615] mb-1 leading-snug">
                {product.name}
              </h2>
              <p className="text-xs text-[#736E67] tracking-wide mb-4">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="text-xl md:text-2xl font-mono-numbers text-[#171615] mb-6">
                {priceFormatted} {currencySymbol}
                <span className="text-xs text-[#736E67] font-sans ml-2 tracking-normal">
                  TTC · Livraison offerte
                </span>
              </div>

              {/* Color Swatches */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="uppercase tracking-wider text-[#736E67] font-medium">Teinte</span>
                  <span className="text-[#171615] font-semibold">{selectedColor}</span>
                </div>
                <div className="flex gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`relative w-8 h-8 rounded-full border transition-all ${
                        selectedColor === color.name
                          ? 'ring-2 ring-[#171615] ring-offset-2'
                          : 'opacity-85 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      aria-label={`Sélectionner la couleur ${color.name}`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="uppercase tracking-wider text-[#736E67] font-medium">Taille</span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="flex items-center gap-1 text-[#736E67] hover:text-[#171615] transition-colors underline underline-offset-2"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Guide des Mesures</span>
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-2 text-xs font-mono-numbers transition-all border ${
                        selectedSize === size
                          ? 'bg-[#171615] text-[#FAF8F5] border-[#171615]'
                          : 'bg-white text-[#171615] border-[#E8E2D9] hover:border-[#171615]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-[#5C564E] leading-relaxed mb-6 font-normal">
                {product.description}
              </p>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <div className="flex gap-2">
                  <button
                    onClick={handleAdd}
                    disabled={!product.inStock}
                    className={`flex-1 py-3.5 px-6 text-xs uppercase tracking-widest font-medium transition-all flex items-center justify-center gap-2 ${
                      addedAnimation
                        ? 'bg-[#2E5A44] text-white'
                        : 'bg-[#171615] text-[#FAF8F5] hover:bg-[#33312E]'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Ajouté au Panier</span>
                      </>
                    ) : (
                      <span>Ajouter au Panier</span>
                    )}
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-3.5 border transition-colors ${
                      isWishlisted
                        ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#C5A880]'
                        : 'border-[#E8E2D9] text-[#736E67] hover:text-[#171615] hover:border-[#171615]'
                    }`}
                    aria-label="Enregistrer dans les souhaits"
                    title={isWishlisted ? "Retirer des souhaits" : "Ajouter aux souhaits"}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenAppointment(product.reference);
                  }}
                  className="w-full py-2.5 px-4 text-xs uppercase tracking-wider text-[#736E67] hover:text-[#171615] border border-[#E8E2D9] hover:border-[#171615] bg-white transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Réserver un Essayage en Salon Privé</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#E8E2D9] text-[11px] text-[#736E67]">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#171615]" />
                  <span>Livraison gant blanc sécurisée</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#171615]" />
                  <span>Retouches atelier à vie offertes</span>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="divide-y divide-[#E8E2D9] mt-4 border-t border-[#E8E2D9]">
              {/* Coupe & Détails */}
              <div>
                <button
                  onClick={() => toggleAccordion('cut')}
                  className="w-full py-3 flex justify-between items-center text-xs uppercase tracking-wider text-[#171615] font-medium"
                >
                  <span>Architecture &amp; Coupe</span>
                  {activeAccordion === 'cut' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeAccordion === 'cut' && (
                  <ul className="pb-3 text-xs text-[#5C564E] space-y-1.5 list-disc list-inside">
                    {product.cutDetails.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Matières & Provenance */}
              <div>
                <button
                  onClick={() => toggleAccordion('materials')}
                  className="w-full py-3 flex justify-between items-center text-xs uppercase tracking-wider text-[#171615] font-medium"
                >
                  <span>Matières &amp; Traçabilité</span>
                  {activeAccordion === 'materials' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeAccordion === 'materials' && (
                  <div className="pb-3 text-xs text-[#5C564E] space-y-2">
                    <div>
                      <span className="font-semibold text-[#171615] block">Composition :</span>
                      {product.composition}
                    </div>
                    <div>
                      <span className="font-semibold text-[#171615] block">Origine :</span>
                      {product.provenance}
                    </div>
                  </div>
                )}
              </div>

              {/* Entretien */}
              <div>
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full py-3 flex justify-between items-center text-xs uppercase tracking-wider text-[#171615] font-medium"
                >
                  <span>Conseils d’Entretien</span>
                  {activeAccordion === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeAccordion === 'care' && (
                  <div className="pb-3 text-xs text-[#5C564E] leading-relaxed">
                    {product.careInstructions}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
