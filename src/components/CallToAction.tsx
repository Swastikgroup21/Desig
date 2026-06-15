import { Phone, ArrowRight } from 'lucide-react';
import { COMPANY_PHONE } from '../data';

export default function CallToAction({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section className="py-20 relative overflow-hidden bg-emerald">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
          Ready to Find Your Dream Property?
        </h2>
        <p className="text-emerald-50 text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto">
          Contact our property experts today and step into your new premium lifestyle in Lucknow's finest locations.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white text-navy rounded-lg font-bold shadow-xl hover:bg-slate-100 transition-all text-base sm:text-lg">
            <Phone size={20} />
            Call {COMPANY_PHONE}
          </a>
          <button onClick={onContactClick} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-navy text-white rounded-lg font-bold shadow-xl hover:bg-slate-800 transition-all text-base sm:text-lg border border-navy">
            Book Free Consultation <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
