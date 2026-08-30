import { motion } from 'motion/react';
import SectionHeader from '../ui/SectionHeader';

export default function Capabilities() {
  const blocks = [
    {
      code: 'WBS-01',
      title: 'WEBSITES',
      subHeadline: 'A website that works as hard as your team.',
      description: 'High-performance websites designed to attract, educate, qualify, and convert customers. Focused on lightning fast rendering speeds, impeccable SEO layout structures, and high conversion flow metrics.',
    },
    {
      code: 'PRD-02',
      title: 'PRODUCTS',
      subHeadline: 'Digital products people actually want to use.',
      description: 'Custom platforms, dashboards, portals, and enterprise applications designed around real-world user workflows. Built to reduce frictional fatigue and boost daily operation velocities.',
    },
    {
      code: 'AUT-03',
      title: 'AI & AUTOMATION',
      subHeadline: 'Repetitive work handled automatically.',
      description: 'Bespoke AI agents, data extraction pipelines, and automated integrations that eliminate manual operations, helping lean professional teams scale without expanding headcount.',
    },
  ];

  return (
    <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-studio-border/50">
      <SectionHeader
        eyebrow="Built into every engagement"
        title="Digital products designed to keep working after launch."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {blocks.map((block, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-[#111] border border-studio-border rounded-2xl p-8 hover:border-white/20 transition-all duration-500 flex flex-col justify-between overflow-hidden"
          >
            {/* Background glowing numbers */}
            <div className="absolute right-[-10px] top-[-30px] font-display font-black text-white/[0.02] text-9xl select-none group-hover:text-studio-accent/[0.04] transition-colors duration-500">
              0{idx + 1}
            </div>

            <div>
              <div className="font-mono text-[10px] text-studio-accent font-semibold mb-6">
                CODE // {block.code}
              </div>
              <h3 className="font-display font-black text-2xl tracking-tight text-white mb-6">
                {block.title}
              </h3>
              <h4 className="font-display text-xl text-studio-text-primary mb-3 leading-snug">
                {block.subHeadline}
              </h4>
              <p className="font-sans text-sm text-studio-text-secondary leading-relaxed">
                {block.description}
              </p>
            </div>

            <div className="border-t border-studio-border/50 pt-6 mt-8 flex justify-between items-center text-[10px] font-mono text-studio-text-secondary">
              <span>INTEGRATED SYSTEM</span>
              <span className="w-2 h-2 rounded-full bg-studio-accent group-hover:scale-150 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
