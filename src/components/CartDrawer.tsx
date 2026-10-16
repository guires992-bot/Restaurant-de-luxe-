import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Gift, Check, Lock, PackageCheck } from 'lucide-react';
import { Product } from '../data/luxuryFashionData';

export interface CartItem {
  id: string; // unique item id combining product.id + size + color
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  currencySymbol: string;
  currencyRate: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  currencySymbol,
  currencyRate
}) => {
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState<string>('');
  const [isGiftWrap, setIsGiftWrap] = useState<boolean>(true);
  const [giftNote, setGiftNote] = useState<string>('');
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);

  // Form states for checkout
  const [clientName, setClientName] = useState<string>('Alexandre de Montmirail');
  const [clientAddress, setClientAddress] = useState<string>('8, Avenue George V');
  const [clientCity, setClientCity] = useState<string>('Paris');
  const [clientZip, setClientZip] = useState<string>('75008');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'wire'>('card');

  if (!isOpen) return null;

  const rawSubtotalEUR = cartItems.reduce((acc, item) => acc + (item.product.priceEUR * item.quantity), 0);
  const discountAmountEUR = rawSubtotalEUR * appliedDiscount;
  const finalTotalEUR = rawSubtotalEUR - discountAmountEUR;

  const subtotalFormatted = Math.round(rawSubtotalEUR * currencyRate).toLocaleString('fr-FR');
  const discountFormatted = Math.round(discountAmountEUR * currencyRate).toLocaleString('fr-FR');
  const totalFormatted = Math.round(finalTotalEUR * currencyRate).toLocaleString('fr-FR');

  const freeShippingThresholdEUR = 500;
  const progressToFreeShipping = Math.min(100, Math.round((rawSubtotalEUR / freeShippingThresholdEUR) * 100));
  const amountRemainingForFreeShipping = Math.max(0, freeShippingThresholdEUR - rawSubtotalEUR);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'VENDOME') {
      setAppliedDiscount(0.10);
      setPromoError('');
    } else {
      setPromoError('Code privilège non reconnu');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderConfirmed(true);
  };

  const handleResetOrder = () => {
    setOrderConfirmed(false);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          className="w-screen max-w-md md:max-w-lg bg-[#FAF8F5] text-[#171615] shadow-2xl flex flex-col border-l border-[#E8E2D9]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8E2D9] flex items-center justify-between">
            <div>
              <span className="text-[10px] tracking-widest uppercase text-[#736E67] font-medium block">
                Maison D’Orsay Paris
              </span>
              <h2 className="text-xl font-serif text-[#171615]">
                {isCheckingOut ? 'Finalisation de votre Écrin' : `Mon Panier (${cartItems.reduce((a, b) => a + b.quantity, 0)})`}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#736E67] hover:text-[#171615] transition-colors"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {orderConfirmed ? (
              /* Order Confirmation State */
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-[#F3EFEA] border border-[#C5A880]/30 text-[#C5A880]">
                  <PackageCheck className="w-8 h-8" />
                </div>
                <span className="text-xs uppercase tracking-widest text-[#C5A880] font-medium block mb-2">
                  Commande Enregistrée
                </span>
                <h3 className="text-2xl font-serif text-[#171615] mb-3">
                  Merci, {clientName}.
                </h3>
                <p className="text-xs text-[#736E67] mb-6 leading-relaxed">
                  Votre commande <strong className="text-[#171615]">#DO-2026-{(1042 + Math.floor(Math.random() * 500))}</strong> est en cours de préparation délicate par notre atelier. Vous recevrez le numéro de scellé de sécurité sous peu.
                </p>

                <div className="bg-white border border-[#E8E2D9] p-4 text-xs text-left space-y-2 mb-8">
                  <div className="flex justify-between border-b border-[#F3EFEA] pb-2">
                    <span className="text-[#736E67]">Adresse d’expédition :</span>
                    <span className="text-[#171615] font-medium">{clientAddress}, {clientZip} {clientCity}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#F3EFEA] pb-2">
                    <span className="text-[#736E67]">Montant Total Réglé :</span>
                    <span className="font-mono-numbers font-semibold text-[#171615]">{totalFormatted} {currencySymbol}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-[#736E67]">Conditionnement :</span>
                    <span className="text-[#171615]">{isGiftWrap ? 'Écrin Maison & sceau de cire' : 'Boîte d’expédition rigide'}</span>
                  </div>
                </div>

                <button
                  onClick={handleResetOrder}
                  className="w-full py-3.5 text-xs tracking-widest uppercase font-medium bg-[#171615] text-[#FAF8F5] hover:bg-[#33312E] transition-colors"
                >
                  Continuer la Découverte
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Checkout View */
              <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                <div className="bg-[#F3EFEA] p-3 text-xs text-[#5C564E] flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#171615]" />
                  <span>Paiement crypté sécurisé 256-bit avec garantie d’authenticité</span>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#736E67] mb-1 font-medium">
                    Nom Complet pour la Facture &amp; le Certificat
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] px-3 py-2 text-xs text-[#171615] focus:outline-none focus:border-[#171615]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#736E67] mb-1 font-medium">
                    Adresse de Livraison en Main Propre
                  </label>
                  <input
                    type="text"
                    required
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] px-3 py-2 text-xs text-[#171615] focus:outline-none focus:border-[#171615]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#736E67] mb-1 font-medium">
                      Code Postal
                    </label>
                    <input
                      type="text"
                      required
                      value={clientZip}
                      onChange={(e) => setClientZip(e.target.value)}
                      className="w-full bg-white border border-[#E8E2D9] px-3 py-2 text-xs text-[#171615] focus:outline-none focus:border-[#171615]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#736E67] mb-1 font-medium">
                      Ville
                    </label>
                    <input
                      type="text"
                      required
                      value={clientCity}
                      onChange={(e) => setClientCity(e.target.value)}
                      className="w-full bg-white border border-[#E8E2D9] px-3 py-2 text-xs text-[#171615] focus:outline-none focus:border-[#171615]"
                    />
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#736E67] mb-2 font-medium">
                    Mode de Règlement Sécurisé
                  </label>
                  <div className="space-y-2 text-xs">
                    {[
                      { id: 'card', label: 'Carte Bancaire (Visa, Mastercard, Amex Centurion)' },
                      { id: 'applepay', label: 'Apple Pay / Paylib Instantané' },
                      { id: 'wire', label: 'Virement Bancaire Privé (Pièces Numérotées)' }
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${
                          paymentMethod === method.id
                            ? 'border-[#171615] bg-white font-medium'
                            : 'border-[#E8E2D9] bg-white/50 text-[#736E67]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id as any)}
                          className="accent-[#171615]"
                        />
                        <span>{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="py-3 px-4 text-xs uppercase tracking-wider text-[#736E67] hover:text-[#171615] border border-[#E8E2D9] transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 px-4 text-xs tracking-widest uppercase font-medium bg-[#171615] text-[#FAF8F5] hover:bg-[#33312E] transition-colors flex items-center justify-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Régler {totalFormatted} {currencySymbol}</span>
                  </button>
                </div>
              </form>
            ) : cartItems.length === 0 ? (
              /* Empty Cart State */
              <div className="text-center py-16">
                <p className="text-sm font-serif text-[#736E67] italic mb-4">
                  Votre écrin d’achat est actuellement vide.
                </p>
                <p className="text-xs text-[#A8A29A] mb-8 max-w-xs mx-auto">
                  Découvrez les créations de la collection automne-hiver façonnées dans notre atelier parisien.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 text-xs tracking-widest uppercase font-medium bg-[#171615] text-[#FAF8F5] hover:bg-[#33312E] transition-colors"
                >
                  Découvrir les Pièces
                </button>
              </div>
            ) : (
              /* Cart Items List */
              <div className="space-y-6">
                {/* Free Shipping Bar */}
                <div className="p-3 bg-white border border-[#E8E2D9]">
                  <div className="flex justify-between items-center text-[11px] text-[#736E67] mb-1.5">
                    <span>
                      {amountRemainingForFreeShipping === 0
                        ? 'Livraison sécurisée avec gants blancs offerte'
                        : `Plus que ${Math.round(amountRemainingForFreeShipping * currencyRate)} ${currencySymbol} pour la livraison offerte`}
                    </span>
                    <span className="font-mono-numbers">{progressToFreeShipping}%</span>
                  </div>
                  <div className="w-full bg-[#E8E2D9] h-1 overflow-hidden">
                    <div 
                      className="bg-[#C5A880] h-full transition-all duration-500" 
                      style={{ width: `${progressToFreeShipping}%` }}
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-[#E8E2D9]">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-4 flex gap-4">
                      <div className="w-20 h-24 bg-[#F3EFEA] overflow-hidden shrink-0 border border-[#E8E2D9]">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-serif text-[#171615] leading-tight">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-[#A8A29A] hover:text-[#171615] p-1 transition-colors"
                              aria-label="Supprimer cet article"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <div className="text-[11px] text-[#736E67] mt-1 space-x-2">
                            <span>Taille {item.size}</span>
                            <span>·</span>
                            <span>{item.color}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-3">
                          {/* Quantity Stepper */}
                          <div className="flex items-center border border-[#E8E2D9] bg-white">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="px-2 py-0.5 text-xs text-[#736E67] hover:text-[#171615]"
                              aria-label="Diminuer la quantité"
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 text-xs font-mono-numbers text-[#171615]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="px-2 py-0.5 text-xs text-[#736E67] hover:text-[#171615]"
                              aria-label="Augmenter la quantité"
                            >
                              +
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-xs font-mono-numbers font-medium text-[#171615]">
                            {Math.round(item.product.priceEUR * item.quantity * currencyRate).toLocaleString('fr-FR')} {currencySymbol}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gift Wrap Option */}
                <div className="p-3.5 bg-white border border-[#E8E2D9]">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isGiftWrap}
                      onChange={(e) => setIsGiftWrap(e.target.checked)}
                      className="mt-0.5 accent-[#171615]"
                    />
                    <div className="text-xs">
                      <span className="font-medium text-[#171615] flex items-center gap-1.5">
                        <Gift className="w-3.5 h-3.5 text-[#C5A880]" />
                        Écrin de Présentation Haute Couture (Offert)
                      </span>
                      <p className="text-[11px] text-[#736E67] mt-0.5">
                        Ruban de soie naturelle, papier de soie gaufré et cachet de cire Maison D’Orsay.
                      </p>
                    </div>
                  </label>

                  {isGiftWrap && (
                    <div className="mt-2.5 pt-2.5 border-t border-[#F3EFEA]">
                      <input
                        type="text"
                        placeholder="Message personnalisé pour la carte calligraphiée..."
                        value={giftNote}
                        onChange={(e) => setGiftNote(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#E8E2D9] px-2.5 py-1.5 text-xs text-[#171615] placeholder-[#A8A29A] focus:outline-none focus:border-[#171615]"
                      />
                    </div>
                  )}
                </div>

                {/* Promo Privilege Code */}
                <div>
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Code privilège (ex: VENDOME)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-white border border-[#E8E2D9] px-3 py-2 text-xs uppercase tracking-wider text-[#171615] placeholder-[#A8A29A] focus:outline-none focus:border-[#171615]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs tracking-wider uppercase font-medium bg-[#FAF8F5] border border-[#171615] text-[#171615] hover:bg-[#171615] hover:text-[#FAF8F5] transition-colors"
                    >
                      Appliquer
                    </button>
                  </form>
                  {appliedDiscount > 0 && (
                    <div className="text-[11px] text-[#2E5A44] mt-1 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Privilège Vendôme activé : 10% d’attention gracieuse</span>
                    </div>
                  )}
                  {promoError && (
                    <div className="text-[11px] text-[#8A3828] mt-1">
                      {promoError}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {!orderConfirmed && !isCheckingOut && cartItems.length > 0 && (
            <div className="p-6 border-t border-[#E8E2D9] bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#736E67]">
                  <span>Sous-total</span>
                  <span className="font-mono-numbers">{subtotalFormatted} {currencySymbol}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#2E5A44]">
                    <span>Privilège de Bienvenue (-10%)</span>
                    <span className="font-mono-numbers">- {discountFormatted} {currencySymbol}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#736E67]">
                  <span>Livraison Sécurisée</span>
                  <span>{amountRemainingForFreeShipping === 0 ? 'Offerte' : `50 ${currencySymbol}`}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#171615] pt-2 border-t border-[#E8E2D9]">
                  <span>Total Estimé</span>
                  <span className="font-mono-numbers text-base">{totalFormatted} {currencySymbol}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-4 text-xs tracking-widest uppercase font-medium bg-[#171615] text-[#FAF8F5] hover:bg-[#33312E] transition-colors flex items-center justify-center gap-2"
              >
                <span>Commander avec Écrin Sécurisé</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#736E67]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Expédition suivie avec remise contre signature en gants blancs</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
