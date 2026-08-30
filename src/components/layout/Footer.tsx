import { Link, useRouter } from '../../lib/router';
import { motion } from 'motion/react';

export default function Footer() {
  const { navigate } = useRouter();

  const handleStartProject = () => {
    navigate('/contact');
  };

  return (
    <footer className="bg-[#070707] border-t border-studio-border pt-20 pb-12 relative overflow-hidden">
      {/* Giant subtle footer background text */}
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
                An independent digital product agency combining strategy, user-centered design, advanced software engineering, and AI automation.
              </p>
            </div>
            <div className="font-mono text-xs text-studio-text-secondary">
              // BUILT FOR PERFORMANCE
            </div>
          </div>

          {/* Links: WORK */}
          <div className="col-span-1 lg:col-span-1">
            <h4 className="font-mono text-xs text-studio-text-primary uppercase tracking-wider mb-5">
              Work
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/work" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  All Projects
                </Link>
              </li>
              <li>
                <Link href="/lab" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  The Lab
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: SERVICES */}
          <div className="col-span-1 lg:col-span-1">
            <h4 className="font-mono text-xs text-studio-text-primary uppercase tracking-wider mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  AI Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  UX/UI Design
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  Engineering
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  AI Agents
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  Automation
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: STUDIO */}
          <div className="col-span-1 lg:col-span-1">
            <h4 className="font-mono text-xs text-studio-text-primary uppercase tracking-wider mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <button onClick={handleStartProject} className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300 text-left cursor-pointer focus:outline-none">
                  Start a Project
                </button>
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

          {/* Links: SOCIAL */}
          <div className="col-span-1 lg:col-span-1">
            <h4 className="font-mono text-xs text-studio-text-primary uppercase tracking-wider mb-5">
              Social
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-studio-text-secondary hover:text-studio-accent transition-colors duration-300">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright details */}
        <div className="border-t border-studio-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-studio-text-secondary font-mono">
          <div>
            &copy; 2026 ASHISH SHARMA. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Designed & built with intention.</span>
            <span className="w-1.5 h-1.5 bg-studio-accent rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}
