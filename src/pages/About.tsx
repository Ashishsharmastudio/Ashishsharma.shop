import SectionHeader from '../components/ui/SectionHeader';
import { motion } from 'motion/react';
import { ShieldAlert, Cpu, HeartHandshake, Eye } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <ShieldAlert className="w-5 h-5 text-studio-accent" />,
      title: 'No Handoffs',
      desc: 'You work directly with senior product builders. We don’t pass you off to junior managers or account liaisons. Every piece of code and design is structured by specialists.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-studio-accent" />,
      title: 'Performance First',
      desc: 'We compile and benchmark our products. Slow loading is a bug. We target extreme SEO metrics, lightning-fast first contentful paints, and optimized assets.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-studio-accent" />,
      title: 'Architectural Honesty',
      desc: 'We implement real systems, real APIs, and durable databases. No tech-larping or mock solutions. Every visual has clean logic supporting it.',
    },
    {
      icon: <Eye className="w-5 h-5 text-studio-accent" />,
      title: 'Pioneering AI Systems',
      desc: 'We build AI-native products, fine-tune models, and orchestrate agentic pipelines using standard, safe, and robust frameworks.',
    }
  ];

  return (
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <SectionHeader
        eyebrow="The Team"
        title="We are a lean product agency by choice."
        description="We believe tiny, highly skilled teams are the future of digital software. By aligning top tier design directly with performance engineering, we ship better systems in weeks, not months."
      />

      {/* Narrative Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24 border-t border-studio-border/50 pt-16">
        <div className="lg:col-span-5 font-mono text-xs text-studio-accent uppercase tracking-wider">
          // THE NARRATIVE
        </div>
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-2xl md:text-3xl font-display font-medium text-white">
            We operate at the intersections of strategy, software engineering, and artificial intelligence.
          </h3>
          <p className="text-sm md:text-base text-studio-text-secondary leading-relaxed">
            Founded by a veteran team of designers and systems architects, we observed that traditional digital agencies were bloated, slow, and divided by organizational silos. Designers threw mockups over the fence, and developers wrote compromises.
          </p>
          <p className="text-sm md:text-base text-studio-text-secondary leading-relaxed">
            We solved this. We built a unified pipeline. Our designers write CSS and code layouts. Our backend developers understand user psychology and motion. We work as one integrated system.
          </p>
        </div>
      </section>

      {/* Studio Core Values */}
      <section className="mb-24">
        <span className="font-mono text-xs uppercase tracking-widest text-studio-accent mb-10 block">// Values</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-studio-card border border-studio-border p-6 md:p-8 rounded-2xl hover:border-white/15 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-studio-accent/10 border border-studio-accent/20 flex items-center justify-center mb-6">
                {val.icon}
              </div>
              <h4 className="font-display font-medium text-lg text-white mb-2">{val.title}</h4>
              <p className="text-xs md:text-sm text-studio-text-secondary leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leadership profiles */}
      <section className="mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-studio-accent mb-10 block">// Leadership</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Member 1 */}
          <div className="space-y-6 bg-studio-card/25 border border-studio-border rounded-2xl p-6 md:p-8">
            <div className="aspect-square w-full rounded-xl bg-gradient-to-tr from-slate-900 via-neutral-950 to-blue-950/40 relative overflow-hidden flex items-center justify-center">
              <span className="font-display font-black text-6xl text-white/5 uppercase select-none">DZ</span>
              <div className="absolute inset-0 noise-bg opacity-[0.03] pointer-events-none" />
              <div className="absolute bottom-4 left-4 font-mono text-[9px] text-white/30">
                ASHISH SHARMA // CO-FOUNDER
              </div>
            </div>
            <div>
              <h4 className="font-display font-medium text-xl text-white">David Zuniga</h4>
              <span className="font-mono text-xs text-studio-accent block mt-0.5 mb-3">Creative Director & Lead UX Architect</span>
              <p className="text-xs md:text-sm text-studio-text-secondary leading-relaxed">
                David has spent 15+ years orchestrating digital designs and user strategies for high-growth tech platforms. He focuses on typography rhythms, responsive visual systems, and motion structures.
              </p>
            </div>
          </div>

          {/* Member 2 */}
          <div className="space-y-6 bg-studio-card/25 border border-studio-border rounded-2xl p-6 md:p-8">
            <div className="aspect-square w-full rounded-xl bg-gradient-to-tr from-neutral-950 via-slate-900 to-indigo-950/40 relative overflow-hidden flex items-center justify-center">
              <span className="font-display font-black text-6xl text-white/5 uppercase select-none">AM</span>
              <div className="absolute inset-0 noise-bg opacity-[0.03] pointer-events-none" />
              <div className="absolute bottom-4 left-4 font-mono text-[9px] text-white/30">
                ASHISH SHARMA // CO-FOUNDER
              </div>
            </div>
            <div>
              <h4 className="font-display font-medium text-xl text-white">Alistair McArthur</h4>
              <span className="font-mono text-xs text-studio-accent block mt-0.5 mb-3">Technical Director & Lead Systems Architect</span>
              <p className="text-xs md:text-sm text-studio-text-secondary leading-relaxed">
                Alistair is an expert systems architect specializing in high-speed web pipelines, multi-agent LLM systems, secure cloud databases, and telemetry collection engines. He compiles solutions that scale effortlessly.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
