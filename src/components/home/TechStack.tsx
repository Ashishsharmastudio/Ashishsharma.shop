import { motion } from 'motion/react';

export default function TechStack() {
  const row1 = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'MongoDB', 
    'PostgreSQL', 'Supabase', 'Vercel'
  ];
  
  const row2 = [
    'AWS', 'OpenAI', 'Anthropic', 'Stripe', 'Sanity', 'Figma', 
    'Make', 'Zapier', 'Python'
  ];

  return (
    <section className="py-16 bg-[#090909] border-b border-studio-border/50 overflow-hidden relative">
      {/* Edge Fades */}
      <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#090909] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#090909] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-studio-accent mb-2 block">
          // THE INTEGRATIONS HUB
        </span>
        <h3 className="text-xl md:text-2xl font-display font-medium text-white">
          Our core engineering & automation ecosystem.
        </h3>
      </div>

      <div className="flex flex-col gap-5 hover-pause">
        {/* Left marquee */}
        <div className="w-full flex overflow-hidden">
          <div className="animate-marquee flex whitespace-nowrap gap-6 items-center pr-6">
            {Array(8).fill(row1).flat().map((tech, idx) => (
              <div
                key={idx}
                className="px-5 py-2.5 rounded-md border border-studio-border bg-studio-card/80 font-mono text-sm text-studio-text-primary flex items-center gap-2 select-none"
              >
                <span className="w-1.5 h-1.5 bg-studio-accent" />
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Right marquee */}
        <div className="w-full flex overflow-hidden">
          <div className="animate-marquee-reverse flex whitespace-nowrap gap-6 items-center pr-6">
            {Array(8).fill(row2).flat().map((tech, idx) => (
              <div
                key={idx}
                className="px-5 py-2.5 rounded-md border border-studio-border bg-studio-card/80 font-mono text-sm text-studio-text-primary flex items-center gap-2 select-none"
              >
                <span className="w-1.5 h-1.5 bg-indigo-500" />
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
