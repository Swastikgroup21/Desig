import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { COMPANY_ADDRESS, COMPANY_PHONE, COMPANY_EMAIL } from '../data';
import { FormEvent, useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState<'' | 'success' | 'error'>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      setStatus('error');
      return;
    }
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-royal tracking-widest uppercase mb-2">Get In Touch</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-navy mb-4">Contact Swastik Group</h3>
          <p className="text-slate-600 text-lg">Visit our office or drop a message to consult our property experts.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
          
          {/* Contact Information & Map */}
          <div className="p-8 lg:p-12 bg-navy text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-royal/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            
            <h4 className="text-2xl font-bold font-serif mb-8 relative z-10">Contact Information</h4>
            
            <div className="space-y-8 relative z-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center shrink-0 text-gold">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Phone Number</p>
                  <a href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`} className="text-xl font-medium hover:text-gold transition-colors">{COMPANY_PHONE}</a>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center shrink-0 text-gold">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Email Address</p>
                  <a href={`mailto:${COMPANY_EMAIL}`} className="text-lg font-medium hover:text-gold transition-colors">{COMPANY_EMAIL}</a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center shrink-0 text-gold">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Office Address</p>
                  <p className="text-lg font-medium leading-relaxed">{COMPANY_ADDRESS}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center shrink-0 text-gold">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Working Hours</p>
                  <p className="text-lg font-medium">Mon - Sat: 10:00 AM - 7:00 PM</p>
                  <p className="text-slate-400 text-sm">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-10 rounded-xl overflow-hidden h-48 relative border border-white/10 group cursor-pointer z-10">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Map View" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-navy/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 flex items-center gap-2">
                  <MapPin className="text-gold" size={18} />
                  <span className="font-medium text-sm">View on Google Maps</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 lg:p-12">
            <h4 className="text-2xl font-bold font-serif text-navy mb-2">Send us a message</h4>
            <p className="text-slate-500 mb-8">Fill out the form below and our property expert will contact you shortly.</p>
            
            {status === 'success' ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h5 className="text-lg font-bold mb-2">Message Sent Successfully!</h5>
                <p>Thank you for contacting Swastik Group. We will get back to you soon.</p>
                <button onClick={() => setStatus('')} className="mt-4 text-emerald-600 font-medium hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-200">
                    Please fill in all required fields.
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-royal transition-all" placeholder="John Doe" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                    <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-royal transition-all" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-royal transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                  <textarea rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-royal transition-all resize-none" placeholder="I'm looking for a premium property in Indiranagar..."></textarea>
                </div>
                
                <button type="submit" className="w-full bg-royal hover:bg-navy text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg shadow-royal/30">
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
