import { projects } from '../../data/projects';
import { useRouter } from '../../lib/router';
import ProjectCard from '../ui/ProjectCard';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';

export default function SelectedWork() {
  const { navigate } = useRouter();

  const selectedProjects = projects.slice(0, 4);

  return (
    <section
      id="work"
      className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-studio-border/50"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
        <SectionHeader
          eyebrow="Selected Production Work"
          title="Complex workflows, engineered into working systems."
          description="A selection of production software, AI systems, operational platforms, dashboards, and automation pipelines built around real business processes."
          className="mb-0 max-w-3xl"
        />

        <div className="shrink-0">
          <Button
            variant="outline"
            href="/work"
            showArrow
            className="w-full md:w-auto"
          >
            Explore all work
          </Button>
        </div>
      </div>

      <div className="mb-12 grid grid-cols-1 md:grid-cols-5 gap-4 max-w-5xl">
        {[
          'Operational workflows',
          'Decision support',
          'AI & automation',
          'Production software',
          'Human-in-the-loop systems',
        ].map((item, index) => (
          <div
            key={item}
            className="border border-studio-border bg-studio-card/30 rounded-lg px-4 py-3"
          >
            <span className="block font-mono text-[9px] text-studio-accent mb-2">
              0{index + 1}
            </span>
            <span className="text-xs uppercase tracking-[0.08em] text-studio-text-secondary">
              {item}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
        {selectedProjects.map((project, index) => {
          const gridColSpan =
            index % 3 === 0
              ? 'lg:col-span-12'
              : index % 3 === 1
              ? 'lg:col-span-7'
              : 'lg:col-span-5';

          return (
            <div key={project.id} className={gridColSpan}>
              <ProjectCard project={project} />
            </div>
          );
        })}
      </div>
    </section>
  );
}