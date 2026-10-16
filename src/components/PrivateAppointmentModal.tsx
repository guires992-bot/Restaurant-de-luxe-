import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { SALONS_LOCATIONS, SalonLocation } from '../data/luxuryFashionData';

interface PrivateAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSalon?: string;
  initialProductRef?: string;
}

export const PrivateAppointmentModal: React.FC<PrivateAppointmentModalProps> = ({
  isOpen,
  onClose,
  initialSalon = 'Paris',
  initialProductRef
}) => {
  const [selectedCity, setSelectedCity] = useState<string>(initialSalon);
  const [serviceType, setServiceType] = useState<string>('essayage');
  const [date, setDate] = useState<string>('2026-10-24');
  const [time, setTime] = useState<string>('15:00');
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>(initialProductRef ? `Intérêt pour la pièce : ${initialProductRef}` : '');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const activeSalon: SalonLocation = SALONS_LOCATIONS.find(s => s.city === selectedCity) || SALONS_LOCATIONS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) return;
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF8F5] text-[#171615] shadow-2xl border border-[#E8E2D9] max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleResetAndClose}
          className="absolute top-6 right-6 p-2 text-[#736E67] hover:text-[#171615] transition-colors z-10"
          aria-label="Fermer le formulaire de rendez-vous"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div className="p-8 md:p-10">
            <div className="mb-6">
              <span className="text-xs tracking-widest uppercase text-[#C5A880] font-medium block mb-1">
                L’Expérience Privée
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-[#171615]">
                Réserver un Salon Privé &amp; Essayage
              </h2>
              <p className="text-sm text-[#736E67] mt-2 leading-relaxed">
                Nos salons feutrés vous accueillent pour une séance de présentation exclusive, une prise de mesures personnalisée ou un ajustement sur-mesure de nos créations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Salon Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#736E67] mb-2 font-medium">
                  Choisir un Salon Maison D’Orsay
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {SALONS_LOCATIONS.map((salon) => (
                    <button
                      key={salon.city}
                      type="button"
                      onClick={() => setSelectedCity(salon.city)}
                      className={`py-3 px-3 text-xs tracking-wider uppercase border transition-all text-center ${
                        selectedCity === salon.city
                          ? 'border-[#171615] bg-[#171615] text-[#FAF8F5]'
                          : 'border-[#E8E2D9] bg-white text-[#5C564E] hover:border-[#171615]'
                      }`}
                    >
                      <span className="font-semibold block">{salon.city}</span>
                      <span className="text-[10px] opacity-75 truncate block mt-0.5">{salon.name}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-2.5 p-3 bg-[#F3EFEA] text-xs text-[#5C564E] flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#171615]">{activeSalon.name}</span> · {activeSalon.address}, {activeSalon.postalCode}
                    <div className="text-[11px] text-[#736E67] mt-0.5">{activeSalon.privilege}</div>
                  </div>
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#736E67] mb-2 font-medium">
                  Type d’Expérience Souhaitée
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'essayage', title: 'Essayage Privé', desc: 'Découverte de la collection' },
                    { id: 'surmesure', title: 'Atelier Sur-Mesure', desc: 'Prise de mesures & patronage' },
                    { id: 'styling', title: 'Consultation Style', desc: 'Garde-robe saisonnière' }
                  ].map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setServiceType(service.id)}
                      className={`p-3 text-left border transition-all ${
                        serviceType === service.id
                          ? 'border-[#171615] bg-[#171615] text-[#FAF8F5]'
                          : 'border-[#E8E2D9] bg-white text-[#5C564E] hover:border-[#171615]'
                      }`}
                    >
                      <div className="font-medium">{service.title}</div>
                      <div className="text-[11px] opacity-75 mt-0.5">{service.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#736E67] mb-1.5 font-medium">
                    Date Préférée
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full bg-white border border-[#E8E2D9] px-3 py-2.5 text-xs text-[#171615] focus:outline-none focus:border-[#171615]"
                    />
                    <Calendar className="w-4 h-4 text-[#736E67] absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#736E67] mb-1.5 font-medium">
                    Créneau Horaire
                  </label>
                  <div className="relative">
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-white border border-[#E8E2D9] px-3 py-2.5 text-xs text-[#171615] focus:outline-none focus:border-[#171615] appearance-none"
                    >
                      <option value="11:00">11:00 — Matinée privée</option>
                      <option value="14:00">14:00 — Début d’après-midi</option>
                      <option value="15:30">15:30 — Salon de thé &amp; Essayage</option>
                      <option value="17:00">17:00 — Fin d’après-midi</option>
                      <option value="18:30">18:30 — Nocturne exclusive</option>
                    </select>
                    <Clock className="w-4 h-4 text-[#736E67] absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Client Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#736E67] mb-1.5 font-medium">
                    Nom &amp; Prénom
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Comtesse de ... ou M./Mme"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] px-3 py-2.5 text-xs text-[#171615] placeholder-[#A8A29A] focus:outline-none focus:border-[#171615]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#736E67] mb-1.5 font-medium">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+33 6 00 00 00 00"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] px-3 py-2.5 text-xs text-[#171615] placeholder-[#A8A29A] focus:outline-none focus:border-[#171615]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#736E67] mb-1.5 font-medium">
                  Adresse Courriel
                </label>
                <input
                  type="email"
                  required
                  placeholder="votre.nom@domaine.fr"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] px-3 py-2.5 text-xs text-[#171615] placeholder-[#A8A29A] focus:outline-none focus:border-[#171615]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#736E67] mb-1.5 font-medium">
                  Désirs Particuliers ou Pièces Recherchées (Facultatif)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Pièce de défilé précise, champagne millésimé ou préférences..."
                  className="w-full bg-white border border-[#E8E2D9] p-3 text-xs text-[#171615] placeholder-[#A8A29A] focus:outline-none focus:border-[#171615]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#736E67]">
                  Service de conciergerie personnalisé sans engagement.
                </span>
                <button
                  type="submit"
                  className="px-6 py-3 text-xs tracking-wider uppercase font-medium bg-[#171615] text-[#FAF8F5] hover:bg-[#33312E] transition-colors"
                >
                  Confirmer le Rendez-vous
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-8 md:p-12 text-center">
            <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center bg-[#F3EFEA] border border-[#C5A880]/30 text-[#C5A880]">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <span className="text-xs tracking-widest uppercase text-[#C5A880] font-medium block mb-2">
              Invitation Privée Confirmée
            </span>
            <h3 className="text-2xl md:text-3xl font-serif text-[#171615] mb-4">
              Nous serons honorés de vous recevoir, {clientName}.
            </h3>
            
            <p className="text-sm text-[#736E67] max-w-md mx-auto mb-8 leading-relaxed">
              Votre invitation personnelle a été transmise à l’adresse <strong className="text-[#171615]">{clientEmail}</strong>. Notre premier d’atelier préparera le salon privé pour votre venue.
            </p>

            <div className="max-w-md mx-auto bg-white p-6 border border-[#E8E2D9] text-left text-xs space-y-2 mb-8">
              <div className="flex justify-between border-b border-[#F3EFEA] pb-2">
                <span className="text-[#736E67]">Lieu :</span>
                <span className="font-semibold text-[#171615]">{activeSalon.name} — {activeSalon.address}</span>
              </div>
              <div className="flex justify-between border-b border-[#F3EFEA] pb-2">
                <span className="text-[#736E67]">Date &amp; Heure :</span>
                <span className="font-semibold text-[#171615]">{date} à {time}</span>
              </div>
              <div className="flex justify-between border-b border-[#F3EFEA] pb-2">
                <span className="text-[#736E67]">Protocole :</span>
                <span className="text-[#171615]">Accueil au champagne &amp; salon privatif réservé</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#736E67]">Passe Privé :</span>
                <span className="font-mono-numbers text-[#C5A880] font-semibold">VENDOME-2026-VIP-{Math.floor(1000 + Math.random() * 9000)}</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-8 py-3 text-xs tracking-widest uppercase font-medium bg-[#171615] text-[#FAF8F5] hover:bg-[#33312E] transition-colors"
            >
              Fermer &amp; Poursuivre la Visite
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
