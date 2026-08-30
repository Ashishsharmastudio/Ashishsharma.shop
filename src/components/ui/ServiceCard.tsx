import { Service } from '../../types';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ServiceCardProps {
  service: Service;
  id?: string;
  key?: string;
}

export default function ServiceCard({ service, id }: ServiceCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-studio-card border border-studio-border rounded-2xl p-6 md:p-8 hover:border-white/20 hover:bg-white/[0.01] transition-all duration-500 flex flex-col justify-between aspect-square md:aspect-auto md:min-h-[320px] overflow-hidden"
    >
      {/* Decorative hover accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-studio-accent to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div>
        <div className="flex justify-between items-center mb-6">
          <span className="font-mono text-xs text-studio-text-secondary">
            CODE // STK-[{service.number}]
          </span>
          <span className="font-display font-bold text-4xl text-studio-text-secondary/15 group-hover:text-studio-accent/20 transition-colors duration-500 select-none">
            {service.number}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-display font-medium text-studio-text-primary mb-3 group-hover:text-studio-accent transition-colors duration-300">
          {service.title}
        </h3>

        <p className="text-sm text-studio-text-secondary leading-relaxed mb-6 group-hover:text-studio-text-primary/90 transition-colors duration-300">
          {service.description}
        </p>
      </div>

      <div>
        {/* Diagnostic item list revealed on desktop hover */}
        <div className="hidden lg:block h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mb-6 transition-all duration-500 overflow-hidden">
          <ul className="space-y-1.5 border-t border-studio-border/50 pt-4">
            {service.details.map((detail, idx) => (
              <li key={idx} className="text-[11px] font-mono text-studio-text-secondary flex items-center gap-2">
                <span className="w-1 h-1 bg-studio-accent rounded-full" />
                {detail}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-studio-border/40">
          <span className="text-[10px] font-mono uppercase tracking-wider text-studio-text-secondary group-hover:text-studio-accent transition-colors duration-300">
            Learn capabilities
          </span>
          <div className="w-8 h-8 rounded-full bg-white/5 border border-studio-border flex items-center justify-center group-hover:bg-studio-accent group-hover:text-white group-hover:border-transparent transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
