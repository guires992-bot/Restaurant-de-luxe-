import React from 'react';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../data/luxuryFashionData';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  currencySymbol: string;
  currencyRate: number;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onSelectProduct,
  currencySymbol,
  currencyRate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          className="w-screen max-w-md bg-[#FAF8F5] text-[#171615] shadow-2xl flex flex-col border-l border-[#E8E2D9]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8E2D9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#C5A880] fill-current" />
              <h2 className="text-xl font-serif text-[#171615]">
                Mes Pièces Préférées ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#736E67] hover:text-[#171615] transition-colors"
              aria-label="Fermer la liste d’envies"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {wishlist.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-8 h-8 text-[#D8D2C7] mx-auto mb-3" />
                <p className="text-sm font-serif text-[#736E67] italic mb-2">
                  Aucune pièce mémorisée pour le moment.
                </p>
                <p className="text-xs text-[#A8A29A]">
                  Cliquez sur le cœur d’une création pour la conserver dans votre carnet d’atelier.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#E8E2D9]">
                {wishlist.map((product) => (
                  <div key={product.id} className="py-4 flex gap-4">
                    <div 
                      onClick={() => {
                        onClose();
                        onSelectProduct(product);
                      }}
                      className="w-20 h-24 bg-[#F3EFEA] overflow-hidden shrink-0 border border-[#E8E2D9] cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 
                            onClick={() => {
                              onClose();
                              onSelectProduct(product);
                            }}
                            className="text-sm font-serif text-[#171615] leading-tight cursor-pointer hover:underline"
                          >
                            {product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveFromWishlist(product.id)}
                            className="text-[#A8A29A] hover:text-[#171615] p-1 transition-colors"
                            aria-label="Retirer de la liste"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        <div className="text-[11px] text-[#736E67] mt-0.5">
                          {product.categoryLabel}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <div className="text-xs font-mono-numbers font-medium text-[#171615]">
                          {Math.round(product.priceEUR * currencyRate).toLocaleString('fr-FR')} {currencySymbol}
                        </div>

                        <button
                          onClick={() => {
                            onClose();
                            onSelectProduct(product);
                          }}
                          className="flex items-center gap-1 text-xs text-[#171615] font-medium hover:underline"
                        >
                          <span>Voir la Pièce</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
