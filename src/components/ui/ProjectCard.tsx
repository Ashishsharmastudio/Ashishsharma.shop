import { Project } from '../../types';
import { Link } from '../../lib/router';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectCardProps {
  project: Project;
  id?: string;
}

export default function ProjectCard({ project, id }: ProjectCardProps) {
  return (
    <Link
      id={id}
      href={`/work/${project.slug}`}
      className="group block relative w-full mb-8 md:mb-12"
    >
      <div className="overflow-hidden rounded-2xl border border-studio-border bg-studio-card relative aspect-16/10 md:aspect-16/9 mb-5 transition-colors duration-500 group-hover:border-white/20">
        {/* Dynamic Abstract Premium Backdrop */}
        <div className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 ${project.image} relative flex items-center justify-center p-8 overflow-hidden`}>
          {/* Grain overlay */}
          <div className="absolute inset-0 noise-bg opacity-[0.03] pointer-events-none" />
          
          {/* Futuristic abstract card elements representing code or designs */}
          <div className="absolute top-8 left-8 flex items-center gap-2 font-mono text-[10px] text-white/40">
            <span>[ SYSTEM_ACTIVE ]</span>
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          </div>
          
          <div className="absolute bottom-8 right-8 font-mono text-[10px] text-white/40">
            {project.year} // EST
          </div>

          <motion.div 
            initial={{ opacity: 0.8 }}
            whileHover={{ scale: 1.05 }}
            className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 max-w-sm w-full relative z-10 shadow-2xl"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-studio-accent font-semibold">{project.category}</span>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-studio-accent group-hover:text-white group-hover:border-transparent transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-display font-medium text-white mb-2">{project.title}</h3>
            <p className="text-xs text-white/60 line-clamp-2">{project.subtitle}</p>
          </motion.div>

          {/* Glowing cursor tracking light (simulated via radial gradient absolute) */}
          <div className="absolute -inset-y-1/2 -inset-x-1/2 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_50%)] pointer-events-none" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-mono text-studio-accent font-semibold">{project.category}</span>
            <span className="w-1 h-1 bg-studio-border rounded-full" />
            <span className="text-xs font-mono text-studio-text-secondary">{project.client}</span>
          </div>
          <h4 className="text-xl md:text-2xl font-display font-medium text-studio-text-primary transition-colors duration-300 group-hover:text-studio-accent">
            {project.title}
          </h4>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2 md:mt-0">
          {project.services.slice(0, 2).map((service, index) => (
            <span
              key={index}
              className="text-[10px] font-mono bg-white/5 border border-studio-border text-studio-text-secondary px-2.5 py-1 rounded-full"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
