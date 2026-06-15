import { Search, MapPin, Home, DollarSign } from 'lucide-react';

export default function PropertySearch({ onSearch }: { onSearch?: () => void }) {
  return (
    <section className="relative -mt-24 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-dark rounded-2xl p-6 md:p-8 shadow-2xl">
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Looking For</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Home size={18} />
              </div>
              <select className="w-full bg-navy/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-royal transition-all">
                <option value="buy">Buy Property</option>
                <option value="rent">Rent Property</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Property Type</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Home size={18} />
              </div>
              <select className="w-full bg-navy/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-royal transition-all">
                <option value="">Any Type</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="house">Independent House</option>
                <option value="commercial">Commercial Space</option>
                <option value="plot">Plot / Land</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Location</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <MapPin size={18} />
              </div>
              <select className="w-full bg-navy/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-royal transition-all">
                <option value="">Any Location</option>
                <option value="ayodhya_road">Ayodhya Road</option>
                <option value="indiranagar">Indiranagar</option>
                <option value="faizabad_road">Faizabad Road</option>
                <option value="city_college">City College Area</option>
                <option value="lachbar_bazar">Lachbar Bazar</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Budget</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <DollarSign size={18} />
              </div>
              <select className="w-full bg-navy/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-royal transition-all">
                <option value="">Any Budget</option>
                <option value="0-50">Under 50 Lacs</option>
                <option value="50-100">50 Lacs - 1 Cr</option>
                <option value="100-200">1 Cr - 2 Cr</option>
                <option value="200+">Above 2 Cr</option>
              </select>
            </div>
          </div>

          <button 
            type="button" 
            onClick={onSearch}
            className="w-full bg-gold hover:bg-yellow-500 text-navy font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-gold/20 mt-4 md:mt-0"
          >
            <Search size={20} />
            Search
          </button>
          
        </form>
      </div>
    </section>
  );
}
