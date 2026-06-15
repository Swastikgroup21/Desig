import { motion, useAnimation, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { label: 'Properties Sold', value: 1250, suffix: '+' },
  { label: 'Happy Clients', value: 980, suffix: '+' },
  { label: 'Locations Covered', value: 15, suffix: '' },
  { label: 'Years Experience', value: 15, suffix: '+' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const startTime = performance.now();

      const updateCounter = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Ease out quad
        const easeOut = progress * (2 - progress);
        
        setCount(Math.floor(easeOut * end));

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(updateCounter);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold font-serif">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-20 bg-royal text-white relative">
      {/* Decorative dots background */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 shadow-xl"
            >
              <div className="text-gold mb-2 drop-shadow-md">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-slate-200 font-medium tracking-wide uppercase text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
