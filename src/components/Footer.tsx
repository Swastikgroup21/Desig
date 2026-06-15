import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone, ArrowUp } from 'lucide-react';
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE } from '../data';

export default function Footer({ onNavigate }: { onNavigate?: (route: string) => void }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy pt-20 pb-10 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div>
            <div className="flex flex-col mb-6">
              <span className="font-serif font-bold text-3xl text-white tracking-tight">
                Swastik<span className="text-gold">Group</span>
              </span>
              <span className="text-xs tracking-wider uppercase font-medium text-slate-400 mt-1">
                Property Partner
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Premium real estate company offering luxury residential and commercial properties across prime locations in Lucknow. Your trust, our commitment.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-royal hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-royal hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-royal hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-royal hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><button onClick={() => { onNavigate?.('home'); scrollToTop(); }} className="text-slate-400 hover:text-gold transition-colors block">Home</button></li>
              <li><button onClick={() => { onNavigate?.('properties'); scrollToTop(); }} className="text-slate-400 hover:text-gold transition-colors block">All Properties</button></li>
              <li><button onClick={() => { onNavigate?.('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="text-slate-400 hover:text-gold transition-colors block">About Us</button></li>
              <li><button onClick={() => { onNavigate?.('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="text-slate-400 hover:text-gold transition-colors block">Contact Us</button></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-4">
              {['Property Buying', 'Property Selling', 'Property Renting', 'Commercial Spaces', 'Investment Advisory', 'Legal Assistance'].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-slate-400 hover:text-gold transition-colors block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex gap-3 text-slate-400">
                <MapPin className="shrink-0 text-gold" size={20} />
                <span className="leading-relaxed">{COMPANY_ADDRESS}</span>
              </li>
              <li className="flex gap-3 text-slate-400">
                <Phone className="shrink-0 text-gold" size={20} />
                <a href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`} className="hover:text-gold transition-colors">{COMPANY_PHONE}</a>
              </li>
              <li className="flex gap-3 text-slate-400">
                <Mail className="shrink-0 text-gold" size={20} />
                <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-gold transition-colors">{COMPANY_EMAIL}</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p 
            onDoubleClick={() => { onNavigate?.('admin'); scrollToTop(); }}
            className="text-slate-500 text-sm text-center md:text-left cursor-default select-none"
          >
            &copy; {new Date().getFullYear()} Swastik Group. All rights reserved. Let's find your dream property.
          </p>
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-slate-400 hover:bg-gold hover:text-navy transition-colors shrink-0"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
