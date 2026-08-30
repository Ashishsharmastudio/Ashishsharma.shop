import { motion } from 'motion/react';

export default function Stats() {
  const statsList = [
    { value: '15+', label: 'Years of Experience' },
    { value: '40+', label: 'Projects Delivered' },
    { value: '20+', label: 'Happy Clients' },
    { value: '100', label: 'Performance Focused' },
  ];

  return (
    <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-studio-border/50">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
        {statsList.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col border-l border-studio-border pl-6 relative group"
          >
            {/* Hover visual accent indicator line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-studio-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
            
            <span className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-white group-hover:text-studio-accent transition-colors duration-300 tracking-tight leading-none mb-3 select-none">
              {stat.value}
            </span>
            <span className="font-sans text-xs uppercase tracking-widest text-studio-text-secondary">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
