import { useRouter } from '../../lib/router';
import { motion } from 'motion/react';
import Button from '../ui/Button';

export default function FinalCTA() {
  const { navigate } = useRouter();

  return (
    <section className="relative py-28 md:py-40 bg-black overflow-hidden border-b border-studio-border/50">
      {/* Intense center lighting flares */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-studio-accent/8 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 noise-bg opacity-[0.02] pointer-events-none" />

      {/* Grid overlay lines */}
      <div className="absolute inset-y-0 left-1/4 w-[1px] bg-white/[0.02]" />
      <div className="absolute inset-y-0 right-1/4 w-[1px] bg-white/[0.02]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-[0.25em] text-studio-accent mb-6 inline-block bg-white/5 border border-white/10 px-4 py-1.5 rounded-full"
        >
          // Ready to ship?
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-white leading-tight mb-8"
        >
          Have a project where technology should do the heavy lifting?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-lg md:text-xl text-studio-text-secondary font-sans leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Tell us what you're building. If we're a good fit, we'll design, engineer, and deploy the smartest possible system for your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            onClick={() => navigate('/contact')}
            showArrow
            className="w-full sm:w-auto px-8 py-4 text-base"
          >
            Start a project
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/work')}
            className="w-full sm:w-auto px-8 py-4 text-base hover:bg-white hover:text-black"
          >
            See our work first →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
