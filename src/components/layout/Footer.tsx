import { Link, useRouter } from '../../lib/router';

export default function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="bg-[#070707] border-t border-studio-border pt-20 pb-12 relative overflow-hidden">
      <div className="absolute bottom-[-10%] left-[-5%] right-0 text-[18vw] font-display font-black text-white/[0.015] select-none pointer-events-none tracking-tighter leading-none">
        ASHISH SHARMA
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 pb-16">
          {/* Studio Brand Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-6 focus:outline-none">
                <span className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-studio-accent" />
                  ASHISH SHARMA<span className="text-studio-accent font-mono font-normal">//</span>
                </span>
              </Link>
              <p className="text-sm text-studio-text-secondary leading-relaxed max-w-sm mb-6">
                Operational Systems Engineering Studio. Turning messy, high-friction operational workflows, manual coordination, and offshore VA processes into deterministic, Human-in-the-Loop software systems.
              </p>
            </div>
            <div className="font-mono text-xs text-studio-accent">
              // PRODUCTION SYSTEMS FIRST // DETERMINISTIC AUTOMATION
            </div>
          </div>

          {/* Links: WORK */}
          <div className="col-span-1 lg:col-span-1">
            <h4 className="font-mono text-xs text-studio-text-primary uppercase tracking-wider mb-5">
              Proof & Systems
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/work" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  All Systems
                </Link>
              </li>
              <li>
                <Link href="/lab" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  Engineering R&D
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: CAPABILITIES */}
          <div className="col-span-1 lg:col-span-1">
            <h4 className="font-mono text-xs text-studio-text-primary uppercase tracking-wider mb-5">
              Capabilities
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  Workflow Engines
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  HITL Agentic AI
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  Document Ingestion
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  Legacy ERP Connectors
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  Voice AI Gateways
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: COMPANY */}
          <div className="col-span-1 lg:col-span-1">
            <h4 className="font-mono text-xs text-studio-text-primary uppercase tracking-wider mb-5">
              Studio
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  About Architect
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  Technical Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  Book Systems Call
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: CHANNELS */}
          <div className="col-span-1 lg:col-span-1">
            <h4 className="font-mono text-xs text-studio-text-primary uppercase tracking-wider mb-5">
              Channels
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="https://linkedin.com/in/ashish-sharma-rrr" target="_blank" rel="noreferrer" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href="https://github.com/Ashishsharmastudio" target="_blank" rel="noreferrer" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  GitHub ↗
                </a>
              </li>
              <li>
                <a href="https://cal.com/ashish-sharma-2000" target="_blank" rel="noreferrer" className="text-sm text-studio-accent hover:underline font-mono">
                  Cal.com ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-studio-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-studio-text-secondary font-mono">
          <div>
            &copy; {new Date().getFullYear()} ASHISH SHARMA. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Workflow-to-System Engineering // Production Always.</span>
            <span className="w-1.5 h-1.5 bg-studio-accent rounded-full animate-pulse ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}