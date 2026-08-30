import { motion } from 'motion/react';

interface SectionHeaderProps {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  className = '',
}: SectionHeaderProps) {
  return (
    <div id={id} className={`max-w-4xl mb-12 md:mb-16 ${className}`}>
      <motion.span
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-mono text-xs uppercase tracking-[0.2em] text-studio-accent mb-3 block"
      >
        // {eyebrow}
      </motion.span>
      
      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="text-3xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight text-studio-text-primary leading-[1.1] mb-6"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-lg md:text-xl text-studio-text-secondary leading-relaxed font-sans max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
