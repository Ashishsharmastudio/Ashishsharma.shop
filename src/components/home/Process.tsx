import { motion } from 'motion/react';
import SectionHeader from '../ui/SectionHeader';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Discover the workflow',
      desc: 'Map the real operating process: people, systems, documents, handoffs, decisions, exceptions, and where work gets stuck.',
    },
    {
      num: '02',
      title: 'Model the system',
      desc: 'Translate the workflow into entities, states, data flows, permissions, business rules, dependencies, and failure modes.',
    },
    {
      num: '03',
      title: 'Digitize the process',
      desc: 'Turn fragmented work into a coherent digital workflow using the right interfaces, APIs, databases, integrations, and operational tooling.',
    },
    {
      num: '04',
      title: 'Automate where it matters',
      desc: 'Introduce deterministic automation, AI, retrieval, extraction, classification, agents, or decision support only where they create real leverage.',
    },
    {
      num: '05',
      title: 'Keep humans in control',
      desc: 'Define approvals, escalation paths, overrides, exception handling, governance, and auditability for decisions that still require human judgment.',
    },
    {
      num: '06',
      title: 'Deploy & evolve',
      desc: 'Ship to production, observe real usage, measure performance, and continuously improve the workflow using operational telemetry and feedback.',
    },
  ];

  return (
    <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-studio-border/50 relative">
      <SectionHeader
        eyebrow="The Workflow-to-System Process"
        title="We don't automate the chaos. We engineer the system."
        description="A practical sequence for turning messy operational work into reliable software, automation, and decision-support infrastructure."
      />

      <div className="relative mt-16 md:mt-24 pl-8 md:pl-0">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-studio-border -translate-x-1/2" />

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
                key={step.num}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
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

                <div
                  className={`w-full md:w-1/2 ${
                    isEven
                      ? 'md:pr-16 md:text-right'
                      : 'md:pl-16 md:text-left'
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
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

                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}