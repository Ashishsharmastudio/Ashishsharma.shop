import { services } from '../data/services';
import SectionHeader from '../components/ui/SectionHeader';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import Button from '../components/ui/Button';
import { useRouter } from '../lib/router';

export default function Services() {
  const { navigate } = useRouter();

  return (
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Header */}
      <SectionHeader
        eyebrow="Our Services"
        title="We build digital products from strategy to launch."
        description="We consolidate your digital pipeline under one specialized team, eliminating handoff errors and accelerating your time-to-market."
      />

      {/* Services breakdown bento grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        {services.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="bg-studio-card border border-studio-border rounded-2xl p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-xs text-studio-accent font-semibold">
                  MODULE // {service.number}
                </span>
                <span className="font-display font-bold text-3xl text-studio-text-secondary/10 group-hover:text-studio-accent/25 transition-colors duration-500 select-none">
                  {service.number}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-4 group-hover:text-studio-accent transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-sm md:text-base text-studio-text-secondary leading-relaxed mb-8">
                {service.description}
              </p>

              {/* Bulleted checklist capabilities list */}
              <ul className="space-y-3.5 border-t border-studio-border/50 pt-6">
                {service.details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-studio-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-studio-accent" />
                    </div>
                    <span className="text-xs md:text-sm text-studio-text-primary/95 font-sans">
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-studio-border/30 pt-6 mt-8 flex justify-between items-center">
              <span className="font-mono text-[10px] text-studio-text-secondary">
                DELIVERY: AUTONOMOUS // ACTIVE
              </span>
              <span className="w-2 h-2 rounded-full bg-studio-accent group-hover:scale-150 transition-transform duration-300" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Engagement frameworks section */}
      <section className="bg-studio-card border border-studio-border p-8 md:p-12 rounded-2xl mb-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-studio-accent/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-3xl relative z-10">
          <span className="font-mono text-xs text-studio-accent uppercase block mb-3">// Engagement Frameworks</span>
          <h3 className="text-2xl md:text-4xl font-display font-medium text-white mb-6">
            Two simple, transparent ways to work with us.
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div>
              <h4 className="font-display font-bold text-lg text-studio-accent mb-2">01 // Fixed Project</h4>
              <p className="text-sm text-studio-text-secondary leading-relaxed">
                Best for clearly defined digital products, web designs, or automation setups. We scope the requirements together, define concrete deadlines, and deliver the system for a flat, predictable fee.
              </p>
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-studio-accent mb-2">02 // Monthly Retainer</h4>
              <p className="text-sm text-studio-text-secondary leading-relaxed">
                Best for evolving AI products, ongoing engineering support, and rapid feature iteration. Get dedicated developer hours with instant access and prioritizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services page footer cta */}
      <div className="text-center py-12 border-t border-studio-border">
        <h4 className="text-xl md:text-2xl font-display text-white mb-6">Ready to see your product come together?</h4>
        <Button
          variant="primary"
          onClick={() => navigate('/contact')}
          showArrow
          className="px-8"
        >
          Schedule an intro call
        </Button>
      </div>
    </main>
  );
}
