import { Home, Key, Building2, Store, LineChart } from 'lucide-react';
import { motion } from 'motion/react';

const services = [
  {
    icon: <Home size={40} />,
    title: 'Property Buying',
    description: 'We help you find the perfect luxury home that matches your lifestyle and aspirations in prime locations.'
  },
  {
    icon: <Key size={40} />,
    title: 'Property Selling',
    description: 'List your property with us and leverage our premium network to find the right buyer at the best price.'
  },
  {
    icon: <Building2 size={40} />,
    title: 'Property Renting',
    description: 'Premium rental services for both landlords and tenants, ensuring smooth documentation and secure deals.'
  },
  {
    icon: <Store size={40} />,
    title: 'Commercial Properties',
    description: 'Grade A office spaces, retail shops, and commercial land investments for business growth.'
  },
  {
    icon: <LineChart size={40} />,
    title: 'Investment Consultation',
    description: 'Expert advisory on market trends, high ROI investments, and strategic real estate portfolio building.'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-royal tracking-widest uppercase mb-2">What We Do</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-navy mb-4">Our Premium Services</h3>
          <p className="text-slate-600 text-lg">Comprehensive real estate solutions directly from Swastik Group, ensuring zero hassle and absolute reliability.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-slate-100 hover:border-royal/30 group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)]"
            >
              <div className="text-royal mb-6 group-hover:scale-110 group-hover:text-gold transition-all duration-300 origin-left">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-navy mb-3">{service.title}</h4>
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
