import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                alt="Swastik Group Office" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-navy/10"></div>
            </div>
            
            {/* Overlay Experience Card */}
            <div className="absolute -bottom-8 -right-8 glass-dark p-6 md:p-8 rounded-2xl shadow-2xl max-w-[280px] hidden md:block">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold text-gold">15+</span>
                <span className="text-white text-sm font-medium leading-tight">Years of<br/>Excellence in<br/>Real Estate</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-sm font-bold text-royal tracking-widest uppercase mb-2">About The Company</h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy mb-6 leading-tight">
              Swastik Group
              <span className="block text-xl md:text-2xl font-sans text-slate-500 font-normal mt-2">Your Trusted Property Partner in Lucknow</span>
            </h3>
            
            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              Based in Lucknow, Swastik Group represents the pinnacle of luxury real estate and commercial property solutions. We directly manage our portfolio, ensuring no middlemen, absolute transparency, and a client-first approach setting new benchmarks in the industry.
            </p>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Our commitment goes beyond simply selling properties; we build lifetime relationships. With prime locations like Ayodhya Road, Indiranagar, and Faizabad Road under our expertise, we ensure your investment grows securely.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                'Direct Company Dealings',
                'Zero Hidden Charges',
                'Verified Prime Locations',
                'End-to-End Legal Assistance',
                'Premium Architecture',
                'Client Satisfaction Guaranteed'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald shrink-0" size={20} />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <button className="px-8 py-4 bg-navy text-white rounded-lg font-medium shadow-xl hover:bg-royal hover:shadow-royal/40 transition-all">
              Learn More About Us
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
