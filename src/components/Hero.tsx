import { motion } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';
import { useAppSettings } from '../GlobalContext';

export default function Hero({ 
  onContactClick,
  onNavigate
}: { 
  onContactClick: () => void;
  onNavigate: (route: string) => void;
}) {
  const { settings } = useAppSettings();

  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center pt-32 pb-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={settings.heroImage}
          alt="Luxury Real Estate"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-gold/20 border border-gold/50 text-gold text-sm font-semibold tracking-wider mb-6">
              YOUR TRUSTED PROPERTY PARTNER IN LUCKNOW
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6"
          >
            Find Your Dream <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">
              Property in Lucknow
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed"
          >
            Premium Residential & Commercial Properties at Prime Locations. Experience luxury, transparency, and trust with Swastik Group.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={() => onNavigate('properties')} 
              className="flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-royal text-white rounded-lg font-medium shadow-lg shadow-royal/40 hover:bg-white hover:text-royal transition-all group"
            >
              View Properties
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={onContactClick} className="flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 glass text-white rounded-lg font-medium hover:bg-white/20 transition-all">
              Contact Us
            </button>
            <a href={`tel:${settings.companyPhone.replace(/\s+/g, '')}`} className="flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-emerald text-white rounded-lg font-medium shadow-lg shadow-emerald/40 hover:bg-emerald-600 transition-all sm:hidden">
              <Phone size={20} />
              Call Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
