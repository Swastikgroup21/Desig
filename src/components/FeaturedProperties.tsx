import { motion } from 'motion/react';
import { MapPin, Home, BedDouble, Bath, Heart, Eye } from 'lucide-react';
import { Property } from '../types';

export default function FeaturedProperties({ properties, onViewProperty }: { properties: Property[], onViewProperty: (property: Property) => void }) {
  return (
    <section id="properties" className="py-24 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-royal tracking-widest uppercase mb-2">Exclusive Offerings</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-navy mb-4">Featured Properties</h3>
          <p className="text-slate-600 text-lg">Handpicked properties by Swastik Group tailored for your luxury lifestyle and investment needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map((property, idx) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group relative flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-royal text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {property.status}
                  </span>
                  <span className="bg-navy/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {property.type}
                  </span>
                </div>
                <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-600 hover:text-red-500 hover:bg-white transition-colors cursor-pointer">
                  <Heart size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-2xl font-bold text-navy mb-2">{property.price}</div>
                <h4 className="text-lg font-bold text-slate-800 mb-2 truncate">{property.title}</h4>
                <div className="flex items-center text-slate-500 text-sm mb-4">
                  <MapPin size={16} className="mr-1 text-royal" />
                  <span className="truncate">{property.location}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 py-4 border-t border-slate-100 flex-1">
                  <div className="flex flex-col items-center justify-center bg-slate-50 rounded-lg p-2">
                    <Home size={18} className="text-slate-400 mb-1" />
                    <span className="text-xs font-medium text-slate-600">{property.area}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-slate-50 rounded-lg p-2">
                    <BedDouble size={18} className="text-slate-400 mb-1" />
                    <span className="text-xs font-medium text-slate-600">{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-slate-50 rounded-lg p-2">
                    <Bath size={18} className="text-slate-400 mb-1" />
                    <span className="text-xs font-medium text-slate-600">{property.bathrooms} Baths</span>
                  </div>
                </div>
                
                <button
                  onClick={() => onViewProperty(property)}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-lg text-navy font-medium hover:bg-navy hover:text-white transition-colors group-hover:border-navy"
                >
                  <Eye size={18} />
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
