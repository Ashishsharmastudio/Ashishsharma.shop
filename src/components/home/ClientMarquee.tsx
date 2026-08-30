import { motion } from 'motion/react';

export default function ClientMarquee() {
  const brands = [
    'HELIX ROBOTICS', 'EXETER GROUP', 'VELOCE RETAIL', 'NEXUS SAAS', 
    'ASHISH SHARMA LABS', 'CALIBER CO', 'STRATUM TECH', 'VECTORS LTD'
  ];

  return (
    <section className="py-12 border-y border-studio-border bg-black/40 overflow-hidden relative">
      {/* Edge Fades */}
      <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-studio-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-studio-bg to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-studio-text-secondary text-center">
          Trusted by ambitious teams and growing brands
        </h3>
      </div>

      <div className="hover-pause relative w-full flex overflow-hidden">
        {/* Double brands array to create continuous seamless loop */}
        <div className="animate-marquee-slow flex whitespace-nowrap gap-16 md:gap-24 items-center">
          {brands.concat(brands).map((brand, idx) => (
            <div
              key={idx}
              className="font-display font-bold text-xl md:text-3xl text-studio-text-secondary/40 hover:text-studio-accent/70 transition-colors duration-300 tracking-wider cursor-default select-none flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 bg-studio-border rounded-full" />
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
