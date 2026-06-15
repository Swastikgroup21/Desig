import { MapPin, Home, BedDouble, Bath, Phone, Heart, ArrowLeft, CheckCircle2, Send } from 'lucide-react';
import { Property, Inquiry } from '../types';
import { useAppSettings } from '../GlobalContext';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';

interface PropertyDetailsPageProps {
  property: Property | null;
  onBack: () => void;
  onContactClick: () => void;
  onSubmitInquiry: (inquiry: Inquiry) => void;
}

export default function PropertyDetailsPage({ property, onBack, onContactClick, onSubmitInquiry }: PropertyDetailsPageProps) {
  const { settings } = useAppSettings();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [formData, setFormData] = useState({ name: '', phone: '', query: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!property) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInquiry: Inquiry = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      requirement: `Inquiry for ${property.title}`,
      propertyId: property.id,
      propertyTitle: property.title,
      query: formData.query,
      status: 'New',
      date: new Date().toLocaleDateString()
    };
    onSubmitInquiry(newInquiry);
    setIsSubmitted(true);
    setFormData({ name: '', phone: '', query: '' });
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const cleanPhone = settings.companyPhone.replace(/\s+/g, '');
  
  const allImages = property.images && property.images.length > 0 
    ? property.images.filter(Boolean) 
    : [property.image].filter(Boolean);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-slate-50 min-h-screen pt-28 pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Bar with Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-navy transition-colors font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200"
          >
            <ArrowLeft size={18} /> Back to Properties
          </button>
          
          <div className="flex gap-2">
            <span className="bg-royal/10 text-royal text-xs font-bold px-4 py-2 rounded-full border border-royal/20">
              {property.status}
            </span>
            <span className="bg-navy/10 text-navy text-xs font-bold px-4 py-2 rounded-full border border-navy/20">
              {property.type}
            </span>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="mb-10">
          <div className="w-full h-[50vh] md:h-[60vh] rounded-3xl overflow-hidden relative shadow-lg">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={allImages[activeImageIndex]} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            {property.featured && (
              <div className="absolute top-6 left-6 z-10">
                <span className="bg-gold text-navy text-sm font-bold px-4 py-2 uppercase tracking-wider rounded-lg shadow-lg">
                  Featured Property
                </span>
              </div>
            )}
            <button className="absolute top-6 right-6 p-4 bg-white/90 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 z-10 transition-colors shadow-lg shadow-black/10">
              <Heart size={24} />
            </button>
          </div>
          
          {allImages.length > 1 && (
            <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-24 h-24 rounded-xl overflow-hidden relative shadow-sm shrink-0 border-2 transition-all ${activeImageIndex === idx ? 'border-royal scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column - Details */}
          <div className="w-full lg:w-2/3">
            
            {/* Header Info */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold font-serif text-navy mb-4 leading-tight">{property.title}</h1>
                  <div className="flex items-center text-slate-500 text-lg">
                    <MapPin size={20} className="mr-2 text-royal shrink-0" />
                    {property.location}
                  </div>
                </div>
                <div className="text-left md:text-right shrink-0">
                  <p className="text-slate-400 text-sm uppercase tracking-widest font-medium mb-1">{property.status === 'For Rent' ? 'Monthly Rent' : 'Asking Price'}</p>
                  <div className="text-4xl md:text-5xl font-bold text-royal">{property.price}</div>
                </div>
              </div>

              {/* Overview Grid */}
              <div className="border-t border-slate-100 pt-8 mt-4">
                <h3 className="text-xl font-bold text-navy font-serif mb-6">Property Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100/50">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                      <Home size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-slate-500 block">Area</span>
                      <span className="text-base font-bold text-navy">{property.area}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100/50">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                      <BedDouble size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-slate-500 block">Bedrooms</span>
                      <span className="text-base font-bold text-navy">{property.bedrooms || '-'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100/50">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                      <Bath size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-slate-500 block">Bathrooms</span>
                      <span className="text-base font-bold text-navy">{property.bathrooms || '-'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100/50">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                      <Home size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-slate-500 block">Type</span>
                      <span className="text-base font-bold text-navy">{property.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8">
              <h3 className="text-2xl font-bold text-navy mb-6 font-serif">Description</h3>
              <div className="prose prose-lg text-slate-600 leading-relaxed max-w-none">
                <p>
                  This stunning {property.type.toLowerCase()} located in the prime area of {property.location} offers a perfect blend of luxury and comfort. Featuring modern architecture, premium fittings, and excellent connectivity. Designed to provide a luxurious lifestyle with ample natural light and ventilation.
                </p>
                <p className="mt-4">
                  Whether you are looking for an exceptional living space or a lucrative investment opportunity, this property stands as a testament to Swastik Group's commitment to quality and excellence. Contact us today to schedule an exclusive site visit and experience this remarkable property firsthand.
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-2xl font-bold text-navy mb-6 font-serif">Key Amenities & Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {['24/7 Premium Security', '100% Power Backup', 'Designated Covered Parking', 'Premium Italian Fittings', 'Vastu Compliant Design', 'Prime Connectivity', 'Landscaped Surroundings', 'Smart Home Features'].map((amenity, i) => (
                   <div key={i} className="flex items-center gap-3">
                     <div className="bg-emerald/10 text-emerald p-1.5 rounded-full shrink-0">
                        <CheckCircle2 size={18} />
                     </div>
                     <span className="text-slate-700 font-medium">{amenity}</span>
                   </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Sticky Contact Card */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-28 bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-navy text-white rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-slate-50 shadow-inner">
                   <Phone size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">Interested in this property?</h3>
                <p className="text-slate-500 text-sm">Our property experts are ready to assist you with all the details and arrange a site visit.</p>
              </div>
              
              <div className="space-y-4">
                <a 
                  href={`tel:${cleanPhone}`} 
                  className="flex items-center justify-center gap-3 w-full py-4 bg-royal hover:bg-navy text-white rounded-xl font-bold transition-all shadow-md shadow-royal/20 hover:shadow-navy/20"
                >
                  <Phone size={20} />
                  Call {settings.companyPhone}
                </a>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-500">Or we can call you</span>
                  </div>
                </div>
                
                {isSubmitted ? (
                  <div className="bg-emerald/10 border border-emerald/20 text-emerald rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-emerald text-white rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 size={24} />
                    </div>
                    <h4 className="font-bold mb-1">Request Sent!</h4>
                    <p className="text-sm">Our team will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal transition-all"
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal transition-all"
                    />
                    <textarea 
                      placeholder="I am interested in this property..." 
                      rows={2}
                      value={formData.query}
                      onChange={(e) => setFormData({...formData, query: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal transition-all resize-none"
                    ></textarea>
                    <button 
                      type="submit"
                      className="flex items-center justify-center gap-2 w-full py-4 border-2 border-royal bg-royal/5 hover:bg-royal text-royal hover:text-white rounded-xl font-bold transition-all"
                    >
                      <Send size={18} />
                      Send Inquiry
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <p className="text-slate-400 text-sm mb-2">Listed & Managed by</p>
                <div className="font-serif font-bold text-xl text-navy">Swastik<span className="text-gold">Group</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
