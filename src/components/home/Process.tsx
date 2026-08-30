import { motion } from 'motion/react';
import SectionHeader from '../ui/SectionHeader';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      desc: 'Understand the business models, user constraints, key manual workflows, and high-level product goals.',
    },
    {
      num: '02',
      title: 'Define',
      desc: 'Formulate the product strategy, technical specifications, database architecture plans, and agile shipping roadmap.',
    },
    {
      num: '03',
      title: 'Design',
      desc: 'Draft comprehensive wireframes, interactive clickable prototypes, and high-fidelity scalable design systems.',
    },
    {
      num: '04',
      title: 'Develop',
      desc: 'Engineer high-performance frontends, serverless backends, robust APIs, custom integrations, and AI systems.',
    },
    {
      num: '05',
      title: 'Launch',
      desc: 'Conduct extreme load testing, accessibility checks, optimize bundles, and deploy securely with live error monitoring.',
    },
    {
      num: '06',
      title: 'Evolve',
      desc: 'Iterate, expand capabilities, and fine-tune workflows continuously based on real user event logs and telemetry.',
    },
  ];

  return (
    <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-studio-border/50 relative">
      <SectionHeader
        eyebrow="The Studio Process"
        title="We don't guess. We engineer."
        description="A systematic, scientific approach to building digital products, ensuring maximum reliability and zero waste."
      />

      {/* Progress timeline container */}
      <div className="relative mt-16 md:mt-24 pl-8 md:pl-0">
        
        {/* Continuous background vertical track */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-studio-border -translate-x-1/2" />
        
        {/* Animated active vertical line */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-studio-accent -translate-x-1/2 origin-top"
        />

        <div className="space-y-16 md:space-y-24">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Center node badge */}
                <div className="absolute left-[-24px] md:left-1/2 top-0 -translate-x-1/2 z-10 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="w-10 h-10 rounded-full bg-studio-card border-2 border-studio-border flex items-center justify-center font-mono text-[11px] text-white hover:border-studio-accent transition-colors duration-300"
                  >
                    {step.num}
                  </motion.div>
                </div>

                {/* Left/Right Text Blocks */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-studio-card/20 border border-studio-border rounded-xl p-6 hover:border-white/15 transition-all duration-300"
                  >
                    <span className="font-mono text-xs text-studio-accent mb-2 block">
                      // PHASE {step.num}
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-medium text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-studio-text-secondary leading-relaxed font-sans max-w-md md:ml-auto md:mr-0">
                      {step.desc}
                    </p>
                  </motion.div>
                </div>

                {/* Empty block for layout offset on desktop */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
