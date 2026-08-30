import { useState } from 'react';
import { projects } from '../data/projects';
import ProjectCard from '../components/ui/ProjectCard';
import SectionHeader from '../components/ui/SectionHeader';
import { motion } from 'motion/react';

export default function Work() {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'AI Product Development', 'UX / UI Design', 'Full-Stack Engineering', 'AI Agents & Automation'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter((p) => p.services.includes(filter));

  return (
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Header */}
      <SectionHeader
        eyebrow="Case Studies"
        title="Software engineered with beautiful discipline."
        description="A deeper look into our active projects, technical stacks, and concrete, numeric business outcomes."
      />

      {/* Dynamic Filter bar */}
      <div className="flex flex-wrap gap-2.5 mb-16 border-b border-studio-border/50 pb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 text-xs font-mono rounded-full border transition-all duration-300 ${
              filter === cat
                ? 'bg-studio-accent border-transparent text-white'
                : 'bg-studio-card border-studio-border text-studio-text-secondary hover:text-white hover:border-white/20'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Grid List */}
      <AnimatePresence mode="popLayout">
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              key={project.id}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 font-mono text-xs text-studio-text-secondary">
          // NO ACTIVE PROJECTS IN THIS SEGMENT
        </div>
      )}
    </main>
  );
}

// Inline helper to import AnimatePresence if needed
import { AnimatePresence } from 'motion/react';
