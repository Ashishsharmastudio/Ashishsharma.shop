import { motion } from 'motion/react';

export default function Philosophy() {
  return (
    <section className="py-24 md:py-36 bg-[#070707] border-b border-studio-border/50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-studio-accent/3 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.2em] text-studio-accent mb-8 block"
        >
          // Operating Principle
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1,
          }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight text-white leading-tight mb-8"
        >
          Build the system around the workflow —
          <span className="text-studio-accent"> not the hype around the technology.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-base text-studio-text-secondary leading-relaxed max-w-3xl mx-auto"
        >
          Start with the actual process, decisions, handoffs, exceptions, and
          information flow. Then introduce software, automation, and AI where
          they create leverage — while keeping people responsible for judgment
          and governance where they need to be.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-[10px] uppercase font-mono tracking-[0.2em] text-studio-text-secondary"
        >
          // WORKFLOW FIRST // SYSTEM SECOND // PRODUCTION ALWAYS
        </motion.p>
      </div>
    </section>
  );
}