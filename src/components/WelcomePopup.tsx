import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { useAppSettings } from '../GlobalContext';
import { Inquiry } from '../types';

interface WelcomePopupProps {
  onContactClick: () => void;
}

export default function WelcomePopup({ onContactClick }: WelcomePopupProps) {
  const { settings } = useAppSettings();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if we already showed it in this session to not annoy the user too much
    const hasSeenPopup = sessionStorage.getItem('swastik_seen_popup');
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000); // 3 seconds after page load
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('swastik_seen_popup', 'true');
  };

  const handleInquire = () => {
    handleClose();
    onContactClick();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden flex flex-col md:flex-row"
          >
            <div className="bg-navy w-full md:w-2/5 relative min-h-[160px] md:min-h-full hidden md:block">
              <img 
                src={settings.heroImage} 
                alt="Welcome to Swastik Properties" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-bold text-white mb-2 font-serif">Find Your Dream Home</h3>
              </div>
            </div>

            <div className="p-8 w-full md:w-3/5 relative">
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-navy transition-colors bg-slate-100 rounded-full p-1"
              >
                <X size={20} />
              </button>
              
              <div className="mb-6 mt-2">
                <div className="inline-block bg-gold/20 text-navy font-bold text-xs px-3 py-1 rounded-full mb-4">
                  Welcome to Swastik Group
                </div>
                <h3 className="text-2xl font-bold font-serif text-navy mb-3">Looking for a property?</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Get exclusive access to premium real estate listings and expert consultation. Let us help you find the perfect match.
                </p>
                
                <div className="space-y-4">
                  <button 
                    onClick={handleInquire}
                    className="w-full flex items-center justify-center gap-2 bg-royal hover:bg-navy text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md"
                  >
                    Submit an Inquiry <ArrowRight size={18} />
                  </button>
                  <a 
                    href={`tel:${settings.companyPhone.replace(/\s+/g, '')}`}
                    className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-lg transition-colors border border-slate-200"
                  >
                    Call Us Now
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
