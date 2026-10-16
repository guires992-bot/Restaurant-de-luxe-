import React, { useState, useMemo } from 'react';
import { Eye, Heart, ShoppingBag, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { PRODUCTS, Product } from '../data/luxuryFashionData';

interface CollectionSectionProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  currencySymbol: string;
  currencyRate: number;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  onSelectProduct,
  onQuickAdd,
  onToggleWishlist,
  wishlistIds,
  currencySymbol,
  currencyRate
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const categories = [
    { id: 'all', label: 'Toutes les Créations' },
    { id: 'manteaux', label: 'Manteaux & Tailleurs' },
    { id: 'robes', label: 'Robes & Soirée' },
    { id: 'maroquinerie', label: 'Maroquinerie d’Art' },
    { id: 'soie-cachemire', label: 'Soie & Cachemire' }
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchQuery =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.composition.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceEUR - b.priceEUR;
      if (sortBy === 'price-desc') return b.priceEUR - a.priceEUR;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <section id="collections" className="py-16 md:py-24 bg-[#FAF8F5] border-t border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E8E2D9] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#736E67] mb-2 font-medium">
              <span>Collection Hiver 2026</span>
              <span aria-hidden="true">·</span>
              <span>Atelier Faubourg</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#171615]">
              Le Vestiaire d’Exception
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#736E67] max-w-md font-normal leading-relaxed">
            Des matières sélectionnées pour leur rareté et leur tombé naturel. Chaque pièce est numérotée et accompagnée de son certificat d’origine.
          </p>
        </div>

        {/* Filter Bar & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
          {/* Category Tabs (Segmented Buttons with click handlers) */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`py-2 px-3.5 text-xs font-medium tracking-wider uppercase transition-all whitespace-nowrap shrink-0 border ${
                  activeCategory === cat.id
                    ? 'bg-[#171615] text-[#FAF8F5] border-[#171615]'
                    : 'bg-white text-[#5C564E] border-[#E8E2D9] hover:border-[#171615]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort utilities */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-56">
              <input
                type="text"
                placeholder="Rechercher soie, manteau..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E8E2D9] pl-8 pr-3 py-2 text-xs text-[#171615] placeholder-[#A8A29A] focus:outline-none focus:border-[#171615]"
              />
              <Search className="w-3.5 h-3.5 text-[#A8A29A] absolute left-2.5 top-2.5 pointer-events-none" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Trier les créations"
                className="bg-white border border-[#E8E2D9] px-3 py-2 text-xs text-[#171615] focus:outline-none focus:border-[#171615] appearance-none pr-8 cursor-pointer"
              >
                <option value="featured">Pièces Maîtresses</option>
                <option value="price-asc">Prix Croissant</option>
                <option value="price-desc">Prix Décroissant</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-[#736E67] absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Cards Grid (3 columns desktop, 2 columns tablet) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#E8E2D9]">
            <p className="text-base font-serif text-[#736E67] italic mb-2">
              Aucune création ne correspond à vos critères de recherche.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs uppercase tracking-wider text-[#171615] underline underline-offset-4"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const priceFormatted = Math.round(product.priceEUR * currencyRate).toLocaleString('fr-FR');

              return (
                <div
                  key={product.id}
                  className="group flex flex-col bg-white border border-[#E8E2D9] hover:shadow-lg transition-all duration-300 relative"
                >
                  {/* Lead with Imagery (65-75% height) */}
                  <div className="relative aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/3] bg-[#F3EFEA] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Subtle Edition note (Clean text tag, no pill badge) */}
                    {product.limitedEdition && (
                      <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-md px-2.5 py-1 text-[10px] tracking-wider text-[#171615] font-medium border border-black/5">
                        {product.limitedEdition.split('·')[0]}
                      </div>
                    )}

                    {/* Wishlist Heart Button */}
                    <button
                      onClick={() => onToggleWishlist(product)}
                      className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm text-[#736E67] hover:text-[#171615] transition-colors border border-black/5"
                      aria-label="Ajouter aux souhaits"
                      title={isWishlisted ? "Retirer de vos favoris" : "Conserver cette pièce"}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#C5A880] text-[#C5A880]' : ''}`} />
                    </button>

                    {/* Hover Quick Actions Bar */}
                    <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="flex-1 py-2.5 px-3 bg-[#171615]/95 text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#171615] transition-colors flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Découvrir</span>
                      </button>

                      <button
                        onClick={() => onQuickAdd(product)}
                        className="py-2.5 px-3 bg-white/95 text-[#171615] text-xs font-medium hover:bg-white transition-colors flex items-center justify-center border border-[#171615] shadow-md"
                        title="Ajouter directement au panier"
                        aria-label="Ajout rapide au panier"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Product Metadata Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Quiet Category & Origin */}
                      <div className="flex items-center justify-between text-[11px] text-[#736E67] tracking-wider uppercase mb-1">
                        <span>{product.categoryLabel}</span>
                        <span>{product.craftsmanshipTime.split(' ')[0]} h atelier</span>
                      </div>

                      {/* Product Name */}
                      <h3 
                        onClick={() => onSelectProduct(product)}
                        className="text-lg font-serif text-[#171615] hover:text-[#C5A880] transition-colors cursor-pointer leading-snug"
                      >
                        {product.name}
                      </h3>

                      {/* Subtitle / Fabric mention */}
                      <p className="text-xs text-[#736E67] mt-1 font-normal line-clamp-1">
                        {product.subtitle}
                      </p>
                    </div>

                    {/* Price in tabular numerals & Size range */}
                    <div className="mt-4 pt-3 border-t border-[#F3EFEA] flex items-center justify-between">
                      <div className="text-sm font-mono-numbers font-medium text-[#171615]">
                        {priceFormatted} {currencySymbol}
                      </div>

                      <div className="text-[11px] text-[#A8A29A] font-mono-numbers">
                        Tailles {product.availableSizes[0]} – {product.availableSizes[product.availableSizes.length - 1]}
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
