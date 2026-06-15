import { motion } from 'motion/react';
import { TrendingUp, Map, Briefcase, Lock } from 'lucide-react';

const benefits = [
  {
    icon: <TrendingUp size={32} />,
    title: 'High ROI',
    description: 'Properties situated in high-growth corridors ensuring exceptional return on investment.'
  },
  {
    icon: <Map size={32} />,
    title: 'Prime Locations',
    description: 'Exclusive access to premium neighborhoods with superior connectivity.'
  },
  {
    icon: <Briefcase size={32} />,
    title: 'Growing Market',
    description: 'Capitalize on Lucknow\'s rapidly expanding commercial and residential sectors.'
  },
  {
    icon: <Lock size={32} />,
    title: 'Secure Investment',
    description: '100% verified properties guaranteeing safe and legal transactions.'
  }
];

export default function InvestmentBenefits() {
  return (
    <section className="py-24 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2">
            <h2 className="text-sm font-bold text-gold tracking-widest uppercase mb-2">Why Invest Now?</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold mb-6">Property Investment Benefits in Lucknow</h3>
            <p className="text-slate-300 text-lg mb-10 leading-relaxed">
              Lucknow is experiencing unprecedented infrastructure growth. Investing with Swastik Group means placing your capital in secure, high-appreciating assets located in the city's future hubs.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {benefits.map((benefit, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="text-gold shrink-0 bg-gold/10 p-3 rounded-lg h-fit">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">{benefit.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl border border-white/10">
               <img 
                src="https://images.unsplash.com/photo-1574360773950-c651f65bbccc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                alt="Investment Growth" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent flex items-end p-8">
                 <div className="glass-dark px-6 py-4 rounded-xl border border-gold/30">
                    <p className="text-gold font-bold text-2xl mb-1">+42% Growth</p>
                    <p className="text-slate-300 text-sm">Average 5-Year Appreciation on Ayodhya Road Properties</p>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
