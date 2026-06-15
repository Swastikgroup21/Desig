import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useAppSettings } from '../GlobalContext';

export default function Locations() {
  const { settings } = useAppSettings();
  
  return (
    <section id="locations" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-royal tracking-widest uppercase mb-2">Prime Service Areas</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-navy mb-4">Explore Premium Locations</h3>
            <p className="text-slate-600 text-lg">Discover the most sought-after neighborhoods in Lucknow with excellent connectivity and lifestyle amenities.</p>
          </div>
          <button className="flex items-center gap-2 text-royal font-medium hover:text-navy transition-colors shrink-0">
            View All Map <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {settings.locations.map((location, idx) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer"
            >
              <img 
                src={location.image} 
                alt={location.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent flex flex-col justify-end p-6">
                <h4 className="text-xl font-bold text-white mb-1 group-hover:text-gold transition-colors">{location.name}</h4>
                <p className="text-slate-300 text-sm mb-3">{location.propertyCount} Properties</p>
                <div className="text-white/80 text-xs font-medium tracking-wide bg-white/20 backdrop-blur-sm inline-block px-3 py-1 rounded-full self-start">
                  Avg. {location.averagePrice}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
