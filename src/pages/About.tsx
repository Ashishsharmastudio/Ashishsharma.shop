import SectionHeader from '../components/ui/SectionHeader';
import { motion } from 'motion/react';
import {
  Workflow,
  Gauge,
  ShieldCheck,
  BrainCircuit,
} from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <Workflow className="w-5 h-5 text-studio-accent" />,
      title: 'Workflow First',
      desc: 'I start with the actual operating process: people, systems, documents, handoffs, decisions, exceptions, and where work gets stuck. Technology follows the workflow, not the other way around.',
    },
    {
      icon: <Gauge className="w-5 h-5 text-studio-accent" />,
      title: 'Production Discipline',
      desc: 'A prototype is not the finish line. Systems are designed for real users, real data, real integrations, observable failures, secure deployment, and the operational conditions they need to survive.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-studio-accent" />,
      title: 'Architectural Honesty',
      desc: 'I prefer explicit systems, durable data models, real APIs, clear boundaries, and measurable trade-offs over unnecessary complexity. Every technical decision should have a reason behind it.',
    },
    {
      icon: <BrainCircuit className="w-5 h-5 text-studio-accent" />,
      title: 'Human-Controlled AI',
      desc: 'AI is introduced where it creates leverage. Human review remains part of the system where judgment, approvals, exceptions, accountability, or governance still matter.',
    },
  ];

  return (
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Page Header */}
      <SectionHeader
        eyebrow="About Ashish Sharma"
        title="I turn complex business workflows into production systems."
        description="AI Systems Engineer & Technical Architect working at the intersection of business operations, software engineering, and applied AI."
      />

      {/* Narrative Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24 border-t border-studio-border/50 pt-16">
        <div className="lg:col-span-5">
          <span className="font-mono text-xs text-studio-accent uppercase tracking-wider">
            // THE OPERATING MODEL
          </span>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-2xl md:text-3xl font-display font-medium text-white leading-tight">
            I work directly with founders, operators, and domain teams to turn
            fragmented processes into software people can actually use.
          </h3>

          <p className="text-sm md:text-base text-studio-text-secondary leading-relaxed">
            The work starts with the real workflow — documents, tools,
            spreadsheets, business rules, manual handoffs, repetitive
            decisions, exceptions, and human responsibilities.
          </p>

          <p className="text-sm md:text-base text-studio-text-secondary leading-relaxed">
            From there, I design the system required to make that workflow
            clearer, faster, more reliable, and more scalable. That can mean
            an operational platform, internal tool, decision-support system,
            automation pipeline, AI workflow, integration layer, or a
            combination of them.
          </p>

          <p className="text-sm md:text-base text-studio-text-secondary leading-relaxed">
            I do not start by asking where AI can be added. I start by asking
            where the business is losing time, information, consistency, or
            throughput — then engineer the appropriate solution.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
            <div className="border border-studio-border bg-studio-card/30 rounded-xl p-4">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-studio-accent mb-2">
                01
              </span>
              <span className="text-xs text-white">
                Understand the workflow
              </span>
            </div>

            <div className="border border-studio-border bg-studio-card/30 rounded-xl p-4">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-studio-accent mb-2">
                02
              </span>
              <span className="text-xs text-white">
                Engineer the system
              </span>
            </div>

            <div className="border border-studio-border bg-studio-card/30 rounded-xl p-4">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-studio-accent mb-2">
                03
              </span>
              <span className="text-xs text-white">
                Deploy and iterate
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="mb-24">
        <span className="font-mono text-xs uppercase tracking-widest text-studio-accent mb-10 block">
          // Operating Principles
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: idx * 0.05,
              }}
              className="bg-studio-card border border-studio-border p-6 md:p-8 rounded-2xl hover:border-white/15 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-studio-accent/10 border border-studio-accent/20 flex items-center justify-center mb-6">
                {val.icon}
              </div>

              <h4 className="font-display font-medium text-lg text-white mb-2">
                {val.title}
              </h4>

              <p className="text-xs md:text-sm text-studio-text-secondary leading-relaxed">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leadership Profile */}
      <section className="mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-studio-accent mb-10 block">
          // Principal Systems Architect
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Profile Content */}
          <div className="lg:col-span-8 space-y-6 bg-studio-card/30 border border-studio-border rounded-2xl p-6 md:p-10">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-studio-border/40 pb-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-medium text-white">
                  Ashish Sharma
                </h3>

                <span className="font-mono text-xs text-studio-accent block mt-1">
                  AI Systems Engineer &amp; Technical Architect
                </span>

                <span className="font-mono text-[10px] text-studio-text-secondary block mt-2 uppercase tracking-wider">
                  Fractional CTO / Technical Leadership
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
              I design, architect, build, integrate, and deploy production
              software systems for businesses dealing with complex
              operational workflows.
            </p>

            <p className="text-sm md:text-base text-studio-text-secondary leading-relaxed font-sans">
              My work spans AI systems, workflow automation, operational
              platforms, decision-support interfaces, document processing,
              real-time voice systems, integrations, and enterprise
              application architecture.
            </p>

            <p className="text-sm md:text-base text-studio-text-secondary leading-relaxed font-sans">
              I can operate at both levels: understanding the business
              workflow and making the technical decisions required to turn
              that workflow into a reliable production system.
            </p>

            {/* Technical / Production Proof */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">

              <div className="p-4 rounded-xl bg-black/40 border border-studio-border/50">
                <div className="text-xs font-mono text-studio-accent uppercase mb-2">
                  System Capabilities
                </div>

                <p className="text-xs text-studio-text-secondary leading-relaxed">
                  AI and decision systems, grounded RAG, workflow automation,
                  agent orchestration, operational platforms, real-time voice,
                  integrations, and production application architecture.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-studio-border/50">
                <div className="text-xs font-mono text-studio-accent uppercase mb-2">
                  Production Proof
                </div>

                <p className="text-xs text-studio-text-secondary leading-relaxed">
                  Clinical workflow systems, financial analysis tooling,
                  aviation compliance workflows, operational dashboards, AI
                  lead qualification, and other domain-specific software
                  systems.
                </p>
              </div>

            </div>

            {/* Engagement Model */}
            <div className="border-t border-studio-border/40 pt-6 mt-2">
              <div className="text-xs font-mono text-studio-accent uppercase mb-3">
                // ENGAGEMENT MODEL
              </div>

              <p className="text-sm text-studio-text-secondary leading-relaxed">
                I work as a senior technical builder and architect — from
                workflow discovery and system design through implementation,
                integration, deployment, and iteration. The goal is not to
                hand over a specification or prototype. The goal is to put
                the working system into production.
              </p>
            </div>
          </div>

          {/* Profile Visual + Credentials */}
          <div className="lg:col-span-4 space-y-6">

            {/* Headshot */}
            <div className="bg-studio-card/30 border border-studio-border/40 rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-square w-full relative overflow-hidden bg-neutral-900">
                <img
                  src="/profile-headshot.jpg"
                  alt="Ashish Sharma - AI Systems Engineer and Technical Architect"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-4 text-center font-mono text-[10px] text-studio-text-secondary border-t border-studio-border/30">
                ASHISH SHARMA // PRINCIPAL SYSTEMS ARCHITECT
              </div>
            </div>

            {/* Credentials */}
            <div className="bg-studio-card/20 border border-studio-border/40 rounded-2xl p-6 space-y-4">
              <div className="font-mono text-xs text-white uppercase tracking-wider">
                // Technical Profile
              </div>

              <div className="space-y-4 font-mono text-xs text-studio-text-secondary">

                <div>
                  <span className="text-white block font-sans mb-1">
                    Primary Role
                  </span>
                  AI Systems Engineer &amp; Technical Architect
                </div>

                <div>
                  <span className="text-white block font-sans mb-1">
                    Technical Leadership
                  </span>
                  Fractional CTO / Architecture
                </div>

                <div>
                  <span className="text-white block font-sans mb-1">
                    Core Domains
                  </span>
                  AI Systems, Workflow Engineering, Operational Software,
                  Decision Support
                </div>

                <div>
                  <span className="text-white block font-sans mb-1">
                    Primary Stack
                  </span>
                  Python, FastAPI, Next.js, LangGraph, PostgreSQL, WebRTC
                </div>

                <div>
                  <span className="text-white block font-sans mb-1">
                    Direct Channel
                  </span>

                  <a
                    href="mailto:ashishsharmastudio@gmail.com"
                    className="text-studio-accent underline"
                  >
                    ashishsharmastudio@gmail.com
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="border-t border-studio-border/50 pt-16 mt-20">
        <div className="max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-studio-accent mb-6 block">
            // THE OUTCOME
          </span>

          <h3 className="text-3xl md:text-5xl font-display font-medium text-white leading-tight mb-6">
            The objective is not to add more technology.
            <br />
            <span className="text-studio-accent">
              It is to make the operation work better.
            </span>
          </h3>

          <p className="text-sm md:text-base text-studio-text-secondary leading-relaxed max-w-3xl">
            The best system is the one that makes information move more
            clearly, decisions happen with better context, repetitive work
            disappear where appropriate, and people spend more time on the
            parts of the operation that actually require them.
          </p>
        </div>
      </section>

    </main>
  );
}