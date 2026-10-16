import React, { useState } from 'react';
import { ArrowRight, Check, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#111113] text-[#FAF8F5] pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand & Mission (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xl font-cinzel tracking-[0.25em] uppercase text-white block">
              MAISON D’ORSAY
            </span>
            <p className="text-xs text-white/60 leading-relaxed max-w-sm font-normal">
              Haute Couture et prêt-à-porter d’exception. Façonné à la main dans notre atelier historique de la Place Vendôme, Paris. Matières naturelles et durabilité certifiée à vie.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#C5A880]">
              <Shield className="w-4 h-4 shrink-0" />
              <span>Membre de la Fédération de la Haute Couture et de la Mode</span>
            </div>
          </div>

          {/* Salons & Boutiques (2 cols) */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <span className="uppercase tracking-widest text-white/40 font-medium block mb-2">
              Salons Privés
            </span>
            <ul className="space-y-2 text-white/70">
              <li><a href="#salons" className="hover:text-white transition-colors">Paris · Place Vendôme</a></li>
              <li><a href="#salons" className="hover:text-white transition-colors">Monaco · Monte-Carlo</a></li>
              <li><a href="#salons" className="hover:text-white transition-colors">Genève · Rue du Rhône</a></li>
              <li><a href="#salons" className="hover:text-white transition-colors">Londres · Mayfair (2027)</a></li>
            </ul>
          </div>

          {/* Services & Conciergerie (2 cols) */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <span className="uppercase tracking-widest text-white/40 font-medium block mb-2">
              Services Maison
            </span>
            <ul className="space-y-2 text-white/70">
              <li><span className="text-white/90">Atelier Sur-Mesure</span></li>
              <li><span className="text-white/90">Retouches d’Urgence</span></li>
              <li><span className="text-white/90">Entretien &amp; Restauration</span></li>
              <li><span className="text-white/90">Livraison Gants Blancs</span></li>
            </ul>
          </div>

          {/* Newsletter / Gazette D'Orsay (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-widest text-white/40 font-medium block mb-1">
              La Gazette D’Orsay
            </span>
            <p className="text-xs text-white/60 leading-relaxed">
              Recevez en avant-première nos carnets de défilé et invitations aux présentations privées.
            </p>

            <form onSubmit={handleSubscribe} className="pt-1">
              <div className="flex border-b border-white/30 focus-within:border-[#C5A880] transition-colors py-1">
                <input
                  type="email"
                  required
                  placeholder="votre.courriel@domaine.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-xs text-white placeholder-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-1 text-white/60 hover:text-white transition-colors"
                  aria-label="S'inscrire à la gazette"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-[11px] text-[#C5A880] mt-2">
                  <Check className="w-3.5 h-3.5" />
                  <span>Votre invitation a été transmise.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
          <div className="flex items-center gap-3">
            <span>© 2026 Maison D’Orsay Paris. Tous droits réservés.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white/80 transition-colors">Certificat de Traçabilité</a>
            <a href="#" className="hover:text-white/80 transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white/80 transition-colors">Politique de Confidentialité</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
