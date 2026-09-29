import { useEffect, useRef, useState } from 'react';
import { useRouter } from '../../lib/router';
import { motion } from 'motion/react';
import Button from '../ui/Button';
import { RotateCcw } from 'lucide-react';

export default function LabPreview() {
  const { navigate } = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activePreset, setActivePreset] = useState<'gravity' | 'wave'>(
    'gravity'
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    interface Dot {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      vx: number;
      vy: number;
    }

    let dots: Dot[] = [];
    const spacing = 30;

    const initDots = () => {
      dots = [];
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;

      for (let x = 15; x < width; x += spacing) {
        for (let y = 15; y < height; y += spacing) {
          dots.push({
            x,
            y,
            targetX: x,
            targetY: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    initDots();

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      initDots();
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    let time = 0;

    const animate = () => {
      time += 0.02;

      ctx.fillStyle = '#0f0f0f';
      ctx.fillRect(0, 0, width, height);

      ctx.font = '9px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillText(
        `R&D_ENGINE_v4 // MODE: ${activePreset.toUpperCase()}`,
        15,
        20
      );
      ctx.fillText(
        `COORDS: X=${mouseX.toFixed(0)}, Y=${mouseY.toFixed(0)}`,
        15,
        32
      );

      dots.forEach((dot) => {
        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (activePreset === 'gravity') {
          if (dist < 120 && dist > 5) {
            const force = (1 - dist / 120) * 1.5;
            dot.vx += (dx / dist) * force;
            dot.vy += (dy / dist) * force;
          }
        } else {
          const wave =
            Math.sin(dot.x * 0.01 + dot.y * 0.01 + time) * 3;

          dot.targetY = dot.y + wave;
        }

        const ax = (dot.targetX - dot.x) * 0.1;
        const ay = (dot.targetY - dot.y) * 0.1;

        dot.vx += ax;
        dot.vy += ay;

        dot.vx *= 0.85;
        dot.vy *= 0.85;

        dot.x += dot.vx;
        dot.y += dot.vy;

        const heatOpacity = Math.min(
          1,
          Math.max(0.1, (Math.abs(dot.vx) + Math.abs(dot.vy)) / 3)
        );

        ctx.fillStyle = `rgba(59, 130, 246, ${heatOpacity})`;

        ctx.beginPath();
        ctx.arc(
          dot.x,
          dot.y,
          1.5 + heatOpacity * 1.5,
          0,
          Math.PI * 2
        );
        ctx.fill();

        if (heatOpacity > 0.4) {
          ctx.strokeStyle = `rgba(99, 102, 241, ${heatOpacity * 0.15})`;
          ctx.lineWidth = 0.5;

          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(dot.targetX, dot.targetY);
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);

      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [activePreset]);

  const labCategories = [
    'AI Systems',
    'Interaction',
    'Data Visualization',
    'Automation',
    'Performance',
    'Experimental Interfaces',
  ];

  return (
    <section
      id="lab"
      className="py-20 md:py-32 bg-[#0a0a0a] border-b border-studio-border/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-studio-accent mb-3 block">
            // Engineering R&D
          </span>

          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight text-white mb-6 leading-tight">
            Where production ideas get stress-tested.
          </h2>

          <p className="text-base md:text-lg text-studio-text-secondary leading-relaxed font-sans mb-8">
            The Lab is an experimental environment for testing emerging
            interfaces, computational systems, interaction patterns, AI
            capabilities, and performance techniques before they become part
            of production work.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-10">
            {labCategories.map((cat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-3 rounded-lg border border-studio-border bg-studio-card/40 font-mono text-[11px] text-studio-text-primary"
              >
                <span className="w-1.5 h-1.5 bg-studio-accent rounded-full animate-pulse" />
                {cat.toUpperCase()}
              </div>
            ))}
          </div>

          <Button
            variant="primary"
            onClick={() => navigate('/lab')}
            showArrow
            className="w-full sm:w-auto px-8"
          >
            Explore the R&D lab
          </Button>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4">
          <div
            ref={containerRef}
            className="w-full h-[380px] md:h-[450px] bg-[#0f0f0f] border border-studio-border rounded-2xl relative overflow-hidden group shadow-2xl"
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-crosshair"
              aria-label="Interactive engineering R&D simulation"
            />

            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-auto bg-black/45 backdrop-blur-md border border-white/5 p-3 rounded-xl">
              <span className="font-mono text-[10px] text-white/50">
                // INTERACT WITH THE EXPERIMENT
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setActivePreset(
                      activePreset === 'gravity' ? 'wave' : 'gravity'
                    )
                  }
                  className="p-1.5 rounded bg-white/10 hover:bg-studio-accent text-white transition-all text-xs flex items-center gap-1 font-mono focus:outline-none"
                  type="button"
                >
                  <RotateCcw className="w-3 h-3" />

                  {activePreset === 'gravity'
                    ? 'SWITCH TO WAVE'
                    : 'SWITCH TO GRAVITY'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs font-mono text-studio-text-secondary px-2">
            <span>R&D STATUS: ACTIVE</span>
            <span>EXPERIMENTAL_ENGINE_v4.2.1</span>
          </div>
        </div>
      </div>
    </section>
  );
}