import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF8F5] text-[#171615] p-8 md:p-10 shadow-2xl border border-[#E8E2D9] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#736E67] hover:text-[#171615] transition-colors"
          aria-label="Fermer le guide des tailles"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-3 text-xs tracking-widest uppercase text-[#736E67]">
          <Ruler className="w-4 h-4 text-[#C5A880]" />
          <span>Atelier Vendôme · Guide des Mesures</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-serif text-[#171615] mb-4">
          Guide des Tailles &amp; Confection
        </h3>
        
        <p className="text-sm text-[#736E67] mb-6 leading-relaxed">
          Nos créations suivent le patronage classique de la haute couture française. Si vous hésitez entre deux tailles ou souhaitez une confection à vos mesures exactes, notre atelier privé se tient à votre entière disposition.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#171615]/20 text-[#171615] font-medium tracking-wider">
                <th className="py-3 px-3">Taille (FR)</th>
                <th className="py-3 px-3">Italie (IT)</th>
                <th className="py-3 px-3">UK / US</th>
                <th className="py-3 px-3">Tour de Poitrine</th>
                <th className="py-3 px-3">Tour de Taille</th>
                <th className="py-3 px-3">Tour de Bassin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D9] font-mono-numbers text-[#4A4641]">
              <tr className="hover:bg-black/[0.02]">
                <td className="py-3 px-3 font-semibold text-[#171615]">34</td>
                <td className="py-3 px-3">38</td>
                <td className="py-3 px-3">6 / 2</td>
                <td className="py-3 px-3">80 – 83 cm</td>
                <td className="py-3 px-3">60 – 63 cm</td>
                <td className="py-3 px-3">86 – 89 cm</td>
              </tr>
              <tr className="hover:bg-black/[0.02]">
                <td className="py-3 px-3 font-semibold text-[#171615]">36</td>
                <td className="py-3 px-3">40</td>
                <td className="py-3 px-3">8 / 4</td>
                <td className="py-3 px-3">84 – 87 cm</td>
                <td className="py-3 px-3">64 – 67 cm</td>
                <td className="py-3 px-3">90 – 93 cm</td>
              </tr>
              <tr className="hover:bg-black/[0.02]">
                <td className="py-3 px-3 font-semibold text-[#171615]">38</td>
                <td className="py-3 px-3">42</td>
                <td className="py-3 px-3">10 / 6</td>
                <td className="py-3 px-3">88 – 91 cm</td>
                <td className="py-3 px-3">68 – 71 cm</td>
                <td className="py-3 px-3">94 – 97 cm</td>
              </tr>
              <tr className="hover:bg-black/[0.02]">
                <td className="py-3 px-3 font-semibold text-[#171615]">40</td>
                <td className="py-3 px-3">44</td>
                <td className="py-3 px-3">12 / 8</td>
                <td className="py-3 px-3">92 – 95 cm</td>
                <td className="py-3 px-3">72 – 75 cm</td>
                <td className="py-3 px-3">98 – 101 cm</td>
              </tr>
              <tr className="hover:bg-black/[0.02]">
                <td className="py-3 px-3 font-semibold text-[#171615]">42</td>
                <td className="py-3 px-3">46</td>
                <td className="py-3 px-3">14 / 10</td>
                <td className="py-3 px-3">96 – 100 cm</td>
                <td className="py-3 px-3">76 – 80 cm</td>
                <td className="py-3 px-3">102 – 106 cm</td>
              </tr>
              <tr className="hover:bg-black/[0.02]">
                <td className="py-3 px-3 font-semibold text-[#171615]">44</td>
                <td className="py-3 px-3">48</td>
                <td className="py-3 px-3">16 / 12</td>
                <td className="py-3 px-3">101 – 106 cm</td>
                <td className="py-3 px-3">81 – 86 cm</td>
                <td className="py-3 px-3">107 – 112 cm</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-[#F3EFEA] p-4 text-xs text-[#5C564E] leading-relaxed border-l-2 border-[#C5A880]">
          <span className="font-semibold text-[#171615] block mb-1">Service de Retouches Offert</span>
          Toute pièce commandée en ligne peut faire l’objet d’un ajustement personnalisé sans frais dans l’un de nos salons de Paris, Monaco ou Genève sur simple présentation de votre reçu.
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs tracking-wider uppercase font-medium bg-[#171615] text-[#FAF8F5] hover:bg-[#33312E] transition-colors"
          >
            Compris
          </button>
        </div>
      </div>
    </div>
  );
};
