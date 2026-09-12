import { useState, useEffect, useRef } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import { labExperiments } from '../data/lab';
import { Play, RotateCcw, Monitor, RefreshCw, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Lab() {
  const [selectedId, setSelectedId] = useState<string>('ascii-fluid');
  const [inputText, setInputText] = useState<string>('ASHISH SHARMA');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeExp = labExperiments.find((e) => e.id === selectedId) || labExperiments[0];

  // Runs selected experiment physics inside Canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMoving = false;
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isMoving = true;
    };

    const handleMouseLeave = () => {
      isMoving = false;
    };

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Initializer variables for physics state depending on Selected ID
    interface Point {
      x: number;
      y: number;
      ox: number;
      oy: number;
      vx: number;
      vy: number;
      char?: string;
    }

    let points: Point[] = [];

    const initPoints = () => {
      points = [];
      if (selectedId === 'gravitational-grid') {
        const spacing = 20;
        for (let x = 15; x < width; x += spacing) {
          for (let y = 15; y < height; y += spacing) {
            points.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
          }
        }
      } else if (selectedId === 'kinetic-typo') {
        // Draw characters from InputText
        const letters = inputText.split('');
        const stepX = width / (letters.length + 1);
        letters.forEach((char, index) => {
          points.push({
            x: stepX * (index + 1),
            y: height / 2,
            ox: stepX * (index + 1),
            oy: height / 2,
            vx: 0,
            vy: 0,
            char,
          });
        });
      }
    };

    initPoints();

    const renderLoop = () => {
      time += 0.05;
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      if (selectedId === 'ascii-fluid') {
        // Simulation: ASCII Fluid Flow Grid
        ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
        ctx.font = '10px monospace';
        const cols = Math.floor(width / 12);
        const rows = Math.floor(height / 12);
        
        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows; r++) {
            const px = c * 12 + 6;
            const py = r * 12 + 6;
            
            // Navier Stokes emulation vector coordinates
            const angle = Math.sin(c * 0.15 + time) * Math.cos(r * 0.15 + time * 0.5) * Math.PI * 2;
            let magnitude = 1;
            
            if (isMoving) {
              const dx = mouseX - px;
              const dy = mouseY - py;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 100) {
                magnitude = (1 - dist / 100) * 8;
              }
            }

            // Characters sequence
            const charList = ['.', ',', '-', '~', ':', ';', '=', '!', '*', '#', '$', '@'];
            const charIdx = Math.min(
              charList.length - 1,
              Math.floor(Math.abs(angle * magnitude) % charList.length)
            );
            const char = charList[charIdx];

            // Color shifts
            ctx.fillStyle = isMoving && Math.sqrt((mouseX - px)**2 + (mouseY - py)**2) < 80
              ? 'rgba(59, 130, 246, 0.95)'
              : 'rgba(255, 255, 255, 0.2)';
              
            ctx.fillText(char, px - 3, py + 3);
          }
        }
      } 
      else if (selectedId === 'neural-noise') {
        // Simulation: GLSL Neural Synapses
        const circleCount = 35;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < circleCount; i++) {
          const cx = Math.sin(time * 0.1 + i * 2) * (width * 0.2) + width / 2;
          const cy = Math.cos(time * 0.15 + i * 1.5) * (height * 0.2) + height / 2;
          
          let dist = 1000;
          if (isMoving) {
            const dx = mouseX - cx;
            const dy = mouseY - cy;
            dist = Math.sqrt(dx * dx + dy * dy);
          }

          ctx.strokeStyle = dist < 120 
            ? `rgba(59, 130, 246, ${(1 - dist / 120) * 0.4})` 
            : 'rgba(255, 255, 255, 0.03)';
            
          ctx.beginPath();
          ctx.arc(cx, cy, Math.abs(Math.sin(time + i)) * 60 + 10, 0, Math.PI * 2);
          ctx.stroke();

          // Connect circles with lines
          if (i < circleCount - 1) {
            const ncx = Math.sin(time * 0.1 + (i + 1) * 2) * (width * 0.2) + width / 2;
            const ncy = Math.cos(time * 0.15 + (i + 1) * 1.5) * (height * 0.2) + height / 2;
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.05)';
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(ncx, ncy);
            ctx.stroke();
          }
        }
      }
      else if (selectedId === 'gravitational-grid') {
        // Simulation: Interactive Gravitational Mesh
        points.forEach((p) => {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150 && dist > 5) {
            const force = (1 - dist / 150) * 2.2;
            // Pull vector
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }

          // Return springs
          p.vx += (p.ox - p.x) * 0.12;
          p.vy += (p.oy - p.y) * 0.12;
          p.vx *= 0.85;
          p.vy *= 0.85;

          p.x += p.vx;
          p.y += p.vy;

          ctx.fillStyle = `rgba(59, 130, 246, ${Math.min(1, Math.max(0.15, (Math.abs(p.vx) + Math.abs(p.vy)) / 1.5))})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        });
      }
      else if (selectedId === 'kinetic-typo') {
        // Simulation: Kinetic physics text deformation
        ctx.font = 'bold 50px Outfit';
        ctx.textAlign = 'center';
        
        points.forEach((p) => {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            const force = (1 - dist / 80) * 6;
            // Push away
            p.vx -= (dx / dist) * force;
            p.vy -= (dy / dist) * force;
          }

          // Spring physics
          p.vx += (p.ox - p.x) * 0.1;
          p.vy += (p.oy - p.y) * 0.1;
          p.vx *= 0.8;
          p.vy *= 0.8;

          p.x += p.vx;
          p.y += p.vy;

          ctx.fillStyle = Math.abs(p.vx) > 0.5 ? '#3b82f6' : '#ffffff';
          ctx.fillText(p.char || '', p.x, p.y + 15);
        });
      }
      else {
        // Fallback drifting nodes
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillText("// CHOSEN_EXPERIMENT_IS_STATIC", 20, 20);
      }

      animationId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationId);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedId, inputText]);

  return (
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <SectionHeader
        eyebrow="R&D Sandbox"
        title="See what the web can actually do."
        description="An active, interactive sandbox presenting real-time physics engines, matrix simulations, and procedural visual generators built client-side."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
        {/* Left Side: Interactive Console Navigation */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <span className="font-mono text-xs uppercase tracking-wider text-studio-text-secondary border-b border-studio-border pb-2 block">
            // Select Research Core
          </span>
          <div className="space-y-3.5">
            {labExperiments.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setSelectedId(exp.id)}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-300 relative overflow-hidden group focus:outline-none cursor-pointer ${
                  selectedId === exp.id
                    ? 'bg-studio-card border-studio-accent shadow-xl shadow-studio-accent/5'
                    : 'bg-studio-card/40 border-studio-border hover:border-white/20 hover:bg-studio-card'
                }`}
              >
                {/* Active side indicator */}
                {selectedId === exp.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-studio-accent" />
                )}

                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-studio-accent">
                    Category: {exp.category}
                  </span>
                  <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                    exp.complexity === 'High' ? 'bg-red-950/45 text-red-400 border border-red-900/30' : 'bg-blue-950/45 text-blue-400 border border-blue-900/30'
                  }`}>
                    {exp.complexity} complexity
                  </span>
                </div>

                <h3 className="font-display font-medium text-white group-hover:text-studio-accent transition-colors duration-300">
                  {exp.title}
                </h3>
                <p className="text-xs text-studio-text-secondary mt-1.5 line-clamp-2">
                  {exp.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Active Sandbox Console Viewport */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-[#0e0e0e] border border-studio-border rounded-2xl overflow-hidden relative shadow-2xl flex flex-col h-[500px]">
            {/* Console top header */}
            <div className="bg-studio-card border-b border-studio-border px-5 py-3 flex justify-between items-center text-xs font-mono text-studio-text-secondary select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 font-semibold text-white">active_sand_core.exe</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[10px]">
                  <Monitor className="w-3.5 h-3.5" />
                  RENDER: HTML5_CANVAS
                </span>
              </div>
            </div>

            {/* Simulated Live Viewport canvas */}
            <div className="relative flex-1 bg-black">
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-crosshair absolute inset-0"
              />

              {/* Live interactive diagnostic floating overlay */}
              <div className="absolute top-4 right-4 pointer-events-none bg-black/60 backdrop-blur-md border border-white/5 px-3 py-2 rounded font-mono text-[9px] text-white/60 space-y-0.5">
                <div>CORE // ID: {activeExp.id.toUpperCase()}</div>
                <div>STATE: COMPILED_SUCCESS</div>
                <div>COMPLEXITY: {activeExp.complexity.toUpperCase()}</div>
                <div>RELEASED // {activeExp.date}</div>
              </div>

              {/* Special interactive input box specifically for Kinetic Typography */}
              {selectedId === 'kinetic-typo' && (
                <div className="absolute bottom-4 left-4 right-4 pointer-events-auto bg-black/60 backdrop-blur-md border border-white/5 p-3 rounded-xl max-w-sm">
                  <label className="font-mono text-[10px] text-studio-text-secondary block mb-1.5 uppercase">// Modify Core Typography Vector Text</label>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value.toUpperCase().slice(0, 16))}
                    className="w-full bg-[#111] border border-studio-border focus:border-studio-accent rounded px-3 py-1.5 font-sans text-xs text-white focus:outline-none"
                    placeholder="ENTER WORD..."
                  />
                </div>
              )}
            </div>

            {/* Sandbox details drawer footer */}
            <div className="bg-studio-card border-t border-studio-border p-5 text-sm">
              <h4 className="font-display font-medium text-white mb-1">
                Description & Research Objective
              </h4>
              <p className="text-xs text-studio-text-secondary leading-relaxed">
                {activeExp.description} We study this pattern to optimize smooth client-side rendering bounds, multi-node physics states, and high frame-rate vector transformations for immersive production products.
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center px-2 text-xs font-mono text-studio-text-secondary">
            <span>DIAGNOSTICS: STABLE_60FPS</span>
            <span>PRESS CONTROL + HOVER TO AGITATE</span>
          </div>
        </div>
      </div>
    </main>
  );
}
