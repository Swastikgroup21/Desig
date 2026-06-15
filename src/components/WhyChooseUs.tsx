import { ShieldCheck, Search, Map, Award, TrendingUp, HeadphonesIcon } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: <ShieldCheck size={32} />,
    title: 'Verified Properties',
    description: 'Every property goes through strict legal and physical verification for your peace of mind.'
  },
  {
    icon: <Search size={32} />,
    title: 'Transparent Deals',
    description: 'Direct dealings managed entirely by Swastik Group. No hidden fees or middleman commissions.'
  },
  {
    icon: <Map size={32} />,
    title: 'Prime Locations',
    description: 'Handpicked properties in Lucknow’s fastest-growing and premium neighborhoods.'
  },
  {
    icon: <Award size={32} />,
    title: 'Trusted Company',
    description: 'Years of excellence and a trusted property partner for hundreds of families.'
  },
  {
    icon: <TrendingUp size={32} />,
    title: 'Investment Opportunities',
    description: 'High ROI properties carefully selected for long-term capital appreciation.'
  },
  {
    icon: <HeadphonesIcon size={32} />,
    title: 'Customer Support',
    description: 'Dedicated post-sales support team assisting you in every step from booking to registry.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      {/* Abstract Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gold blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-royal blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-gold tracking-widest uppercase mb-2">The Swastik Advantage</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Why Choose Swastik Group?</h3>
          <p className="text-slate-300 text-lg">We are not just a real estate broker, we are your property partner ensuring a seamless, transparent, and premium experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-dark p-8 rounded-2xl hover:bg-white/10 transition-colors group border border-white/5"
            >
              <div className="w-16 h-16 rounded-xl bg-royal/20 flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform group-hover:bg-gold/20 group-hover:text-gold">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
