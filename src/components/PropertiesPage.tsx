import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Home, BedDouble, Bath, Heart, Eye, Filter } from 'lucide-react';
import { Property } from '../types';

export default function PropertiesPage({ properties, onViewProperty }: { properties: Property[], onViewProperty: (property: Property) => void }) {
  const [filterType, setFilterType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredProperties = properties.filter(p => {
    if (filterType && p.type.toLowerCase() !== filterType.toLowerCase()) return false;
    if (filterLocation && !p.location.toLowerCase().includes(filterLocation.toLowerCase().replace('_', ' '))) return false;
    if (filterStatus && p.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="pt-32 pb-24 bg-light-gray min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-4">All Properties</h1>
          <p className="text-slate-600 text-lg">Browse our complete collection of premium properties in Lucknow.</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-12 flex flex-col md:flex-row gap-4 items-center justify-between border border-slate-100">
           <div className="flex items-center gap-2 text-slate-500 font-medium shrink-0">
             <Filter size={20} className="text-royal" /> Filters
           </div>
           <div className="flex flex-col md:flex-row gap-4 w-full justify-end">
             <select 
               className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-royal w-full md:w-32 appearance-none"
               value={filterStatus}
               onChange={(e) => setFilterStatus(e.target.value)}
             >
               <option value="">All Status</option>
               <option value="For Sale">For Sale</option>
               <option value="For Rent">For Rent</option>
             </select>
             <select 
               className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-royal w-full md:w-48 appearance-none"
               value={filterType}
               onChange={(e) => setFilterType(e.target.value)}
             >
               <option value="">All Types</option>
               <option value="Apartment">Apartment</option>
               <option value="Villa">Villa</option>
               <option value="House">Independent House</option>
               <option value="Commercial">Commercial</option>
             </select>
             <select 
               className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-royal w-full md:w-48 appearance-none"
               value={filterLocation}
               onChange={(e) => setFilterLocation(e.target.value)}
             >
               <option value="">All Locations</option>
               <option value="Indiranagar">Indiranagar</option>
               <option value="Faizabad">Faizabad Road</option>
               <option value="Ayodhya">Ayodhya Road</option>
             </select>
           </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProperties.map((property, idx) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group relative flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-60 overflow-hidden shrink-0">
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
                  <MapPin size={16} className="mr-1 text-royal shrink-0" />
                  <span className="truncate">{property.location}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 py-4 border-t border-slate-100 flex-1 content-start">
                  <div className="flex flex-col items-center justify-center bg-slate-50 rounded-lg p-2 h-full">
                    <Home size={18} className="text-slate-400 mb-1" />
                    <span className="text-xs font-medium text-slate-600 text-center">{property.area}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-slate-50 rounded-lg p-2 h-full">
                    <BedDouble size={18} className="text-slate-400 mb-1" />
                    <span className="text-xs font-medium text-slate-600 text-center">{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-slate-50 rounded-lg p-2 h-full">
                    <Bath size={18} className="text-slate-400 mb-1" />
                    <span className="text-xs font-medium text-slate-600 text-center">{property.bathrooms} Baths</span>
                  </div>
                </div>
                
                <button
                  onClick={() => onViewProperty(property)}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-lg text-navy font-medium hover:bg-navy hover:text-white transition-colors group-hover:border-navy mt-auto"
                >
                  <Eye size={18} />
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredProperties.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No properties found matching your filters.</p>
            <button 
              onClick={() => { setFilterType(''); setFilterLocation(''); setFilterStatus(''); }}
              className="mt-4 text-royal font-medium hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
