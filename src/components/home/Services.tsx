import { services } from '../../data/services';
import { useRouter } from '../../lib/router';
import ServiceCard from '../ui/ServiceCard';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';

export default function Services() {
  const { navigate } = useRouter();

  return (
    <section
      id="services"
      className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-studio-border/50"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
        <SectionHeader
          eyebrow="What I Build"
          title="One technical partner from workflow discovery to production."
          description="I work directly on the system: understanding the process, designing the architecture, building the software, integrating AI and automation where useful, and shipping the result into production."
          className="mb-0 max-w-3xl"
        />

        <div className="shrink-0">
          <Button
            variant="outline"
            href="/services"
            showArrow
            className="w-full md:w-auto"
          >
            Explore capabilities
          </Button>
        </div>
      </div>

      <div className="mb-12 max-w-3xl">
        <div className="flex flex-wrap gap-3">
          {[
            'Workflow Systems',
            'AI & Automation',
            'Decision Support',
            'Digital Products',
            'Operational Software',
            'Integrations',
          ].map((item) => (
            <span
              key={item}
              className="px-3 py-2 rounded-md border border-studio-border bg-studio-card/50 font-mono text-[10px] uppercase tracking-[0.12em] text-studio-text-secondary"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}