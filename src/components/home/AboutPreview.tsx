import { useRouter } from '../../lib/router';
import { motion } from 'motion/react';
import Button from '../ui/Button';

export default function AboutPreview() {
  const { navigate } = useRouter();

  return (
    <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-studio-border/50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-6 relative">
          <div className="aspect-square max-w-md mx-auto lg:max-w-none bg-[#111] border border-studio-border rounded-2xl p-8 relative overflow-hidden group shadow-2xl flex flex-col justify-between">
            <div className="absolute inset-0 noise-bg opacity-[0.03] pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-studio-accent/10 blur-[80px] pointer-events-none group-hover:bg-studio-accent/15 transition-colors duration-500" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-indigo-500/5 blur-[80px] pointer-events-none" />

            <div className="flex justify-between items-start font-mono text-[10px] text-white/40">
              <span>// SYSTEM_ARCHITECT_v1.0</span>
              <span>STATUS: PRODUCTION</span>
            </div>

            <div className="relative h-44 w-full flex items-center justify-center">
              <svg
                className="w-full h-full text-white/5 group-hover:text-white/10 transition-colors duration-500"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="25"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  fill="none"
                />

                <line
                  x1="10"
                  y1="10"
                  x2="90"
                  y2="90"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="2"
                />

                <line
                  x1="90"
                  y1="10"
                  x2="10"
                  y2="90"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="2"
                />

                <line
                  x1="50"
                  y1="0"
                  x2="50"
                  y2="100"
                  stroke="currentColor"
                  strokeWidth="0.25"
                />

                <line
                  x1="0"
                  y1="50"
                  x2="100"
                  y2="50"
                  stroke="currentColor"
                  strokeWidth="0.25"
                />

                <circle
                  cx="50"
                  cy="10"
                  r="1.5"
                  className="fill-studio-accent animate-ping"
                />
                <circle
                  cx="50"
                  cy="10"
                  r="1.5"
                  className="fill-studio-accent"
                />
                <circle
                  cx="90"
                  cy="50"
                  r="1.5"
                  className="fill-indigo-500"
                />
                <circle
                  cx="25"
                  cy="25"
                  r="1.5"
                  className="fill-studio-accent"
                />
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center border-t border-studio-border/50 pt-6">
              <div>
                <div className="text-2xl font-display font-bold text-white">
                  15+
                </div>
                <div className="text-[9px] font-mono text-studio-text-secondary uppercase mt-1">
                  Yrs Exp
                </div>
              </div>

              <div>
                <div className="text-2xl font-display font-bold text-white">
                  40+
                </div>
                <div className="text-[9px] font-mono text-studio-text-secondary uppercase mt-1">
                  Shipped
                </div>
              </div>

              <div>
                <div className="text-2xl font-display font-bold text-white">
                  100%
                </div>
                <div className="text-[9px] font-mono text-studio-text-secondary uppercase mt-1">
                  Production
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-studio-accent mb-3 block">
            // About Ashish Sharma
          </span>

          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight text-white mb-6 leading-tight">
            Direct technical ownership.
            <br />
            Senior-level execution.
          </h2>

          <p className="text-base md:text-lg text-studio-text-secondary leading-relaxed font-sans mb-6">
            I work directly with founders, operators, and domain teams to turn
            complex workflows into production software, AI systems, automation,
            and decision-support infrastructure.
          </p>

          <p className="text-sm text-studio-text-secondary leading-relaxed font-sans mb-5">
            The engagement starts with the actual workflow — not a technology
            wish list. I map the process, identify the real bottlenecks, design
            the system, and build the software required to put it into use.
          </p>

          <p className="text-sm text-studio-text-secondary leading-relaxed font-sans mb-8">
            AI is introduced where it creates leverage. Humans remain in the
            loop where judgment, approvals, exceptions, or governance still
            matter.
          </p>

          <div className="self-start">
            <Button
              variant="outline"
              href="/about"
              showArrow
            >
              Meet the architect
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}