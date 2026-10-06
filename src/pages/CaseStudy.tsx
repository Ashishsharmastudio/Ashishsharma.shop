import { useRouter, Link } from '../lib/router';
import { projects } from '../data/projects';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Github, ExternalLink } from 'lucide-react';
import Button from '../components/ui/Button';
import { trackLiveSandboxLaunch, trackGitHubInspection, trackCalBookingClick } from '../lib/analytics';

interface CaseStudyProps {
  slug: string;
  key?: string;
}

export default function CaseStudy({ slug }: CaseStudyProps) {
  const { navigate } = useRouter();

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <main className="pt-32 pb-24 text-center">
        <div className="max-w-md mx-auto px-4">
          <span className="font-mono text-xs text-studio-accent">// 404_PROJECT_NOT_FOUND</span>
          <h2 className="text-3xl font-display font-medium text-white mt-4 mb-6">
            Case study was archived or moved.
          </h2>
          <Button variant="primary" href="/work" showArrow>
            Go back to Work
          </Button>
        </div>
      </main>
    );
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];

  const handleLaunchLive = (url: string) => {
    trackLiveSandboxLaunch(project.title, url);
  };

  const handleViewRepo = (url: string) => {
    trackGitHubInspection(project.title, url);
  };

  return (
    <main className="pt-32 pb-24">
      {/* Editorial Hero Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono text-studio-text-secondary hover:text-white transition-colors duration-300 mb-8 focus:outline-none cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          BACK TO PORTFOLIO
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <span className="font-mono text-xs text-studio-accent uppercase tracking-wider block mb-3">
              // CASE STUDY // {project.year}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-white leading-tight mb-4">
              {project.title}
            </h1>

            {/* Dynamic Live System & GitHub Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleLaunchLive(project.liveUrl!)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-studio-accent text-white text-xs font-mono font-medium hover:bg-studio-accent/90 transition-all shadow-lg shadow-studio-accent/20"
                >
                  <span>Launch Live System</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleViewRepo(project.githubUrl!)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono font-medium hover:bg-white/20 transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 lg:text-right font-mono text-xs text-studio-text-secondary">
            <span>CLIENT: {project.client.toUpperCase()}</span>
          </div>
        </div>
      </section>

      {/* Hero Mockup Canvas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div
          className={`w-full aspect-16/10 md:aspect-21/9 rounded-2xl border border-studio-border relative overflow-hidden flex items-center justify-center p-8 ${project.image}`}
        >
          <div className="absolute inset-0 noise-bg opacity-[0.03] pointer-events-none" />

          <div className="absolute top-6 left-6 font-mono text-[10px] text-white/30">
            SECURE ENVIRONMENT // ID: {project.id}
          </div>
          <div className="absolute bottom-6 right-6 font-mono text-[10px] text-white/30">
            TECH // {project.techStack.slice(0, 3).join(', ').toUpperCase()}
          </div>

          <div className="bg-black/55 backdrop-blur-lg border border-white/10 rounded-2xl p-8 max-w-xl shadow-2xl text-center">
            <h2 className="text-2xl font-display font-medium text-white mb-3">
              {project.title}
            </h2>
            <p className="text-sm text-white/70 mb-6">{project.subtitle}</p>

            <div className="flex justify-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleLaunchLive(project.liveUrl!)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-studio-accent text-white text-xs font-mono hover:bg-studio-accent/90 transition-all"
                >
                  <span>Interactive System Preview ↗</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleViewRepo(project.githubUrl!)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-mono hover:bg-white/20 transition-all"
                >
                  <span>Source Code ↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Meta Specifications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-studio-border/50 mb-20 bg-studio-card/20 rounded-xl">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-studio-text-secondary block mb-1">
            Client
          </span>
          <span className="text-sm font-sans font-medium text-white">{project.client}</span>
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-studio-text-secondary block mb-1">
            Category
          </span>
          <span className="text-sm font-sans font-medium text-white">{project.category}</span>
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-studio-text-secondary block mb-1">
            Year
          </span>
          <span className="text-sm font-sans font-medium text-white">{project.year}</span>
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-studio-text-secondary block mb-1">
            Services Offered
          </span>
          <span className="text-sm font-sans font-medium text-white">
            {project.services.slice(0, 2).join(', ')}
          </span>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
        <div className="lg:col-span-8 space-y-12">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-studio-accent mb-4">
              // The Challenge
            </h3>
            <p className="text-lg text-studio-text-primary leading-relaxed font-sans">
              {project.challenge}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-studio-accent mb-4">
              // The Strategy
            </h3>
            <p className="text-lg text-studio-text-primary leading-relaxed font-sans">
              {project.strategy}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-studio-accent mb-4">
              // Design Process
            </h3>
            <p className="text-base text-studio-text-secondary leading-relaxed font-sans">
              {project.designProcess}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-studio-accent mb-4">
              // Development Approach
            </h3>
            <p className="text-base text-studio-text-secondary leading-relaxed font-sans">
              {project.developmentApproach}
            </p>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="bg-studio-card border border-studio-border rounded-xl p-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-studio-text-primary mb-4">
              // Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full border border-studio-border/60 bg-white/5 font-mono text-[10px] text-studio-text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-studio-text-primary">
              // Key Outcomes
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {project.keyMetrics.map((metric, idx) => (
                <div key={idx} className="border-l border-studio-border pl-4">
                  <div className="text-3xl font-display font-bold text-studio-accent">
                    {metric.value}
                  </div>
                  <div className="text-[10px] font-mono text-studio-text-secondary uppercase mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Measurable Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 bg-studio-card border border-studio-border p-8 md:p-12 rounded-2xl">
        <h3 className="text-xs font-mono uppercase tracking-widest text-studio-accent mb-6">
          // Measurable Results
        </h3>
        <div className="space-y-4 max-w-4xl">
          {project.results.map((result, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-studio-accent shrink-0 mt-0.5" />
              <p className="text-base text-studio-text-primary font-sans leading-relaxed">
                {result}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Client Testimonial */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="border-l-2 border-studio-accent pl-6 md:pl-10 max-w-4xl py-2">
          <p className="text-xl md:text-2xl font-display italic text-white/90 leading-relaxed mb-6">
            "{project.testimonial.text}"
          </p>
          <div className="font-mono text-xs text-studio-text-secondary">
            <span className="text-white font-sans font-medium block text-sm mb-0.5">
              {project.testimonial.author}
            </span>
            {project.testimonial.role} // {project.client.toUpperCase()}
          </div>
        </div>
      </section>

      {/* Up Next CTA */}
      <section className="border-t border-studio-border pt-16 mt-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-mono text-[10px] text-studio-text-secondary uppercase tracking-[0.2em] block mb-2">
              Up Next
            </span>
            <h4 className="text-2xl sm:text-3xl font-display font-medium text-white">
              {nextProject.title}
            </h4>
          </div>
          <Button
            variant="primary"
            href={`/work/${nextProject.slug}`}
            showArrow
            className="px-8 py-4 text-sm"
          >
            Read next project
          </Button>
        </div>
      </section>
    </main>
  );
}