import { services } from '../../data/services';
import { useRouter } from '../../lib/router';
import ServiceCard from '../ui/ServiceCard';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';

export default function Services() {
  const { navigate } = useRouter();

  return (
    <section id="services" className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-studio-border/50">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
        <SectionHeader
          eyebrow="The Core Stack"
          title="One studio across the whole build — strategy to launch."
          description="We consolidate your digital pipeline under one collaborative team. No handoffs, no division of labor errors, no lost details. Just high-performance software."
          className="mb-0 max-w-3xl"
        />
        <div className="shrink-0">
          <Button
            variant="outline"
            onClick={() => navigate('/services')}
            showArrow
            className="w-full md:w-auto"
          >
            Explore all capabilities
          </Button>
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
