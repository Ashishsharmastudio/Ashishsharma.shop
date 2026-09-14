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
            I am Ashish Sharma, an AI Systems Engineer operating at the intersection of strategy, software engineering, and artificial intelligence.
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

      {/* Leadership Profile: Ashish Sharma */}
      <section className="mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-studio-accent mb-10 block">// Principal Systems Architect</span>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-6 bg-studio-card/30 border border-studio-border rounded-2xl p-6 md:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-studio-border/40 pb-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-medium text-white">
                  Ashish Sharma
                </h3>
                <span className="font-mono text-xs text-studio-accent block mt-1">
                  Lead AI Systems Engineer &amp; Fractional CTO
                </span>
              </div>
              <div className="flex gap-3 font-mono text-xs">
                <a
                  href="https://github.com/Ashishsharmastudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg border border-studio-border bg-white/5 text-white hover:border-white/30 transition-colors"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://cal.com/ashish-sharma-2000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-studio-accent text-white font-medium hover:bg-studio-accent/90 transition-colors"
                >
                  Book Call
                </a>
              </div>
            </div>

            <p className="text-sm md:text-base text-studio-text-secondary leading-relaxed font-sans">
              Ashish Sharma is a Lead AI Systems Engineer and Fractional CTO who designs, architects, and ships production-grade AI systems, real-time voice agents, and decoupled high-performance platforms for enterprise clients globally.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-black/40 border border-studio-border/50">
                <div className="text-xs font-mono text-studio-accent uppercase mb-1">Pillar Expertise</div>
                <p className="text-xs text-studio-text-secondary leading-relaxed">
                  Zero-hallucination RAG pipelines, sub-500ms WebRTC voice bots, and remote Model Context Protocol (MCP) servers with automated token rotation.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-studio-border/50">
                <div className="text-xs font-mono text-studio-accent uppercase mb-1">Production Proof-of-Work</div>
                <p className="text-xs text-studio-text-secondary leading-relaxed">
                  Shipped clinical triage for Fly4Smiles, wealth stress-testing for Capital Insights Dublin, and FAA Part 145 compliance for Rotor Wing Services.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            {/* Real Headshot Image Card */}
            <div className="bg-studio-card/30 border border-studio-border/40 rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-square w-full relative overflow-hidden bg-neutral-900">
                <img 
                  src="/profile-headshot.jpg" 
                  alt="Ashish Sharma - AI Systems Engineer" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-4 text-center font-mono text-[10px] text-studio-text-secondary border-t border-studio-border/30">
                ASHISH SHARMA // LEAD ARCHITECT
              </div>
            </div>

            <div className="bg-studio-card/20 border border-studio-border/40 rounded-2xl p-6 space-y-4">
              <div className="font-mono text-xs text-white uppercase tracking-wider">// Verified Credentials</div>
              <div className="space-y-3 font-mono text-xs text-studio-text-secondary">
                <div>
                  <span className="text-white block font-sans">Specialization</span>
                  AI Systems &amp; Platform Engineering
                </div>
                <div>
                  <span className="text-white block font-sans">Primary Stack</span>
                  Python, FastAPI, Next.js, LangGraph, WebRTC
                </div>
                <div>
                  <span className="text-white block font-sans">Direct Channel</span>
                  <a href="mailto:ashishsharmastudio@gmail.com" className="text-studio-accent underline">
                    ashishsharmastudio@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}