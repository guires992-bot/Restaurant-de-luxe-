import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Users, MapPin, CheckCircle2, ChevronRight, AlertCircle, Droplets, Flower2, Columns, Sparkles } from 'lucide-react';
import { DINING_ZONES, RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialZoneId?: string;
  initialNotes?: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  initialZoneId,
  initialNotes
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-16');
  const [selectedService, setSelectedService] = useState<string>('Dîner 1er Service');
  const [selectedTime, setSelectedTime] = useState<string>('20h00');
  const [selectedZone, setSelectedZone] = useState<string>(initialZoneId || 'grand-salon-arches');
  
  // Guest Info
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [dietary, setDietary] = useState<string>('');
  const [notes, setNotes] = useState<string>(initialNotes || '');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [bookingRef, setBookingRef] = useState<string>('');

  useEffect(() => {
    if (initialZoneId) {
      setSelectedZone(initialZoneId);
    }
  }, [initialZoneId]);

  useEffect(() => {
    if (initialNotes) {
      setNotes(initialNotes);
    }
  }, [initialNotes]);

  if (!isOpen) return null;

  const handleNextToGuestDetails = () => {
    setStep(2);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage('Veuillez renseigner votre nom, téléphone et adresse e-mail.');
      return;
    }
    setErrorMessage('');
    const randomCode = `MORRA-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(randomCode);
    setStep(3);
  };

  const resetAndClose = () => {
    setStep(1);
    setErrorMessage('');
    onClose();
  };

  const currentZoneObj = DINING_ZONES.find((z) => z.id === selectedZone) || DINING_ZONES[0];

  const dinnerTimes = ['19h30', '20h00', '20h30', '21h00', '21h30', '22h00'];
  const lunchTimes = ['12h00', '12h30', '13h00', '13h30'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#14110E] border border-[#3A3026] shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#282018]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold font-cinzel">
              MORRA &middot; Conciergerie &amp; Réservations
            </span>
            <h3 className="font-serif text-2xl text-[#F7F3EE]">
              {step === 1 && 'Votre Table & Date'}
              {step === 2 && 'Vos Coordonnées & Souhaits'}
              {step === 3 && 'Confirmation de Réservation'}
            </h3>
          </div>

          <button
            onClick={resetAndClose}
            className="p-2 text-[#8E8072] hover:text-[#EDE5DA] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 lg:p-8">
          
          {/* STEP 1: DATE, GUESTS & ZONE */}
          {step === 1 && (
            <div className="space-y-6">
              
              {/* Convives */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A89A8C] mb-2 font-medium">
                  Nombre de Convives
                </label>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuestCount(num)}
                      className={`w-11 h-11 text-sm font-mono-numbers font-medium transition-all border ${
                        guestCount === num
                          ? 'bg-[#D4AF37] text-[#0D0B0A] border-[#F3DC9B] font-semibold'
                          : 'bg-[#0D0B0A] text-[#A89A8C] border-[#2A2118] hover:border-[#524133]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setGuestCount(10)}
                    className={`px-4 h-11 text-xs uppercase tracking-wider font-medium transition-all border ${
                      guestCount >= 10
                        ? 'bg-[#D4AF37] text-[#0D0B0A] border-[#F3DC9B] font-semibold'
                        : 'bg-[#0D0B0A] text-[#A89A8C] border-[#2A2118] hover:border-[#524133]'
                    }`}
                  >
                    10+ (Privatisation)
                  </button>
                </div>
              </div>

              {/* Date & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A89A8C] mb-2 font-medium">
                    Date du Repas
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-[#0D0B0A] border border-[#2B221A] text-[#EDE5DA] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A89A8C] mb-2 font-medium">
                    Service
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => {
                      setSelectedService(e.target.value);
                      if (e.target.value.includes('Déjeuner')) {
                        setSelectedTime('12h30');
                      } else {
                        setSelectedTime('20h00');
                      }
                    }}
                    className="w-full px-4 py-2.5 text-sm bg-[#0D0B0A] border border-[#2B221A] text-[#EDE5DA] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Dîner 1er Service">Dîner — 1er Service (19h30 – 21h15)</option>
                    <option value="Dîner 2nd Service">Dîner — 2nd Service (21h30 – 23h30)</option>
                    <option value="Déjeuner des Arches">Déjeuner des Arches (12h00 – 14h30)</option>
                  </select>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A89A8C] mb-2 font-medium">
                  Créneau Horaire Souhaité
                </label>
                <div className="flex flex-wrap gap-2">
                  {(selectedService.includes('Déjeuner') ? lunchTimes : dinnerTimes).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`px-4 py-2 text-xs font-mono-numbers transition-all border ${
                        selectedTime === t
                          ? 'bg-[#D4AF37] text-[#0D0B0A] border-[#F3DC9B] font-semibold'
                          : 'bg-[#0D0B0A] text-[#A89A8C] border-[#2A2118] hover:border-[#524133]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Emplacement & Atmosphère Architecturale */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A89A8C] mb-2 font-medium">
                  Atmosphère Architecturale Souhaitée
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DINING_ZONES.map((zone) => {
                    const isSelected = selectedZone === zone.id;
                    return (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() => setSelectedZone(zone.id)}
                        className={`p-3 text-left border text-xs transition-all ${
                          isSelected
                            ? 'bg-[#1E1914] text-[#EDE5DA] border-[#D4AF37]'
                            : 'bg-[#0D0B0A] text-[#8E8072] border-[#251E17] hover:border-[#4A3B2D]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-serif text-sm text-[#F7F3EE]">{zone.name}</span>
                          <span className="text-[10px] text-[#D4AF37]">{zone.tag}</span>
                        </div>
                        <p className="text-[11px] text-[#8E8072] line-clamp-1">{zone.ambiance}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Next Step Button */}
              <div className="pt-4 border-t border-[#241D16] flex justify-end">
                <button
                  type="button"
                  onClick={handleNextToGuestDetails}
                  className="flex items-center gap-2 px-7 py-3 text-xs font-semibold uppercase tracking-wider text-[#0D0B0A] bg-[#D4AF37] hover:bg-[#E5C378] transition-all border border-[#F3DC9B]"
                >
                  <span>Étape Suivante &middot; Vos Coordonnées</span>
                  <ChevronRight className="w-4 h-4 text-[#0D0B0A]" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: GUEST DETAILS & NOTES */}
          {step === 2 && (
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              
              {/* Recap Strip */}
              <div className="p-4 bg-[#100E0C] border border-[#241D16] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[#8E8072]">Réservation : </span>
                  <span className="text-[#EDE5DA] font-medium">{guestCount} convives &middot; {selectedDate} à {selectedTime}</span>
                </div>
                <div className="text-[#D4AF37] font-medium">
                  {currentZoneObj.name}
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-[#381B1B] border border-[#6E2C2C] text-xs text-[#FFAEAE] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A89A8C] mb-2 font-medium">
                    Nom &amp; Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="M. ou Mme ..."
                    className="w-full px-4 py-2.5 text-sm bg-[#0D0B0A] border border-[#2B221A] text-[#EDE5DA] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A89A8C] mb-2 font-medium">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+33 6 ..."
                    className="w-full px-4 py-2.5 text-sm bg-[#0D0B0A] border border-[#2B221A] text-[#EDE5DA] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A89A8C] mb-2 font-medium">
                  Adresse E-mail *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@exemple.com"
                  className="w-full px-4 py-2.5 text-sm bg-[#0D0B0A] border border-[#2B221A] text-[#EDE5DA] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A89A8C] mb-2 font-medium">
                  Allergies ou Régimes Particuliers
                </label>
                <input
                  type="text"
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  placeholder="Ex : sans gluten, intolérance crustacés, végétarien..."
                  className="w-full px-4 py-2.5 text-sm bg-[#0D0B0A] border border-[#2B221A] text-[#EDE5DA] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A89A8C] mb-2 font-medium">
                  Notes &amp; Demandes Particulières
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Menu dégustation souhaité, table près des fontaines, anniversaire..."
                  className="w-full px-4 py-2.5 text-sm bg-[#0D0B0A] border border-[#2B221A] text-[#EDE5DA] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#241D16] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 text-xs text-[#8E8072] hover:text-[#EDE5DA]"
                >
                  &larr; Modifier Date / Table
                </button>

                <button
                  type="submit"
                  className="px-7 py-3 text-xs font-semibold uppercase tracking-wider text-[#0D0B0A] bg-[#D4AF37] hover:bg-[#E5C378] transition-all border border-[#F3DC9B]"
                >
                  Confirmer la Réservation
                </button>
              </div>

            </form>
          )}

          {/* STEP 3: SUCCESS CONFIRMATION */}
          {step === 3 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold font-cinzel">
                  Dossier Confirmé &middot; MORRA
                </span>
                <h3 className="font-serif text-3xl text-[#F7F3EE]">
                  Nous avons le plaisir de vous attendre, {fullName}
                </h3>
                <p className="text-xs text-[#8E8072] max-w-md mx-auto">
                  Un e-mail de confirmation détaillée a été expédié à <span className="text-[#EDE5DA]">{email}</span>.
                </p>
              </div>

              {/* Booking Reference Box */}
              <div className="p-6 bg-[#100E0C] border border-[#241D16] max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between border-b border-[#1E1712] pb-2 text-xs">
                  <span className="text-[#8E8072]">Référence de réservation :</span>
                  <span className="font-mono-numbers text-base font-semibold text-[#D4AF37]">{bookingRef}</span>
                </div>
                <div className="text-xs space-y-1.5 text-[#DDD4CA]">
                  <div><strong className="text-[#8E8072]">Date &amp; Heure :</strong> {selectedDate} à {selectedTime}</div>
                  <div><strong className="text-[#8E8072]">Nombre de convives :</strong> {guestCount} personnes</div>
                  <div><strong className="text-[#8E8072]">Espace attribué :</strong> {currentZoneObj.name}</div>
                  {notes && (
                    <div><strong className="text-[#8E8072]">Notes enregistrées :</strong> {notes}</div>
                  )}
                  <div className="pt-2 text-[11px] text-[#A89A8C] border-t border-[#1E1712]">
                    Service Voiturier offert &middot; {RESTAURANT_INFO.address}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-8 py-3 text-xs font-semibold uppercase tracking-wider text-[#0D0B0A] bg-[#D4AF37] hover:bg-[#E5C378] transition-all border border-[#F3DC9B]"
                >
                  Fermer &amp; Poursuivre la Découverte
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
