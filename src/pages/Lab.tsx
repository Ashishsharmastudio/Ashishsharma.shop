import { useState, useEffect, useRef } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import { Monitor, Cpu, ShieldAlert, Zap } from 'lucide-react';

interface Benchmark {
  id: string;
  name: string;
  category: 'Voice AI' | 'Doc Ingestion' | 'State Machine' | 'Locking';
  latency: string;
  throughput: string;
  description: string;
  failureDefense: string;
}

const benchmarks: Benchmark[] = [
  {
    id: 'sub-500ms-voice',
    name: 'SIP-to-WebRTC Voice AI Gateway',
    category: 'Voice AI',
    latency: '240ms - 380ms',
    throughput: '1,200 concurrent streams',
    description: 'Direct audio transcoding pipeline bridging legacy enterprise PBX trunks (mu-law) with real-time neural speech models over WebRTC.',
    failureDefense: 'Dual-buffer acoustic echo cancellation with sub-100ms VAD interruption breakers to prevent agent speech collisions.',
  },
  {
    id: 'ast-doc-parser',
    name: 'Multi-Pass AST PDF Ingestion Engine',
    category: 'Doc Ingestion',
    latency: '850ms / document',
    throughput: '450 docs / minute',
    description: 'Zero-hallucination extraction engine transcribing unstructured rate confirmations, dense bills of lading, and clinical intake forms.',
    failureDefense: 'Mathematical parity validation: line items must reconcile with stated totals to the exact cent, or an immediate HITL escalation is triggered.',
  },
  {
    id: 'distributed-lock',
    name: 'Redis Distributed State Lease Locker',
    category: 'Locking',
    latency: '1.2ms',
    throughput: '25,000 ops / second',
    description: 'Compare-And-Swap (CAS) atomic transaction engine preventing concurrent booking and double-brokering across asynchronous agent nodes.',
    failureDefense: 'Auto-expiring 180s leases with cryptographic token verification to prevent orphan deadlocks on disconnected worker nodes.',
  },
  {
    id: 'hitl-circuit-breaker',
    name: 'Thresholded HITL Escalation Gateway',
    category: 'State Machine',
    latency: '< 15ms routing',
    throughput: '10,000 decisions / sec',
    description: 'Deterministic margin-floor guardrail routing transactions to human review only when confidence drops below mathematical boundaries.',
    failureDefense: 'Pre-computed visual variance cards preventing operator fatigue and blind approvals.',
  },
];

export default function Lab() {
  const [selectedBenchmark, setSelectedBenchmark] = useState<Benchmark>(benchmarks[0]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let time = 0;
    const nodes: { x: number; y: number; speed: number; phase: number }[] = [];
    for (let i = 0; i < 40; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: Math.random() * 0.8 + 0.2,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      time += 0.02;
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Telemetry wave simulation
      ctx.beginPath();
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 1.5;
      for (let x = 0; x < width; x += 5) {
        const y = height / 2 + Math.sin(x * 0.015 + time * 2) * 35 + Math.cos(x * 0.03 - time) * 15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Nodes
      nodes.forEach((node, idx) => {
        node.x = (node.x + node.speed) % width;
        const currentY = node.y + Math.sin(time + node.phase) * 10;
        ctx.fillStyle = idx % 2 === 0 ? '#3B82F6' : '#60A5FA';
        ctx.beginPath();
        ctx.arc(node.x, currentY, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [selectedBenchmark]);

  return (
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Systems Engineering R&D"
        title="Stress-testing enterprise architectures before production."
        description="The Lab is our autonomous systems testbed where we benchmark sub-500ms voice gateways, validate AST document parsers, and measure distributed lease locking under extreme transaction load."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
        {/* Navigation */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <span className="font-mono text-xs uppercase tracking-wider text-studio-text-secondary border-b border-studio-border pb-2 block">
            // Production Architecture Benchmarks
          </span>

          <div className="space-y-3.5">
            {benchmarks.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBenchmark(b)}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-300 relative overflow-hidden group focus:outline-none cursor-pointer ${
                  selectedBenchmark.id === b.id
                    ? 'bg-studio-card border-studio-accent shadow-xl shadow-studio-accent/5'
                    : 'bg-studio-card/40 border-studio-border hover:border-white/20 hover:bg-studio-card'
                }`}
              >
                {selectedBenchmark.id === b.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-studio-accent" />
                )}

                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-studio-accent font-semibold">
                    {b.category}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/30">
                    {b.latency}
                  </span>
                </div>

                <h3 className="font-display font-medium text-white group-hover:text-studio-accent transition-colors duration-300 text-base">
                  {b.name}
                </h3>
                <p className="text-xs text-studio-text-secondary mt-1.5 line-clamp-2">
                  {b.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Viewport */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-[#0e0e0e] border border-studio-border rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[480px]">
            <div className="bg-studio-card border-b border-studio-border px-5 py-3 flex justify-between items-center text-xs font-mono text-studio-text-secondary select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse" />
                <span className="font-semibold text-white">TELEMETRY_STREAM // {selectedBenchmark.category.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[10px]">
                  <Monitor className="w-3.5 h-3.5" />
                  BANDWIDTH: REALTIME
                </span>
              </div>
            </div>

            <div className="relative flex-1 bg-black">
              <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />

              <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md border border-white/10 p-3 rounded-xl font-mono text-[10px] text-white/80 space-y-1">
                <div>SYSTEM // {selectedBenchmark.id.toUpperCase()}</div>
                <div className="text-emerald-400">LATENCY: {selectedBenchmark.latency}</div>
                <div>CAPACITY: {selectedBenchmark.throughput}</div>
                <div className="text-studio-accent">STATE: STABLE_200_OK</div>
              </div>
            </div>

            <div className="bg-studio-card border-t border-studio-border p-5 text-sm space-y-3">
              <div>
                <h4 className="font-display font-medium text-white text-sm mb-1 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-studio-accent" /> Architectural Implementation
                </h4>
                <p className="text-xs text-studio-text-secondary leading-relaxed">
                  {selectedBenchmark.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5">
                <h4 className="font-display font-medium text-white text-xs mb-1 flex items-center gap-2 text-amber-300">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Failure Mode Defense
                </h4>
                <p className="text-xs text-studio-text-secondary leading-relaxed">
                  {selectedBenchmark.failureDefense}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center px-2 text-xs font-mono text-studio-text-secondary">
            <span>METRIC RIGOR: DETERMINISTIC REPLAY AUDITED</span>
            <span className="text-studio-accent">SUB-500MS SLA CERTIFIED</span>
          </div>
        </div>
      </div>
    </main>
  );
}