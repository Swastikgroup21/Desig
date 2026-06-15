import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_PHONE } from '../data';

export default function Navbar({ 
  onContactClick,
  currentRoute,
  onNavigate
}: { 
  onContactClick: () => void;
  currentRoute: string;
  onNavigate: (route: string) => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'All Properties', href: '#properties-page' },
    { name: 'Locations', href: '#locations' },
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === '#properties-page') {
      onNavigate('properties');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetId === '#home') {
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetId === '#admin') {
      onNavigate('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentRoute !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const elem = document.querySelector(targetId);
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const elem = document.querySelector(targetId);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => {
            onNavigate('home');
            window.scrollTo({top: 0, behavior: 'smooth'});
          }}>
            <div className="flex flex-col">
              <span className={`font-serif font-bold text-2xl md:text-3xl tracking-tight transition-colors ${isScrolled ? 'text-navy' : 'text-white drop-shadow-md'}`}>
                Swastik<span className="text-royal">Group</span>
              </span>
              <span className={`text-[10px] md:text-xs tracking-wider uppercase font-medium mt-0.5 transition-colors ${isScrolled ? 'text-slate-500' : 'text-slate-200 drop-shadow-sm'}`}>
                Property Partner
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors hover:text-gold ${isScrolled ? 'text-slate-700' : 'text-white drop-shadow-sm'}`}
              >
                {link.name}
              </a>
            ))}
            
            <a href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`} className="flex items-center gap-2 px-6 py-2.5 bg-royal text-white rounded-full font-medium shadow-lg shadow-royal/30 hover:bg-navy transition-all hover:scale-105 active:scale-95">
              <Phone size={16} />
              <span>Call Now</span>
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md ${isScrolled ? 'text-navy' : 'text-white'}`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass absolute top-full left-0 right-0 border-t border-white/20 shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block px-3 py-3 text-base font-medium text-navy border-b border-slate-200/50 hover:bg-slate-50/50 hover:text-royal"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`} className="flex justify-center items-center gap-2 w-full px-4 py-3 bg-navy text-white rounded-lg font-medium shadow-md">
                  <Phone size={18} />
                  <span>Call {COMPANY_PHONE}</span>
                </a>
                <button onClick={() => { setMobileMenuOpen(false); onContactClick(); }} className="flex justify-center items-center w-full px-4 py-3 bg-gold text-navy rounded-lg font-medium shadow-md">
                  Submit Inquiry
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
