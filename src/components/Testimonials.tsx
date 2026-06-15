import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 -mr-32 -mt-32 text-slate-200 opacity-50 z-0">
         <Quote size={400} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-royal tracking-widest uppercase mb-2">Client Success Stories</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-navy mb-4">What Our Clients Say</h3>
          <p className="text-slate-600 text-lg">Trust built over years. Read about the seamless experiences of our valued clients.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-xl relative border border-slate-100"
            >
              <Quote className="absolute top-6 right-6 text-gold/20" size={48} />
              
              <div className="flex gap-1 text-gold mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-slate-600 italic mb-8 leading-relaxed relative z-10 text-lg">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-navy">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
