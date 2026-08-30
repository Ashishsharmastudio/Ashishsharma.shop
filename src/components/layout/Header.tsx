import { useState, useEffect } from 'react';
import { useRouter, Link } from '../../lib/router';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Button from '../ui/Button';

export default function Header() {
  const { path, navigate } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigate
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [path]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'Services', href: '/services' },
    { label: 'Lab', href: '/lab' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-studio-bg/85 backdrop-blur-md py-4 border-b border-studio-border'
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none"
          >
            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-white flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-studio-accent group-hover:scale-125 transition-transform duration-300" />
              ASHISH SHARMA<span className="text-studio-accent font-mono font-normal">//</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = path === link.href || (link.href !== '/' && path.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-sans font-medium tracking-tight transition-colors duration-300 relative py-1 focus:outline-none ${
                    isActive ? 'text-studio-accent' : 'text-studio-text-secondary hover:text-studio-text-primary'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-studio-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Action */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/contact')}
              showArrow
              className="text-xs py-2 px-5 hover:bg-studio-text-primary hover:text-studio-bg"
            >
              Start a Project
            </Button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden items-center gap-3">
            <Button
              variant="primary"
              onClick={() => navigate('/contact')}
              className="text-xs py-2 px-4.5 rounded-full"
            >
              Start
            </Button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full border border-studio-border bg-studio-card text-studio-text-primary focus:outline-none focus:border-studio-accent transition-colors duration-300"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Animated Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-studio-bg z-40 pt-28 px-6 pb-12 flex flex-col justify-between overflow-y-auto"
          >
            {/* Grain overlay */}
            <div className="absolute inset-0 noise-bg opacity-[0.02] pointer-events-none" />

            <div className="max-w-md mx-auto w-full flex flex-col gap-10">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-studio-accent block border-b border-studio-border pb-4">
                // Operations
              </span>
              <div className="flex flex-col gap-6">
                {navLinks.map((link, idx) => {
                  const isActive = path === link.href || (link.href !== '/' && path.startsWith(link.href));
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                    >
                      <Link
                        href={link.href}
                        className={`text-4xl font-display font-medium block relative py-1 focus:outline-none ${
                          isActive ? 'text-studio-accent' : 'text-studio-text-primary hover:text-studio-accent'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="max-w-md mx-auto w-full border-t border-studio-border pt-8 flex flex-col gap-4">
              <div className="flex justify-between items-center text-xs text-studio-text-secondary font-mono">
                <span>EST: 2026</span>
                <span>ASHISHSHARMASTUDIO@GMAIL.COM</span>
              </div>
              <Button
                variant="primary"
                onClick={() => navigate('/contact')}
                showArrow
                className="w-full justify-center py-4 text-base"
              >
                Start a Project
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


