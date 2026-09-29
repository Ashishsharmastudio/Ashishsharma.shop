import { useEffect, useRef } from 'react';
import { useRouter } from '../../lib/router';
import { motion } from 'motion/react';
import Button from '../ui/Button';

export default function Hero() {
  const { navigate } = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      baseOpacity: number;
    }[] = [];

    const particleCount = Math.min(
      100,
      Math.floor((width * height) / 15000)
    );

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
        baseOpacity: Math.random() * 0.4 + 0.2,
      });
    }

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
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;

      const gridSize = 40;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        let opacity = p.baseOpacity;

        if (mouseX > 0 && mouseY > 0) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            opacity = (1 - dist / 180) * 0.85 + p.baseOpacity;

            ctx.strokeStyle = `rgba(59, 130, 246, ${
              (1 - dist / 180) * 0.12
            })`;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + dx * 0.1, p.y + dy * 0.1);
            ctx.stroke();
          }
        }

        ctx.fillStyle = `rgba(245, 245, 247, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (mouseX > 0 && mouseY > 0) {
        const glowGrad = ctx.createRadialGradient(
          mouseX,
          mouseY,
          0,
          mouseX,
          mouseY,
          150
        );

        glowGrad.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
        glowGrad.addColorStop(1, 'rgba(59, 130, 246, 0)');

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 150, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center pt-32 pb-16 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0"
        aria-hidden="true"
      />

      <div className="absolute inset-0 noise-bg opacity-[0.03] pointer-events-none z-0" />

      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-studio-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-center md:text-left">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-studio-border bg-studio-card mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-studio-accent animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-studio-text-secondary">
              Ashish Sharma // AI Systems Engineer & Technical Architect
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1,
            }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight text-white leading-[1.05] mb-8"
          >
            Turn complex business workflows into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-studio-accent via-blue-400 to-indigo-400">
              intelligent systems
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.25,
            }}
            className="text-lg sm:text-xl md:text-2xl text-studio-text-secondary font-sans leading-relaxed max-w-3xl mb-8"
          >
            I design and deploy production software, AI automation, and
            decision-support systems that connect people, data, and processes —
            with humans staying in control where judgment matters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.35,
            }}
            className="mb-10 max-w-3xl"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.16em] text-studio-text-secondary">
              <span className="text-studio-accent">01</span>
              <span>Workflow</span>
              <span className="text-studio-border">→</span>
              <span>System</span>
              <span className="text-studio-border">→</span>
              <span>AI / Automation</span>
              <span className="text-studio-border">→</span>
              <span>Human Review</span>
              <span className="text-studio-border">→</span>
              <span>Production</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.45,
            }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
          >
            <Button
              variant="primary"
              href="/contact"
              showArrow
              className="w-full sm:w-auto px-8 py-4 text-base"
            >
              Describe your workflow
            </Button>

            <Button
              variant="secondary"
              href="/work"
              className="w-full sm:w-auto px-8 py-4 text-base"
            >
              See production work
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
        <span className="font-mono text-[9px] uppercase tracking-widest text-studio-text-secondary">
          Explore the system
        </span>

        <div className="w-[1px] h-12 bg-studio-border relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: 'easeInOut',
            }}
            className="absolute top-0 left-0 w-full h-1/3 bg-studio-accent"
          />
        </div>
      </div>
    </section>
  );
}