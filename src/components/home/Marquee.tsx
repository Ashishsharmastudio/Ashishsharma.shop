import React from 'react';

const topRow = [
  { text: 'Workflow Systems', solid: true },
  { text: 'System Design', solid: false },
  { text: 'AI Automation', solid: true },
  { text: 'Decision Support', solid: false },
];

const bottomRow = [
  { text: 'Operational Software', solid: true },
  { text: 'Human-in-the-Loop', solid: false },
  { text: 'AI Agents', solid: true },
  { text: 'Production Engineering', solid: false },
];

export default function InfiniteMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-[#0a0a0a] py-12 font-serif">
      <style>{`
        .marquee-track {
          display: flex;
          width: max-content;
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .text-outline {
          color: transparent;
          -webkit-text-stroke: 1.5px #d4af37;
        }

        .text-solid {
          color: #d4af37;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-left,
          .animate-scroll-right {
            animation-play-state: paused;
          }
        }
      `}</style>

      <div className="mb-6 flex">
        <div className="marquee-track animate-scroll-left gap-12 px-6">
          {[...topRow, ...topRow].map((item, index) => (
            <span
              key={index}
              className={`text-5xl md:text-7xl lg:text-8xl whitespace-nowrap font-medium tracking-wide ${
                item.solid ? 'text-solid' : 'text-outline'
              }`}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>

      <div className="flex">
        <div className="marquee-track animate-scroll-right gap-12 px-6">
          {[...bottomRow, ...bottomRow].map((item, index) => (
            <span
              key={index}
              className={`text-5xl md:text-7xl lg:text-8xl whitespace-nowrap font-medium tracking-wide ${
                item.solid ? 'text-solid' : 'text-outline'
              }`}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}