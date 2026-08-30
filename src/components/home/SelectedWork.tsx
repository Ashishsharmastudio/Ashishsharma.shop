import { projects } from '../../data/projects';
import { useRouter } from '../../lib/router';
import ProjectCard from '../ui/ProjectCard';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';

export default function SelectedWork() {
  const { navigate } = useRouter();
  
  // Select first 4 projects for homepage
  const selectedProjects = projects.slice(0, 4);

  return (
    <section id="work" className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-studio-border/50">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
        <SectionHeader
          eyebrow="Selected Work"
          title="Projects from strategy to ship."
          description="A curated catalog of software systems, automation pipelines, and high-fidelity design products engineered for real performance."
          className="mb-0 max-w-3xl"
        />
        <div className="shrink-0">
          <Button
            variant="outline"
            onClick={() => navigate('/work')}
            showArrow
            className="w-full md:w-auto"
          >
            See all projects
          </Button>
        </div>
      </div>

      {/* Asymmetric Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
        {selectedProjects.map((project, index) => {
          // Alternating wide and standard layout blocks for editorial feel
          const gridColSpan = index % 3 === 0 ? 'lg:col-span-12' : index % 3 === 1 ? 'lg:col-span-7' : 'lg:col-span-5';
          return (
            <div key={project.id} className={`${gridColSpan}`}>
              <ProjectCard project={project} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
