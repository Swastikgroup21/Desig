import { Phone, MessageCircle } from 'lucide-react';
import { COMPANY_PHONE } from '../data';

export default function FloatingActions() {
  const cleanPhone = COMPANY_PHONE.replace(/\s+/g, '');
  const wappNumber = cleanPhone.replace('+', '');

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Call Button */}
      <a 
        href={`tel:${cleanPhone}`}
        className="w-14 h-14 bg-royal text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group relative"
        aria-label="Call Now"
      >
        <Phone size={24} className="group-hover:animate-ping absolute opacity-0 group-hover:opacity-30" />
        <Phone size={24} className="relative z-10" fill="currentColor" />
        <span className="absolute right-full mr-4 bg-navy text-white text-sm font-medium px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          Call {COMPANY_PHONE}
        </span>
      </a>

      {/* WhatsApp Button */}
      <a 
        href={`https://wa.me/${wappNumber}?text=Hi%20Swastik%20Group,%20I'm%20looking%20for%20a%20property.`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group relative"
        aria-label="WhatsApp"
      >
         <MessageCircle size={28} className="relative z-10" fill="currentColor" strokeWidth={1} />
         <span className="absolute right-full mr-4 bg-navy text-white text-sm font-medium px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
