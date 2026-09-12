import { useRouter } from '../../lib/router';
import { motion } from 'motion/react';
import Button from '../ui/Button';

export default function AboutPreview() {
  const { navigate } = useRouter();

  return (
    <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-studio-border/50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Procedural Visual Component */}
        <div className="lg:col-span-6 relative">
          <div className="aspect-square max-w-md mx-auto lg:max-w-none bg-[#111] border border-studio-border rounded-2xl p-8 relative overflow-hidden group shadow-2xl flex flex-col justify-between">
            {/* Ambient glows */}
            <div className="absolute inset-0 noise-bg opacity-[0.03] pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-studio-accent/10 blur-[80px] pointer-events-none group-hover:bg-studio-accent/15 transition-colors duration-500" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-indigo-500/5 blur-[80px] pointer-events-none" />

            <div className="flex justify-between items-start font-mono text-[10px] text-white/40">
              <span>// DIRECTORS_PANEL_v1.0</span>
              <span>COMPILER: GREEN</span>
            </div>

            {/* High-fidelity abstract wireframe structure */}
            <div className="relative h-44 w-full flex items-center justify-center">
              <svg className="w-full h-full text-white/5 group-hover:text-white/10 transition-colors duration-500" viewBox="0 0 100 100">
                {/* Concentric circles */}
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.5" fill="none" />
                {/* Diagonal crosses */}
                <line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2" />
                <line x1="90" y1="10" x2="10" y2="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.25" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.25" />
                
                {/* Glowing points */}
                <circle cx="50" cy="10" r="1.5" className="fill-studio-accent animate-ping" />
                <circle cx="50" cy="10" r="1.5" className="fill-studio-accent" />
                <circle cx="90" cy="50" r="1.5" className="fill-indigo-500" />
                <circle cx="25" cy="25" r="1.5" className="fill-studio-accent" />
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center border-t border-studio-border/50 pt-6">
              <div>
                <div className="text-2xl font-display font-bold text-white">15+</div>
                <div className="text-[9px] font-mono text-studio-text-secondary uppercase mt-1">Yrs Exp</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-white">40+</div>
                <div className="text-[9px] font-mono text-studio-text-secondary uppercase mt-1">Shipped</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-white">100%</div>
                <div className="text-[9px] font-mono text-studio-text-secondary uppercase mt-1">Focused</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right About Narrative Content */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-studio-accent mb-3 block">
            // About the Studio
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight text-white mb-6 leading-tight">
            Small studio.<br />Senior-level execution.
          </h2>
          <p className="text-base md:text-lg text-studio-text-secondary leading-relaxed font-sans mb-6">
            We intentionally maintain a small, highly specialized team. When you partner with us, you work directly with veteran architects, product strategists, and advanced software developers — never getting handed off to junior account managers.
          </p>
          <p className="text-sm text-studio-text-secondary leading-relaxed font-sans mb-8">
            This streamlined structure guarantees extreme communication speed, precise attention to architectural details, and product velocity that large corporate agencies simply cannot replicate.
          </p>

          <div className="self-start">
            <Button
              variant="outline"
              onClick={() => navigate('/about')}
              showArrow
            >
              Meet the studio
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
