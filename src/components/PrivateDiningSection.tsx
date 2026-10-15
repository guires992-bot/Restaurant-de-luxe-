import React, { useState } from 'react';
import { Users, Wine, Calendar, Check, Mail, Sparkles, Building2 } from 'lucide-react';
import { RESTAURANT_IMAGES } from '../data/restaurantData';

export const PrivateDiningSection: React.FC = () => {
  const [privatizationType, setPrivatizationType] = useState<'mezzanine' | 'totale'>('mezzanine');
  const [estimatedGuests, setEstimatedGuests] = useState<number>(20);
  const [inquirySent, setInquirySent] = useState<boolean>(false);
  const [inquiryEmail, setInquiryEmail] = useState<string>('');
  const [inquiryName, setInquiryName] = useState<string>('');

  const pricePerGuest = privatizationType === 'mezzanine' ? 180 : 250;
  const estimatedTotal = estimatedGuests * pricePerGuest;

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail) return;
    setInquirySent(true);
  };

  return (
    <section id="privatisation" className="py-20 lg:py-28 bg-[#110F0D] border-b border-[#2C241D]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              <span>05. Événements &amp; Réceptions d’Exception</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F7F3EE] [text-wrap:balance]">
              Privatisation du Pavillon &amp; Galas Sous les Arches
            </h2>

            <p className="text-sm sm:text-base text-[#A89A8C] leading-relaxed">
              Pour vos dîners de haute joaillerie, défilés de Fashion Week, banquets diplomatiques ou célébrations d'exception, le pavillon <strong className="text-[#EDE5DA] font-medium font-cinzel">MORRA</strong> privatise sa mezzanine panoramique ou l'intégralité de sa nef en travertin et de son parvis avec miroir d’eau.
            </p>

            {/* Interactive Calculator */}
            <div className="bg-[#15120F] border border-[#2D241C] p-6 space-y-6 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#241D16]">
                <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                  Simulateur de Réception Privée
                </span>
                <span className="text-xs text-[#8E8072]">Estimation indicative</span>
              </div>

              {/* Formula choice */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPrivatizationType('mezzanine');
                    if (estimatedGuests > 35) setEstimatedGuests(25);
                  }}
                  className={`p-3 text-xs text-left border transition-all ${
                    privatizationType === 'mezzanine'
                      ? 'border-[#D4AF37] bg-[#1E1914] text-[#EDE5DA] font-semibold'
                      : 'border-[#2A2118] bg-[#0D0B0A] text-[#8E8072]'
                  }`}
                >
                  <div className="font-serif text-sm text-[#F7F3EE]">La Mezzanine Céleste</div>
                  <div className="text-[11px] text-[#A89A8C] mt-0.5">Jusqu'à 35 convives assis</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPrivatizationType('totale');
                    if (estimatedGuests < 40) setEstimatedGuests(80);
                  }}
                  className={`p-3 text-xs text-left border transition-all ${
                    privatizationType === 'totale'
                      ? 'border-[#D4AF37] bg-[#1E1914] text-[#EDE5DA] font-semibold'
                      : 'border-[#2A2118] bg-[#0D0B0A] text-[#8E8072]'
                  }`}
                >
                  <div className="font-serif text-sm text-[#F7F3EE]">Pavillon &amp; Parvis Entier</div>
                  <div className="text-[11px] text-[#A89A8C] mt-0.5">Jusqu'à 150 convives (Grand Gala)</div>
                </button>
              </div>

              {/* Guest Count Selector */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#A89A8C]">Nombre de convives estimé :</span>
                  <span className="font-mono-numbers text-sm font-semibold text-[#D4AF37]">
                    {estimatedGuests} personnes
                  </span>
                </div>
                <input
                  type="range"
                  min={privatizationType === 'mezzanine' ? 10 : 40}
                  max={privatizationType === 'mezzanine' ? 35 : 150}
                  value={estimatedGuests}
                  onChange={(e) => setEstimatedGuests(Number(e.target.value))}
                  className="w-full accent-[#D4AF37] bg-[#2A2118] h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Estimate Breakdown */}
              <div className="pt-4 border-t border-[#241D16] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#8E8072]">Formule Gastronomique &amp; Cave</div>
                  <div className="text-xs text-[#EDE5DA]">{pricePerGuest} € par convive (base estimée)</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-[#8E8072]">Budget global estimé</div>
                  <div className="font-mono-numbers text-2xl font-semibold text-[#D4AF37]">
                    {estimatedTotal.toLocaleString('fr-FR')} € HT
                  </div>
                </div>
              </div>

              {/* Quick Inquiry Form */}
              {!inquirySent ? (
                <form onSubmit={handleSendInquiry} className="pt-4 border-t border-[#241D16] space-y-3">
                  <div className="text-xs text-[#A89A8C]">
                    Recevez notre brochure événementielle et le devis détaillé sous 24 heures :
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Votre nom ou société"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs bg-[#0D0B0A] border border-[#2B221A] text-[#EDE5DA] placeholder-[#6E6357] focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="email"
                      placeholder="Votre e-mail professionnel"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs bg-[#0D0B0A] border border-[#2B221A] text-[#EDE5DA] placeholder-[#6E6357] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0D0B0A] bg-[#D4AF37] hover:bg-[#E5C378] transition-all border border-[#F3DC9B]"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Demander la Brochure &amp; Disponibilités</span>
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-[#1B271A] border border-[#3E5C38] text-xs text-[#B5DFB0] flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#85E377] shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Demande enregistrée avec succès</div>
                    <div>Notre direction des événements prendra contact avec vous sous 24h.</div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Visual featuring Mezzanine */}
          <div className="lg:col-span-6 relative">
            <div className="relative group overflow-hidden border border-[#2D241C] shadow-2xl">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={RESTAURANT_IMAGES.mezzanine}
                  alt="La Mezzanine Céleste de MORRA surplombant les arches et les fontaines"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4 bg-[#14110E] border-t border-[#282018] flex items-center justify-between text-xs text-[#A89A8C]">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-serif text-[#F2ECE4]">La Mezzanine Céleste &amp; Balcon des Arches</span>
                </div>
                <span className="text-[#8E8072]">Événements Privés</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
