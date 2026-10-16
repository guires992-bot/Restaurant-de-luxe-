import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CollectionSection } from './components/CollectionSection';
import { LookbookSection } from './components/LookbookSection';
import { SavoirFaireSection } from './components/SavoirFaireSection';
import { SalonsSection } from './components/SalonsSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { PrivateAppointmentModal } from './components/PrivateAppointmentModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { PRODUCTS, Product, CURRENCIES } from './data/luxuryFashionData';

export function App() {
  // Cart state: initialized with 1 iconic piece so the user can immediately experience the drawer
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'manteau-auguste-cachemire-38-Camel Impérial',
      product: PRODUCTS[0],
      size: '38',
      color: 'Camel Impérial',
      quantity: 1
    }
  ]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[1]]);

  // Currency state
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>('EUR');
  const activeCurrency = CURRENCIES.find(c => c.code === selectedCurrencyCode) || CURRENCIES[0];

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState<boolean>(false);
  const [appointmentSalon, setAppointmentSalon] = useState<string>('Paris');
  const [appointmentProductRef, setAppointmentProductRef] = useState<string | undefined>(undefined);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  // Cart operations
  const handleAddToCart = (product: Product, size: string, color: string) => {
    const itemKey = `${product.id}-${size}-${color}`;
    setCartItems(prev => {
      const existing = prev.find(item => item.id === itemKey);
      if (existing) {
        return prev.map(item =>
          item.id === itemKey ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          product,
          size,
          color,
          quantity: 1
        }
      ];
    });
    setIsCartOpen(true);
  };

  const handleQuickAdd = (product: Product) => {
    const defaultSize = product.availableSizes[0] || '38';
    const defaultColor = product.colors[0]?.name || 'Noir';
    handleAddToCart(product, defaultSize, defaultColor);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  // Salon Appointment helper
  const handleOpenAppointment = (salonCity?: string, productRef?: string) => {
    if (salonCity) setAppointmentSalon(salonCity);
    if (productRef) setAppointmentProductRef(productRef);
    setIsAppointmentOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#171615] flex flex-col font-sans selection:bg-[#C5A880] selection:text-white">
      {/* Strict Top Bar Contract */}
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAppointment={() => handleOpenAppointment('Paris')}
        selectedCurrency={selectedCurrencyCode}
        onCurrencyChange={(code) => setSelectedCurrencyCode(code)}
      />

      {/* Main Experience */}
      <main className="flex-1">
        {/* Campaign Hero */}
        <Hero
          onOpenAppointment={() => handleOpenAppointment('Paris')}
        />

        {/* Catalog & Curated Vestiaire */}
        <CollectionSection
          onSelectProduct={(product) => setSelectedProductForDetail(product)}
          onQuickAdd={handleQuickAdd}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlist.map(p => p.id)}
          currencySymbol={activeCurrency.symbol}
          currencyRate={activeCurrency.rate}
        />

        {/* Interactive Runway Lookbook */}
        <LookbookSection
          onSelectProduct={(product) => setSelectedProductForDetail(product)}
          currencySymbol={activeCurrency.symbol}
          currencyRate={activeCurrency.rate}
        />

        {/* Parisian Atelier & Savoir-Faire */}
        <SavoirFaireSection />

        {/* Private Fitting Salons */}
        <SalonsSection
          onOpenAppointment={(city) => handleOpenAppointment(city)}
        />
      </main>

      {/* Quiet Haute Couture Footer */}
      <Footer />

      {/* Modals & Slide-overs */}
      <ProductDetailModal
        product={selectedProductForDetail}
        isOpen={!!selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProductForDetail ? wishlist.some(p => p.id === selectedProductForDetail.id) : false}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenAppointment={(ref) => handleOpenAppointment('Paris', ref)}
        currencySymbol={activeCurrency.symbol}
        currencyRate={activeCurrency.rate}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        currencySymbol={activeCurrency.symbol}
        currencyRate={activeCurrency.rate}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onSelectProduct={(product) => setSelectedProductForDetail(product)}
        currencySymbol={activeCurrency.symbol}
        currencyRate={activeCurrency.rate}
      />

      <PrivateAppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => {
          setIsAppointmentOpen(false);
          setAppointmentProductRef(undefined);
        }}
        initialSalon={appointmentSalon}
        initialProductRef={appointmentProductRef}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}

export default App;
