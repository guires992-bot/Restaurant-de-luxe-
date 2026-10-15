import React from 'react';
import { Quote } from 'lucide-react';
import { CRITICAL_REVIEWS } from '../data/restaurantData';

export const TestimonialsReviews: React.FC = () => {
  return (
    <section className="py-20 bg-[#0D0B0A] border-b border-[#2C241D]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
            Reconnaissance &amp; Presse Internationale
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#F7F3EE] mt-2">
            Ce que la Critique dit de MORRA
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CRITICAL_REVIEWS.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#14110E] border border-[#2B221A] p-8 flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all shadow-xl"
            >
              <div>
                <Quote className="w-6 h-6 text-[#D4AF37] opacity-60 mb-4" />
                <p className="text-sm text-[#DDD4CA] font-serif italic leading-relaxed">
                  « {item.quote} »
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#221C16]">
                <div className="font-semibold text-sm text-[#F7F3EE]">{item.publication}</div>
                <div className="text-xs text-[#D4AF37] mt-0.5">{item.author} &middot; {item.badge}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
