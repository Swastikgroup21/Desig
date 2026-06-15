import { X, Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FormEvent, useState } from 'react';
import { useAppSettings } from '../GlobalContext';
import { Inquiry } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitInquiry: (inquiry: Inquiry) => void;
}

export default function ContactModal({ isOpen, onClose, onSubmitInquiry }: ContactModalProps) {
  const { settings } = useAppSettings();
  const [formData, setFormData] = useState({ name: '', phone: '', requirement: 'Buy a Property' });
  const [status, setStatus] = useState<'' | 'success' | 'error'>('');
  
  const cleanPhone = settings.companyPhone.replace(/\s+/g, '');
  const wappNumber = cleanPhone.replace('+', '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setStatus('error');
      return;
    }
    
    // Simulate API call and save inquiry
    onSubmitInquiry({
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      requirement: formData.requirement,
      date: new Date().toISOString()
    });
    
    setStatus('success');
    setFormData({ name: '', phone: '', requirement: 'Buy a Property' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden"
          >
            <div className="bg-navy p-6 relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-bold font-serif text-white mb-2">Request Callback</h3>
              <p className="text-slate-300 text-sm">Drop your details below and our property expert will connect with you.</p>
            </div>

            <div className="p-6">
              {status === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h4 className="text-xl font-bold text-navy mb-2">Request Received</h4>
                  <p className="text-slate-600 mb-6">We will call you shortly on the provided number.</p>
                  <button onClick={onClose} className="w-full bg-slate-100 text-slate-700 font-medium py-3 rounded-lg hover:bg-slate-200 transition-colors">
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === 'error' && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-200">
                      Name and Phone number are required.
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-royal transition-all bg-slate-50" 
                      placeholder="Enter your name" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-royal transition-all bg-slate-50" 
                      placeholder="+91 98765 43210" 
                    />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Requirement</label>
                     <select 
                        value={formData.requirement}
                        onChange={(e) => setFormData({...formData, requirement: e.target.value})}
                        className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-royal transition-all bg-slate-50 appearance-none"
                     >
                        <option>Buy a Property</option>
                        <option>Rent a Property</option>
                        <option>Sell my Property</option>
                        <option>Investment Consultation</option>
                     </select>
                  </div>
                  
                  <button type="submit" className="w-full bg-royal hover:bg-navy text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md mt-2">
                    Request Callback
                  </button>
                </form>
              )}

              {status !== 'success' && (
                <>
                  <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-slate-200"></div>
                    <span className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Or contact via</span>
                    <div className="flex-1 border-t border-slate-200"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <a href={`tel:${cleanPhone}`} className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium text-sm">
                      <Phone size={16} /> Call Us
                    </a>
                    <a href={`https://wa.me/${wappNumber}?text=Hi`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 border border-[#25D366]/30 bg-[#25D366]/5 rounded-lg text-[#25D366] hover:bg-[#25D366]/10 transition-colors font-medium text-sm">
                      <MessageCircle size={16} /> WhatsApp
                    </a>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
